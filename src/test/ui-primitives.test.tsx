import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Surface } from "@/components/ui/surface";

describe("OPERGRID global UI primitives", () => {
  it("renders a primary button with button semantics", () => {
    render(<Button>Simpan</Button>);

    const button = screen.getByRole("button", {
      name: "Simpan",
    });

    expect(button).toHaveClass("og-button--primary");
  });

  it("disables loading buttons and exposes busy state", () => {
    render(<Button loading>Simpan</Button>);

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();

    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("connects input labels and errors accessibly", () => {
    render(<Input label="Gardu Induk" error="Wajib diisi" />);

    const input = screen.getByLabelText("Gardu Induk");

    expect(input).toHaveAttribute("aria-invalid", "true");

    expect(screen.getByRole("alert")).toHaveTextContent("Wajib diisi");
  });

  it("renders a native select with label", () => {
    render(
      <Select label="Tegangan">
        <option value="150">150 kV</option>
      </Select>,
    );

    expect(screen.getByLabelText("Tegangan")).toBeInTheDocument();
  });

  it("maps semantic severity into the badge system", () => {
    render(<Badge severity="critical">Critical</Badge>);

    const badgeText = screen.getByText("Critical");

    const badge = badgeText.parentElement;

    expect(badge).not.toBeNull();

    expect(badge).toHaveClass("og-badge", "og-badge--critical");
  });

  it("renders reusable surfaces and structural primitives", () => {
    const { container } = render(
      <>
        <Surface data-testid="surface" selected>
          Content
        </Surface>

        <Divider />

        <Skeleton data-testid="skeleton" />
      </>,
    );

    expect(screen.getByTestId("surface")).toHaveClass("og-surface--selected");

    expect(screen.getByTestId("skeleton")).toHaveClass("og-skeleton");

    expect(container.querySelector("hr.og-divider")).toBeInTheDocument();
  });
});
