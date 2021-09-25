import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { OrderModel } from './models/order.model';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('sendOrderMail')
  sendOrderMail(@Body() order: OrderModel): Promise<any> {
    return this.appService.sendOrderMail(order);
  }
}
