import { Clock, TrendingUp, Layout, Shield } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      Icon: Clock,
      title: 'Save Time',
      description: 'Automate dispute submissions in seconds instead of spending hours on manual paperwork. Our AI handles evidence collection, form filling, and submission tracking.',
      stats: '90% faster processing',
      color: 'from-blue-600 to-blue-400',
    },
    {
      Icon: TrendingUp,
      title: 'Recover More',
      description: 'Increase your dispute win rate by 35% with AI-powered evidence analysis and optimal submission timing. Smart algorithms identify the strongest case strategies.',
      stats: '35% higher win rate',
      color: 'from-cyan-600 to-cyan-400',
    },
    {
      Icon: Layout,
      title: 'Stay Organized',
      description: 'Track all disputes across multiple payment processors in one unified dashboard. Real-time status updates, automated notifications, and comprehensive reporting.',
      stats: 'All processors in one place',
      color: 'from-blue-600 to-blue-400',
    },
    {
      Icon: Shield,
      title: 'Secure & Trusted',
      description: 'Bank-level 256-bit encryption, PCI-DSS compliance, and SOC 2 certified. Your financial data is protected with industry-leading security measures.',
      stats: 'Enterprise-grade security',
      color: 'from-cyan-600 to-cyan-400',
    },
  ];

  return (
<<<<<<< HEAD
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0D14]">
=======
    <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0D14]">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose AutoDispute?
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to manage disputes efficiently
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map(({ Icon, title, description, stats, color }) => (
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
