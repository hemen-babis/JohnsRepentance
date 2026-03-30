"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle2, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  type CommunionProfile,
  type CommunionBaptismStatus,
  type CommunionGender,
  type CommunionLastReceived,
  saveProfile,
} from "@/components/holy-communion/communion-profile"

const titleSerif = "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif"

type Step = "baptism" | "gender" | "gender-specific" | "spiritual-father" | "last-received"

type PartialProfile = Partial<CommunionProfile>

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-[1.25rem] border px-5 py-4 text-left text-sm font-semibold transition ${
        selected
          ? "border-[#b45309] bg-[linear-gradient(135deg,rgba(180,83,9,0.08),rgba(212,168,79,0.12))] text-[#7c2d12] dark:border-amber-500 dark:bg-amber-950/20 dark:text-amber-300"
          : "border-[#e8d5a8] bg-white/80 text-stone-700 hover:border-[#d4a84f] hover:bg-[#fffbf0] dark:border-stone-700 dark:bg-stone-900/50 dark:text-stone-300 dark:hover:border-amber-700"
      }`}
    >
      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${selected ? "border-[#b45309] bg-[#b45309] dark:border-amber-500 dark:bg-amber-500" : "border-stone-300 dark:border-stone-600"}`}>
        {selected ? <CheckCircle2 className="h-3.5 w-3.5 text-white" /> : null}
      </span>
      {children}
    </button>
  )
}

