import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Laptop, 
  Youtube, 
  Shield, 
  UserCheck, 
  FileText, 
  Palette,
  MessageSquare
} from "lucide-react";

const services = [
  {
    id: "website-app-design",
    title: "Website & App Design",
    icon: Laptop,
    color: "border-primary",
    iconBg: "bg-primary",
    textColor: "text-primary",
    description: "Professional website and mobile app design services to create compelling digital experiences that engage users."
  },
  {
    id: "social-growth",
    title: "YouTube & Instagram Growth",
    icon: Youtube,
    color: "border-red-500",
    iconBg: "bg-red-500",
    textColor: "text-red-500",
    description: "Strategic optimization and growth strategies to increase your social media presence and engagement."
  },
  {
    id: "digital-security",
    title: "Digital Support & Cyber Security",
    icon: Shield,
    color: "border-green-500",
    iconBg: "bg-green-500",
    textColor: "text-green-500",
    description: "Comprehensive digital support and cybersecurity services to protect your business from online threats."
  },
  {
    id: "career-services",
    title: "Career Counseling & Job Referrals",
    icon: UserCheck,
    color: "border-purple-500",
    iconBg: "bg-purple-500",
    textColor: "text-purple-500",
    description: "Professional career guidance and job placement assistance to help you achieve your career goals."
  },
  {
    id: "resume-reviews",
    title: "Resume Building & Company Reviews",
    icon: FileText,
    color: "border-blue-500",
    iconBg: "bg-blue-500",
    textColor: "text-blue-500",
    description: "Expert resume crafting and detailed company insights to make informed career decisions."
  },
  {
    id: "creative-services",
    title: "Logo Design & Media Editing",
    icon: Palette,
    color: "border-orange-500",
    iconBg: "bg-orange-500",
    textColor: "text-orange-500",
    description: "Creative logo design and professional video/photo editing services to enhance your brand identity."
  },
  {
    id: "other-services",
    title: "Other Business Services",
    icon: MessageSquare,
    color: "border-gray-500",
    iconBg: "bg-gray-500",
    textColor: "text-gray-500",
    description: "Need a specific business solution not listed? We provide custom consultancy services tailored to your unique requirements."
  }
];

export default function ConsultancySection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="consultancy" className="section-padding bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6" data-testid="consultancy-title">
            Business Consultancy Services
          </h2>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto font-medium" data-testid="consultancy-description">
            Comprehensive business solutions to drive growth, optimize operations, and achieve digital transformation goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={service.id} 
                className={`bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 ${service.color} course-card`}
                data-testid={`service-card-${service.id}`}
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${service.iconBg} rounded-lg flex items-center justify-center mb-6`}>
                    <IconComponent className="text-white h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4" data-testid={`service-title-${service.id}`}>
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6" data-testid={`service-description-${service.id}`}>
                    {service.description}
                  </p>
                  <Button 
                    variant="ghost" 
                    className={`${service.textColor} hover:bg-transparent font-semibold`}
                    onClick={() => {
                      const message = `Hi! I'm interested in ${service.title}. Can you provide more details and pricing information?`;
                      window.open(`https://wa.me/918810841429?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                    data-testid={`service-quote-${service.id}`}
                  >
                    Get Quote →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Card className="bg-white shadow-lg max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4" data-testid="custom-solutions-title">
                Need Custom Solutions?
              </h3>
              <p className="text-gray-600 mb-6" data-testid="custom-solutions-description">
                Don't see what you need? Contact us for customized business solutions tailored specifically to your requirements.
              </p>
              <Button 
                onClick={() => {
                  const message = "Hi! I need a custom business solution. Can we discuss my specific requirements and get a customized quote?";
                  window.open(`https://wa.me/918810841429?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="bg-accent text-white px-8 py-3 hover:bg-yellow-500 transition duration-200"
                data-testid="request-custom-quote"
              >
                Request Custom Quote
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
