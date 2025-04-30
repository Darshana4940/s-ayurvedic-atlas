
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Plant, PlantCategory } from "@/types/plants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Compass, Filter } from "lucide-react";

const ExplorePage = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [categories, setCategories] = useState<PlantCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlants();
  }, [selectedCategory]);
  
  const defaultImage = "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=600&q=80";

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
        
        {/* Filters section */}
        <section className="py-10 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
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
            ) : plants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {plants.map((plant) => (
                  <Link to={`/plant/${plant.id}`} key={plant.id}>
                    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300">
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
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No plants found in this category</h3>
                <p className="text-gray-600 mb-4">Try selecting a different category or check back later.</p>
                <Button onClick={() => setSelectedCategory(null)} variant="outline" className="border-herbal-green text-herbal-green">
                  View All Plants
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ExplorePage;
