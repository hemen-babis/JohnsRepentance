"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, BellRing } from "lucide-react"

const ethiopicEnFormatter = new Intl.DateTimeFormat("en-ET-u-ca-ethiopic", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

const ethiopicAmFormatter = new Intl.DateTimeFormat("am-ET-u-ca-ethiopic", {
  day: "numeric",
  month: "long",
})

const saintDaysBilingual: Record<number, { am: string; en: string }> = {
  1: { am: "ልደታ እና ኤልያስ", en: "Lideta and Elias" },
  7: { am: "ቅድስት ሥላሴ", en: "Holy Trinity" },
  12: { am: "ሚካኤል", en: "Saint Michael" },
  16: { am: "ኪዳነ ምህረት", en: "Kidane Meheret" },
  19: { am: "ቅዱስ ገብርኤል", en: "Saint Gabriel" },
  21: { am: "ቅድስት ማርያም", en: "Saint Mary" },
  23: { am: "ቅዱስ ጊዮርጊስ", en: "Saint George" },
  27: { am: "መድኃኔ ዓለም", en: "Medhane Alem" },
  29: { am: "በዓለ ወልድ", en: "Bale Wold" },
}

type FastStatus = {
  label: string
  am: string
}

function getFastStatus(date: Date): FastStatus {
  const dateStr = date.toISOString().split("T")[0]
  const day = date.getDay()

  if (dateStr >= "2026-02-16" && dateStr <= "2026-04-10") {
    return { label: "Great Lent", am: "ዐቢይ ጾም" }
  }
  if (dateStr >= "2026-04-06" && dateStr <= "2026-04-08") {
    return { label: "Semune Himamat", am: "ሰሙነ ሕማማት" }
  }
  if (dateStr === "2026-04-09") {
    return { label: "Tselote Hamus", am: "ጸሎተ ሐሙስ" }
  }
  if (dateStr === "2026-04-10") {
    return { label: "Siklet", am: "ስቅለት" }
  }
  if (dateStr >= "2026-04-12" && dateStr < "2026-06-01") {
    return { label: "No fast period", am: "ፆም የለም" }
  }
  if (dateStr >= "2026-06-01" && dateStr <= "2026-07-11") {
    return { label: "Fast of the Apostles", am: "ጾመ ሐዋርያት" }
  }
  if (dateStr >= "2026-06-01" && (day === 3 || day === 5)) {
    return { label: day === 3 ? "Wednesday Fast" : "Friday Fast", am: day === 3 ? "የረቡዕ ፆም" : "የአርብ ፆም" }
  }

  return { label: "No fast today", am: "ፆም የለም" }
}

function getNextObservance(date: Date) {
  const dateStr = date.toISOString().split("T")[0]
  const observances = [
    { date: "2026-04-12", label: "Tinśae (Fasika)", am: "ትንሣኤ" },
    { date: "2026-06-01", label: "Weekly Fast Resume", am: "ሳምንታዊ ጾም ይጀምራል" },
    { date: "2026-06-01", label: "Fast of the Apostles", am: "ጾመ ሐዋርያት" },
    { date: "2026-08-01", label: "Filseta Fast Begins", am: "ፍልሰታ ጾም ይጀምራል" },
    { date: "2026-11-25", label: "Advent Fast Begins", am: "ገና ጾም ይጀምራል" },
  ]
  return observances.find((item) => item.date >= dateStr) ?? observances[observances.length - 1]
}

export function TodayChurchCalendar() {
  const today = new Date()
  const amParts = ethiopicAmFormatter.formatToParts(today)
  const ethDay = Number.parseInt(amParts.find((p) => p.type === "day")?.value ?? "1", 10)
  const ethMonth = amParts.find((p) => p.type === "month")?.value ?? "መስከረም"
  const saint = saintDaysBilingual[ethDay] ?? { am: "ቅዱሳን መታሰቢያ", en: "Commemoration of saints" }
  const fast = getFastStatus(today)
  const next = getNextObservance(today)

  return (
    <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-indigo-50 to-sky-50 dark:from-slate-900 dark:to-indigo-950">
      <div className="h-2 bg-gradient-to-r from-indigo-500 to-sky-500" />
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-indigo-800 dark:text-indigo-300">
          <CalendarDays className="h-5 w-5" />
          Today in the Church Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-white/85 dark:bg-slate-900/70 p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Today</p>
          <p className="font-semibold">{ethiopicEnFormatter.format(today)} (E.C.)</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">{ethMonth} {ethDay}</p>
        </div>

        <div className="rounded-lg bg-white/85 dark:bg-slate-900/70 p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Feast</p>
          <p className="font-semibold">{saint.en}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">{saint.am}</p>
        </div>

        <div className="rounded-lg bg-white/85 dark:bg-slate-900/70 p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Fasting Alert</p>
          <p className="font-semibold">{fast.label}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">{fast.am}</p>
        </div>

        <div className="rounded-lg bg-white/85 dark:bg-slate-900/70 p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 inline-flex items-center gap-2">
            <BellRing className="h-4 w-4" /> Next Major Observance
          </p>
          <p className="font-semibold">{next.label}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">{next.am}</p>
        </div>

        <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-500">
          <Link href="/calendar-events">Open Calendar + Events</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

