
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, Users, ArrowRight } from "lucide-react";

const VirtualToursPage = () => {
  // Sample virtual tour data
  const tours = [
    {
      id: 1,
      title: "Ayurvedic Herb Garden Tour",
      location: "National Ayurvedic Garden, Delhi",
      image: "https://images.unsplash.com/photo-1591492654773-641b3101c48c?w=800&h=600&q=80",
      date: "July 15, 2025",
      time: "10:00 AM - 12:00 PM",
      capacity: "25 participants",
      type: "Live",
      description: "Join our expert botanists on a guided tour of the National Ayurvedic Garden, showcasing over 200 medicinal plant species used in traditional medicine."
    },
    {
      id: 2,
      title: "Kerala Medicinal Plants Exploration",
      location: "Tropical Botanical Gardens, Kerala",
      image: "https://images.unsplash.com/photo-1517473981197-ce41330b7471?w=800&h=600&q=80",
      date: "Available anytime",
      time: "Self-paced",
      capacity: "Unlimited",
      type: "Virtual",
      description: "Experience the rich diversity of Kerala's medicinal flora through this immersive virtual tour of the world-renowned Tropical Botanical Gardens."
    },
    {
      id: 3,
      title: "Himalayan Herb Expedition",
      location: "Himalayan Research Institute, Uttarakhand",
      image: "https://images.unsplash.com/photo-1604608678051-64d46d8d0bbe?w=800&h=600&q=80",
      date: "August 5-10, 2025",
      time: "Full day",
      capacity: "15 participants",
      type: "Physical",
      description: "A 5-day expedition to discover rare Himalayan herbs used in traditional healing practices. Includes guided walks, collection techniques, and identification workshops."
    },
    {
      id: 4,
      title: "Urban Medicinal Garden Design",
      location: "Online",
      image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&h=600&q=80",
      date: "Available anytime",
      time: "Self-paced",
      capacity: "Unlimited",
      type: "Virtual",
      description: "Learn how to design and cultivate your own medicinal herb garden in an urban setting with this comprehensive virtual tour and tutorial."
    },
    {
      id: 5,
      title: "Siddha Medicine Plant Walk",
      location: "Herbal Heritage Park, Tamil Nadu",
      image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&h=600&q=80",
      date: "September 3, 2025",
      time: "9:00 AM - 11:00 AM",
      capacity: "20 participants",
      type: "Live",
      description: "Walk through the specially curated Siddha medicine section of the Herbal Heritage Park, guided by traditional Siddha practitioners."
    },
    {
      id: 6,
      title: "Rare Medicinal Plants Conservation",
      location: "Biodiversity Conservation Center, Assam",
      image: "https://images.unsplash.com/photo-1543353239-378e7e27d634?w=800&h=600&q=80",
      date: "October 12, 2025",
      time: "11:00 AM - 1:00 PM",
      capacity: "15 participants",
      type: "Live",
      description: "Explore the conservation efforts for endangered medicinal plant species in this exclusive tour of the Biodiversity Conservation Center."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 pb-12">
        {/* Hero section */}
        <section className="relative bg-herbal-green/10 py-20">
          <div className="absolute inset-0 opacity-10 overflow-hidden">
            <div className="absolute w-40 h-40 rounded-full bg-herbal-green -top-10 -left-10"></div>
            <div className="absolute w-60 h-60 rounded-full bg-herbal-green/60 -bottom-20 -right-20"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-herbal-green">
              Virtual Tours & Live Experiences
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
              Immerse yourself in the world of medicinal plants with our virtual tours and guided experiences. 
              Explore beautiful gardens, conservation areas, and rare plant collections from anywhere.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-herbal-green hover:bg-herbal-green/90 text-white">
                Upcoming Live Tours
              </Button>
              <Button variant="outline" className="border-herbal-green text-herbal-green hover:bg-herbal-green/10">
                Virtual Experiences
              </Button>
            </div>
          </div>
        </section>
        
        {/* Tours grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-herbal-green">
              Featured Tours & Experiences
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={tour.image} 
                      alt={tour.title}
                      className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                    />
                    <Badge 
                      className={`absolute top-4 right-4 ${
                        tour.type === "Live" ? "bg-red-500" :
                        tour.type === "Virtual" ? "bg-blue-500" : 
                        "bg-green-500"
                      }`}
                    >
                      {tour.type}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-xl font-bold mb-2 text-herbal-green">{tour.title}</h3>
                    
                    <div className="flex items-start gap-2 mb-2 text-gray-600">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{tour.location}</span>
                    </div>
                    
                    <div className="flex items-start gap-2 mb-2 text-gray-600">
                      <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{tour.date}</span>
                    </div>
                    
                    <div className="flex items-start gap-2 mb-2 text-gray-600">
                      <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{tour.time}</span>
                    </div>
                    
                    <div className="flex items-start gap-2 mb-4 text-gray-600">
                      <Users className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{tour.capacity}</span>
                    </div>
                    
                    <p className="text-gray-700 mb-4 text-sm line-clamp-3">
                      {tour.description}
                    </p>
                    
                    <Button 
                      className="w-full bg-herbal-green hover:bg-herbal-green/90 text-white"
                    >
                      Book This Tour <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" className="border-herbal-green text-herbal-green hover:bg-herbal-green/10">
                View All Tours
              </Button>
            </div>
          </div>
        </section>
        
        {/* How it works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-herbal-green">
              How Our Virtual Tours Work
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-herbal-green/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-herbal-green">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-herbal-green">Choose Your Experience</h3>
                <p className="text-gray-600">
                  Browse our selection of virtual and live tours based on your interests and schedule.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-herbal-green/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-herbal-green">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-herbal-green">Book or Register</h3>
                <p className="text-gray-600">
                  Secure your spot for live tours or gain instant access to our virtual experiences.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-herbal-green/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-herbal-green">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-herbal-green">Immerse Yourself</h3>
                <p className="text-gray-600">
                  Connect with expert guides, explore beautiful gardens, and learn about medicinal plants.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button className="bg-herbal-green hover:bg-herbal-green/90 text-white">
                Learn More About Our Tours
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VirtualToursPage;
