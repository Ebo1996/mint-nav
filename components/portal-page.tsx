"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { buildings, type SearchHit } from "@/lib/ministry-data";
import { DirectorySearch } from "@/components/directory-search";
import { t, type Lang } from "@/lib/translations";

interface PortalPageProps {
  language: Lang;
  onViewBuilding: (buildingId: string) => void;
  onSearchSelect: (hit: SearchHit) => void;
  onGoHome: () => void;
}

export function PortalPage({ language, onViewBuilding, onSearchSelect, onGoHome }: PortalPageProps) {
  const tr = t[language];

  // Amharic building descriptions
  const buildingDesc = (id: string) =>
    id === "building-a" ? tr.buildingADesc : tr.buildingBDesc;

  return (
    <div className="relative h-full w-full overflow-y-auto">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 size-[480px] rounded-full bg-primary/7 blur-[100px]" />
        <div className="absolute -bottom-32 right-0 size-[360px] rounded-full bg-[#c08a2e]/5 blur-[90px]" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.022]" aria-hidden="true">
          <defs>
            <pattern id="pdot" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pdot)" />
        </svg>
      </div>

      <div className="relative mx-auto flex h-full max-w-[1000px] flex-col gap-0 px-5 py-8 md:px-10 md:py-10">

        {/* ── Search + Building Cards (centered) ── */}
        <div className="flex flex-col gap-6 animate-fade-in">

          {/* Back to Home */}
          <div>
            <button
              type="button"
              onClick={onGoHome}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all duration-200 hover:border-primary/30 hover:bg-accent hover:text-primary hover:shadow-md"
            >
              <ArrowLeft className="size-4" />
              {tr.backToHome}
            </button>
          </div>

          {/* Search */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {tr.quickSearch}
            </p>
            <DirectorySearch
              language={language}
              onSelect={onSearchSelect}
              autoFocus
            />
          </div>

          {/* Building cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {buildings.map((b, i) => (
              <article
                key={b.id}
                style={{ animationDelay: `${80 + i * 80}ms` }}
                className="animate-slide-fade group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_30px_60px_-20px_rgba(8,105,118,0.45)]"
              >
                {/* image */}
                <div className="relative h-80 overflow-hidden bg-accent">
                  <Image
                    src={b.illustration || "/placeholder.svg"}
                    alt={`${b.name} illustration`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                  <span className="absolute left-4 top-4 rounded-xl bg-black/50 px-3 py-1.5 text-[13px] font-black text-white backdrop-blur-sm">
                    {b.shortName}
                  </span>
                </div>

                <div className="flex flex-1 flex-col items-center p-6 text-center">
                  <h2 className="font-display text-2xl font-black tracking-tight text-foreground">
                    {language === "am"
                      ? b.id === "building-a" ? "ህንጻ ሀ" : "ህንጻ ለ"
                      : b.name}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {buildingDesc(b.id)}
                  </p>
                  <button
                    type="button"
                    onClick={() => onViewBuilding(b.id)}
                    className="group/btn mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98]"
                  >
                    {tr.viewOffices}
                    <ArrowRight className="size-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
