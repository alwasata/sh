import { Component, Vue, Inject } from 'vue-property-decorator';

import { IInvoiceBenefits } from '@/shared/model/invoice-benefits.model';
import InvoiceBenefitsService from './invoice-benefits.service';

@Component
export default class InvoiceBenefitsDetails extends Vue {
  @Inject('invoiceBenefitsService') private invoiceBenefitsService: () => InvoiceBenefitsService;
  public invoiceBenefits: IInvoiceBenefits = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.invoiceBenefitsId) {
        vm.retrieveInvoiceBenefits(to.params.invoiceBenefitsId);
      }
    });
  }

  public retrieveInvoiceBenefits(invoiceBenefitsId) {
    this.invoiceBenefitsService()
      .find(invoiceBenefitsId)
      .then(res => {
        this.invoiceBenefits = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
