import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MapPin, Phone, Mail, Clock, MessageCircle, CreditCard } from "lucide-react";
import PayPalButton from "@/components/PayPalButton";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [consent, setConsent] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your message! We will get back to you soon.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      setConsent(false);
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to the terms before submitting the form.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  const trainingCourses = [
    "DevOps with AWS & Linux",
    "Azure Data Engineer",
    "Python & Data Science with AI",
    "Google Cloud Platform (GCP)",
    "Java Full Stack",
    "UI Full Stack",
    "Salesforce CRM",
    "Blockchain Development",
    "ServiceNow Developer",
    "Machine Learning & AI",
    "Kubernetes & Docker",
    "React & Node.js Full Stack",
    "Cybersecurity & Ethical Hacking",
    "Power BI & Tableau",
    "Snowflake Data Platform",
    "Other Technology Course"
  ];

  const consultancyServices = [
    "Website Design",
    "App Design",
    "YouTube Growth",
    "Instagram Growth",
    "Digital Support",
    "Cyber Security Help",
    "Career Counseling",
    "Job Referrals",
    "Resume Building",
    "Company Reviews",
    "Logo Design",
    "Video/Photo Editing",
    "Other Business Service"
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="contact-title">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="contact-description">
            Ready to start your learning journey or transform your business? Contact us today for personalized guidance and solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white shadow-lg" data-testid="contact-form-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6" data-testid="form-title">
                Send us a Message
              </h3>
              <form action="https://formsubmit.co/kumarrajeshconsultancy@gmail.com" method="POST">
                {/* FormSubmit Configuration */}
                <input type="hidden" name="_subject" value="New Contact Form Submission - Kumar Rajesh Consultancy" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Your Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full"
                      placeholder="Enter your full name"
                      data-testid="input-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full"
                      placeholder="Enter your email address"
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <Label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="w-full"
                    placeholder="Enter your phone number"
                    data-testid="input-phone"
                  />
                </div>

                <div className="mb-6">
                  <Label className="block text-gray-700 font-medium mb-2">
                    Service Interested In
                  </Label>
                  <select
                    name="service"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    data-testid="select-service"
                  >
                    <option value="">Select a Service</option>
                    <optgroup label="Training Courses">
                      {trainingCourses.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Consultancy Services">
                      {consultancyServices.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div className="mb-6">
                  <Label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Your Message *
                  </Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Tell us about your requirements..."
                    data-testid="input-message"
                  ></textarea>
                </div>

                <div className="mb-6">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="consent"
                      name="_consent"
                      required
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      data-testid="checkbox-consent"
                    />
                    <label htmlFor="consent" className="text-gray-700">
                      I consent to having my information processed to receive responses to my inquiry. *
                    </label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition duration-200"
                  data-testid="submit-message"
                >
                  Send Message ✈️
                </button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="bg-white shadow-lg" data-testid="contact-info-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6" data-testid="contact-info-title">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4" data-testid="contact-location">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <MapPin className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Our Location</h4>
                      <p className="text-gray-600">Dodhar, Bijpur, Sonebhadra, Uttar Pradesh, India</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4" data-testid="contact-phone">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <Phone className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Phone Number</h4>
                      <a href="tel:+918810841429" className="text-green-600 hover:text-green-700">
                        +91 8810841429
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4" data-testid="contact-email">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Mail className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email Addresses</h4>
                      <div className="space-y-1">
                        <a href="mailto:connect@kumarrajeshconsultancy.com" className="text-blue-600 hover:text-blue-700 block">
                          connect@kumarrajeshconsultancy.com
                        </a>
                        <a href="mailto:kumarrajeshconsultancy@gmail.com" className="text-blue-600 hover:text-blue-700 block">
                          kumarrajeshconsultancy@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4" data-testid="contact-hours">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Clock className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Working Hours</h4>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact Options */}
            <Card className="bg-white shadow-lg" data-testid="quick-contact-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6" data-testid="quick-contact-title">
                  Quick Contact
                </h3>
                <div className="space-y-4">
                  <Button 
                    asChild
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 h-auto"
                    data-testid="whatsapp-contact"
                  >
                    <a href="https://wa.me/918810841429" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-3">
                      <MessageCircle className="h-6 w-6" />
                      <span className="font-semibold">WhatsApp Chat</span>
                    </a>
                  </Button>
                  
                  <Button 
                    asChild
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 h-auto"
                    data-testid="upi-payment"
                  >
                    <a href="upi://pay?pa=8810841429@ybl&pn=Rajesh Kumar&cu=INR" className="flex items-center justify-center space-x-3">
                      <CreditCard className="h-6 w-6" />
                      <span className="font-semibold">Pay via UPI</span>
                    </a>
                  </Button>

                  <div className="text-center space-y-2">
                    <Button
                      onClick={() => setShowPayment(!showPayment)}
                      variant="outline"
                      className="w-full"
                      data-testid="toggle-paypal"
                    >
                      {showPayment ? 'Hide PayPal Payment' : 'Pay with PayPal'}
                    </Button>
                    
                    {showPayment && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg" data-testid="paypal-section">
                        <h4 className="font-semibold mb-2">PayPal Payment</h4>
                        <PayPalButton amount="100.00" currency="USD" intent="capture" />
                      </div>
                    )}
                  </div>

                  <div className="text-center text-gray-600 pt-4 border-t">
                    <p className="text-sm" data-testid="paypal-info">PayPal: @8810841429</p>
                    <p className="text-sm">Name: Rajesh Kumar</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
