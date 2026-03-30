"use client"

import { useEffect, useMemo, useState } from "react"
import { CheckCircle2, Circle, HelpCircle, Lock, RefreshCcw, ScrollText } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import type { QuizQuestion } from "@/lib/catechumen-data"

const QUIZ_STORAGE_KEY = "catechumen-quiz-progress"

interface LessonModuleShellProps {
  lessonId: number
  lessonSlug: string
  sectionTitles: string[]
  sectionPrompts?: string[]
  learningGoals: string[]
  reviewQuestions?: string[]
  recapPoints: string[]
  quizQuestions: QuizQuestion[]
  children: React.ReactNode
}

interface StoredQuizResult {
  passed: boolean
  score: number
}

export function LessonModuleShell({
  lessonId,
  quizQuestions,
  children,
}: LessonModuleShellProps) {
  const [activeTab, setActiveTab] = useState("read")
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [quizResult, setQuizResult] = useState<StoredQuizResult | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const requiredCorrect = Math.ceil(quizQuestions.length * 0.85)
  const currentCorrect = useMemo(
    () => quizQuestions.reduce((count, question, index) => count + (selectedAnswers[index] === question.answerIndex ? 1 : 0), 0),
    [quizQuestions, selectedAnswers],
  )
  const currentScore = quizQuestions.length === 0 ? 0 : Math.round((currentCorrect / quizQuestions.length) * 100)
  const quizPassed = quizResult?.passed ?? false

  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const rawQuiz = window.localStorage.getItem(QUIZ_STORAGE_KEY)
      if (rawQuiz) {
        const parsed = JSON.parse(rawQuiz) as Record<string, StoredQuizResult>
        const saved = parsed[String(lessonId)]
        if (saved && typeof saved.score === "number" && typeof saved.passed === "boolean") {
          setQuizResult(saved)
          setSubmitted(true)
        }
      }
    } catch {
      window.localStorage.removeItem(QUIZ_STORAGE_KEY)
    }
  }, [lessonId])

  useEffect(() => {
    if (typeof window === "undefined") return

    function openCheckTab() {
      setActiveTab("check")
      window.requestAnimationFrame(() => {
        document.getElementById("check")?.scrollIntoView({ behavior: "smooth", block: "start" })
      })
    }

    window.addEventListener("catechumen-open-check", openCheckTab)

    if (window.location.hash === "#check") {
      openCheckTab()
    }

    return () => {
      window.removeEventListener("catechumen-open-check", openCheckTab)
    }
  }, [])

  function persistQuizResult(result: StoredQuizResult) {
    setQuizResult(result)
    try {
      const raw = window.localStorage.getItem(QUIZ_STORAGE_KEY)
      const parsed = raw ? JSON.parse(raw) : {}
      const safe = parsed && typeof parsed === "object" ? parsed : {}
      safe[String(lessonId)] = result
      window.localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(safe))
      window.dispatchEvent(new Event("catechumen-quiz-updated"))
    } catch {
      window.localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify({ [lessonId]: result }))
      window.dispatchEvent(new Event("catechumen-quiz-updated"))
    }
  }

  function submitQuiz() {
    const result = {
      passed: currentCorrect >= requiredCorrect,
      score: currentScore,
    }
    setSubmitted(true)
    persistQuizResult(result)
  }

  function resetQuiz() {
    setSelectedAnswers({})
    setSubmitted(false)
    persistQuizResult({ passed: false, score: 0 })
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="grid gap-4 lg:grid-cols-[92px_minmax(0,1fr)] lg:items-start">
        <div className="rounded-[1.5rem] border border-white/45 bg-white/72 p-2 shadow-[0_18px_50px_-30px_rgba(120,53,15,0.28)] backdrop-blur-xl dark:border-white/10 dark:bg-stone-900/40 lg:sticky lg:top-24">
          <TabsList className="grid h-auto w-full grid-cols-2 gap-2 rounded-[1.1rem] bg-transparent p-0 lg:grid-cols-1">
            <TabsTrigger
              value="read"
              className="flex flex-col items-center gap-1 rounded-[1rem] border border-amber-200/70 bg-amber-50/80 px-3 py-3 text-xs text-stone-700 data-[state=active]:border-orange-300 data-[state=active]:bg-white data-[state=active]:text-stone-900 dark:border-orange-900/30 dark:bg-orange-950/20 dark:text-stone-300 dark:data-[state=active]:bg-stone-900"
            >
              <ScrollText className="h-4 w-4" />
              <span>Read</span>
            </TabsTrigger>
            <TabsTrigger
              value="check"
              className="flex flex-col items-center gap-1 rounded-[1rem] border border-amber-200/70 bg-amber-50/80 px-3 py-3 text-xs text-stone-700 data-[state=active]:border-orange-300 data-[state=active]:bg-white data-[state=active]:text-stone-900 dark:border-orange-900/30 dark:bg-orange-950/20 dark:text-stone-300 dark:data-[state=active]:bg-stone-900"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Check</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="min-w-0">
          <TabsContent value="read" className="mt-0 space-y-6">
            <div className="space-y-6">{children}</div>
          </TabsContent>

          <TabsContent value="check" className="mt-0 space-y-6">
            <div className="rounded-[1.75rem] border border-white/45 bg-white/80 p-6 shadow-[0_24px_80px_-46px_rgba(120,53,15,0.28)] backdrop-blur-xl dark:border-white/10 dark:bg-stone-900/45">
              <div id="check" className="relative -top-24" />
              <div className="flex items-center gap-3 text-orange-700 dark:text-amber-300">
                <HelpCircle className="h-5 w-5" />
                <h3 className="text-xl font-semibold text-stone-900 dark:text-white">Question and answer check</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                You need at least <span className="font-semibold text-stone-900 dark:text-white">85%</span> to unlock completion and the next lesson.
              </p>

              <div className="mt-6 space-y-5">
                {quizQuestions.map((question, questionIndex) => (
                  <div key={question.prompt} className="rounded-[1.25rem] border border-amber-200/70 bg-gradient-to-br from-white to-amber-50/60 p-5 dark:border-orange-900/30 dark:from-stone-900 dark:to-orange-950/20">
                    <p className="font-medium text-stone-900 dark:text-white">
                      {questionIndex + 1}. {question.prompt}
                    </p>
                    <div className="mt-4 space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const checked = selectedAnswers[questionIndex] === optionIndex
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setSelectedAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))}
                            className={`flex w-full items-start gap-3 rounded-[1rem] border px-4 py-3 text-left transition ${
                              checked
                                ? "border-orange-400 bg-orange-50 text-stone-900 dark:border-amber-500 dark:bg-orange-950/40 dark:text-white"
                                : "border-amber-200/70 bg-white/80 text-stone-700 hover:border-orange-300 dark:border-orange-900/30 dark:bg-stone-900/60 dark:text-stone-300"
                            }`}
                          >
                            {checked ? (
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-600 dark:text-amber-400" />
                            ) : (
                              <Circle className="mt-0.5 h-4 w-4 shrink-0 text-stone-400 dark:text-stone-500" />
                            )}
                            <span>{option}</span>
                          </button>
                        )
                      })}
                    </div>
                    {submitted ? (
                      <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-300">{question.explanation}</p>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  onClick={submitQuiz}
                  disabled={quizQuestions.length > 0 && Object.keys(selectedAnswers).length !== quizQuestions.length}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-white disabled:opacity-60"
                >
                  Submit Check
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetQuiz}
                  className="border-amber-300/70 bg-white/60 text-orange-700 dark:bg-stone-900/60 dark:text-amber-300"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Reset Answers
                </Button>
              </div>

              {submitted ? (
                <div
                  className={`mt-6 rounded-[1.25rem] border p-5 ${
                    quizPassed
                      ? "border-emerald-300 bg-emerald-50/80 dark:border-emerald-900/40 dark:bg-emerald-950/20"
                      : "border-amber-300 bg-amber-50/80 dark:border-orange-900/40 dark:bg-orange-950/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {quizPassed ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Lock className="h-5 w-5 text-orange-600 dark:text-amber-400" />
                    )}
                    <p className="font-semibold text-stone-900 dark:text-white">
                      {quizPassed
                        ? `Passed with ${quizResult?.score ?? currentScore}%`
                        : `Not passed yet: ${quizResult?.score ?? currentScore}%`}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </TabsContent>
        </div>
      </div>
    </Tabs>
  )
}
