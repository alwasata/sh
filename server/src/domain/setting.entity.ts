/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A Setting.
 */
@Entity('setting')
export class Setting extends BaseEntity {
  @Column({ name: 'jhi_key', nullable: true })
  key: string;

  @Column({ name: 'value', nullable: true })
  value: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
