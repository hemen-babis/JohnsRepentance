"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, BookOpen, Check, ChevronDown, Compass, Flame, Lock, Sparkles, Target, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GeezHeading } from "@/components/geez-heading"
import { cn } from "@/lib/utils"
import { catechumenLessons, catechumenSections, type CatechumenLesson } from "@/lib/catechumen-data"

const STORAGE_KEY = "catechumen-progress"
const ROADMAP_UI_KEY = "catechumen-roadmap-ui"
const ROADMAP_SCROLL_KEY = "catechumen-roadmap-scroll"

function getCompletionState(lesson: CatechumenLesson, completedIds: number[]) {
  if (completedIds.includes(lesson.id)) return "completed"
  if (lesson.id === 1 || completedIds.includes(lesson.id - 1)) return "current"
  return "locked"
}

function getLessonIcon(lesson: CatechumenLesson) {
  if (lesson.section === "Foundations") return BookOpen
  if (lesson.section === "Five Pillars") return Compass
  if (lesson.section === "Sacrament") return Sparkles
  if (lesson.section === "Spiritual Life") return Flame
  return Compass
}

function getSectionAccent(sectionKey: string) {
  if (sectionKey === "Foundations") {
    return {
      orb: "from-amber-400 to-orange-600",
      panel: "from-amber-50/95 via-white/85 to-orange-50/75 dark:from-stone-900 dark:to-orange-950/25",
      glow: "bg-amber-200/55 dark:bg-amber-500/10",
      pattern: "✦",
    }
  }
  if (sectionKey === "Core Beliefs") {
    return {
      orb: "from-amber-400 to-orange-600",
      panel: "from-amber-50/95 via-white/85 to-orange-50/75 dark:from-stone-900 dark:to-orange-950/25",
      glow: "bg-amber-200/55 dark:bg-amber-500/10",
      pattern: "◌",
    }
  }
  if (sectionKey === "Five Pillars") {
    return {
      orb: "from-amber-400 to-orange-600",
      panel: "from-amber-50/95 via-white/85 to-orange-50/75 dark:from-stone-900 dark:to-orange-950/25",
      glow: "bg-amber-200/55 dark:bg-amber-500/10",
      pattern: "Ⅴ",
    }
  }
  if (sectionKey === "Sacrament") {
    return {
      orb: "from-amber-400 to-orange-600",
      panel: "from-amber-50/95 via-white/85 to-orange-50/75 dark:from-stone-900 dark:to-orange-950/25",
      glow: "bg-amber-200/55 dark:bg-amber-500/10",
      pattern: "✢",
    }
  }
  return {
    orb: "from-amber-400 to-orange-600",
    panel: "from-amber-50/95 via-white/85 to-orange-50/75 dark:from-stone-900 dark:to-orange-950/25",
    glow: "bg-amber-200/55 dark:bg-amber-500/10",
    pattern: "◔",
  }
}

