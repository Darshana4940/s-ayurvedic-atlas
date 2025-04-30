
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlantDataImport from "@/components/PlantDataImport";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-herbal-green mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage plant data and content for the Ayurvedic Atlas</p>
          </div>
          
          <div className="mt-8">
            <PlantDataImport />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
