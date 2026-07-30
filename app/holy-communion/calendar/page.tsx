"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import {
  addDays,
  differenceInCalendarDays,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
  startOfDay,
} from "date-fns"
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock,
  Heart,
  History,
  Pencil,
  Sparkles,
  X,
} from "lucide-react"
import {
  type CycleSettings,
  type FastSettings,
  type PrepChecklist,
  type RhythmState,
  type RhythmStore,
  defaultStore,
  emptyChecklist,
  getDayState,
  getDaysUntil,
  getFastStartTime,
  getGuidanceForState,
  getLastCommunionDate,
  getLiturgyTime,
  getMonthGrid,
  getNextRecommendedDate,
  getCommunionStreak,
  isChecklistComplete,
  isRestingDay,
  loadStore,
  persistStore,
  RHYTHM_KEY,
} from "@/lib/rhythm-engine"
import {
  type CommunionProfile,
  loadProfile,
  checkEligibility,
  isProfileRestingDay,
  getPostpartumDaysRemaining,
  isInPostpartumPeriod,
} from "@/components/holy-communion/communion-profile"
import {
  CommunionProfileSetup,
  CommunionProfileBanner,
} from "@/components/holy-communion/communion-profile-setup"

// ─── Constants ────────────────────────────────────────────────────────────────

const serif = "'Iowan Old Style', 'Palatino Linotype', Georgia, serif"
const DAY_NOTES_KEY = "communion-day-notes-v1"

// ─── Per-day data ─────────────────────────────────────────────────────────────

type DayEntry = {
  note: string
  checklist: { confession: boolean; fasting: boolean; peace: boolean; prayer: boolean }
  paused: boolean
}

const emptyDayEntry = (): DayEntry => ({
  note: "",
  checklist: { confession: false, fasting: false, peace: false, prayer: false },
  paused: false,
})

function loadDayNotes(): Record<string, DayEntry> {
  if (typeof window === "undefined") return {}
  try { return JSON.parse(localStorage.getItem(DAY_NOTES_KEY) ?? "{}") } catch { return {} }
}

function saveDayNotes(data: Record<string, DayEntry>) {
  if (typeof window === "undefined") return
  localStorage.setItem(DAY_NOTES_KEY, JSON.stringify(data))
}

// ─── State helpers ────────────────────────────────────────────────────────────

function getStateLabel(date: Date, store: RhythmStore): string {
  const state = getDayState(date, store)
  const d = startOfDay(date)
  if (state === "communion") return "Communion"
  if (state === "guarding") {
    const last = getLastCommunionDate(store)
    if (last) return `Post · Day ${differenceInCalendarDays(d, last)}`
    return "Post-Communion"
  }
  if (state === "preparing" || state === "ready") {
    if (store.plannedDate) {
      const diff = differenceInCalendarDays(parseISO(store.plannedDate), d)
      if (diff >= 1 && diff <= 3) return state === "ready" ? `Ready · ${4 - diff}` : `Prep · ${4 - diff}`
    }
    return state === "ready" ? "Ready" : "Preparing"
  }
  if (state === "resting") return "Rest"
  return ""
}

function getKeyStep(state: RhythmState, store: RhythmStore, date: Date): string {
  const d = startOfDay(date)
  if (state === "preparing") {
    let prepDay = 1
    if (store.plannedDate) {
      const diff = differenceInCalendarDays(parseISO(store.plannedDate), d)
      prepDay = Math.max(1, 4 - diff)
    }
    if (prepDay === 1) return "Begin the fast today — abstain from meat, dairy, and all animal products."
    if (prepDay === 2) return "Seek peace with everyone today. No unresolved conflict before the altar."
    return "Go to Confession (Nessaha) today. This is the gate of Holy Communion."
  }
  if (state === "ready") return "Preparation is complete. Fast from midnight. Rest your mind and body."
  if (state === "communion") return "Arrive early. Stand with reverence. Receive with crossed arms and a prepared heart."
  if (state === "guarding") {
    const last = getLastCommunionDate(store)
    const day = last ? differenceInCalendarDays(d, last) : 1
    if (day === 1) return "Break your fast gently. Guard your tongue. Pray a thanksgiving prayer."
    if (day === 2) return "Carry the Kingdom with you today. Plan your next Communion while grace is fresh."
    return "The guarding season closes today. Speak with your spiritual father."
  }
  if (state === "resting") return "A season of rest. Pray simply. God is not far from you in these days."
  return "Every quiet day is a step toward the next Communion."
}

function getPrepDay(store: RhythmStore): number | null {
  if (!store.plannedDate) return null
  const today = startOfDay(new Date())
  const planned = parseISO(store.plannedDate)
  const diff = differenceInCalendarDays(planned, today)
  if (diff >= 1 && diff <= 3) return 4 - diff
  if (isSameDay(today, planned)) return null
  return null
}

// ─── Detailed steps ───────────────────────────────────────────────────────────

type GuidanceStep = { title: string; description: string; ref?: string }

