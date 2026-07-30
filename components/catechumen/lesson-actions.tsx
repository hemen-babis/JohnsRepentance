"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { catechumenLessons } from "@/lib/catechumen-data"

const STORAGE_KEY = "catechumen-progress"
const QUIZ_STORAGE_KEY = "catechumen-quiz-progress"

interface LessonActionsProps {
  lessonId: number
  nextLessonSlug?: string
  requireQuizPass?: boolean
}

export function LessonActions({ lessonId, nextLessonSlug, requireQuizPass = false }: LessonActionsProps) {
  const [completed, setCompleted] = useState(false)
  const [quizPassed, setQuizPassed] = useState(!requireQuizPass)
  const totalLessons = catechumenLessons.length

  function updateProgress(markComplete: boolean) {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      const current = Array.isArray(parsed) ? parsed.filter((value): value is number => typeof value === "number") : []
      const next = markComplete ? Array.from(new Set([...current, lessonId])).sort((a, b) => a - b) : current.filter((id) => id !== lessonId)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      setCompleted(markComplete)
    } catch {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(markComplete ? [lessonId] : []))
      setCompleted(markComplete)
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.includes(lessonId)) {
        setCompleted(true)
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [lessonId])

  useEffect(() => {
    if (!requireQuizPass || typeof window === "undefined") return

    function syncQuizState() {
      try {
        const raw = window.localStorage.getItem(QUIZ_STORAGE_KEY)
        if (!raw) {
          setQuizPassed(false)
          return
        }
        const parsed = JSON.parse(raw)
        const result = parsed?.[lessonId]
        const passed = Boolean(result?.passed)
        setQuizPassed(passed)
        if (passed) {
          updateProgress(true)
        }
      } catch {
        window.localStorage.removeItem(QUIZ_STORAGE_KEY)
        setQuizPassed(false)
      }
    }

    syncQuizState()
    window.addEventListener("storage", syncQuizState)
    window.addEventListener("catechumen-quiz-updated", syncQuizState)

    return () => {
      window.removeEventListener("storage", syncQuizState)
      window.removeEventListener("catechumen-quiz-updated", syncQuizState)
    }
  }, [lessonId, requireQuizPass])

  function goToCheckSection() {
    if (typeof window === "undefined") return
    window.location.hash = "check"
    window.dispatchEvent(new Event("catechumen-open-check"))
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-stone-600 dark:text-stone-300">
        Lesson {lessonId} of {totalLessons}. {requireQuizPass ? "Pass the lesson check with at least 85% to continue." : "Continue when you are ready."}
      </p>
      {requireQuizPass && !quizPassed ? (
        <p className="text-sm text-orange-700 dark:text-amber-300">
          The next lesson is locked until you pass the question and answer check.
        </p>
      ) : null}
      {requireQuizPass && quizPassed ? (
        <p className="text-sm text-emerald-700 dark:text-emerald-300">
          This lesson is marked complete because you passed the check.
        </p>
      ) : null}
      <div className="flex flex-col gap-3 sm:flex-row">
        {nextLessonSlug ? (
          <Button
            asChild={quizPassed || !requireQuizPass}
            variant="outline"
            className="border-amber-300/70 bg-white/60 text-orange-700 dark:bg-stone-900/60 dark:text-amber-300"
            onClick={requireQuizPass && !quizPassed ? goToCheckSection : undefined}
          >
            {quizPassed || !requireQuizPass ? <Link href={`/catechumen/${nextLessonSlug}`}>Go to Next Lesson</Link> : <span>Go to Check Section</span>}
          </Button>
        ) : null}
      </div>
    </div>
  )
}
