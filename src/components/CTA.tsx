import { Sparkles, ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F5F7FA] to-[#E0E6ED] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3366FF]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#28C76F]/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-8">
          <Sparkles className="text-[#3366FF]" size={20} />
          <span className="text-sm font-medium text-[#1E1E2F]">
            Join 500+ businesses already using AutoDispute
          </span>
        </div>

        <h2 className="text-5xl font-bold text-[#1E1E2F] mb-6">
          Start managing your disputes
          <br />
          <span className="text-[#3366FF]">smarter today</span>
        </h2>

        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Stop wasting hours on manual dispute management. Let AI handle the heavy lifting
          while you focus on growing your business.
        </p>

        <button className="px-10 py-5 bg-[#3366FF] text-white text-lg rounded-xl font-semibold hover:bg-[#28C76F] transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-flex items-center gap-3">
          Start Free Trial
          <ArrowRight size={24} />
        </button>

        <p className="text-sm text-gray-600 mt-6">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );
}
