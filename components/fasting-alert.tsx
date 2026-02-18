"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Calendar, AlertTriangle } from "lucide-react"
import Link from "next/link"

type FastItem = {
  name: string
  description: string
  startDate?: string
  endDate?: string
  isWeekly?: boolean
}

const formatYmd = (year: number, month: number, day: number) =>
  `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`

function buildFastingDays(baseYear: number): FastItem[] {
  return [
    {
      name: "Fast of Nineveh",
      startDate: formatYmd(baseYear, 2, 10),
      endDate: formatYmd(baseYear, 2, 12),
      description: "A three-day fast commemorating the repentance of Nineveh.",
    },
    {
      name: "Great Lent",
      startDate: formatYmd(baseYear, 2, 16),
      endDate: formatYmd(baseYear, 4, 10),
      description: "The major fasting season before Easter (Fasika).",
    },
    {
      name: "Fast of the Apostles",
      startDate: formatYmd(baseYear, 6, 1),
      endDate: formatYmd(baseYear, 7, 11),
      description: "Hawaryat Tsom (Fast of the Apostles).",
    },
    {
      name: "Fast of the Assumption",
      startDate: formatYmd(baseYear, 8, 1),
      endDate: formatYmd(baseYear, 8, 16),
      description: "A 16-day fast honoring the Virgin Mary.",
    },
    {
      name: "Fast of the Nativity",
      startDate: formatYmd(baseYear, 11, 25),
      endDate: formatYmd(baseYear + 1, 1, 6),
      description: "A 43-day fast before Christmas.",
    },
    {
      name: "Fast of Wednesdays and Fridays",
      isWeekly: true,
      description: "Weekly fasting days throughout the year.",
    },
  ]
}

export function FastingAlert() {
  const [showDetails, setShowDetails] = useState(false)

  const today = new Date()
  const todayStr = today.toISOString().split("T")[0]
  const baseYear = today.getFullYear()
  const fastingDays = [...buildFastingDays(baseYear), ...buildFastingDays(baseYear + 1)]
  const dayOfWeek = today.getDay()
  const isWednesdayOrFriday = dayOfWeek === 3 || dayOfWeek === 5
  const inNoFastWindow2026 = todayStr >= "2026-04-12" && todayStr < "2026-06-01"
  const weeklyResumes2026 = todayStr >= "2026-06-01"

  const activeFixedFast = fastingDays.find(
    (fast) => !fast.isWeekly && fast.startDate && fast.endDate && todayStr >= fast.startDate && todayStr <= fast.endDate,
  )

  const currentFast: FastItem | null =
    (inNoFastWindow2026
      ? null
      : activeFixedFast) ??
    (isWednesdayOrFriday && (todayStr < "2026-04-12" || weeklyResumes2026)
      ? {
          name: "Fast of Wednesdays and Fridays",
          isWeekly: true,
          description: "Weekly fasting days throughout the year.",
        }
      : null)

  const upcomingFixedFast = fastingDays
    .filter((fast) => !fast.isWeekly && fast.startDate && todayStr < fast.startDate)
    .sort((a, b) => (a.startDate! < b.startDate! ? -1 : 1))[0]

  const upcomingFast: FastItem | null = currentFast
    ? null
    : inNoFastWindow2026
      ? {
          name: "Fast of Wednesdays and Fridays",
          isWeekly: true,
          startDate: "2026-06-01",
          description: "Resumes from June 1, 2026 and continues every Wednesday and Friday.",
        }
      : upcomingFixedFast ?? {
          name: "Fast of Wednesdays and Fridays",
          isWeekly: true,
          description: "Weekly fasting days throughout the year.",
        }

  const addToCalendar = (fast: FastItem) => {
    // Generate calendar file or link
    const today = new Date()
    const start = fast.startDate ?? today.toISOString().split("T")[0]
    const end = fast.endDate ?? start
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(fast.name)}&dates=${start.replace(/-/g, "")}/${end.replace(/-/g, "")}&details=${encodeURIComponent(fast.description)}`
    window.open(calendarUrl, "_blank")
  }

  return (
    <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 relative">
      <div className="h-2 bg-gradient-to-r from-amber-500 to-amber-700" />
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-500">
          <Bell className="h-5 w-5" />
          Fasting Alert
        </CardTitle>
      </CardHeader>
      <CardContent>
        {currentFast ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-500">
              <AlertTriangle className="h-5 w-5" />
              <p className="font-medium">Today is a fasting day</p>
            </div>

            <div className="bg-white dark:bg-amber-950/50 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-1">{currentFast.name}</h3>
              {!currentFast.isWeekly && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {new Date(currentFast.startDate).toLocaleDateString()} -{" "}
                  {new Date(currentFast.endDate).toLocaleDateString()}
                </p>
              )}
              {showDetails && <p className="text-gray-600 dark:text-gray-300 mt-2">{currentFast.description}</p>}
              <Button
                variant="link"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                className="text-amber-700 dark:text-amber-500 p-0 mt-1"
              >
                {showDetails ? "Show less" : "Learn more"}
              </Button>
            </div>

            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                size="sm"
                className="text-amber-700 dark:text-amber-500 border-amber-300 dark:border-amber-700"
                onClick={() => addToCalendar(currentFast)}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Add to Calendar
              </Button>

              <Button
                asChild
                variant="outline"
                size="sm"
                className="text-amber-700 dark:text-amber-500 border-amber-300 dark:border-amber-700"
              >
                <Link href="/fasting-guide">Fasting Guide</Link>
              </Button>
            </div>
          </div>
        ) : upcomingFast ? (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Next fast: <span className="font-medium">{upcomingFast.name}</span>
            </p>

            <div className="bg-white dark:bg-amber-950/50 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-1">{upcomingFast.name}</h3>
              {upcomingFast.startDate ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Starts in{" "}
                  {Math.ceil((new Date(upcomingFast.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}{" "}
                  days
                </p>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">Observed weekly on Wednesday and Friday</p>
              )}
              {showDetails && <p className="text-gray-600 dark:text-gray-300 mt-2">{upcomingFast.description}</p>}
              <Button
                variant="link"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                className="text-amber-700 dark:text-amber-500 p-0 mt-1"
              >
                {showDetails ? "Show less" : "Learn more"}
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="text-amber-700 dark:text-amber-500 border-amber-300 dark:border-amber-700"
              onClick={() => addToCalendar(upcomingFast)}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Add to Calendar
            </Button>
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-300">No fasting days today or upcoming soon.</p>
        )}
      </CardContent>
    </Card>
  )
}
