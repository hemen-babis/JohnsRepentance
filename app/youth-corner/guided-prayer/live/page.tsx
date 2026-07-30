"use client"

import Link from "next/link"
import { CheckCircle2, BookOpen, Flame, ArrowLeft } from "lucide-react"
import { getVerseForDate } from "@/lib/youth-daily"
import { guidedEntry } from "@/lib/youth-corner-data"

const blessings = [
  "Go in peace. You are not the same person who sat down to pray.",
  "Carry what you received. Let it change what you do in the next hour.",
  "The word has gone into you. Trust it to work.",
  "Your prayer was heard before you finished saying it.",
  "You have given God a portion of your day. He will multiply it.",
  "Leave this place as a witness. Someone needs what you were just given.",
  "Be what you prayed. That is the rest of the work.",
]

export default function LivePage() {
  const verse = getVerseForDate(new Date())
  const blessing = blessings[new Date().getDay() % blessings.length]

  return (
    <div className="min-h-screen parchment-page-bg px-4 py-10 dark:bg-none dark:bg-gradient-to-b dark:from-[#120d09] dark:via-[#1a0f08] dark:to-[#120d09]">

      <Link href="/youth-corner/guided-prayer" className="inline-flex items-center gap-1.5 mb-8 rounded-full border border-stone-200/60 bg-white/60 dark:border-stone-700/40 dark:bg-stone-900/50 px-3 py-1.5 text-[11px] font-semibold text-stone-500 dark:text-stone-400 hover:border-stone-300 transition">
        <ArrowLeft className="h-3 w-3" /> Back to Prayer
      </Link>

      <div className="w-full max-w-md mx-auto space-y-6">

        {/* Completion badge */}
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 dark:border-emerald-800/30 dark:bg-emerald-950/20 shadow-[0_12px_36px_-20px_rgba(16,185,129,0.3)]">
            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-orange-600 dark:text-amber-400">
            Session Complete
          </p>
          <h1 className="text-4xl font-black text-[#3d2206] dark:text-[#f3e4cd]">
            Now live it.
          </h1>
        </div>

        {/* Blessing */}
        <div className="rounded-[1.75rem] border border-amber-200/60 bg-white/85 dark:border-amber-500/20 dark:bg-stone-900/80 px-6 py-6 shadow-[0_18px_50px_-30px_rgba(120,53,15,0.2)]">
          <p className="text-base font-semibold leading-7 text-stone-700 dark:text-stone-300 text-center">{blessing}</p>
        </div>

        {/* What you did today */}
        <div className="rounded-[1.75rem] border border-stone-200/60 bg-white/85 dark:border-stone-700/40 dark:bg-stone-900/80 overflow-hidden shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)]">
          <div className="h-1 bg-gradient-to-r from-[#7c2d12] via-[#d4a84f] to-[#0f766e]" />
          <div className="p-5 space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-stone-400 dark:text-stone-500">What you completed today</p>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-950/30">
                <BookOpen className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wide mb-0.5">You read</p>
                <p className="text-sm font-black text-stone-900 dark:text-white">{guidedEntry.reference}</p>
                <p className="mt-1 text-xs italic leading-5 text-stone-500 dark:text-stone-400 line-clamp-2">&ldquo;{guidedEntry.reading}&rdquo;</p>
              </div>
            </div>

            <div className="h-px bg-stone-100 dark:bg-stone-800" />

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-950/30">
                <span className="text-xs font-black text-orange-700 dark:text-orange-400">"</span>
              </div>
              <div>
                <p className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wide mb-0.5">You sat with</p>
                <p className="text-sm font-semibold leading-6 text-stone-700 dark:text-stone-300 line-clamp-2">{guidedEntry.reflection}</p>
              </div>
            </div>

            <div className="h-px bg-stone-100 dark:bg-stone-800" />

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-950/30">
                <Flame className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wide mb-0.5">You committed to</p>
                <p className="text-sm font-semibold leading-6 text-stone-700 dark:text-stone-300">{guidedEntry.action}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Daily verse */}
        <div className="rounded-[1.75rem] border border-amber-100/60 bg-white/70 dark:border-amber-800/20 dark:bg-stone-900/60 px-6 py-5 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-stone-400 dark:text-stone-500 mb-2">Today&apos;s verse</p>
          <p className="text-sm italic leading-7 text-stone-600 dark:text-stone-400">&ldquo;{verse.text}&rdquo;</p>
          <p className="mt-2 text-xs font-bold text-orange-600 dark:text-amber-400">{verse.reference}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center pt-2">
          <Link href="/youth-corner" className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#c86224] to-[#e2a13c] px-7 py-3.5 text-sm font-bold text-white shadow-[0_14px_36px_-18px_rgba(200,98,36,0.55)] hover:brightness-105 transition">
            Back to Youth Corner
          </Link>
          <Link href="/youth-corner/plans" className="inline-flex items-center justify-center gap-2.5 rounded-full border border-amber-200/60 bg-white/70 dark:bg-stone-900/50 dark:border-amber-500/20 px-7 py-3.5 text-sm font-semibold text-stone-700 dark:text-stone-300 hover:border-amber-300 transition">
            Explore a Study Plan
          </Link>
        </div>

      </div>
    </div>
  )
}
