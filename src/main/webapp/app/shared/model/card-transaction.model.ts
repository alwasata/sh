import { TransactionAction } from 'app/shared/model/enumerations/transaction-action.model';

export interface ICardTransaction {
  id?: number;
  transactionNo?: string;
  amount?: number;
  pointsAmount?: number;
  action?: TransactionAction;
  notes?: string;
  cardCardNo?: string;
  cardId?: number;
  invoiceId?: number;
}

export class CardTransaction implements ICardTransaction {
  constructor(
    public id?: number,
    public transactionNo?: string,
    public amount?: number,
    public pointsAmount?: number,
    public action?: TransactionAction,
    public notes?: string,
    public cardCardNo?: string,
    public cardId?: number,
    public invoiceId?: number
  ) {}
}
