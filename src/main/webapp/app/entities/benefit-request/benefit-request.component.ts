import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IBenefitRequest } from '@/shared/model/benefit-request.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import BenefitRequestService from './benefit-request.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class BenefitRequest extends mixins(AlertMixin) {
  @Inject('benefitRequestService') private benefitRequestService: () => BenefitRequestService;
  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;

  public benefitRequests: IBenefitRequest[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllBenefitRequests();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllBenefitRequests();
  }

  public retrieveAllBenefitRequests(): void {
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.benefitRequestService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.benefitRequests = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IBenefitRequest): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeBenefitRequest(): void {
    this.benefitRequestService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A BenefitRequest is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllBenefitRequests();
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
    this.retrieveAllBenefitRequests();
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
