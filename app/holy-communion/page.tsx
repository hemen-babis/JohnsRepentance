"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GeezHeading } from "@/components/geez-heading"
import { AnimatedGradientText } from "@/components/animated-gradient-text"
import { CommunionCalendarSystem } from "@/components/holy-communion"
import { ScrollToTop } from "@/components/scroll-to-top"

type StageId = "mystery" | "need" | "path" | "examination" | "confession"

type Stage = {
  id: StageId
  label: string
  title: string
}

type SpiritualStepItem = {
  title: string
  body: string
  guidance: string
}

const stages: Stage[] = [
  { id: "mystery", label: "The Mystery", title: "Stage 1: The Mystery" },
  { id: "need", label: "Why We Need It", title: "Stage 2: Why We Need It" },
  { id: "path", label: "The Path", title: "Stage 3: The Path" },
  { id: "examination", label: "The Examination", title: "Stage 4: The Examination" },
  { id: "confession", label: "Repentance & Confession", title: "Stage 5: Repentance & Confession" },
]

const pathSteps: SpiritualStepItem[] = [
  {
    title: "Self-examination",
    body: "Before approaching the Holy Mystery, the believer pauses and examines the heart honestly before God.",
    guidance: "Stand quietly before God and ask where repentance is needed.",
  },
  {
    title: "Repentance & confession",
    body: "Holy Communion is approached through repentance, humility, and confession before a Confession Father.",
    guidance: "Do not hide your wounds; bring them plainly and truthfully.",
  },
  {
    title: "Reconciliation with others",
    body: "The heart that seeks Christ must also seek peace with others as much as possible.",
    guidance: "If there is a broken relationship, take the first step toward peace.",
  },
  {
    title: "Fasting",
    body: "Fasting disciplines the body and helps the soul approach Holy Communion with reverence and sobriety.",
    guidance: "Keep the fast with prayer, not only with hunger.",
  },
  {
    title: "Attending the Divine Liturgy",
    body: "The believer comes prayerfully to the Divine Liturgy, attentive to the prayers and the offering of the Holy Mystery.",
    guidance: "Arrive with stillness, remain attentive, and receive with fear of God and faith.",
  },
]

const beforeCommunionPrayer = [
  "O Lord, Master Jesus Christ, the Prince of Life and the King of Ages, the Bread of Life which came down from heaven, Who granted life to those who partake of Your holy body and precious blood, grant Your servant Your heavenly blessings in order to be worthy to approach the mystery of Your holy body and blood in godliness and reverence.",
  "Wake my heart to Your grace and visit me with Your salvation that I may taste the sweetness of Your heavenly grace hidden entirely in this all-holy mystery. Grant me a strong faith far from doubt and skepticism, that I may approach You now, trusting that this is Your holy body and precious blood, O Emmanuel, our God.",
  "Make me worthy to partake of them without falling into condemnation, in order to be united with You spiritually and for the forgiveness of my sins and for acceptance before Your awful judgement: for Yours is the glory with Your good Father and the Holy Spirit, now and forever.",
  "Amen.",
]

const afterCommunionPoints = [
  "Remain in thanksgiving and do not treat the moment lightly.",
  "Pray quietly and ask God to keep the grace you have received.",
  "Guard your thoughts, words, and senses with sobriety.",
  "Continue in repentance, not as one finished, but as one being healed.",
]

const anonymousExamples = ["Pray for my struggle with pride", "Help me forgive others"]

