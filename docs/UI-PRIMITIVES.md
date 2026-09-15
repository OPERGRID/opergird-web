# OPERGRID Global UI Primitives

Import directly from production component files under `src/components/ui`. Do not create feature-local copies or a large barrel export that blurs server/client boundaries.

## Control language

Buttons use one height and purpose variants: `primary`, `secondary`, `ghost`, and `danger`. Icon-only buttons are square at that same height. Input, search, select, date, time, and action controls align to the same geometry.

Fields carry labels, helper text, required state, invalid state, and disabled/read-only state. Select, searchable select, and multi-select share a trigger and a searchable listbox panel. The `SelectOption` model supports disabled options and async-ready option replacement. Date/time fields share segmented input and calendar styling.

## Data and state

Badge severity is global; domain labels remain feature-owned. Table primitives preserve semantic markup. AdvancedDataTable adds TanStack sorting, filtering, visibility, selection, pagination, and wide-table scrolling. Alert, EmptyState, ErrorState, Skeleton, Spinner, and loader components express system state.

React Aria Components handles select, calendar, dialog, popover, menu, tooltip, and tab interaction. Sonner provides toast delivery. Visual styling remains in OPERGRID stylesheets.
