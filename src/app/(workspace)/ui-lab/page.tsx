import {
  Activity,
  AlertTriangle,
  Check,
  Database,
  Save,
  Search,
  Settings2,
  X,
} from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { UiLabDensityControl } from "@/components/lab/ui-lab-density-control";
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
  },
  {
    label: "Info",
    severity: "info",
  },
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

const colorTokens = [
  {
    label: "Canvas",
    className: "og-ui-lab-swatch--canvas",
  },
  {
    label: "Surface 1",
    className: "og-ui-lab-swatch--surface-1",
  },
  {
    label: "Surface 2",
    className: "og-ui-lab-swatch--surface-2",
  },
  {
    label: "Accent",
    className: "og-ui-lab-swatch--accent",
  },
  {
    label: "Normal",
    className: "og-ui-lab-swatch--normal",
  },
  {
    label: "Warning",
    className: "og-ui-lab-swatch--warning",
  },
  {
    label: "Critical",
    className: "og-ui-lab-swatch--critical",
  },
] as const;

export default function UiLabPage() {
  return (
    <PageContainer>
      <section className="og-page-heading">
        <div>
          <p className="og-page-heading__eyebrow">Design System</p>

          <h1 className="opergrid-page-title">UI Laboratory</h1>

          <p className="og-page-heading__description">
            Ruang validasi visual OPERGRID untuk memastikan typography, warna, primitives,
            density, dan interaction language konsisten sebelum workflow bisnis dibangun.
          </p>
        </div>

        <Badge severity="info">Internal foundation</Badge>
      </section>

      <div className="og-ui-lab-stack">
        <Surface tone="subtle" className="og-ui-lab-intro">
          <div>
            <p className="og-ui-lab-kicker">Design philosophy</p>

            <h2 className="opergrid-section-title">
              Industrial Precision + Enterprise Clarity
            </h2>

            <p className="og-ui-lab-copy">
              Gunakan tombol theme di topbar untuk membandingkan light dan dark mode. Cyan
              tetap berfungsi sebagai signal, bukan sebagai warna latar dominan.
            </p>
          </div>

          <UiLabDensityControl />
        </Surface>

        <section className="og-ui-lab-section">
          <header className="og-ui-lab-section__header">
            <div>
              <p className="og-ui-lab-kicker">01 / Typography</p>

              <h2 className="opergrid-section-title">Typography hierarchy</h2>
            </div>

            <Badge severity="normal">3 font roles</Badge>
          </header>

          <div className="og-ui-lab-grid og-ui-lab-grid--three">
            <Surface>
              <p className="og-ui-lab-font-role">Chakra Petch</p>

              <p
                className="og-ui-lab-font-sample og-ui-lab-font-sample--display"
                data-font="display"
              >
                OPERGRID
              </p>

              <p className="og-ui-lab-copy">
                Product identity, module name, page title, dan structural heading.
              </p>
            </Surface>

            <Surface>
              <p className="og-ui-lab-font-role">Inter</p>

              <p className="og-ui-lab-font-sample">Operational clarity</p>

              <p className="og-ui-lab-copy">
                Body, navigation, forms, description, dan table content.
              </p>
            </Surface>

            <Surface>
              <p className="og-ui-lab-font-role">JetBrains Mono</p>

              <p
                className="og-ui-lab-font-sample og-ui-lab-font-sample--mono"
                data-font="mono"
              >
                150.00 kV
              </p>

              <p className="og-ui-lab-copy">
                KPI, timestamp, asset code, dan operational measurements.
              </p>
            </Surface>
          </div>
        </section>

        <Divider />

        <section className="og-ui-lab-section">
          <header className="og-ui-lab-section__header">
            <div>
              <p className="og-ui-lab-kicker">02 / Color</p>

              <h2 className="opergrid-section-title">Theme tokens</h2>
            </div>
          </header>

          <div className="og-ui-lab-swatches">
            {colorTokens.map((token) => (
              <Surface key={token.label} padding="sm" className="og-ui-lab-swatch-card">
                <span
                  className={`og-ui-lab-swatch ${token.className}`}
                  aria-hidden="true"
                />

                <span className="og-ui-lab-swatch-card__label">{token.label}</span>
              </Surface>
            ))}
          </div>
        </section>

        <Divider />

        <section className="og-ui-lab-section">
          <header className="og-ui-lab-section__header">
            <div>
              <p className="og-ui-lab-kicker">03 / Semantic state</p>

              <h2 className="opergrid-section-title">Status & severity language</h2>
            </div>
          </header>

          <Surface>
            <div className="og-ui-lab-badge-row">
              {semanticStates.map((item) => (
                <Badge key={item.label} severity={item.severity}>
                  {item.label}
                </Badge>
              ))}
            </div>

            <p className="og-ui-lab-copy og-ui-lab-copy--spaced">
              Business status boleh berbeda per module, tetapi severity visual tetap
              memakai vocabulary global yang sama.
            </p>
          </Surface>
        </section>

        <Divider />

        <section className="og-ui-lab-section">
          <header className="og-ui-lab-section__header">
            <div>
              <p className="og-ui-lab-kicker">04 / Buttons</p>

              <h2 className="opergrid-section-title">Action hierarchy</h2>
            </div>
          </header>

          <Surface>
            <div className="og-ui-lab-button-row">
              <Button>
                <Save size={16} strokeWidth={1.8} aria-hidden="true" />
                Simpan
              </Button>

              <Button variant="secondary">
                <Settings2 size={16} strokeWidth={1.8} aria-hidden="true" />
                Pengaturan
              </Button>

              <Button variant="ghost">
                <Search size={16} strokeWidth={1.8} aria-hidden="true" />
                Cari
              </Button>

              <Button variant="danger">
                <X size={16} strokeWidth={1.8} aria-hidden="true" />
                Hapus
              </Button>

              <Button loading>Memproses</Button>

              <Button disabled>Disabled</Button>
            </div>
          </Surface>
        </section>

        <Divider />

        <section className="og-ui-lab-section">
          <header className="og-ui-lab-section__header">
            <div>
              <p className="og-ui-lab-kicker">05 / Forms</p>

              <h2 className="opergrid-section-title">Field states</h2>
            </div>
          </header>

          <div className="og-ui-lab-grid og-ui-lab-grid--two">
            <Surface>
              <div className="og-ui-lab-form-stack">
                <Input
                  label="Functional Location"
                  placeholder="Cari kode atau nama lokasi"
                  description="Contoh field standar untuk master data."
                />

                <Select label="Voltage Level" defaultValue="150">
                  <option value="150">150 kV</option>
                  <option value="275">275 kV</option>
                </Select>
              </div>
            </Surface>

            <Surface>
              <div className="og-ui-lab-form-stack">
                <Input
                  label="Asset Code"
                  defaultValue="SUTT-SDKAL-001"
                  error="Contoh invalid state."
                />

                <Input
                  label="Readonly Value"
                  defaultValue="150.00 kV"
                  readOnly
                  data-font="mono"
                />

                <Input label="Disabled" defaultValue="Tidak dapat diubah" disabled />
              </div>
            </Surface>
          </div>
        </section>

        <Divider />

        <section className="og-ui-lab-section">
          <header className="og-ui-lab-section__header">
            <div>
              <p className="og-ui-lab-kicker">06 / Surfaces</p>

              <h2 className="opergrid-section-title">Panel hierarchy</h2>
            </div>
          </header>

          <div className="og-ui-lab-grid og-ui-lab-grid--three">
            <Surface>
              <div className="og-ui-lab-panel-icon">
                <Database size={20} strokeWidth={1.8} aria-hidden="true" />
              </div>

              <h3 className="og-ui-lab-card-title">Default</h3>

              <p className="og-ui-lab-copy">Standard grouped content surface.</p>
            </Surface>

            <Surface tone="subtle">
              <div className="og-ui-lab-panel-icon">
                <Activity size={20} strokeWidth={1.8} aria-hidden="true" />
              </div>

              <h3 className="og-ui-lab-card-title">Subtle</h3>

              <p className="og-ui-lab-copy">Tonal grouping tanpa elevation dominan.</p>
            </Surface>

            <Surface selected>
              <div className="og-ui-lab-panel-icon">
                <Check size={20} strokeWidth={1.8} aria-hidden="true" />
              </div>

              <h3 className="og-ui-lab-card-title">Selected</h3>

              <p className="og-ui-lab-copy">
                Accent border dengan illumination yang sangat restrained.
              </p>
            </Surface>
          </div>
        </section>

        <Divider />

        <section className="og-ui-lab-section">
          <header className="og-ui-lab-section__header">
            <div>
              <p className="og-ui-lab-kicker">07 / Operational data</p>

              <h2 className="opergrid-section-title">Numeric scanning</h2>
            </div>
          </header>

          <div className="og-ui-lab-grid og-ui-lab-grid--three">
            <Surface>
              <div className="og-ui-lab-metric">
                <span className="og-ui-lab-metric__label">Voltage</span>

                <strong className="og-ui-lab-metric__value" data-font="mono">
                  150.00
                </strong>

                <span className="og-ui-lab-metric__unit">kV</span>
              </div>
            </Surface>

            <Surface>
              <div className="og-ui-lab-metric">
                <span className="og-ui-lab-metric__label">Current</span>

                <strong className="og-ui-lab-metric__value" data-font="mono">
                  346.8
                </strong>

                <span className="og-ui-lab-metric__unit">A</span>
              </div>
            </Surface>

            <Surface>
              <div className="og-ui-lab-metric">
                <span className="og-ui-lab-metric__label">Timestamp</span>

                <strong
                  className="og-ui-lab-metric__value og-ui-lab-metric__value--time"
                  data-font="mono"
                >
                  21:35:08
                </strong>

                <Badge severity="normal">Normal</Badge>
              </div>
            </Surface>
          </div>
        </section>

        <Divider />

        <section className="og-ui-lab-section">
          <header className="og-ui-lab-section__header">
            <div>
              <p className="og-ui-lab-kicker">08 / Loading</p>

              <h2 className="opergrid-section-title">Skeleton language</h2>
            </div>
          </header>

          <Surface>
            <div className="og-ui-lab-skeleton">
              <Skeleton className="og-ui-lab-skeleton__avatar" />

              <div className="og-ui-lab-skeleton__copy">
                <Skeleton className="og-ui-lab-skeleton__title" />
                <Skeleton className="og-ui-lab-skeleton__line" />
                <Skeleton className="og-ui-lab-skeleton__line og-ui-lab-skeleton__line--short" />
              </div>
            </div>
          </Surface>
        </section>

        <Surface tone="subtle" className="og-ui-lab-review">
          <AlertTriangle size={20} strokeWidth={1.8} aria-hidden="true" />

          <div>
            <h2 className="og-ui-lab-review__title">Visual review checkpoint</h2>

            <p className="og-ui-lab-copy">
              Evaluasi halaman ini pada dark mode, light mode, sidebar expanded/collapsed,
              serta density comfortable, standard, dan compact. Perubahan visual global
              harus diselesaikan di Design System sebelum masuk ke feature pertama.
            </p>
          </div>
        </Surface>
      </div>
    </PageContainer>
  );
}
