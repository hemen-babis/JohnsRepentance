import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import type { ReactNode } from "react"
import { ArrowLeft, ArrowRight, BookMarked, CheckCircle2, Compass, Crown, ScrollText, Sparkles, Target } from "lucide-react"
import { CreedReader } from "@/components/catechumen/creed-reader"
import { LessonActions } from "@/components/catechumen/lesson-actions"
import { LessonModuleShell } from "@/components/catechumen/lesson-module-shell"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  anointingTeachingSections,
  baptismTeachingSections,
  bibliographySections,
  catechumenLessons,
  catechumenLessonQuizzes,
  catechumenLessonRecaps,
  catechumenMemoryVerses,
  churchTeachingSections,
  christologyTeachingSections,
  confirmationTeachingSections,
  creedExplanationSections,
  eucharistTeachingSections,
  fastingTeachingSections,
  fivePillarsBaptismSections,
  fivePillarsCommunionSections,
  fivePillarsIncarnationSections,
  fivePillarsResurrectionSections,
  fivePillarsTrinitySections,
  getLessonBySlug,
  historyLessonConclusion,
  historyTeachingSections,
  jesusLetterSections,
  matrimonyTeachingSections,
  priesthoodTeachingSections,
  repentanceTeachingSections,
  sacramentQna,
  sacramentTeachingSections,
  saintsTeachingSections,
  salvationTeachingSections,
  trinityCatechism,
  trinityTeachingSections,
  worksTeachingSections,
} from "@/lib/catechumen-data"

function isGospelReference(reference: string) {
  return /\b(Mt|Matt|Matthew|Mk|Mark|Lk|Luke|Jn|John)\b/i.test(reference)
}

function renderRichParagraph(paragraph: string): ReactNode {
  const parts: ReactNode[] = []
  const regex = /“([^”]+)”(\s*\(([^)]+)\))?/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(paragraph)) !== null) {
    if (match.index > lastIndex) {
      parts.push(paragraph.slice(lastIndex, match.index))
    }

    const verseText = match[1]
    const verseRef = match[3] ?? ""
    const isGospel = isGospelReference(verseRef)

    parts.push(
      <span
        key={`${match.index}-${verseText}`}
        className={isGospel ? "font-semibold text-red-700 dark:text-red-400" : "font-semibold text-stone-900 dark:text-stone-100"}
      >
        “{verseText}”
        {verseRef ? <span className="font-bold"> ({verseRef})</span> : null}
      </span>,
    )

    lastIndex = regex.lastIndex
  }

  if (lastIndex < paragraph.length) {
    parts.push(paragraph.slice(lastIndex))
  }

  return parts.length > 0 ? parts : paragraph
}

function renderLessonParagraph(paragraph: string) {
  const orderedMatch = paragraph.match(/^(\d+\.)\s+(.*)$/)
  const alphaMatch = paragraph.match(/^([a-z]\))\s+(.*)$/i)

  if (orderedMatch) {
    return (
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex min-w-[2.1rem] items-center justify-center rounded-full bg-amber-100 px-2 py-1 text-xs font-bold text-orange-800 dark:bg-orange-950/50 dark:text-amber-300">
          {orderedMatch[1]}
        </span>
        <p className="flex-1 text-[1.02rem] leading-8 text-stone-700 dark:text-stone-300">{renderRichParagraph(orderedMatch[2])}</p>
      </div>
    )
  }

  if (alphaMatch) {
    return (
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex min-w-[2.1rem] items-center justify-center rounded-full border border-amber-200/80 bg-white/80 px-2 py-1 text-xs font-bold uppercase text-orange-700 dark:border-orange-900/40 dark:bg-stone-900/60 dark:text-amber-300">
          {alphaMatch[1]}
        </span>
        <p className="flex-1 text-[1.02rem] leading-8 text-stone-700 dark:text-stone-300">{renderRichParagraph(alphaMatch[2])}</p>
      </div>
    )
  }

  return <p className="text-[1.02rem] leading-8 text-stone-700 dark:text-stone-300">{renderRichParagraph(paragraph)}</p>
}

