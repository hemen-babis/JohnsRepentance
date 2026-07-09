"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { TeachingCard } from "@/components/teachings/teaching-platform"
import { teachingCategories, teachingSubcategories, seasons, type Teaching } from "@/lib/teaching-platform"

const formats = ["Article", "Video", "Audio", "PDF Guide", "Series", "Q&A"]
const levels = ["Beginner", "Intermediate", "Advanced", "General", "Academic"]
const audiences = ["Everyone", "Catechumen", "Youth", "Servants", "Deacons", "Parents"]

export function BrowseAllTeachings({ teachings }: { teachings: Teaching[] }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [subcategory, setSubcategory] = useState("All")
  const [format, setFormat] = useState("All")
  const [level, setLevel] = useState("All")
  const [audience, setAudience] = useState("All")
  const [season, setSeason] = useState("All")
  const [sort, setSort] = useState("Newest")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const result = teachings.filter((teaching) => {
      return (
        (!q || teaching.searchText.includes(q)) &&
        (category === "All" || teaching.category === category) &&
        (subcategory === "All" || teaching.subcategory === subcategory) &&
        (format === "All" || teaching.format === format) &&
        (level === "All" || teaching.level === level) &&
        (audience === "All" || teaching.audience === audience) &&
        (season === "All" || teaching.season === season)
      )
    })

    return [...result].sort((a, b) => {
      if (sort === "Title") return a.title.localeCompare(b.title)
      if (sort === "Beginner first") return a.level.localeCompare(b.level)
      return +new Date(b.date) - +new Date(a.date)
    })
  }, [audience, category, format, level, query, season, sort, subcategory, teachings])

  const selectClass = "h-10 rounded-md border border-[#d8c59f] bg-white px-3 text-sm dark:border-orange-900/30 dark:bg-black/20"

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[280px_1fr]">
      <aside className="h-fit rounded-lg border border-[#e2d0b5] bg-[#fffaf0] p-4 dark:border-orange-900/28 dark:bg-[#211710] lg:sticky lg:top-32">
        <h2 className="mb-4 text-lg font-bold text-stone-950 dark:text-white">Filters</h2>
        <div className="space-y-4">
          {[
            ["Topic", category, setCategory, ["All", ...teachingCategories]],
            ["Subcategory", subcategory, setSubcategory, ["All", ...teachingSubcategories]],
            ["Format", format, setFormat, ["All", ...formats]],
            ["Language", "English", undefined, ["English", "Bilingual"]],
            ["Learning level", level, setLevel, ["All", ...levels]],
            ["Audience", audience, setAudience, ["All", ...audiences]],
            ["Liturgical season", season, setSeason, ["All", ...seasons]],
            ["Content type", "Full teaching", undefined, ["Full teaching", "Series item"]],
          ].map(([label, value, setter, options]) => (
            <label key={label as string} className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#8a5d1f] dark:text-amber-300">{label as string}</span>
              <select className={selectClass} value={value as string} disabled={!setter} onChange={(event) => (setter as ((value: string) => void) | undefined)?.(event.target.value)}>
                {(options as string[]).map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </aside>

      <main className="min-w-0">
        <div className="mb-5 rounded-lg border border-[#e2d0b5] bg-[#fffaf0] p-4 dark:border-orange-900/28 dark:bg-[#211710]">
          <label className="relative block">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-12 w-full rounded-full border border-[#d8c59f] bg-white pl-12 pr-4 text-sm outline-none focus:border-[#7f1d1d] dark:border-orange-900/30 dark:bg-black/20"
              placeholder="Search teachings, saints, feasts, Bible verses, or questions..."
            />
          </label>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-stone-600 dark:text-stone-300">{filtered.length} teachings found</p>
            <select className={selectClass} value={sort} onChange={(event) => setSort(event.target.value)}>
              <option>Newest</option>
              <option>Title</option>
              <option>Beginner first</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.slice(0, 72).map((teaching) => (
            <TeachingCard key={teaching.id} teaching={teaching} />
          ))}
        </div>
      </main>
    </div>
  )
}
