/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn,Generated,OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable, Timestamp } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Company } from './company.entity';
import { EmployeeStatus } from './enumeration/employee-status';

/**
 * A Employee.
 */
@Entity('employee')
export class Employee extends BaseEntity {
    @Column({ name: 'name', unique: true })
    name: string;

    @Column({ name: 'phone', unique: true  })
    phone: string;

    @Column({ name: 'identity_no', unique: true  })
    identityNo: string;

    @Column({ type: 'simple-enum', name: 'employee_status', enum: EmployeeStatus })
    employeeStatus: EmployeeStatus;

    @Column({ name: 'notes', nullable: true })
    notes: string;

    @ManyToOne(type => Company)
    company: Company;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
