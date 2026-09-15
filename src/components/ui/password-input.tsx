"use client";

import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, type InputProps } from "@/components/ui/input";

export const PasswordInput = forwardRef<
  HTMLInputElement,
  Omit<InputProps, "type" | "endAdornment">
>(function PasswordInput(props, ref) {
  const [visible, setVisible] = useState(false);
  return (
    <Input
      ref={ref}
      type={visible ? "text" : "password"}
      {...props}
      endAdornment={
        <Button
          className="og-input-wrap__action"
          variant="ghost"
          iconOnly
          aria-label={visible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
          aria-pressed={visible}
          onClick={() => setVisible((value) => !value)}
        >
          {visible ? (
            <EyeOff size={16} aria-hidden="true" />
          ) : (
            <Eye size={16} aria-hidden="true" />
          )}
        </Button>
      }
    />
  );
});
