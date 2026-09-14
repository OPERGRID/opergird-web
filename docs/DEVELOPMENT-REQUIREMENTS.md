# OPERGRID Development Requirements

## Runtime baseline

- Node.js: 24.x
- npm: project package manager
- Next.js: App Router
- TypeScript: strict
- Database platform: Supabase PostgreSQL
- Development OS: Windows 10 / 11
- Primary shell: PowerShell

## Dependency lock

`package-lock.json` is committed to Git.

Do not delete the lock file during normal development.

Do not use:

- `npm install --force`
- `npm install --legacy-peer-deps`

to hide dependency conflicts.

Resolve the actual version conflict instead.

## Required quality gate

A substantial change is not complete until all checks pass:

1. ESLint
2. TypeScript
3. Tests
4. Production build

Run:

`npm run check`

## Dependency policy

Before adding a package:

1. Check whether Next.js / React already provides the capability.
2. Check whether an installed dependency already provides it.
3. Confirm the package is actively maintained.
4. Confirm the dependency solves a real product requirement.

Feature-specific packages are added only when required.

Examples:

- XLSX
- PDF generation
- charting
- maps
- drag and drop
- editors

are NOT baseline dependencies.

## Environment policy

Local secrets use `.env.local`.

`.env.local` is never committed.

`.env.example` documents environment requirements.

Privileged secrets must never enter browser code.

## File encoding

Text files:

- UTF-8 without BOM
- LF line endings
- final newline
