
import { GoogleGenAI } from "@google/genai";
import type { GeneratedImage } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Utility to convert a File to a base64 string and MIME type
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        resolve(''); // or handle ArrayBuffer case if needed
      }
    };
    reader.readAsDataURL(file);
  });

  const base64EncodedData = await base64EncodedDataPromise;
  
  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type,
    },
  };
};

/**
 * Creates an optimized prompt for image generation using Gemini 2.5 Flash and Google Search.
 * @param imageFile The user's uploaded image file.
 * @param userPrompt The user's text description of desired changes.
 * @returns An optimized prompt string.
 */
export const createImagePrompt = async (imageFile: File, userPrompt: string): Promise<string> => {
    const imagePart = await fileToGenerativePart(imageFile);
    const fullPrompt = `Você é um otimizador de prompt para uma IA de design de interiores. Com base na imagem e na solicitação do usuário, crie um prompt detalhado e aprimorado para a IA de geração de imagem modificar a foto. Pedido do usuário: "${userPrompt}"`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, { text: fullPrompt }] },
        config: {
            tools: [{ googleSearch: {} }],
        }
    });

    return response.text;
};


/**
 * Generates an image using the Gemini 2.0 Flash Preview Image Generation model.
 * @param imageFile The user's uploaded image file.
 * @param optimizedPrompt The AI-optimized text prompt.
 * @returns A GeneratedImage object.
 */
export const generateImage = async (imageFile: File, optimizedPrompt: string): Promise<GeneratedImage | null> => {
    const model = 'gemini-2.0-flash-preview-image-generation';
    
    const imagePart = await fileToGenerativePart(imageFile);

    const contents = [
        {
            role: 'user',
            parts: [
                imagePart,
                { text: optimizedPrompt }
            ]
        }
    ];

    const stream = await ai.models.generateContentStream({
        model: model,
        config: {
            responseModalities: ['IMAGE', 'TEXT'],
        },
        contents: contents,
    });

    for await (const chunk of stream) {
        if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
            const inlineData = chunk.candidates[0].content.parts[0].inlineData;
            if (inlineData.data && inlineData.mimeType) {
                 return {
                    base64: inlineData.data,
                    mimeType: inlineData.mimeType,
                };
            }
        }
    }

    throw new Error("A geração de imagem falhou em retornar uma imagem.");
};