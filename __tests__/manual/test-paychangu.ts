import { initiatePayment, verifyPayment } from '../../providers/paychangu';
import * as dotenv from 'dotenv';
import path from 'path';
import { randomUUID } from 'crypto';

// Manually load .env.local for this standalone script
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testPaychangu() {
  if (!process.env.PAYCHANGU_SECRET_KEY) {
    console.error('❌ PAYCHANGU_SECRET_KEY is not defined in .env.local');
    process.exit(1);
  }

  // ------------------------------------------------------------------
  // TEST 1: Initiate a Payment
  // ------------------------------------------------------------------
  console.log('--------------------------------------------------');
  console.log('💳 Test 1: Initiating a PayChangu payment...');
  console.log('--------------------------------------------------');

  // Simulate a MWK 500 contribution (500 MWK = 50,000 tambala)
  const txRef = `VSLA-TEST-${randomUUID()}`;

  const initResult = await initiatePayment({
    amountTambala: 50000,       // 500 MWK
    email: 'testmember@vslaconnect.mw',
    firstName: 'Thandi',
    lastName: 'Phiri',
    txRef,
    description: 'Monthly savings contribution — Group Chifundo',
  });

  if (initResult.success) {
    console.log('✅ Payment initiated successfully!');
    console.log(`🔗 Checkout URL: ${initResult.checkoutUrl}`);
    console.log(`📋 TX Reference: ${txRef}`);
  } else {
    console.error('❌ Payment initiation failed:');
    console.error(JSON.stringify(initResult.error, null, 2));
  }

  // ------------------------------------------------------------------
  // TEST 2: Verify the Payment
  // ------------------------------------------------------------------
  console.log('\n--------------------------------------------------');
  console.log('🔍 Test 2: Verifying the payment status...');
  console.log('--------------------------------------------------');

  const verifyResult = await verifyPayment({ txRef });

  if (verifyResult.success) {
    console.log('✅ Verification call succeeded!');
    console.log(`📊 Payment Status: ${verifyResult.status}`);
    console.log(`💰 Is Paid: ${verifyResult.isPaid}`);
  } else {
    console.error('❌ Verification failed:');
    console.error(JSON.stringify(verifyResult.error, null, 2));
  }

  console.log('--------------------------------------------------');
}

testPaychangu();
