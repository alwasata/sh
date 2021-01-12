import { Component, Vue, Inject } from 'vue-property-decorator';

import { IBenefitRequest } from '@/shared/model/benefit-request.model';
import BenefitRequestService from './benefit-request.service';

@Component
export default class BenefitRequestDetails extends Vue {
  @Inject('benefitRequestService') private benefitRequestService: () => BenefitRequestService;
  public benefitRequest: IBenefitRequest = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.benefitRequestId) {
        vm.retrieveBenefitRequest(to.params.benefitRequestId);
      }
    });
  }

  public retrieveBenefitRequest(benefitRequestId) {
    this.benefitRequestService()
      .find(benefitRequestId)
      .then(res => {
        this.benefitRequest = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
