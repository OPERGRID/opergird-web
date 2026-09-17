# OPERGRID AppShell Contract

`src/app/(workspace)/layout.tsx` keeps workspace routes inside the persistent `AppShell`. Routes remain deep-linkable and thin. The shell owns sidebar, topbar, navigation presentation, theme toggle placement, and page gutters. Features own workflow content inside `PageContainer`.

Navigation configuration remains in `src/config/navigation.ts`. The primary sidebar section is `TOOLS`, with `User Management` as the first foundation tool. User Management exposes Overview, Data Pengguna, Role & Permission, Assignment & Scope, and Audit Activity routes under `/tools/user-management`. The internal `/ui-lab` route may remain available for design-system validation, but it is not part of the primary operational sidebar.

The desktop sidebar can collapse; at 1024px and below, navigation opens as an overlay. Active route matching, nested User Management state, mobile open/close state, and theme persistence are preserved. When the desktop sidebar is collapsed, nested navigation is hidden and the tool icon remains available to expand the sidebar.

The OPERGRID brand mark is rendered by the shared shell styling and remains compatible with both light and dark appearance modes. The visual system comes from `src/styles/system.css`, `src/styles/shell.css`, and shell-specific extension styles. Feature routes must not recreate global chrome or define local page-width, spacing, or theme rules. Responsive behavior is reviewed at 1440, 1280, 1024, 768, and 390px.
