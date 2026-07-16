"use client";

import Image from "next/image";
import {
  ArrowRight,
  Search,
  Building2,
  MapPinned,
  Sparkles,
} from "lucide-react";
import { buildings, type SearchHit } from "@/lib/ministry-data";
import { DirectorySearch } from "@/components/directory-search";

interface PortalPageProps {
  onViewBuilding: (buildingId: string) => void;
  onSearchSelect: (hit: SearchHit) => void;
}

const quickTips = [
  { icon: Search, label: "Search by name, department, or room" },
  { icon: Building2, label: "Browse offices building by building" },
  { icon: MapPinned, label: "Get exact floor and directions" },
];

export function PortalPage({
  onViewBuilding,
  onSearchSelect,
}: PortalPageProps) {
  return (
    <div className="mx-auto grid h-full w-full max-w-[1400px] grid-cols-1 items-center gap-6 overflow-hidden px-5 py-6 md:grid-cols-[35%_65%] md:gap-10 md:px-8">
      {/* Left — 35% */}
      <section className="relative flex h-full flex-col justify-center overflow-hidden animate-fade-in">
        {/* ambient glows, matching the header's palette */}
        <div className="pointer-events-none absolute -left-24 -top-20 size-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-6 size-56 rounded-full bg-primary/5 blur-3xl" />

        {/* dot-grid, a quiet nod to a map/coordinate grid — fits a navigation portal */}
        <svg
          className="pointer-events-none absolute -right-4 top-0 hidden h-28 w-28 text-primary/15 md:block"
          aria-hidden="true"
        >
          <pattern
            id="portalDotGrid"
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#portalDotGrid)" />
        </svg>

        <span className="relative mb-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 ring-1 ring-primary/20">
          <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
          <span className="text-[11px] font-semibold tracking-wide text-primary">
            MInT Navigation Portal
          </span>
        </span>

        <div className="relative flex items-start gap-4">
          <span
            className="mt-1.5 hidden h-16 w-1 shrink-0 rounded-full bg-gradient-to-b from-primary to-primary/20 md:block"
            aria-hidden="true"
          />
          <h1 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance md:text-4xl">
            Where would you like to go?
          </h1>
        </div>

        <p className="relative mt-4 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
          Find ministry offices, departments, managers, room numbers, and office
          locations using the Ministry Navigation Portal.
        </p>

        <ul className="relative mt-6 flex flex-col gap-3">
          {quickTips.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/15">
                <Icon className="size-4 text-primary" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-foreground/80">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Right — 65% */}
      <section className="flex h-full min-h-0 flex-col justify-center gap-5 overflow-hidden">
        <DirectorySearch onSelect={onSearchSelect} autoFocus />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {buildings.map((b, i) => (
            <article
              key={b.id}
              style={{ animationDelay: `${i * 90}ms` }}
              className="animate-slide-fade group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_-22px_rgba(8,105,118,0.5)]"
            >
              <div className="relative h-32 overflow-hidden bg-accent md:h-36">
                <Image
                  src={b.illustration || "/placeholder.svg"}
                  alt={`${b.name} illustration`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h2 className="font-display text-lg font-bold tracking-tight">
                  {b.name}
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {b.description}
                </p>
                <button
                  type="button"
                  onClick={() => onViewBuilding(b.id)}
                  className="group/btn mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:shadow-primary/25 active:scale-100"
                >
                  View Offices
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