function TabNav({
  stages,
  activeStage,
  onChange,
}: {
  stages: Stage[]
  activeStage: StageId
  onChange: (stage: StageId) => void
}) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="mx-auto flex w-max min-w-full gap-2 rounded-[2rem] border border-orange-200/70 bg-[linear-gradient(180deg,rgba(255,252,246,0.92),rgba(250,240,223,0.78))] p-2 shadow-[0_18px_50px_-35px_rgba(120,53,15,0.35)] backdrop-blur-sm dark:border-amber-500/20 dark:bg-stone-900/80 lg:grid lg:max-w-5xl lg:grid-cols-5">
        {stages.map((stage) => {
          const isActive = stage.id === activeStage

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => onChange(stage.id)}
              className={`rounded-[1.25rem] px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-[linear-gradient(135deg,#c86224,#e2a13c)] text-white shadow-[0_18px_35px_-18px_rgba(194,98,36,0.65)]"
                  : "text-stone-700 hover:bg-white/80 dark:text-stone-200 dark:hover:bg-stone-800"
              }`}
            >
              {stage.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function StageProgressIndicator({
  stages,
  activeStage,
  onChange,
}: {
  stages: Stage[]
  activeStage: StageId
  onChange: (stage: StageId) => void
}) {
  const activeIndex = stages.findIndex((stage) => stage.id === activeStage)
  const active = stages[activeIndex]

  return (
    <div className="rounded-[2rem] border border-orange-200/70 bg-[linear-gradient(180deg,rgba(255,252,246,0.9),rgba(248,236,217,0.82))] p-6 shadow-[0_24px_60px_-36px_rgba(120,53,15,0.35)] backdrop-blur-sm dark:border-amber-500/20 dark:bg-stone-900/75">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-700 dark:text-amber-400">
        {active.title}
      </p>
      <div className="mt-4 flex flex-wrap gap-3 lg:flex-col">
        {stages.map((stage, index) => {
          const isActive = stage.id === activeStage
          const isComplete = index < activeIndex

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => onChange(stage.id)}
              className={`rounded-full border px-4 py-2 text-sm text-left lg:w-full ${
                isActive
                  ? "border-orange-500 bg-[linear-gradient(135deg,#c86224,#e2a13c)] text-white"
                  : isComplete
                    ? "border-orange-200 bg-orange-50/80 text-orange-700 hover:bg-orange-100 dark:border-amber-500/30 dark:bg-stone-800 dark:text-amber-300 dark:hover:bg-stone-700"
                    : "border-stone-200 bg-white/70 text-stone-500 hover:border-orange-300 hover:bg-orange-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-400 dark:hover:border-amber-500/30 dark:hover:bg-stone-800"
              }`}
            >
              {index + 1}. {stage.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function LearnMoreToggle({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-[1.75rem] border border-orange-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(250,241,227,0.7))] p-5 shadow-[0_18px_40px_-34px_rgba(120,53,15,0.28)] dark:border-amber-500/20 dark:bg-stone-900/75">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="text-base font-semibold text-stone-900 dark:text-white">{title}</span>
        <span className="text-sm font-medium text-orange-700 dark:text-amber-400">{open ? "Hide" : "Learn more"}</span>
      </button>
      {open && <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">{children}</div>}
    </div>
  )
}

function SpiritualStep({ index, step }: { index: number; step: SpiritualStepItem }) {
  return (
    <div className="relative pl-12">
      <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#c86224,#e2a13c)] text-sm font-bold text-white shadow-[0_14px_24px_-12px_rgba(194,98,36,0.6)]">
        {index}
      </div>
      <div className="rounded-[1.5rem] border border-orange-100/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(249,239,223,0.76))] p-6 shadow-[0_24px_50px_-38px_rgba(120,53,15,0.32)] dark:border-amber-500/20 dark:bg-stone-900/70">
        <h3 className="text-xl font-semibold text-stone-900 dark:text-white">{step.title}</h3>
        <p className="mt-3 leading-7 text-gray-700 dark:text-gray-300">{step.body}</p>
        <p className="mt-3 text-sm font-medium italic text-orange-700 dark:text-amber-400">{step.guidance}</p>
      </div>
    </div>
  )
}

function ReflectionInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="block space-y-3 rounded-[1.75rem] border border-orange-100/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(249,239,223,0.72))] p-5 shadow-[0_18px_40px_-34px_rgba(120,53,15,0.28)]">
      <span className="text-base font-semibold text-stone-900 dark:text-white">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="w-full rounded-[1.5rem] border border-orange-200/80 bg-white/85 px-4 py-4 text-sm text-stone-800 outline-none transition focus:border-orange-400 dark:border-amber-500/20 dark:bg-stone-900/80 dark:text-stone-100"
        placeholder="Write privately before God..."
      />
    </label>
  )
}

function AnonymousCloud({
  intentions,
  newIntention,
  onChange,
  onSubmit,
}: {
  intentions: string[]
  newIntention: string
  onChange: (value: string) => void
  onSubmit: () => void
}) {
  return (
    <div className="rounded-[2rem] border border-orange-200/70 bg-[linear-gradient(180deg,rgba(255,252,246,0.92),rgba(250,238,219,0.82))] p-6 shadow-[0_26px_60px_-40px_rgba(120,53,15,0.34)] dark:border-amber-500/20 dark:bg-stone-900/75">
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-stone-900 dark:text-white">Anonymous Community Intentions</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Anonymous — no identity stored</p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <input
          value={newIntention}
          onChange={(event) => onChange(event.target.value)}
          placeholder={anonymousExamples[0]}
          className="min-h-12 flex-1 rounded-full border border-orange-200/80 bg-white/85 px-5 text-sm text-stone-800 outline-none transition focus:border-orange-400 dark:border-amber-500/20 dark:bg-stone-950/80 dark:text-stone-100"
        />
        <Button
          onClick={onSubmit}
          className="rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white hover:from-orange-700 hover:to-amber-600"
        >
          Add Intention
        </Button>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {intentions.map((intention, index) => (
          <div
            key={`${intention}-${index}`}
            className="rounded-full border border-orange-100 bg-orange-50/80 px-4 py-2 text-sm text-orange-800 dark:border-amber-500/20 dark:bg-stone-800 dark:text-amber-200"
          >
            {intention}
          </div>
        ))}
      </div>
    </div>
  )
}

function BottomCta({ isFinalStage, onNext }: { isFinalStage: boolean; onNext: () => void }) {
  return (
    <div className="rounded-[2rem] border border-orange-200/70 bg-[radial-gradient(circle_at_top,rgba(250,211,131,0.34),transparent_34%),linear-gradient(180deg,rgba(255,252,246,0.94),rgba(247,234,212,0.86))] p-8 text-center shadow-[0_30px_70px_-42px_rgba(120,53,15,0.42)] dark:border-amber-500/20 dark:bg-[linear-gradient(180deg,rgba(28,25,23,0.94),rgba(41,24,14,0.9))]">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-700 dark:text-amber-400">
        Final Goal
      </p>
      <h2 className="mt-3 text-3xl font-bold text-stone-900 dark:text-white">
        “I understand now… I want to prepare… I want to receive Christ.”
      </h2>
      <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-700 dark:text-gray-300">
        Approach the Holy Mystery with fear of God, faith, repentance, prayer, and obedience to the counsel of your
        Confession Father.
      </p>

      {isFinalStage && (
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            asChild
            className="rounded-full bg-[linear-gradient(135deg,#c86224,#e2a13c)] px-8 text-white hover:brightness-105"
          >
            <a href="/resources/communionprayers.pdf" download>
              Print Prayers
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-orange-300 text-orange-700 hover:bg-orange-50 dark:border-amber-500 dark:text-amber-400 dark:hover:bg-stone-800"
          >
            <Link href="/join">Message a Priest</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

export default function CommunionJourneyPage() {
  const [activeStage, setActiveStage] = useState<StageId>("mystery")
  const [showBeforePrayer, setShowBeforePrayer] = useState(false)
  const [reflectionAnswers, setReflectionAnswers] = useState({
    forgiveness: "",
    faith: "",
    honesty: "",
  })
  const [newIntention, setNewIntention] = useState("")
  const [intentions, setIntentions] = useState<string[]>([...anonymousExamples])

  const activeIndex = stages.findIndex((stage) => stage.id === activeStage)
  const activeStageMeta = stages[activeIndex]
  const isFinalStage = activeIndex === stages.length - 1

  let section: ReactNode = null

  switch (activeStage) {
    case "mystery":
      section = (
          <div className="space-y-8">
            <section className="space-y-5">
              <p className="text-lg leading-8 text-gray-700 dark:text-gray-300">
                Holy Communion is not a symbol only. In the Ethiopian Orthodox Tewahedo Church, it is the
                true Body and Blood of our Lord Jesus Christ, given for the life of the faithful and for union with
                Him.
              </p>
              <p className="text-lg leading-8 text-gray-700 dark:text-gray-300">
                The believer does not come to a mere remembrance, but to the Holy Mystery itself. Therefore Holy Communion is
                approached with reverence, repentance, and faith.
              </p>
            </section>

            <div className="grid gap-5 xl:grid-cols-2">
              <blockquote className="rounded-[1.75rem] border border-orange-200/70 bg-white/70 p-6 italic leading-8 text-stone-800 dark:border-amber-500/20 dark:bg-stone-900/75 dark:text-stone-100">
                “Whoever eats My Flesh and drinks My Blood has eternal life and I will raise him up at the last day.”
                <span className="mt-3 block text-sm font-semibold not-italic uppercase tracking-[0.24em] text-orange-700 dark:text-amber-400">
                  John 6:54
                </span>
              </blockquote>
              <blockquote className="rounded-[1.75rem] border border-orange-200/70 bg-white/70 p-6 italic leading-8 text-stone-800 dark:border-amber-500/20 dark:bg-stone-900/75 dark:text-stone-100">
                “Let a man examine himself, and so let him eat of the bread and drink of the cup.”
                <span className="mt-3 block text-sm font-semibold not-italic uppercase tracking-[0.24em] text-orange-700 dark:text-amber-400">
                  1 Corinthians 11:23-29
                </span>
              </blockquote>
            </div>

            <LearnMoreToggle title="The Liturgical Mystery">
              <p>
                During the Divine Liturgy, the Church offers thanksgiving, praise, supplication, and the sacred prayers
                handed down in the liturgy. The bread and wine are not treated as ordinary things.
              </p>
              <p>
                With the prayers of the Church, the work of the Holy Spirit, and the priestly service entrusted by
                Christ, the faithful receive the Holy Mystery with fear and faith.
              </p>
            </LearnMoreToggle>
          </div>
        )
      break
    case "need":
      section = (
          <div className="space-y-8">
            <section className="space-y-5">
              <p className="text-lg leading-8 text-gray-700 dark:text-gray-300">
                The Church teaches us not to approach Holy Communion casually, but to hunger for it as life from Christ. The
                Holy Mystery strengthens the believer and joins the soul to the Lord.
              </p>
            </section>

            <div className="grid gap-4 xl:grid-cols-2">
              {[
                "Union with Christ, so that we may abide in Him and He in us.",
                "Forgiveness of sins for the repentant believer who approaches rightly.",
                "Healing of soul and body by the mercy of God.",
                "Strength against sin and help in the spiritual struggle.",
                "Eternal life and the hope of resurrection.",
                "The Holy Mystery is rightly called the medicine of immortality.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] border border-orange-100/80 bg-white/70 px-5 py-4 text-base leading-7 text-stone-800 dark:border-amber-500/20 dark:bg-stone-900/70 dark:text-stone-100"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="rounded-[1.75rem] border border-orange-200/70 bg-gradient-to-r from-orange-50/70 to-amber-50/80 p-6 dark:border-amber-500/20 dark:bg-stone-900/75">
              <p className="text-base leading-7 text-gray-700 dark:text-gray-300">
                We do not come because we are already holy by ourselves. We come because Christ is our life, and we
                desire to be healed, united to Him, and strengthened in repentance.
              </p>
            </div>
          </div>
        )
      break
    case "path":
      section = (
          <div className="space-y-10">
            <section className="space-y-5">
              <p className="text-lg leading-8 text-gray-700 dark:text-gray-300">
                Preparation is a spiritual path, not a routine. The believer moves carefully, prayerfully, and
                obediently toward the Holy Mystery.
              </p>
            </section>

            <div className="grid gap-6 xl:grid-cols-2">
              {pathSteps.map((step, index) => (
                <SpiritualStep key={step.title} index={index + 1} step={step} />
              ))}
            </div>

            <div className="rounded-[1.75rem] border border-orange-200/70 bg-white/70 p-6 dark:border-amber-500/20 dark:bg-stone-900/75">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-stone-900 dark:text-white">Prayer Before Communion</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    A prayer to read quietly as you prepare your heart.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBeforePrayer((value) => !value)}
                  className="text-sm font-semibold text-orange-700 dark:text-amber-400"
                >
                  {showBeforePrayer ? "Hide" : "Show"}
                </button>
              </div>
              {showBeforePrayer && (
                <div className="mt-5 space-y-4 text-gray-700 dark:text-gray-300">
                  {beforeCommunionPrayer.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="leading-7">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      break
    case "examination":
      section = (
          <div className="space-y-8">
            <section className="space-y-5">
              <p className="text-lg leading-8 text-gray-700 dark:text-gray-300">
                Before receiving Holy Communion, the believer examines the heart honestly. This is not for display, but for
                repentance before God.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">These reflections are private and not stored.</p>
            </section>

            <div className="grid gap-6 xl:grid-cols-3">
              <ReflectionInput
                label="Is there anyone I have not forgiven?"
                value={reflectionAnswers.forgiveness}
                onChange={(value) => setReflectionAnswers((current) => ({ ...current, forgiveness: value }))}
              />
              <ReflectionInput
                label="Am I approaching with fear of God and faith?"
                value={reflectionAnswers.faith}
                onChange={(value) => setReflectionAnswers((current) => ({ ...current, faith: value }))}
              />
              <ReflectionInput
                label="Have I examined myself honestly?"
                value={reflectionAnswers.honesty}
                onChange={(value) => setReflectionAnswers((current) => ({ ...current, honesty: value }))}
              />
            </div>

            <AnonymousCloud
              intentions={intentions}
              newIntention={newIntention}
              onChange={setNewIntention}
              onSubmit={() => {
                const trimmed = newIntention.trim()
                if (!trimmed) return
                setIntentions((current) => [trimmed, ...current])
                setNewIntention("")
              }}
            />
          </div>
        )
      break
    case "confession":
      section = (
          <div className="space-y-8">
            <section className="space-y-5">
              <p className="text-lg leading-8 text-gray-700 dark:text-gray-300">
                Repentance and confession are not separate from Holy Communion. The believer is prepared for Holy Communion
                through a contrite heart, truthful confession, and obedience to the guidance of the Confession Father.
              </p>
            </section>

            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-6">
                <div className="rounded-[1.75rem] border border-orange-200/70 bg-white/70 p-6 dark:border-amber-500/20 dark:bg-stone-900/75">
                  <h3 className="text-xl font-semibold text-stone-900 dark:text-white">The role of the Confession Father</h3>
                  <p className="mt-3 leading-7 text-gray-700 dark:text-gray-300">
                    The Confession Father listens, counsels, corrects, and guides the believer in the path of repentance.
                    He is not approached casually, but with humility and truthfulness.
                  </p>
                  <p className="mt-3 leading-7 text-gray-700 dark:text-gray-300">
                    In absolution, the believer receives the prayer of the Church through the priestly ministry entrusted by
                    Christ. This should be understood simply as the Church’s prayer for forgiveness and restoration, not as
                    a private self-justification.
                  </p>
                </div>

                <div className="rounded-[1.75rem] border border-orange-200/70 bg-gradient-to-r from-orange-50/70 to-amber-50/80 p-6 dark:border-amber-500/20 dark:bg-stone-900/75">
                  <h3 className="text-xl font-semibold text-stone-900 dark:text-white">How to approach a priest</h3>
                  <p className="mt-3 leading-7 text-gray-700 dark:text-gray-300">
                    Ask respectfully for a time for confession. Come prepared, speak plainly, hide nothing knowingly, and
                    receive guidance with humility. If you are uncertain whether you should receive Communion, ask your
                    Confession Father directly.
                  </p>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-orange-200/70 bg-white/70 p-6 dark:border-amber-500/20 dark:bg-stone-900/75">
                <h3 className="text-xl font-semibold text-stone-900 dark:text-white">Conditions of true repentance</h3>
                <ul className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>Contrite heart</li>
                  <li>Intention to change</li>
                  <li>Faith in Christ</li>
                  <li>Verbal confession with honesty</li>
                </ul>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[1.75rem] border border-orange-200/70 bg-white/70 p-6 dark:border-amber-500/20 dark:bg-stone-900/75">
                <h3 className="text-xl font-semibold text-stone-900 dark:text-white">
                  When Should You Not Take Communion?
                </h3>
                <ul className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
                  <li>No confession when confession is needed</li>
                  <li>Unrepented sin</li>
                  <li>Lack of spiritual preparation</li>
                </ul>
              </div>

              <div className="rounded-[1.75rem] border border-orange-200/70 bg-white/70 p-6 dark:border-amber-500/20 dark:bg-stone-900/75">
                <h3 className="text-xl font-semibold text-stone-900 dark:text-white">After Receiving Communion</h3>
                <ul className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
                  {afterCommunionPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )
      break
  }

  return (
    <div className="light-mode-adaptive-page min-h-screen bg-[url('/images/mobile-parch.png?v=20260321')] bg-cover bg-center bg-repeat md:bg-[url('/images/parchment-bg.png?v=20260321')] dark:bg-none dark:bg-gradient-to-b dark:from-stone-950 dark:to-orange-950/20">
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,214,153,0.34),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(226,145,59,0.16),transparent_26%),linear-gradient(180deg,rgba(255,248,238,0.22),transparent_62%)] dark:from-orange-900/20 dark:to-amber-900/20" />
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.045]" />
        <div className="absolute left-1/2 top-8 h-px w-[min(92vw,1200px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-700/25 to-transparent" />
        <div className="container relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-7xl"
          >
            <div className="grid items-end gap-10 lg:grid-cols-[1.35fr_0.95fr]">
              <div className="text-center lg:text-left">
                <div className="inline-flex rounded-full border border-orange-200/70 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-orange-800 shadow-sm backdrop-blur-sm dark:border-amber-500/20 dark:bg-stone-900/70 dark:text-amber-300">
                  The Holy Mystery
                </div>
                <GeezHeading className="mt-6 text-orange-700 dark:text-amber-400">ቅዱስ ቁርባን</GeezHeading>
                <h1 className="mt-4 max-w-[12ch] text-5xl font-extrabold leading-[0.92] tracking-tight sm:text-6xl lg:max-w-none lg:text-7xl">
                  <AnimatedGradientText text="Holy Communion" className="block" />
                </h1>
                <p className="mt-8 max-w-3xl text-lg leading-8 text-stone-700 dark:text-stone-300">
                  A reverent preparation journey for receiving the Holy Body and Blood of Christ in the Ethiopian Orthodox
                  Tewahedo Church. Not a checklist to skim, but a space to be sobered, instructed, and drawn nearer.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                  <Button
                    onClick={() => setActiveStage("mystery")}
                    className="rounded-full bg-[linear-gradient(135deg,#c86224,#e2a13c)] px-7 text-white hover:brightness-105"
                  >
                    Enter the Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => setActiveStage("path")}
                    variant="outline"
                    className="rounded-full border-orange-300 bg-white/70 px-7 text-orange-800 hover:bg-orange-50"
                  >
                    See the Preparation Path
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-amber-300 bg-white/70 px-7 text-amber-800 hover:bg-amber-50">
                    <Link href="/holy-communion/calendar">
                      Communion Calendar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-6 hidden h-24 w-24 rounded-full bg-amber-300/25 blur-3xl lg:block" />
                <div className="absolute -right-4 bottom-10 hidden h-28 w-28 rounded-full bg-orange-300/20 blur-3xl lg:block" />
                <div className="relative overflow-hidden rounded-[2rem] border border-orange-200/70 bg-[linear-gradient(160deg,rgba(255,250,242,0.88),rgba(247,232,206,0.78))] p-7 shadow-[0_38px_90px_-52px_rgba(120,53,15,0.44)] backdrop-blur-sm dark:border-amber-500/20 dark:bg-stone-900/75">
                  <div className="text-orange-800">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em]">Approach Worthily</p>
                  </div>
                  <blockquote className="mt-5 text-2xl font-semibold leading-tight text-stone-900 dark:text-white">
                    “Let a man examine himself, and so let him eat of the bread and drink of the cup.”
                  </blockquote>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-700 dark:text-amber-400">
                    1 Corinthians 11:28
                  </p>
                  <div className="mt-6 grid gap-3">
                    {[
                      "Approach with fear of God and faith",
                      "Prepare with repentance, fasting, and prayer",
                      "Receive as one seeking healing, not merely custom",
                    ].map((item) => (
                      <div key={item} className="rounded-2xl border border-orange-100 bg-white/75 px-4 py-3 text-sm text-stone-700 dark:border-amber-500/20 dark:bg-stone-950/60 dark:text-stone-200">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto max-w-[1320px] px-4 sm:px-6">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[2rem] border border-orange-200/70 bg-[linear-gradient(180deg,rgba(255,252,246,0.92),rgba(248,235,213,0.82))] p-7 shadow-[0_28px_70px_-45px_rgba(120,53,15,0.36)]">
                <div className="text-orange-800">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em]">Preparation Principle</p>
                </div>
                <h2 className="mt-4 text-3xl font-bold text-stone-900">The Mystery Demands Beauty, Stillness, and Truth</h2>
                <p className="mt-4 max-w-3xl leading-8 text-stone-700">
                  Holy Communion should not feel like an information page. It should feel like entering a holy threshold:
                  instruction, self-examination, repentance, reverence, and finally the courage to approach Christ rightly.
                </p>
              </div>
              <div className="grid gap-4">
                {[
                  { title: "Fear of God", body: "Receive with trembling reverence, not routine." },
                  { title: "Repentance", body: "Come through confession, contrition, and healing." },
                  { title: "Union with Christ", body: "The goal is not ceremony only, but true communion." },
                ].map(({ title, body }) => (
                  <div key={title} className="rounded-[1.75rem] border border-orange-200/70 bg-white/70 p-5 shadow-[0_20px_46px_-36px_rgba(120,53,15,0.32)]">
                    <div className="text-orange-700">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em]">{title}</p>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-stone-700">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
              <div className="lg:sticky lg:top-6">
                <StageProgressIndicator stages={stages} activeStage={activeStage} onChange={setActiveStage} />
              </div>

              <div className="overflow-hidden rounded-[2.5rem] border border-orange-200/70 bg-[linear-gradient(180deg,rgba(255,252,246,0.92),rgba(247,234,212,0.84))] p-8 shadow-[0_34px_90px_-52px_rgba(120,53,15,0.42)] dark:border-amber-500/20 dark:bg-stone-950/75 md:p-10">
                <div className="absolute" />
                <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-700 dark:text-amber-400">
                      {activeStageMeta.title}
                    </p>
                    <h2 className="mt-3 text-3xl font-bold text-stone-900 dark:text-white">{activeStageMeta.label}</h2>
                  </div>
                </div>
                {section}
              </div>
            </div>

            <BottomCta
              isFinalStage={isFinalStage}
              onNext={() => {
                if (isFinalStage) return
                setActiveStage(stages[activeIndex + 1].id)
              }}
            />

            <CommunionCalendarSystem />
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  )
}
