import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IInvoiceBenefits } from '@/shared/model/invoice-benefits.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import InvoiceBenefitsService from './invoice-benefits.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class InvoiceBenefits extends mixins(AlertMixin) {
  @Inject('invoiceBenefitsService') private invoiceBenefitsService: () => InvoiceBenefitsService;
  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;

  public invoiceBenefits: IInvoiceBenefits[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllInvoiceBenefitss();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllInvoiceBenefitss();
  }

  public retrieveAllInvoiceBenefitss(): void {
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.invoiceBenefitsService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.invoiceBenefits = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IInvoiceBenefits): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeInvoiceBenefits(): void {
    this.invoiceBenefitsService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A InvoiceBenefits is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllInvoiceBenefitss();
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
    this.retrieveAllInvoiceBenefitss();
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
