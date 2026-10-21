import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client
// Note: These env vars should be populated via .env.local during local development
// and via deployment settings in production.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
