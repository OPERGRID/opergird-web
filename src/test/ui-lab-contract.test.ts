import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const pageSource = readFileSync(
  join(process.cwd(), "src/app/(workspace)/ui-lab/page.tsx"),
  "utf8",
);

describe("OPERGRID UI Laboratory contract", () => {
  it("contains the complete registry categories", () => {
    const categories = [
      "Foundation",
      "Actions",
      "Form & Input",
      "Navigation",
      "Data Display",
      "Feedback & State",
      "Overlay & Floating UI",
      "Layout & Page Structure",
      "Operational & Enterprise",
    ];

    for (const category of categories) {
      expect(pageSource).toContain(category);
    }
  });

  it("uses global production components and never imports features", () => {
    expect(pageSource).toContain("@/components/ui/");

    expect(pageSource).not.toContain("@/features/");
  });

  it("keeps planned components as registry entries instead of fake local implementations", () => {
    expect(pageSource).toContain('status: "planned"');

    expect(pageSource).toContain("Global Component Registry");
  });
});
