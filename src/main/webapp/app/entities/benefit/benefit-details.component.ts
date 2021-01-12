import { Component, Vue, Inject } from 'vue-property-decorator';

import { IBenefit } from '@/shared/model/benefit.model';
import BenefitService from './benefit.service';

@Component
export default class BenefitDetails extends Vue {
  @Inject('benefitService') private benefitService: () => BenefitService;
  public benefit: IBenefit = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.benefitId) {
        vm.retrieveBenefit(to.params.benefitId);
      }
    });
  }

  public retrieveBenefit(benefitId) {
    this.benefitService()
      .find(benefitId)
      .then(res => {
        this.benefit = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
