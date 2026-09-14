# OPERGRID Design System v1.0

## Design philosophy

**Industrial Precision + Enterprise Clarity**

OPERGRID should feel like a mature operational engineering product.

It must not look like:

- a generic admin dashboard;
- a consumer app;
- a gaming HUD;
- a neon cyberpunk interface;
- a SCADA mimic;
- a command-center visualization.

The interface may borrow the precision and signal language of technical
instrumentation, but must preserve long-session readability.

Core product rule:

**Global UI, contextual workflow.**

---

## 1. Typography

OPERGRID uses three type families with separate responsibilities.

### Chakra Petch

Use for product identity and strong structural titles.

Examples:

- OPERGRID product name;
- module name;
- page H1;
- selected section heading;
- occasional high-level labels.

Do not use Chakra Petch for every form label or long text.

### Inter

Primary reading and interface typeface.

Use for:

- navigation;
- form labels;
- descriptions;
- table text;
- body text;
- buttons;
- dialogs;
- helper text.

### JetBrains Mono

Use for operational/numeric data where alignment and scanning matter.

Examples:

- KPI values;
- electrical measurements;
- timestamps;
- Functional Location codes;
- asset IDs;
- technical codes.

Do not use JetBrains Mono for every number embedded in prose.

### Type scale

| Token   | Size | Typical use                 |
| ------- | ---: | --------------------------- |
| display | 36px | exceptional KPI / hero data |
| h1      | 30px | page title                  |
| h2      | 22px | major section               |
| h3      | 18px | subsection                  |
| body-lg | 16px | emphasized prose            |
| body    | 14px | primary application text    |
| ui      | 14px | controls / navigation       |
| small   | 13px | compact UI / tables         |
| caption | 12px | metadata                    |

The default working density is optimized around 14px application text.

---

## 2. Dark theme

Dark mode is the visual signature of OPERGRID.

Core values:

| Role             | Value     |
| ---------------- | --------- |
| canvas           | `#060B16` |
| surface-1        | `#0D1626` |
| surface-2        | `#111D30` |
| surface-elevated | `#162338` |
| border           | `#20324A` |
| border-strong    | `#2B4563` |
| text-primary     | `#E8F0FA` |
| text-secondary   | `#9AAEC5` |
| text-muted       | `#667A92` |
| accent           | `#33D2FF` |
| accent-hover     | `#61DDFF` |
| warning          | `#F5A623` |
| success          | `#2FD69B` |
| danger           | `#FF5C6C` |

Rule:

**Cyan is a signal, not a background.**

Avoid using accent cyan simultaneously for large backgrounds, text,
borders, icons, cards, and navigation.

---

## 3. Light theme

Light mode is separately tuned and is not a simple inversion of dark mode.

| Role             | Value     |
| ---------------- | --------- |
| canvas           | `#EEF2F8` |
| surface-1        | `#FFFFFF` |
| surface-2        | `#F7F9FC` |
| surface-elevated | `#FFFFFF` |
| border           | `#D7E0EA` |
| border-strong    | `#BECADA` |
| text-primary     | `#172033` |
| text-secondary   | `#55657A` |
| text-muted       | `#8491A3` |
| accent           | `#0A7EA4` |
| accent-hover     | `#086987` |
| warning          | `#B36B00` |
| success          | `#087F5B` |
| danger           | `#C93648` |

---

## 4. Semantic status and severity

Semantic meaning is globally consistent.

Base semantic vocabulary:

- neutral;
- info;
- normal;
- warning;
- high;
- critical.

A feature may use domain-specific business labels, but maps visual severity
to these global tokens.

Examples:

- Thermovision `Critical` -> critical;
- Gangguan `Restored` -> normal;
- Asset `Inactive` -> neutral.

Features must not invent unrelated colors for equivalent severity.

---

## 5. Surfaces and cards

OPERGRID uses border and tonal separation more than generic drop shadows.

Dark surfaces may use a very subtle cyan illumination for selected or
interactive states.

Glow must remain restrained.

Never use:

- animated neon borders;
- glowing body text;
- heavy cyan halos;
- cyberpunk scan lines.

Light mode uses tonal separation and subtle neutral elevation.

---

## 6. Geometry

Radius scale:

| Token | Radius |
| ----- | -----: |
| xs    |    4px |
| sm    |    6px |
| md    |    8px |
| lg    |   10px |
| xl    |   12px |
| 2xl   |   14px |
| pill  |  999px |

Default:

- controls: 8px;
- cards: 10px;
- large panels: 12px;
- dialogs: 12-14px;
- badges: pill.

The system should feel engineered rather than overly rounded.

---

## 7. Spacing

Base grid: 4px.

Scale:

`4, 8, 12, 16, 20, 24, 32, 40, 48, 64`

Default application rhythm:

- page gutter: 24-32px;
- section gap: 24px;
- card padding: 16-20px;
- form field gap: 16px;
- dense table vertical rhythm: 8-12px.

---

## 8. Motion

Motion is functional.

Durations:

- micro interaction: 120ms;
- hover: 150ms;
- shell transition: 200ms;
- dialog: 200ms.

Avoid:

- bounce;
- overshoot;
- parallax;
- decorative continuous animation.

Respect `prefers-reduced-motion`.

---

## 9. Iconography

Use Lucide only unless the Design System is deliberately changed.

Recommended sizes:

- 16px compact control;
- 18px navigation;
- 20px standard action;
- 24px major state.

Use consistent stroke weight.

---

## 10. Density

OPERGRID supports the conceptual density levels:

- comfortable;
- standard;
- compact.

Default:

**standard**

Compact density may later be used for specific high-data workflows.

---

## 11. Data presentation

Numeric operational values should be easy to compare.

Use:

- JetBrains Mono for KPI / operational measurements;
- tabular numerals for other aligned numeric text;
- consistent right alignment for quantitative table columns;
- semantic status colors only when they add operational meaning.

---

## 12. Interaction states

Every interactive primitive must eventually support:

- default;
- hover;
- active;
- focus-visible;
- disabled;
- loading where relevant;
- invalid where relevant.

Focus must remain visible in both light and dark themes.

---

## 13. Accessibility

Minimum expectations:

- keyboard navigation;
- visible focus;
- semantic HTML;
- readable contrast;
- status meaning must not depend on color alone;
- motion reduction support.

---

## 14. UI direction

The intended character is:

**technical instrument precision + enterprise application clarity**

Use technical character through:

- typography;
- numeric presentation;
- precise borders;
- disciplined cyan signal;
- compact information hierarchy.

Do not simulate a sci-fi HUD.
