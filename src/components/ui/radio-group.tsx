import { useId, type InputHTMLAttributes } from "react";

export type RadioOption = { value: string; label: string; disabled?: boolean };
export type RadioGroupProps = {
  label: string;
  name: string;
  options: readonly RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
  disabled?: boolean;
};

export function RadioGroup({
  label,
  name,
  options,
  value,
  defaultValue,
  onChange,
  disabled,
}: RadioGroupProps) {
  const id = useId();
  return (
    <fieldset className="og-radio-group" disabled={disabled}>
      <legend className="og-field__label">{label}</legend>
      <div className="og-radio-group__options">
        {options.map((option, index) => (
          <label className="og-radio" htmlFor={`${id}-${index}`} key={option.value}>
            <input
              id={`${id}-${index}`}
              className="og-radio__input"
              type="radio"
              name={name}
              value={option.value}
              checked={value === undefined ? undefined : value === option.value}
              defaultChecked={
                value === undefined ? defaultValue === option.value : undefined
              }
              onChange={onChange}
              disabled={option.disabled}
            />
            <span className="og-radio__circle" aria-hidden="true" />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
