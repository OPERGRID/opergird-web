import { useId, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  description?: string;
};

export function Switch({ id, label, description, className, ...props }: SwitchProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <label className={cn("og-switch", className)} htmlFor={fieldId}>
      <input
        id={fieldId}
        type="checkbox"
        role="switch"
        className="og-switch__input"
        {...props}
      />

      <span className="og-switch__track" aria-hidden="true">
        <span className="og-switch__thumb" />
      </span>

      <span className="og-switch__copy">
        <strong>{label}</strong>

        {description ? <span>{description}</span> : null}
      </span>
    </label>
  );
}
