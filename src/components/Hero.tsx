import { GraduationCap, Briefcase } from "lucide-react";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight drop-shadow-lg" data-testid="hero-title">
              <span className="text-white">Your Gateway to</span>
              <span className="text-yellow-300 block"> Tech Excellence</span> 
              <span className="text-white">& Business Growth</span>
            </h1>
            <p className="text-2xl mb-10 text-gray-100 font-medium leading-relaxed drop-shadow-md" data-testid="hero-description">
              Leading training institute and consultancy firm offering cutting-edge online courses and comprehensive business solutions across India.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="glass-effect rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <GraduationCap className="text-accent h-8 w-8 mr-3" />
                  <h3 className="text-lg font-semibold">Online Training Institute</h3>
                </div>
                <p className="text-blue-100">15+ trending technology courses with expert trainers</p>
              </div>
              <div className="glass-effect rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Briefcase className="text-accent h-8 w-8 mr-3" />
                  <h3 className="text-lg font-semibold">Business Consultancy</h3>
                </div>
                <p className="text-blue-100">Comprehensive solutions for digital transformation</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => scrollToSection('training')}
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-4 rounded-xl font-bold text-lg transition duration-300 text-center shadow-xl border-2 border-yellow-400"
                data-testid="hero-explore-courses"
              >
                Explore Courses 🎓
              </button>
              <button 
                onClick={() => scrollToSection('consultancy')}
                className="bg-white hover:bg-gray-100 text-blue-800 px-10 py-4 rounded-xl font-bold text-lg transition duration-300 text-center shadow-xl border-2 border-white"
                data-testid="hero-consultancy-services"
              >
                Consultancy Services 💼
              </button>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="glass-effect rounded-2xl p-8" data-testid="hero-stats">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent" data-testid="stat-students">1000+</div>
                <div className="text-blue-100">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent" data-testid="stat-clients">500+</div>
                <div className="text-blue-100">Clients Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent" data-testid="stat-courses">15+</div>
                <div className="text-blue-100">Technology Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent" data-testid="stat-experience">5+ Years</div>
                <div className="text-blue-100">Industry Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
