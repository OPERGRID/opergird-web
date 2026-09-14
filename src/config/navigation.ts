export type NavigationItem = {
  id: string;
  label: string;
  href: string;
  description?: string;
};

export const workspaceNavigation: readonly NavigationItem[] = [
  {
    id: "workspace",
    label: "Workspace",
    href: "/",
    description: "Operational workspace",
  },
  {
    id: "ui-laboratory",
    label: "UI Laboratory",
    href: "/ui-lab",
    description: "Design system validation",
  },
] as const;

export function isNavigationItemActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
