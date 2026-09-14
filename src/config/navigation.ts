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
] as const;

export function isNavigationItemActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
