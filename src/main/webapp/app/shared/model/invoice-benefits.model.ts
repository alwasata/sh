import { IBenefit } from '@/shared/model/benefit.model';
import { IInvoice } from '@/shared/model/invoice.model';

export interface IInvoiceBenefits {
  id?: number;
  pointsCost?: number;
  cost?: number;
  quantity?: number;
  total?: number;
  benefit?: IBenefit;
  invoice?: IInvoice;
}

export class InvoiceBenefits implements IInvoiceBenefits {
  constructor(
    public id?: number,
    public pointsCost?: number,
    public cost?: number,
    public quantity?: number,
    public total?: number,
    public benefit?: IBenefit,
    public invoice?: IInvoice
  ) {}
}
