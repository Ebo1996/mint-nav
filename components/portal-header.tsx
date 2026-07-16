"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Globe,
  ShieldCheck,
} from "lucide-react";

export type PortalLanguage = "en" | "am";

const LANGUAGES: { code: PortalLanguage; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "am", label: "አማርኛ", short: "አማ" },
];

interface PortalHeaderProps {
  /** Show the "Back to Home" control — pass true on building/detail pages. */
  showBackButton?: boolean;
  onBackToHome?: () => void;
  language: PortalLanguage;
  onLanguageChange: (language: PortalLanguage) => void;
}

export function PortalHeader({
  showBackButton = false,
  onBackToHome,
  language,
  onLanguageChange,
}: PortalHeaderProps) {
  const [langOpen, setLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!langOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target as Node)
      ) {
        setLangOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setLangOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [langOpen]);

  const activeLanguage =
    LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  return (
    <header
      className="relative z-30 flex h-[70px] shrink-0 items-center overflow-visible bg-header text-header-foreground shadow-[0_4px_20px_-6px_rgba(8,105,118,0.55)]"
      role="banner"
    >
      {/* ambient glow — echoes the teal in the shadow above */}
      <div className="pointer-events-none absolute -left-16 -top-24 size-56 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 -bottom-28 size-56 rounded-full bg-white/5 blur-3xl" />
      {/* hairline accent along the bottom edge */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="relative mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3 px-5 md:px-8">
        <div className="flex min-w-0 items-center gap-3 md:gap-4">
          {showBackButton && (
            <>
              <button
                type="button"
                onClick={onBackToHome}
                className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20 transition-all duration-200 hover:bg-white/15 active:scale-95"
              >
                <ArrowLeft
                  className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
                <span className="hidden text-[11px] font-semibold tracking-wide sm:inline md:text-xs">
                  Back to Home
                </span>
              </button>
              <span
                className="hidden h-8 w-px bg-white/20 sm:block"
                aria-hidden="true"
              />
            </>
          )}

          {/* wide lockup — 732x121 source, constrained to the bar height */}
          <Image
            src="/images/mint-logo.png"
            alt="Ministry of Innovation and Technology"
            width={732}
            height={121}
            className="h-8 w-auto shrink-0 object-contain md:h-10"
            priority
          />

          <span
            className="hidden h-8 w-px bg-white/20 sm:block"
            aria-hidden="true"
          />

          <p className="hidden truncate text-[11px] font-medium leading-tight text-header-foreground/70 sm:block md:text-xs">
            Digital Office
            <br />
            Navigation Portal
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <span className="hidden items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20 sm:inline-flex">
            <ShieldCheck
              className="size-3.5 text-header-foreground/80"
              aria-hidden="true"
            />
            <span className="text-[11px] font-semibold tracking-wide text-header-foreground/80">
              Official Portal
            </span>
          </span>

          {/* language switcher */}
          <div ref={langMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20 transition-all duration-200 hover:bg-white/15 active:scale-95"
            >
              <Globe
                className="size-3.5 text-header-foreground/80"
                aria-hidden="true"
              />
              <span className="text-[11px] font-semibold tracking-wide text-header-foreground/80 md:text-xs">
                {activeLanguage.short}
              </span>
              <ChevronDown
                className={`size-3.5 text-header-foreground/60 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            {langOpen && (
              <div
                role="listbox"
                className="animate-fade-in absolute right-0 top-[calc(100%+8px)] w-40 overflow-hidden rounded-xl border border-border bg-card p-1 text-foreground shadow-[0_18px_45px_-12px_rgba(8,105,118,0.35)]"
              >
                {LANGUAGES.map((lang) => {
                  const isActive = lang.code === language;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangOpen(false);
                      }}
                      className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-150 ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/80 hover:bg-accent"
                      }`}
                    >
                      {lang.label}
                      {isActive && (
                        <Check
                          className="size-4 text-primary"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
