import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICompany } from '@/shared/model/company.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import CompanyService from './company.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Company extends mixins(AlertMixin) {
  @Inject('companyService') private companyService: () => CompanyService;
  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public status = 0;
  public search = '';

  public companies: ICompany[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllCompanys(this.search);
  }

  public searchInput(): void {
    this.page = 1;
    this.retrieveAllCompanys(this.search);
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllCompanys(this.search);
  }

  public retrieveAllCompanys(search): void {
    this.isFetching = true;
    search = search == '' ? 'false' : search;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.companyService()
      .retrieve(search, paginationQuery)
      .then(
        res => {
          this.companies = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(status: boolean, instance: ICompany): void {
    console.log(instance);
    instance.active = status;
    this.companyService()
      .update(instance)
      .then(param => {
        const message = status == true ? ' تم تفعيل   ' + instance.nameAr : ' تم تعطيل  ' + instance.nameAr;
        this.alertService().showAlert(message, status == true ? 'success' : 'danger');
        this.getAlertFromStore();
        // this.retrieveAllCompanys(this.search);
      });
  }

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
    // if (this.propOrder !== 'id') {
    //   result.push('id');
    // }
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveAllCompanys(this.search);
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
