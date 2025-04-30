
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PlantExplorer from "./pages/PlantExplorer";
import PlantDetail from "./pages/PlantDetail";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import ExplorePage from "./pages/ExplorePage";
import VirtualToursPage from "./pages/VirtualToursPage";
import SearchPage from "./pages/SearchPage";
import AboutAyushPage from "./pages/AboutAyushPage";
import ContactPage from "./pages/ContactPage";
import ResourcesPage from "./pages/ResourcesPage";
import NewsletterPage from "./pages/NewsletterPage";
import AuthPage from "./pages/AuthPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/plants" element={<PlantExplorer />} />
          <Route path="/plant/:id" element={<PlantDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/virtual-tours" element={<VirtualToursPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about-ayush" element={<AboutAyushPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/auth" element={<AuthPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
