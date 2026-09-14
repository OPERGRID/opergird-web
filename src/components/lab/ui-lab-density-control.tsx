"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { designSystem, type OpergridDensity } from "@/config/design-system";

export function UiLabDensityControl() {
  const [density, setDensity] = useState<OpergridDensity>(designSystem.density.default);

  useEffect(() => {
    document.documentElement.dataset.density = density;
  }, [density]);

  return (
    <div className="og-ui-lab-density" aria-label="Pilih density UI">
      <span className="og-ui-lab-density__label">Density</span>

      <div className="og-ui-lab-density__actions">
        {designSystem.density.values.map((value) => (
          <Button
            key={value}
            variant={density === value ? "primary" : "ghost"}
            aria-pressed={density === value}
            onClick={() => {
              setDensity(value);
            }}
          >
            {value}
          </Button>
        ))}
      </div>
    </div>
  );
}
