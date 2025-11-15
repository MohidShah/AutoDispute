import { Sparkles, ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0D14] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-full shadow-sm mb-8">
          <Sparkles className="text-blue-400" size={20} />
          <span className="text-sm font-medium text-gray-300">
            Join 500+ businesses already using AutoDispute
          </span>
        </div>

        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Start managing your disputes
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            smarter today
          </span>
        </h2>

        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Stop wasting hours on manual dispute management. Let AI handle the heavy lifting
          while you focus on growing your business.
        </p>

        <button className="px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-flex items-center gap-3">
          Start Free Trial
          <ArrowRight size={24} />
        </button>

        <p className="text-sm text-gray-500 mt-6">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );
}
