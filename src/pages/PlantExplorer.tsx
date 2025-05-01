
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Plant, PlantCategory } from "@/types/plants";
import { Search, Leaf, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import PlantAI from "@/components/PlantAI";
import { Sparkles } from "lucide-react";

const PlantExplorer = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [categories, setCategories] = useState<PlantCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("plant_categories")
          .select("*");
        
        if (error) {
          throw error;
        }
        
        setCategories(data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load plant categories");
      }
    };
    
    fetchCategories();
  }, []);
  
  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      
      try {
        let query = supabase
          .from("plants")
          .select(`
            *,
            plant_categories(name)
          `);
          
        if (selectedCategory !== "all") {
          query = query.eq("category_id", parseInt(selectedCategory));
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        setPlants(data || []);
      } catch (error) {
        console.error("Error fetching plants:", error);
        toast.error("Failed to load plants");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlants();
  }, [selectedCategory]);

  const filteredPlants = plants.filter((plant) => {
    return (
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.scientific_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (plant.description && plant.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (plant.medicinal_uses && plant.medicinal_uses.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const defaultImage = "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=600&q=80";

  const handlePlantClick = (plant: Plant, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedPlant(plant);
    setIsDetailsOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 pb-12">
        <div className="bg-herbal-green/10 py-14">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-herbal-green text-center mb-6">
              Explore Medicinal Plants
            </h1>
            <p className="text-gray-700 text-center max-w-2xl mx-auto mb-8">
              Discover the healing properties of plants used in traditional Ayurvedic, Unani, and Siddha medicine systems.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by name, use, or benefit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-herbal-green/20 focus:border-herbal-green"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-lg mb-3"></div>
                  <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filteredPlants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPlants.map((plant) => (
                <div key={plant.id} onClick={(e) => handlePlantClick(plant, e)}>
                  <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={plant.image_url || defaultImage}
                        alt={plant.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = defaultImage;
                        }}
                      />
                    </div>
                    <CardContent className="p-4">
                      {plant.category_id && (
                        <Badge variant="outline" className="mb-2 bg-herbal-green/10 text-herbal-green border-herbal-green/20">
                          {(plant as any).plant_categories?.name || "Uncategorized"}
                        </Badge>
                      )}
                      <h3 className="font-semibold text-lg text-herbal-green mb-1">
                        {plant.name}
                      </h3>
                      <p className="text-sm text-gray-600 italic mb-2">
                        {plant.scientific_name}
                      </p>
                      {plant.description && (
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {plant.description}
                        </p>
                      )}
                      <div className="mt-3 flex items-center text-herbal-green">
                        <Sparkles className="h-4 w-4 mr-1" />
                        <span className="text-xs">Click for AI insights</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Leaf className="mx-auto h-12 w-12 text-herbal-green/30 mb-4" />
              <h3 className="text-xl font-semibold text-herbal-green mb-2">No Plants Found</h3>
              <p className="text-gray-600 mb-6">No plants match your search criteria.</p>
              <Button onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Plant Details Dialog with Gemini AI */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          {selectedPlant && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-herbal-green">
                  {selectedPlant.name}
                </DialogTitle>
                <p className="text-gray-600 italic">
                  {selectedPlant.scientific_name}
                </p>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div>
                  <img
                    src={selectedPlant.image_url || defaultImage}
                    alt={selectedPlant.name}
                    className="w-full h-64 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = defaultImage;
                    }}
                  />

                  <div className="mt-4">
                    {selectedPlant.description && (
                      <div className="mb-4">
                        <h3 className="font-semibold text-herbal-brown">Description</h3>
                        <p className="text-gray-700">{selectedPlant.description}</p>
                      </div>
                    )}
                    
                    {selectedPlant.medicinal_uses && (
                      <div className="mb-4">
                        <h3 className="font-semibold text-herbal-brown">Medicinal Uses</h3>
                        <p className="text-gray-700">{selectedPlant.medicinal_uses}</p>
                      </div>
                    )}
                  </div>

                  <Button 
                    asChild 
                    variant="outline" 
                    className="mt-4 w-full border-herbal-green text-herbal-green hover:bg-herbal-green/10"
                  >
                    <Link to={`/plant/${selectedPlant.id}`}>
                      View Full Details
                    </Link>
                  </Button>
                </div>

                <div>
                  <PlantAI 
                    plant={selectedPlant} 
                    title="Ask AI About This Plant" 
                    initialPrompt={`What are the key medicinal properties and traditional uses of ${selectedPlant.name}?`}
                  />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default PlantExplorer;
