import { forwardRef, useId, type TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  description?: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { id, label, description, error, required, className, ...props },
  ref,
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const descriptionId = `${fieldId}-description`;
  const errorId = `${fieldId}-error`;

  const describedBy = [description ? descriptionId : null, error ? errorId : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="og-field">
      {label ? (
        <label className="og-field__label" htmlFor={fieldId}>
          {label}

          {required ? (
            <span className="og-field__required" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      ) : null}

      <textarea
        ref={ref}
        id={fieldId}
        className={cn("og-textarea", error && "og-textarea--invalid", className)}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy || undefined}
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
});
