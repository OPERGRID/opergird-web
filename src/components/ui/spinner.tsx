import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Spinner({
  className,
  "aria-label": label = "Memuat",
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn("og-spinner", className)}
      {...props}
    />
  );
}
