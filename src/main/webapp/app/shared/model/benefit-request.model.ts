import { ICategory } from '@/shared/model/category.model';
import { IHospital } from '@/shared/model/hospital.model';
import { IBenefit } from '@/shared/model/benefit.model';

export const enum BenefitStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REFUSED = 'REFUSED',
  CANCELLED = 'CANCELLED',
}

export interface IBenefitRequest {
  id?: number;
  nameAr?: string;
  nameEn?: string;
  pointsCost?: number;
  cost?: number;
  benefitStatus?: BenefitStatus;
  notes?: string;
  category?: ICategory;
  hospital?: IHospital;
  benefit?: IBenefit;
}

export class BenefitRequest implements IBenefitRequest {
  constructor(
    public id?: number,
    public nameAr?: string,
    public nameEn?: string,
    public pointsCost?: number,
    public cost?: number,
    public benefitStatus?: BenefitStatus,
    public notes?: string,
    public category?: ICategory,
    public hospital?: IHospital,
    public benefit?: IBenefit
  ) {}
}
