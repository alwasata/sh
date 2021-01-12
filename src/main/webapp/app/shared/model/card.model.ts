export interface ICard {
  id?: number;
  cardNo?: string;
  expiryDate?: Date;
  isActive?: boolean;
  employeeName?: string;
  employeeId?: number;
}

export class Card implements ICard {
  constructor(
    public id?: number,
    public cardNo?: string,
    public expiryDate?: Date,
    public isActive?: boolean,
    public employeeName?: string,
    public employeeId?: number
  ) {
    this.isActive = this.isActive || false;
  }
}