function normalizeHeadingText(value: string) {
  return value
    .toLowerCase()
    .replace(/[“”"'`]/g, "")
    .replace(/[()]/g, "")
    .replace(/\b[i,v,x]+\b$/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

function LessonSectionCard({
  title,
  paragraphs,
  index,
}: {
  title: string
  paragraphs: string[]
  index: number
}) {
  const visibleParagraphs =
    paragraphs.length > 0 && normalizeHeadingText(paragraphs[0]) === normalizeHeadingText(title)
      ? paragraphs.slice(1)
      : paragraphs

  return (
    <section
      id={sectionAnchorId(title)}
      className="group relative overflow-hidden rounded-[1.75rem] border border-amber-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(255,248,237,0.94))] p-6 shadow-[0_20px_55px_-34px_rgba(120,53,15,0.26)] transition-colors dark:border-orange-900/30 dark:bg-[linear-gradient(180deg,rgba(34,24,19,0.96),rgba(26,18,14,0.94))] md:p-7"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />
      <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-amber-200/20 blur-3xl dark:bg-orange-500/10" />

      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-sm font-bold text-white shadow-[0_10px_28px_-16px_rgba(120,53,15,0.55)]">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-orange-700/80 dark:text-amber-400/80">
            Lesson Section
          </p>
          <h3 className="mt-2 text-[1.45rem] font-semibold leading-tight tracking-tight text-stone-900 dark:text-white md:text-[1.6rem]">
            {title}
          </h3>
        </div>
      </div>

      <div className="mt-5 space-y-4 border-t border-amber-100/80 pt-5 dark:border-orange-900/30">
        {visibleParagraphs.map((paragraph) => (
          <div key={paragraph}>{renderLessonParagraph(paragraph)}</div>
        ))}
      </div>
    </section>
  )
}

function sectionAnchorId(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export function generateStaticParams() {
  return catechumenLessons.map((lesson) => ({ slug: lesson.slug }))
}

export default async function CatechumenLessonPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const lesson = getLessonBySlug(slug)

  if (!lesson) {
    notFound()
  }

  const previousLesson = catechumenLessons[lesson.id - 2] ?? null
  const nextLesson = catechumenLessons[lesson.id] ?? null
  const isHistoryLesson = lesson.slug === "history-of-the-church"
  const isCreedLesson = lesson.slug === "orthodox-creed"
  const isChurchLesson = lesson.slug === "ethiopian-orthodox-tewahedo-church"
  const isTrinityLesson = lesson.slug === "trinity-of-god"
  const isChristologyLesson = lesson.slug === "nature-of-our-lord-jesus-christ"
  const isFivePillarsTrinityLesson = lesson.slug === "five-pillars-trinity"
  const isFivePillarsIncarnationLesson = lesson.slug === "five-pillars-incarnation"
  const isFivePillarsBaptismLesson = lesson.slug === "five-pillars-baptism"
  const isFivePillarsCommunionLesson = lesson.slug === "five-pillars-holy-communion"
  const isFivePillarsResurrectionLesson = lesson.slug === "five-pillars-resurrection"
  const isSacramentLesson = lesson.slug === "what-is-a-sacrament"
  const isBaptismLesson = lesson.slug === "sacrament-of-baptism"
  const isConfirmationLesson = lesson.slug === "sacrament-of-confirmation"
  const isRepentanceLesson = lesson.slug === "sacrament-of-repentance-confession"
  const isEucharistLesson = lesson.slug === "sacrament-of-eucharist"
  const isPriesthoodLesson = lesson.slug === "sacrament-of-priesthood"
  const isAnointingLesson = lesson.slug === "sacrament-of-anointing-of-the-sick"
  const isMatrimonyLesson = lesson.slug === "sacrament-of-matrimony"
  const isSalvationLesson = lesson.slug === "salvation-in-the-orthodox-concept"
  const isSaintsLesson = lesson.slug === "saints-intercession-veneration"
  const isFastingLesson = lesson.slug === "fasting"
  const isWorksLesson = lesson.slug === "works-and-faith"
  const isBibliographyLesson = lesson.slug === "bibliography"
  const isJesusLetterLesson = lesson.slug === "letter-from-our-lord-jesus-christ"
  const learningGoals = isChurchLesson
    ? [
        "See where the Ethiopian Orthodox Church begins",
        "Follow the main stages of the Church's history",
        "Understand why this history matters for catechumens",
      ]
    : isCreedLesson
      ? [
          "Read the Creed clearly",
          "Switch between English and Amharic",
          "Understand the main teachings inside the Creed",
        ]
      : isHistoryLesson
        ? [
            "Understand why Chalcedon matters in the history of the churches",
            "Identify where the Ethiopian Orthodox Tewahedo Church stands among the major church families",
            "Use the diagrams to explain the difference between Oriental Orthodox, Eastern Orthodox, and Roman Catholic traditions",
          ]
        : isTrinityLesson
          ? [
              "Learn what the Church means by one God in three Persons",
              "See how the Trinity is known by divine revelation",
              "Understand why this mystery matters in worship and faith",
            ]
          : isFivePillarsTrinityLesson
            ? [
                "See why the Trinity is the first pillar of mystery",
                "Learn how the Church speaks of three Persons and one essence",
                "Review the main scriptural foundations named in the lesson",
              ]
            : isFivePillarsIncarnationLesson
              ? [
                  "Understand the Incarnation as the second pillar of mystery",
                  "See why the Son took flesh for our salvation",
                  "Learn how the lesson speaks of Christ's one incarnate nature",
                ]
              : isFivePillarsBaptismLesson
                ? [
                    "Understand baptism as remission, adoption, and new birth",
                    "See the prophecies and symbols connected to baptism",
                    "Learn how the Church applies this mystery in practice",
                  ]
                : isFivePillarsCommunionLesson
                  ? [
                      "Understand Holy Communion as real participation in Christ",
                      "Review the prophecies and symbols named in the lesson",
                      "See why the Church teaches the real flesh and blood of Christ",
                    ]
                  : isFivePillarsResurrectionLesson
                    ? [
                        "Understand resurrection as the fifth pillar of mystery",
                        "Review the Church's teaching on life after death and judgment",
                        "See how the resurrection of Christ grounds our own resurrection",
                      ]
          : isChristologyLesson
          ? [
              "Understand the Tewahedo teaching about Christ",
              "Learn what hypostatic union means",
              "See why the Church rejects confusion and separation alike",
            ]
          : isSacramentLesson
            ? [
                "Understand what the Church means by sacrament or mystery",
                "See how sacraments communicate grace through visible signs",
                "Learn the seven holy sacraments in their proper place",
              ]
            : isBaptismLesson
              ? [
                  "See why baptism is the door into the Church",
                  "Understand baptism as death and resurrection with Christ",
                  "Learn why the Church baptizes by immersion, including infants",
                ]
              : isConfirmationLesson
                ? [
                    "Understand confirmation as the gift of the Holy Spirit",
                    "See how it relates to baptism without being the same thing",
                    "Learn why the Church confirms immediately after baptism",
                  ]
                : isRepentanceLesson
                  ? [
                      "See confession as healing after baptism",
                      "Understand the scriptural roots of confession",
                      "Learn what makes confession honest and fruitful",
                    ]
                  : isEucharistLesson
                    ? [
                        "Understand the Eucharist as the true Body and Blood of Christ",
                        "Learn why the Church confesses the real presence and Eucharistic sacrifice",
                        "See why worthy communion matters deeply",
                      ]
                    : isPriesthoodLesson
                      ? [
                          "Understand priesthood as ordination through laying on of hands",
                          "Learn the ranks of deacons, priests, and bishops",
                          "See Christ as the model and source of priestly service",
                        ]
                      : isAnointingLesson
                        ? [
                            "Understand the anointing of the sick as a sacrament of healing",
                            "See its scriptural roots in apostolic practice",
                            "Learn how the Church uses it pastorally in illness and Lent",
                          ]
                        : isMatrimonyLesson
                          ? [
                              "Understand marriage as a sacrament and mystery",
                              "See how marriage reflects Christ and the Church",
                              "Learn the goal and discipline of Orthodox marriage",
                            ]
                          : isSalvationLesson
                            ? [
                                "Understand salvation through the blood of Christ",
                                "See the sacraments and struggle within salvation",
                                "Learn why salvation is the story of the whole life",
                              ]
                            : isSaintsLesson
                              ? [
                                  "See why the Church honors saints without replacing Christ",
                                  "Learn the biblical basis for intercession",
                                  "Understand veneration, relics, and the communion of saints",
                                ]
                              : isFastingLesson
                                ? [
                                    "Understand fasting as worship and discipline",
                                    "Learn the Church's fasting practice and seasons",
                                    "See the biblical basis for Christian fasting",
                                  ]
                                : isWorksLesson
                                  ? [
                                      "See why faith and works are not separated",
                                      "Learn how the lesson defines good and evil deeds",
                                      "Understand the place of grace in obedience",
                                    ]
                                  : isBibliographyLesson
                                    ? [
                                        "See the main source list behind the guide",
                                        "Use the bibliography for deeper follow-up reading",
                                        "Keep the catechumen path connected to its source material",
                                      ]
                                    : isJesusLetterLesson
                                      ? [
                                          "Read the guide's closing devotional letter",
                                          "Hear the personal tone of invitation in the closing page",
                                          "End the catechumen reading path with reflection, not only information",
                                        ]
            : [
            "Read the lesson in a clear order",
            "Understand the main teaching",
            "Leave ready for the next lesson",
          ]
  const lessonParts = isChurchLesson
    ? churchTeachingSections.map((section) => section.title)
    : isCreedLesson
      ? ["The Orthodox Creed", ...creedExplanationSections.map((section) => section.title)]
      : isTrinityLesson
      ? ["Catechumen Questions", ...trinityTeachingSections.map((section) => section.title)]
      : isFivePillarsTrinityLesson
        ? fivePillarsTrinitySections.map((section) => section.title)
        : isFivePillarsIncarnationLesson
          ? fivePillarsIncarnationSections.map((section) => section.title)
          : isFivePillarsBaptismLesson
            ? fivePillarsBaptismSections.map((section) => section.title)
            : isFivePillarsCommunionLesson
              ? fivePillarsCommunionSections.map((section) => section.title)
              : isFivePillarsResurrectionLesson
                ? fivePillarsResurrectionSections.map((section) => section.title)
      : isChristologyLesson
          ? christologyTeachingSections.map((section) => section.title)
          : isSacramentLesson
            ? [...sacramentTeachingSections.map((section) => section.title), "Question and answer"]
            : isBaptismLesson
              ? baptismTeachingSections.map((section) => section.title)
              : isConfirmationLesson
                ? confirmationTeachingSections.map((section) => section.title)
                : isRepentanceLesson
                  ? repentanceTeachingSections.map((section) => section.title)
                  : isEucharistLesson
                    ? eucharistTeachingSections.map((section) => section.title)
                    : isPriesthoodLesson
                      ? priesthoodTeachingSections.map((section) => section.title)
                      : isAnointingLesson
                        ? anointingTeachingSections.map((section) => section.title)
                        : isMatrimonyLesson
                          ? matrimonyTeachingSections.map((section) => section.title)
                          : isSalvationLesson
                            ? salvationTeachingSections.map((section) => section.title)
                            : isSaintsLesson
                              ? saintsTeachingSections.map((section) => section.title)
                              : isFastingLesson
                                ? fastingTeachingSections.map((section) => section.title)
                                : isWorksLesson
                                  ? worksTeachingSections.map((section) => section.title)
                                  : isBibliographyLesson
                                    ? bibliographySections.map((section) => section.title)
                                    : isJesusLetterLesson
                                      ? jesusLetterSections.map((section) => section.title)
                  : isHistoryLesson
                    ? historyTeachingSections.map((section) => section.title)
                    : ["Overview", "Why this matters", "How to approach it"]
  const lessonProgress = Math.round((lesson.id / catechumenLessons.length) * 100)
  const recapPoints = catechumenLessonRecaps[lesson.slug] ?? learningGoals
  const quizQuestions = catechumenLessonQuizzes[lesson.slug] ?? []
  const requiresQuizGate = quizQuestions.length > 0
  const memoryVerse = catechumenMemoryVerses[lesson.slug]
  const genericTeachingSections =
    isChurchLesson ? churchTeachingSections
    : isHistoryLesson ? historyTeachingSections
    : isFivePillarsTrinityLesson ? fivePillarsTrinitySections
    : isFivePillarsIncarnationLesson ? fivePillarsIncarnationSections
    : isFivePillarsBaptismLesson ? fivePillarsBaptismSections
    : isFivePillarsCommunionLesson ? fivePillarsCommunionSections
    : isFivePillarsResurrectionLesson ? fivePillarsResurrectionSections
    : isMatrimonyLesson ? matrimonyTeachingSections
    : isSalvationLesson ? salvationTeachingSections
    : isSaintsLesson ? saintsTeachingSections
    : isFastingLesson ? fastingTeachingSections
    : isWorksLesson ? worksTeachingSections
    : isBibliographyLesson ? bibliographySections
    : isJesusLetterLesson ? jesusLetterSections
    : null
  const historySectionPrompts = isHistoryLesson
    ? [
        "Review how the Ethiopian Church explains the dispute over Monophysitism and Dyophysitism and why she rejects the nickname 'Monophysite.'",
        "Review how the Nicene Creed is used to confess Christ as perfect God and perfect man.",
        "Review how to distinguish the Ethiopian Orthodox Church from Orthodox Chalcedonian churches while still understanding the historical relationship.",
        "Review why dialogue between Chalcedonian and non-Chalcedonian churches still matters.",
      ]
    : undefined
  const historyReviewQuestions = isHistoryLesson
    ? [
        "How does the Ethiopian Orthodox Church describe her place in the One, Holy, Universal and Apostolic Church, and why does she reject the label 'Monophysite'?",
        "How do the fundamental dogmas of the Nicene Creed help the Church confess Christ as perfect God and perfect man?",
        "How should a catechumen explain the distinction between the Ethiopian Orthodox Church and Orthodox Chalcedonian churches?",
        "Why does the lesson say dialogue between Orthodox Chalcedonian and Non-Chalcedonian churches remains important?",
      ]
    : undefined

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f7efe2] via-[#f3e8d6] to-[#efe1cd] dark:from-stone-950 dark:via-[#23170f] dark:to-stone-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.035]" />
        <div className="absolute left-[8%] top-0 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="absolute right-[8%] top-[18rem] h-96 w-96 rounded-full bg-orange-200/20 blur-3xl" />
      </div>

      <section className="relative overflow-hidden border-b border-amber-200/50 dark:border-orange-900/30">
        <div className="absolute inset-0 bg-[url('/patterns/manuscript-border.svg')] opacity-[0.08]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_top,rgba(255,235,204,0.52),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_30%,rgba(120,53,15,0.08)_100%)]" />

        <div className="container mx-auto px-4 py-10 md:py-12 relative w-full">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-[2rem] border border-white/45 bg-[linear-gradient(135deg,rgba(255,255,255,0.74),rgba(255,248,236,0.38))] p-6 shadow-[0_34px_110px_-48px_rgba(120,53,15,0.45)] backdrop-blur-2xl dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(42,28,20,0.68),rgba(29,20,15,0.42))] md:p-8">
              <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr] items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-orange-700/80 dark:text-amber-300/80">
                    <span>Lesson {lesson.id}</span>
                    <span>•</span>
                    <span>{lesson.section}</span>
                    <span>•</span>
                    <span>{lesson.duration}</span>
                  </div>
                  <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-stone-900 dark:text-white md:text-5xl">
                    {lesson.title}
                  </h1>
                  <p className="mt-4 max-w-3xl text-lg leading-relaxed text-stone-700 dark:text-stone-300 md:text-[1.15rem]">
                    {lesson.description}
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button asChild className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                      <Link href="/catechumen/roadmap">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Roadmap
                      </Link>
                    </Button>
                    {nextLesson ? (
                      <Button asChild variant="outline" className="border-amber-300/70 bg-white/60 text-orange-700 dark:bg-stone-900/60 dark:text-amber-300">
                        <Link href={`/catechumen/${nextLesson.slug}`}>
                          Continue to Next Lesson
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="rounded-[1.4rem] border border-amber-200/60 bg-gradient-to-br from-amber-50/92 via-white/80 to-orange-50/72 p-4 shadow-[0_18px_45px_-28px_rgba(120,53,15,0.22)] dark:border-orange-900/30 dark:bg-[linear-gradient(135deg,rgba(42,28,20,0.96),rgba(24,17,14,0.94))]">
                    <p className="text-xs uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">Quick view</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-amber-200/70 bg-white/80 px-3 py-1 text-xs text-stone-700 dark:border-orange-900/30 dark:bg-stone-900/50 dark:text-stone-300">
                        {lessonParts.length} parts
                      </span>
                      <span className="rounded-full border border-amber-200/70 bg-white/80 px-3 py-1 text-xs text-stone-700 dark:border-orange-900/30 dark:bg-stone-900/50 dark:text-stone-300">
                        Module lesson
                      </span>
                    </div>
                  </div>

                  <div className="rounded-[1.4rem] border border-white/50 bg-white/72 px-4 py-2 shadow-[0_18px_45px_-32px_rgba(120,53,15,0.18)] dark:border-white/10 dark:bg-stone-900/40">
                    <Accordion type="multiple" className="w-full">
                      <AccordionItem value="lesson-info" className="border-none">
                        <AccordionTrigger className="py-3 text-sm font-semibold text-stone-900 hover:no-underline dark:text-white">
                          <span className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-orange-600 dark:text-amber-400" />
                            In this lesson
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-3">
                          <div className="space-y-3">
                            {learningGoals.map((goal) => (
                              <div key={goal} className="flex items-start gap-3 text-sm text-stone-700 dark:text-stone-300">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-600 dark:text-amber-400" />
                                <span>{goal}</span>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="lesson-help" className="border-none">
                        <AccordionTrigger className="py-3 text-sm font-semibold text-stone-900 hover:no-underline dark:text-white">
                          <span className="flex items-center gap-2">
                            <Compass className="h-4 w-4 text-orange-600 dark:text-amber-400" />
                            How to use this module
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-3">
                          <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                            Read first, review after, then use key points and the check section before moving on.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-wrap items-center gap-3 rounded-[1.35rem] border border-white/45 bg-white/72 px-4 py-3 shadow-[0_18px_50px_-30px_rgba(120,53,15,0.28)] backdrop-blur-xl dark:border-white/10 dark:bg-stone-900/40">
              <div className="flex items-center gap-3 rounded-full bg-amber-50/80 px-3 py-2 dark:bg-orange-950/25">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-xs font-semibold text-white">
                  {lesson.id}
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">Progress</p>
                  <p className="text-sm font-semibold text-stone-900 dark:text-white">
                    Lesson {lesson.id} of {catechumenLessons.length}
                  </p>
                </div>
              </div>

              <div className="min-w-[170px] flex-1">
                <div className="h-2 overflow-hidden rounded-full bg-stone-200/80 dark:bg-stone-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-orange-700"
                    style={{ width: `${lessonProgress}%` }}
                  />
                </div>
              </div>

              <div className="rounded-full border border-amber-200/70 bg-amber-50/80 px-3 py-2 text-xs font-medium text-stone-700 dark:border-orange-900/30 dark:bg-orange-950/25 dark:text-stone-300">
                {lessonProgress}% path
              </div>
              <div className="rounded-full border border-amber-200/70 bg-amber-50/80 px-3 py-2 text-xs font-medium text-stone-700 dark:border-orange-900/30 dark:bg-orange-950/25 dark:text-stone-300">
                {lessonParts.length} parts
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
            <div className="space-y-6">
              <LessonModuleShell
                lessonId={lesson.id}
                lessonSlug={lesson.slug}
                sectionTitles={lessonParts}
                sectionPrompts={historySectionPrompts}
                learningGoals={learningGoals}
                reviewQuestions={historyReviewQuestions}
                recapPoints={recapPoints}
                quizQuestions={quizQuestions}
              >
              {memoryVerse ? (
                <Card className="overflow-hidden border border-amber-200/60 bg-gradient-to-br from-amber-50/92 via-white/80 to-orange-50/72 shadow-[0_24px_80px_-46px_rgba(120,53,15,0.3)] backdrop-blur-xl dark:border-orange-900/30 dark:bg-[linear-gradient(135deg,rgba(42,28,20,0.96),rgba(24,17,14,0.94))]">
                  <div className="h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />
                  <CardContent className="p-6 md:p-8">
                    <p className="text-xs uppercase tracking-[0.24em] text-orange-700 dark:text-amber-400">Lesson Verse</p>
                    <p className="mt-5 max-w-4xl text-2xl font-semibold leading-[1.35] tracking-tight text-orange-950 md:text-[2.2rem] dark:text-amber-100">
                      “{memoryVerse.text}”
                    </p>
                    <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-stone-300">
                      {memoryVerse.reference}
                    </p>
                  </CardContent>
                </Card>
              ) : null}

              {isChurchLesson ? (
                <Card className="overflow-hidden border-none bg-white/82 shadow-[0_28px_90px_-48px_rgba(120,53,15,0.34)] backdrop-blur-xl dark:border-orange-900/30 dark:bg-[linear-gradient(135deg,rgba(42,28,20,0.96),rgba(24,17,14,0.94))]">
                  <CardContent className="space-y-5">
                    {churchTeachingSections.map((section) => (
                      <div
                        key={section.title}
                        id={sectionAnchorId(section.title)}
                        className="rounded-[1.35rem] border border-amber-200/60 bg-gradient-to-br from-white to-amber-50/60 p-5 shadow-[0_12px_30px_-24px_rgba(120,53,15,0.22)] dark:border-orange-900/30 dark:from-stone-900 dark:to-orange-950/20"
                      >
                        <h3 className="text-lg font-semibold text-stone-900 dark:text-white">{section.title}</h3>
                        <div className="mt-3 space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
                          {section.paragraphs.map((paragraph) => (
                            <p key={paragraph}>{renderRichParagraph(paragraph)}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ) : isHistoryLesson ? (
                <>
                  <Card className="overflow-hidden border-none bg-white/82 shadow-[0_28px_90px_-48px_rgba(120,53,15,0.34)] backdrop-blur-xl dark:border-orange-900/30 dark:bg-[linear-gradient(135deg,rgba(42,28,20,0.96),rgba(24,17,14,0.94))]">
                    <CardContent className="space-y-5">
                      {historyTeachingSections.map((section) => (
                        <div
                          key={section.title}
                          id={sectionAnchorId(section.title)}
                          className="rounded-[1.35rem] border border-amber-200/60 bg-gradient-to-br from-white to-amber-50/60 p-5 shadow-[0_12px_30px_-24px_rgba(120,53,15,0.22)] dark:border-orange-900/30 dark:from-stone-900 dark:to-orange-950/20"
                        >
                          <h3 className="text-lg font-semibold text-stone-900 dark:text-white">{section.title}</h3>
                          <div className="mt-3 space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
                            {section.paragraphs.map((paragraph) => (
                              <p key={paragraph}>{renderRichParagraph(paragraph)}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden border-none bg-white/82 shadow-[0_28px_90px_-48px_rgba(120,53,15,0.34)] backdrop-blur-xl dark:border-orange-900/30 dark:bg-[linear-gradient(135deg,rgba(42,28,20,0.96),rgba(24,17,14,0.94))]">
                    <CardHeader className="space-y-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-orange-700 dark:text-amber-400">Visual Guides</p>
                      <CardTitle className="text-2xl md:text-3xl text-stone-900 dark:text-white">Church History Diagrams</CardTitle>
                      <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                        These diagrams summarize the major church divisions after Chalcedon and the Christological debates behind them.
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-10">
                      <figure className="space-y-4">
                        <a
                          href="/images/pic1.png"
                          target="_blank"
                          rel="noreferrer"
                          className="group block overflow-hidden rounded-[1.6rem]"
                        >
                          <div className="relative overflow-hidden rounded-[1.6rem]">
                            <Image
                              src="/images/pic1.png"
                              alt="A historical overview of church divisions after Chalcedon, showing the Oriental Orthodox, Eastern Orthodox, Roman Catholic, Protestant, and Anglican branches."
                              width={1691}
                              height={1095}
                              className="h-auto w-full rounded-[1.6rem] transition duration-300 group-hover:scale-[1.01]"
                            />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/55 via-stone-950/10 to-transparent px-5 py-4 opacity-100 md:opacity-0 md:transition md:duration-300 md:group-hover:opacity-100">
                              <p className="text-sm font-medium text-white">Click to open full size</p>
                            </div>
                          </div>
                        </a>
                        <figcaption className="text-base leading-relaxed text-stone-600 dark:text-stone-300">
                          A clearer family-tree view of how the churches are commonly grouped in Coptic history teaching.
                        </figcaption>
                      </figure>

                      <figure className="space-y-4">
                        <a
                          href="/images/pic2.png"
                          target="_blank"
                          rel="noreferrer"
                          className="group block overflow-hidden rounded-[1.6rem]"
                        >
                          <div className="relative overflow-hidden rounded-[1.6rem]">
                            <Image
                              src="/images/pic2.png"
                              alt="A Christological map centered on one person and two natures, comparing different errors and the Alexandrian emphasis on the unity of Christ."
                              width={1707}
                              height={1007}
                              className="h-auto w-full rounded-[1.6rem] transition duration-300 group-hover:scale-[1.01]"
                            />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/55 via-stone-950/10 to-transparent px-5 py-4 opacity-100 md:opacity-0 md:transition md:duration-300 md:group-hover:opacity-100">
                              <p className="text-sm font-medium text-white">Click to open full size</p>
                            </div>
                          </div>
                        </a>
                        <figcaption className="text-base leading-relaxed text-stone-600 dark:text-stone-300">
                          A cleaner visual summary of the Christological tensions discussed around Chalcedon and in later teaching.
                        </figcaption>
                      </figure>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-[0_28px_90px_-48px_rgba(17,24,39,0.5)] bg-gradient-to-br from-orange-900 via-amber-800 to-orange-900 text-white overflow-hidden">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-center gap-3">
                        <Crown className="h-5 w-5 text-amber-200" />
                        <h2 className="text-2xl font-bold">Conclusion for the Catechumen</h2>
                      </div>
                      <div className="mt-5 space-y-4">
                        {historyLessonConclusion.map((line) => (
                          <p key={line} className="text-white/88 leading-relaxed">
                            {line}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : isCreedLesson ? (
                <>
                  <CreedReader />

                  <Card className="overflow-hidden border-none bg-white/82 shadow-[0_28px_90px_-48px_rgba(120,53,15,0.34)] backdrop-blur-xl dark:border-orange-900/30 dark:bg-[linear-gradient(135deg,rgba(42,28,20,0.96),rgba(24,17,14,0.94))]">
                    <CardHeader>
                      <CardTitle className="text-2xl text-stone-900 dark:text-white">Explanation of the Orthodox Creed</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      {creedExplanationSections.map((section) => (
                        <div
                          key={section.title}
                          className="rounded-[1.35rem] border border-amber-200/60 bg-gradient-to-br from-white to-amber-50/60 p-5 shadow-[0_12px_30px_-24px_rgba(120,53,15,0.22)] dark:border-orange-900/30 dark:from-stone-900 dark:to-orange-950/20"
                        >
                          <h3 className="text-lg font-semibold text-stone-900 dark:text-white">{section.title}</h3>
                          <div className="mt-3 space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
                            {section.paragraphs.map((paragraph) => (
                              <p key={paragraph}>{renderRichParagraph(paragraph)}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-[0_28px_90px_-48px_rgba(120,53,15,0.34)] bg-white/82 dark:bg-stone-900/74 card-inner-glow backdrop-blur-xl">
                    <CardContent className="p-6 md:p-8 space-y-6 text-stone-700 dark:text-stone-300 leading-relaxed">
                      <div className="rounded-2xl border border-amber-200/70 bg-gradient-to-br from-amber-50/90 to-orange-50/70 p-5 dark:border-orange-900/40 dark:from-stone-900 dark:to-orange-950/40">
                        <p className="text-xs uppercase tracking-[0.18em] text-orange-700 dark:text-amber-400">Why this matters</p>
                        <p className="mt-3">{lesson.whyItMatters}</p>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-amber-200/60 bg-white/80 p-5 dark:border-orange-900/30 dark:bg-stone-900/50">
                          <div className="flex items-center gap-3 text-orange-700 dark:text-amber-300">
                            <Compass className="h-5 w-5" />
                            <h2 className="font-semibold text-stone-900 dark:text-white">How to use it</h2>
                          </div>
                          <p className="mt-3 text-sm leading-relaxed">
                            Read it slowly. Say it out loud if you can. This is not just information. It is the faith the
                            Church confesses together.
                          </p>
                        </div>
                        <div className="rounded-2xl border border-amber-200/60 bg-white/80 p-5 dark:border-orange-900/30 dark:bg-stone-900/50">
                          <div className="flex items-center gap-3 text-orange-700 dark:text-amber-300">
                            <BookMarked className="h-5 w-5" />
                            <h2 className="font-semibold text-stone-900 dark:text-white">What to notice</h2>
                          </div>
                          <p className="mt-3 text-sm leading-relaxed">
                            The creed tells the Church’s faith about the Father, the Son, the Holy Spirit, the Church,
                            baptism, resurrection, and the life to come.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : isTrinityLesson ? (
                <>
                  <Card className="overflow-hidden border-none bg-white/82 shadow-[0_28px_90px_-48px_rgba(120,53,15,0.34)] backdrop-blur-xl dark:border-orange-900/30 dark:bg-[linear-gradient(135deg,rgba(42,28,20,0.96),rgba(24,17,14,0.94))]">
                    <CardContent className="space-y-4">
                      {trinityCatechism.map((item) => (
                        <div
                          key={item.question}
                          className="rounded-[1.35rem] border border-amber-200/60 bg-gradient-to-br from-white to-amber-50/60 p-5 shadow-[0_12px_30px_-24px_rgba(120,53,15,0.22)] dark:border-orange-900/30 dark:from-stone-900 dark:to-orange-950/20"
                        >
                          <p className="font-semibold text-stone-900 dark:text-white">Q. {item.question}</p>
                          <p className="mt-3 leading-relaxed text-stone-700 dark:text-stone-300">A. {item.answer}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden border-none bg-white/82 shadow-[0_28px_90px_-48px_rgba(120,53,15,0.34)] backdrop-blur-xl dark:border-orange-900/30 dark:bg-[linear-gradient(135deg,rgba(42,28,20,0.96),rgba(24,17,14,0.94))]">
                    <CardContent className="space-y-5">
                      {trinityTeachingSections.map((section, index) => (
                        <LessonSectionCard key={section.title} title={section.title} paragraphs={section.paragraphs} index={index} />
                      ))}
                    </CardContent>
                  </Card>
                </>
              ) : isChristologyLesson ? (
                <>
                  <Card className="overflow-hidden border-none bg-white/82 shadow-[0_28px_90px_-48px_rgba(120,53,15,0.34)] backdrop-blur-xl dark:border-orange-900/30 dark:bg-[linear-gradient(135deg,rgba(42,28,20,0.96),rgba(24,17,14,0.94))]">
                    <CardContent className="space-y-5">
                      {christologyTeachingSections.map((section, index) => (
                        <LessonSectionCard key={section.title} title={section.title} paragraphs={section.paragraphs} index={index} />
                      ))}
                    </CardContent>
                  </Card>

                </>
              ) : isSacramentLesson ? (
                <>
                  <Card className="overflow-hidden border-none bg-white/82 shadow-[0_28px_90px_-48px_rgba(120,53,15,0.34)] backdrop-blur-xl dark:border-orange-900/30 dark:bg-[linear-gradient(135deg,rgba(42,28,20,0.96),rgba(24,17,14,0.94))]">
                    <CardContent className="space-y-5">
                      {sacramentTeachingSections.map((section) => (
                        <div
                          key={section.title}
                          className="rounded-[1.35rem] border border-amber-200/60 bg-gradient-to-br from-white to-amber-50/60 p-5 shadow-[0_12px_30px_-24px_rgba(120,53,15,0.22)] dark:border-orange-900/30 dark:from-stone-900 dark:to-orange-950/20"
                        >
                          <h3 className="text-lg font-semibold text-stone-900 dark:text-white">{section.title}</h3>
                          <div className="mt-3 space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
                            {section.paragraphs.map((paragraph) => (
                              <p key={paragraph}>{renderRichParagraph(paragraph)}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden border-none bg-white/82 shadow-[0_28px_90px_-48px_rgba(120,53,15,0.34)] backdrop-blur-xl dark:border-orange-900/30 dark:bg-[linear-gradient(135deg,rgba(42,28,20,0.96),rgba(24,17,14,0.94))]">
                    <CardHeader>
                      <CardTitle className="text-2xl text-stone-900 dark:text-white">Question and answer</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {sacramentQna.map((item) => (
                        <div
                          key={item.question}
                          className="rounded-[1.35rem] border border-amber-200/60 bg-gradient-to-br from-white to-amber-50/60 p-5 shadow-[0_12px_30px_-24px_rgba(120,53,15,0.22)] dark:border-orange-900/30 dark:from-stone-900 dark:to-orange-950/20"
                        >
                          <p className="font-semibold text-stone-900 dark:text-white">Q. {item.question}</p>
                          <p className="mt-3 leading-relaxed text-stone-700 dark:text-stone-300">A. {item.answer}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </>
              ) : isBaptismLesson ? (
                <>
                  <Card className="overflow-hidden border-none bg-white/82 shadow-[0_28px_90px_-48px_rgba(120,53,15,0.34)] backdrop-blur-xl dark:border-orange-900/30 dark:bg-[linear-gradient(135deg,rgba(42,28,20,0.96),rgba(24,17,14,0.94))]">
                    <CardContent className="space-y-5">
                      {baptismTeachingSections.map((section) => (
                        <div
                          key={section.title}
                          className="rounded-[1.35rem] border border-amber-200/60 bg-gradient-to-br from-white to-amber-50/60 p-5 shadow-[0_12px_30px_-24px_rgba(120,53,15,0.22)] dark:border-orange-900/30 dark:from-stone-900 dark:to-orange-950/20"
                        >
                          <h3 className="text-lg font-semibold text-stone-900 dark:text-white">{section.title}</h3>
                          <div className="mt-3 space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
                            {section.paragraphs.map((paragraph) => (
                              <p key={paragraph}>{renderRichParagraph(paragraph)}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </>
              ) : isConfirmationLesson ? (
                <>
                  <Card className="overflow-hidden border-none bg-white/82 shadow-[0_28px_90px_-48px_rgba(120,53,15,0.34)] backdrop-blur-xl dark:border-orange-900/30 dark:bg-[linear-gradient(135deg,rgba(42,28,20,0.96),rgba(24,17,14,0.94))]">
                    <CardContent className="space-y-5">
                      {confirmationTeachingSections.map((section) => (
                        <div
                          key={section.title}
                          className="rounded-[1.35rem] border border-amber-200/60 bg-gradient-to-br from-white to-amber-50/60 p-5 shadow-[0_12px_30px_-24px_rgba(120,53,15,0.22)] dark:border-orange-900/30 dark:from-stone-900 dark:to-orange-950/20"
                        >
                          <h3 className="text-lg font-semibold text-stone-900 dark:text-white">{section.title}</h3>
                          <div className="mt-3 space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
                            {section.paragraphs.map((paragraph) => (
                              <p key={paragraph}>{renderRichParagraph(paragraph)}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </>
              ) : isRepentanceLesson ? (
                <>
                  <Card className="overflow-hidden border-none bg-white/82 shadow-[0_28px_90px_-48px_rgba(120,53,15,0.34)] backdrop-blur-xl dark:border-orange-900/30 dark:bg-[linear-gradient(135deg,rgba(42,28,20,0.96),rgba(24,17,14,0.94))]">
                    <CardContent className="space-y-5">
                      {repentanceTeachingSections.map((section) => (
                        <div
                          key={section.title}
                          className="rounded-[1.35rem] border border-amber-200/60 bg-gradient-to-br from-white to-amber-50/60 p-5 shadow-[0_12px_30px_-24px_rgba(120,53,15,0.22)] dark:border-orange-900/30 dark:from-stone-900 dark:to-orange-950/20"
                        >
                          <h3 className="text-lg font-semibold text-stone-900 dark:text-white">{section.title}</h3>
                          <div className="mt-3 space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
                            {section.paragraphs.map((paragraph) => (
                              <p key={paragraph}>{renderRichParagraph(paragraph)}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </>
              ) : isEucharistLesson ? (
                <>
                  <Card className="overflow-hidden border-none bg-white/82 shadow-[0_28px_90px_-48px_rgba(120,53,15,0.34)] backdrop-blur-xl dark:border-orange-900/30 dark:bg-[linear-gradient(135deg,rgba(42,28,20,0.96),rgba(24,17,14,0.94))]">
                    <CardContent className="space-y-5">
                      {eucharistTeachingSections.map((section) => (
                        <div
                          key={section.title}
                          className="rounded-[1.35rem] border border-amber-200/60 bg-gradient-to-br from-white to-amber-50/60 p-5 shadow-[0_12px_30px_-24px_rgba(120,53,15,0.22)] dark:border-orange-900/30 dark:from-stone-900 dark:to-orange-950/20"
                        >
                          <h3 className="text-lg font-semibold text-stone-900 dark:text-white">{section.title}</h3>
                          <div className="mt-3 space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
                            {section.paragraphs.map((paragraph) => (
                              <p key={paragraph}>{renderRichParagraph(paragraph)}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </>
              ) : isPriesthoodLesson ? (
                <>
                  <Card className="overflow-hidden border-none bg-white/82 shadow-[0_28px_90px_-48px_rgba(120,53,15,0.34)] backdrop-blur-xl dark:border-orange-900/30 dark:bg-[linear-gradient(135deg,rgba(42,28,20,0.96),rgba(24,17,14,0.94))]">
                    <CardContent className="space-y-5">
                      {priesthoodTeachingSections.map((section) => (
                        <div
                          key={section.title}
                          className="rounded-[1.35rem] border border-amber-200/60 bg-gradient-to-br from-white to-amber-50/60 p-5 shadow-[0_12px_30px_-24px_rgba(120,53,15,0.22)] dark:border-orange-900/30 dark:from-stone-900 dark:to-orange-950/20"
                        >
                          <h3 className="text-lg font-semibold text-stone-900 dark:text-white">{section.title}</h3>
                          <div className="mt-3 space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
                            {section.paragraphs.map((paragraph) => (
                              <p key={paragraph}>{renderRichParagraph(paragraph)}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </>
              ) : isAnointingLesson ? (
                <>
                  <Card className="overflow-hidden border-none bg-white/82 shadow-[0_28px_90px_-48px_rgba(120,53,15,0.34)] backdrop-blur-xl dark:border-orange-900/30 dark:bg-[linear-gradient(135deg,rgba(42,28,20,0.96),rgba(24,17,14,0.94))]">
                    <CardContent className="space-y-5">
                      {anointingTeachingSections.map((section) => (
                        <div
                          key={section.title}
                          className="rounded-[1.35rem] border border-amber-200/60 bg-gradient-to-br from-white to-amber-50/60 p-5 shadow-[0_12px_30px_-24px_rgba(120,53,15,0.22)] dark:border-orange-900/30 dark:from-stone-900 dark:to-orange-950/20"
                        >
                          <h3 className="text-lg font-semibold text-stone-900 dark:text-white">{section.title}</h3>
                          <div className="mt-3 space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
                            {section.paragraphs.map((paragraph) => (
                              <p key={paragraph}>{renderRichParagraph(paragraph)}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </>
              ) : genericTeachingSections ? (
                <>
                  <Card className="overflow-hidden border-none bg-white/82 shadow-[0_28px_90px_-48px_rgba(120,53,15,0.34)] backdrop-blur-xl dark:border-orange-900/30 dark:bg-[linear-gradient(135deg,rgba(42,28,20,0.96),rgba(24,17,14,0.94))]">
                    <CardContent className="space-y-5">
                      {genericTeachingSections.map((section) => (
                        <div
                          key={section.title}
                          className="rounded-[1.35rem] border border-amber-200/60 bg-gradient-to-br from-white to-amber-50/60 p-5 shadow-[0_12px_30px_-24px_rgba(120,53,15,0.22)] dark:border-orange-900/30 dark:from-stone-900 dark:to-orange-950/20"
                        >
                          <h3 className="text-lg font-semibold text-stone-900 dark:text-white">{section.title}</h3>
                          <div className="mt-3 space-y-3 text-stone-700 dark:text-stone-300 leading-relaxed">
                            {section.paragraphs.map((paragraph) => (
                              <p key={paragraph}>{renderRichParagraph(paragraph)}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="border-none shadow-[0_28px_90px_-48px_rgba(120,53,15,0.34)] bg-white/82 dark:bg-stone-900/74 card-inner-glow backdrop-blur-xl">
                  <div className="h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />
                  <CardHeader>
                    <CardTitle className="text-2xl text-stone-900 dark:text-white">Lesson Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 text-stone-700 dark:text-stone-300 leading-relaxed">
                    <p>
                      This lesson belongs to the catechumen path because each step should feel manageable. You do not
                      need to master everything at once. Read carefully, return slowly, and let each subject settle
                      before moving on.
                    </p>
                    <div className="rounded-2xl border border-amber-200/70 bg-gradient-to-br from-amber-50/90 to-orange-50/70 p-5 dark:border-orange-900/40 dark:from-stone-900 dark:to-orange-950/40">
                      <p className="text-xs uppercase tracking-[0.18em] text-orange-700 dark:text-amber-400">Why this lesson matters</p>
                      <p className="mt-3">{lesson.whyItMatters}</p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-amber-200/60 bg-white/80 p-5 dark:border-orange-900/30 dark:bg-stone-900/50">
                        <div className="flex items-center gap-3 text-orange-700 dark:text-amber-300">
                          <Compass className="h-5 w-5" />
                          <h2 className="font-semibold text-stone-900 dark:text-white">How to approach it</h2>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed">
                          Start with prayer, take notes if helpful, and focus on understanding rather than speed.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-amber-200/60 bg-white/80 p-5 dark:border-orange-900/30 dark:bg-stone-900/50">
                        <div className="flex items-center gap-3 text-orange-700 dark:text-amber-300">
                          <BookMarked className="h-5 w-5" />
                          <h2 className="font-semibold text-stone-900 dark:text-white">Suggested pace</h2>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed">
                          Read in one sitting if you like, then revisit it later before moving to the next lesson.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              </LessonModuleShell>

              <Card className="border-none shadow-[0_28px_90px_-48px_rgba(120,53,15,0.34)] bg-white/82 dark:bg-stone-900/74 card-inner-glow backdrop-blur-xl">
                <CardContent className="p-6 md:p-8">
                  <LessonActions lessonId={lesson.id} nextLessonSlug={nextLesson?.slug} requireQuizPass={requiresQuizGate} />
                </CardContent>
              </Card>

            </div>
            <div className="space-y-4 xl:sticky xl:top-24 self-start">
              <Card className="border-none shadow-[0_24px_80px_-46px_rgba(120,53,15,0.34)] bg-white/80 dark:bg-stone-900/70 card-inner-glow backdrop-blur-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-stone-900 dark:text-white">Lesson Guide</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-xl border border-amber-200/60 bg-amber-50/80 p-4 dark:border-orange-900/30 dark:bg-orange-950/25">
                    <p className="text-xs uppercase tracking-[0.16em] text-orange-700 dark:text-amber-400">Focus</p>
                    <p className="mt-2 text-sm font-medium text-stone-900 dark:text-white">{lesson.title}</p>
                  </div>
                  {isHistoryLesson ? (
                    <div className="rounded-xl border border-amber-200/60 bg-amber-50/60 px-2 py-1 dark:border-orange-900/30 dark:bg-orange-950/20">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="history-roadmap" className="border-none">
                          <AccordionTrigger className="px-2 py-3 text-sm font-semibold text-stone-900 hover:no-underline dark:text-white">
                            History of the Church
                          </AccordionTrigger>
                          <AccordionContent className="pb-2">
                            <div className="space-y-2 pl-3">
                              {lessonParts.map((part, index) => (
                                <Link
                                  key={part}
                                  href={`#${sectionAnchorId(part)}`}
                                  className="flex items-start gap-3 rounded-xl border border-amber-200/50 bg-white/70 px-3 py-3 text-sm transition-colors hover:border-amber-300/70 hover:bg-amber-50 dark:border-orange-900/20 dark:bg-stone-900/45 dark:hover:border-orange-800/40 dark:hover:bg-orange-950/30"
                                >
                                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[11px] font-semibold text-orange-700 dark:bg-orange-950/60 dark:text-amber-300">
                                    {index + 1}
                                  </span>
                                  <span className="text-stone-700 dark:text-stone-300">{part}</span>
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {lessonParts.slice(0, 5).map((part, index) => (
                        <div key={part} className="flex items-start gap-3 rounded-xl bg-amber-50/70 px-3 py-3 text-sm dark:bg-orange-950/20">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-orange-700 dark:bg-stone-900 dark:text-amber-300">
                            {index + 1}
                          </span>
                          <span className="text-stone-700 dark:text-stone-300">{part}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {memoryVerse ? (
                <Card className="overflow-hidden border-none bg-gradient-to-br from-amber-50/92 via-white/80 to-orange-50/72 shadow-[0_24px_80px_-46px_rgba(120,53,15,0.3)] backdrop-blur-xl dark:border-orange-900/30 dark:bg-[linear-gradient(135deg,rgba(42,28,20,0.96),rgba(24,17,14,0.94))]">
                  <CardContent className="p-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-orange-700 dark:text-amber-400">Memory verse</p>
                    <p className="mt-3 text-base font-semibold leading-relaxed text-orange-900 dark:text-amber-200">
                      “{memoryVerse.text}”
                    </p>
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-stone-600 dark:text-stone-300">
                      {memoryVerse.reference}
                    </p>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </div>
          </div>
        </div>
      </section>
    </div>
  )
}
