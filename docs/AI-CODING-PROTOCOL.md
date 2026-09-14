# OPERGRID AI Coding Protocol

This contract applies to ChatGPT, Claude, Copilot, and other AI coding tools.

## Mandatory reading order

Before changing OPERGRID, read:

1. `docs/OPERGRID-PRODUCT.md`
2. `docs/APPLICATION-ARCHITECTURE.md`
3. `docs/FEATURE-ARCHITECTURE.md`
4. `docs/ROUTING-CONTRACT.md`
5. `docs/FEATURE-RULES.md`
6. `docs/DEFINITION-OF-DONE.md`
7. the README of the feature being changed.

## Do not guess product behavior

If workflow behavior has not been agreed, do not invent it.

Explain the proposed user flow first.

## Reuse before create

Before creating any UI or infrastructure component:

- search existing code;
- identify reusable components;
- identify whether a global component should be extended.

Do not solve a local issue by cloning global behavior.

## Scope discipline

Change only what is required by the agreed task.

Do not redesign unrelated modules silently.

## Route discipline

Keep `src/app` thin.

Do not place large feature implementations directly in route files.

## Server/client discipline

Server is default.

Use client code only when browser interaction requires it.

Never expose privileged secrets to client code.

## Patch discipline

For substantial scripted changes:

- use one complete PowerShell patch;
- write text files as UTF-8 without BOM;
- check native command exit codes;
- stop Node when generated state must be cleaned;
- clean `.next` and `tsconfig.tsbuildinfo` when appropriate;
- run the full quality gate;
- commit only after all checks pass.

## Before coding a feature

State:

- what existing global pieces will be reused;
- what global piece must change, if any;
- what feature-specific code will be created;
- what other module is affected, if any.

## Never use build success as the only proof

A task is complete only when engineering, architecture,
product rules, and feature behavior all remain valid.