export function CatechumenRoadmap() {
  const [completedIds, setCompletedIds] = useState<number[]>([])
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [expandedHistoryLesson, setExpandedHistoryLesson] = useState(false)
  const [expandedEucharistLesson, setExpandedEucharistLesson] = useState(false)
  const [hasLoadedUiState, setHasLoadedUiState] = useState(false)

  useEffect(() => {
    const syncProgress = () => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        if (!raw) {
          setCompletedIds([])
          return
        }
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          setCompletedIds(parsed.filter((value): value is number => typeof value === "number"))
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY)
        setCompletedIds([])
      }
    }

    syncProgress()
    window.addEventListener("storage", syncProgress)
    window.addEventListener("focus", syncProgress)

    return () => {
      window.removeEventListener("storage", syncProgress)
      window.removeEventListener("focus", syncProgress)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = window.sessionStorage.getItem(ROADMAP_UI_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as {
          expandedSection?: string | null
          expandedHistoryLesson?: boolean
          expandedEucharistLesson?: boolean
        }
        if (typeof parsed.expandedSection === "string" || parsed.expandedSection === null) {
          setExpandedSection(parsed.expandedSection ?? null)
        }
        if (typeof parsed.expandedHistoryLesson === "boolean") {
          setExpandedHistoryLesson(parsed.expandedHistoryLesson)
        }
        if (typeof parsed.expandedEucharistLesson === "boolean") {
          setExpandedEucharistLesson(parsed.expandedEucharistLesson)
        }
      }
    } catch {
      window.sessionStorage.removeItem(ROADMAP_UI_KEY)
    } finally {
      setHasLoadedUiState(true)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || !hasLoadedUiState) return
    window.sessionStorage.setItem(
      ROADMAP_UI_KEY,
      JSON.stringify({
        expandedSection,
        expandedHistoryLesson,
        expandedEucharistLesson,
      }),
    )
  }, [expandedEucharistLesson, expandedHistoryLesson, expandedSection, hasLoadedUiState])

  useEffect(() => {
    if (typeof window === "undefined" || !hasLoadedUiState) return
    const raw = window.sessionStorage.getItem(ROADMAP_SCROLL_KEY)
    if (!raw) return
    const scrollY = Number(raw)
    if (!Number.isFinite(scrollY)) return
    const restoreScroll = () => window.scrollTo({ top: scrollY, behavior: "auto" })
    const frameId = window.requestAnimationFrame(() => {
      window.setTimeout(restoreScroll, 80)
    })
    return () => window.cancelAnimationFrame(frameId)
  }, [expandedEucharistLesson, expandedHistoryLesson, expandedSection, hasLoadedUiState])

  const nextLesson = useMemo(
    () => catechumenLessons.find((lesson) => !completedIds.includes(lesson.id)) ?? catechumenLessons[catechumenLessons.length - 1],
    [completedIds],
  )
  const completedCount = completedIds.length
  const progressPercent = Math.round((completedCount / catechumenLessons.length) * 100)
  const streakCount = useMemo(() => {
    let streak = 0
    for (const lesson of catechumenLessons) {
      if (completedIds.includes(lesson.id)) streak += 1
      else break
    }
    return streak
  }, [completedIds])
  const historySubtopics = [
    "The Issue Between Monophysitism and Dyophysitism",
    "Fundamental Dogmas in the Nicene Creed",
    "Relations with Orthodox Chalcedonian Churches",
    "Dialogue Between Orthodox Chalcedonian and Non-Chalcedonian Churches",
  ]
  const eucharistSubtopics = ["Lecture XII: The Question of The Real Presence"]
  const lessonsBySection = catechumenSections.map((section) => ({
    ...section,
    lessons: catechumenLessons.filter((lesson) => lesson.section === section.key),
  }))

  function persistRoadmapUi() {
    if (typeof window === "undefined") return
    window.sessionStorage.setItem(
      ROADMAP_UI_KEY,
      JSON.stringify({
        expandedSection,
        expandedHistoryLesson,
        expandedEucharistLesson,
      }),
    )
    window.sessionStorage.setItem(ROADMAP_SCROLL_KEY, String(window.scrollY))
  }

  return (
    <section id="roadmap" className="relative py-8 md:py-10">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.3)_12%,transparent_100%)] dark:bg-[linear-gradient(180deg,transparent,rgba(255,184,76,0.05)_12%,transparent_100%)]" />

      <div className="container mx-auto px-4 relative">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <GeezHeading className="mb-4 text-orange-700 dark:text-amber-400">የእምነት ጉዞ</GeezHeading>
            <h2 className="text-4xl font-bold tracking-tight text-stone-900 dark:text-white md:text-5xl">
              Follow the path
            </h2>
            <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
                <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-stone-700 dark:text-stone-300">Start at lesson 1 and keep going.</p>
          </div>

          <div className="mb-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.8rem] border border-white/50 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,244,230,0.62))] p-5 shadow-[0_18px_50px_-34px_rgba(120,53,15,0.35)] backdrop-blur-xl dark:border-orange-500/18 dark:bg-[linear-gradient(135deg,rgba(66,38,22,0.46),rgba(42,26,18,0.3))]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-lg">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">Progress</p>
                  <p className="text-2xl font-bold text-stone-900 dark:text-white">{progressPercent}%</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
                {completedCount} of {catechumenLessons.length} lessons completed.
              </p>
              <div className="mt-4">
                <div className="h-2 overflow-hidden rounded-full bg-amber-100 dark:bg-stone-800">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-orange-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/50 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,244,230,0.62))] p-5 shadow-[0_18px_50px_-34px_rgba(120,53,15,0.35)] backdrop-blur-xl dark:border-orange-500/18 dark:bg-[linear-gradient(135deg,rgba(66,38,22,0.46),rgba(42,26,18,0.3))]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-lg">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">Next Focus</p>
                  <p className="text-lg font-bold text-stone-900 dark:text-white">{nextLesson.section}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">{nextLesson.title}</p>
            </div>

            <div className="rounded-[1.8rem] border border-white/50 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,244,230,0.62))] p-5 shadow-[0_18px_50px_-34px_rgba(120,53,15,0.35)] backdrop-blur-xl dark:border-orange-500/18 dark:bg-[linear-gradient(135deg,rgba(66,38,22,0.46),rgba(42,26,18,0.3))]">
              <p className="text-xs uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">Learning Streak</p>
              <div className="mt-3 flex items-end gap-3">
                <p className="text-2xl font-bold text-stone-900 dark:text-white">{streakCount}</p>
                <p className="pb-1 text-sm text-stone-600 dark:text-stone-300">lessons in order</p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                Open a section, choose one lesson, finish the check, then keep moving. Treat it like formation, not scrolling.
              </p>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] items-start">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-[2rem] border border-white/45 bg-[linear-gradient(135deg,rgba(255,250,243,0.78),rgba(255,241,224,0.52))] p-6 shadow-[0_25px_80px_-40px_rgba(120,53,15,0.45)] backdrop-blur-xl dark:border-orange-500/14 dark:bg-[linear-gradient(135deg,rgba(56,32,20,0.5),rgba(38,24,17,0.34))]">
                <div className="space-y-3">
                  <div className="rounded-2xl bg-white/72 p-4 shadow-sm dark:bg-[linear-gradient(135deg,rgba(66,38,22,0.52),rgba(41,25,18,0.36))]">
                    <p className="text-xs uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">Next</p>
                    <p className="font-semibold text-stone-900 dark:text-white">{nextLesson.title}</p>
                  </div>
                  <Button asChild className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                    <Link href={`/catechumen/${nextLesson.slug}`} onClick={persistRoadmapUi}>
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="mt-6 space-y-2">
                  {catechumenSections.map((section) => {
                    const count = catechumenLessons.filter((lesson) => lesson.section === section.key).length
                    return (
                      <div key={section.key} className="flex items-center justify-between text-sm text-stone-600 dark:text-stone-300">
                        <span>{section.title}</span>
                        <span>{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {lessonsBySection.map((section, sectionIndex) => {
                const isExpanded = expandedSection === section.key
                const sectionCurrent = section.lessons.some((lesson) => getCompletionState(lesson, completedIds) === "current")
                const sectionDone = section.lessons.length > 0 && section.lessons.every((lesson) => completedIds.includes(lesson.id))
                const sectionAccent = getSectionAccent(section.key)
                const SectionIcon =
                  section.key === "Foundations"
                    ? BookOpen
                    : section.key === "Five Pillars"
                      ? Compass
                      : section.key === "Sacrament"
                        ? Sparkles
                        : section.key === "Spiritual Life"
                          ? Flame
                          : Compass

                return (
                  <motion.div
                    key={section.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.4, delay: Math.min(sectionIndex * 0.04, 0.2) }}
                    className="space-y-3"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedSection((current) => (current === section.key ? null : section.key))}
                      className={cn(
                        "group relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-[1.75rem] border px-5 py-5 text-left shadow-[0_22px_60px_-40px_rgba(120,53,15,0.38)] transition-all duration-300 hover:-translate-y-0.5",
                        `border-amber-200/60 bg-gradient-to-br ${sectionAccent.panel} backdrop-blur-xl`,
                        "dark:border-orange-500/18 dark:bg-[linear-gradient(135deg,rgba(66,38,22,0.46),rgba(42,26,18,0.3))]",
                        isExpanded && "ring-1 ring-amber-300/70 shadow-[0_28px_80px_-42px_rgba(120,53,15,0.5)] dark:ring-amber-700/30",
                      )}
                    >
                      <div className={cn("pointer-events-none absolute -right-4 -top-6 h-24 w-24 rounded-full blur-2xl", sectionAccent.glow)} />
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "flex h-11 w-11 items-center justify-center rounded-full border text-white shadow-lg",
                            sectionDone
                              ? "border-orange-200 bg-gradient-to-br from-orange-500 to-orange-700"
                            : sectionCurrent
                                ? `border-amber-100 bg-gradient-to-br ${sectionAccent.orb}`
                                : `border-amber-200 bg-gradient-to-br ${sectionAccent.orb} dark:border-orange-900/30`,
                          )}
                        >
                          {sectionDone ? <Check className="h-5 w-5" /> : <SectionIcon className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-stone-900 dark:text-white">{section.title}</p>
                          <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">{section.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-orange-700 dark:bg-orange-950/40 dark:text-amber-300">
                          {section.lessons.filter((lesson) => completedIds.includes(lesson.id)).length}/{section.lessons.length}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 text-stone-500 transition-transform duration-300 dark:text-stone-400",
                            isExpanded && "rotate-180",
                          )}
                        />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                      <div className="ml-6 space-y-4 border-l-2 border-amber-300/60 pl-5 pt-1 dark:border-orange-500/28">
                        {section.lessons.map((lesson) => {
                          const state = getCompletionState(lesson, completedIds)
                          const isCompleted = state === "completed"
                          const isCurrent = state === "current"
                          const LessonIcon = getLessonIcon(lesson)
                          const isHistoryRoadmapLesson = lesson.slug === "history-of-the-church"
                          const isEucharistRoadmapLesson = lesson.slug === "sacrament-of-eucharist"

                          const lessonCard = (
                            <div className="relative overflow-hidden rounded-[1.5rem] bg-transparent p-1 transition-all duration-300">
                              <div
                                className={cn(
                                  "rounded-[1.35rem] px-5 py-5 transition-all duration-300",
                                  isCurrent &&
                                    "bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,244,230,0.72))] shadow-[0_24px_70px_-40px_rgba(120,53,15,0.45)] backdrop-blur-xl dark:bg-[linear-gradient(135deg,rgba(41,28,19,0.92),rgba(61,39,24,0.85))]",
                                  isCompleted &&
                                    "ring-1 ring-orange-200/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(255,243,226,0.7))] shadow-[0_22px_60px_-36px_rgba(249,115,22,0.4)] backdrop-blur-lg dark:bg-[linear-gradient(135deg,rgba(34,23,15,0.85),rgba(44,30,20,0.8))]",
                                  !isCompleted &&
                                    !isCurrent &&
                                    "bg-[linear-gradient(135deg,rgba(255,255,255,0.34),rgba(255,255,255,0.2))] opacity-95 backdrop-blur-md dark:bg-[linear-gradient(135deg,rgba(29,21,16,0.72),rgba(29,21,16,0.52))]",
                                )}
                              >
                                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em]">
                                  <span className="text-orange-700 dark:text-amber-300">Lesson {lesson.id}</span>
                                  <span className="text-stone-400 dark:text-stone-500">•</span>
                                  <span className="text-stone-500 dark:text-stone-400">{lesson.duration}</span>
                                </div>

                                <div className="mt-3 flex items-start justify-between gap-4">
                                  <div className="min-w-0">
                                    <h3 className="text-xl font-semibold text-stone-900 transition-colors duration-300 dark:text-white">
                                      {lesson.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                                      {lesson.description}
                                    </p>
                                  </div>

                                  <div
                                    className={cn(
                                      "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] whitespace-nowrap",
                                      isCompleted && "bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-amber-300",
                                      isCurrent && "bg-amber-100 text-orange-700 dark:bg-amber-950/50 dark:text-amber-300",
                                      !isCompleted && !isCurrent && "bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400",
                                    )}
                                  >
                                    {isCompleted ? "Done" : isCurrent ? "Now" : "Later"}
                                  </div>
                                </div>

                                <div className="mt-4 flex items-center justify-end gap-4">
                                  {isCompleted ? (
                                    <span className="rounded-full bg-orange-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-orange-700 dark:bg-orange-950/50 dark:text-amber-300">
                                      Completed
                                    </span>
                                  ) : null}
                                  <div className="flex items-center gap-2 text-orange-700 dark:text-amber-300">
                                    {isHistoryRoadmapLesson ? (
                                      <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", expandedHistoryLesson && "rotate-180")} />
                                    ) : isEucharistRoadmapLesson ? (
                                      <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", expandedEucharistLesson && "rotate-180")} />
                                    ) : state === "locked" ? (
                                      <Lock className="h-4 w-4" />
                                    ) : (
                                      <ArrowRight className="h-4 w-4" />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )

                          return (
                            <motion.div
                              key={lesson.id}
                              initial={{ opacity: 0, y: 14 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25 }}
                              className="relative flex gap-4"
                            >
                              <div className="relative z-10 mt-5 flex-shrink-0">
                                <div
                                  className={cn(
                                    "flex h-10 w-10 items-center justify-center rounded-full border-4 shadow-lg transition-all duration-300",
                                    isCompleted && "border-orange-200 bg-gradient-to-br from-orange-500 to-orange-700 text-white shadow-orange-500/30",
                                    isCurrent && "border-amber-100 bg-gradient-to-br from-amber-400 via-orange-500 to-orange-700 text-white shadow-orange-500/35",
                                    !isCompleted && !isCurrent && "border-white/90 bg-white/85 text-stone-500 dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-400",
                                  )}
                                >
                                  {isCompleted ? <Check className="h-4 w-4" /> : <LessonIcon className="h-4 w-4" />}
                                </div>
                              </div>

                              <div className="min-w-0 flex-1">
                                {isHistoryRoadmapLesson ? (
                                  <div className="space-y-3">
                                    <button type="button" onClick={() => setExpandedHistoryLesson((current) => !current)} className="block w-full text-left">
                                      {lessonCard}
                                    </button>
                                    {expandedHistoryLesson ? (
                                      <div className="ml-6 space-y-3 border-l-2 border-amber-300/50 pl-4 dark:border-orange-800/35">
                                        {historySubtopics.map((topic, topicIndex) => (
                                          <motion.div
                                            key={topic}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.22, delay: topicIndex * 0.04 }}
                                          >
                                            <Link
                                              href={`/catechumen/${lesson.slug}#${topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                                              className="group block"
                                            >
                                              <div className="rounded-[1.15rem] border border-amber-200/45 bg-[linear-gradient(135deg,rgba(255,255,255,0.26),rgba(255,248,235,0.18))] px-4 py-3 shadow-[0_14px_34px_-28px_rgba(120,53,15,0.32)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300/70 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.34),rgba(255,244,230,0.24))] dark:border-orange-900/20 dark:bg-[linear-gradient(135deg,rgba(36,24,17,0.72),rgba(26,18,14,0.64))] dark:hover:border-orange-800/35 dark:hover:bg-[linear-gradient(135deg,rgba(48,31,21,0.84),rgba(31,21,16,0.74))]">
                                                <div className="flex items-start gap-3">
                                                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_0_0_4px_rgba(251,191,36,0.12)]" />
                                                  <span className="text-sm font-medium leading-relaxed text-stone-700 transition-colors duration-300 group-hover:text-orange-700 dark:text-stone-300 dark:group-hover:text-amber-200">
                                                    {topic}
                                                  </span>
                                                </div>
                                              </div>
                                            </Link>
                                          </motion.div>
                                        ))}
                                      </div>
                                    ) : null}
                                  </div>
                                ) : isEucharistRoadmapLesson ? (
                                  <div className="space-y-3">
                                    <button type="button" onClick={() => setExpandedEucharistLesson((current) => !current)} className="block w-full text-left">
                                      {lessonCard}
                                    </button>
                                    {expandedEucharistLesson ? (
                                      <div className="ml-6 space-y-3 border-l-2 border-amber-300/50 pl-4 dark:border-orange-800/35">
                                        {eucharistSubtopics.map((topic, topicIndex) => (
                                          <motion.div
                                            key={topic}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.22, delay: topicIndex * 0.04 }}
                                          >
                                            <Link
                                              href={`/catechumen/${lesson.slug}#the-question-of-the-real-presence`}
                                              className="group block"
                                            >
                                              <div className="rounded-[1.15rem] border border-amber-200/45 bg-[linear-gradient(135deg,rgba(255,255,255,0.26),rgba(255,248,235,0.18))] px-4 py-3 shadow-[0_14px_34px_-28px_rgba(120,53,15,0.32)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300/70 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.34),rgba(255,244,230,0.24))] dark:border-orange-900/20 dark:bg-[linear-gradient(135deg,rgba(36,24,17,0.72),rgba(26,18,14,0.64))] dark:hover:border-orange-800/35 dark:hover:bg-[linear-gradient(135deg,rgba(48,31,21,0.84),rgba(31,21,16,0.74))]">
                                                <div className="flex items-start gap-3">
                                                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_0_0_4px_rgba(251,191,36,0.12)]" />
                                                  <span className="text-sm font-medium leading-relaxed text-stone-700 transition-colors duration-300 group-hover:text-orange-700 dark:text-stone-300 dark:group-hover:text-amber-200">
                                                    {topic}
                                                  </span>
                                                </div>
                                              </div>
                                            </Link>
                                          </motion.div>
                                        ))}
                                      </div>
                                    ) : null}
                                  </div>
                                ) : (
                                  <Link href={`/catechumen/${lesson.slug}`} className="group block" onClick={persistRoadmapUi}>
                                    {lessonCard}
                                  </Link>
                                )}
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                      </motion.div>
                    ) : null}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
