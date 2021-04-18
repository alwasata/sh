import { ObjectIdColumn, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn,Column, ManyToOne } from 'typeorm';
import { User } from '../user.entity';

export abstract class BaseEntity {
    @ObjectIdColumn()
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ManyToOne(type => User)
    createdBy?: User;
    @CreateDateColumn({ nullable: true })
    createdDate?: Date;
    @ManyToOne(type => User)
    lastModifiedBy?: User;
    @UpdateDateColumn({ nullable: true })
    lastModifiedDate?: Date;

}
