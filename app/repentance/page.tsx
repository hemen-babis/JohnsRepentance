"use client"

import type { ComponentType } from "react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Check,
  Church,
  Ear,
  Eye,
  HeartHandshake,
  ScrollText,
  ShieldAlert,
  Sparkles,
} from "lucide-react"
import { AnimatedGradientText } from "@/components/animated-gradient-text"
import { Button } from "@/components/ui/button"
import { landingTeachingSections, pathwayOptions, priestFaq } from "./_components/shared"

const priestRoles = [
  {
    title: "The Father",
    text: "He receives your return with compassion, like the father of the prodigal son, and wants your healing, not your humiliation.",
  },
  {
    title: "The Judge",
    text: "He discerns truthfully with the authority given by Christ, not to crush you, but to separate the wound from the person and give the right remedy.",
  },
  {
    title: "The Teacher",
    text: "He gives counsel, correction, and practical guidance so repentance does not stay a feeling, but becomes a changed life.",
  },
]

const examinationPreview = [
  {
    title: "The Senses",
    icon: Ear,
    text: "Have I listened to what darkened my heart, or blocked my ears from the cry of the poor and the voice of God?",
  },
  {
    title: "The Gate of Lips",
    icon: ScrollText,
    text: "Have I lied, mocked, gossiped, or used words that wounded others instead of building them up?",
  },
  {
    title: "The Inner Chamber",
    icon: Sparkles,
    text: "Have I entertained pride, hatred, jealousy, or thoughts that I would never want brought into the light?",
  },
  {
    title: "The External World",
    icon: Eye,
    text: "Have I misused time, acted dishonestly, or given more attention to myself than to God, truth, and mercy?",
  },
]

const confessionRites = [
  "Be attentive. You are in the presence of the Holy Spirit.",
  "Say your sins clearly, one by one.",
  "Do not justify yourself or blame others.",
  "Be concise. Focus on what is true.",
  "Begin with the more serious sins first.",
  "Trust the confidentiality of confession.",
  "Receive guidance as medicine for the soul.",
  "Leave watchful, thankful, and ready to change.",
]

