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
  CheckCircle2,
  Flag,
  Flame,
  Gamepad2,
  Gift,
  HandHeart,
  HeartHandshake,
  Lock,
  MessageSquare,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Video,
  Zap,
} from "lucide-react"

type LentWeek = {
  id: string
  title: string
  theme: string
  readings: Array<{ id: string; date: string; passage: string }>
}

const dailyQuests = [
  { id: "prayer", title: "Morning + Evening Prayer", xp: 30 },
  { id: "scripture", title: "Read today\'s Gospel passage", xp: 30 },
  { id: "service", title: "Serve one person silently", xp: 40 },
]

const weeklyQuests = [
  { id: "fasting", title: "Complete 5 fasting days faithfully", xp: 120 },
  { id: "reflection", title: "Write 3 spiritual reflections", xp: 90 },
  { id: "community", title: "Join one youth class and one Q&A", xp: 100 },
]

const volunteerMissions = [
  "Help set up class space",
  "Welcome a new youth attendee",
  "Share one meal with someone in need",
]

const youthGroups = ["Faith & School", "Prayer Accountability", "Orthodox Q&A", "Service Team"]

const learningTrack = [
  "Week 1: Foundations of Prayer",
  "Week 2: Why We Fast",
  "Week 3: The Cross and Repentance",
  "Week 4: Liturgy and Communion",
  "Week 5: Scripture Deep Dive",
  "Week 6: Saints and Spiritual Warfare",
  "Week 7: Confession and Healing",
  "Week 8: Mission and Leadership",
]

const shortLessons = [
  { id: "l1", title: "Why Do We Fast?", topic: "Fasting", duration: "5 min" },
  { id: "l2", title: "The Meaning of the Cross", topic: "Theology", duration: "6 min" },
  { id: "l3", title: "Saints in 60 Seconds", topic: "Saints", duration: "3 min" },
  { id: "l4", title: "How to Confess Well", topic: "Repentance", duration: "9 min" },
]

