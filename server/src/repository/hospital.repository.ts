import { EntityRepository, Repository } from 'typeorm';
import { Hospital } from '../domain/hospital.entity';

@EntityRepository(Hospital)
export class HospitalRepository extends Repository<Hospital> {}
