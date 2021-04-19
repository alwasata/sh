import { Component, Inject, Vue } from 'vue-property-decorator';

import CardService from '../card/card.service';
import { ICard } from '@/shared/model/card.model';

import InvoiceService from '../invoice/invoice.service';
import { IInvoice } from '@/shared/model/invoice.model';

import AlertService from '@/shared/alert/alert.service';
import { CardTransaction, ICardTransaction } from '@/shared/model/card-transaction.model';
import CardTransactionService from './card-transaction.service';

const validations: any = {
  cardTransaction: {
    transactionNo: {},
    amount: {},
    costAmount: {},
    action: {},
    notes: {},
  },
};

@Component({
  validations,
})
export default class CardTransactionUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('cardTransactionService') private cardTransactionService: () => CardTransactionService;
  public cardTransaction: ICardTransaction = new CardTransaction();

  @Inject('cardService') private cardService: () => CardService;

  public cards: ICard[] = [];

  @Inject('invoiceService') private invoiceService: () => InvoiceService;

  public invoices: IInvoice[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.cardTransactionId) {
        vm.retrieveCardTransaction(to.params.cardTransactionId);
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
    if (this.cardTransaction.id) {
      this.cardTransactionService()
        .update(this.cardTransaction)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A CardTransaction is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.cardTransactionService()
        .create(this.cardTransaction)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A CardTransaction is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveCardTransaction(cardTransactionId): void {
    this.cardTransactionService()
      .find(cardTransactionId)
      .then(res => {
        this.cardTransaction = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.cardService()
      .retrieve('false')
      .then(res => {
        this.cards = res.data;
      });
    this.invoiceService()
      .retrieve('false')
      .then(res => {
        this.invoices = res.data;
      });
  }
}
