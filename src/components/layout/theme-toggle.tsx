"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";

const subscribeToClient = () => {
  return () => {};
};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    subscribeToClient,
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Mengubah tema" disabled>
        <span className="og-theme-toggle__placeholder" aria-hidden="true" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Gunakan tema terang" : "Gunakan tema gelap"}
      title={isDark ? "Tema terang" : "Tema gelap"}
      onClick={() => {
        setTheme(isDark ? "light" : "dark");
      }}
    >
      {isDark ? (
        <Sun size={18} strokeWidth={1.8} aria-hidden="true" />
      ) : (
        <Moon size={18} strokeWidth={1.8} aria-hidden="true" />
      )}
    </Button>
  );
}
