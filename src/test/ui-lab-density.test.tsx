import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { UiLabDensityControl } from "@/components/lab/ui-lab-density-control";

describe("OPERGRID UI Laboratory density control", () => {
  afterEach(() => {
    document.documentElement.dataset.density = "standard";
  });

  it("starts with standard density selected", () => {
    render(<UiLabDensityControl />);

    expect(
      screen.getByRole("button", {
        name: "standard",
      }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("updates the global density attribute", () => {
    render(<UiLabDensityControl />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "compact",
      }),
    );

    expect(document.documentElement.dataset.density).toBe("compact");
  });
});
