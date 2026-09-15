"use client";

import { type ReactNode } from "react";
import { Dialog as AriaDialog, Modal, ModalOverlay } from "react-aria-components";
import { Spinner } from "@/components/ui/spinner";

export function SectionLoader({ label = "Memuat bagian" }: { label?: string }) {
  return (
    <div className="og-section-loader" role="status">
      <Spinner />
      <span>{label}</span>
    </div>
  );
}
export function PageLoader({ label = "Memuat halaman" }: { label?: string }) {
  return (
    <div className="og-page-loader">
      <SectionLoader label={label} />
    </div>
  );
}
export function ModalLoader({
  open,
  label = "Sedang memproses",
}: {
  open: boolean;
  label?: string;
}) {
  return (
    <ModalOverlay isOpen={open} isDismissable={false} className="og-modal-overlay">
      <Modal className="og-modal og-modal--loader">
        <AriaDialog className="og-modal-loader" aria-label={label}>
          <Spinner />
          <strong>{label}</strong>
          <p>Interaksi sementara dinonaktifkan.</p>
        </AriaDialog>
      </Modal>
    </ModalOverlay>
  );
}
export function ProgressLoader({
  value,
  label,
  children,
}: {
  value: number;
  label: string;
  children?: ReactNode;
}) {
  return (
    <div
      className="og-progress-loader"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className="og-progress-loader__copy">
        <strong>{label}</strong>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="og-progress-loader__track">
        <div style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
      {children}
    </div>
  );
}
