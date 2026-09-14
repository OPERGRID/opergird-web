# OPERGRID UI Laboratory

## Purpose

`/ui-lab` is an internal visual validation route for the global OPERGRID
Design System.

It is not a business module.

Its purpose is to validate shared UI decisions before feature development.

## Review matrix

Review the laboratory in:

- dark theme;
- light theme;
- sidebar expanded;
- sidebar collapsed;
- desktop;
- tablet/mobile;
- comfortable density;
- standard density;
- compact density.

## Review areas

The laboratory currently validates:

- Chakra Petch / Inter / JetBrains Mono role separation;
- theme color tokens;
- global semantic severity;
- button hierarchy;
- input/select states;
- badge vocabulary;
- surface hierarchy;
- operational numeric presentation;
- loading skeleton;
- responsive layout.

## Rule

If a visual issue is global, fix the Design System or global primitive.

Do not patch the laboratory locally to hide a global inconsistency.

## Feature gate

Feature UI development should begin only after the shared visual language is
accepted.

This keeps:

**Global UI, contextual workflow.**

## Premium restraint checkpoint

The accepted visual direction is compact and quiet.

Review specifically for:

- page heading near 19px, not oversized;
- body/UI text near 12.5px;
- compact navigation around 13-14px;
- KPI/data values around 30px when emphasis is justified;
- 8px primary panel radius;
- low-noise surfaces and borders;
- accent cyan used as signal rather than decoration.

If the page feels like a showcase or marketing dashboard, reduce visual
weight before feature development.
