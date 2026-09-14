import { Search, X } from "lucide-react";
import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export type SearchFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  onClear?: () => void;
};

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  function SearchField(
    {
      className,
      value,
      defaultValue,
      onClear,
      "aria-label": ariaLabel = "Cari",
      ...props
    },
    ref,
  ) {
    const hasControlledValue = typeof value === "string" && value.length > 0;

    const hasDefaultValue = typeof defaultValue === "string" && defaultValue.length > 0;

    const showClear = Boolean(onClear) && (hasControlledValue || hasDefaultValue);

    return (
      <div className="og-search-field">
        <Search
          className="og-search-field__icon"
          size={16}
          strokeWidth={1.8}
          aria-hidden="true"
        />

        <input
          ref={ref}
          type="search"
          className={cn("og-search-field__input", className)}
          value={value}
          defaultValue={defaultValue}
          aria-label={ariaLabel}
          {...props}
        />

        {showClear ? (
          <button
            type="button"
            className="og-search-field__clear"
            aria-label="Bersihkan pencarian"
            onClick={onClear}
          >
            <X size={14} aria-hidden="true" />
          </button>
        ) : null}
      </div>
    );
  },
);
