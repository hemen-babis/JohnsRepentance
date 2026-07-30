import {
  addDays,
  differenceInCalendarDays,
  differenceInDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  isSameDay,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns"

// ─── Types ──────────────────────────────────────────────────────────────────

export type RhythmState = "neutral" | "preparing" | "ready" | "resting" | "guarding" | "communion"

export type PrepChecklist = {
  fasting: boolean
  prayer: boolean
  forgiveness: boolean
  confession: boolean
}

export type CommunionEntry = {
  date: string      // "yyyy-MM-dd"
  notes?: string
}

export type CycleSettings = {
  startDate: string   // "yyyy-MM-dd" – last period start
  cycleLength: number // default 28
  periodLength: number // default 5
}

export type FastSettings = {
  liturgyDate: string  // "yyyy-MM-dd"
  liturgyHour: number
  liturgyMinute: number
}

export type RhythmStore = {
  communionEntries: CommunionEntry[]
  plannedDate: string | null     // "yyyy-MM-dd"
  checklist: PrepChecklist
  cycleSettings: CycleSettings | null
  fastSettings: FastSettings | null
}

export const RHYTHM_KEY = "communion-rhythm-v2"

export const emptyChecklist: PrepChecklist = {
  fasting: false,
  prayer: false,
  forgiveness: false,
  confession: false,
}

export const defaultStore: RhythmStore = {
  communionEntries: [],
  plannedDate: null,
  checklist: emptyChecklist,
  cycleSettings: null,
  fastSettings: null,
}

// ─── Storage ─────────────────────────────────────────────────────────────────

export function loadStore(): RhythmStore {
  if (typeof window === "undefined") return defaultStore
  try {
    const raw = localStorage.getItem(RHYTHM_KEY)
    if (!raw) return defaultStore
    return { ...defaultStore, ...JSON.parse(raw) }
  } catch {
    return defaultStore
  }
}

export function persistStore(store: RhythmStore): void {
  if (typeof window === "undefined") return
  localStorage.setItem(RHYTHM_KEY, JSON.stringify(store))
}

// ─── Cycle helpers ───────────────────────────────────────────────────────────

export function isRestingDay(date: Date, cycle: CycleSettings | null): boolean {
  if (!cycle) return false
  const base = parseISO(cycle.startDate)
  const d = startOfDay(date)
  const { cycleLength, periodLength } = cycle

  for (let i = -6; i <= 12; i++) {
    const cycleStart = addDays(base, i * cycleLength)
    const cycleEnd = addDays(cycleStart, periodLength - 1)
    if (!isBefore(d, cycleStart) && !isAfter(d, cycleEnd)) return true
  }
  return false
}

export function getRestingDatesInRange(cycle: CycleSettings, from: Date, to: Date): Set<string> {
  const result = new Set<string>()
  const base = parseISO(cycle.startDate)
  const { cycleLength, periodLength } = cycle

  for (let i = -6; i <= 12; i++) {
    const cycleStart = addDays(base, i * cycleLength)
    for (let d = 0; d < periodLength; d++) {
      const day = addDays(cycleStart, d)
      if (!isBefore(day, from) && !isAfter(day, to)) {
        result.add(format(day, "yyyy-MM-dd"))
      }
    }
  }
  return result
}

export function getNextCycleStart(cycle: CycleSettings): Date {
  const base = parseISO(cycle.startDate)
  const today = startOfDay(new Date())
  let candidate = base
  // Advance through cycle instances
  while (isBefore(candidate, today) || isSameDay(candidate, today)) {
    candidate = addDays(candidate, cycle.cycleLength)
  }
  return candidate
}

export function getCurrentCycleDay(cycle: CycleSettings): number | null {
  const base = parseISO(cycle.startDate)
  const today = startOfDay(new Date())
  const { cycleLength, periodLength } = cycle

  for (let i = -3; i <= 3; i++) {
    const cycleStart = addDays(base, i * cycleLength)
    const cycleEnd = addDays(cycleStart, periodLength - 1)
    if (!isBefore(today, cycleStart) && !isAfter(today, cycleEnd)) {
      return differenceInCalendarDays(today, cycleStart) + 1
    }
  }
  return null
}

// ─── State machine ───────────────────────────────────────────────────────────

export function getDayState(date: Date, store: RhythmStore): RhythmState {
  const d = startOfDay(date)

  // Communion day
  const isCommDay = store.communionEntries.some((e) => isSameDay(parseISO(e.date), d))
  if (isCommDay) return "communion"

  // Guarding: 3 days after latest communion
  const lastComm = getLastCommunionDate(store)
  if (lastComm) {
    const guardEnd = addDays(lastComm, 3)
    if (isAfter(d, lastComm) && !isAfter(d, guardEnd)) return "guarding"
  }

  // Resting: menstrual cycle
  if (isRestingDay(date, store.cycleSettings)) return "resting"

  // Planned communion preparation window
  if (store.plannedDate) {
    const planned = parseISO(store.plannedDate)
    const prepStart = addDays(planned, -3)
    if (!isBefore(d, prepStart) && isBefore(d, planned)) {
      const done = isChecklistComplete(store.checklist)
      return done ? "ready" : "preparing"
    }
    if (isSameDay(d, planned)) {
      return isChecklistComplete(store.checklist) ? "ready" : "preparing"
    }
  }

  return "neutral"
}

export function isChecklistComplete(cl: PrepChecklist): boolean {
  return cl.confession && cl.fasting && cl.prayer && cl.forgiveness
}

// ─── Communion helpers ────────────────────────────────────────────────────────

export function getLastCommunionDate(store: RhythmStore): Date | null {
  if (store.communionEntries.length === 0) return null
  const sorted = [...store.communionEntries].sort((a, b) => b.date.localeCompare(a.date))
  return parseISO(sorted[0].date)
}

export function getCommunionStreak(store: RhythmStore): number {
  if (store.communionEntries.length === 0) return 0
  const sorted = [...store.communionEntries]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((e) => parseISO(e.date))

  let streak = 1
  for (let i = 1; i < sorted.length; i++) {
    const diff = differenceInDays(sorted[i - 1], sorted[i])
    if (diff <= 45) streak++
    else break
  }
  return streak
}

export function getNextRecommendedDate(store: RhythmStore): Date {
  const today = startOfDay(new Date())
  const lastComm = getLastCommunionDate(store)

  let from = today
  if (lastComm) {
    const guardEnd = addDays(lastComm, 3)
    if (isAfter(guardEnd, today)) from = guardEnd
  }

  // Find next Sunday
  let candidate = from
  while (candidate.getDay() !== 0) candidate = addDays(candidate, 1)

  // Skip if in resting window
  if (store.cycleSettings && isRestingDay(candidate, store.cycleSettings)) {
    candidate = addDays(candidate, 7)
  }
  return candidate
}

export function getDaysUntil(date: Date): number {
  return differenceInCalendarDays(startOfDay(date), startOfDay(new Date()))
}

// ─── Fast timer ──────────────────────────────────────────────────────────────

export function getFastStartTime(settings: FastSettings): Date {
  const liturgy = parseISO(settings.liturgyDate)
  liturgy.setHours(settings.liturgyHour, settings.liturgyMinute, 0, 0)
  return new Date(liturgy.getTime() - 18 * 60 * 60 * 1000)
}

export function getLiturgyTime(settings: FastSettings): Date {
  const liturgy = parseISO(settings.liturgyDate)
  liturgy.setHours(settings.liturgyHour, settings.liturgyMinute, 0, 0)
  return liturgy
}

// ─── Calendar grid ────────────────────────────────────────────────────────────

export function getMonthGrid(month: Date): Date[] {
  const monthStart = startOfMonth(month)
  const monthEnd = endOfMonth(month)
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 })
  const gridEnd = addDays(gridStart, 41)
  return eachDayOfInterval({ start: gridStart, end: gridEnd })
}