export function CommunionProfileSetup({ onComplete }: { onComplete: (profile: CommunionProfile) => void }) {
  const [step, setStep] = useState<Step>("baptism")
  const [draft, setDraft] = useState<PartialProfile>({})

  const update = (values: Partial<CommunionProfile>) => setDraft((prev) => ({ ...prev, ...values }))

  const canAdvance = (): boolean => {
    switch (step) {
      case "baptism": return draft.baptismStatus !== undefined
      case "gender": return draft.gender !== undefined
      case "gender-specific": return true
      case "spiritual-father": return draft.hasSpiritualFather !== undefined
      case "last-received": return draft.lastReceived !== undefined
      default: return false
    }
  }

  const advance = () => {
    // Skip calendar if blocked
    if (step === "baptism" && (draft.baptismStatus === "not-yet" || draft.baptismStatus === "catechumen")) {
      finish()
      return
    }
    if (step === "baptism") { setStep("gender"); return }
    if (step === "gender") {
      // Skip gender-specific if prefer-not-to-say
      if (draft.gender === "prefer-not-to-say") { setStep("spiritual-father"); return }
      setStep("gender-specific"); return
    }
    if (step === "gender-specific") { setStep("spiritual-father"); return }
    if (step === "spiritual-father") { setStep("last-received"); return }
    if (step === "last-received") { finish(); return }
  }

  const finish = () => {
    const profile: CommunionProfile = {
      gender: draft.gender ?? "prefer-not-to-say",
      baptismStatus: draft.baptismStatus ?? "baptized",
      hasSpiritualFather: draft.hasSpiritualFather ?? false,
      lastReceived: draft.lastReceived ?? "one-to-six-months",
      femaleOnMenstrualCycle: draft.femaleOnMenstrualCycle,
      maleHasNocturnalEmission: draft.maleHasNocturnalEmission,
    }
    saveProfile(profile)
    onComplete(profile)
  }

  const stepIndex = (["baptism", "gender", "gender-specific", "spiritual-father", "last-received"] as Step[]).indexOf(step)
  const totalSteps = draft.gender === "prefer-not-to-say" ? 4 : draft.baptismStatus === "not-yet" || draft.baptismStatus === "catechumen" ? 1 : 5

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[#d8c395] bg-[linear-gradient(180deg,#fffcf5,#fff8ec)] shadow-[0_30px_80px_-40px_rgba(120,53,15,0.3)] dark:border-amber-500/20 dark:bg-[#18100820]">
      {/* Header */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#7c2d12] via-[#d4a84f] to-[#0f766e]" />
      <div className="p-6 md:p-8">
        <div className="mb-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8b6a2b] dark:text-amber-500">Communion Planner</p>
          <h2 className="mt-2 text-2xl font-black text-[#3d2206] dark:text-[#f3e4cd]" style={{ fontFamily: titleSerif }}>
            A few questions before we begin
          </h2>
          <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
            Your answers stay on this device only. They help us show you guidance that is actually relevant to where you are.
          </p>
          {/* Progress dots */}
          <div className="mt-4 flex gap-2">
            {Array.from({ length: Math.max(totalSteps, stepIndex + 1) }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${i <= stepIndex ? "w-6 bg-[#b45309] dark:bg-amber-500" : "w-3 bg-stone-200 dark:bg-stone-700"}`}
              />
            ))}
          </div>
        </div>

        {/* Step: Baptism */}
        {step === "baptism" && (
          <div className="space-y-3">
            <p className="text-base font-bold text-[#3d2206] dark:text-amber-200">Are you baptized in the Ethiopian Orthodox Tewahedo Church?</p>
            <OptionButton selected={draft.baptismStatus === "baptized"} onClick={() => update({ baptismStatus: "baptized" })}>
              Yes — I am baptized and a member of the Church
            </OptionButton>
            <OptionButton selected={draft.baptismStatus === "catechumen"} onClick={() => update({ baptismStatus: "catechumen" })}>
              I am a catechumen — learning and preparing for baptism
            </OptionButton>
            <OptionButton selected={draft.baptismStatus === "not-yet"} onClick={() => update({ baptismStatus: "not-yet" })}>
              Not yet — I am exploring the faith
            </OptionButton>
          </div>
        )}

        {/* Step: Gender */}
        {step === "gender" && (
          <div className="space-y-3">
            <p className="text-base font-bold text-[#3d2206] dark:text-amber-200">What is your gender?</p>
            <p className="text-xs text-stone-500 dark:text-stone-400">This helps us show relevant Tewahedo preparation guidance (e.g. menstrual cycle rest for women, purification guidance for men).</p>
            <OptionButton selected={draft.gender === "female"} onClick={() => update({ gender: "female" })}>
              Female
            </OptionButton>
            <OptionButton selected={draft.gender === "male"} onClick={() => update({ gender: "male" })}>
              Male
            </OptionButton>
            <OptionButton selected={draft.gender === "prefer-not-to-say"} onClick={() => update({ gender: "prefer-not-to-say" })}>
              Prefer not to say
            </OptionButton>
          </div>
        )}

        {/* Step: Gender-specific */}
        {step === "gender-specific" && draft.gender === "female" && (
          <div className="space-y-3">
            <p className="text-base font-bold text-[#3d2206] dark:text-amber-200">Are you currently in your menstrual cycle?</p>
            <p className="text-xs leading-5 text-stone-500 dark:text-stone-400">
              In the Tewahedo tradition, women observe a time of rest from the Holy Mysteries during this period. This is a rhythm of reverence, not unworthiness.
            </p>
            <OptionButton selected={draft.femaleOnMenstrualCycle === false} onClick={() => update({ femaleOnMenstrualCycle: false })}>
              No — I am not currently in my cycle
            </OptionButton>
            <OptionButton selected={draft.femaleOnMenstrualCycle === true} onClick={() => update({ femaleOnMenstrualCycle: true })}>
              Yes — I am currently in my cycle
            </OptionButton>
          </div>
        )}

        {step === "gender-specific" && draft.gender === "male" && (
          <div className="space-y-3">
            <p className="text-base font-bold text-[#3d2206] dark:text-amber-200">Have you experienced a nocturnal emission recently?</p>
            <p className="text-xs leading-5 text-stone-500 dark:text-stone-400">
              The Tewahedo tradition observes a period of purification before approaching the Holy Mysteries. Consult your spiritual father for the specific time observed.
            </p>
            <OptionButton selected={draft.maleHasNocturnalEmission === false} onClick={() => update({ maleHasNocturnalEmission: false })}>
              No — I have not
            </OptionButton>
            <OptionButton selected={draft.maleHasNocturnalEmission === true} onClick={() => update({ maleHasNocturnalEmission: true })}>
              Yes — I have recently
            </OptionButton>
          </div>
        )}

        {/* Step: Spiritual Father */}
        {step === "spiritual-father" && (
          <div className="space-y-3">
            <p className="text-base font-bold text-[#3d2206] dark:text-amber-200">Do you have a spiritual father / confessor?</p>
            <p className="text-xs leading-5 text-stone-500 dark:text-stone-400">A spiritual father who hears your confession is the gate of Holy Communion in the Tewahedo tradition.</p>
            <OptionButton selected={draft.hasSpiritualFather === true} onClick={() => update({ hasSpiritualFather: true })}>
              Yes — I have a spiritual father
            </OptionButton>
            <OptionButton selected={draft.hasSpiritualFather === false} onClick={() => update({ hasSpiritualFather: false })}>
              Not yet — I don't have one currently
            </OptionButton>
          </div>
        )}

        {/* Step: Last Received */}
        {step === "last-received" && (
          <div className="space-y-3">
            <p className="text-base font-bold text-[#3d2206] dark:text-amber-200">When did you last receive Holy Communion?</p>
            <OptionButton selected={draft.lastReceived === "within-month"} onClick={() => update({ lastReceived: "within-month" })}>
              Within the last month
            </OptionButton>
            <OptionButton selected={draft.lastReceived === "one-to-six-months"} onClick={() => update({ lastReceived: "one-to-six-months" })}>
              Between 1 and 6 months ago
            </OptionButton>
            <OptionButton selected={draft.lastReceived === "over-six-months"} onClick={() => update({ lastReceived: "over-six-months" })}>
              More than 6 months ago
            </OptionButton>
            <OptionButton selected={draft.lastReceived === "never"} onClick={() => update({ lastReceived: "never" })}>
              I have never received
            </OptionButton>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button
            type="button"
            onClick={advance}
            disabled={!canAdvance()}
            className="rounded-full bg-gradient-to-r from-[#c86224] to-[#e2a13c] px-6 text-white shadow-[0_14px_30px_-18px_rgba(200,98,36,0.5)] hover:brightness-105 disabled:opacity-40"
          >
            {step === "last-received" || draft.baptismStatus === "not-yet" || draft.baptismStatus === "catechumen" ? "See my guidance" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export function CommunionProfileBanner({
  profile,
  eligibility,
  onReset,
}: {
  profile: CommunionProfile
  eligibility: { canReceive: boolean; reason: string; guidance: string; severity: "blocked" | "caution" | "clear" }
  onReset: () => void
}) {
  const borderColor = eligibility.severity === "blocked" ? "border-red-300 dark:border-red-800/40" : eligibility.severity === "caution" ? "border-amber-300 dark:border-amber-700/40" : "border-emerald-300 dark:border-emerald-800/40"
  const bgColor = eligibility.severity === "blocked" ? "bg-red-50/80 dark:bg-red-950/20" : eligibility.severity === "caution" ? "bg-amber-50/80 dark:bg-amber-950/20" : "bg-emerald-50/80 dark:bg-emerald-950/20"
  const dotColor = eligibility.severity === "blocked" ? "bg-red-500" : eligibility.severity === "caution" ? "bg-amber-500" : "bg-emerald-500"
  const textColor = eligibility.severity === "blocked" ? "text-red-800 dark:text-red-300" : eligibility.severity === "caution" ? "text-amber-800 dark:text-amber-300" : "text-emerald-800 dark:text-emerald-300"

  return (
    <div className={`mb-6 overflow-hidden rounded-[1.75rem] border ${borderColor} ${bgColor} p-5`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${dotColor}`} />
          <div>
            <p className={`text-sm font-bold ${textColor}`}>{eligibility.reason}</p>
            <p className="mt-2 text-sm leading-6 text-stone-700 dark:text-stone-300">{eligibility.guidance}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex shrink-0 items-center gap-1 rounded-full border border-stone-200 bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-stone-500 hover:text-stone-700 dark:border-stone-700 dark:bg-stone-900/50 dark:text-stone-400"
          title="Update your profile"
        >
          <RotateCcw className="h-3 w-3" />
          Update
        </button>
      </div>
    </div>
  )
}
