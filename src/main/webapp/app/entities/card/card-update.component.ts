import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import EmployeeService from '../employee/employee.service';
import { IEmployee } from '@/shared/model/employee.model';

import AlertService from '@/shared/alert/alert.service';
import { ICard, Card } from '@/shared/model/card.model';
import CardService from './card.service';

const validations: any = {
  card: {
    cardNo: {},
    expiryDate: {},
    isActive: {},
  },
};

@Component({
  validations,
})
export default class CardUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('cardService') private cardService: () => CardService;
  public card: ICard = new Card();

  @Inject('employeeService') private employeeService: () => EmployeeService;

  public employees: IEmployee[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.cardId) {
        vm.retrieveCard(to.params.cardId);
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
    if (this.card.id) {
      this.cardService()
        .update(this.card)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('sahatiApp.card.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.cardService()
        .create(this.card)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('sahatiApp.card.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveCard(cardId): void {
    this.cardService()
      .find(cardId)
      .then(res => {
        this.card = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.employeeService()
      .retrieve()
      .then(res => {
        this.employees = res.data;
      });
  }
}
