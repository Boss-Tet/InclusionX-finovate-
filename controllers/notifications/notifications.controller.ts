import { sendEmail, SendEmailOptions } from '@/providers/smtp';
import { sendSms, handleUssdSession, SendSmsOptions } from '@/providers/africasTalking';

/**
 * Notifications Controller
 * Orchestrates external communication (Email, SMS, USSD).
 */
export class NotificationsController {
  
  /**
   * Sends an email notification.
   */
  static async email(options: SendEmailOptions) {
    // Future: DB logging for emails sent
    return await sendEmail(options);
  }

  /**
   * Sends an SMS message.
   */
  static async sms(options: SendSmsOptions) {
    // Future: Check user preferences (do they have SMS enabled?)
    return await sendSms(options);
  }

  /**
   * Processes incoming USSD requests from Africa's Talking.
   */
  static processUssd(sessionId: string, phoneNumber: string, text: string) {
    // Future: Parse text, interact with DB (e.g., check user balance)
    // Currently passes through to the provider's logic router
    return handleUssdSession(sessionId, phoneNumber, text);
  }
}
