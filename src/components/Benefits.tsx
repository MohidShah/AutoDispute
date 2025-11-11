import { Clock, TrendingUp, Layout, Shield } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      Icon: Clock,
      title: 'Save Time',
      description: 'Auto-fill and submit disputes in seconds',
      color: '#3366FF',
    },
    {
      Icon: TrendingUp,
      title: 'Recover More',
      description: 'Increase dispute success rate',
      color: '#28C76F',
    },
    {
      Icon: Layout,
      title: 'Stay Organized',
      description: 'Track all disputes in one dashboard',
      color: '#3366FF',
    },
    {
      Icon: Shield,
      title: 'Secure & Trusted',
      description: 'Bank-level data security',
      color: '#28C76F',
    },
  ];

  return (
    <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1E1E2F] mb-4">
            Why Choose AutoDispute?
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to manage disputes efficiently
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map(({ Icon, title, description, color }) => (
            <div
              key={title}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100"
            >
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: `${color}15` }}
              >
                <Icon size={32} style={{ color }} />
              </div>
              <h3 className="text-xl font-bold text-[#1E1E2F] mb-3">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
