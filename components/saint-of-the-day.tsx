"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Share2, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

const saints = [
  {
    name: "St. Tekle Haymanot",
    title: "The Pillar of Ethiopia",
    description:
      "Known for standing on one leg for 29 years in prayer, St. Tekle Haymanot is one of Ethiopia's most revered saints. His dedication to prayer and fasting inspires us to persevere in our spiritual disciplines.",
    image: "/placeholder.svg?height=300&width=300",
    feastDay: "Nehassie 24 (August 30)",
    caption: "One leg, all faith!",
  },
]

export function SaintOfTheDay() {
  const { toast } = useToast()
  const saint = saints[0] // For now we just use the first saint

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${saint.name} - Saint of the Day`,
          text: `${saint.title} - Learn about ${saint.name} from the Ethiopian Orthodox Church!`,
          url: window.location.href,
        })
        .catch((err) => {
          console.error("Error sharing:", err)
        })
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(`${saint.name} - ${saint.title} - ${window.location.href}`)
      toast({
        title: "Copied to clipboard",
        description: "Share this saint's story with your friends!",
      })
    }
  }

  return (
    <Card className="border-none bg-gray-900/50 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2">
          <motion.div
            className="relative h-[300px] md:h-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image src={saint.image || "/placeholder.svg"} alt={saint.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:hidden">
              <h3 className="text-xl font-bold text-white">{saint.name}</h3>
              <p className="text-white/90">{saint.title}</p>
            </div>
          </motion.div>

          <motion.div
            className="p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="hidden md:block mb-4">
              <h3 className="text-2xl font-bold text-white">{saint.name}</h3>
              <p className="text-lg text-amber-500 font-medium">{saint.title}</p>
              <p className="text-orange-500 italic text-sm mt-1">&quot;{saint.caption}&quot;</p>
            </div>

            <div className="flex items-center text-sm text-gray-400 mb-4">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Feast Day: {saint.feastDay}</span>
            </div>

            <p className="text-white/80 mb-6">{saint.description}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="bg-amber-500 hover:bg-orange-600 text-black transition-colors duration-300">
                <Link href="/saints">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Learn More
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                className="flex items-center gap-2 border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Share2 className="h-4 w-4" />
                Share to Stories
              </Button>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}
