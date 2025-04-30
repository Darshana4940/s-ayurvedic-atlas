
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  // Form submission handler
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, you would send this data to your backend
      console.log("Form data:", data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast.success("Your message has been sent successfully! We'll get back to you soon.");
      
      // Reset form
      form.reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-herbal-green">Contact Us</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Have questions, feedback, or want to collaborate? We'd love to hear from you.
            </p>
          </div>
        </section>
        
        {/* Contact details and form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact details cards */}
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="bg-herbal-green/10 p-3 rounded-full mr-4">
                        <MapPin className="h-6 w-6 text-herbal-green" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Visit Us</h3>
                        <p className="text-gray-700">
                          AYUSH Bhawan, B Block<br />
                          GPO Complex, INA<br />
                          New Delhi - 110023<br />
                          India
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="bg-herbal-green/10 p-3 rounded-full mr-4">
                        <Phone className="h-6 w-6 text-herbal-green" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Call Us</h3>
                        <p className="text-gray-700 mb-1">
                          <a href="tel:+91-11-24651969" className="hover:text-herbal-green">+91-11-24651969</a>
                        </p>
                        <p className="text-gray-700">
                          <a href="tel:+91-11-24651976" className="hover:text-herbal-green">+91-11-24651976</a>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="bg-herbal-green/10 p-3 rounded-full mr-4">
                        <Mail className="h-6 w-6 text-herbal-green" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Email Us</h3>
                        <p className="text-gray-700 mb-1">
                          <a href="mailto:info@ayurvedicatlas.org" className="hover:text-herbal-green">info@ayurvedicatlas.org</a>
                        </p>
                        <p className="text-gray-700">
                          <a href="mailto:support@ayurvedicatlas.org" className="hover:text-herbal-green">support@ayurvedicatlas.org</a>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="bg-herbal-green/10 p-3 rounded-full mr-4">
                        <MessageSquare className="h-6 w-6 text-herbal-green" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Follow Us</h3>
                        <div className="flex space-x-4">
                          <a href="#" className="text-gray-600 hover:text-herbal-green">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                          </a>
                          <a href="#" className="text-gray-600 hover:text-herbal-green">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                          </a>
                          <a href="#" className="text-gray-600 hover:text-herbal-green">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                            </svg>
                          </a>
                          <a href="#" className="text-gray-600 hover:text-herbal-green">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                              <rect x="2" y="9" width="4" height="12"></rect>
                              <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Contact form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-herbal-green">Send Us a Message</h2>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input placeholder="Message subject" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Type your message here" 
                                  className="min-h-[150px]" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-herbal-green hover:bg-herbal-green/90 text-white"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="bg-gray-100 rounded-lg overflow-hidden h-[400px]">
              {/* Replace with actual map component if needed */}
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <p className="text-gray-500">Interactive Map Coming Soon</p>
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
                  <h3 className="font-bold text-lg mb-2 text-herbal-green">How can I contribute to the Ayurvedic Atlas?</h3>
                  <p className="text-gray-700">
                    We welcome contributions from researchers, practitioners, and enthusiasts. Please contact us through this form with details about your expertise and how you'd like to contribute.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-bold text-lg mb-2 text-herbal-green">Is the information on this platform verified?</h3>
                  <p className="text-gray-700">
                    Yes, all information on the Ayurvedic Atlas is reviewed by experts in the field and cross-referenced with authoritative sources from traditional texts and modern research.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-bold text-lg mb-2 text-herbal-green">Can I use the content for educational purposes?</h3>
                  <p className="text-gray-700">
                    Yes, you can use our content for educational purposes with proper attribution. For commercial use or republication, please contact us for permission.
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

export default ContactPage;
