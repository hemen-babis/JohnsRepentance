"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GeezHeading } from "@/components/geez-heading"
import { useAuthProgress } from "@/components/providers/auth-progress-provider"
import { BookOpen, Flame, GraduationCap, Target, Trophy } from "lucide-react"

type QuizItem = {
  id: string
  question: string
  options: string[]
  answer: number
  note: string
}

type LentWeek = {
  id: string
  title: string
  theme: string
  readings: Array<{ id: string; date: string; passage: string }>
}

type ReadingMeta = {
  title: string
  summary: string
  checklist: string[]
}

type Lesson = {
  id: string
  title: string
  category: string
  xp: number
}

const quizBank: QuizItem[] = [
  {
    id: "q1",
    question: "What is the core spirit of Great Lent?",
    options: ["Showmanship", "Repentance and prayer", "Travel", "Debate"],
    answer: 1,
    note: "Great Lent calls us to repentance, prayer, humility, and mercy.",
  },
  {
    id: "q2",
    question: "Why do we ask forgiveness during fasting seasons?",
    options: ["To follow a trend", "To impress others", "To heal relationships before God", "To skip prayer"],
    answer: 2,
    note: "Forgiveness and reconciliation are central to authentic spiritual growth.",
  },
  {
    id: "q3",
    question: "What supports consistent prayer life most?",
    options: ["Only emotion", "Fixed rhythm and discipline", "Waiting for mood", "Social media"],
    answer: 1,
    note: "A fixed rhythm helps prayer remain steady through changing moods.",
  },
]

const lentWeeks: LentWeek[] = [
  {
    id: "w1",
    title: "Week 1",
    theme: "The Word Revealed",
    readings: [
      { id: "w1d1", date: "February 16", passage: "John 1:1 - 18" },
      { id: "w1d2", date: "February 17", passage: "John 1:19 - 51" },
      { id: "w1d3", date: "February 18", passage: "John 2" },
      { id: "w1d4", date: "February 19", passage: "John 3" },
      { id: "w1d5", date: "February 20", passage: "John 4:1 - 42" },
    ],
  },
  {
    id: "w2",
    title: "Week 2",
    theme: "Living Water & Healed",
    readings: [
      { id: "w2d1", date: "February 23", passage: "John 4:43 - 54" },
      { id: "w2d2", date: "February 24", passage: "John 5" },
      { id: "w2d3", date: "February 25", passage: "John 6:1 - 21" },
      { id: "w2d4", date: "February 26", passage: "John 6:22 - 59" },
      { id: "w2d5", date: "February 27", passage: "John 6:60 - 71" },
    ],
  },
  {
    id: "w3",
    title: "Week 3",
    theme: "Light in the World",
    readings: [
      { id: "w3d1", date: "March 2", passage: "John 7" },
      { id: "w3d2", date: "March 3", passage: "John 8:1 - 30" },
      { id: "w3d3", date: "March 4", passage: "John 8:31 - 59" },
      { id: "w3d4", date: "March 5", passage: "John 9" },
      { id: "w3d5", date: "March 6", passage: "John 10:1 - 21" },
    ],
  },
  {
    id: "w4",
    title: "Week 4",
    theme: "Identity & Resurrection Power",
    readings: [
      { id: "w4d1", date: "March 9", passage: "John 10:22 - 42" },
      { id: "w4d2", date: "March 10", passage: "John 11:1 - 27" },
      { id: "w4d3", date: "March 11", passage: "John 11:28 - 57" },
      { id: "w4d4", date: "March 12", passage: "John 12:1 - 26" },
      { id: "w4d5", date: "March 13", passage: "John 12:27 - 50" },
    ],
  },
  {
    id: "w5",
    title: "Week 5",
    theme: "The Upper Room",
    readings: [
      { id: "w5d1", date: "March 16", passage: "John 13" },
      { id: "w5d2", date: "March 17", passage: "John 14" },
      { id: "w5d3", date: "March 18", passage: "John 15" },
      { id: "w5d4", date: "March 19", passage: "John 16" },
      { id: "w5d5", date: "March 20", passage: "John 17" },
    ],
  },
  {
    id: "w6",
    title: "Week 6",
    theme: "Passion of Christ",
    readings: [
      { id: "w6d1", date: "March 23", passage: "John 18:1 - 27" },
      { id: "w6d2", date: "March 24", passage: "John 18:28 - 40" },
      { id: "w6d3", date: "March 25", passage: "John 19:1 - 27" },
      { id: "w6d4", date: "March 26", passage: "John 19:28 - 42" },
      { id: "w6d5", date: "March 27", passage: "John 20:1 - 18" },
    ],
  },
  {
    id: "w7",
    title: "Week 7",
    theme: "Resurrection & Restoration",
    readings: [
      { id: "w7d1", date: "March 30", passage: "John 20:19 - 31" },
      { id: "w7d2", date: "March 31", passage: "John 21:1 - 14" },
      { id: "w7d3", date: "April 1", passage: "John 21:15 - 25" },
      { id: "w7d4", date: "April 2", passage: "Re-read John 15 or 17" },
      { id: "w7d5", date: "April 3", passage: "Prayer & Journaling" },
    ],
  },
]

