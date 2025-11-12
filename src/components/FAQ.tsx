import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How secure is AutoDispute?',
      answer:
        'AutoDispute uses bank-level encryption (256-bit SSL) and complies with PCI-DSS standards. We never store your banking credentials directly - all connections are made through secure APIs with read-only access. Your data is encrypted both in transit and at rest. We are SOC 2 Type II certified and undergo regular third-party security audits.',
    },
    {
      question: 'Which payment processors are supported?',
      answer:
        'Currently, we support Stripe, PayPal, and direct bank account connections through Plaid. We are constantly adding new integrations including Square, Braintree, and Authorize.net. If you need a specific processor, please reach out to our team and we can prioritize it.',
    },
    {
      question: 'Can I try before subscribing?',
      answer:
        'Yes! We offer a 14-day free trial with no credit card required. You can test all features and process up to 3 disputes during the trial period. Cancel anytime with no questions asked. If you need more time to evaluate, contact our sales team for an extended trial.',
    },
    {
      question: 'What types of disputes can AutoDispute handle?',
      answer:
        'AutoDispute can handle various dispute types including unauthorized transactions, duplicate charges, service not received, product not as described, billing errors, subscription cancellation issues, and quality disputes. Our AI assists with evidence gathering and submission for each type, automatically selecting the best dispute reason codes.',
    },
    {
      question: 'How long does it take to see results?',
      answer:
        'Most disputes are submitted within minutes of selection. Resolution times vary by payment processor and dispute type, typically ranging from 7-90 days. The average resolution time is 18 days. You can track all disputes in real-time through your dashboard with automatic status updates.',
    },
    {
      question: 'What is your dispute win rate?',
      answer:
        'Our platform achieves an average win rate of 62.7%, which is 35% higher than manual dispute management. The actual win rate depends on factors like dispute type, evidence quality, and merchant response. Our AI continuously learns from successful cases to improve outcomes.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer:
        'Yes, you can cancel your subscription at any time from your account settings. There are no cancellation fees or long-term contracts. If you cancel, you will retain access to your account until the end of your current billing period.',
    },
    {
      question: 'Do you offer refunds?',
      answer:
        'We offer a 30-day money-back guarantee if you are not satisfied with our service. Simply contact our support team within 30 days of your first payment for a full refund. After 30 days, subscription fees are non-refundable but you can cancel anytime.',
    },
    {
      question: 'How does AI improve dispute success rates?',
      answer:
        'Our AI analyzes thousands of successful dispute cases to identify winning patterns. It automatically generates compelling evidence packages, selects optimal dispute reason codes, determines the best submission timing, and learns from each case to continuously improve. This data-driven approach significantly increases win rates.',
    },
    {
      question: 'Is there a limit on dispute amounts?',
      answer:
        'No, there is no limit on individual dispute amounts. Whether you are disputing $10 or $10,000, our platform handles all dispute sizes equally. Your plan limits refer to the number of disputes you can submit per month, not the total dollar amount.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0D14]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-400">Everything you need to know</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-800 overflow-hidden transition-all duration-300 hover:border-blue-500/50"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-800 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-white pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`text-blue-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  size={24}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-[500px]' : 'max-h-0'
                }`}
              >
                <div className="px-8 pb-6 text-gray-400 leading-relaxed">
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
