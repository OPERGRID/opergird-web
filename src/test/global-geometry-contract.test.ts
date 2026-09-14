import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("OPERGRID global geometry contract", () => {
  it("does not expose sm md lg button size variants", () => {
    const source = readFileSync(
      join(process.cwd(), "src/components/ui/button.tsx"),
      "utf8",
    );

    expect(source).not.toContain('sm: "og-button--sm"');

    expect(source).not.toContain('md: "og-button--md"');

    expect(source).not.toContain('lg: "og-button--lg"');

    expect(source).toContain("iconOnly");
  });
});
