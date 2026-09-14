import {
  AlertTriangle,
  Bell,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Database,
  FileText,
  Info,
  MoreHorizontal,
  Search,
  Settings2,
  ShieldCheck,
  Trash2,
  TriangleAlert,
  XCircle,
} from "lucide-react";

import { UiLabDensityControl } from "@/components/lab/ui-lab-density-control";
import { UiLabGlobalComponents } from "@/components/lab/ui-lab-global-components";
import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Surface } from "@/components/ui/surface";

const semanticStates = [
  {
    label: "Neutral",
    severity: "neutral",
    use: "Inactive / reference",
  },
  {
    label: "Info",
    severity: "info",
    use: "Informational",
  },
  {
    label: "Normal",
    severity: "normal",
    use: "Healthy / accepted",
  },
  {
    label: "Warning",
    severity: "warning",
    use: "Attention required",
  },
  {
    label: "High",
    severity: "high",
    use: "High operational risk",
  },
  {
    label: "Critical",
    severity: "critical",
    use: "Immediate action",
  },
] as const;

const colorTokens = [
  {
    label: "Canvas",
    token: "--color-canvas",
    className: "og-ui-lab-color--canvas",
  },
  {
    label: "Surface",
    token: "--color-surface-1",
    className: "og-ui-lab-color--surface",
  },
  {
    label: "Elevated",
    token: "--color-surface-2",
    className: "og-ui-lab-color--surface-2",
  },
  {
    label: "Border",
    token: "--color-border",
    className: "og-ui-lab-color--border",
  },
  {
    label: "Accent",
    token: "--color-accent",
    className: "og-ui-lab-color--accent",
  },
  {
    label: "Normal",
    token: "--color-normal",
    className: "og-ui-lab-color--normal",
  },
  {
    label: "Warning",
    token: "--color-warning",
    className: "og-ui-lab-color--warning",
  },
  {
    label: "Critical",
    token: "--color-critical",
    className: "og-ui-lab-color--critical",
  },
] as const;

const typographyScale = [
  {
    role: "Page title",
    family: "Chakra Petch",
    size: "19 px",
    sample: "Operational Workspace",
    className: "og-ui-lab-type--h1",
  },
  {
    role: "Section title",
    family: "Chakra Petch",
    size: "14.5 px",
    sample: "Functional Location",
    className: "og-ui-lab-type--h2",
  },
  {
    role: "Body / UI",
    family: "Inter",
    size: "12.5 px",
    sample: "Primary operational interface text",
    className: "og-ui-lab-type--body",
  },
  {
    role: "Small",
    family: "Inter",
    size: "11.5 px",
    sample: "Secondary description and table metadata",
    className: "og-ui-lab-type--small",
  },
  {
    role: "Caption",
    family: "Inter",
    size: "10.5 px",
    sample: "Labels, helper text and metadata",
    className: "og-ui-lab-type--caption",
  },
  {
    role: "Operational data",
    family: "JetBrains Mono",
    size: "contextual",
    sample: "150.00 kV Ã‚Â· 346.8 A Ã‚Â· 21:48:07",
    className: "og-ui-lab-type--mono",
  },
] as const;

const spacingScale = [
  ["4", "4 px"],
  ["8", "8 px"],
  ["12", "12 px"],
  ["16", "16 px"],
  ["20", "20 px"],
  ["24", "24 px"],
  ["32", "32 px"],
] as const;

const radiusScale = [
  ["XS", "3 px", "og-ui-lab-radius--xs"],
  ["SM", "5 px", "og-ui-lab-radius--sm"],
  ["MD", "6 px", "og-ui-lab-radius--md"],
  ["LG", "8 px", "og-ui-lab-radius--lg"],
  ["XL", "10 px", "og-ui-lab-radius--xl"],
] as const;

const primitiveRows = [
  ["Button", "Action hierarchy", "Ready"],
  ["Input", "Text / numeric entry", "Ready"],
  ["Select", "Choice / reference", "Ready"],
  ["Badge", "Semantic state", "Ready"],
  ["Surface", "Content grouping", "Ready"],
  ["Divider", "Structural separation", "Ready"],
  ["Skeleton", "Loading placeholder", "Ready"],
] as const;

