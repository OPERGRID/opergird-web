export const designSystem = {
  identity: {
    philosophy: "Industrial Precision + Enterprise Clarity",
    visualPrinciple: "Premium Restraint",
    uiRule: "Global UI, contextual workflow",
  },
  density: { default: "standard", values: ["comfortable", "standard", "compact"] },
  controlHeight: "2.25rem",
  typography: {
    family: { display: "Chakra Petch", body: "Inter", mono: "JetBrains Mono" },
  },
  severity: ["neutral", "info", "success", "warning", "danger"],
  breakpoints: {
    mobile: 390,
    tablet: 768,
    compactWorkspace: 1024,
    laptop: 1280,
    desktop: 1440,
  },
} as const;

export type OpergridDensity = (typeof designSystem.density.values)[number];
export type OpergridSeverity = (typeof designSystem.severity)[number];
