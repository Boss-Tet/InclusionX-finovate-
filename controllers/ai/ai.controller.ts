import { generateChatResponse, translateText, ChatMessage } from '../../providers/groq';

/**
 * AI Controller
 * Orchestrates AI functionalities like chatbot interactions and translations.
 * Later, this can include rate limiting, role-based checks, or audit logging.
 */
export class AIController {
  
  /**
   * Generates a response from the AI assistant.
   */
  static async getChatReply(history: ChatMessage[], systemInstruction?: string) {
    // Future: Add rate limiting or token counting logic here
    const result = await generateChatResponse(history, systemInstruction);
    return result;
  }

  /**
   * Translates text between supported languages (e.g. English <-> Chichewa)
   */
  static async translate(text: string, targetLanguage: 'en' | 'ny') {
    // Future: Add caching to prevent translating the same static string multiple times
    const result = await translateText(text, targetLanguage);
    return result;
  }
}
