import { AlertTriangle, CheckCircle2, CircleAlert, Info } from "lucide-react";
import { type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export type AlertSeverity = "info" | "success" | "warning" | "critical";

const iconMap = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  critical: CircleAlert,
} as const;

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  severity?: AlertSeverity;
  title: string;
  children?: ReactNode;
};

export function Alert({
  severity = "info",
  title,
  children,
  className,
  ...props
}: AlertProps) {
  const Icon = iconMap[severity];

  return (
    <div
      role={severity === "critical" ? "alert" : "status"}
      className={cn("og-alert", `og-alert--${severity}`, className)}
      {...props}
    >
      <Icon className="og-alert__icon" size={17} strokeWidth={1.8} aria-hidden="true" />

      <div className="og-alert__body">
        <strong className="og-alert__title">{title}</strong>

        {children ? <div className="og-alert__content">{children}</div> : null}
      </div>
    </div>
  );
}
