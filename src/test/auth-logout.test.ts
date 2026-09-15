import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function read(relativePath: string) {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

describe("OPERGRID authenticated user menu", () => {
  it("exposes logout from the workspace topbar", () => {
    const shell = read("src/components/layout/app-shell.tsx");
    const menu = read("src/components/layout/user-menu.tsx");

    expect(shell).toContain('import { UserMenu } from "@/components/layout/user-menu";');
    expect(shell).toContain("<UserMenu />");
    expect(menu).toContain("supabase.auth.signOut()");
    expect(menu).toContain('router.replace("/login")');
    expect(menu).toContain("Keluar dari akun");
  });

  it("provides accessible menu state and escape dismissal", () => {
    const menu = read("src/components/layout/user-menu.tsx");

    expect(menu).toContain('aria-haspopup="menu"');
    expect(menu).toContain("aria-expanded={open}");
    expect(menu).toContain('event.key === "Escape"');
    expect(menu).toContain('role="menuitem"');
  });
});
