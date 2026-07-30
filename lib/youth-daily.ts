import { addDays, format, getDayOfYear, parseISO } from "date-fns"

// ─── Habit types ──────────────────────────────────────────────────────────────

export type HabitKey = "morning-prayer" | "scripture" | "fasting" | "evening-prayer" | "kindness"

export type HabitDef = {
  key: HabitKey
  label: string
  sub: string
  fastingOnly?: boolean
}

export const DAILY_HABITS: HabitDef[] = [
  { key: "morning-prayer", label: "Morning Prayer", sub: "Prayed before opening your phone" },
  { key: "scripture", label: "Scripture", sub: "Read or listened to today's verse" },
  { key: "fasting", label: "Fasting", sub: "Abstained from meat, dairy, animal products", fastingOnly: true },
  { key: "evening-prayer", label: "Evening Prayer", sub: "Closed the day in prayer" },
  { key: "kindness", label: "Act of Love", sub: "Did something kind for someone today" },
]

export function isFastingDay(date: Date = new Date()): boolean {
  const day = date.getDay()
  return day === 3 || day === 5 // Wed or Fri
}

export function getVisibleHabits(date: Date = new Date()): HabitDef[] {
  return DAILY_HABITS.filter((h) => !h.fastingOnly || isFastingDay(date))
}

// ─── Storage ──────────────────────────────────────────────────────────────────

const HABIT_PREFIX = "youth-habits-v1-"
const CHECKIN_KEY = "youth-checkins-v1"

function dateKey(date: Date = new Date()): string {
  return format(date, "yyyy-MM-dd")
}

export type HabitRecord = Partial<Record<HabitKey, boolean>>

export function loadTodayHabits(): HabitRecord {
  if (typeof window === "undefined") return {}
  try { return JSON.parse(localStorage.getItem(HABIT_PREFIX + dateKey()) ?? "{}") } catch { return {} }
}

export function saveHabit(key: HabitKey, done: boolean): void {
  if (typeof window === "undefined") return
  const record = loadTodayHabits()
  record[key] = done
  localStorage.setItem(HABIT_PREFIX + dateKey(), JSON.stringify(record))
  if (done) recordCheckin()
}

function recordCheckin(): void {
  const dates = loadCheckinDates()
  const today = dateKey()
  if (!dates.includes(today)) {
    dates.push(today)
    localStorage.setItem(CHECKIN_KEY, JSON.stringify(dates))
  }
}

export function loadCheckinDates(): string[] {
  if (typeof window === "undefined") return []
  try { return JSON.parse(localStorage.getItem(CHECKIN_KEY) ?? "[]") } catch { return [] }
}

export function computeStreak(dates: string[]): number {
  if (dates.length === 0) return 0
  const sorted = [...new Set(dates)].sort((a, b) => b.localeCompare(a))
  const today = dateKey()
  const yesterday = dateKey(addDays(new Date(), -1))
  if (sorted[0] !== today && sorted[0] !== yesterday) return 0
  let streak = 0
  let cursor = sorted[0] === today ? today : yesterday
  for (const date of sorted) {
    if (date === cursor) {
      streak++
      cursor = dateKey(addDays(parseISO(cursor), -1))
    } else if (date < cursor) {
      break
    }
  }
  return streak
}

export function habitScore(record: HabitRecord, habits: HabitDef[]): number {
  return habits.filter((h) => record[h.key]).length
}

// ─── Rotating verse of the day ────────────────────────────────────────────────

export type DailyVerse = {
  text: string
  reference: string
  reflectionLine: string
}

