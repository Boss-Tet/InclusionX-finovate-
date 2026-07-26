import { sendEmail, SendEmailOptions } from '@/providers/smtp';
import { sendSms, handleUssdSession, SendSmsOptions } from '@/providers/africasTalking';
import { sendFanOutNotification, FanOutNotificationArgs } from '@/services/notifications/sendFanOutNotification';

/**
 * Notifications Controller
 * Orchestrates external communication (Email, SMS, USSD).
 */
export class NotificationsController {
  
  /**
   * Dispatches a notification to all authorized channels based on user preferences.
   */
  static async send(args: FanOutNotificationArgs) {
    return await sendFanOutNotification(args);
  }

  // The email and sms methods remain for the fan-out service to use internally,
  // or for specific system alerts (e.g. password resets).
  static async email(options: SendEmailOptions) {
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
