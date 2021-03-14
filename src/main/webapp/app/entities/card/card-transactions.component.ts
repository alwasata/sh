import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICardTransaction } from '@/shared/model/card-transaction.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import CardTransactionService from '../card-transaction/card-transaction.service';
import CardService from './card.service';
import { ICard } from '@/shared/model/card.model';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class CardTransaction extends mixins(AlertMixin) {
  @Inject('cardTransactionService') private cardTransactionService: () => CardTransactionService;
  @Inject('cardService') private cardService: () => CardService;

  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;

  public cardTransactions: ICardTransaction[] = [];
  public card: ICard[] = [];
  public cardId = '';

  public isFetching = false;

  public mounted(): void {}

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.cardId) {
        vm.retrieveCard(to.params.cardId);
      }
    });
  }

  public retrieveCard(cardId): void {
    this.cardService()
      .find(cardId)
      .then(res => {
        this.card = res.card;
        this.cardId = res.card.id;
        this.retrieveAllCardTransactions(this.cardId);
      });
  }

  public retrieveAllCardTransactions(cardId): void {
    this.isFetching = true;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.cardTransactionService()
      .getCardTransactionById(cardId, paginationQuery)
      .then(
        res => {
          this.cardTransactions = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
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
    this.retrieveAllCardTransactions(this.cardId);
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
