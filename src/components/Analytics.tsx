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
<<<<<<< HEAD
      color: 'from-green-600 to-emerald-600',
=======
      color: '#28C76F',
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
      trend: `${stats?.won || 0} disputes won`,
    },
    {
      label: 'Win Rate',
      value: `${stats?.winRate || 0}%`,
      icon: Target,
<<<<<<< HEAD
      color: 'from-blue-600 to-cyan-600',
=======
      color: '#3366FF',
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
      trend: `${stats?.won || 0} of ${stats?.total || 0} disputes`,
    },
    {
      label: 'Total Disputes',
      value: (stats?.total || 0).toString(),
      icon: BarChart3,
<<<<<<< HEAD
      color: 'from-yellow-600 to-orange-600',
=======
      color: '#FFA94D',
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
      trend: `${stats?.pending || 0} pending`,
    },
    {
      label: 'Lost Disputes',
      value: (stats?.lost || 0).toString(),
      icon: Clock,
<<<<<<< HEAD
      color: 'from-red-600 to-rose-600',
=======
      color: '#FF6B6B',
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
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
<<<<<<< HEAD
            <h1 className="text-3xl font-bold text-white">Analytics</h1>
            <p className="text-gray-400 mt-2">Insights into your dispute performance</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 text-white rounded-lg font-medium hover:from-gray-700 hover:to-gray-600 transition-all duration-200 flex items-center gap-2 shadow-lg">
=======
            <h1 className="text-3xl font-bold text-[#1E1E2F]">Analytics</h1>
            <p className="text-gray-600 mt-2">Insights into your dispute performance</p>
          </div>
          <button className="px-6 py-3 bg-white border border-gray-300 text-[#1E1E2F] rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
            <Download size={20} />
            Export Report
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map(({ label, value, icon: Icon, color, trend }) => (
            <div
              key={label}
<<<<<<< HEAD
              className={`bg-gradient-to-br ${color} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Icon size={24} className="text-white" />
                </div>
                <p className="text-xs font-semibold text-white/80">{trend}</p>
              </div>
              <p className="text-white/80 text-sm mb-1">{label}</p>
              <p className="text-3xl font-bold text-white">{value}</p>
=======
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
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
<<<<<<< HEAD
          <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
            <h2 className="text-lg font-bold text-white mb-6">
=======
          <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-lg font-bold text-[#1E1E2F] mb-6">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
              Recovery Trends
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
<<<<<<< HEAD
                  <p className="text-sm font-medium text-gray-400">Amount Recovered</p>
                  <p className="text-sm font-semibold text-white">
                    ${Math.max(...chartData.recovered).toLocaleString()}
                  </p>
                </div>
                <div className="h-64 bg-gray-800/50 rounded-lg p-4 flex items-end gap-2">
                  {chartData.recovered.map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-gradient-to-t from-blue-600 to-cyan-600 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer"
=======
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
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                        style={{
                          height: `${(value / Math.max(...chartData.recovered)) * 100}%`,
                        }}
                      />
<<<<<<< HEAD
                      <p className="text-xs text-gray-400">{chartData.labels[index]}</p>
=======
                      <p className="text-xs text-gray-600">{chartData.labels[index]}</p>
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                    </div>
                  ))}
                </div>
              </div>

<<<<<<< HEAD
              <div className="border-t border-gray-700 pt-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-gray-400">
                    Disputes Submitted
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {Math.max(...chartData.disputes)}
                  </p>
                </div>
                <div className="h-48 bg-gray-800/50 rounded-lg p-4 flex items-end gap-2">
                  {chartData.disputes.map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-gradient-to-t from-green-600 to-emerald-600 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer"
=======
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
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                        style={{
                          height: `${(value / Math.max(...chartData.disputes)) * 100}%`,
                        }}
                      />
<<<<<<< HEAD
                      <p className="text-xs text-gray-400">{chartData.labels[index]}</p>
=======
                      <p className="text-xs text-gray-600">{chartData.labels[index]}</p>
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

<<<<<<< HEAD
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
            <h2 className="text-lg font-bold text-white mb-6">Dispute Outcomes</h2>
=======
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-lg font-bold text-[#1E1E2F] mb-6">Dispute Outcomes</h2>
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714

            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
<<<<<<< HEAD
                      stroke="#374151"
=======
                      stroke="#E0E6ED"
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
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
<<<<<<< HEAD
                      <p className="text-3xl font-bold text-white">142</p>
                      <p className="text-xs text-gray-400">Total</p>
=======
                      <p className="text-3xl font-bold text-[#1E1E2F]">142</p>
                      <p className="text-xs text-gray-600">Total</p>
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#28C76F] rounded-full"></div>
<<<<<<< HEAD
                    <span className="text-sm text-gray-400">Won</span>
                  </div>
                  <span className="font-semibold text-white">
=======
                    <span className="text-sm text-gray-600">Won</span>
                  </div>
                  <span className="font-semibold text-[#1E1E2F]">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                    {outcomeData.won} ({((outcomeData.won / 142) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#FFA94D] rounded-full"></div>
<<<<<<< HEAD
                    <span className="text-sm text-gray-400">Pending</span>
                  </div>
                  <span className="font-semibold text-white">
=======
                    <span className="text-sm text-gray-600">Pending</span>
                  </div>
                  <span className="font-semibold text-[#1E1E2F]">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                    {outcomeData.pending} ({((outcomeData.pending / 142) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#FF6B6B] rounded-full"></div>
<<<<<<< HEAD
                    <span className="text-sm text-gray-400">Lost</span>
                  </div>
                  <span className="font-semibold text-white">
=======
                    <span className="text-sm text-gray-600">Lost</span>
                  </div>
                  <span className="font-semibold text-[#1E1E2F]">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                    {outcomeData.lost} ({((outcomeData.lost / 142) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

<<<<<<< HEAD
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
          <h2 className="text-lg font-bold text-white mb-6">
=======
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-lg font-bold text-[#1E1E2F] mb-6">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
            Merchant Disputes
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
<<<<<<< HEAD
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">
                    Merchant
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">
                    Disputes
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">
=======
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Merchant
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Disputes
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                    Amount Recovered
                  </th>
                </tr>
              </thead>
              <tbody>
                {topMerchants.map((merchant, index) => (
                  <tr
                    key={index}
<<<<<<< HEAD
                    className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-4 px-4 text-sm font-medium text-white">
                      {merchant.name}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-medium rounded-full">
                        {merchant.disputes}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm font-semibold text-white">
=======
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
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
