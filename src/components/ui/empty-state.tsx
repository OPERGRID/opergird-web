import { Inbox } from "lucide-react";
import { type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
  compact?: boolean;
  className?: string;
};

export function EmptyState({
  title,
  description,
  action,
  icon,
  compact = false,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn("og-empty-state", compact && "og-empty-state--compact", className)}
    >
      <div className="og-empty-state__icon" aria-hidden="true">
        {icon ?? <Inbox size={22} strokeWidth={1.7} />}
      </div>

      <strong className="og-empty-state__title">{title}</strong>

      {description ? <p className="og-empty-state__description">{description}</p> : null}

      {action ? <div className="og-empty-state__action">{action}</div> : null}
    </div>
  );
}
