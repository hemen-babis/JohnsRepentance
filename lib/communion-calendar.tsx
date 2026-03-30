"use client"

import { ChevronLeft, ChevronRight, Sparkles, CalendarDays, BookOpen } from "lucide-react"
import { addMonths, format, isSameDay, isSameMonth, parseISO, differenceInCalendarDays } from "date-fns"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import styles from "@/components/holy-communion/communion-calendar-system.module.css"
import type { CommunionCalendarStore } from "@/components/holy-communion/communion-state-engine"
import { getDayState, getMonthGrid, getStateLabel } from "@/components/holy-communion/communion-state-engine"
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const dotClassName: Record<string, string> = {
  neutral: styles.stateNeutral,
  preparation: styles.statePreparation,
  communion: styles.stateCommunion,
  post: styles.statePost,
  pause: styles.statePause,
}

type CommunionCalendarProps = {
  month: Date
  onMonthChange: (date: Date) => void
  selectedDate: Date
  onSelectDate: (date: Date) => void
  store: CommunionCalendarStore
  recommendedDateKeys?: Set<string>
}

function getStateShortLabel(state: string) {
  switch (state) {
    case "preparation":
      return "Prepare"
    case "communion":
      return "Receive"
    case "post":
      return "Guard"
    case "pause":
      return "Wait"
    default:
      return "Live"
  }
}

function getStateDescription(state: string) {
  switch (state) {
    case "preparation":
      return "Begin preparing your heart gently. Guard your attention, your body, and your thoughts."
    case "communion":
      return "Today is a day of reverence and receiving. Keep stillness, prayer, and gratitude."
    case "post":
      return "Guard what you received. Stay quiet, avoid distraction, and protect the grace of the day."
    case "pause":
      return "This is a waiting season, not a rejection. Remain peaceful and let preparation continue."
    default:
      return "Live attentively today. Small faithfulness prepares the soul for greater grace."
  }
}

function getStateChecklist(state: string) {
  switch (state) {
    case "preparation":
      return [
        "Keep the day more guarded than usual",
        "Pray intentionally and examine yourself honestly",
        "Avoid anything that scatters your heart",
      ]
    case "communion":
      return [
        "Go to the liturgy with reverence",
        "Receive with fear of God, faith, and love",
        "Keep the rest of the day calm and prayerful",
      ]
    case "post":
      return [
        "Protect silence and gratitude",
        "Do not rush back into distraction",
        "Let the grace of the day remain with you",
      ]
    case "pause":
      return [
        "Wait without despair",
        "Stay prayerful and honest before God",
        "Use this time for preparation, not shame",
      ]
    default:
      return [
        "Stay attentive in ordinary faithfulness",
        "Keep prayer steady and honest",
        "Let today support future preparation",
      ]
  }
}

function getStateHoverHint(state: string) {
  switch (state) {
    case "preparation":
      return "Fast, pray, and guard your thoughts"
    case "communion":
      return "Receive with reverence"
    case "post":
      return "Protect the grace of the day"
    case "pause":
      return "Wait patiently and peacefully"
    default:
      return "Live attentively"
  }
}

function findNextRecommendedDate(recommendedDateKeys: Set<string>) {
  const today = new Date()
  const sorted = Array.from(recommendedDateKeys)
    .map((key) => parseISO(key))
    .filter((date) => !Number.isNaN(date.getTime()))
    .sort((a, b) => a.getTime() - b.getTime())

  return sorted.find((date) => differenceInCalendarDays(date, today) >= 0) ?? null
}

