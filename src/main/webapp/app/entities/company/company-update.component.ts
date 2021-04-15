import { Component, Inject, Vue } from 'vue-property-decorator';

import { required, alpha, helpers, email } from 'vuelidate/lib/validators';
export const isArabic = helpers.regex('alpha', /[\u0600-\u06FF]/);
export const isEnglish = helpers.regex('alpha', /[a-zA-Z]/);
export const isPhoneNo = helpers.regex('alpha', /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);

import UserService from '@/admin/user-management/user-management.service';

import AlertService from '@/shared/alert/alert.service';
import { Company, ICompany } from '@/shared/model/company.model';
import CompanyService from './company.service';

const validations: any = {
  company: {
    nameAr: {
      required,
      isArabic,
    },
    nameEn: {
      required,
      isEnglish,
    },
    email: {
      required,
      email,
    },
    phone: {
      required,
      isPhoneNo,
    },
    address: {
      required,
    },
    discount: {},
    phoneSecond: {
      isPhoneNo,
    },
    phoneThird: {
      isPhoneNo,
    },
    fixedDiscount: {},
    activityType: {},
    jurisdiction: {
      required,
    },
    lng: {},
    lat: {},
    active: {},
    city: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class CompanyUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('companyService') private companyService: () => CompanyService;
  public company: ICompany = new Company();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];
  public isSaving = false;
  public currentLanguage = '';
  public error = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.companyId) {
        vm.retrieveCompany(to.params.companyId);
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
    this.company.users = [];
  }

  public save(): void {
    // this.isSaving = true;
    if (this.company.id) {
      this.companyService()
        .update(this.company)
        .then(param => {
          if (param.code == 'ER_DUP_ENTRY') {
            this.error = ' مستخدم مسبقا ' + param.message.split("'")[1];
            (document.getElementById('alert-danger') as HTMLDivElement).hidden = false;
          } else {
            this.isSaving = false;
            this.$router.go(-1);
            const message = 'A Company is updated with identifier ' + param.id;
            this.alertService().showAlert(message, 'info');
          }
        });
    } else {
      this.companyService()
        .create(this.company)
        .then(param => {
          if (param.code == 'ER_DUP_ENTRY') {
            this.error = ' مستخدم مسبقا ' + param.message.split("'")[1];
            (document.getElementById('alert-danger') as HTMLDivElement).hidden = false;
          } else {
            this.isSaving = false;
            this.$router.go(-1);
            const message = 'A Company is created with identifier ' + param.id;
            this.alertService().showAlert(message, 'success');
          }
        })
        .catch(e => {
          // console.log(e);
        });
    }
  }

  public retrieveCompany(companyId): void {
    this.companyService()
      .find(companyId)
      .then(res => {
        this.company = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
  }

  public nameArTyping(): void {
    var arabic = /[\u0600-\u06FF]/;
    if (!arabic.test(this.company.nameAr)) {
      this.company.nameAr = '';
    }
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
