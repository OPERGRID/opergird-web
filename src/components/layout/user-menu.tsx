"use client";

import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { cn } from "@/lib/utils/cn";

export function UserMenu() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;

      if (target instanceof Node && !containerRef.current?.contains(target)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  async function handleSignOut() {
    if (signingOut) {
      return;
    }

    setSigningOut(true);

    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
    } finally {
      setOpen(false);
      router.replace("/login");
      router.refresh();
      setSigningOut(false);
    }
  }

  return (
    <div className="og-user-menu" ref={containerRef}>
      <button
        type="button"
        className={cn("og-user-menu__trigger", open && "og-user-menu__trigger--open")}
        aria-label="Buka menu akun"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => {
          setOpen((current) => !current);
        }}
      >
        <span className="og-user-menu__avatar" aria-hidden="true">
          OP
        </span>

        <span className="og-user-menu__copy">
          <strong>Operator</strong>
          <span>Workspace</span>
        </span>

        <ChevronDown
          className="og-user-menu__chevron"
          size={15}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div className="og-user-menu__popover" role="menu" aria-label="Menu akun">
          <div className="og-user-menu__identity">
            <span className="og-user-menu__identity-icon" aria-hidden="true">
              <UserRound size={16} strokeWidth={1.8} />
            </span>

            <span>
              <strong>Operator</strong>
              <small>Akun OPERGRID</small>
            </span>
          </div>

          <div className="og-user-menu__divider" />

          <button
            type="button"
            className="og-user-menu__logout"
            role="menuitem"
            disabled={signingOut}
            onClick={handleSignOut}
          >
            <LogOut size={16} strokeWidth={1.8} aria-hidden="true" />
            <span>{signingOut ? "Keluar..." : "Keluar dari akun"}</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
