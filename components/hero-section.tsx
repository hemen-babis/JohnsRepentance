"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GeezHeading } from "@/components/ui/geez-heading"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ArrowRight, ChevronDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-[90vh] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-950/80 via-amber-900/70 to-orange-800/60 dark:from-stone-950/90 dark:via-orange-950/70 dark:to-amber-950/60 z-10" />
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home-hero.png"
          alt="Repentance and Orthodox faith hero artwork"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.08] z-5" />
      {/* Radial glow from top */}
      <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_top,rgba(255,255,255,0.12),transparent_60%)] z-10" />

      <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center items-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-4xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Badge className="mb-6 bg-white/15 backdrop-blur-md text-white border-white/20 py-1.5 px-4 hover:bg-white/20 transition-colors duration-300">
              <Sparkles className="h-4 w-4 mr-2 text-amber-300" />
              AI-Enhanced Spiritual Journey
            </Badge>
          </motion.div>

          <GeezHeading className="mb-4 text-amber-300/90 text-2xl">ንስሓ ግበሩ</GeezHeading>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-center leading-tight tracking-tight">
            &ldquo;Repent, for the Kingdom of
            <span className="block mt-1">Heaven is Near!&rdquo;</span>
            <span className="block text-base md:text-lg mt-3 font-normal text-amber-200/80 tracking-wide">Matthew 3:1-2</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 text-center text-white/80 max-w-2xl mx-auto leading-relaxed">
            Your Ethiopian Orthodox Home Online &ndash; Faith. Repentance. Salvation.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white border border-amber-300/30 shadow-[0_8px_32px_rgba(245,158,11,0.35)] group relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(245,158,11,0.45)]"
            >
              <Link href="/join">
                <span className="relative z-10 font-semibold">Start Your Faith Journey</span>
                <ArrowRight className="relative z-10 h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border border-white/25 text-white hover:bg-white/20 group relative overflow-hidden shadow-[0_8px_32px_rgba(255,255,255,0.08)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <Link href="/catechumen">
                <span className="relative z-10 font-semibold">Start Catechumen Corner</span>
                <span className="absolute inset-0 bg-white/15 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 scroll-indicator z-20">
        <div className="flex flex-col items-center gap-1 text-white/40">
          <span className="text-xs uppercase tracking-[0.2em] font-light">Scroll</span>
          <ChevronDown className="h-5 w-5" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  )
}
