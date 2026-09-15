import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string) {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("OPERGRID inline MFA login flow", () => {
  it("keeps verified MFA challenge inside the login page", () => {
    const login = read("src/app/(auth)/login/page.tsx");

    expect(login).toContain('type LoginPhase = "credentials" | "mfa"');
    expect(login).toContain('payload.next === "/mfa/challenge"');
    expect(login).toContain('setPhase("mfa")');
    expect(login).toContain("supabase.auth.mfa.listFactors()");
  });

  it("verifies TOTP and requires AAL2 before entering workspace", () => {
    const login = read("src/app/(auth)/login/page.tsx");

    expect(login).toContain("supabase.auth.mfa.challenge");
    expect(login).toContain("supabase.auth.mfa.verify");
    expect(login).toContain('claimsData?.claims?.aal !== "aal2"');
    expect(login).toContain('router.replace("/")');
  });

  it("signs out the AAL1 session before returning to credentials", () => {
    const login = read("src/app/(auth)/login/page.tsx");

    expect(login).toContain("handleBackToCredentials");
    expect(login).toContain("await supabase.auth.signOut()");
    expect(login).toContain('setPhase("credentials")');
  });

  it("keeps first-time MFA enrollment on the dedicated setup route", () => {
    const login = read("src/app/(auth)/login/page.tsx");

    expect(login).toContain('router.replace("/mfa/setup")');
  });

  it("provides motion with reduced-motion fallback", () => {
    const css = read("src/styles/auth.css");

    expect(css).toContain("@keyframes og-auth-flow-enter");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  });
});
