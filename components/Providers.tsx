"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

// 1. Explicitly type the component props interface
interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <main>
      <SessionProvider>{children}</SessionProvider>
    </main>
  );
}
