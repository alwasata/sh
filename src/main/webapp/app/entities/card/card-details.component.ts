import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICard } from '@/shared/model/card.model';
import CardService from './card.service';

@Component
export default class CardDetails extends Vue {
  @Inject('cardService') private cardService: () => CardService;
  public card: ICard = {};
  public points = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.cardId) {
        vm.retrieveCard(to.params.cardId);
      }
    });
  }

  public retrieveCard(cardId) {
    this.cardService()
      .find(cardId)
      .then(res => {
        this.card = res.card;
        this.points = res.points;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
