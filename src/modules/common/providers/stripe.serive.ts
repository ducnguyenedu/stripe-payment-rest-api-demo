/* eslint-disable no-buffer-constructor */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Stripe } from 'stripe';

export class StripeService {
  private stripe: Stripe;
  private stripeKey: string;
  constructor() {
    this.stripeKey = process.env['STRIPE_KEY'] || '';
    this.stripe = new Stripe(this.stripeKey, { apiVersion: '2020-08-27' });
  }

  public async constructEventFromPayload(signature: string, payload: Buffer) {
    const webhookSecret = process.env['STRIPE_WEBHOOK_SECRET'] || '';
    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret,
    );
  }

  public async createPaymentIntent(amount: number): Promise<any> {
    return await this.stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });
  }

  public async confirmPaymentIntent(paymentIntentId: string, paymentMethod: string): Promise<any> {
    return await this.stripe.paymentIntents.confirm(paymentIntentId, { payment_method: paymentMethod });
  }

  public async cancelPaymentIntent(paymentIntentId: string): Promise<any> {
    return await this.stripe.paymentIntents.cancel(paymentIntentId);
  }

  public async createCheckout(successUrl?: string, name?: string, number?: number): Promise<any> {
    return await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: name || 'IAVS Process',
            },
            unit_amount: number,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || '',
      cancel_url: successUrl || '',
    });
  }
}
