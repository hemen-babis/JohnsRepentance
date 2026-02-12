"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface ScrollTriggeredSectionProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  threshold?: number
}

export function ScrollTriggeredSection({
  children,
  className = "",
  direction = "up",
  delay = 0,
  threshold = 0.1,
}: ScrollTriggeredSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  // Set initial and animate values based on direction
  let initial = {}

  switch (direction) {
    case "up":
      initial = { opacity: 0, y: 50 }
      break
    case "down":
      initial = { opacity: 0, y: -50 }
      break
    case "left":
      initial = { opacity: 0, x: 50 }
      break
    case "right":
      initial = { opacity: 0, x: -50 }
      break
    default:
      initial = { opacity: 0, y: 50 }
  }

  return (
    <section className={className}>
      <motion.div
        ref={ref}
        initial={initial}
        animate={isInView ? { opacity: 1, y: 0, x: 0 } : initial}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1], // Custom ease curve for smooth animation
        }}
      >
        {children}
      </motion.div>
    </section>
  )
}
