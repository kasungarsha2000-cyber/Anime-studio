import { GoogleGenerativeAI } from "@google/generative-ai";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// REMOVED: Pollinations Fallback (Unstable/Deprecated endpoints)

// MULTI-KEY ROTATOR
// Add more keys here to multiply your daily quota limits.
const API_KEYS = [
  "AIzaSyCYFwyLfRnUerQ0SqbbbWL3qrUwMKVa5j8", // Original Key 1
  "AIzaSyA3W-rzrl6MCRfvYqvmxAPj19X4nS0i5zY", // User Provided
  "AIzaSyDlGreoj8ZNCXp2IP9xHvJFN0ytKf92ycQ", // User Provided
  "AIzaSyCvk1w9zDiJ6GF8moDpleruNObGP4UKenE", // User Provided
  "AIzaSyBkiNpAXUSSo0wKElMs-bMrLXuektbWhcU"  // User Provided
].filter(key => key && !key.includes('ADD_YOUR_'));

let currentKeyIndex = 0;

export function getActiveApiKey() {
  if (API_KEYS.length === 0) throw new Error("No valid API keys configured.");
  return API_KEYS[currentKeyIndex];
}

export function rotateApiKey() {
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
  console.log(`[Stability Relay] Rotated to API Key ${currentKeyIndex + 1}/${API_KEYS.length}`);
  return getActiveApiKey();
}

async function retryOnQuota(fn, retries = 2) {
  // We will try up to 10 total times, cycling keys softly.
  const maxAttempts = API_KEYS.length * (retries + 1);
  let backoffDelay = 2000; // Start with 2 second delay to prevent rapid IP blocking
  
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn();
    } catch (error) {
      const isQuotaError = error.message?.includes('429') || error.status === 429 || error.message?.includes('exceeded');
      
      if (isQuotaError && i < maxAttempts - 1) {
        console.warn(`[API Relay] 429 Quota/Rate Limit on Key ${currentKeyIndex + 1}. Disengaging for ${backoffDelay}ms...`);
        
        // Critical: Must wait before rotating to prevent Google Cloud Armor from blacklisting IP due to 5 instant consecutive 429s
        await sleep(backoffDelay);
        
        if (API_KEYS.length > 1) {
           rotateApiKey();
        }
        
        // Exponential backoff for the next potential failure
        backoffDelay = Math.min(backoffDelay * 1.5, 8000);
        continue;
      }
      
      // If we hit maximum attempts, or it's a structural error (not a 429), throw immediately.
      console.error(`[API Relay] Critical task failure after ${i + 1} attempts.`, error);
      throw error;
    }
  }
}

const getGenerativeModel = (modelName = 'gemini-2.5-flash') => {
  const genAI = new GoogleGenerativeAI(getActiveApiKey());
  return genAI.getGenerativeModel({ model: modelName });
};

// Converts a base64 string and mime type into a generative part format
export function fileToGenerativePart(base64Data, mimeType) {
  // Extract base64 part if it contains a data URI prefix
  const base64String = base64Data.split(',')[1] || base64Data;
  return {
    inlineData: {
      data: base64String,
      mimeType
    },
  };
}

/**
 * ANALYZE LAYOUT
 * Maps the visual zones and art style of a character sheet template
 */
export async function analyzeLayout(imageB64, mimeType) {
  return retryOnQuota(async () => {
    const model = getGenerativeModel('gemini-2.5-flash');
    const prompt = `
      Analyze this character profile sheet layout with mathematical precision. 
      Identify and map every visual zone:
      1. MAIN FIGURE: Where is the primary full-body figure? What is its relative size/proportion to the page?
      2. INSET ZONES: Identify every smaller illustration zone. For each, note:
         - Position (e.g., "Top Right", "Bottom Left")
         - Purpose (e.g., "Close-up Face", "Side Profile", "Action Pose")
         - Size relative to the main figure.
      3. TEXT ZONES: Where are the name headlines and bio boxes?
      
      Provide a "Composition Map" that describes the spatial relationship and proportions of these zones. 
      Also, identify the ART STYLE.
    `;

    const imagePart = fileToGenerativePart(imageB64, mimeType);
    const result = await model.generateContent([prompt, imagePart]);
    return result.response.text();
  });
}

/**
 * RESEARCH CHARACTER
 * Forensic level analysis of a canonical character
 */
export async function researchCharacter(name, notes) {
  return retryOnQuota(async () => {
    const model = getGenerativeModel('gemini-2.5-flash');
    const prompt = `
      TASK: Conduct an exhaustive, forensic-level analysis and verification of the fictional character: "${name}".
      User Notes: "${notes}"
      
      STEP 1: RESEARCH
      Define the character's EXACT visual identity. Pay extreme attention to:
      - CLOTHING: Every layer, fabric type, specific patterns, buttons, zippers, and how the clothes fit.
      - FEATURES: Exact eye color, hair style, scars, tattoos, unique physical traits.
      - ART STYLE: The precise rendering technique used in their most iconic appearance.
      
      STEP 2: VERIFICATION
      Cross-reference findings with canonical sources.
      
      RETURN JSON FORMAT:
      {
        "fullName": "string",
        "franchise": "string",
        "appearance": "Forensic detail of physical features and EXACT clothing.",
        "personality": "string",
        "bio": "Fact-checked biography.",
        "style": "Precise art style definition."
      }
      RETURN ONLY RAW JSON.
    `;

    const result = await model.generateContent(prompt);
    let text = result.response.text();
    
    let startIdx = text.indexOf('{');
    let endIdx = text.lastIndexOf('}');
    if (startIdx !== -1 && endIdx !== -1) {
      text = text.substring(startIdx, endIdx + 1);
    }
    return JSON.parse(text);
  });
}

