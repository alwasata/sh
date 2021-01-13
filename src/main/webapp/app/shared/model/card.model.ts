import { IEmployee } from '@/shared/model/employee.model';

export interface ICard {
  id?: number;
  cardNo?: string;
  expiryDate?: Date;
  isActive?: boolean;
  employee?: IEmployee;
}

export class Card implements ICard {
  constructor(
    public id?: number,
    public cardNo?: string,
    public expiryDate?: Date,
    public isActive?: boolean,
    public employee?: IEmployee
  ) {
    this.isActive = this.isActive || false;
  }
}
