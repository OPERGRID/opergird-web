import { UserManagementFoundationPage } from "@/features/user-management/components/foundation-page";

export default function UserManagementOverviewPage() {
  return (
    <UserManagementFoundationPage
      eyebrow="Tools / User Management"
      title="Overview"
      description="Ringkasan identitas, role, permission, assignment, dan scope akses pengguna OPERGRID."
    />
  );
}
