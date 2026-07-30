import Link from "next/link"
import { ArrowRight, BookMarked, Clock, Heart } from "lucide-react"
import { studyPlans } from "@/lib/youth-corner-data"

const serif = "'Iowan Old Style', 'Palatino Linotype', Georgia, serif"

const CATEGORY_GRADIENTS: Record<string, string> = {
  prayer:     "from-orange-600 via-amber-500 to-yellow-400",
  repentance: "from-violet-700 via-purple-600 to-indigo-500",
  scripture:  "from-teal-700 via-emerald-600 to-green-500",
  fasting:    "from-rose-700 via-red-600 to-orange-500",
  identity:   "from-sky-700 via-blue-600 to-indigo-500",
  struggle:   "from-amber-700 via-yellow-600 to-lime-500",
}

const LEVEL_STYLES = {
  beginner:     { label: "Beginner",     bg: "bg-emerald-100 dark:bg-emerald-950/40", text: "text-emerald-700 dark:text-emerald-400" },
  intermediate: { label: "Intermediate", bg: "bg-amber-100 dark:bg-amber-950/40",     text: "text-amber-700 dark:text-amber-400" },
  deep:         { label: "Deep",         bg: "bg-red-100 dark:bg-red-950/40",          text: "text-red-700 dark:text-red-400" },
}

export default function YouthCornerPlansPage() {
  return (
    <div className="min-h-screen text-stone-900 dark:text-white">

      {/* Header */}
      <div
        className="relative overflow-hidden px-5 pt-10 pb-10"
        style={{ background: "linear-gradient(160deg, #1c0700 0%, #3d1205 50%, #0a1e12 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_48px] opacity-[0.06]" />
        <div className="relative max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-amber-400/70 mb-3">Youth Corner</p>
          <h1 className="text-4xl font-black text-white leading-tight">
            Bible Study Plans
          </h1>
          <p className="mt-3 text-sm leading-7 text-white/55 max-w-md">
            Long-form devotional curricula for the serious seeker. Each plan is a structured journey — not a quick read, but a formation.
          </p>
        </div>
      </div>

      {/* Plans grid */}
      <div className="px-5 py-8 max-w-5xl mx-auto">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {studyPlans.map((plan) => {
            const gradient = CATEGORY_GRADIENTS[plan.category] ?? "from-stone-600 to-stone-500"
            const level = LEVEL_STYLES[plan.level] ?? LEVEL_STYLES.beginner
            return (
              <Link key={plan.id} href={`/youth-corner/plans/${plan.slug}`} className="group block">
                <div className="overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-white shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)] dark:border-stone-800 dark:bg-stone-900 transition hover:-translate-y-1 hover:shadow-[0_20px_48px_-16px_rgba(0,0,0,0.18)]">

                  {/* Gradient cover */}
                  <div className={`h-36 bg-gradient-to-br ${gradient} relative overflow-hidden flex flex-col justify-end px-5 pb-4`}>
                    <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_40px] opacity-[0.07]" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="relative">
                      {plan.amharicLabel && (
                        <p className="text-[10px] font-bold text-white/50 mb-1">{plan.amharicLabel}</p>
                      )}
                      <h2 className="text-lg font-black text-white leading-tight line-clamp-2">
                        {plan.title}
                      </h2>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <p className="text-xs font-semibold leading-5 text-stone-500 dark:text-stone-400 line-clamp-2 mb-4">
                      {plan.description}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${level.bg} ${level.text}`}>
                        {level.label}
                      </span>
                      <span className="flex items-center gap-1 rounded-full bg-stone-100 dark:bg-stone-800 px-2.5 py-1 text-[10px] font-bold text-stone-600 dark:text-stone-400">
                        <BookMarked className="h-2.5 w-2.5" />
                        {plan.days.length} days
                      </span>
                      <span className="flex items-center gap-1 rounded-full bg-stone-100 dark:bg-stone-800 px-2.5 py-1 text-[10px] font-bold text-stone-600 dark:text-stone-400">
                        <Clock className="h-2.5 w-2.5" />
                        {plan.estimatedMinutesPerDay} min
                      </span>
                      <span className="flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-950/40 px-2.5 py-1 text-[10px] font-bold text-amber-700 dark:text-amber-400">
                        <Heart className="h-2.5 w-2.5" />
                        {plan.xpReward} XP
                      </span>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-800">
                      <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 capitalize">{plan.category}</p>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-amber-400 group-hover:gap-2.5 transition-all">
                        Enter plan <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
