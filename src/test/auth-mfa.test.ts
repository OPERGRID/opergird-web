import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string) {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("OPERGRID MFA and AAL2 security", () => {
  it("requires AAL2 before workspace authorization queries", () => {
    const authorization = read("src/lib/auth/authorization.ts");

    const aalCheck = authorization.indexOf('claimsData?.claims?.aal !== "aal2"');
    const profileQuery = authorization.indexOf('.from("user_profile")');

    expect(aalCheck).toBeGreaterThan(-1);
    expect(profileQuery).toBeGreaterThan(aalCheck);
    expect(authorization).toContain('"MFA_REQUIRED"');
  });

  it("routes password login according to authenticator assurance level at the server boundary", () => {
    const login = read("src/app/(auth)/login/page.tsx");
    const loginRoute = read("src/app/api/auth/login/route.ts");

    expect(login).toContain('fetch("/api/auth/login"');
    expect(loginRoute).toContain("supabase.auth.getClaims()");
    expect(loginRoute).toContain('claimsData.claims.aal === "aal2"');
    expect(loginRoute).toContain("supabase.auth.mfa.listFactors()");
    expect(loginRoute).toContain('"/mfa/challenge"');
    expect(loginRoute).toContain('"/mfa/setup"');
  });

  it("implements TOTP enrollment using enroll, challenge and verify", () => {
    const setup = read("src/app/(auth)/mfa/setup/page.tsx");

    expect(setup).toContain('factorType: "totp"');
    expect(setup).toContain("supabase.auth.mfa.enroll");
    expect(setup).toContain("supabase.auth.mfa.challenge");
    expect(setup).toContain("supabase.auth.mfa.verify");
  });

  it("implements the verified-factor challenge flow", () => {
    const challenge = read("src/app/(auth)/mfa/challenge/page.tsx");

    expect(challenge).toContain("supabase.auth.mfa.listFactors()");
    expect(challenge).toContain('factor.status === "verified"');
    expect(challenge).toContain("supabase.auth.mfa.challenge");
    expect(challenge).toContain("supabase.auth.mfa.verify");
  });

  it("keeps MFA routes authenticated but outside workspace AAL2 guard", () => {
    const proxy = read("src/lib/supabase/proxy.ts");

    expect(proxy).toContain('"/mfa/setup"');
    expect(proxy).toContain('"/mfa/challenge"');
    expect(proxy).toContain("AUTH_TRANSITION_PATHS");
    expect(proxy).toContain("!isAuthenticated && !isAnonymousPath");
  });
});
