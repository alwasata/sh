import { IUser } from '@/shared/model/user.model';

export interface IHospital {
  id?: number;
  nameAr?: string;
  nameEn?: string;
  email?: string;
  phone?: string;
  address?: string;
  users?: IUser[];
}

export class Hospital implements IHospital {
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
