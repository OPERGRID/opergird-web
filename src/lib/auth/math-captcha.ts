import "server-only";

import { createHmac, randomBytes, randomInt, timingSafeEqual } from "node:crypto";

export const CAPTCHA_COOKIE_NAME = "og_math_captcha";
export const CAPTCHA_TTL_SECONDS = 180;

type MathCaptchaChallenge = {
  prompt: string;
  token: string;
};

function getCaptchaSecret() {
  const value = process.env.OPERGRID_CAPTCHA_SECRET;

  if (!value || value.length < 32) {
    throw new Error(
      "Missing or weak server environment variable: OPERGRID_CAPTCHA_SECRET",
    );
  }

  return value;
}

function signCaptcha(nonce: string, expiresAt: number, answer: string) {
  return createHmac("sha256", getCaptchaSecret())
    .update(`${nonce}.${expiresAt}.${answer}`)
    .digest("base64url");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function createMathCaptcha(): MathCaptchaChallenge {
  const useAddition = randomInt(0, 2) === 0;

  let left = randomInt(2, 10);
  let right = randomInt(1, 10);

  if (!useAddition && right > left) {
    [left, right] = [right, left];
  }

  const answer = String(useAddition ? left + right : left - right);
  const operator = useAddition ? "+" : "−";
  const nonce = randomBytes(18).toString("base64url");
  const expiresAt = Date.now() + CAPTCHA_TTL_SECONDS * 1000;
  const signature = signCaptcha(nonce, expiresAt, answer);

  return {
    prompt: `${left} ${operator} ${right} =`,
    token: `${nonce}.${expiresAt}.${signature}`,
  };
}

export function verifyMathCaptcha(token: string | undefined, answer: unknown) {
  if (!token || typeof answer !== "string") {
    return false;
  }

  const normalizedAnswer = answer.trim();

  if (!/^\d{1,2}$/.test(normalizedAnswer)) {
    return false;
  }

  const [nonce, rawExpiresAt, signature, ...extra] = token.split(".");

  if (!nonce || !rawExpiresAt || !signature || extra.length > 0) {
    return false;
  }

  const expiresAt = Number(rawExpiresAt);

  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) {
    return false;
  }

  const expected = signCaptcha(nonce, expiresAt, normalizedAnswer);

  return safeEqual(signature, expected);
}
