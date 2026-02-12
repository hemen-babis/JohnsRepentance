"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Share2, Send } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export function VirtualCandle() {
  const [isLit, setIsLit] = useState(false)
  const [prayer, setPrayer] = useState("")
  const [showPrayerForm, setShowPrayerForm] = useState(false)
  const { toast } = useToast()

  const lightCandle = () => {
    setIsLit(true)

    if (!showPrayerForm) {
      setTimeout(() => {
        setShowPrayerForm(true)
      }, 1000)
    }
  }

  const submitPrayer = () => {
    if (!prayer.trim()) return

    toast({
      title: "Prayer Submitted",
      description: "Your prayer has been received. May God hear your prayers.",
    })

    setPrayer("")
    setShowPrayerForm(false)

    // After a while, reset the candle
    setTimeout(() => {
      setIsLit(false)
    }, 5000)
  }

  const shareCandle = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "I lit a virtual candle at Ethiopian Orthodox Church",
          text: "Join me in prayer at the Ethiopian Orthodox Church online.",
          url: window.location.href,
        })
        .catch((err) => {
          console.error("Error sharing:", err)
        })
    } else {
      navigator.clipboard.writeText(
        `I lit a virtual candle at Ethiopian Orthodox Church. Join me in prayer: ${window.location.href}`,
      )
      toast({
        title: "Copied to clipboard",
        description: "Share link copied to clipboard.",
      })
    }
  }

  return (
    <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 relative">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-blue-800 dark:text-blue-500 mb-2">Light a Virtual Candle</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Light a candle and say a prayer for yourself or a loved one
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-40 flex flex-col items-center">
            {/* Candle base */}
            <div className="w-16 h-6 bg-amber-200 dark:bg-amber-700 rounded-full absolute bottom-0 z-10"></div>

            {/* Candle body */}
            <div className="w-8 h-32 bg-gradient-to-t from-amber-100 to-amber-50 dark:from-amber-600 dark:to-amber-500 rounded-t-sm absolute bottom-4"></div>

            {/* Candle wick */}
            <div className="w-1 h-3 bg-gray-800 dark:bg-gray-600 absolute bottom-36 z-20"></div>

            {/* Flame */}
            {isLit && (
              <>
                <motion.div
                  className="w-4 h-8 bg-gradient-to-t from-amber-500 via-amber-300 to-yellow-200 rounded-full absolute bottom-38 z-20"
                  animate={{
                    height: ["32px", "36px", "32px"],
                    width: ["16px", "14px", "16px"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />

                {/* Glow effect */}
                <motion.div
                  className="w-16 h-16 bg-amber-500/20 rounded-full absolute bottom-34 z-10 blur-md"
                  animate={{
                    opacity: [0.2, 0.3, 0.2],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              </>
            )}
          </div>
        </div>

        {!isLit ? (
          <Button
            onClick={lightCandle}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white"
          >
            Light a Candle
          </Button>
        ) : showPrayerForm ? (
          <div className="space-y-3">
            <Textarea
              placeholder="Write your prayer request here..."
              value={prayer}
              onChange={(e) => setPrayer(e.target.value)}
              className="min-h-[80px] bg-white/80 dark:bg-gray-800/80 border-blue-200 dark:border-blue-800"
            />

            <div className="flex gap-2">
              <Button
                onClick={submitPrayer}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Prayer
              </Button>

              <Button variant="outline" onClick={shareCandle} className="border-blue-300 dark:border-blue-700">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={() => setShowPrayerForm(true)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white"
            >
              Add Prayer
            </Button>

            <Button variant="outline" onClick={shareCandle} className="border-blue-300 dark:border-blue-700">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
