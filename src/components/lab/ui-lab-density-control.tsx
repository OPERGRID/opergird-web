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
    <div className="og-ui-lab-density">
      <div>
        <p className="og-ui-lab-control-label">Density</p>

        <p className="og-ui-lab-control-copy">
          Ubah kepadatan global untuk memeriksa tinggi control dan ritme data.
        </p>
      </div>

      <div className="og-ui-lab-density__actions" aria-label="Pilih density UI">
        {designSystem.density.values.map((value) => (
          <Button
            key={value}
            variant={density === value ? "primary" : "secondary"}
            size="sm"
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
