import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PageContainer } from "@/components/layout/page-container";

describe("OPERGRID PageContainer", () => {
  it("provides the shared workspace page container", () => {
    render(<PageContainer data-testid="page">Content</PageContainer>);

    expect(screen.getByTestId("page")).toHaveClass("og-page-container");
  });
});
