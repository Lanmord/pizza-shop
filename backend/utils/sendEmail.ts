import mailer from '../core/mailer';
import { SentMessageInfo } from 'nodemailer';

interface ISendEmailProps {
  emailFrom: string;
  emailTo: string;
  subject: string;
  html: string;
  callback?: (err: Error | null, info: SentMessageInfo) => void;
}

export default function sendEmail({
  emailFrom,
  emailTo,
  subject,
  html,
  callback,
}: ISendEmailProps) {
  mailer.sendMail(
    {
      from: emailFrom,
      to: emailTo,
      subject: subject,
      html: html,
    },
    callback ||
      function (err: Error | null, info: SentMessageInfo) {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      },
  );
}
