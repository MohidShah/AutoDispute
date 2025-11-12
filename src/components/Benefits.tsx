import { Clock, TrendingUp, Layout, Shield } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      Icon: Clock,
      title: 'Save Time',
      description: 'Auto-fill and submit disputes in seconds',
      color: 'from-blue-600 to-blue-400',
    },
    {
      Icon: TrendingUp,
      title: 'Recover More',
      description: 'Increase dispute success rate with AI assistance',
      color: 'from-cyan-600 to-cyan-400',
    },
    {
      Icon: Layout,
      title: 'Stay Organized',
      description: 'Track all disputes in one unified dashboard',
      color: 'from-blue-600 to-blue-400',
    },
    {
      Icon: Shield,
      title: 'Secure & Trusted',
      description: 'Bank-level encryption and data security',
      color: 'from-cyan-600 to-cyan-400',
    },
  ];

  return (
    <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0D14]">
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
          {benefits.map(({ Icon, title, description, color }) => (
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
              <p className="text-gray-400 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
