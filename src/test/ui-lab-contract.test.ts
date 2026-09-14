import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("OPERGRID complete UI Laboratory contract", () => {
  const page = readFileSync(
    join(process.cwd(), "src/app/(workspace)/ui-lab/page.tsx"),
    "utf8",
  );

  it("contains all global visual review sections", () => {
    const requiredSections = [
      "Typography System",
      "Color System",
      "Semantic Status",
      "Buttons & Actions",
      "Form Controls",
      "Surfaces & Elevation",
      "Spacing Scale",
      "Radius Scale",
      "Iconography",
      "Operational Data Pattern",
      "System States",
      "Divider & Hierarchy",
      "Responsive Review",
      "Global Primitive Inventory",
    ];

    for (const section of requiredSections) {
      expect(page).toContain(section);
    }
  });

  it("does not introduce business feature workflow", () => {
    expect(page).not.toContain('from "@/features/');
  });
});
