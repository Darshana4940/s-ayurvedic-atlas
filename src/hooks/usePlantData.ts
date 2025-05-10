
import { useState, useEffect, useCallback } from 'react';
import { Plant, PlantCategory } from "@/types/plants";
import { 
  fetchPlants, 
  fetchPlantById, 
  fetchAllCategories, 
  fetchFeaturedPlants,
  createPlant,
  updatePlant,
  deletePlant
} from "@/utils/supabase-utils";

interface UsePlantsOptions {
  categoryId?: number | null;
  searchTerm?: string;
  limit?: number;
  page?: number;
  initialLoad?: boolean;
}

export function usePlants({
  categoryId,
  searchTerm,
  limit = 12,
  page = 1,
  initialLoad = true
}: UsePlantsOptions = {}) {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [categories, setCategories] = useState<PlantCategory[]>([]);
  const [loading, setLoading] = useState(initialLoad);
  const [error, setError] = useState<Error | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  
  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  
  // Calculate offset for pagination
  const offset = (page - 1) * limit;
  
  const loadPlants = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { plants: loadedPlants, count } = await fetchPlants({ 
        categoryId, 
        searchTerm, 
        limit,
        offset
      });
      
      setPlants(loadedPlants);
      setTotalCount(count);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  }, [categoryId, searchTerm, limit, offset]);
  
  const loadCategories = useCallback(async () => {
    try {
      const categoriesData = await fetchAllCategories();
      setCategories(categoriesData);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  }, []);
  
  // Load plants and categories on initial render and when dependencies change
  useEffect(() => {
    if (initialLoad) {
      loadPlants();
    }
    loadCategories();
  }, [loadPlants, loadCategories, initialLoad]);
  
  // CRUD operations
  const addPlant = useCallback(async (plant: Omit<Plant, "id" | "created_at">) => {
    const newPlant = await createPlant(plant);
    if (newPlant) {
      setPlants(prev => [newPlant, ...prev]);
      return newPlant;
    }
    return null;
  }, []);
  
  const editPlant = useCallback(async (id: number, updates: Partial<Omit<Plant, "id" | "created_at">>) => {
    const updatedPlant = await updatePlant(id, updates);
    if (updatedPlant) {
      setPlants(prev => prev.map(p => p.id === id ? updatedPlant : p));
      return updatedPlant;
    }
    return null;
  }, []);
  
  const removePlant = useCallback(async (id: number) => {
    const success = await deletePlant(id);
    if (success) {
      setPlants(prev => prev.filter(p => p.id !== id));
      return true;
    }
    return false;
  }, []);
  
  return {
    plants,
    categories,
    loading,
    error,
    totalCount,
    totalPages,
    currentPage: page,
    refresh: loadPlants,
    addPlant,
    editPlant,
    removePlant
  };
}

export function usePlantDetail(id: number | null) {
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(id !== null);
  const [error, setError] = useState<Error | null>(null);
  
  const loadPlant = useCallback(async () => {
    if (id === null) {
      setPlant(null);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const plantData = await fetchPlantById(id);
      setPlant(plantData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  }, [id]);
  
  useEffect(() => {
    loadPlant();
  }, [loadPlant]);
  
  const updateLocalPlant = useCallback(async (updates: Partial<Omit<Plant, "id" | "created_at">>) => {
    if (!plant) return null;
    
    const updatedPlant = await updatePlant(plant.id, updates);
    if (updatedPlant) {
      setPlant(updatedPlant);
      return updatedPlant;
    }
    return null;
  }, [plant]);
  
  return {
    plant,
    loading,
    error,
    refresh: loadPlant,
    updatePlant: updateLocalPlant,
  };
}

export function useFeaturedPlants(limit: number = 6) {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const loadFeaturedPlants = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const featuredPlants = await fetchFeaturedPlants(limit);
      setPlants(featuredPlants);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  }, [limit]);
  
  useEffect(() => {
    loadFeaturedPlants();
  }, [loadFeaturedPlants]);
  
  return {
    plants,
    loading,
    error,
    refresh: loadFeaturedPlants
  };
}
