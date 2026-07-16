import {
  Building2,
  Coins,
  Crown,
  FlaskConical,
  Handshake,
  Network,
  ScrollText,
  type LucideIcon,
} from "lucide-react"

const map: Record<string, LucideIcon> = {
  crown: Crown,
  handshake: Handshake,
  flask: FlaskConical,
  network: Network,
  building: Building2,
  scroll: ScrollText,
  coins: Coins,
}

export function OfficeIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? Building2
  return <Icon className={className} aria-hidden="true" />
}
