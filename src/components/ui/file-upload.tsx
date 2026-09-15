"use client";

import { Upload } from "lucide-react";
import {
  useRef,
  type ChangeEvent,
  type DragEvent,
  type InputHTMLAttributes,
} from "react";

export type FileUploadProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> & { label: string; description?: string; onFiles: (files: File[]) => void };

export function FileUpload({
  label,
  description,
  onFiles,
  multiple,
  accept,
  disabled,
  ...props
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="og-field">
      <span className="og-field__label">{label}</span>
      <button
        className="og-file-upload"
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
      >
        <Upload size={17} aria-hidden="true" />
        <span>Pilih berkas</span>
      </button>
      <input
        ref={inputRef}
        className="og-visually-hidden"
        type="file"
        multiple={multiple}
        accept={accept}
        disabled={disabled}
        aria-label={label}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onFiles(Array.from(event.target.files ?? []))
        }
        {...props}
      />
      {description ? <p className="og-field__description">{description}</p> : null}
    </div>
  );
}

export function Dropzone({
  label,
  onFiles,
  accept,
  multiple = true,
  disabled = false,
}: Pick<FileUploadProps, "label" | "onFiles" | "accept" | "multiple" | "disabled">) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!disabled) onFiles(Array.from(event.dataTransfer.files));
  };
  return (
    <div
      className="og-dropzone"
      onDragOver={(event) => event.preventDefault()}
      onDrop={onDrop}
    >
      <Upload size={20} aria-hidden="true" />
      <strong>{label}</strong>
      <span>Tarik berkas ke sini atau pilih dari perangkat</span>
      <button
        type="button"
        className="og-button og-button--secondary"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
      >
        Pilih berkas
      </button>
      <input
        ref={inputRef}
        className="og-visually-hidden"
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        aria-label={label}
        onChange={(event) => onFiles(Array.from(event.target.files ?? []))}
      />
    </div>
  );
}
