import { ICompany } from '@/shared/model/company.model';

export const enum EmployeeStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REFUSED = 'REFUSED',
  CANCELLED = 'CANCELLED',
}

export interface IEmployee {
  id?: number;
  name?: string;
  phone?: string;
  identityNo?: string;
  employeeStatus?: EmployeeStatus;
  notes?: string;
  company?: ICompany;
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public name?: string,
    public phone?: string,
    public identityNo?: string,
    public employeeStatus?: EmployeeStatus,
    public notes?: string,
    public company?: ICompany
  ) {}
}
