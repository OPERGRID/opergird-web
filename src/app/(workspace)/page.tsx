import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Surface } from "@/components/ui/surface";

export default function WorkspaceHomePage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Operational workspace"
        title="OPERGRID"
        description="Global UI, contextual workflow."
        actions={<Badge severity="normal">Foundation active</Badge>}
      />
      <Surface tone="subtle">
        <h2 className="og-section-title">Industrial Precision + Enterprise Clarity</h2>
        <p className="og-home-copy">
          A shared visual and interaction system for operational work. Feature workflows
          will be introduced when their product scope is agreed.
        </p>
      </Surface>
    </PageContainer>
  );
}
