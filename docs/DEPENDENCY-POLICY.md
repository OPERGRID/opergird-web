# OPERGRID Dependency Policy

## Baseline runtime

The baseline includes capabilities for:

- Next.js application runtime
- Supabase
- server/client query management
- data tables
- forms
- validation
- class variants
- theme support
- toast notifications
- date utilities
- icons

## Baseline development

The baseline includes:

- ESLint
- TypeScript
- Prettier
- Husky
- lint-staged
- Vitest
- Testing Library

## Rule

Do not install a new package simply because an implementation example
on the internet uses it.

Every dependency must have a defined responsibility.

## No duplicate responsibilities

Avoid installing multiple libraries that solve the same foundational problem
without a documented reason.

For example, do not casually combine multiple:

- form systems;
- query/cache systems;
- table systems;
- component systems;
- date libraries.

## Feature dependencies

Feature-specific dependencies belong to the feature requirement and are
introduced when that feature is designed.
