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

const ethiopicAmFormatter = new Intl.DateTimeFormat("am-ET-u-ca-ethiopic", {
  day: "numeric",
  month: "long",
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

type FastStatus = {
  label: string
  am: string
}

function getFastItems(date: Date): FastStatus[] {
  const dateStr = date.toISOString().split("T")[0]
  const day = date.getDay()
  const results: FastStatus[] = []

  if (dateStr >= "2026-02-16" && dateStr <= "2026-04-10") {
    results.push({ label: "Great Lent", am: "ዐቢይ ጾም" })
  }
  if (dateStr >= "2026-04-06" && dateStr <= "2026-04-08") {
    results.push({ label: "Semune Himamat", am: "ሰሙነ ሕማማት" })
  }
  if (dateStr === "2026-04-09") {
    results.push({ label: "Tselote Hamus", am: "ጸሎተ ሐሙስ" })
  }
  if (dateStr === "2026-04-10") {
    results.push({ label: "Siklet", am: "ስቅለት" })
  }
  if (dateStr >= "2026-06-01" && dateStr <= "2026-07-11") {
    results.push({ label: "Fast of the Apostles", am: "ጾመ ሐዋርያት" })
  }

  const weeklyAllowed = dateStr < "2026-04-12" || dateStr >= "2026-06-01"
  if (weeklyAllowed && day === 3) {
    results.push({ label: "Wednesday Fast", am: "የረቡዕ ፆም" })
  }
  if (weeklyAllowed && day === 5) {
    results.push({ label: "Friday Fast", am: "የአርብ ፆም" })
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
  const amParts = ethiopicAmFormatter.formatToParts(today)
  const ethDay = Number.parseInt(amParts.find((p) => p.type === "day")?.value ?? "1", 10)
  const ethMonth = amParts.find((p) => p.type === "month")?.value ?? "መስከረም"
  const saint = saintDaysBilingual[ethDay] ?? { am: "ቅዱሳን መታሰቢያ", en: "Commemoration of saints" }
  const fastItems = getFastItems(today)

  return (
    <Card className="h-full min-h-[320px] border border-amber-200/70 shadow-lg overflow-hidden bg-gradient-to-br from-white to-orange-50/40 text-gray-900">
      <div className="h-1.5 bg-gradient-to-r from-amber-500 to-orange-500" />
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-700">
          <CalendarDays className="h-5 w-5" />
          Today in the Church Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <p className="text-lg font-semibold text-amber-700">{gregorianDate}</p>
          <p className="text-lg font-semibold text-orange-700">
            {ethMonth} {ethDay}
          </p>
          <p className="text-lg font-semibold text-amber-700">{ethiopicEnFormatter.format(today)} (E.C.)</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">
            2026 fast timeline: Great Lent (Feb 16 - Apr 10), Semune Himamat (Apr 6 - Apr 8), Tselote Hamus (Apr 9),
            Siklet (Apr 10), Hawaryat Tsom (Jun 1 - Jul 11).
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className="rounded-md bg-white border border-amber-200/70 p-2">
            <p className="text-amber-700 font-semibold">Feast Day</p>
            <p className="text-gray-700">1</p>
          </div>
          <div className="rounded-md bg-white border border-amber-200/70 p-2">
            <p className="text-amber-700 font-semibold">Fast Item</p>
            <p className="text-gray-700">{fastItems.length}</p>
          </div>
          <div className="rounded-md bg-white border border-amber-200/70 p-2">
            <p className="text-amber-700 font-semibold">Added Events</p>
            <p className="text-gray-700">0</p>
          </div>
        </div>

        <div className="rounded-md bg-white border border-amber-200/70 p-3">
          <p className="text-sm text-amber-700 font-semibold">Feast</p>
          <p className="text-xs text-gray-500 mb-1">All Day</p>
          <p className="text-base text-orange-700 font-semibold">{saint.en}</p>
          <p className="text-base text-orange-700">{saint.am}</p>
        </div>

        <div className="rounded-md bg-white border border-amber-200/70 p-3">
          <p className="text-sm text-amber-700 font-semibold">Fast / ጾም</p>
          <p className="text-xs text-gray-500 mb-1">All Day</p>
          {fastItems.length === 0 ? (
            <p className="text-base text-orange-700 font-semibold">ፆም የለም / No fast today</p>
          ) : (
            fastItems.map((fast) => (
              <p key={fast.label} className="text-base text-orange-700 font-semibold">
                {fast.am} / {fast.label}
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
