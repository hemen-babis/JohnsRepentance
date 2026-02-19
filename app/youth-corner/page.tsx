"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { GeezHeading } from "@/components/geez-heading"
import { useAuthProgress } from "@/components/providers/auth-progress-provider"
import {
  BookOpen,
  Calendar,
  Flame,
  Gamepad2,
  Gift,
  Medal,
  MessageSquare,
  Play,
  Sparkles,
  Star,
  Trophy,
  Users,
  Video,
  Zap,
} from "lucide-react"

type Quest = {
  id: string
  title: string
  subtitle: string
  xp: number
  type: "Prayer" | "Scripture" | "Service" | "Learning"
}

type LentWeek = {
  id: string
  title: string
  theme: string
  readings: Array<{
    id: string
    date: string
    passage: string
  }>
}

const quests: Quest[] = [
  {
    id: "q-prayer-1",
    title: "Morning + Evening Prayer",
    subtitle: "Complete both prayers for 7 days.",
    xp: 120,
    type: "Prayer",
  },
  {
    id: "q-scripture-1",
    title: "Read John 15",
    subtitle: "Write one takeaway in your notes.",
    xp: 80,
    type: "Scripture",
  },
  {
    id: "q-service-1",
    title: "Quiet Service",
    subtitle: "Help one person without announcing it.",
    xp: 90,
    type: "Service",
  },
  {
    id: "q-learning-1",
    title: "Lesson Sprint",
    subtitle: "Watch two short Orthodox lessons today.",
    xp: 75,
    type: "Learning",
  },
]

const lentWeeks: LentWeek[] = [
  {
    id: "lent-w1",
    title: "Week 1",
    theme: "The Word Revealed",
    readings: [
      { id: "lent-w1-d1", date: "February 16", passage: "John 1:1 - 18" },
      { id: "lent-w1-d2", date: "February 17", passage: "John 1:19 - 51" },
      { id: "lent-w1-d3", date: "February 18", passage: "John 2" },
      { id: "lent-w1-d4", date: "February 19", passage: "John 3" },
      { id: "lent-w1-d5", date: "February 20", passage: "John 4:1 - 42" },
    ],
  },
  {
    id: "lent-w2",
    title: "Week 2",
    theme: "Living Water & Healed",
    readings: [
      { id: "lent-w2-d1", date: "February 23", passage: "John 4:43 - 54" },
      { id: "lent-w2-d2", date: "February 24", passage: "John 5" },
      { id: "lent-w2-d3", date: "February 25", passage: "John 6:1 - 21" },
      { id: "lent-w2-d4", date: "February 26", passage: "John 6:22 - 59" },
      { id: "lent-w2-d5", date: "February 27", passage: "John 6:60 - 71" },
    ],
  },
  {
    id: "lent-w3",
    title: "Week 3",
    theme: "Light in the World",
    readings: [
      { id: "lent-w3-d1", date: "March 2", passage: "John 7" },
      { id: "lent-w3-d2", date: "March 3", passage: "John 8:1 - 30" },
      { id: "lent-w3-d3", date: "March 4", passage: "John 8:31 - 59" },
      { id: "lent-w3-d4", date: "March 5", passage: "John 9" },
      { id: "lent-w3-d5", date: "March 6", passage: "John 10:1 - 21" },
    ],
  },
  {
    id: "lent-w4",
    title: "Week 4",
    theme: "Identity & Resurrection Power",
    readings: [
      { id: "lent-w4-d1", date: "March 9", passage: "John 10:22 - 42" },
      { id: "lent-w4-d2", date: "March 10", passage: "John 11:1 - 27" },
      { id: "lent-w4-d3", date: "March 11", passage: "John 11:28 - 57" },
      { id: "lent-w4-d4", date: "March 12", passage: "John 12:1 - 26" },
      { id: "lent-w4-d5", date: "March 13", passage: "John 12:27 - 50" },
    ],
  },
  {
    id: "lent-w5",
    title: "Week 5",
    theme: "The Upper Room",
    readings: [
      { id: "lent-w5-d1", date: "March 16", passage: "John 13" },
      { id: "lent-w5-d2", date: "March 17", passage: "John 14" },
      { id: "lent-w5-d3", date: "March 18", passage: "John 15" },
      { id: "lent-w5-d4", date: "March 19", passage: "John 16" },
      { id: "lent-w5-d5", date: "March 20", passage: "John 17" },
    ],
  },
  {
    id: "lent-w6",
    title: "Week 6",
    theme: "Passion of Christ",
    readings: [
      { id: "lent-w6-d1", date: "March 23", passage: "John 18:1 - 27" },
      { id: "lent-w6-d2", date: "March 24", passage: "John 18:28 - 40" },
      { id: "lent-w6-d3", date: "March 25", passage: "John 19:1 - 27" },
      { id: "lent-w6-d4", date: "March 26", passage: "John 19:28 - 42" },
      { id: "lent-w6-d5", date: "March 27", passage: "John 20:1 - 18" },
    ],
  },
  {
    id: "lent-w7",
    title: "Week 7",
    theme: "Resurrection & Restoration",
    readings: [
      { id: "lent-w7-d1", date: "March 30", passage: "John 20:19 - 31" },
      { id: "lent-w7-d2", date: "March 31", passage: "John 21:1 - 14" },
      { id: "lent-w7-d3", date: "April 1", passage: "John 21:15 - 25" },
      { id: "lent-w7-d4", date: "April 2", passage: "Re-read John 15 or 17" },
      { id: "lent-w7-d5", date: "April 3", passage: "Prayer & Journaling" },
    ],
  },
]

