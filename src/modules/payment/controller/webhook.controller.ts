/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-default-export */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Headers, Controller, Post, Req, BadRequestException } from '@nestjs/common';
import { StripeService } from 'src/modules/common';

import RequestWithRawBody from '../dto/requestWithRawBody.interface';
import { WebhookService } from '../provider/webhook.service';

@Controller('webhook')
export default class WebhookController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly stripeWebhookService: WebhookService,
  ) {}

  @Post()
  async handleIncomingEvents(
    @Headers('stripe-signature') signature: string,
    @Req() request: RequestWithRawBody,
  ) {
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }
    const event = await this.stripeService.constructEventFromPayload(signature, request.rawBody);
    return this.stripeWebhookService.processSubscriptionUpdate(event);
  }
}
