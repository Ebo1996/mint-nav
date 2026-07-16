"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Building2,
  Check,
  ChevronRight,
  Copy,
  Hash,
  Home,
  Layers,
  Mail,
  Phone,
  PhoneCall,
  Users,
} from "lucide-react";
import { getBuilding } from "@/lib/ministry-data";
import { OfficeIcon } from "@/components/office-icon";

interface BuildingDirectoryProps {
  buildingId: string;
  focusOfficeId?: string;
  onHome: () => void;
  onViewDepartment: (officeId: string, departmentId: string) => void;
}

/** Compact, click-to-copy identification row used in the office info card. */
function IdRow({
  icon,
  label,
  value,
  copyKey,
  copiedKey,
  onCopy,
  accentClass,
  accentHoverClass,
  textPrimaryClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  copyKey: string;
  copiedKey: string | null;
  onCopy: (key: string, value: string) => void;
  accentClass: string;
  accentHoverClass: string;
  textPrimaryClass: string;
}) {
  const isCopied = copiedKey === copyKey;
  return (
    <button
      type="button"
      onClick={() => onCopy(copyKey, value)}
      title={`Copy ${label.toLowerCase()}`}
      className={`group/id flex w-full items-center gap-2 rounded-lg px-1.5 py-1 text-left transition-colors ${accentHoverClass}`}
    >
      <span className={`flex size-6 shrink-0 items-center justify-center rounded-md ${accentClass} ${textPrimaryClass} transition-colors group-hover/id:bg-primary group-hover/id:text-primary-foreground`}>
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <span className="block truncate text-xs font-semibold text-foreground">
          {value}
        </span>
      </span>
      <span className="shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/id:opacity-100">
        {isCopied ? (
          <Check className="size-3 text-emerald-600" />
        ) : (
          <Copy className="size-3" />
        )}
      </span>
    </button>
  );
}

