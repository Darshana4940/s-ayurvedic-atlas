
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Plant, PlantCategory } from "@/types/plants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Compass, Filter, Sparkles, Search } from "lucide-react";
import { toast } from "sonner";
import PlantAI from "@/components/PlantAI";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const ExplorePage = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [categories, setCategories] = useState<PlantCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("plant_categories")
          .select("*")
          .order("name");
        
        if (error) throw error;
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
          `)
          .order("name");
          
        if (selectedCategory !== null) {
          query = query.eq("category_id", selectedCategory);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
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

  const handlePlantClick = (plant: Plant) => {
    setSelectedPlant(plant);
    setIsDetailsOpen(true);
  };
  
  const defaultImage = "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=600&q=80";

  const filteredPlants = plants.filter(plant => {
    const searchLower = searchTerm.toLowerCase();
    return (
      searchTerm === "" ||
      plant.name.toLowerCase().includes(searchLower) ||
      plant.scientific_name.toLowerCase().includes(searchLower) ||
      (plant.description && plant.description.toLowerCase().includes(searchLower)) ||
      (plant.medicinal_uses && plant.medicinal_uses.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 pb-12">
        {/* Hero section */}
        <section className="bg-herbal-green/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-full bg-herbal-green/20 flex items-center justify-center">
                <Compass className="h-7 w-7 text-herbal-green" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-herbal-green">Explore Medicinal Plants</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
              Discover a vast collection of medicinal plants from different traditions and learn about their properties, cultivation methods, and therapeutic applications.
            </p>
          </div>
        </section>
        
        {/* Search and Filters section */}
        <section className="py-10 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by plant name, properties, or uses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-herbal-green/20 focus:border-herbal-green"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-herbal-green" />
              <h2 className="text-xl font-semibold text-herbal-green">Filter by Category</h2>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                variant={selectedCategory === null ? "default" : "outline"} 
                className={selectedCategory === null ? "bg-herbal-green text-white hover:bg-herbal-green/90" : "border-herbal-green/30 text-herbal-green hover:bg-herbal-green/10"} 
                onClick={() => setSelectedCategory(null)}
              >
                All Plants
              </Button>
              
              {categories.map((category) => (
                <Button 
                  key={category.id} 
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={selectedCategory === category.id ? "bg-herbal-green text-white hover:bg-herbal-green/90" : "border-herbal-green/30 text-herbal-green hover:bg-herbal-green/10"}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Plants grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
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
                  <Card 
                    key={plant.id} 
                    className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
                    onClick={() => handlePlantClick(plant)}
                  >
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
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No plants found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or category filters.</p>
                <Button onClick={() => {
                  setSelectedCategory(null);
                  setSearchTerm("");
                }} variant="outline" className="border-herbal-green text-herbal-green">
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        </section>
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
                <DialogDescription className="text-gray-600 italic">
                  {selectedPlant.scientific_name}
                </DialogDescription>
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

export default ExplorePage;
