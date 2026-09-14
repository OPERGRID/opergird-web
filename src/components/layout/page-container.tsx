import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export type PageContainerProps = HTMLAttributes<HTMLDivElement>;

export function PageContainer({ className, ...props }: PageContainerProps) {
  return <div className={cn("og-page-container", className)} {...props} />;
}
