"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Search, X, Check, ChevronRight, ArrowRight, LogIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { teachings, type TeachingMeta, type TeachingCategory } from "./teachings-data"
import { useAuthProgress } from "@/components/providers/auth-progress-provider"

const CATEGORIES: TeachingCategory[] = [
  "Holy Communion",
  "Saints & Mary",
  "Fasting & Prayer",
  "Trinity & Christ",
  "Marriage & Family",
  "Church & Liturgy",
  "Spiritual Life",
]

// All warm brown / amber / maroon — no cool colors
const CATEGORY_BADGE_BG: Record<TeachingCategory, string> = {
  "Holy Communion":  "bg-[#7c2d12] text-white",
  "Saints & Mary":   "bg-amber-700 text-white",
  "Fasting & Prayer":"bg-stone-600 text-white",
  "Trinity & Christ":"bg-[#451a03] text-white",
  "Marriage & Family":"bg-orange-800 text-white",
  "Church & Liturgy":"bg-amber-900 text-white",
  "Spiritual Life":  "bg-stone-700 text-white",
}

// Left border — all warm tones
const CATEGORY_BORDER: Record<TeachingCategory, string> = {
  "Holy Communion":  "border-l-[#7c2d12]",
  "Saints & Mary":   "border-l-amber-700",
  "Fasting & Prayer":"border-l-stone-500",
  "Trinity & Christ":"border-l-[#451a03]",
  "Marriage & Family":"border-l-orange-700",
  "Church & Liturgy":"border-l-amber-800",
  "Spiritual Life":  "border-l-stone-600",
}

// Subtle cross-grid SVG for card headers
const CROSS_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Crect x='12' y='3' width='4' height='22' rx='1' fill='rgba(255,255,255,0.065)'/%3E%3Crect x='3' y='11' width='22' height='4' rx='1' fill='rgba(255,255,255,0.065)'/%3E%3C/svg%3E")`

const STORAGE_KEY = "jr_teachings_read"

function getReadIds(): Set<string> {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    return new Set(s ? JSON.parse(s) : [])
  } catch { return new Set() }
}
function markRead(id: string) {
  const ids = getReadIds(); ids.add(id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]))
}
function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

// ── Teaching Card ──────────────────────────────────────────────────────────────
function TeachingCard({ teaching, isRead, onClick }: { teaching: TeachingMeta; isRead: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex w-full flex-col overflow-hidden rounded-2xl border border-l-4 border-stone-200/80 bg-white text-left shadow-sm transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-lg dark:border-stone-700/60 dark:bg-stone-900",
        CATEGORY_BORDER[teaching.category],
      )}
    >
      {/* Dark maroon card header */}
      <div
        className="relative flex h-24 w-full items-end p-3"
        style={{ background: "#1e0a00", backgroundImage: CROSS_BG }}
      >
        {isRead && (
          <span className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
            <Check className="h-3 w-3 text-white" />
          </span>
        )}
        <span
          className={cn(
            "inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em]",
            CATEGORY_BADGE_BG[teaching.category],
          )}
        >
          {teaching.category}
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-[15px] font-extrabold leading-snug text-stone-900 dark:text-stone-50">
          {teaching.title}
        </h3>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-stone-500 dark:text-stone-400">
          {teaching.preview}
        </p>
        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="flex items-center gap-1 text-[12px] font-bold text-[#9a3412] dark:text-amber-500">
            {isRead ? "Read again" : "Read now"} <ArrowRight className="h-3.5 w-3.5" />
          </span>
          <span className="text-[10px] text-stone-400">{formatDate(teaching.date)}</span>
        </div>
      </div>
    </button>
  )
}

// ── Category Shelf ─────────────────────────────────────────────────────────────
function CategoryShelf({
  category, items, readIds, onOpen, onSeeAll,
}: {
  category: TeachingCategory; items: TeachingMeta[]; readIds: Set<string>
  onOpen: (t: TeachingMeta) => void; onSeeAll: () => void
}) {
  const readCount = items.filter((t) => readIds.has(t.id)).length
  return (
    <section className="mb-10">
      <div className="mb-3 flex items-center gap-3">
        <h2 className="text-[17px] font-black text-stone-900 dark:text-stone-100">{category}</h2>
        <span className="text-[11px] text-stone-400">{items.length} · {readCount} read</span>
        <button
          onClick={onSeeAll}
          className="ml-auto flex items-center gap-1 text-[12px] font-bold text-[#9a3412] transition hover:text-orange-800 dark:text-amber-500"
        >
          See all <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.slice(0, 8).map((t) => (
          <TeachingCard key={t.id} teaching={t} isRead={readIds.has(t.id)} onClick={() => onOpen(t)} />
        ))}
      </div>
    </section>
  )
}

