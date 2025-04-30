
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedPlants from "@/components/FeaturedPlants";
import InfoSection from "@/components/InfoSection";
import Footer from "@/components/Footer";
import SearchDropdown from "@/components/SearchDropdown";
import { Button } from "@/components/ui/button";
import { Leaf, Plant } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <FeaturedPlants />
        
        {/* Quick Search Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Leaf className="h-10 w-10 text-herbal-green mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-herbal-green">
                Find the Perfect Plant for Your Needs
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Our database includes detailed information on hundreds of medicinal plants, 
                their properties, traditional uses, and scientific evidence.
              </p>
              <SearchDropdown 
                placeholder="Type to search plants by name or properties..."
                className="max-w-lg mx-auto mb-8"
              />
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <Button variant="outline" className="border-herbal-green/30 text-herbal-green hover:bg-herbal-green/10">Immunity</Button>
                <Button variant="outline" className="border-herbal-green/30 text-herbal-green hover:bg-herbal-green/10">Digestive Health</Button>
                <Button variant="outline" className="border-herbal-green/30 text-herbal-green hover:bg-herbal-green/10">Skin Care</Button>
                <Button variant="outline" className="border-herbal-green/30 text-herbal-green hover:bg-herbal-green/10">Stress Relief</Button>
                <Button variant="outline" className="border-herbal-green/30 text-herbal-green hover:bg-herbal-green/10">Sleep</Button>
              </div>
              <Button size="lg" className="bg-herbal-green hover:bg-herbal-green/90 text-white" asChild>
                <Link to="/plants">
                  <Plant className="mr-2" />
                  Browse All Plants
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        <InfoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
