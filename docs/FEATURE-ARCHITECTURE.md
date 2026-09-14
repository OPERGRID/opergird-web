# OPERGRID Feature Architecture

Features live under:

`src/features/<feature-name>`

A feature may contain, only when required:

- README.md
- components/
- server/
- queries/
- mutations/
- schemas/
- types/
- utils/

Do not create empty architecture only for appearance.

Feature owns:

- operational workflow
- domain validation
- domain logic
- feature-specific presentation
- feature-specific server operations

Feature must not redefine:

- AppShell
- page width
- typography
- buttons
- inputs
- dialogs
- global tables
- design tokens
- responsive rules

Before substantial implementation, each feature gets a short README describing:

- purpose
- primary users
- operational jobs
- agreed workflow
- input
- output
- related modules
- explicit boundaries
