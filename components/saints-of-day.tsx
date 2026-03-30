"use client"

import { useEffect, useMemo, useState } from "react"
import { Bookmark, CalendarDays, Dices, Search, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  allSynaxariumEntries,
  formatGregorianDate,
  getRandomSynaxariumEntry,
  getSaintsForToday,
  searchSynaxariumEntries,
  type SynaxariumEntry,
} from "@/lib/synaxarium"

const SAVED_SAINTS_KEY = "johns-repentance-saved-saints"

export function SaintsOfDay() {
  const today = useMemo(() => new Date(), [])
  const { ethiopianDate, entry } = useMemo(() => getSaintsForToday(today), [today])
  const gregorianLabel = useMemo(() => formatGregorianDate(today), [today])
  const [query, setQuery] = useState("")
  const [featuredEntry, setFeaturedEntry] = useState<SynaxariumEntry | null>(entry)
  const [savedDateKeys, setSavedDateKeys] = useState<string[]>([])

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(SAVED_SAINTS_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setSavedDateKeys(parsed.filter((item): item is string => typeof item === "string"))
        }
      }
    } catch {
      setSavedDateKeys([])
    }
  }, [])

  const searchResults = useMemo(() => searchSynaxariumEntries(query).slice(0, 8), [query])
  const savedCount = savedDateKeys.length
  const isSaved = featuredEntry ? savedDateKeys.includes(featuredEntry.dateKey) : false

  const toggleSave = (dateKey: string) => {
    const next = savedDateKeys.includes(dateKey)
      ? savedDateKeys.filter((item) => item !== dateKey)
      : [dateKey, ...savedDateKeys]

    setSavedDateKeys(next)
    window.localStorage.setItem(SAVED_SAINTS_KEY, JSON.stringify(next))
  }

  const handleRandomSaint = () => {
    const nextEntry = getRandomSynaxariumEntry(featuredEntry?.dateKey)
    if (nextEntry) setFeaturedEntry(nextEntry)
  }

  return (
    <section className="container mx-auto px-4 py-8 md:py-10">
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="overflow-hidden border-none bg-[linear-gradient(135deg,rgba(120,53,15,0.96),rgba(180,83,9,0.92)_45%,rgba(251,191,36,0.88))] text-white shadow-[0_24px_80px_-40px_rgba(146,64,14,0.9)]">
          <CardHeader className="relative pb-4">
            <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur">
              <Sparkles className="h-5 w-5 text-amber-100" />
            </div>
            <Badge className="w-fit rounded-full bg-white/15 px-3 py-1 text-amber-50 hover:bg-white/15">
              Saints of the Day
            </Badge>
            <CardTitle className="max-w-2xl text-3xl md:text-4xl">Your daily Synaxarium lives here.</CardTitle>
            <CardDescription className="max-w-2xl text-base text-amber-50/85">
              Open Youth Corner and meet the saints, stories, and witness connected to today&apos;s Ethiopian date.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex flex-col gap-3 rounded-[28px] border border-white/15 bg-white/8 p-4 text-amber-50/95 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-amber-100" />
                <div>
                  <p className="text-2xl font-black tracking-tight md:text-3xl">{gregorianLabel}</p>
                  <p className="text-sm text-amber-100/80">Gregorian date</p>
                </div>
              </div>
              <div className="sm:text-right">
                <p className="text-2xl font-black tracking-tight md:text-3xl">{ethiopianDate.label}</p>
                <p className="text-sm text-amber-100/80">Ethiopian date</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-amber-50/90">
              <span className="rounded-full bg-white/10 px-3 py-1.5">Saved {savedCount}</span>
            </div>

            {featuredEntry ? (
              <div className="rounded-[28px] border border-white/15 bg-black/15 p-5 backdrop-blur-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-amber-100/75">Today&apos;s commemoration</p>
                <h3 className="mt-2 text-2xl font-bold">{featuredEntry.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {featuredEntry.saints.slice(0, 6).map((saint) => (
                    <Badge key={saint} variant="secondary" className="rounded-full bg-white/12 px-3 py-1 text-amber-50">
                      {saint}
                    </Badge>
                  ))}
                </div>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-amber-50/90">{featuredEntry.preview}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="rounded-full bg-white text-orange-900 hover:bg-amber-50">Read More</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl border-orange-200 bg-[#fff9ef]">
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-stone-950">{featuredEntry.title}</DialogTitle>
                        <DialogDescription className="text-stone-600">
                          Full Synaxarium reading for {featuredEntry.month} {featuredEntry.day}
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="max-h-[65vh] pr-4">
                        <div className="space-y-4">
                          {featuredEntry.saints.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {featuredEntry.saints.map((saint) => (
                                <Badge key={saint} className="rounded-full bg-amber-100 text-amber-900 hover:bg-amber-100">
                                  {saint}
                                </Badge>
                              ))}
                            </div>
                          ) : null}
                          <p className="text-sm leading-7 text-stone-700">{featuredEntry.fullText}</p>
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => toggleSave(featuredEntry.dateKey)}
                    className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/15 hover:text-white"
                  >
                    <Bookmark className="mr-2 h-4 w-4" />
                    {isSaved ? "Saved" : "Save Saint"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleRandomSaint}
                    className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  >
                    <Dices className="mr-2 h-4 w-4" />
                    Random Saint
                  </Button>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card className="border-orange-200/70 bg-white/90 shadow-[0_18px_50px_-34px_rgba(234,88,12,0.45)] dark:border-orange-900/30 dark:bg-stone-950/40">
          <CardHeader>
            <CardDescription className="text-orange-700 dark:text-amber-300">Search the Synaxarium</CardDescription>
            <CardTitle className="text-3xl text-stone-950 dark:text-stone-50">Find a saint or date</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search Meskerem 4, Megabit 18, Mary, Gabriel..."
                className="h-11 rounded-full border-orange-200 bg-orange-50/60 pl-9"
              />
            </div>

            <div className="rounded-3xl bg-orange-50/60 p-3 dark:bg-orange-950/20">
              <p className="text-sm font-medium text-stone-700 dark:text-stone-200">
                {query ? `Showing ${searchResults.length} results` : `Browse all ${allSynaxariumEntries.length} days`}
              </p>
            </div>

            <ScrollArea className="h-[360px] pr-4">
              <div className="space-y-3">
                {searchResults.map((result) => (
                  <button
                    key={result.dateKey}
                    type="button"
                    onClick={() => setFeaturedEntry(result)}
                    className={`w-full rounded-3xl border p-4 text-left transition-colors ${
                      featuredEntry?.dateKey === result.dateKey
                        ? "border-orange-400 bg-orange-100/80"
                        : "border-orange-200/70 bg-white hover:bg-orange-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-stone-950">{result.title}</p>
                        <p className="text-sm text-stone-500">Ethiopian calendar entry</p>
                      </div>
                      {savedDateKeys.includes(result.dateKey) ? (
                        <Badge className="rounded-full bg-amber-100 text-amber-900 hover:bg-amber-100">Saved</Badge>
                      ) : null}
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600">
                      {result.saints.length > 0 ? result.saints.join(" • ") : result.preview}
                    </p>
                  </button>
                ))}

                {searchResults.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-orange-300 bg-orange-50/60 p-5 text-sm text-stone-600">
                    No saints found for that search.
                  </div>
                ) : null}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
