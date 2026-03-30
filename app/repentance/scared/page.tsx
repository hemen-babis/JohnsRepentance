import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { RepentanceSubpageShell } from "../_components/repentance-subpage-shell"

const truthsAboutFear = [
  {
    title: "Fear is not a sign you are too far gone",
    body: "The fact that you feel fear means you still care. It means your conscience is alive. The person who feels nothing has a harder road than the one who is afraid.",
  },
  {
    title: "The priest has heard worse",
    body: "Whatever you believe you have done, a faithful Spiritual Father has sat with human beings who have done terrible things and walked them back to God. You are not a unique case. You are a person who needs healing.",
  },
  {
    title: "Shame keeps you trapped, not safe",
    body: "Hiding feels like protection, but it only hardens the wound. A secret sin you carry alone grows heavier. A sin brought into the light in front of a faithful priest becomes something God can work with.",
  },
  {
    title: "You do not have to explain everything at once",
    body: "You can begin with one sentence. Father, I am afraid, but I want to confess. The priest will guide you from there. You do not carry the weight of performing a perfect confession.",
  },
]

const scriptures = [
  {
    reference: "Psalm 34:18",
    text: "The Lord is near to the brokenhearted and saves the crushed in spirit.",
  },
  {
    reference: "1 John 1:9",
    text: "If we confess our sins, He is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.",
  },
  {
    reference: "Isaiah 1:18",
    text: "Come now, let us reason together, says the Lord: though your sins are like scarlet, they shall be as white as snow.",
  },
]

const storyParagraphs = [
  "I am a sinner. Quite easily, I fall into the sin of fornication and greatly enjoy it. I feel as though it is the most pleasurable feeling ever.",
  "I met a holy hieromonk who encouraged me to repent and confess my sins. Initially, I thought the meeting was a coincidence, but now, I realize it was by the grace of God.",
  "When he encouraged me to confess, I looked at him with derision and mockingly responded, \"What will confession do? Will it give me the same sensual pleasure I get from sex? Father, you have not experienced this pleasure, so you don't understand and are now asking me to confess. Sorry, but no thanks.\"",
  "The priest calmly answered, \"Come, repent and confess, and I promise that I will not force you away from your pleasures. Just as long as you come and confess every week.\"",
  "\"Hmm,\" I thought, \"this priest seems friendly and kind. Why not? I'll just go and chat with him as long as he keeps his promise not to deprive me from my greatest pleasure.\" I found myself going to see him every week at church, albeit somewhat reluctantly.",
  "Whenever he saw me, he smiled and said, \"Bravo, my son, you have actually come!\" Immediately, I would say, \"I have committed fornication.\" With kindness, he gazed upon me and said, \"God will forgive you every time you come to confess your sins.\"",
  "Without fail, these visits continued weekly without my realizing what was going on. After every visit, it seemed harder for me to fall into this sin, even though I was entirely willing. What used to be easy became complicated and I found myself quite frustrated as a result.",
  "One week, during my visit with the holy father, I even complained that I wasn't able to commit the sins I had in mind. He looked at me with kindness and said, \"I will pray that things might improve for you.\" I was shocked. Did he really love me so much that he would pray for such a thing? What a strange, yet wonderful, father!",
  "I again tried to sin, but my plans were utterly confused. Nothing worked. I felt humiliated and depressed.",
  "When I visited the holy father the next week, I angrily reproached him, because either his prayers were not working or he had simply tricked me. With calmness, he asked, \"What happened?\" I complained freely about my woes and how I could not even sleep because of my frustration. He smiled and invited me to do exactly as he did.",
  "We stood before the Holy Altar as he began to prostrate himself and rise, offering a metanoia, while repeatedly praying \"Lord have mercy\" for 30 minutes. I could only stand there and watch with surprise. When he was finished, he sincerely said, \"May God forgive us both\" before he prayed the Absolution over me.",
  "That night, I slept peacefully with no cares whatsoever. Suddenly, in a dream, I saw an old man surrounded by ineffable light who said to me, \"Today, you witnessed the holy father prostrate himself in prayer repeatedly for your sake. Until now, he has not taken even a moment of rest on behalf of your sins, but rather, he weeps for you continually throughout the night. Enough! Repent!\"",
  "All at once, I arose — but it was not just waking up from sleep, it was waking up from my sin. This was the end of my sensual living. I resolved, with God's help, never to return to this sin again, and immediately, I felt my heart to be once again pure. My genuine repentance came through the suffering of that beloved holy father who loved me so much that he offered himself for me.",
]

