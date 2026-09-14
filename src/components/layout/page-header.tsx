import { type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export type PageHeaderProps = HTMLAttributes<HTMLElement> & {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
};

export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <header className={cn("og-global-page-header", className)} {...props}>
      <div className="og-global-page-header__copy">
        {eyebrow ? (
          <span className="og-global-page-header__eyebrow">{eyebrow}</span>
        ) : null}

        <h1 className="og-global-page-header__title">{title}</h1>

        {description ? (
          <p className="og-global-page-header__description">{description}</p>
        ) : null}
      </div>

      {actions ? <div className="og-global-page-header__actions">{actions}</div> : null}
    </header>
  );
}
