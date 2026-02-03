import nodemailer from 'nodemailer';



const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFrom = process.env.SMTP_FROM || 'no-reply@mobilesalon.local';

const transporter =
  smtpHost && smtpUser && smtpPass
    ? nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })
    : null;

export const sendEmail = async (to: string, subject: string, text: string) => {
  if (!transporter) {
    console.warn('SMTP is not configured. Skipping email send.');
    return false;
  }

  await transporter.sendMail({
    from: smtpFrom,
    to,
    subject,
    text,
  });

  return true;
};
