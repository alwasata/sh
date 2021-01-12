export interface ICategory {
  id?: number;
  nameAr?: string;
  nameEn?: string;
}

export class Category implements ICategory {
  constructor(public id?: number, public nameAr?: string, public nameEn?: string) {}
}
