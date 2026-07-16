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
  Mail,
  MapPin,
  Navigation,
  Phone,
  PhoneCall,
} from "lucide-react";
import { getDepartment } from "@/lib/ministry-data";

interface DepartmentDetailProps {
  buildingId: string;
  officeId: string;
  departmentId: string;
  onHome: () => void;
  onBackToBuilding: () => void;
}

const STATUS_STYLES: Record<string, { pill: string; dot: string }> = {
  Open: {
    pill: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/15",
    dot: "bg-emerald-500",
  },
  Closed: {
    pill: "bg-red-50 text-red-700 ring-1 ring-red-600/15",
    dot: "bg-red-500",
  },
  "By Appointment": {
    pill: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/15",
    dot: "bg-amber-500",
  },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.Open;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${s.pill}`}
    >
      <span className={`size-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

/** Info row that copies its value to the clipboard on click and confirms with a check icon. */
function InfoCard({
  icon,
  label,
  value,
  copyKey,
  copiedKey,
  onCopy,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  copyKey: string;
  copiedKey: string | null;
  onCopy: (key: string, value: string) => void;
}) {
  const isCopied = copiedKey === copyKey;
  return (
    <button
      type="button"
      onClick={() => onCopy(copyKey, value)}
      title={`Copy ${label.toLowerCase()}`}
      className="group flex items-center gap-2.5 rounded-xl border border-border bg-card px-3 py-2.5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md active:translate-y-0"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
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
      <span className="shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
        {isCopied ? (
          <Check className="size-3.5 text-emerald-600" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </span>
    </button>
  );
}

export function DepartmentDetail({
  buildingId,
  officeId,
  departmentId,
  onHome,
  onBackToBuilding,
}: DepartmentDetailProps) {
  const result = getDepartment(buildingId, officeId, departmentId);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!result) return null;
  const { building, office, department } = result;
  const d = department.detail;

  function handleCopy(key: string, value: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1500);
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-[1300px] flex-col px-4 py-3 md:px-8 md:py-4">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-2 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"
      >
        <button
          type="button"
          onClick={onHome}
          className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 font-medium transition-colors hover:text-primary"
        >
          <Home className="size-3.5" />
          Home
        </button>
        <ChevronRight className="size-3.5" />
        <button
          type="button"
          onClick={onBackToBuilding}
          className="rounded-md px-1 py-0.5 font-medium transition-colors hover:text-primary"
        >
          {building.name}
        </button>
        <ChevronRight className="size-3.5" />
        <span className="truncate font-semibold text-primary">
          {department.name}
        </span>
      </nav>

      <button
        type="button"
        onClick={onBackToBuilding}
        className="mb-3 inline-flex w-fit shrink-0 items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm transition-all hover:-translate-x-0.5 hover:border-primary/40 hover:text-primary"
      >
        <ArrowLeft className="size-3.5" />
        Back to {office.name}
      </button>

      {/* Two-column: profile | location & contact */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-[minmax(0,400px)_1fr]">
        {/* ── Profile card ── */}
        <div className="relative flex min-h-0 flex-col overflow-y-auto rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
            {/* Photo: large, anchored top-left, fully visible — no overlay covering the face */}
            <div className="flex items-start justify-between">
              <div className="relative">
                <Image
                  src={d.photo || "/placeholder.svg"}
                  alt={d.managerName}
                  width={700}
                  height={700}
                  className="size-28 shrink-0 rounded-2xl border border-border object-cover object-top shadow-md transition-transform duration-300 hover:scale-105 md:size-32"
                />
                <span className="absolute -bottom-1.5 -right-1.5 flex size-7 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground shadow-sm">
                  <DoorOpen className="size-3.5" />
                </span>
              </div>
              <div className="pt-0.5">
                <StatusBadge status={d.status} />
              </div>
            </div>

            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-primary">
              {office.name}
            </p>
            <h1 className="mt-0.5 font-display text-xl font-bold tracking-tight text-balance md:text-2xl">
              {department.name}
            </h1>
            {department.amharic && (
              <p className="mt-0.5 text-sm text-muted-foreground">
                {department.amharic}
              </p>
            )}

            {/* Description */}
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {d.description}
            </p>

            {/* Manager profile */}
            <div className="mt-auto space-y-3 pt-4">
              <div className="rounded-xl bg-muted/60 px-4 py-3">
                <p className="text-sm font-bold text-foreground">
                  {d.managerName}
                </p>
                <p className="text-xs text-muted-foreground">{d.position}</p>
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Mail className="size-3 shrink-0 text-primary" />
                  <span className="truncate">{d.email}</span>
                </div>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${d.telephone}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <PhoneCall className="size-3.5" />
                  Call
                </a>
                <a
                  href={`mailto:${d.email}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground shadow-sm transition-transform hover:scale-[1.02] hover:border-primary/40 hover:text-primary active:scale-[0.98]"
                >
                  <Mail className="size-3.5" />
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Location & Contact ── */}
        <div className="flex min-h-0 flex-col rounded-2xl border border-border bg-muted/30 p-4">
          <div className="mb-3 flex shrink-0 items-center justify-between">
            <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-foreground">
              <MapPin className="size-4 text-primary" />
              Location &amp; Contact
            </h2>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(`${building.name} ${d.location}`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-semibold text-primary shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Navigation className="size-3" />
              Directions
            </a>
          </div>
          <div className="grid min-h-0 flex-1 auto-rows-fr grid-cols-1 gap-2 sm:grid-cols-2">
            <InfoCard
              icon={<Building2 className="size-4" />}
              label="Building"
              value={d.building}
              copyKey="building"
              copiedKey={copiedKey}
              onCopy={handleCopy}
            />
            <InfoCard
              icon={<Layers className="size-4" />}
              label="Floor"
              value={d.floor}
              copyKey="floor"
              copiedKey={copiedKey}
              onCopy={handleCopy}
            />
            <InfoCard
              icon={<DoorOpen className="size-4" />}
              label="Room"
              value={d.room}
              copyKey="room"
              copiedKey={copiedKey}
              onCopy={handleCopy}
            />
            <InfoCard
              icon={<Hash className="size-4" />}
              label="Office No."
              value={d.officeNumber}
              copyKey="officeNumber"
              copiedKey={copiedKey}
              onCopy={handleCopy}
            />
            <InfoCard
              icon={<Phone className="size-4" />}
              label="Telephone"
              value={d.telephone}
              copyKey="telephone"
              copiedKey={copiedKey}
              onCopy={handleCopy}
            />
            <InfoCard
              icon={<Hash className="size-4" />}
              label="Extension"
              value={d.extension}
              copyKey="extension"
              copiedKey={copiedKey}
              onCopy={handleCopy}
            />
            <InfoCard
              icon={<Mail className="size-4" />}
              label="Email"
              value={d.email}
              copyKey="email"
              copiedKey={copiedKey}
              onCopy={handleCopy}
            />
            <InfoCard
              icon={<MapPin className="size-4" />}
              label="Location"
              value={d.location}
              copyKey="location"
              copiedKey={copiedKey}
              onCopy={handleCopy}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
