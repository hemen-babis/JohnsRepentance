import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function RepentanceSubpageShell({
  title,
  intro,
  guidance,
  children,
}: {
  title: string
  intro: string
  guidance: string[]
  children?: ReactNode
}) {
  return (
    <main className="light-mode-adaptive-page min-h-screen bg-[url('/images/mobile-parch.png?v=20260321')] bg-cover bg-center bg-repeat text-stone-900 md:bg-[url('/images/parchment-bg.png?v=20260321')] dark:bg-none dark:bg-gradient-to-b dark:from-stone-950 dark:to-orange-950/20">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-orange-950 to-stone-900 px-6 pb-20 pt-10 text-white">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.07]" />
        <div className="absolute -bottom-16 left-1/2 h-48 w-[60rem] -translate-x-1/2 rounded-full bg-amber-600/15 blur-[72px]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

        <div className="relative mx-auto max-w-6xl">
          <Link
            href="/repentance"
            className="mb-12 inline-flex items-center gap-2 rounded-full border border-black/15 bg-[linear-gradient(135deg,#7c3a12,#c96a1a_58%,#e0992e)] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_-16px_rgba(0,0,0,0.55)] ring-1 ring-white/10 transition-colors hover:brightness-105"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to repentance
          </Link>

          <div className="mb-5 flex items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent via-[#8a4316] to-[#d47a21]" />
            <svg viewBox="0 0 40 40" className="h-5 w-5 shrink-0 fill-current text-[#8a4316] drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]" aria-hidden="true">
              <path d="M17 0h6v13h13v6H23v21h-6V19H4v-6h13z" />
            </svg>
            <div className="h-px w-10 bg-gradient-to-l from-transparent via-[#8a4316] to-[#d47a21]" />
          </div>

          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.38em] text-[#8a4316] drop-shadow-[0_1px_0_rgba(255,255,255,0.3)]">
            Repentance
          </p>

          <h1 className="mb-5 text-[clamp(2rem,5.5vw,3.75rem)] font-extrabold leading-[1.06] tracking-tight text-[#3a1e01]">
            {title}
          </h1>
          <div className="mb-5 h-[3px] w-14 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
          <p className="max-w-2xl text-lg leading-9 text-white/70">{intro}</p>
        </div>
      </section>

      {/* ── GUIDANCE POINTS ──────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-16">
        <div className="grid gap-4 md:grid-cols-3">
          {guidance.map((paragraph, i) => (
            <div key={paragraph} className="relative flex items-start gap-4 overflow-hidden rounded-2xl bg-amber-50/70 px-5 py-5 ring-1 ring-amber-200/40 dark:bg-gradient-to-br dark:from-orange-950/50 dark:to-stone-900/80 dark:ring-orange-900/40">
              <span className="pointer-events-none absolute right-3 top-0 select-none text-7xl font-black leading-none text-amber-200/60 dark:text-orange-900/30">
                {i + 1}
              </span>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-700 text-xs font-bold text-white shadow-[0_4px_12px_rgba(154,52,18,0.35)]">
                {i + 1}
              </div>
              <p className="relative text-sm leading-7 text-stone-700 dark:text-stone-300">{paragraph}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── PAGE-SPECIFIC CONTENT ─────────────────────────────────────── */}
      {children && (
        <div className="mx-auto max-w-6xl px-6 pb-24 lg:px-16">
          {children}
        </div>
      )}

    </main>
  )
}
