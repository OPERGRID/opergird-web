import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { SearchField } from "@/components/ui/search-field";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TableWrap,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

describe("OPERGRID global production component system", () => {
  it("uses one standard button geometry and icon-only square mode", () => {
    render(
      <>
        <Button>Simpan</Button>

        <Button iconOnly aria-label="More">
          +
        </Button>
      </>,
    );

    expect(
      screen.getByRole("button", {
        name: "Simpan",
      }),
    ).toHaveClass("og-button");

    expect(
      screen.getByRole("button", {
        name: "More",
      }),
    ).toHaveClass("og-button--icon-only");
  });

  it("renders global alert and card structures", () => {
    render(
      <>
        <Alert severity="warning" title="Perhatian">
          Review data.
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Master Data</CardTitle>
          </CardHeader>

          <CardContent>Content</CardContent>
        </Card>
      </>,
    );

    expect(screen.getByText("Perhatian").closest(".og-alert")).toHaveClass(
      "og-alert--warning",
    );

    expect(screen.getByText("Master Data").closest(".og-card")).toBeInTheDocument();
  });

  it("renders accessible textarea checkbox and switch", () => {
    render(
      <>
        <Textarea label="Catatan" />

        <Checkbox label="Aktif" />

        <Switch label="Notifikasi" />
      </>,
    );

    expect(screen.getByLabelText("Catatan")).toBeInTheDocument();

    expect(screen.getByLabelText("Aktif")).toHaveAttribute("type", "checkbox");

    expect(
      screen.getByRole("switch", {
        name: "Notifikasi",
      }),
    ).toBeInTheDocument();
  });

  it("renders global search and empty state", () => {
    render(
      <>
        <SearchField placeholder="Cari..." />

        <EmptyState title="Belum ada data" />
      </>,
    );

    expect(screen.getByRole("searchbox")).toBeInTheDocument();

    expect(screen.getByText("Belum ada data")).toBeInTheDocument();
  });

  it("renders global operational table primitives", () => {
    render(
      <TableWrap>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Asset</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>SDKAL-L01</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableWrap>,
    );

    expect(screen.getByRole("table")).toHaveClass("og-table");

    expect(screen.getByText("SDKAL-L01")).toBeInTheDocument();
  });

  it("supports global pagination actions", () => {
    const next = vi.fn();

    render(<Pagination page={1} totalPages={3} onNext={next} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Halaman berikutnya",
      }),
    );

    expect(next).toHaveBeenCalledOnce();
  });
});
