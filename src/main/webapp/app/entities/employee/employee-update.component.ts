import { Component, Inject, Vue } from 'vue-property-decorator';

import { ICompany } from '@/shared/model/company.model';
import { Attatchment, IAttatchment } from '@/shared/model/attatchment.model';
import { Employee, IEmployee } from '@/shared/model/employee.model';

import AlertMixin from '@/shared/alert/alert.mixin';

import AlertService from '@/shared/alert/alert.service';
import CompanyService from '../company/company.service';
import EmployeeService from './employee.service';
import AttatchmentService from '../attatchment/attatchment.service';
import AccountService from '@/account/account.service';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { required, helpers } from 'vuelidate/lib/validators';
export const isEnglish = helpers.regex('alpha', /[a-zA-Z]/);
export const isPhoneNo = helpers.regex('alpha', /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);

import { mixins } from 'vue-class-component';

const validations: any = {
  employee: {
    name: {
      required,
    },
    phone: {
      required,
      isPhoneNo,
    },
    identityNo: {
      required,
    },
    employeeStatus: {},
    notes: {
      required,
    },
  },
  attatchment: {
    name: { required },
    file: { required },
    fileUrl: {},
  },
};

@Component({
  validations,
})
export default class EmployeeUpdate extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('employeeService') private employeeService: () => EmployeeService;
  @Inject('attatchmentService') private attatchmentService: () => AttatchmentService;

  public employee: IEmployee = new Employee();
  public attatchment: IAttatchment = new Attatchment();

  @Inject('companyService') private companyService: () => CompanyService;

  @Inject('accountService') private accountService: () => AccountService;
  private hasAnyAuthorityValue = false;

  public companies: ICompany[] = [];
  public isSaving = false;
  public currentLanguage = '';
  public base = this;
  public error = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.employeeId) {
        vm.retrieveEmployee(to.params.employeeId);
      }
      // console.log(this.hasAnyAuthority("ROLE_ADMIN"))
      // if(this.hasAnyAuthority("ROLE_ADMIN") == undefined) {
      vm.initRelationships();
      // }
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
    if (this.employee.id) {
      this.employeeService()
        .update(this.employee)
        .then(param => {
          if (param.code == 'ER_DUP_ENTRY') {
            this.error = ' مستخدم مسبقا ' + param.message.split("'")[1];
            (document.getElementById('alert-danger') as HTMLDivElement).hidden = false;
          } else {
            this.attatchmentService().update(this.attatchment);
            this.isSaving = false;
            this.$router.go(-1);
            const message = 'A Employee is updated with identifier ' + param.id;
            this.alertService().showAlert(message, 'info');
          }
        });
    } else {
      this.employeeService()
        .create(this.employee)
        .then(param => {
          if (param.code == 'ER_DUP_ENTRY') {
            this.error = ' مستخدم مسبقا ' + param.message.split("'")[1];
            (document.getElementById('alert-danger') as HTMLDivElement).hidden = false;
          } else {
            this.attatchment.employee = param;
            this.attatchmentService().create(this.attatchment);
            this.isSaving = false;
            this.$router.go(-1);
            const message = 'A Employee is created with identifier ' + param.id;
            this.alertService().showAlert(message, 'success');
          }
        });
    }
  }
  public retrieveEmployee(employeeId): void {
    this.employeeService()
      .find(employeeId)
      .then(res => {
        this.employee = res;
        this.attatchmentService()
          .findByEmployee(this.employee.id)
          .then(res => {
            this.attatchment = res;
          });
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.companyService()
      .retrieve('false')
      .then(res => {
        this.companies = res.data;
      });
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
