import { EntityRepository, Repository } from 'typeorm';
import { CardTransaction } from '../domain/card-transaction.entity';

@EntityRepository(CardTransaction)
export class CardTransactionRepository extends Repository<CardTransaction> {}
