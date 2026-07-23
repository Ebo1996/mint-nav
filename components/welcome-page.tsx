"use client"

import { ArrowRight, ChevronRight } from "lucide-react"
import { t, type Lang } from "@/lib/translations"

interface WelcomePageProps {
  language: Lang
  onExplore: () => void
  onNavigateOffice: (buildingId: string, officeId: string) => void
}

interface Leader {
  id: string
  nameKey: keyof typeof t.en.leaderNames
  titleKey: keyof typeof t.en.leaderTitles
  photo: string
  clickable: boolean
  buildingId?: string
  officeId?: string
}

const IMG = "/images/manager%20images/"

const leaders: Leader[] = [
  {
    id: "minister",
    nameKey: "minister",
    titleKey: "minister",
    photo: `${IMG}dr%20belete%20molla.png`,
    clickable: false,
  },
  {
    id: "research-innovation",
    nameKey: "researchInnovation",
    titleKey: "researchInnovation",
    photo: `${IMG}dr%20Bayisa%20Bedada.png`,
    clickable: true,
    buildingId: "building-a",
    officeId: "innovation-research",
  },
  {
    id: "ict-digital",
    nameKey: "ictDigital",
    titleKey: "ictDigital",
    photo: `${IMG}ato%20Muluken%20Kere.png`,
    clickable: true,
    buildingId: "building-b",
    officeId: "ict-digital-economy",
  },
  {
    id: "advisory",
    nameKey: "advisory",
    titleKey: "advisory",
    photo: `${IMG}Dr%20Foziya%20Amin.png`,
    clickable: true,
    buildingId: "building-a",
    officeId: "advisory-state-minister",
  },
  {
    id: "head-ministers-office",
    nameKey: "headMinistersOffice",
    titleKey: "headMinistersOffice",
    photo: `${IMG}Ato%20liul%20siyum.png`,
    clickable: true,
    buildingId: "building-a",
    officeId: "partnership-alliance",
  },
  {
    id: "chief-administration",
    nameKey: "chiefAdmin",
    titleKey: "chiefAdmin",
    photo: `${IMG}Ato%20Solomon%20Ayinimar.png`,
    clickable: true,
    buildingId: "building-a",
    officeId: "administration",
  },
]

