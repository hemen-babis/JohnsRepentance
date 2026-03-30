import synaxariumEntries from "@/data/synaxarium-index.json"

export type SynaxariumEntry = {
  month: string
  monthGeez: string
  day: number
  dateKey: string
  title: string
  saints: string[]
  preview: string
  fullText: string
}

const ETHIOPIAN_MONTHS = [
  "Meskerem",
  "Tekemt",
  "Hedar",
  "Tahsas",
  "Tir",
  "Yekatit",
  "Megabit",
  "Miyazia",
  "Ginbot",
  "Senne",
  "Hamle",
  "Nehasse",
  "Paguemen",
] as const

type EthiopianDate = {
  month: string
  monthGeez: string
  day: number
  year: number
  dateKey: string
  label: string
}

const monthGeezMap: Record<string, string> = {
  Meskerem: "መስከረም",
  Tekemt: "ጥቅምት",
  Hedar: "ህዳር",
  Tahsas: "ታህሳስ",
  Tir: "ጥር",
  Yekatit: "የካቲት",
  Megabit: "መጋቢት",
  Miyazia: "ሚያዝያ",
  Ginbot: "ግንቦት",
  Senne: "ሰኔ",
  Hamle: "ሀምሌ",
  Nehasse: "ነሐሴ",
  Paguemen: "ጳጉሜ",
}

const monthNameAliases: Record<string, string> = {
  meskerem: "Meskerem",
  maskaram: "Meskerem",
  tekemt: "Tekemt",
  tikimt: "Tekemt",
  hedar: "Hedar",
  hidar: "Hedar",
  tahsas: "Tahsas",
  tir: "Tir",
  yekatit: "Yekatit",
  megabit: "Megabit",
  miyazia: "Miyazia",
  miyazya: "Miyazia",
  ginbot: "Ginbot",
  senne: "Senne",
  sene: "Senne",
  hamle: "Hamle",
  nehasse: "Nehasse",
  nehase: "Nehasse",
  paguemen: "Paguemen",
  pagumen: "Paguemen",
}

const typedEntries = synaxariumEntries as SynaxariumEntry[]
const completeEntries = [...typedEntries].sort((left, right) => {
  const monthDistance =
    ETHIOPIAN_MONTHS.indexOf(left.month as (typeof ETHIOPIAN_MONTHS)[number]) -
    ETHIOPIAN_MONTHS.indexOf(right.month as (typeof ETHIOPIAN_MONTHS)[number])

  if (monthDistance !== 0) return monthDistance
  return left.day - right.day
})

export const allSynaxariumEntries = completeEntries

export function normalizeEthiopianMonthName(month: string) {
  return monthNameAliases[month.trim().toLowerCase()] ?? month.trim()
}

export function getEthiopianDate(date = new Date()): EthiopianDate {
  const englishParts = new Intl.DateTimeFormat("en-u-ca-ethiopic", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).formatToParts(date)

  const amharicParts = new Intl.DateTimeFormat("am-ET-u-ca-ethiopic", {
    month: "long",
  }).formatToParts(date)

  const month = normalizeEthiopianMonthName(englishParts.find((part) => part.type === "month")?.value ?? "Meskerem")
  const day = Number(englishParts.find((part) => part.type === "day")?.value ?? "1")
  const year = Number(englishParts.find((part) => part.type === "year")?.value ?? "2018")
  const monthGeez = amharicParts.find((part) => part.type === "month")?.value ?? monthGeezMap[month] ?? month

  return {
    month,
    monthGeez,
    day,
    year,
    dateKey: `${month}-${day}`,
    label: `${month} ${day}`,
  }
}

export function formatGregorianDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function getSaintsForToday(date = new Date()) {
  const ethiopianDate = getEthiopianDate(date)
  const entry = completeEntries.find((item) => item.dateKey === ethiopianDate.dateKey) ?? completeEntries[0] ?? null

  return {
    ethiopianDate,
    entry,
  }
}

export function searchSynaxariumEntries(query: string) {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) return completeEntries

  return completeEntries.filter((entry) => {
    const matchesDate =
      entry.title.toLowerCase().includes(trimmed) ||
      entry.month.toLowerCase().includes(trimmed) ||
      entry.monthGeez.includes(query.trim()) ||
      `${entry.day}` === trimmed

    const matchesSaint = entry.saints.some((saint) => saint.toLowerCase().includes(trimmed))
    const matchesText = entry.fullText.toLowerCase().includes(trimmed)

    return matchesDate || matchesSaint || matchesText
  })
}

export function getRandomSynaxariumEntry(excludeDateKey?: string) {
  const pool = excludeDateKey ? completeEntries.filter((entry) => entry.dateKey !== excludeDateKey) : completeEntries
  return pool[Math.floor(Math.random() * pool.length)] ?? null
}
