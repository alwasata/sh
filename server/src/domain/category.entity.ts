/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A Category.
 */
@Entity('category')
export class Category extends BaseEntity {
    @Column({ name: 'name_ar' })
    nameAr: string;

    @Column({ name: 'name_en', nullable: true })
    nameEn: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
