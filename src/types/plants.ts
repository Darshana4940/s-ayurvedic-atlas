
export interface PlantCategory {
  id: number;
  name: string;
  description: string | null;
}

export interface Plant {
  id: number;
  name: string;
  scientific_name: string;
  category_id: number | null;
  description: string | null;
  medicinal_uses: string | null;
  how_to_use: string | null;
  image_url: string | null;
  created_at: string;
}