const tableRows = [
  {
    asset: "SDKAL-BAY-L01",
    location: "GI Sidikalang",
    value: "149.82 kV",
    status: "Normal",
    severity: "normal",
    updated: "2 mnt",
  },
  {
    asset: "TOBA-TRF-01",
    location: "GI Toba",
    value: "82.4 Ã‚Â°C",
    status: "Warning",
    severity: "warning",
    updated: "6 mnt",
  },
  {
    asset: "DSGUL-LA-02",
    location: "GI Dolok Sanggul",
    value: "Critical",
    status: "Critical",
    severity: "critical",
    updated: "11 mnt",
  },
] as const;

export default function UiLabPage() {
  return (
    <PageContainer>
      <section className="og-page-heading">
        <div>
          <h1 className="opergrid-page-title">UI Laboratory</h1>

          <p className="og-page-heading__description">
            Complete global UI reference Ã‚Â· Premium Restraint Ã‚Â· dark / light /
            density review
          </p>
        </div>

        <UiLabDensityControl />
      </section>

      <nav className="og-ui-lab-jumpbar" aria-label="UI Laboratory sections">
        <a href="#typography">Typography</a>
        <a href="#color">Color</a>
        <a href="#status">Status</a>
        <a href="#buttons">Buttons</a>
        <a href="#forms">Forms</a>
        <a href="#surfaces">Surfaces</a>
        <a href="#geometry">Geometry</a>
        <a href="#icons">Icons</a>
        <a href="#data">Data</a>
        <a href="#states">States</a>
      </nav>

      <div className="og-ui-lab-stack">
        <section className="og-ui-lab-kpi-row">
          <Surface className="og-ui-lab-kpi-card">
            <div className="og-ui-lab-kpi-top">
              <span>Page Heading</span>
              <Badge severity="info">Chakra</Badge>
            </div>

            <strong className="og-ui-lab-kpi-value" data-font="mono">
              19
              <small>px</small>
            </strong>

            <p>Compact structural hierarchy</p>
          </Surface>

          <Surface className="og-ui-lab-kpi-card">
            <div className="og-ui-lab-kpi-top">
              <span>Body / UI</span>
              <Badge severity="neutral">Inter</Badge>
            </div>

            <strong className="og-ui-lab-kpi-value" data-font="mono">
              12.5
              <small>px</small>
            </strong>

            <p>Long-session readability</p>
          </Surface>

          <Surface className="og-ui-lab-kpi-card">
            <div className="og-ui-lab-kpi-top">
              <span>Operational Data</span>
              <Badge severity="normal">Mono</Badge>
            </div>

            <strong className="og-ui-lab-kpi-value" data-font="mono">
              150.0
              <small>kV</small>
            </strong>

            <p>Technical scanning</p>
          </Surface>

          <Surface className="og-ui-lab-kpi-card">
            <div className="og-ui-lab-kpi-top">
              <span>Panel Radius</span>
              <Badge severity="neutral">Quiet</Badge>
            </div>

            <strong className="og-ui-lab-kpi-value" data-font="mono">
              8<small>px</small>
            </strong>

            <p>Engineered geometry</p>
          </Surface>
        </section>

        <section id="typography" className="og-ui-lab-anchor">
          <Surface padding="none" className="og-ui-lab-catalog">
            <header className="og-ui-lab-catalog__head">
              <div>
                <span className="og-ui-lab-index">01</span>

                <div>
                  <h2>Typography System</h2>
                  <p>Hierarchy, family role and scale</p>
                </div>
              </div>

              <Badge severity="normal">Locked candidate</Badge>
            </header>

            <div className="og-ui-lab-type-specimen">
              {typographyScale.map((item) => (
                <div className="og-ui-lab-type-specimen__row" key={item.role}>
                  <div className="og-ui-lab-spec-meta">
                    <strong>{item.role}</strong>
                    <span>
                      {item.family} Ã‚Â· {item.size}
                    </span>
                  </div>

                  <div className={item.className}>{item.sample}</div>
                </div>
              ))}
            </div>
          </Surface>
        </section>

        <section id="color" className="og-ui-lab-anchor">
          <Surface padding="none" className="og-ui-lab-catalog">
            <header className="og-ui-lab-catalog__head">
              <div>
                <span className="og-ui-lab-index">02</span>

                <div>
                  <h2>Color System</h2>
                  <p>Neutral surfaces with accent as signal</p>
                </div>
              </div>
            </header>

            <div className="og-ui-lab-color-grid">
              {colorTokens.map((color) => (
                <div key={color.token} className="og-ui-lab-color-card">
                  <span
                    className={`og-ui-lab-color-swatch ${color.className}`}
                    aria-hidden="true"
                  />

                  <div>
                    <strong>{color.label}</strong>
                    <span data-font="mono">{color.token}</span>
                  </div>
                </div>
              ))}
            </div>
          </Surface>
        </section>

        <section id="status" className="og-ui-lab-anchor">
          <Surface padding="none" className="og-ui-lab-catalog">
            <header className="og-ui-lab-catalog__head">
              <div>
                <span className="og-ui-lab-index">03</span>

                <div>
                  <h2>Semantic Status</h2>
                  <p>Global severity vocabulary</p>
                </div>
              </div>
            </header>

            <div className="og-ui-lab-status-grid">
              {semanticStates.map((item) => (
                <div className="og-ui-lab-status-card" key={item.label}>
                  <Badge severity={item.severity}>{item.label}</Badge>

                  <span>{item.use}</span>
                </div>
              ))}
            </div>
          </Surface>
        </section>

        <section id="buttons" className="og-ui-lab-anchor">
          <Surface padding="none" className="og-ui-lab-catalog">
            <header className="og-ui-lab-catalog__head">
              <div>
                <span className="og-ui-lab-index">04</span>

                <div>
                  <h2>Buttons & Actions</h2>
                  <p>Variants, sizes and states</p>
                </div>
              </div>
            </header>

            <div className="og-ui-lab-catalog__body">
              <div className="og-ui-lab-demo-group">
                <span className="og-ui-lab-demo-label">Variants</span>

                <div className="og-ui-lab-control-row">
                  <Button>
                    <Check size={15} strokeWidth={1.8} aria-hidden="true" />
                    Primary
                  </Button>

                  <Button variant="secondary">
                    <Settings2 size={15} strokeWidth={1.8} aria-hidden="true" />
                    Secondary
                  </Button>

                  <Button variant="ghost">
                    <Search size={15} strokeWidth={1.8} aria-hidden="true" />
                    Ghost
                  </Button>

                  <Button variant="danger">
                    <Trash2 size={15} strokeWidth={1.8} aria-hidden="true" />
                    Danger
                  </Button>
                </div>
              </div>

              <Divider />

              <div className="og-ui-lab-demo-group">
                <span className="og-ui-lab-demo-label">Size</span>

                <div className="og-ui-lab-control-row">
                  <Button>Small</Button>
                  <Button>Medium</Button>
                  <Button>Large</Button>
                  <Button iconOnly aria-label="More actions">
                    <MoreHorizontal size={16} aria-hidden="true" />
                  </Button>
                </div>
              </div>

              <Divider />

              <div className="og-ui-lab-demo-group">
                <span className="og-ui-lab-demo-label">State</span>

                <div className="og-ui-lab-control-row">
                  <Button loading>Loading</Button>
                  <Button disabled>Disabled</Button>
                  <Button variant="secondary">
                    <ChevronRight size={15} aria-hidden="true" />
                    With icon
                  </Button>
                </div>
              </div>
            </div>
          </Surface>
        </section>

        <section id="forms" className="og-ui-lab-anchor">
          <Surface padding="none" className="og-ui-lab-catalog">
            <header className="og-ui-lab-catalog__head">
              <div>
                <span className="og-ui-lab-index">05</span>

                <div>
                  <h2>Form Controls</h2>
                  <p>Default, helper, readonly, disabled and invalid</p>
                </div>
              </div>
            </header>

            <div className="og-ui-lab-form-grid og-ui-lab-catalog__body">
              <Input label="Default Input" placeholder="Cari data operasional" />

              <Input
                label="With Description"
                defaultValue="SDKAL-L01"
                description="Kode referensi asset."
              />

              <Input
                label="Readonly"
                defaultValue="150.00 kV"
                readOnly
                data-font="mono"
              />

              <Input label="Disabled" defaultValue="Tidak dapat diubah" disabled />

              <Input label="Required" placeholder="Wajib diisi" required />

              <Input
                label="Invalid"
                defaultValue="SDKAL-001"
                error="Contoh validasi field."
              />

              <Select label="Default Select" defaultValue="150">
                <option value="150">150 kV</option>
                <option value="275">275 kV</option>
              </Select>

              <Select label="Disabled Select" defaultValue="150" disabled>
                <option value="150">150 kV</option>
              </Select>
            </div>
          </Surface>
        </section>

        <section id="surfaces" className="og-ui-lab-anchor">
          <Surface padding="none" className="og-ui-lab-catalog">
            <header className="og-ui-lab-catalog__head">
              <div>
                <span className="og-ui-lab-index">06</span>

                <div>
                  <h2>Surfaces & Elevation</h2>
                  <p>Quiet grouping without card overload</p>
                </div>
              </div>
            </header>

            <div className="og-ui-lab-surface-grid og-ui-lab-catalog__body">
              <Surface>
                <Database size={18} aria-hidden="true" />
                <strong>Default</strong>
                <span>Main grouped content</span>
              </Surface>

              <Surface tone="subtle">
                <FileText size={18} aria-hidden="true" />
                <strong>Subtle</strong>
                <span>Secondary tonal grouping</span>
              </Surface>

              <Surface tone="elevated">
                <Bell size={18} aria-hidden="true" />
                <strong>Elevated</strong>
                <span>Overlay / emphasized region</span>
              </Surface>

              <Surface selected>
                <ShieldCheck size={18} aria-hidden="true" />
                <strong>Selected</strong>
                <span>Restrained accent signal</span>
              </Surface>
            </div>
          </Surface>
        </section>

        <section id="geometry" className="og-ui-lab-anchor">
          <div className="og-ui-lab-panel-row">
            <Surface padding="none" className="og-ui-lab-catalog">
              <header className="og-ui-lab-catalog__head">
                <div>
                  <span className="og-ui-lab-index">07</span>

                  <div>
                    <h2>Spacing Scale</h2>
                    <p>4px base rhythm</p>
                  </div>
                </div>
              </header>

              <div className="og-ui-lab-geometry-list">
                {spacingScale.map(([token, value]) => (
                  <div className="og-ui-lab-spacing-row" key={token}>
                    <span data-font="mono">{token}</span>

                    <span
                      className="og-ui-lab-spacing-bar"
                      style={{
                        width: `${Number(token) * 3}px`,
                      }}
                      aria-hidden="true"
                    />

                    <span data-font="mono">{value}</span>
                  </div>
                ))}
              </div>
            </Surface>

            <Surface padding="none" className="og-ui-lab-catalog">
              <header className="og-ui-lab-catalog__head">
                <div>
                  <span className="og-ui-lab-index">08</span>

                  <div>
                    <h2>Radius Scale</h2>
                    <p>Small engineered geometry</p>
                  </div>
                </div>
              </header>

              <div className="og-ui-lab-radius-grid">
                {radiusScale.map(([label, value, className]) => (
                  <div key={label} className="og-ui-lab-radius-item">
                    <span
                      className={`og-ui-lab-radius-box ${className}`}
                      aria-hidden="true"
                    />

                    <strong>{label}</strong>

                    <span data-font="mono">{value}</span>
                  </div>
                ))}
              </div>
            </Surface>
          </div>
        </section>

        <section id="icons" className="og-ui-lab-anchor">
          <Surface padding="none" className="og-ui-lab-catalog">
            <header className="og-ui-lab-catalog__head">
              <div>
                <span className="og-ui-lab-index">09</span>

                <div>
                  <h2>Iconography</h2>
                  <p>Lucide only Ã‚Â· restrained stroke</p>
                </div>
              </div>
            </header>

            <div className="og-ui-lab-icon-grid">
              <div>
                <Search size={16} strokeWidth={1.8} />
                <strong>16</strong>
                <span>Compact</span>
              </div>

              <div>
                <Settings2 size={18} strokeWidth={1.8} />
                <strong>18</strong>
                <span>Navigation</span>
              </div>

              <div>
                <Bell size={20} strokeWidth={1.8} />
                <strong>20</strong>
                <span>Action</span>
              </div>

              <div>
                <TriangleAlert size={24} strokeWidth={1.8} />
                <strong>24</strong>
                <span>Major state</span>
              </div>
            </div>
          </Surface>
        </section>

        <section id="data" className="og-ui-lab-anchor">
          <Surface padding="none" className="og-ui-lab-catalog">
            <header className="og-ui-lab-catalog__head">
              <div>
                <span className="og-ui-lab-index">10</span>

                <div>
                  <h2>Operational Data Pattern</h2>
                  <p>Dense table with clear numeric scanning</p>
                </div>
              </div>

              <Badge severity="normal">Live sample</Badge>
            </header>

            <div className="og-ui-lab-table-wrap">
              <table className="og-ui-lab-table">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Location</th>
                    <th>Value</th>
                    <th>Status</th>
                    <th className="og-ui-lab-table__right">Updated</th>
                  </tr>
                </thead>

                <tbody>
                  {tableRows.map((row) => (
                    <tr key={row.asset}>
                      <td>
                        <strong data-font="mono">{row.asset}</strong>
                      </td>
                      <td>{row.location}</td>
                      <td data-font="mono">{row.value}</td>
                      <td>
                        <Badge severity={row.severity}>{row.status}</Badge>
                      </td>
                      <td className="og-ui-lab-table__right" data-font="mono">
                        {row.updated}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Surface>
        </section>

        <section id="states" className="og-ui-lab-anchor">
          <Surface padding="none" className="og-ui-lab-catalog">
            <header className="og-ui-lab-catalog__head">
              <div>
                <span className="og-ui-lab-index">11</span>

                <div>
                  <h2>System States</h2>
                  <p>Loading, empty, info and error</p>
                </div>
              </div>
            </header>

            <div className="og-ui-lab-state-grid og-ui-lab-catalog__body">
              <div className="og-ui-lab-state-card">
                <Clock3 size={20} aria-hidden="true" />
                <strong>Loading</strong>
                <div className="og-ui-lab-mini-skeleton">
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </div>
              </div>

              <div className="og-ui-lab-state-card">
                <CircleHelp size={20} aria-hidden="true" />
                <strong>Empty</strong>
                <span>Belum ada data untuk ditampilkan.</span>
                <Button variant="secondary">Tambah data</Button>
              </div>

              <div className="og-ui-lab-state-card">
                <Info size={20} aria-hidden="true" />
                <strong>Information</strong>
                <span>Data terakhir diperbarui 2 menit lalu.</span>
                <Badge severity="info">Synced</Badge>
              </div>

              <div className="og-ui-lab-state-card og-ui-lab-state-card--critical">
                <XCircle size={20} aria-hidden="true" />
                <strong>Error</strong>
                <span>Data gagal dimuat. Coba kembali.</span>
                <Button variant="secondary">Muat ulang</Button>
              </div>
            </div>
          </Surface>
        </section>

        <div className="og-ui-lab-panel-row">
          <Surface padding="none" className="og-ui-lab-catalog">
            <header className="og-ui-lab-catalog__head">
              <div>
                <span className="og-ui-lab-index">12</span>

                <div>
                  <h2>Divider & Hierarchy</h2>
                  <p>Separation only when spacing is insufficient</p>
                </div>
              </div>
            </header>

            <div className="og-ui-lab-divider-demo">
              <span>Section A</span>
              <Divider />
              <span>Section B</span>
              <Divider />
              <span>Section C</span>
            </div>
          </Surface>

          <Surface padding="none" className="og-ui-lab-catalog">
            <header className="og-ui-lab-catalog__head">
              <div>
                <span className="og-ui-lab-index">13</span>

                <div>
                  <h2>Responsive Review</h2>
                  <p>Desktop, tablet and mobile</p>
                </div>
              </div>
            </header>

            <div className="og-ui-lab-breakpoints">
              <div>
                <span data-font="mono">Ã¢â€°Â¥ 1024</span>
                <strong>Desktop</strong>
                <span>Persistent sidebar</span>
              </div>

              <div>
                <span data-font="mono">&lt; 1024</span>
                <strong>Tablet</strong>
                <span>Drawer navigation</span>
              </div>

              <div>
                <span data-font="mono">&lt; 640</span>
                <strong>Mobile</strong>
                <span>Single-column content</span>
              </div>
            </div>
          </Surface>
        </div>

        <Surface padding="none" className="og-ui-lab-catalog">
          <header className="og-ui-lab-catalog__head">
            <div>
              <span className="og-ui-lab-index">14</span>

              <div>
                <h2>Global Primitive Inventory</h2>
                <p>Shared UI foundation available for feature composition</p>
              </div>
            </div>

            <Badge severity="normal">Foundation ready</Badge>
          </header>

          <div className="og-ui-lab-table-wrap">
            <table className="og-ui-lab-table">
              <thead>
                <tr>
                  <th>Primitive</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {primitiveRows.map((row) => (
                  <tr key={row[0]}>
                    <td>
                      <strong>{row[0]}</strong>
                    </td>
                    <td>{row[1]}</td>
                    <td>
                      <Badge severity="normal">{row[2]}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Surface>

        <UiLabGlobalComponents />

        <Surface tone="subtle" className="og-ui-lab-review-note">
          <AlertTriangle size={18} aria-hidden="true" />

          <div>
            <strong>Design System review gate</strong>

            <p>
              Review dark/light theme, three density modes, sidebar expanded/collapsed,
              keyboard focus, and responsive behavior. Global visual issues must be fixed
              here before Feature 02.
            </p>
          </div>
        </Surface>
      </div>
    </PageContainer>
  );
}
