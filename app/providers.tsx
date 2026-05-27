'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import { HarvestingProvider } from '@/context/HarvestingContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <HarvestingProvider>{children}</HarvestingProvider>
    </ThemeProvider>
  );
}
