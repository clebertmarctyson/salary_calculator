"use client";

import { ThemeProvider } from "@/components/providers/ThemeProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={true}
      storageKey="theme"
      defaultTheme="dark"
    >
      {children}
    </ThemeProvider>
  );
};
