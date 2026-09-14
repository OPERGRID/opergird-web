import {
  type HTMLAttributes,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";

import { cn } from "@/lib/utils/cn";

export function TableWrap({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("og-table-wrap", className)} {...props} />;
}

export function Table({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return <table className={cn("og-table", className)} {...props} />;
}

export function TableHead({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("og-table__head", className)} {...props} />;
}

export function TableBody({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("og-table__body", className)} {...props} />;
}

export function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn("og-table__row", className)} {...props} />;
}

export function TableHeaderCell({
  className,
  numeric = false,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement> & {
  numeric?: boolean;
}) {
  return (
    <th
      className={cn(
        "og-table__header-cell",
        numeric && "og-table__cell--numeric",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({
  className,
  numeric = false,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement> & {
  numeric?: boolean;
}) {
  return (
    <td
      className={cn("og-table__cell", numeric && "og-table__cell--numeric", className)}
      {...props}
    />
  );
}