function ReportingCard({
  leader,
  language,
  onNavigate,
}: {
  leader: Leader
  language: Lang
  onNavigate?: (l: Leader) => void
}) {
  const tr = t[language]
  const name = tr.leaderNames[leader.nameKey]
  const title = tr.leaderTitles[leader.titleKey]

  const inner = (
    <div className="flex flex-col items-center gap-2 text-center">
      {/* Photo */}
      <div
        className="relative overflow-hidden rounded-2xl transition-all duration-500 group-hover:scale-[1.04] group-hover:shadow-xl"
        style={{ width: "100%", aspectRatio: "3/4" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={leader.photo || "/placeholder.svg"}
          alt={name}
          className="h-full w-full cursor-pointer object-cover object-top"
          crossOrigin="anonymous"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
      </div>
      {/* Name */}
      <p className="text-[12px] font-bold leading-tight text-foreground">{name}</p>
      <p className="text-[10px] font-medium leading-tight text-muted-foreground line-clamp-2">{title}</p>
      {leader.clickable && (
        <span className="inline-flex translate-y-1 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {tr.openOffice} <ChevronRight className="size-2.5" />
        </span>
      )}
    </div>
  )

  if (!leader.clickable) {
    return <div className="cursor-default select-none">{inner}</div>
  }

  return (
    <button
      type="button"
      onClick={() => onNavigate?.(leader)}
      className="group cursor-pointer rounded-2xl p-1.5 transition-all duration-300 hover:bg-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      aria-label={`${tr.openOffice} ${name}`}
    >
      {inner}
    </button>
  )
}

export function WelcomePage({ language, onExplore, onNavigateOffice }: WelcomePageProps) {
  const tr = t[language]

  function handleNavigate(leader: Leader) {
    if (leader.buildingId && leader.officeId) {
      onNavigateOffice(leader.buildingId, leader.officeId)
    }
  }

  const ministerLeader = leaders[0] // minister is first
  const reportingLeaders = leaders.slice(1) // the 5 reporting officers

  return (
    <div className="relative h-full w-full overflow-y-auto">
      {/* Ambient bg */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 size-[500px] rounded-full bg-primary/7 blur-[100px]" />
        <div className="absolute -bottom-32 right-0 size-[400px] rounded-full bg-[#c08a2e]/6 blur-[100px]" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.025]" aria-hidden="true">
          <defs>
            <pattern id="wdot" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wdot)" />
        </svg>
      </div>

      <div className="relative mx-auto grid h-full max-w-[1480px] grid-cols-1 items-center gap-6 px-5 py-8 md:grid-cols-[40%_60%] md:gap-10 md:px-12 md:py-0">

        {/* ── LEFT: Hero copy ── */}
        <section className="flex flex-col items-start justify-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-primary shadow-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            {tr.ministryWayfinding}
          </span>

          <h1 className="font-display text-4xl font-black leading-[1.02] tracking-tight text-balance md:text-[3.4rem]">
            <span className="text-foreground">{tr.findAnyOffice}</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary to-[#c08a2e] bg-clip-text text-transparent">
              {tr.anywhereInMint}
            </span>
          </h1>

          <p className="mt-4 max-w-[400px] text-[15px] leading-relaxed text-muted-foreground">
            {tr.welcomeDesc}
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {[
              { value: "2", label: tr.buildings, onClick: onExplore },
              { value: "10+", label: tr.offices, onClick: onExplore },
              { value: "20+", label: tr.departments, onClick: onExplore },
            ].map(({ value, label, onClick }) => (
              <button
                key={label}
                type="button"
                onClick={onClick}
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md"
              >
                <span className="text-lg font-black text-primary">{value}</span>
                <span className="text-xs font-semibold text-muted-foreground">{label}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onExplore}
            className="group relative mt-7 inline-flex items-center gap-3 overflow-hidden rounded-full bg-primary px-7 py-3.5 text-[15px] font-bold text-primary-foreground shadow-[0_12px_40px_-10px_rgba(8,105,118,0.5)] ring-1 ring-white/10 transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_16px_50px_-10px_rgba(8,105,118,0.6)] active:scale-[0.98]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
            {tr.explorePortal}
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
        </section>

        {/* ── RIGHT: Leadership card ── */}
        <section className="flex flex-col justify-center">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_30px_80px_-30px_rgba(8,105,118,0.3)]">
            {/* top accent */}
            <div className="h-1 w-full bg-gradient-to-r from-primary via-[#c08a2e] to-primary" />

            <div className="px-5 pb-5 pt-4 md:px-6 md:pt-5">
              {/* ── Minister: centered hero card ── */}
              <div className="mb-4 overflow-hidden rounded-2xl border border-[#c08a2e]/30 bg-gradient-to-br from-primary/5 via-accent/40 to-[#c08a2e]/8 shadow-sm">
                <div className="h-0.5 w-full bg-gradient-to-r from-primary/40 via-[#c08a2e] to-primary/40" />
                <div className="flex flex-col items-center gap-3 px-6 py-5 text-center">
                  <div className="relative">
                    <div className="rounded-2xl p-[3px]" style={{ background: "linear-gradient(135deg, #086976, #c08a2e)" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={ministerLeader.photo || "/placeholder.svg"}
                        alt={tr.leaderNames.minister}
                        className="size-40 rounded-xl object-cover object-top shadow-md md:size-48"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#c08a2e]/30 bg-card px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.14em] text-[#9a6a1e] shadow-sm">
                      {tr.minister}
                    </span>
                  </div>
                  <div className="mt-1">
                    <p className="text-base font-black leading-snug text-primary">{tr.leaderNames.minister}</p>
                    <p className="mt-0.5 text-xs font-medium text-muted-foreground">{tr.leaderTitles.minister}</p>
                  </div>
                  <div className="h-0.5 w-16 rounded-full bg-gradient-to-r from-primary/40 via-[#c08a2e] to-primary/40" />
                </div>
              </div>

              {/* divider with label */}
              <div className="relative mb-3 flex items-center gap-2">
                <div className="h-px flex-1 bg-border/60" />
                <span className="shrink-0 rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {tr.reportingOfficers}
                </span>
                <div className="h-px flex-1 bg-border/60" />
              </div>

              {/* ── 5 reporting officers ── */}
              <div className="grid grid-cols-5 gap-2">
                {reportingLeaders.map((leader) => (
                  <ReportingCard key={leader.id} leader={leader} language={language} onNavigate={handleNavigate} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
