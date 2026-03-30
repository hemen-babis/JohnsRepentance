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
  Flame,
  Heart,
  History,
  Pencil,
  Plus,
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
  getCurrentCycleDay,
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
} from "@/components/holy-communion/communion-profile"
import {
  CommunionProfileSetup,
  CommunionProfileBanner,
} from "@/components/holy-communion/communion-profile-setup"

// ─── Design tokens ────────────────────────────────────────────────────────────

const titleSerif = "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif"
const DAY_NOTES_KEY = "communion-day-notes-v1"

// ─── Per-day data (notes + checklist + pause) ────────────────────────────────

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
  try {
    const raw = localStorage.getItem(DAY_NOTES_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveDayNotes(data: Record<string, DayEntry>) {
  if (typeof window === "undefined") return
  localStorage.setItem(DAY_NOTES_KEY, JSON.stringify(data))
}

// ─── State labels & colors ────────────────────────────────────────────────────

const STATE_DOT: Record<RhythmState, string> = {
  neutral:   "bg-[rgba(163,163,163,0.52)]",
  preparing: "bg-yellow-500",
  ready:     "bg-emerald-500",
  resting:   "bg-rose-400",
  guarding:  "bg-orange-500",
  communion: "bg-emerald-500",
}

const STATE_BADGE: Record<RhythmState, { bg: string; text: string; border: string }> = {
  neutral:   { bg: "bg-stone-100 dark:bg-stone-800/60",     text: "text-stone-600 dark:text-stone-400",  border: "border-stone-200 dark:border-stone-700"   },
  preparing: { bg: "bg-amber-50 dark:bg-amber-950/20",      text: "text-amber-800 dark:text-amber-300",  border: "border-amber-200 dark:border-amber-700/40" },
  ready:     { bg: "bg-emerald-50 dark:bg-emerald-950/20",  text: "text-emerald-800 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-700/40" },
  resting:   { bg: "bg-rose-50 dark:bg-rose-950/20",        text: "text-rose-800 dark:text-rose-300",    border: "border-rose-200 dark:border-rose-700/40"   },
  guarding:  { bg: "bg-orange-50 dark:bg-orange-950/20",    text: "text-orange-800 dark:text-orange-300", border: "border-orange-200 dark:border-orange-700/40" },
  communion: { bg: "bg-emerald-50 dark:bg-emerald-950/20",  text: "text-emerald-800 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-700/40" },
}

function getStateLabel(date: Date, store: RhythmStore): string {
  const d = startOfDay(date)
  const state = getDayState(date, store)
  if (state === "communion") return "Communion Day"
  if (state === "guarding") {
    const last = getLastCommunionDate(store)
    if (last) {
      const diff = differenceInCalendarDays(d, last)
      return `Post-Communion Day ${diff}`
    }
    return "Post-Communion"
  }
  if (state === "preparing" || state === "ready") {
    if (store.plannedDate) {
      const planned = parseISO(store.plannedDate)
      const diff = differenceInCalendarDays(planned, d)
      if (diff >= 1 && diff <= 3) return `Preparation Day ${4 - diff}`
    }
    return state === "ready" ? "Ready Day" : "Preparation Day"
  }
  if (state === "resting") return "Rest Day"
  return "Neutral Day"
}

// ─── Detailed guidance steps ──────────────────────────────────────────────────

type GuidanceStep = { title: string; description: string; ref?: string }

function getDetailedSteps(state: RhythmState, store: RhythmStore, date: Date): GuidanceStep[] {
  const d = startOfDay(date)
  if (state === "preparing") {
    let prepDay = 1
    if (store.plannedDate) {
      const diff = differenceInCalendarDays(parseISO(store.plannedDate), d)
      prepDay = 4 - diff
    }
    if (prepDay === 1) return [
      { title: "Begin the fast", description: "Abstain from meat, dairy, and all animal products. Fast with sincerity, not only habit." },
      { title: "Examine your conscience", description: "Sit quietly. Who did you wrong this week? What thoughts were given shelter that should not have been?" },
      { title: "Read Psalm 51", description: "The psalm of repentance. Read it slowly, as a personal confession before God.", ref: "Psalm 51" },
      { title: "Pray the Kidase preparation prayer", description: "Begin the liturgical preparation rhythm your church prescribes." },
    ]
    if (prepDay === 2) return [
      { title: "Deepen the fast", description: "No food or drink until midday or 3 pm. Pray the fast — don't just keep it mechanically." },
      { title: "Seek peace with others", description: "\"If you bring your gift to the altar and remember your brother has something against you…\" (Matt 5:23). Resolve it today." },
      { title: "Attend Vespers if possible", description: "If your parish holds evening prayers, attend tonight. The church's rhythm is already preparing you." },
      { title: "Read the Sunday Qidase readings", description: "Know the scriptures before you enter the Divine Liturgy. Let the Word go before you." },
    ]
    return [
      { title: "Go to Confession (Nessaha)", description: "This is the gate of Holy Communion. You must pass through it. Find your spiritual father today." },
      { title: "Fast from midnight", description: "After midnight tonight: no food, no water. This is the Tewahedo fast before receiving the Body of Christ." },
      { title: "Recite the Tezekar", description: "Pray the liturgical prayers appointed for the night before Communion." },
      { title: "Rest your mind", description: "No argument, no screens, no noise after evening prayer. Sleep as someone preparing to receive the King of Heaven." },
    ]
  }
  if (state === "ready") return [
    { title: "Go to Confession if not yet done", description: "Today is the day. This is the gate — do not approach without it." },
    { title: "Fast from midnight tonight", description: "Tonight: no food, no water. Prepare your body as you have prepared your heart." },
    { title: "Pray the preparation prayers", description: "The appointed prayers bring the liturgy into your home before you enter the church." },
    { title: "Rest and be still", description: "The preparation is complete. Rest in the peace of God." },
  ]
  if (state === "communion") return [
    { title: "Arrive before the Liturgy begins", description: "Do not rush into the presence of God. Be there before the deacons take their place." },
    { title: "Stand with reverence throughout", description: "The Qidase is a descent of Heaven. No phone, no wandering. This is the Holy of Holies." },
    { title: "Receive with crossed arms", description: "Arms crossed over the chest: a sign of unworthiness. You are not taking — you are receiving a gift you did not earn." },
    { title: "Guard what you have received", description: "Do not eat or drink immediately after. Spend time in prayer and thanksgiving. The Body of Christ is within you." },
  ]
  if (state === "guarding") {
    const last = getLastCommunionDate(store)
    const day = last ? differenceInCalendarDays(d, last) : 1
    if (day === 1) return [
      { title: "Break your fast gently", description: "The body has been a temple. Begin with simple, gentle food. No feast, no rush." },
      { title: "Watch your tongue carefully", description: "Idle talk, anger, and noise are enemies of the grace you carry. Every word today matters more." },
      { title: "Pray a thanksgiving prayer", description: "A psalm, a Mezmur, or a quiet thank-you. You received the Body and Blood of Christ." },
      { title: "Read about a Saint", description: "Spend time with the lives of those who guarded communion with holiness." },
    ]
    if (day === 2) return [
      { title: "Return to your regular rhythm", description: "The liturgy has sent you back into the world. Go — but carry the Kingdom inside you." },
      { title: "Remember what you received", description: "You are a communicant. That is your identity before you are anything else today." },
      { title: "Plan your next Communion", description: "When will you receive again? Plan it now, while the grace is still fresh." },
    ]
    return [
      { title: "Carry the grace forward", description: "The guarding season closes today. Let it not be the end of attentiveness — carry it as a daily rhythm." },
      { title: "Speak with your spiritual father", description: "Share what you received and how you guarded it. This builds the relationship." },
    ]
  }
  if (state === "resting") return [
    { title: "Do not condemn yourself", description: "This is a season the Tewahedo tradition holds with gentleness and reverence. God is not far from you." },
    { title: "Pray simply", description: "\"Lord Jesus Christ, Son of God, have mercy on me, a sinner.\" This is enough for today." },
    { title: "Rest fully", description: "Use this season for quiet reading, prayer, and preparation for the days ahead." },
  ]
  return [
    { title: "Schedule your next Communion", description: "Set a date. Tell your spiritual father. Make it intentional — do not let it remain a vague intention." },
    { title: "Keep the daily rhythm", description: "Morning prayer, evening prayer, the sign of the cross. The rhythm is itself a form of preparation." },
    { title: "Read Psalm 51 or 91", description: "Let the Word begin preparing the soil of your heart before the season of preparation arrives.", ref: "Psalm 51 or 91" },
  ]
}

// ─── Fast countdown ───────────────────────────────────────────────────────────

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

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CommunionCalendarPage() {
  const [store, setStore] = useState<RhythmStore>(defaultStore)
  const [dayData, setDayData] = useState<Record<string, DayEntry>>({})
  const [month, setMonth] = useState(() => startOfDay(new Date()))
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [panel, setPanel] = useState<"day" | "fast" | "cycle" | "plan" | null>(null)
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
    const savedProfile = loadProfile()
    if (savedProfile) setProfile(savedProfile)
    else setShowSetup(true)
    setHydrated(true)
  }, [])

  const persist = useCallback((updated: RhythmStore) => { setStore(updated); persistStore(updated) }, [])

  const persistDayData = useCallback((updated: Record<string, DayEntry>) => { setDayData(updated); saveDayNotes(updated) }, [])

  const today = startOfDay(new Date())
  const todayState = hydrated ? getDayState(today, store) : "neutral"
  const todayGuidance = getGuidanceForState(todayState, store.checklist)
  const todaySteps = hydrated ? getDetailedSteps(todayState, store, today) : []
  const todayBadge = STATE_BADGE[todayState]
  const streak = getCommunionStreak(store)
  const nextRec = getNextRecommendedDate(store)
  const lastComm = getLastCommunionDate(store)
  const communionDates = [...store.communionEntries].sort((a, b) => b.date.localeCompare(a.date))
  const fastTarget = store.fastSettings ? getFastStartTime(store.fastSettings) : null
  const liturgyTarget = store.fastSettings ? getLiturgyTime(store.fastSettings) : null
  const countdownTarget = fastTarget && fastTarget.getTime() > Date.now() ? fastTarget : liturgyTarget && liturgyTarget.getTime() > Date.now() ? liturgyTarget : null
  const countdown = useLiveCountdown(countdownTarget)
  const checklistDone = isChecklistComplete(store.checklist)
  const eligibility = profile ? checkEligibility(profile) : null
  const calendarDays = getMonthGrid(month)
  const purityRestriction =
    profile?.gender === "female" && profile.femaleOnMenstrualCycle
      ? "menstrual"
      : profile?.gender === "male" && profile.maleHasNocturnalEmission
        ? "emission"
        : null
  const isPurityRestricted = Boolean(purityRestriction)
  const purityRestrictionMessage =
    purityRestriction === "menstrual"
      ? "you are observing a menstrual rest. Clear the flag in your profile once the cycle ends to see recommendations again."
      : purityRestriction === "emission"
        ? "you are observing the cleansing period after a nocturnal emission. Update the profile once you are ready."
        : undefined

  // ─── Actions ──────────────────────────────────────────────────────────────

  function toggleGlobalChecklist(key: keyof PrepChecklist) {
    persist({ ...store, checklist: { ...store.checklist, [key]: !store.checklist[key] } })
  }

  function toggleDayChecklist(dateKey: string, key: keyof DayEntry["checklist"]) {
    const entry = dayData[dateKey] ?? emptyDayEntry()
    const updated = { ...dayData, [dateKey]: { ...entry, checklist: { ...entry.checklist, [key]: !entry.checklist[key] } } }
    persistDayData(updated)
    setDayData(updated)
  }

  function togglePauseDay(dateKey: string) {
    const entry = dayData[dateKey] ?? emptyDayEntry()
    const updated = { ...dayData, [dateKey]: { ...entry, paused: !entry.paused } }
    persistDayData(updated)
    setDayData(updated)
  }

  function saveDayNote(dateKey: string) {
    const entry = dayData[dateKey] ?? emptyDayEntry()
    const updated = { ...dayData, [dateKey]: { ...entry, note: noteEdit } }
    persistDayData(updated)
    setDayData(updated)
  }

  function logCommunion(date: Date) {
    const key = format(date, "yyyy-MM-dd")
    const already = store.communionEntries.some((e) => e.date === key)
    const entries = already ? store.communionEntries.filter((e) => e.date !== key) : [...store.communionEntries, { date: key }]
    persist({ ...store, communionEntries: entries, plannedDate: already ? store.plannedDate : null, checklist: already ? store.checklist : emptyChecklist })
  }

  function saveFastSettings() {
    const settings: FastSettings = { liturgyDate: fastDraft.date, liturgyHour: parseInt(fastDraft.hour, 10), liturgyMinute: parseInt(fastDraft.minute, 10) }
    persist({ ...store, fastSettings: settings })
    setPanel(null)
  }

  function saveCycleSettings() {
    const settings: CycleSettings = { startDate: cycleDraft.startDate, cycleLength: parseInt(cycleDraft.cycleLength, 10), periodLength: parseInt(cycleDraft.periodLength, 10) }
    persist({ ...store, cycleSettings: settings })
    setPanel(null)
  }

  function savePlannedDate() {
    persist({ ...store, plannedDate: planDraft || null, checklist: planDraft ? store.checklist : emptyChecklist })
    setPanel(null)
  }

  // ─── Profile gate ─────────────────────────────────────────────────────────

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[url('/images/mobile-parch.png?v=20260321')] bg-cover md:bg-[url('/images/parchment-bg.png?v=20260321')] dark:bg-none dark:bg-stone-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-300 border-t-orange-600" />
      </div>
    )
  }

  if (showSetup) {
    return (
      <div className="min-h-screen bg-[url('/images/mobile-parch.png?v=20260321')] bg-cover bg-center md:bg-[url('/images/parchment-bg.png?v=20260321')] dark:bg-none dark:bg-gradient-to-b dark:from-[#120d09] dark:via-[#1a0f08] dark:to-[#120d09] px-4 py-16">
        <div className="mx-auto max-w-xl">
          <Link href="/holy-communion" className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-white/70 dark:bg-stone-900/50 dark:border-amber-500/20 px-4 py-2 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:border-amber-300 transition">
            <ArrowLeft className="h-3.5 w-3.5" />
            Holy Communion
          </Link>
          <CommunionProfileSetup onComplete={(p) => { setProfile(p); setShowSetup(false) }} />
        </div>
      </div>
    )
  }

  // ─── Day panel data ────────────────────────────────────────────────────────

  const selectedKey = selectedDay ? format(selectedDay, "yyyy-MM-dd") : null
  const selectedState = selectedDay ? getDayState(selectedDay, store) : "neutral"
  const selectedBadge = STATE_BADGE[selectedState]
  const selectedLabel = selectedDay ? getStateLabel(selectedDay, store) : ""
  const selectedGuidance = selectedDay ? getGuidanceForState(selectedState, store.checklist) : null
  const selectedSteps = selectedDay ? getDetailedSteps(selectedState, store, selectedDay) : []
  const selectedDayEntry = selectedKey ? (dayData[selectedKey] ?? emptyDayEntry()) : emptyDayEntry()
  const isCommunionLogged = selectedKey ? store.communionEntries.some((e) => e.date === selectedKey) : false
  const isPaused = selectedDayEntry.paused

  return (
    <div className="min-h-screen bg-[url('/images/mobile-parch.png?v=20260321')] bg-cover bg-center text-stone-900 md:bg-[url('/images/parchment-bg.png?v=20260321')] dark:bg-none dark:bg-gradient-to-b dark:from-[#120d09] dark:via-[#1a0f08] dark:to-[#120d09] dark:text-white">

      {/* ── Slide panel overlay ─────────────────────────────────────────── */}
      {panel && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" onClick={() => setPanel(null)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-lg rounded-t-[2rem] sm:rounded-[2rem] border border-amber-200/60 bg-white/97 dark:bg-[#1a100a] dark:border-amber-500/20 p-6 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setPanel(null)} className="absolute right-4 top-4 rounded-full p-2 text-stone-400 hover:text-stone-700"><X className="h-5 w-5" /></button>

            {/* Fast Timer */}
            {panel === "fast" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-stone-900 dark:text-white" style={{ fontFamily: titleSerif }}>18-Hour Fast Timer</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-6">Enter your Liturgy date and time. We'll show when your fast should begin (18 hours before).</p>
                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-stone-600 dark:text-stone-400">Liturgy Date</label>
                    <input type="date" value={fastDraft.date} onChange={(e) => setFastDraft({ ...fastDraft, date: e.target.value })} className="w-full rounded-xl border border-stone-200 dark:border-stone-700 bg-white/70 dark:bg-stone-900/50 px-4 py-2.5 text-sm text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-300" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-stone-600 dark:text-stone-400">Hour (0–23)</label>
                      <input type="number" min={0} max={23} value={fastDraft.hour} onChange={(e) => setFastDraft({ ...fastDraft, hour: e.target.value })} className="w-full rounded-xl border border-stone-200 dark:border-stone-700 bg-white/70 dark:bg-stone-900/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-stone-800 dark:text-stone-200" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-stone-600 dark:text-stone-400">Minute</label>
                      <input type="number" min={0} max={59} value={fastDraft.minute} onChange={(e) => setFastDraft({ ...fastDraft, minute: e.target.value })} className="w-full rounded-xl border border-stone-200 dark:border-stone-700 bg-white/70 dark:bg-stone-900/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-stone-800 dark:text-stone-200" />
                    </div>
                  </div>
                </div>
                {fastDraft.date && (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50/70 dark:bg-amber-950/20 dark:border-amber-500/20 p-4 text-sm text-amber-800 dark:text-amber-300">
                    Fast begins: <span className="font-bold">{format(getFastStartTime({ liturgyDate: fastDraft.date, liturgyHour: parseInt(fastDraft.hour) || 9, liturgyMinute: parseInt(fastDraft.minute) || 0 }), "EEEE, MMM d 'at' h:mm a")}</span>
                  </div>
                )}
                <div className="flex gap-3">
                  <button type="button" onClick={saveFastSettings} disabled={!fastDraft.date} className="flex-1 rounded-full bg-gradient-to-r from-[#c86224] to-[#e2a13c] py-3 text-sm font-bold text-white hover:brightness-105 disabled:opacity-40">Save &amp; Start Timer</button>
                  {store.fastSettings && <button type="button" onClick={() => { persist({ ...store, fastSettings: null }); setPanel(null) }} className="rounded-full border border-stone-200 dark:border-stone-700 px-5 py-3 text-sm font-semibold text-stone-600 dark:text-stone-400">Clear</button>}
                </div>
              </div>
            )}

            {/* Cycle Tracker */}
            {panel === "cycle" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-stone-900 dark:text-white" style={{ fontFamily: titleSerif }}>Cycle Tracker</h2>
                <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">Enter your last cycle start date. Rest days will be automatically marked on the calendar.</p>
                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-stone-600 dark:text-stone-400">Last Cycle Start Date</label>
                    <input type="date" value={cycleDraft.startDate} onChange={(e) => setCycleDraft({ ...cycleDraft, startDate: e.target.value })} className="w-full rounded-xl border border-stone-200 dark:border-stone-700 bg-white/70 dark:bg-stone-900/50 px-4 py-2.5 text-sm text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-300" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-stone-600 dark:text-stone-400">Cycle Length (days)</label>
                      <input type="number" min={21} max={40} value={cycleDraft.cycleLength} onChange={(e) => setCycleDraft({ ...cycleDraft, cycleLength: e.target.value })} className="w-full rounded-xl border border-stone-200 dark:border-stone-700 bg-white/70 dark:bg-stone-900/50 px-4 py-2.5 text-sm text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-300" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-stone-600 dark:text-stone-400">Period Length (days)</label>
                      <input type="number" min={2} max={10} value={cycleDraft.periodLength} onChange={(e) => setCycleDraft({ ...cycleDraft, periodLength: e.target.value })} className="w-full rounded-xl border border-stone-200 dark:border-stone-700 bg-white/70 dark:bg-stone-900/50 px-4 py-2.5 text-sm text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-300" />
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-rose-100 bg-rose-50/60 dark:border-rose-800/30 dark:bg-rose-950/20 p-4 text-xs leading-5 text-rose-700 dark:text-rose-300">
                  This data stays on your device only. In the Tewahedo tradition this is a season of reverence, not unworthiness.
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={saveCycleSettings} disabled={!cycleDraft.startDate} className="flex-1 rounded-full bg-gradient-to-r from-[#c86224] to-[#e2a13c] py-3 text-sm font-bold text-white hover:brightness-105 disabled:opacity-40">Save Cycle</button>
                  {store.cycleSettings && <button type="button" onClick={() => { persist({ ...store, cycleSettings: null }); setCycleDraft({ startDate: "", cycleLength: "28", periodLength: "5" }); setPanel(null) }} className="rounded-full border border-stone-200 dark:border-stone-700 px-5 py-3 text-sm font-semibold text-stone-600 dark:text-stone-400">Clear</button>}
                </div>
              </div>
            )}

            {/* Plan Communion */}
            {panel === "plan" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-stone-900 dark:text-white" style={{ fontFamily: titleSerif }}>Plan Next Communion</h2>
                <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">Set a target date. The three days before become your preparation window on the calendar.</p>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-stone-600 dark:text-stone-400">Target Communion Date</label>
                  <input type="date" value={planDraft} min={format(addDays(today, 1), "yyyy-MM-dd")} onChange={(e) => setPlanDraft(e.target.value)} className="w-full rounded-xl border border-stone-200 dark:border-stone-700 bg-white/70 dark:bg-stone-900/50 px-4 py-2.5 text-sm text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-300" />
                </div>
                {!planDraft && (
                  isPurityRestricted ? (
                    <div className="rounded-2xl border border-stone-200 bg-stone-50/80 dark:bg-stone-900/80 dark:border-stone-700 p-4 text-sm text-stone-600 dark:text-stone-300">
                      <p className="font-semibold text-stone-800 dark:text-stone-200">
                        {purityRestrictionMessage
                          ? `Recommendations are hidden while ${purityRestrictionMessage}`
                          : "Recommendations are hidden while a temporary rest period is active."
                        }
                      </p>
                      <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                        You can still set a date manually or revisit this panel once the rest period ends.
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-amber-200/60 bg-amber-50/60 dark:bg-amber-950/20 dark:border-amber-500/20 p-4 text-sm text-amber-700 dark:text-amber-400">
                      Recommended: <span className="font-bold">{format(nextRec, "EEEE, MMMM d")}</span>
                      <button type="button" onClick={() => setPlanDraft(format(nextRec, "yyyy-MM-dd"))} className="ml-2 underline">Use this</button>
                    </div>
                  )
                )}
                <div className="flex gap-3">
                  <button type="button" onClick={savePlannedDate} disabled={!planDraft} className="flex-1 rounded-full bg-gradient-to-r from-[#c86224] to-[#e2a13c] py-3 text-sm font-bold text-white hover:brightness-105 disabled:opacity-40">Set This Date</button>
                  {store.plannedDate && <button type="button" onClick={() => { persist({ ...store, plannedDate: null, checklist: emptyChecklist }); setPlanDraft(""); setPanel(null) }} className="rounded-full border border-stone-200 dark:border-stone-700 px-5 py-3 text-sm font-semibold text-stone-600 dark:text-stone-400">Clear</button>}
                </div>
              </div>
            )}

            {/* Day Detail Panel */}
            {panel === "day" && selectedDay && selectedGuidance && (
              <div className="space-y-5">
                {/* Header */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">{format(selectedDay, "EEEE, MMMM d, yyyy")}</p>
                  <span className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-bold ${selectedBadge.bg} ${selectedBadge.border} ${selectedBadge.text}`}>{selectedLabel}</span>
                  <h2 className="mt-3 text-2xl font-bold text-stone-900 dark:text-white" style={{ fontFamily: titleSerif }}>{selectedGuidance.headline}</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">{selectedGuidance.body}</p>
                </div>

                {/* Guidance steps */}
                {selectedSteps.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#8b6a2b] dark:text-amber-500">What to do</p>
                    {selectedSteps.map((step, i) => (
                      <div key={step.title} className="flex gap-3 rounded-[1.1rem] border border-[#ead8b6] bg-white/70 dark:border-amber-500/15 dark:bg-stone-900/50 p-3">
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
                  <div className="rounded-2xl border border-amber-200/60 bg-amber-50/60 dark:bg-amber-950/20 dark:border-amber-500/20 p-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-1.5">Prayer</p>
                    <p className="text-sm italic leading-7 text-stone-700 dark:text-stone-300">"{selectedGuidance.prayer}"</p>
                  </div>
                )}

                {/* Per-day checklist */}
                {selectedKey && (selectedState === "preparing" || selectedState === "ready") && (
                  <div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">Preparation checklist</p>
                    {(["confession", "fasting", "peace", "prayer"] as (keyof DayEntry["checklist"])[]).map((k) => {
                      const labels = { confession: "Confession (Nessaha)", fasting: "Fasting", peace: "Peace with others", prayer: "Prayer preparation" }
                      return (
                        <button key={k} type="button" onClick={() => toggleDayChecklist(selectedKey, k)} className={`flex w-full items-center gap-3 rounded-xl border px-4 py-2.5 text-left mb-1.5 transition text-sm ${selectedDayEntry.checklist[k] ? "border-emerald-200 bg-emerald-50/80 dark:border-emerald-800/30 dark:bg-emerald-950/20" : "border-stone-200 bg-white/60 dark:border-stone-700 dark:bg-stone-900/40"}`}>
                          {selectedDayEntry.checklist[k] ? <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> : <Circle className="h-4 w-4 text-stone-300 shrink-0" />}
                          <span className={selectedDayEntry.checklist[k] ? "line-through text-stone-400" : "text-stone-800 dark:text-stone-200"}>{labels[k]}</span>
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* Notes */}
                {selectedKey && (
                  <div>
                    <p className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">Notes</p>
                    <textarea
                      rows={3}
                      value={noteEdit || selectedDayEntry.note}
                      onFocus={() => setNoteEdit(selectedDayEntry.note)}
                      onChange={(e) => setNoteEdit(e.target.value)}
                      onBlur={() => { if (noteEdit !== selectedDayEntry.note) saveDayNote(selectedKey); }}
                      placeholder="Add a private note for this day…"
                      className="w-full resize-none rounded-xl border border-stone-200 dark:border-stone-700 bg-white/70 dark:bg-stone-900/50 px-4 py-3 text-sm text-stone-800 dark:text-stone-200 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-2 border-t border-stone-100 dark:border-stone-800 pt-4">
                  <button
                    type="button"
                    onClick={() => { logCommunion(selectedDay); setPanel(null) }}
                    className={`w-full rounded-full py-3 text-sm font-bold transition ${isCommunionLogged ? "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 dark:border-red-800/40 dark:bg-red-950/20 dark:text-red-400" : "bg-gradient-to-r from-[#c86224] to-[#e2a13c] text-white hover:brightness-105 shadow-lg shadow-orange-500/20"}`}
                  >
                    {isCommunionLogged ? "Remove Communion Record" : "Log Communion for This Day"}
                  </button>
                  {selectedKey && (
                    <button type="button" onClick={() => togglePauseDay(selectedKey)} className={`w-full rounded-full py-2.5 text-sm font-semibold transition border ${isPaused ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-700/40 dark:bg-amber-950/20 dark:text-amber-400" : "border-stone-200 bg-white/70 text-stone-600 dark:border-stone-700 dark:bg-stone-900/50 dark:text-stone-400"}`}>
                      {isPaused ? "Remove Pause" : "Mark as Pause Day"}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Page ──────────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1200px] px-4 pb-20 pt-6 sm:px-6">

        {/* Back link */}
        <Link href="/holy-communion" className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-white/70 dark:bg-stone-900/50 dark:border-amber-500/20 px-4 py-2 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:border-amber-300 transition">
          <ArrowLeft className="h-3.5 w-3.5" />
          Holy Communion
        </Link>

        {/* Eligibility banner */}
        {profile && eligibility && (
          <div className="mb-5">
            <CommunionProfileBanner profile={profile} eligibility={eligibility} onReset={() => setShowSetup(true)} />
          </div>
        )}

        {/* Blocked: hide calendar */}
        {eligibility && !eligibility.canReceive && eligibility.severity === "blocked" ? null : (
          <>
            {/* ── Today hero ──────────────────────────────────────────── */}
            <div className="mb-5 overflow-hidden rounded-[2rem] border border-[#d8c395] bg-[linear-gradient(160deg,#fffcf5_0%,#fff4e0_55%,#fdf0d8_100%)] shadow-[0_30px_80px_-40px_rgba(120,53,15,0.32)] dark:border-amber-500/20 dark:bg-[linear-gradient(160deg,#1a0f07,#180e07)]">
              <div className="h-1.5 w-full bg-gradient-to-r from-[#7c2d12] via-[#d4a84f] to-[#0f766e]" />
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7c2d12]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-[#7c2d12] dark:bg-amber-500/10 dark:text-amber-400">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Today — {format(today, "MMMM d, yyyy")}
                  </span>
                  <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold ${todayBadge.bg} ${todayBadge.border} ${todayBadge.text}`}>
                    {getStateLabel(today, store)}
                  </span>
                </div>
                <h1 className="text-3xl font-black tracking-tight text-[#3d2206] dark:text-[#f3e4cd] md:text-4xl" style={{ fontFamily: titleSerif }}>
                  {todayGuidance.headline}
                </h1>
                <p className="mt-2 text-base text-stone-600 dark:text-stone-400">{todayGuidance.body}</p>

                {/* Fast timer inline */}
                {store.fastSettings && countdown !== null && (
                  <div className="mt-4 flex items-center gap-3">
                    <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400 shrink-0" />
                    <span className="text-xs text-stone-500 dark:text-stone-400">{fastTarget && fastTarget.getTime() > Date.now() ? "Fast begins in" : "Liturgy in"}:</span>
                    <span className="text-lg font-extrabold tabular-nums text-gray-900 dark:text-white">{formatCountdown(countdown)}</span>
                  </div>
                )}

                {/* Planned date */}
                {store.plannedDate && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/60 dark:bg-amber-950/20 dark:border-amber-500/20 px-4 py-2 text-sm">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">Planned:</span>
                    <span className="font-semibold text-stone-800 dark:text-stone-200">{format(parseISO(store.plannedDate), "EEEE, MMMM d")}</span>
                    <button type="button" onClick={() => setPanel("plan")} className="ml-1 text-amber-600 hover:text-amber-800"><Pencil className="h-3.5 w-3.5" /></button>
                  </div>
                )}

                {/* Today's steps */}
                {todaySteps.length > 0 && (
                  <div className="mt-5 border-t border-[#e8d5a8] pt-5 dark:border-amber-500/15">
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#8b6a2b] dark:text-amber-500">What to do today</p>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      {todaySteps.map((step, i) => (
                        <div key={step.title} className="flex gap-3 rounded-[1.25rem] border border-[#ead8b6] bg-white/70 p-4 dark:border-amber-500/15 dark:bg-stone-900/50">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7c2d12] to-[#b45309] text-[11px] font-black text-white">{i + 1}</div>
                          <div>
                            <p className="text-[13px] font-bold text-[#3d2206] dark:text-[#f3e4cd]">{step.title}</p>
                            <p className="mt-1 text-xs leading-5 text-stone-600 dark:text-stone-400">{step.description}</p>
                            {step.ref && <p className="mt-1 text-[11px] font-semibold text-[#8b6a2b] dark:text-amber-400">{step.ref}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Stats ────────────────────────────────────────────────── */}
            <div className="mb-5 grid grid-cols-3 gap-3">
              {[
                { label: "Streak", value: streak, sub: "communions" },
                { label: "Next Communion", value: store.plannedDate && getDaysUntil(parseISO(store.plannedDate)) >= 0 ? (getDaysUntil(parseISO(store.plannedDate)) === 0 ? "Today" : `${getDaysUntil(parseISO(store.plannedDate))}d`) : `${getDaysUntil(nextRec)}d`, sub: store.plannedDate ? format(parseISO(store.plannedDate), "MMM d") : format(nextRec, "MMM d") },
                { label: "Recorded", value: store.communionEntries.length, sub: "communions" },
              ].map(({ label, value, sub }) => (
                <div key={label} className="rounded-[1.5rem] border border-[#e8d5a8] bg-white/80 px-3 py-4 text-center shadow-[0_14px_34px_-22px_rgba(120,53,15,0.22)] dark:border-amber-500/20 dark:bg-stone-900/60">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#a6461f] dark:text-amber-400">{label}</p>
                  <p className="mt-1 text-2xl font-black text-[#3d2206] dark:text-amber-200">{value}</p>
                  <p className="mt-0.5 text-[10px] text-stone-500 dark:text-stone-400">{sub}</p>
                </div>
              ))}
            </div>

            {/* ── Calendar + sidebar ───────────────────────────────────── */}
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">

              {/* Calendar */}
              <div className="rounded-[1.85rem] border border-[#d8c395] bg-white/80 p-4 shadow-[0_20px_50px_-36px_rgba(120,53,15,0.26)] dark:border-amber-500/20 dark:bg-stone-950/70 md:p-5">
                {/* Header */}
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900 dark:text-white">Communion Calendar</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">A gentle monthly view of preparation and reverence.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => setMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 dark:border-stone-700 text-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800">
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="min-w-[9rem] text-center text-sm font-semibold text-stone-800 dark:text-stone-200">{format(month, "MMMM yyyy")}</span>
                    <button type="button" onClick={() => setMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 dark:border-stone-700 text-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Day headers */}
                <div className="mb-2 grid grid-cols-7 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400 md:text-xs">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <div key={d} className="py-2">{d}</div>)}
                </div>

                {/* Day cells */}
                <div className="grid grid-cols-7 gap-1.5 md:gap-2">
                  {calendarDays.map((date) => {
                    const inMonth = isSameMonth(date, month)
                    const isT = isToday(date)
                    const isSel = selectedDay ? isSameDay(date, selectedDay) : false
                    const isSunday = date.getDay() === 0
                    const dateKey = format(date, "yyyy-MM-dd")
                    const state = getDayState(date, store)
                    const paused = dayData[dateKey]?.paused ?? false
                    const badge = STATE_BADGE[paused ? "neutral" : state]
                    const label = paused ? "Pause Day" : getStateLabel(date, store)
                    const isCycleRest = isRestingDay(date, store.cycleSettings)
                    const showRecommendedTag =
                      isSunday &&
                      inMonth &&
                      !paused &&
                      !isCycleRest &&
                      !isPurityRestricted

                    return (
                      <button
                        key={date.toISOString()}
                        type="button"
                        onClick={() => {
                          setSelectedDay(date)
                          setNoteEdit("")
                          setPanel("day")
                        }}
                        className={`min-h-[82px] md:min-h-[100px] rounded-[1.1rem] border p-2 text-left transition md:rounded-[1.3rem] md:p-2.5 ${
                          isSel
                            ? "border-orange-500 bg-[linear-gradient(180deg,rgba(255,248,238,0.96),rgba(255,236,206,0.92))] shadow-[0_14px_35px_-24px_rgba(249,115,22,0.35)] dark:border-amber-400 dark:bg-stone-900"
                            : isSunday && inMonth
                              ? "border-orange-200 bg-[linear-gradient(180deg,rgba(255,249,240,0.94),rgba(255,240,217,0.82))] hover:border-orange-400 dark:border-amber-500/40 dark:bg-stone-950/60 dark:hover:border-amber-400/60"
                              : "border-stone-200/80 bg-white/76 hover:border-orange-300 hover:bg-orange-50/60 dark:border-stone-800 dark:bg-stone-950/60 dark:hover:border-amber-500/40"
                        } ${!inMonth ? "opacity-40" : ""}`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <div className="flex flex-col">
                            <span className={`text-sm font-semibold md:text-[15px] ${isT ? "text-orange-700 dark:text-orange-400" : "text-stone-800 dark:text-stone-100"}`}>{format(date, "d")}</span>
                            {isSunday && inMonth && <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-orange-700 dark:text-amber-400">Sun</span>}
                          </div>
                          <div className="flex items-center gap-1">
                            {showRecommendedTag && <span className="h-2 w-2 rounded-full bg-orange-500 ring-2 ring-orange-200 dark:ring-amber-500/20" />}
                            <span className="h-2 w-2 rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.28)]" style={{ background: paused ? "rgb(239,68,68)" : state === "neutral" ? "rgba(163,163,163,0.52)" : state === "preparing" || state === "ready" ? "rgb(234,179,8)" : state === "communion" ? "rgb(34,197,94)" : state === "guarding" ? "rgb(194,101,22)" : state === "resting" ? "rgb(244,114,182)" : "rgba(163,163,163,0.52)" }} />
                          </div>
                        </div>
                        <p className="mt-2 text-[10px] font-medium leading-4 text-stone-500 dark:text-stone-400 md:text-[11px]">{inMonth ? label : ""}</p>
                        {showRecommendedTag && <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-orange-700 dark:text-amber-400">Recommended</p>}
                      </button>
                    )
                  })}
                </div>

                {/* Legend */}
                <div className="mt-5 flex flex-wrap gap-3 text-xs text-stone-600 dark:text-stone-400">
                  {[
                    { color: "rgba(163,163,163,0.52)", label: "Neutral" },
                    { color: "rgb(234,179,8)", label: "Preparation" },
                    { color: "rgb(34,197,94)", label: "Communion" },
                    { color: "rgb(194,101,22)", label: "Post" },
                    { color: "rgb(244,114,182)", label: "Rest" },
                    { color: "rgb(239,68,68)", label: "Pause" },
                  ].map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.28)]" style={{ background: color }} />
                      {label}
                    </div>
                  ))}
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-orange-500 ring-2 ring-orange-200 dark:ring-amber-500/20" />
                    Recommended Sunday
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="grid gap-4 content-start">

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 xl:grid-cols-2">
                  {[
                    { icon: <CalendarDays className="h-4 w-4 text-amber-700 dark:text-amber-400" />, bg: "bg-amber-100 dark:bg-amber-950/30", label: "Plan Date", sub: store.plannedDate ? format(parseISO(store.plannedDate), "MMM d") : "Set a target", onClick: () => setPanel("plan") },
                    { icon: <Clock className="h-4 w-4 text-orange-700 dark:text-orange-400" />, bg: "bg-orange-100 dark:bg-orange-950/30", label: "Fast Timer", sub: store.fastSettings ? format(getLiturgyTime(store.fastSettings), "MMM d, h:mm a") : "Set liturgy time", onClick: () => setPanel("fast") },
                    { icon: <Heart className="h-4 w-4 text-rose-600 dark:text-rose-400" />, bg: "bg-rose-100 dark:bg-rose-950/30", label: "Cycle Tracker", sub: store.cycleSettings ? `Every ${store.cycleSettings.cycleLength} days` : "Set up tracking", onClick: () => setPanel("cycle") },
                    { icon: <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />, bg: "bg-emerald-100 dark:bg-emerald-950/30", label: "Checklist", sub: checklistDone ? "All complete" : `${Object.values(store.checklist).filter(Boolean).length}/4`, onClick: () => { setSelectedDay(today); setPanel("day") } },
                  ].map(({ icon, bg, label, sub, onClick }) => (
                    <button key={label} type="button" onClick={onClick} className="flex items-center gap-3 rounded-[1.5rem] border border-[#e8d5a8] bg-white/80 px-4 py-4 shadow-[0_10px_28px_-20px_rgba(120,53,15,0.18)] hover:border-orange-300 transition dark:border-amber-500/20 dark:bg-stone-900/60">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-full ${bg}`}>{icon}</div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-stone-900 dark:text-white">{label}</p>
                        <p className="text-[10px] text-stone-500 dark:text-stone-400">{sub}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Four Stages */}
                <div className="rounded-[1.75rem] border border-[#d8c395] bg-[linear-gradient(180deg,#fffcf5,#fff8ec)] p-5 shadow-[0_18px_46px_-34px_rgba(120,53,15,0.22)] dark:border-amber-500/20 dark:bg-stone-950/70">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.26em] text-[#8b6a2b] dark:text-amber-500">The Four Stages</p>
                  <div className="space-y-2 text-sm">
                    {[
                      { dot: "rgba(163,163,163,0.52)", title: "Neutral", body: "An ordinary day. Use it to plan and prepare the heart." },
                      { dot: "rgb(234,179,8)", title: "Preparation (3 days)", body: "Fasting, confession, examining conscience, seeking peace." },
                      { dot: "rgb(34,197,94)", title: "Communion", body: "Receive with trembling, reverence, and a prepared heart." },
                      { dot: "rgb(194,101,22)", title: "Post-Communion (3 days)", body: "Guard the grace with thanksgiving, stillness, and care." },
                      { dot: "rgb(244,114,182)", title: "Season of Rest", body: "A holy time of gentleness and reverence." },
                    ].map(({ dot, title, body }) => (
                      <div key={title} className="flex items-start gap-3 rounded-[1rem] border border-stone-200/80 bg-stone-50/80 px-3 py-2.5 dark:border-stone-800 dark:bg-stone-900/70">
                        <span className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.28)]" style={{ background: dot }} />
                        <div>
                          <p className="font-semibold text-stone-700 dark:text-stone-300">{title}</p>
                          <p className="mt-0.5 text-xs leading-5 text-stone-500">{body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Communion History */}
                <div className="rounded-[1.75rem] border border-[#d8c395] bg-[linear-gradient(180deg,#fffcf5,#fff8ec)] p-5 shadow-[0_18px_46px_-34px_rgba(120,53,15,0.22)] dark:border-amber-500/20 dark:bg-stone-950/70">
                  <div className="mb-3 flex items-center gap-2">
                    <History className="h-4 w-4 text-[#7c2d12] dark:text-amber-400" />
                    <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#8b6a2b] dark:text-amber-500">Communion History</p>
                  </div>
                  {communionDates.length === 0 ? (
                    <p className="text-sm leading-6 text-stone-500 dark:text-stone-500">No dates recorded yet. Tap any day on the calendar to mark Communion.</p>
                  ) : (
                    <div className="space-y-2">
                      {communionDates.slice(0, 6).map((entry, i) => (
                        <div key={entry.date} className="flex items-center justify-between gap-3 rounded-[1rem] border border-[#ead8b6] bg-white/70 px-3 py-2.5 dark:border-amber-500/15 dark:bg-stone-900/50">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                            <div>
                              <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">{format(parseISO(entry.date), "MMMM d, yyyy")}</p>
                              {i === 0 && <p className="text-[11px] text-stone-400 dark:text-stone-500">Most recent</p>}
                              {entry.notes && <p className="text-[11px] text-stone-400 dark:text-stone-500">{entry.notes}</p>}
                            </div>
                          </div>
                          <button type="button" onClick={() => { const updated = store.communionEntries.filter((e) => e.date !== entry.date); persist({ ...store, communionEntries: updated }) }} className="rounded-full p-1.5 text-stone-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                      {communionDates.length > 6 && <p className="pt-1 text-center text-[11px] text-stone-400 dark:text-stone-500">+ {communionDates.length - 6} more</p>}
                    </div>
                  )}
                  <p className="mt-4 text-[10px] leading-5 text-stone-400 dark:text-stone-500">All notes and checklist progress are stored only in this browser.</p>
                </div>

                {/* Reset */}
                <button type="button" onClick={() => { if (confirm("Clear all data? This cannot be undone.")) { localStorage.removeItem(RHYTHM_KEY); localStorage.removeItem(DAY_NOTES_KEY); setStore(defaultStore); setDayData({}); setPlanDraft(""); setFastDraft({ date: "", hour: "9", minute: "0" }); setCycleDraft({ startDate: "", cycleLength: "28", periodLength: "5" }) } }} className="rounded-2xl border border-stone-200 dark:border-stone-700 bg-white/70 dark:bg-stone-900/50 py-3 text-sm font-semibold text-stone-400 hover:text-red-600 hover:border-red-200 dark:hover:border-red-800/40 transition">
                  Reset All Data
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
