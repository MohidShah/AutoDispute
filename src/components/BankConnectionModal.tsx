import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { X, Lock, CheckCircle2, AlertCircle, Shield } from 'lucide-react';
import { createStripeConnection } from '../services/stripeService';

export default function BankConnectionModal({ onClose }: { onClose: () => void }) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<'stripe' | 'bank' | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'success' | 'error'>('idle');
  const [accountName, setAccountName] = useState('');
  const [error, setError] = useState('');

  const accountOptions = [
    {
      type: 'stripe',
      title: 'Stripe',
      description: 'Connect your Stripe account for payment disputes',
      icon: '🔵',
    },
    {
      type: 'bank',
      title: 'Bank Account',
      description: 'Connect via Plaid for secure bank access',
      icon: '🏦',
    },
  ];

  const handleConnectStripe = () => {
    if (!accountName.trim()) {
      setError('Please enter an account name');
      return;
    }

    const state = Math.random().toString(36).substring(7);
    sessionStorage.setItem('stripe_auth_state', state);
    sessionStorage.setItem('stripe_account_name', accountName);

    const stripeUrl = new URL('https://connect.stripe.com/oauth/authorize');
    const stripeClientId = import.meta.env.VITE_STRIPE_CLIENT_ID;

    stripeUrl.searchParams.set('client_id', stripeClientId);
    stripeUrl.searchParams.set('response_type', 'code');
    stripeUrl.searchParams.set('scope', 'read_write');
    stripeUrl.searchParams.set('redirect_uri', `${window.location.origin}/stripe-callback`);
    stripeUrl.searchParams.set('state', state);

    window.location.href = stripeUrl.toString();
  };

  const handleConnect = async () => {
    if (accountType === 'stripe') {
      handleConnectStripe();
    } else {
      setConnectionStatus('connecting');
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setConnectionStatus('success');
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  return (
<<<<<<< HEAD
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Connect Account</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
=======
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#1E1E2F]">Connect Account</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
<<<<<<< HEAD
                <h3 className="text-lg font-semibold text-white mb-2">
                  Choose Connection Type
                </h3>
                <p className="text-gray-400">
=======
                <h3 className="text-lg font-semibold text-[#1E1E2F] mb-2">
                  Choose Connection Type
                </h3>
                <p className="text-gray-600">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                  Select your payment processor or bank to start disputing transactions
                </p>
              </div>

              <div className="space-y-4">
                {accountOptions.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => {
                      setAccountType(option.type as 'stripe' | 'bank');
                      setStep(2);
                    }}
<<<<<<< HEAD
                    className="w-full p-6 rounded-lg border-2 border-gray-700 hover:border-blue-500 transition-all hover:bg-gray-800/50 text-left group"
=======
                    className="w-full p-6 rounded-lg border-2 border-gray-200 hover:border-[#3366FF] transition-all hover:bg-[#3366FF]/5 text-left group"
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <span className="text-3xl">{option.icon}</span>
                        <div>
<<<<<<< HEAD
                          <p className="font-semibold text-white text-lg">
                            {option.title}
                          </p>
                          <p className="text-gray-400 text-sm">{option.description}</p>
                        </div>
                      </div>
                      <div className="w-6 h-6 rounded-full border-2 border-gray-600 group-hover:border-blue-500 transition-colors"></div>
=======
                          <p className="font-semibold text-[#1E1E2F] text-lg">
                            {option.title}
                          </p>
                          <p className="text-gray-600 text-sm">{option.description}</p>
                        </div>
                      </div>
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-[#3366FF] transition-colors"></div>
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                    </div>
                  </button>
                ))}
              </div>

<<<<<<< HEAD
              <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3">
                <Lock className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                <p className="text-sm text-gray-200">
=======
              <div className="bg-[#3366FF]/10 border border-[#3366FF] rounded-lg p-4 flex items-start gap-3">
                <Lock className="text-[#3366FF] flex-shrink-0 mt-1" size={20} />
                <p className="text-sm text-[#1E1E2F]">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                  Your connection is secured with bank-level encryption (256-bit SSL). We
                  never store your credentials directly.
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
<<<<<<< HEAD
                <h3 className="text-lg font-semibold text-white mb-2">
                  {accountType === 'stripe' ? 'Connect Stripe' : 'Connect Bank Account'}
                </h3>
                <p className="text-gray-400">
=======
                <h3 className="text-lg font-semibold text-[#1E1E2F] mb-2">
                  {accountType === 'stripe' ? 'Connect Stripe' : 'Connect Bank Account'}
                </h3>
                <p className="text-gray-600">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                  {accountType === 'stripe'
                    ? 'Authorize AutoDispute to access your Stripe disputes'
                    : 'Link your bank account securely through Plaid'}
                </p>
              </div>

              {connectionStatus === 'idle' && (
                <div className="space-y-6">
                  {accountType === 'stripe' ? (
<<<<<<< HEAD
                    <div className="bg-gray-800 p-8 rounded-lg text-center border border-gray-700">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-700">
                        <span className="text-2xl">🔵</span>
                      </div>
                      <p className="text-white font-semibold mb-4">
                        Click below to authorize with Stripe
                      </p>
                      <p className="text-sm text-gray-400">
=======
                    <div className="bg-gray-50 p-8 rounded-lg text-center">
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <span className="text-2xl">🔵</span>
                      </div>
                      <p className="text-[#1E1E2F] font-semibold mb-4">
                        Click below to authorize with Stripe
                      </p>
                      <p className="text-sm text-gray-600">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                        You'll be redirected to Stripe's authorization page
                      </p>
                    </div>
                  ) : (
<<<<<<< HEAD
                    <div className="bg-gray-800 p-8 rounded-lg text-center border border-gray-700">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-700">
                        <span className="text-2xl">🏦</span>
                      </div>
                      <p className="text-white font-semibold mb-4">
                        Click below to connect through Plaid
                      </p>
                      <p className="text-sm text-gray-400">
=======
                    <div className="bg-gray-50 p-8 rounded-lg text-center">
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <span className="text-2xl">🏦</span>
                      </div>
                      <p className="text-[#1E1E2F] font-semibold mb-4">
                        Click below to connect through Plaid
                      </p>
                      <p className="text-sm text-gray-600">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                        Search for your bank and authenticate securely
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {error && (
<<<<<<< HEAD
                      <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-3 flex items-start gap-2">
                        <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
                        <p className="text-red-400 text-sm">{error}</p>
=======
                      <div className="bg-red-500/10 border border-red-500 rounded-lg p-3 flex items-start gap-2">
                        <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                        <p className="text-red-500 text-sm">{error}</p>
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                      </div>
                    )}
                    <input
                      type="text"
                      value={accountName}
                      onChange={(e) => {
                        setAccountName(e.target.value);
                        setError('');
                      }}
                      placeholder={
                        accountType === 'stripe'
                          ? 'Enter account name (e.g., Main Account)'
                          : 'Enter account nickname'
                      }
<<<<<<< HEAD
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                    />
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded bg-gray-800 border-gray-700 text-blue-500" defaultChecked />
                      <span className="text-sm text-gray-300">Set as primary account</span>
=======
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3366FF] transition-colors"
                    />
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded" defaultChecked />
                      <span className="text-sm text-gray-700">Set as primary account</span>
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                    </label>
                  </div>

                  <button
                    onClick={handleConnect}
<<<<<<< HEAD
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg"
=======
                    className="w-full px-6 py-3 bg-[#3366FF] text-white rounded-lg font-semibold hover:bg-[#28C76F] transition-colors transform hover:-translate-y-0.5"
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                  >
                    {accountType === 'stripe'
                      ? 'Authorize with Stripe'
                      : 'Connect via Plaid'}
                  </button>
                </div>
              )}

              {connectionStatus === 'connecting' && (
<<<<<<< HEAD
                <div className="bg-gray-800 p-12 rounded-lg text-center border border-gray-700">
                  <div className="w-16 h-16 mx-auto mb-4 relative">
                    <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
                    <div
                      className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin"
                      style={{ borderRightColor: 'transparent', borderBottomColor: 'transparent' }}
                    ></div>
                  </div>
                  <p className="text-white font-semibold">
                    Connecting your account...
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
=======
                <div className="bg-gray-50 p-12 rounded-lg text-center">
                  <div className="w-16 h-16 mx-auto mb-4 relative">
                    <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                    <div
                      className="absolute inset-0 border-4 border-[#3366FF] rounded-full animate-spin"
                      style={{ borderRightColor: 'transparent', borderBottomColor: 'transparent' }}
                    ></div>
                  </div>
                  <p className="text-[#1E1E2F] font-semibold">
                    Connecting your account...
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                    This may take a moment
                  </p>
                </div>
              )}

              {connectionStatus === 'success' && (
<<<<<<< HEAD
                <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-lg p-8 text-center">
                  <CheckCircle2 className="text-green-400 mx-auto mb-4" size={48} />
                  <p className="text-white font-semibold text-lg mb-2">
                    Account Connected!
                  </p>
                  <p className="text-sm text-gray-300">
=======
                <div className="bg-[#28C76F]/10 border border-[#28C76F] rounded-lg p-8 text-center">
                  <CheckCircle2 className="text-[#28C76F] mx-auto mb-4" size={48} />
                  <p className="text-[#1E1E2F] font-semibold text-lg mb-2">
                    Account Connected!
                  </p>
                  <p className="text-sm text-gray-600">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                    Your account is now connected and ready to use
                  </p>
                </div>
              )}

              {connectionStatus === 'error' && (
<<<<<<< HEAD
                <div className="bg-gradient-to-r from-red-900/30 to-rose-900/30 border border-red-500/30 rounded-lg p-6">
                  <div className="flex gap-3">
                    <AlertCircle
                      className="text-red-400 flex-shrink-0 mt-1"
                      size={20}
                    />
                    <div>
                      <p className="font-semibold text-white">Connection Failed</p>
                      <p className="text-sm text-gray-300 mt-1">
=======
                <div className="bg-[#FF6B6B]/10 border border-[#FF6B6B] rounded-lg p-6">
                  <div className="flex gap-3">
                    <AlertCircle
                      className="text-[#FF6B6B] flex-shrink-0 mt-1"
                      size={20}
                    />
                    <div>
                      <p className="font-semibold text-[#1E1E2F]">Connection Failed</p>
                      <p className="text-sm text-gray-600 mt-1">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                        Please try again or contact support
                      </p>
                    </div>
                  </div>
                </div>
              )}

<<<<<<< HEAD
              <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3">
                <Shield className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-sm font-semibold text-white mb-1">
                    Your data is secure
                  </p>
                  <p className="text-xs text-gray-300">
=======
              <div className="bg-[#3366FF]/5 border border-[#3366FF]/20 rounded-lg p-4 flex items-start gap-3">
                <Shield className="text-[#3366FF] flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-sm font-semibold text-[#1E1E2F] mb-1">
                    Your data is secure
                  </p>
                  <p className="text-xs text-gray-600">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
                    We use industry-standard encryption and follow PCI-DSS compliance
                  </p>
                </div>
              </div>
            </div>
          )}

<<<<<<< HEAD
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-700">
            {step === 2 && connectionStatus !== 'success' && (
              <button
                onClick={() => setStep(1)}
                className="flex-1 px-6 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
=======
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            {step === 2 && connectionStatus !== 'success' && (
              <button
                onClick={() => setStep(1)}
                className="flex-1 px-6 py-3 border border-gray-300 text-[#1E1E2F] rounded-lg font-medium hover:bg-gray-50 transition-colors"
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
              >
                Back
              </button>
            )}
            {connectionStatus !== 'connecting' && connectionStatus !== 'success' && (
              <button
                onClick={onClose}
<<<<<<< HEAD
                className="flex-1 px-6 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
=======
                className="flex-1 px-6 py-3 border border-gray-300 text-[#1E1E2F] rounded-lg font-medium hover:bg-gray-50 transition-colors"
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
              >
                Cancel
              </button>
            )}
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
