"use client";

import { Check, ChevronDown, Copy } from "lucide-react";
import { useState, type ReactNode } from "react";
import {
  Button as AriaButton,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover as AriaPopover,
} from "react-aria-components";
import { Button, type ButtonProps } from "@/components/ui/button";
import { type DropdownMenuItem } from "@/components/ui/overlays";

export function ButtonGroup({
  children,
  label = "Aksi",
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="og-button-group" role="group" aria-label={label}>
      {children}
    </div>
  );
}
export function IconButton(
  props: Omit<ButtonProps, "iconOnly"> & { "aria-label": string },
) {
  return <Button iconOnly {...props} />;
}
export function SplitButton({
  label,
  onAction,
  items,
  variant = "primary",
  disabled = false,
}: {
  label: string;
  onAction: () => void;
  items: readonly DropdownMenuItem[];
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}) {
  return (
    <div className="og-split-button" role="group" aria-label={label}>
      <Button variant={variant} onClick={onAction} disabled={disabled}>
        {label}
      </Button>
      <MenuTrigger>
        <AriaButton
          className={`og-button og-button--${variant} og-split-button__toggle`}
          aria-label={`${label}: aksi lainnya`}
          isDisabled={disabled}
        >
          <ChevronDown size={15} aria-hidden="true" />
        </AriaButton>
        <AriaPopover className="og-menu-popover">
          <Menu className="og-menu" items={items} aria-label={`${label}: aksi lainnya`}>
            {(item) => (
              <MenuItem
                id={item.id}
                className="og-menu-item"
                isDisabled={item.disabled}
                onAction={item.onAction}
                data-danger={item.danger || undefined}
              >
                {item.label}
              </MenuItem>
            )}
          </Menu>
        </AriaPopover>
      </MenuTrigger>
    </div>
  );
}
export function CopyAction({
  value,
  label = "Salin",
}: {
  value: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="secondary"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }}
      aria-label={label}
    >
      {copied ? (
        <Check size={16} aria-hidden="true" />
      ) : (
        <Copy size={16} aria-hidden="true" />
      )}
      {copied ? "Tersalin" : label}
    </Button>
  );
}
