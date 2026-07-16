"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

interface WelcomePageProps {
  onExplore: () => void
}

interface Slide {
  title: string
  body?: React.ReactNode
  sub?: string
  list?: string[]
  list2?: string[]
}

const slides: Slide[] = [
  {
    title: "Vision",
    body: (
      <p className="text-[15px] leading-relaxed text-muted-foreground">
        Build a country that is conducive for job and wealth creation through technology and innovation.
      </p>
    ),
    sub: "Mission",
    list: [
      "Ensure sustainable national development by creating an environment where innovation systems are implemented.",
      "Create an enabling environment for the country's digital economy.",
      "Build national capacity to increase the competitiveness of Ethiopia's technology industry.",
    ],
  },
  {
    title: "Our Values",
    list: [
      "Decent conscience and good heart",
      "Limitless thirst for learning",
      "Love of work and dedication",
      "Unlimited thought and imagination",
      "A foundation for generations",
    ],
    sub: "Organizational Philosophy",
    list2: [
      "Knowledge is wealth.",
      "We acknowledge new ideas.",
      "Diligence is the power of positive change.",
      "Technology and innovation is the language of the new generation.",
      "Modern digital economy is the basis of our development.",
    ],
  },
  {
    title: "Powers and Duties",
    body: (
      <p className="text-[15px] leading-relaxed text-muted-foreground">
        The Ministry is constitutionally mandated to lead the nation&apos;s innovation and technology agenda —
        formulating policy, coordinating the digital economy, supporting research, and driving technology
        transfer across every sector.
      </p>
    ),
    list: [
      "Formulate national innovation & technology policy and strategy.",
      "Coordinate and regulate the digital economy and e-government services.",
      "Promote research, technology transfer and startup ecosystems.",
      "Represent Ethiopia in international technology cooperation.",
    ],
  },
]

export function WelcomePage({ onExplore }: WelcomePageProps) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % slides.length), 8000)
    return () => clearInterval(t)
  }, [])

  const slide = slides[active]

  return (
    <div className="mx-auto grid h-full w-full max-w-[1400px] grid-cols-1 items-center gap-6 px-5 py-6 md:grid-cols-2 md:gap-10 md:px-8">
      {/* Left */}
      <section className="flex flex-col items-start justify-center">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
          <span className="size-1.5 rounded-full bg-primary" />
          Ministry Wayfinding System
        </span>
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
          Where would you like to go?
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          Instantly locate ministry offices, departments, managers, room numbers and buildings across the
          Ministry of Innovation and Technology.
        </p>
        <button
          type="button"
          onClick={onExplore}
          className="group relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/30 active:scale-100"
        >
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
          Explore Ministry Portal
          <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </section>

      {/* Right — slider */}
      <section className="flex h-full min-h-0 flex-col justify-center">
        <div className="relative flex min-h-0 flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-[0_20px_60px_-30px_rgba(8,105,118,0.45)] md:p-8">
          <div key={active} className="animate-fade-in flex min-h-0 flex-col">
            <h2 className="font-display text-2xl font-bold tracking-tight text-primary md:text-3xl">
              {slide.title}
            </h2>
            {slide.body ? <div className="mt-3">{slide.body}</div> : null}
            {slide.list ? (
              <ul className="mt-4 space-y-2">
                {slide.list.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-foreground/80">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
            {slide.sub ? (
              <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-foreground/70">
                {slide.sub}
              </h3>
            ) : null}
            {slide.list2 ? (
              <ul className="mt-3 space-y-2">
                {slide.list2.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/40" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="mt-6 flex items-center gap-2 pt-2">
            {slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                aria-label={`Show ${s.title} slide`}
                aria-current={i === active}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-7 bg-primary" : "w-2 bg-primary/25 hover:bg-primary/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
