
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plant } from "@/types/plants";

interface UseGeminiOptions {
  onSuccess?: (content: string) => void;
  onError?: (error: Error) => void;
}

export function useGemini(options?: UseGeminiOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const generatePlantInfo = async (query: string, plantInfo?: Plant) => {
    if (!query.trim()) {
      const errorMsg = "Please enter a question or query";
      setError(new Error(errorMsg));
      toast.error(errorMsg);
      return null;
    }
    
    setIsLoading(true);
    setContent(null);
    setError(null);

    try {
      console.log("Sending request to Gemini function", { query, plantInfo: plantInfo?.name });
      
      const { data, error } = await supabase.functions.invoke('gemini-plant-info', {
        body: { query, plantInfo }
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message || "Failed to call Gemini function");
      }
      
      if (data.error) {
        console.error("Gemini function returned error:", data.error);
        throw new Error(data.error);
      }

      const resultContent = data.content;
      setContent(resultContent);
      options?.onSuccess?.(resultContent);
      return resultContent;
    } catch (err) {
      console.error("Error generating plant information:", err);
      const errorMsg = err instanceof Error ? err.message : "Failed to generate information";
      setError(new Error(errorMsg));
      toast.error("Failed to generate information", {
        description: errorMsg
      });
      options?.onError?.(new Error(errorMsg));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generatePlantInfo,
    isLoading,
    content,
    error,
    clearContent: () => setContent(null),
    clearError: () => setError(null),
  };
}
