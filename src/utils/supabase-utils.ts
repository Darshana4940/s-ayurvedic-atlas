
import { supabase } from "@/integrations/supabase/client";
import { Plant, PlantCategory } from "@/types/plants";
import { toast } from "sonner";

// Plant Categories
export async function fetchAllCategories(): Promise<PlantCategory[]> {
  try {
    const { data, error } = await supabase
      .from("plant_categories")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load plant categories");
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error("Unexpected error fetching categories:", error);
    toast.error("Failed to load plant categories");
    return [];
  }
}

export async function createCategory(category: Omit<PlantCategory, "id">): Promise<PlantCategory | null> {
  try {
    const { data, error } = await supabase
      .from("plant_categories")
      .insert(category)
      .select()
      .single();

    if (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
      return null;
    }
    
    toast.success(`Category "${category.name}" created successfully`);
    return data;
  } catch (error) {
    console.error("Unexpected error creating category:", error);
    toast.error("Failed to create category");
    return null;
  }
}

export async function updateCategory(id: number, updates: Partial<Omit<PlantCategory, "id">>): Promise<PlantCategory | null> {
  try {
    const { data, error } = await supabase
      .from("plant_categories")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
      return null;
    }
    
    toast.success("Category updated successfully");
    return data;
  } catch (error) {
    console.error("Unexpected error updating category:", error);
    toast.error("Failed to update category");
    return null;
  }
}

export async function deleteCategory(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("plant_categories")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
      return false;
    }
    
    toast.success("Category deleted successfully");
    return true;
  } catch (error) {
    console.error("Unexpected error deleting category:", error);
    toast.error("Failed to delete category");
    return false;
  }
}

// Plants
export async function fetchPlants(options?: { 
  categoryId?: number | null,
  searchTerm?: string,
  limit?: number,
  offset?: number
}): Promise<{ plants: Plant[], count: number }> {
  try {
    let query = supabase
      .from("plants")
      .select(`
        *,
        plant_categories(name)
      `);
    
    // Apply category filter if provided
    if (options?.categoryId) {
      query = query.eq("category_id", options.categoryId);
    }
    
    // Apply search if provided
    if (options?.searchTerm) {
      const searchTerm = options.searchTerm.toLowerCase();
      query = query.or(`name.ilike.%${searchTerm}%,scientific_name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,medicinal_uses.ilike.%${searchTerm}%`);
    }
    
    // Get count first
    const { count, error: countError } = await supabase
      .from("plants")
      .select("*", { count: "exact", head: true });
    
    if (countError) {
      console.error("Error getting count:", countError);
      throw countError;
    }
    
    // Apply pagination if provided
    if (options?.limit !== undefined) {
      query = query.range(
        options.offset || 0, 
        (options.offset || 0) + options.limit - 1
      );
    }
    
    // Apply ordering
    query = query.order("name");
    
    // Execute query
    const { data, error } = await query;
    
    if (error) {
      console.error("Error fetching plants:", error);
      toast.error("Failed to load plants");
      return { plants: [], count: 0 };
    }
    
    return { plants: data || [], count: count || 0 };
  } catch (error) {
    console.error("Unexpected error fetching plants:", error);
    toast.error("Failed to load plants");
    return { plants: [], count: 0 };
  }
}

export async function fetchPlantById(id: number): Promise<Plant | null> {
  try {
    const { data, error } = await supabase
      .from("plants")
      .select(`
        *,
        plant_categories(name, description)
      `)
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching plant:", error);
      toast.error("Failed to load plant details");
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Unexpected error fetching plant:", error);
    toast.error("Failed to load plant details");
    return null;
  }
}

export async function createPlant(plant: Omit<Plant, "id" | "created_at">): Promise<Plant | null> {
  try {
    const { data, error } = await supabase
      .from("plants")
      .insert(plant)
      .select()
      .single();

    if (error) {
      console.error("Error creating plant:", error);
      toast.error("Failed to create plant");
      return null;
    }
    
    toast.success(`Plant "${plant.name}" created successfully`);
    return data;
  } catch (error) {
    console.error("Unexpected error creating plant:", error);
    toast.error("Failed to create plant");
    return null;
  }
}

export async function updatePlant(id: number, updates: Partial<Omit<Plant, "id" | "created_at">>): Promise<Plant | null> {
  try {
    const { data, error } = await supabase
      .from("plants")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating plant:", error);
      toast.error("Failed to update plant");
      return null;
    }
    
    toast.success("Plant updated successfully");
    return data;
  } catch (error) {
    console.error("Unexpected error updating plant:", error);
    toast.error("Failed to update plant");
    return null;
  }
}

export async function deletePlant(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("plants")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting plant:", error);
      toast.error("Failed to delete plant");
      return false;
    }
    
    toast.success("Plant deleted successfully");
    return true;
  } catch (error) {
    console.error("Unexpected error deleting plant:", error);
    toast.error("Failed to delete plant");
    return false;
  }
}

// Featured plants - get a small selection of plants for the homepage
export async function fetchFeaturedPlants(limit: number = 6): Promise<Plant[]> {
  try {
    const { data, error } = await supabase
      .from("plants")
      .select(`
        *,
        plant_categories(name)
      `)
      .limit(limit)
      .order("id", { ascending: false }); // Get the most recently added plants

    if (error) {
      console.error("Error fetching featured plants:", error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error("Unexpected error fetching featured plants:", error);
    return [];
  }
}

// Statistics about the database
export async function fetchDatabaseStats(): Promise<{
  totalPlants: number;
  totalCategories: number;
}> {
  try {
    const [plantCount, categoryCount] = await Promise.all([
      supabase.from("plants").select("*", { count: "exact", head: true }),
      supabase.from("plant_categories").select("*", { count: "exact", head: true })
    ]);

    return {
      totalPlants: plantCount.count || 0,
      totalCategories: categoryCount.count || 0
    };
  } catch (error) {
    console.error("Error fetching database statistics:", error);
    return {
      totalPlants: 0,
      totalCategories: 0
    };
  }
}
