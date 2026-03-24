/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Provide dummy values if missing to prevent crash during initialization
// The app will show warnings in the console and fail gracefully during API calls
const url = supabaseUrl || 'https://placeholder-url.supabase.co';
const key = supabaseAnonKey || 'placeholder-key';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase configuration is missing. Please check your environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY).');
}

export const supabase = createClient(url, key);
