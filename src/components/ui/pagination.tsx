import { ChevronLeft, ChevronRight } from "lucide-react";
import { type HTMLAttributes } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export type PaginationProps = HTMLAttributes<HTMLElement> & {
  page: number;
  totalPages: number;
  onPrevious?: () => void;
  onNext?: () => void;
};

export function Pagination({
  page,
  totalPages,
  onPrevious,
  onNext,
  className,
  ...props
}: PaginationProps) {
  return (
    <nav className={cn("og-pagination", className)} aria-label="Pagination" {...props}>
      <span className="og-pagination__summary">
        Halaman <strong>{page}</strong> dari <strong>{totalPages}</strong>
      </span>

      <div className="og-pagination__actions">
        <Button
          variant="secondary"
          iconOnly
          aria-label="Halaman sebelumnya"
          disabled={page <= 1}
          onClick={onPrevious}
        >
          <ChevronLeft size={15} aria-hidden="true" />
        </Button>

        <Button
          variant="secondary"
          iconOnly
          aria-label="Halaman berikutnya"
          disabled={page >= totalPages}
          onClick={onNext}
        >
          <ChevronRight size={15} aria-hidden="true" />
        </Button>
      </div>
    </nav>
  );
}
