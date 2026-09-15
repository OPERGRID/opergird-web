"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nProvider } from "react-aria-components";
import { useState, type ReactNode } from "react";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/providers/theme-provider";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="opergrid-theme"
    >
      <I18nProvider locale="id-ID">
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster position="bottom-right" richColors={false} className="og-toaster" />
        </QueryClientProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
