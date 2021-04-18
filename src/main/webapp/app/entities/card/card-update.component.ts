import { Component, Inject, Vue } from 'vue-property-decorator';

import EmployeeService from '../employee/employee.service';
import { IEmployee } from '@/shared/model/employee.model';
import { required, helpers } from 'vuelidate/lib/validators';
export const isPhoneNo = helpers.regex('alpha', /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);

import AlertService from '@/shared/alert/alert.service';
import { Card, ICard } from '@/shared/model/card.model';
import CardService from './card.service';
import AccountService from '@/account/account.service';

const validations: any = {
  card: {
    cardNo: {},
    expiryDate: {},
    isActive: {},
    employee: { required },
  },
};

@Component({
  validations,
})
export default class CardUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  public card: ICard = new Card();

  @Inject('cardService') private cardService: () => CardService;
  @Inject('employeeService') private employeeService: () => EmployeeService;
  @Inject('accountService') private accountService: () => AccountService;

  public employees: IEmployee[] = [];
  public isSaving = false;
  public currentLanguage = '';
  public expiryDateType = 'month';
  public error = '';

  public isUpdate = false;

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
    if (this.card.id) {
      this.cardService()
        .update(this.card)
        .then(param => {
          if (param.code == 'ER_DUP_ENTRY') {
            this.error = ' مستخدم مسبقا ' + param.message.split("'")[1];
            (document.getElementById('alert-danger') as HTMLDivElement).hidden = false;
          } else {
            this.isSaving = false;
            this.$router.go(-1);
            const message = 'A Card is updated with identifier ' + param.id;
            this.alertService().showAlert(message, 'info');
          }
        });
    } else {
      this.card.expiryDate = new Date();
      switch (this.expiryDateType) {
        case 'month':
          this.card.expiryDate.setMonth(this.card.expiryDate.getUTCMonth() + 1);
          break;
        case 'sixMonths':
          this.card.expiryDate.setMonth(this.card.expiryDate.getMonth() + 6);
          break;
        case 'year':
          this.card.expiryDate.setFullYear(this.card.expiryDate.getFullYear() + 1);
          break;
      }
      this.card.expiryDate = this.card.expiryDate.toISOString().slice(0, 10);
      this.cardService()
        .create(this.card)
        .then(param => {
          this.error = '';
          if (param.code == 'ER_DUP_ENTRY') {
            this.error = ' مستخدم مسبقا ' + param.message.split("'")[1];
            (document.getElementById('alert-danger') as HTMLDivElement).hidden = false;
          } else {
            this.isSaving = false;
            this.$router.go(-1);
            const message = 'A Card is created with identifier ' + param.id;
            this.alertService().showAlert(message, 'success');
          }
        });
    }
  }

  public retrieveCard(cardId): void {
    this.cardService()
      .find(cardId)
      .then(res => {
        this.card = res.card;
        this.isUpdate = true;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
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
  public initRelationships(): void {
    this.employeeService()
      .retrieve()
      .then(res => {
        this.employees = res.data;
      });
  }
}
