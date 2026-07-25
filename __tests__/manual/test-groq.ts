import { generateChatResponse, translateText } from '../../providers/groq';
import * as dotenv from 'dotenv';
import path from 'path';

// Manually load .env.local for this standalone script
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testGroq() {
  console.log('--------------------------------------------------');
  console.log('🤖 Testing Groq (Llama 3) Chat Generation...');
  console.log('--------------------------------------------------');
  
  if (!process.env.GROQ_API_KEY) {
    console.error('❌ GROQ_API_KEY is not defined in .env.local');
    process.exit(1);
  }
  
  const chatResult = await generateChatResponse([
    { role: 'user', content: 'What is a Village Savings and Loan Association (VSLA)? Please explain it in 2 simple sentences.' }
  ], 'You are a helpful financial advisor for a VSLA app in Malawi.');

  if (chatResult.success) {
    console.log('✅ Chat Response generated successfully!\n');
    console.log(`🤖 Llama 3 (via Groq) says:\n"${chatResult.text}"\n`);
  } else {
    console.error('❌ Failed to generate chat response.', chatResult.error);
  }

  console.log('--------------------------------------------------');
  console.log('🇲🇼 Testing English to Chichewa translation...');
  console.log('--------------------------------------------------');
  
  const textToTranslate = 'Welcome to VSLA Connect. How can I help you with your savings today?';
  const translationResult = await translateText(textToTranslate, 'ny');

  if (translationResult.success) {
    console.log('✅ Translation successful!\n');
    console.log(`🇬🇧 English:  ${textToTranslate}`);
    console.log(`🇲🇼 Chichewa: ${translationResult.translation}`);
  } else {
    console.error('❌ Failed to translate text.', translationResult.error);
  }
  console.log('--------------------------------------------------');
}

testGroq();
