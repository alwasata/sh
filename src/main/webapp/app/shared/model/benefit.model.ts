import { ICategory } from '@/shared/model/category.model';
import { IHospital } from '@/shared/model/hospital.model';

export interface IBenefit {
  id?: number;
  nameAr?: string;
  nameEn?: string;
  // pointsCost?: number;
  cost?: number;
  category?: ICategory;
  hospital?: IHospital;
}

export class Benefit implements IBenefit {
  constructor(
    public id?: number,
    public nameAr?: string,
    public nameEn?: string,
    // public pointsCost?: number,
    public cost?: number,
    public category?: ICategory,
    public hospital?: IHospital
  ) {}
}
