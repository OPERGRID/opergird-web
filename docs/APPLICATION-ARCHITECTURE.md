# OPERGRID Application Architecture

## Core direction

Route -> Feature -> Shared Infrastructure -> Backend

## src/app

Routing layer only:

- route groups
- layouts
- route handlers
- metadata
- composing features

Routes must remain thin.

## src/app/(workspace)

Authenticated operational workspace.
This will later host the persistent SPA-like AppShell.

## src/app/(auth)

Authentication experience only.

## src/app/api

Thin Next.js route handlers.
Complex business logic belongs to feature/server/backend layers.

## src/features

Business/domain modules.
Features own:

- workflow
- domain validation
- domain forms
- feature queries/mutations
- domain-specific presentation

Features do not own the global design system.

## src/components

Global reusable UI:

- ui
- layout
- patterns
- providers

## src/lib

Reusable technical infrastructure:

- Supabase
- auth helpers
- utilities

lib must not depend on feature implementations.

## src/config

Central app configuration.

## Dependency rules

Forbidden:

- components -> features
- components -> app
- lib -> features
- lib -> app
- config -> features
- config -> app
- features -> app

## Server/client

Server is default.

Client Components are used only for browser interaction/state.

Server-only modules must import:

`server-only`

## Supabase

Browser/server clients are separate.

Privileged credentials must never enter browser code.

## OPERGRID principle

Global UI, contextual workflow.

Different modules may have different workflows,
but must share one visual and interaction system.

## Quality

Architecture is checked with:

`npm run arch:check`

and included in:

`npm run check`
