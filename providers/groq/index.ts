import Groq from 'groq-sdk';

// Initialize the Groq SDK (use a dummy key if missing to avoid breaking Vercel build phase)
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || 'dummy_key_for_build' });

// Default to Llama 3 70B for strong reasoning, or 8B for extreme speed
const defaultModel = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Handles a conversation turn with the AI Assistant using Groq.
 * @param history Array of previous messages for context
 * @param systemInstruction Optional rules for the AI (e.g. "You are a VSLA financial advisor...")
 */
export async function generateChatResponse(history: ChatMessage[], systemInstruction?: string) {
  try {
    const messages: ChatMessage[] = [];
    
    if (systemInstruction) {
      messages.push({ role: 'system', content: systemInstruction });
    }
    
    messages.push(...history);

    const completion = await groq.chat.completions.create({
      messages,
      model: defaultModel,
      temperature: 0.7,
    });

    return { success: true, text: completion.choices[0]?.message?.content || '' };
  } catch (error) {
    console.error('Error in Groq chat generation:', error);
    return { success: false, error };
  }
}

/**
 * Translates text between English and Chichewa using Groq.
 * @param text The text to translate
 * @param targetLanguage 'en' for English, 'ny' for Chichewa
 */
export async function translateText(text: string, targetLanguage: 'en' | 'ny') {
  try {
    const prompt = targetLanguage === 'ny' 
      ? `Translate the following English text to Chichewa (Malawi). Respond ONLY with the translation, no extra text, no quotes:\n\n${text}`
      : `Translate the following Chichewa text to English. Respond ONLY with the translation, no extra text, no quotes:\n\n${text}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: defaultModel,
      temperature: 0.1, // Low temperature for more deterministic translations
    });

    return { success: true, translation: completion.choices[0]?.message?.content?.trim() || '' };
  } catch (error) {
    console.error('Error in Groq translation:', error);
    return { success: false, error };
  }
}
