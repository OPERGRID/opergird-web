import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Surface } from "@/components/ui/surface";

type UserManagementFoundationPageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function UserManagementFoundationPage({
  eyebrow,
  title,
  description,
}: UserManagementFoundationPageProps) {
  return (
    <PageContainer>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={<Badge severity="normal">Foundation v1</Badge>}
      />

      <Surface tone="subtle">
        <h2 className="og-section-title">Foundation ready</h2>
        <p className="og-home-copy">
          Struktur halaman sudah terhubung ke navigasi OPERGRID. Workflow dan data Supabase
          akan diisi pada tahap implementasi User Management berikutnya.
        </p>
      </Surface>
    </PageContainer>
  );
}
