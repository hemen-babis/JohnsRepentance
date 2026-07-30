"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  Flame,
  HeartHandshake,
  MessageCircle,
  Moon,
  Sparkles,
  Star,
  Sunrise,
  Users,
} from "lucide-react"

import { SaintsOfDay } from "@/components/saints-of-day"
import { useAuthProgress } from "@/components/providers/auth-progress-provider"
import { studyPlans } from "@/lib/youth-corner-data"
import { getEthiopianDate } from "@/lib/synaxarium"
import {
  type HabitKey,
  type HabitRecord,
  computeStreak,
  getVerseForDate,
  getVisibleHabits,
  habitScore,
  isFastingDay,
  loadCheckinDates,
  loadTodayHabits,
  saveHabit,
} from "@/lib/youth-daily"

// ─── Greeting ─────────────────────────────────────────────────────────────────

function getGreeting() {
  const h = new Date().getHours()
  if (h < 5) return "The night is holy"
  if (h < 12) return "Good morning"
  if (h < 17) return "Good afternoon"
  return "Good evening"
}

// ─── Feeling states ───────────────────────────────────────────────────────────

const FEELING_STATES = [
  { id: "restless", emoji: "😤", label: "Restless", href: "/youth-corner/real-talk/restless", color: "bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-950/30 dark:border-orange-700/40 dark:text-orange-300" },
  { id: "heavy", emoji: "😔", label: "Heavy-hearted", href: "/youth-corner/real-talk/heavy", color: "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/30 dark:border-indigo-700/40 dark:text-indigo-300" },
  { id: "grateful", emoji: "🙏", label: "Grateful", href: "/youth-corner/plans/psalms-for-hard-days", color: "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-700/40 dark:text-emerald-300" },
  { id: "tempted", emoji: "⚔️", label: "Tempted", href: "/youth-corner/real-talk/tempted", color: "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/30 dark:border-red-700/40 dark:text-red-300" },
  { id: "empty", emoji: "🌫️", label: "Empty", href: "/youth-corner/real-talk/empty", color: "bg-sky-50 border-sky-200 text-sky-700 dark:bg-sky-950/30 dark:border-sky-700/40 dark:text-sky-300" },
  { id: "doubting", emoji: "🤔", label: "Doubting", href: "/youth-corner/real-talk/doubting", color: "bg-violet-50 border-violet-200 text-violet-700 dark:bg-violet-950/30 dark:border-violet-700/40 dark:text-violet-300" },
  { id: "onfire", emoji: "🔥", label: "On fire for God", href: "/youth-corner/guided-prayer/start", color: "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/30 dark:border-amber-700/40 dark:text-amber-300" },
  { id: "ashamed", emoji: "😔", label: "Ashamed", href: "/youth-corner/real-talk/ashamed", color: "bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/30 dark:border-rose-700/40 dark:text-rose-300" },
] as const

// ─── Real Talk cards ──────────────────────────────────────────────────────────

const REAL_TALK_CARDS = [
  {
    id: "tempted",
    icon: "⚔️",
    title: "I keep falling into the same sin",
    subtitle: "The Church calls this passion. It is not who you are.",
    href: "/youth-corner/real-talk/tempted",
    borderColor: "border-l-rose-500",
    bgColor: "bg-rose-50 dark:bg-rose-950/20",
    textColor: "text-rose-700 dark:text-rose-300",
  },
  {
    id: "doubting",
    icon: "🤔",
    title: "I'm losing my faith",
    subtitle: "Doubt is not the opposite of faith.",
    href: "/youth-corner/real-talk/doubting",
    borderColor: "border-l-violet-500",
    bgColor: "bg-violet-50 dark:bg-violet-950/20",
    textColor: "text-violet-700 dark:text-violet-300",
  },
  {
    id: "empty",
    icon: "🌫️",
    title: "I feel like God is far away",
    subtitle: "Feelings are not evidence of God's presence.",
    href: "/youth-corner/real-talk/empty",
    borderColor: "border-l-sky-500",
    bgColor: "bg-sky-50 dark:bg-sky-950/20",
    textColor: "text-sky-700 dark:text-sky-300",
  },
  {
    id: "ashamed",
    icon: "😔",
    title: "I'm ashamed and don't know how to come back",
    subtitle: "Shame lies. God's mercy is not the exception for you.",
    href: "/youth-corner/real-talk/ashamed",
    borderColor: "border-l-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
    textColor: "text-amber-700 dark:text-amber-300",
  },
] as const

