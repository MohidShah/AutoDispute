import { CreditCard, Wallet, DollarSign } from 'lucide-react';

export default function Partners() {
  const partners = [
    { name: 'Stripe', Icon: CreditCard },
    { name: 'Plaid', Icon: Wallet },
    { name: 'PayPal', Icon: DollarSign },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0A0D14] border-y border-gray-900">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-500 mb-12 text-sm uppercase tracking-wider font-semibold">
          Trusted by growing SaaS & digital sellers
        </p>
        <div className="flex flex-wrap items-center justify-center gap-16">
          {partners.map(({ name, Icon }) => (
            <div
              key={name}
              className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-all duration-300 cursor-pointer transform hover:scale-110"
            >
              <Icon size={40} className="text-gray-400" />
              <span className="text-2xl font-bold text-gray-400">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
