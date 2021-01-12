import { IEmployee } from '@/shared/model/employee.model';

export interface IAttatchment {
  id?: number;
  name?: string;
  fileContentType?: string;
  file?: any;
  fileUrl?: string;
  employeeName?: string;
  employeeId?: number;
  employee?: IEmployee;
}

export class Attatchment implements IAttatchment {
  constructor(
    public id?: number,
    public name?: string,
    public fileContentType?: string,
    public file?: any,
    public fileUrl?: string,
    public employeeName?: string,
    public employeeId?: number,
    public employee?: IEmployee
  ) {}
}