// ─── Quick prayers ────────────────────────────────────────────────────────────

const QUICK_PRAYERS = [
  { emoji: "🌅", title: "Before school", duration: "30 sec", slug: "before-school" },
  { emoji: "⚔️", title: "When tempted", duration: "30 sec", slug: "temptation" },
  { emoji: "😤", title: "When angry", duration: "1 min", slug: "angry" },
  { emoji: "🌙", title: "Before fasting", duration: "1 min", slug: "before-fasting" },
  { emoji: "🌑", title: "When alone at night", duration: "2 min", slug: "night" },
] as const

// ─── Explore grid ─────────────────────────────────────────────────────────────

const EXPLORE_GRID = [
  { emoji: "✝️", title: "Repentance", subtitle: "Confession & renewal", href: "/repentance", color: "from-rose-700 to-red-900" },
  { emoji: "🍷", title: "Holy Communion", subtitle: "Preparing for the Chalice", href: "/holy-communion", color: "from-violet-700 to-indigo-900" },
  { emoji: "🌙", title: "Fasting Guide", subtitle: "Wed, Fri & the great fasts", href: "/fasting-guide", color: "from-sky-700 to-blue-900" },
  { emoji: "✨", title: "Saints", subtitle: "The cloud of witnesses", href: "/saints", color: "from-amber-600 to-orange-800" },
] as const

// ─── Habit icons ──────────────────────────────────────────────────────────────

const HABIT_ICONS: Record<HabitKey, { icon: React.ReactNode; color: string }> = {
  "morning-prayer": { icon: <Sunrise className="h-5 w-5" />, color: "text-amber-500" },
  scripture: { icon: <BookOpen className="h-5 w-5" />, color: "text-blue-500" },
  fasting: { icon: <Moon className="h-5 w-5" />, color: "text-violet-500" },
  "evening-prayer": { icon: <Star className="h-5 w-5" />, color: "text-orange-500" },
  kindness: { icon: <HeartHandshake className="h-5 w-5" />, color: "text-rose-500" },
}

// ─── Plan accent gradients ────────────────────────────────────────────────────

