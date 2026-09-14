# OPERGRID UI Laboratory

## Purpose

`/ui-lab` is the living registry and visual validation environment for the
OPERGRID global production component system.

It is not a feature page and it must not become a second implementation of the
design system.

## Core rule

**UI Lab documents production components. UI Lab does not invent production
components.**

If a component is marked **Ready**, the actual reusable implementation must
exist under `src/components/ui` or `src/components/layout`.

If a component is marked **Planned**, UI Lab lists it in the registry but does
not fake the component using page-specific CSS.

## Registry scope

The registry intentionally includes more than basic primitives.

It covers:

- foundation;
- actions;
- form and input;
- navigation;
- data display;
- feedback and system states;
- overlay and floating UI;
- layout and page structure;
- operational and enterprise interaction patterns.

## Global component categories

### Foundation

Typography, color tokens, spacing, radius, iconography, motion, focus,
density and themes.

### Actions

Button, Icon Button, loading and disabled actions, Split Button, Button Group
and copy actions.

### Form and input

Input, Select, Textarea, Search, Checkbox, Switch, Radio Group, Combobox,
Multi Select, Autocomplete, date/time controls, Number Input, Password Input,
File Upload, Dropzone and structured form fields.

### Navigation

Tabs, Breadcrumb, Dropdown Menu, Context Menu, Pagination, Stepper, Sidebar
Navigation and Command Palette.

### Data display

Card, Surface, Badge, Table, Data Table behavior, metrics, description lists,
key/value display, avatars, progress, timeline, tree view, accordion and
collapsible patterns.

### Feedback and system state

Alert, Toast, Skeleton, Spinner, Empty State, Error State, Permission State,
Offline State and loading overlays.

### Overlay and floating UI

Dialog, confirmation dialog, Drawer, Sheet, Popover, Tooltip and dropdown
panels.

### Layout and page structure

AppShell, PageContainer, PageHeader, Toolbar, FilterBar, SectionHeader,
Divider, Grid, Stack, SplitPane, MasterDetail and StickyActionBar.

### Operational and enterprise patterns

Status summary, filter chips, advanced filters, saved filters, bulk actions,
selection counter, audit trail, activity feed, approval state, workflow step,
entity header, metadata panel, attachments, import/export feedback, conflict
state and unsaved-change state.

## Review rule

Before a global component is marked Ready:

1. dark mode must be reviewed;
2. light mode must be reviewed;
3. standard, compact and comfortable density must remain usable;
4. keyboard focus must be visible;
5. desktop and mobile layout must remain coherent;
6. the component must have a production implementation outside UI Lab;
7. feature code must be able to reuse it without copying UI-Lab CSS.
