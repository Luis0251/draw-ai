"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

// Configura el cliente con la versión correcta
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

interface ShapeInfo {
  type: string;
  text: string;
}

export async function generateResponse(inputs: ShapeInfo[]) {
  try {
    const inputShapes = inputs.filter(input => input.type === "input");
    const userPrompt = inputShapes.map(shape => shape.text).join("\n");

   
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash", 
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: userPrompt }]
        }
      ],
      systemInstruction: {
        role: "system",
        parts: [{ 
          text: "You are a helpful assistant that generates clear, step-by-step instructions" 
        }]
      }
    });

    return result.response.text();
  } catch (error) {
    console.error("Error with Gemini API:", error);
    
 
    if (error.message.includes('404')) {
      throw new Error("Error de configuración con el servicio de IA. Por favor, contacta al soporte.");
    } else if (error.message.includes('Quota')) {
      throw new Error("Hemos excedido el límite de solicitudes. Intenta nuevamente en un minuto.");
    } else {
      throw new Error("Error al generar la respuesta. Por favor, inténtalo de nuevo.");
    }
  }
}