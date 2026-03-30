"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Crown, Flame, Shield, Star, Trophy, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuthProgress } from "@/components/providers/auth-progress-provider"
import { communityChallenges } from "@/lib/youth-corner-data"

const titleSerif = "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif"

const difficultyStyles = {
  beginner: { label: "Beginner", bg: "bg-emerald-100 dark:bg-emerald-950/40", text: "text-emerald-700 dark:text-emerald-400", dot: "bg-emerald-500" },
  intermediate: { label: "Intermediate", bg: "bg-amber-100 dark:bg-amber-950/40", text: "text-amber-700 dark:text-amber-400", dot: "bg-amber-500" },
  expert: { label: "Expert", bg: "bg-red-100 dark:bg-red-950/40", text: "text-red-700 dark:text-red-400", dot: "bg-red-500" },
}

const ranks = [
  { title: "Novice", range: "0 – 500 XP", description: "The struggle begins.", icon: Shield, color: "text-stone-500 dark:text-stone-400" },
  { title: "Acolyte", range: "500 – 1,500 XP", description: "You have guarded the gate.", icon: Star, color: "text-emerald-600 dark:text-emerald-400" },
  { title: "Pillar", range: "1,500 – 3,000 XP", description: "You are steadfast.", icon: Zap, color: "text-amber-600 dark:text-amber-400" },
  { title: "Hermit", range: "3,000 – 5,000 XP", description: "You have mastered the silence.", icon: Flame, color: "text-orange-600 dark:text-orange-400" },
  { title: "Apostle", range: "5,000+ XP", description: "You lead others.", icon: Crown, color: "text-purple-600 dark:text-purple-400" },
  { title: "Abba / Amma", range: "Final Mastery", description: "Your heart is a Sanctuary.", icon: Trophy, color: "text-[#b45309] dark:text-amber-300" },
]

