
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <svg className="w-8 h-8 text-herbal-green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2c.8 0 1.7.4 2.2 1l7.1 7.1a3.1 3.1 0 0 1 0 4.4l-8.4 8.4a3.1 3.1 0 0 1-4.4 0l-7.1-7.1A3.1 3.1 0 0 1 1 12.2V5a3 3 0 0 1 3-3h8z"/>
              <path className="animate-leaf-sway" d="M12 2c.8 0 1.7.4 2.2 1l7.1 7.1a3.1 3.1 0 0 1 0 4.4l-8.4 8.4a3.1 3.1 0 0 1-4.4 0l-7.1-7.1A3.1 3.1 0 0 1 1 12.2V5a3 3 0 0 1 3-3h8z"/>
              <path d="M16 9l-5.5 5.5"/><path d="M21 4V2"/><path d="M14 4V2"/><path d="M10 16l-5.5 5.5"/>
              <path d="M14 6v2h-2"/>
            </svg>
            <h1 className="text-xl font-lora font-bold text-herbal-green">Ayurvedic Atlas</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/explore" className="text-gray-700 hover:text-herbal-green font-medium">Explore</Link>
          <Link to="/virtual-tours" className="text-gray-700 hover:text-herbal-green font-medium">Virtual Tours</Link>
          <Link to="/search" className="text-gray-700 hover:text-herbal-green font-medium">Search</Link>
          <Link to="/about-ayush" className="text-gray-700 hover:text-herbal-green font-medium">About AYUSH</Link>
          <Link to="/contact" className="text-gray-700 hover:text-herbal-green font-medium">Contact</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="sm" className="border-herbal-green text-herbal-green hover:bg-herbal-green hover:text-white" asChild>
            <Link to="/auth?mode=login">Login</Link>
          </Button>
          <Button size="sm" className="bg-herbal-green hover:bg-herbal-green/90 text-white" asChild>
            <Link to="/auth?mode=signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white shadow-md ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
          <Link to="/explore" className="text-gray-700 hover:text-herbal-green py-2 font-medium">Explore</Link>
          <Link to="/virtual-tours" className="text-gray-700 hover:text-herbal-green py-2 font-medium">Virtual Tours</Link>
          <Link to="/search" className="text-gray-700 hover:text-herbal-green py-2 font-medium">Search</Link>
          <Link to="/about-ayush" className="text-gray-700 hover:text-herbal-green py-2 font-medium">About AYUSH</Link>
          <Link to="/contact" className="text-gray-700 hover:text-herbal-green py-2 font-medium">Contact</Link>
          
          <div className="flex flex-col pt-3 border-t border-gray-100">
            <Button variant="outline" className="mb-2 border-herbal-green text-herbal-green hover:bg-herbal-green hover:text-white" asChild>
              <Link to="/auth?mode=login">Login</Link>
            </Button>
            <Button className="bg-herbal-green hover:bg-herbal-green/90 text-white" asChild>
              <Link to="/auth?mode=signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
