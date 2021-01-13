import { Component, Inject, Vue } from 'vue-property-decorator';

import CardTransactionService from '../card-transaction/card-transaction.service';
import { ICardTransaction } from '@/shared/model/card-transaction.model';

import AlertService from '@/shared/alert/alert.service';
import { IInvoice, Invoice } from '@/shared/model/invoice.model';
import InvoiceService from './invoice.service';

const validations: any = {
  invoice: {
    invoiceNo: {},
    invoiceDate: {},
    payDate: {},
    total: {},
    invoiceStatus: {},
    notes: {},
  },
};

@Component({
  validations,
})
export default class InvoiceUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('invoiceService') private invoiceService: () => InvoiceService;
  public invoice: IInvoice = new Invoice();

  @Inject('cardTransactionService') private cardTransactionService: () => CardTransactionService;

  public cardTransactions: ICardTransaction[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.invoiceId) {
        vm.retrieveInvoice(to.params.invoiceId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.invoice.id) {
      this.invoiceService()
        .update(this.invoice)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Invoice is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.invoiceService()
        .create(this.invoice)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Invoice is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveInvoice(invoiceId): void {
    this.invoiceService()
      .find(invoiceId)
      .then(res => {
        this.invoice = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.cardTransactionService()
      .retrieve()
      .then(res => {
        this.cardTransactions = res.data;
      });
  }
}
