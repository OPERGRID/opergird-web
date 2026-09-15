import { NextRequest, NextResponse } from "next/server";

import { CAPTCHA_COOKIE_NAME, verifyMathCaptcha } from "@/lib/auth/math-captcha";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type LoginBody = {
  email?: unknown;
  password?: unknown;
  captchaAnswer?: unknown;
};

function json(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "private, no-store, max-age=0",
      Pragma: "no-cache",
    },
  });
}

function clearCaptcha(response: NextResponse) {
  response.cookies.set(CAPTCHA_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  return response;
}

function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return true;
  }

  try {
    return new URL(origin).origin === request.nextUrl.origin;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return clearCaptcha(
      json(
        {
          code: "REQUEST_REJECTED",
          message: "Permintaan login tidak dapat diproses.",
        },
        403,
      ),
    );
  }

  let body: LoginBody;

  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return clearCaptcha(
      json(
        {
          code: "INVALID_REQUEST",
          message: "Permintaan login tidak valid.",
        },
        400,
      ),
    );
  }

  const captchaToken = request.cookies.get(CAPTCHA_COOKIE_NAME)?.value;

  if (!verifyMathCaptcha(captchaToken, body.captchaAnswer)) {
    return clearCaptcha(
      json(
        {
          code: "CAPTCHA_INVALID",
          message: "Jawaban verifikasi tidak sesuai atau sudah kedaluwarsa.",
        },
        400,
      ),
    );
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !password) {
    return clearCaptcha(
      json(
        {
          code: "INVALID_REQUEST",
          message: "Lengkapi email dan kata sandi untuk melanjutkan.",
        },
        400,
      ),
    );
  }

  const supabase = await createSupabaseServerClient();

  let signInResult;

  try {
    signInResult = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  } catch {
    return clearCaptcha(
      json(
        {
          code: "AUTH_UNAVAILABLE",
          message: "Layanan autentikasi belum dapat dihubungi. Coba kembali.",
        },
        503,
      ),
    );
  }

  if (signInResult.error) {
    const normalized = signInResult.error.message.toLowerCase();

    if (normalized.includes("too many requests") || normalized.includes("rate limit")) {
      return clearCaptcha(
        json(
          {
            code: "RATE_LIMITED",
            message:
              "Terlalu banyak percobaan masuk. Tunggu beberapa saat lalu coba kembali.",
          },
          429,
        ),
      );
    }

    return clearCaptcha(
      json(
        {
          code: "AUTH_FAILED",
          message: "Email atau kata sandi tidak sesuai, atau akun tidak dapat digunakan.",
        },
        401,
      ),
    );
  }

  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();

  if (claimsError || !claimsData?.claims?.sub) {
    await supabase.auth.signOut();

    return clearCaptcha(
      json(
        {
          code: "SESSION_INVALID",
          message: "Sesi login belum dapat diverifikasi. Silakan masuk kembali.",
        },
        401,
      ),
    );
  }

  if (claimsData.claims.aal === "aal2") {
    return clearCaptcha(
      json(
        {
          ok: true,
          next: "/",
        },
        200,
      ),
    );
  }

  const factors = await supabase.auth.mfa.listFactors();

  if (factors.error) {
    await supabase.auth.signOut();

    return clearCaptcha(
      json(
        {
          code: "MFA_UNAVAILABLE",
          message:
            "Status verifikasi dua langkah belum dapat diperiksa. Silakan masuk kembali.",
        },
        503,
      ),
    );
  }

  const hasVerifiedTotp = factors.data.totp.some(
    (factor) => factor.status === "verified",
  );

  return clearCaptcha(
    json(
      {
        ok: true,
        next: hasVerifiedTotp ? "/mfa/challenge" : "/mfa/setup",
      },
      200,
    ),
  );
}
