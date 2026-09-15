"use client";

import { ChevronDown } from "lucide-react";
import { type ReactNode } from "react";
import {
  Button as AriaButton,
  Dialog as AriaDialog,
  DialogTrigger,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover as AriaPopover,
  Tooltip as AriaTooltip,
  TooltipTrigger,
} from "react-aria-components";

export type DropdownMenuItem = {
  id: string;
  label: string;
  onAction: () => void;
  disabled?: boolean;
  danger?: boolean;
};

export function Popover({
  label,
  children,
  triggerLabel,
}: {
  label: string;
  children: ReactNode;
  triggerLabel: string;
}) {
  return (
    <DialogTrigger>
      <AriaButton className="og-button og-button--secondary">{triggerLabel}</AriaButton>
      <AriaPopover className="og-popover">
        <AriaDialog className="og-popover__content" aria-label={label}>
          {children}
        </AriaDialog>
      </AriaPopover>
    </DialogTrigger>
  );
}

export function Tooltip({ children, text }: { children: ReactNode; text: string }) {
  return (
    <TooltipTrigger delay={300}>
      <AriaButton className="og-button og-button--ghost" aria-label={text}>
        {children}
      </AriaButton>
      <AriaTooltip className="og-tooltip">{text}</AriaTooltip>
    </TooltipTrigger>
  );
}

export function DropdownMenu({
  label = "Aksi lainnya",
  items,
}: {
  label?: string;
  items: readonly DropdownMenuItem[];
}) {
  return (
    <MenuTrigger>
      <AriaButton className="og-button og-button--secondary" aria-label={label}>
        {label}
        <ChevronDown size={15} aria-hidden="true" />
      </AriaButton>
      <AriaPopover className="og-menu-popover">
        <Menu className="og-menu" items={items} aria-label={label}>
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
  );
}
