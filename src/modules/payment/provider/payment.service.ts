/* eslint-disable linebreak-style */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable sonarjs/max-switch-cases */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { PaymentEntity } from 'src/entity/payment/payment.entity';
import { StripeService } from 'src/modules/common';
import { NormalResponse } from 'src/modules/common/response.interface';
import { Repository } from 'typeorm';

import { UtilService } from '../../common/providers/util.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity) private paymentRepository: Repository<PaymentEntity>,
    private stripeService: StripeService,
    private util: UtilService,
  ) {}

  public async createPaymentIntent(amount: number):Promise<NormalResponse> {
    const data = await this.stripeService.createPaymentIntent(amount);
    await this.savePayment(data);
    const payment = await this.paymentRepository.findOne({ where: { id: `${data.id}` } });
    console.log(`save  ${payment?.id}`);
    return this.util.buildSuccessResponse(null);
  }

  private async savePayment(obj:any) {
    const payment = new PaymentEntity();

    for (const key in obj) {
      switch (key) {
        case 'id':
          payment.id = `${obj[key]}`;
          break;
        case 'object':
          payment.object = `${obj[key]}`;
          break;
        case 'amount':
          payment.amount = `${obj[key]}`;
          break;
        case 'amount_capturable':
          payment.amount_capturable = `${obj[key]}`;
          break;
        case 'amount_received':
          payment.amount_received = `${obj[key]}`;
          break;
        case 'application':
          payment.application = `${obj[key]}` === 'null' ? null : `${obj[key]}`;
          break;
        case 'application_fee_amount':
          payment.application_fee_amount = `${obj[key]}` === 'null' ? null : `${obj[key]}`;
          break;
        case 'automatic_payment_methods':
          payment.automatic_payment_methods = `${obj[key]}` === 'null' ? null : `${obj[key]}`;
          break;
        case 'canceled_at':
          payment.canceled_at = `${obj[key]}` === 'null' ? null : `${obj[key]}`;
          break;
        case 'cancellation_reason':
          payment.cancellation_reason = `${obj[key]}` === 'null' ? null : `${obj[key]}`;
          break;
        case 'capture_method':
          payment.capture_method = `${obj[key]}`;
          break;
        case 'client_secret':
          payment.client_secret = `${obj[key]}`;
          break;
        case 'confirmation_method':
          payment.confirmation_method = `${obj[key]}`;
          break;
        case 'created':
          payment.created = `${obj[key]}`;
          break;
        case 'currency':
          payment.currency = `${obj[key]}`;
          break;
        case 'customer':
          payment.customer = `${obj[key]}` === 'null' ? null : `${obj[key]}`;
          break;
        case 'description':
          payment.description = `${obj[key]}` === 'null' ? null : `${obj[key]}`;
          break;
        case 'invoice':
          payment.invoice = `${obj[key]}` === 'null' ? null : `${obj[key]}`;
          break;
        case 'last_payment_error':
          payment.last_payment_error = `${obj[key]}` === 'null' ? null : `${obj[key]}`;
          break;
        case 'livemode':
          payment.livemode = `${obj[key]}` === 'true';
          break;
        case 'next_action':
          payment.next_action = `${obj[key]}` === 'null' ? null : `${obj[key]}`;
          break;
        case 'on_behalf_of':
          payment.on_behalf_of = `${obj[key]}` === 'null' ? null : `${obj[key]}`;
          break;
        case 'payment_method':
          payment.payment_method = `${obj[key]}` === 'null' ? null : `${obj[key]}`;
          break;
        case 'payment_method_types':
          payment.payment_method_types = `${obj[key]}`;
          break;
        case 'processing':
          payment.processing = `${obj[key]}` === 'null' ? null : `${obj[key]}`;
          break;
        case 'receipt_email':
          payment.receipt_email = `${obj[key]}` === 'null' ? null : `${obj[key]}`;
          break;
        case 'review':
          payment.review = `${obj[key]}` === 'null' ? null : `${obj[key]}`;
          break;
        case 'setup_future_usage':
          payment.setup_future_usage = `${obj[key]}` === 'null' ? null : `${obj[key]}`;
          break;
        case 'shipping':
          payment.shipping = `${obj[key]}` === 'null' ? null : `${obj[key]}`;
          break;
        case 'source':
          payment.source = `${obj[key]}` === 'null' ? null : `${obj[key]}`;
          break;
        case 'statement_descriptor':
          payment.statement_descriptor = `${obj[key]}` === 'null' ? null : `${obj[key]}`;
          break;
        case 'statement_descriptor_suffix':
          payment.statement_descriptor_suffix = `${obj[key]}` === 'null' ? null : `${obj[key]}`;
          break;
        case 'status':
          payment.status = `${obj[key]}`;
          break;
        case 'transfer_data':
          payment.transfer_data = `${obj[key]}` === 'null' ? null : `${obj[key]}`;
          break;
        case 'transfer_group':
          payment.transfer_group = `${obj[key]}` === 'null' ? null : `${obj[key]}`;
          break;

        default:
          console.log(`Lost data key: ${key}, value: ${obj[key]}`);
          break;
      }
    }
    await this.paymentRepository.save(payment);
  }
}