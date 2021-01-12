/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Company } from './company.entity';
import { EmployeeStatus } from './enumeration/employee-status';

/**
 * A Employee.
 */
@Entity('employee')
export class Employee extends BaseEntity {
    @Column({ name: 'name', nullable: true })
    name: string;

    @Column({ name: 'phone', nullable: true })
    phone: string;

    @Column({ name: 'identity_no', nullable: true })
    identityNo: string;

    @Column({ type: 'simple-enum', name: 'employee_status', enum: EmployeeStatus })
    employeeStatus: EmployeeStatus;

    @Column({ name: 'notes', nullable: true })
    notes: string;

    @ManyToOne(type => Company)
    company: Company;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
