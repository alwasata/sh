import { Component, Inject, Vue } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { ISetting, Setting } from '@/shared/model/setting.model';
import SettingService from './setting.service';

const validations: any = {
  setting: {
    key: {
      required,
    },
    value: {},
  },
};

@Component({
  validations,
})
export default class SettingUpdate extends Vue {
  public setting: ISetting = new Setting();
  public isSaving = false;
  public currentLanguage = '';
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('settingService') private settingService: () => SettingService;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.settingId) {
        vm.retrieveSetting(to.params.settingId);
      }
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
    if (this.setting.id) {
      this.settingService()
        .update(this.setting)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Setting is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.settingService()
        .create(this.setting)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Setting is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveSetting(settingId): void {
    this.settingService()
      .find(settingId)
      .then(res => {
        this.setting = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
