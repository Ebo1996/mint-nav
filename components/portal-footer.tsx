export function PortalFooter() {
  return (
    <footer
      className="relative z-30 flex h-[55px] shrink-0 items-center justify-center overflow-hidden bg-header px-4 text-center text-header-foreground"
      role="contentinfo"
    >
      {/* hairline accent, mirrors the header's bottom edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      {/* faint ambient glow, echoes the header without competing for attention */}
      <div className="pointer-events-none absolute -left-10 top-1/2 size-24 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />
      <div className="pointer-events-none absolute -right-10 top-1/2 size-24 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />

      <p className="relative flex items-center gap-2 text-[11px] font-medium text-header-foreground/85 md:text-xs">
        <span
          className="hidden size-1 rounded-full bg-header-foreground/40 sm:inline-block"
          aria-hidden="true"
        />
        {"\u00A9"} {new Date().getFullYear()} Ministry of Innovation and
        Technology (MInT). All Rights Reserved.
        <span
          className="hidden size-1 rounded-full bg-header-foreground/40 sm:inline-block"
          aria-hidden="true"
        />
      </p>
    </footer>
  );
}
