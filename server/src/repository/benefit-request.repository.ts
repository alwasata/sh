import { EntityRepository, Repository } from 'typeorm';
import { BenefitRequest } from '../domain/benefit-request.entity';

@EntityRepository(BenefitRequest)
export class BenefitRequestRepository extends Repository<BenefitRequest> {}
