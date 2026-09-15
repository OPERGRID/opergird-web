import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { getSupabasePublicConfig } from "@/config/supabase";

const ANONYMOUS_PATHS = new Set([
  "/login",
  "/api/health",
  "/api/auth/captcha",
  "/api/auth/login",
]);
const ROOT_PATH = "/";

const AUTH_TRANSITION_PATHS = new Set(["/mfa/setup", "/mfa/challenge", "/access-denied"]);

function withPrivateNoStore(response: NextResponse) {
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  response.headers.set("Pragma", "no-cache");
  return response;
}

function redirectTo(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";

  return withPrivateNoStore(NextResponse.redirect(url));
}

export async function updateSupabaseSession(request: NextRequest) {
  const { url, anonKey } = getSupabasePublicConfig();

  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const cookie of cookiesToSet) {
          request.cookies.set(cookie.name, cookie.value);
        }

        response = NextResponse.next({
          request,
        });

        for (const cookie of cookiesToSet) {
          response.cookies.set(cookie.name, cookie.value, cookie.options);
        }
      },
    },
  });

  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;
  const isAuthenticated = !error && Boolean(claims?.sub);

  const pathname = request.nextUrl.pathname;
  const isAnonymousPath = ANONYMOUS_PATHS.has(pathname);
  const isAuthTransitionPath = AUTH_TRANSITION_PATHS.has(pathname);

  /*
   * SECURITY:
   * The root entry is deterministic. We never restore a previous page from
   * browser state or user-controlled query parameters.
   */
  if (pathname === ROOT_PATH && !isAuthenticated) {
    return redirectTo(request, "/login");
  }

  if (!isAuthenticated && !isAnonymousPath) {
    return redirectTo(request, "/login");
  }

  if (isAuthenticated && pathname === "/login") {
    return redirectTo(request, "/");
  }

  if (!isAuthenticated && isAuthTransitionPath) {
    return redirectTo(request, "/login");
  }

  return withPrivateNoStore(response);
}
