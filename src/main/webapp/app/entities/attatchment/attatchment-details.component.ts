import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { IAttatchment } from '@/shared/model/attatchment.model';
import AttatchmentService from './attatchment.service';

@Component
export default class AttatchmentDetails extends mixins(JhiDataUtils) {
  @Inject('attatchmentService') private attatchmentService: () => AttatchmentService;
  public attatchment: IAttatchment = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.attatchmentId) {
        vm.retrieveAttatchment(to.params.attatchmentId);
      }
    });
  }

  public retrieveAttatchment(attatchmentId) {
    this.attatchmentService()
      .find(attatchmentId)
      .then(res => {
        this.attatchment = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
