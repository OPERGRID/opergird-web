export type NavigationChild = {
  id: string;
  label: string;
  href: string;
  description?: string;
};

export type NavigationItem = {
  id: string;
  label: string;
  href: string;
  description?: string;
  children?: readonly NavigationChild[];
};

export const toolsNavigation: readonly NavigationItem[] = [
  {
    id: "user-management",
    label: "User Management",
    href: "/tools/user-management",
    description: "Identity, role, scope, and access administration",
    children: [
      {
        id: "user-management-overview",
        label: "Overview",
        href: "/tools/user-management",
        description: "User access overview",
      },
      {
        id: "user-management-users",
        label: "Data Pengguna",
        href: "/tools/user-management/users",
        description: "Kelola identitas pengguna",
      },
      {
        id: "user-management-roles",
        label: "Role & Permission",
        href: "/tools/user-management/roles",
        description: "Kelola role dan permission",
      },
      {
        id: "user-management-scope",
        label: "Assignment & Scope",
        href: "/tools/user-management/scope",
        description: "Kelola assignment dan cakupan akses",
      },
      {
        id: "user-management-audit",
        label: "Audit Activity",
        href: "/tools/user-management/audit",
        description: "Tinjau aktivitas administrasi akses",
      },
    ],
  },
] as const;

export function isNavigationItemActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
