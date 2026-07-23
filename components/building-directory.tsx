"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  ChevronRight,
  Copy,
  Hash,
  Home,
  Layers,
  Users,
} from "lucide-react";
import { getBuilding } from "@/lib/ministry-data";
import { OfficeIcon } from "@/components/office-icon";
import { t, type Lang } from "@/lib/translations";

interface BuildingDirectoryProps {
  language: Lang;
  buildingId: string;
  focusOfficeId?: string;
  onHome: () => void;
  onViewDepartment: (officeId: string, departmentId: string) => void;
}

function IdRow({
  icon, label, value, copyKey, copiedKey, onCopy, accentClass, accentHoverClass, textPrimaryClass,
}: {
  icon: React.ReactNode; label: string; value: string; copyKey: string;
  copiedKey: string | null; onCopy: (key: string, value: string) => void;
  accentClass: string; accentHoverClass: string; textPrimaryClass: string;
}) {
  const isCopied = copiedKey === copyKey;
  return (
    <button
      type="button"
      onClick={() => onCopy(copyKey, value)}
      title={`Copy ${label.toLowerCase()}`}
      className={`group/id flex w-full cursor-pointer items-center gap-2 rounded-lg px-1.5 py-1 text-left transition-colors ${accentHoverClass}`}
    >
      <span className={`flex size-6 shrink-0 items-center justify-center rounded-md ${accentClass} ${textPrimaryClass} transition-colors group-hover/id:bg-primary group-hover/id:text-primary-foreground`}>
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
        <span className="block truncate text-xs font-semibold text-foreground">{value}</span>
      </span>
      <span className="shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/id:opacity-100">
        {isCopied ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
      </span>
    </button>
  );
}

export function BuildingDirectory({ language, buildingId, focusOfficeId, onHome, onViewDepartment }: BuildingDirectoryProps) {
  const tr = t[language];
  const building = getBuilding(buildingId);
  const [selectedOffice, setSelectedOffice] = useState<string | null>(focusOfficeId ?? null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!building) return null;

  const activeOffice = selectedOffice ? building.offices.find((o) => o.id === selectedOffice) : null;

  const isBuildingB = buildingId === "building-b";
  const theme = isBuildingB
    ? {
        primaryRgb: "99, 102, 241",
        borderColor: "rgba(99, 102, 241, 0.35)",
        shadowColor: "rgba(99, 102, 241, 0.45)",
        accentBg: "bg-indigo-500/10",
        accentText: "text-indigo-600",
        accentHover: "hover:bg-indigo-500/15",
        borderHover: "hover:border-indigo-400/50",
        buttonBg: "bg-indigo-600",
        buttonHover: "hover:bg-indigo-700",
        badgeBg: "bg-indigo-100",
        badgeText: "text-indigo-700",
        cardAccent: "from-indigo-600/90 to-indigo-700",
        gradientBar: "from-indigo-400 via-indigo-500 to-indigo-400",
      }
    : {
        primaryRgb: "8, 105, 118",
        borderColor: "rgba(8, 105, 118, 0.35)",
        shadowColor: "rgba(8, 105, 118, 0.45)",
        accentBg: "bg-accent",
        accentText: "text-primary",
        accentHover: "hover:bg-accent/60",
        borderHover: "hover:border-primary/40",
        buttonBg: "bg-primary",
        buttonHover: "hover:bg-primary/90",
        badgeBg: "bg-primary/10",
        badgeText: "text-primary",
        cardAccent: "from-primary/90 to-[#c08a2e]",
        gradientBar: "from-primary via-[#c08a2e] to-primary",
      };

  const buildingDisplayName =
    language === "am"
      ? buildingId === "building-a" ? "ህንጻ ሀ" : "ህንጻ ለ"
      : building.name;

  const buildingDesc =
    language === "am"
      ? buildingId === "building-a" ? tr.buildingADesc : tr.buildingBDesc
      : building.description;

  function handleCopy(key: string, value: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1500);
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col overflow-hidden px-4 py-3 md:px-8 md:py-4">

      {/* Breadcrumb + title */}
      <div className="mb-3 shrink-0 animate-fade-in">
        <nav aria-label="Breadcrumb" className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <button type="button" onClick={onHome}
            className={`inline-flex cursor-pointer items-center gap-1 rounded-md px-1 py-0.5 font-medium transition-colors ${theme.accentText} hover:opacity-80`}>
            <Home className="size-3.5" /> {tr.home}
          </button>
          <ChevronRight className="size-3.5" />
          <button type="button" onClick={() => setSelectedOffice(null)}
            className={`cursor-pointer rounded-md px-1 py-0.5 font-semibold ${theme.accentText} transition-colors hover:underline`}>
            {buildingDisplayName}
          </button>
          {activeOffice && (
            <><ChevronRight className="size-3.5" />
            <span className="truncate font-semibold text-foreground">
              {language === "am" && activeOffice.amharic ? activeOffice.amharic : activeOffice.name}
            </span></>
          )}
        </nav>
        <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-0.5">
          <div className="flex items-center gap-2">
            <h1 className="font-display text-lg font-bold tracking-tight md:text-xl">
              {buildingDisplayName} {tr.directory}
            </h1>
            <span className={`inline-flex items-center gap-1 rounded-full ${theme.badgeBg} px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${theme.badgeText}`}>
              {building.shortName}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {buildingDesc} · {tr.officeCount(building.offices.length)}
          </p>
        </div>
      </div>

      {activeOffice ? (
        /* ── Focused office view ── */
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <button type="button" onClick={() => setSelectedOffice(null)}
            className={`mb-3 inline-flex w-fit shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm transition-all ${theme.borderHover} ${theme.accentText} hover:-translate-x-0.5`}>
            <ArrowLeft className="size-3.5" /> {tr.allOffices}
          </button>

          <div className="grid min-h-0 flex-1 animate-fade-in grid-cols-1 gap-4 overflow-hidden md:grid-cols-[minmax(0,300px)_1fr]">

            {/* ── Office info panel ── */}
            <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border bg-card"
              style={{ borderColor: theme.borderColor, boxShadow: `0 16px 40px -20px ${theme.shadowColor}` }}>
              <div className={`h-1 w-full shrink-0 bg-gradient-to-r ${theme.gradientBar}`} />

              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-4 pt-4">
                <div className="flex shrink-0 items-start justify-between">
                  <Image src={activeOffice.manager.photo || "/placeholder.svg"} alt={activeOffice.manager.name}
                    width={700} height={700}
                    className="size-24 shrink-0 rounded-2xl border border-border object-cover object-top shadow-md transition-transform duration-300 hover:scale-105 md:size-28" />
                  <span className={`inline-flex items-center gap-1 rounded-lg ${theme.badgeBg} px-2 py-0.5 text-xs font-bold ${theme.badgeText}`}>
                    <OfficeIcon name={activeOffice.icon} className="size-3.5" />
                    {activeOffice.officeNumber}
                  </span>
                </div>
                <h2 className="mt-3 shrink-0 text-sm font-bold leading-snug text-foreground md:text-base">
                  {language === "am" && activeOffice.amharic ? activeOffice.amharic : activeOffice.name}
                </h2>
                <p className="mb-3 mt-1.5 shrink-0 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                  {language === "am" ? activeOffice.workAmharic : activeOffice.work}
                </p>

                <div className="w-full shrink-0 space-y-2 border-t border-border pt-3">
                  <div className="px-1.5">
                    <p className="truncate text-sm font-bold text-foreground">{activeOffice.manager.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {language === "am" ? activeOffice.manager.positionAmharic : activeOffice.manager.position}
                    </p>
                  </div>
                  <div className="rounded-xl bg-muted/50 p-1">
                    <IdRow icon={<Building2 className="size-3.5" />} label={tr.building} value={buildingDisplayName}
                      copyKey="building" copiedKey={copiedKey} onCopy={handleCopy}
                      accentClass={theme.accentBg} accentHoverClass={theme.accentHover} textPrimaryClass={theme.accentText} />
                    {activeOffice.floor && (
                      <IdRow icon={<Layers className="size-3.5" />} label={tr.floor} value={activeOffice.floor}
                        copyKey="floor" copiedKey={copiedKey} onCopy={handleCopy}
                        accentClass={theme.accentBg} accentHoverClass={theme.accentHover} textPrimaryClass={theme.accentText} />
                    )}
                    {activeOffice.room && (
                      <IdRow icon={<Hash className="size-3.5" />} label={tr.room} value={activeOffice.room}
                        copyKey="room" copiedKey={copiedKey} onCopy={handleCopy}
                        accentClass={theme.accentBg} accentHoverClass={theme.accentHover} textPrimaryClass={theme.accentText} />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Departments panel ── */}
            <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-muted/20 p-4">
              <div className="mb-4 flex shrink-0 items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-bold tracking-tight text-foreground">
                  <span className={`flex size-7 items-center justify-center rounded-lg ${theme.badgeBg}`}>
                    <Users className={`size-4 ${theme.accentText}`} />
                  </span>
                  {tr.departments2}
                  <span className={`rounded-full ${theme.badgeBg} px-2 py-0.5 text-xs font-bold ${theme.badgeText}`}>
                    {activeOffice.departments.length}
                  </span>
                </h3>
                <span className="text-[11px] text-muted-foreground">{tr.clickToOpen}</span>
              </div>

              {activeOffice.departments.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-12 text-center">
                  <span className={`flex size-12 items-center justify-center rounded-2xl ${theme.badgeBg}`}>
                    <Users className={`size-6 ${theme.accentText}`} />
                  </span>
                  <p className="text-sm font-semibold text-foreground">{tr.noDepartments}</p>
                  <p className="text-xs text-muted-foreground">{tr.noDeptContact}</p>
                </div>
              ) : (
                <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
                  {activeOffice.departments.map((deptItem, idx) => (
                    <button
                      key={deptItem.id}
                      type="button"
                      onClick={() => onViewDepartment(activeOffice.id, deptItem.id)}
                      style={{ animationDelay: `${idx * 45}ms`, borderColor: theme.borderColor }}
                      className={`group/dept animate-fade-in flex cursor-pointer flex-col rounded-2xl border bg-card text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${theme.borderHover}`}
                    >
                      {/* ── Manager chip ── */}
                      <div className="m-3 mb-0 flex items-center gap-3.5 rounded-xl bg-accent/60 px-3.5 py-3">
                        <div
                          className="shrink-0 rounded-full p-[3px]"
                          style={{ boxShadow: `0 0 0 2.5px rgba(${theme.primaryRgb},0.5)` }}
                        >
                          <Image
                            src={deptItem.detail.photo || "/placeholder.svg"}
                            alt={deptItem.detail.managerName}
                            width={56}
                            height={56}
                            className="size-14 rounded-full object-cover object-top"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-muted-foreground">
                            {language === "am" ? "ሥራ አስኪያጅ" : "Manager"}
                          </p>
                          <p className="truncate text-sm font-bold text-foreground">
                            {deptItem.detail.managerName}
                          </p>
                        </div>
                      </div>

                      {/* ── Body ── */}
                      <div className="flex flex-1 flex-col px-4 pt-4 pb-3">
                        <h3 className="text-[15px] font-black leading-snug text-foreground">
                          {language === "am" && deptItem.amharic ? deptItem.amharic : deptItem.name}
                        </h3>

                        {/* Building + Floor pills */}
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-foreground/75">
                            <Building2 className="size-3.5 text-primary" />
                            {language === "am"
                              ? deptItem.detail.building === "Building A" ? "ህንጻ ሀ" : "ህንጻ ለ"
                              : deptItem.detail.building === "Building A" ? "Bldg A" : "Bldg B"}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-[#c08a2e]/12 px-3 py-1 text-xs font-semibold text-[#9a6a1e]">
                            {language === "am" ? "ፎቅ " : "Floor "}{deptItem.detail.floor}
                          </span>
                          {deptItem.detail.room && (
                            <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                              {language === "am" ? "ክፍ. " : "Room "}{deptItem.detail.room}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* ── Footer CTA ── */}
                      <div className={`flex items-center gap-1.5 border-t border-border px-4 py-3 ${theme.accentText}`}>
                        <span className="text-xs font-black uppercase tracking-widest">{tr.viewDetails}</span>
                        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/dept:translate-x-1" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ── Office grid ── */
        <div className="grid grid-cols-3 gap-3 overflow-y-auto pb-2">
          {building.offices.map((office, i) => (
            <button
              key={office.id}
              type="button"
              onClick={() => {
                if (office.departments.length === 0) {
                  onViewDepartment(office.id, "office-detail");
                } else {
                  setSelectedOffice(office.id);
                }
              }}
              data-building={buildingId}
              style={{ animationDelay: `${i * 40}ms` }}
              className={`office-card group cursor-pointer animate-fade-in flex flex-col overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-colors duration-200 hover:border-primary/30 hover:bg-accent/20`}
            >
              {/* Photo banner */}
              <div className="relative h-36 w-full shrink-0 overflow-hidden bg-gradient-to-b from-primary/5 to-accent/60">
                <Image
                  src={office.manager.photo || "/placeholder.svg"}
                  alt={office.manager.name}
                  fill
                  className="object-contain object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 33vw, 33vw"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
                <span className={`absolute left-2 top-2 rounded-md ${theme.badgeBg} px-1.5 py-0.5 text-[10px] font-semibold ${theme.badgeText}`}>
                  <OfficeIcon name={office.icon} className="inline size-3 mr-0.5" />
                  {office.officeNumber}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-col p-3 gap-1">
                {/* Office name */}
                <h2 className="text-sm font-bold leading-snug text-foreground line-clamp-2">
                  {language === "am" && office.amharic ? office.amharic : office.name}
                </h2>
                {/* Work / service */}
                <p className="text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
                  {language === "am" ? office.workAmharic : office.work}
                </p>

                {/* Manager info */}
                <div className="mt-1 border-t border-border pt-2 flex flex-col gap-0.5">
                  <p className="text-[13px] font-bold text-foreground">{office.manager.name}</p>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">
                    {language === "am" ? office.manager.positionAmharic : office.manager.position}
                  </p>
                </div>

                <div className={`mt-1 flex items-center justify-between text-[11px] font-semibold ${theme.accentText}`}>
                  <span className="flex items-center gap-1">
                    <Users className="size-3.5" />
                    {tr.deptCount(office.departments.length)}
                  </span>
                  <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
