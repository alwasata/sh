import { Component, Inject, Vue } from 'vue-property-decorator';

import { required, helpers, decimal } from 'vuelidate/lib/validators';

import CategoryService from '../category/category.service';
import { ICategory } from '@/shared/model/category.model';

import HospitalService from '../hospital/hospital.service';
import { IHospital } from '@/shared/model/hospital.model';

import AlertService from '@/shared/alert/alert.service';
import { Benefit, IBenefit } from '@/shared/model/benefit.model';
import BenefitService from './benefit.service';
import AccountService from '@/account/account.service';

export const isArabic = helpers.regex('alpha', /[\u0600-\u06FF]/);
export const isEnglish = helpers.regex('alpha', /[a-zA-Z]/);
export const isPhoneNo = helpers.regex('alpha', /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
export const positave = helpers.regex('alpha', /^(?!0*[.,]0*$|[.,]0*$|0*$)\d+[,.]?\d{0,2}$/);

const validations: any = {
  benefit: {
    nameAr: {
      required,
      isArabic,
    },
    nameEn: {
      required,
      isEnglish,
    },
    // pointsCost: {},
    cost: {
      required,
      decimal,
      positave,
    },
    category: {
      required,
    },
    hospital: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class BenefitUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('benefitService') private benefitService: () => BenefitService;
  public benefit: IBenefit = new Benefit();

  @Inject('categoryService') private categoryService: () => CategoryService;

  @Inject('accountService') private accountService: () => AccountService;
  private hasAnyAuthorityValue = false;

  public categories: ICategory[] = [];

  @Inject('hospitalService') private hospitalService: () => HospitalService;

  public hospitals: IHospital[] = [];
  public isSaving = false;
  public currentLanguage = '';
  public error = '';
  public isUpdate = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.benefitId) {
        console.log(to.params);
        vm.retrieveBenefit(to.params.benefitId);
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
    if (this.benefit.id) {
      this.benefitService()
        .update(this.benefit)
        .then(param => {
          if (param.code == 'ER_DUP_ENTRY') {
            this.error = ' مستخدم مسبقا ' + param.message.split("'")[1];
            (document.getElementById('alert-danger') as HTMLDivElement).hidden = false;
          } else {
            this.isSaving = false;
            this.$router.go(-1);
            const message = 'A Benefit is updated with identifier ' + param.id;
            this.alertService().showAlert(message, 'info');
          }
        });
    } else {
      this.benefitService()
        .create(this.benefit)
        .then(param => {
          if (param.code == 'ER_DUP_ENTRY') {
            this.error = ' مستخدم مسبقا ' + param.message.split("'")[1];
            (document.getElementById('alert-danger') as HTMLDivElement).hidden = false;
          } else {
            this.isSaving = false;
            this.$router.go(-1);
            const message = 'A Benefit is created with identifier ' + param.id;
            this.alertService().showAlert(message, 'success');
          }
        });
    }
  }

  public retrieveBenefit(benefitId): void {
    this.benefitService()
      .find(benefitId)
      .then(res => {
        this.benefit = res;
        this.isUpdate = true;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.categoryService()
      .retrieve()
      .then(res => {
        this.categories = res.data;
      });
    this.hospitalService()
      .getActive()
      .then(res => {
        console.log(res);
        this.hospitals = res.data;
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
