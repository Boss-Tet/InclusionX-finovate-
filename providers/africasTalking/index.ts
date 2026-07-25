import AfricasTalking from 'africastalking';

// Initialize Africa's Talking SDK
// AT_USERNAME = "sandbox" for testing, real username for production
const at = AfricasTalking({
  apiKey: process.env.AT_API_KEY!,
  username: process.env.AT_USERNAME!,
});

const sms = at.SMS;

export interface SendSmsOptions {
  to: string | string[];  // Phone number(s) in international format, e.g. "+265999123456"
  message: string;
  senderId?: string;      // Optional ΓÇö defaults to AT_SENDER_ID from env
}

/**
 * Sends an SMS to one or more phone numbers via Africa's Talking.
 * Uses sandbox when AT_USERNAME="sandbox".
 * @param to Recipient phone number(s) in international format (+265...)
 * @param message The SMS text body
 * @param senderId Optional alphanumeric sender ID (e.g. "VSLA")
 */
export async function sendSms({ to, message, senderId }: SendSmsOptions) {
  const recipients = Array.isArray(to) ? to : [to];
  // In sandbox mode, use "Sandbox" as sender. In production, use registered Sender ID.
  const from = senderId || process.env.AT_SENDER_ID || 'Sandbox';

  try {
    const sendOptions: any = { to: recipients, message };
    // Only include 'from' if a senderId is explicitly passed ΓÇö omit for sandbox
    if (from && from !== 'Sandbox') sendOptions.from = from;

    const result = await sms.send(sendOptions);

    return { success: true, result };
  } catch (error) {
    console.error('Error sending SMS via Africa\'s Talking:', error);
    return { success: false, error };
  }
}

/**
 * Handles an incoming USSD session request from Africa's Talking.
 * Returns a USSD response string. Prefix with "CON " to continue, "END " to end the session.
 * @param sessionId Unique AT session ID
 * @param phoneNumber The user's phone number
 * @param text Accumulated USSD input from the user (e.g. "1*2*3")
 */
export function handleUssdSession(
  sessionId: string,
  phoneNumber: string,
  text: string
): string {
  const parts = text.split('*').filter(Boolean);
  const level = parts.length;

  // Level 0: Initial USSD session ΓÇö main menu
  if (level === 0) {
    return `CON Welcome to VSLA Connect\n1. Check Balance\n2. Make Contribution\n3. Request Loan\n4. My Group\n0. Exit`;
  }

  // Level 1: User selected a menu item
  switch (parts[0]) {
    case '1':
      // Show balance ΓÇö in real app, fetch from DB using phoneNumber
      return `END Your current savings balance will be displayed in the app. Dial again for the menu.`;

    case '2':
      return `CON Make a Contribution\nEnter amount (MWK):`;

    case '3':
      return `CON Request a Loan\nEnter loan amount (MWK):`;

    case '4':
      return `END My Group feature is available in the VSLA Connect app.`;

    case '0':
      return `END Thank you for using VSLA Connect. Goodbye!`;

    default:
      return `END Invalid option. Please try again.`;
  }
}
