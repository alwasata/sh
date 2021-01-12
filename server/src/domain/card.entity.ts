/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Employee } from './employee.entity';

/**
 * A Card.
 */
@Entity('card')
export class Card extends BaseEntity {
    @Column({ name: 'card_no', nullable: true })
    cardNo: string;

    @Column({ type: 'date', name: 'expiry_date', nullable: true })
    expiryDate: any;

    @Column({ type: 'boolean', name: 'is_active', nullable: true })
    isActive: boolean;

    @ManyToOne(type => Employee)
    employee: Employee;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