const PLAN_GRADIENTS = [
  "from-orange-600 via-amber-500 to-yellow-400",
  "from-violet-700 via-purple-600 to-indigo-500",
  "from-teal-700 via-emerald-600 to-green-500",
  "from-rose-700 via-red-600 to-orange-500",
  "from-sky-700 via-blue-600 to-indigo-500",
  "from-amber-700 via-yellow-600 to-lime-500",
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function YouthCornerPage() {
  const { progress } = useAuthProgress()
  const [habits, setHabits] = useState<HabitRecord>({})
  const [streak, setStreak] = useState(0)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHabits(loadTodayHabits())
    setStreak(computeStreak(loadCheckinDates()))
    setHydrated(true)
  }, [])

  const today = new Date()
  const verse = getVerseForDate(today)
  const ethiopianDate = getEthiopianDate(today)
  const visibleHabits = useMemo(() => getVisibleHabits(today), [])
  const todayScore = habitScore(habits, visibleHabits)
  const todayTotal = visibleHabits.length
  const allDone = todayScore === todayTotal
  const isFasting = isFastingDay(today)

  const nextPlan = studyPlans.find((p) => !progress.challengeCompletions.includes(p.id)) ?? studyPlans[0]

  function toggleHabit(key: HabitKey) {
    const next = !habits[key]
    setHabits((h) => ({ ...h, [key]: next }))
    saveHabit(key, next)
    if (next) setStreak(computeStreak(loadCheckinDates()))
  }

  return (
    <div className="min-h-screen bg-transparent text-stone-900 dark:text-white">

      {/* ══ 1. DARK HERO ══════════════════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #1c0700 0%, #3d1205 40%, #0a1e12 85%, #081812 100%)" }}
      >
        {/* Cross pattern overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_48px] opacity-[0.06]" />
        {/* Radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 20% 0%, rgba(220,100,20,0.2), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(15,118,110,0.15), transparent 50%)" }}
        />

        <div className="relative px-5 pb-10 pt-8">
          {/* Top bar: Ethiopian date + streak */}
          <div className="flex items-start justify-between gap-3 mb-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-amber-400/70">
                {ethiopianDate.month} {ethiopianDate.day}
              </p>
              <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.32em] text-white/50">{getGreeting()}</p>
              <p className="mt-0.5 text-[15px] font-bold text-white/90">Youth Corner</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.08] px-3.5 py-2.5 backdrop-blur-sm">
              <Flame className="h-5 w-5 text-orange-400" />
              <div className="text-right">
                <p className="text-lg font-black leading-none text-white">{hydrated ? streak : 0}</p>
                <p className="text-[10px] text-white/50 mt-0.5">day streak</p>
              </div>
            </div>
          </div>

          {/* Fasting pill */}
          {isFasting && (
            <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5">
              <span className="text-xs">⚡</span>
              <span className="text-xs font-semibold text-amber-300">Fasting day — Wednesday / Friday</span>
            </div>
          )}

          {/* Verse section divider */}
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-amber-400/60">Verse of the Day</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Big verse */}
          <div className="mb-7">
            <div className="text-[72px] leading-none font-black text-amber-400/20 select-none -mb-4 -ml-1">&ldquo;</div>
            <blockquote className="text-2xl font-black leading-[1.5] text-white">
              {verse.text}
            </blockquote>
            <p className="mt-4 text-sm font-bold text-amber-400">— {verse.reference}</p>
            <p className="mt-3 text-sm leading-[1.7] text-white/55">{verse.reflectionLine}</p>
          </div>

          {/* CTAs */}
          <div className="flex gap-3">
            <Link
              href="/youth-corner/guided-prayer/start"
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#c86224] to-[#e2a13c] py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_-10px_rgba(200,98,36,0.5)] hover:brightness-105 transition"
            >
              <Sparkles className="h-4 w-4" />
              Pray with this →
            </Link>
            <Link
              href="/youth-corner/quick-prayer"
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm hover:bg-white/[0.12] transition"
            >
              5-min Prayer
            </Link>
          </div>
        </div>
      </div>

      {/* ══ 2. TODAY'S ANCHOR ════════════════════════════════════════════════ */}
      <div className="px-5 pt-6 pb-2">
        <div className="overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-white shadow-[0_8px_32px_-12px_rgba(0,0,0,0.08)] dark:border-stone-800 dark:bg-stone-900">

          {/* Header */}
          <div className="px-5 pt-5 pb-4 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500">
                  <Star className="h-4 w-4 text-white fill-white" />
                </div>
                <p className="text-sm font-bold text-stone-900 dark:text-white">Today&apos;s 3 Things</p>
              </div>
              <div className="flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 dark:border-amber-700/30 dark:bg-amber-950/20 px-3 py-1">
                <span className="text-sm font-black text-amber-700 dark:text-amber-300">{hydrated ? todayScore : 0}</span>
                <span className="text-sm text-stone-400 dark:text-stone-500">/{todayTotal}</span>
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-4 h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500 ease-out"
                style={{ width: hydrated ? `${(todayScore / todayTotal) * 100}%` : "0%" }}
              />
            </div>
          </div>

          {/* Habit rows */}
          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {visibleHabits.slice(0, 3).map((habit) => {
              const done = hydrated && Boolean(habits[habit.key])
              const { icon, color } = HABIT_ICONS[habit.key]
              return (
                <button
                  key={habit.key}
                  type="button"
                  onClick={() => toggleHabit(habit.key)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left transition active:bg-stone-50 dark:active:bg-stone-800/50"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${done ? "bg-emerald-50 text-emerald-500 dark:bg-emerald-950/30" : `bg-stone-50 dark:bg-stone-800 ${color}`}`}>
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold leading-5 transition ${done ? "line-through text-stone-400 dark:text-stone-500" : "text-stone-800 dark:text-stone-200"}`}>
                      {habit.label}
                    </p>
                    <p className="mt-0.5 text-xs text-stone-400 dark:text-stone-500 truncate">{habit.sub}</p>
                  </div>
                  {done
                    ? <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-500" />
                    : <Circle className="h-6 w-6 shrink-0 text-stone-200 dark:text-stone-700" />}
                </button>
              )
            })}
          </div>

          {/* Footer */}
          {hydrated && (
            <div className="px-5 pb-5 pt-4 border-t border-stone-100 dark:border-stone-800">
              {allDone ? (
                <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 px-4 py-3">
                  <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                    All done ✓ {streak > 0 && `— ${streak}-day streak`}
                  </p>
                  <p className="mt-0.5 text-xs text-emerald-700/70 dark:text-emerald-400/70">
                    You gave God the rhythm of your day. That is not small.
                  </p>
                </div>
              ) : (
                <Link
                  href="/youth-corner/guided-prayer/start"
                  className="flex items-center justify-between rounded-xl border border-amber-200/60 bg-amber-50/60 dark:border-amber-700/30 dark:bg-amber-950/20 px-4 py-3 transition hover:border-amber-300"
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="h-4 w-4 text-orange-500 dark:text-amber-400 shrink-0" />
                    <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">Pray with today&apos;s scripture</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-orange-500 dark:text-amber-400 shrink-0" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ══ 3. HOW ARE YOU FEELING ═══════════════════════════════════════════ */}
      <div className="px-5 pt-6 pb-2">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">
          How are you feeling right now?
        </p>
        <div className="-mx-5 overflow-x-auto px-5 pb-1">
          <div className="flex gap-2.5 w-max">
            {FEELING_STATES.map((state) => (
              <Link
                key={state.id}
                href={state.href}
                className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition hover:brightness-95 active:scale-95 ${state.color}`}
              >
                <span className="text-base">{state.emoji}</span>
                {state.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 4. REAL TALK ════════════════════════════════════════════════════ */}
      <div className="px-5 pt-6 pb-2">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">Real Talk</p>
        <div className="grid grid-cols-2 gap-3">
          {REAL_TALK_CARDS.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className={`block rounded-2xl border-l-4 p-4 ${card.borderColor} ${card.bgColor} transition hover:brightness-95 active:scale-[0.98]`}
            >
              <div className="text-2xl mb-2">{card.icon}</div>
              <p className={`text-sm font-bold leading-snug ${card.textColor}`}>{card.title}</p>
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 leading-snug">{card.subtitle}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* ══ 5. SAINTS OF THE DAY ════════════════════════════════════════════ */}
      <div className="mt-8 bg-gradient-to-b from-[#fdf6eb] to-[#f7f3ee] dark:from-[#140a04] dark:to-[#0c0905]">
        <div className="px-5 pt-6 pb-2">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">Daily Synaxarium</p>
        </div>
        <div className="px-4 pb-8">
          <SaintsOfDay />
        </div>
      </div>

      {/* ══ 6. CONTINUE YOUR PLAN ═══════════════════════════════════════════ */}
      <div className="px-5 pt-6 pb-2">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">Continue Reading</p>
          <Link href="/youth-corner/plans" className="text-xs font-bold text-orange-600 dark:text-amber-400">See all</Link>
        </div>
        <Link href={`/youth-corner/plans/${nextPlan.slug}`} className="group block">
          <div className="overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-white shadow-[0_8px_32px_-12px_rgba(0,0,0,0.08)] dark:border-stone-800 dark:bg-stone-900 transition hover:shadow-[0_16px_40px_-14px_rgba(0,0,0,0.14)]">
            <div className={`h-28 bg-gradient-to-r ${nextPlan.accent} relative overflow-hidden flex items-end px-5 pb-4`}>
              <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_36px] opacity-[0.08]" />
              <div className="relative">
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-white/60">{nextPlan.category}</p>
                <h3 className="mt-0.5 text-lg font-black text-white leading-tight">{nextPlan.title}</h3>
              </div>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">{nextPlan.subtitle}</p>
                <p className="mt-0.5 text-xs text-stone-400 dark:text-stone-500">{nextPlan.estimatedMinutesPerDay} min/day · {nextPlan.days.length} days</p>
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-sm group-hover:scale-105 transition">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* ══ 7. QUICK PRAYERS ════════════════════════════════════════════════ */}
      <div className="px-5 pt-6 pb-2">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">Quick Prayers</p>
        <div className="-mx-5 overflow-x-auto px-5 pb-2">
          <div className="flex gap-3 w-max">
            {QUICK_PRAYERS.map((p) => (
              <Link
                key={p.slug}
                href={`/youth-corner/quick-prayer#${p.slug}`}
                className="flex w-[160px] shrink-0 flex-col gap-2 rounded-2xl border border-stone-200/80 bg-white p-4 dark:border-stone-800 dark:bg-stone-900 hover:shadow-md transition"
              >
                <span className="text-2xl">{p.emoji}</span>
                <p className="text-sm font-bold text-stone-800 dark:text-stone-200 leading-tight">{p.title}</p>
                <span className="inline-flex w-fit items-center rounded-full bg-amber-50 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-700/30 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                  {p.duration}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 8. STUDY PLANS CAROUSEL ═════════════════════════════════════════ */}
      <div className="px-5 pt-6 pb-2">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">Study Plans</p>
          <Link href="/youth-corner/plans" className="text-xs font-bold text-orange-600 dark:text-amber-400">See all</Link>
        </div>
        <div className="-mx-5 overflow-x-auto px-5 pb-3">
          <div className="flex gap-3 w-max">
            {studyPlans.map((plan, i) => (
              <Link
                key={plan.id}
                href={`/youth-corner/plans/${plan.slug}`}
                className="block w-[240px] shrink-0 overflow-hidden rounded-2xl border border-stone-200/80 bg-white dark:border-stone-800 dark:bg-stone-900 hover:shadow-md transition"
              >
                <div className={`h-20 bg-gradient-to-r ${PLAN_GRADIENTS[i % PLAN_GRADIENTS.length]} relative overflow-hidden`}>
                  <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_32px] opacity-[0.08]" />
                  <div className="absolute inset-0 flex items-end px-4 pb-3">
                    <p className="text-sm font-black text-white leading-tight line-clamp-2">{plan.title}</p>
                  </div>
                </div>
                <div className="px-4 py-3">
                  <p className="text-xs text-stone-500 dark:text-stone-400">{plan.estimatedMinutesPerDay} min/day · {plan.days.length} days</p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {plan.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded-full bg-stone-100 dark:bg-stone-800 px-2 py-0.5 text-[10px] font-semibold text-stone-600 dark:text-stone-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 9. ASK A QUESTION ════════════════════════════════════════════════ */}
      <div className="px-5 pt-6 pb-2">
        <div className="overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-white dark:border-stone-800 dark:bg-stone-900 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#c86224] to-[#e2a13c]">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-black text-stone-900 dark:text-white">Have a question about the faith?</h3>
              <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                Real questions, real answers — from a community rooted in the Ethiopian Orthodox Tewahedo tradition.
              </p>
              <button
                type="button"
                onClick={() => window.open("https://t.me/johnsrepentance", "_blank")}
                className="mt-4 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#c86224] to-[#e2a13c] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:brightness-105 transition"
              >
                <Users className="h-4 w-4" />
                Ask on Telegram →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ══ 10. EXPLORE ═════════════════════════════════════════════════════ */}
      <div className="px-5 pt-6 pb-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">Explore</p>
        <div className="grid grid-cols-2 gap-3">
          {EXPLORE_GRID.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.color} p-5 transition hover:brightness-105 active:scale-[0.98]`}
            >
              <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_36px] opacity-[0.07]" />
              <div className="relative">
                <div className="text-2xl mb-2">{item.emoji}</div>
                <p className="text-sm font-black text-white leading-tight">{item.title}</p>
                <p className="mt-0.5 text-xs text-white/60">{item.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
