import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const surfaceVariants = cva("og-surface", {
  variants: {
    tone: {
      default: "og-surface--default",
      subtle: "og-surface--subtle",
      elevated: "og-surface--elevated",
    },
    padding: {
      none: "og-surface--padding-none",
      sm: "og-surface--padding-sm",
      md: "og-surface--padding-md",
      lg: "og-surface--padding-lg",
    },
    selected: {
      true: "og-surface--selected",
      false: "",
    },
  },
  defaultVariants: {
    tone: "default",
    padding: "md",
    selected: false,
  },
});

export type SurfaceProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof surfaceVariants>;

export function Surface({ className, tone, padding, selected, ...props }: SurfaceProps) {
  return (
    <div
      className={cn(
        surfaceVariants({
          tone,
          padding,
          selected,
        }),
        className,
      )}
      {...props}
    />
  );
}
