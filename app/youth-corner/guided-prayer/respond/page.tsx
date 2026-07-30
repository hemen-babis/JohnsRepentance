"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { saveTodayJournal, loadTodayJournal } from "@/lib/youth-daily"
import { guidedEntry } from "@/lib/youth-corner-data"

const serif = "'Iowan Old Style', 'Palatino Linotype', Georgia, serif"

// Four deep-dive prompts anchored to today's guided entry
function buildPrompts() {
  return [
    {
      label: "Honest answer",
      question: guidedEntry.reflection,
      placeholder: "Write the true answer, not the safe one…",
    },
    {
      label: "What changed",
      question: `After sitting with ${guidedEntry.reference}, what shifted in how you see your situation?`,
      placeholder: "Something moved — what was it?",
    },
    {
      label: "The action",
      question: `You committed to: "${guidedEntry.action}" — what does obeying that look like in your specific life today?`,
      placeholder: "Be concrete. Who, when, where, how…",
    },
    {
      label: "Journal prompt",
      question: guidedEntry.journal,
      placeholder: "Write freely. This stays on your device only…",
    },
  ]
}

export default function RespondPage() {
  const prompts = buildPrompts()
  const [responses, setResponses] = useState<string[]>(["", "", "", ""])
  const [saved, setSaved] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)

  function handleChange(i: number, value: string) {
    const next = [...responses]
    next[i] = value
    setResponses(next)
    setSaved(false)
  }

  function handleSave() {
    const combined = prompts
      .map((p, i) => responses[i]?.trim() ? `${p.label}: ${p.question}\n→ ${responses[i]}` : "")
      .filter(Boolean)
      .join("\n\n")
    const existing = loadTodayJournal()
    saveTodayJournal(existing?.text ? existing.text + "\n\n---\n\n" + combined : combined)
    setSaved(true)
  }

  const answered = responses.filter((r) => r.trim()).length
  const currentPrompt = prompts[activeIdx]

  return (
    <div className="min-h-screen text-stone-900 dark:text-white">

      {/* Header */}
      <div
        className="relative overflow-hidden px-5 pt-8 pb-8"
        style={{ background: "linear-gradient(160deg, #1c0700 0%, #3d1205 45%, #0a1e12 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_44px] opacity-[0.05]" />

        <Link href="/youth-corner/guided-prayer" className="relative inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[11px] font-semibold text-white/70 mb-5 hover:bg-white/14 transition">
          <ArrowLeft className="h-3 w-3" /> Back to Prayer
        </Link>

        <div className="relative">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-400/60 mb-2">Step 3 — Respond</p>
          <h1 className="text-3xl font-black text-white leading-tight">
            Go deeper
          </h1>
          <p className="mt-1.5 text-sm text-white/50">Four questions to carry today&apos;s word further. Answer as many as you can.</p>

          {answered > 0 && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-950/30 px-3 py-1.5 text-xs font-semibold text-amber-300">
              {answered} of {prompts.length} answered
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-6 max-w-xl mx-auto space-y-5">

        {/* Prompt selector tabs */}
        <div className="grid grid-cols-4 gap-2">
          {prompts.map((p, i) => {
            const done = responses[i]?.trim().length > 0
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => setActiveIdx(i)}
                className={`rounded-2xl border py-3 text-center transition ${
                  i === activeIdx
                    ? "border-orange-200 bg-orange-50 dark:border-orange-800/40 dark:bg-orange-950/20"
                    : done
                    ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800/30 dark:bg-emerald-950/20"
                    : "border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-900/60"
                }`}
              >
                {done && i !== activeIdx
                  ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
                  : <span className="text-sm font-black text-stone-500 dark:text-stone-400">{i + 1}</span>}
                <p className={`mt-1 text-[9px] font-bold truncate px-1 ${i === activeIdx ? "text-orange-600 dark:text-orange-400" : done ? "text-emerald-600 dark:text-emerald-400" : "text-stone-400"}`}>
                  {p.label}
                </p>
              </button>
            )
          })}
        </div>

        {/* Active prompt */}
        <div className="overflow-hidden rounded-[1.5rem] border border-stone-200/80 bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.08)] dark:border-stone-800 dark:bg-stone-900">
          <div className="h-1 bg-gradient-to-r from-[#c86224] to-[#e2a13c]" />
          <div className="p-5 space-y-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-orange-600 dark:text-amber-400 mb-2">
                Question {activeIdx + 1} of {prompts.length} · {currentPrompt.label}
              </p>
              <p className="text-base font-black leading-7 text-stone-900 dark:text-white">
                {currentPrompt.question}
              </p>
            </div>

            <textarea
              rows={6}
              value={responses[activeIdx]}
              onChange={(e) => handleChange(activeIdx, e.target.value)}
              className="w-full resize-none rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/60 px-4 py-3.5 text-sm leading-7 placeholder:text-stone-300 dark:placeholder:text-stone-600 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-700"
              placeholder={currentPrompt.placeholder}
              autoFocus
            />

            {/* Navigation */}
            <div className="flex gap-3">
              {activeIdx > 0 && (
                <button type="button" onClick={() => setActiveIdx(activeIdx - 1)} className="flex items-center gap-1.5 rounded-full border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-4 py-2.5 text-sm font-semibold text-stone-600 dark:text-stone-300 hover:border-stone-300 transition">
                  <ArrowLeft className="h-3.5 w-3.5" /> Previous
                </button>
              )}
              {activeIdx < prompts.length - 1 ? (
                <button type="button" onClick={() => setActiveIdx(activeIdx + 1)} className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#c86224] to-[#e2a13c] py-2.5 text-sm font-bold text-white hover:brightness-105 transition">
                  Next question <ArrowRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button type="button" onClick={handleSave} className="flex-1 rounded-full bg-gradient-to-r from-teal-600 to-emerald-500 py-2.5 text-sm font-bold text-white shadow-[0_6px_20px_-8px_rgba(20,184,166,0.4)] hover:brightness-105 transition">
                  {saved ? "Saved ✓" : "Save all responses"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* All answered summary */}
        {answered === prompts.length && saved && (
          <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800/30 bg-emerald-50 dark:bg-emerald-950/20 p-5 text-center space-y-3">
            <p className="text-2xl">✓</p>
            <p className="text-sm font-black text-emerald-800 dark:text-emerald-300">All four questions answered and saved</p>
            <p className="text-xs leading-5 text-emerald-700/70 dark:text-emerald-400/70">
              You have done more than most people do in a week of prayer. Carry what you wrote.
            </p>
          </div>
        )}

        {/* Continue */}
        <Link
          href="/youth-corner/guided-prayer/live"
          className="flex items-center justify-between rounded-2xl border border-stone-200/80 bg-white dark:border-stone-800 dark:bg-stone-900 px-5 py-4 shadow-[0_4px_16px_-8px_rgba(0,0,0,0.07)] transition hover:border-orange-200"
        >
          <div>
            <p className="text-sm font-bold text-stone-800 dark:text-stone-200">Final step — Now live it</p>
            <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">Step 4 · Close the session with a blessing</p>
          </div>
          <ArrowRight className="h-4 w-4 text-orange-500 dark:text-amber-400 shrink-0" />
        </Link>

      </div>
    </div>
  )
}
