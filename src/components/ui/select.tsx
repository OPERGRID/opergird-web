"use client";

import { Check, ChevronDown, LoaderCircle, Search, X } from "lucide-react";
import { useState } from "react";
import {
  Autocomplete,
  Button as AriaButton,
  Input as AriaInput,
  Label as AriaLabel,
  ListBox,
  ListBoxItem,
  Popover as AriaPopover,
  SearchField as AriaSearchField,
  Select as AriaSelect,
  useFilter,
} from "react-aria-components";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
};

type SelectBaseProps = {
  label: string;
  options: readonly SelectOption[];
  placeholder?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  isLoading?: boolean;
  onSearchChange?: (query: string) => void;
  emptyMessage?: string;
};

export type SelectProps = SelectBaseProps & {
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
  searchable?: boolean;
};
export type MultiSelectProps = SelectBaseProps & {
  value?: readonly string[];
  defaultValue?: readonly string[];
  onChange?: (value: string[]) => void;
};

function OptionsPanel({
  options,
  label,
  isLoading,
  emptyMessage,
  onSearchChange,
  searchable,
}: Pick<
  SelectBaseProps,
  "options" | "label" | "isLoading" | "emptyMessage" | "onSearchChange"
> & { searchable: boolean }) {
  const { contains } = useFilter({ sensitivity: "base" });
  const list = (
    <ListBox
      aria-label={`Pilihan ${label}`}
      className="og-select__list"
      items={options}
      renderEmptyState={() => (
        <div className="og-select__empty">
          {isLoading ? (
            <>
              <LoaderCircle size={15} className="og-select__loader" aria-hidden="true" />
              <span>Memuat pilihan...</span>
            </>
          ) : (
            <>
              <strong>Tidak ditemukan</strong>
              <span>{emptyMessage ?? "Coba kata kunci atau pilihan lain."}</span>
            </>
          )}
        </div>
      )}
    >
      {(item) => (
        <ListBoxItem
          id={item.value}
          textValue={item.label}
          isDisabled={item.disabled}
          className="og-select__option"
        >
          <span className="og-select__option-copy">
            <span>{item.label}</span>
            {item.description ? <small>{item.description}</small> : null}
          </span>
          <span className="og-select__check" aria-hidden="true">
            <Check size={13} />
          </span>
        </ListBoxItem>
      )}
    </ListBox>
  );
  return (
    <AriaPopover className="og-select__popover" placement="bottom start">
      {searchable ? (
        <Autocomplete filter={onSearchChange ? () => true : contains}>
          <AriaSearchField
            className="og-select__search"
            aria-label={`Cari ${label}`}
            onChange={onSearchChange}
            autoFocus
          >
            {isLoading ? (
              <LoaderCircle size={15} className="og-select__loader" aria-hidden="true" />
            ) : (
              <Search size={15} aria-hidden="true" />
            )}
            <AriaInput className="og-select__search-input" placeholder="Cari pilihan" />
            {isLoading ? <span className="og-select__loading-copy">Memuat</span> : null}
          </AriaSearchField>
          {list}
        </Autocomplete>
      ) : (
        list
      )}
    </AriaPopover>
  );
}

function Trigger({
  label,
  selected,
  placeholder,
  loading = false,
}: {
  label: string;
  selected?: SelectOption;
  placeholder: string;
  loading?: boolean;
}) {
  return (
    <AriaButton
      className="og-select__trigger"
      aria-label={`${selected?.label ?? placeholder} ${label}`}
    >
      <span
        className="og-select__value"
        data-placeholder={!selected || undefined}
        aria-label={selected ? "Nilai terpilih" : undefined}
      >
        {selected ? (
          <>
            <strong className="og-select__selected-primary">{selected.label}</strong>
            {selected.description ? (
              <small className="og-select__selected-meta">{selected.description}</small>
            ) : null}
          </>
        ) : (
          placeholder
        )}
      </span>
      {loading ? (
        <LoaderCircle size={15} className="og-select__loader" aria-hidden="true" />
      ) : (
        <ChevronDown size={16} aria-hidden="true" />
      )}
    </AriaButton>
  );
}

