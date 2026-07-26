"use client"

import { useEffect, useState } from "react"
import { ArrowRight, ChevronRight, Megaphone, X } from "lucide-react"
import { t, type Lang } from "@/lib/translations"

interface Announcement {
  _id: string
  id: string
  title: string
  titleAmharic: string
  description: string
  descriptionAmharic: string
  priority: 'info' | 'important' | 'urgent'
  publishDate: string
  expiryDate?: string
  isActive: boolean
}

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
    <div className="flex flex-col items-center gap-1 text-center">
      {/* Photo */}
      <div
        className="relative overflow-hidden rounded-xl transition-all duration-500 group-hover:scale-[1.04] group-hover:shadow-xl"
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
      <p className="text-[10px] font-bold leading-tight text-foreground">{name}</p>
      <p className="text-[8px] font-bold leading-tight text-muted-foreground line-clamp-2">{title}</p>
      {leader.clickable && (
        <span className="inline-flex translate-y-1 items-center gap-0.5 rounded-full bg-primary/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-primary opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {tr.openOffice} <ChevronRight className="size-2" />
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
      className="group cursor-pointer rounded-xl p-1 transition-all duration-300 hover:bg-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      aria-label={`${tr.openOffice} ${name}`}
    >
      {inner}
    </button>
  )
}

