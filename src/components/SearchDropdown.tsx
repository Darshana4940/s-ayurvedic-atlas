
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plant } from "@/types/plants";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchDropdownProps {
  placeholder?: string;
  className?: string;
}

const SearchDropdown = ({ placeholder = "Search plants...", className = "" }: SearchDropdownProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Plant[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (term: string) => {
    setSearchTerm(term);

    if (term.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from("plants")
        .select("id, name, scientific_name, image_url")
        .or(`name.ilike.%${term}%,scientific_name.ilike.%${term}%,description.ilike.%${term}%`)
        .limit(5);

      if (error) throw error;

      setResults(data || []);
      setIsOpen(true);
    } catch (error) {
      console.error("Error searching plants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 w-full focus:border-herbal-green"
          onFocus={() => searchTerm.length >= 2 && setIsOpen(true)}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin h-4 w-4 border-2 border-herbal-green border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg overflow-hidden">
          {results.length > 0 ? (
            <ul className="py-1 max-h-60 overflow-auto">
              {results.map((plant) => (
                <li key={plant.id}>
                  <Link
                    to={`/plant/${plant.id}`}
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                  >
                    {plant.image_url && (
                      <div className="h-10 w-10 rounded overflow-hidden mr-3 flex-shrink-0">
                        <img
                          src={plant.image_url}
                          alt={plant.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=600&q=80";
                          }}
                        />
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-herbal-green">{plant.name}</div>
                      <div className="text-xs text-gray-500">{plant.scientific_name}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
