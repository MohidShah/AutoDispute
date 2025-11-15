import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Clock, TrendingUp, Layout, Shield, Zap, DollarSign, BarChart, Users } from 'lucide-react';

interface BenefitsPageProps {
  onNavigate: (page: string) => void;
}

export default function BenefitsPage({ onNavigate }: BenefitsPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const benefits = [
    {
      Icon: Clock,
      title: 'Save Time',
      description: 'Automate dispute submissions in seconds instead of spending hours on manual paperwork. Our AI handles evidence collection, form filling, and submission tracking.',
      stats: '90% faster processing',
      color: 'from-blue-600 to-blue-400',
      details: [
        'Automated evidence gathering from multiple sources',
        'One-click dispute submission across all processors',
        'Batch processing for multiple disputes simultaneously',
        'Real-time status tracking eliminates manual follow-ups'
      ]
    },
    {
      Icon: TrendingUp,
      title: 'Recover More',
      description: 'Increase your dispute win rate by 35% with AI-powered evidence analysis and optimal submission timing. Smart algorithms identify the strongest case strategies.',
      stats: '35% higher win rate',
      color: 'from-cyan-600 to-cyan-400',
      details: [
        'AI analyzes transaction patterns for stronger cases',
        'Optimal timing for maximum success probability',
        'Customized rebuttal letters for each dispute type',
        'Historical data analysis to improve future outcomes'
      ]
    },
    {
      Icon: Layout,
      title: 'Stay Organized',
      description: 'Track all disputes across multiple payment processors in one unified dashboard. Real-time status updates, automated notifications, and comprehensive reporting.',
      stats: 'All processors in one place',
      color: 'from-blue-600 to-blue-400',
      details: [
        'Centralized dashboard for all payment processors',
        'Real-time status updates and notifications',
        'Comprehensive reporting and analytics',
        'Exportable data for accounting and compliance'
      ]
    },
    {
      Icon: Shield,
      title: 'Secure & Trusted',
      description: 'Bank-level 256-bit encryption, PCI-DSS compliance, and SOC 2 certified. Your financial data is protected with industry-leading security measures.',
      stats: 'Enterprise-grade security',
      color: 'from-cyan-600 to-cyan-400',
      details: [
        '256-bit encryption for all data transmission',
        'SOC 2 Type II and PCI-DSS compliant',
        'Regular security audits and penetration testing',
        'GDPR and CCPA compliant data handling'
      ]
    },
  ];

  const additionalBenefits = [
    {
      Icon: Zap,
      title: 'Lightning Fast',
      description: 'Process disputes 10x faster than manual methods'
    },
    {
      Icon: DollarSign,
      title: 'Cost Effective',
      description: 'Reduce operational costs by up to 70%'
    },
    {
      Icon: BarChart,
      title: 'Data Insights',
      description: 'Gain valuable insights into dispute patterns'
    },
    {
      Icon: Users,
      title: 'Team Collaboration',
      description: 'Enable seamless teamwork on dispute resolution'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0D14]">
      <Header onNavigate={onNavigate} />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A0D14] to-blue-900/10">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Transform Your Dispute Management
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Discover how AutoDispute helps businesses save time, recover more revenue, and streamline their dispute resolution process.
            </p>
            <button 
              onClick={() => onNavigate('signup')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 transform hover:-translate-y-1 shadow-lg text-lg"
            >
              Start Free Trial
            </button>
          </div>
        </section>

        {/* Main Benefits Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0D14]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why Thousands of Businesses Choose AutoDispute
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Everything you need to manage disputes efficiently and recover more revenue
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map(({ Icon, title, description, stats, color, details }) => (
                <div
                  key={title}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
                >
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">{description}</p>
                  <div className="pt-4 border-t border-gray-700">
                    <p className="text-sm text-blue-400 font-semibold">{stats}</p>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {details.map((detail, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-400">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Additional Benefits */}
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-white text-center mb-12">Additional Advantages</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {additionalBenefits.map(({ Icon, title, description }) => (
                  <div key={title} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                    <p className="text-gray-400 text-sm">{description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Stats Section */}
            <div className="mt-20 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-2xl p-8 md:p-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                  Real Results for Real Businesses
                </h2>
                <p className="text-xl text-gray-300 mb-12 text-center">
                  See how AutoDispute has transformed dispute management for businesses like yours
                </p>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-blue-400 mb-2">90%</div>
                    <h3 className="text-xl font-bold text-white mb-2">Time Saved</h3>
                    <p className="text-gray-400">
                      Average reduction in time spent on dispute resolution
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-cyan-400 mb-2">35%</div>
                    <h3 className="text-xl font-bold text-white mb-2">Higher Win Rate</h3>
                    <p className="text-gray-400">
                      Improvement in successful dispute outcomes
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-blue-400 mb-2">70%</div>
                    <h3 className="text-xl font-bold text-white mb-2">Cost Reduction</h3>
                    <p className="text-gray-400">
                      Decrease in operational costs for dispute management
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-20 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-2xl p-8 md:p-12">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Transform Your Dispute Management?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Join thousands of businesses that have recovered millions in revenue with AutoDispute
                </p>
                <button 
                  onClick={() => onNavigate('signup')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 transform hover:-translate-y-1 shadow-lg"
                >
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}