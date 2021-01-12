/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Employee } from './employee.entity';

/**
 * A Attatchment.
 */
@Entity('attatchment')
export class Attatchment extends BaseEntity {
    @Column({ name: 'name', nullable: true })
    name: string;

    @Column({ type: 'blob', name: 'file', nullable: true })
    file: any;

    @Column({ name: 'file_content_type', nullable: true })
    fileContentType: string;
    @Column({ name: 'file_url', nullable: true })
    fileUrl: string;

    @ManyToOne(type => Employee)
    employee: Employee;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
