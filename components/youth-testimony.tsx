"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Testimony = {
  name: string
  age: number
  quote: string
  image: string
}

const testimonies: Testimony[] = [
  {
    name: "Sarah",
    age: 19,
    quote:
      "God lifted my soul through EOTC. The community at John's Repentance helped me reconnect with my faith during college.",
    image: "/images/logo.png",
  },
  {
    name: "Michael",
    age: 22,
    quote:
      "Learning about our Orthodox traditions in English has transformed my understanding of our faith. I'm proud of my heritage.",
    image: "/images/logo.png",
  },
  {
    name: "Bethel",
    age: 17,
    quote: "The youth programs helped me find friends who share my values. Now I look forward to church every Sunday!",
    image: "/images/logo.png",
  },
]

export function YouthTestimony() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimony = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonies.length)
  }

  const prevTestimony = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonies.length) % testimonies.length)
  }

  const currentTestimony = testimonies[currentIndex]

  return (
    <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
            <Image
              src={currentTestimony.image || "/images/logo.png"}
              alt={currentTestimony.name}
              fill
              className="object-cover rounded-full border-2 border-amber-500"
            />
          </div>

          <div className="flex-1">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-white text-lg italic mb-4">{`"${currentTestimony.quote}"`}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-500 font-medium">
                    {currentTestimony.name}, {currentTestimony.age}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevTestimony}
                    className="text-white hover:text-amber-500 hover:bg-amber-950/30"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextTestimony}
                    className="text-white hover:text-amber-500 hover:bg-amber-950/30"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button asChild variant="link" className="text-amber-500 hover:text-amber-400">
            <Link href="/youth">Read More Testimonies</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
