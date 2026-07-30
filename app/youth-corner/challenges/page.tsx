"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Crown, Flame, Shield, Star, Trophy, Zap } from "lucide-react"
import { useAuthProgress } from "@/components/providers/auth-progress-provider"
import { communityChallenges } from "@/lib/youth-corner-data"

const serif = "'Iowan Old Style', 'Palatino Linotype', Georgia, serif"

const DIFFICULTY = {
  beginner:     { label: "Beginner",     dot: "bg-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-400" },
  intermediate: { label: "Intermediate", dot: "bg-amber-500",   bg: "bg-amber-50 dark:bg-amber-950/30",    text: "text-amber-700 dark:text-amber-400" },
  expert:       { label: "Expert",       dot: "bg-red-500",     bg: "bg-red-50 dark:bg-red-950/30",        text: "text-red-700 dark:text-red-400" },
}

const RANKS = [
  { title: "Novice",      range: "0 – 500 XP",    desc: "The struggle begins.",              icon: Shield,  color: "text-stone-500 dark:text-stone-400",     iconBg: "bg-stone-100 dark:bg-stone-800" },
  { title: "Acolyte",     range: "500 – 1,500 XP", desc: "You have guarded the gate.",       icon: Star,    color: "text-emerald-600 dark:text-emerald-400",  iconBg: "bg-emerald-50 dark:bg-emerald-950/40" },
  { title: "Pillar",      range: "1,500 – 3,000 XP", desc: "You are steadfast.",             icon: Zap,     color: "text-amber-600 dark:text-amber-400",      iconBg: "bg-amber-50 dark:bg-amber-950/40" },
  { title: "Hermit",      range: "3,000 – 5,000 XP", desc: "You have mastered the silence.", icon: Flame,   color: "text-orange-600 dark:text-orange-400",    iconBg: "bg-orange-50 dark:bg-orange-950/40" },
  { title: "Apostle",     range: "5,000+ XP",     desc: "You lead others.",                  icon: Crown,   color: "text-violet-600 dark:text-violet-400",    iconBg: "bg-violet-50 dark:bg-violet-950/40" },
  { title: "Abba / Amma", range: "Final Mastery",  desc: "Your heart is a Sanctuary.",       icon: Trophy,  color: "text-amber-600 dark:text-amber-300",      iconBg: "bg-amber-50 dark:bg-amber-950/40" },
]

