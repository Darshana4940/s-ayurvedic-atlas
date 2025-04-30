
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface PlantData {
  name: string;
  scientific_name: string;
  category_id: number;
  description: string;
  medicinal_uses: string;
  how_to_use: string;
  image_url: string;
}

const PlantDataImport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setMessage({ type: 'error', text: 'Please select a CSV file first' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      // Process the CSV file
      const text = await file.text();
      const rows = text.split('\n');
      const header = rows[0].split(',');
      
      // Simple validation
      if (!header.includes('name') || !header.includes('scientific_name')) {
        throw new Error('CSV file does not have the required columns');
      }
      
      // Process each row (skip header)
      const plants: PlantData[] = [];
      let processedCount = 0;
      let errorCount = 0;

      for (let i = 1; i < rows.length; i++) {
        if (!rows[i].trim()) continue; // Skip empty rows
        
        const values = rows[i].split(',');
        const plantData: Partial<PlantData> = {};
        
        // Map CSV columns to plant properties
        header.forEach((column, index) => {
          const value = values[index]?.trim();
          if (value) {
            // Map columns to the correct property names
            switch(column.trim()) {
              case 'name':
                plantData.name = value;
                break;
              case 'scientific_name':
                plantData.scientific_name = value;
                break;
              case 'category_id':
                plantData.category_id = parseInt(value);
                break;
              case 'description':
                plantData.description = value;
                break;
              case 'medicinal_uses':
                plantData.medicinal_uses = value;
                break;
              case 'how_to_use':
                plantData.how_to_use = value;
                break;
              case 'image_url':
                plantData.image_url = value;
                break;
            }
          }
        });
        
        // Ensure required fields exist
        if (plantData.name && plantData.scientific_name) {
          // Default category if not specified
          if (!plantData.category_id) {
            plantData.category_id = 4; // General Medicinal category
          }
          
          plants.push(plantData as PlantData);
          processedCount++;
        } else {
          errorCount++;
        }
      }

      // Insert data into Supabase
      if (plants.length > 0) {
        const { error } = await supabase
          .from('plants')
          .insert(plants);
          
        if (error) throw error;
        
        toast({
          title: "Import Successful",
          description: `Successfully imported ${processedCount} plants with ${errorCount} errors.`,
        });
        
        setMessage({ 
          type: 'success', 
          text: `Successfully imported ${processedCount} plants with ${errorCount} errors.` 
        });
      } else {
        setMessage({ 
          type: 'error', 
          text: 'No valid plant data found in the file.' 
        });
      }
    } catch (error) {
      console.error('Error importing plants:', error);
      setMessage({ 
        type: 'error',
        text: `Error importing plants: ${error instanceof Error ? error.message : 'Unknown error'}` 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Import Plant Data</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="file">Select CSV File</Label>
          <Input
            id="file"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="mt-1"
          />
          <p className="text-sm text-gray-500 mt-1">
            The CSV should have columns: name, scientific_name, category_id, description, medicinal_uses, how_to_use, image_url
          </p>
        </div>

        {message && (
          <Alert className={message.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-green-50 border-green-200 text-green-800'}>
            <AlertTitle>{message.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <div className="mt-4">
          <Button type="submit" disabled={isLoading} className="bg-herbal-green hover:bg-herbal-green/90">
            {isLoading ? 'Importing...' : 'Import Data'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PlantDataImport;
