import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import EmployeeService from '../employee/employee.service';
import { IEmployee } from '@/shared/model/employee.model';

import AlertService from '@/shared/alert/alert.service';
import { Attatchment, IAttatchment } from '@/shared/model/attatchment.model';
import AttatchmentService from './attatchment.service';

const validations: any = {
  attatchment: {
    name: {},
    file: {},
    fileUrl: {},
  },
};

@Component({
  validations,
})
export default class AttatchmentUpdate extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('attatchmentService') private attatchmentService: () => AttatchmentService;
  public attatchment: IAttatchment = new Attatchment();

  @Inject('employeeService') private employeeService: () => EmployeeService;

  public employees: IEmployee[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.attatchmentId) {
        vm.retrieveAttatchment(to.params.attatchmentId);
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
    // this.isSaving = true;
    if (this.attatchment.id) {
      this.attatchmentService()
        .update(this.attatchment)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Attatchment is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      console.log(this.attatchment);
      this.attatchmentService()
        .create(this.attatchment)
        .then(param => {
          // this.isSaving = false;
          // this.$router.go(-1);
          // const message = 'A Attatchment is created with identifier ' + param.id;
          // this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveAttatchment(attatchmentId): void {
    this.attatchmentService()
      .find(attatchmentId)
      .then(res => {
        this.attatchment = res;
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
