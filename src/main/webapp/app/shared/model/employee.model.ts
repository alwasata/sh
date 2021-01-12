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
  companyNameAr?: string;
  companyId?: number;
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public name?: string,
    public phone?: string,
    public identityNo?: string,
    public employeeStatus?: EmployeeStatus,
    public notes?: string,
    public companyNameAr?: string,
    public companyId?: number
  ) {}
}
