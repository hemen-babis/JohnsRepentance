"use client"

import { useMemo, useState } from "react"
import { format } from "date-fns"
import { CalendarDays, Clock3, MapPin, Plus, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ethiopicEnFormatter = new Intl.DateTimeFormat("en-ET-u-ca-ethiopic", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

const ethiopicAmFormatter = new Intl.DateTimeFormat("am-ET-u-ca-ethiopic", {
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
  const am = ethiopicAmFormatter.formatToParts(date)
  const day = Number.parseInt(am.find((p) => p.type === "day")?.value ?? "1", 10)
  const month = am.find((p) => p.type === "month")?.value ?? "መስከረም"
  return { day, month }
}

const monthOrder = ["መስከረም", "ጥቅምት", "ኅዳር", "ታኅሣሥ", "ጥር", "የካቲት", "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜን"]

const majorFasts = [
  {
    label: { am: "ሁዳዲ (ትንሣኤ ፆም)", en: "Hudadi (Great Lent)" },
    start: { month: "የካቲት", day: 14 },
    end: { month: "ሚያዝያ", day: 5 },
  },
  {
    label: { am: "ገና ፆም", en: "Advent Fast (Gena Fast)" },
    start: { month: "ኅዳር", day: 15 },
    end: { month: "ታኅሣሥ", day: 28 },
  },
  {
    label: { am: "ፍልሰታ ፆም", en: "Filseta Fast" },
    start: { month: "ነሐሴ", day: 1 },
    end: { month: "ነሐሴ", day: 16 },
  },
  {
    label: { am: "የነነዌ ፆም (ሦስት ቀን)", en: "Fast of Nineveh (3 days)" },
    start: { month: "የካቲት", day: 7 },
    end: { month: "የካቲት", day: 9 },
  },
]

const fixedFastMilestones: Array<{ month: string; day: number; label: BilingualLabel }> = [
  { month: "የካቲት", day: 14, label: { am: "ሁዳዲ (ትንሣኤ ፆም) መጀመሪያ", en: "Start of Great Lent" } },
  { month: "ኅዳር", day: 15, label: { am: "ገና ፆም መጀመሪያ", en: "Start of Advent Fast" } },
  { month: "ታኅሣሥ", day: 28, label: { am: "ገና ፆም መጨረሻ", en: "End of Advent Fast" } },
  { month: "ነሐሴ", day: 1, label: { am: "ፍልሰታ ፆም መጀመሪያ", en: "Start of Filseta Fast" } },
  { month: "ነሐሴ", day: 16, label: { am: "ፍልሰታ ፆም መጨረሻ", en: "End of Filseta Fast" } },
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
  if (type === "Fast") return "bg-violet-600 text-white"
  if (type === "Service") return "bg-slate-500 text-white"
  if (type === "Teaching") return "bg-amber-600 text-white"
  return "bg-emerald-600 text-white"
}

export default function CalendarEventsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const now = new Date()
    now.setHours(12, 0, 0, 0)
    return now
  })
  const [addedIds, setAddedIds] = useState<string[]>([])

  const selectedKey = dateKey(selectedDate)
  const selectedEth = ethiopianParts(selectedDate)
  const selectedGDate = format(selectedDate, "yyyy-MM-dd")
  const override = dateOverrides.find((item) => item.date === selectedGDate)
  const saint = override?.feast ?? saintDaysBilingual[selectedEth.day] ?? { am: "ቅዱሳንን እንከብራለን።", en: "Commemoration of saints." }
  const fastsToday = getFastsForDate(selectedDate, selectedEth.month, selectedEth.day)

  const addedEvents = useMemo(() => eventCatalog.filter((event) => addedIds.includes(event.id)), [addedIds])
  const eventsForSelectedDay = useMemo(() => addedEvents.filter((event) => event.date === selectedKey), [addedEvents, selectedKey])

  const calendarMarkedDays = useMemo(
    () => addedEvents.map((event) => new Date(`${event.date}T12:00:00`)),
    [addedEvents],
  )

  const toggleAdd = (id: string) => {
    setAddedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="bg-[radial-gradient(circle_at_top_left,_#fff7ed_0%,_#fafaf9_38%,_#f5f5f4_100%)] dark:bg-[radial-gradient(circle_at_top_left,_#1c1917_0%,_#111827_45%,_#020617_100%)]">
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="mb-8 rounded-3xl border border-amber-200/60 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-amber-900/50 dark:bg-stone-900/70">
          <p className="mb-2 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
            Liturgical Planner
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 md:text-5xl">Calendar + Events</h1>
          <p className="mt-2 max-w-2xl text-sm text-stone-600 dark:text-stone-300 md:text-base">
            Ethiopian Orthodox liturgical calendar with bilingual feast and fasting agenda.
          </p>
        </div>

        <Tabs defaultValue="calendar" className="space-y-5">
          <TabsList className="grid w-full max-w-md grid-cols-2 rounded-2xl border border-stone-300/70 bg-white/90 p-1 shadow-sm dark:border-stone-700 dark:bg-stone-800/90">
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
              <Card className="border-stone-300/70 bg-white/95 shadow-md dark:border-stone-700 dark:bg-stone-900/90">
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Calendar</CardTitle>
                  <CardDescription>Pick a date to see agenda.</CardDescription>
                </CardHeader>
                <CardContent className="px-3 pb-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    modifiers={{ hasEvent: calendarMarkedDays }}
                    modifiersClassNames={{ hasEvent: "bg-orange-100 dark:bg-orange-950/50" }}
                    className="mx-auto w-full max-w-[320px] rounded-2xl border border-stone-300/70 bg-stone-50 p-2 [--cell-size:2.2rem] md:[--cell-size:2.35rem] dark:border-stone-700 dark:bg-stone-900"
                    classNames={{
                      root: "w-full",
                      months: "w-full",
                      month: "w-full space-y-3",
                      month_caption: "flex items-center justify-center pt-1",
                      caption_label: "text-base font-semibold tracking-tight",
                      nav: "flex items-center gap-1",
                      button_previous: "h-8 w-8 rounded-full border border-stone-300 bg-white hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:hover:bg-stone-700",
                      button_next: "h-8 w-8 rounded-full border border-stone-300 bg-white hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:hover:bg-stone-700",
                      weekdays: "grid grid-cols-7 gap-1",
                      weekday: "text-[12px] font-medium text-stone-500",
                      week: "grid grid-cols-7 gap-1",
                      day: "h-9 w-9 rounded-xl text-sm font-medium hover:bg-stone-200 dark:hover:bg-stone-800",
                      today: "ring-1 ring-orange-300",
                      selected: "bg-orange-500 text-white hover:bg-orange-500",
                    }}
                  />
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-stone-300/70 bg-white/95 shadow-md dark:border-stone-700 dark:bg-stone-900/90">
                <CardHeader className="border-b bg-gradient-to-r from-stone-100 to-amber-50 pb-4 dark:from-stone-800 dark:to-stone-800/80">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">{format(selectedDate, "EEEE, MMMM d")}</h2>
                    <p className="text-lg font-semibold text-stone-700 dark:text-stone-200">{selectedEth.month} {selectedEth.day}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{ethiopicEnFormatter.format(selectedDate)} (E.C.)</p>
                  <p className="text-xs text-muted-foreground">
                    2026 fast timeline: Great Lent (Feb 16 - Apr 10), Semune Himamat (Apr 6 - Apr 8), Tselote Hamus (Apr 9), Siklet (Apr 10), Hawaryat Tsom (Jun 1 - Jul 11).
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge className="bg-violet-600 text-white">Feast Day</Badge>
                    <Badge className="bg-rose-600 text-white">{fastsToday.length === 0 ? "No Fast Today" : `${fastsToday.length} Fast Item${fastsToday.length > 1 ? "s" : ""}`}</Badge>
                    <Badge className="bg-slate-600 text-white">{eventsForSelectedDay.length} Added Event{eventsForSelectedDay.length === 1 ? "" : "s"}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 p-4 md:p-5">
                  <div className="rounded-2xl border border-violet-200 bg-violet-50/50 p-4 dark:border-violet-900/50 dark:bg-violet-950/20">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-violet-600 text-white">Feast</Badge>
                      <span className="text-xs uppercase tracking-wide text-stone-500">All Day</span>
                    </div>
                    <p className="text-xl font-bold md:text-2xl">{saint.en}</p>
                    <p className="mt-1 text-lg text-stone-600 dark:text-stone-300">{saint.am}</p>
                  </div>

                  <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-4 dark:border-rose-900/50 dark:bg-rose-950/20">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="bg-rose-600 text-white">Fast / ጾም</Badge>
                      <span className="text-xs uppercase tracking-wide text-stone-500">All Day</span>
                    </div>
                    {fastsToday.length === 0 ? (
                      <p className="text-base text-muted-foreground">ፆም የለም። / No fast today.</p>
                    ) : (
                      <div className="space-y-1">
                        {fastsToday.map((item, index) => (
                          <p key={`${item.en}-${index}`} className="text-lg text-stone-700 dark:text-stone-200">
                            {item.am} / {item.en}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4 dark:border-stone-700 dark:bg-stone-900/60">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">Added Events</p>
                    {eventsForSelectedDay.length === 0 ? (
                      <p className="text-base text-muted-foreground">No added events for this date. Add from the Events tab.</p>
                    ) : (
                      <div className="space-y-3">
                        {eventsForSelectedDay.map((event) => (
                          <div key={event.id} className="rounded-xl border bg-white p-3 dark:bg-stone-950/70">
                            <div className="mb-2 flex items-center justify-between gap-2">
                              <Badge className={chipStyle(event.type)}>{event.type}</Badge>
                              <span className="text-xs text-muted-foreground">{event.timeLabel}</span>
                            </div>
                            <p className="text-lg font-semibold">{event.titleEn}</p>
                            <p className="text-base text-stone-600 dark:text-stone-300">{event.titleAm}</p>
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
            <Card className="border-stone-300/70 bg-white/95 shadow-md dark:border-stone-700 dark:bg-stone-900/90">
              <CardHeader>
                <CardTitle>Event Library</CardTitle>
                <CardDescription>Add events to show directly on the calendar and agenda.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {eventCatalog.map((event) => {
                  const isAdded = addedIds.includes(event.id)
                  return (
                    <div key={event.id} className="rounded-2xl border border-stone-300/70 bg-stone-50/70 p-4 dark:border-stone-700 dark:bg-stone-950/40">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge className={chipStyle(event.type)}>{event.type}</Badge>
                            <span className="text-sm text-muted-foreground">{format(new Date(`${event.date}T12:00:00`), "EEEE, MMM d")}</span>
                          </div>
                          <p className="mt-2 text-lg font-semibold">{event.titleEn}</p>
                          <p className="text-base text-stone-600 dark:text-stone-300">{event.titleAm}</p>
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
    </div>
  )
}
