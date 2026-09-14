import { Check, Search, Settings2, Trash2 } from "lucide-react";

import { UiLabDensityControl } from "@/components/lab/ui-lab-density-control";
import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Surface } from "@/components/ui/surface";

const states = [
  {
    label: "Normal",
    severity: "normal",
  },
  {
    label: "Warning",
    severity: "warning",
  },
  {
    label: "High",
    severity: "high",
  },
  {
    label: "Critical",
    severity: "critical",
  },
] as const;

const primitiveRows = [
  {
    component: "Button",
    role: "Primary action",
    typography: "Inter · 12.5px · 600",
    geometry: "34px · R6",
    status: "Ready",
  },
  {
    component: "Input / Select",
    role: "Operational form",
    typography: "Inter · 12.5px",
    geometry: "34px · R6",
    status: "Ready",
  },
  {
    component: "Badge",
    role: "Semantic status",
    typography: "Inter · 10.5px · 600",
    geometry: "Compact pill",
    status: "Ready",
  },
  {
    component: "Surface",
    role: "Content grouping",
    typography: "Contextual",
    geometry: "R8 · 1px border",
    status: "Ready",
  },
] as const;

export default function UiLabPage() {
  return (
    <PageContainer>
      <section className="og-page-heading">
        <div>
          <h1 className="opergrid-page-title">UI Laboratory</h1>

          <p className="og-page-heading__description">
            Premium restrained visual system · foundation review before feature
            development
          </p>
        </div>

        <UiLabDensityControl />
      </section>

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

            <p>Dense long-session readability</p>
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

            <p>Aligned technical values</p>
          </Surface>

          <Surface className="og-ui-lab-kpi-card">
            <div className="og-ui-lab-kpi-top">
              <span>Panel Radius</span>
              <Badge severity="neutral">Quiet</Badge>
            </div>

            <strong className="og-ui-lab-kpi-value" data-font="mono">
              8<small>px</small>
            </strong>

            <p>Engineered, not consumer rounded</p>
          </Surface>
        </section>

        <section className="og-ui-lab-panel-row">
          <Surface className="og-ui-lab-panel">
            <header className="og-ui-lab-panel__head">
              <div>
                <h2>Typography System</h2>
                <p>Three roles with deliberate hierarchy</p>
              </div>
            </header>

            <div className="og-ui-lab-type-list">
              <div className="og-ui-lab-type-row">
                <span className="og-ui-lab-type-code">01</span>

                <div>
                  <strong data-font="display">Chakra Petch</strong>
                  <p>Product identity, page and section titles</p>
                </div>

                <span className="og-ui-lab-type-meta">14–19 px</span>
              </div>

              <div className="og-ui-lab-type-row">
                <span className="og-ui-lab-type-code">02</span>

                <div>
                  <strong>Inter</strong>
                  <p>Navigation, forms, table, body and actions</p>
                </div>

                <span className="og-ui-lab-type-meta">10.5–14 px</span>
              </div>

              <div className="og-ui-lab-type-row">
                <span className="og-ui-lab-type-code">03</span>

                <div>
                  <strong data-font="mono">JetBrains Mono</strong>
                  <p>KPI, time, code and electrical measurements</p>
                </div>

                <span className="og-ui-lab-type-meta" data-font="mono">
                  150.00 kV
                </span>
              </div>
            </div>
          </Surface>

          <Surface className="og-ui-lab-panel">
            <header className="og-ui-lab-panel__head">
              <div>
                <h2>Semantic Status</h2>
                <p>One visual language across modules</p>
              </div>
            </header>

            <div className="og-ui-lab-status-list">
              {states.map((item) => (
                <div className="og-ui-lab-status-row" key={item.label}>
                  <Badge severity={item.severity}>{item.label}</Badge>

                  <span>Global semantic token</span>
                </div>
              ))}
            </div>
          </Surface>
        </section>

        <section className="og-ui-lab-panel-row">
          <Surface className="og-ui-lab-panel">
            <header className="og-ui-lab-panel__head">
              <div>
                <h2>Action & Form Language</h2>
                <p>Compact controls for operational work</p>
              </div>
            </header>

            <div className="og-ui-lab-control-row">
              <Button>
                <Check size={15} strokeWidth={1.8} aria-hidden="true" />
                Simpan
              </Button>

              <Button variant="secondary">
                <Settings2 size={15} strokeWidth={1.8} aria-hidden="true" />
                Pengaturan
              </Button>

              <Button variant="ghost">
                <Search size={15} strokeWidth={1.8} aria-hidden="true" />
                Cari
              </Button>

              <Button variant="danger">
                <Trash2 size={15} strokeWidth={1.8} aria-hidden="true" />
                Hapus
              </Button>
            </div>

            <div className="og-ui-lab-form-grid">
              <Input
                label="Functional Location"
                placeholder="Cari kode atau nama lokasi"
              />

              <Select label="Voltage Level" defaultValue="150">
                <option value="150">150 kV</option>
                <option value="275">275 kV</option>
              </Select>

              <Input
                label="Technical Value"
                defaultValue="150.00 kV"
                readOnly
                data-font="mono"
              />

              <Input
                label="Invalid State"
                defaultValue="SDKAL-001"
                error="Contoh validasi"
              />
            </div>
          </Surface>

          <Surface className="og-ui-lab-panel">
            <header className="og-ui-lab-panel__head">
              <div>
                <h2>Loading State</h2>
                <p>Quiet feedback without visual noise</p>
              </div>
            </header>

            <div className="og-ui-lab-skeleton">
              <Skeleton className="og-ui-lab-skeleton__title" />
              <Skeleton />
              <Skeleton />
              <Skeleton className="og-ui-lab-skeleton__short" />
            </div>
          </Surface>
        </section>

        <Surface padding="none" className="og-ui-lab-table-panel">
          <header className="og-ui-lab-table-head">
            <div>
              <h2>Global Primitive Inventory</h2>
              <p>Shared foundation used before feature-local composition</p>
            </div>

            <Badge severity="normal">Foundation ready</Badge>
          </header>

          <div className="og-ui-lab-table-wrap">
            <table className="og-ui-lab-table">
              <thead>
                <tr>
                  <th>Primitive</th>
                  <th>Role</th>
                  <th>Typography</th>
                  <th>Geometry</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {primitiveRows.map((row) => (
                  <tr key={row.component}>
                    <td>
                      <strong>{row.component}</strong>
                    </td>
                    <td>{row.role}</td>
                    <td data-font="mono">{row.typography}</td>
                    <td data-font="mono">{row.geometry}</td>
                    <td>
                      <Badge severity="normal">{row.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Surface>
      </div>
    </PageContainer>
  );
}
