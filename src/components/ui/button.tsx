import { type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const buttonVariants = cva("og-button", {
  variants: {
    variant: {
      primary: "og-button--primary",
      secondary: "og-button--secondary",
      ghost: "og-button--ghost",
      danger: "og-button--danger",
    },
    size: {
      sm: "og-button--sm",
      md: "og-button--md",
      lg: "og-button--lg",
      icon: "og-button--icon",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  loading = false,
  disabled,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={cn(
        buttonVariants({
          variant,
          size,
        }),
        className,
      )}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <span className="og-button__spinner" aria-hidden="true" /> : null}

      <span className="og-button__content">{children}</span>
    </button>
  );
}
