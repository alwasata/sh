import { IUser } from '@/shared/model/user.model';

export interface IHospital {
  id?: number;
  nameAr?: string;
  nameEn?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  lat?: string;
  lng?: string;
  phoneSecond?: string;
  phoneThird?: string;
  type?: string;
  notes?: string;
  active?: boolean;
  users?: IUser[];
}

export class Hospital implements IHospital {
  constructor(
    public id?: number,
    public nameAr?: string,
    public nameEn?: string,
    public email?: string,
    public phone?: string,
    public active?: boolean,
    public address?: string,
    public city?: string,
    public lat?: string,
    public lng?: string,
    public phoneSecond?: string,
    public phoneThird?: string,
    public type?: string,
    public notes?: string,
    public users?: IUser[]
  ) {}
}
