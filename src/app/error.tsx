"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/**
 * Route-level error boundary. It reports the failure honestly instead of
 * showing a success-looking screen, and offers the two safe next steps.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaced in the browser console for diagnostics; no third-party reporting
    // service is configured, and nothing is transmitted automatically.
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="flex-1">
      <Container className="flex flex-col items-start py-20 sm:py-28">
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-cyan/90">
          Something went wrong
        </p>
        <h1 className="mt-4 text-balance text-[clamp(2rem,6vw,3.25rem)] font-semibold leading-[1.05]">
          This page could not load.
        </h1>
        <p
          role="alert"
          className="mt-4 max-w-lg text-[1rem] leading-relaxed text-white/60"
        >
          An unexpected error interrupted rendering. Your input was not
          submitted anywhere. Try again, or return to the homepage.
        </p>

        {error.digest && (
          <p className="mt-3 text-xs text-white/55">
            Reference: <code className="font-mono">{error.digest}</code>
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={reset}>
            <RotateCcw aria-hidden="true" className="size-4" />
            Try again
          </Button>
          <ButtonLink href="/" variant="secondary" size="lg">
            Back to the homepage
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}
