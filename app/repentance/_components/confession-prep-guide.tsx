"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Check, Copy, Download, Eye, Ear, Lock, ScrollText, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { examinationGroups } from "./shared"

type ResponseValue = "yes" | "not_really" | null

const orbitDefinitions = [
  {
    id: "senses",
    title: "The Senses",
    icon: Ear,
    description: "Have I blocked my ears from the cry of the poor or let my eyes wander toward what darkens the heart?",
    groupTitles: ["What I have listened to", "What I have looked at"],
  },
  {
    id: "lips",
    title: "The Gate of Lips",
    icon: ScrollText,
    description: "Have I used words that wounded instead of building up what is true, peaceful, and clean?",
    groupTitles: ["How I have spoken"],
  },
  {
    id: "inner",
    title: "The Inner Chamber",
    icon: Sparkles,
    description: "Have I entertained pride, hatred, jealousy, or hidden thoughts that I never bring into the light?",
    groupTitles: ["My thoughts"],
  },
  {
    id: "external",
    title: "The External World",
    icon: Eye,
    description: "Have I misused time, acted dishonestly, neglected God, or failed to love the people around me?",
    groupTitles: ["My actions", "My relationship with God", "My relationship with others"],
  },
] as const

const preflightChecklist = [
  "Be attentive. You are coming before God in the presence of the Holy Spirit.",
  "Mention sins one by one, clearly and simply.",
  "Do not blame other people or your circumstances.",
  "Be concise. Focus on truth, not storytelling.",
  "Begin with the more serious sins first.",
  "Trust the confidentiality of confession.",
  "Receive the priest's counsel as medicine for the soul.",
  "Leave confession watchful, thankful, and ready to change.",
]

const starterScript =
  "Father, I have prepared my heart. These are the areas where I have been avoiding the truth."

