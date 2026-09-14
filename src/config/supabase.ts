export type SupabasePublicConfig = {
  url: string;
  anonKey: string;
};

type PublicSupabaseEnvironmentKey =
  "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY";

function readRequiredPublicEnvironment(key: PublicSupabaseEnvironmentKey): string {
  const value = process.env[key]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export function getSupabasePublicConfig(): SupabasePublicConfig {
  return {
    url: readRequiredPublicEnvironment("NEXT_PUBLIC_SUPABASE_URL"),
    anonKey: readRequiredPublicEnvironment("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  };
}