const lessons = [
  {
    id: "l1",
    title: "Why Do We Fast?",
    duration: "5 min",
    level: "Starter",
    topic: "Fasting",
    href: "https://www.tiktok.com/@orthodoxqnas",
  },
  {
    id: "l2",
    title: "The Meaning of the Cross",
    duration: "6 min",
    level: "Starter",
    topic: "Theology",
    href: "https://www.tiktok.com/@orthodoxqnas",
  },
  {
    id: "l3",
    title: "Saints in 60 Seconds",
    duration: "3 min",
    level: "Quick",
    topic: "Saints",
    href: "https://www.tiktok.com/@orthodoxqnas",
  },
  {
    id: "l4",
    title: "How to Confess Well",
    duration: "9 min",
    level: "Growth",
    topic: "Repentance",
    href: "https://www.tiktok.com/@orthodoxqnas",
  },
]

const weeklyEvents = [
  {
    id: "e1",
    title: "Catechumen Class (Open to All)",
    time: "Fridays • 6:00 PM - 8:00 PM",
    host: "MT Dn. Kidus Adugna",
  },
  {
    id: "e2",
    title: "Learning About Service (Deacons Encouraged)",
    time: "Wednesdays • 3:00 PM - 4:00 PM",
    host: "MT Dn. Kidus Adugna",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
}

export default function YouthCornerPage() {
  const { progress, toggleChallenge, addPrayerNote, addMentorHistory } = useAuthProgress()
  const [mentorQuestion, setMentorQuestion] = useState("")
  const [prayerInput, setPrayerInput] = useState("")
  const [search, setSearch] = useState("")

  const completedQuestIds = progress.challengeCompletions

  const totalXp = useMemo(() => {
    return quests.reduce((sum, q) => (completedQuestIds.includes(q.id) ? sum + q.xp : sum), 0)
  }, [completedQuestIds])

  const level = Math.max(1, Math.floor(totalXp / 250) + 1)
  const xpIntoLevel = totalXp % 250
  const levelProgress = Math.min(100, Math.round((xpIntoLevel / 250) * 100))

  const filteredLessons = useMemo(() => {
    if (!search.trim()) return lessons
    const key = search.toLowerCase()
    return lessons.filter((l) => l.title.toLowerCase().includes(key) || l.topic.toLowerCase().includes(key))
  }, [search])

  const lentTotal = useMemo(
    () => lentWeeks.reduce((sum, week) => sum + week.readings.length, 0),
    [],
  )
  const lentDone = useMemo(
    () =>
      lentWeeks.reduce(
        (sum, week) => sum + week.readings.filter((reading) => completedQuestIds.includes(reading.id)).length,
        0,
      ),
    [completedQuestIds],
  )
  const lentProgress = lentTotal ? Math.round((lentDone / lentTotal) * 100) : 0

  const submitMentorQuestion = () => {
    const message = (mentorQuestion || "Hi want to recommend a recipie and ask for youth spiritual guidance...").trim()
    const url = `https://t.me/YohannesNeseha?text=${encodeURIComponent(message)}`
    window.open(url, "_blank", "noopener,noreferrer")
    addMentorHistory(message)
    setMentorQuestion("")
  }

  const submitPrayer = () => {
    if (!prayerInput.trim()) return
    addPrayerNote(prayerInput.trim())
    setPrayerInput("")
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff8e8,transparent_55%),linear-gradient(to_bottom,#fffdf8,#fff6ea)] dark:bg-[radial-gradient(circle_at_top,#2a1a10,transparent_50%),linear-gradient(to_bottom,#0f0b08,#16100b)]">
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.07]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center max-w-4xl mx-auto">
            <GeezHeading className="mb-3 text-orange-700 dark:text-amber-400">ወጣቶች</GeezHeading>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-amber-50">
              Youth Corner Experience
            </h1>
            <p className="mt-4 text-lg text-stone-700 dark:text-stone-300">
              Learn, level up, and stay rooted in Orthodox life with guided lessons, weekly quests, and community support.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <Tabs defaultValue="dashboard" className="max-w-6xl mx-auto">
          <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto bg-white/70 dark:bg-stone-900/70 border border-orange-200/60 dark:border-orange-900/40 backdrop-blur">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="quests">Quests</TabsTrigger>
            <TabsTrigger value="connect">Connect</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-8 space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-orange-100 dark:border-orange-900/40 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-stone-900 dark:text-stone-100">
                    <Gamepad2 className="h-5 w-5 text-orange-600" />
                    Your Spiritual Progress
                  </CardTitle>
                  <CardDescription>Gamified journey with XP, levels, and streaks.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-5">
                    <div className="rounded-xl border border-orange-200 dark:border-orange-900/40 p-4 bg-orange-50/70 dark:bg-orange-950/20">
                      <p className="text-xs uppercase tracking-wide text-stone-500">Level</p>
                      <p className="text-3xl font-bold text-stone-900 dark:text-stone-100">{level}</p>
                    </div>
                    <div className="rounded-xl border border-orange-200 dark:border-orange-900/40 p-4 bg-orange-50/70 dark:bg-orange-950/20">
                      <p className="text-xs uppercase tracking-wide text-stone-500">Total XP</p>
                      <p className="text-3xl font-bold text-stone-900 dark:text-stone-100">{totalXp}</p>
                    </div>
                    <div className="rounded-xl border border-orange-200 dark:border-orange-900/40 p-4 bg-orange-50/70 dark:bg-orange-950/20">
                      <p className="text-xs uppercase tracking-wide text-stone-500">Weekly Streak</p>
                      <p className="text-3xl font-bold text-stone-900 dark:text-stone-100">{completedQuestIds.length} days</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2 text-stone-700 dark:text-stone-300">
                      <span>Progress to Level {level + 1}</span>
                      <span>{xpIntoLevel}/250 XP</span>
                    </div>
                    <Progress value={levelProgress} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-100 dark:border-orange-900/40 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-stone-900 dark:text-stone-100">
                    <Gift className="h-5 w-5 text-orange-600" />
                    Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-lg p-3 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950/40 dark:to-orange-950/30">
                    <p className="font-semibold text-sm">Bronze Beacon</p>
                    <p className="text-xs text-stone-600 dark:text-stone-300">Reach 300 XP</p>
                  </div>
                  <div className="rounded-lg p-3 bg-gradient-to-r from-stone-100 to-zinc-100 dark:from-stone-800 dark:to-zinc-800/70">
                    <p className="font-semibold text-sm">Silver Witness</p>
                    <p className="text-xs text-stone-600 dark:text-stone-300">Reach 700 XP</p>
                  </div>
                  <div className="rounded-lg p-3 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30">
                    <p className="font-semibold text-sm">Gold Servant</p>
                    <p className="text-xs text-stone-600 dark:text-stone-300">Reach 1200 XP</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-orange-100 dark:border-orange-900/40 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5 text-orange-600" />Weekly Classes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {weeklyEvents.map((event) => (
                    <div key={event.id} className="rounded-xl border border-stone-200 dark:border-stone-800 p-4">
                      <p className="font-semibold text-stone-900 dark:text-stone-100">{event.title}</p>
                      <p className="text-sm text-stone-600 dark:text-stone-300">{event.time}</p>
                      <p className="text-xs text-orange-700 dark:text-orange-400 mt-1">{event.host}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-orange-100 dark:border-orange-900/40 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-orange-600" />Today&apos;s Focus</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-xl p-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white">
                    <p className="text-xs uppercase tracking-wide">Daily Mission</p>
                    <p className="text-lg font-semibold">Practice inner silence for 10 minutes before prayer.</p>
                  </div>
                  <div className="rounded-xl border border-stone-200 dark:border-stone-800 p-4">
                    <p className="text-sm text-stone-700 dark:text-stone-300">Open the fasting guide and choose one meal to cook with your family this week.</p>
                    <Button asChild className="mt-3" variant="outline">
                      <Link href="/fasting-guide">Open Fasting Guide</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="lessons" className="mt-8 space-y-6">
            <Card className="border-orange-100 dark:border-orange-900/40 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-orange-600" />Lesson Library</CardTitle>
                <CardDescription>Search topics and jump directly to short-form Orthodox lessons.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 mb-5">
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search lesson title or topic (fasting, saints, theology...)"
                  />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredLessons.map((lesson) => (
                    <a
                      key={lesson.id}
                      href={lesson.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:shadow-lg transition"
                    >
                      <div className="aspect-video bg-gradient-to-br from-orange-600 to-amber-500 flex items-center justify-center">
                        <Play className="h-10 w-10 text-white group-hover:scale-110 transition" />
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{lesson.topic}</Badge>
                          <span className="text-xs text-stone-500">{lesson.duration}</span>
                        </div>
                        <p className="font-semibold text-stone-900 dark:text-stone-100">{lesson.title}</p>
                        <p className="text-xs text-stone-500">{lesson.level}</p>
                      </div>
                    </a>
                  ))}
                </div>
                {filteredLessons.length === 0 && <p className="text-sm text-stone-500">No lessons found for that search.</p>}
                <div className="mt-6">
                  <Button asChild className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600">
                    <a href="https://www.tiktok.com/@orthodoxqnas" target="_blank" rel="noreferrer">View All on @orthodoxqnas</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quests" className="mt-8 space-y-6">
            <Card className="border-orange-100 dark:border-orange-900/40 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-orange-600" />Weekly Quests</CardTitle>
                <CardDescription>Tap to complete quests and earn XP instantly.</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                {quests.map((quest) => {
                  const done = completedQuestIds.includes(quest.id)
                  return (
                    <button
                      key={quest.id}
                      type="button"
                      onClick={() => toggleChallenge(quest.id)}
                      className={`text-left rounded-xl border p-4 transition ${
                        done
                          ? "border-green-300 bg-green-50 dark:bg-green-950/20 dark:border-green-900/50"
                          : "border-stone-200 bg-white dark:bg-stone-900 dark:border-stone-800 hover:border-orange-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge>{quest.type}</Badge>
                        <span className="text-sm font-semibold text-orange-600">+{quest.xp} XP</span>
                      </div>
                      <p className="font-semibold text-stone-900 dark:text-stone-100">{quest.title}</p>
                      <p className="text-sm text-stone-600 dark:text-stone-300 mt-1">{quest.subtitle}</p>
                      <p className="text-xs mt-3 text-stone-500">{done ? "Completed" : "Tap to mark complete"}</p>
                    </button>
                  )
                })}
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="border-orange-100 dark:border-orange-900/40 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5 text-orange-600" />Top Youth This Week</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {["Selam T. - 980 XP", "Dawit M. - 890 XP", "Hanna G. - 830 XP"].map((line) => (
                    <div key={line} className="rounded-lg bg-stone-100 dark:bg-stone-800/60 p-2">{line}</div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-orange-100 dark:border-orange-900/40 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Medal className="h-5 w-5 text-orange-600" />Challenge Badges</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {["Prayer Keeper", "Scripture Builder", "Service Heart"].map((badge) => (
                    <div key={badge} className="rounded-lg border border-stone-200 dark:border-stone-800 p-2">{badge}</div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-orange-100 dark:border-orange-900/40 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Flame className="h-5 w-5 text-orange-600" />Streak Goal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-stone-700 dark:text-stone-300">Complete at least 3 quests this week to maintain your fire streak.</p>
                  <Progress value={(completedQuestIds.length / 3) * 100} className="mt-3" />
                </CardContent>
              </Card>
            </div>

            <Card className="border-orange-100 dark:border-orange-900/40 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-orange-600" />
                  Great Lent Scripture Challenge
                </CardTitle>
                <CardDescription>
                  Daily Gospel readings for Week 1 to Week 7. Tap each day after completion.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-5 rounded-xl border border-orange-200 dark:border-orange-900/40 p-4 bg-orange-50/70 dark:bg-orange-950/20">
                  <div className="flex items-center justify-between text-sm mb-2 text-stone-700 dark:text-stone-300">
                    <span>Challenge Progress</span>
                    <span>
                      {lentDone}/{lentTotal} days
                    </span>
                  </div>
                  <Progress value={lentProgress} className="h-3" />
                </div>

                <div className="grid lg:grid-cols-2 gap-4">
                  {lentWeeks.map((week) => (
                    <div
                      key={week.id}
                      className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4"
                    >
                      <p className="text-xs uppercase tracking-wide text-orange-600 font-semibold">{week.title}</p>
                      <p className="text-lg font-bold text-stone-900 dark:text-stone-100">{week.theme}</p>
                      <div className="mt-3 space-y-2">
                        {week.readings.map((reading) => {
                          const done = completedQuestIds.includes(reading.id)
                          return (
                            <button
                              key={reading.id}
                              type="button"
                              onClick={() => toggleChallenge(reading.id)}
                              className={`w-full text-left rounded-lg border p-2.5 transition ${
                                done
                                  ? "border-green-300 bg-green-50 dark:bg-green-950/20 dark:border-green-900/50"
                                  : "border-stone-200 dark:border-stone-700 hover:border-orange-300"
                              }`}
                            >
                              <p className="text-xs text-stone-500">{reading.date}</p>
                              <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{reading.passage}</p>
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

          <TabsContent value="connect" className="mt-8 space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-orange-100 dark:border-orange-900/40 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-orange-600" />Ask a Mentor</CardTitle>
                  <CardDescription>Private support for faith, school, family, and spiritual struggles.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea
                    value={mentorQuestion}
                    onChange={(e) => setMentorQuestion(e.target.value)}
                    placeholder="Write your private question..."
                  />
                  <Button onClick={submitMentorQuestion}>Send Private Question</Button>
                  {progress.mentorHistory.length > 0 && (
                    <div className="rounded-lg border border-stone-200 dark:border-stone-800 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 mb-2">Recent</p>
                      <div className="space-y-2 max-h-28 overflow-auto">
                        {progress.mentorHistory.slice(0, 3).map((entry, i) => (
                          <p key={`${entry.createdAt}-${i}`} className="text-xs text-stone-600 dark:text-stone-300">{entry.text}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-orange-100 dark:border-orange-900/40 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-orange-600" />Prayer Circle</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    value={prayerInput}
                    onChange={(e) => setPrayerInput(e.target.value)}
                    placeholder="Share a prayer intention..."
                  />
                  <Button variant="outline" onClick={submitPrayer}>Submit Intention</Button>
                  <div className="space-y-2 max-h-40 overflow-auto">
                    {progress.prayerNotes.map((note, i) => (
                      <div key={`${note}-${i}`} className="rounded-lg bg-amber-50 dark:bg-amber-950/20 p-2 text-sm">
                        {note}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-orange-100 dark:border-orange-900/40 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Video className="h-5 w-5 text-orange-600" />Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button asChild variant="outline"><Link href="/calendar-events">Calendar + Events</Link></Button>
                <Button asChild variant="outline"><Link href="/fasting-recipes">Fasting Recipes</Link></Button>
                <Button asChild variant="outline"><a href="https://www.tiktok.com/@orthodoxqnas" target="_blank" rel="noreferrer">TikTok Lessons</a></Button>
                <Button asChild variant="outline"><Link href="/qa">Orthodox Q&A</Link></Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
