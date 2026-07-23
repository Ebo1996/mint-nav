"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, Check, ChevronDown, Globe, ShieldCheck } from "lucide-react";
import { t } from "@/lib/translations";

export type PortalLanguage = "en" | "am";

const LANGUAGES: { code: PortalLanguage; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "am", label: "አማርኛ",  short: "አማ" },
];

interface PortalHeaderProps {
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
    const onOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node))
        setLangOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setLangOpen(false); };
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, [langOpen]);

  const activeLang = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];
  const tr = t[language];

  return (
    <header
      className="relative z-30 flex h-[66px] shrink-0 items-center bg-header text-header-foreground"
      style={{ boxShadow: "0 4px 24px -6px rgba(8,105,118,0.6)" }}
      role="banner"
    >
      {/* decorative gradient top-edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary/40 via-[#c08a2e] to-primary/40" />
      {/* bottom hairline */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      {/* ambient glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-white/8 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3 px-5 md:px-8">

        {/* Left: back + logo + tagline */}
        <div className="flex min-w-0 items-center gap-3">
          {showBackButton && (
            <>
              <button
                type="button"
                onClick={onBackToHome}
                className="group inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-white/12 px-3 py-1.5 ring-1 ring-white/20 transition-all hover:bg-white/18 active:scale-95"
              >
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span className="hidden text-[11px] font-semibold tracking-wide sm:inline">{tr.backToHome}</span>
              </button>
              <span className="hidden h-7 w-px bg-white/20 sm:block" aria-hidden="true" />
            </>
          )}

          <Image
            src="/images/mint-logo.png"
            alt="Ministry of Innovation and Technology"
            width={732}
            height={121}
            className="h-8 w-auto shrink-0 object-contain md:h-9"
            priority
          />

          <span className="hidden h-7 w-px bg-white/20 sm:block" aria-hidden="true" />

          <p className="hidden text-[11px] font-medium leading-tight text-header-foreground/65 sm:block md:text-xs">
            {language === "am" ? "ዲጂታል ቢሮ" : "Digital Office"}<br />{language === "am" ? "ናቪጌሽን ፖርታል" : "Navigation Portal"}
          </p>
        </div>

        {/* Right: official badge + lang switcher */}
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full bg-white/12 px-3 py-1.5 ring-1 ring-white/20 sm:inline-flex">
            <ShieldCheck className="size-3.5 text-header-foreground/80" />
            <span className="text-[11px] font-semibold tracking-wide text-header-foreground/80">{tr.officialPortal}</span>
          </span>

          <div ref={langMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((p) => !p)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-white/30 bg-white/20 px-4 py-2 transition-all hover:bg-white/30 active:scale-95"
            >
              <Globe className="size-4 text-white" />
              <span className="text-sm font-extrabold uppercase tracking-widest text-white">
                {activeLang.label}
              </span>
              <ChevronDown className={`size-4 text-white transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
            </button>

            {langOpen && (
              <div
                role="listbox"
                className="animate-fade-in absolute right-0 top-[calc(100%+6px)] w-52 overflow-hidden rounded-md border-2 border-primary/40 bg-white shadow-[0_8px_30px_rgba(8,105,118,0.35)]"
              >
                {LANGUAGES.map((lang, idx) => {
                  const isActive = lang.code === language;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      onClick={() => { onLanguageChange(lang.code); setLangOpen(false); }}
                      className={`flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left text-[15px] font-extrabold uppercase tracking-wider transition-colors ${
                        idx > 0 ? "border-t border-gray-100" : ""
                      } ${
                        isActive
                          ? "bg-primary text-white"
                          : "bg-white text-gray-800 hover:bg-primary/8 hover:text-primary"
                      }`}
                    >
                      {lang.label}
                      {isActive && <Check className="size-5" />}
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
