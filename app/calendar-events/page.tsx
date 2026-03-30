"use client"

import { useMemo, useState } from "react"
import { format } from "date-fns"
import { CalendarDays, Clock3, MapPin, Plus, Check, BookOpenText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthProgress } from "@/components/providers/auth-progress-provider"
import { liturgicalReadings } from "./_components/liturgical-readings-data"
import { ReadingModal } from "./_components/reading-modal"

const ethiopicEnFormatter = new Intl.DateTimeFormat("en-ET-u-ca-ethiopic", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

const saintDaysBilingual: Record<number, { am: string; en: string }> = {
  1: { am: "ልደታ (ቅድስት ማርያም) እና ኤልያስ", en: "Lideta (Birth of St. Mary) and Elias" },
  2: { am: "ታድዮስ", en: "Thaddius" },
  3: { am: "ባእታ (ማርያም ማቅረቢያ)", en: "Ba'eta (Presentation of Mary)" },
  4: { am: "ዮሐንስ ወልደ ነግድክዋድ", en: "Yohannis Wolde Negedquad" },
  5: { am: "ጴጥሮስ እና ጳውሎስ እና ገብረ መንፈስ ቅዱስ", en: "Petros and Paulos, Gebre Menfes Kidus" },
  6: { am: "እመቤታችን ቁስቋም", en: "Our Lady of Qusquam" },
  7: { am: "ቅድስት ሥላሴ", en: "Holy Trinity" },
  8: { am: "ኪሮስ እና አባ ባኑዳ", en: "Kiros and Abba Banuda" },
  9: { am: "ቶማስ", en: "Thomas (not the Apostle)" },
  10: { am: "ቅዱስ መስቀል", en: "Kidus Meskel (Holy Cross)" },
  11: { am: "ሐና እና ኢያከም", en: "Hanna and Iyachem" },
  12: { am: "ሚካኤል አርእስት መላእክት", en: "Michael, Chief of Angels" },
  13: { am: "እግዚአብሔር አብ እና ሩፋኤል", en: "God the Father and Ruphael" },
  14: { am: "አባ አረጋዊ እና ገብረ ክርስቶስ", en: "Abba Aregawi and Gebre Kristos" },
  15: { am: "ቅዱስ ኪርቆስ እና እናቱ ኢያሎታ", en: "Kirkos and his mother Iyalota" },
  16: { am: "ኪዳነ ምህረት", en: "Kidane Meheret (Covenant of Mercy)" },
  17: { am: "እስጢፋኖስ እና አባ ገሪማ", en: "Estifanos and Abba Gerima" },
  18: { am: "እውስጣጥዎስ", en: "Ewstatewos" },
  19: { am: "ቅዱስ ገብርኤል", en: "Saint Gabriel" },
  20: { am: "ህንሳታ", en: "Hnstata" },
  21: { am: "ቅድስት ማርያም", en: "Saint Mary" },
  22: { am: "ደቅስዮስ", en: "Deqsius" },
  23: { am: "ቅዱስ ጊዮርጊስ", en: "Saint George" },
  24: { am: "አባ ተክለ ሃይማኖት እና አራት አሰናት", en: "Abba Tekle Haimanot and Four Heavenly Orders" },
  25: { am: "መርቆርዮስ", en: "Merkorios" },
  26: { am: "ቶማስ ሐዋርያ", en: "Thomas the Apostle" },
  27: { am: "መድኃኔ ዓለም", en: "Medhane Alem" },
  28: { am: "ኢማኑኤል", en: "Emmanuel" },
  29: { am: "በእልደውልድ (እግዚአብሔር ልጅ)", en: "Bale Wold (God the Son)" },
  30: { am: "ማርቆስ", en: "Markos (St. Mark)" },
}

type EventCatalogItem = {
  id: string
  titleEn: string
  titleAm: string
  type: "Service" | "Fast" | "Teaching" | "Community"
  date: string
  timeLabel: string
  location: string
  details: string
}

type BilingualLabel = {
  am: string
  en: string
}

type DateOverride = {
  date: string
  feast?: BilingualLabel
  fasts?: BilingualLabel[]
}

const eventCatalog: EventCatalogItem[] = [
  {
    id: "catechumen-class-weekly",
    titleEn: "Catechumen Class (Open to All)",
    titleAm: "የካቴኩሜን ትምህርት (ለሁሉም ክፍት)",
    type: "Teaching",
    date: "2026-02-20",
    timeLabel: "Every Friday, 6:00 PM - 8:00 PM",
    location: "Taught by MT Dn. Kidus Adugna",
    details: "Recurring weekly class for all.",
  },
  {
    id: "service-learning-weekly",
    titleEn: "Learning About Service (Deacons Encouraged)",
    titleAm: "ስለ አገልግሎት ትምህርት (ዲያቆናት ይበረታታሉ)",
    type: "Teaching",
    date: "2026-02-25",
    timeLabel: "Every Wednesday, 3:00 PM - 4:00 PM",
    location: "Taught by MT Dn. Kidus Adugna",
    details: "Recurring weekly class focused on service.",
  },
]

function dateKey(date: Date) {
  return format(date, "yyyy-MM-dd")
}

function ethiopianParts(date: Date) {
  const en = ethiopicEnFormatter.formatToParts(date)
  const day = Number.parseInt(en.find((p) => p.type === "day")?.value ?? "1", 10)
  const rawMonth = en.find((p) => p.type === "month")?.value ?? "Meskerem"
  const monthAliases: Record<string, string> = {
    Tekemt: "Tikimt",
    Hedar: "Hidar",
    Ter: "Tir",
    Genbot: "Ginbot",
    Nehasse: "Nehase",
  }
  const month = monthAliases[rawMonth] ?? rawMonth
  return { day, month }
}

const monthOrder = ["Meskerem", "Tikimt", "Hidar", "Tahsas", "Tir", "Yekatit", "Megabit", "Miazia", "Ginbot", "Sene", "Hamle", "Nehase", "Pagumen"]

const majorFasts = [
  {
    label: { am: "ሁዳዲ (ትንሣኤ ፆም)", en: "Hudadi (Great Lent)" },
    start: { month: "Yekatit", day: 14 },
    end: { month: "Miazia", day: 5 },
  },
  {
    label: { am: "ገና ፆም", en: "Advent Fast (Gena Fast)" },
    start: { month: "Hidar", day: 15 },
    end: { month: "Tahsas", day: 28 },
  },
  {
    label: { am: "ፍልሰታ ፆም", en: "Filseta Fast" },
    start: { month: "Nehase", day: 1 },
    end: { month: "Nehase", day: 16 },
  },
  {
    label: { am: "የነነዌ ፆም (ሦስት ቀን)", en: "Fast of Nineveh (3 days)" },
    start: { month: "Yekatit", day: 7 },
    end: { month: "Yekatit", day: 9 },
  },
]

const fixedFastMilestones: Array<{ month: string; day: number; label: BilingualLabel }> = [
  { month: "Yekatit", day: 14, label: { am: "ሁዳዲ (ትንሣኤ ፆም) መጀመሪያ", en: "Start of Great Lent" } },
  { month: "Hidar", day: 15, label: { am: "ገና ፆም መጀመሪያ", en: "Start of Advent Fast" } },
  { month: "Tahsas", day: 28, label: { am: "ገና ፆም መጨረሻ", en: "End of Advent Fast" } },
  { month: "Nehase", day: 1, label: { am: "ፍልሰታ ፆም መጀመሪያ", en: "Start of Filseta Fast" } },
  { month: "Nehase", day: 16, label: { am: "ፍልሰታ ፆም መጨረሻ", en: "End of Filseta Fast" } },
]

const dateOverrides: DateOverride[] = [
  {
    date: "2026-04-09",
    feast: { am: "ጸሎተ ሐሙስ", en: "Tselote Hamus (Maundy Thursday)" },
    fasts: [{ am: "ጸሎተ ሐሙስ", en: "Tselote Hamus (Maundy Thursday)" }],
  },
  {
    date: "2026-04-10",
    feast: { am: "ስቅለት", en: "Siklet (Good Friday)" },
    fasts: [{ am: "ስቅለት", en: "Siklet (Good Friday)" }],
  },
  {
    date: "2026-04-12",
    feast: { am: "ትንሣኤ", en: "Tinśae (Fasika / Easter)" },
    fasts: [],
  },
]

function monthDayValue(month: string, day: number) {
  const index = monthOrder.indexOf(month)
  return index >= 0 ? index * 30 + day : -1
}

function isInRange(month: string, day: number, start: { month: string; day: number }, end: { month: string; day: number }) {
  const currentValue = monthDayValue(month, day)
  const startValue = monthDayValue(start.month, start.day)
  const endValue = monthDayValue(end.month, end.day)
  return currentValue >= startValue && currentValue <= endValue
}

function getFastsForDate(date: Date, ethMonth: string, ethDay: number): BilingualLabel[] {
  const results: BilingualLabel[] = []
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" })
  const gDate = format(date, "yyyy-MM-dd")
  const override = dateOverrides.find((item) => item.date === gDate)
  if (override && override.fasts) {
    return override.fasts
  }

  // Requested 2026 Paschal exemption window: no fasting from Tinśae to June 1.
  if (gDate >= "2026-04-12" && gDate < "2026-06-01") {
    return []
  }

  const weeklyAllowed = gDate < "2026-04-12" || gDate >= "2026-06-01"
  if (weeklyAllowed && weekday === "Wednesday") results.push({ am: "የረቡዕ ፆም", en: "Wednesday Fast" })
  if (weeklyAllowed && weekday === "Friday") results.push({ am: "የአርብ ፆም", en: "Friday Fast" })

  for (const fast of majorFasts) {
    if (isInRange(ethMonth, ethDay, fast.start, fast.end)) {
      results.push(fast.label)
    }
  }

  for (const milestone of fixedFastMilestones) {
    if (milestone.month === ethMonth && milestone.day === ethDay) {
      results.push(milestone.label)
    }
  }

  // 2026 exact fasting schedule requested by parish
  if (gDate >= "2026-02-16" && gDate <= "2026-04-10") {
    results.push({ am: "ዐቢይ ጾም", en: "Great Lent" })
  }
  if (gDate >= "2026-04-06" && gDate <= "2026-04-08") {
    results.push({ am: "ሰሙነ ሕማማት", en: "Semune Himamat (Holy Week / Week of Suffering)" })
  }
  if (gDate === "2026-04-09") {
    results.push({ am: "ጸሎተ ሐሙስ", en: "Tselote Hamus (Maundy Thursday)" })
  }
  if (gDate === "2026-04-10") {
    results.push({ am: "ስቅለት", en: "Siklet (Good Friday)" })
  }
  if (gDate >= "2026-06-01" && gDate <= "2026-07-11") {
    results.push({ am: "ጾመ ሐዋርያት", en: "Hawaryat Tsom (Fast of the Apostles)" })
  }

  // De-duplicate labels
  const seen = new Set<string>()
  return results.filter((item) => {
    const key = `${item.am}|${item.en}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function chipStyle(type: EventCatalogItem["type"]) {
  if (type === "Fast") return "bg-orange-600 text-white"
  if (type === "Service") return "bg-stone-700 text-white"
  if (type === "Teaching") return "bg-amber-600 text-white"
  return "bg-emerald-600 text-white"
}

export default function CalendarEventsPage() {
  const { progress, setCalendarAddedEventIds } = useAuthProgress()
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const now = new Date()
    now.setHours(12, 0, 0, 0)
    return now
  })
  const [readingModalOpen, setReadingModalOpen] = useState(false)
  const [modalReadingKey, setModalReadingKey] = useState<string | null>(null)
  const addedIds = progress.calendarAddedEventIds

  const selectedKey = dateKey(selectedDate)
  const selectedEth = ethiopianParts(selectedDate)
  const selectedReadingKey = `${selectedEth.month} ${selectedEth.day}`
  const todayEth = ethiopianParts(new Date())
  const todayReadingKey = `${todayEth.month} ${todayEth.day}`
  const selectedGDate = format(selectedDate, "yyyy-MM-dd")
  const override = dateOverrides.find((item) => item.date === selectedGDate)
  const saint = override?.feast ?? saintDaysBilingual[selectedEth.day] ?? { am: "ቅዱሳንን እንከብራለን።", en: "Commemoration of saints." }
  const fastsToday = getFastsForDate(selectedDate, selectedEth.month, selectedEth.day)
  const selectedReading = liturgicalReadings[selectedReadingKey]
  const todayReading = liturgicalReadings[todayReadingKey]
  const modalReading = modalReadingKey ? liturgicalReadings[modalReadingKey] ?? null : null

  const addedEvents = useMemo(() => eventCatalog.filter((event) => addedIds.includes(event.id)), [addedIds])
  const eventsForSelectedDay = useMemo(() => addedEvents.filter((event) => event.date === selectedKey), [addedEvents, selectedKey])

  const calendarMarkedDays = useMemo(
    () => addedEvents.map((event) => new Date(`${event.date}T12:00:00`)),
    [addedEvents],
  )
  const readingMarkedDays = useMemo(() => {
    const results: Date[] = []
    const start = new Date("2025-09-14T12:00:00")
    const end = new Date("2026-09-06T12:00:00")

    for (const cursor = new Date(start); cursor <= end; cursor.setDate(cursor.getDate() + 1)) {
      const { month, day } = ethiopianParts(cursor)
      const key = `${month} ${day}`
      if (liturgicalReadings[key]) {
        results.push(new Date(cursor))
      }
    }

    return results
  }, [])
  const feastMarkedDays = useMemo(
    () => dateOverrides.filter((item) => item.feast).map((item) => new Date(`${item.date}T12:00:00`)),
    [],
  )

  const toggleAdd = (id: string) => {
    setCalendarAddedEventIds(addedIds.includes(id) ? addedIds.filter((item) => item !== id) : [...addedIds, id])
  }

  const openReadingModal = (key: string) => {
    if (!liturgicalReadings[key]) return
    setModalReadingKey(key)
    setReadingModalOpen(true)
  }

  return (
    <div className="light-mode-adaptive-page min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,244,220,0.72)_0%,_rgba(247,236,213,0.92)_34%,_rgba(239,227,204,1)_100%)] dark:bg-none dark:bg-gradient-to-b dark:from-[#120d09] dark:via-[#24140d] dark:to-[#140d09]">
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-amber-300/55 bg-[linear-gradient(135deg,rgba(251,241,216,0.94),rgba(245,231,202,0.84))] p-6 shadow-[0_26px_70px_-34px_rgba(120,53,15,0.2)] backdrop-blur dark:border-orange-900/30 dark:bg-[linear-gradient(135deg,rgba(58,36,24,0.9),rgba(29,19,15,0.94))]">
          <div className="pointer-events-none absolute inset-0 opacity-0 dark:opacity-100 dark:bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.08),transparent_28%),radial-gradient(circle_at_20%_30%,rgba(249,115,22,0.08),transparent_20%)]" />
          <p className="relative mb-2 inline-flex rounded-full bg-amber-200/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-900 dark:bg-orange-500/14 dark:text-amber-300">
            Liturgical Planner
          </p>
          <h1 className="relative text-3xl font-black tracking-tight text-stone-900 dark:text-white md:text-5xl">Calendar + Events</h1>
          <p className="relative mt-3 max-w-2xl text-sm leading-7 text-stone-600 dark:text-[#f3e7d7]/82 md:text-base">
            Ethiopian Orthodox liturgical calendar with feast and fasting agenda.
          </p>
        </div>

        <Tabs defaultValue="calendar" className="space-y-5">
          <TabsList className="grid w-full max-w-md grid-cols-2 rounded-2xl border border-amber-300/55 bg-[linear-gradient(135deg,rgba(246,236,215,0.92),rgba(238,226,203,0.82))] p-1 shadow-[0_10px_30px_-20px_rgba(120,53,15,0.18)] dark:border-orange-900/25 dark:bg-[linear-gradient(180deg,rgba(41,28,21,0.94),rgba(24,17,14,0.95))]">
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-4">
            <Card className="border-amber-300/50 bg-[linear-gradient(180deg,rgba(250,240,219,0.94),rgba(243,233,212,0.86))] shadow-[0_18px_50px_-28px_rgba(120,53,15,0.16)] dark:border-orange-900/25 dark:bg-[linear-gradient(180deg,rgba(47,31,24,0.96),rgba(24,17,14,0.95))]">
              <CardContent className="grid gap-4 p-4 md:grid-cols-[1fr_auto] md:items-center md:p-5">
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">Today&apos;s Reading</p>
                  <p className="text-xl font-bold text-stone-900 dark:text-stone-100">
                    {todayReading ? todayReading.date : "No reading loaded for today yet"}
                  </p>
                  <p className="text-sm text-stone-600 dark:text-stone-300">
                    Open the Sunday liturgical readings instantly from the calendar.
                  </p>
                </div>
                <div className="flex flex-col gap-3 md:items-end">
                  {todayReading ? (
                    <Button onClick={() => openReadingModal(todayReadingKey)} className="bg-orange-600 hover:bg-orange-500 text-white">
                      <BookOpenText className="mr-2 h-4 w-4" />
                      Open Today&apos;s Reading
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
              <Card className="border-amber-300/50 bg-[linear-gradient(180deg,rgba(250,240,219,0.94),rgba(243,233,212,0.86))] shadow-[0_18px_50px_-28px_rgba(120,53,15,0.16)] dark:border-orange-900/25 dark:bg-[linear-gradient(180deg,rgba(41,28,21,0.96),rgba(21,16,13,0.95))]">
                <CardHeader>
                  <CardTitle className="text-lg dark:text-white">Monthly Calendar</CardTitle>
                  <CardDescription className="dark:text-[#f3e7d7]/70">Pick a date to see agenda and any Sunday readings that are loaded.</CardDescription>
                </CardHeader>
                <CardContent className="px-3 pb-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    modifiers={{ hasEvent: calendarMarkedDays, hasReading: readingMarkedDays, feastDay: feastMarkedDays }}
                    modifiersClassNames={{
                      hasEvent: "bg-orange-100 dark:bg-orange-950/50",
                      hasReading: "border border-orange-400 bg-orange-100 text-orange-900 dark:bg-orange-950/50 dark:text-orange-200",
                      feastDay: "border border-violet-400 bg-violet-100 text-violet-900 dark:bg-violet-950/50 dark:text-violet-200",
                    }}
                    className="mx-auto w-full max-w-[320px] rounded-2xl border border-amber-300/55 bg-[linear-gradient(180deg,rgba(248,239,220,0.95),rgba(241,232,212,0.88))] p-2 [--cell-size:2.2rem] md:[--cell-size:2.35rem] dark:border-orange-900/25 dark:bg-[linear-gradient(180deg,rgba(30,22,18,0.96),rgba(19,14,11,0.94))]"
                    classNames={{
                      root: "w-full",
                      months: "w-full",
                      month: "w-full space-y-3",
                      month_caption: "flex items-center justify-center pt-1",
                      caption_label: "text-base font-semibold tracking-tight",
                      nav: "flex items-center gap-1",
                      button_previous: "h-8 w-8 rounded-full border border-amber-300/60 bg-amber-50 hover:bg-amber-100 dark:border-stone-700 dark:bg-stone-800 dark:hover:bg-stone-700",
                      button_next: "h-8 w-8 rounded-full border border-amber-300/60 bg-amber-50 hover:bg-amber-100 dark:border-stone-700 dark:bg-stone-800 dark:hover:bg-stone-700",
                      weekdays: "grid grid-cols-7 gap-1",
                      weekday: "text-[12px] font-medium text-stone-500",
                      week: "grid grid-cols-7 gap-1",
                      day: "h-9 w-9 rounded-xl text-sm font-medium hover:bg-amber-100 dark:hover:bg-stone-800",
                      today: "ring-1 ring-orange-300",
                      selected: "bg-orange-500 text-white hover:bg-orange-500",
                    }}
                  />
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-amber-300/50 bg-[linear-gradient(180deg,rgba(250,240,219,0.94),rgba(243,233,212,0.86))] shadow-[0_18px_50px_-28px_rgba(120,53,15,0.16)] dark:border-orange-900/25 dark:bg-[linear-gradient(180deg,rgba(43,30,23,0.98),rgba(19,14,11,0.96))]">
                <CardHeader className="border-b border-amber-200/60 bg-gradient-to-r from-[#f2e6cc] to-[#f6ecd6] pb-4 dark:border-orange-900/25 dark:bg-[linear-gradient(135deg,rgba(68,46,34,0.96),rgba(38,27,21,0.92))]">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">{format(selectedDate, "EEEE, MMMM d")}</h2>
                    <p className="text-lg font-semibold text-stone-700 dark:text-stone-200">{selectedEth.month} {selectedEth.day}</p>
                  </div>
                  <p className="text-sm text-muted-foreground dark:text-[#f3e7d7]/74">{ethiopicEnFormatter.format(selectedDate)} (E.C.)</p>
                  <p className="text-xs text-muted-foreground dark:text-[#f3e7d7]/58">
                    2026 fast timeline: Great Lent (Feb 16 - Apr 10), Semune Himamat (Apr 6 - Apr 8), Tselote Hamus (Apr 9), Siklet (Apr 10), Hawaryat Tsom (Jun 1 - Jul 11).
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge className="bg-violet-700 text-white">Feast Day</Badge>
                    <Badge className="bg-rose-600 text-white">{fastsToday.length === 0 ? "No Fast Today" : `${fastsToday.length} Fast Item${fastsToday.length > 1 ? "s" : ""}`}</Badge>
                    <Badge className="bg-stone-700 text-white">{eventsForSelectedDay.length} Added Event{eventsForSelectedDay.length === 1 ? "" : "s"}</Badge>
                    {selectedReading ? <Badge className="bg-orange-600 text-white">Sunday Reading Available</Badge> : null}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 p-4 md:p-5">
                  {selectedReading ? (
                    <div className="rounded-2xl border border-orange-200/75 bg-[linear-gradient(135deg,rgba(255,244,230,0.92),rgba(255,232,207,0.82))] p-4 dark:border-orange-900/35 dark:bg-[linear-gradient(135deg,rgba(71,39,24,0.42),rgba(49,27,18,0.28))]">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="mb-2 flex items-center gap-2">
                            <Badge className="bg-orange-600 text-white">Readings</Badge>
                            <span className="text-xs uppercase tracking-wide text-stone-500">{selectedReading.date}</span>
                          </div>
                          <p className="text-xl font-bold text-stone-900 dark:text-stone-100">{selectedReading.mezmur.am}</p>
                          <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">{selectedReading.mezmur.en}</p>
                          <p className="mt-2 text-sm text-stone-700 dark:text-stone-200">{selectedReading.gospel.am}</p>
                          <p className="text-xs text-stone-500 dark:text-stone-400">{selectedReading.gospel.en}</p>
                        </div>
                        <Button onClick={() => openReadingModal(selectedReadingKey)} className="bg-orange-600 hover:bg-orange-500 text-white">
                          Open Full Reading
                        </Button>
                      </div>
                    </div>
                  ) : null}

                    <div className="rounded-2xl border border-violet-200/75 bg-[linear-gradient(135deg,rgba(245,241,255,0.88),rgba(236,229,255,0.72))] p-4 dark:border-violet-900/30 dark:bg-[linear-gradient(135deg,rgba(61,45,87,0.3),rgba(32,24,48,0.24))]">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-violet-700 text-white">Feast</Badge>
                      <span className="text-xs uppercase tracking-wide text-stone-500">All Day</span>
                    </div>
                    <p className="text-xl font-bold md:text-2xl">{saint.en}</p>
                  </div>

                    <div className="rounded-2xl border border-rose-200/75 bg-[linear-gradient(135deg,rgba(255,240,239,0.84),rgba(252,229,226,0.68))] p-4 dark:border-rose-900/30 dark:bg-[linear-gradient(135deg,rgba(84,36,32,0.28),rgba(45,21,19,0.22))]">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-rose-600 text-white">Fast</Badge>
                      <span className="text-xs uppercase tracking-wide text-stone-500">All Day</span>
                    </div>
                    {fastsToday.length === 0 ? (
                      <p className="text-base text-muted-foreground">No fast today.</p>
                    ) : (
                      <div className="space-y-1">
                        {fastsToday.map((item, index) => (
                          <p key={`${item.en}-${index}`} className="text-lg text-stone-700 dark:text-stone-200">
                            {item.en}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="rounded-2xl border border-amber-300/45 bg-[linear-gradient(135deg,rgba(247,237,217,0.86),rgba(240,228,206,0.72))] p-4 dark:border-orange-900/25 dark:bg-[linear-gradient(135deg,rgba(47,33,24,0.94),rgba(22,16,13,0.92))]">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500 dark:text-[#f3e7d7]/62">Added Events</p>
                    {eventsForSelectedDay.length === 0 ? (
                      <p className="text-base text-muted-foreground">No added events for this date. Add from the Events tab.</p>
                    ) : (
                      <div className="space-y-3">
                        {eventsForSelectedDay.map((event) => (
                          <div key={event.id} className="rounded-xl border border-amber-200/60 bg-[linear-gradient(135deg,rgba(250,242,225,0.9),rgba(243,233,214,0.78))] p-3 dark:border-orange-900/25 dark:bg-[linear-gradient(135deg,rgba(33,24,19,0.96),rgba(17,13,11,0.94))]">
                            <div className="mb-2 flex items-center justify-between gap-2">
                              <Badge className={chipStyle(event.type)}>{event.type}</Badge>
                              <span className="text-xs text-muted-foreground">{event.timeLabel}</span>
                            </div>
                            <p className="text-lg font-semibold">{event.titleEn}</p>
                            <p className="mt-1 inline-flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              {event.location}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <Card className="border-amber-300/50 bg-[linear-gradient(180deg,rgba(250,240,219,0.94),rgba(243,233,212,0.86))] shadow-[0_18px_50px_-28px_rgba(120,53,15,0.16)] dark:border-orange-900/25 dark:bg-[linear-gradient(180deg,rgba(43,30,23,0.98),rgba(19,14,11,0.96))]">
              <CardHeader>
                <CardTitle className="dark:text-white">Event Library</CardTitle>
                <CardDescription className="dark:text-[#f3e7d7]/70">Add events to show directly on the calendar and agenda.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {eventCatalog.map((event) => {
                  const isAdded = addedIds.includes(event.id)
                  return (
                    <div key={event.id} className="rounded-2xl border border-amber-300/50 bg-[linear-gradient(135deg,rgba(247,237,217,0.88),rgba(241,229,206,0.74))] p-4 dark:border-orange-900/25 dark:bg-[linear-gradient(135deg,rgba(38,28,22,0.96),rgba(18,14,12,0.93))]">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge className={chipStyle(event.type)}>{event.type}</Badge>
                            <span className="text-sm text-muted-foreground">{format(new Date(`${event.date}T12:00:00`), "EEEE, MMM d")}</span>
                          </div>
                          <p className="mt-2 text-lg font-semibold">{event.titleEn}</p>
                          <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock3 className="h-4 w-4" />
                            {event.timeLabel}
                          </p>
                          <p className="inline-flex items-center gap-1 pl-3 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </p>
                        </div>

                        <Button
                          onClick={() => toggleAdd(event.id)}
                          className={isAdded ? "bg-emerald-600 hover:bg-emerald-500" : "bg-orange-600 hover:bg-orange-500"}
                        >
                          {isAdded ? <Check className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                          {isAdded ? "Added to Calendar" : "Add to Calendar"}
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <ReadingModal
        reading={modalReading}
        open={readingModalOpen}
        onClose={() => setReadingModalOpen(false)}
      />
    </div>
  )
}
