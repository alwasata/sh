import { BenefitStatus } from 'app/shared/model/enumerations/benefit-status.model';

export interface IBenefitRequest {
  id?: number;
  nameAr?: string;
  nameEn?: string;
  pointsCost?: number;
  cost?: number;
  benefitStatus?: BenefitStatus;
  notes?: string;
  categoryNameAr?: string;
  categoryId?: number;
  hospitalNameAr?: string;
  hospitalId?: number;
  benefitNameAr?: string;
  benefitId?: number;
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
    public categoryNameAr?: string,
    public categoryId?: number,
    public hospitalNameAr?: string,
    public hospitalId?: number,
    public benefitNameAr?: string,
    public benefitId?: number
  ) {}
}