const saintStories = [
  { title: "St. Mary of Egypt", prompt: "What does radical repentance look like today?" },
  { title: "St. Tekle Haimanot", prompt: "How can discipline shape your spiritual life?" },
  { title: "St. Yared", prompt: "How can worship become your daily language?" },
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

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

function getTodayKey() {
  return new Date().toISOString().slice(0, 10)
}

function getWeekKey(d = new Date()) {
  const dt = new Date(d)
  const day = (dt.getDay() + 6) % 7
  dt.setDate(dt.getDate() - day)
  return dt.toISOString().slice(0, 10)
}

function getSeasonSignal(dateKey: string) {
  if (dateKey >= "2026-02-16" && dateKey <= "2026-04-10") return "Great Lent"
  if (dateKey >= "2026-04-12" && dateKey <= "2026-06-01") return "Fifty Holy Days"
  if (dateKey >= "2026-06-01" && dateKey <= "2026-07-11") return "Apostles Fast"
  return "Ordinary Season"
}

function calcStreak(days: string[]) {
  if (days.length === 0) return 0
  const set = new Set(days)
  let streak = 0
  const cursor = new Date()
  while (true) {
    const key = cursor.toISOString().slice(0, 10)
    if (!set.has(key)) break
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export default function YouthCornerPage() {
  const { progress, saveProgress, toggleChallenge, addPrayerNote, addMentorHistory } = useAuthProgress()
  const [mentorQuestion, setMentorQuestion] = useState("")
  const [prayerInput, setPrayerInput] = useState("")
  const [goalInput, setGoalInput] = useState("")
  const [reflectionInput, setReflectionInput] = useState("")
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null)

  const todayKey = getTodayKey()
  const weekKey = getWeekKey()

  const updateProgress = (partial: Partial<typeof progress>) => {
    saveProgress({ ...progress, ...partial })
  }

  const recordActivity = () => {
    if (progress.activityDates.includes(todayKey)) return
    updateProgress({ activityDates: [todayKey, ...progress.activityDates] })
  }

  const dailyQuestId = (id: string) => `dq:${todayKey}:${id}`
  const weeklyQuestId = (id: string) => `wq:${weekKey}:${id}`

  const toggleDailyQuest = (id: string) => {
    const key = dailyQuestId(id)
    const done = progress.challengeCompletions.includes(key)
    const nextCompletions = done
      ? progress.challengeCompletions.filter((x) => x !== key)
      : [...progress.challengeCompletions, key]

    let nextDailyLog = progress.dailyQuestLog
    const allDone = dailyQuests.every((q) => nextCompletions.includes(dailyQuestId(q.id)))
    if (allDone && !nextDailyLog.includes(todayKey)) {
      nextDailyLog = [todayKey, ...nextDailyLog]
    }
    if (!allDone && nextDailyLog.includes(todayKey)) {
      nextDailyLog = nextDailyLog.filter((d) => d !== todayKey)
    }

    saveProgress({ ...progress, challengeCompletions: nextCompletions, dailyQuestLog: nextDailyLog })
    recordActivity()
  }

  const toggleWeeklyQuest = (id: string) => {
    toggleChallenge(weeklyQuestId(id))
    recordActivity()
  }

  const toggleMission = (mission: string) => {
    toggleChallenge(`mission:${todayKey}:${mission}`)
    recordActivity()
  }

  const toggleLessonWatch = (lessonId: string) => {
    toggleChallenge(`watch:${lessonId}`)
    recordActivity()
  }

  const toggleGroup = (group: string) => {
    const next = progress.joinedGroups.includes(group)
      ? progress.joinedGroups.filter((g) => g !== group)
      : [...progress.joinedGroups, group]
    updateProgress({ joinedGroups: next })
    recordActivity()
  }

  const addServiceHour = () => {
    updateProgress({ serviceHours: progress.serviceHours + 1 })
    recordActivity()
  }

  const completeTrackCheckpoint = () => {
    const next = Math.min(8, (progress.learningWeek || 1) + 1)
    updateProgress({ learningWeek: next })
    toggleChallenge(`track-week-${next}`)
    recordActivity()
  }

  const submitMentorQuestion = () => {
    const message = (mentorQuestion || "Hi, I need private youth mentoring guidance.").trim()
    window.open(`https://t.me/YohannesNeseha?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer")
    addMentorHistory(message)
    setMentorQuestion("")
    recordActivity()
  }

  const submitPrayer = () => {
    if (!prayerInput.trim()) return
    addPrayerNote(prayerInput.trim())
    setPrayerInput("")
    recordActivity()
  }

  const addGoal = () => {
    const text = goalInput.trim()
    if (!text) return
    updateProgress({ youthGoals: [text, ...progress.youthGoals].slice(0, 10) })
    setGoalInput("")
    recordActivity()
  }

  const addReflection = () => {
    const text = reflectionInput.trim()
    if (!text) return
    updateProgress({
      reflections: [{ id: `${Date.now()}`, text, createdAt: new Date().toISOString() }, ...progress.reflections].slice(0, 20),
    })
    setReflectionInput("")
    recordActivity()
  }

  const reportIssue = () => {
    updateProgress({ safetyReportsCount: progress.safetyReportsCount + 1 })
    window.open("https://t.me/YohannesNeseha?text=Hi%20I%20need%20to%20report%20a%20safety%20or%20moderation%20issue.", "_blank", "noopener,noreferrer")
  }

  const completeQuiz = (answer: string) => {
    setQuizAnswer(answer)
    if (answer === "B" && !progress.quizCompletions.includes(todayKey)) {
      updateProgress({ quizCompletions: [todayKey, ...progress.quizCompletions] })
      toggleChallenge(`quiz:${todayKey}`)
      recordActivity()
    }
  }

  const lentTotal = useMemo(() => lentWeeks.reduce((sum, week) => sum + week.readings.length, 0), [])
  const lentDone = useMemo(
    () => lentWeeks.reduce((sum, week) => sum + week.readings.filter((r) => progress.challengeCompletions.includes(r.id)).length, 0),
    [progress.challengeCompletions],
  )
  const lentProgress = lentTotal ? Math.round((lentDone / lentTotal) * 100) : 0

  const todayDailyDone = dailyQuests.filter((q) => progress.challengeCompletions.includes(dailyQuestId(q.id))).length
  const weekQuestDone = weeklyQuests.filter((q) => progress.challengeCompletions.includes(weeklyQuestId(q.id))).length
  const streak = calcStreak(progress.dailyQuestLog)

  const baseXp = progress.challengeCompletions.reduce((sum, id) => {
    if (id.startsWith("dq:")) return sum + 30
    if (id.startsWith("wq:")) return sum + 80
    if (id.startsWith("mission:")) return sum + 40
    if (id.startsWith("lent-")) return sum + 15
    if (id.startsWith("watch:")) return sum + 10
    if (id.startsWith("track-week-")) return sum + 60
    if (id.startsWith("quiz:")) return sum + 25
    return sum + 20
  }, 0)

  const totalXp = baseXp + progress.serviceHours * 10
  const level = Math.max(1, Math.floor(totalXp / 300) + 1)
  const levelProgress = Math.round(((totalXp % 300) / 300) * 100)

  const activeLast7 = progress.activityDates.filter((d) => {
    const diff = Math.floor((new Date(todayKey).getTime() - new Date(d).getTime()) / 86400000)
    return diff >= 0 && diff < 7
  }).length
  const retention7 = Math.round((activeLast7 / 7) * 100)
  const dau = progress.activityDates.includes(todayKey) ? 1 : 0

  const season = getSeasonSignal(todayKey)
  const personalizedMessage =
    season === "Great Lent"
      ? "Focus on Scripture + repentance today."
      : season === "Fifty Holy Days"
        ? "No fasting now. Build joy, thanksgiving, and service rhythm."
        : season === "Apostles Fast"
          ? "Keep Wednesday/Friday discipline and mission-focused service."
          : "Set one goal, one prayer, and one act of mercy today."

  const rewardTier = totalXp >= 1200 ? "Gold Servant" : totalXp >= 700 ? "Silver Witness" : totalXp >= 300 ? "Bronze Beacon" : "Pilgrim"

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff8e8,transparent_56%),linear-gradient(to_bottom,#fffdf8,#fff5e8)] dark:bg-[radial-gradient(circle_at_top,#2a1a10,transparent_50%),linear-gradient(to_bottom,#0f0b08,#16100b)]">
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.07]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center max-w-5xl mx-auto">
            <GeezHeading className="mb-3 text-orange-700 dark:text-amber-400">ወጣቶች</GeezHeading>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-stone-900 dark:text-amber-50">Youth Corner</h1>
            <p className="mt-4 text-lg text-stone-700 dark:text-stone-300">Daily habit engine, guided track, and safe Orthodox youth community.</p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <Tabs defaultValue="dashboard" className="max-w-7xl mx-auto">
          <TabsList className="grid grid-cols-5 w-full max-w-4xl mx-auto bg-white/70 dark:bg-stone-900/70 border border-orange-200/60 dark:border-orange-900/40 backdrop-blur">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="track">8-Week Track</TabsTrigger>
            <TabsTrigger value="quests">Quests</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-8 space-y-6">
            <div className="grid lg:grid-cols-4 gap-4">
              {[
                { label: "Level", value: `${level}` },
                { label: "Total XP", value: `${totalXp}` },
                { label: "Streak", value: `${streak} days` },
                { label: "Service Hours", value: `${progress.serviceHours}` },
              ].map((item) => (
                <Card key={item.label} className="border-orange-100 dark:border-orange-900/40 shadow-lg">
                  <CardContent className="p-4">
                    <p className="text-xs uppercase tracking-wide text-stone-500">{item.label}</p>
                    <p className="text-3xl font-black text-stone-900 dark:text-stone-100 mt-1">{item.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-orange-100 dark:border-orange-900/40 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Gamepad2 className="h-5 w-5 text-orange-600" />Daily Habit Engine</CardTitle>
                  <CardDescription>Daily quests reset by date, weekly quests reset every Monday.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2 text-stone-700 dark:text-stone-300">
                      <span>Progress to Level {level + 1}</span>
                      <span>{totalXp % 300}/300 XP</span>
                    </div>
                    <Progress value={levelProgress} className="h-3" />
                  </div>

                  <div className="grid md:grid-cols-3 gap-3">
                    {dailyQuests.map((q) => {
                      const done = progress.challengeCompletions.includes(dailyQuestId(q.id))
                      return (
                        <button
                          key={q.id}
                          onClick={() => toggleDailyQuest(q.id)}
                          className={`rounded-xl border p-4 text-left transition ${done ? "border-green-300 bg-green-50 dark:bg-green-950/20" : "border-stone-200 dark:border-stone-800 hover:border-orange-300"}`}
                        >
                          <p className="text-xs text-stone-500">Daily Quest</p>
                          <p className="font-semibold text-stone-900 dark:text-stone-100">{q.title}</p>
                          <p className="text-xs mt-1 text-orange-700">+{q.xp} XP</p>
                        </button>
                      )
                    })}
                  </div>

                  <div className="rounded-xl border border-stone-200 dark:border-stone-800 p-3">
                    <p className="text-sm text-stone-700 dark:text-stone-300">Today: {todayDailyDone}/3 daily quests complete.</p>
                    <p className="text-xs text-stone-500">Weekly reset key: {weekKey}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-100 dark:border-orange-900/40 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-orange-600" />Today For You</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Badge>{season}</Badge>
                  <p className="text-sm text-stone-700 dark:text-stone-300">{personalizedMessage}</p>
                  <div className="rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white p-3">
                    <p className="text-xs uppercase">Reward Tier</p>
                    <p className="text-xl font-bold">{rewardTier}</p>
                  </div>
                  <Button onClick={addServiceHour} variant="outline" className="w-full">
                    <HandHeart className="h-4 w-4 mr-2" />Log 1 Service Hour
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="border-orange-100 dark:border-orange-900/40 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-orange-600" />Ship Fast with Metrics</CardTitle>
                <CardDescription>Simple engagement metrics to improve weekly based on data.</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-5 gap-3">
                <div className="rounded-lg border p-3"><p className="text-xs text-stone-500">DAU</p><p className="text-2xl font-bold">{dau}</p></div>
                <div className="rounded-lg border p-3"><p className="text-xs text-stone-500">Active Days (7d)</p><p className="text-2xl font-bold">{activeLast7}</p></div>
                <div className="rounded-lg border p-3"><p className="text-xs text-stone-500">7d Retention</p><p className="text-2xl font-bold">{retention7}%</p></div>
                <div className="rounded-lg border p-3"><p className="text-xs text-stone-500">Quest Completion</p><p className="text-2xl font-bold">{Math.round((todayDailyDone / 3) * 100)}%</p></div>
                <div className="rounded-lg border p-3"><p className="text-xs text-stone-500">Lesson Watchthrough</p><p className="text-2xl font-bold">{progress.challengeCompletions.filter((id) => id.startsWith("watch:")).length}</p></div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="track" className="mt-8 space-y-6">
            <Card className="border-orange-100 dark:border-orange-900/40 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-orange-600" />Guided 8-Week Learning Path</CardTitle>
                <CardDescription>Complete checkpoints to unlock the next week.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {learningTrack.map((item, idx) => {
                  const week = idx + 1
                  const unlocked = week <= (progress.learningWeek || 1)
                  const completed = week < (progress.learningWeek || 1)
                  return (
                    <div key={item} className={`rounded-xl border p-3 ${unlocked ? "bg-white dark:bg-stone-900" : "bg-stone-100/70 dark:bg-stone-900/40"}`}>
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-stone-900 dark:text-stone-100">{item}</p>
                        {completed ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : unlocked ? <Badge>Unlocked</Badge> : <Lock className="h-4 w-4 text-stone-500" />}
                      </div>
                    </div>
                  )
                })}
                <Button onClick={completeTrackCheckpoint} disabled={(progress.learningWeek || 1) >= 8}>
                  Complete Current Week Checkpoint
                </Button>
              </CardContent>
            </Card>

            <Card className="border-orange-100 dark:border-orange-900/40 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Star className="h-5 w-5 text-orange-600" />Great Lent Scripture Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 rounded-xl border p-3">
                  <div className="flex justify-between text-sm"><span>Completed</span><span>{lentDone}/{lentTotal}</span></div>
                  <Progress value={lentProgress} className="mt-2" />
                </div>
                <div className="grid lg:grid-cols-2 gap-4">
                  {lentWeeks.map((week) => (
                    <div key={week.id} className="rounded-xl border p-4 bg-white dark:bg-stone-900">
                      <p className="text-xs uppercase text-orange-700 font-semibold">{week.title}</p>
                      <p className="font-bold text-lg mb-2">{week.theme}</p>
                      <div className="space-y-2">
                        {week.readings.map((r) => {
                          const done = progress.challengeCompletions.includes(r.id)
                          return (
                            <button key={r.id} onClick={() => { toggleChallenge(r.id); recordActivity() }} className={`w-full text-left rounded-lg border p-2 ${done ? "bg-green-50 border-green-300" : "hover:border-orange-300"}`}>
                              <p className="text-xs text-stone-500">{r.date}</p>
                              <p className="text-sm font-medium">{r.passage}</p>
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

          <TabsContent value="quests" className="mt-8 space-y-6">
            <Card className="border-orange-100 dark:border-orange-900/40 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-orange-600" />Weekly Quests + Real-World Action</CardTitle>
                <CardDescription>Parish challenge board with service-oriented missions.</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  {weeklyQuests.map((q) => {
                    const done = progress.challengeCompletions.includes(weeklyQuestId(q.id))
                    return (
                      <button key={q.id} onClick={() => toggleWeeklyQuest(q.id)} className={`w-full rounded-xl border p-3 text-left ${done ? "bg-green-50 border-green-300" : "hover:border-orange-300"}`}>
                        <p className="font-semibold">{q.title}</p>
                        <p className="text-xs text-orange-700">+{q.xp} XP</p>
                      </button>
                    )
                  })}
                  <p className="text-sm text-stone-600">Weekly completed: {weekQuestDone}/{weeklyQuests.length}</p>
                </div>

                <div className="space-y-3">
                  {volunteerMissions.map((mission) => {
                    const id = `mission:${todayKey}:${mission}`
                    const done = progress.challengeCompletions.includes(id)
                    return (
                      <button key={mission} onClick={() => toggleMission(mission)} className={`w-full rounded-xl border p-3 text-left ${done ? "bg-green-50 border-green-300" : "hover:border-orange-300"}`}>
                        <p className="font-semibold">{mission}</p>
                        <p className="text-xs text-stone-500">Serve someone today</p>
                      </button>
                    )
                  })}
                  <Button asChild variant="outline"><Link href="/calendar-events"><Calendar className="h-4 w-4 mr-2" />Open Parish Events</Link></Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-100 dark:border-orange-900/40 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Flag className="h-5 w-5 text-orange-600" />Saved Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input value={goalInput} onChange={(e) => setGoalInput(e.target.value)} placeholder="Add a spiritual goal..." />
                  <Button onClick={addGoal}>Add</Button>
                </div>
                <div className="space-y-2">
                  {progress.youthGoals.map((g, i) => (
                    <div key={`${g}-${i}`} className="rounded-lg border p-2 text-sm">{g}</div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="mt-8 space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-orange-100 dark:border-orange-900/40 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Video className="h-5 w-5 text-orange-600" />Short-Form Lessons</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {shortLessons.map((lesson) => {
                    const watched = progress.challengeCompletions.includes(`watch:${lesson.id}`)
                    return (
                      <div key={lesson.id} className="rounded-xl border p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{lesson.title}</p>
                            <p className="text-xs text-stone-500">{lesson.topic} • {lesson.duration}</p>
                          </div>
                          <Button size="sm" variant={watched ? "secondary" : "outline"} onClick={() => toggleLessonWatch(lesson.id)}>
                            <Play className="h-4 w-4 mr-1" />{watched ? "Watched" : "Mark Watched"}
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                  <Button asChild><a href="https://www.tiktok.com/@orthodoxqnas" target="_blank" rel="noreferrer">Open @orthodoxqnas</a></Button>
                </CardContent>
              </Card>

              <Card className="border-orange-100 dark:border-orange-900/40 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-orange-600" />Quiz + Reflection + Saint Stories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-xl border p-3">
                    <p className="font-semibold">Quiz: Why do we fast?</p>
                    <p className="text-sm text-stone-600 mb-2">A) To impress people B) To train the soul and repent C) To skip meals only</p>
                    <div className="flex gap-2 flex-wrap">
                      <Button size="sm" variant="outline" onClick={() => completeQuiz("A")}>A</Button>
                      <Button size="sm" variant="outline" onClick={() => completeQuiz("B")}>B</Button>
                      <Button size="sm" variant="outline" onClick={() => completeQuiz("C")}>C</Button>
                    </div>
                    {quizAnswer && <p className="text-xs mt-2 text-stone-600">{quizAnswer === "B" ? "Correct. Great work." : "Try again: think repentance and spiritual discipline."}</p>}
                  </div>

                  <div className="rounded-xl border p-3">
                    <p className="font-semibold mb-2">Reflection Prompt</p>
                    <Textarea value={reflectionInput} onChange={(e) => setReflectionInput(e.target.value)} placeholder="What did God teach you today?" />
                    <Button className="mt-2" size="sm" onClick={addReflection}>Save Reflection</Button>
                  </div>

                  <div className="space-y-2">
                    {saintStories.map((s) => (
                      <div key={s.title} className="rounded-lg border p-2">
                        <p className="font-medium">{s.title}</p>
                        <p className="text-xs text-stone-500">{s.prompt}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="community" className="mt-8 space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-orange-100 dark:border-orange-900/40 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-orange-600" />Safe Social Energy</CardTitle>
                  <CardDescription>Small groups, mentor support, prayer circles, and moderated Q&A.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {youthGroups.map((group) => {
                    const joined = progress.joinedGroups.includes(group)
                    return (
                      <button key={group} onClick={() => toggleGroup(group)} className={`w-full rounded-xl border p-3 text-left ${joined ? "bg-green-50 border-green-300" : "hover:border-orange-300"}`}>
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">{group}</p>
                          <Badge variant="secondary">Moderated</Badge>
                        </div>
                      </button>
                    )
                  })}
                  <Button asChild variant="outline"><Link href="/qa"><MessageSquare className="h-4 w-4 mr-2" />Open Moderated Q&A</Link></Button>
                </CardContent>
              </Card>

              <Card className="border-orange-100 dark:border-orange-900/40 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><HeartHandshake className="h-5 w-5 text-orange-600" />Mentor + Prayer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea value={mentorQuestion} onChange={(e) => setMentorQuestion(e.target.value)} placeholder="Ask privately about faith, school, family, or spiritual struggles..." />
                  <Button onClick={submitMentorQuestion}>Send Private Question</Button>
                  <Input value={prayerInput} onChange={(e) => setPrayerInput(e.target.value)} placeholder="Share a prayer intention..." />
                  <Button variant="outline" onClick={submitPrayer}>Submit Prayer Intention</Button>
                </CardContent>
              </Card>
            </div>

            <Card className="border-orange-100 dark:border-orange-900/40 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-orange-600" />Trust & Safety</CardTitle>
                <CardDescription>Age-safe defaults, moderation rules, private mentor flow, and reporting.</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl border p-3">
                  <p className="font-semibold">Community Rules</p>
                  <ul className="text-sm text-stone-600 mt-2 list-disc list-inside space-y-1">
                    <li>Respect every person.</li>
                    <li>No bullying, no harassment, no explicit content.</li>
                    <li>Faith questions are welcome; mockery is not.</li>
                    <li>Mentor chats are private and moderated.</li>
                  </ul>
                </div>
                <div className="rounded-xl border p-3">
                  <p className="font-semibold">Report Tool</p>
                  <p className="text-sm text-stone-600 mt-1">If you feel unsafe, report immediately.</p>
                  <Button className="mt-2" variant="destructive" onClick={reportIssue}>Report Safety Issue</Button>
                  <p className="text-xs text-stone-500 mt-2">Reports submitted: {progress.safetyReportsCount}</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline"><Link href="/calendar-events"><Calendar className="h-4 w-4 mr-2" />Calendar + Events</Link></Button>
              <Button asChild variant="outline"><Link href="/fasting-recipes"><Gift className="h-4 w-4 mr-2" />Fasting Recipes</Link></Button>
              <Button asChild variant="outline"><a href="https://www.tiktok.com/@orthodoxqnas" target="_blank" rel="noreferrer"><Video className="h-4 w-4 mr-2" />TikTok Lessons</a></Button>
              <Button asChild variant="outline"><Link href="/deacons"><Trophy className="h-4 w-4 mr-2" />Deacon Resources</Link></Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
