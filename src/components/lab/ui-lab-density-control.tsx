"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const densities = ["comfortable", "standard", "compact"] as const;

type Density = (typeof densities)[number];

export function UiLabDensityControl() {
  const [density, setDensity] = useState<Density>("standard");

  useEffect(() => {
    document.documentElement.dataset.density = density;
  }, [density]);

  return (
    <div className="og-ui-lab-density" role="group" aria-label="UI density">
      {densities.map((item) => (
        <Button
          key={item}
          variant={density === item ? "primary" : "ghost"}
          aria-pressed={density === item}
          onClick={() => {
            setDensity(item);
          }}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}