export default function RepentancePage() {
  const [selectedPath, setSelectedPath] = useState(pathwayOptions[0].id)
  const [begun, setBegun] = useState(false)
  const activePath = pathwayOptions.find((option) => option.id === selectedPath) ?? pathwayOptions[0]

  const pathIcons: Record<string, ComponentType<{ className?: string }>> = {
    lost: Sparkles,
    "no-father": Church,
    scared: ShieldAlert,
    prepare: HeartHandshake,
  }

  const handleBeginReturn = () => {
    setBegun(true)
    const target = document.getElementById("where-you-are")
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <main className="light-mode-adaptive-page min-h-screen bg-[url('/images/mobile-parch.png?v=20260321')] bg-cover bg-center bg-repeat text-stone-900 md:bg-[url('/images/parchment-bg.png?v=20260321')] dark:bg-none dark:bg-gradient-to-b dark:from-stone-950 dark:to-orange-950/20">

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50/90 via-orange-50/80 to-amber-100/70 px-6 py-24 text-center">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.035]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_25%,rgba(251,191,36,0.22),transparent_70%)]" />
        <div className="absolute left-1/2 top-0 h-px w-[min(700px,88vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 h-px w-[min(500px,70vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-400/35 to-transparent" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-orange-700/40 bg-white/70 shadow-[0_0_28px_rgba(194,65,12,0.14)]">
              <svg viewBox="0 0 40 40" className="h-8 w-8 fill-current text-orange-700" aria-hidden="true">
                <path d="M17 0h6v13h13v6H23v21h-6V19H4v-6h13z" />
              </svg>
            </div>
          </motion.div>

          <motion.p
            className="mb-3 text-[11px] font-bold uppercase tracking-[0.4em] text-orange-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18, duration: 0.5 }}
          >
            The Gate of Return
          </motion.p>

          <motion.h1
            className="mb-7 text-[clamp(4rem,13vw,9.5rem)] font-extrabold leading-[0.9] tracking-tight"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.65 }}
          >
            <AnimatedGradientText text="Repentance" className="block" />
          </motion.h1>

          <motion.div
            className="mx-auto mb-10 max-w-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.5 }}
          >
            <blockquote className="text-2xl font-semibold leading-[1.6] text-stone-800 md:text-3xl">
              "Repent, for the kingdom of heaven is near."
            </blockquote>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.28em] text-orange-700">
              Matthew 4:17
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.56, duration: 0.45 }}
          >
            <Button
              type="button"
              size="lg"
              onClick={handleBeginReturn}
              className="rounded-full bg-gradient-to-r from-orange-700 to-amber-600 px-10 py-6 text-base font-semibold text-white shadow-[0_14px_48px_-10px_rgba(154,52,18,0.52)] transition-all duration-300 hover:-translate-y-0.5 hover:from-orange-800 hover:to-amber-700"
            >
              Begin My Return
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          01 — WHAT IS REPENTANCE
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative px-6 py-20 md:py-24 lg:px-16">
        <div className="mx-auto max-w-6xl">
          {/* section label row */}
          <div className="mb-10 flex items-end gap-4 border-b-2 border-orange-700 pb-4">
            <span className="text-5xl font-black leading-none text-orange-700">01</span>
            <span className="mb-1 text-[11px] font-bold uppercase tracking-[0.34em] text-orange-700">
              What repentance is
            </span>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-[#3a1e01] dark:text-white md:text-5xl">
                Returning to God
              </h2>
              <div className="my-5 h-[3px] w-14 rounded-full bg-orange-600" />
              <p className="text-lg leading-8 text-stone-700 dark:text-stone-300">
                Repentance is returning to God. It is not just feeling bad or saying sorry. It is seeing your sin
                honestly, turning away from it, and coming back to Him with truth.
              </p>
              <p className="mt-4 text-lg leading-8 text-stone-700 dark:text-stone-300">
                You do not need to understand everything right now. You just need to begin.
              </p>
            </div>

            {/* right card — light-mode safe */}
            <div className="rounded-2xl bg-amber-50/70 p-8 ring-1 ring-amber-200/40 dark:bg-gradient-to-br dark:from-orange-950/50 dark:to-stone-900/80 dark:ring-orange-900/40">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-orange-700 dark:text-amber-400">
                Why confession exists
              </p>
              <div className="my-4 h-px bg-amber-200 dark:bg-orange-800/60" />
              <p className="text-xl font-semibold leading-[1.65] text-stone-800 dark:text-white">
                Confession is not only about forgiveness. It brings healing, guidance, and clarity. We speak honestly
                so we are no longer hiding.
              </p>
              <p className="mt-4 text-lg leading-8 text-stone-600 dark:text-stone-300">
                The Church receives repentance not as a courtroom alone, but as a spiritual hospital where the soul is
                treated, guided, and restored.
              </p>
              <div className="mt-6 border-l-2 border-orange-500 pl-4">
                <p className="text-base leading-7 text-stone-700 dark:text-stone-300">
                  "As the Baptized is enlightened by the grace of the Holy Spirit, by means of the priest, the repentant is granted forgiveness of his sins by the grace of Christ, also through the priest."
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.28em] text-orange-700">St. Athanasius the Apostolic</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SCRIPTURE — full-width band
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-y border-orange-300/30 bg-orange-900/8 py-20 dark:border-transparent dark:bg-gradient-to-r dark:from-orange-900 dark:via-amber-800 dark:to-orange-900">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.07]" />
        <div className="absolute left-1/2 top-1/2 h-56 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/10 blur-[80px]" />

        <div className="relative mx-auto max-w-4xl px-8 text-center lg:px-16">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.38em] text-orange-700 dark:text-amber-300">1 John 1:9</p>
          <div className="relative">
            <span className="pointer-events-none absolute -left-2 -top-4 select-none font-serif text-8xl leading-none text-stone-900/10 md:-left-8 md:text-[9rem] dark:text-white/10">
              "
            </span>
            <blockquote className="relative z-10 text-2xl font-semibold leading-[1.75] text-stone-900 md:text-3xl dark:text-white/95">
              If we confess our sins, He is faithful and just to forgive us our sins and to cleanse us from all
              unrighteousness.
            </blockquote>
            <span className="pointer-events-none absolute -bottom-10 -right-2 select-none font-serif text-8xl leading-none text-stone-900/10 md:-right-8 md:text-[9rem] dark:text-white/10">
              "
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          02 — WHERE ARE YOU
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="where-you-are"
        className={`relative px-6 py-20 transition-opacity duration-500 md:py-24 lg:px-16 ${begun ? "opacity-100" : "opacity-90"}`}
      >
        <div className="mx-auto max-w-6xl">

          <div className="mb-10 flex items-end gap-4 border-b-2 border-orange-700 pb-4">
            <span className="text-5xl font-black leading-none text-orange-700">02</span>
            <span className="mb-1 text-[11px] font-bold uppercase tracking-[0.34em] text-orange-700">
              The Honesty Engine
            </span>
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-bold tracking-tight text-[#3a1e01] dark:text-white md:text-5xl">
              Where are you right now?
            </h2>
            <div className="my-5 h-[3px] w-14 rounded-full bg-orange-600" />
            <p className="max-w-xl text-lg leading-8 text-stone-700 dark:text-stone-300">
              Start with honesty. Choose the place that sounds most like you right now.
            </p>
          </div>

          <div className="rounded-[2rem] bg-amber-50/65 p-5 ring-1 ring-amber-200/50">
            <div className="grid gap-3 md:grid-cols-2">
              {pathwayOptions.map((option) => {
                const Icon = pathIcons[option.id]
                const active = selectedPath === option.id

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedPath(option.id)}
                    className={`group flex items-start gap-4 rounded-2xl border-2 p-5 text-left transition-all duration-200 ${
                      active
                        ? "border-orange-600 bg-white shadow-[0_8px_32px_rgba(154,52,18,0.16)] dark:bg-orange-950/60 dark:shadow-[0_8px_32px_rgba(154,52,18,0.35)]"
                        : "border-stone-300/60 bg-white/70 hover:border-orange-400 hover:bg-white dark:border-orange-900/50 dark:bg-orange-950/30 dark:hover:border-orange-700/60 dark:hover:bg-orange-950/50"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
                        active
                          ? "bg-orange-700 text-white shadow-[0_4px_16px_rgba(154,52,18,0.38)]"
                          : "bg-orange-100 text-orange-700 group-hover:bg-orange-200 dark:bg-orange-900/40 dark:text-orange-400"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-lg font-semibold text-[#3a1e01] dark:text-white">{option.label}</p>
                        {active && (
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-700 text-white">
                            <Check className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-stone-400">{option.guidance}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-4 flex items-center">
            <Button
              asChild
              className="rounded-full bg-orange-700 px-5 text-white shadow-[0_4px_16px_rgba(154,52,18,0.25)] hover:bg-orange-800"
            >
              <Link href={activePath.href} aria-label={`Continue to ${activePath.label}`}>
                Continue -&gt;
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          03 — WHY A PRIEST
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative px-6 py-20 md:py-24 lg:px-16">
        <div className="mx-auto max-w-6xl">

          <div className="mb-10 flex items-end gap-4 border-b-2 border-orange-700 pb-4">
            <span className="text-5xl font-black leading-none text-orange-700">03</span>
            <span className="mb-1 text-[11px] font-bold uppercase tracking-[0.34em] text-orange-700">
              The Spiritual Hospital
            </span>
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-bold tracking-tight text-[#3a1e01] dark:text-white md:text-5xl">Why a priest?</h2>
            <div className="my-5 h-[3px] w-14 rounded-full bg-orange-600" />
            <p className="max-w-xl text-lg leading-8 text-stone-700 dark:text-stone-300">
              Confession is not a private technique. It is a sacrament in the Church. The priest does not replace
              God. He serves as witness, physician, guide, and steward of the authority Christ gave His apostles.
            </p>
          </div>

          <div className="rounded-[2rem] bg-amber-50/60 p-6 ring-1 ring-amber-200/45 md:p-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:items-start">

            {/* Numbered timeline */}
            <div className="space-y-8">
              {priestRoles.map((role, i) => (
                <div key={role.title} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-700 text-sm font-bold text-white shadow-[0_4px_16px_rgba(154,52,18,0.38)]">
                      {i + 1}
                    </div>
                    {i < priestRoles.length - 1 && (
                      <div className="mt-2 min-h-[3.5rem] w-0.5 flex-1 bg-orange-300" />
                    )}
                  </div>
                  <div className={`${i < priestRoles.length - 1 ? "pb-10" : ""}`}>
                    <h3 className="text-xl font-bold text-[#3a1e01] dark:text-white">{role.title}</h3>
                    <p className="mt-2 text-base leading-7 text-stone-700 dark:text-stone-300">{role.text}</p>
                  </div>
                </div>
              ))}

              {/* Saint quotes */}
              <div className="rounded-2xl bg-white/65 p-6 ring-1 ring-amber-200/50">
                <div className="space-y-5">
                  {[
                    { quote: "Regard the church priest as a spiritual father for you, reveal to him your secrets openly, just as a patient reveals his hidden wounds to the physician, and so is healed.", author: "St. Gregory of Nyssa" },
                    { quote: "The Lord Jesus Christ rose Lazarus from the dead and those around Him loosed him from the grave clothes. By loosening them, the apostles denoted their authority of absolving and forgiving sins, which the Lord granted to them and their successors.", author: "St. Augustine" },
                  ].map((item) => (
                    <div key={item.author} className="border-l-2 border-orange-400 pl-5">
                      <p className="text-base leading-7 text-stone-700 dark:text-stone-300">"{item.quote}"</p>
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.28em] text-orange-700 dark:text-amber-400">{item.author}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ as cards */}
            <div className="grid gap-4">
              <div className="space-y-3">
                {priestFaq.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-xl bg-amber-50/70 p-6 ring-1 ring-amber-200/40 dark:bg-gradient-to-br dark:from-orange-950/50 dark:to-stone-900/80 dark:ring-orange-900/40"
                  >
                    <h3 className="font-bold text-[#3a1e01] dark:text-white">{item.question}</h3>
                    <div className="mt-3 space-y-2">
                      {item.answer.map((paragraph) => (
                        <p key={paragraph} className="text-sm leading-6 text-stone-600 dark:text-stone-400">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          04 — EXAMINATION PREVIEW
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative px-6 py-20 md:py-24 lg:px-16">
        <div className="mx-auto max-w-6xl">

          <div className="mb-10 flex items-end gap-4 border-b-2 border-orange-700 pb-4">
            <span className="text-5xl font-black leading-none text-orange-700">04</span>
            <span className="mb-1 text-[11px] font-bold uppercase tracking-[0.34em] text-orange-700">
              Mirror of Conscience
            </span>
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-bold tracking-tight text-[#3a1e01] dark:text-white md:text-5xl">
              Prepare before you speak
            </h2>
            <div className="my-5 h-[3px] w-14 rounded-full bg-orange-600" />
            <p className="max-w-xl text-lg leading-8 text-stone-700 dark:text-stone-300">
              Before confession, examine yourself carefully. Not to panic. Not to perform. To see clearly.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {examinationPreview.map((item) => {
              const Icon = item.icon
              return (
                <article
                  key={item.title}
                  className="flex flex-col gap-4 rounded-2xl bg-amber-50/70 p-7 ring-1 ring-amber-200/40 transition-all duration-200 hover:-translate-y-0.5 hover:ring-amber-300/60 dark:bg-gradient-to-br dark:from-orange-950/50 dark:to-stone-900/80 dark:ring-orange-900/40"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-700 text-white shadow-[0_6px_20px_rgba(154,52,18,0.38)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#3a1e01] dark:text-white">{item.title}</h3>
                    <p className="mt-2 text-base leading-7 text-stone-600 dark:text-stone-300">{item.text}</p>
                  </div>
                </article>
              )
            })}
          </div>

          {/* CTA strip */}
          <div className="mt-6 flex flex-col gap-5 rounded-2xl bg-orange-700 p-8 text-white sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-orange-200">
                Interactive Preparation
              </p>
              <p className="mt-2 text-lg leading-7 text-white/90">
                When you are ready, the preparation page will walk you through the full self-examination and help
                you write clear confession notes you can copy, download, print, or bring with you.
              </p>
            </div>
            <Button
              asChild
              className="shrink-0 rounded-full bg-white text-orange-800 shadow-[0_4px_16px_rgba(0,0,0,0.18)] hover:bg-amber-50"
            >
              <Link href="/repentance/prepare">
                Open the examination builder
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          05 — CONFESSION RITES
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50/80 via-orange-50/55 to-amber-100/65 px-6 py-20 md:py-24 lg:px-16 dark:bg-gradient-to-br dark:from-stone-900 dark:via-orange-950 dark:to-stone-900">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.06]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-10 flex items-end gap-4 border-b-2 border-orange-600 pb-4 dark:border-amber-400">
            <span className="text-5xl font-black leading-none text-orange-700 dark:text-amber-400">05</span>
            <span className="mb-1 text-[11px] font-bold uppercase tracking-[0.34em] text-orange-700 dark:text-amber-400">
              The Rite of Meeting
            </span>
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-bold tracking-tight text-[#3a1e01] dark:text-white md:text-5xl">
              How to come to confession
            </h2>
            <div className="my-5 h-[3px] w-14 rounded-full bg-orange-600 dark:bg-amber-400" />
            <p className="max-w-xl text-lg leading-8 text-stone-700 dark:text-white/75">
              These are not productivity steps. They are the posture of an honest confession.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] bg-orange-200/30 ring-1 ring-orange-200/50 md:grid md:grid-cols-2 dark:bg-white/10 dark:ring-white/10">
            {confessionRites.map((rite, index) => (
              <div
                key={rite}
                className="flex items-start gap-5 bg-amber-50/60 p-6 dark:bg-stone-900/60 dark:backdrop-blur-sm"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-orange-600/60 text-xs font-black text-orange-700 dark:border-amber-500/60 dark:text-amber-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-lg leading-7 text-stone-800 dark:text-white/90">{rite}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          06 — TEACHINGS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative px-6 py-20 md:py-24 lg:px-16">
        <div className="mx-auto max-w-6xl">

          <div className="mb-10 flex items-end gap-4 border-b-2 border-orange-700 pb-4">
            <span className="text-5xl font-black leading-none text-orange-700">06</span>
            <span className="mb-1 text-[11px] font-bold uppercase tracking-[0.34em] text-orange-700">
              The Full Guide
            </span>
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-bold tracking-tight text-[#3a1e01] dark:text-white md:text-5xl">
              Read more when you are ready
            </h2>
            <div className="my-5 h-[3px] w-14 rounded-full bg-orange-600" />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {landingTeachingSections.map((block) => (
              <section key={block.title} className="rounded-[1.75rem] bg-amber-50/60 p-6 ring-1 ring-amber-200/45">
                <h3 className="text-xl font-bold text-[#3a1e01] dark:text-white">{block.title}</h3>
                <div className="my-3 h-0.5 w-10 rounded-full bg-orange-600" />
                <div className="space-y-3">
                  {block.content.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-stone-700 dark:text-stone-300">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
