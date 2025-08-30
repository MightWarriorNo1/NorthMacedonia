import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Package2, 
  Calculator, 
  TrendingUp, 
  Shield, 
  Globe, 
  BarChart3, 
  Truck, 
  Users, 
  FileText, 
  CheckCircle,
  ArrowRight,
  Play,
  Star,
  Zap
} from 'lucide-react';

export function LandingPage() {
  const { dispatch } = useApp();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleGetStarted = () => {
    dispatch({ type: 'SHOW_LANDING', payload: false });
  };

  const features = [
    {
      icon: Calculator,
      title: "Smart Cost Calculator",
      description: "Advanced landed cost calculations with real-time tax rates, freight allocation, and currency conversion."
    },
    {
      icon: Shield,
      title: "CNMI Tax Compliance",
      description: "Built-in excise tax categories, EBT calculations, and container fees specific to CNMI regulations."
    },
    {
      icon: TrendingUp,
      title: "Profit Optimization",
      description: "Margin analysis with 30%, 40%, 50% markup guidance and competitive pricing insights."
    },
    {
      icon: Globe,
      title: "Multi-Currency Support",
      description: "Handle invoices in any currency with automatic FX conversion and USD normalization."
    },
    {
      icon: BarChart3,
      title: "Comprehensive Reporting",
      description: "Audit-ready summaries, tax breakdowns, and freight analysis for informed decision-making."
    },
    {
      icon: Truck,
      title: "Shipment Management",
      description: "Track shipments from origin to destination with detailed cost allocation and documentation."
    }
  ];

  const benefits = [
    "Reduce calculation errors by 95%",
    "Save 10+ hours per week on cost analysis",
    "Ensure 100% CNMI tax compliance",
    "Optimize pricing for maximum profitability",
    "Streamline supplier and inventory management",
    "Generate audit-ready reports instantly"
  ];

  const testimonials = [
    {
      name: "Maria Santos",
      role: "Supply Chain Manager",
      company: "Pacific Trading Co.",
      content: "This app revolutionized how we calculate landed costs. The CNMI tax integration is a game-changer.",
      rating: 5
    },
    {
      name: "David Chen",
      role: "Operations Director",
      company: "Island Imports Ltd.",
      content: "Finally, a solution that understands the unique challenges of doing business in CNMI.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg">
                <Package2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CNMI Supply Chain</h1>
                <p className="text-sm text-gray-500">Arbitrage Calculator</p>
              </div>
            </div>
            <button
              onClick={handleGetStarted}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>Trusted by leading CNMI businesses</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Master Your
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Supply Chain</span>
              <br />
              Arbitrage
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The only comprehensive solution for calculating landed costs, managing CNMI tax compliance, 
              and optimizing pricing for goods shipped to the Commonwealth of the Northern Mariana Islands.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={handleGetStarted}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold text-lg flex items-center justify-center space-x-2"
              >
                <span>Start Calculating</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all font-semibold text-lg flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-gray-600">Reduction in calculation errors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10+ hrs</div>
                <div className="text-gray-600">Saved per week</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                <div className="text-gray-600">CNMI tax compliance</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-cyan-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need for CNMI Supply Chain Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From tax calculations to profit optimization, our platform provides all the tools 
              you need to make informed decisions and maximize profitability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group p-8 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                  <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Transform Your Business Operations
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Join dozens of successful CNMI businesses that have revolutionized their 
                supply chain management with our comprehensive platform.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="text-center mb-6">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Try Our Calculator</h3>
                <p className="text-gray-600">See the power of our platform in action</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Sample Item Cost</span>
                  <span className="font-semibold">$100.00</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Freight & Fees</span>
                  <span className="font-semibold">$25.50</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">CNMI Taxes</span>
                  <span className="font-semibold">$8.75</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Landed Cost</span>
                    <span className="text-xl font-bold text-blue-600">$134.25</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleGetStarted}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Start Your Calculation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers say about their experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600">{testimonial.role} at {testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Supply Chain?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the growing number of businesses optimizing their CNMI operations with our platform.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 font-semibold text-lg flex items-center justify-center space-x-2 mx-auto"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg">
                  <Package2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">CNMI Supply Chain</h3>
                  <p className="text-sm text-gray-400">Arbitrage Calculator</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                The complete solution for CNMI supply chain management and cost optimization.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Cost Calculator</li>
                <li>Tax Compliance</li>
                <li>Shipment Management</li>
                <li>Reporting & Analytics</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Documentation</li>
                <li>Help Center</li>
                <li>Contact Support</li>
                <li>Training</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 CNMI Supply Chain Arbitrage Calculator. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
