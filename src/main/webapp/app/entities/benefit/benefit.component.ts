import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IBenefit } from '@/shared/model/benefit.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import BenefitService from './benefit.service';
import SettingService from '../setting/setting.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Benefit extends mixins(AlertMixin) {
  @Inject('benefitService') private benefitService: () => BenefitService;
  @Inject('settingService') private settingService: () => SettingService;

  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public points = 0;
  public search = '';
  public benefits: IBenefit[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllBenefits(this.search);
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllBenefits(this.search);
  }

  public searchInput(): void {
    this.page = 1;
    this.retrieveAllBenefits(this.search);
  }

  public retrieveAllBenefits(search): void {
    this.isFetching = true;
    search = search == '' ? 'false' : search;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };

    this.benefitService()
      .retrieve(search, paginationQuery)
      .then(
        res => {
          this.benefits = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IBenefit): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeBenefit(): void {
    this.benefitService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Benefit is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllBenefits(this.search);
        this.closeDialog();
      });
  }

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveAllBenefits(this.search);
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.transition();
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
