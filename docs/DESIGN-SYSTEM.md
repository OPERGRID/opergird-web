# OPERGRID Design System

## Identity

**Industrial Precision + Enterprise Clarity + Premium Restraint**

OPERGRID is an operational web platform. Its rule is **Global UI, contextual workflow**. The system favors dense, legible information, calm surfaces, precise alignment, and long-session comfort. It must not resemble SCADA, a command center, a generic dashboard template, or a consumer application.

## Source of truth

`src/styles/system.css` owns semantic tokens, themes, density, type, motion, and responsive layout values. `src/styles/components.css` owns production component appearance. `src/styles/shell.css` owns workspace chrome and page structure. `src/styles/ui-lab.css` arranges documentation only. `src/config/design-system.ts` exposes a small typed contract; CSS is authoritative for rendered values.

## Foundations

- Typography: Chakra Petch for compact structural headings, Inter for controls and reading, JetBrains Mono for codes and aligned operational values. Body text is 13px; headings stay compact.
- Color: tuned light and dark semantic palettes. Cyan marks focus, selection, or a primary action; it is not a decorative background. Status color never carries meaning alone.
- Spacing: a 4px rhythm. Standard panels use 16px padding; density adjusts panel and table rhythm.
- Geometry: one 36px action and field height; 6px control radius, 8px surface radius, 10px overlay radius. There are no button size variants.
- Borders and elevation: thin neutral borders separate work areas. Shadows are reserved for overlays and slight surface separation.
- Focus: visible 2px outline and soft focus ring on interactive controls in both themes.
- Motion: 120ms micro interactions and 180ms transitions; reduced-motion preferences collapse duration.
- Density: comfortable, standard, and compact share control geometry. Density adjusts panel padding and table row height.
- Responsive: desktop workspace above 1024px; drawer navigation below that width; forms and split layouts collapse by 768px; page gutters narrow by 390px. Wide tables scroll horizontally.

## Interaction review

All production components must work with keyboard and touch, preserve disabled and error states, display readable labels, and fit the viewport. React Aria Components provides interaction and accessibility primitives; OPERGRID CSS owns every visual decision.
