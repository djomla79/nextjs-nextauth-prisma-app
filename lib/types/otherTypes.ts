import SMTPTransport from 'nodemailer/lib/smtp-transport';

export type OptionType = {
  expiresIn: string | number;
};

export type ActivationMailType = (
  id: string,
  name: string,
  email: string,
  urlType: string,
  template: string
) => Promise<SMTPTransport.SentMessageInfo | undefined>;

export type AdminDetailsType = {
  fullName: string;
  email: string;
};
