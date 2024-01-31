import nodemailer from 'nodemailer';
import { SMTP_USER, SMTP_PASSWORD } from '../constants';

export const sendMail = async ({
  from,
  to,
  subject,
  body,
}: {
  from: string;
  to: string;
  subject: string;
  body: string;
}) => {
  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    return await transport.sendMail({
      from,
      to,
      subject,
      html: body,
    });
  } catch (error) {
    console.log(error);
  }
};

export const compileTemplate = (
  name: string,
  url: string,
  template: string
) => {
  return template.replace('{{name}}', name).replaceAll('{{url}}', url);
};
