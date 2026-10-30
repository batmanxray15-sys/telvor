"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { ButtonLink, buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProgressiveBlur } from "@/components/motion/progressive-blur";
import { MOTION_EASE } from "@/lib/motion";
import { isActivePath, primaryNav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const closeMenu = () => setOpen(false);

  // Escape closes the menu and returns focus to the control that opened it.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // A tap outside the header dismisses the menu.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Crossing into the desktop breakpoint removes the panel from the DOM so its
  // links can never be focused while visually hidden.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (query.matches) setOpen(false);
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const panelTransition = {
    duration: reduceMotion ? 0 : 0.32,
    ease: MOTION_EASE,
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-white/10 bg-obsidian/85 backdrop-blur-xl"
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-3">
          <Link
            href="/"
            aria-label="TELVOR — go to the homepage"
            className="inline-flex shrink-0 items-center rounded-lg py-2 transition-opacity duration-200 hover:opacity-85"
            onClick={closeMenu}
          >
            <Logo gradientId="telvor-mark-header" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-flex h-10 items-center rounded-full px-4 text-sm font-medium transition-colors duration-200",
                        active
                          ? "bg-white/[0.07] text-ink"
                          : "text-white/65 hover:bg-white/[0.04] hover:text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink
              href="/contact"
              size="md"
              className="hidden sm:inline-flex"
              onClick={closeMenu}
            >
              Start a project
            </ButtonLink>

            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setOpen((value) => !value)}
              className={cn(
                buttonStyles({ variant: "secondary", size: "md" }),
                "size-11 px-0 lg:hidden",
              )}
            >
              {open ? (
                <X aria-hidden="true" className="size-5" />
              ) : (
                <Menu aria-hidden="true" className="size-5" />
              )}
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={panelTransition}
            className="overflow-hidden border-t border-white/10 bg-obsidian/95 lg:hidden"
          >
            <Container className="py-4">
              <nav aria-label="Mobile primary">
                <ul className="flex flex-col gap-1">
                  {primaryNav.map((item) => {
                    const active = isActivePath(pathname, item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex min-h-12 items-center justify-between rounded-xl px-4 text-base font-medium transition-colors duration-200",
                            active
                              ? "bg-white/[0.07] text-ink"
                              : "text-white/75 hover:bg-white/[0.04] hover:text-ink",
                          )}
                        >
                          {item.label}
                          {active && (
                            <span
                              aria-hidden="true"
                              className="size-1.5 rounded-full bg-cyan"
                            />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-4 border-t border-white/10 pt-4">
                <ButtonLink
                  href="/contact"
                  size="lg"
                  className="w-full"
                  onClick={closeMenu}
                >
                  Start a project
                </ButtonLink>
                <p className="mt-3 text-center text-xs leading-relaxed text-white/55">
                  Prefer the detail? Read the{" "}
                  <Link
                    href="/process"
                    onClick={closeMenu}
                    className="text-cyan/90 underline decoration-cyan/30 underline-offset-2 hover:decoration-cyan"
                  >
                    process
                  </Link>
                  .
                </p>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Soft frosted edge beneath the sticky bar (desktop only, decorative). */}
      <ProgressiveBlur
        direction="bottom"
        blurLayers={4}
        blurIntensity={0.18}
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-5 translate-y-full opacity-40 lg:block"
      />
    </header>
  );
}
