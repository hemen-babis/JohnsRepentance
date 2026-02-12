"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const saints = [
  {
    name: "St. Tekle Haymanot",
    title: "One leg, all faith!",
    description:
      "Known for standing on one leg for 29 years in prayer, St. Tekle Haymanot is one of Ethiopia's most revered saints. His dedication to prayer and fasting inspires us to persevere in our spiritual disciplines.",
    image: "/placeholder.svg?height=300&width=300",
    feastDay: "Nehassie 24 (August 30)",
  },
]

export function DailySaintVibeCheck() {
  const { toast } = useToast()
  const saint = saints[0] // For now we just use the first saint

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${saint.name} - Daily Saint Vibe Check`,
          text: `${saint.title} - Learn about ${saint.name} from John's Repentance!`,
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
    <Card className="border-none shadow-lg overflow-hidden">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2">
          <div className="relative h-[300px] md:h-auto">
            <Image src={saint.image || "/placeholder.svg"} alt={saint.name} fill className="object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:hidden">
              <h3 className="text-xl font-bold text-white">{saint.name}</h3>
              <p className="text-white/90">{saint.title}</p>
            </div>
          </div>

          <div className="p-6">
            <div className="hidden md:block mb-4">
              <h3 className="text-2xl font-bold">{saint.name}</h3>
              <p className="text-lg text-orange-600 font-medium">{saint.title}</p>
            </div>

            <p className="text-gray-700 mb-4">{saint.description}</p>

            <div className="text-sm text-gray-500 mb-6">
              Feast Day: <span className="font-medium">{saint.feastDay}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600"
              >
                <Link href="/saints">Learn More</Link>
              </Button>
              <Button variant="outline" onClick={handleShare} className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share to Stories
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
