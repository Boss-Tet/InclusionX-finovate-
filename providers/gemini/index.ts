import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini SDK
// It automatically picks up GEMINI_API_KEY from the environment if not explicitly passed,
// but we pass it explicitly to be safe.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const defaultModel = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

/**
 * Handles a conversation turn with the AI Assistant.
 * @param history Array of previous messages for context
 * @param systemInstruction Optional rules for the AI (e.g. "You are a VSLA financial advisor...")
 */
export async function generateChatResponse(history: ChatMessage[], systemInstruction?: string) {
  try {
    const contents = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: defaultModel,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return { success: true, text: response.text };
  } catch (error) {
    console.error('Error in Gemini chat generation:', error);
    return { success: false, error };
  }
}

/**
 * Translates text between English and Chichewa.
 * @param text The text to translate
 * @param targetLanguage 'en' for English, 'ny' for Chichewa
 */
export async function translateText(text: string, targetLanguage: 'en' | 'ny') {
  try {
    const prompt = targetLanguage === 'ny' 
      ? `Translate the following English text to Chichewa (Malawi). Respond ONLY with the translation, no extra text, no quotes:\n\n${text}`
      : `Translate the following Chichewa text to English. Respond ONLY with the translation, no extra text, no quotes:\n\n${text}`;

    const response = await ai.models.generateContent({
      model: defaultModel,
      contents: prompt,
      config: {
        temperature: 0.1, // Low temperature for more deterministic translations
      }
    });

    return { success: true, translation: response.text?.trim() };
  } catch (error) {
    console.error('Error in Gemini translation:', error);
    return { success: false, error };
  }
}
