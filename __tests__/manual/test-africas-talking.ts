import { sendSms, handleUssdSession } from '../../providers/africasTalking';
import * as dotenv from 'dotenv';
import path from 'path';

// Manually load .env.local for this standalone script
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testAfricasTalking() {
  if (!process.env.AT_API_KEY) {
    console.error('❌ AT_API_KEY is not defined in .env.local');
    process.exit(1);
  }

  // ------------------------------------------------------------------
  // TEST 1: SMS Sending (Sandbox — no real SMS sent, just verified)
  // ------------------------------------------------------------------
  console.log('--------------------------------------------------');
  console.log('📱 Test 1: Sending SMS via Africa\'s Talking sandbox...');
  console.log('--------------------------------------------------');

  // In sandbox mode, AT only sends to numbers registered in your AT sandbox dashboard
  // Using a Malawi number format (+265...)
  const smsResult = await sendSms({
    to: '+254700000000', // Sandbox test number
    message: 'Hello from VSLA Connect! Your loan of MWK 5,000 has been approved. Login to VSLA Connect to confirm.',
    senderId: 'VSLA',
  });

  if (smsResult.success) {
    console.log('✅ SMS API call successful!');
    console.log('📨 AT Response:', JSON.stringify(smsResult.result, null, 2));
  } else {
    console.error('❌ SMS failed:', smsResult.error);
  }

  // ------------------------------------------------------------------
  // TEST 2: USSD Session Logic (no network call — pure logic test)
  // ------------------------------------------------------------------
  console.log('\n--------------------------------------------------');
  console.log('📟 Test 2: USSD Session Handler Logic...');
  console.log('--------------------------------------------------');

  const testCases = [
    { text: '',    description: 'Initial menu (empty input)' },
    { text: '1',   description: 'User selected "Check Balance"' },
    { text: '2',   description: 'User selected "Make Contribution"' },
    { text: '3',   description: 'User selected "Request Loan"' },
    { text: '0',   description: 'User selected "Exit"' },
    { text: '9',   description: 'User entered invalid option' },
  ];

  for (const tc of testCases) {
    const response = handleUssdSession('test-session-001', '+265999123456', tc.text);
    const prefix = response.startsWith('CON') ? '🔄 CON (continues)' : '🔚 END (closes)';
    console.log(`\n[Input: "${tc.text}"] — ${tc.description}`);
    console.log(`${prefix}\n${response.replace(/^(CON |END )/, '')}`);
  }
  console.log('\n--------------------------------------------------');
}

testAfricasTalking();
