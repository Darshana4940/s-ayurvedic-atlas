
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Download, Calendar, User, FileText, Link as LinkIcon } from "lucide-react";

// Resource type definition
interface Resource {
  id: number;
  title: string;
  description: string;
  category: string;
  type: "article" | "research" | "video" | "guide" | "pdf";
  link: string;
  author?: string;
  date?: string;
  image?: string;
  tags: string[];
}

const ResourcesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Get category from URL if present
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setActiveTab(categoryParam);
    }
  }, [searchParams]);

  // Sample resources data (in a real app, this would come from an API)
  const resources: Resource[] = [
    {
      id: 1,
      title: "Ayurvedic Plant Cultivation Guide",
      description: "A comprehensive guide to growing and harvesting medicinal plants used in Ayurvedic practice.",
      category: "cultivation",
      type: "guide",
      link: "/resources/ayurvedic-plant-cultivation-guide",
      author: "Dr. Rajesh Sharma",
      date: "May 15, 2024",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&q=80",
      tags: ["cultivation", "ayurveda", "planting", "harvesting"]
    },
    {
      id: 2,
      title: "Introduction to Ayurvedic Principles",
      description: "Learn about the fundamental concepts and principles of Ayurvedic medicine.",
      category: "principles",
      type: "article",
      link: "/resources/introduction-to-ayurvedic-principles",
      author: "Dr. Meena Patel",
      date: "April 3, 2024",
      image: "https://images.unsplash.com/photo-1611071536570-14da5897b6ae?w=800&h=600&q=80",
      tags: ["principles", "ayurveda", "fundamentals", "doshas"]
    },
    {
      id: 3,
      title: "Overview of AYUSH Systems",
      description: "A detailed exploration of the various traditional medicine systems under the AYUSH framework.",
      category: "systems",
      type: "article",
      link: "/resources/overview-of-ayush-systems",
      author: "Ministry of AYUSH",
      date: "January 10, 2024",
      image: "https://images.unsplash.com/photo-1593106410288-caf65aea7abb?w=800&h=600&q=80",
      tags: ["systems", "ayurveda", "yoga", "unani", "siddha", "homeopathy"]
    },
    {
      id: 4,
      title: "Medicinal Plant Conservation Strategies",
      description: "Current approaches and challenges in conserving endangered medicinal plant species.",
      category: "conservation",
      type: "research",
      link: "/resources/medicinal-plant-conservation-strategies",
      author: "Dr. Samantha Green",
      date: "March 25, 2024",
      image: "https://images.unsplash.com/photo-1532058435272-a59c26abb425?w=800&h=600&q=80",
      tags: ["conservation", "endangered", "biodiversity", "sustainability"]
    },
    {
      id: 5,
      title: "Efficacy of Turmeric in Managing Inflammation",
      description: "Research paper on the anti-inflammatory properties of turmeric and its applications in traditional medicine.",
      category: "research",
      type: "research",
      link: "/resources/turmeric-inflammation-research",
      author: "Dr. Anil Kumar et al.",
      date: "February 18, 2024",
      image: "https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=800&h=600&q=80",
      tags: ["research", "turmeric", "inflammation", "clinical trials"]
    },
    {
      id: 6,
      title: "Sustainable Harvesting Practices for Medicinal Plants",
      description: "Guidelines for sustainable harvesting to ensure the long-term availability of medicinal plant resources.",
      category: "sustainable",
      type: "guide",
      link: "/resources/sustainable-harvesting-practices",
      author: "Environmental Plant Association",
      date: "June 7, 2024",
      image: "https://images.unsplash.com/photo-1518173946395-e3578d6abe5e?w=800&h=600&q=80",
      tags: ["sustainable", "harvesting", "conservation", "medicinal plants"]
    },
    {
      id: 7,
      title: "Introduction to Yoga and Its Benefits",
      description: "An overview of yoga practices and their role in promoting holistic health.",
      category: "yoga",
      type: "video",
      link: "/resources/introduction-to-yoga",
      author: "Yoga Alliance",
      date: "April 28, 2024",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&q=80",
      tags: ["yoga", "wellness", "practice", "meditation"]
    },
    {
      id: 8,
      title: "Unani Medicine: History and Practice",
      description: "Exploring the rich history and contemporary applications of Unani medicine.",
      category: "unani",
      type: "article",
      link: "/resources/unani-medicine-history-practice",
      author: "Dr. Mohammed Hakim",
      date: "May 3, 2024",
      image: "https://images.unsplash.com/photo-1527868616786-50cfe987f659?w=800&h=600&q=80",
      tags: ["unani", "history", "medicine", "traditional"]
    },
    {
      id: 9,
      title: "Siddha Medicine: Principles and Treatments",
      description: "A comprehensive guide to the principles, diagnosis methods, and treatments in Siddha medicine.",
      category: "siddha",
      type: "pdf",
      link: "/resources/siddha-medicine-guide.pdf",
      author: "Traditional Medicine Institute",
      date: "March 15, 2024",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&q=80",
      tags: ["siddha", "principles", "treatments", "diagnosis"]
    },
    {
      id: 10,
      title: "Homeopathy: Core Concepts and Applications",
      description: "Understanding the foundational concepts of homeopathy and its application in healthcare.",
      category: "homoeopathy",
      type: "article",
      link: "/resources/homeopathy-core-concepts",
      author: "Dr. Elizabeth Wells",
      date: "January 5, 2024",
      image: "https://images.unsplash.com/photo-1584801096196-592feb269e31?w=800&h=600&q=80",
      tags: ["homeopathy", "concepts", "dilution", "applications"]
    },
    {
      id: 11,
      title: "Naturopathy Approaches for Common Ailments",
      description: "Natural approaches to treating common health conditions using naturopathic principles.",
      category: "naturopathy",
      type: "guide",
      link: "/resources/naturopathy-approaches",
      author: "Naturopathic Medicine Association",
      date: "February 28, 2024",
      image: "https://images.unsplash.com/photo-1553004547-2c7e11041cad?w=800&h=600&q=80",
      tags: ["naturopathy", "natural healing", "wellness", "holistic"]
    },
    {
      id: 12,
      title: "Ayurvedic Diet and Nutrition Guidelines",
      description: "Practical guidance on incorporating Ayurvedic dietary principles into modern life.",
      category: "ayurveda",
      type: "guide",
      link: "/resources/ayurvedic-diet-nutrition",
      author: "Dr. Anjali Desai",
      date: "June 1, 2024",
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&q=80",
      tags: ["ayurveda", "diet", "nutrition", "cooking"]
    }
  ];

  // Filter resources based on active tab and search term
  const filteredResources = resources.filter(resource => {
    // Filter by category/tab
    const categoryMatch = activeTab === "all" || resource.category === activeTab;
    
    // Filter by search term
    const searchMatch = searchTerm === "" || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return categoryMatch && searchMatch;
  });

  // Get unique categories for tabs
  const categories = ["all", ...new Set(resources.map(r => r.category))];

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Update URL for better sharing/bookmarking
    if (value === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", value);
    }
    setSearchParams(searchParams);
  };

  // Get icon for resource type
  const getResourceTypeIcon = (type: Resource["type"]) => {
    switch (type) {
      case "article":
        return <FileText className="h-4 w-4" />;
      case "research":
        return <BookOpen className="h-4 w-4" />;
      case "video":
        return <FileText className="h-4 w-4" />;
      case "guide":
        return <FileText className="h-4 w-4" />;
      case "pdf":
        return <Download className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // Format category name for display
  const formatCategoryName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 pb-12">
        {/* Hero section */}
        <section className="bg-herbal-green/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-full bg-herbal-green/20 flex items-center justify-center">
                <BookOpen className="h-7 w-7 text-herbal-green" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-herbal-green">Resources</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
              Explore our collection of articles, guides, research papers, and more about medicinal plants and traditional medicine systems.
            </p>
            
            {/* Search bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-herbal-green/20 focus:border-herbal-green"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Resources content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Category tabs */}
            <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
              <TabsList className="w-full max-w-4xl mx-auto mb-2 flex flex-wrap h-auto gap-2 bg-herbal-green/5 p-2">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category}
                    value={category}
                    className="data-[state=active]:bg-herbal-green data-[state=active]:text-white"
                  >
                    {formatCategoryName(category)}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-6">
                {filteredResources.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource) => (
                      <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                        {resource.image && (
                          <div className="h-48 overflow-hidden">
                            <img 
                              src={resource.image} 
                              alt={resource.title} 
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        )}
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline" className="bg-herbal-green/10 text-herbal-green border-herbal-green/20">
                              {formatCategoryName(resource.category)}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center gap-1">
                              {getResourceTypeIcon(resource.type)}
                              {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                            </Badge>
                          </div>
                          
                          <h3 className="font-bold text-xl mb-2 text-herbal-green">
                            {resource.title}
                          </h3>
                          
                          <p className="text-gray-700 mb-4 line-clamp-3">
                            {resource.description}
                          </p>
                          
                          {(resource.author || resource.date) && (
                            <div className="text-sm text-gray-500 mb-4">
                              {resource.author && (
                                <div className="flex items-center gap-1 mb-1">
                                  <User className="h-3 w-3" />
                                  <span>{resource.author}</span>
                                </div>
                              )}
                              {resource.date && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{resource.date}</span>
                                </div>
                              )}
                            </div>
                          )}
                          
                          <div className="mt-auto pt-2">
                            <Button 
                              className="w-full bg-herbal-green hover:bg-herbal-green/90 text-white"
                              asChild
                            >
                              <a href={resource.link} target="_blank" rel="noreferrer">
                                <LinkIcon className="mr-2 h-4 w-4" />
                                View Resource
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <BookOpen className="h-16 w-16 text-herbal-green/20 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No resources found</h3>
                    <p className="text-gray-600 mb-6">
                      We couldn't find any resources matching your criteria. Try adjusting your search or browse a different category.
                    </p>
                    <Button 
                      variant="outline" 
                      className="border-herbal-green text-herbal-green hover:bg-herbal-green/10"
                      onClick={() => {
                        setSearchTerm("");
                        handleTabChange("all");
                      }}
                    >
                      View All Resources
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="bg-herbal-green/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-herbal-green">Want to Contribute?</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              Are you a researcher, practitioner, or enthusiast interested in contributing resources to our platform?
              We welcome high-quality content related to medicinal plants and traditional medicine systems.
            </p>
            <Button className="bg-herbal-green hover:bg-herbal-green/90 text-white" asChild>
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ResourcesPage;
