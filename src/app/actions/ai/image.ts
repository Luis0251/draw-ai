"use server";

export async function generateAIImage(prompt: string) {
    const apiKey = process.env.DREAM_STUDIO_API_KEY;
    if(!apiKey) {
        throw new Error("No se ha proporcionado la clave de API de Dream Studio");
    }

    try{
        const engineId = "stable-diffusion-xl-1024-v1-0";
        const apiUrl = `https://api.stability.ai/v1/generation/${engineId}/text-to-image`;
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                text_prompts: [{
                    text: prompt,
                    weight: 1,
                }],
                cfg_scale: 7,
                width: 1024,
                height: 1024,
                samples: 1,
                steps:30,
                style_preset: "digital-art",
            }),
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`Error en la API: ${response.status} ${response.statusText} -  ${JSON.stringify(errorResponse)}`);
        }
        const responseData = await response.json();
        if(responseData.artifacts && responseData.artifacts.length > 0) {
            const imageBase64 = responseData.artifacts[0].base64;
            return Buffer.from(imageBase64, "base64");
        } else {
            throw new Error("Error al generar la imagen. Por favor, inténtalo de nuevo.");
        }
    }catch(error) {
        console.error("Error al generar la imagen:", error);
         throw new Error("Error al generar imagen: " + error);
    }
}