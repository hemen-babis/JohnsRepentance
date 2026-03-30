"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { addMonths, format, isSameDay, isSameMonth } from "date-fns"
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

export function CommunionCalendar({
  month,
  onMonthChange,
  selectedDate,
  onSelectDate,
  store,
  recommendedDateKeys = new Set<string>(),
}: CommunionCalendarProps) {
  const days = getMonthGrid(month)

  return (
    <div className="rounded-[1.85rem] border border-orange-200/70 bg-white/80 p-4 shadow-[0_20px_50px_-36px_rgba(120,53,15,0.26)] dark:border-amber-500/20 dark:bg-stone-950/70 md:p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-stone-900 dark:text-white">Communion Calendar</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">A gentle monthly view of preparation and reverence.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="icon" onClick={() => onMonthChange(addMonths(month, -1))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="min-w-32 text-center text-sm font-semibold text-stone-800 dark:text-stone-200">
            {format(month, "MMMM yyyy")}
          </div>
          <Button type="button" variant="outline" size="icon" onClick={() => onMonthChange(addMonths(month, 1))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400 md:text-xs">
        {dayNames.map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const state = getDayState(day, store)
          const isSelected = isSameDay(day, selectedDate)
          const inMonth = isSameMonth(day, month)
          const dayKey = format(day, "yyyy-MM-dd")
          const isRecommended = recommendedDateKeys.has(dayKey)
          const isSunday = day.getDay() === 0

          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => onSelectDate(day)}
              className={cn(
                styles.calendarDay,
                "rounded-[1.2rem] border p-2.5 text-left transition md:rounded-[1.35rem] md:p-3",
                isSelected
                  ? "border-orange-500 bg-[linear-gradient(180deg,rgba(255,248,238,0.96),rgba(255,236,206,0.92))] shadow-[0_14px_35px_-24px_rgba(249,115,22,0.35)] dark:border-amber-400 dark:bg-stone-900"
                  : isRecommended
                    ? "border-orange-300 bg-[linear-gradient(180deg,rgba(255,249,240,0.94),rgba(255,240,217,0.82))] hover:border-orange-400 hover:bg-orange-100/70 dark:border-amber-500/40 dark:bg-stone-950/60 dark:hover:border-amber-400/60"
                    : "border-stone-200/80 bg-white/76 hover:border-orange-300 hover:bg-orange-50/60 dark:border-stone-800 dark:bg-stone-950/60 dark:hover:border-amber-500/40",
                !inMonth && "opacity-45",
              )}
              aria-label={`${format(day, "MMMM d, yyyy")} - ${getStateLabel(day, store)}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-stone-800 dark:text-stone-100 md:text-[15px]">{format(day, "d")}</span>
                  {isSunday ? <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-700 dark:text-amber-400">Sun</span> : null}
                </div>
                <div className="flex items-center gap-1.5">
                  {isRecommended ? <span className="h-2 w-2 rounded-full bg-orange-500 ring-2 ring-orange-200 dark:ring-amber-500/20" /> : null}
                  <span className={cn(styles.stateDot, dotClassName[state])} />
                </div>
              </div>
              <p className="mt-3 text-[11px] font-medium leading-4 text-stone-500 dark:text-stone-400">{getStateLabel(day, store)}</p>
              {isRecommended ? (
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-orange-700 dark:text-amber-400">
                  Recommended
                </p>
              ) : null}
            </button>
          )
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-3 text-xs text-stone-600 dark:text-stone-400">
        <div className="flex items-center gap-2"><span className={cn(styles.stateDot, styles.stateNeutral)} />Neutral</div>
        <div className="flex items-center gap-2"><span className={cn(styles.stateDot, styles.statePreparation)} />Preparation</div>
        <div className="flex items-center gap-2"><span className={cn(styles.stateDot, styles.stateCommunion)} />Communion</div>
        <div className="flex items-center gap-2"><span className={cn(styles.stateDot, styles.statePost)} />Post</div>
        <div className="flex items-center gap-2"><span className={cn(styles.stateDot, styles.statePause)} />Pause</div>
        <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-orange-500 ring-2 ring-orange-200 dark:ring-amber-500/20" />Recommended Sunday / feast rhythm</div>
      </div>
    </div>
  )
}
