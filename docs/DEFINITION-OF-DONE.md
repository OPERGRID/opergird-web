# OPERGRID Definition of Done

A substantial change is complete only when all relevant items pass.

## Engineering

- ESLint: zero errors and zero warnings.
- Architecture check: pass.
- Next.js type generation: pass.
- TypeScript: pass.
- Automated tests: pass.
- Production build: pass.
- Prettier: pass.
- Git diff check: pass.

## Architecture

- route remains thin;
- dependency direction remains valid;
- server/client boundary remains valid;
- shared infrastructure is not duplicated inside a feature.

## Product

- change solves an agreed user/operational problem;
- no silent workflow invention;
- shared master data is reused where appropriate;
- cross-module impact is understood.

## UI/UX

When UI exists:

- uses global page structure;
- uses global components;
- light/dark behavior is valid;
- responsive behavior is valid;
- loading/empty/error states are handled;
- visual language remains consistent with reference pages.

## Feature

When changing a feature:

- its README reflects the agreed workflow;
- inputs and outputs are clear;
- feature boundary is respected.

## Git

- meaningful commit message;
- no generated junk files;
- no secrets committed;
- working tree clean after commit.
