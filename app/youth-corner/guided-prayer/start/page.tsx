"use client"

import Link from "next/link"
import { ArrowLeft, BookOpen } from "lucide-react"
import { guidedEntry } from "@/lib/youth-corner-data"
import { getVerseForDate } from "@/lib/youth-daily"

const serif = "'Iowan Old Style', 'Palatino Linotype', Georgia, serif"

export default function GuidedPrayerStart() {
  const verse = getVerseForDate(new Date())

  return (
    <div className="min-h-screen text-stone-900 dark:text-white">

      {/* Dark hero */}
      <div
        className="relative overflow-hidden px-5 pt-10 pb-12 text-center"
        style={{ background: "linear-gradient(160deg, #1c0700 0%, #3d1205 45%, #0a1e12 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_48px] opacity-[0.06]" />
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(220,100,20,0.18), transparent 60%)" }} />

        <Link href="/youth-corner" className="absolute left-4 top-5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[11px] font-semibold text-white/70 backdrop-blur-sm hover:bg-white/14 transition">
          <ArrowLeft className="h-3 w-3" /> Back
        </Link>

        <div className="relative max-w-xs mx-auto">
          {/* Cross */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/8 backdrop-blur-sm">
            <span className="text-3xl text-amber-400/80">✝</span>
          </div>

          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-amber-400/60 mb-3">Guided Prayer</p>

          <h1 className="text-4xl font-black text-white leading-tight mb-4">
            Be still…
          </h1>

          <p className="text-base leading-8 text-white/60 mb-6">
            Before you read anything,<br />just pause for a moment.<br />
            <span className="text-white/85 font-semibold">God is already here.</span>
          </p>

          {/* Breathing cue */}
          <div className="mx-auto mb-8 rounded-2xl border border-white/10 bg-white/6 px-5 py-4 text-sm text-white/50 leading-6">
            Take three slow breaths.<br />
            Seal yourself with the Sign of the Cross.<br />
            Then, when you are ready — begin.
          </div>
        </div>
      </div>

      {/* Today's session preview */}
      <div className="px-5 py-8 max-w-md mx-auto space-y-4">

        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500 mb-4">Today&apos;s Session</p>

        {/* Main reading */}
        <div className="overflow-hidden rounded-[1.5rem] border border-stone-200/80 bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.08)] dark:border-stone-800 dark:bg-stone-900">
          <div className="h-1 bg-gradient-to-r from-[#7c2d12] via-[#d4a84f] to-[#0f766e]" />
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-800/30">
                <BookOpen className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-stone-400 dark:text-stone-500">Scripture</p>
                <p className="text-sm font-black text-stone-900 dark:text-white">{guidedEntry.reference}</p>
              </div>
            </div>
            <p className="text-sm leading-7 text-stone-600 dark:text-stone-400 italic">&ldquo;{guidedEntry.reading}&rdquo;</p>
          </div>
        </div>

        {/* Daily verse companion */}
        <div className="rounded-[1.5rem] border border-stone-200/80 bg-white dark:border-stone-800 dark:bg-stone-900 p-5 shadow-[0_4px_16px_-8px_rgba(0,0,0,0.07)]">
          <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-stone-400 dark:text-stone-500 mb-2">Daily Verse Companion</p>
          <p className="text-sm italic leading-7 text-stone-600 dark:text-stone-400">&ldquo;{verse.text}&rdquo;</p>
          <p className="mt-2 text-xs font-bold text-orange-600 dark:text-amber-400">— {verse.reference}</p>
        </div>

        {/* What you'll do */}
        <div className="rounded-[1.5rem] border border-stone-200/80 bg-white dark:border-stone-800 dark:bg-stone-900 p-5 shadow-[0_4px_16px_-8px_rgba(0,0,0,0.07)]">
          <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-stone-400 dark:text-stone-500 mb-3">This session includes</p>
          <div className="space-y-2.5">
            {[
              { step: "Read",    desc: "The scripture passage, read slowly" },
              { step: "Reflect", desc: "A question to sit with" },
              { step: "Act",     desc: "One concrete thing to do today" },
              { step: "Pray",    desc: "A guided prayer — then silence" },
              { step: "Journal", desc: "Write what God is showing you" },
            ].map(({ step, desc }) => (
              <div key={step} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7c2d12] to-[#b45309] text-[10px] font-black text-white">
                  {step[0]}
                </span>
                <div>
                  <span className="text-xs font-bold text-stone-800 dark:text-stone-200">{step}</span>
                  <span className="text-xs text-stone-400 dark:text-stone-500"> — {desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/youth-corner/guided-prayer"
          className="block w-full rounded-full bg-gradient-to-r from-[#c86224] to-[#e2a13c] py-4 text-center text-sm font-bold text-white shadow-[0_12px_30px_-10px_rgba(200,98,36,0.5)] hover:brightness-105 transition active:scale-[0.98]"
        >
          Begin →
        </Link>

        <p className="text-center text-[11px] text-stone-400 dark:text-stone-600">All entries saved privately on this device only.</p>
      </div>
    </div>
  )
}
