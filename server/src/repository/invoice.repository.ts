import { EntityRepository, Repository } from 'typeorm';
import { Invoice } from '../domain/invoice.entity';

@EntityRepository(Invoice)
export class InvoiceRepository extends Repository<Invoice> {}
