/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { CardTransaction } from './card-transaction.entity';
import { Hospital } from './hospital.entity';
import { InvoiceStatus } from './enumeration/invoice-status';

/**
 * A Invoice.
 */
@Entity('invoice')
export class Invoice extends BaseEntity {
    @Column({ name: 'invoice_no', nullable: true })
    invoiceNo: string;

    @Column({ type: 'date', name: 'invoice_date', nullable: true })
    invoiceDate: any;

    @Column({ type: 'date', name: 'pay_date', nullable: true })
    payDate: any;

    @Column({ type: 'float', name: 'total', nullable: true })
    total: number;

    @Column({ type: 'float', name: 'totalPoints', nullable: true })
    totalPoints: number;

    @ManyToOne(type => Invoice)
    @JoinColumn()
    mainInvoice: Invoice;

    @Column({ type: 'simple-enum', name: 'invoice_status', enum: InvoiceStatus })
    invoiceStatus: InvoiceStatus;

    @Column({ name: 'notes', nullable: true })
    notes: string;

    @OneToOne(type => CardTransaction)
    @JoinColumn()
    cardTransaction: CardTransaction;

  @ManyToOne(type => Hospital)
  @JoinColumn()
  hospital: Hospital;
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
