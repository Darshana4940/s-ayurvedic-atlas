
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

// Login form schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Sign up form schema
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();
  
  // Set active tab based on URL parameter
  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "login" || mode === "signup") {
      setActiveTab(mode);
    }
  }, [searchParams]);
  
  // Initialize login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  // Initialize signup form
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  // Login form submission handler
  const handleLogin = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, you would authenticate with your backend
      console.log("Login data:", data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast.success("Login successful! Welcome back.");
      
      // Redirect to home page
      navigate("/");
    } catch (error) {
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Signup form submission handler
  const handleSignup = async (data: SignupFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, you would register with your backend
      console.log("Signup data:", data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast.success("Account created successfully! Welcome to Ayurvedic Atlas.");
      
      // Redirect to home page
      navigate("/");
    } catch (error) {
      toast.error("Signup failed. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 pb-12">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")}>
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login" className="text-lg py-3">Login</TabsTrigger>
                  <TabsTrigger value="signup" className="text-lg py-3">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <Card>
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-herbal-green/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <User className="h-8 w-8 text-herbal-green" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-herbal-green">Welcome Back</CardTitle>
                      <CardDescription>Enter your credentials to access your account</CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-6">
                          <FormField
                            control={loginForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                  <FormControl>
                                    <Input 
                                      className="pl-10" 
                                      placeholder="Enter your email" 
                                      {...field} 
                                    />
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password</FormLabel>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                  <FormControl>
                                    <Input
                                      className="pl-10 pr-10"
                                      type={showPassword ? "text" : "password"}
                                      placeholder="Enter your password"
                                      {...field}
                                    />
                                  </FormControl>
                                  <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                  >
                                    {showPassword ? (
                                      <EyeOff className="h-5 w-5" />
                                    ) : (
                                      <Eye className="h-5 w-5" />
                                    )}
                                  </button>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="text-right">
                            <a href="#" className="text-sm text-herbal-green hover:underline">
                              Forgot password?
                            </a>
                          </div>
                          
                          <Button
                            type="submit"
                            className="w-full bg-herbal-green hover:bg-herbal-green/90 text-white"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Logging in..." : "Log In"}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                    
                    <CardFooter className="flex flex-col space-y-4">
                      <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">or continue with</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <Button variant="outline" className="w-full">
                          <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                            <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                            <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                          </svg>
                          Google
                        </Button>
                        <Button variant="outline" className="w-full">
                          <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                          </svg>
                          LinkedIn
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="signup">
                  <Card>
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-herbal-green/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <User className="h-8 w-8 text-herbal-green" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-herbal-green">Create Account</CardTitle>
                      <CardDescription>Sign up to access the Ayurvedic Atlas platform</CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <Form {...signupForm}>
                        <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-6">
                          <FormField
                            control={signupForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <div className="relative">
                                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                  <FormControl>
                                    <Input 
                                      className="pl-10" 
                                      placeholder="Enter your name" 
                                      {...field} 
                                    />
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={signupForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                  <FormControl>
                                    <Input 
                                      className="pl-10" 
                                      placeholder="Enter your email" 
                                      {...field} 
                                    />
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={signupForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password</FormLabel>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                  <FormControl>
                                    <Input
                                      className="pl-10 pr-10"
                                      type={showPassword ? "text" : "password"}
                                      placeholder="Create a password"
                                      {...field}
                                    />
                                  </FormControl>
                                  <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                  >
                                    {showPassword ? (
                                      <EyeOff className="h-5 w-5" />
                                    ) : (
                                      <Eye className="h-5 w-5" />
                                    )}
                                  </button>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={signupForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                  <FormControl>
                                    <Input
                                      className="pl-10 pr-10"
                                      type={showConfirmPassword ? "text" : "password"}
                                      placeholder="Confirm your password"
                                      {...field}
                                    />
                                  </FormControl>
                                  <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  >
                                    {showConfirmPassword ? (
                                      <EyeOff className="h-5 w-5" />
                                    ) : (
                                      <Eye className="h-5 w-5" />
                                    )}
                                  </button>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="text-sm text-gray-500">
                            By signing up, you agree to our{" "}
                            <a href="#" className="text-herbal-green hover:underline">
                              Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-herbal-green hover:underline">
                              Privacy Policy
                            </a>
                            .
                          </div>
                          
                          <Button
                            type="submit"
                            className="w-full bg-herbal-green hover:bg-herbal-green/90 text-white"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Creating account..." : "Sign Up"}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                    
                    <CardFooter className="flex flex-col space-y-4">
                      <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">or sign up with</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <Button variant="outline" className="w-full">
                          <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                            <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                            <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                          </svg>
                          Google
                        </Button>
                        <Button variant="outline" className="w-full">
                          <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                          </svg>
                          LinkedIn
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
