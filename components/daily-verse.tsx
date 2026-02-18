"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Copy, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Ethiopian Orthodox lectionary readings
const verses = [
  {
    text: "Praise the Lord in His sanctuary; praise Him in His mighty heavens.",
    reference: "Psalm 150:1",
  },
  {
    text: "I am the way, the truth, and the life. No one comes to the Father except through me.",
    reference: "John 14:6",
  },
  {
    text: "Repent, for the kingdom of heaven is near!",
    reference: "Matthew 3:1-2",
  },
  {
    text: "Have mercy on me, O God, according to Your unfailing love; according to Your great compassion blot out my transgressions.",
    reference: "Psalm 51:1",
  },
  {
    text: "I am the living bread that came down from heaven. Whoever eats this bread will live forever.",
    reference: "John 6:51",
  },
]

export function DailyVerse() {
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const { toast } = useToast()

  const nextVerse = () => {
    setDirection(1)
    setCurrentVerseIndex((prev) => (prev + 1) % verses.length)
  }

  const prevVerse = () => {
    setDirection(-1)
    setCurrentVerseIndex((prev) => (prev - 1 + verses.length) % verses.length)
  }

  const copyVerse = () => {
    const verse = `"${verses[currentVerseIndex].text}" - ${verses[currentVerseIndex].reference}`
    navigator.clipboard.writeText(verse)
    toast({
      title: "Copied to clipboard",
      description: "Verse has been copied to your clipboard.",
    })
  }

  const shareVerse = () => {
    if (navigator.share) {
      navigator.share({
        title: "Daily Verse from Ethiopian Orthodox Church",
        text: `"${verses[currentVerseIndex].text}" - ${verses[currentVerseIndex].reference}`,
        url: window.location.href,
      })
    } else {
      copyVerse()
    }
  }

  useEffect(() => {
    // Automatically change verse every 15 seconds
    const interval = setInterval(() => {
      nextVerse()
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border border-amber-200/70 bg-gradient-to-br from-white to-orange-50/40 shadow-lg overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-orange-500 to-amber-500" />
      <CardContent className="p-6">
        <div className="relative h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentVerseIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            >
              <p className="text-2xl italic mb-4 text-gray-800 leading-relaxed">&quot;{verses[currentVerseIndex].text}&quot;</p>
              <p className="text-lg font-semibold text-amber-700">{verses[currentVerseIndex].reference}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevVerse}
              className="rounded-full border-amber-300 text-amber-700 hover:text-amber-900 hover:bg-amber-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextVerse}
              className="rounded-full border-amber-300 text-amber-700 hover:text-amber-900 hover:bg-amber-100"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={copyVerse}
              className="rounded-full border-amber-300 text-amber-700 hover:text-amber-900 hover:bg-amber-100"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={shareVerse}
              className="rounded-full border-amber-300 text-amber-700 hover:text-amber-900 hover:bg-amber-100"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