export function ConfessionPrepGuide({
  title = "Prepare your confession",
  intro = "Read each sentence slowly. When something is true, pause and write it in your own words.",
}: {
  title?: string
  intro?: string
}) {
  const [activeOrbit, setActiveOrbit] = useState(0)
  const [activeQuestionByOrbit, setActiveQuestionByOrbit] = useState<Record<number, number>>({})
  const [responses, setResponses] = useState<Record<string, ResponseValue>>({})
  const [details, setDetails] = useState<Record<string, string>>({})
  const [message, setMessage] = useState("")
  const [incognitoMode, setIncognitoMode] = useState(true)
  const [preflight, setPreflight] = useState<Record<number, boolean>>({})
  const [sealProgress, setSealProgress] = useState(0)
  const [isHolding, setIsHolding] = useState(false)
  const [isSealed, setIsSealed] = useState(false)
  const holdStartRef = useRef<number | null>(null)
  const holdFrameRef = useRef<number | null>(null)

  const orbits = useMemo(
    () =>
      orbitDefinitions.map((orbit) => ({
        ...orbit,
        groups: examinationGroups.filter((group) => orbit.groupTitles.some((title) => title === group.title)),
      })),
    [],
  )

  const selected = useMemo(
    () =>
      examinationGroups.flatMap((group) =>
        group.items
          .filter((item) => responses[item] === "yes")
          .map((item) => ({ group: group.title, item, detail: details[item]?.trim() || "" })),
      ),
    [details, responses],
  )

  const confessionText = useMemo(() => {
    const lines = selected.map((entry) => `${entry.item}${entry.detail ? `\n${entry.detail}` : ""}`)
    return [starterScript, "", ...lines].join("\n\n").trim()
  }, [selected])

  const completedOrbitCount = orbits.filter((orbit) =>
    orbit.groups.some((group) =>
      group.items.some((item) => responses[item] === "yes" || responses[item] === "not_really"),
    ),
  ).length
  const totalQuestionCount = examinationGroups.reduce((sum, group) => sum + group.items.length, 0)
  const answeredQuestionCount = examinationGroups.reduce(
    (sum, group) =>
      sum +
      group.items.filter((item) => {
        if (responses[item] === "not_really") return true
        if (responses[item] === "yes") return Boolean(details[item]?.trim())
        return false
      }).length,
    0,
  )
  const scannerComplete = answeredQuestionCount === totalQuestionCount && totalQuestionCount > 0

  const orbitQuestions = orbits[activeOrbit].groups.flatMap((group) =>
    group.items.map((item) => ({ groupTitle: group.title, item })),
  )
  const activeQuestionIndex = Math.min(activeQuestionByOrbit[activeOrbit] ?? 0, Math.max(orbitQuestions.length - 1, 0))
  const activeQuestion = orbitQuestions[activeQuestionIndex]
  const isFirstQuestion = activeQuestionIndex === 0
  const isLastQuestion = activeQuestionIndex === orbitQuestions.length - 1
  const activeQuestionResponse = responses[activeQuestion?.item]
  const activeQuestionDetail = activeQuestion ? details[activeQuestion.item]?.trim() || "" : ""
  const activeQuestionIsComplete =
    activeQuestionResponse === "not_really" || (activeQuestionResponse === "yes" && activeQuestionDetail.length > 0)

  useEffect(() => {
    return () => {
      if (holdFrameRef.current) cancelAnimationFrame(holdFrameRef.current)
    }
  }, [])

  if (!activeQuestion) {
    return null
  }

  const setActiveQuestionIndex = (orbitIndex: number, nextIndex: number) => {
    setActiveQuestionByOrbit((current) => ({ ...current, [orbitIndex]: nextIndex }))
  }

  const goToPreviousQuestion = () => {
    if (!isFirstQuestion) {
      setActiveQuestionIndex(activeOrbit, activeQuestionIndex - 1)
      return
    }

    if (activeOrbit > 0) {
      const previousOrbit = activeOrbit - 1
      const previousOrbitQuestions = orbits[previousOrbit].groups.flatMap((group) => group.items)
      setActiveOrbit(previousOrbit)
      setActiveQuestionIndex(previousOrbit, Math.max(previousOrbitQuestions.length - 1, 0))
    }
  }

  const goToNextQuestion = () => {
    if (!activeQuestionIsComplete) {
      setMessage("If you mark Yes, write briefly why before moving on.")
      return
    }

    if (!isLastQuestion) {
      setActiveQuestionIndex(activeOrbit, activeQuestionIndex + 1)
      return
    }

    if (activeOrbit < orbits.length - 1) {
      setActiveOrbit(activeOrbit + 1)
      return
    }

    setMessage("You have finished the scanner. You can now seal your notes below.")
  }

  const handleYesAction = () => {
    if (responses[activeQuestion.item] !== "yes") {
      setResponse(activeQuestion.item, "yes")
      return
    }

    goToNextQuestion()
  }

  const handleNoNextAction = () => {
    setResponse(activeQuestion.item, "not_really")

    if (!isLastQuestion) {
      setActiveQuestionIndex(activeOrbit, activeQuestionIndex + 1)
      return
    }

    if (activeOrbit < orbits.length - 1) {
      setActiveOrbit(activeOrbit + 1)
      return
    }

    setMessage("You have finished the scanner. You can now seal your notes below.")
  }

  const setResponse = (item: string, value: ResponseValue) => {
    setResponses((current) => ({ ...current, [item]: value }))
    if (value === "yes") {
      setIsSealed(false)
      setMessage("Write briefly why this is true before moving on.")
    } else {
      setDetails((current) => ({ ...current, [item]: "" }))
      setMessage("")
    }
  }

  const copyText = async (value: string, successMessage: string) => {
    if (!value) return
    try {
      await navigator.clipboard.writeText(value)
      setMessage(successMessage)
    } catch {
      setMessage("Could not copy on this device.")
    }
  }

  const downloadNotes = () => {
    if (!confessionText) return
    const blob = new Blob([confessionText], { type: "text/plain" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "confession-notes.txt"
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const stopHolding = () => {
    setIsHolding(false)
    if (holdFrameRef.current) {
      cancelAnimationFrame(holdFrameRef.current)
      holdFrameRef.current = null
    }
    if (sealProgress < 100) setSealProgress(0)
    holdStartRef.current = null
  }

  const startHolding = () => {
    if (!selected.length) {
      setMessage("Mark at least one area truthfully before sealing your notes.")
      return
    }
    setIsHolding(true)
    setIsSealed(false)
    holdStartRef.current = performance.now()
    const tick = (now: number) => {
      if (!holdStartRef.current) return
      const elapsed = now - holdStartRef.current
      const progress = Math.min((elapsed / 3000) * 100, 100)
      setSealProgress(progress)
      if (progress >= 100) {
        setIsSealed(true)
        setIsHolding(false)
        setMessage("Your confession notes are ready. Copy them or bring them with you.")
        holdStartRef.current = null
        holdFrameRef.current = null
        return
      }
      holdFrameRef.current = requestAnimationFrame(tick)
    }
    holdFrameRef.current = requestAnimationFrame(tick)
  }

  return (
    <section className="space-y-5">

      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <div className="rounded-2xl bg-amber-50/70 p-6 ring-1 ring-amber-200/40 dark:bg-stone-900 dark:ring-stone-800">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-orange-700">{title}</p>
            <p className="mt-1 max-w-lg text-sm leading-6 text-stone-500 dark:text-stone-400">{intro}</p>
          </div>
          <button
            type="button"
            onClick={() => setIncognitoMode((c) => !c)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all ${
              incognitoMode
                ? "bg-orange-700 text-white shadow-[0_4px_14px_rgba(154,52,18,0.35)]"
                : "bg-stone-200 text-stone-600 hover:bg-stone-300 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600"
            }`}
          >
            <Lock className="h-3 w-3" />
            Incognito
          </button>
        </div>
        <p className="mt-3 text-xs leading-5 text-stone-400 dark:text-stone-500">
          {incognitoMode
            ? "Reflections stay in local browser memory only — never sent to a server."
            : "Local-only mode is off visually, but nothing here is stored on a server."}
        </p>
      </div>

      {/* ── CONSCIENCE SCANNER + REGISTERED ────────────────────────── */}
      <div className="overflow-hidden rounded-2xl border border-amber-200/50 bg-[#fbf7ef] shadow-[0_20px_60px_-45px_rgba(120,86,25,0.28)] dark:border-stone-800 dark:bg-stone-900">
        {/* scanner header */}
        <div className="relative overflow-hidden border-b border-amber-200/50 bg-[#f7f0e2] px-6 py-5 dark:border-stone-800 dark:bg-stone-950">
          <div className="relative flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-orange-700 dark:text-amber-400">Conscience Scanner</p>
              <p className="mt-0.5 text-sm text-stone-600 dark:text-white/65">Move through the four orbits slowly.</p>
            </div>
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 ring-1 ring-amber-200/60 dark:bg-white/10 dark:text-amber-300 dark:ring-white/10">
              {completedOrbitCount} / {orbits.length} orbits
            </span>
          </div>
        </div>

        {/* orbit tiles — 2×2 */}
        <div className="grid grid-cols-2 gap-px border-b border-amber-200/50 bg-amber-200/40 md:grid-cols-4 dark:border-stone-800 dark:bg-stone-800">
          {orbits.map((orbit, index) => {
            const Icon = orbit.icon
            const active = activeOrbit === index
            const touched = orbit.groups.some((g) =>
              g.items.some((item) => responses[item] === "yes" || responses[item] === "not_really"),
            )
            return (
              <button
                key={orbit.id}
                type="button"
                onClick={() => setActiveOrbit(index)}
                className={`relative flex flex-col items-center gap-2 px-4 py-5 text-center transition-all duration-200 ${
                  active
                    ? "bg-[#b95527]"
                    : "bg-[#fcfaf5] hover:bg-[#f5edde] dark:bg-stone-900 dark:hover:bg-stone-800"
                }`}
              >
                <span className={`absolute right-2 top-1 select-none text-3xl font-black leading-none ${active ? "text-white/20" : "text-amber-300/70 dark:text-stone-700"}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${active ? "bg-white/18" : "bg-[#f4e4cf] dark:bg-orange-900/40"}`}>
                  <Icon className={`h-5 w-5 ${active ? "text-white" : "text-[#b95527]"}`} />
                </div>
                <span className={`text-sm font-bold ${active ? "text-white" : "text-stone-800 dark:text-stone-200"}`}>{orbit.title}</span>
                {touched && !active && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#b95527]">
                    <Check className="h-2.5 w-2.5 text-white" />
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* active orbit content */}
        <div className="bg-[#fbf7ef] dark:bg-stone-900">
          <div className="border-b border-amber-200/50 bg-[#f8f1e2] px-6 py-4 dark:border-stone-800 dark:bg-stone-950">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-orange-700">
              Orbit {String(activeOrbit + 1).padStart(2, "0")}
            </p>
            <p className="mt-0.5 text-lg font-bold text-[#3a1e01] dark:text-white">{orbits[activeOrbit].title}</p>
            <p className="mt-1 text-sm leading-6 text-stone-500 dark:text-stone-400">{orbits[activeOrbit].description}</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#ecdcb8] dark:bg-stone-700">
                <div
                  className="h-full rounded-full bg-[#b95527] transition-[width] duration-300"
                  style={{ width: `${((activeQuestionIndex + 1) / orbitQuestions.length) * 100}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                {activeQuestionIndex + 1} / {orbitQuestions.length}
              </span>
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-amber-200/60 dark:bg-stone-700" />
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-orange-600">
                {activeQuestion.groupTitle}
              </p>
              <div className="h-px flex-1 bg-amber-200/60 dark:bg-stone-700" />
            </div>

            <div className="mt-5 rounded-[28px] border-2 border-[#e7d4ab] bg-white px-6 py-6 shadow-[0_18px_40px_-34px_rgba(120,86,25,0.28)] dark:border-stone-700 dark:bg-stone-800/60">
              <p className="text-base leading-7 text-stone-800 dark:text-stone-200">{activeQuestion.item}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleYesAction}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                    responses[activeQuestion.item] === "yes"
                      ? "bg-[#b95527] text-white shadow-[0_2px_8px_rgba(154,52,18,0.22)]"
                      : "bg-[#f2e8d3] text-stone-600 hover:bg-[#eadcc0] hover:text-[#9f4a24] dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-orange-900/40 dark:hover:text-orange-400"
                  }`}
                >
                  {responses[activeQuestion.item] === "yes" && activeQuestionIsComplete ? "Yes, next" : "Yes"}
                </button>
                <button
                  type="button"
                  onClick={handleNoNextAction}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                    responses[activeQuestion.item] === "not_really"
                      ? "bg-stone-400 text-white dark:bg-stone-600"
                      : "bg-[#f2e8d3] text-stone-600 hover:bg-[#eadcc0] dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600"
                  }`}
                >
                  No, next
                </button>
              </div>

              {responses[activeQuestion.item] === "yes" && (
                <Textarea
                  rows={3}
                  value={details[activeQuestion.item] || ""}
                  onChange={(e) => {
                    const nextValue = e.target.value
                    setDetails((c) => ({ ...c, [activeQuestion.item]: nextValue }))
                    setIsSealed(false)
                    if (nextValue.trim()) {
                      setMessage("")
                    }
                  }}
                  placeholder="Required: write briefly why you said yes."
                  required
                  className="mt-4 border-[#e5d1aa] bg-[#fcf8ef] text-sm text-stone-800 placeholder:text-stone-300 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
                />
              )}
            </div>
          </div>

          <div className="border-t border-amber-200/50 px-6 py-4 dark:border-stone-800">
            <div className="flex gap-2">
            <button
              type="button"
              onClick={goToPreviousQuestion}
              disabled={activeOrbit === 0 && isFirstQuestion}
              className="rounded-full border border-amber-200/60 bg-white px-4 py-2 text-sm font-semibold text-stone-600 hover:bg-[#f7f0e2] disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
            >
              ← Previous
            </button>
            </div>
          </div>

          <div className="border-t border-amber-200/50 bg-[#f3ead7] px-6 py-4 dark:border-stone-800 dark:bg-stone-950">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-orange-700">Automatically Registered</p>
            <p className="mt-0.5 text-lg font-bold text-[#3a1e01] dark:text-white">Marked as true</p>
            {message ? <p className="mt-2 text-sm font-medium text-orange-700 dark:text-orange-400">{message}</p> : null}
          </div>
          <div className="bg-[#fffdf9] p-6 dark:bg-stone-900">
            {selected.length ? (
              <div className="grid gap-3 md:grid-cols-2">
                {selected.map((entry) => (
                  <div key={entry.item} className="rounded-xl border border-amber-200/60 bg-[#fffaf0] px-4 py-3 dark:border-stone-700 dark:bg-stone-800">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">{entry.group}</p>
                    <p className="mt-1 text-sm leading-6 text-stone-800 dark:text-stone-200">{entry.item}</p>
                    {entry.detail && <p className="mt-1 text-xs leading-5 text-stone-500 dark:text-stone-400">{entry.detail}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-stone-400 dark:text-stone-500">
                Nothing yet. Answer <span className="font-semibold text-stone-600 dark:text-stone-300">Yes</span> to an item above.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        {/* ── THE SEAL ────────────────────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-2xl bg-amber-50/70 p-6 ring-1 ring-amber-200/40 dark:bg-gradient-to-br dark:from-stone-900 dark:via-orange-950 dark:to-stone-950 dark:ring-transparent">
          <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.04] dark:opacity-[0.06]" />

          <div className="relative">
            <p className="text-[11px] font-bold uppercase tracking-[0.36em] text-orange-700 dark:text-amber-400">The Seal</p>
            <h3 className="mt-1 text-lg font-bold text-stone-900 dark:text-white">Hold to seal</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-white/60">
              {scannerComplete
                ? "Hold for 3 seconds to gather these into one note."
                : `Finish the scanner first. ${answeredQuestionCount}/${totalQuestionCount} questions answered.`}
            </p>

            <div className="mt-5 space-y-3">
              <div className="relative max-w-xs overflow-hidden rounded-full border border-amber-300/60 bg-amber-100/60 p-1 dark:border-white/15 dark:bg-white/8">
                <div
                  className="absolute inset-y-1 left-1 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-orange-700 transition-[width] duration-75"
                  style={{ width: `calc(${sealProgress}% - 0.5rem)` }}
                />
                <button
                  type="button"
                  onMouseDown={scannerComplete ? startHolding : undefined}
                  onMouseUp={scannerComplete ? stopHolding : undefined}
                  onMouseLeave={scannerComplete ? stopHolding : undefined}
                  onTouchStart={scannerComplete ? startHolding : undefined}
                  onTouchEnd={scannerComplete ? stopHolding : undefined}
                  disabled={!scannerComplete}
                  className="relative z-10 flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-bold text-stone-800 disabled:cursor-not-allowed disabled:opacity-45 dark:text-white"
                >
                  {!scannerComplete ? "Finish Scanner First" : isHolding ? "Hold… Amen" : isSealed ? "✦ Sealed" : "Hold to Seal"}
                </button>
              </div>
              <p className="text-xs text-stone-400 dark:text-white/35">Pour out your heart like water before the Lord.</p>
            </div>
          </div>
        </div>

        {/* ── CONFESSION NOTES ───────────────────────────────────────── */}
        <div className={`overflow-hidden rounded-2xl ring-1 transition-all duration-500 ${isSealed ? "ring-orange-300 dark:ring-orange-700" : "ring-amber-200/40 dark:ring-stone-800"}`}>
          <div className={`border-b px-6 py-4 transition-colors ${isSealed ? "border-orange-100 bg-orange-50 dark:border-orange-900/40 dark:bg-orange-950/40" : "border-amber-200/60 bg-amber-100/40 dark:border-stone-800 dark:bg-stone-950"}`}>
            <h3 className="text-lg font-bold text-[#3a1e01] dark:text-white">Your confession notes</h3>
          </div>
          <div className="bg-amber-50/70 p-6 space-y-4 dark:bg-stone-900">
            <Textarea
              readOnly
              rows={8}
              value={scannerComplete && isSealed ? confessionText : ""}
              placeholder={
                !scannerComplete ? "Finish the scanner to unlock this section." : isSealed ? "" : "Seal your notes to reveal them here."
              }
              className="border-amber-200/60 bg-amber-100/40 font-mono text-sm text-stone-800 placeholder:text-stone-300 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
            />
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                onClick={() => copyText(confessionText, "Confession notes copied.")}
                className="bg-orange-700 text-white hover:bg-orange-800"
                disabled={!scannerComplete || !isSealed}
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" />
                Copy
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={downloadNotes}
                className="border-amber-200/60 text-stone-700 hover:bg-amber-100/60 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
                disabled={!scannerComplete || !isSealed}
              >
                <Download className="mr-1.5 h-3.5 w-3.5" />
                Download
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => window.print()}
                className="border-amber-200/60 text-stone-700 hover:bg-amber-100/60 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
                disabled={!scannerComplete || !isSealed}
              >
                Print
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── PRE-FLIGHT CHECKLIST ────────────────────────────────────── */}
      <div className="overflow-hidden rounded-2xl ring-1 ring-amber-200/40 dark:ring-stone-800">
        <div className="border-b border-amber-200/60 bg-amber-100/40 px-6 py-4 dark:border-stone-800 dark:bg-stone-950">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-orange-700">Rite of Meeting</p>
          <p className="mt-0.5 text-lg font-bold text-[#3a1e01] dark:text-white">Pre-flight for the meeting with the priest</p>
          <p className="mt-1 text-xs text-stone-400 dark:text-stone-500">Your final preparation before walking into confession.</p>
        </div>
        <div className="bg-amber-50/70 p-6 space-y-5 dark:bg-stone-900">
          <div className="divide-y divide-amber-200/40 dark:divide-stone-800">
            {preflightChecklist.map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => setPreflight((c) => ({ ...c, [index]: !c[index] }))}
                className={`flex w-full items-start gap-4 py-3.5 text-left transition-colors first:pt-0 last:pb-0 ${
                  preflight[index] ? "opacity-60" : ""
                }`}
                aria-label={`Toggle checklist item ${index + 1}`}
              >
                <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                  preflight[index]
                    ? "border-orange-700 bg-orange-700 text-white"
                    : "border-amber-300/60 bg-amber-50/70 text-transparent dark:border-stone-600 dark:bg-stone-800"
                }`}>
                  <Check className="h-3 w-3" />
                </span>
                <span className={`text-sm leading-6 ${preflight[index] ? "line-through text-stone-400" : "text-stone-700 dark:text-stone-300"}`}>
                  {item}
                </span>
              </button>
            ))}
          </div>

          {/* opening script */}
          <div className="rounded-xl bg-orange-700 px-6 py-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-orange-200">Opening Script</p>
            <p className="mt-3 text-base font-medium leading-7 text-white">{starterScript}</p>
            <button
              type="button"
              onClick={() => copyText(starterScript, "Opening script copied.")}
              className="mt-4 rounded-full bg-white/15 px-4 py-2 text-xs font-bold text-white hover:bg-white/25"
            >
              Copy to clipboard
            </button>
          </div>
        </div>
      </div>

    </section>
  )
}
