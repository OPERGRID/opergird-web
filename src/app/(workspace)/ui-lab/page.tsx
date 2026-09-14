"use client";

import {
  Bell,
  Check,
  ChevronDown,
  CircleAlert,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Settings2,
  Trash2,
  Upload,
} from "lucide-react";
import { useState } from "react";

import { UiLabDensityControl } from "@/components/lab/ui-lab-density-control";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Toolbar } from "@/components/layout/toolbar";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog } from "@/components/ui/dialog";
import { Divider } from "@/components/ui/divider";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { SearchField } from "@/components/ui/search-field";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
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

type RegistryStatus = "ready" | "planned";

type RegistryItem = {
  name: string;
  status: RegistryStatus;
};

type RegistryGroup = {
  title: string;
  items: readonly RegistryItem[];
};

const registry: readonly RegistryGroup[] = [
  {
    title: "Foundation",
    items: [
      { name: "Typography", status: "ready" },
      { name: "Color tokens", status: "ready" },
      { name: "Spacing scale", status: "ready" },
      { name: "Radius scale", status: "ready" },
      { name: "Iconography", status: "ready" },
      { name: "Motion", status: "ready" },
      { name: "Focus state", status: "ready" },
      { name: "Density", status: "ready" },
      { name: "Dark / Light theme", status: "ready" },
    ],
  },
  {
    title: "Actions",
    items: [
      { name: "Button", status: "ready" },
      { name: "Icon Button", status: "ready" },
      { name: "Button loading", status: "ready" },
      { name: "Button disabled", status: "ready" },
      { name: "Split Button", status: "planned" },
      { name: "Button Group", status: "planned" },
      { name: "Copy Action", status: "planned" },
    ],
  },
  {
    title: "Form & Input",
    items: [
      { name: "Input", status: "ready" },
      { name: "Select", status: "ready" },
      { name: "Textarea", status: "ready" },
      { name: "Search Field", status: "ready" },
      { name: "Checkbox", status: "ready" },
      { name: "Switch", status: "ready" },
      { name: "Radio Group", status: "planned" },
      { name: "Combobox", status: "planned" },
      { name: "Multi Select", status: "planned" },
      { name: "Autocomplete", status: "planned" },
      { name: "Date Picker", status: "planned" },
      { name: "Date Range Picker", status: "planned" },
      { name: "Time Picker", status: "planned" },
      { name: "Date Time Picker", status: "planned" },
      { name: "Number Input", status: "planned" },
      { name: "Password Input", status: "planned" },
      { name: "File Upload", status: "planned" },
      { name: "Dropzone", status: "planned" },
      { name: "Form Field", status: "planned" },
      { name: "Field Group", status: "planned" },
      { name: "Inline Validation", status: "ready" },
    ],
  },
  {
    title: "Navigation",
    items: [
      { name: "Tabs", status: "ready" },
      { name: "Breadcrumb", status: "planned" },
      { name: "Dropdown Menu", status: "planned" },
      { name: "Context Menu", status: "planned" },
      { name: "Pagination", status: "ready" },
      { name: "Stepper", status: "planned" },
      { name: "Sidebar Navigation", status: "ready" },
      { name: "Command Palette", status: "planned" },
    ],
  },
  {
    title: "Data Display",
    items: [
      { name: "Card", status: "ready" },
      { name: "Surface", status: "ready" },
      { name: "Badge", status: "ready" },
      { name: "Table", status: "ready" },
      { name: "Data Table", status: "planned" },
      { name: "Sortable Header", status: "planned" },
      { name: "Column Visibility", status: "planned" },
      { name: "Row Selection", status: "planned" },
      { name: "Metric / KPI", status: "planned" },
      { name: "Description List", status: "planned" },
      { name: "Key Value", status: "planned" },
      { name: "Avatar", status: "planned" },
      { name: "User Chip", status: "planned" },
      { name: "Progress", status: "planned" },
      { name: "Timeline", status: "planned" },
      { name: "Tree View", status: "planned" },
      { name: "Accordion", status: "planned" },
      { name: "Collapsible", status: "planned" },
      { name: "Code / Mono Value", status: "ready" },
    ],
  },
  {
    title: "Feedback & State",
    items: [
      { name: "Alert", status: "ready" },
      { name: "Toast", status: "planned" },
      { name: "Skeleton", status: "ready" },
      { name: "Spinner", status: "ready" },
      { name: "Empty State", status: "ready" },
      { name: "Error State", status: "planned" },
      { name: "No Permission State", status: "planned" },
      { name: "Offline State", status: "planned" },
      { name: "Loading Overlay", status: "planned" },
      { name: "Inline Status", status: "ready" },
    ],
  },
  {
    title: "Overlay & Floating UI",
    items: [
      { name: "Dialog", status: "ready" },
      { name: "Confirm Dialog", status: "ready" },
      { name: "Drawer", status: "planned" },
      { name: "Sheet", status: "planned" },
      { name: "Popover", status: "planned" },
      { name: "Tooltip", status: "planned" },
      { name: "Dropdown Panel", status: "planned" },
    ],
  },
  {
    title: "Layout & Page Structure",
    items: [
      { name: "App Shell", status: "ready" },
      { name: "Page Container", status: "ready" },
      { name: "Page Header", status: "ready" },
      { name: "Toolbar", status: "ready" },
      { name: "Filter Bar", status: "planned" },
      { name: "Section Header", status: "planned" },
      { name: "Divider", status: "ready" },
      { name: "Grid", status: "planned" },
      { name: "Stack", status: "planned" },
      { name: "Split Pane", status: "planned" },
      { name: "Master Detail", status: "planned" },
      { name: "Sticky Action Bar", status: "planned" },
    ],
  },
  {
    title: "Operational & Enterprise",
    items: [
      { name: "Status Summary", status: "planned" },
      { name: "Filter Chips", status: "planned" },
      { name: "Advanced Filter", status: "planned" },
      { name: "Saved Filter", status: "planned" },
      { name: "Bulk Action Bar", status: "planned" },
      { name: "Selection Counter", status: "planned" },
      { name: "Audit Trail", status: "planned" },
      { name: "Activity Feed", status: "planned" },
      { name: "Approval State", status: "planned" },
      { name: "Workflow Step", status: "planned" },
      { name: "Entity Header", status: "planned" },
      { name: "Metadata Panel", status: "planned" },
      { name: "Attachment List", status: "planned" },
      { name: "Import Summary", status: "planned" },
      { name: "Export Action", status: "planned" },
      { name: "Conflict State", status: "planned" },
      { name: "Unsaved Changes", status: "planned" },
    ],
  },
];

