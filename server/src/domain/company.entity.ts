/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { User } from './user.entity';

/**
 * A Company.
 */
@Entity('company')
export class Company extends BaseEntity {
    @Column({ name: 'name_ar' })
    nameAr: string;

    @Column({ name: 'name_en', nullable: true })
    nameEn: string;

    @Column({ name: 'email', nullable: true })
    email: string;

    @Column({ name: 'phone', nullable: true })
    phone: string;

    @Column({ name: 'address', nullable: true })
    address: string;

    @Column({ type: 'float', name: 'discount', nullable: true, default: 0 })
    discount: number;

    @Column({ type: 'boolean', name: 'fixed_discount', nullable: true , default: true })
    fixedDiscount: boolean;

    @ManyToMany(type => User)
    @JoinTable({
        name: 'company_user',
        joinColumn: { name: 'company_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
    })
    users: User[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