export function CommunionCalendar({
  month,
  onMonthChange,
  selectedDate,
  onSelectDate,
  store,
  recommendedDateKeys = new Set<string>(),
}: CommunionCalendarProps) {
  const days = getMonthGrid(month)
  const today = new Date()
  const todayState = getDayState(today, store)
  const todayLabel = getStateLabel(today, store)
  const selectedState = getDayState(selectedDate, store)
  const selectedLabel = getStateLabel(selectedDate, store)
  const nextRecommendedDate = findNextRecommendedDate(recommendedDateKeys)

  return (
    <div className="rounded-[2rem] border border-[#ead8b6] bg-[linear-gradient(180deg,#fffdf8_0%,#fff7ee_48%,#fff3e7_100%)] p-4 shadow-[0_24px_60px_-36px_rgba(120,53,15,0.28)] dark:border-amber-500/20 dark:bg-[linear-gradient(180deg,rgba(32,20,14,0.96),rgba(22,15,11,0.95))] md:p-6">
      {/* TOP DASHBOARD */}
      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-[1.5rem] border border-orange-200/70 bg-[linear-gradient(180deg,#fff8ea_0%,#fff2dc_100%)] p-5 shadow-[0_14px_35px_-24px_rgba(120,53,15,0.22)] dark:border-amber-500/20 dark:bg-[linear-gradient(180deg,rgba(62,37,19,0.94),rgba(38,25,17,0.94))]">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-orange-700 dark:text-amber-300">
            <Sparkles className="h-3.5 w-3.5" />
            Today
          </div>
          <h3 className="mt-3 text-xl font-semibold text-[#3a1e01] dark:text-[#f4e7d1]">{todayLabel}</h3>
          <p className="mt-2 text-sm leading-6 text-[#6b4c30] dark:text-stone-300">
            {getStateDescription(todayState)}
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-orange-200/70 bg-[linear-gradient(180deg,#fffaf0_0%,#fff4e1_100%)] p-5 shadow-[0_14px_35px_-24px_rgba(120,53,15,0.22)] dark:border-amber-500/20 dark:bg-[linear-gradient(180deg,rgba(54,35,19,0.94),rgba(33,24,18,0.94))]">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-orange-700 dark:text-amber-300">
            <CalendarDays className="h-3.5 w-3.5" />
            Next recommended day
          </div>
          <h3 className="mt-3 text-xl font-semibold text-[#3a1e01] dark:text-[#f4e7d1]">
            {nextRecommendedDate ? format(nextRecommendedDate, "EEEE, MMMM d") : "No date marked"}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#6b4c30] dark:text-stone-300">
            {nextRecommendedDate
              ? `This is the next suggested day in your current rhythm. Use the days before it for quiet preparation.`
              : `Mark a recommended rhythm so the calendar can gently guide your next preparation window.`}
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-orange-200/70 bg-[linear-gradient(180deg,#fffcf6_0%,#fff5e7_100%)] p-5 shadow-[0_14px_35px_-24px_rgba(120,53,15,0.22)] dark:border-amber-500/20 dark:bg-[linear-gradient(180deg,rgba(48,31,21,0.94),rgba(28,20,15,0.94))]">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-orange-700 dark:text-amber-300">
            <BookOpen className="h-3.5 w-3.5" />
            Selected day
          </div>
          <h3 className="mt-3 text-xl font-semibold text-[#3a1e01] dark:text-[#f4e7d1]">
            {format(selectedDate, "EEEE, MMMM d")}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#6b4c30] dark:text-stone-300">
            {selectedLabel}
          </p>
        </div>
      </div>

      {/* HEADER */}
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-stone-900 dark:text-white">Holy Communion Calendar</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            A gentle monthly view of preparation, receiving, and guarding.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <Button type="button" variant="outline" size="icon" onClick={() => onMonthChange(addMonths(month, -1))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="min-w-36 text-center text-sm font-semibold text-stone-800 dark:text-stone-200">
            {format(month, "MMMM yyyy")}
          </div>
          <Button type="button" variant="outline" size="icon" onClick={() => onMonthChange(addMonths(month, 1))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* STATE TIMELINE */}
      <div className="mb-5 flex flex-wrap gap-2">
        <div className="rounded-full border border-orange-200/70 bg-white/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-700 dark:border-amber-500/20 dark:bg-stone-900/60 dark:text-amber-300">
          Preparation
        </div>
        <div className="rounded-full border border-orange-200/70 bg-white/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-700 dark:border-amber-500/20 dark:bg-stone-900/60 dark:text-amber-300">
          Communion
        </div>
        <div className="rounded-full border border-orange-200/70 bg-white/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-700 dark:border-amber-500/20 dark:bg-stone-900/60 dark:text-amber-300">
          Post-Communion
        </div>
        <div className="rounded-full border border-orange-200/70 bg-white/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-700 dark:border-amber-500/20 dark:bg-stone-900/60 dark:text-amber-300">
          Pause
        </div>
      </div>

      {/* WEEKDAY LABELS */}
      <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400 md:text-xs">
        {dayNames.map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      {/* CALENDAR GRID */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const state = getDayState(day, store)
          const isSelected = isSameDay(day, selectedDate)
          const inMonth = isSameMonth(day, month)
          const dayKey = format(day, "yyyy-MM-dd")
          const isRecommended = recommendedDateKeys.has(dayKey)
          const isSunday = day.getDay() === 0
          const isToday = isSameDay(day, today)

          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => onSelectDate(day)}
              className={cn(
                "group relative rounded-[1.2rem] border p-2.5 text-left transition-all duration-300 md:rounded-[1.35rem] md:p-3",
                styles.calendarDay,
                isSelected
                  ? "border-orange-500 bg-[linear-gradient(180deg,rgba(255,248,238,0.98),rgba(255,236,206,0.95))] shadow-[0_18px_38px_-24px_rgba(249,115,22,0.38)] dark:border-amber-400 dark:bg-[linear-gradient(180deg,rgba(57,36,21,0.96),rgba(31,23,17,0.96))]"
                  : isRecommended
                    ? "border-orange-300 bg-[linear-gradient(180deg,rgba(255,249,240,0.96),rgba(255,240,217,0.90))] shadow-[0_0_20px_rgba(249,115,22,0.14)] hover:border-orange-400 hover:bg-orange-100/70 dark:border-amber-500/40 dark:bg-stone-950/60 dark:hover:border-amber-400/60"
                    : "border-stone-200/80 bg-white/82 hover:border-orange-300 hover:bg-orange-50/60 dark:border-stone-800 dark:bg-stone-950/60 dark:hover:border-amber-500/40",
                !inMonth && "opacity-45",
              )}
              aria-label={`${format(day, "MMMM d, yyyy")} - ${getStateLabel(day, store)}`}
            >
              {isSelected ? (
                <div className="pointer-events-none absolute inset-0 rounded-[1.2rem] ring-2 ring-orange-400/40 md:rounded-[1.35rem]" />
              ) : null}

              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-stone-800 dark:text-stone-100 md:text-[15px]">
                    {format(day, "d")}
                  </span>
                  {isSunday ? (
                    <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-700 dark:text-amber-400">
                      Sun
                    </span>
                  ) : null}
                  {isToday ? (
                    <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
                      Today
                    </span>
                  ) : null}
                </div>

                <div className="flex items-center gap-1.5">
                  {isRecommended ? (
                    <span className="h-2 w-2 rounded-full bg-orange-500 ring-2 ring-orange-200 dark:ring-amber-500/20" />
                  ) : null}
                  <span className={cn(styles.stateDot, dotClassName[state])} />
                </div>
              </div>

              <p className="mt-3 text-[11px] font-medium leading-4 text-stone-600 dark:text-stone-400">
                {getStateShortLabel(state)}
              </p>

              <p className="mt-1 text-[10px] leading-4 text-stone-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-stone-500">
                {getStateHoverHint(state)}
              </p>

              {isRecommended ? (
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-orange-700 dark:text-amber-400">
                  Recommended
                </p>
              ) : null}
            </button>
          )
        })}
      </div>

      {/* LEGEND */}
      <div className="mt-5 flex flex-wrap gap-3 text-xs text-stone-600 dark:text-stone-400">
        <div className="flex items-center gap-2">
          <span className={cn(styles.stateDot, styles.stateNeutral)} />
          Neutral
        </div>
        <div className="flex items-center gap-2">
          <span className={cn(styles.stateDot, styles.statePreparation)} />
          Preparation
        </div>
        <div className="flex items-center gap-2">
          <span className={cn(styles.stateDot, styles.stateCommunion)} />
          Communion
        </div>
        <div className="flex items-center gap-2">
          <span className={cn(styles.stateDot, styles.statePost)} />
          Post
        </div>
        <div className="flex items-center gap-2">
          <span className={cn(styles.stateDot, styles.statePause)} />
          Pause
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-orange-500 ring-2 ring-orange-200 dark:ring-amber-500/20" />
          Recommended Sunday / feast rhythm
        </div>
      </div>

      {/* SELECTED DAY DETAIL PANEL */}
      <div className="mt-6 rounded-[1.6rem] border border-[#ead8b6] bg-[linear-gradient(180deg,#fff8ea_0%,#fff2de_100%)] p-5 shadow-[0_16px_40px_-28px_rgba(120,53,15,0.24)] dark:border-amber-500/20 dark:bg-[linear-gradient(180deg,rgba(46,31,22,0.96),rgba(28,20,15,0.96))] md:p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-700 dark:text-amber-300">
          Selected day guidance
        </p>

        <h4 className="mt-3 text-xl font-semibold text-[#3a1e01] dark:text-[#f4e7d1]">
          {format(selectedDate, "EEEE, MMMM d")}
        </h4>

        <p className="mt-2 text-sm font-medium text-[#5d3c20] dark:text-amber-200/90">
          {selectedLabel}
        </p>

        <p className="mt-3 text-sm leading-6 text-[#6b4c30] dark:text-stone-300">
          {getStateDescription(selectedState)}
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-orange-200/70 bg-white/60 p-4 dark:border-amber-500/10 dark:bg-stone-900/40">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-700 dark:text-amber-300">
              What to do
            </p>
            <ul className="mt-3 space-y-2">
              {getStateChecklist(selectedState).map((item) => (
                <li key={item} className="text-sm leading-6 text-stone-700 dark:text-stone-300">
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-orange-200/70 bg-white/60 p-4 dark:border-amber-500/10 dark:bg-stone-900/40">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-700 dark:text-amber-300">
              Quiet reminder
            </p>
            <p className="mt-3 text-sm leading-6 text-stone-700 dark:text-stone-300">
              Do not use this calendar as a burden. Let it serve as a gentle guide toward reverence, honesty, and consistency.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}