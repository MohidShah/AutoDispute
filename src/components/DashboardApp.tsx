import { useState, useEffect } from 'react';
// Removed the useAuth import since we're bypassing authentication
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Plus,
  Search,
  ChevronLeft,
  MessageCircle,
  Filter,
  Download,
  AlertCircle,
  LogOut,
} from 'lucide-react';
import { getDisputes, getDisputeStats } from '../services/disputeService';
import Analytics from './Analytics';
import SettingsComponent from './Settings';
import DisputeDetail from './DisputeDetail';
import NewDisputeWizard from './NewDisputeWizard';
import BankConnectionModal from './BankConnectionModal';

interface DashboardAppProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

export default function DashboardApp({ onLogout, onNavigate }: DashboardAppProps) {
  // Removed user and signOut from useAuth since we're bypassing authentication
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [disputes, setDisputes] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    won: 0,
    lost: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDisputesData();
  }, []);

  const loadDisputesData = async () => {
    try {
      setIsLoading(true);
      // For demo purposes, we'll use mock data if the service fails
      try {
        const [disputesData, statsData] = await Promise.all([
          getDisputes(),
          getDisputeStats(),
        ]);

        const formattedDisputes = disputesData.map((d) => ({
          id: d.id,
          date: new Date(d.created_at).toISOString().split('T')[0],
          merchant: 'Unknown',
          amount: `$${d.amount.toFixed(2)}`,
          status: d.status.includes('won') ? 'won' : d.status.includes('lost') ? 'lost' : 'pending',
          reason: d.reason,
        }));

        setDisputes(formattedDisputes);
        setStats({
          total: statsData.total,
          pending: statsData.pending,
          won: statsData.won,
          lost: statsData.lost,
        });
      } catch (serviceError) {
        // Use mock data if service fails
        console.warn('Using mock data for demo purposes');
        const mockDisputes = [
          {
            id: '1',
            date: '2023-06-15',
            merchant: 'Amazon',
            amount: '$129.99',
            status: 'pending',
            reason: 'Unauthorized transaction',
          },
          {
            id: '2',
            date: '2023-06-10',
            merchant: 'Apple Store',
            amount: '$899.99',
            status: 'won',
            reason: 'Product not received',
          },
          {
            id: '3',
            date: '2023-06-05',
            merchant: 'Best Buy',
            amount: '$499.99',
            status: 'pending',
            reason: 'Defective product',
          },
          {
            id: '4',
            date: '2023-05-28',
            merchant: 'Nike',
            amount: '$149.99',
            status: 'lost',
            reason: 'Customer dispute',
          },
        ];

        setDisputes(mockDisputes);
        setStats({
          total: 4,
          pending: 2,
          won: 1,
          lost: 1,
        });
      }
    } catch (error) {
      console.error('Failed to load disputes:', error);
      setDisputes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsSigningOut(true);
    try {
      // Removed signOut() call since we're bypassing authentication
      onLogout();
      onNavigate('home');
    } catch (err) {
      console.error('Logout error:', err);
      setIsSigningOut(false);
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'analytics' | 'settings'>(
    'dashboard'
  );
  const [selectedDispute, setSelectedDispute] = useState<any>(null);
  const [showNewDisputeWizard, setShowNewDisputeWizard] = useState(false);
  const [showBankConnection, setShowBankConnection] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const dashboardStats = [
    { 
      label: 'Total Disputes', 
      value: stats.total.toString(), 
      color: 'from-blue-600 to-cyan-600',
      trend: 'All disputes in system'
    },
    { 
      label: 'Pending', 
      value: stats.pending.toString(), 
      color: 'from-yellow-600 to-orange-600',
      trend: 'Awaiting processor review'
    },
    { 
      label: 'Won', 
      value: stats.won.toString(), 
      color: 'from-green-600 to-emerald-600',
      trend: 'Successfully resolved'
    },
    { 
      label: 'Lost', 
      value: stats.lost.toString(), 
      color: 'from-red-600 to-rose-600',
      trend: 'Review and improve evidence'
    },
  ];

  const statusColors: { [key: string]: string } = {
    pending: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
    won: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
    lost: 'bg-gradient-to-r from-red-500 to-rose-500 text-white',
  };

  const filteredDisputes = disputes.filter(
    (dispute) =>
      dispute.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedDispute) {
    return (
      <div className="flex h-screen bg-[#0A0D14]">
        <SidebarNav
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSelectedDispute={setSelectedDispute}
          onLogout={handleLogout}
        />
        <DisputeDetail dispute={selectedDispute} onBack={() => setSelectedDispute(null)} />
      </div>
    );
  }

  if (currentPage === 'analytics') {
    return (
      <div className="flex h-screen bg-[#0A0D14]">
        <SidebarNav
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSelectedDispute={setSelectedDispute}
          onLogout={handleLogout}
        />
        <Analytics />
      </div>
    );
  }

  if (currentPage === 'settings') {
    return (
      <div className="flex h-screen bg-[#0A0D14]">
        <SidebarNav
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSelectedDispute={setSelectedDispute}
          onLogout={handleLogout}
        />
        <SettingsComponent />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0A0D14]">
      <SidebarNav
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSelectedDispute={setSelectedDispute}
        onLogout={handleLogout}
      />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Disputes Dashboard</h1>
            <button
              onClick={() => setShowNewDisputeWizard(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Plus size={20} />
              New Dispute
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {dashboardStats.map(({ label, value, color, trend }) => (
              <div
                key={label}
                className={`bg-gradient-to-br ${color} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-white/10`}
              >
                <p className="text-white/80 text-sm mb-2">{label}</p>
                <p className="text-3xl font-bold text-white">{value}</p>
                {trend && (
                  <p className="text-white/70 text-xs mt-2 text-left">{trend}</p>
                )}
              </div>
            ))}
          </div>

          {!showBankConnection && (
            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-2xl p-6 mb-8 flex items-start gap-4">
              <AlertCircle className="text-blue-400 flex-shrink-0 mt-1" size={24} />
              <div className="flex-1">
                <p className="font-semibold text-white">No account connected</p>
                <p className="text-sm text-gray-300 mt-1">
                  Connect your Stripe or bank account to start disputing transactions
                </p>
              </div>
              <button
                onClick={() => setShowBankConnection(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md"
              >
                Connect Account
              </button>
            </div>
          )}

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Disputes</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search disputes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                  />
                </div>
                <button className="p-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors">
                  <Filter size={20} className="text-gray-400" />
                </button>
                <button className="p-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors">
                  <Download size={20} className="text-gray-400" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">
                      Merchant
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">
                      Reason
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDisputes.map((dispute) => (
                    <tr
                      key={dispute.id}
                      className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors cursor-pointer"
                    >
                      <td className="py-4 px-4 text-sm text-gray-300">{dispute.date}</td>
                      <td className="py-4 px-4 text-sm font-medium text-white">
                        {dispute.merchant}
                      </td>
                      <td className="py-4 px-4 text-sm font-semibold text-white">
                        {dispute.amount}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-400">{dispute.reason}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            statusColors[dispute.status]
                          }`}
                        >
                          {dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => setSelectedDispute(dispute)}
                          className="text-blue-400 hover:text-cyan-400 text-sm font-medium transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {chatOpen && (
        <div className="fixed bottom-24 right-8 w-96 h-[500px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-700">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageCircle size={24} />
              <div>
                <p className="font-semibold">AI Assistant</p>
                <p className="text-xs opacity-90">Here to help</p>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="hover:opacity-80">
              ×
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="bg-gray-800 p-3 rounded-lg max-w-[80%]">
              <p className="text-sm text-gray-200">
                Hi! I can help you with disputes. What would you like to do?
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowNewDisputeWizard(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-colors"
              >
                Start a dispute
              </button>
              <button className="px-4 py-2 bg-gray-700 text-gray-200 text-sm rounded-lg hover:bg-gray-600 transition-colors">
                Check status
              </button>
            </div>
          </div>

          <div className="p-4 border-t border-gray-700">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400"
            />
          </div>
        </div>
      )}

      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 flex items-center justify-center transform hover:scale-110 z-40"
      >
        <MessageCircle size={24} />
      </button>

      {showNewDisputeWizard && (
        <NewDisputeWizard onClose={() => setShowNewDisputeWizard(false)} />
      )}

      {showBankConnection && (
        <BankConnectionModal onClose={() => setShowBankConnection(false)} />
      )}
    </div>
  );
}

function SidebarNav({
  sidebarOpen,
  setSidebarOpen,
  currentPage,
  setCurrentPage,
  setSelectedDispute,
  onLogout,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentPage: string;
  setCurrentPage: (page: 'dashboard' | 'analytics' | 'settings') => void;
  setSelectedDispute: (dispute: null) => void;
  onLogout: () => void;
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };
  return (
    <aside
      className={`bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-20'
      } flex flex-col`}
    >
      <div className="p-6 border-b border-gray-700 flex items-center justify-between">
        {sidebarOpen && (
          <span className="text-xl font-bold text-white">AutoDispute</span>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronLeft
            className={`text-gray-400 transition-transform ${
              !sidebarOpen ? 'rotate-180' : ''
            }`}
            size={20}
          />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {[
          { Icon: LayoutDashboard, label: 'Disputes', page: 'dashboard' as const },
          { Icon: BarChart3, label: 'Analytics', page: 'analytics' as const },
          { Icon: Settings, label: 'Settings', page: 'settings' as const },
        ].map(({ Icon, label, page }) => (
          <button
            key={label}
            onClick={() => {
              setCurrentPage(page);
              setSelectedDispute(null);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              currentPage === page
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <Icon size={20} />
            {sidebarOpen && <span className="font-medium">{label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700 relative">
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            showProfileMenu
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
              : 'text-gray-400 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <div className="w-5 h-5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-semibold text-xs mx-auto">
            JD
          </div>
          {sidebarOpen && (
            <div className="flex-1 text-left">
              <p className="font-medium text-white text-sm">John Doe</p>
              <p className="text-gray-400 text-xs">john@example.com</p>
            </div>
          )}
        </button>

        {showProfileMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowProfileMenu(false)}
            ></div>
            {sidebarOpen ? (
              <div className="absolute bottom-full left-4 right-4 mb-2 bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-semibold">
                      JD
                    </div>
                    <div>
                      <p className="font-semibold text-white">John Doe</p>
                      <p className="text-xs text-gray-400">john@example.com</p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      setCurrentPage('settings');
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    Help & Support
                  </button>
                </div>
                <div className="border-t border-gray-700 py-2">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      setShowLogoutConfirm(true);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="absolute bottom-full right-4 mb-2 bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden w-48">
                <div className="p-4 border-b border-gray-700 flex justify-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-semibold">
                    JD
                  </div>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      setCurrentPage('settings');
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    Help & Support
                  </button>
                  <div className="border-t border-gray-700 py-2">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        setShowLogoutConfirm(true);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-2">Sign Out</h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to sign out of your account?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 transition-colors font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}