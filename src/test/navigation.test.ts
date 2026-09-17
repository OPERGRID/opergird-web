import { describe, expect, it } from "vitest";

import { isNavigationItemActive, toolsNavigation } from "@/config/navigation";

describe("OPERGRID navigation foundation", () => {
  it("contains the User Management tool and agreed subroutes", () => {
    expect(toolsNavigation).toHaveLength(1);

    const userManagement = toolsNavigation[0];

    expect(userManagement.href).toBe("/tools/user-management");
    expect(userManagement.children?.map((item) => item.href)).toEqual([
      "/tools/user-management",
      "/tools/user-management/users",
      "/tools/user-management/roles",
      "/tools/user-management/scope",
      "/tools/user-management/audit",
    ]);
  });

  it("matches the User Management root and nested routes", () => {
    expect(isNavigationItemActive("/tools/user-management", "/tools/user-management")).toBe(
      true,
    );
    expect(
      isNavigationItemActive("/tools/user-management/users", "/tools/user-management"),
    ).toBe(true);
  });

  it("keeps unrelated routes inactive", () => {
    expect(isNavigationItemActive("/", "/tools/user-management")).toBe(false);
    expect(isNavigationItemActive("/inspection", "/tools/user-management")).toBe(false);
  });

  it("supports exact root matching when root navigation is used", () => {
    expect(isNavigationItemActive("/", "/")).toBe(true);
    expect(isNavigationItemActive("/tools/user-management", "/")).toBe(false);
  });
});
