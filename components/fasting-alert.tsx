"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Calendar, AlertTriangle } from "lucide-react"
import Link from "next/link"

// Ethiopian Orthodox fasting calendar (simplified for example)
const fastingDays = [
  {
    name: "Fast of Nineveh",
    startDate: "2025-02-03",
    endDate: "2025-02-05",
    description: "A three-day fast commemorating the repentance of Nineveh.",
  },
  {
    name: "Great Lent",
    startDate: "2025-02-24",
    endDate: "2025-04-12",
    description: "The 55-day fast before Easter (Fasika).",
  },
  {
    name: "Fast of the Apostles",
    startDate: "2025-06-01",
    endDate: "2025-07-12",
    description: "A variable-length fast honoring the Apostles.",
  },
  {
    name: "Fast of the Assumption",
    startDate: "2025-08-01",
    endDate: "2025-08-15",
    description: "A 15-day fast honoring the Virgin Mary.",
  },
  {
    name: "Fast of the Nativity",
    startDate: "2025-11-25",
    endDate: "2025-01-06",
    description: "A 43-day fast before Christmas.",
  },
  { name: "Fast of Wednesdays and Fridays", isWeekly: true, description: "Weekly fasting days throughout the year." },
]

export function FastingAlert() {
  const [currentFast, setCurrentFast] = useState<any>(null)
  const [upcomingFast, setUpcomingFast] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Check for current and upcoming fasts
    const checkFasts = () => {
      const today = new Date()
      const todayStr = today.toISOString().split("T")[0]

      // Check if today is Wednesday or Friday for weekly fasts
      const dayOfWeek = today.getDay()
      const isWednesdayOrFriday = dayOfWeek === 3 || dayOfWeek === 5

      // Find current fast
      let current = null
      let upcoming = null

      // Check for fixed fasts
      for (const fast of fastingDays) {
        if (fast.isWeekly && isWednesdayOrFriday) {
          current = fast
          break
        } else if (!fast.isWeekly) {
          if (todayStr >= fast.startDate && todayStr <= fast.endDate) {
            current = fast
            break
          } else if (todayStr < fast.startDate) {
            // If we don't have an upcoming fast yet, or this one is sooner
            if (!upcoming || fast.startDate < upcoming.startDate) {
              upcoming = fast
            }
          }
        }
      }

      setCurrentFast(current)
      setUpcomingFast(upcoming)
    }

    checkFasts()

    // Check every day at midnight
    const interval = setInterval(checkFasts, 86400000)
    return () => clearInterval(interval)
  }, [])

  const addToCalendar = (fast) => {
    // Generate calendar file or link
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(fast.name)}&dates=${fast.startDate.replace(/-/g, "")}/${fast.endDate.replace(/-/g, "")}&details=${encodeURIComponent(fast.description)}`
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
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Starts in{" "}
                {Math.ceil((new Date(upcomingFast.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}{" "}
                days
              </p>
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
