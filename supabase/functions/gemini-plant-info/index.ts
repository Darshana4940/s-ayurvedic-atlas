
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, plantInfo } = await req.json();
    
    let prompt = query;
    
    // If plant information is provided, include it in the context for the AI
    if (plantInfo) {
      prompt = `Based on the following information about a plant:
      
Plant Name: ${plantInfo.name}
Scientific Name: ${plantInfo.scientific_name}
Description: ${plantInfo.description || 'Not available'}
Medicinal Uses: ${plantInfo.medicinal_uses || 'Not available'}
How to Use: ${plantInfo.how_to_use || 'Not available'}

${query}

Please provide a comprehensive, accurate, and science-based response. Include information about traditional Ayurvedic, Unani, or Siddha medicine applications where relevant.`;
    } else {
      // If no specific plant info, use a general prompt about medicinal plants
      prompt = `As an expert in traditional medicinal plants and Ayurvedic medicine, please provide information about the following: ${query}
      
Please provide a comprehensive, accurate, and science-based response. Include information about traditional Ayurvedic, Unani, or Siddha medicine applications where relevant.`;
    }

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1000,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    const data = await response.json();
    
    // Check if response has the expected structure
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts) {
      console.error("Unexpected API response structure:", JSON.stringify(data));
      throw new Error("Unexpected response format from Gemini API");
    }

    const generatedContent = data.candidates[0].content.parts[0].text;

    return new Response(
      JSON.stringify({ 
        content: generatedContent
      }),
      { 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        } 
      }
    );
  } catch (error) {
    console.error("Error in gemini-plant-info function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "An error occurred while processing your request" 
      }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        } 
      }
    );
  }
});
