"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"

const ethiopicEnFormatter = new Intl.DateTimeFormat("en-ET-u-ca-ethiopic", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

const saintDays = {
  1: "Lideta (Birth of St. Mary) and Elias",
  2: "Thaddius",
  3: "Ba'eta (Presentation of Mary)",
  4: "Yohannis Wolde Negedquad",
  5: "Petros and Paulos, Gebre Menfes Kidus",
  6: "Our Lady of Qusquam",
  7: "Holy Trinity",
  8: "Kiros and Abba Banuda",
  9: "Thomas (not the Apostle)",
  10: "Kidus Meskel (Holy Cross)",
  11: "Hanna and Iyachem",
  12: "Michael, Chief of Angels",
  13: "God the Father and Ruphael",
  14: "Abba Aregawi and Gebre Kristos",
  15: "Kirkos and his mother Iyalota",
  16: "Kidane Meheret (Covenant of Mercy)",
  17: "Estifanos and Abba Gerima",
  18: "Ewstatewos",
  19: "Saint Gabriel",
  20: "Hnstata",
  21: "Saint Mary",
  22: "Deqsius",
  23: "Saint George",
  24: "Abba Tekle Haimanot and Four Heavenly Orders",
  25: "Merkorios",
  26: "Thomas the Apostle",
  27: "Medhane Alem",
  28: "Emmanuel",
  29: "Bale Wold (God the Son)",
  30: "Markos (St. Mark)",
} satisfies Record<number, string>

type FastStatus = {
  label: string
}

function getFastItems(date: Date): FastStatus[] {
  const dateStr = date.toISOString().split("T")[0]
  const day = date.getDay()
  const results: FastStatus[] = []

  if (dateStr >= "2026-02-16" && dateStr <= "2026-04-10") {
    results.push({ label: "Great Lent" })
  }
  if (dateStr >= "2026-04-06" && dateStr <= "2026-04-08") {
    results.push({ label: "Semune Himamat" })
  }
  if (dateStr === "2026-04-09") {
    results.push({ label: "Tselote Hamus" })
  }
  if (dateStr === "2026-04-10") {
    results.push({ label: "Siklet" })
  }
  if (dateStr >= "2026-06-01" && dateStr <= "2026-07-11") {
    results.push({ label: "Fast of the Apostles" })
  }

  const weeklyAllowed = dateStr < "2026-04-12" || dateStr >= "2026-06-01"
  if (weeklyAllowed && day === 3) {
    results.push({ label: "Wednesday Fast" })
  }
  if (weeklyAllowed && day === 5) {
    results.push({ label: "Friday Fast" })
  }

  const unique = Array.from(new Map(results.map((item) => [item.label, item])).values())
  return unique
}

export function TodayChurchCalendar() {
  const today = new Date()
  const gregorianDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })
  const enParts = ethiopicEnFormatter.formatToParts(today)
  const ethDay = Number.parseInt(enParts.find((p) => p.type === "day")?.value ?? "1", 10)
  const ethMonth = enParts.find((p) => p.type === "month")?.value ?? "Meskerem"
  const saint = saintDays[ethDay] ?? "Commemoration of saints"
  const fastItems = getFastItems(today)

  return (
    <Card className="h-auto md:h-[340px] overflow-hidden border border-amber-200/70 bg-gradient-to-br from-white to-orange-50/40 text-gray-900 shadow-lg dark:border-amber-700/20 dark:bg-[linear-gradient(135deg,rgba(47,29,18,0.92),rgba(26,18,13,0.9))] dark:text-stone-100">
      <div className="h-1.5 bg-gradient-to-r from-amber-500 to-orange-500" />
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
          <CalendarDays className="h-5 w-5" />
          Today in the Church Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 md:overflow-y-auto">
        <div>
          <p className="text-base font-semibold text-amber-700 dark:text-amber-300">{gregorianDate}</p>
          <p className="text-base font-semibold text-orange-700 dark:text-orange-300">
            {ethMonth} {ethDay}
          </p>
          <p className="text-base font-semibold text-amber-700 dark:text-amber-300">{ethiopicEnFormatter.format(today)} (E.C.)</p>
        </div>

        <div className="rounded-md border border-amber-200/70 bg-white p-3 dark:border-amber-700/20 dark:bg-[rgba(255,255,255,0.05)]">
          <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">Feast</p>
          <p className="text-sm font-semibold text-orange-700 dark:text-orange-300">{saint}</p>
        </div>

        <div className="rounded-md border border-amber-200/70 bg-white p-3 dark:border-amber-700/20 dark:bg-[rgba(255,255,255,0.05)]">
          <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">Fast</p>
          {fastItems.length === 0 ? (
            <p className="text-sm font-semibold text-orange-700 dark:text-orange-300">No fast today</p>
          ) : (
            fastItems.map((fast) => (
              <p key={fast.label} className="text-sm font-semibold text-orange-700 dark:text-orange-300">
                {fast.label}
              </p>
            ))
          )}
        </div>

        <Button asChild className="w-full bg-orange-600 hover:bg-orange-500 text-white">
          <Link href="/calendar-events">Open Calendar + Events</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
