import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import CompanyService from '../company/company.service';
import { ICompany } from '@/shared/model/company.model';

import AlertService from '@/shared/alert/alert.service';
import { IEmployee, Employee } from '@/shared/model/employee.model';
import EmployeeService from './employee.service';

const validations: any = {
  employee: {
    name: {},
    phone: {},
    identityNo: {},
    employeeStatus: {},
    notes: {},
  },
};

@Component({
  validations,
})
export default class EmployeeUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('employeeService') private employeeService: () => EmployeeService;
  public employee: IEmployee = new Employee();

  @Inject('companyService') private companyService: () => CompanyService;

  public companies: ICompany[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.employeeId) {
        vm.retrieveEmployee(to.params.employeeId);
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
    if (this.employee.id) {
      this.employeeService()
        .update(this.employee)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('sahatiApp.employee.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.employeeService()
        .create(this.employee)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('sahatiApp.employee.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveEmployee(employeeId): void {
    this.employeeService()
      .find(employeeId)
      .then(res => {
        this.employee = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.companyService()
      .retrieve()
      .then(res => {
        this.companies = res.data;
      });
  }
}