// ── Reading Modal ──────────────────────────────────────────────────────────────
function ReadingModal({ teaching, onClose, onRead, isSignedIn }: { teaching: TeachingMeta; onClose: () => void; onRead: (id: string) => void; isSignedIn: boolean }) {
  const [fullText, setFullText] = useState<string | null>(null)
  const [scrollPct, setScrollPct] = useState(0)
  const [markedRead, setMarkedRead] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch("/teachings-content.json")
      .then((r) => r.json())
      .then((data: Record<string, string>) => setFullText(data[teaching.id] ?? "Content not available."))
      .catch(() => setFullText("Failed to load content."))
  }, [teaching.id])

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const pct = el.scrollTop / (el.scrollHeight - el.clientHeight)
    setScrollPct(Math.min(1, pct))
    if (isSignedIn && pct >= 0.95 && !markedRead) {
      setMarkedRead(true); markRead(teaching.id); onRead(teaching.id)
    }
  }, [isSignedIn, markedRead, teaching.id, onRead])

  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "" } }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-stone-950/70 backdrop-blur-sm md:items-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-[#fffaf0] shadow-2xl dark:bg-stone-950 md:rounded-3xl">
        {/* Scroll progress */}
        <div className="h-1 w-full bg-stone-200 dark:bg-stone-800">
          <div className="h-full bg-[#9a3412] transition-all duration-150" style={{ width: `${scrollPct * 100}%` }} />
        </div>
        {/* Dark header */}
        <div
          className="flex items-end gap-3 p-4"
          style={{ background: "#1e0a00", backgroundImage: CROSS_BG }}
        >
          <div className="flex-1">
            <span className={cn("inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em]", CATEGORY_BADGE_BG[teaching.category])}>
              {teaching.category}
            </span>
            <p className="mt-1.5 text-[11px] text-white/50">{formatDate(teaching.date)}</p>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 text-white/60 transition hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto px-6 py-6 md:px-8">
          <h1 className="mb-6 text-[1.6rem] font-black leading-tight text-stone-950 dark:text-stone-50">
            {teaching.title}
          </h1>
          {fullText === null ? (
            <div className="space-y-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-4 animate-pulse rounded bg-stone-200 dark:bg-stone-800" style={{ width: `${65 + (i % 4) * 8}%` }} />
              ))}
            </div>
          ) : (
            <div className="whitespace-pre-wrap text-[15px] leading-8 text-stone-800 dark:text-stone-200">{fullText}</div>
          )}
          <div className="mt-10 flex justify-center pb-4">
            {isSignedIn ? (
              <button
                onClick={() => { markRead(teaching.id); onRead(teaching.id); onClose() }}
                className={cn(
                  "flex items-center gap-2 rounded-full px-8 py-3 text-sm font-black shadow-lg transition",
                  markedRead ? "bg-stone-700 text-white" : "bg-[#7c2d12] text-white hover:bg-[#5a1e08]",
                )}
              >
                {markedRead ? <><Check className="h-4 w-4" /> Read</> : "Mark as Read"}
              </button>
            ) : (
              <a
                href="/profile"
                className="flex items-center gap-2 rounded-full border border-[#9a3412]/40 bg-white/80 px-6 py-2.5 text-sm font-bold text-[#9a3412] shadow transition hover:bg-amber-50 dark:bg-stone-900/80"
              >
                <LogIn className="h-4 w-4" /> Sign in to track progress
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function TeachingsPage() {
  const { user } = useAuthProgress()
  const isSignedIn = !!user
  const [activeCategory, setActiveCategory] = useState<TeachingCategory | "All">("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [readIds, setReadIds] = useState<Set<string>>(new Set())
  const [openTeaching, setOpenTeaching] = useState<TeachingMeta | null>(null)
  const [visibleCount, setVisibleCount] = useState(24)

  useEffect(() => {
    if (isSignedIn) { setReadIds(getReadIds()) } else { setReadIds(new Set()) }
  }, [isSignedIn])

  const handleRead = useCallback((id: string) => {
    if (!isSignedIn) return
    setReadIds((prev) => new Set([...prev, id]))
  }, [isSignedIn])

  const categoryCounts = Object.fromEntries(
    CATEGORIES.map((c) => [c, teachings.filter((t) => t.category === c).length]),
  ) as Record<TeachingCategory, number>

  const filteredTeachings = teachings.filter((t) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return t.title.toLowerCase().includes(q) || t.preview.toLowerCase().includes(q)
    }
    if (activeCategory !== "All") return t.category === activeCategory
    return true
  })

  const recentlyRead = teachings.filter((t) => readIds.has(t.id)).slice(-3).reverse()

  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pb-6 pt-16 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(180,83,9,0.13),transparent_54%)]" />
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#7c2d12]/35 bg-white/50 shadow-lg backdrop-blur-sm dark:bg-stone-900/50">
          <svg viewBox="0 0 100 130" className="h-7 w-7" aria-hidden>
            <rect x="44" y="4" width="12" height="122" rx="2.5" fill="#9a3412" />
            <rect x="4" y="40" width="92" height="12" rx="2.5" fill="#9a3412" />
            <rect x="24" y="78" width="52" height="9" rx="2" fill="#9a3412" />
          </svg>
        </div>
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#9a3412] dark:text-amber-600">
          EOTC Teachings
        </p>
        <h1 className="bg-gradient-to-br from-[#7c2d12] via-[#9a3412] to-amber-700 bg-clip-text text-[clamp(3.5rem,11vw,7.5rem)] font-black leading-none text-transparent">
          Teachings
        </h1>
        <div className="mt-6 flex flex-col items-center gap-2">
          {isSignedIn && readIds.size > 0 ? (
            <>
              <p className="text-[14px] font-medium text-stone-700 dark:text-stone-300">
                You&apos;ve read <span className="font-black text-[#9a3412]">{readIds.size}</span> of {teachings.length} teachings
              </p>
              <div className="h-1.5 w-48 overflow-hidden rounded-full bg-stone-300 dark:bg-stone-700">
                <div className="h-full rounded-full bg-[#9a3412]" style={{ width: `${(readIds.size / teachings.length) * 100}%` }} />
              </div>
            </>
          ) : (
            <p className="text-[14px] font-medium text-stone-600 dark:text-stone-400">
              {teachings.length} teachings from the John&apos;s Repentance channel
            </p>
          )}
        </div>

        {/* Search */}
        <div className="mt-6 w-full max-w-md">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setActiveCategory("All"); setVisibleCount(24) }}
              placeholder="Search teachings..."
              className="w-full rounded-2xl border border-stone-300/70 bg-white/80 py-3.5 pl-10 pr-10 text-[15px] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#9a3412]/40 dark:border-stone-700 dark:bg-stone-900/80 dark:text-stone-100"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-stone-400 hover:text-stone-600">
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
                  {cat === "All" ? `All (${teachings.length})` : `${cat} (${categoryCounts[cat as TeachingCategory]})`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── SEARCH RESULTS ── */}
        {searchQuery && (
          <div>
            <p className="mb-4 text-[13px] text-stone-500">
              {filteredTeachings.length} result{filteredTeachings.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTeachings.slice(0, visibleCount).map((t) => (
                <TeachingCard key={t.id} teaching={t} isRead={readIds.has(t.id)} onClick={() => setOpenTeaching(t)} />
              ))}
            </div>
            {filteredTeachings.length > visibleCount && (
              <div className="mt-8 flex justify-center">
                <button onClick={() => setVisibleCount((v) => v + 24)} className="rounded-full border border-[#9a3412]/40 bg-white/80 px-8 py-3 text-sm font-black text-[#9a3412] shadow transition hover:bg-amber-50 dark:bg-stone-900/80">
                  Load more ({filteredTeachings.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── ALL SHELVES ── */}
        {!searchQuery && activeCategory === "All" && (
          <div>
            {CATEGORIES.map((cat) => {
              const items = teachings.filter((t) => t.category === cat)
              if (!items.length) return null
              return (
                <CategoryShelf key={cat} category={cat} items={items} readIds={readIds}
                  onOpen={(t) => setOpenTeaching(t)} onSeeAll={() => { setActiveCategory(cat); setVisibleCount(24) }} />
              )
            })}
            {/* ── CONTINUE READING ── */}
            {isSignedIn && recentlyRead.length > 0 && (
              <section className="mt-4 border-t border-stone-200/60 pt-10 dark:border-stone-800/60">
                <h2 className="mb-3 text-[17px] font-black text-stone-900 dark:text-stone-100">Continue Reading</h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {recentlyRead.map((t) => (
                    <TeachingCard key={t.id} teaching={t} isRead={readIds.has(t.id)} onClick={() => setOpenTeaching(t)} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* ── SINGLE CATEGORY GRID ── */}
        {!searchQuery && activeCategory !== "All" && (
          <div>
            <p className="mb-4 text-[13px] text-stone-500">
              {filteredTeachings.length} teachings · {filteredTeachings.filter((t) => readIds.has(t.id)).length} read
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTeachings.slice(0, visibleCount).map((t) => (
                <TeachingCard key={t.id} teaching={t} isRead={readIds.has(t.id)} onClick={() => setOpenTeaching(t)} />
              ))}
            </div>
            {filteredTeachings.length > visibleCount && (
              <div className="mt-8 flex justify-center">
                <button onClick={() => setVisibleCount((v) => v + 24)} className="rounded-full border border-[#9a3412]/40 bg-white/80 px-8 py-3 text-sm font-black text-[#9a3412] shadow transition hover:bg-amber-50 dark:bg-stone-900/80">
                  Load more ({filteredTeachings.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── MODAL ── */}
      {openTeaching && (
        <ReadingModal teaching={openTeaching} onClose={() => setOpenTeaching(null)} onRead={handleRead} isSignedIn={isSignedIn} />
      )}
    </div>
  )
}
