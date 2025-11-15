import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createStripeConnection } from '../services/stripeService';

export default function StripeCallback() {
  const { user } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function handleCallback() {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const state = params.get('state');
        const error = params.get('error');

        if (error) {
          setError(`Stripe error: ${error}`);
          setStatus('error');
          return;
        }

        if (!code || !state) {
          setError('Missing authorization code or state');
          setStatus('error');
          return;
        }

        const savedState = sessionStorage.getItem('stripe_auth_state');
        const accountName = sessionStorage.getItem('stripe_account_name');

        if (state !== savedState) {
          setError('Invalid state parameter');
          setStatus('error');
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-oauth-exchange`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user?.id}`,
            },
            body: JSON.stringify({
              code,
              accountName: accountName || 'My Stripe Account',
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to exchange authorization code');
        }

        const data = await response.json();

        await createStripeConnection(
          data.stripe_account_id,
          data.stripe_access_token,
          data.stripe_refresh_token,
          accountName || 'My Stripe Account'
        );

        setStatus('success');
        sessionStorage.removeItem('stripe_auth_state');
        sessionStorage.removeItem('stripe_account_name');

        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } catch (err: any) {
        setError(err.message || 'Failed to connect Stripe account');
        setStatus('error');
      }
    }

    if (user) {
      handleCallback();
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        {status === 'loading' && (
          <>
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-300">Connecting your Stripe account...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-5xl mb-4">✓</div>
            <p className="text-green-400">Account connected successfully!</p>
            <p className="text-slate-400 text-sm mt-2">Redirecting to dashboard...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-5xl mb-4">✗</div>
            <p className="text-red-400">{error}</p>
            <button
              onClick={() => window.history.back()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
