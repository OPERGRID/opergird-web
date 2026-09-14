# OPERGRID Global UI Primitives

## Purpose

Global primitives are the reusable interaction vocabulary of OPERGRID.

Features must reuse these primitives before creating local equivalents.

## Current primitives

- Button
- Input
- Select
- Badge
- Surface
- Divider
- Skeleton

## Import rule

Import directly from the component file.

Example:

```tsx
import { Button } from "@/components/ui/button";
```

Do not introduce a large barrel export that can blur server/client boundaries.

## Button

Variants:

- primary
- secondary
- ghost
- danger

Sizes:

- sm
- md
- lg
- icon

Primary action must remain visually dominant.

Do not place multiple primary buttons in one local action group without a
clear hierarchy.

## Input and Select

Inputs own common:

- label;
- description;
- required indicator;
- invalid state;
- error message;
- accessibility relationships.

Features should not rebuild this structure repeatedly.

## Badge

Badge is for concise categorical state.

Severity variants:

- neutral
- info
- normal
- warning
- high
- critical

Business status text remains feature-specific.

Color meaning remains global.

## Surface

Surface groups related content.

Do not wrap every piece of information in a card.

Variants:

- default
- subtle
- elevated

Selected state uses the Design System accent border / subtle illumination.

## Divider

Use to separate adjacent content when spacing alone is insufficient.

Do not over-segment pages with excessive divider lines.

## Skeleton

Use for loading placeholders when the approximate layout is known.

Respect reduced-motion preference.

## Feature rule

A feature may create a domain-specific composition such as:

- hierarchy tree;
- timeline;
- measurement grid;

but should build that composition from global primitives where practical.

## Accessibility

All primitives must retain:

- keyboard usability;
- visible focus;
- disabled state;
- semantic HTML;
- error messaging;
- state meaning beyond color alone.

## Global component system

For the production component contract and geometry rules, read:

`docs/GLOBAL-COMPONENT-SYSTEM.md`

The shared component API, not UI-Lab-specific markup, is the production source
of truth.
