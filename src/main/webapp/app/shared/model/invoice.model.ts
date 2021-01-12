import { Moment } from 'moment';
import { InvoiceStatus } from 'app/shared/model/enumerations/invoice-status.model';

export interface IInvoice {
  id?: number;
  invoiceNo?: string;
  invoiceDate?: Moment;
  payDate?: Moment;
  total?: number;
  invoiceStatus?: InvoiceStatus;
  notes?: string;
  cardTransactionId?: number;
}

export class Invoice implements IInvoice {
  constructor(
    public id?: number,
    public invoiceNo?: string,
    public invoiceDate?: Moment,
    public payDate?: Moment,
    public total?: number,
    public invoiceStatus?: InvoiceStatus,
    public notes?: string,
    public cardTransactionId?: number
  ) {}
}
