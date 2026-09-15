# OPERGRID Global Component System

**Feature owns workflow. Global UI owns appearance and interaction language.**

Production components live in `src/components/ui` and `src/components/layout`. They are used by feature modules and demonstrated in `/ui-lab`. UI Lab must never implement a substitute component.

## Families

- Foundation: semantic tokens, light/dark theme, density, focus, motion, and responsive layout.
- Actions and forms: one control geometry; buttons by purpose, including icon, group, split, copy, and loading actions; aligned text, select, date/time, choice, and file input controls.
- Navigation: tabs, breadcrumbs, menus, pagination, stepper, sidebar, and command palette.
- Data: surfaces, cards, badges, table primitives, AdvancedDataTable, metrics, key/value, progress, timeline, and tree structures.
- Feedback: alert, toast, loading, empty, error, permission, offline, and progress states.
- Overlays: accessible dialog, confirmation, popover, tooltip, menu, and drawer/sheet.
- Layout: shared shell, page container/header, toolbar, filter bar, section header, grid, stack, split pane, master/detail, and sticky action bar.
- Operational patterns: filters, selection and bulk actions, approval/workflow presentation, metadata, attachments, import/export feedback, conflict and unsaved-change states.

React Aria Components is the interaction foundation only. No library styling is imported. TanStack Table powers AdvancedDataTable. Domain-specific business rules and visual severity mapping stay with the consuming feature.

## Review rule

Every new global component must be usable in dark and light themes, with keyboard focus, disabled and error behavior where relevant, and layouts at 1440, 1280, 1024, 768, and 390px. `npm run check` and interaction tests are required for substantial changes.
