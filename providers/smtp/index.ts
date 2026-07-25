import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  const from = process.env.SMTP_FROM || '"VSLA Connect" <noreply@vslaconnect.com>';
  
  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text: text || html.replace(/<[^>]*>?/gm, ''), // fallback to stripped html if no text provided
      html,
    });
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email via SMTP:', error);
    return { success: false, error };
  }
}
