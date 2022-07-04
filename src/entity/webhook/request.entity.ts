import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, ManyToOne, JoinColumn, JoinTable, OneToOne } from 'typeorm';
import { EventEntity } from './event.entity';
@Entity('striperequest')
export class RequsetEntity {
  /**
   * Unique identifier for the object.
   */
  @PrimaryColumn({ type: 'varchar', length: 36, name: 'id' })
  id!: string|null;
  @Column('varchar', { nullable: false, length: 36, name: 'idempotency_key' })
  idempotency_key!: string|null;
}