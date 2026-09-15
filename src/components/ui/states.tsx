import { CircleAlert, CloudOff, LockKeyhole } from "lucide-react";
import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";

function State({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="og-state">
      <div className="og-state__icon" aria-hidden="true">
        {icon}
      </div>
      <strong>{title}</strong>
      {description ? <p>{description}</p> : null}
      {action}
    </div>
  );
}
export function ErrorState({
  title = "Terjadi kesalahan",
  description,
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <State
      icon={<CircleAlert size={22} />}
      title={title}
      description={description}
      action={
        onRetry ? (
          <Button variant="secondary" onClick={onRetry}>
            Coba lagi
          </Button>
        ) : undefined
      }
    />
  );
}
export function NoPermissionState({ description }: { description?: string }) {
  return (
    <State
      icon={<LockKeyhole size={22} />}
      title="Akses tidak tersedia"
      description={description ?? "Anda tidak memiliki izin untuk melihat bagian ini."}
    />
  );
}
export function OfflineState({ onRetry }: { onRetry?: () => void }) {
  return (
    <State
      icon={<CloudOff size={22} />}
      title="Koneksi terputus"
      description="Periksa jaringan Anda lalu coba lagi."
      action={
        onRetry ? (
          <Button variant="secondary" onClick={onRetry}>
            Coba lagi
          </Button>
        ) : undefined
      }
    />
  );
}
