import { t, type Lang } from "@/lib/translations"

interface PortalFooterProps {
  language: Lang
}

export function PortalFooter({ language }: PortalFooterProps) {
  const tr = t[language]
  const year = new Date().getFullYear()
  return (
    <footer
      className="relative z-30 flex h-[52px] shrink-0 items-center justify-between overflow-hidden bg-header px-5 text-header-foreground md:px-8"
      role="contentinfo"
    >
      {/* top hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      {/* ambient glows */}
      <div className="pointer-events-none absolute -left-10 top-1/2 size-28 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />
      <div className="pointer-events-none absolute -right-10 top-1/2 size-28 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />

      <p className="relative text-[11px] font-medium text-header-foreground/75 md:text-xs">
        © {year} {language === "am" ? "የፈጠራና ቴክኖሎጂ ሚኒስቴር (ሚኒስቴር)።" : "Ministry of Innovation and Technology (MInT)."}{" "}
        {tr.allRightsReserved}
      </p>

      <p className="relative hidden text-[11px] font-semibold tracking-wide text-header-foreground/50 sm:block">
        {tr.digitalOfficeNavPortal}
      </p>
    </footer>
  )
}
