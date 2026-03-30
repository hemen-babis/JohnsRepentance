import Link from "next/link"
import { BookMarked, BookOpen, Cross, FlameKindling, HeartHandshake, HeartPulse, Music2, ScrollText, ShieldPlus, Sword, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { studyPlans } from "@/lib/youth-corner-data"

const titleSerif = "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif"

function categoryIcon(category: string) {
  switch (category) {
    case "prayer": return <HeartPulse className="h-6 w-6" />
    case "repentance": return <ShieldPlus className="h-6 w-6" />
    case "struggle": return <Sword className="h-6 w-6" />
    case "scripture": return <ScrollText className="h-6 w-6" />
    case "fasting": return <FlameKindling className="h-6 w-6" />
    case "identity": return <User className="h-6 w-6" />
    default: return <BookOpen className="h-6 w-6" />
  }
}

const progressMap: Record<number, number> = { 0: 55, 1: 30, 2: 20, 3: 15, 4: 10, 5: 8 }

export default function YouthCornerPlansPage() {
  return (
    <div className="light-mode-adaptive-page youth-corner-root min-h-screen bg-[url('/images/mobile-parch.png?v=20260321')] bg-[length:auto_100%] bg-top bg-repeat-x text-stone-900 md:bg-[url('/images/parchment-bg.png?v=20260321')] md:bg-[length:auto_1400px] md:bg-top md:bg-repeat dark:bg-none dark:bg-gradient-to-b dark:from-[#120d09] dark:via-[#24140d] dark:to-[#140d09]">
      <section className="container mx-auto px-4 py-10 md:py-16">

        {/* Page Header */}
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a6461f]">Youth Corner</p>
          <h1
            className="mt-3 text-4xl font-black tracking-tight text-[#3d2206] dark:text-[#f3e4cd] md:text-5xl"
            style={{ fontFamily: titleSerif }}
          >
            Bible Study Plans
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600 dark:text-stone-400">
            Long-form devotional curricula for the serious seeker. Each plan is a structured journey — not a quick read, but a formation.
          </p>
          <div className="mt-5 h-px w-48 bg-gradient-to-r from-[#a6461f] via-[#d4a84f] to-transparent" />
        </div>

        {/* Plans Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {studyPlans.map((plan, index) => {
            const cardProgress = progressMap[index] ?? 10
            return (
              <div
                key={plan.id}
                className="group relative overflow-hidden rounded-[2rem] border border-[#d8c395] bg-[linear-gradient(180deg,#fffcf5_0%,#fff8ec_60%,#fdf3e0_100%)] shadow-[0_18px_50px_-30px_rgba(120,53,15,0.22)] transition-shadow hover:shadow-[0_28px_60px_-28px_rgba(120,53,15,0.32)] dark:border-[#3d2a14] dark:bg-[linear-gradient(180deg,#1e1208_0%,#180e07_100%)]"
              >
                {/* Accent top bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${plan.accent}`} />

                {/* Cross pattern overlay */}
                <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_44px] opacity-[0.035]" />

                <div className="relative p-6">
                  {/* Icon + Category row */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] border border-[#e8d5a8] bg-[radial-gradient(circle_at_top,#fff8ea,#f5e8cf)] text-[#7c2d12] shadow-[0_8px_20px_-14px_rgba(120,53,15,0.3)] dark:border-[#3d2a14] dark:bg-[#2a1608] dark:text-amber-400">
                      {categoryIcon(plan.category)}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#a6461f] dark:text-amber-500">{plan.category}</p>
                      {plan.amharicLabel ? (
                        <p className="mt-0.5 text-sm font-semibold text-[#7c2d12] dark:text-amber-300">{plan.amharicLabel}</p>
                      ) : null}
                    </div>
                  </div>

                  {/* Title */}
                  <h2
                    className="mt-4 text-xl font-black leading-tight text-[#3d2206] dark:text-[#f3e4cd]"
                    style={{ fontFamily: titleSerif }}
                  >
                    {plan.title}
                  </h2>

                  {/* Subtitle */}
                  <p className="mt-1.5 text-sm font-semibold text-[#8b6a2b] dark:text-amber-400/80">{plan.subtitle}</p>

                  {/* Divider */}
                  <div className="my-4 h-px bg-gradient-to-r from-[#e5d0a0] to-transparent dark:from-[#3d2a14]" />

                  {/* Description */}
                  <p className="text-sm leading-6 text-stone-600 dark:text-stone-400">{plan.description}</p>

                  {/* Stats */}
                  <div className="mt-4 flex items-center justify-between text-xs font-semibold text-stone-500 dark:text-stone-400">
                    <span className="rounded-full bg-[#f5ead2] px-2.5 py-1 text-[#7c2d12] dark:bg-[#2a1608] dark:text-amber-400">
                      {plan.days.length} days
                    </span>
                    <span>{plan.estimatedMinutesPerDay} min / day</span>
                    <span className="text-[#8b6a2b] dark:text-amber-500/70">{plan.xpReward} ❤</span>
                  </div>

                  {/* Progress */}
                  <div className="mt-3">
                    <div className="mb-1.5 flex justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">
                      <span>Progress</span>
                      <span>{cardProgress}%</span>
                    </div>
                    <Progress value={cardProgress} className="h-1.5 bg-[#efe4cd] dark:bg-[#2a1608] [&>div]:bg-gradient-to-r [&>div]:from-[#0f766e] [&>div]:to-[#d4a84f]" />
                  </div>

                  {/* CTA */}
                  <Button
                    asChild
                    className="mt-5 w-full rounded-full bg-gradient-to-r from-[#c86224] to-[#e2a13c] text-sm font-bold text-white shadow-[0_14px_30px_-18px_rgba(200,98,36,0.55)] hover:brightness-105"
                  >
                    <Link href={`/youth-corner/plans/${plan.slug}`}>
                      <BookMarked className="mr-2 h-4 w-4" />
                      Enter Plan
                    </Link>
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
