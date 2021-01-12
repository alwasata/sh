import { EntityRepository, Repository } from 'typeorm';
import { InvoiceBenefits } from '../domain/invoice-benefits.entity';

@EntityRepository(InvoiceBenefits)
export class InvoiceBenefitsRepository extends Repository<InvoiceBenefits> {}