/**
 * GENERATE CHARACTER SHEET (Image Generation)
 * Uses gemini-2.5-flash-image
 */
export async function generateCharacterSheet(layoutDesc, charDetails, notes, sampleImage, aspectRatio = "3:4") {
  return retryOnQuota(async () => {
    const apiKey = "AIzaSyCYFwyLfRnUerQ0SqbbbWL3qrUwMKVa5j8";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    TASK: Architect a high-fidelity character profile sheet that is a PIXEL-PERFECT structural clone of the provided REFERENCE TEMPLATE.
    
    TOTAL REPLACEMENT DIRECTIVE:
    - You MUST ERASE and COMPLETELY REPLACE every single character, object, and unique visual element from the REFERENCE TEMPLATE.
    - The template is ONLY a guide for SPATIAL LAYOUT and ART STYLE.
    - Every figure, every inset, and every icon MUST be 100% unique to "${charDetails.fullName}".
    
    STRICT COMPOSITION MAPPING:
    - You MUST map the new character's views to the EXACT coordinates and relative proportions identified in this map: ${layoutDesc}
    
    STYLE & ART REIMAGINING:
    - You MUST RE-RENDER and REIMAGINE "${charDetails.fullName}" to perfectly fit the EXACT ART STYLE and COLOR PALETTE of the reference image. 
    
    TEXT LEGIBILITY:
    - Name Headline: "${charDetails.fullName}"
    - Bio/Description Boxes: Use details from: ${charDetails.bio}
    - Personality/Stats: Use details from: ${charDetails.personality}
    
    CHARACTER ACCURACY:
    - Features: ${charDetails.fullName}'s canonical face, hair, and eyes.
    - Exact Clothing: ${charDetails.appearance}
    
    ADDITIONAL NOTES: ${notes}
  `;

  const imagePart = fileToGenerativePart(sampleImage.data, sampleImage.mimeType);
  
  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }, imagePart] }],
  });

  // Extract base64 from response
  const part = result.response.candidates[0].content.parts.find(p => p.inlineData);
  if (part) {
    return `data:image/png;base64,${part.inlineData.data}`;
  }
    throw new Error("Failed to generate image part. This model might not support native image generation on your current quota.");
  });
}

/**
 * EDIT CHARACTER SHEET (Image Refinement)
 */
export async function editCharacterSheet(currentImageB64, editPrompt, charDetails) {
  return retryOnQuota(async () => {
    const apiKey = "AIzaSyCYFwyLfRnUerQ0SqbbbWL3qrUwMKVa5j8";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      TASK: Edit the provided character profile sheet based on the user's request.
      USER REQUEST: "${editPrompt}"
      CHARACTER: ${charDetails.fullName}
      APPEARANCE: ${charDetails.appearance}
      RULES: Maintain layout perfectly. Only change specific elements requested. Art style consistency is mandatory.
    `;

    const imagePart = {
      inlineData: {
        data: currentImageB64,
        mimeType: "image/png"
      }
    };

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }, imagePart] }]
    });

    const part = result.response.candidates[0].content.parts.find(p => p.inlineData);
    if (part) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
    throw new Error("Failed to refine image part.");
  });
}

export const generateContent = async ({ prompt, imageData = null, mimeType = 'image/jpeg', jsonSchema = null }) => {
  // We explicitly tell Gemini to return a JSON object with this shape
  const defaultSchema = `
    {
      "prompt": "Your MEGA-DETAILED 1000+ word highly structured image/video generation prompt here. It must be exhaustive.",
      "caption": "Your visually engaging Facebook caption here with emojis",
      "tags": "#anime #trending #tag3 ...",
      "checklist": {
        "wordCountMet": boolean,
        "compositionIncluded": boolean,
        "lightingIncluded": boolean,
        "safeWording": boolean
      }
    }
  `;
  
  const jsonInstruction = `
    CRITICAL INSTRUCTION: You MUST return ONLY a valid JSON object. Do not include markdown formatting like \`\`\`json. 
    CRITICAL JSON FORMATTING RULES:
    1. NO RAW NEWLINES OR TABS INSIDE STRINGS. You MUST escape newlines as \\n. 
    2. DO NOT use unescaped double quotes inside string values.
    
    The JSON object must have EXACTLY these keys:
    ${jsonSchema || defaultSchema}
  `;
  
  const finalPrompt = prompt + "\n\n" + jsonInstruction;

  return retryOnQuota(async () => {
    const model = getGenerativeModel('gemini-2.5-flash');
    let result;

    if (imageData) {
      const imagePart = fileToGenerativePart(imageData, mimeType);
      result = await model.generateContent([finalPrompt, imagePart]);
    } else {
      result = await model.generateContent(finalPrompt);
    }

    const responseText = result.response.text();
    
    // Robust JSON extraction
    let cleanJsonStr = responseText;
    let startIdx = cleanJsonStr.indexOf('{');
    let endIdx = cleanJsonStr.lastIndexOf('}');
    if (startIdx !== -1 && endIdx !== -1) {
      cleanJsonStr = cleanJsonStr.substring(startIdx, endIdx + 1);
    }
    
    let parsedData = JSON.parse(cleanJsonStr);

    // Save to history
    try {
      const history = JSON.parse(localStorage.getItem('generation_history') || '[]');
      history.unshift({
        date: new Date().toISOString(),
        type: imageData ? 'Multimodal Generation' : 'Text Generation',
        data: parsedData
      });
      // Keep last 20
      if (history.length > 20) history.pop();
      localStorage.setItem('generation_history', JSON.stringify(history));
    } catch(e) {
      console.error('Failed to save history', e);
    }

    return parsedData;
  });
};
