import { Injectable } from '@nestjs/common';
import { OrderModel } from './models/order.model';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');

@Injectable()
export class AppService {
  // create reusable transporter object using the default SMTP transport
  transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com', // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: 'SSLv3',
    },
    auth: {
      user: 'agro-niks@outlook.com',
      pass: 'Agroniks2021',
    },
  });

  getOrderType(typeCode: string): string {
    switch (typeCode) {
      case 'order1':
        return 'Sa kospom 5 kilograma';
      case 'order2':
        return 'Bez kospe 5 kilograma';
      case 'order3':
        return 'Sa kospom 10 kilograma';
      case 'order4':
        return 'Bez kospe 10 kilograma';
    }
  }

  sendOrderMail(order: OrderModel): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const mailOptions = {
        from: '"eSljiva " <agro-niks@outlook.com>', // sender address (who sends)
        to: 'nenadspasenic@live.com', // list of receivers (who receives)
        subject: 'Nova porudzbina sljive ' + new Date().toLocaleString('sr'), // Subject line
        // text: 'Test za text ', // plaintext body
        html:
          '<b>Ime </b> ' +
          order.firstName +
          '<br>' +
          '<b>Prezime </b> ' +
          order.lastName +
          '<br>' +
          '<b>Telefon </b> ' +
          order.phone +
          '<br>' +
          '<b>Grad </b> ' +
          order.city +
          '<br>' +
          '<b>Ulica i broj </b> ' +
          order.streetAndNumber +
          '<br>' +
          '<b>Broj kutija </b> ' +
          order.numberOfBoxes +
          '<br>' +
          '<b>Tip porudzbine </b> ' +
          this.getOrderType(order.type) +
          '<br>' +
          '<b>Vrednost porudzbine </b> ' +
          order.valueInRSD +
          ' RSD' +
          '<br>',
      };
      this.transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          resolve({ response: 'errorSendingMail', error: error });
        } else {
          console.log('Message succesfuly sent: \n' + info.response);
          resolve({ response: 'mailSuccesfullySend' });
        }
      });
      // setTimeout(() => {
      //   console.log('order : ', order);
      //   resolve({ response: 'mailSuccesfullySend' });
      // }, 3000);
    });
  }
}
