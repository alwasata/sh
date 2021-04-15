/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { User } from './user.entity';

/**
 * A Company.
 */
@Entity('company')
export class Company extends BaseEntity {
    @Column({ name: 'name_ar' , unique: true })
    nameAr: string;

    @Column({ name: 'name_en', unique: true })
    nameEn: string;

    @Column({ name: 'email', unique: true })
    email: string;

    @Column({ name: 'phone', unique: true })
    phone: string;

    @Column({ name: 'address', nullable: true })
    address: string;

    @Column({ name: 'city', nullable: true })
    city: string;

    @Column({ name: 'lat', nullable: true })
    lat: string;

    @Column({ name: 'lng', nullable: true })
    lng: string;

    @Column({ name: 'active', default:1 })
    active: boolean;

    @Column({ name: 'activity_type', nullable: true })
    activityType: string;

    @Column({ name: 'jurisdiction', nullable: true })
    jurisdiction: string;

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

    @Column({ name: 'phone_second', default: null  })
    phoneSecond: string;

    @Column({ name: 'phone_third', default: null  })
    phoneThird: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
