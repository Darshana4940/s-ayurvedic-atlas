
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Info, BookOpen, Leaf, Users, Globe, FileText } from "lucide-react";

const AboutAyushPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 pb-12">
        {/* Hero section */}
        <section className="bg-herbal-green/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-full bg-herbal-green/20 flex items-center justify-center">
                <Info className="h-7 w-7 text-herbal-green" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-herbal-green">About AYUSH</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Learn about the Ministry of AYUSH and its initiatives to promote traditional systems of medicine and healthcare.
            </p>
          </div>
        </section>
        
        {/* AYUSH Introduction */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-herbal-green">What is AYUSH?</h2>
              
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  AYUSH is an acronym for Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homoeopathy. These are the traditional systems of medicine that have been practiced in India for thousands of years.
                </p>
                
                <p>
                  In 2014, the Department of AYUSH was elevated to the status of a full-fledged Ministry, now known as the Ministry of AYUSH. This was done to promote indigenous and alternative systems of medicine and to bring focus on their development.
                </p>
                
                <div className="my-8 flex gap-4 flex-wrap justify-center">
                  <div className="flex flex-col items-center p-6 bg-herbal-green/5 rounded-lg">
                    <span className="text-herbal-green font-bold text-3xl mb-2">A</span>
                    <span className="text-gray-700">Ayurveda</span>
                  </div>
                  <div className="flex flex-col items-center p-6 bg-herbal-green/5 rounded-lg">
                    <span className="text-herbal-green font-bold text-3xl mb-2">Y</span>
                    <span className="text-gray-700">Yoga</span>
                  </div>
                  <div className="flex flex-col items-center p-6 bg-herbal-green/5 rounded-lg">
                    <span className="text-herbal-green font-bold text-3xl mb-2">U</span>
                    <span className="text-gray-700">Unani</span>
                  </div>
                  <div className="flex flex-col items-center p-6 bg-herbal-green/5 rounded-lg">
                    <span className="text-herbal-green font-bold text-3xl mb-2">S</span>
                    <span className="text-gray-700">Siddha</span>
                  </div>
                  <div className="flex flex-col items-center p-6 bg-herbal-green/5 rounded-lg">
                    <span className="text-herbal-green font-bold text-3xl mb-2">H</span>
                    <span className="text-gray-700">Homoeopathy</span>
                  </div>
                </div>
                
                <p>
                  The Ministry of AYUSH aims to develop education, research, and propagation of indigenous alternative medicine systems in India. It is also focused on upgrading the educational standards of the Indian Systems of Medicines and Homoeopathy colleges in the country.
                </p>
                
                <p>
                  The Ayurvedic Atlas project is a collaborative initiative with the Ministry of AYUSH to digitize and make accessible the vast knowledge of medicinal plants used in traditional Indian systems of medicine.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* AYUSH Systems */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-herbal-green">Traditional Systems under AYUSH</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <Leaf className="h-6 w-6 text-herbal-green mr-2" />
                  <h3 className="text-xl font-bold text-herbal-green">Ayurveda</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  One of the world's oldest holistic healing systems, developed more than 5,000 years ago in India. Ayurveda emphasizes the use of plant-based medicines and treatments.
                </p>
                <Button variant="outline" className="w-full border-herbal-green text-herbal-green hover:bg-herbal-green/10" asChild>
                  <Link to="/resources?category=ayurveda">Learn More</Link>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-herbal-green mr-2" />
                  <h3 className="text-xl font-bold text-herbal-green">Yoga</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  An ancient practice that brings together physical and mental disciplines to achieve peacefulness of body and mind, helping you relax and manage stress and anxiety.
                </p>
                <Button variant="outline" className="w-full border-herbal-green text-herbal-green hover:bg-herbal-green/10" asChild>
                  <Link to="/resources?category=yoga">Learn More</Link>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <Globe className="h-6 w-6 text-herbal-green mr-2" />
                  <h3 className="text-xl font-bold text-herbal-green">Unani</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  A system of alternative medicine that originated in ancient Greece, developed during the Islamic Golden Age, and is now practiced primarily in India.
                </p>
                <Button variant="outline" className="w-full border-herbal-green text-herbal-green hover:bg-herbal-green/10" asChild>
                  <Link to="/resources?category=unani">Learn More</Link>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-6 w-6 text-herbal-green mr-2" />
                  <h3 className="text-xl font-bold text-herbal-green">Siddha</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  One of the oldest systems of medicine in India, Siddha is primarily practiced in Tamil-speaking regions and focuses on using minerals, metals, and plants for healing.
                </p>
                <Button variant="outline" className="w-full border-herbal-green text-herbal-green hover:bg-herbal-green/10" asChild>
                  <Link to="/resources?category=siddha">Learn More</Link>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-herbal-green mr-2" />
                  <h3 className="text-xl font-bold text-herbal-green">Homoeopathy</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  A medical system based on the belief that the body can cure itself. It uses small amounts of natural substances to stimulate the healing process.
                </p>
                <Button variant="outline" className="w-full border-herbal-green text-herbal-green hover:bg-herbal-green/10" asChild>
                  <Link to="/resources?category=homoeopathy">Learn More</Link>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-herbal-green mr-2" />
                  <h3 className="text-xl font-bold text-herbal-green">Naturopathy</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  A form of alternative medicine that employs an array of natural healing practices, including dietary modifications, herbalism, and lifestyle adjustments.
                </p>
                <Button variant="outline" className="w-full border-herbal-green text-herbal-green hover:bg-herbal-green/10" asChild>
                  <Link to="/resources?category=naturopathy">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission and Objectives */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-herbal-green">Mission and Objectives</h2>
              
              <div className="space-y-6 text-gray-700">
                <p className="text-lg">
                  The Ministry of AYUSH is committed to:
                </p>
                
                <ul className="list-disc pl-6 space-y-3">
                  <li>Upgrading the educational standards in Indian Systems of Medicines and Homoeopathy colleges in the country.</li>
                  <li>Strengthening existing research institutions and ensuring a time-bound research program.</li>
                  <li>Drawing up schemes for promotion, cultivation, and regeneration of medicinal plants used in these systems.</li>
                  <li>Evolving Pharmacopoeial standards for these systems of medicine.</li>
                  <li>Preserving and documenting the traditional knowledge of Ayurveda, Siddha, Unani and Homoeopathy (ASUH).</li>
                </ul>
                
                <div className="bg-herbal-green/10 p-6 rounded-lg mt-8">
                  <h3 className="text-xl font-bold mb-4 text-herbal-green">Our Collaboration</h3>
                  <p>
                    The Ayurvedic Atlas project is proud to collaborate with the Ministry of AYUSH to digitize and make accessible the vast knowledge of medicinal plants used in traditional Indian systems of medicine. Through this digital platform, we aim to preserve, document, and promote this valuable heritage for future generations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-herbal-green/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-herbal-green">Explore Traditional Medicine Systems</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              Discover the rich heritage of traditional medicine systems and learn how they can complement modern healthcare.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-herbal-green hover:bg-herbal-green/90 text-white" asChild>
                <Link to="/resources">Browse Resources</Link>
              </Button>
              <Button variant="outline" className="border-herbal-green text-herbal-green hover:bg-herbal-green/10" asChild>
                <Link to="/plants">Explore Medicinal Plants</Link>
              </Button>
              <Button variant="outline" className="border-herbal-green text-herbal-green hover:bg-herbal-green/10" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutAyushPage;
