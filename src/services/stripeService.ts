import { supabase } from '../lib/supabase';

export interface StripeConnection {
  id: string;
  user_id: string;
  stripe_account_id: string;
  stripe_access_token: string;
  stripe_refresh_token: string;
  business_name: string;
  is_connected: boolean;
  last_synced: string;
  created_at: string;
  updated_at: string;
}

export async function getStripeConnections() {
  const { data, error } = await supabase
    .from('stripe_connections')
    .select('*')
    .eq('is_connected', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as StripeConnection[];
}

export async function getStripeConnectionById(id: string) {
  const { data, error } = await supabase
    .from('stripe_connections')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data as StripeConnection | null;
}

export async function createStripeConnection(
  stripeAccountId: string,
  accessToken: string,
  refreshToken: string,
  businessName: string
) {
  const { data, error } = await supabase
    .from('stripe_connections')
    .insert({
      stripe_account_id: stripeAccountId,
      stripe_access_token: accessToken,
      stripe_refresh_token: refreshToken,
      business_name: businessName,
      is_connected: true,
    })
    .select()
    .single();

  if (error) throw error;
  return data as StripeConnection;
}

export async function disconnectStripeConnection(connectionId: string) {
  const { error } = await supabase
    .from('stripe_connections')
    .update({ is_connected: false, updated_at: new Date().toISOString() })
    .eq('id', connectionId);

  if (error) throw error;
}

export async function updateLastSynced(connectionId: string) {
  const { error } = await supabase
    .from('stripe_connections')
    .update({ last_synced: new Date().toISOString() })
    .eq('id', connectionId);

  if (error) throw error;
}

export async function getStripeConnectionByAccountId(accountId: string) {
  const { data, error } = await supabase
    .from('stripe_connections')
    .select('*')
    .eq('stripe_account_id', accountId)
    .maybeSingle();

  if (error) throw error;
  return data as StripeConnection | null;
}
