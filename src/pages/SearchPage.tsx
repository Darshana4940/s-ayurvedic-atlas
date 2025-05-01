
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchDropdown from "@/components/SearchDropdown";
import AIAssistant from "@/components/AIAssistant";

const SearchPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-herbal-green mb-8">
          Search Medicinal Plants
        </h1>
        
        <div className="max-w-3xl mx-auto mb-12">
          <SearchDropdown
            placeholder="Search plants by name, uses, or benefits..."
            className="mb-4"
          />
          <p className="text-center text-gray-600">
            Try searching for plants like "Tulsi", "Neem", or "Ashwagandha"
          </p>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center text-herbal-green mb-8">
            Can't find what you're looking for?
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <AIAssistant />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