const lessons: Lesson[] = [
  { id: "l1", title: "How to Build Daily Prayer Rhythm", category: "Prayer", xp: 40 },
  { id: "l2", title: "How to Fast with Wisdom", category: "Fasting", xp: 40 },
  { id: "l3", title: "Understanding Kidassie Basics", category: "Liturgy", xp: 50 },
  { id: "l4", title: "Repentance and Confession Basics", category: "Repentance", xp: 50 },
  { id: "l5", title: "Serving in Church with Humility", category: "Service", xp: 35 },
]

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function dayIndex() {
  return Math.floor(Date.now() / 86400000)
}

export default function YouthCornerPage() {
  const { user, profile, progress, saveProgress } = useAuthProgress()
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [selectedReadingKey, setSelectedReadingKey] = useState("w1:w1d1")
  const [translation, setTranslation] = useState("web")
  const [fullText, setFullText] = useState("")
  const [fullTextLabel, setFullTextLabel] = useState("")
  const [loadingText, setLoadingText] = useState(false)
  const [textError, setTextError] = useState("")

  const today = todayKey()
  const quiz = quizBank[dayIndex() % quizBank.length]
  const dailyQuizId = `quiz:${today}:${quiz.id}`
  const quizDone = progress.challengeCompletions.includes(dailyQuizId)

  const toggleCompletion = (id: string) => {
    const exists = progress.challengeCompletions.includes(id)
    const next = exists
      ? progress.challengeCompletions.filter((x) => x !== id)
      : [...progress.challengeCompletions, id]
    const nextActivity = progress.activityDates.includes(today)
      ? progress.activityDates
      : [today, ...progress.activityDates]
    saveProgress({ ...progress, challengeCompletions: next, activityDates: nextActivity })
  }

  const submitDailyQuiz = () => {
    if (selectedAnswer === null || quizDone) return
    if (selectedAnswer === quiz.answer) {
      toggleCompletion(dailyQuizId)
    }
  }

  const userName = profile.fullName || user?.displayName || user?.email || "Guest"
  const lessonDone = lessons.filter((l) => progress.challengeCompletions.includes(`lesson:${l.id}`)).length

  const lentDone = useMemo(() => {
    return lentWeeks.reduce(
      (sum, week) =>
        sum + week.readings.filter((reading) => progress.challengeCompletions.includes(`lent:${week.id}:${reading.id}`)).length,
      0,
    )
  }, [progress.challengeCompletions])

  const lentTotal = lentWeeks.reduce((sum, week) => sum + week.readings.length, 0)
  const lentPercent = Math.round((lentDone / lentTotal) * 100)

  const readingOptions = lentWeeks.flatMap((week) =>
    week.readings.map((reading) => ({
      key: `${week.id}:${reading.id}`,
      label: `${week.title} • ${reading.date} • ${reading.passage}`,
      weekTitle: week.title,
      theme: week.theme,
      date: reading.date,
      passage: reading.passage,
      id: reading.id,
      weekId: week.id,
    })),
  )

  const selectedReading =
    readingOptions.find((item) => item.key === selectedReadingKey) ?? readingOptions[0]

  const readingMeta: Record<string, ReadingMeta> = {
    "w1:w1d1": {
      title: "The Eternal Word",
      summary: "Christ is the eternal Word, true Light, and source of life. Start Lent by worshiping Him with reverence.",
      checklist: ["Read slowly", "Mark one truth about Christ", "Write one prayer"],
    },
    "w1:w1d2": {
      title: "Witness to the Light",
      summary: "John the Baptist points away from himself and toward Christ. True service always points to Jesus.",
      checklist: ["Read prayerfully", "Note one act of humility", "Apply one action today"],
    },
    "w1:w1d3": {
      title: "Water to Wine",
      summary: "Christ transforms ordinary life through obedience and faith. Lent invites transformation, not performance.",
      checklist: ["Read the passage", "Identify Christ's sign", "Pray for inner renewal"],
    },
  }

  const currentMeta: ReadingMeta = readingMeta[selectedReading.key] ?? {
    title: "Daily Great Lent Reading",
    summary:
      "Read this assigned Gospel passage with attention, repentance, and prayer. Record one key insight and one action.",
    checklist: ["Read carefully", "Capture one key insight", "End with a short prayer"],
  }

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setLoadingText(true)
      setTextError("")
      try {
        const res = await fetch(
          `/api/bible-text?reference=${encodeURIComponent(selectedReading.passage)}&translation=${translation}`,
        )
        const data = (await res.json()) as { text?: string; translation?: string; error?: string }
        if (cancelled) return
        if (!res.ok || !data.text) {
          setTextError(data.error || "Unable to load scripture text.")
          setFullText("")
          setFullTextLabel("")
          return
        }
        setFullText(data.text)
        setFullTextLabel(data.translation || translation.toUpperCase())
      } catch {
        if (!cancelled) {
          setTextError("Unable to load scripture text right now.")
          setFullText("")
          setFullTextLabel("")
        }
      } finally {
        if (!cancelled) setLoadingText(false)
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [selectedReading.passage, translation])

  const xp = useMemo(() => {
    return progress.challengeCompletions.reduce((sum, id) => {
      if (id.startsWith("quiz:")) return sum + 40
      if (id.startsWith("lesson:")) return sum + 45
      if (id.startsWith("lent:")) return sum + 30
      return sum
    }, 0)
  }, [progress.challengeCompletions])

  const level = Math.max(1, Math.floor(xp / 300) + 1)
  const levelProgress = Math.round(((xp % 300) / 300) * 100)

  return (
    <div className="min-h-screen">
      <section className="py-14">
        <div className="container mx-auto px-4 text-center">
          <GeezHeading className="mb-3 text-orange-700">ወጣቶች</GeezHeading>
          <h1 className="text-3xl md:text-5xl font-extrabold text-stone-900">Youth Corner</h1>
          <p className="mt-3 text-stone-700">Focused spiritual growth: quiz, dashboard, resources, lessons, and Great Lent prayer challenge.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <Tabs defaultValue="dashboard" className="max-w-6xl mx-auto">
          <div className="overflow-x-auto pb-2">
            <TabsList className="inline-flex w-max min-w-full md:w-full md:grid md:grid-cols-5 border border-amber-200/70 bg-white/80">
              <TabsTrigger value="dashboard" className="whitespace-nowrap min-w-[130px]">Dashboard</TabsTrigger>
              <TabsTrigger value="quiz" className="whitespace-nowrap min-w-[130px]">Daily Quiz</TabsTrigger>
              <TabsTrigger value="prayer" className="whitespace-nowrap min-w-[150px]">Prayer Challenge</TabsTrigger>
              <TabsTrigger value="lessons" className="whitespace-nowrap min-w-[150px]">Gamified Lessons</TabsTrigger>
              <TabsTrigger value="resources" className="whitespace-nowrap min-w-[130px]">Resources</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="mt-6 space-y-4">
            <Card className="border border-amber-300/70 bg-white/90">
              <CardContent className="py-4 flex flex-wrap items-center gap-3 text-sm">
                <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center font-bold text-amber-800">
                  {userName.slice(0, 1).toUpperCase()}
                </div>
                <span className="font-semibold">{userName}</span>
                <span>Level {level}</span>
                <span>{xp} XP</span>
                <span>{lessonDone}/{lessons.length} lessons done</span>
                <Badge className="bg-orange-600 md:ml-auto">Great Lent Mode</Badge>
              </CardContent>
            </Card>

            <Card className="border border-amber-300/70 bg-white/90">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-stone-900"><Target className="h-5 w-5 text-orange-600" />Today&apos;s Focus</CardTitle>
                <CardDescription>Keep it simple: prayer, scripture, service.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm font-semibold text-orange-700">Great Lent</p>
                <p className="font-semibold text-lg text-stone-900">Pray with attention, read the Gospel, and serve quietly.</p>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span>Level Progress</span><span>{xp % 300}/300 XP</span></div>
                  <Progress value={levelProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quiz" className="mt-6 space-y-4">
            <Card className="border border-amber-300/70 bg-white/90">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5 text-orange-600" />Daily Quiz</CardTitle>
                <CardDescription>One question every day. Correct answer gives +40 XP.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-semibold text-stone-900">{quiz.question}</p>
                <div className="space-y-2">
                  {quiz.options.map((opt, idx) => (
                    <button
                      key={opt}
                      type="button"
                      disabled={quizDone}
                      onClick={() => setSelectedAnswer(idx)}
                      className={`w-full rounded-lg border p-3 text-left ${selectedAnswer === idx ? "border-orange-500 bg-orange-50" : "border-stone-200 bg-white"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={submitDailyQuiz} disabled={quizDone || selectedAnswer === null}>Submit Answer</Button>
                  {quizDone && <Badge className="bg-green-600">Completed Today</Badge>}
                </div>
                {selectedAnswer !== null && (
                  <p className="text-sm text-stone-700">{quiz.note}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prayer" className="mt-6 space-y-4">
            <Card className="border border-amber-300/70 bg-white/90">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Flame className="h-5 w-5 text-orange-600" />8-Week Great Lent Prayer Challenge</CardTitle>
                <CardDescription>Pick a daily reading, use the checklist, and complete the item.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1"><span>Challenge Progress</span><span>{lentDone}/{lentTotal}</span></div>
                  <Progress value={lentPercent} className="h-2" />
                </div>

                <div className="rounded-lg border border-amber-200 bg-white p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="reading-picker" className="text-sm font-semibold text-stone-900">
                      Read the Bible
                    </label>
                    <select
                      id="reading-picker"
                      value={selectedReading.key}
                      onChange={(e) => setSelectedReadingKey(e.target.value)}
                      className="rounded-md border border-amber-300 bg-white px-3 py-2 text-sm"
                    >
                      {readingOptions.map((option) => (
                        <option key={option.key} value={option.key}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <label htmlFor="translation" className="text-sm font-semibold text-stone-900">
                      Translation
                    </label>
                    <select
                      id="translation"
                      value={translation}
                      onChange={(e) => setTranslation(e.target.value)}
                      className="rounded-md border border-amber-300 bg-white px-2 py-1 text-sm"
                    >
                      <option value="web">WEB (Public Domain)</option>
                      <option value="kjv">KJV (Public Domain)</option>
                    </select>
                  </div>

                  <div className="rounded-md border border-amber-200 bg-amber-50/60 p-3">
                    <p className="text-xs uppercase tracking-wide text-orange-700 font-semibold">
                      {selectedReading.weekTitle} • {selectedReading.theme}
                    </p>
                    <p className="text-sm font-semibold text-stone-900 mt-1">
                      {selectedReading.date} • {selectedReading.passage}
                    </p>
                    <p className="text-sm text-stone-700 mt-2">{currentMeta.title}</p>
                    <p className="text-sm text-stone-700 mt-1">{currentMeta.summary}</p>
                  </div>

                  <div className="rounded-md border border-amber-200 bg-white p-3">
                    <p className="text-sm font-semibold text-stone-900 mb-2">
                      Full Scripture Text {fullTextLabel ? `(${fullTextLabel})` : ""}
                    </p>
                    {loadingText && <p className="text-sm text-stone-600">Loading text...</p>}
                    {textError && <p className="text-sm text-red-700">{textError}</p>}
                    {!loadingText && !textError && (
                      <div className="max-h-[360px] overflow-y-auto rounded border border-amber-100 bg-amber-50/30 p-3">
                        <p className="whitespace-pre-wrap text-sm leading-7 text-stone-800">{fullText}</p>
                      </div>
                    )}
                  </div>

                  <div className="rounded-md border border-amber-200 bg-white p-3">
                    <p className="text-sm font-semibold text-stone-900 mb-2">Checklist</p>
                    <div className="space-y-2">
                      {currentMeta.checklist.map((item) => (
                        <label key={item} className="flex items-center gap-2 text-sm text-stone-700">
                          <input type="checkbox" className="h-4 w-4 rounded border-amber-300" />
                          {item}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {lentWeeks.map((w) => (
                    <div key={w.id} className="rounded-lg border border-amber-200 bg-white p-3">
                      <p className="text-xs uppercase font-semibold text-orange-700">{w.title}</p>
                      <p className="font-semibold text-stone-900">{w.theme}</p>
                      <div className="mt-2 space-y-2 text-sm">
                        {w.readings.map((r) => {
                          const key = `lent:${w.id}:${r.id}`
                          const done = progress.challengeCompletions.includes(key)
                          return (
                            <button
                              key={r.id}
                              type="button"
                              onClick={() => toggleCompletion(key)}
                              className={`w-full text-left rounded border p-2 ${done ? "bg-green-50 border-green-300" : "border-stone-200"}`}
                            >
                              <p className="text-xs text-stone-500">{r.date}</p>
                              <p>{r.passage}</p>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lessons" className="mt-6 space-y-4">
            <Card className="border border-amber-300/70 bg-white/90">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><GraduationCap className="h-5 w-5 text-orange-600" />Gamified Lessons</CardTitle>
                <CardDescription>Complete lessons and stack XP.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {lessons.map((lesson) => {
                  const done = progress.challengeCompletions.includes(`lesson:${lesson.id}`)
                  return (
                    <button
                      key={lesson.id}
                      type="button"
                      onClick={() => toggleCompletion(`lesson:${lesson.id}`)}
                      className={`w-full rounded-lg border p-3 text-left ${done ? "bg-green-50 border-green-300" : "border-stone-200 bg-white"}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="font-medium text-stone-900">{lesson.title}</p>
                          <p className="text-xs text-stone-500">{lesson.category}</p>
                        </div>
                        <div className="text-xs font-semibold text-orange-700">+{lesson.xp} XP</div>
                      </div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="mt-6 space-y-4">
            <Card className="border border-amber-300/70 bg-white/90">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-orange-600" />Resources</CardTitle>
                <CardDescription>Quick access to core study sections on your site.</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-3">
                <Link href="/teachings" className="rounded-lg border border-amber-200 p-3 hover:bg-amber-50">Teachings</Link>
                <Link href="/catechumen" className="rounded-lg border border-amber-200 p-3 hover:bg-amber-50">Catechumen Corner</Link>
                <Link href="/deacons" className="rounded-lg border border-amber-200 p-3 hover:bg-amber-50">Deacon&apos;s Corner</Link>
                <Link href="/calendar-events" className="rounded-lg border border-amber-200 p-3 hover:bg-amber-50">Calendar + Events</Link>
                <Link href="/repentance" className="rounded-lg border border-amber-200 p-3 hover:bg-amber-50">Repentance</Link>
                <Link href="/holy-communion" className="rounded-lg border border-amber-200 p-3 hover:bg-amber-50">Holy Communion</Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
