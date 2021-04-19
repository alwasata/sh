import { Component, Inject, Vue } from 'vue-property-decorator';

import EmployeeService from '../employee/employee.service';
import { IEmployee } from '@/shared/model/employee.model';

import AlertService from '@/shared/alert/alert.service';
import { Card, ICard } from '@/shared/model/card.model';
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
  public points = 1;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.cardId) {
        vm.retrieveCard(to.params.cardId);
      }
      vm.initRelationships();
    });
  }

  public charge(): void {
    this.cardService()
      .charge({ card: this.card, points: this.points })
      .then(param => {
        console.log(param);
        this.$router.go(-1);
        const message = 'تم شحن  البطاقة رقم : ' + param.cardNo;
        this.alertService().showAlert(message, 'success');
      });
  }

  public retrieveCard(cardId): void {
    this.cardService()
      .find(cardId)
      .then(res => {
        this.card = res.card;
        console.log(res);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.employeeService()
      .retrieve('false')
      .then(res => {
        this.employees = res.data;
      });
  }
}
