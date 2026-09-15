import { NextResponse } from "next/server";

import {
  CAPTCHA_COOKIE_NAME,
  CAPTCHA_TTL_SECONDS,
  createMathCaptcha,
} from "@/lib/auth/math-captcha";

export const dynamic = "force-dynamic";

export async function GET() {
  const challenge = createMathCaptcha();

  const response = NextResponse.json(
    {
      challenge: challenge.prompt,
      expiresInSeconds: CAPTCHA_TTL_SECONDS,
    },
    {
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
        Pragma: "no-cache",
      },
    },
  );

  response.cookies.set(CAPTCHA_COOKIE_NAME, challenge.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: CAPTCHA_TTL_SECONDS,
  });

  return response;
}
