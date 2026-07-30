"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Copy, X } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

type QuickPrayer = {
  id: string
  emoji: string
  title: string
  duration: string
  context: string
  prayer: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const QUICK_PRAYERS: QuickPrayer[] = [
  {
    id: "morning",
    emoji: "🌅",
    title: "Morning opening",
    duration: "1 min",
    context: "Before you touch your phone",
    prayer:
      "Lord of the morning, You are the first thought of this day and all days. Before the noise begins, let me hear You. Guard my heart today from pride, from fear, and from forgetting You. Let my day begin in Your name. Father, Son, and Holy Spirit. Amen.",
  },
  {
    id: "before-school",
    emoji: "📚",
    title: "Before school or work",
    duration: "30 sec",
    context: "Right before you walk in",
    prayer:
      "Lord, let wisdom be in every word I speak today. Guard me from the need to impress, to compare, or to be seen. Let my presence be a blessing and not a burden. Amen.",
  },
  {
    id: "temptation",
    emoji: "⚔️",
    title: "When you're being tempted",
    duration: "30 sec",
    context: "In the moment — say this out loud",
    prayer:
      "Lord Jesus Christ, Son of God, have mercy on me, a sinner. I am in a moment of weakness. I cannot do this alone. Stand between me and this. Amen.",
  },
  {
    id: "angry",
    emoji: "😤",
    title: "When you're angry",
    duration: "1 min",
    context: "Before you respond, say this first",
    prayer:
      "God, my blood is hot right now and I know that what I say in this moment I cannot unsay. Slow my tongue. Let me see this person the way You see them, even now. Give me the courage to be quiet first. Amen.",
  },
  {
    id: "before-fasting",
    emoji: "🌙",
    title: "Before fasting",
    duration: "1 min",
    context: "Wednesday and Friday, when you wake up",
    prayer:
      "Lord, I offer this day's hunger as a small act of solidarity with Your sacrifice. Every time my stomach pulls at me today, let it pull me toward prayer. May my fasting not be performance but a quiet conversation with You. Amen.",
  },
  {
    id: "night",
    emoji: "🌑",
    title: "Late at night when your thoughts won't stop",
    duration: "2 min",
    context: "When the room is dark and your mind is loud",
    prayer:
      "Lord of the night, You are not sleeping. You see me here, turning in this bed with a mind that will not rest. I lay each thought before You — the worries, the regrets, the things I fear. I release them into Your hands. You are carrying this, not me. Guard my sleep. Amen.",
  },
  {
    id: "grief",
    emoji: "💔",
    title: "When someone you love is suffering",
    duration: "1 min",
    context: "For a sick friend, a broken family, a loss",
    prayer:
      "Lord, I bring this person to You because I have no other place to bring them. I cannot fix this. I am not supposed to fix this. But You can. Have mercy. Heal what can be healed. Hold what cannot. Amen.",
  },
  {
    id: "before-confession",
    emoji: "✝️",
    title: "Before going to confession",
    duration: "2 min",
    context: "On the way to church, in the car or on the bus",
    prayer:
      "Lord, I am about to do something that feels terrifying and true. I am going to say out loud what You already know. I am not worthy of Your mercy but I am coming anyway because You told me to. Give me honesty. Give me courage. Give me the grace to start again after this. Amen.",
  },
  {
    id: "lonely",
    emoji: "🕊️",
    title: "When you feel completely alone",
    duration: "2 min",
    context: "When no one seems to understand you",
    prayer:
      "Lord, this loneliness is real and I am not pretending it is not. But You are the friend who never leaves. You are the one who said 'I am with you always.' Right now I need to feel that. Not just believe it — feel it. Come close. Amen.",
  },
]

// ─── Duration badge colors ────────────────────────────────────────────────────

function durationColor(duration: string) {
  if (duration === "30 sec")
    return "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-700/30 dark:text-emerald-300"
  if (duration === "1 min")
    return "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/20 dark:border-amber-700/30 dark:text-amber-300"
  return "bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-950/20 dark:border-orange-700/30 dark:text-orange-300"
}

// ─── Prayer card ──────────────────────────────────────────────────────────────

function PrayerCard({
  prayer,
  onOpen,
}: {
  prayer: QuickPrayer
  onOpen: (p: QuickPrayer) => void
}) {
  return (
    <button
      type="button"
      id={prayer.id}
      onClick={() => onOpen(prayer)}
      className="flex flex-col gap-3 rounded-2xl border border-stone-200/80 bg-white dark:border-stone-800 dark:bg-stone-900 p-5 text-left transition hover:shadow-md hover:border-stone-300 dark:hover:border-stone-700 active:scale-[0.98]"
    >
      <span className="text-3xl leading-none">{prayer.emoji}</span>
      <div className="flex-1">
        <p className="text-sm font-bold leading-snug text-stone-900 dark:text-white">{prayer.title}</p>
        <p className="mt-1.5 text-xs leading-relaxed text-stone-400 dark:text-stone-500">{prayer.context}</p>
      </div>
      <span className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${durationColor(prayer.duration)}`}>
        {prayer.duration}
      </span>
    </button>
  )
}

// ─── Expanded prayer sheet ─────────────────────────────────────────────────────

function PrayerSheet({
  prayer,
  onClose,
}: {
  prayer: QuickPrayer
  onClose: () => void
}) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(prayer.prayer).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-[2rem] bg-white dark:bg-stone-900 shadow-2xl">
        {/* Drag handle */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="h-1 w-12 rounded-full bg-stone-200 dark:bg-stone-700" />
        </div>

        <div className="px-5 pb-10">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-6 mt-2">
            <div className="flex items-start gap-3">
              <span className="text-4xl leading-none">{prayer.emoji}</span>
              <div>
                <h2 className="text-lg font-black text-stone-900 dark:text-white leading-tight">{prayer.title}</h2>
                <p className="mt-1 text-xs text-stone-400 dark:text-stone-500">{prayer.context}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 transition"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Duration badge */}
          <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${durationColor(prayer.duration)}`}>
            {prayer.duration}
          </span>

          {/* Prayer text */}
          <div
            className="relative mt-5 overflow-hidden rounded-[1.5rem] p-6"
            style={{ background: "linear-gradient(135deg, #1c0700 0%, #3d1205 60%, #0a1e12 100%)" }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_40px] opacity-[0.06]" />
            <div className="relative">
              <div className="text-5xl leading-none font-black text-amber-400/20 select-none -mb-3 -ml-1">&ldquo;</div>
              <p className="text-base italic leading-[1.95] text-white/90">{prayer.prayer}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-stone-200/80 bg-stone-50 dark:border-stone-700 dark:bg-stone-800 py-3.5 text-sm font-semibold text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700 transition"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy prayer
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#c86224] to-[#e2a13c] py-3.5 text-sm font-bold text-white shadow-sm hover:brightness-105 transition"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function QuickPrayerPage() {
  const [activePrayer, setActivePrayer] = useState<QuickPrayer | null>(null)

  return (
    <div className="min-h-screen bg-transparent text-stone-900 dark:text-white">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #1c0700 0%, #3d1205 40%, #0a1e12 85%, #081812 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_48px] opacity-[0.06]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 20% 0%, rgba(220,100,20,0.18), transparent 55%)" }}
        />

        <div className="relative px-5 pt-8 pb-10">
          <Link
            href="/youth-corner"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white/90 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Youth Corner
          </Link>

          <div className="mt-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-amber-400/70">Prayer Library</p>
            <h1 className="mt-1 text-3xl font-black text-white leading-tight">Quick Prayers</h1>
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              Short prayers for real moments. No prep needed.
            </p>
          </div>
        </div>
      </div>

      {/* ── Prayer grid ───────────────────────────────────────────────────────── */}
      <div className="px-5 py-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {QUICK_PRAYERS.map((prayer) => (
            <PrayerCard key={prayer.id} prayer={prayer} onOpen={setActivePrayer} />
          ))}
        </div>
      </div>

      {/* ── No login note ─────────────────────────────────────────────────────── */}
      <div className="px-5 pb-10">
        <div className="rounded-2xl border border-stone-200/80 bg-stone-50 dark:border-stone-800 dark:bg-stone-900/50 px-5 py-4 text-center">
          <p className="text-xs text-stone-400 dark:text-stone-500">
            No account needed. These prayers are always available, even offline.
          </p>
        </div>
      </div>

      {/* ── Expanded prayer sheet ─────────────────────────────────────────────── */}
      {activePrayer && (
        <PrayerSheet prayer={activePrayer} onClose={() => setActivePrayer(null)} />
      )}

    </div>
  )
}
