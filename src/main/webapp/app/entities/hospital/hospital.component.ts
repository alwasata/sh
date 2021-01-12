import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IHospital } from '@/shared/model/hospital.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import HospitalService from './hospital.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Hospital extends mixins(AlertMixin) {
  @Inject('hospitalService') private hospitalService: () => HospitalService;
  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;

  public hospitals: IHospital[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllHospitals();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllHospitals();
  }

  public retrieveAllHospitals(): void {
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.hospitalService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.hospitals = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IHospital): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeHospital(): void {
    this.hospitalService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('sahatiApp.hospital.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllHospitals();
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
    this.retrieveAllHospitals();
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
