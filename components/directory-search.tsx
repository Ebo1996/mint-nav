"use client"

import { useEffect, useRef, useState } from "react"
import { Search, MapPin, X } from "lucide-react"
import { searchDirectory, type SearchHit } from "@/lib/ministry-data"

interface DirectorySearchProps {
  onSelect: (hit: SearchHit) => void
  placeholder?: string
  autoFocus?: boolean
}

export function DirectorySearch({ onSelect, placeholder, autoFocus }: DirectorySearchProps) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<SearchHit[]>([])
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setResults(searchDirectory(query))
  }, [query])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 shadow-sm transition-all duration-300 focus-within:border-primary focus-within:shadow-[0_0_0_4px_rgba(8,105,118,0.10)]">
        <Search className="size-5 shrink-0 text-primary" aria-hidden="true" />
        <input
          type="text"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder={
            placeholder ??
            "Search by Department, Office, Manager, Room Number or Office Number..."
          }
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          aria-label="Search the ministry directory"
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("")
              setOpen(false)
            }}
            aria-label="Clear search"
            className="shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        ) : null}
      </div>

      {open && query.trim() ? (
        <div className="animate-fade-in absolute left-0 right-0 top-[calc(100%+8px)] z-40 max-h-[300px] overflow-y-auto rounded-2xl border border-border bg-popover p-2 shadow-2xl shadow-primary/10">
          {results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              No matching offices, departments or managers found.
            </p>
          ) : (
            <ul className="space-y-1">
              {results.map((hit) => (
                <li key={`${hit.buildingId}-${hit.officeId}-${hit.departmentId ?? "office"}`}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(hit)
                      setOpen(false)
                    }}
                    className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-accent"
                  >
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                      <MapPin className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-foreground">
                        {hit.label}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">{hit.sub}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  )
}
