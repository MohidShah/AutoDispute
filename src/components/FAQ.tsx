import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How secure is AutoDispute?',
      answer:
        'AutoDispute uses bank-level encryption (256-bit SSL) and complies with PCI-DSS standards. We never store your banking credentials directly - all connections are made through secure APIs with read-only access. Your data is encrypted both in transit and at rest.',
    },
    {
      question: 'Which payment processors are supported?',
      answer:
        'Currently, we support Stripe, PayPal, and direct bank account connections through Plaid. We are constantly adding new integrations. If you need a specific processor, please reach out to our team.',
    },
    {
      question: 'Can I try before subscribing?',
      answer:
        'Yes! We offer a 14-day free trial with no credit card required. You can test all features and process up to 3 disputes during the trial period. Cancel anytime with no questions asked.',
    },
    {
      question: 'What types of disputes can AutoDispute handle?',
      answer:
        'AutoDispute can handle various dispute types including unauthorized transactions, duplicate charges, service not received, product not as described, and billing errors. Our AI assists with evidence gathering and submission for each type.',
    },
    {
      question: 'How long does it take to see results?',
      answer:
        'Most disputes are submitted within minutes of selection. Resolution times vary by payment processor and dispute type, typically ranging from 7-90 days. You can track all disputes in real-time through your dashboard.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F7FA]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1E1E2F] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">Everything you need to know</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-[#3366FF] pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`text-[#28C76F] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  size={24}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-8 pb-6 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
