
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.6";

// Set up CORS headers for browser access
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Response helper function
function createResponse(body: any, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// Handle plant information requests using Google's Gemini API
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the Gemini API key from environment variables
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      console.error("Missing GEMINI_API_KEY environment variable");
      return createResponse({ 
        error: "Server configuration error: API key not found" 
      }, 500);
    }

    // Parse request body
    const { query, plantInfo } = await req.json();
    
    // Validate request
    if (!query || typeof query !== "string") {
      return createResponse({ error: "Invalid or missing query" }, 400);
    }

    console.log("Processing query:", query);
    console.log("Plant information provided:", plantInfo?.name || "None");

    // Create Supabase client to access database if needed
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");
    
    // Fetch plant data from database if id is provided but no plantInfo
    let plant = plantInfo;
    if (!plant && req.headers.get("Authorization")) {
      if (!supabaseUrl || !supabaseKey) {
        return createResponse({ error: "Server configuration error" }, 500);
      }
      
      const supabase = createClient(supabaseUrl, supabaseKey);
      try {
        // Attempt to find plant by name or ID in the query if not directly provided
        const searchTerms = query.match(/([a-zA-Z\s]+)/g) || [];
        for (const term of searchTerms) {
          if (term.trim().length < 3) continue;
          
          const { data } = await supabase
            .from("plants")
            .select("*")
            .ilike("name", `%${term.trim()}%`)
            .limit(1);
            
          if (data && data.length > 0) {
            plant = data[0];
            console.log(`Found plant in database: ${plant.name}`);
            break;
          }
        }
      } catch (error) {
        console.error("Error searching for plant in database:", error);
      }
    }

    // Construct prompt based on available information
    let prompt = "";
    
    if (plant) {
      prompt = `
Please provide information about the medicinal plant "${plant.name}" (${plant.scientific_name}) based on the following query: "${query}"

Here's what I know about this plant:
${plant.description ? `- Description: ${plant.description}` : ""}
${plant.medicinal_uses ? `- Medicinal Uses: ${plant.medicinal_uses}` : ""}
${plant.how_to_use ? `- How to Use: ${plant.how_to_use}` : ""}

Please respond in a friendly, informative tone and format your answer in well-structured paragraphs. Include both traditional uses and any modern scientific findings if relevant. Focus on answering the query specifically.
      `;
    } else {
      prompt = `
Please provide information about medicinal plants or Ayurvedic traditions based on the following query: "${query}"

Please respond in a friendly, informative tone and format your answer in well-structured paragraphs. Include both traditional knowledge and any modern scientific findings if relevant. Focus on answering the query specifically.
      `;
    }

    // Call the Gemini API
    console.log("Sending request to Gemini API...");
    const geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
    const geminiResponse = await fetch(`${geminiUrl}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      }),
    });

    // Handle API response
    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error("Gemini API error:", geminiResponse.status, errorText);
      return createResponse({
        error: `API error: ${geminiResponse.status} ${geminiResponse.statusText}`,
      }, 500);
    }

    // Parse and format the response
    const data = await geminiResponse.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      console.error("No response from Gemini API:", data);
      return createResponse({
        error: "No response generated",
      }, 500);
    }

    const candidate = data.candidates[0];
    if (candidate.finishReason !== "STOP" && candidate.finishReason !== "MAX_TOKENS") {
      console.warn("Response may be incomplete. Finish reason:", candidate.finishReason);
    }

    if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
      console.error("Invalid response structure from Gemini API:", candidate);
      return createResponse({
        error: "Invalid response structure",
      }, 500);
    }

    const content = candidate.content.parts[0].text || "";
    console.log("Gemini API responded successfully");

    return createResponse({ content });
  } catch (error) {
    console.error("Unhandled error:", error);
    return createResponse({
      error: `Server error: ${error.message || "Unknown error"}`,
    }, 500);
  }
});
