import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IInvoice } from '@/shared/model/invoice.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import InvoiceService from './invoice.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Invoice extends mixins(AlertMixin) {
  @Inject('invoiceService') private invoiceService: () => InvoiceService;
  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public search = '';

  public invoices: IInvoice[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllInvoices(this.search);
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllInvoices(this.search);
  }
  public searchInput(): void {
    this.page = 1;
    this.retrieveAllInvoices(this.search);
  }

  public retrieveAllInvoices(search): void {
    search = search == '' ? 'false' : search;
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.invoiceService()
      .retrieve(search, paginationQuery)
      .then(
        res => {
          this.invoices = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IInvoice): void {
    console.log(instance);
    this.removeId = instance.id;
    console.log(this.removeId);
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeInvoice(): void {
    this.invoiceService()
      .delete(this.removeId)
      .then(() => {
        this.removeId = null;
        this.retrieveAllInvoices(this.search);
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
    this.retrieveAllInvoices(this.search);
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
