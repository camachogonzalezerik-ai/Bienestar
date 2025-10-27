
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

interface KeywordResponse {
  conceptos: string[];
}

export const extractKeywords = async (text: string): Promise<string[]> => {
  const prompt = `
    Analiza el siguiente texto sobre salud y bienestar. Extrae 8 conceptos visuales y descriptivos que puedan representarse en imágenes para un collage.
    Los conceptos deben ser variados y cubrir los temas principales: bienestar físico, mental, social, medio ambiente, y hábitos saludables.
    Usa frases cortas y evocadoras.

    Texto:
    ---
    ${text}
    ---

    Devuelve la respuesta en formato JSON.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            conceptos: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Una lista de 8 conceptos visuales para el collage."
            }
          }
        }
      }
    });

    const jsonText = response.text;
    const parsed: KeywordResponse = JSON.parse(jsonText);
    if (parsed.conceptos && Array.isArray(parsed.conceptos)) {
      return parsed.conceptos;
    } else {
      throw new Error("La respuesta de la API no contiene el formato esperado de 'conceptos'.");
    }
  } catch (error) {
    console.error("Error al extraer palabras clave:", error);
    throw new Error("No se pudieron extraer los conceptos del texto.");
  }
};


export const generateImages = async (keywords: string[]): Promise<string[]> => {
  try {
    const imagePromises = keywords.map(keyword => {
      const fullPrompt = `${keyword}, fotografía realista, colores vibrantes, estilo de vida saludable, concepto de bienestar`;
      return ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: fullPrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
      });
    });

    const responses = await Promise.all(imagePromises);
    
    const imageUrls = responses.map(response => {
      if (response.generatedImages && response.generatedImages.length > 0) {
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        return `data:image/jpeg;base64,${base64ImageBytes}`;
      }
      throw new Error("Una de las respuestas de generación de imágenes estaba vacía.");
    });

    return imageUrls;
  } catch (error) {
    console.error("Error al generar imágenes:", error);
    throw new Error("No se pudieron generar las imágenes para el collage.");
  }
};
