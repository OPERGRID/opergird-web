import { type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export type ToolbarProps = HTMLAttributes<HTMLDivElement> & {
  leading?: ReactNode;
  trailing?: ReactNode;
};

export function Toolbar({
  leading,
  trailing,
  className,
  children,
  ...props
}: ToolbarProps) {
  return (
    <div
      role="toolbar"
      aria-label="Aksi halaman"
      className={cn("og-toolbar", className)}
      {...props}
    >
      <div className="og-toolbar__leading">{leading ?? children}</div>

      {trailing ? <div className="og-toolbar__trailing">{trailing}</div> : null}
    </div>
  );
}
