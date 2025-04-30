
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-herbal-green/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 text-herbal-green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2c.8 0 1.7.4 2.2 1l7.1 7.1a3.1 3.1 0 0 1 0 4.4l-8.4 8.4a3.1 3.1 0 0 1-4.4 0l-7.1-7.1A3.1 3.1 0 0 1 1 12.2V5a3 3 0 0 1 3-3h8z"/>
                <path d="M16 9l-5.5 5.5"/><path d="M21 4V2"/><path d="M14 4V2"/><path d="M10 16l-5.5 5.5"/>
                <path d="M14 6v2h-2"/>
              </svg>
              <h3 className="font-lora font-bold text-lg text-herbal-green">Ayurvedic Atlas</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Exploring the healing wisdom of traditional medicinal plants through an immersive digital experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-herbal-green hover:text-herbal-green/80">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-herbal-green hover:text-herbal-green/80">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-herbal-green hover:text-herbal-green/80">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#" className="text-herbal-green hover:text-herbal-green/80">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-herbal-brown">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-herbal-green">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-herbal-green">Explore Plants</a></li>
              <li><a href="#" className="text-gray-600 hover:text-herbal-green">Virtual Tours</a></li>
              <li><a href="#" className="text-gray-600 hover:text-herbal-green">Search</a></li>
              <li><a href="#" className="text-gray-600 hover:text-herbal-green">About AYUSH</a></li>
              <li><a href="#" className="text-gray-600 hover:text-herbal-green">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-herbal-brown">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-herbal-green">Cultivation Guide</a></li>
              <li><a href="#" className="text-gray-600 hover:text-herbal-green">Ayurvedic Principles</a></li>
              <li><a href="#" className="text-gray-600 hover:text-herbal-green">AYUSH Systems</a></li>
              <li><a href="#" className="text-gray-600 hover:text-herbal-green">Plant Conservation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-herbal-green">Research Papers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-herbal-green">Sustainable Practices</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-herbal-brown">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for updates on new plants, research, and features.
            </p>
            <div className="flex space-x-2">
              <Input 
                className="bg-white border-herbal-green/20" 
                placeholder="Your email address" 
                type="email" 
              />
              <Button className="bg-herbal-green hover:bg-herbal-green/90 text-white">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              By subscribing, you agree to our Privacy Policy.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-herbal-green/20">
          <div className="mb-4 md:mb-0 flex items-center">
            <img src="/placeholder.svg" alt="AYUSH Ministry" className="h-10 mr-4" />
            <p className="text-sm text-gray-600">
              In collaboration with Ministry of AYUSH, Government of India
            </p>
          </div>
          <div className="text-sm text-gray-600">
            © 2025 Ayurvedic Atlas. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
