"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"

const lines = [
  "Before you had questions,",
  "God was already calling you.",
  "There is a way of knowing Him",
  "that begins in silence.",
  "Not everything must be understood.",
  "Some things are entered.",
  "This is that path.",
]

export default function SacredHeroSection() {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [typedLines, setTypedLines] = useState<string[]>(lines.map(() => ""))
  const [finished, setFinished] = useState(false)

  const currentLine = useMemo(() => lines[lineIndex] ?? "", [lineIndex])

  useEffect(() => {
    if (finished) return

    const isCurrentLineDone = charIndex >= currentLine.length

    if (isCurrentLineDone) {
      if (lineIndex === lines.length - 1) {
        const doneTimer = setTimeout(() => setFinished(true), 500)
        return () => clearTimeout(doneTimer)
      }

      const nextLineTimer = setTimeout(() => {
        setLineIndex((prev) => prev + 1)
        setCharIndex(0)
      }, 700)

      return () => clearTimeout(nextLineTimer)
    }

    const typingTimer = setTimeout(() => {
      const nextCharIndex = charIndex + 1

      setTypedLines((prev) => {
        const next = [...prev]
        next[lineIndex] = currentLine.slice(0, nextCharIndex)
        return next
      })

      setCharIndex(nextCharIndex)
    }, 45)

    return () => clearTimeout(typingTimer)
  }, [charIndex, currentLine, finished, lineIndex])

  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent text-[#3f342a] dark:bg-[linear-gradient(180deg,#110b08_0%,#1a110c_24%,#22140d_58%,#130c08_100%)] dark:text-[#f3e7d7]">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 dark:hidden" />
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.03] dark:hidden" />
        <div className="absolute inset-0 hidden dark:block dark:bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.08),transparent_28%),radial-gradient(circle_at_18%_22%,rgba(249,115,22,0.09),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(245,158,11,0.06),transparent_22%),linear-gradient(180deg,rgba(14,10,8,0.96)_0%,rgba(24,16,12,0.98)_48%,rgba(13,9,7,1)_100%)]" />
        <div className="absolute inset-0 hidden dark:block dark:bg-[url('/patterns/ethiopian-cross-pattern.svg')] dark:opacity-[0.03]" />
      </motion.div>

      <div className="relative z-10 flex min-h-screen items-center px-6 py-16 md:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-3xl">
            <div className="text-pill mb-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-[11px] uppercase tracking-[0.28em] shadow-[0_12px_30px_-22px_rgba(120,53,15,0.35)] backdrop-blur-md dark:border-orange-800/30 dark:bg-[rgba(255,173,73,0.08)] dark:text-amber-200/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f0d0a0] dark:bg-amber-300" />
              Catechumen Corner
            </div>

            <div className="space-y-6 md:space-y-7">
              <p
                className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight dark:text-[#f0d7ad]"
                style={{ color: "#3a1e01" }}
              >
                Be still…
              </p>

              <div className="space-y-5 md:space-y-6">
                {typedLines.map((line, i) => {
                  const isActive = i === lineIndex && !finished
                  const hasStarted = line.length > 0
                  const isComplete = i < lineIndex || finished

                  return (
                    <div
                      key={i}
                      className="min-h-[2.5rem] md:min-h-[3.25rem]"
                    >
                      {(hasStarted || isComplete) && (
                        <p
                          className="text-[clamp(1.45rem,2.6vw,2.35rem)] font-medium leading-[1.35] tracking-tight dark:text-white/88"
                          style={{ color: "#4a3b30" }}
                        >
                          {line}
                          {isActive && (
                            <span className="ml-1 inline-block animate-pulse">
                              |
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div
              className={`mt-16 transition-all duration-700 ${
                finished
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-4 opacity-0"
              }`}
            >
              <Link
                href="/catechumen/roadmap"
                className="group inline-flex items-center rounded-full border border-[#3a1e01]/20 bg-[#3a1e01]/8 px-6 py-3 text-lg font-semibold tracking-[0.02em] shadow-[0_16px_36px_-24px_rgba(120,53,15,0.35)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#3a1e01]/14 dark:border-amber-500/30 dark:bg-[rgba(255,173,73,0.08)] dark:text-amber-200 dark:hover:border-amber-300 dark:hover:bg-[rgba(255,173,73,0.12)]"
                style={{ color: "#3a1e01" }}
              >
                Begin slowly →
              </Link>

              <p
                className="mt-4 text-sm tracking-[0.03em] dark:text-stone-400"
                style={{ color: "#6b4c30" }}
              >
                Take one step. The rest will be given.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}