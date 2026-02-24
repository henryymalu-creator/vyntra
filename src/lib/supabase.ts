import { createBrowserClient } from "@supabase/ssr";

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null;

export const getSupabaseClient = () => {
  if (supabaseClient) {
    return supabaseClient;
  }

  if (typeof window === "undefined") {
    return null;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  supabaseClient = createBrowserClient(url, anonKey);
  return supabaseClient;
};
