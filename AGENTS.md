# AGENTS.md - OPERGRID Coding Contract

This file is mandatory guidance for AI-assisted coding.

Before changing OPERGRID, read:

1. `docs/OPERGRID-PRODUCT.md`
2. `docs/APPLICATION-ARCHITECTURE.md`
3. `docs/FEATURE-ARCHITECTURE.md`
4. `docs/ROUTING-CONTRACT.md`
5. `docs/FEATURE-RULES.md`
6. `docs/AI-CODING-PROTOCOL.md`
7. `docs/DEFINITION-OF-DONE.md`
8. the README inside the feature being modified.

## Non-negotiable principles

OPERGRID is an operational web platform.

It is NOT:

- SCADA;
- a command center;
- a collection of independent dashboards.

Use:

**Global UI, contextual workflow.**

## Global-first rule

Before creating a local:

- page layout;
- button;
- card;
- input;
- select;
- table;
- badge;
- dialog;
- alert;
- loading state;
- empty state;
- spacing rule;
- typography rule;

check the global implementation first.

If reusable behavior is missing, improve the global system instead of
creating a local clone.

## Architecture rule

- `src/app` = routing/composition.
- `src/features` = business/domain workflow.
- `src/components` = shared UI/layout/patterns.
- `src/lib` = technical infrastructure.
- `src/config` = centralized configuration.

Do not reverse these dependency directions.

## Workflow rule

Before implementing substantial feature behavior:

1. define user goal;
2. define workflow;
3. identify input/output;
4. identify shared data;
5. identify related modules;
6. agree on the flow;
7. implement.

Do not invent workflow silently.

## Quality rule

A task is not complete merely because the page renders or build passes.

Run:

`npm run check`

and satisfy:

`docs/DEFINITION-OF-DONE.md`

## Patch rule

For substantial PowerShell patches:

- provide one complete executable patch;
- use UTF-8 without BOM;
- verify native command exit codes;
- run quality gates before commit;
- do not hide dependency conflicts with `--force` or `--legacy-peer-deps`.

## Design System rule

Before creating or changing UI, read:

`docs/DESIGN-SYSTEM.md`

OPERGRID visual direction is:

**Industrial Precision + Enterprise Clarity**

Do not create local visual tokens inside a feature when a global token exists.
Do not invent module-specific typography, color, radius, spacing, or status colors.

## Global primitive rule

Before creating feature-local controls, read:

`docs/UI-PRIMITIVES.md`

Reuse the global primitive first.

If a missing capability is broadly reusable, improve the global primitive
instead of cloning a local version.
