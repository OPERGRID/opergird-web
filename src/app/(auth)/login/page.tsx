"use client";

import {
  ArrowLeft,
  ArrowRight,
  Grid3X3,
  KeyRound,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, type FormEvent } from "react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type CaptchaPayload = {
  challenge?: unknown;
};

type LoginPayload = {
  ok?: unknown;
  next?: unknown;
  message?: unknown;
};

type LoginPhase = "credentials" | "mfa";

export default function LoginPage() {
  const router = useRouter();

  const [phase, setPhase] = useState<LoginPhase>("credentials");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaChallenge, setCaptchaChallenge] = useState("");
  const [captchaLoading, setCaptchaLoading] = useState(true);

  const [mfaFactorId, setMfaFactorId] = useState("");
  const [mfaCode, setMfaCode] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [verifyingMfa, setVerifyingMfa] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadCaptcha = useCallback(async () => {
    setCaptchaLoading(true);
    setCaptchaAnswer("");

    try {
      const response = await fetch("/api/auth/captcha", {
        method: "GET",
        cache: "no-store",
        credentials: "same-origin",
      });

      const payload = (await response.json()) as CaptchaPayload;

      if (!response.ok || typeof payload.challenge !== "string" || !payload.challenge) {
        throw new Error("Invalid CAPTCHA response");
      }

      setCaptchaChallenge(payload.challenge);
    } catch {
      setCaptchaChallenge("");
      setErrorMessage("Verifikasi keamanan belum dapat dimuat. Coba muat ulang.");
    } finally {
      setCaptchaLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    void fetch("/api/auth/captcha", {
      method: "GET",
      cache: "no-store",
      credentials: "same-origin",
    })
      .then(async (response) => {
        const payload = (await response.json()) as CaptchaPayload;

        if (!response.ok || typeof payload.challenge !== "string" || !payload.challenge) {
          throw new Error("Invalid CAPTCHA response");
        }

        if (!cancelled) {
          setCaptchaChallenge(payload.challenge);
          setCaptchaLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCaptchaChallenge("");
          setCaptchaLoading(false);
          setErrorMessage("Verifikasi keamanan belum dapat dimuat. Coba muat ulang.");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function prepareInlineMfa() {
    const supabase = createSupabaseBrowserClient();

    const factors = await supabase.auth.mfa.listFactors();

    if (factors.error) {
      await supabase.auth.signOut();
      throw new Error("MFA factors unavailable");
    }

    const verifiedTotp = factors.data.totp.find((factor) => factor.status === "verified");

    if (!verifiedTotp) {
      router.replace("/mfa/setup");
      router.refresh();
      return;
    }

    setMfaFactorId(verifiedTotp.id);
    setMfaCode("");
    setErrorMessage(null);
    setPhase("mfa");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim();
    const normalizedCaptcha = captchaAnswer.trim();

    if (!normalizedEmail || !password || !normalizedCaptcha) {
      setErrorMessage(
        "Lengkapi email, kata sandi, dan jawaban verifikasi untuk melanjutkan.",
      );
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          password,
          captchaAnswer: normalizedCaptcha,
        }),
      });

      const payload = (await response.json()) as LoginPayload;

      if (!response.ok) {
        setErrorMessage(
          typeof payload.message === "string"
            ? payload.message
            : "Login belum dapat diproses. Coba kembali.",
        );

        await loadCaptcha();
        return;
      }

      if (
        payload.ok !== true ||
        typeof payload.next !== "string" ||
        !payload.next.startsWith("/")
      ) {
        setErrorMessage("Respons login tidak valid. Silakan coba kembali.");
        await loadCaptcha();
        return;
      }

      if (payload.next === "/mfa/challenge") {
        await prepareInlineMfa();
        return;
      }

      router.replace(payload.next);
      router.refresh();
    } catch {
      setErrorMessage(
        "Layanan login belum dapat dihubungi. Periksa koneksi lalu coba kembali.",
      );

      await loadCaptcha();
    } finally {
      setSubmitting(false);
    }
  }

  async function handleMfaSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedCode = mfaCode.replace(/\s+/g, "");

    if (!mfaFactorId || !/^\d{6}$/.test(normalizedCode)) {
      setErrorMessage("Masukkan 6 digit kode dari aplikasi autentikator.");
      return;
    }

    setVerifyingMfa(true);
    setErrorMessage(null);

    try {
      const supabase = createSupabaseBrowserClient();

      const challenge = await supabase.auth.mfa.challenge({
        factorId: mfaFactorId,
      });

      if (challenge.error) {
        setErrorMessage("Permintaan verifikasi belum dapat dibuat. Coba kembali.");
        return;
      }

      const verification = await supabase.auth.mfa.verify({
        factorId: mfaFactorId,
        challengeId: challenge.data.id,
        code: normalizedCode,
      });

      if (verification.error) {
        setErrorMessage("Kode tidak sesuai atau sudah tidak berlaku.");
        return;
      }

      const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();

      if (claimsError || claimsData?.claims?.aal !== "aal2") {
        setErrorMessage("Verifikasi selesai tetapi sesi aman belum terbentuk.");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setErrorMessage("Verifikasi belum dapat diproses. Coba kembali.");
    } finally {
      setVerifyingMfa(false);
    }
  }

  async function handleBackToCredentials() {
    if (verifyingMfa) {
      return;
    }

    setVerifyingMfa(true);

    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();

      setMfaFactorId("");
      setMfaCode("");
      setPassword("");
      setErrorMessage(null);
      setPhase("credentials");

      await loadCaptcha();
    } finally {
      setVerifyingMfa(false);
    }
  }

  return (
    <main className="og-auth-shell">
      <section className="og-auth-brand" aria-label="Tentang OPERGRID">
        <div className="og-auth-brand__top">
          <div className="og-auth-brandmark" aria-hidden="true">
            <Grid3X3 size={22} strokeWidth={1.7} />
          </div>

          <div>
            <p className="og-auth-brand__eyebrow">Platform Operasional Gardu Induk</p>

            <p className="og-auth-brand__name">OPERGRID</p>
          </div>
        </div>

        <div className="og-auth-brand__body">
          <span className="og-auth-kicker">Ruang Kerja Operasional</span>

          <h1 className="og-auth-brand__headline">
            Operasi gardu induk dalam satu sistem kerja.
          </h1>

          <p className="og-auth-brand__description">
            Kelola data operasional, aset, gangguan, inspeksi, tindak lanjut, dan
            pelaporan secara terintegrasi.
          </p>

          <div className="og-auth-brand__assurance">
            <ShieldCheck size={17} strokeWidth={1.8} aria-hidden="true" />
            <span>Akses internal terverifikasi</span>
          </div>
        </div>

        <p className="og-auth-brand__footer">
          PT PLN (Persero) &bull; UPT Pematang Siantar
        </p>
      </section>

      <section className="og-auth-panel">
        <div className="og-auth-panel__toolbar">
          <ThemeToggle />
        </div>

        <div className="og-auth-card og-auth-card--flow" data-auth-phase={phase}>
          {phase === "credentials" ? (
            <div className="og-auth-flow-step" key="credentials">
              <header className="og-auth-card__header">
                <div className="og-auth-card__mobile-brand">
                  <div className="og-auth-brandmark" aria-hidden="true">
                    <Grid3X3 size={20} strokeWidth={1.7} />
                  </div>

                  <span>OPERGRID</span>
                </div>

                <p className="og-auth-card__context">Akses Aman</p>
                <h2 className="og-auth-card__title">Masuk ke OPERGRID</h2>
                <p className="og-auth-card__description">
                  Gunakan akun yang telah terdaftar untuk mengakses sistem.
                </p>
              </header>

              {errorMessage ? (
                <Alert severity="critical" title="Tidak dapat masuk">
                  {errorMessage}
                </Alert>
              ) : null}

              <form className="og-auth-form" onSubmit={handleSubmit} noValidate>
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  autoComplete="username"
                  inputMode="email"
                  placeholder="nama@pln.co.id"
                  value={email}
                  disabled={submitting}
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />

                <PasswordInput
                  label="Kata sandi"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Masukkan kata sandi"
                  value={password}
                  disabled={submitting}
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />

                <div className="og-auth-captcha">
                  <div className="og-auth-captcha__label-row">
                    <span>Verifikasi keamanan</span>

                    <button
                      type="button"
                      className="og-auth-captcha__refresh"
                      aria-label="Buat soal verifikasi baru"
                      title="Buat soal baru"
                      disabled={submitting || captchaLoading}
                      onClick={() => {
                        setErrorMessage(null);
                        void loadCaptcha();
                      }}
                    >
                      <RefreshCw size={15} strokeWidth={1.8} aria-hidden="true" />
                    </button>
                  </div>

                  <div className="og-auth-captcha__controls">
                    <div
                      className="og-auth-captcha__challenge"
                      aria-live="polite"
                      aria-label="Soal verifikasi"
                    >
                      {captchaLoading
                        ? "Menyiapkan..."
                        : captchaChallenge || "Tidak tersedia"}
                    </div>

                    <Input
                      aria-label="Jawaban verifikasi"
                      name="captcha-answer"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="Jawaban"
                      value={captchaAnswer}
                      disabled={submitting || captchaLoading || !captchaChallenge}
                      required
                      onChange={(event) => {
                        setCaptchaAnswer(
                          event.target.value.replace(/\D/g, "").slice(0, 2),
                        );
                      }}
                    />
                  </div>
                </div>

                <Button
                  className="og-auth-submit"
                  type="submit"
                  loading={submitting}
                  disabled={submitting || captchaLoading || !captchaChallenge}
                >
                  <span>{submitting ? "Memproses..." : "Masuk"}</span>

                  {!submitting ? (
                    <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
                  ) : null}
                </Button>
              </form>

              <footer className="og-auth-card__footer">
                <p>Gunakan akun OPERGRID yang telah terdaftar.</p>
              </footer>
            </div>
          ) : (
            <div className="og-auth-flow-step" key="mfa">
              <header className="og-auth-card__header">
                <div className="og-auth-card__mobile-brand">
                  <div className="og-auth-brandmark" aria-hidden="true">
                    <Grid3X3 size={20} strokeWidth={1.7} />
                  </div>

                  <span>OPERGRID</span>
                </div>

                <p className="og-auth-card__context">Verifikasi Dua Langkah</p>

                <h2 className="og-auth-card__title">Verifikasi identitas Anda</h2>

                <p className="og-auth-card__description">
                  Masukkan kode 6 digit dari aplikasi autentikator untuk melanjutkan ke
                  OPERGRID.
                </p>
              </header>

              <div className="og-auth-mfa-inline__identity">
                <ShieldCheck size={17} strokeWidth={1.8} aria-hidden="true" />

                <span>
                  Sesi login terverifikasi
                  <small>{email.trim()}</small>
                </span>
              </div>

              {errorMessage ? (
                <Alert severity="critical" title="Verifikasi belum berhasil">
                  {errorMessage}
                </Alert>
              ) : null}

              <form className="og-auth-form" onSubmit={handleMfaSubmit} noValidate>
                <Input
                  label="Kode autentikator"
                  name="totp-code"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="000000"
                  value={mfaCode}
                  disabled={verifyingMfa}
                  maxLength={6}
                  autoFocus
                  required
                  onChange={(event) => {
                    setMfaCode(event.target.value.replace(/\D/g, "").slice(0, 6));
                    setErrorMessage(null);
                  }}
                />

                <Button
                  className="og-auth-submit"
                  type="submit"
                  loading={verifyingMfa}
                  disabled={verifyingMfa || mfaCode.length !== 6}
                >
                  <KeyRound size={16} strokeWidth={1.8} aria-hidden="true" />

                  <span>
                    {verifyingMfa ? "Memverifikasi..." : "Verifikasi dan Masuk"}
                  </span>

                  {!verifyingMfa ? (
                    <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
                  ) : null}
                </Button>
              </form>

              <footer className="og-auth-card__footer og-auth-card__footer--action">
                <button
                  type="button"
                  className="og-auth-back"
                  disabled={verifyingMfa}
                  onClick={() => {
                    void handleBackToCredentials();
                  }}
                >
                  <ArrowLeft size={15} strokeWidth={1.8} aria-hidden="true" />
                  Kembali
                </button>
              </footer>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
