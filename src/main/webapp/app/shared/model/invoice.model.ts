export const enum InvoiceStatus {
  APPROVED = 'APPROVED',
  CANCELLED = 'CANCELLED',
}

export interface IInvoice {
  id?: number;
  invoiceNo?: string;
  invoiceDate?: Date;
  payDate?: Date;
  total?: number;
  invoiceStatus?: InvoiceStatus;
  notes?: string;
  cardTransactionId?: number;
}

export class Invoice implements IInvoice {
  constructor(
    public id?: number,
    public invoiceNo?: string,
    public invoiceDate?: Date,
    public payDate?: Date,
    public total?: number,
    public invoiceStatus?: InvoiceStatus,
    public notes?: string,
    public cardTransactionId?: number
  ) {}
}
