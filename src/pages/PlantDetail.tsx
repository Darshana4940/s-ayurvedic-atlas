
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Plant } from "@/types/plants";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const PlantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlant = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from("plants")
          .select(`
            *,
            plant_categories(name, description)
          `)
          .eq("id", parseInt(id))
          .single();

        if (error) {
          throw error;
        }

        setPlant(data);
      } catch (error) {
        console.error("Error fetching plant:", error);
        toast.error("Failed to load plant details");
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-herbal-green/20 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-herbal-green/20 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-herbal-green/20 rounded"></div>
                  <div className="h-4 bg-herbal-green/20 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-12 text-center">
          <h2 className="text-2xl font-bold text-herbal-green mb-4">Plant Not Found</h2>
          <p className="mb-6">The plant you're looking for could not be found.</p>
          <Button asChild>
            <Link to="/plants">Back to Plants</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const defaultImage = "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=600&q=80";

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-6">
          <Button variant="outline" asChild className="mb-6">
            <Link to="/plants" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Plants
            </Link>
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src={plant.image_url || defaultImage} 
                alt={plant.name} 
                className="w-full h-96 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = defaultImage;
                }}
              />
            </div>
            
            <div>
              <div className="flex flex-wrap gap-3 mb-4">
                {plant.category_id ? (
                  <Badge variant="outline" className="bg-herbal-green/10 text-herbal-green border-herbal-green/20">
                    {(plant as any).plant_categories?.name || "Uncategorized"}
                  </Badge>
                ) : null}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-herbal-green mb-2">
                {plant.name}
              </h1>
              <p className="text-gray-600 italic mb-6">
                {plant.scientific_name}
              </p>
              
              {plant.description && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2 text-herbal-brown">Description</h2>
                  <p className="text-gray-700">{plant.description}</p>
                </div>
              )}
              
              {plant.medicinal_uses && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2 text-herbal-brown">Medicinal Uses</h2>
                  <p className="text-gray-700">{plant.medicinal_uses}</p>
                </div>
              )}
              
              {plant.how_to_use && (
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-herbal-brown">How to Use</h2>
                  <p className="text-gray-700">{plant.how_to_use}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlantDetail;
