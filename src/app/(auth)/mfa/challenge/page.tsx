"use client";

import { KeyRound, LogOut, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function MfaChallengePage() {
  const router = useRouter();
  const loadedRef = useRef(false);

  const [factorId, setFactorId] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (loadedRef.current) {
      return;
    }

    loadedRef.current = true;

    void (async () => {
      const supabase = createSupabaseBrowserClient();

      const { data: aalData, error: aalError } =
        await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

      if (aalError) {
        setErrorMessage("Status keamanan akun tidak dapat diperiksa.");
        setLoading(false);
        return;
      }

      if (aalData.currentLevel === "aal2") {
        router.replace("/");
        router.refresh();
        return;
      }

      const factors = await supabase.auth.mfa.listFactors();

      if (factors.error) {
        setErrorMessage("Autentikator akun tidak dapat dimuat.");
        setLoading(false);
        return;
      }

      const verifiedTotp = factors.data.totp.find(
        (factor) => factor.status === "verified",
      );

      if (!verifiedTotp) {
        router.replace("/mfa/setup");
        router.refresh();
        return;
      }

      setFactorId(verifiedTotp.id);
      setLoading(false);
    })();
  }, [router]);

  async function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedCode = code.replace(/\s+/g, "");

    if (!factorId || !/^\d{6}$/.test(normalizedCode)) {
      setErrorMessage("Masukkan 6 digit kode dari aplikasi autentikator.");
      return;
    }

    setVerifying(true);
    setErrorMessage(null);

    try {
      const supabase = createSupabaseBrowserClient();

      const challenge = await supabase.auth.mfa.challenge({
        factorId,
      });

      if (challenge.error) {
        setErrorMessage("Permintaan verifikasi belum dapat dibuat.");
        return;
      }

      const verification = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.data.id,
        code: normalizedCode,
      });

      if (verification.error) {
        setErrorMessage("Kode tidak sesuai atau sudah tidak berlaku.");
        return;
      }

      const { data: aalData, error: aalError } =
        await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

      if (aalError || aalData.currentLevel !== "aal2") {
        setErrorMessage("Verifikasi selesai tetapi sesi aman belum terbentuk.");
        return;
      }

      router.replace("/");
      router.refresh();
    } finally {
      setVerifying(false);
    }
  }

  async function handleSignOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <main className="og-auth-panel">
      <div className="og-auth-panel__toolbar">
        <ThemeToggle />
      </div>

      <section className="og-auth-card" aria-labelledby="mfa-challenge-title">
        <div className="og-auth-brandmark" aria-hidden="true">
          <ShieldCheck size={21} strokeWidth={1.8} />
        </div>

        <header className="og-auth-card__header">
          <p className="og-auth-card__context">Verifikasi Dua Langkah</p>

          <h1 className="og-auth-card__title" id="mfa-challenge-title">
            Verifikasi identitas Anda
          </h1>

          <p className="og-auth-card__description">
            Masukkan kode 6 digit dari aplikasi autentikator untuk melanjutkan ke
            OPERGRID.
          </p>
        </header>

        {errorMessage ? (
          <Alert severity="critical" title="Verifikasi belum berhasil">
            {errorMessage}
          </Alert>
        ) : null}

        <form className="og-auth-form" onSubmit={handleVerify} noValidate>
          <Input
            label="Kode autentikator"
            name="totp-code"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="000000"
            value={code}
            disabled={verifying || loading}
            maxLength={6}
            onChange={(event) =>
              setCode(event.target.value.replace(/\D/g, "").slice(0, 6))
            }
          />

          <Button
            className="og-auth-submit"
            type="submit"
            loading={verifying}
            disabled={verifying || loading}
          >
            <KeyRound size={16} strokeWidth={1.8} aria-hidden="true" />
            <span>
              {loading ? "Memuat..." : verifying ? "Memverifikasi..." : "Verifikasi"}
            </span>
          </Button>
        </form>

        <footer className="og-auth-card__footer">
          <Button type="button" variant="ghost" onClick={handleSignOut}>
            <LogOut size={15} strokeWidth={1.8} aria-hidden="true" />
            Keluar dari akun
          </Button>
        </footer>
      </section>
    </main>
  );
}
