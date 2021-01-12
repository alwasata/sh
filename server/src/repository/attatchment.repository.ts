import { EntityRepository, Repository } from 'typeorm';
import { Attatchment } from '../domain/attatchment.entity';

@EntityRepository(Attatchment)
export class AttatchmentRepository extends Repository<Attatchment> {}