export function BuildingDirectory({
  buildingId,
  focusOfficeId,
  onHome,
  onViewDepartment,
}: BuildingDirectoryProps) {
  const building = getBuilding(buildingId);
  const [selectedOffice, setSelectedOffice] = useState<string | null>(
    focusOfficeId ?? null,
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!building) return null;

  const activeOffice = selectedOffice
    ? building.offices.find((o) => o.id === selectedOffice)
    : null;

  // Building-specific theme configurations
  const isBuildingB = buildingId === "building-b";
  const theme = isBuildingB
    ? {
        // Building B - Tech/Digital theme (Purple/Indigo)
        primaryColor: "indigo-600",
        primaryRgb: "99, 102, 241",
        borderColor: "rgba(99, 102, 241, 0.4)",
        shadowColor: "rgba(99, 102, 241, 0.5)",
        accentBg: "bg-indigo-500/10",
        accentText: "text-indigo-600",
        accentHover: "hover:bg-indigo-500/20",
        borderHover: "hover:border-indigo-500/40",
        buttonBg: "bg-indigo-600",
        buttonHover: "hover:bg-indigo-700",
        badgeBg: "bg-indigo-100",
        badgeText: "text-indigo-700",
        iconColor: "text-indigo-600",
        hoverIconColor: "text-indigo-600",
      }
    : {
        // Building A - Default theme (Teal/Primary)
        primaryColor: "primary",
        primaryRgb: "8, 105, 118",
        borderColor: "rgba(8, 105, 118, 0.4)",
        shadowColor: "rgba(8, 105, 118, 0.5)",
        accentBg: "bg-accent",
        accentText: "text-primary",
        accentHover: "hover:bg-accent/60",
        borderHover: "hover:border-primary/40",
        buttonBg: "bg-primary",
        buttonHover: "hover:bg-primary/90",
        badgeBg: "bg-primary/10",
        badgeText: "text-primary",
        iconColor: "text-primary",
        hoverIconColor: "text-primary",
      };

  function handleCopy(key: string, value: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1500);
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col overflow-hidden px-4 py-3 md:px-8 md:py-4">
      {/* Breadcrumb + title row with building-specific styling */}
      <div className="mb-2 shrink-0 animate-fade-in">
        <nav
          aria-label="Breadcrumb"
          className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <button
            type="button"
            onClick={onHome}
            className={`inline-flex items-center gap-1 rounded-md px-1 py-0.5 font-medium transition-colors ${theme.accentText} hover:opacity-80`}
          >
            <Home className="size-3.5" />
            Home
          </button>
          <ChevronRight className="size-3.5" />
          <button
            type="button"
            onClick={() => setSelectedOffice(null)}
            className={`rounded-md px-1 py-0.5 font-semibold ${theme.accentText} transition-colors hover:underline`}
          >
            {building.name}
          </button>
          {activeOffice && (
            <>
              <ChevronRight className="size-3.5" />
              <span className="truncate font-semibold text-foreground">
                {activeOffice.name}
              </span>
            </>
          )}
        </nav>
        <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-0.5">
          <div className="flex items-center gap-2">
            <h1 className="font-display text-lg font-bold tracking-tight md:text-xl">
              {building.name} Directory
            </h1>
            <span className={`inline-flex items-center gap-1 rounded-full ${theme.badgeBg} px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${theme.badgeText}`}>
              {building.shortName}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {building.description} · {building.offices.length} offices
          </p>
        </div>
      </div>

      {activeOffice ? (
        /* ── Focused office view ── */
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <button
            type="button"
            onClick={() => setSelectedOffice(null)}
            className={`mb-2 inline-flex w-fit shrink-0 items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1 text-xs font-semibold text-foreground shadow-sm transition-colors ${theme.borderHover} ${theme.accentText}`}
          >
            <ArrowLeft className="size-3.5" />
            All offices
          </button>

          <div className="grid min-h-0 flex-1 animate-fade-in grid-cols-1 gap-3 overflow-hidden md:grid-cols-[minmax(0,320px)_1fr]">
            {/* Office info card — identification panel with building-specific theme */}
            <div 
              className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border bg-card"
              style={{
                borderColor: theme.borderColor,
                boxShadow: `0 16px 40px -20px ${theme.shadowColor}`,
              }}
            >
              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-4 pt-4">
                {/* Large identifying photo, anchored top-left, high-res source, fully visible — nothing covers the face */}
                <div className="flex shrink-0 items-start justify-between">
                  <Image
                    src={activeOffice.manager.photo || "/placeholder.svg"}
                    alt={activeOffice.manager.name}
                    width={700}
                    height={700}
                    className="size-24 shrink-0 rounded-2xl border border-border object-cover object-top shadow-md transition-transform duration-300 hover:scale-105 md:size-28"
                  />
                  <span className={`inline-flex items-center gap-1 rounded-md ${theme.badgeBg} px-2 py-0.5 text-xs font-semibold ${theme.badgeText}`}>
                    <OfficeIcon name={activeOffice.icon} className="size-3.5" />
                    {activeOffice.officeNumber}
                  </span>
                </div>

                <h2 className="mt-3 shrink-0 text-sm font-bold leading-snug text-foreground text-pretty md:text-base">
                  {activeOffice.name}
                </h2>

                <p className="mb-3 mt-1.5 shrink-0 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {activeOffice.work}
                </p>

                {/* Identification block: who to expect, and exactly where + how to reach them */}
                <div className="w-full shrink-0 space-y-2 border-t border-border pt-3">
                  <div className="px-1.5">
                    <p className="truncate text-sm font-bold text-foreground">
                      {activeOffice.manager.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {activeOffice.manager.position}
                    </p>
                  </div>

                  <div className="rounded-xl bg-muted/50 p-1">
                    <IdRow
                      icon={<Building2 className="size-3.5" />}
                      label="Building"
                      value={building.name}
                      copyKey="building"
                      copiedKey={copiedKey}
                      onCopy={handleCopy}
                      accentClass={theme.accentBg}
                      accentHoverClass={theme.accentHover}
                      textPrimaryClass={theme.accentText}
                    />
                    {activeOffice.floor && (
                      <IdRow
                        icon={<Layers className="size-3.5" />}
                        label="Floor"
                        value={activeOffice.floor}
                        copyKey="floor"
                        copiedKey={copiedKey}
                        onCopy={handleCopy}
                        accentClass={theme.accentBg}
                        accentHoverClass={theme.accentHover}
                        textPrimaryClass={theme.accentText}
                      />
                    )}
                    {activeOffice.room && (
                      <IdRow
                        icon={<Hash className="size-3.5" />}
                        label="Room"
                        value={activeOffice.room}
                        copyKey="room"
                        copiedKey={copiedKey}
                        onCopy={handleCopy}
                        accentClass={theme.accentBg}
                        accentHoverClass={theme.accentHover}
                        textPrimaryClass={theme.accentText}
                      />
                    )}
                    <IdRow
                      icon={<Phone className="size-3.5" />}
                      label="Contact No."
                      value={activeOffice.manager.telephone}
                      copyKey="telephone"
                      copiedKey={copiedKey}
                      onCopy={handleCopy}
                      accentClass={theme.accentBg}
                      accentHoverClass={theme.accentHover}
                      textPrimaryClass={theme.accentText}
                    />
                    <IdRow
                      icon={<Mail className="size-3.5" />}
                      label="Email"
                      value={activeOffice.manager.email}
                      copyKey="email"
                      copiedKey={copiedKey}
                      onCopy={handleCopy}
                      accentClass={theme.accentBg}
                      accentHoverClass={theme.accentHover}
                      textPrimaryClass={theme.accentText}
                    />
                  </div>

                  {/* Quick actions with building-specific styling */}
                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <a
                      href={`tel:${activeOffice.manager.telephone}`}
                      className={`inline-flex items-center justify-center gap-1.5 rounded-xl ${theme.buttonBg} px-3 py-2 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] ${theme.buttonHover} active:scale-[0.98]`}
                    >
                      <PhoneCall className="size-3.5" />
                      Call
                    </a>
                    <a
                      href={`mailto:${activeOffice.manager.email}`}
                      className={`inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground shadow-sm transition-transform hover:scale-[1.02] ${theme.borderHover} ${theme.accentText} active:scale-[0.98]`}
                    >
                      <Mail className="size-3.5" />
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Departments panel with building-specific styling */}
            <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-muted/30 p-4">
              <h3 className="mb-3 flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-wide text-foreground">
                <Users className={`size-4 ${theme.accentText}`} />
                Departments ({activeOffice.departments.length}) · click to open
              </h3>
              <div className="grid min-h-0 flex-1 auto-rows-fr grid-cols-1 gap-2 sm:grid-cols-2">
                {activeOffice.departments.map((deptItem) => (
                  <button
                    key={deptItem.id}
                    type="button"
                    onClick={() =>
                      onViewDepartment(activeOffice.id, deptItem.id)
                    }
                    className={`group/dept flex h-full min-h-0 items-center gap-3 overflow-hidden rounded-xl border border-border bg-card px-3 py-3 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${theme.borderHover}`}
                  >
                    <Image
                      src={deptItem.detail.photo || "/placeholder.svg"}
                      alt={deptItem.detail.managerName}
                      width={128}
                      height={128}
                      className="size-11 shrink-0 rounded-xl object-cover ring-1 ring-border"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-semibold leading-snug text-foreground text-pretty line-clamp-2">
                        {deptItem.name}
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                        {deptItem.detail.managerName}
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] text-muted-foreground/70">
                        {deptItem.detail.description.slice(0, 60)}…
                      </span>
                    </span>
                    <ChevronRight className={`size-4 shrink-0 ${theme.iconColor} transition-all group-hover/dept:translate-x-0.5`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── Office grid with building-specific styling ── */
        <div className="grid min-h-0 flex-1 auto-rows-fr grid-cols-2 gap-3 overflow-hidden md:grid-cols-3 lg:grid-cols-4">
          {building.offices.map((office, i) => (
            <button
              key={office.id}
              type="button"
              onClick={() => setSelectedOffice(office.id)}
              data-building={buildingId}
              style={{ 
                animationDelay: `${i * 40}ms`,
              }}
              className={`office-card group flex h-full min-h-0 animate-fade-in flex-col overflow-hidden rounded-2xl border border-border bg-card p-3 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 ${theme.borderHover}`}
            >
              {/* Top: photo + badge + office name */}
              <div className="flex shrink-0 items-start gap-2.5">
                <Image
                  src={office.manager.photo || "/placeholder.svg"}
                  alt={office.manager.name}
                  width={208}
                  height={208}
                  className="size-13 shrink-0 rounded-xl object-cover ring-1 ring-border"
                />
                <div className="min-w-0 flex-1">
                  <span className={`inline-flex items-center gap-1 rounded-md ${theme.badgeBg} px-1.5 py-0.5 text-[11px] font-semibold ${theme.badgeText}`}>
                    <OfficeIcon name={office.icon} className="size-3" />
                    {office.officeNumber}
                  </span>
                  <h2 className="mt-0.5 line-clamp-2 text-xs font-bold leading-snug text-foreground text-pretty md:text-sm">
                    {office.name}
                  </h2>
                </div>
              </div>

              {/* Description — absorbs the leftover space so every card matches height */}
              <p className="mt-2 min-h-0 flex-1 overflow-hidden text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
                {office.work}
              </p>

              {/* Divider */}
              <div className="my-2 shrink-0 border-t border-border" />

              {/* Manager info — fixed block, same for every card */}
              <div className="shrink-0 space-y-0.5">
                <p className="truncate text-xs font-bold text-foreground">
                  {office.manager.name}
                </p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {office.manager.position}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Phone className={`size-3 shrink-0 ${theme.accentText}`} />
                  <span className="truncate">{office.manager.telephone}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Mail className={`size-3 shrink-0 ${theme.accentText}`} />
                  <span className="truncate">{office.manager.email}</span>
                </div>
              </div>

              {/* Department count with building-specific styling */}
              <div className={`mt-auto flex shrink-0 items-center gap-1 pt-2 text-xs font-semibold ${theme.accentText}`}>
                <Users className="size-3.5 shrink-0" />
                {office.departments.length} dept
                {office.departments.length !== 1 ? "s" : ""}
                <ChevronRight className="ml-auto size-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
