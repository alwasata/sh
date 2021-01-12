export interface IBenefit {
  id?: number;
  nameAr?: string;
  nameEn?: string;
  pointsCost?: number;
  cost?: number;
  categoryNameAr?: string;
  categoryId?: number;
  hospitalNameAr?: string;
  hospitalId?: number;
}

export class Benefit implements IBenefit {
  constructor(
    public id?: number,
    public nameAr?: string,
    public nameEn?: string,
    public pointsCost?: number,
    public cost?: number,
    public categoryNameAr?: string,
    public categoryId?: number,
    public hospitalNameAr?: string,
    public hospitalId?: number
  ) {}
}
