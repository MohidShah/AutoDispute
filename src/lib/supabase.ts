import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Export a function to create the client instead of creating it immediately
export function createSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase environment variables');
    return null;
  }
  
  return createClient(supabaseUrl, supabaseAnonKey);
}

// Try to create the client, but don't throw an error if env vars are missing
export const supabase = createSupabaseClient();