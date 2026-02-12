"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { GeezHeading } from "@/components/ui/geez-heading"

interface ScrollTriggeredAnimationProps {
  children: React.ReactNode
  type?: "fade" | "slide" | "scale" | "rotate" | "parallax"
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  threshold?: number
  className?: string
}

export function ScrollTriggeredAnimation({
  children,
  type = "fade",
  direction = "up",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className,
}: ScrollTriggeredAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  // Set initial and animate values based on animation type
  let initial = {}
  let animate = {}

  switch (type) {
    case "fade":
      initial = { opacity: 0 }
      animate = { opacity: 1 }
      break
    case "slide":
      if (direction === "up") {
        initial = { opacity: 0, y: 50 }
        animate = { opacity: 1, y: 0 }
      } else if (direction === "down") {
        initial = { opacity: 0, y: -50 }
        animate = { opacity: 1, y: 0 }
      } else if (direction === "left") {
        initial = { opacity: 0, x: 50 }
        animate = { opacity: 1, x: 0 }
      } else if (direction === "right") {
        initial = { opacity: 0, x: -50 }
        animate = { opacity: 1, x: 0 }
      }
      break
    case "scale":
      initial = { opacity: 0, scale: 0.8 }
      animate = { opacity: 1, scale: 1 }
      break
    case "rotate":
      initial = { opacity: 0, rotate: direction === "left" ? -10 : 10 }
      animate = { opacity: 1, rotate: 0 }
      break
    case "parallax":
      // Parallax is handled differently with useScroll
      break
    default:
      initial = { opacity: 0 }
      animate = { opacity: 1 }
  }

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    disabled: type !== "parallax",
  })

  const y = useTransform(scrollYProgress, [0, 1], [direction === "up" ? 100 : -100, 0])

  const springY = useSpring(y, { stiffness: 100, damping: 30 })

  if (type === "parallax") {
    // For parallax effect, we use useScroll

    return (
      <motion.div ref={ref} style={{ y: springY }} className={className}>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom ease curve for smooth animation
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Example usage with Ethiopian Orthodox content
export function AnimatedFeatureSection() {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <ScrollTriggeredAnimation type="fade">
          <div className="text-center mb-16">
            <GeezHeading className="text-amber-800 dark:text-amber-500 mb-2">የእምነት ጉዞ</GeezHeading>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">The Ethiopian Orthodox Journey</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the rich traditions and spiritual practices of the Ethiopian Orthodox Tewahedo Church
            </p>
          </div>
        </ScrollTriggeredAnimation>

        <div className="grid md:grid-cols-3 gap-8">
          <ScrollTriggeredAnimation type="slide" direction="up" delay={0.1}>
            <Card className="border-none shadow-lg overflow-hidden h-full">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-orange-600 dark:text-orange-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Faith</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  The Ethiopian Orthodox Church preserves the authentic apostolic faith, maintaining traditions that
                  date back to the earliest days of Christianity.
                </p>
              </CardContent>
            </Card>
          </ScrollTriggeredAnimation>

          <ScrollTriggeredAnimation type="slide" direction="up" delay={0.2}>
            <Card className="border-none shadow-lg overflow-hidden h-full">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-amber-600 dark:text-amber-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Scripture</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  With 81 books in its biblical canon, the Ethiopian Orthodox Church preserves ancient texts like Enoch
                  and Jubilees that offer deep spiritual insights.
                </p>
              </CardContent>
            </Card>
          </ScrollTriggeredAnimation>

          <ScrollTriggeredAnimation type="slide" direction="up" delay={0.3}>
            <Card className="border-none shadow-lg overflow-hidden h-full">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600 dark:text-blue-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Tradition</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Through fasting, prayer, and liturgical worship, Ethiopian Orthodox believers participate in
                  traditions that have shaped their spiritual lives for centuries.
                </p>
              </CardContent>
            </Card>
          </ScrollTriggeredAnimation>
        </div>
      </div>
    </div>
  )
}
