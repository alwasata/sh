/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Category } from './category.entity';
import { Hospital } from './hospital.entity';

/**
 * A Benefit.
 */
@Entity('benefit')
export class Benefit extends BaseEntity {
    @Column({ name: 'name_ar', unique: true})
    nameAr: string;

    @Column({ name: 'name_en', nullable: true, unique: true})
    nameEn: string;

    @Column({ type: 'float', name: 'points_cost', nullable: true })
    pointsCost: number;

    @Column({ type: 'float', name: 'cost', nullable: true })
    cost: number;

    @Column({ type: 'boolean', name: 'active', default: 1 })
    active: boolean;

    @ManyToOne(type => Category)
    category: Category;

    @ManyToOne(type => Hospital)
    hospital: Hospital;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
