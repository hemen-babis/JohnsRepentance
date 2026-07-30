"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  type CommunionProfile,
  type CommunionBaptismStatus,
  type CommunionGender,
  type CommunionLastReceived,
  saveProfile,
} from "@/components/holy-communion/communion-profile"

const titleSerif = "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif"

type Step =
  | "baptism"
  | "gender"
  | "female-cycle"
  | "female-postpartum"
  | "female-postpartum-detail"
  | "female-bleeding"
  | "male-emission"
  | "male-relations"
  | "excommunication"
  | "spiritual-father"
  | "last-received"

type Draft = Partial<CommunionProfile>

function OptionButton({
  selected,
  onClick,
  children,
  description,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
  description?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-start gap-3 rounded-[1.25rem] border px-5 py-4 text-left text-sm font-semibold transition ${
        selected
          ? "border-[#b45309] bg-[linear-gradient(135deg,rgba(180,83,9,0.08),rgba(212,168,79,0.12))] text-[#7c2d12] dark:border-amber-500 dark:bg-amber-950/20 dark:text-amber-300"
          : "border-[#e8d5a8] bg-white/80 text-stone-700 hover:border-[#d4a84f] hover:bg-[#fffbf0] dark:border-stone-700 dark:bg-stone-900/50 dark:text-stone-300 dark:hover:border-amber-700"
      }`}
    >
      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${selected ? "border-[#b45309] bg-[#b45309] dark:border-amber-500 dark:bg-amber-500" : "border-stone-300 dark:border-stone-600"}`}>
        {selected ? <CheckCircle2 className="h-3.5 w-3.5 text-white" /> : null}
      </span>
      <div>
        <p>{children}</p>
        {description && <p className="mt-0.5 text-[11px] font-normal leading-4 text-stone-500 dark:text-stone-400">{description}</p>}
      </div>
    </button>
  )
}

function NoteBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[1.1rem] border border-amber-200/60 bg-amber-50/60 p-4 text-xs leading-5 text-amber-800 dark:border-amber-500/20 dark:bg-amber-950/20 dark:text-amber-300">
      {children}
    </div>
  )
}

