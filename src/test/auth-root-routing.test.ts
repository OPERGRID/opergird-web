import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string) {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("OPERGRID root authentication routing", () => {
  it("treats root as a protected deterministic entry point", () => {
    const proxy = read("src/lib/supabase/proxy.ts");

    expect(proxy).toContain('const ROOT_PATH = "/"');
    expect(proxy).toContain("pathname === ROOT_PATH && !isAuthenticated");
    expect(proxy).toContain('redirectTo(request, "/login")');
  });

  it("does not persist or restore a previous route from browser state", () => {
    const proxy = read("src/lib/supabase/proxy.ts");
    const login = read("src/app/(auth)/login/page.tsx");

    expect(proxy).not.toContain("localStorage");
    expect(proxy).not.toContain("sessionStorage");
    expect(login).not.toContain("localStorage");
    expect(login).not.toContain("sessionStorage");
    expect(proxy).not.toContain("returnTo=");
    expect(proxy).not.toContain("redirectTo=");
  });

  it("keeps workspace authorization fail-closed", () => {
    const layout = read("src/app/(workspace)/layout.tsx");
    const authorization = read("src/lib/auth/authorization.ts");

    expect(layout).toContain("getCurrentAuthorizationContext");
    expect(layout).toContain('redirect("/access-denied")');
    expect(authorization).toContain('"AUTHORIZATION_UNAVAILABLE"');
  });

  it("routes missing authentication and missing AAL2 away from workspace", () => {
    const layout = read("src/app/(workspace)/layout.tsx");

    expect(layout).toContain('"UNAUTHENTICATED"');
    expect(layout).toContain('"MFA_REQUIRED"');
    expect(layout).toContain('redirect("/login")');
  });
});
