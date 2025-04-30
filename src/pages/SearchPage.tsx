
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Search as SearchIcon, Filter, Leaf, Tag, SlidersHorizontal } from "lucide-react";
import { Plant, PlantCategory } from "@/types/plants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [plants, setPlants] = useState<Plant[]>([]);
  const [categories, setCategories] = useState<PlantCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [loading, setLoading] = useState<boolean>(false);
  
  // Sample tags for advanced filtering
  const tags = [
    "Immunity Boosting",
    "Digestive Health",
    "Respiratory Relief",
    "Skin Care",
    "Anti-inflammatory",
    "Stress Relief",
    "Sleep Aid",
    "Heart Health",
    "Detoxifying",
    "Hair Care"
  ];
  
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Toggle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("plant_categories")
          .select("*");
        
        if (error) throw error;
        setCategories(data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    
    fetchCategories();
  }, []);
  
  // Search function
  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setLoading(true);
    
    try {
      let query = supabase
        .from("plants")
        .select(`
          *,
          plant_categories(name)
        `);
      
      // Apply search term filter if provided
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,scientific_name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,medicinal_uses.ilike.%${searchTerm}%`);
      }
      
      // Apply category filter if selected
      if (selectedCategory !== "all") {
        query = query.eq("category_id", parseInt(selectedCategory));
      }
      
      // Apply sorting
      switch(sortBy) {
        case "name":
          query = query.order("name");
          break;
        case "scientific_name":
          query = query.order("scientific_name");
          break;
        case "created_at":
          query = query.order("created_at", { ascending: false });
          break;
        default:
          query = query.order("name");
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Client-side filtering for tags (in a real app this would be done on the server)
      let filteredData = data;
      if (selectedTags.length > 0) {
        filteredData = data?.filter(plant => 
          selectedTags.some(tag => 
            plant.medicinal_uses?.toLowerCase().includes(tag.toLowerCase())
          )
        );
      }
      
      setPlants(filteredData || []);
    } catch (error) {
      console.error("Error searching plants:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const defaultImage = "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=600&q=80";
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 pb-12">
        {/* Search header */}
        <section className="bg-herbal-green/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-white/80 flex items-center justify-center">
                  <SearchIcon className="h-8 w-8 text-herbal-green" />
                </div>
              </div>
              
              <h1 className="text-4xl font-bold mb-4 text-herbal-green">Find Medicinal Plants</h1>
              <p className="text-lg text-gray-700 mb-8">
                Search our extensive database of medicinal plants by name, property, or benefit.
              </p>
              
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
                <div className="flex">
                  <div className="relative flex-grow">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search by plant name, property or health benefit..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-herbal-green/20"
                    />
                  </div>
                  <Button type="submit" className="rounded-l-none bg-herbal-green hover:bg-herbal-green/90 text-white">
                    Search
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
        
        {/* Filters and results section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters sidebar */}
              <div className="lg:w-1/4">
                <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm sticky top-24">
                  <div className="flex items-center gap-2 mb-6">
                    <Filter className="h-5 w-5 text-herbal-green" />
                    <h2 className="text-lg font-semibold">Refine Search</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Category filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Plant Category
                      </label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Sort by */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sort By
                      </label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name">Name (A-Z)</SelectItem>
                          <SelectItem value="scientific_name">Scientific Name</SelectItem>
                          <SelectItem value="created_at">Recently Added</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Properties/Tags */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Tag className="h-4 w-4 text-herbal-green" />
                        <h3 className="text-sm font-medium text-gray-700">Properties</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                          <Button
                            key={tag}
                            variant={selectedTags.includes(tag) ? "default" : "outline"}
                            className={`text-xs py-1 px-2 h-auto ${
                              selectedTags.includes(tag) 
                                ? "bg-herbal-green text-white hover:bg-herbal-green/90" 
                                : "border-herbal-green/30 text-herbal-green hover:bg-herbal-green/10"
                            }`}
                            onClick={() => toggleTag(tag)}
                          >
                            {tag}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Apply filters button */}
                    <Button 
                      className="w-full bg-herbal-green hover:bg-herbal-green/90 text-white"
                      onClick={() => handleSearch()}
                    >
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Search results */}
              <div className="lg:w-3/4">
                <h2 className="text-2xl font-semibold mb-6">
                  {loading ? 'Searching...' : `${plants.length} Results`}
                </h2>
                
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="bg-gray-300 h-48 rounded-lg mb-3"></div>
                        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : plants.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <div className="text-center py-16">
                    <div className="flex justify-center mb-4">
                      <Leaf className="h-16 w-16 text-herbal-green/20" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No plants found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters.</p>
                    <Button 
                      variant="outline" 
                      className="border-herbal-green text-herbal-green hover:bg-herbal-green/10"
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("all");
                        setSelectedTags([]);
                        handleSearch();
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
