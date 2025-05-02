
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search, Leaf } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/plants?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&h=1080&q=80" 
          alt="Lush green forest background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center">
              <Leaf className="h-8 w-8 text-herbal-green animate-leaf-sway" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight drop-shadow-lg">
            Explore Nature's Pharmacy – Virtually
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Discover the healing wisdom of Ayurvedic herbs through our interactive virtual garden. Learn, explore and connect with traditional medicinal plants.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button className="bg-herbal-green hover:bg-herbal-green/90 text-white text-lg px-8 py-6" asChild>
              <Link to="/plants">
                Enter the Virtual Garden
              </Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/20 hover:text-white text-lg px-8 py-6" asChild>
              <Link to="/virtual-tours" id="featured-plants">
                Take a Virtual Tour
              </Link>
            </Button>
          </div>
          
          <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
            <div className="relative">
              <Input 
                value={searchValue}
                onChange={handleSearchChange}
                className="pl-4 pr-12 py-6 text-lg rounded-full border-2 border-white/30 bg-white/80 backdrop-blur-sm focus:border-herbal-green focus-visible:ring-0 focus-visible:ring-offset-0 shadow-lg" 
                placeholder="Search by plant name, condition, or benefit..." 
              />
              <Button 
                type="submit"
                className="absolute right-1 top-1 rounded-full h-10 w-10 p-0 flex items-center justify-center bg-herbal-green hover:bg-herbal-green/90"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
            <div className="text-left text-sm text-white mt-2 px-4 drop-shadow-md">
              Try: "Neem", "Immunity", "Skin Care", "Tulsi"...
            </div>
          </form>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute -bottom-6 left-1/4 w-24 h-24 opacity-30 animate-float z-10">
        <svg className="w-full h-full text-herbal-green drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 3v2c0 9.627-5.373 14-12 14H5.243C5.08 19.912 5 20.907 5 22H3c0-1.363.116-2.6.346-3.732C3.116 16.974 3 15.218 3 13 3 7.477 7.477 3 13 3c2 0 4 1 8 0zm-8 2c-4.418 0-8 3.582-8 8 0 .362.003.711.01 1.046 1.254-1.978 3.091-3.541 5.494-4.914l.992 1.736C8.641 12.5 6.747 14.354 5.776 17H9c6.015 0 9.871-3.973 9.997-11.612-1.372.133-2.647.048-4.22-.188C13.627 5.027 13.401 5 13 5z"/>
        </svg>
      </div>
      
      <div className="absolute -bottom-10 right-1/4 w-32 h-32 opacity-30 animate-float z-10" style={{animationDelay: "1.5s"}}>
        <svg className="w-full h-full text-herbal-green drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-14a4 4 0 0 1 3.465 6.044l-.649 1.083A1 1 0 0 1 13.82 14H10.18a1 1 0 0 1-.997-.857l-.016-.117-.65-1.082A4 4 0 0 1 12 6z"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
