
import { Card, CardContent } from "@/components/ui/card";

const statistics = [
  {
    value: "500+",
    label: "Plants",
    icon: (
      <svg className="w-10 h-10 text-herbal-green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19c-4.3 0-7.7-2-9-6 1.3-4 4.7-6 9-6 4.3 0 7.7 2 9 6-1.3 4-4.7 6-9 6Z"></path>
        <circle cx="12" cy="13" r="3"></circle>
      </svg>
    )
  },
  {
    value: "100+",
    label: "Ailments Covered",
    icon: (
      <svg className="w-10 h-10 text-herbal-green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 2 1.5 1.5L11 2l1.5 1.5L14 2l1.5 1.5L17 2l1.5 1.5L20 2v3.5L21.5 7 20 8.5l1.5 1.5-1.5 1.5 1.5 1.5-1.5 1.5 1.5 1.5-1.5 1.5V22H4V3.5L2.5 5 4 6.5 2.5 8 4 9.5 2.5 11 4 12.5 2.5 14 4 15.5 2.5 17 4 18.5V2Z"></path>
        <path d="M8 22V7"></path>
        <path d="M12 22v-3"></path>
        <path d="M16 22v-6"></path>
      </svg>
    )
  },
  {
    value: "5",
    label: "AYUSH Disciplines",
    icon: (
      <svg className="w-10 h-10 text-herbal-green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3"></circle>
        <circle cx="6" cy="6" r="3"></circle>
        <path d="M6 21V9a9 9 0 0 0 9 9"></path>
      </svg>
    )
  }
];

const InfoSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-herbal-green">
              Discover the Healing Power of Ayurvedic Plants
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
              Our Virtual Herbal Garden provides a comprehensive digital encyclopedia 
              of medicinal plants used in traditional Ayurvedic practice. Explore their 
              properties, uses, and cultivation techniques through our interactive platform.
            </p>
            <p className="text-gray-700 mb-6 text-lg">
              Whether you're a student, practitioner, or simply interested in natural healing, 
              our platform offers valuable insights into the ancient wisdom of Ayurveda.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-herbal-green/10 text-herbal-green px-3 py-1 rounded-full text-sm font-medium">
                Ayurveda
              </span>
              <span className="bg-herbal-brown/10 text-herbal-brown px-3 py-1 rounded-full text-sm font-medium">
                Unani
              </span>
              <span className="bg-herbal-blue/10 text-herbal-blue px-3 py-1 rounded-full text-sm font-medium">
                Siddha
              </span>
              <span className="bg-herbal-yellow/20 text-herbal-brown px-3 py-1 rounded-full text-sm font-medium">
                Homeopathy
              </span>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                Yoga
              </span>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {statistics.map((stat, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-md transition-shadow">
                  <CardContent className="p-0 flex flex-col items-center">
                    <div className="mb-4 p-3 rounded-full bg-herbal-green/10">
                      {stat.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-herbal-brown mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-gray-600">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 bg-herbal-green/5 p-6 rounded-lg border border-herbal-green/20">
              <h3 className="text-xl font-bold text-herbal-green mb-3">
                Preserving Traditional Knowledge
              </h3>
              <p className="text-gray-700">
                Our mission is to document, preserve, and promote the traditional 
                knowledge of medicinal plants, making it accessible to future 
                generations while supporting sustainable cultivation practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
