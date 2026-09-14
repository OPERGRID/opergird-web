import { describe, expect, it } from "vitest";

import { isNavigationItemActive, workspaceNavigation } from "@/config/navigation";

describe("OPERGRID navigation foundation", () => {
  it("contains only the workspace and internal UI Laboratory routes", () => {
    expect(workspaceNavigation).toHaveLength(2);

    expect(workspaceNavigation.map((item) => item.href)).toEqual(["/", "/ui-lab"]);
  });

  it("matches the workspace root exactly", () => {
    expect(isNavigationItemActive("/", "/")).toBe(true);

    expect(isNavigationItemActive("/ui-lab", "/")).toBe(false);
  });

  it("matches the UI Laboratory route", () => {
    expect(isNavigationItemActive("/ui-lab", "/ui-lab")).toBe(true);
  });

  it("supports nested route matching for future agreed modules", () => {
    expect(isNavigationItemActive("/assets/functional-location", "/assets")).toBe(true);

    expect(isNavigationItemActive("/inspection", "/assets")).toBe(false);
  });
});
