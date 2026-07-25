import { sendEmail } from '../../providers/smtp';
import * as dotenv from 'dotenv';
import path from 'path';

// Manually load .env.local for this standalone script
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testSmtp() {
  console.log('Testing SMTP connection...');
  console.log(`Host: ${process.env.SMTP_HOST}`);
  console.log(`User: ${process.env.SMTP_USER}`);

  const testEmail = process.env.SMTP_USER; // Send to ourselves by default

  if (!testEmail) {
    console.error('SMTP_USER is not defined in .env.local');
    process.exit(1);
  }

  console.log(`Sending test email to ${testEmail}...`);

  const result = await sendEmail({
    to: testEmail,
    subject: 'VSLA Connect - SMTP Test Successful! 🎉',
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color: #4F46E5;">VSLA Connect</h2>
        <p>Hello from your new Next.js application!</p>
        <p>If you are reading this, your Nodemailer setup with Gmail SMTP app passwords is working perfectly.</p>
        <br/>
        <p><strong>Arthony</strong> - You can now use this provider for password resets and notifications.</p>
      </div>
    `,
  });

  if (result.success) {
    console.log('✅ Email sent successfully!');
    console.log(`Message ID: ${result.messageId}`);
  } else {
    console.error('❌ Failed to send email.');
    console.error(result.error);
  }
}

testSmtp();
