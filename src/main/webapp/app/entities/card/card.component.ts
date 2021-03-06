import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICard } from '@/shared/model/card.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import CardService from './card.service';
import CardTransactionService from '../card-transaction/card-transaction.service';
import AccountService from '@/account/account.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Card extends mixins(AlertMixin) {
  @Inject('cardService') private cardService: () => CardService;
  @Inject('cardTransactionService') private cardTransactionService: () => CardTransactionService;
  @Inject('accountService') private accountService: () => AccountService;
  private hasAnyAuthorityValue = false;

  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public cardNo = '';
  public totalItems = 0;
  public search = '';

  public cards: ICard[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllCards(this.search);
  }
  public searchInput(): void {
    this.page = 1;
    this.retrieveAllCards(this.search);
  }
  public clear(): void {
    this.page = 1;
    this.retrieveAllCards(this.search);
  }

  public retrieveAllCards(search): void {
    search = search == '' ? 'false' : search;
    this.isFetching = true;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };

    this.cardService()
      .retrieve(search, paginationQuery)
      .then(
        res => {
          this.cards = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: ICard): void {
    this.removeId = instance.id;
    this.cardNo = instance.cardNo;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeCard(): void {
    this.cardService()
      .delete(this.removeId)
      .then(() => {
        const message = '???? ?????? ?????????????? ?????? : ' + this.cardNo;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.cardNo = '';
        this.retrieveAllCards(this.search);
        this.closeDialog();
      })
      .catch(err => {
        const message = '???? ???????? ?????? ?????? ?????????????? ?????? ' + this.cardNo + ' ?????????? ?????? ?????????? ???????? ???? ?????????? ?????????? ?????????? ??????????????';
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.retrieveAllCards(this.search);
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
    this.retrieveAllCards(this.search);
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.transition();
  }

  public hasRole(roles: any): boolean {
    if (this.userAuthorities() == null) {
      return false;
    }
    for (const element of roles) {
      if (this.$store.getters.account.authorities.includes(element)) {
        return true;
      }
    }
  }

  public userAuthorities() {
    return this.accountService().getAuthorities();
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
  public hasAnyAuthority(authorities: any): boolean {
    this.accountService()
      .hasAnyAuthorityAndCheckAuth(authorities)
      .then(value => {
        this.hasAnyAuthorityValue = value;
      });
    return this.hasAnyAuthorityValue;
  }
}
