/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Category } from './category.entity';
import { Hospital } from './hospital.entity';
import { Benefit } from './benefit.entity';
import { BenefitStatus } from './enumeration/benefit-status';

/**
 * A BenefitRequest.
 */
@Entity('benefit_request')
export class BenefitRequest extends BaseEntity {
    @Column({ name: 'name_ar' })
    nameAr: string;

    @Column({ name: 'name_en', nullable: true })
    nameEn: string;

    // @Column({ type: 'float', name: 'points_cost', nullable: true })
    // pointsCost: number;

    @Column({ type: 'float', name: 'cost', nullable: true })
    cost: number;

    @Column({ type: 'simple-enum', name: 'benefit_status', enum: BenefitStatus })
    benefitStatus: BenefitStatus;

    @Column({ name: 'notes', nullable: true })
    notes: string;

    @ManyToOne(type => Category)
    category: Category;

    @ManyToOne(type => Hospital)
    hospital: Hospital;

    @ManyToOne(type => Benefit)
    benefit: Benefit;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
