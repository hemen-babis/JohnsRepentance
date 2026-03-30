"use client"

import { useMemo } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  ChevronRight,
  Flame,
  HeartHandshake,
  PlayCircle,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react"

import { SaintsOfDay } from "@/components/saints-of-day"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useAuthProgress } from "@/components/providers/auth-progress-provider"
import {
  communityChallenges,
  heartStates,
  pathBuckets,
  studyPlans,
  verseOfTheDay,
  weeklyRecommendations,
} from "@/lib/youth-corner-data"

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

const recommendationIconMap = {
  plan: BookOpen,
  prayer: Sparkles,
  short: PlayCircle,
  challenge: ShieldCheck,
  saint: HeartHandshake,
} as const

const ranks = [
  { title: "Novice", minXp: 0 },
  { title: "Acolyte", minXp: 500 },
  { title: "Pillar", minXp: 1500 },
  { title: "Hermit", minXp: 3000 },
  { title: "Apostle", minXp: 5000 },
  { title: "Abba / Amma", minXp: 8000 },
]

export default function YouthCornerPage() {
  const { progress, saveProgress } = useAuthProgress()

  const savedVerse = progress.youthGoals.includes(verseOfTheDay.id)
  const completedPlans = progress.challengeCompletions.filter((id) => id.startsWith("plan-")).length
  const joinedChallenges = progress.challengeCompletions.filter((id) => id.startsWith("challenge-")).length
  const nextPlan = studyPlans.find((plan) => !progress.challengeCompletions.includes(plan.id)) ?? studyPlans[0]
  const activeChallenge =
    communityChallenges.find((challenge) => !progress.challengeCompletions.includes(challenge.id)) ??
    communityChallenges[0]

  const xp = useMemo(() => {
    const planXp = studyPlans.reduce((sum, plan) => {
      return progress.challengeCompletions.includes(plan.id) ? sum + plan.xpReward : sum
    }, 0)
    const challengeXp = communityChallenges.reduce((sum, challenge) => {
      return progress.challengeCompletions.includes(challenge.id) ? sum + challenge.points : sum
    }, 0)
    return planXp + challengeXp + progress.reflections.length * 10 + progress.prayerNotes.length * 5
  }, [progress.challengeCompletions, progress.prayerNotes.length, progress.reflections.length])

  const streakDays = Math.max(progress.activityDates.length, completedPlans + joinedChallenges + 2)
  const level = Math.max(1, Math.floor(xp / 120) + 1)
  const levelProgress = Math.max(0, Math.min(100, Math.round(((xp % 120) / 120) * 100)))
  const currentRank = ranks.reduce((found, rank) => (xp >= rank.minXp ? rank : found), ranks[0])

  const toggleSavedVerse = () => {
    const nextGoals = savedVerse
      ? progress.youthGoals.filter((goal) => goal !== verseOfTheDay.id)
      : [verseOfTheDay.id, ...progress.youthGoals]
    saveProgress({ ...progress, youthGoals: nextGoals })
  }

  return (
    <div className="min-h-screen bg-[url('/images/mobile-parch.png?v=20260321')] bg-cover bg-center text-stone-900 text-lg leading-relaxed md:bg-[url('/images/parchment-bg.png?v=20260321')] dark:bg-none dark:bg-gradient-to-b dark:from-[#120d09] dark:via-[#24140d] dark:to-[#140d09]">

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-amber-100/50 via-orange-50/30 to-amber-50/20 px-4 py-8 dark:from-[#140d09] dark:via-[#2a1710] dark:to-[#170f0a]">
        <div className="container mx-auto">
          <div className="grid gap-6 xl:grid-cols-[1fr_320px]">

            {/* Verse of the Day */}
            <div className="rounded-2xl border border-amber-200/60 bg-white/85 p-6 shadow-md dark:border-amber-500/20 dark:bg-stone-900/80 dark:text-stone-100">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-orange-600 dark:text-amber-400">{getGreeting()} · Youth Corner</p>
                  <h1 className="mt-1 text-2xl font-bold text-stone-900 dark:text-white">How is your heart today?</h1>
                </div>
                <div className="flex flex-wrap gap-2">
                  {heartStates.map((state) => (
                    <Link
                      key={state.id}
                      href={state.href}
                      className="rounded-full border border-amber-200 bg-amber-50/80 px-3 py-1 text-xs font-semibold text-orange-700 hover:bg-amber-100 dark:border-amber-800/40 dark:bg-stone-800 dark:text-amber-300"
                    >
                      {state.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Quote className="h-3.5 w-3.5 text-orange-400" />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-orange-600 dark:text-amber-400">Verse of the Day</span>
              </div>
              <blockquote className="text-lg font-semibold leading-relaxed text-stone-800 dark:text-stone-100 md:text-xl">
                &ldquo;{verseOfTheDay.text}&rdquo;
              </blockquote>
              <p className="mt-2 text-sm font-semibold text-orange-600 dark:text-amber-400">— {verseOfTheDay.reference}</p>
              <p className="mt-3 rounded-xl border border-amber-100 bg-amber-50/60 px-4 py-3 text-sm leading-6 text-stone-600 dark:border-amber-800/30 dark:bg-stone-800/60 dark:text-stone-300">
                {verseOfTheDay.reflectionLine}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button onClick={toggleSavedVerse} variant="outline" className="rounded-full border-amber-300 text-orange-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-300" size="sm">
                  <Bookmark className={`mr-1.5 h-3.5 w-3.5 ${savedVerse ? "fill-current" : ""}`} />
                  {savedVerse ? "Saved" : "Save verse"}
                </Button>
                <Button asChild variant="outline" className="rounded-full border-amber-300 text-orange-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-300" size="sm">
                  <Link href="/youth-corner/prayer">Reflect now</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-amber-300 text-orange-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-300" size="sm">
                  <Link href="/youth-corner/plans">Resume plan</Link>
                </Button>
              </div>
            </div>

            {/* Right column */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              {/* XP */}
              <div className="rounded-2xl border border-amber-200/60 bg-white/85 p-5 shadow-md dark:border-amber-500/20 dark:bg-stone-900/80 dark:text-stone-100">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold text-stone-900 dark:text-white">Level {level}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
                    <span className="flex items-center gap-1"><Flame className="h-3.5 w-3.5 text-orange-500" />{streakDays}d</span>
                    <span className="font-bold text-orange-600 dark:text-amber-400">{xp} XP</span>
                  </div>
                </div>
                <Progress value={levelProgress} className="mt-3 h-1.5 bg-amber-100 dark:bg-stone-700 [&>div]:bg-gradient-to-r [&>div]:from-amber-400 [&>div]:to-orange-500" />
                <div className="mt-2 flex items-center justify-between text-[11px] text-stone-400 dark:text-stone-500">
                  <span>{currentRank.title}</span>
                  <span>{120 - (xp % 120 || 120)} XP to next</span>
                </div>
              </div>

              {/* Continue Plan */}
              <div className="rounded-2xl border border-amber-200/60 bg-white/85 p-5 shadow-md dark:border-amber-500/20 dark:bg-stone-900/80 dark:text-stone-100">
                <p className="text-xs font-semibold uppercase tracking-widest text-orange-600 dark:text-amber-400">Continue plan</p>
                <p className="mt-1 text-base font-bold text-stone-900 dark:text-white">{nextPlan.title}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-semibold text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">{nextPlan.days.length} days</span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">{nextPlan.xpReward} XP</span>
                </div>
                <Button asChild className="mt-3 w-full rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-sm text-white hover:from-orange-700 hover:to-amber-600" size="sm">
                  <Link href={`/youth-corner/plans/${nextPlan.slug}`}>
                    Enter plan <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>

              {/* Active Challenge */}
              <div className="rounded-2xl border border-amber-200/60 bg-white/85 p-4 shadow-md dark:border-amber-500/20 dark:bg-stone-900/80 sm:col-span-2 xl:col-span-1 dark:text-stone-100">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-xl">{activeChallenge.emoji ?? "🔥"}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-orange-600 dark:text-amber-400">Active challenge</p>
                    <p className="mt-0.5 text-sm font-bold text-stone-900 dark:text-white truncate">{activeChallenge.title}</p>
                    <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">{activeChallenge.durationLabel} · {activeChallenge.points} XP</p>
                  </div>
                  <Link href="/youth-corner/challenges" className="rounded-full bg-amber-100 px-3 py-1.5 text-[11px] font-semibold text-orange-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50">
                    All
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Choose Your Path ───────────────────────────────────── */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">Choose your path</h2>
            <Link href="/youth-corner/plans" className="text-sm font-semibold text-orange-600 dark:text-amber-400">All plans</Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {pathBuckets.map((bucket) => (
              <Link key={bucket.title} href={bucket.href} className="group block">
                  <div className="flex items-center gap-4 rounded-2xl border border-amber-200/60 bg-white/85 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-amber-500/20 dark:bg-stone-900/80 dark:text-stone-100">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${bucket.accent} text-white`}>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-orange-600 dark:text-amber-400">{bucket.kicker}</p>
                    <h3 className="truncate text-sm font-bold text-stone-900 dark:text-white">{bucket.title}</h3>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-stone-400 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── This Week ──────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-amber-50/60 via-orange-50/40 to-amber-50/30 py-10 dark:from-[#170f0a] dark:via-[#341d14] dark:to-[#2a160e]">
        <div className="container mx-auto px-4">
          <h2 className="mb-5 text-xl font-bold text-stone-900 dark:text-white">This week for you</h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {weeklyRecommendations.map((item) => {
              const Icon = recommendationIconMap[item.type]
              return (
                <Link key={item.id} href={item.href} className="group block">
                  <div className="h-full rounded-2xl border border-amber-200/60 bg-white/85 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-amber-500/20 dark:bg-stone-900/80 dark:text-stone-100">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 dark:bg-stone-800">
                      <Icon className="h-4 w-4 text-orange-600 dark:text-amber-400" />
                    </div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-orange-600 dark:text-amber-400">{item.meta}</p>
                    <h3 className="mt-1 text-sm font-bold leading-5 text-stone-900 dark:text-white">{item.title}</h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-stone-600 dark:text-stone-400">{item.description}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Community Challenges ───────────────────────────────── */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">Community challenges</h2>
            <Link href="/youth-corner/challenges" className="text-sm font-semibold text-orange-600 dark:text-amber-400">View all</Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {communityChallenges.slice(0, 4).map((challenge) => {
              const joined = progress.challengeCompletions.includes(challenge.id)
              return (
                <Link key={challenge.id} href="/youth-corner/challenges" className="group block">
                  <div className="h-full rounded-2xl border border-amber-200/60 bg-white/85 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-amber-500/20 dark:bg-stone-900/80 dark:text-stone-100">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xl">{challenge.emoji ?? "✝️"}</span>
                      <div className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 dark:bg-stone-800">
                        <Flame className="h-3 w-3 text-orange-500" />
                        <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400">{(challenge.activeCount ?? challenge.joinedCount).toLocaleString()}</span>
                      </div>
                    </div>
                    <h3 className="mt-2.5 text-sm font-bold leading-5 text-stone-900 dark:text-white">{challenge.title}</h3>
                    <p className="mt-1 text-[11px] font-semibold text-orange-600 dark:text-amber-400">{challenge.durationLabel} · {challenge.points} XP</p>
                    <p className={`mt-2 text-[11px] font-semibold ${joined ? "text-emerald-600 dark:text-emerald-400" : "text-orange-600 dark:text-amber-400"}`}>
                      {joined ? "✓ Joined" : "Join →"}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Saints of Day ──────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-amber-50/60 via-orange-50/40 to-amber-50/30 py-10 dark:from-[#170f0a] dark:via-[#341d14] dark:to-[#2a160e]">
        <div className="container mx-auto px-4">
          <SaintsOfDay />
        </div>
      </section>

      {/* ── Quick Links ────────────────────────────────────────── */}
      <section className="py-10 pb-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-xl font-bold text-stone-900 dark:text-white">Explore more</h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {[
              { href: "/repentance", label: "Repentance Guide", note: "A structured path back" },
              { href: "/holy-communion", label: "Holy Communion", note: "Prepare with reverence" },
              { href: "/fasting-guide", label: "Fasting Guide", note: "The discipline of formation" },
              { href: "/saints", label: "Saints", note: "Your Cloud of Witnesses" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="group block">
                <div className="rounded-2xl border border-amber-200/60 bg-white/85 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-amber-500/20 dark:bg-stone-900/80 dark:text-stone-100">
                  <p className="text-sm font-bold text-stone-900 dark:text-white">{link.label}</p>
                  <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">{link.note}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
