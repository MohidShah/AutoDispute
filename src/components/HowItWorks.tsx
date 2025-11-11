import { Link, CheckSquare, Send } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      Icon: Link,
      title: 'Connect Account',
      description: 'Securely link Stripe or bank account',
    },
    {
      number: 2,
      Icon: CheckSquare,
      title: 'Select Transactions',
      description: 'Auto-detect disputes and review',
    },
    {
      number: 3,
      Icon: Send,
      title: 'Submit & Track',
      description: 'Auto-generate evidence, submit, monitor outcomes',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1E1E2F] mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Three simple steps to get started</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map(({ number, Icon, title, description }, index) => (
            <div key={number} className="relative">
              <div
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-[#3366FF] text-white text-2xl font-bold rounded-full mb-6 mx-auto">
                  {number}
                </div>
                <div className="flex items-center justify-center mb-6">
                  <Icon size={48} className="text-[#28C76F]" />
                </div>
                <h3 className="text-xl font-bold text-[#1E1E2F] mb-3 text-center">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  {description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#E0E6ED]"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
