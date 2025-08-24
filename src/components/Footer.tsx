import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1" data-testid="footer-company-info">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">KRC</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Kumar Rajesh Consultancy</h3>
                <p className="text-gray-400 text-sm">Training & Consulting</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4" data-testid="footer-company-description">
              Empowering individuals and businesses through cutting-edge training and strategic consulting services.
            </p>
            <div className="flex space-x-4" data-testid="footer-social-links">
              <a href="#" className="text-gray-400 hover:text-white transition duration-200" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Training Courses */}
          <div data-testid="footer-training-courses">
            <h4 className="text-lg font-semibold mb-6">Training Courses</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => scrollToSection('training')} className="hover:text-white transition duration-200">DevOps with AWS</button></li>
              <li><button onClick={() => scrollToSection('training')} className="hover:text-white transition duration-200">Azure Data Engineer</button></li>
              <li><button onClick={() => scrollToSection('training')} className="hover:text-white transition duration-200">Python & Data Science</button></li>
              <li><button onClick={() => scrollToSection('training')} className="hover:text-white transition duration-200">Java Full Stack</button></li>
              <li><button onClick={() => scrollToSection('training')} className="hover:text-white transition duration-200">Blockchain</button></li>
            </ul>
          </div>

          {/* Consultancy Services */}
          <div data-testid="footer-consultancy-services">
            <h4 className="text-lg font-semibold mb-6">Consultancy Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => scrollToSection('consultancy')} className="hover:text-white transition duration-200">Website Design</button></li>
              <li><button onClick={() => scrollToSection('consultancy')} className="hover:text-white transition duration-200">Digital Marketing</button></li>
              <li><button onClick={() => scrollToSection('consultancy')} className="hover:text-white transition duration-200">Career Counseling</button></li>
              <li><button onClick={() => scrollToSection('consultancy')} className="hover:text-white transition duration-200">Cyber Security</button></li>
              <li><button onClick={() => scrollToSection('consultancy')} className="hover:text-white transition duration-200">Custom Solutions</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div data-testid="footer-contact-info">
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3">
                <span>+91 8810841429</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>connect@kumarrajeshconsultancy.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>kumarrajeshconsultancy@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>Uttar Pradesh, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400" data-testid="footer-copyright">
          <p>&copy; 2025 Kumar Rajesh Consultancy. All rights reserved. | Designed with ❤️ for your success</p>
        </div>
      </div>
    </footer>
  );
}
