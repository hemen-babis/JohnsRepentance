"use client"

import { useEffect, useMemo, useState } from "react"
import { format, parseISO } from "date-fns"
import { CalendarDays, CheckCircle2, Cross, Flame, History, Plus } from "lucide-react"
import { CommunionCalendar } from "@/components/holy-communion/communion-calendar"
import { FlowPanel } from "@/components/holy-communion/flow-panel"
import {
  COMMUNION_STORAGE_KEY,
  emptyStore,
  getCommunionCount,
  getDetailedGuidance,
  getDaysUntilNextCommunion,
  getNextCommunionDate,
  getStateLabel,
  markCommunionDate,
  normalizeStore,
  toDateKey,
  togglePauseDate,
  updateDateEntry,
  type ChecklistState,
  type CommunionCalendarStore,
} from "@/components/holy-communion/communion-state-engine"
import {
  type CommunionProfile,
  loadProfile,
  checkEligibility,
} from "@/components/holy-communion/communion-profile"
import {
  CommunionProfileSetup,
  CommunionProfileBanner,
} from "@/components/holy-communion/communion-profile-setup"

const titleSerif = "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif"

function getUpcomingSunday(baseDate: Date) {
  const candidate = new Date(baseDate)
  const daysUntilSunday = (7 - candidate.getDay()) % 7
  candidate.setDate(candidate.getDate() + (daysUntilSunday === 0 ? 7 : daysUntilSunday))
  return candidate
}

