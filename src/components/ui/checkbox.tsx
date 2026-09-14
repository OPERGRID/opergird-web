import { useId, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  description?: string;
};

export function Checkbox({ id, label, description, className, ...props }: CheckboxProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <label className={cn("og-check", className)} htmlFor={fieldId}>
      <input id={fieldId} type="checkbox" className="og-check__input" {...props} />

      <span className="og-check__box" aria-hidden="true" />

      <span className="og-check__copy">
        <strong>{label}</strong>

        {description ? <span>{description}</span> : null}
      </span>
    </label>
  );
}
