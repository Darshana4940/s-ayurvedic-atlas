
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
    setIsLoading(true);
    setContent(null);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('gemini-plant-info', {
        body: { query, plantInfo }
      });

      if (error) throw new Error(error.message);
      
      if (data.error) {
        throw new Error(data.error);
      }

      setContent(data.content);
      options?.onSuccess?.(data.content);
      return data.content;
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
    error
  };
}
