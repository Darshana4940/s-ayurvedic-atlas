
import { useState } from "react";
import { useGemini } from "@/hooks/use-gemini";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plant } from "@/types/plants";
import { Sparkles, SendHorizonal, Loader2 } from "lucide-react";

interface PlantAIProps {
  plant?: Plant;
  initialPrompt?: string;
  title?: string;
  className?: string;
}

const PlantAI = ({ plant, initialPrompt, title = "Ask about this plant", className = "" }: PlantAIProps) => {
  const [query, setQuery] = useState(initialPrompt || "");
  const [answer, setAnswer] = useState<string | null>(null);
  const { generatePlantInfo, isLoading } = useGemini({
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

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-herbal-green" />
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {answer && (
          <div className="mb-4 p-4 bg-herbal-green/5 rounded-lg border border-herbal-green/20">
            <div className="prose prose-sm max-w-none font-inter text-gray-700">
              {answer.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-3 last:mb-0 text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={plant 
              ? `Ask anything about ${plant.name}...` 
              : "Ask about medicinal plants or Ayurvedic traditions..."}
            className="min-h-[100px]"
          />
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          className="w-full bg-herbal-green hover:bg-herbal-green/90"
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
};

export default PlantAI;
