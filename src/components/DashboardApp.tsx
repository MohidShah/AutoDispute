import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
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
  const { user, signOut } = useAuth();
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
  }, [user]);

  const loadDisputesData = async () => {
    try {
      setIsLoading(true);
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
      await signOut();
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
    { label: 'Total Disputes', value: stats.total.toString(), color: '#3366FF' },
    { label: 'Pending', value: stats.pending.toString(), color: '#FFA94D' },
    { label: 'Won', value: stats.won.toString(), color: '#28C76F' },
    { label: 'Lost', value: stats.lost.toString(), color: '#FF6B6B' },
  ];

  const statusColors: { [key: string]: string } = {
    pending: 'bg-[#FFA94D] text-white',
    won: 'bg-[#28C76F] text-white',
    lost: 'bg-[#FF6B6B] text-white',
  };

  const filteredDisputes = disputes.filter(
    (dispute) =>
      dispute.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedDispute) {
    return (
      <div className="flex h-screen bg-[#F5F7FA]">
        <SidebarNav
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSelectedDispute={setSelectedDispute}
          onLogout={onLogout}
        />
        <DisputeDetail dispute={selectedDispute} onBack={() => setSelectedDispute(null)} />
      </div>
    );
  }

  if (currentPage === 'analytics') {
    return (
      <div className="flex h-screen bg-[#F5F7FA]">
        <SidebarNav
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSelectedDispute={setSelectedDispute}
          onLogout={onLogout}
        />
        <Analytics />
      </div>
    );
  }

  if (currentPage === 'settings') {
    return (
      <div className="flex h-screen bg-[#F5F7FA]">
        <SidebarNav
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSelectedDispute={setSelectedDispute}
          onLogout={onLogout}
        />
        <SettingsComponent />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F5F7FA]">
      <SidebarNav
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSelectedDispute={setSelectedDispute}
        onLogout={onLogout}
      />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-[#1E1E2F]">Disputes Dashboard</h1>
            <button
              onClick={() => setShowNewDisputeWizard(true)}
              className="px-6 py-3 bg-[#3366FF] text-white rounded-lg font-medium hover:bg-[#28C76F] transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Plus size={20} />
              New Dispute
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {dashboardStats.map(({ label, value, color }) => (
              <div
                key={label}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <p className="text-gray-600 text-sm mb-2">{label}</p>
                <p className="text-3xl font-bold" style={{ color }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {!showBankConnection && (
            <div className="bg-[#3366FF]/10 border border-[#3366FF]/20 rounded-xl p-4 mb-8 flex items-start gap-3">
              <AlertCircle className="text-[#3366FF] flex-shrink-0 mt-0.5" size={20} />
              <div className="flex-1">
                <p className="font-semibold text-[#1E1E2F]">No account connected</p>
                <p className="text-sm text-gray-600 mt-1">
                  Connect your Stripe or bank account to start disputing transactions
                </p>
              </div>
              <button
                onClick={() => setShowBankConnection(true)}
                className="px-4 py-2 bg-[#3366FF] text-white rounded-lg text-sm font-medium hover:bg-[#28C76F] transition-colors flex-shrink-0"
              >
                Connect Account
              </button>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#1E1E2F]">Recent Disputes</h2>
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
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3366FF] transition-colors"
                  />
                </div>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                  <Filter size={20} className="text-gray-600" />
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                  <Download size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Merchant
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Reason
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDisputes.map((dispute) => (
                    <tr
                      key={dispute.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="py-4 px-4 text-sm text-gray-700">{dispute.date}</td>
                      <td className="py-4 px-4 text-sm font-medium text-[#1E1E2F]">
                        {dispute.merchant}
                      </td>
                      <td className="py-4 px-4 text-sm font-semibold text-[#1E1E2F]">
                        {dispute.amount}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">{dispute.reason}</td>
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
                          className="text-[#3366FF] hover:text-[#28C76F] text-sm font-medium transition-colors"
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
        <div className="fixed bottom-24 right-8 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50">
          <div className="p-4 bg-[#3366FF] text-white rounded-t-2xl flex items-center justify-between">
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
            <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
              <p className="text-sm text-gray-700">
                Hi! I can help you with disputes. What would you like to do?
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowNewDisputeWizard(true)}
                className="px-4 py-2 bg-[#3366FF] text-white text-sm rounded-lg hover:bg-[#28C76F] transition-colors"
              >
                Start a dispute
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors">
                Check status
              </button>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3366FF]"
            />
          </div>
        </div>
      )}

      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#3366FF] text-white rounded-full shadow-lg hover:bg-[#28C76F] transition-all duration-200 flex items-center justify-center transform hover:scale-110 z-40"
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
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };
  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-20'
      } flex flex-col`}
    >
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        {sidebarOpen && (
          <span className="text-xl font-bold text-[#1E1E2F]">AutoDispute</span>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft
            className={`text-gray-600 transition-transform ${
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
                ? 'bg-[#3366FF] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Icon size={20} />
            {sidebarOpen && <span className="font-medium">{label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 relative">
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <div className="w-10 h-10 bg-[#3366FF] rounded-full flex items-center justify-center text-white font-semibold overflow-hidden relative group">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              'JD'
            )}
            <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <span className="text-xs text-white">Edit</span>
            </label>
          </div>
          {sidebarOpen && (
            <div className="flex-1 text-left">
              <p className="font-medium text-[#1E1E2F] text-sm">John Doe</p>
              <p className="text-gray-600 text-xs">john@example.com</p>
            </div>
          )}
        </button>

        {showProfileMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowProfileMenu(false)}
            ></div>
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-[#3366FF] rounded-full flex items-center justify-center text-white font-semibold overflow-hidden">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      'JD'
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-[#1E1E2F]">John Doe</p>
                    <p className="text-xs text-gray-600">john@example.com</p>
                  </div>
                </div>
                <label className="block w-full px-4 py-2 text-sm text-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  Change Profile Picture
                </label>
              </div>
              <div className="py-2">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    setCurrentPage('settings');
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Profile Settings
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    setCurrentPage('settings');
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Account Settings
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Help & Support
                </button>
              </div>
              <div className="border-t border-gray-200 py-2">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    setShowLogoutConfirm(true);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </>
        )}

        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-[#1E1E2F] mb-2">Sign Out</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to sign out of your account?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
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
