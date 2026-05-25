import { Handler } from "@netlify/functions";
import { GoogleGenAI, Type } from "@google/genai";

export const handler: Handler = async (event, context) => {
  // Support Preflight CORS requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  // Only POST is allowed for generation
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Metodo non consentito. Richiesto metodo POST." }),
    };
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Chiave API Gemini mancante. Impostala nel pannello di controllo di Netlify come variabile d'ambiente 'GEMINI_API_KEY'."
        }),
      };
    }

    // Parse payload from request body
    const body = JSON.parse(event.body || "{}");
    const { topic, targetLanguage, baseLanguage, numTurns = 5 } = body;

    if (!targetLanguage || !baseLanguage) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "I parametri 'targetLanguage' e 'baseLanguage' sono obbligatori." }),
      };
    }

    // Initialize modern Google GenAI Client
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build-netlify",
        },
      },
    });

    const prompt = `Generate a high-quality educational language learning dialogue scene.
Topic context: ${topic || "Daily polite conversation"}
Learning/Target Language (written in correct official native alphabet script): ${targetLanguage}
User's Base/Translation Language: ${baseLanguage}

Instructions:
1. Provide a script of exactly ${numTurns} turns alternating between user Speaker A and Speaker B.
2. The dialog must be authentic, natural, and helpful for learning ${targetLanguage}.
3. Each turn must fit a card graphic and provide:
   - "text": The sentence written perfectly in native script of ${targetLanguage} (like Hangul for Korean, Hiragana/Kanji for Japanese, Hanzi for Chinese, Arabic, Cyrillic, Devanagari, Greek, etc.). Keep it authentic!
   - "romanization": The full phonetical romanization or Latin pronunciation helper (e.g. 'Annyeonghaseyo', 'Konnichiwa', 'Ni hao'). If the target language is already Latin-based (like Italian, French, Spanish, German, Portuguese), write a small helpful guide or phonetic hint on accents/intonation in parentheses, or the raw sentence. It must never be left empty.
   - "translation": The sentence translated accurately and naturally in ${baseLanguage}.
   - "speaker": 'A' or 'B' (represents Left or Right speaker).
   - "id": A clean, simple id string (e.g. "turn_1", "turn_2").
`;

    // Call Gemini 3.5-flash with Structured Output schema (Type Safe JSON)
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "Short title in the baseLanguage representing the dialogue theme."
            },
            bubbles: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  text: { type: Type.STRING, description: "Native language script sentence of the character" },
                  romanization: { type: Type.STRING, description: "Phonetic transliteration or Latin spelling to speak it out loud" },
                  translation: { type: Type.STRING, description: "Human translation in the user's native language" },
                  speaker: { type: Type.STRING, description: "Speaker code: 'A' or 'B'" }
                },
                required: ["id", "text", "romanization", "translation", "speaker"]
              }
            }
          },
          required: ["title", "bubbles"]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: JSON.stringify(parsedData),
    };

  } catch (err: any) {
    console.error("Gemini API Netlify function dialogue generation failure:", err);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: err?.message || "Impossibile generare la conversazione via AI." }),
    };
  }
};