const tabItems = [
  {
    value: "aktif",
    label: "Aktif",
  },
  {
    value: "review",
    label: "Review",
  },
  {
    value: "arsip",
    label: "Arsip",
  },
] as const;

const colors = [
  ["Canvas", "var(--color-canvas)"],
  ["Surface", "var(--color-surface-1)"],
  ["Elevated", "var(--color-surface-2)"],
  ["Border", "var(--color-border)"],
  ["Accent", "var(--color-accent)"],
  ["Normal", "var(--color-normal)"],
  ["Warning", "var(--color-warning)"],
  ["Critical", "var(--color-critical)"],
] as const;

export default function UiLabPage() {
  const [tab, setTab] = useState("aktif");

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Internal design system"
        title="UI Laboratory"
        description="Production component registry for OPERGRID. Every visual primitive shown as Ready must be reused globally instead of recreated inside a feature."
        actions={<UiLabDensityControl />}
      />

      <nav className="og-lab-nav" aria-label="UI Laboratory sections">
        <a href="#registry">Registry</a>
        <a href="#foundation">Foundation</a>
        <a href="#actions">Actions</a>
        <a href="#forms">Forms</a>
        <a href="#feedback">Feedback</a>
        <a href="#data">Data</a>
        <a href="#navigation">Navigation</a>
        <a href="#overlay">Overlay</a>
        <a href="#composition">Composition</a>
      </nav>

      <main className="og-lab">
        <section id="registry" className="og-lab-section">
          <div className="og-lab-section__head">
            <div>
              <span className="og-lab-section__eyebrow">01 Â· Source of truth</span>

              <h2>Global Component Registry</h2>

              <p>
                Lengkap, termasuk komponen yang sudah siap dan komponen enterprise yang
                perlu dibangun.
              </p>
            </div>

            <Badge severity="info">Living contract</Badge>
          </div>

          <div className="og-lab-registry">
            {registry.map((group) => (
              <Card key={group.title} className="og-lab-registry__group">
                <CardHeader>
                  <CardTitle>{group.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="og-lab-registry__items">
                    {group.items.map((item) => (
                      <div key={item.name} className="og-lab-registry__item">
                        <span>{item.name}</span>

                        <Badge severity={item.status === "ready" ? "normal" : "neutral"}>
                          {item.status === "ready" ? "Ready" : "Planned"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="foundation" className="og-lab-section">
          <div className="og-lab-section__head">
            <div>
              <span className="og-lab-section__eyebrow">02 Â· Foundation</span>

              <h2>Visual Foundation</h2>

              <p>
                Typography, token color, radius, spacing, operational data, theme and
                density.
              </p>
            </div>
          </div>

          <div className="og-lab-foundation-grid">
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Typography</CardTitle>

                  <CardDescription>Official type hierarchy.</CardDescription>
                </div>
              </CardHeader>

              <CardContent>
                <div className="og-lab-type-list">
                  <div>
                    <span>Page title</span>
                    <strong className="og-lab-type-page">Operational Workspace</strong>
                  </div>

                  <div>
                    <span>Section title</span>
                    <strong className="og-lab-type-section">Functional Location</strong>
                  </div>

                  <div>
                    <span>Body / UI</span>
                    <p>Primary operational interface text</p>
                  </div>

                  <div>
                    <span>Operational data</span>
                    <code>150.00 kV Â· 346.8 A Â· 21:48:07</code>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Color tokens</CardTitle>

                  <CardDescription>Accent is signal, not decoration.</CardDescription>
                </div>
              </CardHeader>

              <CardContent>
                <div className="og-lab-color-grid">
                  {colors.map(([label, color]) => (
                    <div key={label} className="og-lab-color">
                      <span
                        style={{
                          background: color,
                        }}
                        aria-hidden="true"
                      />

                      <strong>{label}</strong>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geometry</CardTitle>
              </CardHeader>

              <CardContent>
                <dl className="og-lab-values">
                  <div>
                    <dt>Control height</dt>
                    <dd>34 px</dd>
                  </div>

                  <div>
                    <dt>Control radius</dt>
                    <dd>6 px</dd>
                  </div>

                  <div>
                    <dt>Card radius</dt>
                    <dd>8 px</dd>
                  </div>

                  <div>
                    <dt>Dialog radius</dt>
                    <dd>10 px</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Semantic status</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="og-lab-badge-row">
                  <Badge severity="neutral">Neutral</Badge>
                  <Badge severity="info">Info</Badge>
                  <Badge severity="normal">Normal</Badge>
                  <Badge severity="warning">Warning</Badge>
                  <Badge severity="high">High</Badge>
                  <Badge severity="critical">Critical</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="actions" className="og-lab-section">
          <div className="og-lab-section__head">
            <div>
              <span className="og-lab-section__eyebrow">03 Â· Actions</span>

              <h2>Buttons & Actions</h2>

              <p>One geometry. Variants describe purpose, not size.</p>
            </div>
          </div>

          <Card>
            <CardContent>
              <div className="og-lab-demo-row">
                <Button>
                  <Check size={15} aria-hidden="true" />
                  Simpan
                </Button>

                <Button variant="secondary">
                  <RefreshCw size={15} aria-hidden="true" />
                  Refresh
                </Button>

                <Button variant="ghost">
                  <Settings2 size={15} aria-hidden="true" />
                  Pengaturan
                </Button>

                <Button variant="danger">
                  <Trash2 size={15} aria-hidden="true" />
                  Hapus
                </Button>

                <Button variant="secondary" iconOnly aria-label="More actions">
                  <MoreHorizontal size={16} aria-hidden="true" />
                </Button>

                <Button loading>Menyimpan</Button>

                <Button disabled>Disabled</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="forms" className="og-lab-section">
          <div className="og-lab-section__head">
            <div>
              <span className="og-lab-section__eyebrow">04 Â· Data entry</span>

              <h2>Form Controls</h2>

              <p>
                Same geometry, field language and validation behavior across every module.
              </p>
            </div>
          </div>

          <Card>
            <CardContent>
              <div className="og-lab-form-grid">
                <Input label="Nama" placeholder="Masukkan nama" />

                <Select label="Status" defaultValue="aktif">
                  <option value="aktif">Aktif</option>
                  <option value="nonaktif">Nonaktif</option>
                </Select>

                <SearchField placeholder="Cari Functional Location..." />

                <Input label="Kode" defaultValue="SDKAL-L01" readOnly />

                <Input label="Wajib diisi" error="Field ini wajib diisi." required />

                <Textarea label="Catatan" placeholder="Tambahkan catatan operasional" />

                <Checkbox
                  label="Aktif"
                  description="Data dapat digunakan dalam workflow."
                  defaultChecked
                />

                <Switch
                  label="Notifikasi"
                  description="Kirim notifikasi ketika data berubah."
                  defaultChecked
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="feedback" className="og-lab-section">
          <div className="og-lab-section__head">
            <div>
              <span className="og-lab-section__eyebrow">05 Â· Feedback</span>

              <h2>Feedback & System State</h2>
            </div>
          </div>

          <div className="og-lab-two-column">
            <div className="og-lab-stack">
              <Alert severity="info" title="Informasi">
                Data referensi berhasil dimuat.
              </Alert>

              <Alert severity="success" title="Berhasil">
                Perubahan berhasil disimpan.
              </Alert>

              <Alert severity="warning" title="Perhatian">
                Beberapa data perlu diverifikasi.
              </Alert>

              <Alert severity="critical" title="Gagal">
                Data tidak dapat disimpan.
              </Alert>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Loading & Empty</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="og-lab-skeleton">
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </div>

                <Divider />

                <EmptyState
                  compact
                  title="Belum ada data"
                  description="Belum ada data untuk filter yang dipilih."
                  action={
                    <Button>
                      <Plus size={15} aria-hidden="true" />
                      Tambah data
                    </Button>
                  }
                />
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="data" className="og-lab-section">
          <div className="og-lab-section__head">
            <div>
              <span className="og-lab-section__eyebrow">06 Â· Data display</span>

              <h2>Card, Table & Pagination</h2>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Operational Assets</CardTitle>

                <CardDescription>
                  Standard table shell for structured data.
                </CardDescription>
              </div>

              <Badge severity="normal">2 active</Badge>
            </CardHeader>

            <TableWrap>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Asset</TableHeaderCell>
                    <TableHeaderCell>Lokasi</TableHeaderCell>
                    <TableHeaderCell numeric>Tegangan</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Aksi</TableHeaderCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell>SDKAL-L01</TableCell>
                    <TableCell>GI Sidikalang</TableCell>
                    <TableCell numeric>149.82 kV</TableCell>
                    <TableCell>
                      <Badge severity="normal">Normal</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" iconOnly aria-label="Asset actions">
                        <MoreHorizontal size={16} aria-hidden="true" />
                      </Button>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>TOBA-TRF01</TableCell>
                    <TableCell>GI Toba</TableCell>
                    <TableCell numeric>151.04 kV</TableCell>
                    <TableCell>
                      <Badge severity="warning">Review</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" iconOnly aria-label="Transformer actions">
                        <MoreHorizontal size={16} aria-hidden="true" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableWrap>

            <CardFooter>
              <Pagination page={1} totalPages={8} />
            </CardFooter>
          </Card>
        </section>

        <section id="navigation" className="og-lab-section">
          <div className="og-lab-section__head">
            <div>
              <span className="og-lab-section__eyebrow">07 Â· Navigation</span>

              <h2>Tabs & Toolbar</h2>
            </div>
          </div>

          <Card>
            <CardContent>
              <Tabs
                ariaLabel="Sample data state"
                items={tabItems}
                value={tab}
                onValueChange={setTab}
              />

              <div className="og-lab-toolbar-gap" />

              <Toolbar
                leading={
                  <>
                    <SearchField placeholder="Cari data..." />

                    <Button variant="secondary">
                      <Filter size={15} aria-hidden="true" />
                      Filter
                    </Button>
                  </>
                }
                trailing={
                  <>
                    <Button variant="secondary">
                      <Download size={15} aria-hidden="true" />
                      Export
                    </Button>

                    <Button>
                      <Plus size={15} aria-hidden="true" />
                      Tambah
                    </Button>
                  </>
                }
              />
            </CardContent>
          </Card>
        </section>

        <section id="overlay" className="og-lab-section">
          <div className="og-lab-section__head">
            <div>
              <span className="og-lab-section__eyebrow">08 Â· Overlay</span>

              <h2>Dialog</h2>
            </div>
          </div>

          <Card>
            <CardContent>
              <div className="og-lab-demo-row">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setDialogOpen(true);
                  }}
                >
                  <CircleAlert size={15} aria-hidden="true" />
                  Open confirmation
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="composition" className="og-lab-section">
          <div className="og-lab-section__head">
            <div>
              <span className="og-lab-section__eyebrow">09 Â· Page composition</span>

              <h2>Production Page Pattern</h2>

              <p>Example composition only from reusable production components.</p>
            </div>
          </div>

          <Surface className="og-lab-page-preview">
            <PageHeader
              eyebrow="Master Data"
              title="Functional Location"
              description="Kelola struktur referensi aset operasional."
              actions={
                <Button>
                  <Plus size={15} aria-hidden="true" />
                  Tambah
                </Button>
              }
            />

            <Toolbar
              leading={
                <>
                  <SearchField placeholder="Cari functional location..." />

                  <Button variant="secondary">
                    <Filter size={15} aria-hidden="true" />
                    Filter
                  </Button>
                </>
              }
              trailing={
                <>
                  <Button variant="secondary">
                    <Upload size={15} aria-hidden="true" />
                    Import
                  </Button>

                  <Button variant="secondary" iconOnly aria-label="Notifications">
                    <Bell size={16} aria-hidden="true" />
                  </Button>
                </>
              }
            />

            <Card>
              <TableWrap>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Functional Location</TableHeaderCell>
                      <TableHeaderCell>Description</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                      <TableHeaderCell>Action</TableHeaderCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      <TableCell>UPTPSR-SDKAL-L01</TableCell>
                      <TableCell>Line Bay Sidikalang</TableCell>
                      <TableCell>
                        <Badge severity="normal">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" iconOnly aria-label="Open row actions">
                          <ChevronDown size={15} aria-hidden="true" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableWrap>
            </Card>

            <Alert severity="info" title="Pattern rule">
              Feature may change workflow and domain composition, but must reuse global
              primitives.
            </Alert>
          </Surface>
        </section>
      </main>

      <Dialog
        open={dialogOpen}
        title="Konfirmasi perubahan"
        description="Pastikan data yang dipilih sudah benar."
        onClose={() => {
          setDialogOpen(false);
        }}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setDialogOpen(false);
              }}
            >
              Batal
            </Button>

            <Button
              onClick={() => {
                setDialogOpen(false);
              }}
            >
              Konfirmasi
            </Button>
          </>
        }
      >
        <Alert severity="warning" title="Perubahan data">
          Perubahan akan diterapkan ke data operasional.
        </Alert>
      </Dialog>
    </PageContainer>
  );
}
