import { type SelectHTMLAttributes, useId } from "react";

import { cn } from "@/lib/utils/cn";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  description?: string;
  error?: string;
};

export function Select({
  id,
  label,
  description,
  error,
  className,
  required,
  children,
  "aria-describedby": ariaDescribedBy,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  const descriptionId = description ? `${selectId}-description` : undefined;

  const errorId = error ? `${selectId}-error` : undefined;

  const describedBy =
    [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="og-field">
      {label ? (
        <label className="og-field__label" htmlFor={selectId}>
          {label}

          {required ? (
            <span className="og-field__required" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      ) : null}

      <div className="og-select-wrap">
        <select
          id={selectId}
          className={cn("og-select", error && "og-select--invalid", className)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          required={required}
          {...props}
        >
          {children}
        </select>

        <span className="og-select__chevron" aria-hidden="true">
          ▾
        </span>
      </div>

      {description ? (
        <p id={descriptionId} className="og-field__description">
          {description}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="og-field__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
