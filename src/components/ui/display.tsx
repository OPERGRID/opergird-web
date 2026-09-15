import { type HTMLAttributes, type ReactNode } from "react";

export function Avatar({ name, imageUrl }: { name: string; imageUrl?: string }) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  return (
    <span className="og-avatar" role="img" aria-label={name}>
      {imageUrl ? (
        <span
          className="og-avatar__image"
          style={{ backgroundImage: `url(${imageUrl})` }}
          aria-hidden="true"
        />
      ) : (
        initials
      )}
    </span>
  );
}
export function UserChip({
  name,
  detail,
  imageUrl,
}: {
  name: string;
  detail?: string;
  imageUrl?: string;
}) {
  return (
    <span className="og-user-chip">
      <Avatar name={name} imageUrl={imageUrl} />
      <span>
        <strong>{name}</strong>
        {detail ? <small>{detail}</small> : null}
      </span>
    </span>
  );
}
export function Progress({ value, label }: { value: number; label: string }) {
  return (
    <div
      className="og-progress"
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span style={{ width: `${Math.max(0, Math.min(value, 100))}%` }} />
    </div>
  );
}
export function MonoValue({
  children,
  ...props
}: HTMLAttributes<HTMLElement> & { children: ReactNode }) {
  return (
    <code className="og-mono-value" {...props}>
      {children}
    </code>
  );
}
