import type { ReactNode } from "react";

type WorkspaceLayoutProps = {
  children: ReactNode;
};

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  /*
   * Persistent SPA-like AppShell will be added
   * during Global UI Foundation.
   */
  return children;
}
