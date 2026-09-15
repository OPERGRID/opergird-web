"use client";

import { Bell, MoreHorizontal, Plus } from "lucide-react";
import { useState, type ReactNode } from "react";
import { type LegacyColumnDef } from "@tanstack/react-table/legacy";

import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import {
  FilterBar,
  Grid,
  MasterDetail,
  SectionHeader,
  SplitPane,
  Stack,
  StickyActionBar,
} from "@/components/layout/patterns";
import { Toolbar } from "@/components/layout/toolbar";
import { AdvancedDataTable } from "@/components/ui/advanced-data-table";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  CopyAction,
  IconButton,
  SplitButton,
} from "@/components/ui/button-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DatePicker,
  DateRangePicker,
  DateTimePicker,
  TimePicker,
} from "@/components/ui/date-time";
import { Dialog, ConfirmDialog, Drawer } from "@/components/ui/dialog";
import { Avatar, MonoValue, Progress, UserChip } from "@/components/ui/display";
import { Divider } from "@/components/ui/divider";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Accordion,
  ActivityFeed,
  AdvancedFilter,
  ApprovalState,
  AttachmentList,
  BulkActionBar,
  ConflictState,
  DescriptionList,
  EntityHeader,
  ExportAction,
  FilterChips,
  ImportSummary,
  MetadataPanel,
  Metric,
  SavedFilter,
  Timeline,
  TreeView,
  UnsavedChanges,
  WorkflowStep,
} from "@/components/ui/enterprise";
import { FieldGroup } from "@/components/ui/field-group";
import { Dropzone, FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import {
  ModalLoader,
  PageLoader,
  ProgressLoader,
  SectionLoader,
} from "@/components/ui/loading";
import { Breadcrumb, CommandPalette, Stepper } from "@/components/ui/navigation";
import { NumberInput } from "@/components/ui/number-input";
import { DropdownMenu, Popover, Tooltip } from "@/components/ui/overlays";
import { Pagination } from "@/components/ui/pagination";
import { PasswordInput } from "@/components/ui/password-input";
import { RadioGroup } from "@/components/ui/radio-group";
import { SearchField } from "@/components/ui/search-field";
import {
  AsyncSelect,
  MultiSelect,
  SearchableSelect,
  Select,
  type SelectOption,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { ErrorState, NoPermissionState, OfflineState } from "@/components/ui/states";
import { Surface } from "@/components/ui/surface";
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
import { Tabs } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toast } from "@/components/ui/toast";

const sections = [
  "Foundation",
  "Actions",
  "Form & Input",
  "Navigation",
  "Data Display",
  "Feedback & States",
  "Overlay",
  "Layout",
  "Operational / Enterprise",
  "Responsive",
  "Production Page Composition",
] as const;
const selectOptions: SelectOption[] = [
  { value: "150", label: "150 kV", description: "Transmisi" },
  { value: "70", label: "70 kV", description: "Transmisi" },
  { value: "20", label: "20 kV", description: "Distribusi" },
  { value: "500", label: "500 kV", description: "Transmisi" },
  { value: "275", label: "275 kV", description: "Transmisi" },
  { value: "11", label: "11 kV", description: "Distribusi" },
  { value: "10", label: "10 kV", description: "Distribusi" },
  { value: "6", label: "6 kV", description: "Distribusi" },
  { value: "110", label: "110 kV", description: "Transmisi" },
  { value: "66", label: "66 kV", description: "Distribusi" },
  { value: "33", label: "33 kV", description: "Distribusi" },
  { value: "13.8", label: "13.8 kV", description: "Pembangkitan" },
  { value: "3.3", label: "3.3 kV", description: "Pemakaian sendiri" },
  { value: "765", label: "765 kV", description: "Transmisi" },
  { value: "220", label: "220 kV", description: "Transmisi" },
  { value: "132", label: "132 kV", description: "Transmisi" },
  { value: "88", label: "88 kV", description: "Transmisi" },
  { value: "30", label: "30 kV", description: "Distribusi" },
  { value: "22", label: "22 kV", description: "Distribusi" },
  { value: "6.6", label: "6.6 kV", description: "Pembangkitan" },
  { value: "0.4", label: "0.4 kV", description: "Tegangan rendah" },
  { value: "0.23", label: "0.23 kV", description: "Tegangan rendah" },
  { value: "off", label: "Tidak tersedia", disabled: true },
];
type Sample = {
  id: string;
  asset: string;
  location: string;
  voltage: string;
  status: string;
  updated: string;
};
const rows: Sample[] = [
  {
    id: "1",
    asset: "Gardu Induk Bandung",
    location: "BDG-001",
    voltage: "150 kV",
    status: "Normal",
    updated: "14 Sep 2026",
  },
  {
    id: "2",
    asset: "Gardu Induk Cimahi",
    location: "CMH-014",
    voltage: "70 kV",
    status: "Review",
    updated: "13 Sep 2026",
  },
  {
    id: "3",
    asset: "Penyulang Utara",
    location: "BDG-032",
    voltage: "20 kV",
    status: "Normal",
    updated: "12 Sep 2026",
  },
];
const columns: LegacyColumnDef<Sample>[] = [
  { accessorKey: "asset", header: "Aset" },
  { accessorKey: "location", header: "Kode lokasi" },
  { accessorKey: "voltage", header: "Tegangan" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => (
      <Badge severity={getValue() === "Normal" ? "normal" : "warning"}>
        {String(getValue())}
      </Badge>
    ),
  },
  { accessorKey: "updated", header: "Pembaruan" },
  {
    id: "actions",
    header: "Aksi",
    cell: () => (
      <IconButton variant="ghost" aria-label="Aksi baris">
        <MoreHorizontal size={15} aria-hidden="true" />
      </IconButton>
    ),
  },
];
const events = [
  {
    id: "1",
    title: "Data diperbarui",
    detail: "Metadata aset diverifikasi",
    actor: "Operator",
    time: "14 Sep · 09:42",
  },
  { id: "2", title: "Review selesai", actor: "Supervisor", time: "13 Sep · 16:10" },
];

function LabSection({
  title,
  children,
}: {
  title: (typeof sections)[number];
  children: ReactNode;
}) {
  return (
    <section id={title.toLowerCase().replace(/[^a-z]+/g, "-")} className="og-lab-section">
      <header>
        <span className="og-lab-section__index">
          {String(sections.indexOf(title) + 1).padStart(2, "0")}
        </span>
        <h2>{title}</h2>
      </header>
      <div className="og-lab-section__body">{children}</div>
    </section>
  );
}
function Demo({
  label,
  children,
  wide = false,
}: {
  label: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={`og-lab-demo ${wide ? "og-lab-demo--wide" : ""}`}>
      <h3>{label}</h3>
      <div className="og-lab-demo__content">{children}</div>
    </div>
  );
}

export default function UiLabPage() {
  const [density, setDensity] = useState<"comfortable" | "standard" | "compact">(
    "standard",
  );
  const [single, setSingle] = useState<string | null>("150");
  const [multi, setMulti] = useState<string[]>([
    "150",
    "70",
    "275",
    "500",
    "20",
    "11",
    "10",
    "6",
    "110",
    "66",
    "33",
    "13.8",
    "3.3",
    "765",
    "220",
    "132",
    "88",
    "30",
    "22",
    "6.6",
    "0.4",
    "0.23",
  ]);
  const [tab, setTab] = useState("aktif");
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [blocking, setBlocking] = useState(false);
  const [chips, setChips] = useState([
    { id: "status", label: "Status: Normal" },
    { id: "voltage", label: "Tegangan: 150 kV" },
  ]);
  const [files, setFiles] = useState<string[]>([]);
  const [selected, setSelected] = useState(false);

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Internal reference"
        title="OPERGRID UI System"
        description="Production components and design foundations for operational work."
        actions={
          <ButtonGroup label="Kepadatan antarmuka">
            {(["comfortable", "standard", "compact"] as const).map((item) => (
              <Button
                key={item}
                variant={density === item ? "primary" : "secondary"}
                aria-pressed={density === item}
                onClick={() => {
                  setDensity(item);
                  document.documentElement.dataset.density = item;
                }}
              >
                {item}
              </Button>
            ))}
          </ButtonGroup>
        }
      />
      <nav className="og-lab-nav" aria-label="Bagian UI Lab">
        {sections.map((section) => (
          <a key={section} href={`#${section.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
            {section}
          </a>
        ))}
      </nav>
      <div className="og-lab">
        <LabSection title="Foundation">
          <Demo label="Typography">
            <div className="og-lab-type">
              <p className="og-title">Operational workspace</p>
              <p className="og-section-title">Section heading</p>
              <p>Interface text for long-session reading.</p>
              <MonoValue>SDKAL-L01 · 150.00 kV</MonoValue>
            </div>
          </Demo>
          <Demo label="Color roles">
            <div className="og-lab-swatches">
              {[
                "canvas",
                "surface",
                "surface-subtle",
                "border",
                "accent",
                "success",
                "warning",
                "danger",
              ].map((name) => (
                <div key={name}>
                  <span style={{ background: `var(--color-${name})` }} />
                  <small>{name}</small>
                </div>
              ))}
            </div>
          </Demo>
          <Demo label="Spacing, radius, focus, motion, density">
            <p>
              4px rhythm · 6px controls · 8px surfaces · one 36px action/field height ·
              visible keyboard focus · reduced motion
            </p>
          </Demo>
        </LabSection>

        <LabSection title="Actions">
          <Demo label="Button language" wide>
            <div className="og-lab-row">
              <Button>
                <Plus size={15} />
                Primary
              </Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <IconButton variant="secondary" aria-label="More actions">
                <MoreHorizontal size={16} />
              </IconButton>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <CopyAction value="SDKAL-L01" />
            </div>
          </Demo>
          <Demo label="Button group & split action">
            <div className="og-lab-row">
              <ButtonGroup>
                <Button variant="secondary">Hari ini</Button>
                <Button variant="secondary">7 hari</Button>
                <Button variant="secondary">30 hari</Button>
              </ButtonGroup>
              <SplitButton
                label="Jalankan"
                onAction={() => Toast.info("Aksi dimulai")}
                items={[
                  {
                    id: "later",
                    label: "Jadwalkan",
                    onAction: () => Toast.info("Dijadwalkan"),
                  },
                ]}
              />
            </div>
          </Demo>
        </LabSection>

        <LabSection title="Form & Input">
          <Demo label="Text fields">
            <div className="og-lab-form">
              <Input label="Nama aset" placeholder="Masukkan nama" required />
              <NumberInput label="Tegangan" placeholder="150" />
              <PasswordInput label="Kata sandi" />
              <Textarea label="Catatan" placeholder="Tambahkan catatan" />
              <SearchField placeholder="Cari aset" />
              <Input label="Kesalahan" error="Wajib diisi" />
              <Input label="Hanya baca" value="SDKAL-L01" readOnly />
              <Input label="Tidak aktif" value="Nonaktif" disabled />
            </div>
          </Demo>
          <Demo label="Selection controls">
            <div className="og-lab-stack">
              <Checkbox label="Aktif" />
              <RadioGroup
                label="Prioritas"
                name="priority"
                options={[
                  { value: "normal", label: "Normal" },
                  { value: "high", label: "Tinggi" },
                ]}
                defaultValue="normal"
              />
              <Switch label="Notifikasi" />
            </div>
          </Demo>
          <Demo label="Select family" wide>
            <div className="og-lab-form">
              <Select
                label="Single Select"
                options={selectOptions}
                value={single}
                onChange={setSingle}
              />
              <SearchableSelect
                label="Searchable Select / ComboBox"
                options={selectOptions}
                defaultValue="70"
              />
              <MultiSelect
                label="Multi Select — semua nilai tetap terlihat"
                options={selectOptions}
                value={multi}
                onChange={setMulti}
              />
              <AsyncSelect
                label="Async-ready Select"
                options={selectOptions}
                defaultValue="150"
                placeholder="Cari aset eksternal"
                description="Sumber data tersinkron secara asinkron"
                isLoading
                onSearchChange={() => {}}
              />
              <Select
                label="Error state"
                options={selectOptions}
                error="Pilih tegangan yang tersedia"
              />
              <Select
                label="Disabled state"
                options={selectOptions}
                defaultValue="150"
                disabled
              />
            </div>
          </Demo>
          <Demo label="Date & time family" wide>
            <div className="og-lab-form">
              <DatePicker label="Date Picker" />
              <TimePicker label="Time Picker" />
              <DateTimePicker label="DateTime Picker" />
              <DateRangePicker label="Date Range Picker" />
            </div>
          </Demo>
          <Demo label="File input">
            <div className="og-lab-stack">
              <FileUpload
                label="File Upload"
                onFiles={(next) => setFiles(next.map((file) => file.name))}
              />
              <Dropzone
                label="Dropzone"
                onFiles={(next) => setFiles(next.map((file) => file.name))}
              />
              {files.length ? <p>{files.join(", ")}</p> : null}
            </div>
          </Demo>
          <Demo label="Field Group">
            <FieldGroup legend="Data teknis">
              <Input label="Kode lokasi" placeholder="FL-001" />
            </FieldGroup>
          </Demo>
        </LabSection>

        <LabSection title="Navigation">
          <Demo label="Tabs">
            <Tabs
              ariaLabel="Status aset"
              items={[
                { value: "aktif", label: "Aktif" },
                { value: "review", label: "Review" },
                { value: "arsip", label: "Arsip" },
              ]}
              value={tab}
              onValueChange={setTab}
            />
          </Demo>
          <Demo label="Breadcrumb">
            <Breadcrumb
              items={[
                { label: "Workspace", href: "/" },
                { label: "Aset", href: "/" },
                { label: "Detail" },
              ]}
            />
          </Demo>
          <Demo label="Pagination">
            <Pagination
              page={page}
              totalPages={4}
              onPrevious={() => setPage((current) => current - 1)}
              onNext={() => setPage((current) => current + 1)}
            />
          </Demo>
          <Demo label="Stepper">
            <Stepper steps={["Input", "Review", "Selesai"]} current={1} />
          </Demo>
          <Demo label="Dropdown Menu">
            <DropdownMenu
              items={[
                {
                  id: "refresh",
                  label: "Muat ulang",
                  onAction: () => Toast.info("Data dimuat ulang"),
                },
                {
                  id: "export",
                  label: "Ekspor",
                  onAction: () => Toast.info("Ekspor dimulai"),
                },
              ]}
            />
          </Demo>
          <Demo label="Command Palette">
            <Button variant="secondary" onClick={() => setCommandOpen(true)}>
              Buka perintah
            </Button>
            <CommandPalette
              open={commandOpen}
              onClose={() => setCommandOpen(false)}
              commands={[
                {
                  id: "new",
                  label: "Tambah aset",
                  onAction: () => Toast.info("Tambah aset"),
                },
              ]}
            />
          </Demo>
        </LabSection>

        <LabSection title="Data Display">
          <Demo label="Card">
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan aset</CardTitle>
              </CardHeader>
              <CardContent>Informasi padat dalam satu permukaan.</CardContent>
            </Card>
          </Demo>
          <Demo label="Surface & divider">
            <Surface tone="subtle">
              Permukaan sekunder
              <Divider />
              Pemisah konten
            </Surface>
          </Demo>
          <Demo label="Status">
            <div className="og-lab-row">
              <Badge severity="normal">Normal</Badge>
              <Badge severity="warning">Review</Badge>
              <Badge severity="critical">Kritis</Badge>
            </div>
          </Demo>
          <Demo label="Metric">
            <Metric label="Aset aktif" value="1,284" unit="unit" />
          </Demo>
          <Demo label="Key value & description">
            <DescriptionList
              items={[
                { label: "Kode", value: <MonoValue>FL-001</MonoValue> },
                { label: "Wilayah", value: "Bandung" },
              ]}
            />
          </Demo>
          <Demo label="Avatar & user">
            <UserChip name="Operator Grid" detail="Workspace" />
            <Avatar name="Site Lead" />
          </Demo>
          <Demo label="Progress">
            <Progress value={64} label="Progress sinkronisasi" />
          </Demo>
          <Demo label="Table">
            <TableWrap>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Aset</TableHeaderCell>
                    <TableHeaderCell numeric>Tegangan</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Gardu Induk Bandung</TableCell>
                    <TableCell numeric>150 kV</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableWrap>
          </Demo>
          <Demo label="Advanced DataTable" wide>
            <AdvancedDataTable<Sample>
              data={rows}
              columns={columns}
              getRowId={(row) => row.id}
              keyColumnId="asset"
              actionColumnId="actions"
              numericColumnIds={["voltage"]}
              monoColumnIds={["location", "voltage", "updated"]}
              title="Daftar aset"
              pageSize={2}
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
              bulkActions={() => <Button variant="secondary">Ekspor pilihan</Button>}
              toolbarActions={<Button variant="secondary">Ekspor</Button>}
            />
          </Demo>
        </LabSection>

        <LabSection title="Feedback & States">
          <Demo label="Alert">
            <Alert severity="warning" title="Perlu perhatian">
              Periksa data sebelum menyimpan.
            </Alert>
          </Demo>
          <Demo label="Spinner & skeleton">
            <div className="og-lab-stack">
              <Spinner />
              <Skeleton style={{ width: "70%" }} />
              <Skeleton />
            </div>
          </Demo>
          <Demo label="Empty State">
            <EmptyState
              title="Belum ada data"
              description="Data baru akan muncul di sini."
              compact
            />
          </Demo>
          <Demo label="Error State">
            <ErrorState description="Permintaan tidak dapat diselesaikan." />
          </Demo>
          <Demo label="No Permission">
            <NoPermissionState />
          </Demo>
          <Demo label="Offline">
            <OfflineState />
          </Demo>
          <Demo label="Section Loader">
            <SectionLoader />
          </Demo>
          <Demo label="Page Loader">
            <PageLoader />
          </Demo>
          <Demo label="Progress Loader">
            <ProgressLoader value={62} label="Impor data" />
          </Demo>
          <Demo label="Toast">
            <Button
              variant="secondary"
              onClick={() => Toast.success("Perubahan disimpan")}
            >
              Tampilkan toast
            </Button>
          </Demo>
          <Demo label="Modal Loader">
            <Button
              variant="secondary"
              onClick={() => {
                setBlocking(true);
                window.setTimeout(() => setBlocking(false), 1400);
              }}
            >
              Tampilkan loader
            </Button>
            <ModalLoader open={blocking} />
          </Demo>
        </LabSection>

        <LabSection title="Overlay">
          <Demo label="Dialog">
            <Button variant="secondary" onClick={() => setDialogOpen(true)}>
              Buka dialog
            </Button>
            <Dialog
              open={dialogOpen}
              title="Detail perubahan"
              description="Tinjau informasi sebelum melanjutkan."
              onClose={() => setDialogOpen(false)}
              footer={<Button onClick={() => setDialogOpen(false)}>Selesai</Button>}
            >
              Konten dialog menggunakan komponen global.
            </Dialog>
          </Demo>
          <Demo label="Confirm Dialog">
            <Button variant="secondary" onClick={() => setConfirmOpen(true)}>
              Buka konfirmasi
            </Button>
            <ConfirmDialog
              open={confirmOpen}
              title="Hapus functional location?"
              description="Data akan dihapus dari master data dan tidak dapat dipulihkan."
              confirmLabel="Hapus data"
              context={
                <>
                  <span>Functional location</span>
                  <strong>BDG-001 · Gardu Induk Bandung</strong>
                </>
              }
              onClose={() => setConfirmOpen(false)}
              onConfirm={() => setConfirmOpen(false)}
              danger
            />
          </Demo>
          <Demo label="Popover">
            <Popover label="Informasi" triggerLabel="Buka popover">
              Informasi tambahan untuk pekerjaan ini.
            </Popover>
          </Demo>
          <Demo label="Tooltip">
            <Tooltip text="Informasi tambahan">
              <Bell size={17} aria-hidden="true" />
            </Tooltip>
          </Demo>
          <Demo label="Drawer / Sheet">
            <Button variant="secondary" onClick={() => setDrawerOpen(true)}>
              Buka drawer
            </Button>
            <Drawer
              open={drawerOpen}
              title="Detail aset"
              onClose={() => setDrawerOpen(false)}
            >
              Panel detail responsif.
            </Drawer>
          </Demo>
        </LabSection>

        <LabSection title="Layout">
          <Demo label="Page structure" wide>
            <SectionHeader title="Section Header" description="Struktur halaman global" />
            <Toolbar
              leading={<SearchField placeholder="Cari" />}
              trailing={<Button variant="secondary">Filter</Button>}
            />
            <FilterBar>
              <Badge severity="info">FilterBar</Badge>
              <Button variant="ghost">Atur</Button>
            </FilterBar>
          </Demo>
          <Demo label="Grid & Stack">
            <Grid>
              <Surface>Kolom 1</Surface>
              <Surface>Kolom 2</Surface>
            </Grid>
            <Stack>
              <Surface>Baris 1</Surface>
              <Surface>Baris 2</Surface>
            </Stack>
          </Demo>
          <Demo label="SplitPane">
            <SplitPane aside={<Surface>Panel navigasi</Surface>}>
              <Surface>Panel kerja</Surface>
            </SplitPane>
          </Demo>
          <Demo label="MasterDetail">
            <MasterDetail master={<Surface>Daftar</Surface>}>
              <Surface>Detail</Surface>
            </MasterDetail>
          </Demo>
          <Demo label="StickyActionBar">
            <StickyActionBar>
              <Button variant="secondary">Batal</Button>
              <Button>Simpan</Button>
            </StickyActionBar>
          </Demo>
        </LabSection>

        <LabSection title="Operational / Enterprise">
          <Demo label="Filter chips">
            <FilterChips
              items={chips}
              onRemove={(id) =>
                setChips((current) => current.filter((item) => item.id !== id))
              }
              onClear={() => setChips([])}
            />
          </Demo>
          <Demo label="Advanced & saved filter">
            <AdvancedFilter>
              <Input label="Kode" />
            </AdvancedFilter>
            <SavedFilter
              name="Area Bandung"
              onApply={() => Toast.info("Filter diterapkan")}
            />
          </Demo>
          <Demo label="Bulk action & selection">
            <BulkActionBar count={selected ? 2 : 0} onClear={() => setSelected(false)}>
              <Button variant="secondary" onClick={() => setSelected(true)}>
                Pilih 2
              </Button>
            </BulkActionBar>
          </Demo>
          <Demo label="Entity Header">
            <EntityHeader
              headingLevel={4}
              eyebrow="Aset"
              title="Gardu Induk Bandung"
              status={<Badge severity="normal">Normal</Badge>}
            />
          </Demo>
          <Demo label="Metadata Panel">
            <MetadataPanel
              items={[
                { label: "Kode", value: "BDG-001" },
                { label: "Wilayah", value: "Bandung" },
              ]}
            />
          </Demo>
          <Demo label="Timeline & audit">
            <Timeline items={events} />
            <ActivityFeed items={events.slice(0, 1)} />
          </Demo>
          <Demo label="Approval & workflow">
            <ApprovalState label="Menunggu review" severity="warning" />
            <WorkflowStep index={2} title="Verifikasi" detail="Pemeriksaan data" active />
          </Demo>
          <Demo label="Attachments">
            <AttachmentList items={[{ id: "1", name: "Laporan.pdf", size: "240 KB" }]} />
          </Demo>
          <Demo label="Import & export">
            <ImportSummary
              title="Import functional location"
              state="partial"
              total={1280}
              succeeded={1268}
              failed={12}
              duration="00:01:42"
              onViewErrors={() => Toast.info("Log kesalahan dibuka")}
              onExportResult={() => Toast.info("Hasil diekspor")}
            />
            <div className="og-lab-row">
              <ExportAction onExport={() => Toast.info("Ekspor dimulai")} />
            </div>
          </Demo>
          <Demo label="Conflict & unsaved">
            <ConflictState detail="Data telah diubah di tempat lain." />
            <UnsavedChanges
              onSave={() => Toast.success("Disimpan")}
              onDiscard={() => Toast.info("Dibuang")}
            />
          </Demo>
          <Demo label="Tree View">
            <TreeView
              nodes={[
                {
                  id: "west",
                  label: "Wilayah Barat",
                  children: [{ id: "bdg", label: "Bandung" }],
                },
              ]}
            />
          </Demo>
          <Demo label="Accordion & collapsible">
            <Accordion
              items={[
                { id: "one", title: "Rincian teknis", content: "Informasi teknis." },
              ]}
            />
          </Demo>
        </LabSection>

        <LabSection title="Responsive">
          <Demo label="Global behavior" wide>
            <p>
              Kontrol mempertahankan tinggi yang sama. Toolbar dan aksi membungkus,
              formulir turun ke satu kolom, tabel bergulir horizontal, serta dialog dan
              drawer mengikuti viewport.
            </p>
            <div className="og-lab-breakpoints">
              <span>1440+</span>
              <span>1280</span>
              <span>1024</span>
              <span>768</span>
              <span>390</span>
            </div>
          </Demo>
        </LabSection>

        <LabSection title="Production Page Composition">
          <Demo label="Operational record page" wide>
            <Stack>
              <EntityHeader
                headingLevel={4}
                title="Gardu Induk Bandung"
                metadata={["BDG-001", "150 kV"]}
                status={<Badge severity="normal">Active</Badge>}
                hierarchy="UPT Bandung / GI Bandung / Bay Kopel 150 kV"
                aside={
                  <>
                    <strong>Functional Location</strong>
                    <span>Master Data</span>
                  </>
                }
              />
              <Toolbar
                leading={<SearchField placeholder="Cari catatan" />}
                trailing={
                  <>
                    <Button variant="secondary">Export</Button>
                    <Button variant="secondary">Edit Data</Button>
                    <Button>
                      <Plus size={15} />
                      Tambah Data
                    </Button>
                  </>
                }
              />
              <Grid>
                <Surface>
                  <SectionHeader title="Informasi utama" />
                  <DescriptionList
                    items={[
                      { label: "Wilayah", value: "Bandung" },
                      { label: "Kapasitas", value: <MonoValue>150 kV</MonoValue> },
                    ]}
                  />
                </Surface>
                <Surface>
                  <SectionHeader title="Aktivitas terbaru" />
                  <Timeline items={events} />
                </Surface>
              </Grid>
            </Stack>
          </Demo>
        </LabSection>
      </div>
    </PageContainer>
  );
}
