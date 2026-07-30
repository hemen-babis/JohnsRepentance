"use client"

import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  CheckCircle2,
  Check,
  Headphones,
  Lamp,
  ListChecks,
  Share2,
  SunMedium,
  Wind,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { studyPlans } from "@/lib/youth-corner-data"

const chantAudioSrc = "/sounds/eotc-hymn.mp3"
const titleSerif = "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif"
const bodySans = "ui-sans-serif, system-ui, sans-serif"

const prayerFoundationCards = [
  {
    number: "1",
    title: "The Mystery of Tewahedo (Unity)",
    body: `The word Tewahedo means "unified" or "made one." While this refers primarily to the nature of Christ, it also describes our own human existence. You are not a ghost living inside a machine; you are a unity of body and spirit. What you do with your body affects your heart.

The Logic: If you stand toward the Light, your spirit begins to wake up. We use our bodies in prayer because we believe the body is the Temple of the Holy Spirit.`,
  },
  {
    number: "2",
    title: "The Theology of the East (Mizrak)",
    body: `The world is constantly trying to disorient you.

The Logic: We face East because we are orienting ourselves toward Paradise, the Resurrection, and the coming of Christ.`,
  },
  {
    number: "3",
    title: "The Seal of the Cross (Mahteme Meskel)",
    body: `Every time you perform the Sign of the Cross, you are not just making a gesture.

The Logic: It is a spiritual seal over the mind, the heart, and your strength for the day.`,
  },
  {
    number: "4",
    title: "The Intercession of the Saints (Amalajinet)",
    body: `We ask the Virgin Mary and the Saints to pray for us because we are part of a family.

The Logic: Their advocacy is like incense carrying our broken prayers to the Throne of Grace.`,
  },
]

type ParsedSections = {
  intro: string[]
  scripture: string[]
  witness: string[]
  wisdom: string[]
  practice: string[]
  reflection: string[]
  diagnostic: string[]
}

const sectionMap: Array<{ match: string; key: keyof ParsedSections }> = [
  { match: "The Word", key: "scripture" },
  { match: "Scriptural Anchors", key: "scripture" },
  { match: "Witness of the Fathers", key: "witness" },
  { match: "Ancient Wisdom:", key: "wisdom" },
  { match: "The Practice:", key: "practice" },
  { match: "Reflection of the Day", key: "reflection" },
  { match: "Daily Diagnostic: Pulse Check", key: "diagnostic" },
]

function splitParagraphs(lines: string[]) {
  return lines
    .join("\n")
    .split("\n\n")
    .map((entry) => entry.trim())
    .filter(Boolean)
}

function stripDisplayPrefix(paragraph: string) {
  return paragraph
    .replace(/^The Modern Reality:\s*/u, "")
    .replace(/^The Quiet Heart:\s*/u, "")
    .replace(/^The Teaching:\s*/u, "")
    .replace(/^Ancient Wisdom:\s*/u, "")
    .replace(/^The Practice:\s*/u, "")
    .replace(/^Daily Diagnostic:\s*/u, "")
    .replace(/^Pulse Check\s*/u, "")
    .trim()
}

function cleanDiagnosticLabel(question: string) {
  return question
    .replace(/\$\$True \/ False\$\$/gu, "")
    .replace(/\$\$Rate 1-5\$\$/gu, "")
    .replace(/\[\s*✅\s*YES\s*\]\s*\[\s*❌\s*NO\s*\]/gu, "")
    .replace(/\[\s*1\s*\]\s*\[\s*2\s*\]\s*\[\s*3\s*\]\s*\[\s*4\s*\]\s*\[\s*5\s*\]/gu, "")
    .replace(/YES\s*\/\s*NO/gu, "")
    .replace(/1\s*\/\s*2\s*\/\s*3\s*\/\s*4\s*\/\s*5/gu, "")
    .replace(/^\[/u, "")
    .replace(/\]$/u, "")
    .trim()
}

