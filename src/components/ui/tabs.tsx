"use client";

import { type ReactNode } from "react";
import { Tab, TabList, TabPanel, Tabs as AriaTabs } from "react-aria-components";

export type TabItem = {
  value: string;
  label: string;
  content?: ReactNode;
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
    <AriaTabs
      selectedKey={value}
      onSelectionChange={(key) => onValueChange(String(key))}
      className={`og-tabs ${className ?? ""}`}
    >
      <TabList aria-label={ariaLabel} className="og-tabs__list" items={items}>
        {(item) => (
          <Tab id={item.value} isDisabled={item.disabled} className="og-tabs__tab">
            {item.label}
          </Tab>
        )}
      </TabList>
      {trailing ? <div className="og-tabs__trailing">{trailing}</div> : null}
      {items.map((item) => (
        <TabPanel
          key={item.value}
          id={item.value}
          shouldForceMount
          className="og-tabs__panel"
        >
          {item.content}
        </TabPanel>
      ))}
    </AriaTabs>
  );
}