function getDetailedSteps(state: RhythmState, store: RhythmStore, date: Date): GuidanceStep[] {
  const d = startOfDay(date)
  if (state === "preparing") {
    let prepDay = 1
    if (store.plannedDate) prepDay = Math.max(1, 4 - differenceInCalendarDays(parseISO(store.plannedDate), d))
    if (prepDay === 1) return [
      { title: "Begin the fast", description: "Abstain from meat, dairy, and all animal products. Fast with sincerity, not only habit." },
      { title: "Examine your conscience", description: "Sit quietly. Who did you wrong this week? What thoughts were given shelter that should not have been?" },
      { title: "Read Psalm 51", description: "The psalm of repentance. Read it slowly, as a personal confession before God.", ref: "Psalm 51" },
      { title: "Pray the Kidase preparation prayer", description: "Begin the liturgical preparation rhythm your church prescribes." },
    ]
    if (prepDay === 2) return [
      { title: "Deepen the fast", description: "No food or drink until midday or 3 pm. Pray the fast — don't just keep it mechanically." },
      { title: "Seek peace with others", description: "\"If you bring your gift to the altar and remember your brother has something against you…\" Resolve it today.", ref: "Matt 5:23" },
      { title: "Attend Vespers if possible", description: "If your parish holds evening prayers, attend tonight. The church's rhythm is already preparing you." },
      { title: "Read the Sunday Qidase readings", description: "Know the scriptures before you enter the Divine Liturgy. Let the Word go before you." },
    ]
    return [
      { title: "Go to Confession (Nessaha)", description: "This is the gate of Holy Communion. You must pass through it. Find your spiritual father today." },
      { title: "Fast from midnight", description: "After midnight tonight: no food, no water. This is the Tewahedo fast before receiving." },
      { title: "Recite the Tezekar", description: "Pray the liturgical prayers appointed for the night before Communion." },
      { title: "Rest your mind", description: "No argument, no screens after evening prayer. Sleep as someone preparing to receive the King of Heaven." },
    ]
  }
  if (state === "ready") return [
    { title: "Confession is complete — well done", description: "You have passed through the gate. Approach with confidence in His mercy, not your own merit." },
    { title: "Fast from midnight tonight", description: "Tonight: no food, no water. Prepare your body as you have prepared your heart." },
    { title: "Pray the preparation prayers", description: "The appointed prayers bring the liturgy into your home before you enter the church." },
    { title: "Rest and be still", description: "The preparation is complete. Rest in the peace of God tonight." },
  ]
  if (state === "communion") return [
    { title: "Arrive before the Liturgy begins", description: "Do not rush into the presence of God. Be there before the deacons take their place." },
    { title: "Stand with reverence throughout", description: "The Qidase is a descent of Heaven. No phone, no wandering. This is the Holy of Holies." },
    { title: "Receive with crossed arms", description: "Arms crossed over the chest: a sign of unworthiness. You are receiving a gift you did not earn." },
    { title: "Guard what you have received", description: "Do not eat or drink immediately after. Spend time in prayer and thanksgiving." },
  ]
  if (state === "guarding") {
    const last = getLastCommunionDate(store)
    const day = last ? differenceInCalendarDays(d, last) : 1
    if (day === 1) return [
      { title: "Break your fast gently", description: "The body has been a temple. Begin with simple, gentle food. No feast, no rush." },
      { title: "Watch your tongue carefully", description: "Idle talk and anger are enemies of the grace you carry. Every word matters more today." },
      { title: "Pray a thanksgiving prayer", description: "A psalm, a Mezmur, or a quiet thank-you. You received the Body and Blood of Christ." },
      { title: "Read about a Saint", description: "Spend time with the lives of those who guarded communion with holiness." },
    ]
    return [
      { title: "Return to your regular rhythm", description: "The liturgy has sent you back into the world. Go — but carry the Kingdom inside you." },
      { title: "Remember what you received", description: "You are a communicant. That is your identity before you are anything else today." },
      { title: "Plan your next Communion", description: "When will you receive again? Plan it now, while the grace is still fresh." },
    ]
  }
  if (state === "resting") return [
    { title: "Do not condemn yourself", description: "This is a season the Tewahedo tradition holds with gentleness and reverence." },
    { title: "Pray simply", description: "\"Lord Jesus Christ, Son of God, have mercy on me, a sinner.\" This is enough for today." },
    { title: "Rest fully", description: "Use this season for quiet reading, prayer, and preparation for the days ahead." },
  ]
  return [
    { title: "Schedule your next Communion", description: "Set a date. Tell your spiritual father. Make it intentional." },
    { title: "Keep the daily rhythm", description: "Morning prayer, evening prayer, the sign of the cross. The rhythm is itself a form of preparation." },
    { title: "Read Psalm 51 or 91", description: "Let the Word begin preparing the soil of your heart.", ref: "Psalm 51 or 91" },
  ]
}

// ─── Countdown ────────────────────────────────────────────────────────────────

function useLiveCountdown(target: Date | null) {
  const [remaining, setRemaining] = useState<number | null>(null)
  useEffect(() => {
    if (!target) { setRemaining(null); return }
    const tick = () => setRemaining(target.getTime() - Date.now())
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])
  return remaining
}

function formatCountdown(ms: number | null): string {
  if (ms === null) return "--:--:--"
  if (ms <= 0) return "00:00:00"
  const s = Math.floor(ms / 1000)
  return [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].map((v) => String(v).padStart(2, "0")).join(":")
}

// ─── Cell styling by state ────────────────────────────────────────────────────

type CellStyle = { bg: string; border: string; barColor: string }