export function WelcomePage({ language, onExplore, onNavigateOffice }: WelcomePageProps) {
  const tr = t[language]
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [dismissedAnnouncements, setDismissedAnnouncements] = useState<string[]>([])

  useEffect(() => {
    fetchAnnouncements()
    // Load dismissed announcements from localStorage
    const dismissed = localStorage.getItem('dismissedAnnouncements')
    if (dismissed) {
      setDismissedAnnouncements(JSON.parse(dismissed))
    }
  }, [])

  const fetchAnnouncements = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${API_URL}/api/admin/announcements/active`)
      const data = await response.json()
      // Show only top 2 announcements
      setAnnouncements(data.slice(0, 2))
    } catch (error) {
      console.error("Error fetching announcements:", error)
    }
  }

  const handleDismissAnnouncement = (id: string) => {
    const newDismissed = [...dismissedAnnouncements, id]
    setDismissedAnnouncements(newDismissed)
    localStorage.setItem('dismissedAnnouncements', JSON.stringify(newDismissed))
  }

  const visibleAnnouncements = announcements.filter(
    ann => !dismissedAnnouncements.includes(ann.id)
  )

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return { bg: 'bg-red-100/90', border: 'border-red-300', text: 'text-red-800', icon: '🚨' }
      case 'important': return { bg: 'bg-orange-100/90', border: 'border-orange-300', text: 'text-orange-800', icon: '⚠️' }
      default: return { bg: 'bg-blue-100/90', border: 'border-blue-300', text: 'text-blue-800', icon: 'ℹ️' }
    }
  }

  function handleNavigate(leader: Leader) {
    if (leader.buildingId && leader.officeId) {
      onNavigateOffice(leader.buildingId, leader.officeId)
    }
  }

  const ministerLeader = leaders[0] // minister is first
  const reportingLeaders = leaders.slice(1) // the 5 reporting officers

  return (
    <div className="relative h-full w-full overflow-hidden">
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

      <div className="relative mx-auto grid h-full max-w-[1480px] grid-cols-1 items-center gap-3 px-4 py-3 md:grid-cols-[40%_60%] md:gap-6 md:px-8 md:py-4">

        {/* ── LEFT: Hero copy ── */}
        <section className="flex flex-col items-start justify-center max-h-full">
          {/* Announcements Section */}
          {visibleAnnouncements.length > 0 && (
            <div className="mb-2 w-full space-y-1.5">
              {visibleAnnouncements.map((announcement) => {
                const colors = getPriorityColor(announcement.priority)
                const title = language === 'am' ? announcement.titleAmharic : announcement.title
                const description = language === 'am' ? announcement.descriptionAmharic : announcement.description
                
                return (
                  <div
                    key={announcement.id}
                    className={`relative overflow-hidden rounded-lg border ${colors.border} ${colors.bg} backdrop-blur-sm shadow-sm`}
                  >
                    <div className="flex items-start gap-2 p-2">
                      <div className={`flex-shrink-0 rounded-lg ${colors.bg} p-1`}>
                        <Megaphone className={`h-3 w-3 ${colors.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2">
                          <p className={`text-xs font-bold ${colors.text} flex-1`}>
                            {colors.icon} {title}
                          </p>
                          <button
                            onClick={() => handleDismissAnnouncement(announcement.id)}
                            className={`flex-shrink-0 rounded p-0.5 ${colors.text} hover:bg-black/10 transition-colors`}
                            aria-label="Dismiss"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                        <p className={`text-xs ${colors.text} mt-1 line-clamp-2`}>
                          {description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary shadow-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            {tr.ministryWayfinding}
          </span>

          <h1 className="font-display text-3xl font-black leading-[1.02] tracking-tight text-balance md:text-[2.8rem]">
            <span className="text-foreground">{tr.findAnyOffice}</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary to-[#c08a2e] bg-clip-text text-transparent">
              {tr.anywhereInMint}
            </span>
          </h1>

          <p className="mt-2 max-w-[400px] text-[14px] leading-relaxed text-muted-foreground">
            {tr.welcomeDesc}
          </p>

          <div className="mt-2.5 flex flex-wrap gap-2">
            {[
              { value: "2", label: tr.buildings, onClick: onExplore },
              { value: "10+", label: tr.offices, onClick: onExplore },
              { value: "20+", label: tr.departments, onClick: onExplore },
            ].map(({ value, label, onClick }) => (
              <button
                key={label}
                type="button"
                onClick={onClick}
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-card px-3 py-1.5 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md"
              >
                <span className="text-base font-black text-primary">{value}</span>
                <span className="text-[11px] font-semibold text-muted-foreground">{label}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onExplore}
            className="group relative mt-3 inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-primary px-6 py-2.5 text-[14px] font-bold text-primary-foreground shadow-[0_12px_40px_-10px_rgba(8,105,118,0.5)] ring-1 ring-white/10 transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_16px_50px_-10px_rgba(8,105,118,0.6)] active:scale-[0.98]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
            {tr.explorePortal}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
        </section>

        {/* ── RIGHT: Leadership card ── */}
        <section className="flex flex-col justify-center max-h-full">
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[0_30px_80px_-30px_rgba(8,105,118,0.3)]">
            {/* top accent */}
            <div className="h-0.5 w-full bg-gradient-to-r from-primary via-[#c08a2e] to-primary" />

            <div className="px-3 pb-3 pt-2 md:px-4 md:pt-2.5">
              {/* ── Minister: centered hero card ── */}
              <div className="mb-2 overflow-hidden rounded-xl border border-[#c08a2e]/30 bg-gradient-to-br from-primary/5 via-accent/40 to-[#c08a2e]/8 shadow-sm">
                <div className="h-0.5 w-full bg-gradient-to-r from-primary/40 via-[#c08a2e] to-primary/40" />
                <div className="flex flex-col items-center gap-1.5 px-4 py-2.5 text-center">
                  <div className="relative">
                    <div className="rounded-xl p-[2px]" style={{ background: "linear-gradient(135deg, #086976, #c08a2e)" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={ministerLeader.photo || "/placeholder.svg"}
                        alt={tr.leaderNames.minister}
                        className="size-28 rounded-lg object-cover object-top shadow-md md:size-32"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#c08a2e]/30 bg-card px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.14em] text-[#9a6a1e] shadow-sm">
                      {tr.minister}
                    </span>
                  </div>
                  <div className="mt-0.5">
                    <p className="text-sm font-black leading-snug text-primary">{tr.leaderNames.minister}</p>
                    <p className="mt-0.5 text-[10px] font-bold text-muted-foreground">{tr.leaderTitles.minister}</p>
                  </div>
                  <div className="h-0.5 w-12 rounded-full bg-gradient-to-r from-primary/40 via-[#c08a2e] to-primary/40" />
                </div>
              </div>

              {/* Simple divider without text */}
              <div className="relative mb-1.5 flex items-center">
                <div className="h-px flex-1 bg-border/40" />
              </div>

              {/* ── 5 reporting officers ── */}
              <div className="grid grid-cols-5 gap-1.5">
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
