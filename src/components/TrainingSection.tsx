import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Cloud, 
  Database, 
  Code, 
  Cpu, 
  Globe, 
  Palette, 
  ShoppingCart,
  Shield,
  Settings,
  TrendingUp,
  Brain,
  Lock,
  BarChart3,
  Snowflake,
  MessageSquare
} from "lucide-react";

const courses = [
  {
    id: "devops-aws",
    title: "DevOps with AWS & Linux",
    duration: "3 Months",
    icon: Cloud,
    color: "from-blue-50 to-indigo-50",
    iconBg: "bg-blue-600",
    textColor: "text-blue-600",
    description: "Master DevOps practices with AWS cloud services and Linux administration. Learn CI/CD, containerization, and infrastructure automation."
  },
  {
    id: "azure-data-engineer",
    title: "Azure Data Engineer & Azure DevOps",
    duration: "2 Months",
    icon: Database,
    color: "from-cyan-50 to-blue-50",
    iconBg: "bg-cyan-600",
    textColor: "text-cyan-600",
    description: "Design and implement data solutions on Microsoft Azure. Learn Azure Data Factory, Synapse Analytics, and data warehousing."
  },
  {
    id: "python-data-science",
    title: "Python Developer & Data Science with AI",
    duration: "3 Months",
    icon: Code,
    color: "from-green-50 to-emerald-50",
    iconBg: "bg-green-600",
    textColor: "text-green-600",
    description: "Complete Python programming with Data Science, Machine Learning, and AI. Hands-on projects with real-world datasets."
  },
  {
    id: "gcp",
    title: "Google Cloud Platform (GCP)",
    duration: "2 Months",
    icon: Globe,
    color: "from-orange-50 to-red-50",
    iconBg: "bg-orange-600",
    textColor: "text-orange-600",
    description: "Master Google Cloud services for compute, storage, networking, and machine learning. Prepare for GCP certification."
  },
  {
    id: "java-fullstack",
    title: "Java Full Stack Development",
    duration: "3 Months",
    icon: Cpu,
    color: "from-purple-50 to-indigo-50",
    iconBg: "bg-purple-600",
    textColor: "text-purple-600",
    description: "End-to-end Java development with Spring Boot, React, and microservices architecture. Build enterprise applications."
  },
  {
    id: "ui-fullstack",
    title: "UI Full Stack Development",
    duration: "2 Months",
    icon: Palette,
    color: "from-pink-50 to-rose-50",
    iconBg: "bg-pink-600",
    textColor: "text-pink-600",
    description: "Modern frontend development with React, Angular, Node.js, and MongoDB. Create responsive web applications."
  },
  {
    id: "salesforce",
    title: "SalesForce CRM",
    duration: "2 Months",
    icon: ShoppingCart,
    color: "from-teal-50 to-cyan-50",
    iconBg: "bg-teal-600",
    textColor: "text-teal-600",
    description: "Complete Salesforce administration and development. Learn Apex, Lightning, and prepare for Salesforce certification."
  },
  {
    id: "blockchain",
    title: "Blockchain Development",
    duration: "2 Months",
    icon: Shield,
    color: "from-yellow-50 to-amber-50",
    iconBg: "bg-yellow-600",
    textColor: "text-yellow-600",
    description: "Learn blockchain technology, smart contracts, and DApp development with Ethereum and Solidity programming."
  },
  {
    id: "servicenow",
    title: "ServiceNow Developer",
    duration: "2 Months",
    icon: Settings,
    color: "from-indigo-50 to-blue-50",
    iconBg: "bg-indigo-600",
    textColor: "text-indigo-600",
    description: "ServiceNow platform development, customization, and administration. Learn workflows, scripting, and integrations."
  },
  {
    id: "machine-learning",
    title: "Machine Learning & AI",
    duration: "3 Months",
    icon: Brain,
    color: "from-violet-50 to-purple-50",
    iconBg: "bg-violet-600",
    textColor: "text-violet-600",
    description: "Advanced machine learning algorithms, neural networks, and AI implementation with Python and TensorFlow."
  },
  {
    id: "kubernetes-docker",
    title: "Kubernetes & Docker",
    duration: "2 Months",
    icon: TrendingUp,
    color: "from-emerald-50 to-teal-50",
    iconBg: "bg-emerald-600",
    textColor: "text-emerald-600",
    description: "Container orchestration with Kubernetes and Docker. Learn deployment, scaling, and management of containerized applications."
  },
  {
    id: "react-nodejs",
    title: "React & Node.js Full Stack",
    duration: "3 Months",
    icon: Code,
    color: "from-blue-50 to-cyan-50",
    iconBg: "bg-blue-500",
    textColor: "text-blue-500",
    description: "Modern full-stack development with React frontend and Node.js backend. Build scalable web applications."
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Ethical Hacking",
    duration: "3 Months",
    icon: Lock,
    color: "from-red-50 to-orange-50",
    iconBg: "bg-red-600",
    textColor: "text-red-600",
    description: "Comprehensive cybersecurity training including ethical hacking, penetration testing, and security auditing."
  },
  {
    id: "powerbi-tableau",
    title: "Power BI & Tableau",
    duration: "2 Months",
    icon: BarChart3,
    color: "from-amber-50 to-yellow-50",
    iconBg: "bg-amber-600",
    textColor: "text-amber-600",
    description: "Data visualization and business intelligence with Power BI and Tableau. Create interactive dashboards and reports."
  },
  {
    id: "snowflake",
    title: "Snowflake Data Platform",
    duration: "2 Months",
    icon: Snowflake,
    color: "from-sky-50 to-blue-50",
    iconBg: "bg-sky-600",
    textColor: "text-sky-600",
    description: "Cloud data warehouse with Snowflake. Learn data loading, querying, and optimization for modern analytics."
  },
  {
    id: "other-training",
    title: "Other Technology Training",
    duration: "Flexible",
    icon: MessageSquare,
    color: "from-gray-50 to-slate-50",
    iconBg: "bg-gray-600",
    textColor: "text-gray-600",
    description: "Looking for a specific technology course not listed? Contact us for custom training programs tailored to your needs."
  }
];

