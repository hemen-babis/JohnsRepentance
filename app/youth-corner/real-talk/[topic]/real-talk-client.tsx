"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import type { RealTalkTopic } from "./page"

// ─── Color maps ───────────────────────────────────────────────────────────────

const HEADING_COLORS: Record<string, string> = {
  rose: "text-rose-600 dark:text-rose-400",
  violet: "text-violet-600 dark:text-violet-400",
  sky: "text-sky-600 dark:text-sky-400",
  amber: "text-amber-600 dark:text-amber-400",
  indigo: "text-indigo-600 dark:text-indigo-400",
  orange: "text-orange-600 dark:text-orange-400",
}

const SCRIPTURE_BORDER: Record<string, string> = {
  rose: "border-rose-200 dark:border-rose-800/50",
  violet: "border-violet-200 dark:border-violet-800/50",
  sky: "border-sky-200 dark:border-sky-800/50",
  amber: "border-amber-200 dark:border-amber-800/50",
  indigo: "border-indigo-200 dark:border-indigo-800/50",
  orange: "border-orange-200 dark:border-orange-800/50",
}

// ─── Client component ─────────────────────────────────────────────────────────

export default function RealTalkClient({ data }: { data: RealTalkTopic }) {
  const headingColor = HEADING_COLORS[data.color] ?? "text-amber-600 dark:text-amber-400"
  const scriptureBorder = SCRIPTURE_BORDER[data.color] ?? "border-amber-200 dark:border-amber-800/50"

  return (
    <div className="min-h-screen bg-transparent text-stone-900 dark:text-white">

      {/* ── Dark hero header ─────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #1c0700 0%, #3d1205 40%, #0a1e12 85%, #081812 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_48px] opacity-[0.06]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 20% 0%, rgba(220,100,20,0.18), transparent 55%)" }}
        />

        <div className="relative px-5 pt-8 pb-10">
          {/* Back button */}
          <Link
            href="/youth-corner"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white/90 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Youth Corner
          </Link>

          {/* Emoji + title */}
          <div className="flex items-start gap-4 mt-2">
            <div className="text-5xl leading-none">{data.emoji}</div>
            <div className="flex-1">
              <h1 className="text-2xl font-black leading-tight text-white">{data.title}</h1>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{data.subtitle}</p>
            </div>
          </div>

          {/* Opening line */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 backdrop-blur-sm">
            <p className="text-base font-black leading-relaxed text-white">{data.openingLine}</p>
          </div>
        </div>
      </div>

      {/* ── Body sections ────────────────────────────────────────────────────── */}
      <div className="px-5 py-6 space-y-4">
        <div className="overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-white dark:border-stone-800 dark:bg-stone-900">
          {data.body.map((section, i) => (
            <div
              key={i}
              className={`px-5 py-5 ${i < data.body.length - 1 ? "border-b border-stone-100 dark:border-stone-800" : ""}`}
            >
              <h2 className={`text-sm font-black uppercase tracking-wide mb-3 ${headingColor}`}>
                {section.heading}
              </h2>
              <p className="text-sm leading-[1.85] text-stone-700 dark:text-stone-300">{section.text}</p>
            </div>
          ))}
        </div>

        {/* Scripture card */}
        <div className={`rounded-[1.75rem] border-2 ${scriptureBorder} bg-amber-50/60 dark:bg-amber-950/10 p-6`}>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.26em] text-amber-600 dark:text-amber-400">Scripture</p>
          <p className="text-lg font-black leading-snug text-stone-900 dark:text-white">
            &ldquo;{data.scripture.text}&rdquo;
          </p>
          <p className="mt-3 text-sm font-bold text-amber-600 dark:text-amber-400">— {data.scripture.reference}</p>
        </div>

        {/* Reflection question */}
        <div className="rounded-[1.75rem] border border-stone-200/80 bg-white dark:border-stone-800 dark:bg-stone-900 p-6">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.26em] text-stone-400 dark:text-stone-500">
            Sit with this
          </p>
          <p className="text-lg font-black leading-snug text-stone-900 dark:text-white">{data.reflectionQ}</p>
        </div>

        {/* Prayer card */}
        <div
          className="relative overflow-hidden rounded-[1.75rem] p-6"
          style={{ background: "linear-gradient(135deg, #1c0700 0%, #3d1205 60%, #0a1e12 100%)" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_40px] opacity-[0.06]" />
          <div className="relative">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.26em] text-amber-400/70">Prayer</p>
            <p className="text-sm italic leading-[1.9] text-white/85">{data.prayer}</p>
          </div>
        </div>

        {/* Next steps */}
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
            Next steps
          </p>
          <div className="space-y-2">
            {data.nextSteps.map((step) =>
              step.external ? (
                <button
                  key={step.label}
                  type="button"
                  onClick={() => window.open(step.href, "_blank")}
                  className="flex w-full items-center justify-between rounded-2xl border border-stone-200/80 bg-white dark:border-stone-800 dark:bg-stone-900 px-5 py-4 text-left transition hover:shadow-md active:scale-[0.99]"
                >
                  <span className="text-sm font-semibold text-stone-800 dark:text-stone-200">{step.label}</span>
                  <ExternalLink className="h-4 w-4 shrink-0 text-stone-400 dark:text-stone-500" />
                </button>
              ) : (
                <Link
                  key={step.label}
                  href={step.href}
                  className="flex items-center justify-between rounded-2xl border border-stone-200/80 bg-white dark:border-stone-800 dark:bg-stone-900 px-5 py-4 transition hover:shadow-md active:scale-[0.99]"
                >
                  <span className="text-sm font-semibold text-stone-800 dark:text-stone-200">{step.label}</span>
                  <span className="text-stone-400 dark:text-stone-500">→</span>
                </Link>
              )
            )}
          </div>
        </div>

        {/* Still struggling */}
        <div className="rounded-[1.75rem] border border-stone-200/80 bg-white dark:border-stone-800 dark:bg-stone-900 p-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-stone-900 dark:text-white">Still struggling?</p>
            <p className="mt-0.5 text-xs text-stone-400 dark:text-stone-500">Ask a question in our community.</p>
          </div>
          <button
            type="button"
            onClick={() => window.open("https://t.me/johnsrepentance", "_blank")}
            className="shrink-0 flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#c86224] to-[#e2a13c] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:brightness-105 transition"
          >
            Telegram
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Bottom spacer */}
        <div className="pb-6" />
      </div>
    </div>
  )
}
