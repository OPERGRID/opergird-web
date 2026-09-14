import { describe, expect, it } from "vitest";

import { isNavigationItemActive, workspaceNavigation } from "@/config/navigation";

describe("OPERGRID navigation foundation", () => {
  it("keeps the initial navigation limited to the existing workspace route", () => {
    expect(workspaceNavigation).toHaveLength(1);

    expect(workspaceNavigation[0]).toMatchObject({
      id: "workspace",
      href: "/",
    });
  });

  it("matches the workspace root exactly", () => {
    expect(isNavigationItemActive("/", "/")).toBe(true);

    expect(isNavigationItemActive("/future-module", "/")).toBe(false);
  });

  it("supports nested route matching for future agreed modules", () => {
    expect(isNavigationItemActive("/assets/functional-location", "/assets")).toBe(true);

    expect(isNavigationItemActive("/inspection", "/assets")).toBe(false);
  });
});
