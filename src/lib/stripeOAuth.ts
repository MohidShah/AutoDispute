const STRIPE_CLIENT_ID = import.meta.env.VITE_STRIPE_CLIENT_ID;
const REDIRECT_URI = `${window.location.origin}/stripe-callback`;

export function getStripeOAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: STRIPE_CLIENT_ID,
    response_type: 'code',
    scope: 'read_write',
    redirect_uri: REDIRECT_URI,
    state,
  });

  return `https://connect.stripe.com/oauth/authorize?${params.toString()}`;
}

export function handleStripeCallback(code: string, state: string) {
  return {
    code,
    state,
  };
}
