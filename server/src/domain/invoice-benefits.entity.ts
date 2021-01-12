/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Benefit } from './benefit.entity';
import { Invoice } from './invoice.entity';

/**
 * A InvoiceBenefits.
 */
@Entity('invoice_benefits')
export class InvoiceBenefits extends BaseEntity {
    @Column({ type: 'float', name: 'points_cost', nullable: true })
    pointsCost: number;

    @Column({ type: 'float', name: 'cost', nullable: true })
    cost: number;

    @Column({ type: 'integer', name: 'quantity', nullable: true })
    quantity: number;

    @Column({ type: 'float', name: 'total', nullable: true })
    total: number;

    @ManyToOne(type => Benefit)
    benefit: Benefit;

    @ManyToOne(type => Invoice)
    invoice: Invoice;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
