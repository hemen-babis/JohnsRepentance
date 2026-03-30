import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { RepentanceSubpageShell } from "../_components/repentance-subpage-shell"

const practicalSteps = [
  {
    step: "01",
    title: "Pray before you search",
    body: "Ask God honestly: guide me to a faithful priest I can speak to truthfully. This is not a transaction. It is a request from a child to a Father.",
  },
  {
    step: "02",
    title: "Attend liturgy regularly",
    body: "Show up to a parish. Watch how priests serve, listen to how they teach, and pay attention to whether they point you toward Christ.",
  },
  {
    step: "03",
    title: "Keep the first meeting simple",
    body: "You do not need an impressive introduction. Say: Father, I want to start confession. Can you guide me? That is enough. The right priest will receive that.",
  },
  {
    step: "04",
    title: "Do not wait for perfect clarity",
    body: "You may not feel certain on the first meeting. Begin faithfully. A spiritual relationship is built over time through honesty, not found fully formed on day one.",
  },
]

const fatherQualities = [
  {
    title: "He is spiritually close to God",
    body: "He prays for his children and pleads with God on their behalf. His spirituality is what enables him to guide — not just his knowledge.",
  },
  {
    title: "He listens without judging",
    body: "He is able to bear the weakness of the weak, accept their confession, and listen to their sins without despising or condemning them. He gives the person enough space to say everything they need to say.",
  },
  {
    title: "He speaks the truth",
    body: "He is not afraid to rebuke the sinner or speak difficult things, regardless of who they are. He is strict with sin, not with the person — like a physician who loves the patient but hates the disease.",
  },
  {
    title: "He keeps absolute confidence",
    body: "He is honest with people's secrets, not revealing them to anyone for any reason. Church law strictly forbids a priest from revealing what is confessed to him.",
  },
  {
    title: "He gives freedom, not control",
    body: "If you do not feel at peace confessing to him and need to change, he must not forbid you. A good father understands that forced obedience can cause a person to stop confessing entirely.",
  },
  {
    title: "He imitates St. Paul",
    body: "\"My little children, for whom I labor in birth again until Christ is formed in you\" (Galatians 4:19). He labors for his children until they become true Christians in their virtues and manner of life.",
  },
]

const faq = [
  {
    question: "Why do I need a priest? Can't I confess to God directly?",
    answer: [
      "You do confess to God. Repentance begins in your heart through honesty, prayer, and turning back to Him.",
      "But Christ did not leave us alone. He established the Church as a spiritual hospital and gave His apostles authority to forgive and guide: \"If you forgive the sins of any, they are forgiven them\" (John 20:23).",
      "The Spiritual Father does not replace God. He is a witness, a guide, and a servant of the sacrament.",
    ],
  },
  {
    question: "Why is verbal confession to a priest necessary?",
    answer: [
      "How can a judge decide a sentence if he is not aware of the case details? The authority given to priests to forgive or retain sins requires that sins be made known.",
      "Confession also brings healing, guidance, and clarity. It is easy to excuse ourselves when we stay alone with our sins. Bringing them into the light helps us stop hiding and begin changing.",
    ],
  },
  {
    question: "What if I feel ashamed or the priest judges me?",
    answer: [
      "Everyone feels this. Shame is often what keeps people stuck.",
      "A true Spiritual Father is not there to expose you. He is there to help you return to God with honesty and peace. He is a physician who loves the patient and treats the wound — not a spectator.",
    ],
  },
]

export default function RepentanceNoFatherPage() {
  return (
    <RepentanceSubpageShell
      title="If you do not have a confession father yet"
      intro="You do not need to wait to begin. Start with honest prayer, then take the next practical step toward a priest."
      guidance={[
        "Ask God to guide you to a faithful priest you can speak to honestly. You are not asking for a perfect man. You are asking for a steady Spiritual Father.",
        "When you are ready, keep it simple: Father, I want to start confession. Can you guide me? That is enough.",
        "Do not delay because you are trying to choose perfectly. Begin faithfully, and clarity often comes after obedience.",
      ]}
    >
      {/* ── STEPS + QUALITIES side by side ───────────────────────────── */}
      <div className="mb-10 grid gap-8 lg:grid-cols-2">

        {/* practical steps */}
        <div>
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.32em] text-orange-700">Practical Steps</p>
          <div className="space-y-3">
            {practicalSteps.map((item) => (
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

        {/* father qualities */}
        <div>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.32em] text-orange-700">What a true confession father looks like</p>
          <p className="mb-4 text-xs text-stone-500">From the Ethiopian Orthodox Tewahedo teaching on the necessary conditions for a confession father.</p>
          <div className="space-y-3">
            {fatherQualities.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-amber-50/70 px-5 py-4 ring-1 ring-amber-200/40 dark:bg-gradient-to-br dark:from-orange-950/50 dark:to-stone-900/80 dark:ring-orange-900/40"
              >
                <h3 className="font-bold text-stone-950 dark:text-white">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-stone-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── FAQ in 2-col grid ─────────────────────────────────────────── */}
      <div className="mb-10">
        <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.32em] text-orange-700">Common Questions</p>
        <div className="grid gap-4 md:grid-cols-3">
          {faq.map((item) => (
            <div
              key={item.question}
              className="rounded-xl bg-amber-50/70 p-6 ring-1 ring-amber-200/40 dark:bg-gradient-to-br dark:from-orange-950/50 dark:to-stone-900/80 dark:ring-orange-900/40"
            >
              <h3 className="font-bold text-stone-950 dark:text-white">{item.question}</h3>
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

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-5 rounded-2xl bg-orange-700 p-8 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-orange-200">Connect with a priest</p>
          <p className="mt-2 text-lg leading-7 text-white/90">
            If you would like help finding a spiritual father, reach out through our community.
          </p>
        </div>
        <Link
          href="/join"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-orange-800 shadow-[0_4px_16px_rgba(0,0,0,0.18)] hover:bg-amber-50"
        >
          Talk to a priest
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </RepentanceSubpageShell>
  )
}
