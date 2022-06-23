/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Post } from '@nestjs/common';
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
}
