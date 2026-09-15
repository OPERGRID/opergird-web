import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { type LegacyColumnDef } from "@tanstack/react-table/legacy";

import { AdvancedDataTable } from "@/components/ui/advanced-data-table";
import { Button } from "@/components/ui/button";
import { SplitButton } from "@/components/ui/button-actions";
import {
  DatePicker,
  DateRangePicker,
  DateTimePicker,
  TimePicker,
} from "@/components/ui/date-time";
import { ConfirmDialog, Dialog } from "@/components/ui/dialog";
import { EntityHeader, ImportSummary } from "@/components/ui/enterprise";
import { Toolbar } from "@/components/layout/toolbar";
import { Input } from "@/components/ui/input";
import { MultiSelect, SearchableSelect, Select } from "@/components/ui/select";

const options = [
  { value: "150", label: "150 kV", description: "Transmisi" },
  { value: "70", label: "70 kV", description: "Transmisi" },
  { value: "275", label: "275 kV" },
  { value: "500", label: "500 kV" },
  { value: "20", label: "20 kV" },
  { value: "11", label: "11 kV" },
];

describe("OPERGRID production controls", () => {
  it("keeps loading actions disabled and labels field errors", () => {
    render(
      <>
        <Button loading>Simpan</Button>
        <Input label="Kode lokasi" error="Wajib diisi" />
      </>,
    );
    expect(screen.getByRole("button", { name: "Simpan" })).toBeDisabled();
    expect(screen.getByLabelText("Kode lokasi")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Wajib diisi");
  });

  it("keeps the split action distinct from its keyboard menu", async () => {
    const user = userEvent.setup();
    const primary = vi.fn();
    const alternative = vi.fn();
    render(
      <SplitButton
        label="Jalankan"
        onAction={primary}
        items={[{ id: "later", label: "Jadwalkan", onAction: alternative }]}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Jalankan" }));
    expect(primary).toHaveBeenCalledOnce();
    await user.click(screen.getByRole("button", { name: "Jalankan: aksi lainnya" }));
    await user.click(screen.getByRole("menuitem", { name: "Jadwalkan" }));
    expect(alternative).toHaveBeenCalledOnce();
  });

  it("selects an item and renders its selected hierarchy", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select label="Tegangan" options={options} onChange={onChange} />);
    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("option", { name: /150 kV/ }));
    expect(onChange).toHaveBeenCalledWith("150");
    expect(
      within(screen.getByRole("button", { name: "Tegangan" })).getByText("150 kV"),
    ).toBeInTheDocument();
    const selected = screen.getByLabelText("Nilai terpilih");
    expect(selected).toHaveTextContent("150 kV");
    expect(selected).toHaveTextContent("Transmisi");
  });

  it("filters searchable select options from the keyboard", async () => {
    const user = userEvent.setup();
    render(<SearchableSelect label="Cari tegangan" options={options} />);
    await user.click(screen.getByRole("button"));
    await user.type(screen.getByRole("searchbox"), "70");
    expect(screen.getByRole("option", { name: /70 kV/ })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /150 kV/ })).not.toBeInTheDocument();
  });

  it("uses the same selected value hierarchy in searchable select", () => {
    render(
      <SearchableSelect label="Cari tegangan" options={options} defaultValue="70" />,
    );
    const selected = screen.getByLabelText("Nilai terpilih");
    expect(selected).toHaveTextContent("70 kV");
    expect(selected).toHaveTextContent("Transmisi");
  });

  it("supports multiple selection without closing the shared panel", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<MultiSelect label="Tegangan" options={options} onChange={onChange} />);
    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("option", { name: /150 kV/ }));
    expect(onChange).toHaveBeenCalledWith(["150"]);
    expect(screen.getByRole("option", { name: /70 kV/ })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    await user.click(screen.getByRole("button", { name: "Hapus 150 kV" }));
    expect(onChange).toHaveBeenLastCalledWith([]);
  });

  it("keeps every multi-select item removable inside one trigger without count collapse", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect
        label="Tegangan"
        options={options}
        defaultValue={options.map((option) => option.value)}
      />,
    );
    const selectedGroup = screen.getByRole("group", { name: "Tegangan terpilih" });
    for (const option of options) {
      expect(within(selectedGroup).getByText(option.label)).toBeInTheDocument();
      expect(
        within(selectedGroup).getByRole("button", { name: `Hapus ${option.label}` }),
      ).toBeInTheDocument();
    }
    expect(within(selectedGroup).queryByText(/^\+\d+$/)).not.toBeInTheDocument();
    await user.click(within(selectedGroup).getByRole("button", { name: "Hapus 275 kV" }));
    expect(within(selectedGroup).queryByText("275 kV")).not.toBeInTheDocument();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("renders editable date, time, datetime and range controls with labels", () => {
    render(
      <>
        <DatePicker label="Tanggal" />
        <TimePicker label="Waktu" />
        <DateTimePicker label="Waktu kejadian" />
        <DateRangePicker label="Rentang" />
      </>,
    );
    for (const label of ["Tanggal", "Waktu", "Waktu kejadian", "Rentang"])
      expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getAllByRole("spinbutton").length).toBeGreaterThan(8);
  });

  it("opens and dismisses the date and range calendars with the keyboard", async () => {
    const user = userEvent.setup();
    render(
      <>
        <DatePicker label="Tanggal" />
        <DateRangePicker label="Rentang" />
      </>,
    );
    await user.click(screen.getByRole("button", { name: "Buka kalender Tanggal" }));
    expect(screen.getByRole("grid")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Buka kalender Rentang" }));
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("edits a time segment with arrow keys", async () => {
    const user = userEvent.setup();
    render(<TimePicker label="Waktu" />);
    const hour = screen.getByRole("spinbutton", { name: /hour, Waktu/ });
    await user.click(hour);
    await user.keyboard("{ArrowUp}");
    expect(hour).toHaveAttribute("aria-valuenow");
    expect(hour).not.toHaveAttribute("aria-valuetext", "Empty");
  });

  it("closes a modal with Escape and returns focus", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <>
        <button type="button">Pemicu</button>
        <Dialog open title="Konfirmasi" onClose={onClose}>
          Konten
        </Dialog>
      </>,
    );
    expect(screen.getByRole("dialog", { name: "Konfirmasi" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("presents confirmation context and a destructive action clearly", () => {
    render(
      <ConfirmDialog
        open
        title="Hapus data?"
        description="Data tidak dapat dipulihkan."
        context={<strong>BDG-001</strong>}
        danger
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        confirmLabel="Hapus data"
      />,
    );
    expect(screen.getByRole("dialog", { name: "Hapus data?" })).toHaveTextContent(
      "BDG-001",
    );
    expect(screen.getByRole("button", { name: "Hapus data" })).toBeInTheDocument();
  });

  it("keeps entity identity in the header and all page actions in one toolbar", () => {
    render(
      <>
        <ImportSummary
          state="partial"
          total={100}
          succeeded={96}
          failed={4}
          duration="00:12"
        />
        <EntityHeader
          title="Gardu Induk Bandung"
          metadata={["BDG-001", "150 kV"]}
          status={<span>Active</span>}
          hierarchy="UPT Bandung / GI Bandung"
          aside={
            <>
              <strong>Functional Location</strong>
              <span>Master Data</span>
            </>
          }
        />
        <Toolbar
          leading={<Input label="Cari catatan" />}
          trailing={
            <>
              <Button variant="secondary">Export</Button>
              <Button variant="secondary">Edit Data</Button>
              <Button>Tambah Data</Button>
            </>
          }
        />
      </>,
    );
    expect(screen.getByRole("status")).toHaveTextContent("Selesai sebagian");
    expect(
      screen.getByRole("heading", { level: 1, name: "Gardu Induk Bandung" }),
    ).toBeInTheDocument();
    const header = screen
      .getByRole("heading", { level: 1, name: "Gardu Induk Bandung" })
      .closest("header");
    expect(header).not.toBeNull();
    if (!header) throw new Error("Entity header was not rendered");
    expect(within(header).getByText("Functional Location")).toBeInTheDocument();
    expect(within(header).getByText("Master Data")).toBeInTheDocument();
    expect(within(header).queryByRole("button")).not.toBeInTheDocument();
    const toolbar = screen.getByRole("toolbar");
    for (const action of ["Export", "Edit Data", "Tambah Data"])
      expect(within(toolbar).getByRole("button", { name: action })).toBeInTheDocument();
  });
});

type Row = { id: string; name: string; status: string };
const data: Row[] = [
  { id: "1", name: "Bandung", status: "Normal" },
  { id: "2", name: "Cimahi", status: "Review" },
];
const columns: LegacyColumnDef<Row>[] = [
  { accessorKey: "name", header: "Nama" },
  { accessorKey: "status", header: "Status" },
];

describe("Advanced DataTable", () => {
  it("searches, sorts and selects rows", async () => {
    const user = userEvent.setup();
    render(
      <AdvancedDataTable<Row>
        data={data}
        columns={columns}
        getRowId={(row) => row.id}
        keyColumnId="name"
        title="Lokasi"
      />,
    );
    const region = screen.getByRole("region", {
      name: "Lokasi, gulir horizontal untuk kolom lain",
    });
    expect(within(region).getByText("Bandung")).toBeInTheDocument();
    await user.type(screen.getByRole("searchbox", { name: "Cari data" }), "Cimahi");
    expect(within(region).queryByText("Bandung")).not.toBeInTheDocument();
    expect(within(region).getByText("Cimahi")).toBeInTheDocument();
    fireEvent.click(within(region).getByRole("checkbox", { name: "Pilih baris 2" }));
    expect(screen.getByText("1 dipilih")).toBeInTheDocument();
    await user.clear(screen.getByRole("searchbox", { name: "Cari data" }));
    await user.click(within(region).getByRole("button", { name: "Nama" }));
    expect(within(region).getByRole("columnheader", { name: "Nama" })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
  });

  it("filters rows with the shared select and toggles column visibility", async () => {
    const user = userEvent.setup();
    render(
      <AdvancedDataTable<Row>
        data={data}
        columns={columns}
        getRowId={(row) => row.id}
        filters={[
          {
            columnId: "status",
            label: "Status",
            options: [
              { value: "Normal", label: "Normal" },
              { value: "Review", label: "Review" },
            ],
          },
        ]}
      />,
    );
    await user.click(screen.getAllByRole("button", { name: "Status" })[0]);
    await user.click(screen.getByRole("option", { name: "Review" }));
    expect(screen.queryByText("Bandung")).not.toBeInTheDocument();
    expect(screen.getByText("Cimahi")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Kolom" }));
    await user.click(screen.getByRole("checkbox", { name: "Status" }));
    expect(
      screen.queryByRole("columnheader", { name: "Status" }),
    ).not.toBeInTheDocument();
  });
});
