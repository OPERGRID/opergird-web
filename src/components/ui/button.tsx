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
    iconOnly: {
      true: "og-button--icon-only",
      false: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    iconOnly: false,
  },
});

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  };

export function Button({
  className,
  variant,
  iconOnly,
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
          iconOnly,
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
