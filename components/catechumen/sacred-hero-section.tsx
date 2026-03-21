"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const lines = [
  "Be still…",
  "Before you had questions,",
  "God was already calling you.",
  "There is a way of knowing Him",
  "that begins in silence.",
  "Not everything must be understood.",
  "Some things are entered.",
  "This is that path.",
]

const delayChildren = 1.1
const staggerChildren = 1.85
const firstPause = 1.35
const lineDuration = 2.2
const totalAnimationTime = delayChildren + firstPause + (lines.length - 1) * staggerChildren + lineDuration + 0.8

const lineVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: lineDuration,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren,
      staggerChildren,
    },
  },
}

const ctaVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.6,
      delay: totalAnimationTime,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function SacredHeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f8f5f0] text-[#3f342a] dark:bg-[linear-gradient(180deg,#110b08_0%,#1a110c_24%,#22140d_58%,#130c08_100%)] dark:text-[#f3e7d7]">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-[url('/images/parchment-bg.png?v=20260321')] bg-cover bg-center bg-no-repeat dark:hidden" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_26%,rgba(255,244,214,0.42),transparent_34%),radial-gradient(circle_at_18%_22%,rgba(227,190,122,0.14),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(214,165,88,0.12),transparent_24%),linear-gradient(180deg,rgba(251,248,242,0.68)_0%,rgba(245,236,218,0.5)_48%,rgba(247,242,231,0.62)_100%)] dark:hidden" />
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.03] dark:hidden" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_48%,rgba(120,78,35,0.04)_100%)] dark:hidden" />
        <div className="absolute inset-0 hidden dark:block dark:bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.08),transparent_28%),radial-gradient(circle_at_18%_22%,rgba(249,115,22,0.09),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(245,158,11,0.06),transparent_22%),linear-gradient(180deg,rgba(14,10,8,0.96)_0%,rgba(24,16,12,0.98)_48%,rgba(13,9,7,1)_100%)]" />
        <div className="absolute inset-0 hidden dark:block dark:bg-[url('/patterns/ethiopian-cross-pattern.svg')] dark:opacity-[0.03]" />
      </motion.div>

      <div className="relative z-10 flex min-h-screen items-center px-6 py-16 md:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">
            <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6 md:space-y-7">
            {lines.map((line, index) => (
              <motion.div
                key={line}
                variants={lineVariants}
                transition={
                  index === 1
                    ? {
                        duration: lineDuration,
                        delay: firstPause,
                        ease: [0.22, 1, 0.36, 1],
                      }
                    : undefined
                }
              >
                <p
                  className={[
                    "font-serif leading-[1.7] tracking-[0.025em]",
                    index === 0
                      ? "text-[clamp(2.2rem,5vw,4.5rem)] italic text-[#6c4b2d] dark:text-[#f0d7ad]"
                      : index < 4
                        ? "text-[clamp(1.35rem,2.4vw,2.1rem)] text-[#4a3b30] dark:text-[#f2e7d7]"
                        : "text-[clamp(1.35rem,2.4vw,2.1rem)] text-[#6a5a4d] dark:text-[#d8c7b2]",
                  ].join(" ")}
                >
                  {line}
                </p>
              </motion.div>
            ))}
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={ctaVariants} className="mt-14">
              <Link
                href="#roadmap"
                className="group inline-flex items-center border-b border-[#b88b4a]/50 pb-2 font-serif text-lg tracking-[0.045em] text-[#7a552f] transition-colors duration-500 hover:border-[#9a6b34] hover:text-[#5e4025] dark:border-amber-500/40 dark:text-amber-200 dark:hover:border-amber-300 dark:hover:text-amber-100"
              >
                Begin slowly →
              </Link>
              <p className="mt-4 text-sm tracking-[0.03em] text-[#7b6a58] dark:text-stone-400">
                Take one step. The rest will be given.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
