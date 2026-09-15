"use client";

import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Download,
  FileWarning,
  LoaderCircle,
  Paperclip,
  X,
} from "lucide-react";
import { type ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressLoader } from "@/components/ui/loading";

export type LabelValue = { label: string; value: ReactNode };
export type EventItem = {
  id: string;
  title: string;
  detail?: string;
  time?: string;
  actor?: string;
};

export function FilterChips({
  items,
  onRemove,
  onClear,
}: {
  items: readonly { id: string; label: string }[];
  onRemove: (id: string) => void;
  onClear?: () => void;
}) {
  return (
    <div className="og-filter-chips" role="group" aria-label="Filter aktif">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="og-filter-chip"
          onClick={() => onRemove(item.id)}
          aria-label={`Hapus filter ${item.label}`}
        >
          {item.label}
          <X size={13} aria-hidden="true" />
        </button>
      ))}
      {items.length > 0 && onClear ? (
        <Button variant="ghost" onClick={onClear}>
          Hapus semua
        </Button>
      ) : null}
    </div>
  );
}
export function AdvancedFilter({
  title = "Filter lanjutan",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <details className="og-disclosure">
      <summary>
        {title}
        <ChevronRight size={15} aria-hidden="true" />
      </summary>
      <div className="og-disclosure__content">{children}</div>
    </details>
  );
}
export function SavedFilter({
  name,
  onApply,
  onDelete,
}: {
  name: string;
  onApply: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="og-saved-filter">
      <Button variant="secondary" onClick={onApply}>
        {name}
      </Button>
      {onDelete ? (
        <Button
          variant="ghost"
          iconOnly
          aria-label={`Hapus filter ${name}`}
          onClick={onDelete}
        >
          <X size={15} />
        </Button>
      ) : null}
    </div>
  );
}
export function SelectionCounter({ count }: { count: number }) {
  return (
    <strong className="og-selection-counter" role="status">
      {count} dipilih
    </strong>
  );
}
export function BulkActionBar({
  count,
  children,
  onClear,
}: {
  count: number;
  children: ReactNode;
  onClear?: () => void;
}) {
  return (
    <div className="og-bulk-action-bar">
      <SelectionCounter count={count} />
      {children}
      {onClear ? (
        <Button variant="ghost" onClick={onClear}>
          Batal pilih
        </Button>
      ) : null}
    </div>
  );
}
export function Metric({
  label,
  value,
  unit,
  trend,
}: {
  label: string;
  value: ReactNode;
  unit?: string;
  trend?: ReactNode;
}) {
  return (
    <Card className="og-metric">
      <span>{label}</span>
      <strong className="og-mono">{value}</strong>
      {unit ? <small>{unit}</small> : null}
      {trend ? <div>{trend}</div> : null}
    </Card>
  );
}
export const KPI = Metric;
export function KeyValue({ label, value }: LabelValue) {
  return (
    <div className="og-key-value">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
export function DescriptionList({ items }: { items: readonly LabelValue[] }) {
  return (
    <dl className="og-description-list">
      {items.map((item) => (
        <KeyValue key={item.label} {...item} />
      ))}
    </dl>
  );
}
export function EntityHeader({
  context,
  eyebrow,
  title,
  subtitle,
  metadata,
  hierarchy,
  status,
  actions,
  aside,
  headingLevel = 1,
}: {
  context?: ReactNode;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  metadata?: readonly ReactNode[];
  hierarchy?: ReactNode;
  status?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  headingLevel?: 1 | 2 | 3 | 4;
}) {
  const Heading = `h${headingLevel}` as const;
  return (
    <header className="og-entity-header">
      <div className="og-entity-header__copy">
        {context || eyebrow ? (
          <div className="og-entity-header__eyebrow">{context ?? eyebrow}</div>
        ) : null}
        <Heading>{title}</Heading>
        {metadata?.length || subtitle || status ? (
          <div className="og-entity-header__metadata">
            {(metadata ?? (subtitle ? [subtitle] : [])).map((item, index) => (
              <span key={index}>{item}</span>
            ))}
            {status}
          </div>
        ) : null}
        {hierarchy ? (
          <div className="og-entity-header__hierarchy">{hierarchy}</div>
        ) : null}
      </div>
      {aside ? (
        <aside className="og-entity-header__context" aria-label="Konteks halaman">
          {aside}
        </aside>
      ) : null}
      {actions ? <div className="og-entity-header__actions">{actions}</div> : null}
    </header>
  );
}
export function MetadataPanel({
  title = "Metadata",
  items,
}: {
  title?: string;
  items: readonly LabelValue[];
}) {
  return (
    <aside className="og-panel og-metadata-panel">
      <h2>{title}</h2>
      <DescriptionList items={items} />
    </aside>
  );
}
export function Timeline({ items }: { items: readonly EventItem[] }) {
  return (
    <ol className="og-timeline">
      {items.map((item) => (
        <li key={item.id}>
          <span className="og-timeline__mark" aria-hidden="true" />
          <div>
            <strong>{item.title}</strong>
            {item.detail ? <p>{item.detail}</p> : null}
            <small>{[item.actor, item.time].filter(Boolean).join(" · ")}</small>
          </div>
        </li>
      ))}
    </ol>
  );
}
export const AuditTrail = Timeline;
export const ActivityFeed = Timeline;
export function ApprovalState({
  label,
  severity = "neutral",
  detail,
}: {
  label: string;
  severity?: "neutral" | "info" | "normal" | "warning" | "critical";
  detail?: string;
}) {
  return (
    <div className="og-approval-state">
      <Badge severity={severity}>{label}</Badge>
      {detail ? <span>{detail}</span> : null}
    </div>
  );
}
export function WorkflowStep({
  index,
  title,
  detail,
  active = false,
  complete = false,
}: {
  index: number;
  title: string;
  detail?: string;
  active?: boolean;
  complete?: boolean;
}) {
  return (
    <div className="og-workflow-step" data-active={active} data-complete={complete}>
      <span>{index}</span>
      <div>
        <strong>{title}</strong>
        {detail ? <p>{detail}</p> : null}
      </div>
    </div>
  );
}
export function AttachmentList({
  items,
  onDownload,
}: {
  items: readonly { id: string; name: string; size?: string }[];
  onDownload?: (id: string) => void;
}) {
  return (
    <ul className="og-attachment-list">
      {items.map((item) => (
        <li key={item.id}>
          <Paperclip size={15} aria-hidden="true" />
          <span>{item.name}</span>
          {item.size ? <small>{item.size}</small> : null}
          {onDownload ? (
            <Button
              variant="ghost"
              iconOnly
              aria-label={`Unduh ${item.name}`}
              onClick={() => onDownload(item.id)}
            >
              <Download size={15} />
            </Button>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
export function ImportSummary({
  title = "Import data",
  state = "success",
  total,
  succeeded,
  failed,
  duration,
  onViewErrors,
  onExportResult,
}: {
  title?: string;
  state?: "processing" | "success" | "partial" | "failed";
  total: number;
  succeeded: number;
  failed: number;
  duration?: string;
  onViewErrors?: () => void;
  onExportResult?: () => void;
}) {
  const processed = Math.min(total, succeeded + failed);
  const labels = {
    processing: "Sedang diproses",
    success: "Selesai",
    partial: "Selesai sebagian",
    failed: "Gagal",
  } as const;
  const StateIcon =
    state === "processing"
      ? LoaderCircle
      : state === "success"
        ? CheckCircle2
        : FileWarning;
  return (
    <div className="og-operation-summary" data-state={state}>
      <header className="og-operation-summary__header">
        <span className="og-operation-summary__icon" aria-hidden="true">
          <StateIcon size={17} />
        </span>
        <div role="status">
          <strong>{title}</strong>
          <span>{labels[state]}</span>
        </div>
        {duration ? (
          <span className="og-operation-summary__duration">
            <Clock3 size={13} aria-hidden="true" />
            {duration}
          </span>
        ) : null}
      </header>
      <dl className="og-operation-summary__metrics">
        <KeyValue label="Diproses" value={`${processed} / ${total}`} />
        <KeyValue label="Berhasil" value={succeeded} />
        <KeyValue label="Gagal" value={failed} />
      </dl>
      <ProgressLoader
        value={total ? (processed / total) * 100 : 0}
        label="Progres operasi"
      />
      {onViewErrors || onExportResult ? (
        <footer className="og-operation-summary__actions">
          {onViewErrors && failed > 0 ? (
            <Button variant="ghost" onClick={onViewErrors}>
              Lihat log kesalahan
            </Button>
          ) : null}
          {onExportResult ? (
            <Button variant="secondary" onClick={onExportResult}>
              <Download size={14} aria-hidden="true" />
              Ekspor hasil
            </Button>
          ) : null}
        </footer>
      ) : null}
    </div>
  );
}
export function ExportAction({
  onExport,
  loading = false,
  label = "Ekspor",
}: {
  onExport: () => void;
  loading?: boolean;
  label?: string;
}) {
  return (
    <Button variant="secondary" loading={loading} onClick={onExport}>
      <Download size={15} aria-hidden="true" />
      {label}
    </Button>
  );
}
export function ConflictState({
  title = "Konflik perubahan",
  detail,
  actions,
}: {
  title?: string;
  detail: string;
  actions?: ReactNode;
}) {
  return (
    <div className="og-conflict-state" role="alert">
      <AlertTriangle size={18} aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        <p>{detail}</p>
        {actions}
      </div>
    </div>
  );
}
export function UnsavedChanges({
  onSave,
  onDiscard,
}: {
  onSave: () => void;
  onDiscard: () => void;
}) {
  return (
    <div className="og-unsaved-changes" role="status">
      <span>Perubahan belum disimpan</span>
      <Button variant="ghost" onClick={onDiscard}>
        Buang
      </Button>
      <Button onClick={onSave}>Simpan</Button>
    </div>
  );
}
export type TreeNode = { id: string; label: string; children?: readonly TreeNode[] };
function TreeBranch({ nodes }: { nodes: readonly TreeNode[] }) {
  return (
    <ul className="og-tree">
      {nodes.map((node) => (
        <li key={node.id}>
          {node.children?.length ? (
            <details>
              <summary>{node.label}</summary>
              <TreeBranch nodes={node.children} />
            </details>
          ) : (
            <span>{node.label}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
export function TreeView({
  nodes,
  label = "Hierarki",
}: {
  nodes: readonly TreeNode[];
  label?: string;
}) {
  return (
    <div role="group" aria-label={label}>
      <TreeBranch nodes={nodes} />
    </div>
  );
}
export function Collapsible({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details className="og-disclosure" open={defaultOpen || undefined}>
      <summary>
        {title}
        <ChevronRight size={15} aria-hidden="true" />
      </summary>
      <div className="og-disclosure__content">{children}</div>
    </details>
  );
}
export function Accordion({
  items,
}: {
  items: readonly { id: string; title: string; content: ReactNode }[];
}) {
  return (
    <div className="og-accordion">
      {items.map((item) => (
        <Collapsible key={item.id} title={item.title}>
          {item.content}
        </Collapsible>
      ))}
    </div>
  );
}
