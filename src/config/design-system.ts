export const designSystem = {
  identity: {
    philosophy: "Industrial Precision + Enterprise Clarity",
    uiRule: "Global UI, contextual workflow",
  },

  typography: {
    family: {
      display: "Chakra Petch",
      body: "Inter",
      mono: "JetBrains Mono",
    },

    size: {
      display: "2.25rem",
      h1: "1.875rem",
      h2: "1.375rem",
      h3: "1.125rem",
      bodyLarge: "1rem",
      body: "0.875rem",
      ui: "0.875rem",
      small: "0.8125rem",
      caption: "0.75rem",
    },
  },

  density: {
    default: "standard",
    values: ["comfortable", "standard", "compact"],
  },

  radius: {
    xs: "0.25rem",
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.625rem",
    xl: "0.75rem",
    xxl: "0.875rem",
    pill: "999px",
  },

  spacing: {
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
  },

  motion: {
    micro: "120ms",
    hover: "150ms",
    shell: "200ms",
    dialog: "200ms",
  },

  icon: {
    compact: 16,
    navigation: 18,
    action: 20,
    majorState: 24,
  },

  severity: ["neutral", "info", "normal", "warning", "high", "critical"],
} as const;

export type OpergridDensity = (typeof designSystem.density.values)[number];

export type OpergridSeverity = (typeof designSystem.severity)[number];
