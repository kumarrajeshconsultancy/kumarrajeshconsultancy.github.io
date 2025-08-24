import { Button } from "@/components/ui/button";
import { GraduationCap, TrendingUp, Users } from "lucide-react";

export default function AboutSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="section-padding bg-gradient-to-br from-green-50 to-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Company Image */}
          <div data-testid="about-image">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Kumar Rajesh Consultancy team working in modern office environment" 
              className="rounded-2xl shadow-2xl w-full h-auto border-4 border-white"
            />
          </div>

          <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-8" data-testid="about-title">
              About Kumar Rajesh Consultancy
            </h2>
            <p className="text-2xl text-gray-700 mb-10 font-medium leading-relaxed" data-testid="about-description">
              Kumar Rajesh Consultancy is a premier training institute and business consulting firm based in India, dedicated to empowering individuals and organizations through cutting-edge education and strategic business solutions.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4" data-testid="about-feature-training">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="text-white h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Training Excellence</h3>
                  <p className="text-gray-600">Comprehensive online training programs in trending technologies with industry-expert trainers and hands-on projects.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4" data-testid="about-feature-growth">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="text-white h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Growth</h3>
                  <p className="text-gray-600">Strategic consulting services to help businesses optimize operations, increase profitability, and achieve digital transformation.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4" data-testid="about-feature-support">
                <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="text-white h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Support</h3>
                  <p className="text-gray-600">Dedicated support for career counseling, job referrals, and professional development to help you achieve your goals.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection('training')}
                size="lg"
                className="bg-primary text-white hover:bg-secondary transition duration-200"
                data-testid="about-start-learning"
              >
                Start Learning Today
              </Button>
              <Button 
                onClick={() => scrollToSection('consultancy')}
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white transition duration-200"
                data-testid="about-explore-services"
              >
                Explore Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
