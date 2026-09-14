import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const badgeVariants = cva("og-badge", {
  variants: {
    severity: {
      neutral: "og-badge--neutral",
      info: "og-badge--info",
      normal: "og-badge--normal",
      warning: "og-badge--warning",
      high: "og-badge--high",
      critical: "og-badge--critical",
    },
  },
  defaultVariants: {
    severity: "neutral",
  },
});

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    dot?: boolean;
  };

export function Badge({
  className,
  severity,
  dot = true,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        badgeVariants({
          severity,
        }),
        className,
      )}
      {...props}
    >
      {dot ? <span className="og-badge__dot" aria-hidden="true" /> : null}

      <span>{children}</span>
    </span>
  );
}
