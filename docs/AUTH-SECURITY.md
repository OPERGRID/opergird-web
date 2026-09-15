# OPERGRID Authentication Security Baseline

Status: foundation in progress.

A working login page is not sufficient security for OPERGRID.

## Current foundation

- Supabase SSR browser/server clients.
- Session refresh at the Next.js Proxy boundary.
- Protected routes validate identity with `supabase.auth.getClaims()`.
- Server authorization must not rely on `getSession()`.
- Invalid or unverifiable authentication fails closed.
- Session-aware responses use private/no-store cache controls.
- Login credential failures use non-enumerating messages.
- Only a public client key is exposed to the browser.
- Baseline HTTP security headers are enabled.

## Required before production

1. MFA
   - TOTP MFA.
   - Privileged access should require AAL2.
   - Enrollment, challenge, recovery, and factor management must be tested.

2. Database authorization
   - RLS enabled on every application table.
   - Explicit authenticated policies.
   - Role and unit access enforced at database level, not only in UI.
   - No broad authenticated write policies.

3. RBAC
   - Server-validated profile, role, and unit membership.
   - Least-privilege defaults.
   - Admin operations isolated from ordinary users.

4. Abuse protection
   - Review Supabase Auth rate limits.
   - Add CAPTCHA / Turnstile where appropriate.
   - Monitor repeated authentication failures.

5. Session controls
   - Logout.
   - Session revocation behavior.
   - Re-authentication for sensitive operations.
   - Session lifetime and idle policy aligned with organizational requirements.

6. Account lifecycle
   - No public self-registration unless explicitly approved.
   - Controlled provisioning and deprovisioning.
   - Disabled/inactive users denied application access.
   - Periodic access review.

7. Auditability
   - Security-relevant actions logged.
   - Admin changes logged.
   - Role and unit-access changes logged.
   - Sensitive events attributable to user and timestamp.

8. Deployment hardening
   - HTTPS only.
   - Production secrets managed outside Git.
   - Supabase Security Advisor reviewed.
   - Database SSL enforcement reviewed.
   - Network restrictions reviewed where applicable.
   - CSP added after deployment origins are finalized and tested.

## Security rule

UI visibility is never authorization.

Hiding a button, menu, route, or page must never be the only security control.
Authorization must also be enforced by trusted server/database policy.
