import { RepentanceSubpageShell } from "../_components/repentance-subpage-shell"
import { ConfessionPrepGuide } from "../_components/confession-prep-guide"

const beforeSteps = [
  {
    step: "01",
    title: "Sit with yourself first",
    body: "Examine yourself very carefully before going to confession. Start with a short prayer asking God to help reveal your sins, as Jeremiah said: \"The heart is deceitful above all things, and desperately wicked. Who can know it? I, the Lord, search the heart\" (Jeremiah 17:9–10).",
  },
  {
    step: "02",
    title: "Write down your sins",
    body: "Write down all sins committed, in a way only you can understand. The wisdom behind writing is so you do not forget during confession. Include sins committed, thoughts that need guidance, and questions for your spiritual father.",
  },
  {
    step: "03",
    title: "Pray before you go",
    body: "After preparing your notes, pray before God in your private room, mentioning every sin and pleading for forgiveness and the power to abandon them.",
  },
  {
    step: "04",
    title: "Pour out your heart",
    body: "Jeremiah speaks to the soul: \"Pour out your heart like water before the face of the Lord\" (Lamentations 2:19). When water is poured, it leaves no trace. Pour everything out — nothing held back.",
  },
]

const duringSteps = [
  "Begin with the more serious sins, followed by the less grievous.",
  "Do not justify yourself or blame others. Confession is about owning what is true.",
  "Be concise. Speak clearly, not with unnecessary stories or self-justification.",
  "If the priest asks about certain points, answer honestly — it is for your own healing.",
  "Be mindful of the reverence of the sacrament. You are in the presence of the Holy Spirit.",
  "Receive the priest's counsel as medicine for the soul, not as condemnation.",
]

const afterSteps = [
  "Pray the Thanksgiving Prayer After Confession (found at the end of the Agbia).",
  "Obey the advice and guidance of the confession father — regarding penance and spiritual exercises.",
  "Receive the Holy Communion as soon as possible after absolution.",
  "Be watchful over your spiritual life. Do not willingly return to sin.",
  "As St. Basil said: \"As we bear the scalpel of the physician to remedy the body, so we must bear the suffering of rebuke so that the soul may be remedied from its sins.\"",
]

export default function RepentancePreparePage() {
  return (
    <RepentanceSubpageShell
      title="Prepare your confession"
      intro="Before confession, sit with yourself honestly. Ask God to reveal your sins, write them down, and do not blame others."
      guidance={[
        "This is not about performing well. It is about naming what is true before God. Confession must not exceed one month — delaying encourages negligence and forgetting.",
        "When a sentence in the scanner below applies to you, pause and write what happened in your own words. That is how you turn reflection into confession.",
        "Take your notes with you if they help. You do not need perfect words. You need honesty. As Solomon said: \"He who covers his sins will not prosper, but whoever confesses and forsakes them will have mercy\" (Proverbs 28:13).",
      ]}
    >
      {/* ── BEFORE + DURING + AFTER ──────────────────────────────────── */}
      <div className="mb-10 grid gap-10 lg:grid-cols-[1fr_1fr]">

        {/* before steps */}
        <div>
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.32em] text-orange-700">Before Confession</p>
          <div className="space-y-3">
            {beforeSteps.map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-4 rounded-2xl bg-amber-50/70 px-5 py-5 ring-1 ring-amber-200/40 dark:bg-gradient-to-br dark:from-orange-950/50 dark:to-stone-900/80 dark:ring-orange-900/40"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-700 text-sm font-black text-white shadow-[0_4px_12px_rgba(154,52,18,0.35)]">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-bold text-stone-950 dark:text-white">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-stone-400">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* during + after as plain numbered lists */}
        <div className="space-y-10">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.32em] text-orange-700">During Confession</p>
            <div className="space-y-3">
              {duringSteps.map((item, i) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-700 text-[10px] font-black text-white">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-7 text-stone-700 dark:text-stone-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.32em] text-orange-700">After Confession</p>
            <div className="space-y-3">
              {afterSteps.map((item, i) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stone-600 text-[10px] font-black text-white">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-7 text-stone-700 dark:text-stone-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ── CONSCIENCE SCANNER ───────────────────────────────────────── */}
      <div className="mb-10">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.32em] text-orange-700">Conscience Scanner</p>
        <p className="mb-5 text-sm text-stone-500">Work through the four areas slowly. Mark what is true. Write the details.</p>
        <ConfessionPrepGuide />
      </div>

      {/* ── CLOSING SCRIPTURE ────────────────────────────────────────── */}
      <div className="rounded-2xl bg-orange-700 px-8 py-7 text-white">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-200">Matthew 11:28</p>
        <blockquote className="mt-3 text-xl font-semibold leading-8 text-white">
          "Come to Me, all you who labor and are heavy laden, and I will give you rest."
        </blockquote>
      </div>
    </RepentanceSubpageShell>
  )
}
