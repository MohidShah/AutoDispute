import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Check } from 'lucide-react';

interface PricingPageProps {
  onNavigate: (page: string) => void;
}

export default function PricingPage({ onNavigate }: PricingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const plans = [
    {
      name: 'Starter',
      price: 19,
      description: 'Perfect for small businesses getting started',
      features: [
        'Up to 5 disputes per month',
        'Basic reporting and analytics',
        'Email support (24hr response)',
        'Secure payment integration',
        'AI-powered evidence generation',
        'Mobile app access',
      ],
      popular: false,
    },
    {
      name: 'Growth',
      price: 39,
      description: 'Best for growing businesses',
      features: [
        'Up to 20 disputes per month',
        'Advanced analytics dashboard',
        'Custom dispute templates',
        'Priority email support (4hr response)',
        'Bulk dispute management',
        'API access',
        'Export reports (PDF/CSV)',
      ],
      popular: true,
    },
    {
      name: 'Pro',
      price: 49,
      description: 'For high-volume businesses',
      features: [
        'Unlimited disputes',
        'Advanced analytics & reports',
        'Priority support 24/7 (1hr response)',
        'Dedicated account manager',
        'Custom integrations',
        'White-label options',
        'Training sessions included',
        'SLA guarantee',
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0D14]">
      <Header onNavigate={onNavigate} />
      
      <main className="pt-24">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0D14]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Choose the plan that fits your business needs. All plans include our core dispute automation features.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map(({ name, price, description, features, popular }) => (
                <div
                  key={name}
                  className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border transition-all duration-300 transform hover:-translate-y-2 ${
                    popular
                      ? 'border-blue-500 relative shadow-xl shadow-blue-500/20'
                      : 'border-gray-800 hover:border-gray-700'
                  }`}
                >
                  {popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{description}</p>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-bold text-white">${price}</span>
                      <span className="text-gray-400">/mo</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => onNavigate('signup')}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 transform hover:-translate-y-0.5 ${
                      popular
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg'
                        : 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-20 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-2xl p-8 md:p-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                  Everything You Need for Dispute Management
                </h2>
                <p className="text-xl text-gray-300 mb-8 text-center">
                  All plans include these powerful features
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Check size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">AI Automation</h3>
                    <p className="text-gray-400">
                      Automatically generate evidence and submit disputes
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Check size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Real-Time Tracking</h3>
                    <p className="text-gray-400">
                      Monitor dispute status and get instant notifications
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Check size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Secure Integration</h3>
                    <p className="text-gray-400">
                      Bank-level encryption for all your financial data
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <p className="text-gray-500 text-sm">
                All plans include secure bank integration and AI-assisted dispute support. 
                Cancel anytime. No setup fees.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}