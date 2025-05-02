
import { useState } from "react";
import { useGemini } from "@/hooks/use-gemini";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plant } from "@/types/plants";
import { Sparkles, SendHorizonal, Loader2, RefreshCw } from "lucide-react";

interface PlantAIProps {
  plant?: Plant;
  initialPrompt?: string;
  title?: string;
  className?: string;
}

const PlantAI = ({ plant, initialPrompt, title = "Ask about this plant", className = "" }: PlantAIProps) => {
  const [query, setQuery] = useState(initialPrompt || "");
  const [answer, setAnswer] = useState<string | null>(null);
  const { generatePlantInfo, isLoading, error } = useGemini({
    onSuccess: (content) => {
      setAnswer(content);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    
    const content = await generatePlantInfo(query, plant);
    if (content) {
      setAnswer(content);
    }
  };

  const handleReset = () => {
    setQuery("");
    setAnswer(null);
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-herbal-green" />
            {title}
          </CardTitle>
          {answer && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleReset}
              className="h-8 w-8 p-0"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Reset</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {answer && (
          <div className="mb-4 p-4 bg-herbal-green/5 rounded-lg border border-herbal-green/20">
            <div className="prose prose-sm max-w-none">
              {answer.split('\n\n').map((paragraph, index) => (
                paragraph ? (
                  <p key={index} className="mb-3 last:mb-0 text-base font-normal text-gray-700">
                    {paragraph}
                  </p>
                ) : <br key={index} />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-700">{error.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={plant 
              ? `Ask anything about ${plant.name}...` 
              : "Ask about medicinal plants or Ayurvedic traditions..."}
            className="min-h-[100px] text-base"
          />
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          className="w-full bg-herbal-green hover:bg-herbal-green/90 text-base"
          disabled={isLoading || !query.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <SendHorizonal className="mr-2 h-4 w-4" />
              Get Information
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default PlantAI;
