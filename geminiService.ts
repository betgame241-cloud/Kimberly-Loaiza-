import { GoogleGenAI } from "@google/genai";
import { GeminiModel } from '../types';

// Helper to convert URL to Base64 (needed because we are using placeholder URLs initially)
export const urlToBase64 = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64Data = base64.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error converting image to base64:", error);
    throw error;
  }
};

export const geminiService = {
  /**
   * Edit an image using Gemini 2.5 Flash Image based on a text prompt.
   */
  editImage: async (imageBase64: string, prompt: string): Promise<string> => {
    if (!process.env.API_KEY) {
      throw new Error("API Key is missing");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const response = await ai.models.generateContent({
        model: GeminiModel.FLASH_IMAGE,
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: imageBase64,
              },
            },
            {
              text: `Edit this image. ${prompt}. Return ONLY the edited image.`,
            },
          ],
        },
      });

      // Extract image from response
      // Typically image generation/editing responses might have the image in inlineData
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
      
      throw new Error("No image returned from Gemini");

    } catch (error) {
      console.error("Gemini Image Edit Error:", error);
      throw error;
    }
  },

  /**
   * Generate a bio or search for information using Gemini 3 Flash + Google Search
   */
  generateBioFromSearch: async (username: string): Promise<string> => {
    if (!process.env.API_KEY) {
      throw new Error("API Key is missing");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const response = await ai.models.generateContent({
        model: GeminiModel.FLASH_SEARCH,
        contents: `Find the latest public information about ${username} (influencer/artist). Write a short, punchy Instagram bio for them in Spanish. Include relevant emojis. Maximum 3 lines.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      return response.text || "No bio generated.";
    } catch (error) {
      console.error("Gemini Search Error:", error);
      throw error;
    }
  }
};