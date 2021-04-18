import { Component, Inject, Vue } from 'vue-property-decorator';

import { required, helpers, email } from 'vuelidate/lib/validators';
export const isArabic = helpers.regex('alpha', /[\u0600-\u06FF]/);
export const isEnglish = helpers.regex('alpha', /[a-zA-Z]/);
export const isPhoneNo = helpers.regex('alpha', /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);

import UserService from '@/admin/user-management/user-management.service';

import AlertService from '@/shared/alert/alert.service';
import { Hospital, IHospital } from '@/shared/model/hospital.model';
import HospitalService from './hospital.service';

const validations: any = {
  hospital: {
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
    phoneSecond: {
      isPhoneNo,
    },
    phoneThird: {
      isPhoneNo,
    },
    address: {
      required,
    },
    notes: {
      required,
    },
    type: {
      required,
    },
    lat: {
      required,
    },
    lng: {
      required,
    },
    city: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class HospitalUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('hospitalService') private hospitalService: () => HospitalService;
  public hospital: IHospital = new Hospital();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];
  public isSaving = false;
  public currentLanguage = '';
  public error = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.hospitalId) {
        vm.retrieveHospital(to.params.hospitalId);
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
    this.hospital.users = [];
  }

  public save(): void {
    document.getElementById('error').innerHTML = '';
    if (this.hospital.id) {
      this.hospitalService()
        .update(this.hospital)
        .then(param => {
          if (param.code == 'ER_DUP_ENTRY') {
            this.error = ' مستخدم مسبقا ' + param.message.split("'")[1];
            (document.getElementById('alert-danger') as HTMLDivElement).hidden = false;
            document.getElementById('error').innerHTML = 'هناك خطاء في ادخال البيانات ارجو التاكد';
          } else {
            this.isSaving = false;
            this.$router.go(-1);
            const message = 'A Hospital is updated with identifier ' + param.id;
            this.alertService().showAlert(message, 'info');
          }
        });
    } else {
      this.hospitalService()
        .create(this.hospital)
        .then(param => {
          if (param.code == 'ER_DUP_ENTRY') {
            this.error = ' مستخدم مسبقا ' + param.message.split("'")[1];
            (document.getElementById('alert-danger') as HTMLDivElement).hidden = false;
            document.getElementById('error').innerHTML = 'هناك خطاء في ادخال البيانات ارجو التاكد';
          } else {
            this.isSaving = false;
            this.$router.go(-1);
            const message = 'A Hospital is created with identifier ' + param.id;
            this.alertService().showAlert(message, 'success');
          }
        });
    }
  }

  public retrieveHospital(hospitalId): void {
    this.hospitalService()
      .find(hospitalId)
      .then(res => {
        this.hospital = res;
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
