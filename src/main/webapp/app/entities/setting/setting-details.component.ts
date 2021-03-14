import { Component, Inject, Vue } from 'vue-property-decorator';

import { ISetting } from '@/shared/model/setting.model';
import SettingService from './setting.service';

@Component
export default class SettingDetails extends Vue {
  public setting: ISetting = {};
  @Inject('settingService') private settingService: () => SettingService;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.settingId) {
        vm.retrieveSetting(to.params.settingId);
      }
    });
  }

  public retrieveSetting(settingId) {
    this.settingService()
      .find(settingId)
      .then(res => {
        this.setting = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
