import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrainingSection from "@/components/TrainingSection";
import ConsultancySection from "@/components/ConsultancySection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TrainingSection />
      <ConsultancySection />
      <AboutSection />
      <ContactSection />
      <Footer />
      
      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/918810841429" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-200 z-50 hover:scale-110"
        data-testid="whatsapp-float-button"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
