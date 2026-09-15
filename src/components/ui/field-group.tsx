import { type ReactNode } from "react";

export function FieldGroup({
  legend,
  children,
}: {
  legend: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="og-field-group">
      <legend>{legend}</legend>
      <div>{children}</div>
    </fieldset>
  );
}
export function FormLabel({
  htmlFor,
  children,
  required = false,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="og-field__label" htmlFor={htmlFor}>
      {children}
      {required ? (
        <span className="og-field__required" aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  );
}
export function HelperText({ children }: { children: ReactNode }) {
  return <p className="og-field__description">{children}</p>;
}
export function InlineValidation({ children }: { children: ReactNode }) {
  return (
    <p className="og-field__error" role="alert">
      {children}
    </p>
  );
}
