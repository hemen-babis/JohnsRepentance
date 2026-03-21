"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Bell, TextIcon as Telegram } from "lucide-react"

export function LivePrayerCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    prayerName: "",
  })

  // Prayer times in 24-hour format (EOTC liturgy times)
  const prayerTimes = [
    { name: "Morning Prayer", time: "05:00" },
    { name: "Divine Liturgy", time: "08:00" },
    { name: "Noon Prayer", time: "12:00" },
    { name: "Evening Prayer", time: "18:00" },
    { name: "Night Prayer", time: "21:00" },
  ]

  useEffect(() => {
    const calculateNextPrayer = () => {
      const now = new Date()
      const currentHours = now.getHours()
      const currentMinutes = now.getMinutes()
      const currentTimeInMinutes = currentHours * 60 + currentMinutes

      // Find the next prayer time
      let nextPrayerTime = null
      let nextPrayerName = ""

      for (const prayer of prayerTimes) {
        const [hours, minutes] = prayer.time.split(":").map(Number)
        const prayerTimeInMinutes = hours * 60 + minutes

        if (prayerTimeInMinutes > currentTimeInMinutes) {
          nextPrayerTime = new Date(now)
          nextPrayerTime.setHours(hours, minutes, 0, 0)
          nextPrayerName = prayer.name
          break
        }
      }

      // If no prayer time is found today, get the first prayer time for tomorrow
      if (!nextPrayerTime) {
        const tomorrow = new Date(now)
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(
          Number.parseInt(prayerTimes[0].time.split(":")[0]),
          Number.parseInt(prayerTimes[0].time.split(":")[1]),
          0,
          0,
        )
        nextPrayerTime = tomorrow
        nextPrayerName = prayerTimes[0].name
      }

      return { nextPrayerTime, nextPrayerName }
    }

    const updateCountdown = () => {
      const { nextPrayerTime, nextPrayerName } = calculateNextPrayer()
      const now = new Date()
      const difference = nextPrayerTime.getTime() - now.getTime()

      const hours = Math.floor(difference / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({
        hours,
        minutes,
        seconds,
        prayerName: nextPrayerName,
      })
    }

    // Update immediately and then every second
    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="h-auto md:h-[340px] overflow-hidden border border-amber-200/70 bg-gradient-to-br from-white to-amber-50/40 shadow-lg dark:border-amber-700/20 dark:bg-[linear-gradient(135deg,rgba(45,28,18,0.92),rgba(25,17,13,0.9))]">
      <div className="h-1.5 bg-gradient-to-r from-amber-500 to-orange-500" />
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center font-semibold text-amber-700 dark:text-amber-300">
            <Clock className="h-5 w-5 mr-2" />
            Next Prayer
          </h3>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs border-amber-300 text-amber-800 hover:text-amber-900 hover:bg-amber-100 dark:border-amber-700/30 dark:text-amber-200 dark:hover:bg-amber-950/40"
          >
            <Bell className="h-3 w-3 mr-1" />
            Set Reminder
          </Button>
        </div>

        <div className="flex justify-center mb-4">
          <div className="grid grid-cols-3 gap-2 md:gap-3 text-center">
            <motion.div
              className="rounded-lg border border-amber-200 bg-white p-2 md:p-4 dark:border-amber-700/20 dark:bg-[rgba(255,255,255,0.05)]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="text-3xl font-bold text-amber-700 dark:text-amber-300">{timeLeft.hours.toString().padStart(2, "0")}</div>
              <div className="mt-1 text-xs text-gray-500 dark:text-stone-400">HOURS</div>
            </motion.div>
            <motion.div
              className="rounded-lg border border-amber-200 bg-white p-2 md:p-4 dark:border-amber-700/20 dark:bg-[rgba(255,255,255,0.05)]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="text-3xl font-bold text-amber-700 dark:text-amber-300">{timeLeft.minutes.toString().padStart(2, "0")}</div>
              <div className="mt-1 text-xs text-gray-500 dark:text-stone-400">MINUTES</div>
            </motion.div>
            <motion.div
              className="rounded-lg border border-amber-200 bg-white p-2 md:p-4 dark:border-amber-700/20 dark:bg-[rgba(255,255,255,0.05)]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="text-3xl font-bold text-amber-700 dark:text-amber-300">{timeLeft.seconds.toString().padStart(2, "0")}</div>
              <div className="mt-1 text-xs text-gray-500 dark:text-stone-400">SECONDS</div>
            </motion.div>
          </div>
        </div>

        <p className="mb-4 text-center text-gray-700 dark:text-stone-300">
          Until <span className="font-semibold text-amber-700 dark:text-amber-300">{timeLeft.prayerName}</span>
        </p>

        <Button
          asChild
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white transition-colors duration-300 flex items-center justify-center"
        >
          <a href="https://t.me/+DCbv9KRTroY0NmJh" target="_blank" rel="noopener noreferrer">
            <Telegram className="mr-2 h-4 w-4" />
            Join Live Prayer
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
