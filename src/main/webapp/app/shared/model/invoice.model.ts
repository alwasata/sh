import { ICardTransaction } from '@/shared/model/card-transaction.model';
import { Double } from 'typeorm';

export const enum InvoiceStatus {
  APPROVED = 'APPROVED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED',
  PENDING = 'PENDING',
}

export interface IInvoice {
  id?: number;
  invoiceNo?: string;
  invoiceDate?: string;
  payDate?: string;
  total?: number;
  totalPoints?: Double;
  mainInvoice?: Double;
  invoiceStatus?: InvoiceStatus;
  notes?: string;
  cardTransaction?: ICardTransaction;
  moamalatId?: string;
}

export class Invoice implements IInvoice {
  constructor(
    public id?: number,
    public invoiceNo?: string,
    public invoiceDate?: string,
    public payDate?: string,
    public total?: number,
    public totalPoints?: Double,
    public mainInvoice?: Double,
    public invoiceStatus?: InvoiceStatus,
    public notes?: string,
    public cardTransaction?: ICardTransaction,
    public moamalatId?: string
  ) {}
}
