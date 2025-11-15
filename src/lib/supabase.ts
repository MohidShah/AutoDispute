import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

<<<<<<< HEAD
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
=======
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
