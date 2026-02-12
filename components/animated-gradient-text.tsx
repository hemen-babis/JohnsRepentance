"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface AnimatedGradientTextProps {
  text: string
  className?: string
}

export function AnimatedGradientText({ text, className }: AnimatedGradientTextProps) {
  return (
    <motion.span
      className={cn("bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-500", className)}
      initial={{ backgroundPosition: "0% 50%" }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    >
      {text}
    </motion.span>
  )
}
