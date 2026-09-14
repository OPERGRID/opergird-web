# OPERGRID Feature Rules

## Incremental development

OPERGRID is built menu by menu.

Do not design every future workflow in advance.

## Before substantial feature coding

Define:

1. purpose;
2. primary users;
3. user goal;
4. agreed workflow;
5. input;
6. output;
7. shared data used;
8. related modules;
9. explicit boundaries.

Then create/update:

`src/features/<feature>/README.md`

Keep it short.

## Reuse order

Before creating something new:

1. reuse an existing global component;
2. extend the global component if the need is reusable;
3. reuse an existing feature component when appropriate;
4. create a new global reusable component;
5. create a feature-specific component only for domain-specific behavior.

## Routes

Routes stay thin.

Business UI and workflow belong to features.

## Global UI

Features must not create local replacements for:

- page width;
- typography;
- buttons;
- inputs;
- selects;
- cards;
- dialogs;
- badges;
- standard tables;
- loading/empty/error patterns;
- global spacing.

## Feature-specific UI

Allowed when the domain genuinely requires it.

Examples:

- Functional Location hierarchy;
- Gangguan timeline;
- Thermovision measurement grid.

## Product changes

Do not silently introduce:

- new workflow status;
- new approval step;
- new role;
- major navigation concept;
- major product concept.

Discuss it first.

## Completion

A feature is not complete only because it builds.

It must also pass the current OPERGRID Definition of Done.
