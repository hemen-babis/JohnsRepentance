"use client"

import { useState, useRef, useEffect } from "react"
import { Search, X, ChevronRight, ArrowRight, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { qnas, type QnaMeta, type QnaCategory } from "./qna-data"

const CATEGORIES: QnaCategory[] = [
  "Holy Communion",
  "Saints & Mary",
  "Fasting & Prayer",
  "Trinity & Christ",
  "Marriage & Family",
  "Church & Liturgy",
  "Spiritual Life",
]

const CATEGORY_BADGE_BG: Record<QnaCategory, string> = {
  "Holy Communion":    "bg-[#7c2d12] text-white",
  "Saints & Mary":     "bg-amber-700 text-white",
  "Fasting & Prayer":  "bg-stone-600 text-white",
  "Trinity & Christ":  "bg-[#451a03] text-white",
  "Marriage & Family": "bg-orange-800 text-white",
  "Church & Liturgy":  "bg-amber-900 text-white",
  "Spiritual Life":    "bg-stone-700 text-white",
}

const CATEGORY_BORDER: Record<QnaCategory, string> = {
  "Holy Communion":    "border-l-[#7c2d12]",
  "Saints & Mary":     "border-l-amber-700",
  "Fasting & Prayer":  "border-l-stone-500",
  "Trinity & Christ":  "border-l-[#451a03]",
  "Marriage & Family": "border-l-orange-700",
  "Church & Liturgy":  "border-l-amber-800",
  "Spiritual Life":    "border-l-stone-600",
}

const CROSS_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Crect x='12' y='3' width='4' height='22' rx='1' fill='rgba(255,255,255,0.065)'/%3E%3Crect x='3' y='11' width='22' height='4' rx='1' fill='rgba(255,255,255,0.065)'/%3E%3C/svg%3E")`

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

function cleanText(text: string) {
  return text
    .replace(/👉🏾\s*/g, "")
    .replace(/👉\s*/g, "")
    .replace(/✍️?\s*/g, "")
    .replace(/#(\w+)/g, "$1")
    .trim()
}

function cleanTitle(title: string) {
  return cleanText(title.replace(/^Question:\s*/i, ""))
}

function parseQA(raw: string): { question: string | null; answer: string } {
  const text = raw.replace(/#(\w+)/g, "$1").trim()
  const qPattern = /(?:👉🏾?\s*)?Question[:\s፦]+(.+?)(?=\n{1,3}(?:👉🏾?\s*)?(?:✍️?\s*)?Answer)/is
  const aPattern = /(?:👉🏾?\s*)?(?:✍️?\s*)?Answer[:\s#\d]*\n*([\s\S]+)$/i
  const qMatch = text.match(qPattern)
  const aMatch = text.match(aPattern)
  if (qMatch && aMatch) {
    return { question: cleanText(qMatch[1]), answer: cleanText(aMatch[1]) }
  }
  return { question: null, answer: cleanText(text) }
}

// ── Q&A Card ───────────────────────────────────────────────────────────────────
function QnaCard({ qna, onClick }: { qna: QnaMeta; onClick: () => void }) {
  const title = cleanTitle(qna.title)
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex w-full flex-col overflow-hidden rounded-2xl border border-l-4 border-stone-200/80 bg-white text-left shadow-sm transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-lg dark:border-stone-700/60 dark:bg-stone-900",
        CATEGORY_BORDER[qna.category],
      )}
    >
      {/* Dark maroon header with Q badge */}
      <div
        className="relative flex h-32 w-full items-center justify-between px-3.5"
        style={{ background: "#1e0a00", backgroundImage: CROSS_BG }}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#9a3412] text-[16px] font-black text-white shadow-inner">
          Q
        </div>
        <span className={cn(
          "inline-flex rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.1em]",
          CATEGORY_BADGE_BG[qna.category],
        )}>
          {qna.category}
        </span>
      </div>

      {/* Question as main content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-3 text-[14px] font-extrabold leading-snug text-stone-900 dark:text-stone-50">
          {title}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="flex items-center gap-1 text-[12px] font-bold text-[#9a3412] dark:text-amber-500">
            Read answer <ArrowRight className="h-3.5 w-3.5" />
          </span>
          <span className="text-[10px] text-stone-400">{formatDate(qna.date)}</span>
        </div>
      </div>
    </button>
  )
}

// ── Category Shelf ─────────────────────────────────────────────────────────────
function CategoryShelf({
  category, items, onOpen, onSeeAll,
}: {
  category: QnaCategory
  items: QnaMeta[]
  onOpen: (q: QnaMeta) => void
  onSeeAll: () => void
}) {
  return (
    <section className="mb-10">
      <div className="mb-3 flex items-center gap-3">
        <h2 className="text-[17px] font-black text-stone-900 dark:text-stone-100">{category}</h2>
        <span className="text-[11px] text-stone-400">{items.length} questions</span>
        <button
          onClick={onSeeAll}
          className="ml-auto flex items-center gap-1 text-[12px] font-bold text-[#9a3412] transition hover:text-orange-800 dark:text-amber-500"
        >
          See all <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 8).map((q) => (
          <QnaCard key={q.id} qna={q} onClick={() => onOpen(q)} />
        ))}
      </div>
    </section>
  )
}

// ── Q&A Modal ─────────────────────────────────────────────────────────────────
function QnaModal({ qna, onClose }: { qna: QnaMeta; onClose: () => void }) {
  const [fullText, setFullText] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch("/qna-content.json")
      .then((r) => r.json())
      .then((data: Record<string, string>) => setFullText(data[qna.id] ?? "Content not available."))
      .catch(() => setFullText("Failed to load content."))
  }, [qna.id])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  const title = cleanTitle(qna.title)
  const parsed = fullText ? parseQA(fullText) : null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-stone-950/70 backdrop-blur-sm md:items-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-[#fffaf0] shadow-2xl dark:bg-stone-950 md:rounded-3xl">

        {/* Question block — dark maroon */}
        <div
          className="flex items-start gap-3 p-5"
          style={{ background: "#1e0a00", backgroundImage: CROSS_BG }}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#9a3412] text-[15px] font-black text-white">
            Q
          </div>
          <div className="min-w-0 flex-1">
            <span className={cn(
              "mb-2 inline-flex rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.1em]",
              CATEGORY_BADGE_BG[qna.category],
            )}>
              {qna.category}
            </span>
            <p className="mt-1 text-[14px] font-bold leading-snug text-white/95">
              {parsed?.question ?? title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-full p-1.5 text-white/50 transition hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Answer block */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {/* A label strip */}
          <div className="flex items-center gap-2.5 border-b border-stone-200/60 px-5 py-3 dark:border-stone-800">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7c2d12]/10 text-[13px] font-black text-[#7c2d12] dark:bg-amber-900/20 dark:text-amber-500">
              A
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
              Answer
            </span>
            <span className="ml-auto text-[10px] text-stone-400">{formatDate(qna.date)}</span>
          </div>

          <div className="px-6 py-5 md:px-8">
            {fullText === null ? (
              <div className="space-y-3">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 animate-pulse rounded bg-stone-200 dark:bg-stone-800"
                    style={{ width: `${65 + (i % 4) * 8}%` }}
                  />
                ))}
              </div>
            ) : (
              <div className="whitespace-pre-wrap text-[15px] leading-8 text-stone-800 dark:text-stone-200">
                {parsed?.answer ?? cleanText(fullText)}
              </div>
            )}
            <div className="h-6" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function QnaPage() {
  const [activeCategory, setActiveCategory] = useState<QnaCategory | "All">("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [openQna, setOpenQna] = useState<QnaMeta | null>(null)
  const [visibleCount, setVisibleCount] = useState(24)

  const categoryCounts = Object.fromEntries(
    CATEGORIES.map((c) => [c, qnas.filter((q) => q.category === c).length]),
  ) as Record<QnaCategory, number>

  const filteredQnas = qnas.filter((q) => {
    if (searchQuery) {
      const s = searchQuery.toLowerCase()
      return (
        q.title.toLowerCase().includes(s) ||
        q.preview.toLowerCase().includes(s) ||
        q.tags.some((t) => t.toLowerCase().includes(s))
      )
    }
    if (activeCategory !== "All") return q.category === activeCategory
    return true
  })

  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pb-6 pt-16 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(180,83,9,0.13),transparent_54%)]" />

        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#7c2d12]/35 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-stone-900/50">
          <MessageCircle className="h-7 w-7 text-[#9a3412]" />
        </div>

        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#9a3412] dark:text-amber-600">
          EOTC Questions & Answers
        </p>

        <h1 className="bg-gradient-to-br from-[#7c2d12] via-[#9a3412] to-amber-700 bg-clip-text text-[clamp(3rem,10vw,7rem)] font-black leading-none text-transparent">
          Q & A
        </h1>

        <p className="mt-5 text-[14px] font-medium text-stone-600 dark:text-stone-400">
          {qnas.length} answered questions from the John&apos;s Repentance channel
        </p>

        {/* Search */}
        <div className="mt-6 w-full max-w-md">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setActiveCategory("All")
                setVisibleCount(24)
              }}
              placeholder="Search questions..."
              className="w-full rounded-2xl border border-stone-300/70 bg-white/80 py-3.5 pl-10 pr-10 text-[15px] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#9a3412]/40 dark:border-stone-700 dark:bg-stone-900/80 dark:text-stone-100"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-stone-400 hover:text-stone-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-4 md:px-8">

        {/* ── CATEGORY FILTER TABS ── */}
        {!searchQuery && (
          <div className="sticky top-16 z-30 -mx-4 mb-8 overflow-x-auto border-b border-stone-300/50 bg-[#fffaf0]/90 px-4 backdrop-blur-sm dark:border-stone-800/60 dark:bg-stone-950/90 md:-mx-8 md:px-8">
            <div className="flex gap-2 py-3">
              {(["All", ...CATEGORIES] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setVisibleCount(24) }}
                  className={cn(
                    "flex-shrink-0 rounded-full px-4 py-1.5 text-[12px] font-black transition-all",
                    activeCategory === cat
                      ? "bg-[#7c2d12] text-white shadow"
                      : "border border-stone-300/70 bg-white/80 text-stone-600 hover:border-[#9a3412]/50 dark:border-stone-700 dark:bg-stone-900/80 dark:text-stone-400",
                  )}
                >
                  {cat === "All"
                    ? `All (${qnas.length})`
                    : `${cat} (${categoryCounts[cat as QnaCategory]})`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── SEARCH RESULTS ── */}
        {searchQuery && (
          <div>
            <p className="mb-4 text-[13px] text-stone-500">
              {filteredQnas.length} result{filteredQnas.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredQnas.slice(0, visibleCount).map((q) => (
                <QnaCard key={q.id} qna={q} onClick={() => setOpenQna(q)} />
              ))}
            </div>
            {filteredQnas.length > visibleCount && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setVisibleCount((v) => v + 24)}
                  className="rounded-full border border-[#9a3412]/40 bg-white/80 px-8 py-3 text-sm font-black text-[#9a3412] shadow transition hover:bg-amber-50 dark:bg-stone-900/80"
                >
                  Load more ({filteredQnas.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── ALL SHELVES ── */}
        {!searchQuery && activeCategory === "All" && (
          <div>
            {CATEGORIES.map((cat) => {
              const items = qnas.filter((q) => q.category === cat)
              if (!items.length) return null
              return (
                <CategoryShelf
                  key={cat}
                  category={cat}
                  items={items}
                  onOpen={(q) => setOpenQna(q)}
                  onSeeAll={() => { setActiveCategory(cat); setVisibleCount(24) }}
                />
              )
            })}
          </div>
        )}

        {/* ── SINGLE CATEGORY GRID ── */}
        {!searchQuery && activeCategory !== "All" && (
          <div>
            <p className="mb-4 text-[13px] text-stone-500">
              {filteredQnas.length} questions in {activeCategory}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredQnas.slice(0, visibleCount).map((q) => (
                <QnaCard key={q.id} qna={q} onClick={() => setOpenQna(q)} />
              ))}
            </div>
            {filteredQnas.length > visibleCount && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setVisibleCount((v) => v + 24)}
                  className="rounded-full border border-[#9a3412]/40 bg-white/80 px-8 py-3 text-sm font-black text-[#9a3412] shadow transition hover:bg-amber-50 dark:bg-stone-900/80"
                >
                  Load more ({filteredQnas.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── MODAL ── */}
      {openQna && (
        <QnaModal qna={openQna} onClose={() => setOpenQna(null)} />
      )}
    </div>
  )
}
