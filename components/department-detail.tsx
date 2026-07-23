"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Building2,
  Check,
  ChevronRight,
  Copy,
  DoorOpen,
  Hash,
  Home,
  Layers,
  MapPin,
  Navigation,
} from "lucide-react";
import { getDepartment } from "@/lib/ministry-data";
import { t, type Lang } from "@/lib/translations";

interface DepartmentDetailProps {
  language: Lang;
  buildingId: string;
  officeId: string;
  departmentId: string;
  onHome: () => void;
  onBackToBuilding: () => void;
}

const STATUS_STYLES: Record<string, { pill: string; dot: string }> = {
  Open:             { pill: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-500/20", dot: "bg-emerald-500" },
  Closed:           { pill: "bg-red-50 text-red-700 ring-1 ring-red-500/20",             dot: "bg-red-500"     },
  "By Appointment": { pill: "bg-amber-50 text-amber-700 ring-1 ring-amber-500/20",       dot: "bg-amber-500"   },
};

function StatusBadge({ status, language }: { status: string; language: Lang }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.Open;
  const tr = t[language];
  const label =
    status === "Open" ? tr.open :
    status === "Closed" ? tr.closed :
    status === "By Appointment" ? tr.byAppointment :
    status;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${s.pill}`}>
      <span className={`size-1.5 rounded-full ${s.dot}`} />
      {label}
    </span>
  );
}

function InfoCard({
  icon, label, value, copyKey, copiedKey, onCopy,
}: {
  icon: React.ReactNode; label: string; value: string;
  copyKey: string; copiedKey: string | null; onCopy: (key: string, value: string) => void;
}) {
  const isCopied = copiedKey === copyKey;
  return (
    <button
      type="button"
      onClick={() => onCopy(copyKey, value)}
      title={`Copy ${label.toLowerCase()}`}
      className="group flex cursor-pointer items-center gap-2 sm:gap-3 rounded-2xl border border-border bg-card px-3 sm:px-4 py-3 sm:py-3.5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md active:translate-y-0"
    >
      <span className="flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-md group-hover:shadow-primary/20">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-xs sm:text-sm font-bold text-foreground">
          {value}
        </span>
      </span>
      <span className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
        {isCopied
          ? <Check className="size-3.5 sm:size-4 text-emerald-500" />
          : <Copy className="size-3.5 sm:size-4 text-muted-foreground" />}
      </span>
    </button>
  );
}

export function DepartmentDetail({
  language, buildingId, officeId, departmentId, onHome, onBackToBuilding,
}: DepartmentDetailProps) {
  const tr = t[language];
  const result = getDepartment(buildingId, officeId, departmentId);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!result) return null;
  const { building, office, department } = result;
  const d = department.detail;

  const buildingDisplayName =
    language === "am"
      ? buildingId === "building-a" ? "ህንጻ ሀ" : "ህንጻ ለ"
      : building.name;

  const officeDisplayName =
    language === "am" && office.amharic ? office.amharic : office.name;

  const deptDisplayName =
    language === "am" && department.amharic ? department.amharic : department.name;

  function handleCopy(key: string, value: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1500);
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-[1380px] flex-col px-3 py-2 sm:px-4 sm:py-3 md:px-8 md:py-4">

      {/* ── Breadcrumb ── */}
      <nav aria-label="Breadcrumb" className="mb-2 flex flex-wrap items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
        <button type="button" onClick={onHome}
          className="inline-flex cursor-pointer items-center gap-1 rounded-md px-1 py-0.5 font-medium transition-colors hover:text-primary">
          <Home className="size-3 sm:size-3.5" /> <span className="hidden sm:inline">{tr.home}</span><span className="sm:hidden">Home</span>
        </button>
        <ChevronRight className="size-3 sm:size-3.5" />
        <button type="button" onClick={onBackToBuilding}
          className="cursor-pointer rounded-md px-1 py-0.5 font-medium transition-colors hover:text-primary truncate max-w-[120px] sm:max-w-none">
          {buildingDisplayName}
        </button>
        <ChevronRight className="size-3 sm:size-3.5" />
        <span className="truncate font-semibold text-primary max-w-[150px] sm:max-w-none">{deptDisplayName}</span>
      </nav>

      <button type="button" onClick={onBackToBuilding}
        className="mb-2 sm:mb-3 inline-flex w-fit shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-border bg-card px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-foreground shadow-sm transition-all hover:-translate-x-0.5 hover:border-primary/40 hover:text-primary">
        <ArrowLeft className="size-3 sm:size-3.5" /> {tr.backTo} <span className="hidden sm:inline">{officeDisplayName}</span>
      </button>

      {/* ── Two-column layout ── */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-[minmax(0,380px)_1fr]">

        {/* ══ LEFT: Profile card ══ */}
        <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-md">

          {/* gradient banner with photo */}
          <div className="relative h-28 sm:h-36 shrink-0 bg-gradient-to-br from-primary via-primary/90 to-[#c08a2e]">
            <svg className="absolute inset-0 h-full w-full opacity-10" aria-hidden="true">
              <defs>
                <pattern id="ddot" width="18" height="18" patternUnits="userSpaceOnUse">
                  <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#ddot)" />
            </svg>
            <div className="absolute right-3 sm:right-4 top-3 sm:top-4">
              <StatusBadge status={d.status} language={language} />
            </div>
            <div className="absolute -bottom-8 sm:-bottom-10 left-4 sm:left-5">
              <div className="relative">
                <Image
                  src={d.photo || "/placeholder.svg"}
                  alt={d.managerName}
                  width={700} height={700}
                  className="size-20 sm:size-24 md:size-28 rounded-2xl border-4 border-card object-cover object-top shadow-xl"
                />
                <span className="absolute -bottom-1.5 -right-1.5 flex size-6 sm:size-7 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground shadow-sm">
                  <DoorOpen className="size-3 sm:size-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* body */}
          <div className="flex flex-1 flex-col overflow-y-auto px-4 sm:px-5 pt-12 sm:pt-14 pb-4 sm:pb-5">

            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-primary">
              {officeDisplayName}
            </p>
            <h1 className="mt-1 font-display text-lg sm:text-xl md:text-2xl font-black leading-tight tracking-tight">
              {deptDisplayName}
            </h1>
            {department.amharic && language === "en" && (
              <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">{department.amharic}</p>
            )}
            <div className="my-2 sm:my-3 h-0.5 w-10 sm:w-12 rounded-full bg-gradient-to-r from-primary to-[#c08a2e]" />

            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              {language === "am" ? d.descriptionAmharic : d.description}
            </p>

            <div className="mt-auto space-y-2 sm:space-y-3 pt-4 sm:pt-5">
              <div className="rounded-2xl border border-border bg-muted/40 px-3 sm:px-4 py-3 sm:py-3.5">
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{tr.headOfOffice}</p>
                <p className="mt-1 text-xs sm:text-sm font-black text-foreground">
                  {language === "am" && d.managerNameAmharic ? d.managerNameAmharic : d.managerName}
                </p>
                <p className="mt-0.5 text-[11px] sm:text-xs text-muted-foreground leading-snug">
                  {language === "am" ? d.positionAmharic : d.position}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ══ RIGHT: Location & Contact ══ */}
        <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-md">

          <div className="flex shrink-0 items-center justify-between border-b border-border px-4 sm:px-6 py-3 sm:py-4">
            <h2 className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm font-black uppercase tracking-widest text-foreground">
              <span className="flex size-7 sm:size-8 items-center justify-center rounded-xl bg-primary/10">
                <MapPin className="size-3.5 sm:size-4 text-primary" />
              </span>
              <span className="hidden sm:inline">{tr.locationContact}</span>
              <span className="sm:hidden">Location</span>
            </h2>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(`${building.name} ${d.location}`)}`}
              target="_blank" rel="noreferrer"
              className="inline-flex cursor-pointer items-center gap-1 sm:gap-1.5 rounded-xl border border-border bg-muted/50 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-bold text-primary shadow-sm transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-md"
            >
              <Navigation className="size-3 sm:size-3.5" /> <span className="hidden sm:inline">{tr.directions}</span>
            </a>
          </div>

          <div className="grid min-h-0 flex-1 auto-rows-fr grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 overflow-y-auto p-3 sm:p-5">
            <InfoCard icon={<Building2 className="size-4.5" />} label={tr.building}    value={buildingDisplayName}                              copyKey="building"     copiedKey={copiedKey} onCopy={handleCopy} />
            <InfoCard icon={<Layers className="size-4.5" />}    label={tr.floor}       value={d.floor}                                          copyKey="floor"        copiedKey={copiedKey} onCopy={handleCopy} />
            <InfoCard icon={<DoorOpen className="size-4.5" />}  label={tr.room}        value={d.room}                                           copyKey="room"         copiedKey={copiedKey} onCopy={handleCopy} />
            <InfoCard icon={<Hash className="size-4.5" />}      label={tr.officeNumber}value={d.officeNumber}                                   copyKey="officeNumber"  copiedKey={copiedKey} onCopy={handleCopy} />
          </div>
        </div>

      </div>
    </div>
  );
}
