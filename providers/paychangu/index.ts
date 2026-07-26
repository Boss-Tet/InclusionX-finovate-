/**
 * PayChangu Payment Provider
 * Docs: https://paychangu.readme.io/reference
 *
 * All monetary amounts are in tambala (1 MWK = 100 tambala).
 * Convert to MWK (divide by 100) before sending to PayChangu which expects MWK.
 */

const BASE_URL = process.env.PAYCHANGU_BASE_URL || 'https://api.paychangu.com';
const SECRET_KEY = process.env.PAYCHANGU_SECRET_KEY!;
const CALLBACK_URL = process.env.PAYCHANGU_CALLBACK_URL || 'https://inclusion-x-finovate.vercel.app/api/payments/callback';

export interface InitiatePaymentOptions {
  amountTambala: number;       // Amount in tambala — we convert to MWK internally
  currency?: string;           // Default: "MWK"
  email: string;               // Customer email
  firstName: string;
  lastName: string;
  txRef: string;               // Your unique transaction reference (e.g. UUID)
  callbackUrl?: string;        // Override default callback URL
  returnUrl?: string;          // Where to redirect after payment
  description?: string;
}

export interface VerifyPaymentOptions {
  txRef: string;               // The transaction reference you used when initiating
}

/**
 * Initiates a payment via PayChangu.
 * Returns a checkout URL to redirect the user to.
 */
export async function initiatePayment(options: InitiatePaymentOptions) {
  const amountMwk = options.amountTambala / 100; // Convert tambala → MWK

  const payload = {
    amount: amountMwk,
    currency: options.currency || 'MWK',
    email: options.email,
    first_name: options.firstName,
    last_name: options.lastName,
    callback_url: options.callbackUrl || CALLBACK_URL,
    return_url: options.returnUrl || CALLBACK_URL,
    tx_ref: options.txRef,
    customization: {
      title: 'VSLA Connect',
      description: options.description || 'VSLA Connect Payment',
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/payment`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SECRET_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json() as any;

    if (!response.ok) {
      return { success: false, error: data };
    }

    return {
      success: true,
      checkoutUrl: data?.data?.checkout_url,
      txRef: options.txRef,
      data,
    };
  } catch (error) {
    console.error('Error initiating PayChangu payment:', error);
    return { success: false, error };
  }
}

/**
 * Verifies the status of a payment using the transaction reference.
 */
export async function verifyPayment({ txRef }: VerifyPaymentOptions) {
  try {
    const response = await fetch(`${BASE_URL}/verify-payment/${txRef}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${SECRET_KEY}`,
      },
    });

    const data = await response.json() as any;

    if (!response.ok) {
      return { success: false, error: data };
    }

    const status = data?.data?.status; // "successful", "pending", "failed"

    return {
      success: true,
      status,
      isPaid: status === 'successful',
      data,
    };
  } catch (error) {
    console.error('Error verifying PayChangu payment:', error);
    return { success: false, error };
  }
}
