# OPERGRID AppShell Contract

`src/app/(workspace)/layout.tsx` keeps workspace routes inside the persistent `AppShell`. Routes remain deep-linkable and thin. The shell owns sidebar, topbar, navigation presentation, theme toggle placement, and page gutters. Features own workflow content inside `PageContainer`.

Navigation configuration remains in `src/config/navigation.ts`. The current routes are the workspace root and internal `/ui-lab`. The desktop sidebar can collapse; at 1024px and below, navigation opens as an overlay. Active route matching, mobile open/close state, and theme persistence are preserved across the visual reset. The user block remains a placeholder until authentication/profile work is agreed.

The visual system comes from `src/styles/system.css` and `src/styles/shell.css`. Feature routes must not recreate global chrome or define local page-width, spacing, or theme rules. Responsive behavior is reviewed at 1440, 1280, 1024, 768, and 390px.
