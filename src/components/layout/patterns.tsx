import { type CSSProperties, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export function FilterBar({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("og-filter-bar", className)} {...props} />;
}
export function SectionHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="og-section-header">
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {actions}
    </header>
  );
}
export function Grid({
  columns = 2,
  className,
  style,
  ...props
}: HTMLAttributes<HTMLDivElement> & { columns?: number }) {
  return (
    <div
      className={cn("og-grid", className)}
      style={{ ...style, "--og-columns": columns } as CSSProperties}
      {...props}
    />
  );
}
export function Stack({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("og-stack", className)} {...props} />;
}
export function SplitPane({
  aside,
  children,
  className,
}: {
  aside: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("og-split-pane", className)}>
      <aside>{aside}</aside>
      <div>{children}</div>
    </div>
  );
}
export function MasterDetail({
  master,
  children,
  className,
}: {
  master: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("og-master-detail", className)}>
      <aside>{master}</aside>
      <div>{children}</div>
    </div>
  );
}
export function StickyActionBar({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("og-sticky-action-bar", className)} {...props} />;
}
