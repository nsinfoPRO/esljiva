import { Injectable } from '@nestjs/common';
import { OrderModel } from './models/order.model';

@Injectable()
export class AppService {
  sendOrderMail(order: OrderModel): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        console.log('order : ', order);
        resolve({ response: 'mailSuccesfullySend' });
      }, 3000);
    });
  }
}
