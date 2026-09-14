"use client";

import { type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export type TabItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type TabsProps = {
  items: readonly TabItem[];
  value: string;
  onValueChange: (value: string) => void;
  ariaLabel: string;
  trailing?: ReactNode;
  className?: string;
};

export function Tabs({
  items,
  value,
  onValueChange,
  ariaLabel,
  trailing,
  className,
}: TabsProps) {
  return (
    <div className={cn("og-tabs", className)}>
      <div className="og-tabs__list" role="tablist" aria-label={ariaLabel}>
        {items.map((item) => (
          <button
            key={item.value}
            type="button"
            role="tab"
            className={cn("og-tabs__tab", value === item.value && "og-tabs__tab--active")}
            aria-selected={value === item.value}
            disabled={item.disabled}
            onClick={() => {
              onValueChange(item.value);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {trailing ? <div className="og-tabs__trailing">{trailing}</div> : null}
    </div>
  );
}
