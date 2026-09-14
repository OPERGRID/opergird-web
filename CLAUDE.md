# CLAUDE.md - OPERGRID Coding Contract

Follow `AGENTS.md` as the primary AI coding contract.

Mandatory reading:

1. `AGENTS.md`
2. `docs/OPERGRID-PRODUCT.md`
3. `docs/APPLICATION-ARCHITECTURE.md`
4. `docs/FEATURE-ARCHITECTURE.md`
5. `docs/ROUTING-CONTRACT.md`
6. `docs/FEATURE-RULES.md`
7. `docs/AI-CODING-PROTOCOL.md`
8. `docs/DEFINITION-OF-DONE.md`
9. the README of the feature being changed.

Core rule:

**Global UI, contextual workflow.**

Do not invent product workflow.
Do not clone global UI behavior into feature-local implementations.
Do not place large business implementations in `src/app`.
Do not expose privileged secrets to client code.
Run `npm run check` before considering substantial work complete.
