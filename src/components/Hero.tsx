import { ArrowRight, Bot, BarChart3 } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="hero"
      className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F5F7FA] to-[#E0E6ED]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-[#1E1E2F] leading-tight">
              Dispute Smarter,
              <br />
              <span className="text-[#3366FF]">Win Faster</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Automatically manage and submit transaction disputes — save time and recover money
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-[#3366FF] text-white rounded-lg font-semibold hover:bg-[#28C76F] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
                Start Free Trial
                <ArrowRight size={20} />
              </button>
              <button className="px-8 py-4 bg-transparent text-[#3366FF] border-2 border-[#3366FF] rounded-lg font-semibold hover:bg-[#3366FF] hover:text-white transition-all duration-200 transform hover:-translate-y-1">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Bot className="text-[#3366FF]" size={32} />
                  <span className="text-lg font-semibold text-[#1E1E2F]">
                    AI Dispute Manager
                  </span>
                </div>
                <span className="px-3 py-1 bg-[#28C76F] text-white text-sm rounded-full">
                  Active
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#F5F7FA] rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Total Disputes</p>
                    <p className="text-2xl font-bold text-[#1E1E2F]">142</p>
                  </div>
                  <BarChart3 className="text-[#3366FF]" size={32} />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 bg-[#28C76F]/10 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">Won</p>
                    <p className="text-xl font-bold text-[#28C76F]">89</p>
                  </div>
                  <div className="p-4 bg-[#FFA94D]/10 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">Pending</p>
                    <p className="text-xl font-bold text-[#FFA94D]">32</p>
                  </div>
                  <div className="p-4 bg-[#FF6B6B]/10 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">Lost</p>
                    <p className="text-xl font-bold text-[#FF6B6B]">21</p>
                  </div>
                </div>

                <div className="p-4 border-2 border-dashed border-[#3366FF] rounded-lg text-center">
                  <p className="text-sm text-[#3366FF] font-medium">
                    $47,320 Recovered This Month
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#3366FF]/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#28C76F]/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
