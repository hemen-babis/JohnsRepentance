"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  Calendar,
  ChevronRight,
  Cross,
  Flame,
  MapPin,
  Search,
  Sparkles,
  Star,
  Users,
  X,
  Wind,
  Crown,
  Heart,
  Shield,
  Scroll,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ALL_CATEGORIES,
  saints,
  getSaintsByCategory,
  searchSaints,
  type Saint,
  type SaintCategory,
} from "@/lib/saints-data"

const CATEGORY_ICONS: Record<SaintCategory, React.ReactNode> = {
  "Nine Saints": <Cross className="w-4 h-4" />,
  "Archangels": <Sparkles className="w-4 h-4" />,
  "Martyrs": <Flame className="w-4 h-4" />,
  "Monastic Saints": <BookOpen className="w-4 h-4" />,
  "Hermits": <MapPin className="w-4 h-4" />,
  "Church Fathers": <Shield className="w-4 h-4" />,
  "Hymnographers": <Star className="w-4 h-4" />,
  "Royal Saints": <Crown className="w-4 h-4" />,
  "Church Builders": <MapPin className="w-4 h-4" />,
  "Holy Women": <Heart className="w-4 h-4" />,
  "Repentance": <Wind className="w-4 h-4" />,
  "Apostles": <Users className="w-4 h-4" />,
}

const CATEGORY_COLORS: Record<SaintCategory, string> = {
  "Nine Saints": "bg-amber-900/40 text-amber-200 border-amber-700/50",
  "Archangels": "bg-blue-900/40 text-blue-200 border-blue-700/50",
  "Martyrs": "bg-red-900/40 text-red-200 border-red-700/50",
  "Monastic Saints": "bg-emerald-900/40 text-emerald-200 border-emerald-700/50",
  "Hermits": "bg-stone-800/60 text-stone-300 border-stone-600/50",
  "Church Fathers": "bg-violet-900/40 text-violet-200 border-violet-700/50",
  "Hymnographers": "bg-yellow-900/40 text-yellow-200 border-yellow-700/50",
  "Royal Saints": "bg-purple-900/40 text-purple-200 border-purple-700/50",
  "Church Builders": "bg-teal-900/40 text-teal-200 border-teal-700/50",
  "Holy Women": "bg-rose-900/40 text-rose-200 border-rose-700/50",
  "Repentance": "bg-indigo-900/40 text-indigo-200 border-indigo-700/50",
  "Apostles": "bg-cyan-900/40 text-cyan-200 border-cyan-700/50",
}

const SECTION_HEADERS: Partial<Record<SaintCategory, { title: string; subtitle: string; amharic: string }>> = {
  "Nine Saints": {
    title: "The Nine Saints",
    amharic: "ተስዓቱ ቅዱሳን",
    subtitle: "5th–6th century Syrian missionaries who founded Ethiopian Orthodox monasticism",
  },
  "Archangels": {
    title: "The Holy Archangels",
    amharic: "ቅዱሳን መላእክት",
    subtitle: "The seven archangels who stand before the throne of God and minister to humanity",
  },
  "Martyrs": {
    title: "Mighty Warriors & Great Martyrs",
    amharic: "ሰማዕታት",
    subtitle: "Those who sealed their faith with blood and overcame the world by the Lamb",
  },
  "Church Fathers": {
    title: "Pillars of the Faith",
    amharic: "አበው",
    subtitle: "Foundational theologians and builders of the universal Orthodox tradition",
  },
  "Monastic Saints": {
    title: "Monastic Ascetics",
    amharic: "ጻድቃን",
    subtitle: "Desert fathers and mothers who surrendered everything for God",
  },
  "Holy Women": {
    title: "Holy Women",
    amharic: "ቅዱሳት አንስት",
    subtitle: "Mothers, virgins, and martyrs whose faith built the Church in silence and sacrifice",
  },
  "Royal Saints": {
    title: "The Royal Saints",
    amharic: "ቅዱሳን ነገሥታት",
    subtitle: "Kings and emperors who wielded earthly power in service of the Kingdom of Heaven",
  },
  "Repentance": {
    title: "Icons of Repentance",
    amharic: "ንስሐ",
    subtitle: "Those whose transformations declare that no one is beyond the mercy of God",
  },
}

function getSaintOfTheDay(): Saint {
  const today = new Date()
  const monthName = today.toLocaleString("en-US", { month: "long" })
  const day = today.getDate()

  const monthSaints = saints.filter((s) => {
    const feast = s.feastDayGregorian ?? ""
    return feast.toLowerCase().includes(monthName.toLowerCase())
  })

  if (monthSaints.length > 0) {
    return monthSaints[day % monthSaints.length]
  }
  return saints.find((s) => s.id === "michael") ?? saints[0]
}

