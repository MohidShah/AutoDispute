import { useState } from 'react';
import { Save, Bell, Lock, CreditCard, Eye, EyeOff, Trash2, Plus, Check } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: 'john@example.com',
    fullName: 'John Doe',
    company: 'Acme Inc',
    notifications: {
      emailUpdates: true,
      disputeResolution: true,
      monthlyReport: true,
      newsAndUpdates: false,
    },
  });

  const accounts = [
    {
      type: 'stripe',
      name: 'Main Stripe Account',
      connected: '2025-11-01',
      primary: true,
    },
    {
      type: 'bank',
      name: 'Chase Business',
      connected: '2025-11-05',
      primary: false,
    },
  ];

  const apiKeys = [
    {
      id: 1,
      name: 'Production Key',
      key: 'sk_prod_****************************',
      created: '2025-10-15',
      lastUsed: '2025-11-10',
    },
    {
      id: 2,
      name: 'Development Key',
      key: 'sk_dev_****************************',
      created: '2025-10-20',
      lastUsed: '2025-11-08',
    },
  ];

  const handleSave = () => {
    console.log('Saving settings:', formData);
  };

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'accounts', label: 'Connected Accounts' },
    { id: 'security', label: 'Security & API' },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1E1E2F]">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account and preferences</p>
        </div>

        <div className="flex gap-8">
          <div className="w-48 flex-shrink-0">
            <div className="space-y-2 sticky top-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#3366FF] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 max-w-4xl">
            {activeTab === 'general' && (
              <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#1E1E2F] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3366FF] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1E1E2F] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3366FF] transition-colors"
                  />
                  <p className="text-xs text-gray-600 mt-2">
                    We'll send important updates to this email
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1E1E2F] mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, company: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3366FF] transition-colors"
                  />
                </div>

                <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
                  <button className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-[#3366FF] text-white rounded-lg hover:bg-[#28C76F] transition-colors flex items-center gap-2"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#1E1E2F] mb-6">
                    Email Notifications
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(formData.notifications).map(([key, value]) => (
                      <label
                        key={key}
                        className="flex items-center gap-3 cursor-pointer p-4 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              notifications: {
                                ...prev.notifications,
                                [key]: e.target.checked,
                              },
                            }))
                          }
                          className="w-5 h-5 rounded accent-[#3366FF] cursor-pointer"
                        />
                        <div>
                          <p className="font-medium text-[#1E1E2F]">
                            {key === 'emailUpdates' && 'Dispute Updates'}
                            {key === 'disputeResolution' && 'Dispute Resolution'}
                            {key === 'monthlyReport' && 'Monthly Report'}
                            {key === 'newsAndUpdates' && 'News & Updates'}
                          </p>
                          <p className="text-sm text-gray-600">
                            {key === 'emailUpdates' && 'Get notified when disputes are updated'}
                            {key === 'disputeResolution' &&
                              'Get notified when disputes are resolved'}
                            {key === 'monthlyReport' &&
                              'Receive monthly dispute analytics report'}
                            {key === 'newsAndUpdates' &&
                              'Receive product updates and announcements'}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-[#3366FF] text-white rounded-lg hover:bg-[#28C76F] transition-colors flex items-center gap-2"
                  >
                    <Save size={18} />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'accounts' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-md p-8">
                  <h3 className="text-lg font-bold text-[#1E1E2F] mb-6">
                    Connected Payment Accounts
                  </h3>

                  <div className="space-y-4">
                    {accounts.map((account, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                            {account.type === 'stripe' ? '🔵' : '🏦'}
                          </div>
                          <div>
                            <p className="font-semibold text-[#1E1E2F]">{account.name}</p>
                            <p className="text-sm text-gray-600">
                              Connected {account.connected}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {account.primary && (
                            <span className="px-3 py-1 bg-[#28C76F]/10 text-[#28C76F] text-xs font-semibold rounded-full">
                              Primary
                            </span>
                          )}
                          <button className="text-gray-500 hover:text-[#FF6B6B] transition-colors">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-6 px-6 py-3 border-2 border-gray-300 text-[#3366FF] rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Plus size={20} />
                    Add Account
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-md p-8">
                  <h3 className="text-lg font-bold text-[#1E1E2F] mb-6 flex items-center gap-2">
                    <Lock size={24} />
                    Password
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#1E1E2F] mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3366FF] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1E1E2F] mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3366FF] transition-colors"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1E1E2F] mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3366FF] transition-colors"
                      />
                    </div>
                  </div>

                  <button className="mt-6 px-6 py-2 bg-[#3366FF] text-white rounded-lg hover:bg-[#28C76F] transition-colors">
                    Update Password
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-md p-8">
                  <h3 className="text-lg font-bold text-[#1E1E2F] mb-6 flex items-center gap-2">
                    <CreditCard size={24} />
                    API Keys
                  </h3>

                  <div className="space-y-4 mb-6">
                    {apiKeys.map((key) => (
                      <div
                        key={key.id}
                        className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold text-[#1E1E2F]">{key.name}</p>
                            <p className="font-mono text-sm text-gray-600 mt-1">{key.key}</p>
                          </div>
                          <button className="text-gray-500 hover:text-[#FF6B6B] transition-colors">
                            <Trash2 size={20} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-600">
                          Created {key.created} • Last used {key.lastUsed}
                        </p>
                      </div>
                    ))}
                  </div>

                  <button className="w-full px-6 py-3 border-2 border-gray-300 text-[#3366FF] rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Plus size={20} />
                    Generate New Key
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