export default function YouthCornerChallengesPage() {
  const { progress, saveProgress } = useAuthProgress()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleJoin = (id: string) => {
    const exists = progress.challengeCompletions.includes(id)
    const nextCompletions = exists
      ? progress.challengeCompletions.filter((item) => item !== id)
      : [...progress.challengeCompletions, id]
    saveProgress({ ...progress, challengeCompletions: nextCompletions })
  }

  const totalXP = communityChallenges.reduce((sum, c) => {
    return progress.challengeCompletions.includes(c.id) ? sum + c.points : sum
  }, 0)

  const currentRank = ranks.reduce((found, rank) => {
    const xpValue = parseInt(rank.range.replace(/[^0-9]/g, "").slice(0, 5) || "0")
    return totalXP >= xpValue ? rank : found
  }, ranks[0])

  const joinedCount = progress.challengeCompletions.filter((id) => communityChallenges.some((c) => c.id === id)).length

  return (
    <div className="light-mode-adaptive-page youth-corner-root min-h-screen bg-[url('/images/mobile-parch.png?v=20260321')] bg-[length:auto_100%] bg-top bg-repeat-x text-stone-900 md:bg-[url('/images/parchment-bg.png?v=20260321')] md:bg-[length:auto_1400px] md:bg-top md:bg-repeat dark:bg-none dark:bg-gradient-to-b dark:from-[#120d09] dark:via-[#24140d] dark:to-[#140d09]">
      <section className="container mx-auto px-4 py-10 md:py-14">

        {/* Page Header */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a6461f]">Youth Corner</p>
          <h1
            className="mt-3 text-4xl font-black tracking-tight text-[#3d2206] dark:text-[#f3e4cd] md:text-5xl"
            style={{ fontFamily: titleSerif }}
          >
            Community Challenges
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600 dark:text-stone-400">
            Holiness was never meant to be a solo mission. In our Tewahedo tradition, we are one Body. When you strengthen your rhythm, you strengthen the whole Church.
          </p>
          <div className="mt-5 h-px w-48 bg-gradient-to-r from-[#a6461f] via-[#d4a84f] to-transparent" />
        </div>

        {/* Stats Bar */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[1.75rem] border border-[#d8c395] bg-[linear-gradient(180deg,#fffcf5,#fff8ec)] p-5 shadow-[0_18px_40px_-28px_rgba(120,53,15,0.2)] dark:border-amber-500/20 dark:bg-stone-950/70">
            <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#8b6a2b] dark:text-amber-500">Your rank</p>
            <div className="mt-2 flex items-center gap-2">
              <currentRank.icon className={`h-5 w-5 ${currentRank.color}`} />
              <p className="text-xl font-black text-[#3d2206] dark:text-[#f3e4cd]" style={{ fontFamily: titleSerif }}>{currentRank.title}</p>
            </div>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">{currentRank.description}</p>
          </div>
          <div className="rounded-[1.75rem] border border-[#d8c395] bg-[linear-gradient(180deg,#fffcf5,#fff8ec)] p-5 shadow-[0_18px_40px_-28px_rgba(120,53,15,0.2)] dark:border-amber-500/20 dark:bg-stone-950/70">
            <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#8b6a2b] dark:text-amber-500">Total XP earned</p>
            <p className="mt-2 text-3xl font-black text-[#3d2206] dark:text-amber-200">{totalXP}</p>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">{joinedCount} challenge{joinedCount !== 1 ? "s" : ""} joined</p>
          </div>
          <div className="rounded-[1.75rem] border border-[#d8c395] bg-[linear-gradient(180deg,#fffcf5,#fff8ec)] p-5 shadow-[0_18px_40px_-28px_rgba(120,53,15,0.2)] dark:border-amber-500/20 dark:bg-stone-950/70">
            <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#8b6a2b] dark:text-amber-500">Cloud of witnesses</p>
            <p className="mt-2 text-3xl font-black text-[#3d2206] dark:text-amber-200">
              {communityChallenges.reduce((s, c) => s + (c.activeCount ?? c.joinedCount), 0).toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">youth active across all challenges</p>
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {communityChallenges.map((challenge) => {
            const joined = progress.challengeCompletions.includes(challenge.id)
            const expanded = expandedId === challenge.id
            const diff = difficultyStyles[challenge.difficulty] ?? difficultyStyles.beginner
            const activeCount = challenge.activeCount ?? challenge.joinedCount

            return (
              <div
                key={challenge.id}
                className="group relative overflow-hidden rounded-[2rem] border border-[#d8c395] bg-[linear-gradient(180deg,#fffcf5_0%,#fff8ec_60%,#fdf3e0_100%)] shadow-[0_18px_50px_-30px_rgba(120,53,15,0.22)] transition-shadow hover:shadow-[0_28px_60px_-28px_rgba(120,53,15,0.32)] dark:border-[#3d2a14] dark:bg-[linear-gradient(180deg,#1e1208_0%,#180e07_100%)]"
              >
                {/* Accent bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#7c2d12] via-[#d4a84f] to-[#0f766e]" />

                {/* Cross pattern overlay */}
                <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_44px] opacity-[0.035]" />

                <div className="relative p-6">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{challenge.emoji ?? "✝️"}</span>
                      <div>
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] ${diff.bg} ${diff.text}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${diff.dot}`} />
                          {diff.label}
                        </span>
                        <div className="mt-1 flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400">
                          <Flame className="h-3 w-3 text-orange-500" />
                          <span className="font-semibold text-orange-600 dark:text-orange-400">{activeCount.toLocaleString()} active</span>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-full bg-[#f7f0e1] px-2.5 py-1.5 text-center dark:bg-[#2a1608]">
                      <p className="text-[11px] font-bold text-[#7c2d12] dark:text-amber-400">{challenge.points} XP</p>
                    </div>
                  </div>

                  {/* Title */}
                  <h2
                    className="mt-4 text-xl font-black leading-tight text-[#3d2206] dark:text-[#f3e4cd]"
                    style={{ fontFamily: titleSerif }}
                  >
                    {challenge.title}
                  </h2>

                  {/* Duration + description */}
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8b6a2b] dark:text-amber-500">{challenge.durationLabel}</p>
                  <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">{challenge.description}</p>

                  {/* Commitment list */}
                  {challenge.commitment && challenge.commitment.length > 0 ? (
                    <div className="mt-4 space-y-2">
                      {challenge.commitment.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-xs leading-5 text-stone-600 dark:text-stone-400">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b45309] dark:bg-amber-500" />
                          {item}
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {/* Theology expand/collapse */}
                  {challenge.theology ? (
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => setExpandedId(expanded ? null : challenge.id)}
                        className="flex w-full items-center justify-between rounded-[1rem] border border-[#ead8b6] bg-[#fffbf0] px-4 py-3 text-left transition hover:bg-[#fff7e6] dark:border-amber-500/15 dark:bg-stone-900/40"
                      >
                        <span className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#7c2d12] dark:text-amber-400">
                          The Theology of the Act
                        </span>
                        {expanded ? (
                          <ChevronUp className="h-4 w-4 text-[#8b6a2b] dark:text-amber-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-[#8b6a2b] dark:text-amber-400" />
                        )}
                      </button>
                      {expanded ? (
                        <div className="mt-2 rounded-[1rem] border border-[#ead8b6] bg-[#fffbf0] px-4 py-4 text-sm leading-7 text-stone-700 dark:border-amber-500/15 dark:bg-stone-900/40 dark:text-stone-300">
                          {challenge.theology}
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  {/* Divider */}
                  <div className="my-5 h-px bg-gradient-to-r from-[#e5d0a0] to-transparent dark:from-[#3d2a14]" />

                  {/* CTA */}
                  <Button
                    type="button"
                    onClick={() => toggleJoin(challenge.id)}
                    className={`w-full rounded-full text-sm font-bold shadow-[0_14px_30px_-18px_rgba(120,53,15,0.45)] hover:brightness-105 ${
                      joined
                        ? "bg-[linear-gradient(135deg,#0f766e,#059669)] text-white"
                        : "bg-gradient-to-r from-[#c86224] to-[#e2a13c] text-white"
                    }`}
                  >
                    {joined ? "✓ Joined — Check In" : "Join Challenge"}
                  </Button>
                  {!joined ? (
                    <p className="mt-2 text-center text-[10px] text-stone-400 dark:text-stone-500">Login required to track streak and rank</p>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>

        {/* Ranks Section */}
        <div className="mt-16">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a6461f]">Progression</p>
            <h2
              className="mt-3 text-3xl font-black tracking-tight text-[#3d2206] dark:text-[#f3e4cd]"
              style={{ fontFamily: titleSerif }}
            >
              The Path of the Ranks
            </h2>
            <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-400">
              Your position in the Cloud of Witnesses. Check your Community Tab to see where you stand.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {ranks.map((rank) => {
              const Icon = rank.icon
              const isCurrentRank = rank.title === currentRank.title
              return (
                <div
                  key={rank.title}
                  className={`relative overflow-hidden rounded-[1.75rem] border p-5 transition ${
                    isCurrentRank
                      ? "border-[#d4a84f] bg-[linear-gradient(180deg,#fffcf5,#fff4df)] shadow-[0_18px_50px_-28px_rgba(212,168,79,0.4)] dark:border-amber-500/50 dark:bg-[linear-gradient(180deg,#1e1208,#241408)]"
                      : "border-[#d8c395] bg-[linear-gradient(180deg,#fffcf5,#fff8ec)] shadow-[0_14px_36px_-24px_rgba(120,53,15,0.16)] dark:border-[#3d2a14] dark:bg-[#180e07]"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_44px] opacity-[0.03]" />
                  {isCurrentRank ? (
                    <div className="absolute right-4 top-4 rounded-full bg-[#d4a84f]/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b6a2b] dark:bg-amber-500/20 dark:text-amber-400">
                      Your rank
                    </div>
                  ) : null}
                  <div className="relative flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[linear-gradient(135deg,#7c2d12,#b45309)]">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-[#3d2206] dark:text-[#f3e4cd]" style={{ fontFamily: titleSerif }}>
                        {rank.title}
                      </h3>
                      <p className="text-[11px] font-semibold text-[#8b6a2b] dark:text-amber-400">{rank.range}</p>
                    </div>
                  </div>
                  <p className="relative mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">{rank.description}</p>
                </div>
              )
            })}
          </div>
        </div>

      </section>
    </div>
  )
}
