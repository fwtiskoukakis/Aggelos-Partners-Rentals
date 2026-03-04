"use client";

import { LuxButton } from "@/components/ui";

export default function TheRoosterError({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <p className="text-center text-sm text-textMuted">
        Something went wrong loading this page.
      </p>
      <LuxButton onClick={reset}>Try again</LuxButton>
    </main>
  );
}
