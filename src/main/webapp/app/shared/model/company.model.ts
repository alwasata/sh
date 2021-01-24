import { IUser } from '@/shared/model/user.model';

export interface ICompany {
  id?: number;
  nameAr?: string;
  nameEn?: string;
  email?: string;
  phone?: string;
  address?: string;
  discount?: number;
  fixedDiscount?: number;
  users?: IUser[];
}

export class Company implements ICompany {
  constructor(
    public id?: number,
    public nameAr?: string,
    public nameEn?: string,
    public email?: string,
    public phone?: string,
    public address?: string,
    public discount?: number,
    public fixedDiscount?: number,
    public users?: IUser[]
  ) {}
}
