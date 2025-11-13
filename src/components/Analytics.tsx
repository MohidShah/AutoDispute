import { useEffect, useState } from 'react';
import { Download, TrendingUp, Clock, Target, BarChart3 } from 'lucide-react';
import { getDisputeStats } from '../services/disputeService';

export default function Analytics() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      const statsData = await getDisputeStats();
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const metrics = [
    {
      label: 'Total Recovered',
      value: `$${(stats?.recoveredAmount || 0).toFixed(2)}`,
      icon: TrendingUp,
      color: '#28C76F',
      trend: `${stats?.won || 0} disputes won`,
    },
    {
      label: 'Win Rate',
      value: `${stats?.winRate || 0}%`,
      icon: Target,
      color: '#3366FF',
      trend: `${stats?.won || 0} of ${stats?.total || 0} disputes`,
    },
    {
      label: 'Total Disputes',
      value: (stats?.total || 0).toString(),
      icon: BarChart3,
      color: '#FFA94D',
      trend: `${stats?.pending || 0} pending`,
    },
    {
      label: 'Lost Disputes',
      value: (stats?.lost || 0).toString(),
      icon: Clock,
      color: '#FF6B6B',
      trend: 'Review and improve evidence',
    },
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    recovered: [8200, 9100, 8900, 11200, 13400, 15100],
    disputes: [12, 14, 13, 18, 22, 28],
  };

  const outcomeData = {
    won: 89,
    pending: 32,
    lost: 21,
  };

  const topMerchants = [
    { name: 'Acme Corp', disputes: 8, recovered: '$2,140' },
    { name: 'Tech Solutions', disputes: 6, recovered: '$1,890' },
    { name: 'Digital Services', disputes: 5, recovered: '$1,540' },
    { name: 'Cloud Hosting', disputes: 4, recovered: '$1,200' },
    { name: 'Software Inc', disputes: 3, recovered: '$890' },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1E1E2F]">Analytics</h1>
            <p className="text-gray-600 mt-2">Insights into your dispute performance</p>
          </div>
          <button className="px-6 py-3 bg-white border border-gray-300 text-[#1E1E2F] rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
            <Download size={20} />
            Export Report
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map(({ label, value, icon: Icon, color, trend }) => (
            <div
              key={label}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon size={24} style={{ color }} />
                </div>
                <p className="text-xs font-semibold text-gray-600">{trend}</p>
              </div>
              <p className="text-gray-600 text-sm mb-1">{label}</p>
              <p className="text-3xl font-bold text-[#1E1E2F]">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-lg font-bold text-[#1E1E2F] mb-6">
              Recovery Trends
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-gray-600">Amount Recovered</p>
                  <p className="text-sm font-semibold text-[#1E1E2F]">
                    ${Math.max(...chartData.recovered).toLocaleString()}
                  </p>
                </div>
                <div className="h-64 bg-gray-50 rounded-lg p-4 flex items-end gap-2">
                  {chartData.recovered.map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-gradient-to-t from-[#3366FF] to-[#5B86FF] rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer"
                        style={{
                          height: `${(value / Math.max(...chartData.recovered)) * 100}%`,
                        }}
                      />
                      <p className="text-xs text-gray-600">{chartData.labels[index]}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-gray-600">
                    Disputes Submitted
                  </p>
                  <p className="text-sm font-semibold text-[#1E1E2F]">
                    {Math.max(...chartData.disputes)}
                  </p>
                </div>
                <div className="h-48 bg-gray-50 rounded-lg p-4 flex items-end gap-2">
                  {chartData.disputes.map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-gradient-to-t from-[#28C76F] to-[#5CE3A3] rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer"
                        style={{
                          height: `${(value / Math.max(...chartData.disputes)) * 100}%`,
                        }}
                      />
                      <p className="text-xs text-gray-600">{chartData.labels[index]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-lg font-bold text-[#1E1E2F] mb-6">Dispute Outcomes</h2>

            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#E0E6ED"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#28C76F"
                      strokeWidth="8"
                      strokeDasharray={`${(outcomeData.won / 142) * 251} 251`}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#FFA94D"
                      strokeWidth="8"
                      strokeDasharray={`${(outcomeData.pending / 142) * 251} 251`}
                      strokeDashoffset={-((outcomeData.won / 142) * 251)}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#FF6B6B"
                      strokeWidth="8"
                      strokeDasharray={`${(outcomeData.lost / 142) * 251} 251`}
                      strokeDashoffset={-(((outcomeData.won + outcomeData.pending) / 142) * 251)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#1E1E2F]">142</p>
                      <p className="text-xs text-gray-600">Total</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#28C76F] rounded-full"></div>
                    <span className="text-sm text-gray-600">Won</span>
                  </div>
                  <span className="font-semibold text-[#1E1E2F]">
                    {outcomeData.won} ({((outcomeData.won / 142) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#FFA94D] rounded-full"></div>
                    <span className="text-sm text-gray-600">Pending</span>
                  </div>
                  <span className="font-semibold text-[#1E1E2F]">
                    {outcomeData.pending} ({((outcomeData.pending / 142) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#FF6B6B] rounded-full"></div>
                    <span className="text-sm text-gray-600">Lost</span>
                  </div>
                  <span className="font-semibold text-[#1E1E2F]">
                    {outcomeData.lost} ({((outcomeData.lost / 142) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-lg font-bold text-[#1E1E2F] mb-6">
            Merchant Disputes
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Merchant
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Disputes
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Amount Recovered
                  </th>
                </tr>
              </thead>
              <tbody>
                {topMerchants.map((merchant, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4 text-sm font-medium text-[#1E1E2F]">
                      {merchant.name}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-[#3366FF]/10 text-[#3366FF] text-sm font-medium rounded-full">
                        {merchant.disputes}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm font-semibold text-[#1E1E2F]">
                      {merchant.recovered}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
