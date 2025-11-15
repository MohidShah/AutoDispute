import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link, CheckSquare, Send } from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (page: string) => void;
}

export default function HowItWorksPage({ onNavigate }: HowItWorksPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const steps = [
    {
      number: 1,
      Icon: Link,
      title: 'Connect Account',
      description: 'Securely link your Stripe account or bank through Plaid in under 60 seconds. Our encrypted connection ensures your credentials are never stored directly.',
      details: 'Supports Stripe, PayPal, and all major banks',
    },
    {
      number: 2,
      Icon: CheckSquare,
      title: 'Select Transactions',
      description: 'Our AI automatically flags suspicious transactions and potential disputes. Review and select which transactions you want to dispute with one click.',
      details: 'Smart detection saves hours of manual review',
    },
    {
      number: 3,
      Icon: Send,
      title: 'Submit & Track',
      description: 'AI generates compelling evidence packages, submits disputes to processors, and monitors progress 24/7. Get real-time updates and notifications throughout the process.',
      details: 'Average resolution time: 18 days',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0D14]">
      <Header onNavigate={onNavigate} />
      
      <main className="pt-24">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0D14]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How AutoDispute Works</h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Our simple three-step process helps you recover more revenue with less effort
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map(({ number, Icon, title, description, details }, index) => (
                <div key={number} className="relative">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 text-white text-2xl font-bold rounded-xl mb-6 mx-auto">
                      {number}
                    </div>
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-xl flex items-center justify-center">
                        <Icon size={32} className="text-blue-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 text-center">{title}</h3>
                    <p className="text-gray-400 leading-relaxed text-center mb-4">{description}</p>
                    <div className="pt-4 border-t border-gray-700">
                      <p className="text-sm text-cyan-400 text-center font-medium">{details}</p>
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-20 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-2xl p-8 md:p-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                  Powerful Features Included
                </h2>
                <p className="text-xl text-gray-300 mb-8 text-center">
                  Everything you need for comprehensive dispute management
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-12">
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                    <h3 className="text-xl font-bold text-white mb-3">AI-Powered Evidence</h3>
                    <p className="text-gray-400">
                      Automatically generate compelling evidence packages that increase your dispute win rate by 35%
                    </p>
                  </div>
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                    <h3 className="text-xl font-bold text-white mb-3">Real-Time Tracking</h3>
                    <p className="text-gray-400">
                      Monitor the status of all your disputes with real-time updates and notifications
                    </p>
                  </div>
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                    <h3 className="text-xl font-bold text-white mb-3">Multi-Processor Support</h3>
                    <p className="text-gray-400">
                      Manage disputes across Stripe, PayPal, and all major payment processors in one place
                    </p>
                  </div>
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                    <h3 className="text-xl font-bold text-white mb-3">Advanced Analytics</h3>
                    <p className="text-gray-400">
                      Gain insights into dispute trends, success rates, and revenue recovery with detailed reports
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}