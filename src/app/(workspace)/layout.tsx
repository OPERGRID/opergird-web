import { type ReactNode } from "react";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { getCurrentAuthorizationContext } from "@/lib/auth/authorization";

type WorkspaceLayoutProps = {
  children: ReactNode;
};

export default async function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  const authorization = await getCurrentAuthorizationContext();

  if (!authorization.allowed) {
    if (authorization.reason === "UNAUTHENTICATED") {
      redirect("/login");
    }

    if (authorization.reason === "MFA_REQUIRED") {
      redirect("/login");
    }

    redirect("/access-denied");
  }

  return <AppShell>{children}</AppShell>;
}
