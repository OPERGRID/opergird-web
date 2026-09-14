import { createBrowserClient } from "@supabase/ssr";

import { getSupabasePublicConfig } from "@/config/supabase";

export function createSupabaseBrowserClient() {
  const { url, anonKey } = getSupabasePublicConfig();

  return createBrowserClient(url, anonKey);
}
