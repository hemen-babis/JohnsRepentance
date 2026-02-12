"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GeezHeading } from "@/components/ui/geez-heading"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

export function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false)

  return (
    <section className="relative h-[90vh] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-900/70 to-amber-800/70 dark:from-orange-950/80 dark:to-amber-950/80 z-10" />
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
          poster="/placeholder.svg?height=800&width=1200"
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="#" type="video/mp4" />
          {/* Fallback image */}
          <Image
            src="/placeholder.svg?height=800&width=1200"
            alt="Ethiopian Orthodox worship"
            fill
            className="object-cover"
          />
        </video>
      </div>
      <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-10 z-5" />
      <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center items-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl text-center"
        >
          <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-white border-white/40 py-1.5 px-3">
            <Sparkles className="h-4 w-4 mr-2 text-amber-300" />
            AI-Enhanced Spiritual Journey
          </Badge>

          <GeezHeading className="mb-4 text-amber-300 text-2xl">ንስሓ ግበሩ</GeezHeading>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
            "Repent, for the Kingdom of Heaven is Near!"
            <span className="block text-lg mt-2 font-normal">Matthew 3:1-2</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-center">
            Your Ethiopian Orthodox Home Online – Faith. Repentance. Salvation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white border-2 border-amber-300 dark:border-amber-700 group relative overflow-hidden"
            >
              <Link href="/join">
                <span className="relative z-10">Start Your Faith Journey</span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20 group relative overflow-hidden"
            >
              <Link href="/ai-spiritual-guide">
                <span className="relative z-10">Try AI Spiritual Guide</span>
                <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent z-20" />
    </section>
  )
}
