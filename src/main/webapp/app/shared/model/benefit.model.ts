import { ICategory } from '@/shared/model/category.model';
import { IHospital } from '@/shared/model/hospital.model';

export interface IBenefit {
  id?: number;
  nameAr?: string;
  nameEn?: string;
  // pointsCost?: number;
  cost?: number;
  active?: boolean;
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
    public active?: boolean,
    public category?: ICategory,
    public hospital?: IHospital
  ) {}
}
