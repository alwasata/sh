import { IUser } from '@/shared/model/user.model';

export interface ICompany {
  id?: number;
  nameAr?: string;
  nameEn?: string;
  email?: string;
  phone?: string;
  activityType?: string;
  jurisdiction?: string;
  city?: string;
  lat?: string;
  lng?: string;
  phoneSecond?: string;
  phoneThird?: string;
  address?: string;
  discount?: number;
  fixedDiscount?: number;
  active?: boolean;
  users?: IUser[];
}

export class Company implements ICompany {
  constructor(
    public id?: number,
    public nameAr?: string,
    public nameEn?: string,
    public email?: string,
    public activityType?: string,
    public jurisdiction?: string,
    public city?: string,
    public lat?: string,
    public lng?: string,
    public phone?: string,
    public phoneSecond?: string,
    public phoneThird?: string,
    public address?: string,
    public discount?: number,
    public fixedDiscount?: number,
    public active?: boolean,
    public users?: IUser[]
  ) {}
}
