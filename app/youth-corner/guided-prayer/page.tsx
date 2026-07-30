"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Flame,
  MessageCircleQuestion,
  Pencil,
  Quote,
  Sparkles,
} from "lucide-react"
import { getVerseForDate, saveTodayJournal, loadTodayJournal } from "@/lib/youth-daily"
import { guidedEntry, prayerTools } from "@/lib/youth-corner-data"

const serif = "'Iowan Old Style', 'Palatino Linotype', Georgia, serif"

type Step = "read" | "reflect" | "act" | "pray" | "journal"

const STEPS: { key: Step; label: string; icon: typeof BookOpen }[] = [
  { key: "read",    label: "Read",    icon: BookOpen },
  { key: "reflect", label: "Reflect", icon: Quote },
  { key: "act",     label: "Act",     icon: Flame },
  { key: "pray",    label: "Pray",    icon: Sparkles },
  { key: "journal", label: "Journal", icon: Pencil },
]

const STEP_COLORS: Record<Step, { active: string; bg: string; border: string }> = {
  read:    { active: "text-amber-600 dark:text-amber-400",   bg: "bg-amber-50 dark:bg-amber-950/30",   border: "border-amber-200 dark:border-amber-700/40" },
  reflect: { active: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-950/30", border: "border-orange-200 dark:border-orange-700/40" },
  act:     { active: "text-rose-600 dark:text-rose-400",     bg: "bg-rose-50 dark:bg-rose-950/30",     border: "border-rose-200 dark:border-rose-800/40" },
  pray:    { active: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-950/30", border: "border-violet-200 dark:border-violet-700/40" },
  journal: { active: "text-teal-600 dark:text-teal-400",     bg: "bg-teal-50 dark:bg-teal-950/30",     border: "border-teal-200 dark:border-teal-700/40" },
}

function StepBtn({ step, index, activeIndex, completedSteps, onClick }: {
  step: typeof STEPS[0]
  index: number
  activeIndex: number
  completedSteps: Set<Step>
  onClick: () => void
}) {
  const Icon = step.icon
  const isDone = completedSteps.has(step.key)
  const isCurrent = index === activeIndex
  const colors = STEP_COLORS[step.key]

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 rounded-2xl border py-3 flex-1 transition ${
        isCurrent
          ? `${colors.border} ${colors.bg} shadow-sm`
          : isDone
          ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800/30 dark:bg-emerald-950/20"
          : "border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-900/60"
      }`}
    >
      {isDone && !isCurrent
        ? <CheckCircle2 className="h-4 w-4 text-emerald-500" />
        : <Icon className={`h-4 w-4 ${isCurrent ? colors.active : "text-stone-400 dark:text-stone-500"}`} />}
      <span className={`text-[9px] font-bold ${isCurrent ? colors.active : isDone ? "text-emerald-600 dark:text-emerald-400" : "text-stone-400"}`}>
        {step.label}
      </span>
    </button>
  )
}

// ─── Silence timer ────────────────────────────────────────────────────────────

function SilenceTimer() {
  const [seconds, setSeconds] = useState(60)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!running) return
    if (seconds <= 0) { setDone(true); setRunning(false); return }
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [running, seconds])

  const pct = ((60 - seconds) / 60) * 100
  const radius = 28
  const circ = 2 * Math.PI * radius

  function reset() { setSeconds(60); setRunning(false); setDone(false) }

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      {/* Circle timer */}
      <div className="relative h-20 w-20">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r={radius} fill="none" stroke="currentColor" strokeWidth="3" className="text-stone-100 dark:text-stone-800" />
          <circle cx="32" cy="32" r={radius} fill="none" stroke="url(#timerGrad)" strokeWidth="3" strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={circ - (pct / 100) * circ} className="transition-all duration-1000" />
          <defs>
            <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {done
            ? <span className="text-xl">✓</span>
            : <span className="text-lg font-black tabular-nums text-stone-800 dark:text-stone-200">{seconds}</span>}
          {!done && <span className="text-[9px] text-stone-400">sec</span>}
        </div>
      </div>

      {done ? (
        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Silence complete ✓</p>
      ) : running ? (
        <div className="space-y-1 text-center">
          <p className="text-xs font-semibold text-violet-700 dark:text-violet-300">Be still. God is here.</p>
          <button type="button" onClick={() => setRunning(false)} className="text-[11px] text-stone-400 hover:text-stone-600 transition">Pause</button>
        </div>
      ) : (
        <button type="button" onClick={() => setRunning(true)} className="rounded-full border border-violet-200 dark:border-violet-700/40 bg-violet-50 dark:bg-violet-950/30 px-5 py-2 text-xs font-bold text-violet-700 dark:text-violet-300 hover:bg-violet-100 transition">
          {seconds < 60 ? "Resume silence" : "Begin 1-min silence"}
        </button>
      )}

      {!running && seconds < 60 && !done && (
        <button type="button" onClick={reset} className="text-[11px] text-stone-300 dark:text-stone-600 hover:text-stone-500 transition">Reset</button>
      )}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function GuidedPrayerPage() {
  const today = new Date()
  const verse = getVerseForDate(today)
  const dateKey = today.toISOString().split("T")[0]
  const storageKey = `guided-prayer-v2-${dateKey}`

  const [activeStep, setActiveStep] = useState<Step>("read")
  const [completedSteps, setCompletedSteps] = useState<Set<Step>>(new Set())
  const [actDone, setActDone] = useState(false)
  const [journal, setJournal] = useState("")
  const [journalSaved, setJournalSaved] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)

  // Load saved state
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) {
        const data = JSON.parse(raw)
        if (data.completedSteps) setCompletedSteps(new Set(data.completedSteps as Step[]))
        if (data.actDone) setActDone(data.actDone)
        if (data.sessionComplete) { setSessionComplete(data.sessionComplete); setActiveStep("journal") }
      }
      const j = loadTodayJournal()
      if (j?.text) setJournal(j.text)
    } catch { /* ignore */ }
  }, [storageKey])

  // Persist state
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        completedSteps: Array.from(completedSteps),
        actDone,
        sessionComplete,
      }))
    } catch { /* ignore */ }
  }, [completedSteps, actDone, sessionComplete, storageKey])

  function markStep(step: Step) {
    setCompletedSteps((prev) => new Set([...prev, step]))
  }

  function advance(from: Step) {
    markStep(from)
    const idx = STEPS.findIndex((s) => s.key === from)
    if (idx < STEPS.length - 1) setActiveStep(STEPS[idx + 1].key)
  }

  function completeSession() {
    markStep("journal")
    saveTodayJournal(journal)
    setJournalSaved(true)
    setSessionComplete(true)
  }

  function saveJournal() {
    saveTodayJournal(journal)
    setJournalSaved(true)
  }

  const activeIndex = STEPS.findIndex((s) => s.key === activeStep)
  const colors = STEP_COLORS[activeStep]

  return (
    <div className="min-h-screen text-stone-900 dark:text-white">

      {/* Header */}
      <div
        className="relative overflow-hidden px-5 pt-8 pb-8"
        style={{ background: "linear-gradient(160deg, #1c0700 0%, #3d1205 45%, #0a1e12 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_44px] opacity-[0.05]" />

        <Link href="/youth-corner" className="relative inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[11px] font-semibold text-white/70 mb-5 hover:bg-white/14 transition">
          <ArrowLeft className="h-3 w-3" /> Youth Corner
        </Link>

        <div className="relative">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-400/60 mb-2">Guided Prayer</p>
          <h1 className="text-3xl font-black text-white leading-tight">
            {guidedEntry.title}
          </h1>
          <p className="mt-1.5 text-sm text-white/50 font-semibold">{guidedEntry.reference}</p>

          {sessionComplete && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/40 px-3 py-1.5 text-xs font-semibold text-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5" /> Completed today
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-5 max-w-2xl mx-auto space-y-5">

        {/* Step nav */}
        <div className="flex gap-2">
          {STEPS.map((step, i) => (
            <StepBtn
              key={step.key}
              step={step}
              index={i}
              activeIndex={activeIndex}
              completedSteps={completedSteps}
              onClick={() => setActiveStep(step.key)}
            />
          ))}
        </div>

        {/* ── READ ──────────────────────────────────────────────────────────── */}
        {activeStep === "read" && (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[1.5rem] border border-stone-200/80 bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.08)] dark:border-stone-800 dark:bg-stone-900">
              <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-amber-600 dark:text-amber-400 mb-1">Read slowly — twice if you can</p>
                  <p className="text-lg font-black text-stone-900 dark:text-white mb-4">{guidedEntry.reference}</p>
                  <div className="rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-800/30 p-4">
                    <p className="text-base leading-8 text-stone-800 dark:text-stone-200 font-medium italic">&ldquo;{guidedEntry.reading}&rdquo;</p>
                  </div>
                </div>

                <div className="rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/60 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-stone-400 dark:text-stone-500 mb-2">Also meditate on today&apos;s verse</p>
                  <p className="text-sm italic leading-7 text-stone-600 dark:text-stone-400">&ldquo;{verse.text}&rdquo;</p>
                  <p className="mt-2 text-xs font-bold text-orange-600 dark:text-amber-400">{verse.reference}</p>
                  <p className="mt-2 text-xs leading-5 text-stone-400 dark:text-stone-500">{verse.reflectionLine}</p>
                </div>

                <div className="rounded-xl border border-blue-100 dark:border-blue-900/30 bg-blue-50/40 dark:bg-blue-950/20 px-4 py-3 text-xs leading-5 text-blue-700 dark:text-blue-300">
                  💡 Read the passage again after the verse. Let the two speak to each other.
                </div>
              </div>
            </div>

            <button type="button" onClick={() => advance("read")} className="w-full rounded-full bg-gradient-to-r from-[#c86224] to-[#e2a13c] py-4 text-sm font-bold text-white shadow-[0_8px_24px_-10px_rgba(200,98,36,0.5)] hover:brightness-105 transition active:scale-[0.98]">
              I&apos;ve read it — Continue to Reflect <ArrowRight className="inline h-4 w-4 ml-1" />
            </button>
          </div>
        )}

        {/* ── REFLECT ───────────────────────────────────────────────────────── */}
        {activeStep === "reflect" && (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[1.5rem] border border-stone-200/80 bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.08)] dark:border-stone-800 dark:bg-stone-900">
              <div className="h-1 bg-gradient-to-r from-orange-500 to-amber-400" />
              <div className="p-5 space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-orange-600 dark:text-orange-400">Sit with this question</p>

                {/* The reflection question — made prominent */}
                <div className="rounded-2xl border border-orange-200 dark:border-orange-800/40 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 p-5">
                  <div className="text-4xl text-orange-300/40 dark:text-orange-700/40 font-black leading-none mb-3 select-none">"</div>
                  <p className="text-xl font-black leading-tight text-stone-900 dark:text-white">
                    {guidedEntry.reflection}
                  </p>
                </div>

                <div className="rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/60 px-4 py-3 text-sm leading-7 text-stone-500 dark:text-stone-400">
                  Don&apos;t rush past this question. Let it settle. What is the honest answer, not the religious one?
                </div>

                {/* Back to the passage */}
                <div className="rounded-xl border border-amber-100 dark:border-amber-800/30 bg-amber-50/40 dark:bg-amber-950/20 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-amber-600 dark:text-amber-400 mb-2">Back to the Word</p>
                  <p className="text-sm italic leading-7 text-stone-600 dark:text-stone-300">&ldquo;{guidedEntry.reading}&rdquo;</p>
                  <p className="mt-1.5 text-xs font-bold text-orange-600 dark:text-amber-400">{guidedEntry.reference}</p>
                </div>
              </div>
            </div>

            <button type="button" onClick={() => advance("reflect")} className="w-full rounded-full bg-gradient-to-r from-[#c86224] to-[#e2a13c] py-4 text-sm font-bold text-white shadow-[0_8px_24px_-10px_rgba(200,98,36,0.5)] hover:brightness-105 transition active:scale-[0.98]">
              Continue to Act <ArrowRight className="inline h-4 w-4 ml-1" />
            </button>
          </div>
        )}

        {/* ── ACT ───────────────────────────────────────────────────────────── */}
        {activeStep === "act" && (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[1.5rem] border border-stone-200/80 bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.08)] dark:border-stone-800 dark:bg-stone-900">
              <div className="h-1 bg-gradient-to-r from-rose-500 to-orange-500" />
              <div className="p-5 space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-rose-600 dark:text-rose-400">One thing to do today</p>

                <div className="rounded-2xl border border-rose-200 dark:border-rose-800/40 bg-gradient-to-br from-rose-50 to-orange-50/40 dark:from-rose-950/20 dark:to-orange-950/10 p-5">
                  <div className="flex items-start gap-3">
                    <Flame className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                    <p className="text-base font-bold leading-7 text-stone-900 dark:text-white">
                      {guidedEntry.action}
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-7 text-stone-500 dark:text-stone-400">
                  A prayer without action is a letter never sent. This is the one concrete step today&apos;s scripture is asking of you. It doesn&apos;t need to be large. It needs to be real.
                </p>

                {/* Commitment checkbox */}
                <button
                  type="button"
                  onClick={() => setActDone((d) => !d)}
                  className={`flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition ${
                    actDone
                      ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800/30 dark:bg-emerald-950/20"
                      : "border-stone-200 bg-stone-50/60 dark:border-stone-700 dark:bg-stone-800/40 hover:border-rose-200"
                  }`}
                >
                  {actDone
                    ? <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                    : <Circle className="h-6 w-6 text-stone-200 dark:text-stone-600 shrink-0" />}
                  <div>
                    <p className={`text-sm font-bold ${actDone ? "text-emerald-700 dark:text-emerald-300" : "text-stone-700 dark:text-stone-300"}`}>
                      {actDone ? "Committed ✓" : "I commit to doing this today"}
                    </p>
                    <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">Tap to mark your intention</p>
                  </div>
                </button>

                {actDone && (
                  <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-300">
                    ✓ When you complete it, come back and mark it done in your journal.
                  </div>
                )}
              </div>
            </div>

            <button type="button" onClick={() => advance("act")} className="w-full rounded-full bg-gradient-to-r from-[#c86224] to-[#e2a13c] py-4 text-sm font-bold text-white shadow-[0_8px_24px_-10px_rgba(200,98,36,0.5)] hover:brightness-105 transition active:scale-[0.98]">
              Continue to Pray <ArrowRight className="inline h-4 w-4 ml-1" />
            </button>
          </div>
        )}

        {/* ── PRAY ──────────────────────────────────────────────────────────── */}
        {activeStep === "pray" && (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[1.5rem] border border-stone-200/80 bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.08)] dark:border-stone-800 dark:bg-stone-900">
              <div className="h-1 bg-gradient-to-r from-violet-500 to-purple-500" />
              <div className="p-5 space-y-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-violet-600 dark:text-violet-400">Guided prayer</p>

                {/* Prayer text — beautiful display */}
                <div className="rounded-2xl border border-violet-100 dark:border-violet-900/40 bg-gradient-to-br from-violet-50/60 to-purple-50/40 dark:from-violet-950/20 dark:to-purple-950/10 p-5 relative overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_32px] opacity-[0.04]" />
                  <div className="relative">
                    <div className="text-5xl text-violet-200/60 dark:text-violet-800/40 font-black leading-none mb-3 select-none">"</div>
                    <p className="text-base leading-9 text-stone-800 dark:text-stone-200 italic">
                      {guidedEntry.prayer}
                    </p>
                    <div className="text-5xl text-violet-200/60 dark:text-violet-800/40 font-black leading-none mt-2 text-right select-none">"</div>
                  </div>
                </div>

                <div className="rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/60 px-4 py-3 text-sm leading-6 text-stone-500 dark:text-stone-400">
                  Read this prayer once in your mind. Then read it again slowly, aloud if you can. Then add your own words at the end.
                </div>

                {/* Silence timer */}
                <div className="rounded-2xl border border-violet-100 dark:border-violet-900/40 bg-violet-50/40 dark:bg-violet-950/20 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-violet-600 dark:text-violet-400 mb-1 text-center">Then sit in silence</p>
                  <p className="text-xs text-center text-stone-400 dark:text-stone-500 mb-4">Don&apos;t say anything. Don&apos;t think of anything. Just stay.</p>
                  <SilenceTimer />
                </div>

                {/* Additional prayer tools */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-stone-400 dark:text-stone-500 mb-3">Additional prayer tools</p>
                  <div className="space-y-2">
                    {prayerTools.map((tool) => (
                      <div key={tool.id} className="flex items-center gap-3 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/60 px-4 py-3">
                        <Clock className="h-4 w-4 text-stone-400 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-stone-800 dark:text-stone-200">{tool.title}</p>
                          <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-0.5">{tool.description}</p>
                        </div>
                        <span className="shrink-0 rounded-full bg-stone-100 dark:bg-stone-800 px-2 py-0.5 text-[10px] font-bold text-stone-500 dark:text-stone-400">{tool.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button type="button" onClick={() => advance("pray")} className="w-full rounded-full bg-gradient-to-r from-[#c86224] to-[#e2a13c] py-4 text-sm font-bold text-white shadow-[0_8px_24px_-10px_rgba(200,98,36,0.5)] hover:brightness-105 transition active:scale-[0.98]">
              Continue to Journal <ArrowRight className="inline h-4 w-4 ml-1" />
            </button>
          </div>
        )}

        {/* ── JOURNAL ───────────────────────────────────────────────────────── */}
        {activeStep === "journal" && (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[1.5rem] border border-stone-200/80 bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.08)] dark:border-stone-800 dark:bg-stone-900">
              <div className="h-1 bg-gradient-to-r from-teal-500 to-emerald-500" />
              <div className="p-5 space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-teal-600 dark:text-teal-400">Write honestly</p>

                {/* Journal prompt from guidedEntry */}
                <div className="rounded-2xl border border-teal-100 dark:border-teal-900/40 bg-gradient-to-br from-teal-50/60 to-emerald-50/40 dark:from-teal-950/20 dark:to-emerald-950/10 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-teal-600 dark:text-teal-400 mb-2">Today&apos;s prompt</p>
                  <p className="text-base font-bold leading-7 text-stone-800 dark:text-stone-200">
                    {guidedEntry.journal}
                  </p>
                </div>

                <p className="text-xs leading-5 text-stone-400 dark:text-stone-500">
                  Write whatever comes. Don&apos;t edit yourself. This stays on your device only — no one else will ever read it.
                </p>

                {/* Textarea */}
                <textarea
                  rows={7}
                  value={journal}
                  onChange={(e) => { setJournal(e.target.value); setJournalSaved(false) }}
                  onBlur={saveJournal}
                  className="w-full resize-none rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/60 px-4 py-3.5 text-sm leading-7 placeholder:text-stone-300 dark:placeholder:text-stone-600 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-700"
                  placeholder="Start with whatever feels true right now…"
                />

                {journalSaved && (
                  <p className="text-[11px] text-teal-600 dark:text-teal-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Saved to your device
                  </p>
                )}

                {/* Completion */}
                {!sessionComplete ? (
                  <button type="button" onClick={completeSession} className="w-full rounded-full bg-gradient-to-r from-teal-600 to-emerald-500 py-4 text-sm font-bold text-white shadow-[0_8px_24px_-10px_rgba(20,184,166,0.4)] hover:brightness-105 transition active:scale-[0.98]">
                    Complete Today&apos;s Prayer ✓
                  </button>
                ) : (
                  <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800/30 bg-emerald-50 dark:bg-emerald-950/20 p-5 text-center space-y-2">
                    <p className="text-2xl">✓</p>
                    <p className="text-sm font-black text-emerald-800 dark:text-emerald-300">Prayer session complete</p>
                    <p className="text-xs leading-5 text-emerald-700/70 dark:text-emerald-400/70">
                      You have given God a portion of your day. You have read, reflected, committed to an action, prayed, and written. That is a full act of worship.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Navigate deeper */}
            {sessionComplete && (
              <Link
                href="/youth-corner/guided-prayer/respond"
                className="flex items-center justify-between rounded-2xl border border-stone-200/80 bg-white dark:border-stone-800 dark:bg-stone-900 px-5 py-4 shadow-[0_4px_16px_-8px_rgba(0,0,0,0.07)] transition hover:border-orange-200 hover:shadow-[0_8px_24px_-10px_rgba(0,0,0,0.12)]"
              >
                <div>
                  <p className="text-sm font-bold text-stone-800 dark:text-stone-200">Go even deeper</p>
                  <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">Four reflection questions to carry today&apos;s word further</p>
                </div>
                <ArrowRight className="h-4 w-4 text-orange-500 dark:text-amber-400 shrink-0" />
              </Link>
            )}
          </div>
        )}

        {/* ── Stuck? ────────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between rounded-2xl border border-stone-200/80 bg-white dark:border-stone-800 dark:bg-stone-900 px-5 py-4 shadow-[0_4px_16px_-8px_rgba(0,0,0,0.06)]">
          <div>
            <p className="text-sm font-bold text-stone-800 dark:text-stone-200">Stuck or confused?</p>
            <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">Ask a question and get a real answer.</p>
          </div>
          <Link href="/qa" className="shrink-0 inline-flex items-center gap-2 rounded-full bg-stone-900 dark:bg-stone-100 px-4 py-2 text-xs font-bold text-white dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-stone-200 transition">
            <MessageCircleQuestion className="h-3.5 w-3.5" />
            Ask
          </Link>
        </div>

        {/* ── Session overview (always visible at bottom) ────────────────────── */}
        <div className="rounded-2xl border border-stone-200/80 bg-white dark:border-stone-800 dark:bg-stone-900 p-5 shadow-[0_4px_16px_-8px_rgba(0,0,0,0.06)]">
          <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-stone-400 dark:text-stone-500 mb-3">Session overview</p>
          <div className="space-y-2">
            {[
              { label: "Reading",    value: guidedEntry.reference },
              { label: "Reflection", value: guidedEntry.reflection },
              { label: "Action",     value: guidedEntry.action },
              { label: "Prayer",     value: guidedEntry.prayer.slice(0, 60) + "…" },
              { label: "Journal",    value: guidedEntry.journal.slice(0, 60) + "…" },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-3 text-xs">
                <span className="w-16 shrink-0 font-bold text-stone-400 dark:text-stone-500">{label}</span>
                <span className="text-stone-600 dark:text-stone-400 leading-5">{value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
