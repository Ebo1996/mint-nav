import { t, type Lang } from "@/lib/translations"

interface PortalFooterProps {
  language: Lang
}

export function PortalFooter({ language }: PortalFooterProps) {
  const tr = t[language]
  const year = new Date().getFullYear()
  return (
    <footer
      className="relative z-30 flex h-auto min-h-[52px] shrink-0 flex-col sm:flex-row items-center justify-between overflow-hidden bg-header px-3 sm:px-5 py-2 sm:py-0 text-header-foreground md:px-8 gap-1 sm:gap-0"
      role="contentinfo"
    >
      {/* top hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      {/* ambient glows */}
      <div className="pointer-events-none absolute -left-10 top-1/2 size-28 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />
      <div className="pointer-events-none absolute -right-10 top-1/2 size-28 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />

      <p className="relative text-[10px] sm:text-[11px] md:text-xs font-medium text-header-foreground/75 text-center sm:text-left">
        © {year} {language === "am" ? "የኢኖቬሽንና ቴክኖሎጂ ሚኒስቴር።" : "Ministry of Innovation and Technology (MInT)."}{" "}
        {tr.allRightsReserved}
      </p>

      <p className="relative text-[10px] sm:text-[11px] font-semibold tracking-wide text-header-foreground/50">
        {tr.digitalOfficeNavPortal}
      </p>
    </footer>
  )
}
