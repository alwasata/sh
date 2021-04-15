import { Component, Inject, Vue } from 'vue-property-decorator';

import CompanyService from '../company/company.service';
import { ICompany } from '@/shared/model/company.model';
import { Attatchment, IAttatchment } from '@/shared/model/attatchment.model';
import { required, helpers } from 'vuelidate/lib/validators';
export const isEnglish = helpers.regex('alpha', /[a-zA-Z]/);
export const isPhoneNo = helpers.regex('alpha', /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);

import AlertService from '@/shared/alert/alert.service';
import { Employee, IEmployee } from '@/shared/model/employee.model';
import EmployeeService from './employee.service';
import AccountService from '@/account/account.service';
import AlertMixin from '@/shared/alert/alert.mixin';
import JhiDataUtils from '@/shared/data/data-utils.service';
import AttatchmentService from '../attatchment/attatchment.service';

import { mixins } from 'vue-class-component';

const validations: any = {
  employee: {
    name: {
      required,
    },
    phone: {
      required,
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
    name: {},
    file: {},
    fileUrl: {},
  },
};

@Component({
  validations,
})
export default class EmployeeUpdate extends Vue {
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
          const message = 'A Employee is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.employeeService()
        .create(this.employee)
        .then(param => {
          this.attatchment.employee = param;
          this.attatchmentService().create(this.attatchment);
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Employee is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveEmployee(employeeId): void {
    this.employeeService()
      .find(employeeId)
      .then(res => {
        // document.getElementById('img-file').innerHTML = 'يجب ادخال قيمة';
        this.employee = res;
        this.attatchmentService()
          .findByEmployee(this.employee.id)
          .then(res => {
            this.attatchment = res;
            console.log(this.toBase64(this.attatchment.file.data));
            document.getElementById('img-file').innerHTML = 'يجب ادخال قيمة';
            document.getElementById('img-file').innerHTML = `<img >`;
            document.getElementById('img-file').innerHTML = `<img width="200" height="200"  :src="'data:image/jpeg;base64,'${this.toBase64(
              this.attatchment.file.data
            )}" >`;
            console.log(res);
          });
      });
  }

  public toBase64(arr: any): any {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ''));
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

  public retrieveAttatchment(attatchmentId): void {
    this.attatchmentService()
      .find(attatchmentId)
      .then(res => {
        this.attatchment = res;
      });
  }

  public hasAnyAuthority(authorities: any): boolean {
    console.log(authorities);
    this.accountService()
      .hasAnyAuthorityAndCheckAuth(authorities)
      .then(value => {
        this.hasAnyAuthorityValue = value;
      });
    return this.hasAnyAuthorityValue;
  }
}
