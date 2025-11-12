import { ArrowRight, Bot, BarChart3, TrendingUp } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="hero"
      className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0A0D14] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-cyan-900/10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              Dispute Smarter,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Win Faster
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Automatically manage and submit transaction disputes. Save time, recover money,
              and let AI handle the complexity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
                Start Free Trial
                <ArrowRight size={20} />
              </button>
              <button className="px-8 py-4 bg-transparent text-white border-2 border-gray-700 rounded-xl font-semibold hover:bg-gray-800 hover:border-gray-600 transition-all duration-200 transform hover:-translate-y-1">
                Learn More
              </button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="text-blue-400" size={20} />
                <span className="text-gray-400 text-sm">62% avg win rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Bot className="text-cyan-400" size={20} />
                <span className="text-gray-400 text-sm">AI-powered</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-800 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                    <Bot className="text-white" size={20} />
                  </div>
                  <span className="text-lg font-semibold text-white">
                    AI Dispute Manager
                  </span>
                </div>
                <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs rounded-full font-semibold">
                  Active
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl border border-gray-700">
                  <div>
                    <p className="text-sm text-gray-400">Total Disputes</p>
                    <p className="text-2xl font-bold text-white">142</p>
                  </div>
                  <BarChart3 className="text-blue-400" size={32} />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-700/30 rounded-xl text-center">
                    <p className="text-xs text-gray-400 mb-1">Won</p>
                    <p className="text-xl font-bold text-green-400">89</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 border border-yellow-700/30 rounded-xl text-center">
                    <p className="text-xs text-gray-400 mb-1">Pending</p>
                    <p className="text-xl font-bold text-yellow-400">32</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-700/30 rounded-xl text-center">
                    <p className="text-xs text-gray-400 mb-1">Lost</p>
                    <p className="text-xl font-bold text-red-400">21</p>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-xl text-center">
                  <p className="text-sm text-blue-400 font-semibold">
                    $47,320 Recovered This Month
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-cyan-600/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
