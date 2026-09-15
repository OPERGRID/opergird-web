"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";

import { Dialog } from "@/components/ui/dialog";
import { SearchField } from "@/components/ui/search-field";

export function Breadcrumb({
  items,
}: {
  items: readonly { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="og-breadcrumb">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {index > 0 ? <ChevronRight size={14} aria-hidden="true" /> : null}
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
export function Stepper({
  steps,
  current,
}: {
  steps: readonly string[];
  current: number;
}) {
  return (
    <ol className="og-stepper" aria-label="Tahapan">
      {steps.map((step, index) => (
        <li
          key={step}
          aria-current={index === current ? "step" : undefined}
          data-complete={index < current}
        >
          <span>{index + 1}</span>
          {step}
        </li>
      ))}
    </ol>
  );
}
export function CommandPalette({
  open,
  onClose,
  commands,
}: {
  open: boolean;
  onClose: () => void;
  commands: readonly {
    id: string;
    label: string;
    onAction: () => void;
    icon?: ReactNode;
  }[];
}) {
  const [query, setQuery] = useState("");
  const filtered = commands.filter((command) =>
    command.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );
  return (
    <Dialog open={open} title="Perintah" onClose={onClose}>
      <SearchField
        autoFocus
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onClear={() => setQuery("")}
        placeholder="Cari perintah"
        aria-label="Cari perintah"
      />
      <div className="og-command-list" aria-label="Perintah">
        {filtered.map((command) => (
          <button
            key={command.id}
            type="button"
            onClick={() => {
              command.onAction();
              onClose();
            }}
          >
            {command.icon}
            {command.label}
          </button>
        ))}
        {filtered.length === 0 ? <p>Tidak ada perintah</p> : null}
      </div>
    </Dialog>
  );
}