// ─── Guidance text ────────────────────────────────────────────────────────────

export type DayGuidance = {
  headline: string
  body: string
  prayer?: string
}

export function getGuidanceForState(state: RhythmState, checklist?: PrepChecklist): DayGuidance {
  switch (state) {
    case "preparing":
      return {
        headline: "Preparing your heart",
        body: "These three days are a sacred corridor. Walk through them with intention — fasting, prayer, and a heart that has sought forgiveness. There is no rush. There is only readiness.",
        prayer: "Lord, let my preparation be an offering, not a performance. Give me a contrite heart and a quiet spirit.",
      }
    case "ready":
      return {
        headline: "Your heart is ready",
        body: "You have walked the preparation. The fast is held, the prayers are said, the forgiveness sought. Approach the altar with calm confidence — not in your own merit, but in the mercy of Christ who calls you.",
        prayer: "Lord, I come not because I am worthy, but because You are merciful. Receive me.",
      }
    case "resting":
      return {
        headline: "A time of rest and care",
        body: "This is a holy season of rest, not absence. The Tewahedo tradition holds this time with gentleness and reverence. God is not far from you in these days. Pray simply. Rest fully. Be at peace.",
        prayer: "Lord, in this season of rest, let my heart remain near You. You see me fully and hold me gently.",
      }
    case "guarding":
      return {
        headline: "Guarding what you received",
        body: "You have received the Body and Blood of Christ. These days are a sacred threshold. Guard your tongue. Guard your peace. Stay close to prayer and away from noise. You carry something holy.",
        prayer: "Lord, let what I received remain alive within me. Protect me from carelessness and ingratitude.",
      }
    case "communion":
      return {
        headline: "This is your Communion day",
        body: "Approach with trembling, with joy, and with a heart that has been prepared. Arrive before the liturgy begins. Stand still. Receive with crossed arms. Give thanks for the rest of the day.",
        prayer: "Lord Jesus Christ, Son of God, have mercy on me, a sinner. And receive me at Your holy table.",
      }
    default:
      return {
        headline: "A quiet day",
        body: "Every ordinary day is a step toward the next Communion. You can use today to plan, to pray a small prayer, or simply to rest in the rhythm of the faith.",
        prayer: "Lord, let even my quiet days be hidden in You.",
      }
  }
}
