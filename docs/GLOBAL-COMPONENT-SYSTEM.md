# OPERGRID Global Component System

## Purpose

This document defines the production UI components shared across OPERGRID.

The `/ui-lab` route is documentation and validation only.

The actual components live under:

- `src/components/ui`
- `src/components/layout`

Feature code must consume those shared components.

## Core rule

**Feature owns workflow. Global UI owns appearance and interaction language.**

A feature may define:

- business data;
- workflow;
- validation rules;
- composition;
- feature-specific domain views.

A feature must not redefine:

- button geometry;
- card geometry;
- form geometry;
- typography scale;
- status appearance;
- global table styling;
- alert appearance;
- dialog appearance;
- page heading structure;
- toolbar language.

## Geometry contract

### Buttons

OPERGRID has one standard control height.

There are no small / medium / large button sizes.

Allowed button variants describe purpose, not geometry:

- primary
- secondary
- ghost
- danger

Icon-only buttons use the same control height and are square.

### Forms

Input, Select, Search and action controls share the global control height.

Textarea is vertically flexible but keeps the same border, radius, typography,
focus behavior and semantic rules.

### Card

Card uses one primary global radius and one border language.

Feature code should not create custom generic cards.

### Alert

Allowed global severity:

- info
- success
- warning
- critical

Business-specific labels may map onto those global visual states.

## Production components

Current shared component set:

- Button
- Input
- Select
- Textarea
- SearchField
- Checkbox
- Switch
- Badge
- Alert
- Surface
- Card
- Divider
- Skeleton
- Table primitives
- Pagination
- Tabs
- EmptyState
- Dialog
- PageHeader
- Toolbar

## UI Lab rule

UI Lab should demonstrate the production component itself.

Do not recreate a fake version of a component with UI-Lab-only CSS when a
production component exists.

## Reuse rule

Before creating a new visual primitive:

1. check the global component system;
2. reuse an existing global component if possible;
3. extend the global component only when the requirement is genuinely shared;
4. create feature-specific UI only when it represents domain workflow rather
   than a generic visual primitive.
