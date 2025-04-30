
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedPlants from "@/components/FeaturedPlants";
import InfoSection from "@/components/InfoSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <FeaturedPlants />
        <InfoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
