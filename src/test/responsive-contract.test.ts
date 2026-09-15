import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("responsive UI contract", () => {
  it("keeps global viewport rules and intentional table scrolling", () => {
    const system = readFileSync(join(process.cwd(), "src/styles/system.css"), "utf8");
    const shell = readFileSync(join(process.cwd(), "src/styles/shell.css"), "utf8");
    const components = readFileSync(
      join(process.cwd(), "src/styles/components.css"),
      "utf8",
    );
    expect(system).toContain("max-width: 40rem");
    expect(shell).toContain("max-width: 63.999rem");
    expect(components).toContain("overflow: auto");
    expect(components).toContain("max-height: calc(100dvh - 2rem)");
  });
});
