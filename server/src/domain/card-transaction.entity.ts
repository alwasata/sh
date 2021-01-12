/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Card } from './card.entity';
import { Invoice } from './invoice.entity';
import { TransactionAction } from './enumeration/transaction-action';

/**
 * A CardTransaction.
 */
@Entity('card_transaction')
export class CardTransaction extends BaseEntity {
    @Column({ name: 'transaction_no', nullable: true })
    transactionNo: string;

    @Column({ type: 'float', name: 'amount', nullable: true })
    amount: number;

    @Column({ type: 'float', name: 'points_amount', nullable: true })
    pointsAmount: number;

    @Column({ type: 'simple-enum', name: 'action', enum: TransactionAction })
    action: TransactionAction;

    @Column({ name: 'notes', nullable: true })
    notes: string;

    @ManyToOne(type => Card)
    card: Card;

    @OneToOne(type => Invoice)
    invoice: Invoice;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
