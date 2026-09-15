"use client";

import { LogOut, ShieldX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function AccessDeniedPage() {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);

    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
    } finally {
      router.replace("/login");
      router.refresh();
      setSigningOut(false);
    }
  }

  return (
    <main className="og-auth-panel">
      <div className="og-auth-panel__toolbar">
        <ThemeToggle />
      </div>

      <section className="og-auth-card" aria-labelledby="access-denied-title">
        <div className="og-auth-brandmark" aria-hidden="true">
          <ShieldX size={21} strokeWidth={1.8} />
        </div>

        <header className="og-auth-card__header">
          <p className="og-auth-card__context">Akses OPERGRID</p>

          <h1 className="og-auth-card__title" id="access-denied-title">
            Akses belum tersedia
          </h1>

          <p className="og-auth-card__description">
            Akun Anda berhasil diautentikasi, tetapi belum memiliki akses aktif ke
            workspace OPERGRID. Hubungi administrator apabila akses diperlukan.
          </p>
        </header>

        <Button
          type="button"
          variant="secondary"
          loading={signingOut}
          onClick={handleSignOut}
        >
          <LogOut size={16} strokeWidth={1.8} aria-hidden="true" />
          <span>{signingOut ? "Keluar..." : "Keluar dari akun"}</span>
        </Button>
      </section>
    </main>
  );
}
