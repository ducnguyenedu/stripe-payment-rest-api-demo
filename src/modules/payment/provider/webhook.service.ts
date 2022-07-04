/* eslint-disable linebreak-style */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable guard-for-in */
/* eslint-disable sonarjs/max-switch-cases */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from 'src/entity/payment/payment.entity';
import { EventEntity } from 'src/entity/webhook/event.entity';
import { RequsetEntity } from 'src/entity/webhook/request.entity';
import { UtilService } from 'src/modules/common';
import Stripe from 'stripe';
import { Repository } from 'typeorm';

@Injectable()
export class WebhookService {
  constructor(
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
    @InjectRepository(RequsetEntity)
    private requestRepository: Repository<RequsetEntity>,
    @InjectRepository(PaymentEntity) private paymentRepository: Repository<PaymentEntity>,
    private util: UtilService,
  ) { }

  async saveStripeEvent(event: Stripe.Event) {
    const eventsave = new EventEntity();
    eventsave.id = event.id;
    eventsave.type = event.type;
    eventsave.created = event.created;
    const obj = event.data.object as any;
    let payment;
    for (const key in obj) {
      if (key === 'object' && `${obj[key]}` === 'payment_intent') { payment = await this.savePayment(obj); break; }
      if (key === 'object' && `${obj[key]}` !== 'payment_intent') { console.log(event.type); return; }
    }
    eventsave.pid = payment?.id;
    eventsave.livemode = event.livemode;
    eventsave.pending_webhooks = event.pending_webhooks;
    if (event.request) {
      await this.saveRequest(event.request);
      eventsave.rid = event.request.id;
    }
    await this.eventRepository.save(eventsave);
    return true;
  }

  async saveRequest(request: Stripe.Event.Request) {
    const findrequest = await this.requestRepository.findOne({ where: { id: request.id || '' } });
    if (findrequest) { return; }
    const requestsave = new RequsetEntity();
    requestsave.id = request.id;
    requestsave.idempotency_key = request.idempotency_key;
    return this.requestRepository.save(requestsave);
  }

  private async savePayment(obj:any):Promise<PaymentEntity> {
    const payment = new PaymentEntity();
    for (const key in obj) {
      switch (key) {
        case 'id':
          const paymentfound = await this.paymentRepository.findOne({ where: { id: `${obj[key]}` } });
          if (paymentfound) return paymentfound;
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
    return payment;
  }

  async processSubscriptionUpdate(event: Stripe.Event):Promise<any> {
    await this.saveStripeEvent(event);
    return this.util.buildSuccessResponse(null);
  }
}