export default function TrainingSection() {
  return (
    <section id="training" className="section-padding bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6" data-testid="training-title">
            Online Training Courses
          </h2>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto font-medium" data-testid="training-description">
            Master trending technologies with our comprehensive online training programs designed for working professionals and students.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const IconComponent = course.icon;
            return (
              <Card key={course.id} className={`bg-gradient-to-br ${course.color} course-card border-2 hover:border-primary/20`} data-testid={`course-card-${course.id}`}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${course.iconBg} rounded-lg flex items-center justify-center mr-4`}>
                      <IconComponent className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900" data-testid={`course-title-${course.id}`}>
                        {course.title}
                      </h3>
                      <p className="text-gray-600" data-testid={`course-duration-${course.id}`}>
                        Duration: {course.duration}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4" data-testid={`course-description-${course.id}`}>
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-sm" data-testid={`course-mode-${course.id}`}>
                      Online/Offline
                    </Badge>
                    <Button 
                      variant="ghost" 
                      className={`${course.textColor} hover:bg-transparent font-semibold`}
                      onClick={() => {
                        const message = `Hi! I'm interested in the ${course.title} course. Can you provide more details about duration, schedule, and content?`;
                        window.open(`https://wa.me/918810841429?text=${encodeURIComponent(message)}`, '_blank');
                      }}
                      data-testid={`course-learn-more-${course.id}`}
                    >
                      Learn More →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-primary text-white px-8 py-3 hover:bg-secondary transition duration-200"
            onClick={() => {
              const message = "Hi! I want to know about all your available courses and training programs. Please share the complete course catalog.";
              window.open(`https://wa.me/918810841429?text=${encodeURIComponent(message)}`, '_blank');
            }}
            data-testid="view-all-courses"
          >
            View All Courses →
          </Button>
        </div>
      </div>
    </section>
  );
}