function MultiTrigger({
  label,
  selected,
  placeholder,
  loading = false,
  disabled = false,
  onRemove,
}: {
  label: string;
  selected: readonly SelectOption[];
  placeholder: string;
  loading?: boolean;
  disabled?: boolean;
  onRemove: (value: string) => void;
}) {
  const selectionLabel = selected.length
    ? `${label}: ${selected.map((option) => option.label).join(", ")}`
    : `${placeholder} ${label}`;

  return (
    <div className="og-select__multi-control" data-empty={!selected.length || undefined}>
      <AriaButton className="og-select__multi-trigger" aria-label={selectionLabel}>
        {!selected.length ? <span>{placeholder}</span> : <span aria-hidden="true" />}
        {loading ? (
          <LoaderCircle size={15} className="og-select__loader" aria-hidden="true" />
        ) : (
          <ChevronDown size={16} aria-hidden="true" />
        )}
      </AriaButton>
      {selected.length ? (
        <div
          className="og-select__chip-viewport"
          role="group"
          aria-label={`${label} terpilih`}
        >
          {selected.map((option) => (
            <span
              className="og-select__chip"
              key={option.value}
              title={option.description}
            >
              <span>{option.label}</span>
              <button
                type="button"
                className="og-select__chip-remove"
                aria-label={`Hapus ${option.label}`}
                disabled={disabled}
                onClick={() => onRemove(option.value)}
              >
                <X size={12} aria-hidden="true" />
              </button>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Help({ description, error }: Pick<SelectBaseProps, "description" | "error">) {
  return (
    <>
      {description ? <p className="og-field__description">{description}</p> : null}
      {error ? (
        <p className="og-field__error" role="alert">
          {error}
        </p>
      ) : null}
    </>
  );
}

export function Select({
  label,
  options,
  placeholder = "Pilih",
  description,
  error,
  required,
  disabled,
  name,
  value,
  defaultValue = null,
  onChange,
  isLoading,
  onSearchChange,
  emptyMessage,
  searchable = false,
}: SelectProps) {
  const [internalValue, setInternalValue] = useState<string | null>(defaultValue);
  const currentValue = value === undefined ? internalValue : value;
  const selected = options.find((option) => option.value === currentValue);
  const handleChange = (next: string | null) => {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };
  return (
    <AriaSelect
      className="og-field og-select"
      placeholder={placeholder}
      isRequired={required}
      isDisabled={disabled}
      isInvalid={Boolean(error)}
      name={name}
      value={currentValue}
      onChange={(key) => handleChange(key === null ? null : String(key))}
    >
      <AriaLabel className="og-field__label">
        {label}
        {required ? (
          <span className="og-field__required" aria-hidden="true">
            *
          </span>
        ) : null}
      </AriaLabel>
      <Trigger
        label={label}
        selected={selected}
        placeholder={placeholder}
        loading={isLoading}
      />
      <Help description={description} error={error} />
      <OptionsPanel
        options={options}
        label={label}
        isLoading={isLoading}
        emptyMessage={emptyMessage}
        onSearchChange={onSearchChange}
        searchable={searchable || Boolean(onSearchChange)}
      />
    </AriaSelect>
  );
}

export function SearchableSelect(props: SelectProps) {
  return <Select {...props} searchable />;
}

export function MultiSelect({
  label,
  options,
  placeholder = "Pilih beberapa",
  description,
  error,
  required,
  disabled,
  name,
  value,
  defaultValue = [],
  onChange,
  isLoading,
  onSearchChange,
  emptyMessage,
}: MultiSelectProps) {
  const [internalValue, setInternalValue] = useState<readonly string[]>(defaultValue);
  const currentValue = value === undefined ? internalValue : value;
  const selectedOptions = currentValue.flatMap((key) => {
    const option = options.find((candidate) => candidate.value === key);
    return option ? [option] : [];
  });
  const update = (next: string[]) => {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };
  return (
    <AriaSelect
      className="og-field og-select og-select--multiple"
      selectionMode="multiple"
      placeholder={placeholder}
      isRequired={required}
      isDisabled={disabled}
      isInvalid={Boolean(error)}
      name={name}
      value={currentValue}
      onChange={(keys) => update(keys.map(String))}
    >
      <AriaLabel className="og-field__label">
        {label}
        {required ? (
          <span className="og-field__required" aria-hidden="true">
            *
          </span>
        ) : null}
      </AriaLabel>
      <MultiTrigger
        label={label}
        selected={selectedOptions}
        placeholder={placeholder}
        loading={isLoading}
        disabled={disabled}
        onRemove={(optionValue) =>
          update(currentValue.filter((key) => key !== optionValue))
        }
      />
      <Help description={description} error={error} />
      <OptionsPanel
        options={options}
        label={label}
        isLoading={isLoading}
        emptyMessage={emptyMessage}
        onSearchChange={onSearchChange}
        searchable
      />
    </AriaSelect>
  );
}

export const ComboBox = SearchableSelect;
export const AutocompleteSelect = SearchableSelect;
export const AsyncSelect = SearchableSelect;
