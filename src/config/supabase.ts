const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function requirePublicEnvironment(value: string | undefined, key: string): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export function getSupabasePublicConfig() {
  return {
    url: requirePublicEnvironment(supabaseUrl, "NEXT_PUBLIC_SUPABASE_URL"),
    anonKey: requirePublicEnvironment(supabaseAnonKey, "NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  };
}
