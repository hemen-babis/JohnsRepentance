import {
  addDays,
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns"

export type DayState = "neutral" | "preparation" | "communion" | "post" | "pause"

export type ChecklistState = {
  confession: boolean
  fasting: boolean
  peace: boolean
  prayer: boolean
}

export type DateEntry = {
  note: string
  checklist: ChecklistState
  completed: boolean
}

export type CommunionCalendarStore = {
  communionDates: string[]
  pauseDates: string[]
  entries: Record<string, DateEntry>
}

export const COMMUNION_STORAGE_KEY = "communion-calendar-system"

export const DEFAULT_CHECKLIST: ChecklistState = {
  confession: false,
  fasting: false,
  peace: false,
  prayer: false,
}

export const emptyStore = (): CommunionCalendarStore => ({
  communionDates: [],
  pauseDates: [],
  entries: {},
})

export function normalizeStore(value: unknown): CommunionCalendarStore {
  if (!value || typeof value !== "object") {
    return emptyStore()
  }

  const candidate = value as Partial<CommunionCalendarStore>
  const communionDates = Array.isArray(candidate.communionDates)
    ? candidate.communionDates.filter((item): item is string => typeof item === "string")
    : []
  const pauseDates = Array.isArray(candidate.pauseDates)
    ? candidate.pauseDates.filter((item): item is string => typeof item === "string")
    : []

  const rawEntries = candidate.entries && typeof candidate.entries === "object" ? candidate.entries : {}
  const entries = Object.fromEntries(
    Object.entries(rawEntries).map(([date, entry]) => {
      const safeEntry = entry as Partial<DateEntry> | undefined
      return [
        date,
        {
          note: typeof safeEntry?.note === "string" ? safeEntry.note : "",
          completed: Boolean(safeEntry?.completed),
          checklist: {
            confession: Boolean(safeEntry?.checklist?.confession),
            fasting: Boolean(safeEntry?.checklist?.fasting),
            peace: Boolean(safeEntry?.checklist?.peace),
            prayer: Boolean(safeEntry?.checklist?.prayer),
          },
        },
      ]
    }),
  )

  return {
    communionDates: Array.from(new Set(communionDates)).sort(),
    pauseDates: Array.from(new Set(pauseDates)).sort(),
    entries,
  }
}

export function toDateKey(value: Date): string {
  return format(value, "yyyy-MM-dd")
}

export function getMonthGrid(month: Date): Date[] {
  const start = startOfWeek(startOfMonth(month), { weekStartsOn: 0 })
  const monthEnd = endOfMonth(month)
  const end = addDays(start, 41)

  return eachDayOfInterval({
    start,
    end: isSameMonth(end, monthEnd) ? monthEnd : end,
  })
}

export function getDayState(date: Date, store: CommunionCalendarStore): DayState {
  const key = toDateKey(date)

  if (store.pauseDates.includes(key)) {
    return "pause"
  }

  if (store.communionDates.includes(key)) {
    return "communion"
  }

  for (const communionDate of store.communionDates) {
    const distance = differenceInCalendarDays(date, parseISO(communionDate))

    if (distance >= -3 && distance <= -1) {
      return "preparation"
    }

    if (distance >= 1 && distance <= 2) {
      return "post"
    }
  }

  return "neutral"
}

export function getStateLabel(date: Date, store: CommunionCalendarStore): string {
  const state = getDayState(date, store)

  if (state === "pause") {
    return "Pause Day"
  }

  if (state === "communion") {
    return "Communion Day"
  }

  for (const communionDate of store.communionDates) {
    const distance = differenceInCalendarDays(date, parseISO(communionDate))

    if (distance >= -3 && distance <= -1) {
      return `Preparation Day ${distance + 4}`
    }

    if (distance >= 1 && distance <= 2) {
      return `Post-Communion Day ${distance}`
    }
  }

  return "Neutral Day"
}

export function getGuidanceText(date: Date, store: CommunionCalendarStore): string {
  const state = getDayState(date, store)

  switch (state) {
    case "preparation":
      return "Prepare calmly with self-examination, prayer, peace with others, and the fasting kept with reverence."
    case "communion":
      return "This is your Communion day. Approach with reverence, stillness, confession, prayer, and readiness of heart."
    case "post":
      return "Guard the peace of the day. Stay prayerful, thankful, and gentle in word and thought."
    case "pause":
      return "Take time to prepare without pressure. Guidance can be received gently and prayerfully."
    default:
      return "A quiet day for reflection. You may use it to prepare the heart and body with peace."
  }
}

export type PrepGuidanceStep = {
  title: string
  description: string
  scriptureRef?: string
}

export type DetailedGuidance = {
  headline: string
  subline: string
  steps: PrepGuidanceStep[]
  color: string
}

export function getDetailedGuidance(date: Date, store: CommunionCalendarStore): DetailedGuidance {
  const state = getDayState(date, store)

  if (state === "preparation") {
    let distance = 0
    for (const communionDate of store.communionDates) {
      const d = differenceInCalendarDays(date, parseISO(communionDate))
      if (d >= -3 && d <= -1) {
        distance = d
        break
      }
    }
    const prepDay = distance + 4

    if (prepDay === 1) {
      return {
        headline: "Three Days Out",
        subline: "Begin the fast and examine your heart.",
        color: "#b45309",
        steps: [
          { title: "Begin the fast", description: "Abstain from meat, dairy, and all animal products. Fast with sincerity, not only habit." },
          { title: "Examine your conscience", description: "Sit quietly. Who did you wrong this week? What thoughts were given shelter that should not have been?" },
          { title: "Read Psalm 51", description: "The psalm of repentance. Read it slowly, as a personal confession before God.", scriptureRef: "Psalm 51" },
          { title: "Pray the Kidase preparation prayer", description: "Begin the liturgical preparation rhythm your church prescribes." },
        ],
      }
    }
    if (prepDay === 2) {
      return {
        headline: "Two Days Out",
        subline: "Deepen the fast. Seek peace with everyone.",
        color: "#92400e",
        steps: [
          { title: "Deepen the fast", description: "No food or drink until midday or 3 pm. Pray the fast — don't just keep it mechanically." },
          { title: "Seek peace with others", description: "\"If you bring your gift to the altar and remember your brother has something against you...\" (Matt 5:23). Resolve it today." },
          { title: "Attend Vespers if possible", description: "If your parish holds evening prayers, attend tonight. The church's rhythm is already preparing you." },
          { title: "Read the Sunday Qidase readings", description: "Know the scriptures before you enter the Divine Liturgy. Let the Word go before you." },
        ],
      }
    }
    return {
      headline: "One Day Out",
      subline: "The gate of confession opens today.",
      color: "#7c2d12",
      steps: [
        { title: "Go to Confession (Nessaha)", description: "This is the gate of Holy Communion. You must pass through it. Find your spiritual father today — do not let tomorrow come without it." },
        { title: "Fast from midnight", description: "After midnight tonight: no food, no water, not even a sip. This is the Tewahedo fast before receiving the Body of Christ." },
        { title: "Recite the Tezekar", description: "Pray the liturgical prayers appointed for the night before Communion." },
        { title: "Rest your mind", description: "No argument, no screens, no noise after evening prayer. Sleep as someone preparing to receive the King of Heaven." },
      ],
    }
  }

  if (state === "communion") {
    return {
      headline: "Communion Day",
      subline: "Approach with trembling and with great joy.",
      color: "#0f766e",
      steps: [
        { title: "Arrive before the Liturgy begins", description: "Do not rush into the presence of God. Be there before the deacons take their place." },
        { title: "Stand with reverence throughout", description: "The Qidase is a descent of Heaven. No phone, no wandering eye, no restless body. This is the Holy of Holies." },
        { title: "Receive with crossed arms", description: "Arms crossed over the chest: a sign of unworthiness. You are not taking — you are receiving a gift you did not earn." },
        { title: "Guard what you have received", description: "Do not eat or drink immediately after. Spend time in prayer and thanksgiving. The Body of Christ is within you." },
      ],
    }
  }

  if (state === "post") {
    let distance = 0
    for (const communionDate of store.communionDates) {
      const d = differenceInCalendarDays(date, parseISO(communionDate))
      if (d >= 1 && d <= 2) {
        distance = d
        break
      }
    }

    if (distance === 1) {
      return {
        headline: "Post-Communion Day 1",
        subline: "Guard the gift you received yesterday.",
        color: "#1d4ed8",
        steps: [
          { title: "Break your fast gently", description: "The body has been a temple. Begin with simple, gentle food. No feast, no rush." },
          { title: "Watch your tongue carefully", description: "Idle talk, anger, and noise are enemies of the grace you carry. Every word today matters more." },
          { title: "Pray a thanksgiving prayer", description: "A psalm, a Mezmur, or a quiet thank-you. You received the Body and Blood of Christ." },
          { title: "Read about a Saint", description: "Spend time with the lives of those who guarded communion with holiness and transformed the world." },
        ],
      }
    }
    return {
      headline: "Post-Communion Day 2",
      subline: "Return gently. Carry the altar with you.",
      color: "#4338ca",
      steps: [
        { title: "Return to your regular rhythm", description: "The liturgy has sent you back into the world. Go — but carry the Kingdom inside you." },
        { title: "Remember what you received", description: "You are a communicant. That is your identity before you are anything else today." },
        { title: "Plan your next Communion", description: "When will you receive again? Plan it now, while the grace is still fresh. Don't let it drift." },
      ],
    }
  }

  if (state === "pause") {
    return {
      headline: "Pause Day",
      subline: "Rest in peace. Do not condemn yourself.",
      color: "#6b7280",
      steps: [
        { title: "Do not condemn yourself", description: "A pause is not a failure. Sometimes the body, the season, or the heart requires rest." },
        { title: "Pray simply", description: "\"Lord Jesus Christ, Son of God, have mercy on me, a sinner.\" This is enough for today." },
        { title: "Speak with your spiritual father", description: "If this pause has stretched longer than a season, speak with him. He is there to shepherd, not to judge." },
      ],
    }
  }

  return {
    headline: "A Quiet Day",
    subline: "The rhythm of preparation begins whenever you choose.",
    color: "#8b6a2b",
    steps: [
      { title: "Schedule your next Communion", description: "Set a date. Tell your spiritual father. Make it intentional — do not let it remain a vague intention." },
      { title: "Keep the daily rhythm", description: "Morning prayer, evening prayer, the sign of the cross. The rhythm is itself a form of preparation." },
      { title: "Read Psalm 51 or 91", description: "Let the Word begin preparing the soil of your heart before the season of preparation arrives.", scriptureRef: "Psalm 51 or 91" },
    ],
  }
}

export function getNextCommunionDate(store: CommunionCalendarStore): Date | null {
  const todayKey = toDateKey(new Date())
  const future = store.communionDates.filter((d) => d >= todayKey).sort()
  return future.length > 0 ? parseISO(future[0]) : null
}

export function getDaysUntilNextCommunion(store: CommunionCalendarStore): number | null {
  const next = getNextCommunionDate(store)
  if (!next) return null
  return differenceInCalendarDays(next, new Date())
}

export function getCommunionCount(store: CommunionCalendarStore): number {
  return store.communionDates.length
}

export function getChecklistProgress(date: Date, store: CommunionCalendarStore): number {
  const key = toDateKey(date)
  const entry = store.entries[key]
  if (!entry) return 0
  const { confession, fasting, peace, prayer } = entry.checklist
  const total = [confession, fasting, peace, prayer].filter(Boolean).length
  return Math.round((total / 4) * 100)
}

export function markCommunionDate(store: CommunionCalendarStore, date: Date): CommunionCalendarStore {
  const key = toDateKey(date)

  return {
    ...store,
    communionDates: Array.from(new Set([...store.communionDates, key])).sort(),
    pauseDates: store.pauseDates.filter((item) => item !== key),
  }
}

export function togglePauseDate(store: CommunionCalendarStore, date: Date): CommunionCalendarStore {
  const key = toDateKey(date)
  const hasPause = store.pauseDates.includes(key)

  return {
    ...store,
    pauseDates: hasPause ? store.pauseDates.filter((item) => item !== key) : [...store.pauseDates, key].sort(),
    communionDates: hasPause ? store.communionDates : store.communionDates.filter((item) => item !== key),
  }
}

export function updateDateEntry(
  store: CommunionCalendarStore,
  dateKey: string,
  updater: (entry: DateEntry) => DateEntry,
): CommunionCalendarStore {
  const currentEntry = store.entries[dateKey] ?? {
    note: "",
    checklist: DEFAULT_CHECKLIST,
    completed: false,
  }

  return {
    ...store,
    entries: {
      ...store.entries,
      [dateKey]: updater({
        ...currentEntry,
        checklist: { ...currentEntry.checklist },
      }),
    },
  }
}
