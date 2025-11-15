import { useState } from 'react';
import { Save, Bell, Lock, CreditCard, Eye, EyeOff, Trash2, Plus, Check, Upload } from 'lucide-react';

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

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
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

  const handleSave = () => {
    console.log('Saving settings:', formData);
  };

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
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-2">Manage your account and preferences</p>
        </div>

        <div className="flex gap-8">
          <div className="w-48 flex-shrink-0">
            <div className="space-y-2 sticky top-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 max-w-4xl">
            {activeTab === 'general' && (
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-8 space-y-6 border border-gray-700">
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-semibold text-2xl overflow-hidden">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        'JD'
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center cursor-pointer hover:from-blue-700 hover:to-cyan-700 transition-all">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Upload size={16} className="text-white" />
                    </label>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Profile Picture</h3>
                    <p className="text-sm text-gray-400">Upload a new profile picture</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    We'll send important updates to this email
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, company: e.target.value }))
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                  />
                </div>

                <div className="pt-4 border-t border-gray-700 flex justify-end gap-3">
                  <button className="px-6 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 flex items-center gap-2 shadow-lg"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-8 space-y-6 border border-gray-700">
                <div>
                  <h3 className="text-lg font-bold text-white mb-6">
                    Email Notifications
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(formData.notifications).map(([key, value]) => (
                      <label
                        key={key}
                        className="flex items-center gap-3 cursor-pointer p-4 hover:bg-gray-800/50 rounded-lg transition-colors"
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
                          className="w-5 h-5 rounded accent-blue-500 cursor-pointer bg-gray-800 border-gray-700"
                        />
                        <div>
                          <p className="font-medium text-white">
                            {key === 'emailUpdates' && 'Dispute Updates'}
                            {key === 'disputeResolution' && 'Dispute Resolution'}
                            {key === 'monthlyReport' && 'Monthly Report'}
                            {key === 'newsAndUpdates' && 'News & Updates'}
                          </p>
                          <p className="text-sm text-gray-400">
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

                <div className="pt-4 border-t border-gray-700 flex justify-end gap-3">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 flex items-center gap-2 shadow-lg"
                  >
                    <Save size={18} />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'accounts' && (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-6">
                    Connected Payment Accounts
                  </h3>

                  <div className="space-y-4">
                    {accounts.map((account, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-6 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors bg-gray-800/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg flex items-center justify-center text-xl">
                            {account.type === 'stripe' ? '🔵' : '🏦'}
                          </div>
                          <div>
                            <p className="font-semibold text-white">{account.name}</p>
                            <p className="text-sm text-gray-400">
                              Connected {account.connected}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {account.primary && (
                            <span className="px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-semibold rounded-full">
                              Primary
                            </span>
                          )}
                          <button className="text-gray-400 hover:text-red-400 transition-colors">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-6 px-6 py-3 border-2 border-gray-600 text-blue-400 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                    <Plus size={20} />
                    Add Account
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Lock size={24} />
                    Password
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <button className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg">
                    Update Password
                  </button>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <CreditCard size={24} />
                    API Keys
                  </h3>

                  <div className="space-y-4 mb-6">
                    {apiKeys.map((key) => (
                      <div
                        key={key.id}
                        className="p-4 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors bg-gray-800/50"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold text-white">{key.name}</p>
                            <p className="font-mono text-sm text-gray-400 mt-1">{key.key}</p>
                          </div>
                          <button className="text-gray-400 hover:text-red-400 transition-colors">
                            <Trash2 size={20} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-400">
                          Created {key.created} • Last used {key.lastUsed}
                        </p>
                      </div>
                    ))}
                  </div>

                  <button className="w-full px-6 py-3 border-2 border-gray-600 text-blue-400 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
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