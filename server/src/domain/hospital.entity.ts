/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { User } from './user.entity';

/**
 * A Hospital.
 */
@Entity('hospital')
export class Hospital extends BaseEntity {
    @Column({ name: 'name_ar', unique: true  })
    nameAr: string;

    @Column({ name: 'name_en', unique: true })
    nameEn: string;

    @Column({ name: 'email', unique: true })
    email: string;

    @Column({ name: 'phone', unique: true })
    phone: string;

    @Column({ name: 'active', default:1 })
    active: boolean;

    @Column({ name: 'city', nullable: true })
    city: string;

    @Column({ name: 'address', nullable: true })
    address: string;

    @Column({ name: 'lat', nullable: true })
    lat: string;

    @Column({ name: 'lng', nullable: true })
    lng: string;

    @Column({ name: 'phoneSecond', unique: true })
    phoneSecond: string;

    @Column({ name: 'phoneThird', unique: true })
    phoneThird: string;

    @Column({ name: 'type', nullable: true })
    type: string;

    @Column({ name: 'notes', nullable: true })
    notes: string;

    @ManyToMany(type => User)
    @JoinTable({
        name: 'hospital_user',
        joinColumn: { name: 'hospital_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
    })
    users: User[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
