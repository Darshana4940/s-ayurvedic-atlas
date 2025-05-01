
import { useState } from "react";
import { useGemini } from "@/hooks/use-gemini";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, SendHorizonal, Loader2 } from "lucide-react";

interface AIAssistantProps {
  className?: string;
}

const AIAssistant = ({ className = "" }: AIAssistantProps) => {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [conversations, setConversations] = useState<{ query: string; answer: string }[]>([]);
  const { generatePlantInfo, isLoading } = useGemini({
    onSuccess: (content) => {
      setAnswer(content);
      if (query) {
        setConversations([...conversations, { query, answer: content }]);
      }
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    
    const content = await generatePlantInfo(query);
    if (content) {
      setConversations([...conversations, { query, answer: content }]);
      setQuery("");
    }
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold flex items-center">
          <Bot className="h-5 w-5 mr-2 text-herbal-green" />
          Ayurvedic Knowledge Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        {conversations.length === 0 ? (
          <div className="text-center py-8">
            <Bot className="h-10 w-10 mx-auto text-herbal-green/40 mb-3" />
            <p className="text-gray-500">
              Ask me anything about ayurvedic plants, traditional medicine, or health practices
            </p>
          </div>
        ) : (
          <div className="mb-4 space-y-4 max-h-[400px] overflow-y-auto">
            {conversations.map((convo, index) => (
              <div key={index}>
                <div className="bg-gray-100 p-3 rounded-lg mb-2">
                  <p className="font-medium">You asked:</p>
                  <p>{convo.query}</p>
                </div>
                <div className="bg-herbal-green/5 p-3 rounded-lg border border-herbal-green/20">
                  <p className="font-medium flex items-center text-herbal-green">
                    <Bot className="h-4 w-4 mr-1" /> AI Response:
                  </p>
                  <div className="prose prose-sm max-w-none mt-1">
                    {convo.answer.split('\n').map((paragraph, idx) => (
                      paragraph.trim() ? <p key={idx} className="mb-2 last:mb-0">{paragraph}</p> : null
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about medicinal plants, ayurvedic practices, or herbal remedies..."
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
              Ask Assistant
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIAssistant;
