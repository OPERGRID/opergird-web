import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string) {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("OPERGRID authentication security foundation", () => {
  it("uses server-side password authentication without exposing account-state-specific errors", () => {
    const login = read("src/app/(auth)/login/page.tsx");
    const loginRoute = read("src/app/api/auth/login/route.ts");

    expect(login).toContain('fetch("/api/auth/login"');
    expect(login).not.toContain("signInWithPassword");
    expect(loginRoute).toContain("signInWithPassword");
    expect(login).toContain('autoComplete="username"');
    expect(login).toContain('autoComplete="current-password"');
    expect(loginRoute).toContain(
      "Email atau kata sandi tidak sesuai, atau akun tidak dapat digunakan.",
    );
    expect(loginRoute).not.toContain("User not found");
    expect(loginRoute).not.toContain("Email not confirmed");
  });

  it("protects workspace routes using verified JWT claims", () => {
    const sessionProxy = read("src/lib/supabase/proxy.ts");
    const authorization = read("src/lib/auth/authorization.ts");

    expect(sessionProxy).toContain("supabase.auth.getClaims()");
    expect(authorization).toContain("supabase.auth.getClaims()");
    expect(authorization).not.toContain("supabase.auth.getSession()");
  });

  it("fails closed and redirects unauthenticated protected requests", () => {
    const sessionProxy = read("src/lib/supabase/proxy.ts");

    expect(sessionProxy).toContain("!isAuthenticated && !isAnonymousPath");
    expect(sessionProxy).toContain('redirectTo(request, "/login")');
  });

  it("prevents shared caching of session-aware responses", () => {
    const sessionProxy = read("src/lib/supabase/proxy.ts");
    const loginRoute = read("src/app/api/auth/login/route.ts");
    const captchaRoute = read("src/app/api/auth/captcha/route.ts");

    expect(sessionProxy).toContain('"Cache-Control", "private, no-store, max-age=0"');
    expect(loginRoute).toContain('"Cache-Control": "private, no-store, max-age=0"');
    expect(captchaRoute).toContain('"Cache-Control": "private, no-store, max-age=0"');
  });

  it("keeps anonymous and authenticated-transition routes explicit", () => {
    const sessionProxy = read("src/lib/supabase/proxy.ts");

    expect(sessionProxy).toContain('"/login"');
    expect(sessionProxy).toContain('"/api/health"');
    expect(sessionProxy).toContain('"/api/auth/captcha"');
    expect(sessionProxy).toContain('"/api/auth/login"');
    expect(sessionProxy).toContain('"/mfa/setup"');
    expect(sessionProxy).toContain('"/mfa/challenge"');
    expect(sessionProxy).toContain('"/access-denied"');
  });

  it("applies baseline security headers and removes the framework signature", () => {
    const nextConfig = read("next.config.ts");

    expect(nextConfig).toContain('key: "X-Content-Type-Options"');
    expect(nextConfig).toContain('value: "nosniff"');
    expect(nextConfig).toContain('key: "X-Frame-Options"');
    expect(nextConfig).toContain('value: "DENY"');
    expect(nextConfig).toContain("poweredByHeader: false");
  });

  it("documents mandatory production security layers", () => {
    const security = read("docs/AUTH-SECURITY.md");

    expect(security).toContain("MFA");
    expect(security).toContain("RLS");
    expect(security).toContain("RBAC");
  });
});