function buildDiagnosticItems(values: string[]) {
  const items: Array<{ kind: "boolean" | "rating"; label: string }> = []
  let nextKind: "boolean" | "rating" | null = null

  for (const value of values) {
    const trimmed = value.trim()
    if (!trimmed) continue
    if (trimmed === "$$True / False$$") {
      nextKind = "boolean"
      continue
    }
    if (trimmed === "$$Rate 1-5$$") {
      nextKind = "rating"
      continue
    }
    if (trimmed === "$$Your Christian Name$$" || trimmed === "$$COMPLETE PLAN$$") {
      continue
    }

    items.push({
      kind: nextKind ?? (items.length < 2 ? "boolean" : "rating"),
      label: cleanDiagnosticLabel(trimmed),
    })
    nextKind = null
  }

  return items.filter((item) => item.label)
}

function normalizeText(value: string) {
  return value.replace(/["“”']/gu, "").replace(/\s+/gu, " ").trim().toLowerCase()
}

function uniqueParagraphs(values: string[]) {
  const seen = new Set<string>()
  return values.filter((value) => {
    const normalized = normalizeText(value)
    if (seen.has(normalized)) return false
    seen.add(normalized)
    return true
  })
}

function parseRawContent(rawContent?: string): ParsedSections {
  const parsed: ParsedSections = {
    intro: [],
    scripture: [],
    witness: [],
    wisdom: [],
    practice: [],
    reflection: [],
    diagnostic: [],
  }

  if (!rawContent) return parsed

  let current: keyof ParsedSections = "intro"

  for (const line of rawContent.split("\n")) {
    const section = sectionMap.find((entry) => line.startsWith(entry.match))
    if (section) {
      current = section.key
      continue
    }
    parsed[current].push(line)
  }

  return parsed
}

export default function YouthPlanDetailPage({ params }: { params: { slug: string } }) {
  const plan = studyPlans.find((entry) => entry.slug === params.slug)
  const isPrayerFoundationPlan = plan?.slug === "7-days-of-prayer"
  const [currentDayIndex, setCurrentDayIndex] = useState(0)
  const [showFoundationLanding, setShowFoundationLanding] = useState(isPrayerFoundationPlan)
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [checkInComplete, setCheckInComplete] = useState(false)
  const [showCompletionBurst, setShowCompletionBurst] = useState(false)
  const [pulseAnswers, setPulseAnswers] = useState<Record<string, string>>({})
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const currentDay = useMemo(() => (plan ? plan.days[currentDayIndex] : undefined), [plan, currentDayIndex])
  const parsedContent = useMemo(() => parseRawContent(currentDay?.rawContent), [currentDay?.rawContent])
  const introParagraphs = uniqueParagraphs(splitParagraphs(parsedContent.intro))
  const scriptureParagraphs = uniqueParagraphs(splitParagraphs(parsedContent.scripture))
  const witnessParagraphs = uniqueParagraphs(splitParagraphs(parsedContent.witness))
  const wisdomParagraphs = uniqueParagraphs(splitParagraphs(parsedContent.wisdom))
  const practiceParagraphs = uniqueParagraphs(splitParagraphs(parsedContent.practice))
  const reflectionParagraphs = uniqueParagraphs(splitParagraphs(parsedContent.reflection))
  const diagnosticParagraphs = uniqueParagraphs(splitParagraphs(parsedContent.diagnostic))
  const quietHeartNote = currentDay?.heartCheck ? splitParagraphs([currentDay.heartCheck]) : []
  const diagnosticItems = buildDiagnosticItems(diagnosticParagraphs.length > 0 ? diagnosticParagraphs : currentDay?.pulseChecks ?? [])
  const introSectionTitle = currentDay?.rawContent?.includes("The Teaching:") ? "The Teaching" : "The Quiet Heart"

  const filteredIntroParagraphs = (introParagraphs.length > 0 ? introParagraphs : [currentDay?.bigIdea ?? ""]).filter((paragraph) => {
    if (!plan || !currentDay) return true
    const normalized = normalizeText(stripDisplayPrefix(paragraph))
    const duplicates = [
      plan.title,
      currentDay.title,
      `Day ${currentDay.dayNumber}: ${currentDay.title}`,
      currentDay.subtitle ?? "",
      plan.subtitle,
    ]
      .filter(Boolean)
      .map((entry) => normalizeText(entry))

    return !duplicates.some((entry) => normalized === entry || normalized.includes(entry) || entry.includes(normalized))
  })

  if (!plan || !currentDay) {
    return (
      <div className="light-mode-adaptive-page youth-corner-root min-h-screen parchment-page-bg text-stone-900">
        <section className="container mx-auto px-4 py-16">
          <div className="rounded-[2rem] border border-[#d8c395] bg-white/94 p-8">
            <h1 className="text-3xl font-black text-[#3d2206]">Plan not found</h1>
            <Button asChild className="mt-6 rounded-full bg-gradient-to-r from-[#f97316] to-[#f59e0b] text-white">
              <Link href="/youth-corner/plans">Return to plans</Link>
            </Button>
          </div>
        </section>
      </div>
    )
  }

  const toggleChecklistItem = (item: string) => {
    setCheckedItems((current) => (current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item]))
  }

  const setPulseAnswer = (question: string, answer: string) => {
    setPulseAnswers((current) => ({ ...current, [question]: answer }))
  }

  const toggleAudio = async () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(chantAudioSrc)
      audioRef.current.loop = true
      audioRef.current.addEventListener("ended", () => setIsPlaying(false))
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      return
    }

    await audioRef.current.play()
    setIsPlaying(true)
  }

  const shareVerse = async (text: string) => {
    const payload = {
      title: `${plan.title} - Day ${currentDay.dayNumber}`,
      text,
      url: typeof window !== "undefined" ? window.location.href : "",
    }

    if (navigator.share) {
      await navigator.share(payload)
      return
    }

    await navigator.clipboard.writeText(`${payload.text}\n${payload.url}`)
  }

  const handleCompleteDay = () => {
    const next = !checkInComplete
    setCheckInComplete(next)

    if (next) {
      setShowCompletionBurst(true)
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate([80, 40, 120])
      }
      window.setTimeout(() => setShowCompletionBurst(false), 1400)
    } else {
      setShowCompletionBurst(false)
    }
  }

  if (showFoundationLanding && isPrayerFoundationPlan) {
    return (
      <div className="light-mode-adaptive-page youth-corner-root min-h-screen parchment-page-bg-with-glow text-stone-900 dark:bg-none dark:bg-gradient-to-b dark:from-[#120d09] dark:via-[#24140d] dark:to-[#140d09]">
        <section className="container mx-auto px-4 py-6 md:py-10">
          <Link href="/youth-corner/plans" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8b6a2b]">
            <ArrowLeft className="h-4 w-4" />
            Back to plans
          </Link>

          <div className="mx-auto mt-6 max-w-5xl rounded-[2rem] border border-[#d8c395] bg-[linear-gradient(180deg,#fffcf5,#fff8ec)] p-6 shadow-[0_24px_60px_-34px_rgba(120,53,15,0.22)] dark:bg-[#180e07] dark:border-[#3d2a14] md:p-8">
            <div
              className="relative overflow-hidden rounded-[2rem] px-6 pb-8 pt-20 md:px-8 md:pt-24 text-amber-50"
              style={{
                backgroundImage: "linear-gradient(180deg,rgba(65,34,16,0.15) 0%,rgba(32,16,7,0.45) 100%), url('/orthodox-card-bg.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_48px] opacity-[0.08]" />
              <div className="relative">
                <div className="foundation-hero-kicker inline-flex rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-white backdrop-blur-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                  Spiritual Foundation
                </div>
                <h1
                  className="foundation-hero-title mt-4 text-4xl font-black tracking-tight text-white md:text-5xl [text-shadow:0_3px_10px_rgba(0,0,0,0.55)]"
                  style={{ fontFamily: titleSerif }}
                >
                  The Foundation: Why We Do What We Do
                </h1>
                <p
                  className="foundation-hero-subtitle mt-3 max-w-3xl text-lg font-medium text-white/95 [text-shadow:0_2px_6px_rgba(0,0,0,0.45)]"
                  style={{ fontFamily: bodySans }}
                >
                  Understanding the Spiritual Logic of the Tewahedo Life
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-[#ead8b6] bg-[linear-gradient(180deg,#fff8ea_0%,#fffdf7_100%)] p-6">
              <p className="text-base leading-8 text-stone-700 dark:text-stone-100" style={{ fontFamily: bodySans }}>
                Before we dive into the 7-day rhythm, we have to address the why. In the Tewahedo faith, there is no such thing as an empty gesture. Everything we do with our bodies is designed to heal our souls.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {prayerFoundationCards.map((card) => (
                <div key={card.title} className="rounded-[1.75rem] border border-[#ead8b6] bg-[linear-gradient(180deg,#fffbf0,#fffaee)] p-6 shadow-[0_18px_40px_-28px_rgba(120,53,15,0.16)] dark:bg-[#1c1008] dark:border-[#3a2412]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7c2d12,#b45309)] text-sm font-bold text-white">
                      {card.number}
                    </div>
                    <h2 className="text-xl font-bold text-[#3d2206]" style={{ fontFamily: titleSerif }}>
                      {card.title}
                    </h2>
                  </div>
                  <div className="mt-4 space-y-4">
                    {card.body.split("\n\n").map((paragraph) => (
                      <p key={paragraph} className="text-base leading-8 text-stone-700 dark:text-stone-100" style={{ fontFamily: bodySans }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-[#ead8b6] bg-[#f7f0e1] p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b6a2b]">Next Step</p>
              <h2 className="mt-3 text-2xl font-black text-[#3d2206]" style={{ fontFamily: titleSerif }}>
                {plan.title}
              </h2>
              <div className="mt-6 flex justify-center">
                <Button
                  type="button"
                  onClick={() => setShowFoundationLanding(false)}
                  className="rounded-full bg-gradient-to-r from-[#f97316] to-[#f59e0b] px-8 text-white"
                >
                  Begin Day 1
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="light-mode-adaptive-page youth-corner-root min-h-screen parchment-page-bg-with-glow text-stone-900 dark:bg-none dark:bg-gradient-to-b dark:from-[#120d09] dark:via-[#24140d] dark:to-[#140d09]">
      <section className="container mx-auto px-4 py-6 md:py-10">
        <Link href="/youth-corner/plans" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8b6a2b]">
          <ArrowLeft className="h-4 w-4" />
          Back to plans
        </Link>

        <div className="mt-6 grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="rounded-[2rem] border border-[#d8c395] bg-[linear-gradient(180deg,#fffcf5,#fff8ec)] p-5 shadow-[0_24px_60px_-34px_rgba(120,53,15,0.22)] dark:bg-[#180e07] dark:border-[#3d2a14] xl:sticky xl:top-8 xl:h-fit">
            <div className={`mb-4 h-2 rounded-full bg-gradient-to-r ${plan.accent}`} />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b6a2b]">Spiritual Foundation</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-[#3d2206]" style={{ fontFamily: titleSerif }}>
              {plan.title}
            </h1>
            <p className="mt-3 text-sm leading-7 text-stone-600" style={{ fontFamily: bodySans }}>
              {currentDay.subtitle ?? plan.subtitle}
            </p>

            <div className="my-6 h-4 rounded-full bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_16px] opacity-25" />

            <div className="rounded-[1.5rem] border border-[#ead8b6] bg-white/90 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b6a2b]">Daily Progress</p>
              <div className="mt-4 flex gap-2">
                {plan.days.map((day, index) => (
                  <button
                    key={day.dayNumber}
                    type="button"
                    onClick={() => {
                      setCurrentDayIndex(index)
                      setCheckedItems([])
                      setCheckInComplete(false)
                      setPulseAnswers({})
                    }}
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold transition ${
                      index === currentDayIndex ? "bg-[#7c2d12] text-white" : "bg-[#f7efdf] text-[#8b6a2b] hover:bg-[#f2e2bf]"
                    }`}
                  >
                    {day.dayNumber}
                  </button>
                ))}
              </div>
            </div>

            {(currentDay.checklist ?? []).length > 0 ? (
              <div className="mt-6 rounded-[1.5rem] bg-[#f8efdc] p-4">
              <div className="flex items-center gap-2 text-[#7c2d12]">
                <ListChecks className="h-4 w-4" />
                <p className="text-sm font-semibold">Day {currentDay.dayNumber} Rhythm Checklist</p>
              </div>
              <div className="mt-4 space-y-3">
                {(currentDay.checklist ?? []).map((item) => {
                  const checked = checkedItems.includes(item)
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleChecklistItem(item)}
                      className={`flex w-full items-start gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                        checked ? "border-[#0f766e] bg-[#e6faf7]" : "border-[#ead8b6] bg-white hover:bg-[#fff7ea]"
                      }`}
                    >
                      <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${checked ? "text-[#0f766e]" : "text-stone-300"}`} />
                      <span className="text-sm leading-6 text-stone-700 dark:text-stone-100" style={{ fontFamily: bodySans }}>
                        {item}
                      </span>
                    </button>
                  )
                })}
              </div>
              </div>
            ) : null}
          </aside>

          <article className="rounded-[2rem] border border-[#d8c395] bg-[linear-gradient(180deg,#fffcf5,#fff8ec)] p-6 shadow-[0_24px_60px_-34px_rgba(120,53,15,0.22)] dark:bg-[#180e07] dark:border-[#3d2a14] md:p-8">
            <div className="mb-6">
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b6a2b]">Reading Progress</p>
                <p className="text-sm font-semibold text-[#7c2d12]">
                  Day {currentDay.dayNumber} of {plan.days.length}
                </p>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[#f3e3bf]">
                <div className={`h-full rounded-full bg-gradient-to-r ${plan.accent}`} style={{ width: `${((currentDayIndex + 1) / plan.days.length) * 100}%` }} />
              </div>
            </div>

            <div
              className="relative mb-6 overflow-hidden rounded-[2rem] pb-6 shadow-[0_24px_50px_-34px_rgba(120,53,15,0.45)]"
              style={{
                backgroundImage: `linear-gradient(180deg,rgba(14,8,4,0.58) 0%,rgba(14,8,4,0.72) 100%), url('${currentDay.headerImage ?? "/orthodox-card-bg.svg"}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Cross pattern overlay */}
              <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_48px] opacity-[0.08]" />
              <div className="relative px-6 pb-8 pt-24 md:px-8 md:pt-28">
                <div className="inline-flex rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-white/90 backdrop-blur-sm">
                  Day {currentDay.dayNumber} of {plan.days.length}
                </div>
                <h2
                  className="mt-4 text-4xl font-black tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] md:text-5xl"
                  style={{ fontFamily: titleSerif, color: "#f3e4cd" }}
                >
                  {currentDay.title}
                </h2>
                {currentDay.subtitle ? (
                  <p className="mt-3 text-lg font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]" style={{ color: "#f3e4cd" }}>
                    {currentDay.subtitle}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mb-6 rounded-[1.75rem] border border-[#ead8b6] bg-[linear-gradient(180deg,#fffbf0,#fffaee)] p-5 shadow-[0_18px_40px_-28px_rgba(120,53,15,0.16)] dark:bg-[#1c1008] dark:border-[#3a2412] md:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b6a2b]">{introSectionTitle}</p>
              <div className="mt-4 space-y-4">
                {filteredIntroParagraphs.map((paragraph) => (
                  <p key={paragraph} className="max-w-4xl text-base leading-8 text-stone-700 dark:text-stone-100" style={{ fontFamily: bodySans }}>
                    {stripDisplayPrefix(paragraph)}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-6 h-4 rounded-full bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_16px] opacity-25" />

            <div className="mb-8 rounded-[1.75rem] border border-[#ead8b6] bg-[linear-gradient(180deg,#fff3d6_0%,#fffaf0_100%)] p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b6a2b]">The Word</p>
              </div>
              <div className="mt-3 space-y-5">
                {scriptureParagraphs.map((anchor) => (
                  <div key={anchor} className="rounded-[1.25rem] border border-[#ead8b6] bg-white p-4 shadow-[0_14px_30px_-26px_rgba(124,45,18,0.28)]">
                    <div className="mb-3 flex items-center justify-end gap-2">
                      <button type="button" onClick={() => void shareVerse(anchor)} className="inline-flex items-center gap-2 text-sm font-semibold text-[#a6461f]">
                        <Share2 className="h-4 w-4" />
                        Share to Story
                      </button>
                    </div>
                    <p className="text-lg leading-8 text-stone-700 dark:text-stone-100" style={{ fontFamily: bodySans }}>
                      {anchor}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {(witnessParagraphs.length > 0 || currentDay.witnessQuote) ? (
              <div className="mb-8 rounded-[1.75rem] border border-[#ead8b6] bg-[#f7f0e1] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b6a2b]">Witness of the Fathers</p>
                <div className="mt-3 space-y-4">
                  {(witnessParagraphs.length > 0 ? witnessParagraphs : [`${currentDay.witnessQuote?.source ?? ""}`, `“${currentDay.witnessQuote?.text ?? ""}”`]).map((paragraph, index) => (
                    <p
                      key={paragraph}
                      className={`${index === witnessParagraphs.length - 1 || paragraph.startsWith("“") ? "border-l-4 border-[#d4a84f] pl-4 text-lg italic" : "text-sm font-semibold text-[#7c2d12]"} leading-8`}
                      style={{ fontFamily: bodySans }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ) : null}

            {wisdomParagraphs.length > 0 ? (
              <>
                <div className="my-8 h-4 rounded-full bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_16px] opacity-25" />
                <div className="rounded-[1.75rem] border border-[#d8c395] bg-[#eef6fb] p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b6a2b]">Ancient Wisdom</p>
                  <div className="mt-4 space-y-4">
                    {wisdomParagraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-8 text-stone-700 dark:text-stone-100" style={{ fontFamily: bodySans }}>
                        {stripDisplayPrefix(paragraph)}
                      </p>
                    ))}
                  </div>
                </div>
              </>
            ) : null}

            <div className="my-8 h-4 rounded-full bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_16px] opacity-25" />

            <div className="rounded-[1.75rem] border border-[#d8c395] bg-[linear-gradient(180deg,#fffbf0,#fffaee)] p-6 dark:bg-[#1c1008] dark:border-[#3a2412]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b6a2b]">The Practice</p>
              <div className="mt-5 space-y-5">
                {practiceParagraphs.map((step, index) => {
                  const Icon = index === 0 ? Wind : index === 1 ? SunMedium : Lamp
                  return (
                    <div key={step} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7c2d12,#b45309)] text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        {index < practiceParagraphs.length - 1 ? <div className="mt-2 h-full w-px bg-[#e7d6b2]" /> : null}
                      </div>
                      <div className="pb-2">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b6a2b]">Step {index + 1}</p>
                        <p className="mt-2 text-base leading-8 text-stone-700 dark:text-stone-100" style={{ fontFamily: bodySans }}>
                          {stripDisplayPrefix(step)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="my-8 h-4 rounded-full bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_16px] opacity-25" />

            <div className="rounded-[1.75rem] border border-[#ead8b6] bg-[#f7f0e1] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b6a2b]">The Daily Diagnostic</p>
              <div className="mt-5 space-y-5">
                {diagnosticItems.map((item, index) => (
                  <div key={item.label} className="rounded-[1.25rem] border border-[#ead8b6] bg-white p-4 shadow-[0_14px_30px_-26px_rgba(124,45,18,0.18)]">
                    <p className="text-base leading-7 text-stone-700 dark:text-stone-100" style={{ fontFamily: bodySans }}>
                      {item.label}
                    </p>
                    {item.kind === "boolean" ? (
                      <div className="mt-4 flex flex-wrap gap-3">
                        {["TRUE", "FALSE"].map((option) => {
                          const selected = pulseAnswers[item.label] === option
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => setPulseAnswer(item.label, option)}
                              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                selected ? "bg-[#7c2d12] text-white" : "bg-[#f5ead2] text-[#7c2d12] hover:bg-[#efd9b4]"
                              }`}
                            >
                              {option}
                            </button>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5].map((option) => {
                          const selected = pulseAnswers[item.label] === `${option}`
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => setPulseAnswer(item.label, `${option}`)}
                              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition ${
                                selected ? "bg-[#0f766e] text-white" : "bg-[#eef8f7] text-[#0f766e] hover:bg-[#d8f0ec]"
                              }`}
                            >
                              {option}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {currentDay.heartCheck ? (
                <div className="mt-5 rounded-[1.25rem] border border-[#ead8b6] bg-[#fff8ea] p-4">
                  <p className="text-sm font-semibold text-[#3d2206]">The Heart Check</p>
                  <div className="mt-2 space-y-3">
                    {quietHeartNote.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-7 text-stone-700 dark:text-stone-100" style={{ fontFamily: bodySans }}>
                        {stripDisplayPrefix(paragraph)}
                      </p>
                    ))}
                  </div>
                </div>
              ) : null}

              {((reflectionParagraphs.length > 0 ? reflectionParagraphs : currentDay.reflection ? [currentDay.reflection] : []).length > 0) ? (
                <>
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b6a2b]">Reflection of the Day</p>
                  <div className="mt-3 space-y-3">
                    {(reflectionParagraphs.length > 0 ? reflectionParagraphs : currentDay.reflection ? [currentDay.reflection] : []).map((paragraph) => (
                      <p key={paragraph} className="text-lg leading-8 text-stone-700 dark:text-stone-100" style={{ fontFamily: bodySans }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </>
              ) : null}

              <div className="relative mt-5 flex justify-center">
                {showCompletionBurst
                  ? ["left-6 top-1/2 -translate-y-12", "left-16 top-0", "left-1/3 -top-5", "right-1/3 -top-5", "right-16 top-0", "right-6 top-1/2 -translate-y-12"].map((position, index) => (
                      <span
                        key={position}
                        className={`pointer-events-none absolute ${position} animate-[yc-cross-burst_1.2s_ease-out_forwards] text-[#b45309] opacity-0`}
                        style={{ animationDelay: `${index * 60}ms` }}
                      >
                        {index % 2 === 0 ? "✝" : "✦"}
                      </span>
                    ))
                  : null}
                <Button
                  type="button"
                  onClick={handleCompleteDay}
                  className="rounded-full bg-gradient-to-r from-[#f97316] to-[#f59e0b] px-8 text-white shadow-[0_18px_40px_-20px_rgba(249,115,22,0.55)]"
                >
                  {checkInComplete ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Day Completed
                    </>
                  ) : (
                    "Complete Day"
                  )}
                </Button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <button
        type="button"
        onClick={() => void toggleAudio()}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full border border-[#d8c395] bg-[linear-gradient(135deg,#7c2d12,#b45309)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-24px_rgba(120,53,15,0.4)]"
      >
        <Headphones className="h-4 w-4" />
        {isPlaying ? "Stop Chant" : "Play Chant"}
      </button>
    </div>
  )
}