export default function RepentanceScaredPage() {
  return (
    <RepentanceSubpageShell
      title="If you are scared to confess"
      intro="Fear is common. Confession feels heavy because it asks for truth. But fear does not mean you should stay away."
      guidance={[
        "A true Spiritual Father is not waiting to shame you. He is there to help you bring what is hidden into the light so healing can begin.",
        "If you do not know how to start, begin with one sentence: Father, I am afraid, but I want to confess. That is already an honest beginning.",
        "Waiting usually does not make confession easier. It only makes the weight heavier. Start small, but start truthfully.",
      ]}
    >
      {/* ── SCRIPTURE + TRUTHS side by side ──────────────────────────── */}
      <div className="mb-10 grid gap-6 lg:grid-cols-2">

        {/* scriptures */}
        <div>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.32em] text-orange-700">What God says about returning</p>
          <div className="space-y-3">
            {scriptures.map((item) => (
              <div
                key={item.reference}
                className="rounded-2xl bg-amber-50/70 px-6 py-5 ring-1 ring-amber-200/40 dark:bg-gradient-to-r dark:from-orange-950 dark:to-stone-900 dark:ring-transparent"
              >
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-orange-700 dark:text-amber-400">{item.reference}</p>
                <blockquote className="text-base font-medium leading-7 text-stone-800 dark:text-white/90">
                  "{item.text}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* truths */}
        <div>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.32em] text-orange-700">Truths that help</p>
          <div className="space-y-3">
            {truthsAboutFear.map((item) => (
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

      {/* ── STORY + OPENING SCRIPT side by side ──────────────────────── */}
      <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_320px]">

        {/* story */}
        <div>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.32em] text-orange-700">A True Story</p>
          <p className="mb-4 text-xs text-stone-500">Adapted from <span className="font-semibold text-stone-600">The Significance of Repentance</span> by Fr. Youssef Asaad</p>

          <div className="overflow-hidden rounded-2xl bg-amber-50/70 ring-1 ring-amber-200/40 dark:bg-gradient-to-br dark:from-orange-950/50 dark:to-stone-900/80 dark:ring-orange-900/40">
            <div className="space-y-4 px-6 py-6">
              {storyParagraphs.map((paragraph, i) => (
                <p key={i} className="text-sm leading-7 text-stone-700 dark:text-stone-300">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* closing quote */}
            <div className="border-t border-amber-200/60 bg-orange-100/60 px-6 py-6 dark:border-orange-900/40 dark:bg-orange-900/90">
              <blockquote className="text-base font-semibold leading-7 text-stone-900 dark:text-white">
                "Greater love has no man than this, that a man lay down his life for his friends."
              </blockquote>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.3em] text-orange-700 dark:text-amber-300">John 15:13</p>
            </div>

            {/* Fr. Matthew the Poor */}
            <div className="border-t border-amber-200/60 px-6 py-5 dark:border-orange-900/40">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-orange-700 dark:text-amber-400">Fr. Matthew the Poor</p>
              <p className="text-sm leading-7 text-stone-600 dark:text-stone-400">
                Prayer reaches its true purity when we comprehensively and purposefully forget ourselves, in our willingness to be concerned for others, their problems and their salvation. The degree of perfection in pure prayer is in proportion to its perfection of love. In the ultimate state of perfection love <span className="font-semibold">"seeks not her own"</span> (1 Cor 13:5).
              </p>
            </div>

            <div className="border-t border-amber-200/60 bg-stone-50/60 px-6 py-5 dark:border-orange-900/40 dark:bg-stone-900/40">
              <p className="text-sm leading-7 text-stone-600 dark:text-stone-400">
                Here I am, dear Lord, sinful and sorrowful, asking for your forgiveness, through the prayers of my pious and loving father, who suffered a great deal for my sake. Have mercy upon me.
              </p>
            </div>
          </div>
        </div>

        {/* sticky sidebar */}
        <div className="space-y-4 lg:sticky lg:top-8 lg:self-start">

          {/* opening script */}
          <div className="rounded-2xl bg-orange-700 px-6 py-6 text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-200">If you do not know how to start</p>
            <p className="mt-3 text-lg font-semibold leading-7 text-white">
              "Father, I am afraid, but I want to confess."
            </p>
            <p className="mt-2 text-xs leading-5 text-white/70">
              Those eight words are enough. A good priest will meet you there and help you go further.
            </p>
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-amber-50/70 p-6 ring-1 ring-amber-200/40 dark:bg-stone-900 dark:ring-transparent">
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-orange-700 dark:text-amber-400">When you are ready</p>
            <p className="mt-2 text-sm leading-6 text-stone-700 dark:text-white/85">
              Use the preparation guide to examine your conscience before you go. It will help you find the words.
            </p>
            <Link
              href="/repentance/prepare"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-800"
            >
              Prepare my confession
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>
      </div>

    </RepentanceSubpageShell>
  )
}
