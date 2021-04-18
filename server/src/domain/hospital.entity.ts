/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { User } from './user.entity';

/**
 * A Hospital.
 */
@Entity('hospital')
export class Hospital extends BaseEntity {
    @Column({ name: 'name_ar' })
    nameAr: string;

    @Column({ name: 'name_en', nullable: true })
    nameEn: string;

    @Column({ name: 'email', nullable: true })
    email: string;

    @Column({ name: 'phone', nullable: true })
    phone: string;

    @Column({ name: 'active', default:1 })
    active: boolean;
    
    @Column({ name: 'address', nullable: true })
    address: string;

    @ManyToMany(type => User)
    @JoinTable({
        name: 'hospital_user',
        joinColumn: { name: 'hospital_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
    })
    users: User[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
