/* eslint-disable linebreak-style */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from 'src/entity/payment/payment.entity';

import { CommonModule } from '../common';
import { PaymentController } from './controller/payment.controller';
import { PaymentService } from './provider/payment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentEntity]),
    CommonModule,
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
