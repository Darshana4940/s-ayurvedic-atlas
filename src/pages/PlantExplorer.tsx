
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plant, PlantCategory } from "@/types/plants";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";

const PlantExplorer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const plantsPerPage = 12;

  // Fetch plant categories
  const { 
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError 
  } = useQuery({
    queryKey: ["plantCategories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plant_categories")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data as PlantCategory[];
    }
  });

  // Fetch plants with filtering
  const { 
    data: plantsData,
    isLoading: plantsLoading,
    error: plantsError,
    refetch: refetchPlants
  } = useQuery({
    queryKey: ["plants", searchQuery, selectedCategory, currentPage],
    queryFn: async () => {
      let query = supabase
        .from("plants")
        .select("*", { count: "exact" });
      
      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,scientific_name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }
      
      if (selectedCategory !== null) {
        query = query.eq("category_id", selectedCategory);
      }
      
      const from = (currentPage - 1) * plantsPerPage;
      const to = from + plantsPerPage - 1;
      
      const { data, error, count } = await query
        .order("name")
        .range(from, to);
      
      if (error) throw error;
      return {
        plants: data as Plant[],
        totalCount: count || 0
      };
    },
    enabled: true
  });

  const handleSearch = () => {
    setCurrentPage(1);
    refetchPlants();
  };

  const handleCategoryClick = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const totalPages = plantsData?.totalCount
    ? Math.ceil(plantsData.totalCount / plantsPerPage)
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 pb-12">
        <section className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-herbal-green mb-2">Plant Explorer</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the healing properties of Ayurvedic herbs and medicinal plants in our virtual garden.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center max-w-3xl mx-auto">
              <div className="relative flex-grow w-full">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by plant name or properties..."
                  className="pl-4 pr-12 py-6 text-lg rounded-full border-2 border-herbal-green/20 focus:border-herbal-green"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleSearch();
                  }}
                />
                <Button 
                  className="absolute right-1 top-1 rounded-full h-10 w-10 p-0 flex items-center justify-center bg-herbal-green hover:bg-herbal-green/90"
                  onClick={handleSearch}
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
              <Button 
                variant="outline" 
                className="border-gray-300 text-gray-700 gap-2"
                aria-label="Filter"
              >
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer text-sm py-2 px-4"
              onClick={() => handleCategoryClick(null)}
            >
              All Plants
            </Badge>
            {categoriesLoading ? (
              <div>Loading categories...</div>
            ) : categories?.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className="cursor-pointer text-sm py-2 px-4"
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </Badge>
            ))}
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {plantsLoading ? (
              <div className="col-span-full text-center py-12">Loading plants...</div>
            ) : plantsError ? (
              <div className="col-span-full text-center py-12 text-red-500">
                Error loading plants. Please try again.
              </div>
            ) : plantsData?.plants.length === 0 ? (
              <div className="col-span-full text-center py-12">
                No plants found. Try a different search term or filter.
              </div>
            ) : (
              plantsData?.plants.map((plant) => (
                <div 
                  key={plant.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative">
                    <AspectRatio ratio={4/3}>
                      <img
                        src={plant.image_url || "/placeholder.svg"}
                        alt={plant.name}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-herbal-green">{plant.name}</h3>
                    <p className="text-sm text-gray-500 italic mb-2">{plant.scientific_name}</p>
                    <p className="text-sm line-clamp-2 text-gray-700 mb-3">
                      {plant.description || "No description available."}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full text-herbal-green border-herbal-green/30 hover:bg-herbal-green hover:text-white"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PlantExplorer;
