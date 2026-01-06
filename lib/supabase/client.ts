import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";

// Use placeholder values during build time (static generation)
// Real values will be used at runtime
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export function createClient() {
  return createSupabaseBrowserClient<Database>(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );
}

// Alias for compatibility
export const createBrowserClient = createClient;
