import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICardTransaction } from '@/shared/model/card-transaction.model';
import CardTransactionService from './card-transaction.service';

@Component
export default class CardTransactionDetails extends Vue {
  @Inject('cardTransactionService') private cardTransactionService: () => CardTransactionService;
  public cardTransaction: ICardTransaction = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.cardTransactionId) {
        vm.retrieveCardTransaction(to.params.cardTransactionId);
      }
    });
  }

  public retrieveCardTransaction(cardTransactionId) {
    this.cardTransactionService()
      .find(cardTransactionId)
      .then(res => {
        this.cardTransaction = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
