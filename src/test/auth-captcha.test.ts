import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string) {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("OPERGRID server Math CAPTCHA", () => {
  it("keeps the CAPTCHA secret server-only and signs challenges with HMAC", () => {
    const captcha = read("src/lib/auth/math-captcha.ts");

    expect(captcha).toContain('import "server-only"');
    expect(captcha).toContain("process.env.OPERGRID_CAPTCHA_SECRET");
    expect(captcha).toContain('createHmac("sha256"');
    expect(captcha).toContain("timingSafeEqual");
  });

  it("stores challenge proof in an HttpOnly SameSite cookie", () => {
    const route = read("src/app/api/auth/captcha/route.ts");

    expect(route).toContain("httpOnly: true");
    expect(route).toContain('sameSite: "strict"');
    expect(route).toContain('"Cache-Control": "private, no-store, max-age=0"');
  });

  it("validates CAPTCHA before password authentication", () => {
    const route = read("src/app/api/auth/login/route.ts");

    const captchaCheck = route.indexOf("verifyMathCaptcha");
    const passwordLogin = route.indexOf("signInWithPassword");

    expect(captchaCheck).toBeGreaterThan(-1);
    expect(passwordLogin).toBeGreaterThan(captchaCheck);
    expect(route).toContain("clearCaptcha");
    expect(route).toContain("isSameOrigin");
  });

  it("routes successful server login into the existing MFA flow", () => {
    const route = read("src/app/api/auth/login/route.ts");

    expect(route).toContain('claimsData.claims.aal === "aal2"');
    expect(route).toContain("supabase.auth.mfa.listFactors()");
    expect(route).toContain('"/mfa/challenge"');
    expect(route).toContain('"/mfa/setup"');
  });

  it("uses the server login endpoint from the browser form", () => {
    const login = read("src/app/(auth)/login/page.tsx");

    expect(login).toContain('fetch("/api/auth/captcha"');
    expect(login).toContain('fetch("/api/auth/login"');
    expect(login).not.toContain("signInWithPassword");
    expect(login).toContain("Verifikasi keamanan");
  });
});
