import { UserManagementFoundationPage } from "@/features/user-management/components/foundation-page";

export default function AuditActivityPage() {
  return (
    <UserManagementFoundationPage
      eyebrow="Tools / User Management"
      title="Audit Activity"
      description="Tinjau aktivitas administrasi identitas, role, permission, dan scope akses."
    />
  );
}
