import { type InputHTMLAttributes, useId } from "react";

import { cn } from "@/lib/utils/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  description?: string;
  error?: string;
};

export function Input({
  id,
  label,
  description,
  error,
  className,
  required,
  "aria-describedby": ariaDescribedBy,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const descriptionId = description ? `${inputId}-description` : undefined;

  const errorId = error ? `${inputId}-error` : undefined;

  const describedBy =
    [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="og-field">
      {label ? (
        <label className="og-field__label" htmlFor={inputId}>
          {label}

          {required ? (
            <span className="og-field__required" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      ) : null}

      <input
        id={inputId}
        className={cn("og-input", error && "og-input--invalid", className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        required={required}
        {...props}
      />

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
