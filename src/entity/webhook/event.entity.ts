import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, ManyToOne, JoinColumn, JoinTable, OneToOne } from 'typeorm';
import { PaymentEntity } from '../payment/payment.entity';
import { RequsetEntity } from './request.entity';
@Entity('stripeevent')
export class EventEntity {
  /**
   * Unique identifier for the object.
   */
  @PrimaryColumn({ type: 'varchar', length: 36, name: 'id' })
  id!: string;
  @Column('varchar', { nullable: false, length: 36, name: 'type' })
  type!: string;
  @Column('int', { nullable: true, name: 'created' })
  created!: number;
  //Many to One
  @ManyToOne(() => PaymentEntity, (payment) => payment.id)
  @JoinColumn({ name: 'pid' })
  pid!: string;
  @Column('varchar', { nullable: false, length: 36, name: 'livemode' })
  livemode!: boolean;
   //Many to One
   @ManyToOne(() => RequsetEntity, (event) => event.id)
   @JoinColumn({ name: 'rid' })
   rid!: string | null ;
  @Column('int', { nullable: false, name: 'pending_webhooks' })
  pending_webhooks!: number;
}