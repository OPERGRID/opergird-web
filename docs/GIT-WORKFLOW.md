# OPERGRID Git Workflow

## Main branches

### main

Stable and deployable application state.

### develop

Integrated development state.

## Optional working branches

For substantial isolated work:

- `feature/<name>`
- `fix/<name>`
- `refactor/<name>`

OPERGRID is currently developed primarily by a solo developer,
so unnecessary Git Flow complexity should be avoided.

## Commit convention

Examples:

- `chore: initialize engineering foundation`
- `feat: add global application shell`
- `feat: add user management workflow`
- `fix: restore authentication session`
- `refactor: centralize page layout`
- `test: add permission tests`
- `docs: define functional location scope`

## Quality gate

Before integrating substantial work:

`npm run check`

## Pre-commit

Husky + lint-staged run focused checks on staged files.

Pre-commit hooks do not replace the full quality gate.