function getCellStyle(state: RhythmState, isRest: boolean, isPaused: boolean, isSunday: boolean): CellStyle {
  if (isPaused) return { bg: "bg-stone-50 dark:bg-stone-900/60", border: "border-stone-200 dark:border-stone-800", barColor: "rgb(239,68,68)" }
  if (isRest)   return { bg: "bg-rose-50/80 dark:bg-rose-950/20", border: "border-rose-200 dark:border-rose-900/40", barColor: "rgb(251,113,133)" }
  switch (state) {
    case "preparing": return { bg: "bg-amber-50/90 dark:bg-amber-950/20", border: "border-amber-200 dark:border-amber-800/40", barColor: "rgb(245,158,11)" }
    case "ready":     return { bg: "bg-emerald-50/80 dark:bg-emerald-950/20", border: "border-emerald-200 dark:border-emerald-800/40", barColor: "rgb(52,211,153)" }
    case "communion": return { bg: "bg-emerald-100/80 dark:bg-emerald-950/30", border: "border-emerald-300 dark:border-emerald-700/60", barColor: "rgb(16,185,129)" }
    case "guarding":  return { bg: "bg-orange-50/80 dark:bg-orange-950/20", border: "border-orange-200 dark:border-orange-800/40", barColor: "rgb(251,146,60)" }
    case "resting":   return { bg: "bg-rose-50/80 dark:bg-rose-950/20", border: "border-rose-200 dark:border-rose-900/40", barColor: "rgb(251,113,133)" }
    default:
      if (isSunday) return { bg: "bg-orange-50/50 dark:bg-amber-950/10", border: "border-orange-100 dark:border-amber-900/30", barColor: "transparent" }
      return { bg: "bg-white dark:bg-stone-950/60", border: "border-stone-100 dark:border-stone-800/60", barColor: "transparent" }
  }
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CommunionCalendarPage() {
  const [store, setStore] = useState<RhythmStore>(defaultStore)
  const [dayData, setDayData] = useState<Record<string, DayEntry>>({})
  const [month, setMonth] = useState(() => startOfDay(new Date()))
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [panel, setPanel] = useState<"day" | "fast" | "cycle" | "plan" | "checklist" | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const [profile, setProfile] = useState<CommunionProfile | null>(null)
  const [showSetup, setShowSetup] = useState(false)

  const [fastDraft, setFastDraft] = useState({ date: "", hour: "9", minute: "0" })
  const [cycleDraft, setCycleDraft] = useState({ startDate: "", cycleLength: "28", periodLength: "5" })
  const [planDraft, setPlanDraft] = useState("")
  const [noteEdit, setNoteEdit] = useState("")

  useEffect(() => {
    const s = loadStore()
    const d = loadDayNotes()
    setStore(s)
    setDayData(d)
    if (s.fastSettings) setFastDraft({ date: s.fastSettings.liturgyDate, hour: String(s.fastSettings.liturgyHour), minute: String(s.fastSettings.liturgyMinute) })
    if (s.cycleSettings) setCycleDraft({ startDate: s.cycleSettings.startDate, cycleLength: String(s.cycleSettings.cycleLength), periodLength: String(s.cycleSettings.periodLength) })
    if (s.plannedDate) setPlanDraft(s.plannedDate)
    const p = loadProfile()
    if (p) setProfile(p)
    else setShowSetup(true)
    setHydrated(true)
  }, [])

  const persist = useCallback((u: RhythmStore) => { setStore(u); persistStore(u) }, [])
  const persistDay = useCallback((u: Record<string, DayEntry>) => { setDayData(u); saveDayNotes(u) }, [])

  const today = startOfDay(new Date())
  const todayState = hydrated ? getDayState(today, store) : "neutral"
  const todayGuidance = getGuidanceForState(todayState, store.checklist)
  const todaySteps = hydrated ? getDetailedSteps(todayState, store, today) : []
  const streak = getCommunionStreak(store)
  const nextRec = getNextRecommendedDate(store)
  const communionDates = [...store.communionEntries].sort((a, b) => b.date.localeCompare(a.date))
  const fastTarget = store.fastSettings ? getFastStartTime(store.fastSettings) : null
  const liturgyTarget = store.fastSettings ? getLiturgyTime(store.fastSettings) : null
  const countdownTarget = fastTarget && fastTarget.getTime() > Date.now() ? fastTarget : liturgyTarget && liturgyTarget.getTime() > Date.now() ? liturgyTarget : null
  const countdown = useLiveCountdown(countdownTarget)
  const checklistDone = isChecklistComplete(store.checklist)
  const checklistCount = Object.values(store.checklist).filter(Boolean).length
  const eligibility = profile ? checkEligibility(profile) : null
  const calendarDays = getMonthGrid(month)
  const prepDay = getPrepDay(store)
  const postpartumLeft = getPostpartumDaysRemaining(profile)
  const restricted = Boolean(profile && eligibility && !eligibility.canReceive)
  const keyStep = hydrated ? getKeyStep(todayState, store, today) : ""

  // ─── Actions ──────────────────────────────────────────────────────────

  function toggleGlobalChecklist(key: keyof PrepChecklist) {
    persist({ ...store, checklist: { ...store.checklist, [key]: !store.checklist[key] } })
  }

  function toggleDayChecklist(dateKey: string, key: keyof DayEntry["checklist"]) {
    const e = dayData[dateKey] ?? emptyDayEntry()
    persistDay({ ...dayData, [dateKey]: { ...e, checklist: { ...e.checklist, [key]: !e.checklist[key] } } })
  }

  function togglePauseDay(dateKey: string) {
    const e = dayData[dateKey] ?? emptyDayEntry()
    persistDay({ ...dayData, [dateKey]: { ...e, paused: !e.paused } })
  }

  function saveDayNote(dateKey: string) {
    const e = dayData[dateKey] ?? emptyDayEntry()
    persistDay({ ...dayData, [dateKey]: { ...e, note: noteEdit } })
  }

  function logCommunion(date: Date) {
    const key = format(date, "yyyy-MM-dd")
    const already = store.communionEntries.some((e) => e.date === key)
    const entries = already
      ? store.communionEntries.filter((e) => e.date !== key)
      : [...store.communionEntries, { date: key }]
    persist({ ...store, communionEntries: entries, plannedDate: already ? store.plannedDate : null, checklist: already ? store.checklist : emptyChecklist })
  }

  function saveFastSettings() {
    const s: FastSettings = { liturgyDate: fastDraft.date, liturgyHour: parseInt(fastDraft.hour, 10), liturgyMinute: parseInt(fastDraft.minute, 10) }
    persist({ ...store, fastSettings: s })
    setPanel(null)
  }

  function saveCycleSettings() {
    const s: CycleSettings = { startDate: cycleDraft.startDate, cycleLength: parseInt(cycleDraft.cycleLength, 10), periodLength: parseInt(cycleDraft.periodLength, 10) }
    persist({ ...store, cycleSettings: s })
    setPanel(null)
  }

  function savePlannedDate() {
    persist({ ...store, plannedDate: planDraft || null, checklist: planDraft ? store.checklist : emptyChecklist })
    setPanel(null)
  }

  // ─── Gates ──────────────────────────────────────────────────────────

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center parchment-page-bg dark:bg-none dark:bg-stone-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-300 border-t-orange-600" />
      </div>
    )
  }

  if (showSetup) {
    return (
      <div className="min-h-screen parchment-page-bg dark:bg-none dark:bg-gradient-to-b dark:from-[#120d09] dark:via-[#1a0f08] dark:to-[#120d09] px-4 py-16">
        <div className="mx-auto max-w-xl">
          <Link href="/holy-communion" className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-white/70 dark:bg-stone-900/50 dark:border-amber-500/20 px-4 py-2 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:border-amber-300 transition">
            <ArrowLeft className="h-3.5 w-3.5" /> Holy Communion
          </Link>
          <CommunionProfileSetup onComplete={(p) => { setProfile(p); setShowSetup(false) }} />
        </div>
      </div>
    )
  }

  // ─── Day panel data ────────────────────────────────────────────────────
  const selectedKey = selectedDay ? format(selectedDay, "yyyy-MM-dd") : null
  const selectedState = selectedDay ? getDayState(selectedDay, store) : "neutral"
  const selectedGuidance = selectedDay ? getGuidanceForState(selectedState, store.checklist) : null
  const selectedSteps = selectedDay ? getDetailedSteps(selectedState, store, selectedDay) : []
  const selectedEntry = selectedKey ? (dayData[selectedKey] ?? emptyDayEntry()) : emptyDayEntry()
  const isCommunionLogged = selectedKey ? store.communionEntries.some((e) => e.date === selectedKey) : false
  const isPaused = selectedEntry.paused
  const isSelectedRest = selectedDay ? (isRestingDay(selectedDay, store.cycleSettings) || isProfileRestingDay(selectedDay, profile)) : false
  const selectedStateForBadge = isSelectedRest ? "resting" : selectedState

  const checklistItems: { key: keyof PrepChecklist; label: string; sub: string }[] = [
    { key: "confession", label: "Confession (Nessaha)", sub: "Spoken with your spiritual father" },
    { key: "fasting", label: "Fasting", sub: "Abstaining from meat, dairy, animal products" },
    { key: "forgiveness", label: "Peace with others", sub: "Sought forgiveness, resolved conflicts" },
    { key: "prayer", label: "Prayer preparation", sub: "Prayed the Tezekar and appointed prayers" },
  ]

  const badgeStyle: Record<RhythmState, string> = {
    neutral:   "bg-stone-100 text-stone-600 border-stone-200 dark:bg-stone-800/60 dark:text-stone-400 dark:border-stone-700",
    preparing: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700/40",
    ready:     "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700/40",
    resting:   "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/40",
    guarding:  "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-700/40",
    communion: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700/40",
  }

  const stateLabelFull: Record<RhythmState, string> = {
    neutral: "Quiet day",
    preparing: "Preparation",
    ready: "Ready",
    resting: "Rest period",
    guarding: "Post-communion",
    communion: "Communion day",
  }

  return (
    <div className="min-h-screen parchment-page-bg text-stone-900 dark:bg-none dark:bg-gradient-to-b dark:from-[#120d09] dark:via-[#1a0f08] dark:to-[#120d09] dark:text-white">

      {/* ── Slide-up panels ─────────────────────────────────────────────────── */}
      {panel && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" onClick={() => setPanel(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-md rounded-t-[2rem] sm:rounded-[2rem] bg-white dark:bg-[#180e09] shadow-2xl max-h-[92vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Panel header */}
            <div className="shrink-0 relative overflow-hidden p-5 pb-4" style={{ background: "linear-gradient(150deg,#2d0a00 0%,#1c0800 60%,#351100 100%)" }}>
              <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 15% 0%,rgba(220,100,20,0.25),transparent 55%)" }} />
              <button type="button" onClick={() => setPanel(null)} className="absolute right-4 top-4 rounded-full p-1.5 text-white/40 hover:text-white hover:bg-white/10 transition">
                <X className="h-5 w-5" />
              </button>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-400/70 relative">Communion Calendar</p>
              <h2 className="mt-1 text-xl font-black text-white relative" style={{ fontFamily: serif }}>
                {panel === "fast" && "Fast Timer"}
                {panel === "cycle" && "Cycle Tracker"}
                {panel === "plan" && "Plan Your Communion"}
                {panel === "checklist" && "Preparation Checklist"}
                {panel === "day" && selectedDay && format(selectedDay, "EEEE, MMMM d")}
              </h2>
            </div>

            {/* Panel body */}
            <div className="overflow-y-auto flex-1 p-5 space-y-4">

              {/* Fast Timer */}
              {panel === "fast" && (
                <>
                  <p className="text-sm text-stone-500 dark:text-stone-400 leading-6">Enter your Liturgy date and time. We&apos;ll count down to when your fast should begin — 18 hours before.</p>
                  <div className="space-y-3">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-stone-600 dark:text-stone-400">Liturgy Date</label>
                      <input type="date" value={fastDraft.date} onChange={(e) => setFastDraft({ ...fastDraft, date: e.target.value })} className="w-full rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900/70 px-4 py-3 text-sm text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-300" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-stone-600 dark:text-stone-400">Hour (0–23)</label>
                        <input type="number" min={0} max={23} value={fastDraft.hour} onChange={(e) => setFastDraft({ ...fastDraft, hour: e.target.value })} className="w-full rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-stone-800 dark:text-stone-200" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-stone-600 dark:text-stone-400">Minute</label>
                        <input type="number" min={0} max={59} value={fastDraft.minute} onChange={(e) => setFastDraft({ ...fastDraft, minute: e.target.value })} className="w-full rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-stone-800 dark:text-stone-200" />
                      </div>
                    </div>
                  </div>
                  {fastDraft.date && (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-700/40 p-4 text-sm text-amber-800 dark:text-amber-300">
                      Fast begins: <span className="font-bold">{format(getFastStartTime({ liturgyDate: fastDraft.date, liturgyHour: parseInt(fastDraft.hour) || 9, liturgyMinute: parseInt(fastDraft.minute) || 0 }), "EEEE, MMM d 'at' h:mm a")}</span>
                    </div>
                  )}
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={saveFastSettings} disabled={!fastDraft.date} className="flex-1 rounded-full bg-gradient-to-r from-[#c86224] to-[#e2a13c] py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_-10px_rgba(200,98,36,0.5)] hover:brightness-105 disabled:opacity-40">Save &amp; Start Timer</button>
                    {store.fastSettings && <button type="button" onClick={() => { persist({ ...store, fastSettings: null }); setPanel(null) }} className="rounded-full border border-stone-200 dark:border-stone-700 px-5 py-3 text-sm font-semibold text-stone-500 dark:text-stone-400 hover:text-red-500">Clear</button>}
                  </div>
                </>
              )}

              {/* Cycle Tracker */}
              {panel === "cycle" && (
                <>
                  <p className="text-sm text-stone-500 dark:text-stone-400 leading-6">Enter your last cycle start date. Your calendar will automatically show rest days — held with reverence in the Tewahedo tradition.</p>
                  <div className="space-y-3">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-stone-600 dark:text-stone-400">Last Cycle Start Date</label>
                      <input type="date" value={cycleDraft.startDate} onChange={(e) => setCycleDraft({ ...cycleDraft, startDate: e.target.value })} className="w-full rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900/70 px-4 py-3 text-sm text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-300" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-stone-600 dark:text-stone-400">Cycle length (days)</label>
                        <input type="number" min={21} max={40} value={cycleDraft.cycleLength} onChange={(e) => setCycleDraft({ ...cycleDraft, cycleLength: e.target.value })} className="w-full rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900/70 px-4 py-3 text-sm text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-300" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-stone-600 dark:text-stone-400">Period length (days)</label>
                        <input type="number" min={2} max={10} value={cycleDraft.periodLength} onChange={(e) => setCycleDraft({ ...cycleDraft, periodLength: e.target.value })} className="w-full rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900/70 px-4 py-3 text-sm text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-300" />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-rose-100 bg-rose-50 dark:border-rose-900/30 dark:bg-rose-950/20 p-4 text-xs leading-5 text-rose-700 dark:text-rose-300">
                    This data stays on your device only. In the Tewahedo tradition this is a season of reverence, not unworthiness.
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={saveCycleSettings} disabled={!cycleDraft.startDate} className="flex-1 rounded-full bg-gradient-to-r from-[#c86224] to-[#e2a13c] py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_-10px_rgba(200,98,36,0.5)] hover:brightness-105 disabled:opacity-40">Save Cycle</button>
                    {store.cycleSettings && <button type="button" onClick={() => { persist({ ...store, cycleSettings: null }); setCycleDraft({ startDate: "", cycleLength: "28", periodLength: "5" }); setPanel(null) }} className="rounded-full border border-stone-200 dark:border-stone-700 px-5 py-3 text-sm font-semibold text-stone-500 dark:text-stone-400 hover:text-red-500">Clear</button>}
                  </div>
                </>
              )}

              {/* Plan Communion */}
              {panel === "plan" && (
                <>
                  <p className="text-sm text-stone-500 dark:text-stone-400 leading-6">Pick a Sunday. The three days before become your preparation window on the calendar.</p>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-stone-600 dark:text-stone-400">Target Communion Date</label>
                    <input type="date" value={planDraft} min={format(addDays(today, 1), "yyyy-MM-dd")} onChange={(e) => setPlanDraft(e.target.value)} className="w-full rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900/70 px-4 py-3 text-sm text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-300" />
                  </div>
                  {!planDraft && !restricted && (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-700/40 p-4">
                      <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">Recommended</p>
                      <p className="text-sm font-bold text-amber-900 dark:text-amber-200">{format(nextRec, "EEEE, MMMM d")}</p>
                      <button type="button" onClick={() => setPlanDraft(format(nextRec, "yyyy-MM-dd"))} className="mt-2 text-xs font-semibold text-amber-600 dark:text-amber-400 underline">Use this date</button>
                    </div>
                  )}
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={savePlannedDate} disabled={!planDraft} className="flex-1 rounded-full bg-gradient-to-r from-[#c86224] to-[#e2a13c] py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_-10px_rgba(200,98,36,0.5)] hover:brightness-105 disabled:opacity-40">Set This Date</button>
                    {store.plannedDate && <button type="button" onClick={() => { persist({ ...store, plannedDate: null, checklist: emptyChecklist }); setPlanDraft(""); setPanel(null) }} className="rounded-full border border-stone-200 dark:border-stone-700 px-5 py-3 text-sm font-semibold text-stone-500 dark:text-stone-400 hover:text-red-500">Clear</button>}
                  </div>
                </>
              )}

              {/* Checklist */}
              {panel === "checklist" && (
                <>
                  <p className="text-sm text-stone-500 dark:text-stone-400 leading-6">
                    Check off each item as you complete it. When all four are done, your preparation days change to <span className="font-semibold text-emerald-700 dark:text-emerald-400">Ready</span> on the calendar.
                  </p>
                  <div className="space-y-2">
                    {checklistItems.map(({ key, label, sub }) => (
                      <button key={key} type="button" onClick={() => toggleGlobalChecklist(key)} className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-4 text-left transition ${store.checklist[key] ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800/40 dark:bg-emerald-950/20" : "border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-900/60"}`}>
                        {store.checklist[key]
                          ? <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                          : <Circle className="h-5 w-5 shrink-0 text-stone-200 dark:text-stone-600" />}
                        <div>
                          <p className={`text-sm font-semibold ${store.checklist[key] ? "line-through text-stone-400" : "text-stone-800 dark:text-stone-200"}`}>{label}</p>
                          <p className="text-[11px] mt-0.5 text-stone-400 dark:text-stone-500">{sub}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  {checklistDone ? (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 dark:border-emerald-800/40 dark:bg-emerald-950/20 p-4">
                      <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">All complete ✓</p>
                      <p className="mt-1 text-xs leading-5 text-emerald-700 dark:text-emerald-400">Your preparation days show as Ready on the calendar. Approach the altar with confidence — not in your own merit, but in the mercy of Christ who calls you.</p>
                    </div>
                  ) : (
                    <p className="text-center text-xs text-stone-400">{checklistCount} of 4 complete</p>
                  )}
                  {checklistCount > 0 && (
                    <button type="button" onClick={() => persist({ ...store, checklist: emptyChecklist })} className="w-full rounded-full border border-stone-200 dark:border-stone-700 py-3 text-sm font-semibold text-stone-400 hover:text-red-500 transition">
                      Reset Checklist
                    </button>
                  )}
                </>
              )}

              {/* Day detail */}
              {panel === "day" && selectedDay && selectedGuidance && (
                <div className="space-y-5">
                  {/* State badge */}
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${badgeStyle[selectedStateForBadge]}`}>
                    {isSelectedRest ? "Rest Period" : stateLabelFull[selectedState]}
                  </span>

                  <p className="text-sm leading-6 text-stone-600 dark:text-stone-300">{selectedGuidance.body}</p>

                  {/* Steps */}
                  {selectedSteps.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#8b6a2b] dark:text-amber-500">What to do</p>
                      {selectedSteps.map((step, i) => (
                        <div key={step.title} className="flex gap-3 rounded-2xl border border-stone-100 bg-stone-50/80 dark:border-stone-800 dark:bg-stone-900/60 p-3.5">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7c2d12] to-[#b45309] text-[10px] font-black text-white">{i + 1}</div>
                          <div>
                            <p className="text-xs font-bold text-stone-800 dark:text-stone-200">{step.title}</p>
                            <p className="mt-0.5 text-xs leading-5 text-stone-500 dark:text-stone-400">{step.description}</p>
                            {step.ref && <p className="mt-1 text-[10px] font-semibold text-[#8b6a2b] dark:text-amber-400">{step.ref}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Prayer */}
                  {selectedGuidance.prayer && (
                    <div className="rounded-2xl border border-amber-200/70 bg-amber-50/60 dark:bg-amber-950/20 dark:border-amber-700/30 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-amber-700 dark:text-amber-400 mb-2">Prayer</p>
                      <p className="text-sm italic leading-7 text-stone-700 dark:text-stone-300">&ldquo;{selectedGuidance.prayer}&rdquo;</p>
                    </div>
                  )}

                  {/* Day checklist */}
                  {selectedKey && (selectedState === "preparing" || selectedState === "ready") && (
                    <div>
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.26em] text-stone-500 dark:text-stone-400">Day checklist</p>
                      {(["confession", "fasting", "peace", "prayer"] as (keyof DayEntry["checklist"])[]).map((k) => {
                        const labels = { confession: "Confession (Nessaha)", fasting: "Fasting", peace: "Peace with others", prayer: "Prayer preparation" }
                        return (
                          <button key={k} type="button" onClick={() => toggleDayChecklist(selectedKey, k)} className={`flex w-full items-center gap-3 rounded-xl border px-4 py-2.5 text-left mb-1.5 text-sm transition ${selectedEntry.checklist[k] ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800/30 dark:bg-emerald-950/20" : "border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-900/40"}`}>
                            {selectedEntry.checklist[k] ? <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> : <Circle className="h-4 w-4 text-stone-200 dark:text-stone-600 shrink-0" />}
                            <span className={selectedEntry.checklist[k] ? "line-through text-stone-400" : "text-stone-800 dark:text-stone-200"}>{labels[k]}</span>
                          </button>
                        )
                      })}
                    </div>
                  )}

                  {/* Notes */}
                  {selectedKey && (
                    <div>
                      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.26em] text-stone-500 dark:text-stone-400">Private note</p>
                      <textarea rows={3} value={noteEdit || selectedEntry.note} onFocus={() => setNoteEdit(selectedEntry.note)} onChange={(e) => setNoteEdit(e.target.value)} onBlur={() => { if (noteEdit !== selectedEntry.note) saveDayNote(selectedKey) }} placeholder="Add a note for this day…" className="w-full resize-none rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900/60 px-4 py-3 text-sm placeholder:text-stone-300 dark:placeholder:text-stone-600 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-300" />
                    </div>
                  )}

                  {/* Actions */}
                  <div className="space-y-2 border-t border-stone-100 dark:border-stone-800 pt-4">
                    <button
                      type="button"
                      onClick={() => { logCommunion(selectedDay); setPanel(null) }}
                      className={`w-full rounded-full py-3.5 text-sm font-bold transition ${isCommunionLogged ? "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 dark:border-red-800/40 dark:bg-red-950/20 dark:text-red-400" : "bg-gradient-to-r from-[#c86224] to-[#e2a13c] text-white hover:brightness-105 shadow-lg shadow-orange-500/20"}`}
                    >
                      {isCommunionLogged ? "Remove Communion Record" : "Log Communion for This Day"}
                    </button>
                    {selectedKey && (
                      <button type="button" onClick={() => togglePauseDay(selectedKey)} className={`w-full rounded-full py-3 text-sm font-semibold transition border ${isPaused ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-700/40 dark:bg-amber-950/20 dark:text-amber-400" : "border-stone-200 bg-white text-stone-500 dark:border-stone-700 dark:bg-stone-900/50 dark:text-stone-400 hover:border-stone-300"}`}>
                        {isPaused ? "Remove Pause" : "Mark as Pause Day"}
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ── Page ─────────────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-6 sm:px-6">

        {/* Back */}
        <Link href="/holy-communion" className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-white/70 dark:bg-stone-900/50 dark:border-amber-500/20 px-4 py-2 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:border-amber-300 transition">
          <ArrowLeft className="h-3.5 w-3.5" /> Holy Communion
        </Link>

        {/* Profile banner */}
        {profile && eligibility && (
          <div className="mb-5">
            <CommunionProfileBanner profile={profile} eligibility={eligibility} onReset={() => setShowSetup(true)} />
          </div>
        )}

        {eligibility && !eligibility.canReceive && eligibility.severity === "blocked" ? null : (
          <div className="space-y-4">

            {/* ── Today card ─────────────────────────────────────────────── */}
            <div className="overflow-hidden rounded-[2rem] border border-[#d8c395] shadow-[0_24px_60px_-30px_rgba(120,53,15,0.3)] dark:border-amber-500/20"
              style={{ background: "linear-gradient(160deg,#fffcf5 0%,#fff5e2 55%,#fdefd5 100%)" }}>
              <div className="h-1 w-full bg-gradient-to-r from-[#7c2d12] via-[#d4a84f] to-[#0f766e]" />
              <div className="p-5 sm:p-6 dark:[background:linear-gradient(160deg,#1a0f07,#180e07)]">

                {/* Date + badge row */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#a6461f] dark:text-amber-500">{format(today, "EEEE, MMMM d")}</span>
                  {restricted ? (
                    <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-[11px] font-bold text-rose-800 dark:border-rose-800/40 dark:bg-rose-950/30 dark:text-rose-300">
                      Rest Period
                    </span>
                  ) : (
                    <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${badgeStyle[todayState]}`}>
                      {stateLabelFull[todayState]}
                    </span>
                  )}
                </div>

                {/* Headline */}
                <h1 className="text-[1.65rem] font-black leading-[1.15] tracking-tight text-[#3d2206] dark:text-[#f3e4cd]" style={{ fontFamily: serif }}>
                  {restricted ? (eligibility?.reason ?? "A season of rest") : todayGuidance.headline}
                </h1>

                {/* Key step sentence */}
                <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
                  {restricted ? eligibility?.guidance.split(".")[0] + "." : keyStep}
                </p>

                {/* Preparation progress bar */}
                {!restricted && prepDay && store.plannedDate && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">Preparation — Day {prepDay} of 3</span>
                      <span className="text-[11px] text-stone-400 dark:text-stone-500">{format(parseISO(store.plannedDate), "EEE, MMM d")}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-500" style={{ width: `${(prepDay / 3) * 100}%` }} />
                    </div>
                  </div>
                )}

                {/* Postpartum countdown */}
                {isInPostpartumPeriod(profile) && postpartumLeft !== null && postpartumLeft > 0 && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50/80 dark:border-rose-800/30 dark:bg-rose-950/20 px-4 py-2">
                    <span className="h-2 w-2 rounded-full bg-rose-400" />
                    <span className="text-sm font-bold text-rose-800 dark:text-rose-300">{postpartumLeft} days</span>
                    <span className="text-xs text-rose-600 dark:text-rose-400">until post-partum rest ends</span>
                  </div>
                )}

                {/* Fast timer */}
                {store.fastSettings && countdown !== null && (
                  <div className="mt-4 flex items-center gap-2.5">
                    <Clock className="h-3.5 w-3.5 text-orange-500 dark:text-orange-400 shrink-0" />
                    <span className="text-xs text-stone-500 dark:text-stone-400">{fastTarget && fastTarget.getTime() > Date.now() ? "Fast begins in" : "Liturgy in"}:</span>
                    <span className="text-base font-extrabold tabular-nums text-[#3d2206] dark:text-white">{formatCountdown(countdown)}</span>
                  </div>
                )}

                {/* Planned date chip */}
                {store.plannedDate && !prepDay && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/60 dark:bg-amber-950/20 dark:border-amber-700/30 px-4 py-2 text-sm">
                    <CalendarDays className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                    <span className="font-semibold text-stone-800 dark:text-stone-200">{format(parseISO(store.plannedDate), "EEEE, MMMM d")}</span>
                    <button type="button" onClick={() => setPanel("plan")} className="text-amber-500 hover:text-amber-700 ml-0.5"><Pencil className="h-3 w-3" /></button>
                  </div>
                )}

                {/* Primary CTA */}
                <div className="mt-5">
                  {!store.plannedDate && !restricted && (
                    <button type="button" onClick={() => setPanel("plan")} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#c86224] to-[#e2a13c] px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_24px_-10px_rgba(200,98,36,0.5)] hover:brightness-105 transition">
                      <CalendarDays className="h-4 w-4" />
                      Plan your next Communion
                    </button>
                  )}
                  {!restricted && prepDay && !checklistDone && (
                    <button type="button" onClick={() => setPanel("checklist")} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#c86224] to-[#e2a13c] px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_24px_-10px_rgba(200,98,36,0.5)] hover:brightness-105 transition">
                      <Sparkles className="h-4 w-4" />
                      Open Checklist — {checklistCount}/4 done
                    </button>
                  )}
                  {!restricted && todayState === "communion" && !store.communionEntries.some((e) => e.date === format(today, "yyyy-MM-dd")) && (
                    <button type="button" onClick={() => logCommunion(today)} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0f766e] to-[#0d9488] px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_24px_-10px_rgba(15,118,110,0.5)] hover:brightness-105 transition">
                      <CheckCircle2 className="h-4 w-4" />
                      Log today&apos;s Communion
                    </button>
                  )}
                  {!restricted && !prepDay && todayState !== "communion" && todaySteps.length > 0 && store.plannedDate && (
                    <button type="button" onClick={() => { setSelectedDay(today); setNoteEdit(""); setPanel("day") }} className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/60 dark:bg-amber-950/20 dark:border-amber-700/30 px-5 py-2.5 text-sm font-bold text-amber-800 dark:text-amber-300 hover:border-amber-300 transition">
                      See today&apos;s guidance
                    </button>
                  )}
                </div>

              </div>
            </div>

            {/* ── Stats strip ───────────────────────────────────────────── */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Streak", value: streak, sub: streak === 1 ? "communion" : "communions" },
                {
                  label: "Next",
                  value: restricted && postpartumLeft != null && postpartumLeft > 0
                    ? `${postpartumLeft}d`
                    : store.plannedDate && getDaysUntil(parseISO(store.plannedDate)) >= 0
                      ? getDaysUntil(parseISO(store.plannedDate)) === 0 ? "Today" : `${getDaysUntil(parseISO(store.plannedDate))}d`
                      : `${getDaysUntil(nextRec)}d`,
                  sub: restricted && postpartumLeft != null && postpartumLeft > 0
                    ? "until rest ends"
                    : store.plannedDate ? format(parseISO(store.plannedDate), "MMM d") : format(nextRec, "MMM d"),
                },
                { label: "Recorded", value: store.communionEntries.length, sub: "total" },
              ].map(({ label, value, sub }) => (
                <div key={label} className="rounded-2xl border border-[#e8d5a8] bg-white/80 dark:border-amber-500/20 dark:bg-stone-900/60 px-2 py-4 text-center shadow-[0_8px_24px_-16px_rgba(120,53,15,0.2)]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a6461f] dark:text-amber-400">{label}</p>
                  <p className="mt-0.5 text-2xl font-black text-[#3d2206] dark:text-amber-200">{value}</p>
                  <p className="mt-0.5 text-[10px] text-stone-400 dark:text-stone-500">{sub}</p>
                </div>
              ))}
            </div>

            {/* ── Calendar ──────────────────────────────────────────────── */}
            <div className="overflow-hidden rounded-[2rem] border border-[#d8c395] bg-white/90 dark:border-amber-500/20 dark:bg-stone-950/80 shadow-[0_16px_48px_-28px_rgba(120,53,15,0.22)]">
              {/* Legend */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-5 pt-5 pb-3">
                {[
                  { color: "rgb(245,158,11)", label: "Preparation" },
                  { color: "rgb(16,185,129)", label: "Communion" },
                  { color: "rgb(251,146,60)", label: "Post-Communion" },
                  { color: "rgb(251,113,133)", label: "Rest Period" },
                ].map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                    <span className="text-[10px] font-medium text-stone-500 dark:text-stone-400">{label}</span>
                  </div>
                ))}
              </div>

              {/* Month navigation */}
              <div className="flex items-center justify-between px-5 pb-3">
                <button type="button" onClick={() => setMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))} className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 dark:border-stone-700 text-stone-500 hover:bg-stone-50 dark:hover:bg-stone-800 transition">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <h2 className="text-base font-bold text-stone-900 dark:text-white" style={{ fontFamily: serif }}>{format(month, "MMMM yyyy")}</h2>
                <button type="button" onClick={() => setMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))} className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 dark:border-stone-700 text-stone-500 hover:bg-stone-50 dark:hover:bg-stone-800 transition">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 border-t border-stone-100 dark:border-stone-800">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <div key={i} className={`py-2 text-center text-[11px] font-bold uppercase tracking-wider ${i === 0 ? "text-orange-600 dark:text-amber-500" : "text-stone-400 dark:text-stone-500"}`}>{d}</div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-px bg-stone-100 dark:bg-stone-800/60 border-t border-stone-100 dark:border-stone-800">
                {calendarDays.map((date) => {
                  const inMonth = isSameMonth(date, month)
                  const isT = isToday(date)
                  const isSel = selectedDay ? isSameDay(date, selectedDay) : false
                  const isSunday = date.getDay() === 0
                  const dateKey = format(date, "yyyy-MM-dd")
                  const paused = dayData[dateKey]?.paused ?? false
                  const isCycleRest = isRestingDay(date, store.cycleSettings)
                  const isProfileRest = isProfileRestingDay(date, profile)
                  const isAnyRest = isCycleRest || isProfileRest
                  const rawState = getDayState(date, store)
                  const { bg, border, barColor } = getCellStyle(rawState, isAnyRest, paused, isSunday)

                  const shortLabel = paused ? "Pause" : isAnyRest ? "Rest" : getStateLabel(date, store)

                  return (
                    <button
                      key={date.toISOString()}
                      type="button"
                      onClick={() => { setSelectedDay(date); setNoteEdit(""); setPanel("day") }}
                      className={`relative flex flex-col justify-between min-h-[64px] sm:min-h-[72px] p-2 sm:p-2.5 text-left transition-all ${bg} ${!inMonth ? "opacity-30" : ""} ${isSel ? "ring-2 ring-inset ring-orange-500 dark:ring-amber-400 z-10" : ""} hover:brightness-[0.96] active:brightness-[0.92]`}
                    >
                      {/* Date number */}
                      <div className="flex items-start justify-between">
                        <span className={`text-sm font-bold leading-none ${isT ? "flex h-6 w-6 items-center justify-center rounded-full bg-orange-600 text-white text-xs" : isSunday && inMonth ? "text-orange-700 dark:text-amber-400" : "text-stone-700 dark:text-stone-200"}`}>
                          {format(date, "d")}
                        </span>
                      </div>

                      {/* Short label */}
                      {inMonth && shortLabel && (
                        <p className="text-[9px] font-semibold leading-tight text-stone-500 dark:text-stone-400 truncate">
                          {shortLabel}
                        </p>
                      )}

                      {/* State bar at bottom */}
                      {barColor !== "transparent" && inMonth && (
                        <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b" style={{ background: barColor }} />
                      )}

                      {/* Recommended Sunday dot */}
                      {isSunday && inMonth && !isAnyRest && !restricted && rawState === "neutral" && (
                        <div className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-orange-400 dark:bg-amber-500" />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Recommended note */}
              {!restricted && (
                <div className="flex items-center gap-2 px-5 py-3 border-t border-stone-100 dark:border-stone-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400 dark:bg-amber-500" />
                  <span className="text-[10px] text-stone-400 dark:text-stone-500">Orange dot = recommended Sunday to receive</span>
                </div>
              )}
            </div>

            {/* ── Action tiles ──────────────────────────────────────────── */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: <CalendarDays className="h-5 w-5" />,
                  color: "text-amber-700 dark:text-amber-400",
                  bg: "bg-amber-50 dark:bg-amber-950/30",
                  ring: "hover:border-amber-300 dark:hover:border-amber-600",
                  label: "Plan Date",
                  value: store.plannedDate ? format(parseISO(store.plannedDate), "EEE, MMM d") : "No date set",
                  onClick: () => setPanel("plan"),
                },
                {
                  icon: <Clock className="h-5 w-5" />,
                  color: "text-orange-700 dark:text-orange-400",
                  bg: "bg-orange-50 dark:bg-orange-950/30",
                  ring: "hover:border-orange-300 dark:hover:border-orange-600",
                  label: "Fast Timer",
                  value: countdown !== null && store.fastSettings ? formatCountdown(countdown) : "Set liturgy time",
                  onClick: () => setPanel("fast"),
                },
                {
                  icon: <Heart className="h-5 w-5" />,
                  color: "text-rose-600 dark:text-rose-400",
                  bg: "bg-rose-50 dark:bg-rose-950/30",
                  ring: "hover:border-rose-300 dark:hover:border-rose-700",
                  label: "Cycle Tracker",
                  value: store.cycleSettings ? `Every ${store.cycleSettings.cycleLength} days` : "Not set up",
                  onClick: () => setPanel("cycle"),
                },
                {
                  icon: <Sparkles className="h-5 w-5" />,
                  color: "text-emerald-600 dark:text-emerald-400",
                  bg: "bg-emerald-50 dark:bg-emerald-950/30",
                  ring: "hover:border-emerald-300 dark:hover:border-emerald-700",
                  label: "Checklist",
                  value: checklistDone ? "All complete ✓" : `${checklistCount} of 4 done`,
                  onClick: () => setPanel("checklist"),
                },
              ].map(({ icon, color, bg, ring, label, value, onClick }) => (
                <button key={label} type="button" onClick={onClick} className={`flex items-center gap-3 rounded-2xl border border-[#e8d5a8] dark:border-stone-700 bg-white/90 dark:bg-stone-900/60 p-4 text-left transition ${ring} shadow-[0_4px_16px_-8px_rgba(120,53,15,0.14)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-10px_rgba(120,53,15,0.18)]`}>
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bg} ${color}`}>{icon}</div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-900 dark:text-white">{label}</p>
                    <p className="mt-0.5 text-[11px] text-stone-400 dark:text-stone-500 truncate">{value}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* ── Communion History ─────────────────────────────────────── */}
            {communionDates.length > 0 && (
              <div className="rounded-2xl border border-[#e8d5a8] dark:border-amber-500/20 bg-white/80 dark:bg-stone-900/60 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <History className="h-4 w-4 text-[#7c2d12] dark:text-amber-400" />
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#8b6a2b] dark:text-amber-500">Communion History</h3>
                </div>
                <div className="space-y-2">
                  {communionDates.slice(0, 5).map((entry, i) => (
                    <div key={entry.date} className="flex items-center justify-between gap-3 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-900/60 px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                        <div>
                          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">{format(parseISO(entry.date), "MMMM d, yyyy")}</p>
                          {i === 0 && <p className="text-[10px] text-stone-400 dark:text-stone-500">Most recent</p>}
                        </div>
                      </div>
                      <button type="button" onClick={() => { const u = store.communionEntries.filter((e) => e.date !== entry.date); persist({ ...store, communionEntries: u }) }} className="rounded-full p-1.5 text-stone-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {communionDates.length > 5 && (
                    <p className="text-center text-[11px] text-stone-400 dark:text-stone-500">+ {communionDates.length - 5} more</p>
                  )}
                </div>
                <p className="mt-3 text-[10px] text-stone-300 dark:text-stone-600">All data stays on this device only.</p>
              </div>
            )}

            {/* ── Reset ─────────────────────────────────────────────────── */}
            <button
              type="button"
              onClick={() => {
                if (confirm("Clear all calendar data? This cannot be undone.")) {
                  localStorage.removeItem(RHYTHM_KEY)
                  localStorage.removeItem(DAY_NOTES_KEY)
                  setStore(defaultStore)
                  setDayData({})
                  setPlanDraft("")
                  setFastDraft({ date: "", hour: "9", minute: "0" })
                  setCycleDraft({ startDate: "", cycleLength: "28", periodLength: "5" })
                }
              }}
              className="w-full rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-transparent py-3 text-xs font-semibold text-stone-300 dark:text-stone-700 hover:text-red-500 hover:border-red-200 dark:hover:border-red-900/40 transition"
            >
              Reset All Data
            </button>

          </div>
        )}
      </div>
    </div>
  )
}
