import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
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
  public status;
  public search = '';

  public hospitals: IHospital[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllHospitals(this.search);
  }

  public searchInput(): void {
    this.page = 1;
    this.retrieveAllHospitals(this.search);
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllHospitals(this.search);
  }

  public retrieveAllHospitals(search): void {
    this.isFetching = true;
    search = search == '' ? 'false' : search;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.hospitalService()
      .retrieve(search, paginationQuery)
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

  public prepareRemove(status: boolean, instance: IHospital): void {
    console.log(instance);
    instance.active = status;
    this.hospitalService()
      .update(instance)
      .then(param => {
        const message = status == true ? ' تم تفعيل   ' + instance.nameAr : ' تم تعطيل  ' + instance.nameAr;
        this.alertService().showAlert(message, status == true ? 'success' : 'danger');
        this.getAlertFromStore();
        // this.retrieveAllHospitals(this.search);
      });
    // this.status = status;
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
    this.retrieveAllHospitals(this.search);
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
