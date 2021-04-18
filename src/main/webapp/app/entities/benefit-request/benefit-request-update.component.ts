import { Component, Inject, Vue } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import CategoryService from '../category/category.service';
import { ICategory } from '@/shared/model/category.model';

import HospitalService from '../hospital/hospital.service';
import { IHospital } from '@/shared/model/hospital.model';

import BenefitService from '../benefit/benefit.service';
import { Benefit, IBenefit } from '@/shared/model/benefit.model';

import AlertService from '@/shared/alert/alert.service';
import { BenefitRequest, BenefitStatus, IBenefitRequest } from '@/shared/model/benefit-request.model';
import BenefitRequestService from './benefit-request.service';
import AccountService from '@/account/account.service';

const validations: any = {
  benefitRequest: {
    nameAr: {
      required,
    },
    nameEn: {},
    pointsCost: {},
    cost: {},
    benefitStatus: {},
    notes: {},
  },
};

@Component({
  validations,
})
export default class BenefitRequestUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('benefitRequestService') private benefitRequestService: () => BenefitRequestService;
  public benefitRequest: IBenefitRequest = new BenefitRequest();

  @Inject('categoryService') private categoryService: () => CategoryService;

  public categories: ICategory[] = [];

  @Inject('accountService') private accountService: () => AccountService;
  private hasAnyAuthorityValue = false;

  @Inject('hospitalService') private hospitalService: () => HospitalService;

  public hospitals: IHospital[] = [];

  @Inject('benefitService') private benefitService: () => BenefitService;

  public benefits: IBenefit[] = [];
  public benefit: IBenefit = new Benefit();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.benefitRequestId) {
        vm.retrieveBenefitRequest(to.params.benefitRequestId);
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
    if (this.benefitRequest.id) {
      this.benefit = this.benefitRequest.benefit;
      if (this.benefitRequest.benefitStatus == BenefitStatus.REFUSED || this.benefitRequest.benefitStatus == BenefitStatus.CANCELLED) {
        this.benefit.active = false;
      } else {
        this.benefit.active = true;
      }
      this.benefitService().update(this.benefit);
      this.benefitRequestService()
        .update(this.benefitRequest)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A BenefitRequest is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.benefitRequestService()
        .create(this.benefitRequest)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A BenefitRequest is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveBenefitRequest(benefitRequestId): void {
    this.benefitRequestService()
      .find(benefitRequestId)
      .then(res => {
        this.benefitRequest = res;
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
      .retrieve()
      .then(res => {
        this.hospitals = res.data;
      });
    this.benefitService()
      .retrieve()
      .then(res => {
        this.benefits = res.data;
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
