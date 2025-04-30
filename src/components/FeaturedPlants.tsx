
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Plant } from "@/types/plants";
import { toast } from "sonner";

const FeaturedPlants = () => {
  const [featuredPlants, setFeaturedPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPlant, setCurrentPlant] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  useEffect(() => {
    const fetchFeaturedPlants = async () => {
      try {
        const { data, error } = await supabase
          .from("plants")
          .select(`
            *,
            plant_categories(name)
          `)
          .limit(5);
        
        if (error) {
          throw error;
        }
        
        setFeaturedPlants(data || []);
      } catch (error) {
        console.error("Error fetching featured plants:", error);
        toast.error("Failed to load featured plants");
        
        // Fallback to sample data if database fetch fails
        setFeaturedPlants(fallbackPlantData);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedPlants();
  }, []);

  const nextPlant = () => {
    setCurrentPlant((prev) => (prev === featuredPlants.length - 1 ? 0 : prev + 1));
  };

  const prevPlant = () => {
    setCurrentPlant((prev) => (prev === 0 ? featuredPlants.length - 1 : prev - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (diff > 50) {
      nextPlant(); // Swipe left
    } else if (diff < -50) {
      prevPlant(); // Swipe right
    }
  };

  // Fallback data if no plants are loaded from the database
  const fallbackPlantData = [
    {
      id: 1,
      name: "Tulsi",
      scientific_name: "Ocimum sanctum",
      image_url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&q=80",
      description: "Known as Holy Basil, Tulsi is revered in Ayurveda for its adaptogenic properties that help the body counter stress and boost immunity.",
      medicinal_uses: "Immunity, Respiratory",
      how_to_use: null,
      created_at: new Date().toISOString(),
      category_id: 1,
      plant_categories: { name: "Ayurvedic" }
    },
    {
      id: 2,
      name: "Ashwagandha",
      scientific_name: "Withania somnifera",
      image_url: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&h=600&q=80",
      description: "A powerful adaptogen used to help the body resist physiological and psychological stress. It promotes strength and vigor.",
      medicinal_uses: "Stress, Vitality",
      how_to_use: null,
      created_at: new Date().toISOString(),
      category_id: 1,
      plant_categories: { name: "Ayurvedic" }
    },
    {
      id: 3,
      name: "Neem",
      scientific_name: "Azadirachta indica",
      image_url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=600&q=80",
      description: "Renowned for its antibacterial, antifungal and blood-purifying properties. Widely used for skin conditions and as a natural pesticide.",
      medicinal_uses: "Skin Health, Detoxification",
      how_to_use: null,
      created_at: new Date().toISOString(),
      category_id: 1,
      plant_categories: { name: "Ayurvedic" }
    }
  ];

  // Use fallback data if no featured plants are available
  const plantsToShow = featuredPlants.length > 0 ? featuredPlants : fallbackPlantData;
  const currentPlantData = plantsToShow[currentPlant];
  const defaultImage = "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=600&q=80";

  return (
    <section id="featured-plants" className="py-16 bg-herbal-yellow/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-herbal-brown">
            Featured Plant of the Week
          </h2>
          <div className="w-24 h-1 bg-herbal-green mx-auto"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="animate-pulse p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-300 h-72 md:h-96 rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ) : (
            <div 
              className="relative"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full z-10 px-4">
                <Button 
                  onClick={prevPlant}
                  variant="outline" 
                  size="icon" 
                  className="bg-white/80 backdrop-blur-sm hover:bg-white rounded-full h-10 w-10"
                  aria-label="Previous plant"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Button 
                  onClick={nextPlant}
                  variant="outline" 
                  size="icon" 
                  className="bg-white/80 backdrop-blur-sm hover:bg-white rounded-full h-10 w-10"
                  aria-label="Next plant"
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="relative h-72 md:h-96 overflow-hidden rounded-lg">
                  <img
                    src={currentPlantData.image_url || defaultImage}
                    alt={currentPlantData.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = defaultImage;
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-herbal-green mb-2">
                    {currentPlantData.name}
                  </h3>
                  <p className="text-gray-600 italic mb-4">
                    {currentPlantData.scientific_name}
                  </p>
                  
                  <div className="flex gap-2 mb-4">
                    {currentPlantData.medicinal_uses && currentPlantData.medicinal_uses.split(',').map((tag, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 text-sm font-medium bg-herbal-green/10 text-herbal-green rounded-full"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-6">
                    {currentPlantData.description}
                  </p>
                  
                  <Button className="bg-herbal-green hover:bg-herbal-green/90 text-white" asChild>
                    <Link to={`/plant/${currentPlantData.id}`}>
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex justify-center mt-6 gap-2">
                {plantsToShow.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPlant(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentPlant ? "bg-herbal-green" : "bg-gray-300"
                    }`}
                    aria-label={`Go to plant ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-herbal-brown">
              Popular Medicinal Plants
            </h2>
            <div className="w-20 h-1 bg-herbal-green mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-lg"></div>
                </div>
              ))
            ) : (
              plantsToShow.slice(0, 4).map(plant => (
                <Link to={`/plant/${plant.id}`} key={plant.id}>
                  <Card className="plant-card overflow-hidden">
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={plant.image_url || defaultImage} 
                        alt={plant.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = defaultImage;
                        }}
                      />
                      <div className="plant-card-overlay">
                        <h3 className="text-white font-bold text-lg">{plant.name}</h3>
                        <p className="text-white/90 text-sm">{plant.scientific_name}</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2 bg-white/20 text-white border-white/40 hover:bg-white/40 hover:text-white"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
            )}
          </div>
          <div className="text-center mt-8">
            <Button className="bg-herbal-brown hover:bg-herbal-brown/90 text-white" asChild>
              <Link to="/plants">
                View All Plants
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlants;
