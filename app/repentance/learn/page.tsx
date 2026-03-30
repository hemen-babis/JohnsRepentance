import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { RepentanceSubpageShell } from "../_components/repentance-subpage-shell"
import { landingTeachingSections } from "../_components/shared"

const otScriptures = [
  {
    reference: "Leviticus 5:5–6",
    summary: "The sinner was required to confess his sin before the priest and bring an offering. The priest made atonement for him.",
    quote: "He shall confess that he has sinned in that thing, and he shall bring his trespass offering to the Lord.",
  },
  {
    reference: "Joshua 7:19–20",
    summary: "When Achan sinned and brought disaster on Israel, Joshua said to him:",
    quote: "My son, give glory to the Lord God of Israel, and make confession to Him, and tell me now what you have done; do not hide it from me.",
  },
  {
    reference: "2 Samuel 12",
    summary: "When David committed adultery and murder, the Lord sent Nathan to him. David confessed and received the word of forgiveness:",
    quote: "I have sinned against the Lord. — And Nathan said to David: The Lord also has put away your sin; you shall not die.",
  },
  {
    reference: "Proverbs 28:13",
    summary: "Solomon's summary of the law of repentance:",
    quote: "He who covers his sins will not prosper, but whoever confesses and forsakes them will have mercy.",
  },
]

const ntScriptures = [
  {
    reference: "Matthew 3:5–6",
    summary: "John the Baptist preached repentance and the people came:",
    quote: "Then Jerusalem, all Judea, and all the region around the Jordan went out to him and were baptized by him in the Jordan, confessing their sins.",
  },
  {
    reference: "Luke 15:21",
    summary: "When the prodigal son returned, he did not explain or justify. He confessed:",
    quote: "Father, I have sinned against heaven and in your sight, and am no longer worthy to be called your son.",
  },
  {
    reference: "Acts 19:18",
    summary: "The practice of verbal confession was present from the earliest days of the Church:",
    quote: "And many who had believed came, confessing and telling their deeds.",
  },
  {
    reference: "James 5:16",
    summary: "St. James instructs the Church directly:",
    quote: "Confess your trespasses to one another, and pray for one another, that you may be healed.",
  },
]

export default function RepentanceLearnPage() {
  return (
    <RepentanceSubpageShell
      title="Learn repentance slowly"
      intro="Repentance does not begin when you know everything. It begins when you stop hiding and become honest before God."
      guidance={[
        "Repentance is not pretending, performing, or trying to sound spiritual. It is returning to God with truth — seeing your sin honestly, turning from it, and coming back to Him.",
        "Begin by asking yourself where you have been avoiding truth, excusing sin, or resisting change. That is already the beginning of repentance.",
        "You do not need to solve your whole life first. You need one honest beginning, then another, and then another.",
      ]}
    >
      {/* ── HERO SCRIPTURE ───────────────────────────────────────────── */}
      <div className="mb-10 overflow-hidden rounded-2xl bg-amber-50/70 px-8 py-8 ring-1 ring-amber-200/40 dark:bg-gradient-to-r dark:from-orange-900 dark:via-amber-800 dark:to-orange-900 dark:ring-transparent">
        <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.38em] text-orange-700 dark:text-amber-300">1 John 1:9</div>
        <blockquote className="text-xl font-semibold leading-8 text-stone-900 dark:text-white/90">
          "If we confess our sins, He is faithful and just to forgive us our sins and to cleanse us from all unrighteousness."
        </blockquote>
      </div>

      {/* ── OT + NT scriptures side by side ──────────────────────────── */}
      <div className="mb-10 grid gap-8 lg:grid-cols-2">

        <div>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.32em] text-orange-700">From the Old Testament</p>
          <p className="mb-4 text-xs text-stone-500">Confession was commanded and practiced long before the New Covenant.</p>
          <div className="space-y-3">
            {otScriptures.map((item) => (
              <div
                key={item.reference}
                className="overflow-hidden rounded-2xl bg-amber-50/70 ring-1 ring-amber-200/40 dark:bg-gradient-to-br dark:from-orange-950/50 dark:to-stone-900/80 dark:ring-orange-900/40"
              >
                <div className="px-5 py-5">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-orange-700">{item.reference}</p>
                  <p className="mb-3 text-sm leading-6 text-stone-600 dark:text-stone-300">{item.summary}</p>
                  <blockquote className="border-l-2 border-orange-400 pl-4 text-sm font-medium leading-7 text-stone-800 dark:text-stone-200">
                    "{item.quote}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.32em] text-orange-700">From the New Testament</p>
          <p className="mb-4 text-xs text-stone-500">Christ instituted the sacrament and the early Church practiced it from the beginning.</p>
          <div className="space-y-3">
            {ntScriptures.map((item) => (
              <div
                key={item.reference}
                className="overflow-hidden rounded-2xl bg-amber-50/70 ring-1 ring-amber-200/40 dark:bg-gradient-to-br dark:from-orange-950/50 dark:to-stone-900/80 dark:ring-orange-900/40"
              >
                <div className="px-5 py-5">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-orange-700">{item.reference}</p>
                  <p className="mb-3 text-sm leading-6 text-stone-600 dark:text-stone-300">{item.summary}</p>
                  <blockquote className="border-l-2 border-orange-400 pl-4 text-sm font-medium leading-7 text-stone-800 dark:text-stone-200">
                    "{item.quote}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── FULL TEACHING in 2-col grid ──────────────────────────────── */}
      <div className="mb-10">
        <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.32em] text-orange-700">The Full Teaching</p>
        <div className="grid gap-x-14 gap-y-10 md:grid-cols-2">
          {landingTeachingSections.map((block) => (
            <section key={block.title}>
              <h3 className="text-base font-bold text-stone-950 dark:text-white">{block.title}</h3>
              <div className="my-3 h-0.5 w-8 rounded-full bg-orange-600" />
              <div className="space-y-2">
                {block.content.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-7 text-stone-700 dark:text-stone-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-5 rounded-2xl bg-orange-700 p-8 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-orange-200">When you are ready</p>
          <p className="mt-2 text-lg leading-7 text-white/90">
            Move into the full preparation guide to examine your conscience and prepare your confession notes.
          </p>
        </div>
        <Link
          href="/repentance/prepare"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-orange-800 shadow-[0_4px_16px_rgba(0,0,0,0.18)] hover:bg-amber-50"
        >
          Begin preparation
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </RepentanceSubpageShell>
  )
}
