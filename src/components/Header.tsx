import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3" data-testid="header-logo">
            <div className="w-14 h-12 gradient-bg rounded-xl flex items-center justify-center relative shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-xl"></div>
              <div className="relative">
                <span className="text-white font-bold text-lg">KRC</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Kumar Rajesh Consultancy</h1>
              <p className="text-sm text-primary font-medium">Training & Consulting Excellence</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-gray-700 hover:text-primary transition duration-200"
              data-testid="nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('training')} 
              className="text-gray-700 hover:text-primary transition duration-200"
              data-testid="nav-training"
            >
              Training
            </button>
            <button 
              onClick={() => scrollToSection('consultancy')} 
              className="text-gray-700 hover:text-primary transition duration-200"
              data-testid="nav-consultancy"
            >
              Consultancy
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-gray-700 hover:text-primary transition duration-200"
              data-testid="nav-about"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition duration-200"
              data-testid="nav-contact"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={toggleMobileMenu}
            data-testid="mobile-menu-button"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden" data-testid="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <button 
                onClick={() => scrollToSection('home')} 
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary"
                data-testid="mobile-nav-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('training')} 
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary"
                data-testid="mobile-nav-training"
              >
                Training
              </button>
              <button 
                onClick={() => scrollToSection('consultancy')} 
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary"
                data-testid="mobile-nav-consultancy"
              >
                Consultancy
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary"
                data-testid="mobile-nav-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary"
                data-testid="mobile-nav-contact"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
