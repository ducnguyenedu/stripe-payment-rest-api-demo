import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, ManyToOne, JoinColumn, JoinTable, OneToOne } from 'typeorm';
@Entity('payment')
export class PaymentEntity {
  @PrimaryColumn({ type: 'varchar', length: 36, name: 'id' })
  id!: any;

  @Column('varchar', { nullable: false, length: 36, name: 'object' })
  object!: any;

  @Column('int', { nullable: false, name: 'amount' })
  amount!: any;

  @Column('int', { nullable: false, name: 'amount_capturable' })
  amount_capturable!: any;

  // @OneToMany(() => TipsEntity, amount_details => amount_details.pid)
  // amount_details!: TipsEntity[];

  @Column('int', { nullable: false, name: 'amount_received' })
  amount_received!: any;

  @Column('varchar', { nullable: true, length: 36, name: 'application' })
  application!: any;

  @Column('varchar', { nullable: true, length: 36, name: 'application_fee_amount' })
  application_fee_amount!: any;

  @Column('varchar', { nullable: true, length: 36, name: 'automatic_payment_methods' })
  automatic_payment_methods!: any;

  @Column('timestamp', { nullable: true,  name: 'canceled_at' })
  canceled_at!: any;

  @Column('varchar', { nullable: true, length: 36, name: 'cancellation_reason' })
  cancellation_reason!: any;

  @Column('varchar', { nullable: true, length: 36, name: 'capture_method' })
  capture_method!: any;

  // @Column('varchar', { nullable: true, length: 36, name: 'charges' })
  // charges!: any;

  @Column('varchar', { nullable: false, length: 64, name: 'client_secret' })
  client_secret!: any;

  @Column('varchar', { nullable: false, length: 36, name: 'confirmation_method' })
  confirmation_method!: any;

  @Column('int', { nullable: false,  name: 'created' })
  created!: any;

  @Column('varchar', { nullable: false, length: 36, name: 'currency' })
  currency!: any;

  @Column('varchar', { nullable: true, length: 36, name: 'customer' })
  customer!: any;

  @Column('varchar', { nullable: true, length: 36, name: 'description' })
  description!: any;

  @Column('varchar', { nullable: true, length: 36, name: 'invoice' })
  invoice!: any;

  @Column('varchar', { nullable: true, length: 36, name: 'last_payment_error' })
  last_payment_error!: any;

  @Column('bool', { name: 'livemode' })
  livemode!: any;

  // @Column('varchar', { nullable: true, length: 36, name: 'metadata' })
  // metadata!: any;

  @Column('varchar', { nullable: true, length: 36, name: 'next_action' })
  next_action!: any;

  @Column('varchar', { nullable: true, length: 36, name: 'on_behalf_of' })
  on_behalf_of!: any;

  @Column('varchar', { nullable: true, length: 36, name: 'payment_method' })
  payment_method!: any;

  //  @Column('varchar', { nullable: true, length: 36, name: 'payment_method_options' })
  // payment_method_options!: any;

  @Column('varchar', { nullable: false, length: 36, name: 'payment_method_types' })
  payment_method_types!: any;

  @Column('varchar', { nullable: true, length: 36, name: 'processing' })
  processing!: any;

  @Column('varchar', { nullable: true, length: 36, name: 'receipt_email' })
  receipt_email!: any;

  @Column('varchar', { nullable: true, length: 36, name: 'review' })
  review!: any;

  @Column('varchar', { nullable: true, length: 36, name: 'setup_future_usage' })
  setup_future_usage!: any;

  @Column('varchar', { nullable: true, length: 36, name: 'shipping' })
  shipping!: any;

  @Column('varchar', { nullable: true, length: 36, name: 'source' })
  source!: any;

  @Column('varchar', { nullable: true, length: 36, name: 'statement_descriptor' })
  statement_descriptor!: any;

  @Column('varchar', { nullable: true, length: 36, name: 'statement_descriptor_suffix' })
  statement_descriptor_suffix!: any;

  @Column('varchar', { nullable: false, length: 36, name: 'status' })
  status!: any;

  @Column('varchar', { nullable: true, length: 36, name: 'transfer_data' })
  transfer_data!: any;

  @Column('varchar', { nullable: true, length: 36, name: 'transfer_group' })
  transfer_group!: any;
}