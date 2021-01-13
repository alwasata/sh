import { ICard } from '@/shared/model/card.model';
import { IInvoice } from '@/shared/model/invoice.model';

export const enum TransactionAction {
  PLUS = 'PLUS',
  MINUS = 'MINUS',
}

export interface ICardTransaction {
  id?: number;
  transactionNo?: string;
  amount?: number;
  pointsAmount?: number;
  action?: TransactionAction;
  notes?: string;
  card?: ICard;
  invoice?: IInvoice;
}

export class CardTransaction implements ICardTransaction {
  constructor(
    public id?: number,
    public transactionNo?: string,
    public amount?: number,
    public pointsAmount?: number,
    public action?: TransactionAction,
    public notes?: string,
    public card?: ICard,
    public invoice?: IInvoice
  ) {}
}
