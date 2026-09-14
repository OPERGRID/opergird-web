export const designSystem = {
  identity: {
    philosophy: "Industrial Precision + Enterprise Clarity",
    visualPrinciple: "Premium Restraint",
    uiRule: "Global UI, contextual workflow",
  },

  typography: {
    family: {
      display: "Chakra Petch",
      body: "Inter",
      mono: "JetBrains Mono",
    },

    size: {
      display: "1.875rem",
      h1: "1.1875rem",
      h2: "0.90625rem",
      h3: "0.8125rem",
      bodyLarge: "0.875rem",
      body: "0.78125rem",
      ui: "0.78125rem",
      small: "0.71875rem",
      caption: "0.65625rem",
    },
  },

  density: {
    default: "standard",
    values: ["comfortable", "standard", "compact"],
  },

  radius: {
    xs: "0.1875rem",
    sm: "0.3125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.625rem",
    xxl: "0.75rem",
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
    shell: "180ms",
    dialog: "180ms",
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