export default function YouthCornerChallengesPage() {
  const { progress, saveProgress } = useAuthProgress()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  function toggleJoin(id: string) {
    const exists = progress.challengeCompletions.includes(id)
    saveProgress({ ...progress, challengeCompletions: exists ? progress.challengeCompletions.filter(i => i !== id) : [...progress.challengeCompletions, id] })
  }

  const totalXP = communityChallenges.reduce((s, c) => progress.challengeCompletions.includes(c.id) ? s + c.points : s, 0)
  const joinedCount = progress.challengeCompletions.filter(id => communityChallenges.some(c => c.id === id)).length
  const totalActive = communityChallenges.reduce((s, c) => s + (c.activeCount ?? c.joinedCount), 0)
  const currentRank = RANKS.reduce((f, r) => {
    const xpVal = parseInt(r.range.replace(/[^0-9]/g, "").slice(0, 5) || "0")
    return totalXP >= xpVal ? r : f
  }, RANKS[0])

  return (
    <div className="min-h-screen text-stone-900 dark:text-white">

      {/* Hero header */}
      <div
        className="relative overflow-hidden px-5 pt-10 pb-10"
        style={{ background: "linear-gradient(160deg, #1c0700 0%, #3d1205 50%, #0a1e12 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_48px] opacity-[0.06]" />
        <div className="relative max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-amber-400/70 mb-3">Youth Corner</p>
          <h1 className="text-4xl font-black text-white leading-tight">
            Community Challenges
          </h1>
          <p className="mt-3 text-sm leading-7 text-white/55 max-w-md">
            Holiness was never meant to be a solo mission. When you strengthen your rhythm, you strengthen the whole Church.
          </p>
        </div>
      </div>

      <div className="px-5 py-8 max-w-5xl mx-auto space-y-8">

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Your rank", value: currentRank.title, sub: `${totalXP} XP earned`, Icon: currentRank.icon, color: currentRank.color },
            { label: "Joined", value: joinedCount, sub: `challenge${joinedCount !== 1 ? "s" : ""}`, Icon: Flame, color: "text-orange-500" },
            { label: "Community", value: totalActive.toLocaleString(), sub: "active globally", Icon: Star, color: "text-amber-500" },
          ].map(({ label, value, sub, Icon, color }) => (
            <div key={label} className="rounded-[1.25rem] border border-stone-200/80 bg-white dark:border-stone-800 dark:bg-stone-900 p-4 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] text-center">
              <Icon className={`h-5 w-5 mx-auto mb-1.5 ${color}`} />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">{label}</p>
              <p className="mt-1 text-xl font-black text-stone-900 dark:text-white">{value}</p>
              <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* Challenges grid */}
        <div>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500">All challenges</p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {communityChallenges.map((challenge) => {
              const joined = progress.challengeCompletions.includes(challenge.id)
              const expanded = expandedId === challenge.id
              const diff = DIFFICULTY[challenge.difficulty] ?? DIFFICULTY.beginner
              const activeCount = challenge.activeCount ?? challenge.joinedCount

              return (
                <div
                  key={challenge.id}
                  className="overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-white shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)] dark:border-stone-800 dark:bg-stone-900 transition hover:shadow-[0_16px_40px_-14px_rgba(0,0,0,0.15)]"
                >
                  {/* Top bar */}
                  <div className={`h-1.5 w-full ${joined ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-gradient-to-r from-[#7c2d12] via-[#d4a84f] to-[#0f766e]"}`} />

                  <div className="p-5">
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{challenge.emoji ?? "✝️"}</span>
                        <div>
                          <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${diff.bg} ${diff.text}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${diff.dot}`} />
                            {diff.label}
                          </div>
                          <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                            <Flame className="h-3 w-3 text-orange-500" />
                            <span className="font-semibold text-orange-600 dark:text-orange-400">{activeCount.toLocaleString()} active</span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-800/30 px-2.5 py-1.5 text-center">
                        <p className="text-xs font-black text-amber-700 dark:text-amber-400">{challenge.points}</p>
                        <p className="text-[9px] font-bold text-amber-500 dark:text-amber-500">XP</p>
                      </div>
                    </div>

                    <h2 className="text-lg font-black leading-tight text-stone-900 dark:text-white mb-1">
                      {challenge.title}
                    </h2>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-3">{challenge.durationLabel}</p>
                    <p className="text-sm leading-6 text-stone-600 dark:text-stone-400">{challenge.description}</p>

                    {/* Commitment */}
                    {challenge.commitment && challenge.commitment.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {challenge.commitment.map((item) => (
                          <div key={item} className="flex items-start gap-2 text-xs leading-5 text-stone-600 dark:text-stone-400">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400 dark:bg-amber-500" />
                            {item}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Theology expand */}
                    {challenge.theology && (
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() => setExpandedId(expanded ? null : challenge.id)}
                          className="flex w-full items-center justify-between rounded-[1rem] border border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60 px-4 py-3 text-left transition hover:bg-stone-100 dark:hover:bg-stone-800"
                        >
                          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-stone-600 dark:text-stone-400">The Theology of the Act</span>
                          {expanded ? <ChevronUp className="h-4 w-4 text-stone-400" /> : <ChevronDown className="h-4 w-4 text-stone-400" />}
                        </button>
                        {expanded && (
                          <div className="mt-2 rounded-[1rem] border border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60 px-4 py-4 text-sm leading-7 text-stone-600 dark:text-stone-400">
                            {challenge.theology}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Divider */}
                    <div className="my-4 h-px bg-stone-100 dark:bg-stone-800" />

                    {/* CTA */}
                    <button
                      type="button"
                      onClick={() => toggleJoin(challenge.id)}
                      className={`w-full rounded-full py-3.5 text-sm font-bold transition hover:brightness-105 active:scale-[0.98] ${
                        joined
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_8px_24px_-10px_rgba(16,185,129,0.4)]"
                          : "bg-gradient-to-r from-[#c86224] to-[#e2a13c] text-white shadow-[0_8px_24px_-10px_rgba(200,98,36,0.4)]"
                      }`}
                    >
                      {joined ? "✓ Joined — Check In" : "Join Challenge"}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Ranks */}
        <div>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500">The path of ranks</p>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {RANKS.map((rank) => {
              const Icon = rank.icon
              const isCurrentRank = rank.title === currentRank.title
              return (
                <div
                  key={rank.title}
                  className={`relative overflow-hidden rounded-[1.5rem] border p-5 transition ${
                    isCurrentRank
                      ? "border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 dark:border-amber-700/50 dark:from-amber-950/30 dark:to-orange-950/20 shadow-[0_8px_28px_-10px_rgba(212,168,79,0.35)]"
                      : "border-stone-200/80 bg-white dark:border-stone-800 dark:bg-stone-900 shadow-[0_4px_16px_-8px_rgba(0,0,0,0.08)]"
                  }`}
                >
                  {isCurrentRank && (
                    <div className="absolute right-3 top-3 rounded-full bg-amber-200/60 dark:bg-amber-700/30 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.2em] text-amber-800 dark:text-amber-400">
                      You
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-[1rem] ${rank.iconBg}`}>
                      <Icon className={`h-6 w-6 ${rank.color}`} />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-stone-900 dark:text-white">{rank.title}</h3>
                      <p className="text-[11px] font-semibold text-stone-400 dark:text-stone-500">{rank.range}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">{rank.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
