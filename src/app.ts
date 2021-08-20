import * as dotenv from 'dotenv';
dotenv.config();

import * as sgMail from '@sendgrid/mail';

import { Email } from './Email';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const dataArray: Email[] = [
  {
    to: 'teeang94@gmail.com',
    from: 'adavidtaing@gmail.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  },
  {
    to: 'teeang94@gmail.com',
    from: 'adavidtaing@gmail.com',
    subject: 'Sending second email SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  },
  {
    to: 'teeang94@gmail.com',
    from: 'adavidtaing@gmail.com',
    subject: 'Sending with Node.js is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  },
];

function sendEmail(msg) {
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
}