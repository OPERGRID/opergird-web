"use client";

import { AlertTriangle, CircleHelp, X } from "lucide-react";
import { type ReactNode } from "react";
import {
  Dialog as AriaDialog,
  Heading,
  Modal,
  ModalOverlay,
} from "react-aria-components";

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
  dismissable?: boolean;
  icon?: ReactNode;
};

export function Dialog({
  open,
  title,
  description,
  children,
  footer,
  onClose,
  className,
  dismissable = true,
  icon,
}: DialogProps) {
  return (
    <ModalOverlay
      isOpen={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
      isDismissable={dismissable}
      className="og-modal-overlay"
    >
      <Modal className={cn("og-modal", className)}>
        <AriaDialog className="og-dialog">
          <header className="og-dialog__header">
            {icon ? (
              <span className="og-dialog__icon" aria-hidden="true">
                {icon}
              </span>
            ) : null}
            <div className="og-dialog__heading">
              <Heading slot="title" className="og-dialog__title">
                {title}
              </Heading>
              {description ? (
                <p className="og-dialog__description">{description}</p>
              ) : null}
            </div>
            <Button variant="ghost" iconOnly aria-label="Tutup dialog" onClick={onClose}>
              <X size={17} aria-hidden="true" />
            </Button>
          </header>
          {children ? <div className="og-dialog__content">{children}</div> : null}
          {footer ? <footer className="og-dialog__footer">{footer}</footer> : null}
        </AriaDialog>
      </Modal>
    </ModalOverlay>
  );
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Konfirmasi",
  onConfirm,
  onClose,
  danger = false,
  context,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
  danger?: boolean;
  context?: ReactNode;
}) {
  return (
    <Dialog
      open={open}
      title={title}
      description={description}
      onClose={onClose}
      className="og-confirm-dialog"
      icon={danger ? <AlertTriangle size={18} /> : <CircleHelp size={18} />}
      {...(context
        ? { children: <div className="og-confirm-dialog__context">{context}</div> }
        : {})}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button variant={danger ? "danger" : "primary"} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    />
  );
}

export function Drawer({
  open,
  title,
  description,
  children,
  footer,
  onClose,
  side = "right",
}: DialogProps & { side?: "right" | "left" }) {
  return (
    <Dialog
      open={open}
      title={title}
      description={description}
      onClose={onClose}
      footer={footer}
      className={`og-drawer og-drawer--${side}`}
    >
      {children}
    </Dialog>
  );
}

export const Sheet = Drawer;
