import { Check } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: 19,
      features: [
        'Up to 5 disputes',
        'Basic reporting',
        'Email support',
        'Secure integration',
      ],
      popular: false,
    },
    {
      name: 'Growth',
      price: 39,
      features: [
        'Up to 20 disputes',
        'Advanced analytics',
        'Custom templates',
        'Priority support',
      ],
      popular: true,
    },
    {
      name: 'Pro',
      price: 49,
      features: [
        'Unlimited disputes',
        'Advanced analytics',
        'Priority support',
        'Dedicated account manager',
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1E1E2F] mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">Choose the plan that fits your needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map(({ name, price, features, popular }) => (
            <div
              key={name}
              className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-8 ${
                popular ? 'border-2 border-[#28C76F] relative' : 'border border-gray-200'
              }`}
            >
              {popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#28C76F] text-white text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#1E1E2F] mb-4">{name}</h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold text-[#1E1E2F]">${price}</span>
                  <span className="text-gray-600">/mo</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="text-[#28C76F] flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 transform hover:-translate-y-0.5 ${
                  popular
                    ? 'bg-[#3366FF] text-white hover:bg-[#28C76F] shadow-lg'
                    : 'bg-white text-[#3366FF] border-2 border-[#3366FF] hover:bg-[#3366FF] hover:text-white'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 text-sm mt-12">
          All plans include secure bank integration and AI-assisted dispute support
        </p>
      </div>
    </section>
  );
}
