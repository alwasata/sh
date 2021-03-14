export interface ISetting {
  id?: number;
  key?: string;
  value?: string;
}

export class Setting implements ISetting {
  constructor(public id?: number, public key?: string, public value?: string) {}
}