export function CommunionProfileSetup({ onComplete }: { onComplete: (profile: CommunionProfile) => void }) {
  const [step, setStep] = useState<Step>("baptism")
  const [history, setHistory] = useState<Step[]>([])
  const [draft, setDraft] = useState<Draft>({})

  const update = (values: Partial<CommunionProfile>) => setDraft((prev) => ({ ...prev, ...values }))

  const goTo = (next: Step) => {
    setHistory((h) => [...h, step])
    setStep(next)
  }

  const goBack = () => {
    const prev = history[history.length - 1]
    if (!prev) return
    setHistory((h) => h.slice(0, -1))
    setStep(prev)
  }

  const canAdvance = (): boolean => {
    switch (step) {
      case "baptism": return draft.baptismStatus !== undefined
      case "gender": return draft.gender !== undefined
      case "female-cycle": return draft.femaleOnMenstrualCycle !== undefined
      case "female-postpartum": return draft.femalePostpartumActive !== undefined
      case "female-postpartum-detail":
        return (
          draft.femalePostpartumBabyGender !== undefined &&
          Boolean(draft.femalePostpartumBirthDate)
        )
      case "female-bleeding": return draft.femaleHasAbnormalBleeding !== undefined
      case "male-emission": return draft.maleHasNocturnalEmission !== undefined
      case "male-relations": return draft.maleHadConjugalRelations !== undefined
      case "excommunication": return draft.isExcommunicated !== undefined
      case "spiritual-father": return draft.hasSpiritualFather !== undefined
      case "last-received": return draft.lastReceived !== undefined
      default: return false
    }
  }

  const advance = () => {
    switch (step) {
      case "baptism":
        if (draft.baptismStatus === "not-yet" || draft.baptismStatus === "catechumen") {
          finish(); return
        }
        goTo("gender"); return

      case "gender":
        if (draft.gender === "female") { goTo("female-cycle"); return }
        if (draft.gender === "male") { goTo("male-emission"); return }
        goTo("spiritual-father"); return

      case "female-cycle":
        if (draft.femaleOnMenstrualCycle) {
          goTo("female-bleeding"); return   // still ask about other bleeding even if on cycle
        }
        goTo("female-postpartum"); return

      case "female-postpartum":
        if (draft.femalePostpartumActive) { goTo("female-postpartum-detail"); return }
        goTo("female-bleeding"); return

      case "female-postpartum-detail":
        goTo("female-bleeding"); return

      case "female-bleeding":
        goTo("spiritual-father"); return

      case "male-emission":
        goTo("male-relations"); return

      case "male-relations":
        goTo("spiritual-father"); return

      case "excommunication":
        goTo("last-received"); return

      case "spiritual-father":
        goTo("excommunication"); return

      case "last-received":
        finish(); return
    }
  }

  const finish = () => {
    const profile: CommunionProfile = {
      gender: draft.gender ?? "prefer-not-to-say",
      baptismStatus: draft.baptismStatus ?? "baptized",
      hasSpiritualFather: draft.hasSpiritualFather ?? false,
      lastReceived: draft.lastReceived ?? "one-to-six-months",
      isExcommunicated: draft.isExcommunicated ?? false,
      femaleOnMenstrualCycle: draft.femaleOnMenstrualCycle,
      femalePostpartumActive: draft.femalePostpartumActive,
      femalePostpartumBabyGender: draft.femalePostpartumBabyGender,
      femalePostpartumBirthDate: draft.femalePostpartumBirthDate,
      femaleHasAbnormalBleeding: draft.femaleHasAbnormalBleeding,
      maleHasNocturnalEmission: draft.maleHasNocturnalEmission,
      maleHadConjugalRelations: draft.maleHadConjugalRelations,
    }
    saveProfile(profile)
    onComplete(profile)
  }

  const stepIndex = history.length

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[#d8c395] bg-[linear-gradient(180deg,#fffcf5,#fff8ec)] shadow-[0_30px_80px_-40px_rgba(120,53,15,0.3)] dark:border-amber-500/20 dark:bg-stone-950">
      <div className="h-1.5 w-full bg-gradient-to-r from-[#7c2d12] via-[#d4a84f] to-[#0f766e]" />
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8b6a2b] dark:text-amber-500">Communion Planner</p>
          <h2 className="mt-2 text-2xl font-black text-[#3d2206] dark:text-[#f3e4cd]" style={{ fontFamily: titleSerif }}>
            A few questions before we begin
          </h2>
          <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
            Your answers stay on this device only. They help us show guidance that is truly relevant to where you are.
          </p>
          <div className="mt-4 flex gap-1.5">
            {Array.from({ length: Math.max(stepIndex + 1, 1) }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${i < stepIndex ? "w-4 bg-[#d4a84f] dark:bg-amber-600" : i === stepIndex ? "w-7 bg-[#b45309] dark:bg-amber-500" : "w-3 bg-stone-200 dark:bg-stone-700"}`}
              />
            ))}
          </div>
        </div>

        {/* ── Step: Baptism ─────────────────────────────────────── */}
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

        {/* ── Step: Gender ──────────────────────────────────────── */}
        {step === "gender" && (
          <div className="space-y-3">
            <p className="text-base font-bold text-[#3d2206] dark:text-amber-200">What is your gender?</p>
            <NoteBox>
              The Tewahedo tradition includes specific liturgical guidance for men and women regarding preparation for the Holy Mysteries. Your answer helps us show only what is relevant to you.
            </NoteBox>
            <OptionButton selected={draft.gender === "female"} onClick={() => update({ gender: "female" })}>Female</OptionButton>
            <OptionButton selected={draft.gender === "male"} onClick={() => update({ gender: "male" })}>Male</OptionButton>
            <OptionButton selected={draft.gender === "prefer-not-to-say"} onClick={() => update({ gender: "prefer-not-to-say" })}>
              Prefer not to say
            </OptionButton>
          </div>
        )}

        {/* ── Step: Female — Menstrual Cycle ────────────────────── */}
        {step === "female-cycle" && (
          <div className="space-y-3">
            <p className="text-base font-bold text-[#3d2206] dark:text-amber-200">Are you currently in your menstrual cycle?</p>
            <NoteBox>
              In the Tewahedo tradition, women observe a time of rest from the Holy Mysteries during menstruation (Leviticus 15:19–24). This is a rhythm of reverence, not a judgement of unworthiness. God is not far from you in this season.
            </NoteBox>
            <OptionButton selected={draft.femaleOnMenstrualCycle === false} onClick={() => update({ femaleOnMenstrualCycle: false })}>
              No — I am not currently in my cycle
            </OptionButton>
            <OptionButton selected={draft.femaleOnMenstrualCycle === true} onClick={() => update({ femaleOnMenstrualCycle: true })}>
              Yes — I am currently in my cycle
            </OptionButton>
          </div>
        )}

        {/* ── Step: Female — Postpartum ─────────────────────────── */}
        {step === "female-postpartum" && (
          <div className="space-y-3">
            <p className="text-base font-bold text-[#3d2206] dark:text-amber-200">Have you given birth in the past 80 days?</p>
            <NoteBox>
              The Tewahedo Church observes 40 days of rest after the birth of a son, and 80 days after the birth of a daughter (Leviticus 12:1–8). We will calculate the exact days remaining for you.
            </NoteBox>
            <OptionButton selected={draft.femalePostpartumActive === false} onClick={() => update({ femalePostpartumActive: false })}>
              No — I have not given birth recently
            </OptionButton>
            <OptionButton selected={draft.femalePostpartumActive === true} onClick={() => update({ femalePostpartumActive: true })}>
              Yes — I gave birth within the past 80 days
            </OptionButton>
          </div>
        )}

        {/* ── Step: Female — Postpartum Detail ──────────────────── */}
        {step === "female-postpartum-detail" && (
          <div className="space-y-4">
            <p className="text-base font-bold text-[#3d2206] dark:text-amber-200">Tell us about the birth</p>
            <NoteBox>
              We need the baby&apos;s gender and birth date to calculate the exact number of rest days remaining (40 for a son, 80 for a daughter).
            </NoteBox>
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-600 dark:text-stone-400">Baby&apos;s gender</p>
              <div className="grid grid-cols-2 gap-3">
                <OptionButton selected={draft.femalePostpartumBabyGender === "male"} onClick={() => update({ femalePostpartumBabyGender: "male" })}>
                  Son <span className="block text-[10px] font-normal text-stone-400">40 days rest</span>
                </OptionButton>
                <OptionButton selected={draft.femalePostpartumBabyGender === "female"} onClick={() => update({ femalePostpartumBabyGender: "female" })}>
                  Daughter <span className="block text-[10px] font-normal text-stone-400">80 days rest</span>
                </OptionButton>
              </div>
            </div>
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-600 dark:text-stone-400">Birth date</p>
              <input
                type="date"
                max={format(new Date(), "yyyy-MM-dd")}
                value={draft.femalePostpartumBirthDate ?? ""}
                onChange={(e) => update({ femalePostpartumBirthDate: e.target.value })}
                className="w-full rounded-xl border border-stone-200 bg-white/70 px-4 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:border-stone-700 dark:bg-stone-900/50 dark:text-stone-200"
              />
            </div>
          </div>
        )}

        {/* ── Step: Female — Abnormal Bleeding ─────────────────── */}
        {step === "female-bleeding" && (
          <div className="space-y-3">
            <p className="text-base font-bold text-[#3d2206] dark:text-amber-200">Are you experiencing any unexplained or ongoing vaginal bleeding?</p>
            <NoteBox>
              The Tewahedo tradition applies the same reverence to irregular or ongoing bleeding as to the menstrual cycle (Leviticus 15:25–30). This is a season of rest, not shame. If unsure, consult your spiritual father.
            </NoteBox>
            <OptionButton selected={draft.femaleHasAbnormalBleeding === false} onClick={() => update({ femaleHasAbnormalBleeding: false })}>
              No — I am not experiencing unusual bleeding
            </OptionButton>
            <OptionButton selected={draft.femaleHasAbnormalBleeding === true} onClick={() => update({ femaleHasAbnormalBleeding: true })}>
              Yes — I have ongoing or unexplained bleeding
            </OptionButton>
          </div>
        )}

        {/* ── Step: Male — Nocturnal Emission ──────────────────── */}
        {step === "male-emission" && (
          <div className="space-y-3">
            <p className="text-base font-bold text-[#3d2206] dark:text-amber-200">Have you experienced a nocturnal emission recently?</p>
            <NoteBox>
              The Tewahedo tradition observes a brief period of purification — bathing and morning prayers — before approaching the Holy Mysteries after a nocturnal emission (Leviticus 15:16–17). This is reverence for the Mystery, not shame.
            </NoteBox>
            <OptionButton selected={draft.maleHasNocturnalEmission === false} onClick={() => update({ maleHasNocturnalEmission: false })}>
              No — I have not
            </OptionButton>
            <OptionButton selected={draft.maleHasNocturnalEmission === true} onClick={() => update({ maleHasNocturnalEmission: true })}>
              Yes — I have recently
            </OptionButton>
          </div>
        )}

        {/* ── Step: Male — Conjugal Relations ──────────────────── */}
        {step === "male-relations" && (
          <div className="space-y-3">
            <p className="text-base font-bold text-[#3d2206] dark:text-amber-200">Have you had conjugal relations with your spouse in the past 24 hours?</p>
            <NoteBox>
              The Tewahedo tradition asks spouses to observe a period of abstinence before approaching the Holy Mysteries (1 Corinthians 7:5). This is not a judgement of marriage — it is an elevation of the fast. Consult your spiritual father for the period he prescribes.
            </NoteBox>
            <OptionButton selected={draft.maleHadConjugalRelations === false} onClick={() => update({ maleHadConjugalRelations: false })}>
              No — I have not had conjugal relations in the past 24 hours
            </OptionButton>
            <OptionButton selected={draft.maleHadConjugalRelations === true} onClick={() => update({ maleHadConjugalRelations: true })}>
              Yes — I have had conjugal relations recently
            </OptionButton>
          </div>
        )}

        {/* ── Step: Spiritual Father ────────────────────────────── */}
        {step === "spiritual-father" && (
          <div className="space-y-3">
            <p className="text-base font-bold text-[#3d2206] dark:text-amber-200">Do you have a spiritual father / confessor?</p>
            <NoteBox>
              A spiritual father who hears your confession is the gate of Holy Communion in the Tewahedo tradition. He is not a judge — he is a shepherd. Without him, you navigate alone what God designed to be walked with a guide.
            </NoteBox>
            <OptionButton selected={draft.hasSpiritualFather === true} onClick={() => update({ hasSpiritualFather: true })}>
              Yes — I have a spiritual father
            </OptionButton>
            <OptionButton selected={draft.hasSpiritualFather === false} onClick={() => update({ hasSpiritualFather: false })}>
              Not yet — I do not have one currently
            </OptionButton>
          </div>
        )}

        {/* ── Step: Excommunication ─────────────────────────────── */}
        {step === "excommunication" && (
          <div className="space-y-3">
            <p className="text-base font-bold text-[#3d2206] dark:text-amber-200">Are you currently under any ecclesiastical restriction from your spiritual father or bishop?</p>
            <NoteBox>
              This refers to a formal restriction from receiving the Holy Mysteries placed by a priest or bishop, typically as part of a process of repentance and reconciliation. If you are unsure, choose &ldquo;No.&rdquo;
            </NoteBox>
            <OptionButton selected={draft.isExcommunicated === false} onClick={() => update({ isExcommunicated: false })}>
              No — I am not under any restriction
            </OptionButton>
            <OptionButton selected={draft.isExcommunicated === true} onClick={() => update({ isExcommunicated: true })}>
              Yes — I am currently under an ecclesiastical restriction
            </OptionButton>
          </div>
        )}

        {/* ── Step: Last Received ───────────────────────────────── */}
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
              I have never received Holy Communion
            </OptionButton>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between gap-3">
          {history.length > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-white/70 px-4 py-2.5 text-sm font-semibold text-stone-500 hover:text-stone-700 dark:border-stone-700 dark:bg-stone-900/50 dark:text-stone-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>
          ) : <div />}
          <Button
            type="button"
            onClick={advance}
            disabled={!canAdvance()}
            className="rounded-full bg-gradient-to-r from-[#c86224] to-[#e2a13c] px-6 text-white shadow-[0_14px_30px_-18px_rgba(200,98,36,0.5)] hover:brightness-105 disabled:opacity-40"
          >
            {step === "last-received" ||
             draft.baptismStatus === "not-yet" ||
             draft.baptismStatus === "catechumen"
              ? "See my guidance"
              : "Next"}
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
  eligibility: { canReceive: boolean; reason: string; guidance: string; severity: "blocked" | "caution" | "clear"; daysRemaining?: number }
  onReset: () => void
}) {
  const borderColor =
    eligibility.severity === "blocked"
      ? "border-red-300 dark:border-red-800/40"
      : eligibility.severity === "caution"
        ? "border-amber-300 dark:border-amber-700/40"
        : "border-emerald-300 dark:border-emerald-800/40"
  const bgColor =
    eligibility.severity === "blocked"
      ? "bg-red-50/80 dark:bg-red-950/20"
      : eligibility.severity === "caution"
        ? "bg-amber-50/80 dark:bg-amber-950/20"
        : "bg-emerald-50/80 dark:bg-emerald-950/20"
  const dotColor =
    eligibility.severity === "blocked"
      ? "bg-red-500"
      : eligibility.severity === "caution"
        ? "bg-amber-500"
        : "bg-emerald-500"
  const textColor =
    eligibility.severity === "blocked"
      ? "text-red-800 dark:text-red-300"
      : eligibility.severity === "caution"
        ? "text-amber-800 dark:text-amber-300"
        : "text-emerald-800 dark:text-emerald-300"

  return (
    <div className={`overflow-hidden rounded-[1.75rem] border ${borderColor} ${bgColor} p-5`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${dotColor}`} />
          <div>
            <p className={`text-sm font-bold ${textColor}`}>
              {eligibility.reason}
              {eligibility.daysRemaining !== undefined && eligibility.daysRemaining > 0 && (
                <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                  {eligibility.daysRemaining}d remaining
                </span>
              )}
            </p>
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