function getRecommendedDateKeysForMonth(month: Date) {
  const cursor = new Date(month.getFullYear(), month.getMonth(), 1)
  const keys = new Set<string>()

  while (cursor.getMonth() === month.getMonth()) {
    if (cursor.getDay() === 0) keys.add(toDateKey(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }

  return keys
}

const stageColors: Record<string, { bg: string; border: string; label: string }> = {
  "Neutral Day": { bg: "bg-stone-100 dark:bg-stone-800/60", border: "border-stone-300 dark:border-stone-700", label: "Neutral" },
  "Preparation Day 1": { bg: "bg-amber-50 dark:bg-amber-950/20", border: "border-amber-300 dark:border-amber-700/40", label: "Preparation" },
  "Preparation Day 2": { bg: "bg-amber-50 dark:bg-amber-950/20", border: "border-amber-300 dark:border-amber-700/40", label: "Preparation" },
  "Preparation Day 3": { bg: "bg-amber-50 dark:bg-amber-950/20", border: "border-amber-300 dark:border-amber-700/40", label: "Preparation" },
  "Communion Day": { bg: "bg-emerald-50 dark:bg-emerald-950/20", border: "border-emerald-300 dark:border-emerald-700/40", label: "Communion" },
  "Post-Communion Day 1": { bg: "bg-blue-50 dark:bg-blue-950/20", border: "border-blue-300 dark:border-blue-700/40", label: "Post-Communion" },
  "Post-Communion Day 2": { bg: "bg-blue-50 dark:bg-blue-950/20", border: "border-blue-300 dark:border-blue-700/40", label: "Post-Communion" },
  "Pause Day": { bg: "bg-stone-100 dark:bg-stone-800/60", border: "border-stone-300 dark:border-stone-700", label: "Pause" },
}

export function CommunionCalendarSystem() {
  const [store, setStore] = useState<CommunionCalendarStore>(emptyStore)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [month, setMonth] = useState(new Date())
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [profile, setProfile] = useState<CommunionProfile | null>(null)
  const [showSetup, setShowSetup] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(COMMUNION_STORAGE_KEY)
      if (!raw) {
        setIsReady(true)
      } else {
        setStore(normalizeStore(JSON.parse(raw)))
        setIsReady(true)
      }
    } catch {
      window.localStorage.removeItem(COMMUNION_STORAGE_KEY)
      setStore(emptyStore())
      setIsReady(true)
    }
    const savedProfile = loadProfile()
    if (savedProfile) {
      setProfile(savedProfile)
    } else {
      setShowSetup(true)
    }
  }, [])

  useEffect(() => {
    if (!isReady) return
    window.localStorage.setItem(COMMUNION_STORAGE_KEY, JSON.stringify(store))
  }, [isReady, store])

  const today = useMemo(() => new Date(), [])
  const todayStatus = useMemo(() => getStateLabel(today, store), [store, today])
  const todayGuidance = useMemo(() => getDetailedGuidance(today, store), [store, today])
  const nextCommunion = useMemo(() => getNextCommunionDate(store), [store])
  const daysUntil = useMemo(() => getDaysUntilNextCommunion(store), [store])
  const communionCount = useMemo(() => getCommunionCount(store), [store])
  const nextRecommendedSunday = useMemo(() => getUpcomingSunday(today), [today])
  const recommendedDateKeys = useMemo(() => getRecommendedDateKeysForMonth(month), [month])
  const selectedKey = toDateKey(selectedDate)
  const selectedEntry = store.entries[selectedKey]
  const communionDates = [...store.communionDates].sort((a, b) => b.localeCompare(a))

  const handleChecklistChange = (key: keyof ChecklistState, value: boolean) => {
    setStore((current) =>
      updateDateEntry(current, selectedKey, (entry) => ({
        ...entry,
        checklist: { ...entry.checklist, [key]: value },
      })),
    )
  }

  const handleNoteChange = (value: string) => {
    setStore((current) =>
      updateDateEntry(current, selectedKey, (entry) => ({ ...entry, note: value })),
    )
  }

  const handleMarkCompleted = () => {
    setStore((current) =>
      updateDateEntry(current, selectedKey, (entry) => ({ ...entry, completed: true })),
    )
  }

  const handleMarkCommunion = () => {
    setStore((current) =>
      updateDateEntry(markCommunionDate(current, selectedDate), selectedKey, (entry) => ({
        ...entry,
        completed: true,
      })),
    )
  }

  const handleTogglePause = () => {
    setStore((current) => togglePauseDate(current, selectedDate))
  }

  const todayStageStyle = stageColors[todayStatus] ?? stageColors["Neutral Day"]
  const eligibility = profile ? checkEligibility(profile) : null

  // Show questionnaire if profile not yet set
  if (showSetup) {
    return (
      <CommunionProfileSetup
        onComplete={(p) => {
          setProfile(p)
          setShowSetup(false)
        }}
      />
    )
  }

  return (
    <>
      {/* ── Eligibility Banner ───────────────────────────────────── */}
      {profile && eligibility && (
        <CommunionProfileBanner
          profile={profile}
          eligibility={eligibility}
          onReset={() => setShowSetup(true)}
        />
      )}

      {/* ── Blocked: no calendar ─────────────────────────────────── */}
      {eligibility && !eligibility.canReceive && eligibility.severity === "blocked" ? null : (
      <>
      {/* ── Hero Status Bar ─────────────────────────────────────── */}
      <div className="overflow-hidden rounded-[2rem] border border-[#d8c395] bg-[linear-gradient(160deg,#fffcf5_0%,#fff4e0_55%,#fdf0d8_100%)] shadow-[0_30px_80px_-40px_rgba(120,53,15,0.32)] dark:border-amber-500/20 dark:bg-[linear-gradient(160deg,#1a0f07_0%,#180e07_100%)]">
        {/* Top accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#7c2d12] via-[#d4a84f] to-[#0f766e]" />

        <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          {/* Left: Today's state */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7c2d12]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-[#7c2d12] dark:bg-amber-500/10 dark:text-amber-400">
                <CalendarDays className="h-3.5 w-3.5" />
                Today — {format(today, "MMMM d, yyyy")}
              </span>
              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] ${todayStageStyle.bg} ${todayStageStyle.border} text-stone-700 dark:text-stone-200`}>
                {todayStatus}
              </span>
            </div>

            <h2
              className="mt-4 text-3xl font-black tracking-tight text-[#3d2206] dark:text-[#f3e4cd] md:text-4xl"
              style={{ fontFamily: titleSerif }}
            >
              {todayGuidance.headline}
            </h2>
            <p className="mt-2 text-base text-stone-600 dark:text-stone-400">{todayGuidance.subline}</p>
          </div>

          {/* Right: Stats */}
          <div className="flex gap-4 lg:flex-col lg:items-end">
            {daysUntil !== null ? (
              <div className="rounded-[1.5rem] border border-[#e8d5a8] bg-white/80 px-5 py-4 text-center shadow-[0_14px_34px_-22px_rgba(120,53,15,0.22)] dark:border-amber-500/20 dark:bg-stone-900/60">
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#a6461f] dark:text-amber-400">Next communion</p>
                <p className="mt-1 text-3xl font-black text-[#3d2206] dark:text-amber-200">{daysUntil === 0 ? "Today" : `${daysUntil}d`}</p>
                {nextCommunion ? (
                  <p className="mt-1 text-[11px] font-medium text-stone-500 dark:text-stone-400">{format(nextCommunion, "MMMM d")}</p>
                ) : null}
              </div>
            ) : (
              <div className="rounded-[1.5rem] border border-[#e8d5a8] bg-white/80 px-5 py-4 text-center shadow-[0_14px_34px_-22px_rgba(120,53,15,0.22)] dark:border-amber-500/20 dark:bg-stone-900/60">
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#a6461f] dark:text-amber-400">Next communion</p>
                <p className="mt-1 text-sm font-semibold text-stone-500 dark:text-stone-400">Not yet set</p>
                <p className="mt-1 text-[11px] text-stone-400 dark:text-stone-500">Tap a Sunday to plan</p>
              </div>
            )}
            <div className="rounded-[1.5rem] border border-[#e8d5a8] bg-white/80 px-5 py-4 text-center shadow-[0_14px_34px_-22px_rgba(120,53,15,0.22)] dark:border-amber-500/20 dark:bg-stone-900/60">
              <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#a6461f] dark:text-amber-400">Recorded</p>
              <p className="mt-1 text-3xl font-black text-[#3d2206] dark:text-amber-200">{communionCount}</p>
              <p className="mt-1 text-[11px] font-medium text-stone-500 dark:text-stone-400">communions</p>
            </div>
          </div>
        </div>

        {/* Today's guidance steps */}
        {todayGuidance.steps.length > 0 ? (
          <div className="border-t border-[#e8d5a8] px-6 py-5 dark:border-amber-500/15 md:px-8">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#8b6a2b] dark:text-amber-500">
              What to do today
            </p>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {todayGuidance.steps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex gap-3 rounded-[1.25rem] border border-[#ead8b6] bg-white/70 p-4 dark:border-amber-500/15 dark:bg-stone-900/50"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7c2d12,#b45309)] text-[11px] font-black text-white">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#3d2206] dark:text-[#f3e4cd]">{step.title}</p>
                    <p className="mt-1 text-xs leading-5 text-stone-600 dark:text-stone-400">{step.description}</p>
                    {step.scriptureRef ? (
                      <p className="mt-1.5 text-[11px] font-semibold text-[#8b6a2b] dark:text-amber-400">{step.scriptureRef}</p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* ── Next Recommended Sunday ────────────────────────────── */}
      {daysUntil === null ? (
        <div className="mt-4 flex items-center justify-between gap-4 rounded-[1.5rem] border border-[#e8d5a8] bg-[linear-gradient(180deg,#fffcf5,#fff8ec)] px-5 py-4 shadow-[0_14px_34px_-22px_rgba(120,53,15,0.18)] dark:border-amber-500/20 dark:bg-stone-950/60">
          <div className="flex items-center gap-3">
            <Cross className="h-5 w-5 text-[#7c2d12] dark:text-amber-400" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8b6a2b] dark:text-amber-400">Suggested next date</p>
              <p className="mt-0.5 text-sm font-semibold text-[#3d2206] dark:text-amber-200">{format(nextRecommendedSunday, "EEEE, MMMM d, yyyy")}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedDate(nextRecommendedSunday)
              setMonth(nextRecommendedSunday)
              setIsPanelOpen(true)
            }}
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7c2d12] to-[#b45309] px-4 py-2 text-xs font-bold text-white shadow-[0_8px_20px_-12px_rgba(120,53,15,0.5)] hover:brightness-105"
          >
            <Plus className="h-3.5 w-3.5" />
            Plan this date
          </button>
        </div>
      ) : null}

      {/* ── Calendar + Sidebar ─────────────────────────────────── */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px]">
        <CommunionCalendar
          month={month}
          onMonthChange={setMonth}
          selectedDate={selectedDate}
          onSelectDate={(date) => {
            setSelectedDate(date)
            setMonth(date)
            setIsPanelOpen(true)
          }}
          store={store}
          recommendedDateKeys={recommendedDateKeys}
        />

        {/* Right sidebar */}
        <div className="grid gap-4 content-start">
          {/* Rhythm guide */}
          <div className="rounded-[1.75rem] border border-[#d8c395] bg-[linear-gradient(180deg,#fffcf5,#fff8ec)] p-5 shadow-[0_18px_46px_-34px_rgba(120,53,15,0.22)] dark:border-amber-500/20 dark:bg-stone-950/70">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.26em] text-[#8b6a2b] dark:text-amber-500">The four stages</p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-3 rounded-[1rem] border border-stone-200/80 bg-stone-50/80 px-3 py-2.5 dark:border-stone-800 dark:bg-stone-900/70">
                <span className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-stone-400 dark:bg-stone-600" />
                <div>
                  <p className="font-semibold text-stone-700 dark:text-stone-300">Neutral</p>
                  <p className="mt-0.5 text-xs leading-5 text-stone-500 dark:text-stone-500">An ordinary day. Use it to plan and prepare the heart.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-[1rem] border border-amber-200/80 bg-amber-50/70 px-3 py-2.5 dark:border-amber-900/30 dark:bg-amber-950/10">
                <span className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500" />
                <div>
                  <p className="font-semibold text-stone-700 dark:text-stone-300">Preparation (3 days)</p>
                  <p className="mt-0.5 text-xs leading-5 text-stone-500 dark:text-stone-500">Fasting, confession, examining conscience, seeking peace.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-[1rem] border border-emerald-200/80 bg-emerald-50/70 px-3 py-2.5 dark:border-emerald-900/30 dark:bg-emerald-950/10">
                <span className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
                <div>
                  <p className="font-semibold text-stone-700 dark:text-stone-300">Communion</p>
                  <p className="mt-0.5 text-xs leading-5 text-stone-500 dark:text-stone-500">Receive with trembling, reverence, and a prepared heart.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-[1rem] border border-blue-200/80 bg-blue-50/70 px-3 py-2.5 dark:border-blue-900/30 dark:bg-blue-950/10">
                <span className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500" />
                <div>
                  <p className="font-semibold text-stone-700 dark:text-stone-300">Post-Communion (2 days)</p>
                  <p className="mt-0.5 text-xs leading-5 text-stone-500 dark:text-stone-500">Guard the grace with thanksgiving, stillness, and care.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Communion history */}
          <div className="rounded-[1.75rem] border border-[#d8c395] bg-[linear-gradient(180deg,#fffcf5,#fff8ec)] p-5 shadow-[0_18px_46px_-34px_rgba(120,53,15,0.22)] dark:border-amber-500/20 dark:bg-stone-950/70">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-[#7c2d12] dark:text-amber-400" />
              <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#8b6a2b] dark:text-amber-500">Communion history</p>
            </div>
            {communionDates.length === 0 ? (
              <p className="mt-4 text-sm leading-6 text-stone-500 dark:text-stone-500">
                No dates recorded yet. Tap any day on the calendar to mark Communion.
              </p>
            ) : (
              <div className="mt-4 space-y-2">
                {communionDates.slice(0, 6).map((date, index) => (
                  <div
                    key={date}
                    className="flex items-center gap-3 rounded-[1rem] border border-[#ead8b6] bg-white/70 px-3 py-2.5 dark:border-amber-500/15 dark:bg-stone-900/50"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                        {format(parseISO(date), "MMMM d, yyyy")}
                      </p>
                      {index === 0 ? (
                        <p className="text-[11px] text-stone-400 dark:text-stone-500">Most recent</p>
                      ) : null}
                    </div>
                  </div>
                ))}
                {communionDates.length > 6 ? (
                  <p className="pt-1 text-center text-[11px] text-stone-400 dark:text-stone-500">+ {communionDates.length - 6} more</p>
                ) : null}
              </div>
            )}
            {selectedEntry?.note ? (
              <div className="mt-4 rounded-[1rem] border border-[#e8d5a8] bg-[#fffbf0] px-4 py-3 dark:border-amber-500/15 dark:bg-stone-900/50">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8b6a2b] dark:text-amber-400">Selected day note</p>
                <p className="mt-2 text-sm leading-6 text-stone-700 dark:text-stone-300">{selectedEntry.note}</p>
              </div>
            ) : null}
            <p className="mt-4 text-[10px] leading-5 text-stone-400 dark:text-stone-500">
              All notes and checklist progress are stored only in this browser.
            </p>
          </div>
        </div>
      </div>

      {isPanelOpen ? (
        <FlowPanel
          date={selectedDate}
          store={store}
          onClose={() => setIsPanelOpen(false)}
          onChecklistChange={handleChecklistChange}
          onNoteChange={handleNoteChange}
          onMarkCompleted={handleMarkCompleted}
          onMarkCommunion={handleMarkCommunion}
          onTogglePause={handleTogglePause}
        />
      ) : null}
      </>
      )}
    </>
  )
}