// ─── Book Introduction ─────────────────────────────────────────────────────────

function BookIntroduction() {
  return (
    <div className="relative border-b border-amber-900/30 bg-gradient-to-b from-[#100c06] to-[#0d0a06]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-10">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-amber-400">Saints & Archangels</span>
        </nav>

        {/* Decorative cross + label */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-px h-8 bg-amber-700/40" />
          <span className="text-amber-600 text-xs font-medium uppercase tracking-[0.2em]">
            A Living Cloud of Witnesses
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-amber-800/30 to-transparent" />
        </div>

        {/* Amharic title */}
        <p className="text-amber-500/70 font-ethiopic text-3xl sm:text-4xl mb-2 leading-tight">
          ቅዱሳን — ዝክረ ቅዱሳን
        </p>

        {/* English title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-100 mb-10 leading-tight">
          The Saints &<br />Archangels of the<br />Ethiopian Orthodox Church
        </h1>

        {/* Decorative rule */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-800/40 to-transparent" />
          <Sparkles className="w-4 h-4 text-amber-700/60" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-800/40 to-transparent" />
        </div>

        {/* Book introduction prose */}
        <div className="space-y-6 text-stone-300 text-base sm:text-lg leading-[1.9] max-w-3xl">
          <p>
            In the Ethiopian Orthodox Tewahedo Church, the saints are not distant historical figures
            sealed in amber — they are living members of the one Body of Christ, present at every
            Divine Liturgy, at every lamp lit in darkness, at every prayer whispered in the hours before
            dawn. The Epistle to the Hebrews calls them a <em className="text-amber-300/80">&ldquo;great cloud of witnesses&rdquo;</em> surrounding
            us (Hebrews 12:1), and the Ethiopian Church takes this image with absolute theological
            seriousness. They are not gone. They are gathered.
          </p>
          <p>
            The Ge&apos;ez word <em className="text-amber-300/80">Qiddusan</em> (ቅዱሳን) — saints, or holy ones — refers not
            primarily to moral perfection but to those who have been set apart, sanctified, and so
            fully united to God through the grace of the Holy Spirit that death itself has not interrupted
            their ministry. In the theology of the Tewahedo Church, to pray to a saint is to ask a
            living brother or sister — one who stands before the throne of God with far greater clarity
            than any of us yet possess — to intercede on our behalf. It is no different from asking a
            fellow believer to pray for you. The difference is only proximity: they are closer to God.
          </p>
          <p>
            What follows in this book is a gathering of the saints and archangels most beloved in the
            Ethiopian Orthodox tradition: the Nine Saints who brought monasticism from Syria and laid
            the foundations of our Church; the seven Archangels who stand before the divine throne and
            minister to humanity; the great martyrs who sealed their faith in blood; the monastic
            ascetics who spent decades standing in rivers, balanced on one leg, and clinging to cliff
            faces — pouring out their bodies in intercession for a world that did not know them; the
            holy women who built monasteries during persecution; the royal saints who chose the cell
            over the throne; and the global pillars of Orthodox theology whose writings protect the
            faith to this day.
          </p>
          <p>
            Read this not as a catalogue but as an introduction to your extended family — to those
            who have gone before you, who pray for you now, and who will welcome you when your own
            journey is complete. <em className="text-amber-300/80">በእምነት ቀድምወን ካለፉ ጋር ኅብረት አለን።</em>
            {" "}We have communion with those who have gone before us in faith.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-amber-900/20 text-sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-300 mb-1">{saints.length}</div>
            <div className="text-stone-500 text-xs uppercase tracking-wider">Saints & Archangels</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-300 mb-1">7</div>
            <div className="text-stone-500 text-xs uppercase tracking-wider">Holy Archangels</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-300 mb-1">9</div>
            <div className="text-stone-500 text-xs uppercase tracking-wider">Founding Nine Saints</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-300 mb-1">12</div>
            <div className="text-stone-500 text-xs uppercase tracking-wider">Categories</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Saint of the Day ──────────────────────────────────────────────────────────

function SaintOfTheDay({ onSelect }: { onSelect: (s: Saint) => void }) {
  const saint = useMemo(() => getSaintOfTheDay(), [])
  const primaryCategory = saint.categories[0]
  const colorClass = CATEGORY_COLORS[primaryCategory]

  return (
    <div className="border-b border-amber-900/20 bg-amber-950/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center gap-2 text-amber-600 text-xs font-medium uppercase tracking-wider mb-4">
          <Star className="w-3.5 h-3.5" />
          <span>Saint of the Day</span>
        </div>
        <button
          onClick={() => onSelect(saint)}
          className="w-full text-left group"
        >
          <div className="flex items-start gap-4 sm:gap-6 p-4 sm:p-5 rounded-xl border border-amber-800/30 bg-[#16100a] hover:border-amber-600/40 hover:bg-[#1c1309] transition-all duration-300">
            <div className="flex-1 min-w-0">
              <p className="text-amber-500/70 font-ethiopic text-lg mb-0.5">{saint.nameAmharic}</p>
              <h3 className="text-amber-100 font-bold text-xl sm:text-2xl mb-1 group-hover:text-amber-50 transition-colors">
                {saint.nameEn}
              </h3>
              <p className="text-amber-400/60 text-sm mb-3">{saint.title}</p>
              <p className="text-stone-400 text-sm leading-relaxed line-clamp-2">{saint.bio}</p>
              <div className="flex items-center gap-3 mt-4">
                <span className={`text-xs px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${colorClass}`}>
                  {CATEGORY_ICONS[primaryCategory]}
                  {primaryCategory}
                </span>
                <span className="text-stone-500 text-xs flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {saint.feastDayEthiopian}
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 flex items-center self-center">
              <div className="w-10 h-10 rounded-full bg-amber-900/20 border border-amber-700/30 flex items-center justify-center group-hover:bg-amber-800/30 transition-colors">
                <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}

// ─── Saint Card (minimal) ──────────────────────────────────────────────────────

function SaintCard({ saint, onClick }: { saint: Saint; onClick: () => void }) {
  const primaryCategory = saint.categories[0]
  const colorClass = CATEGORY_COLORS[primaryCategory] ?? "bg-stone-800/60 text-stone-300 border-stone-600/50"

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      className="group w-full text-left bg-[#1a1208] border border-amber-900/30 rounded-xl p-4 hover:border-amber-600/50 hover:bg-[#201508] transition-all duration-200 hover:shadow-lg hover:shadow-amber-900/10"
    >
      {/* Amharic name */}
      <div className="text-amber-500/70 font-ethiopic text-base mb-0.5 leading-tight">
        {saint.nameAmharic}
      </div>

      {/* English name */}
      <h3 className="text-amber-100 font-semibold text-sm mb-1 leading-snug group-hover:text-amber-50 transition-colors">
        {saint.nameEn}
      </h3>

      {/* Title */}
      <p className="text-amber-400/50 text-xs leading-snug line-clamp-1 mb-3">
        {saint.title}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1 text-stone-500 text-xs">
          <Calendar className="w-3 h-3 flex-shrink-0" />
          <span>{saint.feastDayEthiopian}</span>
        </div>
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border flex items-center gap-1 ${colorClass}`}>
          {CATEGORY_ICONS[primaryCategory]}
          {primaryCategory}
        </span>
      </div>

      {/* Read more hint */}
      <div className="flex items-center gap-1 mt-2.5 text-amber-700/40 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
        <BookOpen className="w-3 h-3" />
        <span>Read full biography</span>
      </div>
    </motion.button>
  )
}

// ─── Full Book-Chapter Modal ───────────────────────────────────────────────────

function SaintModal({ saint, onClose }: { saint: Saint; onClose: () => void }) {
  const primaryCategory = saint.categories[0]
  const colorClass = CATEGORY_COLORS[primaryCategory]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center p-0 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0f0b07] w-full sm:max-w-3xl min-h-screen sm:min-h-0 sm:rounded-2xl shadow-2xl shadow-black/70 border border-amber-900/30 relative"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-lg text-stone-500 hover:text-amber-300 hover:bg-amber-900/20 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Chapter header */}
        <div className="px-6 sm:px-10 pt-10 pb-6 border-b border-amber-900/20">
          {/* Category badge */}
          <div className="flex flex-wrap gap-2 mb-5">
            {saint.categories.map((cat) => (
              <span
                key={cat}
                className={`text-xs font-medium px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${CATEGORY_COLORS[cat]}`}
              >
                {CATEGORY_ICONS[cat]}
                {cat}
              </span>
            ))}
          </div>

          {/* Amharic name */}
          <p className="text-amber-500/80 font-ethiopic text-2xl sm:text-3xl mb-2 leading-tight">
            {saint.nameAmharic}
          </p>

          {/* English name */}
          <h2 className="text-amber-100 font-bold text-3xl sm:text-4xl leading-tight mb-2">
            {saint.nameEn}
          </h2>

          {/* Title */}
          <p className="text-amber-400/70 text-base leading-relaxed mb-5">
            {saint.title}
          </p>

          {/* Meta: feast + period + origin */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <div>
              <span className="text-stone-500 text-xs block mb-0.5 uppercase tracking-wider">Ethiopian Feast</span>
              <span className="text-amber-300">{saint.feastDayEthiopian}</span>
            </div>
            <div>
              <span className="text-stone-500 text-xs block mb-0.5 uppercase tracking-wider">Gregorian</span>
              <span className="text-amber-300">{saint.feastDayGregorian}</span>
            </div>
            {saint.century && (
              <div>
                <span className="text-stone-500 text-xs block mb-0.5 uppercase tracking-wider">Period</span>
                <span className="text-amber-300">{saint.century}</span>
              </div>
            )}
            {saint.origin && (
              <div>
                <span className="text-stone-500 text-xs block mb-0.5 uppercase tracking-wider">Origin</span>
                <span className="text-amber-300">{saint.origin}</span>
              </div>
            )}
          </div>
        </div>

        {/* Book chapter body */}
        <div className="px-6 sm:px-10 py-8 space-y-10">

          {/* Opening summary */}
          <div className="border-l-2 border-amber-700/50 pl-5 py-1">
            <p className="text-amber-200/80 text-base sm:text-lg leading-[1.9] italic">
              {saint.bio}
            </p>
          </div>

          {/* Full biography */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Scroll className="w-4 h-4 text-amber-600/70" />
              <h3 className="text-amber-500 font-semibold text-xs uppercase tracking-[0.15em]">
                Life & Legacy
              </h3>
              <div className="flex-1 h-px bg-amber-900/30" />
            </div>
            <div className="text-stone-300 text-base sm:text-[15px] leading-[1.95] space-y-5">
              {saint.fullBio.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Quote */}
          {saint.quote && (
            <div className="bg-amber-950/30 rounded-xl border border-amber-900/30 px-6 py-5">
              <p className="text-amber-200/90 italic text-base sm:text-lg leading-relaxed">
                &ldquo;{saint.quote}&rdquo;
              </p>
            </div>
          )}

          {/* Miracles */}
          {saint.miracles && saint.miracles.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <Sparkles className="w-4 h-4 text-amber-600/70" />
                <h3 className="text-amber-500 font-semibold text-xs uppercase tracking-[0.15em]">
                  Miracles & Notable Deeds
                </h3>
                <div className="flex-1 h-px bg-amber-900/30" />
              </div>
              <ul className="space-y-3">
                {saint.miracles.map((miracle, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone-300 text-sm sm:text-[15px] leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-600/60 flex-shrink-0" />
                    <span>{miracle}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Monastery / Church */}
          {saint.monastery && (
            <div className="flex items-start gap-3 bg-amber-950/20 rounded-xl px-5 py-4 border border-amber-900/25">
              <MapPin className="w-4 h-4 text-amber-600/70 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-stone-500 text-xs block mb-0.5 uppercase tracking-wider">Monastery / Church</span>
                <span className="text-amber-200 text-sm">{saint.monastery}</span>
              </div>
            </div>
          )}

          {/* Patron of */}
          {saint.patronOf && saint.patronOf.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-4 h-4 text-amber-600/70" />
                <h3 className="text-amber-500 font-semibold text-xs uppercase tracking-[0.15em]">
                  Patron Of
                </h3>
                <div className="flex-1 h-px bg-amber-900/30" />
              </div>
              <div className="flex flex-wrap gap-2">
                {saint.patronOf.map((p, i) => (
                  <span
                    key={i}
                    className="text-xs text-stone-300 bg-stone-800/50 px-3 py-1.5 rounded-full border border-stone-700/40"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Scripture readings */}
          {saint.scriptureReadings && saint.scriptureReadings.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <BookOpen className="w-4 h-4 text-amber-600/70" />
                <h3 className="text-amber-500 font-semibold text-xs uppercase tracking-[0.15em]">
                  Scripture Readings
                </h3>
                <div className="flex-1 h-px bg-amber-900/30" />
              </div>
              <ul className="space-y-3">
                {saint.scriptureReadings.map((reading, i) => (
                  <li
                    key={i}
                    className="text-stone-300 text-sm sm:text-[15px] leading-relaxed pl-4 border-l border-amber-800/40"
                  >
                    {reading}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Bottom spacer */}
          <div className="h-4" />
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function SaintsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<SaintCategory | "All">("All")
  const [selectedSaint, setSelectedSaint] = useState<Saint | null>(null)

  const filteredSaints = useMemo(() => {
    if (searchQuery.trim()) {
      const results = searchSaints(searchQuery)
      if (selectedCategory !== "All") {
        return results.filter((s) => s.categories.includes(selectedCategory as SaintCategory))
      }
      return results
    }
    if (selectedCategory === "All") return saints
    return getSaintsByCategory(selectedCategory as SaintCategory)
  }, [searchQuery, selectedCategory])

  const isFiltered = searchQuery.trim() !== "" || selectedCategory !== "All"

  const groupedSections = useMemo(() => {
    if (isFiltered) return null
    const sectionOrder: SaintCategory[] = [
      "Nine Saints",
      "Archangels",
      "Martyrs",
      "Church Fathers",
      "Monastic Saints",
      "Hermits",
      "Holy Women",
      "Royal Saints",
      "Repentance",
    ]
    const seen = new Set<string>()
    return sectionOrder
      .map((category) => {
        const primary = saints.filter((s) => s.categories[0] === category && !seen.has(s.id))
        primary.forEach((s) => seen.add(s.id))
        const extra = saints.filter((s) => s.categories.includes(category) && !seen.has(s.id))
        extra.forEach((s) => seen.add(s.id))
        return { category, saints: [...primary, ...extra] }
      })
      .filter((sec) => sec.saints.length > 0)
  }, [isFiltered])

  return (
    <div className="min-h-screen bg-[#0d0a06] text-stone-100">

      {/* Book introduction */}
      <BookIntroduction />

      {/* Saint of the day */}
      <SaintOfTheDay onSelect={setSelectedSaint} />

      {/* Sticky search + filter bar */}
      <div className="sticky top-0 z-30 bg-[#0d0a06]/97 backdrop-blur-md border-b border-amber-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, title, or category…"
              className="pl-9 bg-[#1a1208] border-amber-900/30 text-stone-200 placeholder:text-stone-600 focus:border-amber-700/50 h-9"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-amber-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory("All")}
              className={`flex-shrink-0 h-7 px-3 text-xs rounded-full border transition-all ${
                selectedCategory === "All"
                  ? "bg-amber-900/40 text-amber-200 border-amber-700/50"
                  : "text-stone-500 border-transparent hover:text-amber-300 hover:border-amber-800/50"
              }`}
            >
              All
            </Button>
            {ALL_CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory(selectedCategory === cat ? "All" : cat)}
                className={`flex-shrink-0 h-7 px-3 text-xs rounded-full border transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? CATEGORY_COLORS[cat]
                    : "text-stone-500 border-transparent hover:text-amber-300 hover:border-amber-800/50"
                }`}
              >
                {CATEGORY_ICONS[cat]}
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {isFiltered ? (
          <div>
            <p className="text-stone-500 text-sm mb-6">
              {filteredSaints.length === 0
                ? "No results found."
                : `${filteredSaints.length} ${filteredSaints.length === 1 ? "result" : "results"}`}
            </p>
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredSaints.map((saint) => (
                  <SaintCard
                    key={saint.id}
                    saint={saint}
                    onClick={() => setSelectedSaint(saint)}
                  />
                ))}
              </div>
            </AnimatePresence>
          </div>
        ) : (
          <div className="space-y-16">
            {groupedSections?.map(({ category, saints: sectionSaints }) => {
              const header = SECTION_HEADERS[category]
              return (
                <section key={category}>
                  {/* Section heading */}
                  <div className="mb-7">
                    {header ? (
                      <>
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border mb-3 ${CATEGORY_COLORS[category]}`}>
                          {CATEGORY_ICONS[category]}
                          {category}
                        </span>
                        <h2 className="text-amber-100 font-bold text-2xl sm:text-3xl">{header.title}</h2>
                        <p className="text-amber-500/60 font-ethiopic text-xl mt-0.5">{header.amharic}</p>
                        <p className="text-stone-500 text-sm mt-1.5 max-w-xl">{header.subtitle}</p>
                      </>
                    ) : (
                      <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full border ${CATEGORY_COLORS[category]}`}>
                        {CATEGORY_ICONS[category]}
                        {category}
                      </span>
                    )}
                    <div className="mt-5 h-px bg-gradient-to-r from-amber-900/40 via-amber-800/20 to-transparent" />
                  </div>

                  {/* Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {sectionSaints.map((saint) => (
                      <SaintCard
                        key={saint.id}
                        saint={saint}
                        onClick={() => setSelectedSaint(saint)}
                      />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedSaint && (
          <SaintModal
            saint={selectedSaint}
            onClose={() => setSelectedSaint(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
