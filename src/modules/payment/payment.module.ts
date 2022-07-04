/* eslint-disable linebreak-style */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from 'src/entity/payment/payment.entity';
import { EventEntity } from 'src/entity/webhook/event.entity';
import { RequsetEntity } from 'src/entity/webhook/request.entity';

import { CommonModule } from '../common';
import { PaymentController } from './controller/payment.controller';
import WebhookController from './controller/webhook.controller';
import { PaymentService } from './provider/payment.service';
import { WebhookService } from './provider/webhook.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentEntity, EventEntity, RequsetEntity]),
    CommonModule,
  ],
  providers: [PaymentService, WebhookService],
  controllers: [PaymentController, WebhookController],
})
export class PaymentModule {}
