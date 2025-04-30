
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Sample data for featured plants
const plantData = [
  {
    id: 1,
    name: "Tulsi",
    scientific: "Ocimum sanctum",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&q=80",
    usage: "Immunity, Respiratory",
    description: "Known as Holy Basil, Tulsi is revered in Ayurveda for its adaptogenic properties that help the body counter stress and boost immunity."
  },
  {
    id: 2,
    name: "Ashwagandha",
    scientific: "Withania somnifera",
    image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&h=600&q=80",
    usage: "Stress, Vitality",
    description: "A powerful adaptogen used to help the body resist physiological and psychological stress. It promotes strength and vigor."
  },
  {
    id: 3,
    name: "Neem",
    scientific: "Azadirachta indica",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=600&q=80",
    usage: "Skin Health, Detoxification",
    description: "Renowned for its antibacterial, antifungal and blood-purifying properties. Widely used for skin conditions and as a natural pesticide."
  },
  {
    id: 4,
    name: "Turmeric",
    scientific: "Curcuma longa",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&q=80",
    usage: "Anti-inflammatory, Antioxidant",
    description: "Contains curcumin, which has powerful anti-inflammatory effects. Used in Ayurveda to treat pain, digestive issues and inflammation."
  },
  {
    id: 5,
    name: "Brahmi",
    scientific: "Bacopa monnieri",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&q=80",
    usage: "Brain Health, Memory",
    description: "Traditional brain tonic used to enhance memory, learning, and concentration. Also used for anxiety and certain neurological disorders."
  },
];

const FeaturedPlants = () => {
  const [currentPlant, setCurrentPlant] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const nextPlant = () => {
    setCurrentPlant((prev) => (prev === plantData.length - 1 ? 0 : prev + 1));
  };

  const prevPlant = () => {
    setCurrentPlant((prev) => (prev === 0 ? plantData.length - 1 : prev - 1));
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

  return (
    <section className="py-16 bg-herbal-yellow/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-herbal-brown">
            Featured Plant of the Week
          </h2>
          <div className="w-24 h-1 bg-herbal-green mx-auto"></div>
        </div>

        <div className="max-w-5xl mx-auto">
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
                  src={plantData[currentPlant].image}
                  alt={plantData[currentPlant].name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-2xl md:text-3xl font-bold text-herbal-green mb-2">
                  {plantData[currentPlant].name}
                </h3>
                <p className="text-gray-600 italic mb-4">
                  {plantData[currentPlant].scientific}
                </p>
                
                <div className="flex gap-2 mb-4">
                  {plantData[currentPlant].usage.split(',').map((tag, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 text-sm font-medium bg-herbal-green/10 text-herbal-green rounded-full"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6">
                  {plantData[currentPlant].description}
                </p>
                
                <Button className="bg-herbal-green hover:bg-herbal-green/90 text-white">
                  Learn More
                </Button>
              </div>
            </div>

            <div className="flex justify-center mt-6 gap-2">
              {plantData.map((_, index) => (
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
        </div>

        {/* Popular Plants Carousel */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-herbal-brown">
              Popular Medicinal Plants
            </h2>
            <div className="w-20 h-1 bg-herbal-green mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {plantData.map(plant => (
              <Card key={plant.id} className="plant-card overflow-hidden">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={plant.image} 
                    alt={plant.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="plant-card-overlay">
                    <h3 className="text-white font-bold text-lg">{plant.name}</h3>
                    <p className="text-white/90 text-sm">{plant.scientific}</p>
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlants;
