import { IEmployee } from '@/shared/model/employee.model';
import { IUser } from '@/shared/model/user.model';

export interface ICard {
  id?: number;
  cardNo?: string;
  expiryDate?: any;
  createdBy?: IUser;
  isActive?: boolean;
  employee?: IEmployee;
}

export class Card implements ICard {
  constructor(
    public id?: number,
    public cardNo?: string,
    public expiryDate?: any,
    public createdBy?: IUser,
    public isActive?: boolean,
    public employee?: IEmployee
  ) {
    this.isActive = this.isActive || false;
  }
}
