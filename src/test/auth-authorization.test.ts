import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string) {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("OPERGRID authorization guard", () => {
  it("treats authentication and authorization as separate controls", () => {
    const authorization = read("src/lib/auth/authorization.ts");

    expect(authorization).toContain("supabase.auth.getClaims()");
    expect(authorization).toContain('account_status.toUpperCase() !== "ACTIVE"');
    expect(authorization).toContain("isAssignmentCurrentlyValid");
    expect(authorization).toContain('.eq("is_active", true)');
  });

  it("fails closed when authorization prerequisites are unavailable", () => {
    const authorization = read("src/lib/auth/authorization.ts");

    expect(authorization).toContain('"PROFILE_MISSING"');
    expect(authorization).toContain('"ACCOUNT_INACTIVE"');
    expect(authorization).toContain('"NO_ACTIVE_ASSIGNMENT"');
    expect(authorization).toContain('"MISSING_PLATFORM_ACCESS"');
    expect(authorization).toContain('"AUTHORIZATION_UNAVAILABLE"');
  });

  it("does not use getSession for server authorization", () => {
    const authorization = read("src/lib/auth/authorization.ts");

    expect(authorization).not.toContain("supabase.auth.getSession()");
  });

  it("enforces role-derived PLATFORM.ACCESS permission", () => {
    const authorization = read("src/lib/auth/authorization.ts");

    expect(authorization).toContain('platformAccess: "PLATFORM.ACCESS"');
    expect(authorization).toContain('.from("access_role_permission")');
    expect(authorization).toContain('.from("access_permission")');
    expect(authorization).toContain(
      "permissions.includes(OPERGRID_PERMISSIONS.platformAccess)",
    );
  });

  it("provides a reusable permission helper", () => {
    const authorization = read("src/lib/auth/authorization.ts");

    expect(authorization).toContain("export function hasOpergridPermission");
    expect(authorization).toContain("authorization.permissions.includes(permission)");
  });

  it("guards the workspace at the server layout boundary", () => {
    const layout = read("src/app/(workspace)/layout.tsx");

    expect(layout).toContain("getCurrentAuthorizationContext");
    expect(layout).toContain('redirect("/access-denied")');
  });

  it("provides an explicit access denied route and safe sign-out", () => {
    const denied = read("src/app/(auth)/access-denied/page.tsx");
    const proxy = read("src/lib/supabase/proxy.ts");

    expect(denied).toContain("supabase.auth.signOut()");
    expect(proxy).toContain('"/access-denied"');
  });
});
