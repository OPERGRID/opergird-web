import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Surface } from "@/components/ui/surface";

export default function WorkspaceHomePage() {
  return (
    <PageContainer>
      <section className="og-page-heading">
        <div>
          <p className="og-page-heading__eyebrow">Workspace</p>

          <h1 className="opergrid-page-title">OPERGRID</h1>

          <p className="og-page-heading__description">
            Operational Grid Management Platform
          </p>
        </div>

        <Badge severity="normal">Foundation active</Badge>
      </section>

      <Surface tone="subtle" className="og-foundation-panel">
        <p className="og-foundation-panel__label">Global UI Foundation</p>

        <h2 className="opergrid-section-title">
          Industrial Precision + Enterprise Clarity
        </h2>

        <p className="og-foundation-panel__copy">
          Persistent workspace shell is active. Feature workflows will be introduced only
          after the shared UI system has been visually validated.
        </p>
      </Surface>
    </PageContainer>
  );
}
