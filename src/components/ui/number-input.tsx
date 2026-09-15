import { forwardRef } from "react";
import { Input, type InputProps } from "@/components/ui/input";

export const NumberInput = forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
  function NumberInput(props, ref) {
    return <Input ref={ref} type="number" inputMode="decimal" {...props} />;
  },
);
