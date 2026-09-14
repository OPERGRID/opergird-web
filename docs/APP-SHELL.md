# OPERGRID AppShell Contract

## Purpose

The workspace AppShell is persistent global application chrome.

It provides:

- product identity;
- workspace navigation;
- topbar;
- theme control;
- responsive navigation behavior;
- stable content canvas.

Feature routes render inside the shell.

## Global ownership

AppShell owns:

- sidebar geometry;
- topbar geometry;
- workspace canvas;
- navigation visual language;
- theme toggle placement;
- page gutter / shell spacing;
- responsive drawer behavior.

Features must not recreate these concerns.

## Navigation rule

Navigation configuration lives in:

`src/config/navigation.ts`

Do not hardcode duplicate navigation arrays inside feature components.

The current navigation intentionally contains only the existing root workspace
route. Business menus will be added only after their module scope and route
contract are agreed.

## Persistent workspace

The route group:

`src/app/(workspace)/layout.tsx`

wraps workspace routes with `AppShell`.

This preserves the SPA-like experience while keeping deep-linkable Next.js
routes.

## Sidebar behavior

Desktop:

- expanded by default;
- can collapse to icon width;
- active route receives accent signal.

Tablet/mobile:

- sidebar becomes an overlay drawer;
- menu button opens it;
- backdrop or close control dismisses it.

## Topbar

The topbar is global chrome, not a feature toolbar.

Feature actions belong inside the page/workflow area.

## Theme

Theme switching uses the existing global ThemeProvider.

Light and dark tokens remain controlled by the Design System.

## Page container

Use:

`PageContainer`

for standard workspace page gutters and maximum content width.

Domain-specific wide layouts may deliberately opt out when their workflow
requires more space, but should not redefine global page gutters.

## User area

The current topbar user block is a structural placeholder only.

Authentication/profile data will replace it during the relevant product phase.
Do not treat the placeholder text as a final user model.

## Product rule

**Global UI, contextual workflow.**

## UI Laboratory

The internal route `/ui-lab` is allowed in workspace navigation as a
Design System validation surface.

It must not contain business workflow or become a substitute for feature pages.
