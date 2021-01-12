export interface IInvoiceBenefits {
  id?: number;
  pointsCost?: number;
  cost?: number;
  quantity?: number;
  total?: number;
  benefitNameAr?: string;
  benefitId?: number;
  invoiceInvoiceNo?: string;
  invoiceId?: number;
}

export class InvoiceBenefits implements IInvoiceBenefits {
  constructor(
    public id?: number,
    public pointsCost?: number,
    public cost?: number,
    public quantity?: number,
    public total?: number,
    public benefitNameAr?: string,
    public benefitId?: number,
    public invoiceInvoiceNo?: string,
    public invoiceId?: number
  ) {}
}
