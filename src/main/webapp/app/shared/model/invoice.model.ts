import { ICardTransaction } from '@/shared/model/card-transaction.model';
import { Double } from 'typeorm';

export const enum InvoiceStatus {
  APPROVED = 'APPROVED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED',
}

export interface IInvoice {
  id?: number;
  invoiceNo?: string;
  invoiceDate?: Date;
  payDate?: Date;
  total?: number;
  totalPoints?: Double;
  mainInvoice?: Double;
  invoiceStatus?: InvoiceStatus;
  notes?: string;
  cardTransaction?: ICardTransaction;
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
    public cardTransaction?: ICardTransaction
  ) {}
}
