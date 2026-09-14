"use client";

import { X } from "lucide-react";
import { type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export type DialogProps = {
  open: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  className?: string;
};

export function Dialog({
  open,
  title,
  description,
  children,
  footer,
  onClose,
  className,
}: DialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="og-dialog-backdrop" role="presentation">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="og-dialog-title"
        className={cn("og-dialog", className)}
      >
        <header className="og-dialog__header">
          <div>
            <h2 id="og-dialog-title" className="og-dialog__title">
              {title}
            </h2>

            {description ? <p className="og-dialog__description">{description}</p> : null}
          </div>

          <Button variant="ghost" iconOnly aria-label="Tutup dialog" onClick={onClose}>
            <X size={16} aria-hidden="true" />
          </Button>
        </header>

        {children ? <div className="og-dialog__content">{children}</div> : null}

        {footer ? <footer className="og-dialog__footer">{footer}</footer> : null}
      </section>
    </div>
  );
}
