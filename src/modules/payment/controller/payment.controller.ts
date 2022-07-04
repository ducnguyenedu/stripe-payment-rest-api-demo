/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { NormalResponse } from '../../common/response.interface';
import { PaymentService } from '../provider/payment.service';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) { }
  @Post('create-payment')
  public async createPaymentIntent(): Promise<NormalResponse> {
    return this.paymentService.createPaymentIntent(50);
  }

  @Post('confirm-payment')
  public async confirmPaymentIntent(@Body('id')paymentIntentId: string, @Body('method') paymentMethod: string): Promise<NormalResponse> {
    return this.paymentService.confirmPaymentIntent(paymentIntentId, paymentMethod);
  }

  @Post('cancel-payment')
  public async cancelPaymentIntent(@Body('id')paymentIntentId: string): Promise<NormalResponse> {
    return this.paymentService.cancelPaymentIntent(paymentIntentId);
  }
}
