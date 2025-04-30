
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Mail, Check, ArrowRight } from "lucide-react";

// Form validation schema
const newsletterFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  interestAreas: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Please select at least one area of interest",
  }),
});

type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;

const NewsletterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Available interest areas
  const interestAreas = [
    { id: "ayurveda", label: "Ayurveda" },
    { id: "yoga", label: "Yoga & Naturopathy" },
    { id: "unani", label: "Unani Medicine" },
    { id: "siddha", label: "Siddha Medicine" },
    { id: "homeopathy", label: "Homeopathy" },
    { id: "plants", label: "Medicinal Plants" },
    { id: "research", label: "Research & Studies" },
    { id: "events", label: "Events & Webinars" },
  ];
  
  // Initialize form
  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      interestAreas: [],
    },
  });
  
  // Form submission handler
  const onSubmit = async (data: NewsletterFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, you would send this data to your backend
      console.log("Form data:", data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast.success("You have successfully subscribed to our newsletter!");
      
      // Reset form
      form.reset();
    } catch (error) {
      toast.error("Failed to subscribe. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // List of newsletter benefits
  const benefits = [
    "Monthly digest of latest medicinal plant research",
    "Expert interviews and insights",
    "Seasonal plant cultivation guides",
    "Early access to events and webinars",
    "Exclusive downloadable resources",
    "Community spotlights and success stories"
  ];
  
  // Past newsletter examples
  const pastNewsletters = [
    {
      title: "Summer Medicinal Plants Guide",
      date: "June 2024",
      description: "Exploring heat-resistant medicinal plants and their cultivation techniques."
    },
    {
      title: "Traditional Knowledge Systems",
      date: "May 2024",
      description: "Documenting and preserving ancient herbal wisdom across cultures."
    },
    {
      title: "Sustainable Harvesting Practices",
      date: "April 2024",
      description: "Best practices for sustainable wild harvesting of medicinal plants."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 pb-12">
        {/* Hero section */}
        <section className="bg-herbal-green/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-full bg-herbal-green/20 flex items-center justify-center">
                <Mail className="h-7 w-7 text-herbal-green" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-herbal-green">Subscribe to Our Newsletter</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
              Stay informed about the latest discoveries, research, and events in the world of medicinal plants and traditional medicine.
            </p>
            
            {/* Newsletter frequency note */}
            <div className="inline-block bg-white px-4 py-2 rounded-full text-sm font-medium text-herbal-green border border-herbal-green/20">
              Sent monthly • No spam • Unsubscribe anytime
            </div>
          </div>
        </section>
        
        {/* Subscription form and benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Benefits column */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6 text-herbal-green">Why Subscribe?</h2>
                
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mt-1 mr-3 h-5 w-5 rounded-full bg-herbal-green/10 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-herbal-green" />
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 bg-herbal-green/5 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 text-herbal-green">Sample Newsletters</h3>
                  <div className="space-y-4">
                    {pastNewsletters.map((newsletter, index) => (
                      <div key={index} className="border-b border-herbal-green/10 last:border-0 pb-4 last:pb-0">
                        <h4 className="font-semibold text-herbal-green">{newsletter.title}</h4>
                        <div className="text-sm text-gray-500 mb-1">{newsletter.date}</div>
                        <p className="text-sm text-gray-700">{newsletter.description}</p>
                        <Button variant="link" className="text-herbal-green p-0 h-auto mt-1">
                          View Sample <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Subscription form */}
              <div className="lg:col-span-3">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-herbal-green">Subscribe Now</h2>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your first name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your last name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        {/* Email field */}
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your email address" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {/* Interest areas */}
                        <FormField
                          control={form.control}
                          name="interestAreas"
                          render={() => (
                            <FormItem>
                              <div className="mb-4">
                                <FormLabel>Areas of Interest</FormLabel>
                                <p className="text-sm text-gray-500">Select topics you'd like to receive information about</p>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {interestAreas.map((item) => (
                                  <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="interestAreas"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={item.id}
                                          className="flex items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(item.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, item.id])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== item.id
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal cursor-pointer">
                                            {item.label}
                                          </FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {/* Privacy policy */}
                        <div className="text-sm text-gray-500">
                          By subscribing, you agree to our <a href="#" className="text-herbal-green hover:underline">Privacy Policy</a> and consent to receive updates from Ayurvedic Atlas. You can unsubscribe at any time.
                        </div>
                        
                        {/* Submit button */}
                        <Button
                          type="submit"
                          className="w-full bg-herbal-green hover:bg-herbal-green/90 text-white"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Subscribing..." : "Subscribe to Newsletter"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-herbal-green">What Our Subscribers Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-herbal-green/20 flex items-center justify-center mr-3">
                    <span className="font-semibold text-herbal-green">DP</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Dr. Priya Sharma</h3>
                    <p className="text-sm text-gray-500">Ayurvedic Practitioner</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "The monthly research updates have been invaluable for my practice. I appreciate the evidence-based approach combined with traditional wisdom."
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-herbal-green/20 flex items-center justify-center mr-3">
                    <span className="font-semibold text-herbal-green">JT</span>
                  </div>
                  <div>
                    <h3 className="font-bold">James Thompson</h3>
                    <p className="text-sm text-gray-500">Herbalist</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "The cultivation guides have helped me grow medicinal plants I never thought possible in my climate. The seasonal tips are always spot on!"
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-herbal-green/20 flex items-center justify-center mr-3">
                    <span className="font-semibold text-herbal-green">MK</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Maya Kumar</h3>
                    <p className="text-sm text-gray-500">Researcher</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a researcher in traditional medicine, I find the newsletter to be an excellent bridge between ancient knowledge and modern scientific understanding."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-herbal-green">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-bold text-lg mb-2 text-herbal-green">How often will I receive the newsletter?</h3>
                  <p className="text-gray-700">
                    Our newsletter is sent once a month, typically during the first week. Occasionally, we might send special editions for important announcements or events.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-bold text-lg mb-2 text-herbal-green">Can I customize what content I receive?</h3>
                  <p className="text-gray-700">
                    Yes, we tailor our newsletter based on your selected areas of interest. You can update your preferences at any time through the link provided in each newsletter.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-bold text-lg mb-2 text-herbal-green">How do I unsubscribe?</h3>
                  <p className="text-gray-700">
                    You can unsubscribe at any time by clicking the unsubscribe link at the bottom of any newsletter email. Your data will be removed from our mailing list immediately.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-bold text-lg mb-2 text-herbal-green">Is my personal information secure?</h3>
                  <p className="text-gray-700">
                    Absolutely. We take data privacy seriously and never share your personal information with third parties. Our full privacy policy is available on our website.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NewsletterPage;
