import { Component, Inject, Vue } from 'vue-property-decorator';

import BenefitService from '../benefit/benefit.service';
import { IBenefit } from '@/shared/model/benefit.model';

import InvoiceService from '../invoice/invoice.service';
import { IInvoice } from '@/shared/model/invoice.model';

import AlertService from '@/shared/alert/alert.service';
import { IInvoiceBenefits, InvoiceBenefits } from '@/shared/model/invoice-benefits.model';
import InvoiceBenefitsService from './invoice-benefits.service';

const validations: any = {
  invoiceBenefits: {
    pointsCost: {},
    cost: {},
    quantity: {},
    total: {},
  },
};

@Component({
  validations,
})
export default class InvoiceBenefitsUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('invoiceBenefitsService') private invoiceBenefitsService: () => InvoiceBenefitsService;
  public invoiceBenefits: IInvoiceBenefits = new InvoiceBenefits();

  @Inject('benefitService') private benefitService: () => BenefitService;

  public benefits: IBenefit[] = [];

  @Inject('invoiceService') private invoiceService: () => InvoiceService;

  public invoices: IInvoice[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.invoiceBenefitsId) {
        vm.retrieveInvoiceBenefits(to.params.invoiceBenefitsId);
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
    if (this.invoiceBenefits.id) {
      this.invoiceBenefitsService()
        .update(this.invoiceBenefits)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A InvoiceBenefits is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.invoiceBenefitsService()
        .create(this.invoiceBenefits)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A InvoiceBenefits is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveInvoiceBenefits(invoiceBenefitsId): void {
    this.invoiceBenefitsService()
      .find(invoiceBenefitsId)
      .then(res => {
        this.invoiceBenefits = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.benefitService()
      .retrieve('false')
      .then(res => {
        this.benefits = res.data;
      });
    this.invoiceService()
      .retrieve('false')
      .then(res => {
        this.invoices = res.data;
      });
  }
}