const VERSE_POOL: DailyVerse[] = [
  { text: "Seek first the kingdom of God and His righteousness, and all these things shall be added to you.", reference: "Matthew 6:33", reflectionLine: "Let your first yes today belong to God, before your mood, your notifications, or your fear." },
  { text: "I can do all things through Christ who strengthens me.", reference: "Philippians 4:13", reflectionLine: "The strength you need today is not yours to manufacture. Ask for it." },
  { text: "Trust in the Lord with all your heart, and lean not on your own understanding.", reference: "Proverbs 3:5", reflectionLine: "Your mind is not the final word. God's word is." },
  { text: "Be still, and know that I am God.", reference: "Psalm 46:10", reflectionLine: "Stillness is not emptiness. It is making room for Someone to speak." },
  { text: "The Lord is my shepherd; I shall not want.", reference: "Psalm 23:1", reflectionLine: "When you feel lack today, you have not been abandoned. You have a Shepherd." },
  { text: "Come to me, all who labor and are heavy laden, and I will give you rest.", reference: "Matthew 11:28", reflectionLine: "He is not asking you to be less tired. He is asking you to bring the weight to Him." },
  { text: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.", reference: "Jeremiah 29:11", reflectionLine: "The confusion you feel today doesn't mean God has lost the blueprint." },
  { text: "Create in me a clean heart, O God, and renew a right spirit within me.", reference: "Psalm 51:10", reflectionLine: "You are allowed to ask for a fresh start today. This is exactly what that prayer is for." },
  { text: "The Lord your God is in your midst, a mighty one who will save; He will rejoice over you with gladness.", reference: "Zephaniah 3:17", reflectionLine: "God is not merely watching you. He is singing over you." },
  { text: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.", reference: "Philippians 4:6", reflectionLine: "Anxiety is a signal to pray. Not to spiral." },
  { text: "For God gave us a spirit not of fear but of power and love and self-control.", reference: "2 Timothy 1:7", reflectionLine: "The fear you are carrying today did not come from God. You can set it down." },
  { text: "But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles.", reference: "Isaiah 40:31", reflectionLine: "Waiting is not wasted time. It is the incubation of something stronger." },
  { text: "In the same way, let your light shine before others, so that they may see your good works and give glory to your Father who is in heaven.", reference: "Matthew 5:16", reflectionLine: "You are not just living for yourself. Someone is watching how you carry your faith." },
  { text: "The heart of man plans his way, but the Lord establishes his steps.", reference: "Proverbs 16:9", reflectionLine: "Make your plans with open hands. He may redirect. Trust the redirection." },
  { text: "Have I not commanded you? Be strong and courageous. Do not be frightened, and do not be dismayed.", reference: "Joshua 1:9", reflectionLine: "This is not a suggestion. It is a command from the One who holds the outcome." },
  { text: "Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come.", reference: "2 Corinthians 5:17", reflectionLine: "Your old identity is not your real identity. You have been remade." },
  { text: "The name of the Lord is a strong tower; the righteous man runs into it and is safe.", reference: "Proverbs 18:10", reflectionLine: "When you feel exposed today, run to the Name." },
  { text: "Delight yourself in the Lord, and He will give you the desires of your heart.", reference: "Psalm 37:4", reflectionLine: "The deepest desires you carry — God put them there. He is not against you wanting them." },
  { text: "And we know that for those who love God all things work together for good.", reference: "Romans 8:28", reflectionLine: "Not some things. All things. Even the thing that is breaking your heart right now." },
  { text: "I will give you a new heart, and a new spirit I will put within you.", reference: "Ezekiel 36:26", reflectionLine: "God does not only patch the old heart. He gives you a new one." },
  { text: "Cast your burden on the Lord, and He will sustain you.", reference: "Psalm 55:22", reflectionLine: "Burden is not meant to be carried alone. There is Someone asking to hold it with you." },
  { text: "The Lord is near to the brokenhearted and saves the crushed in spirit.", reference: "Psalm 34:18", reflectionLine: "Brokenness is not disqualifying. It is the exact address where God shows up." },
  { text: "Your word is a lamp to my feet and a light to my path.", reference: "Psalm 119:105", reflectionLine: "Not a floodlight. A lamp. Just enough for the next step. That is always enough." },
  { text: "Let all bitterness and wrath and anger and clamor and slander be put away from you.", reference: "Ephesians 4:31", reflectionLine: "Holding onto anger is a prison. You can unlock the door today." },
  { text: "Whoever abides in me and I in him, he it is that bears much fruit, for apart from me you can do nothing.", reference: "John 15:5", reflectionLine: "The fruitfulness you want is not about doing more. It is about staying connected to the Source." },
  { text: "For His anger is but for a moment, and His favor is for a lifetime. Weeping may tarry for the night, but joy comes with the morning.", reference: "Psalm 30:5", reflectionLine: "The night you are in will not last. Morning always comes." },
  { text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind.", reference: "Romans 12:2", reflectionLine: "The world is constantly trying to shape you. Only the Word reshapes from the inside." },
  { text: "He heals the brokenhearted and binds up their wounds.", reference: "Psalm 147:3", reflectionLine: "The healing you need is not a mystery to God. He is already at work." },
  { text: "No temptation has overtaken you that is not common to man. God is faithful, and He will not let you be tempted beyond your ability.", reference: "1 Corinthians 10:13", reflectionLine: "You are not the first person to face what you are facing. And there is a way out." },
  { text: "Humble yourselves before the Lord, and He will exalt you.", reference: "James 4:10", reflectionLine: "Pride is the one thing that blocks the flow of grace. Letting go of it is not weakness." },
  { text: "The Lord is my light and my salvation; whom shall I fear?", reference: "Psalm 27:1", reflectionLine: "Name the thing you fear today. Then name the One who is brighter than that darkness." },
  { text: "Let us not grow weary of doing good, for in due season we will reap, if we do not give up.", reference: "Galatians 6:9", reflectionLine: "The harvest is real. The due season is real. Do not quit before you see it." },
  { text: "Love is patient and kind; love does not envy or boast.", reference: "1 Corinthians 13:4", reflectionLine: "Real love is not a feeling first. It is a practice." },
  { text: "Restore to me the joy of your salvation, and uphold me with a willing spirit.", reference: "Psalm 51:12", reflectionLine: "Joy that has been lost can be restored. That is a prayer you are allowed to pray." },
  { text: "If we confess our sins, He is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.", reference: "1 John 1:9", reflectionLine: "Confession is not a burden. It is a door." },
  { text: "For I am sure that neither death nor life… will be able to separate us from the love of God in Christ Jesus.", reference: "Romans 8:38–39", reflectionLine: "Make a list of everything that has tried to separate you. Then read this verse again." },
  { text: "He who began a good work in you will bring it to completion at the day of Jesus Christ.", reference: "Philippians 1:6", reflectionLine: "You are not a finished project. God is still building." },
  { text: "Draw near to God, and He will draw near to you.", reference: "James 4:8", reflectionLine: "The distance you feel from God — you have more power to close it than you think." },
  { text: "The Lord is good, a stronghold in the day of trouble; He knows those who take refuge in Him.", reference: "Nahum 1:7", reflectionLine: "In trouble, a stronghold is what you need. Run to it." },
  { text: "Let the word of Christ dwell in you richly.", reference: "Colossians 3:16", reflectionLine: "Not dwell briefly. Not dwell occasionally. Richly." },
  { text: "You are the light of the world. A city set on a hill cannot be hidden.", reference: "Matthew 5:14", reflectionLine: "You are not trying to become something. You already are something. Live from that truth." },
  { text: "In returning and rest you shall be saved; in quietness and in trust shall be your strength.", reference: "Isaiah 30:15", reflectionLine: "Noise is the enemy of strength. Quiet is not a luxury. It is a necessity." },
  { text: "Peace I leave with you; my peace I give to you. Not as the world gives do I give to you.", reference: "John 14:27", reflectionLine: "The world's peace is always conditional. His peace arrives before the circumstances change." },
  { text: "The fear of the Lord is the beginning of wisdom.", reference: "Proverbs 9:10", reflectionLine: "Wisdom does not start with intelligence. It starts with knowing who God is." },
  { text: "I have been crucified with Christ. It is no longer I who live, but Christ who lives in me.", reference: "Galatians 2:20", reflectionLine: "The old self was nailed to the cross. You are allowed to stop dragging it around." },
  { text: "Blessed are the pure in heart, for they shall see God.", reference: "Matthew 5:8", reflectionLine: "Purity of heart is not about being perfect. It is about wanting only God at the center." },
  { text: "He gives power to the faint, and to him who has no might He increases strength.", reference: "Isaiah 40:29", reflectionLine: "Your exhaustion is not a sign of failure. It is a door to receive something you cannot generate yourself." },
  { text: "O Lord, you have searched me and known me.", reference: "Psalm 139:1", reflectionLine: "The parts of you that you are hiding from everyone else — God has already seen them. And He is still here." },
  { text: "Greater is He who is in you than he who is in the world.", reference: "1 John 4:4", reflectionLine: "Count the enemy's resources. Then count who lives inside you. Now decide." },
  { text: "For where your treasure is, there your heart will be also.", reference: "Matthew 6:21", reflectionLine: "Follow your attention today. It will tell you where your heart has decided to live." },
  { text: "Arise, shine, for your light has come, and the glory of the Lord has risen upon you.", reference: "Isaiah 60:1", reflectionLine: "This is your charge today. Not your request. Your commission." },
  { text: "But you are a chosen race, a royal priesthood, a holy nation, a people for His own possession.", reference: "1 Peter 2:9", reflectionLine: "This is your identity before it is your aspiration. You are already chosen." },
  { text: "Even though I walk through the valley of the shadow of death, I will fear no evil, for You are with me.", reference: "Psalm 23:4", reflectionLine: "He does not remove you from the valley. He walks with you through it." },
  { text: "Depart from evil, and do good; seek peace and pursue it.", reference: "Psalm 34:14", reflectionLine: "Peace is not passive. You pursue it. You choose it. You build it." },
  { text: "The righteous shall live by faith.", reference: "Romans 1:17", reflectionLine: "Not by certainty. Not by feeling. By faith. Step into the day with that." },
]

export function getVerseForDate(date: Date = new Date()): DailyVerse {
  const dayIndex = getDayOfYear(date) - 1
  return VERSE_POOL[dayIndex % VERSE_POOL.length]
}

// ─── Journal ──────────────────────────────────────────────────────────────────

const JOURNAL_KEY = "youth-journal-v1"

export type JournalEntry = {
  date: string
  text: string
  heartState?: string
}

export function loadJournalEntries(): JournalEntry[] {
  if (typeof window === "undefined") return []
  try { return JSON.parse(localStorage.getItem(JOURNAL_KEY) ?? "[]") } catch { return [] }
}

export function saveTodayJournal(text: string, heartState?: string): void {
  if (typeof window === "undefined") return
  const entries = loadJournalEntries()
  const today = dateKey()
  const rest = entries.filter((e) => e.date !== today)
  if (text.trim()) rest.push({ date: today, text: text.trim(), heartState })
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(rest.slice(-90)))
}

export function loadTodayJournal(): JournalEntry | null {
  return loadJournalEntries().find((e) => e.date === dateKey()) ?? null
}
