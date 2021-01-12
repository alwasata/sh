import { IUser } from 'app/core/user/user.model';

export interface ICompany {
  id?: number;
  nameAr?: string;
  nameEn?: string;
  email?: string;
  phone?: string;
  address?: string;
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
    public users?: IUser[]
  ) {}
}
