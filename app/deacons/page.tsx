"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Search, BookOpen, Download, GraduationCap, Bell, Heart, CalendarDays, ExternalLink } from "lucide-react"
import { liturgicalReadings } from "@/app/calendar-events/_components/liturgical-readings-data"
import { ReadingModal } from "@/app/calendar-events/_components/reading-modal"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const ethiopicEnFormatter = new Intl.DateTimeFormat("en-ET-u-ca-ethiopic", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

function getUpcomingSunday(baseDate = new Date()) {
  const date = new Date(baseDate)
  date.setHours(12, 0, 0, 0)
  const daysUntilSunday = (7 - date.getDay()) % 7
  date.setDate(date.getDate() + daysUntilSunday)
  return date
}

function getNormalizedEthiopicParts(date: Date) {
  const parts = ethiopicEnFormatter.formatToParts(date)
  const day = Number.parseInt(parts.find((part) => part.type === "day")?.value ?? "1", 10)
  const rawMonth = parts.find((part) => part.type === "month")?.value ?? "Meskerem"
  const monthAliases: Record<string, string> = {
    Tekemt: "Tikimt",
    Hedar: "Hidar",
    Ter: "Tir",
    Genbot: "Ginbot",
    Nehasse: "Nehase",
  }

  return {
    day,
    month: monthAliases[rawMonth] ?? rawMonth,
    rawMonth,
  }
}

export default function DeaconsCornerPage() {
  const [misbakQuery, setMisbakQuery] = useState("")
  const [misbakLoading, setMisbakLoading] = useState(false)
  const [misbakResults, setMisbakResults] = useState<Array<{ id: string; title: string; thumb: string }>>([])
  const [selectedVideoId, setSelectedVideoId] = useState("XA9Oro8uIuE")
  const [readingModalOpen, setReadingModalOpen] = useState(false)

  const thisSunday = useMemo(() => getUpcomingSunday(), [])
  const thisSundayGregorian = useMemo(
    () =>
      thisSunday.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    [thisSunday],
  )
  const thisSundayEth = useMemo(() => getNormalizedEthiopicParts(thisSunday), [thisSunday])
  const thisSundayReadingKey = `${thisSundayEth.month} ${thisSundayEth.day}`
  const thisSundayReading = liturgicalReadings[thisSundayReadingKey] ?? null
  const PLAYLIST_ID = "PLluUizhBpZV9aKPupYA5X_FMmzAD1UNR1"

  const searchMisbak = async (query = misbakQuery) => {
    setMisbakLoading(true)
    try {
      const res = await fetch(`/api/youtube/playlist-search?q=${encodeURIComponent(query)}`)
      const data = (await res.json()) as { items?: Array<{ id: string; title: string; thumb: string }> }
      const items = data.items ?? []
      setMisbakResults(items)
      if (items.length > 0) setSelectedVideoId(items[0].id)
    } catch {
      setMisbakResults([])
    } finally {
      setMisbakLoading(false)
    }
  }

  useEffect(() => { void searchMisbak("") }, [])

  return (
    <div className="light-mode-adaptive-page min-h-screen parchment-page-bg dark:bg-none dark:bg-gradient-to-b dark:from-[#120d09] dark:via-[#24140d] dark:to-[#140d09]">
      <section className="relative overflow-hidden px-4 pb-10 pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.16),transparent_36%)]" />
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.05]" />
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-14 max-w-5xl rounded-[2rem] border border-amber-200/70 bg-[linear-gradient(180deg,rgba(255,252,246,0.92),rgba(247,234,212,0.8))] px-6 py-12 text-center shadow-[0_30px_90px_-48px_rgba(120,53,15,0.38)] backdrop-blur-sm md:px-10 md:py-14"
          >
            <div className="mb-5 inline-flex rounded-full border border-amber-300/70 bg-white/55 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-700">
              የዲያቆናት ማዕዘን
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-[#3a1e01] md:text-6xl">Deacon&apos;s Corner</h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-stone-700">
              Comprehensive resources for Ethiopian Orthodox deacons, including liturgical texts, training materials,
              and spiritual guidance.
            </p>
            <div className="mx-auto mt-8 grid max-w-4xl gap-3 text-left md:grid-cols-3">
              {[
                ["Misbak", "Weekly readings, playlist search, and the in-page player."],
                ["Abinet", "Study access with cleaner in-page browsing."],
                ["Formation", "Events, prayer tools, and future downloads in one place."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-amber-200/70 bg-white/65 px-5 py-4 shadow-[0_12px_30px_-22px_rgba(120,53,15,0.28)]">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-700">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-[96rem]">
            <Tabs defaultValue="misbak" className="w-full">
              <div className="mb-10 flex justify-center overflow-x-auto pb-2 scrollbar-hide">
                <TabsList className="inline-flex w-max min-w-full gap-1 rounded-[1.6rem] border border-amber-200/70 bg-white/70 p-1.5 shadow-[0_18px_50px_-34px_rgba(120,53,15,0.32)] lg:w-full lg:max-w-4xl lg:grid lg:grid-cols-5">
                  <TabsTrigger value="misbak" className="whitespace-nowrap min-w-[130px] rounded-[1.1rem] data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-amber-500 data-[state=active]:text-white">
                    <BookOpen className="mr-1 inline-block h-4 w-4" />
                    Misbak
                  </TabsTrigger>
                  <TabsTrigger value="abinet" className="whitespace-nowrap min-w-[130px] rounded-[1.1rem] data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-amber-500 data-[state=active]:text-white">
                    <GraduationCap className="mr-1 inline-block h-4 w-4" />
                    Abinet
                  </TabsTrigger>
                  <TabsTrigger value="prayers" className="whitespace-nowrap min-w-[130px] rounded-[1.1rem] data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-amber-500 data-[state=active]:text-white">
                    <Heart className="mr-1 inline-block h-4 w-4" />
                    Prayers
                  </TabsTrigger>
                  <TabsTrigger value="events" className="whitespace-nowrap min-w-[130px] rounded-[1.1rem] data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-amber-500 data-[state=active]:text-white">
                    <Bell className="mr-1 inline-block h-4 w-4" />
                    Events
                  </TabsTrigger>
                  <TabsTrigger value="downloads" className="whitespace-nowrap min-w-[130px] rounded-[1.1rem] data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-amber-500 data-[state=active]:text-white">
                    <Download className="mr-1 inline-block h-4 w-4" />
                    Downloads
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="misbak">
                <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                  <motion.div variants={fadeInUp}>
                    <div className="mb-8 text-center">
                      <h2 className="text-3xl font-bold text-[#3a1e01]">Misbak Resource Center</h2>
                      <p className="mt-2 text-stone-600">Use the playlist, Sunday readings, and search tools in one place.</p>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Card className="overflow-hidden rounded-[2rem] border border-amber-200/80 bg-[linear-gradient(180deg,rgba(255,252,246,0.94),rgba(247,234,212,0.82))] shadow-[0_28px_70px_-42px_rgba(120,53,15,0.38)]">
                      <div className="h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-[#3a1e01]" />
                      <CardContent className="p-5 md:p-7">
                        <div className="mb-5 rounded-[1.5rem] border border-amber-300/80 bg-white/60 p-4">
                          {thisSundayReading && (
                            <div className="mb-4 rounded-[1.5rem] border border-orange-200 bg-[linear-gradient(180deg,rgba(255,248,238,0.92),rgba(255,242,220,0.88))] p-4 shadow-[0_14px_40px_-28px_rgba(154,52,18,0.28)]">
                              <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                  <div className="flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4 text-orange-700" />
                                    <p className="text-sm font-semibold text-orange-900">This Sunday Reading</p>
                                  </div>
                                  <div className="flex shrink-0 items-start">
                                    <Button onClick={() => setReadingModalOpen(true)} className="bg-orange-600 text-white hover:bg-orange-500">
                                      Open Full Reading
                                    </Button>
                                  </div>
                                </div>

                                <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
                                  <div className="space-y-3">
                                    <p className="text-sm text-orange-800">
                                      {thisSundayGregorian} • {thisSundayEth.rawMonth} {thisSundayEth.day}, 2018 E.C.
                                    </p>
                                    <p className="text-lg font-semibold text-stone-900">{thisSundayReading.mezmur.am}</p>
                                    <p className="text-sm text-stone-700">{thisSundayReading.mezmur.en}</p>
                                    <div className="grid gap-2 pt-1 md:grid-cols-2">
                                      <div className="rounded-xl bg-white/85 p-3 ring-1 ring-amber-200/70">
                                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Pauline</p>
                                        <p className="mt-1 text-sm font-medium text-stone-900">{thisSundayReading.readings.pauline.am}</p>
                                        <p className="text-xs text-stone-600">{thisSundayReading.readings.pauline.en}</p>
                                      </div>
                                      <div className="rounded-xl bg-white/85 p-3 ring-1 ring-amber-200/70">
                                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Gospel</p>
                                        <p className="mt-1 text-sm font-medium text-stone-900">{thisSundayReading.gospel.am}</p>
                                        <p className="text-xs text-stone-600">{thisSundayReading.gospel.en}</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="rounded-[1.35rem] bg-white/88 p-5 ring-1 ring-amber-200/80 shadow-[0_12px_32px_-26px_rgba(120,53,15,0.24)]">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Ge&apos;ez Misbak</p>
                                    <div className="mt-4 space-y-2">
                                      {thisSundayReading.misbak.geez.slice(0, 3).map((line) => (
                                        <p key={line} className="text-base font-medium leading-8 text-stone-900">
                                          {line}
                                        </p>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          <p className="text-sm font-semibold text-amber-900">Announcement</p>
                          <p className="mt-1 text-sm text-amber-800">
                            Misbak of the Week is shared on Tuesdays and also 3 days before a feast.
                          </p>
                        </div>

                        {/* Search */}
                        <div className="mb-5 rounded-[1.5rem] border border-amber-200/80 bg-white/70 p-4 shadow-[0_12px_32px_-26px_rgba(120,53,15,0.24)]">
                          <p className="mb-2 text-sm text-stone-800">
                            Search in English (for example, <span className="font-semibold">&quot;tekeneyu&quot;</span>) or in Amharic to find the Misbak you need.
                          </p>
                          <div className="flex flex-col gap-2 md:flex-row">
                            <div className="relative flex-1">
                              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                              <Input
                                value={misbakQuery}
                                onChange={(e) => setMisbakQuery(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && void searchMisbak()}
                                placeholder="Search Misbak in this playlist..."
                                className="border-amber-200 bg-white pl-10 text-stone-900"
                              />
                            </div>
                            <Button onClick={() => void searchMisbak()} className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white hover:from-orange-700 hover:to-amber-600 md:w-auto">
                              Search
                            </Button>
                          </div>
                          {misbakLoading && <p className="mt-2 text-xs text-stone-600">Searching playlist...</p>}
                        </div>

                        {/* Player */}
                        <div className="overflow-hidden rounded-[1.5rem] border border-amber-200/80 shadow-[0_18px_44px_-28px_rgba(120,53,15,0.24)]">
                          <div className="aspect-video w-full">
                            <iframe
                              className="h-full w-full"
                              src={`https://www.youtube.com/embed/${selectedVideoId}?list=${PLAYLIST_ID}`}
                              title="Misbak Playlist"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                            />
                          </div>
                        </div>

                        {/* Results */}
                        {misbakResults.length > 0 && (
                          <div className="mt-4 grid gap-3 md:grid-cols-2">
                            {misbakResults.map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setSelectedVideoId(item.id)}
                                className={`rounded-xl border p-3 text-left shadow-sm transition hover:bg-white ${selectedVideoId === item.id ? "border-orange-400 bg-orange-50" : "border-amber-200/80 bg-white/78"}`}
                              >
                                <div className="flex items-center gap-3">
                                  <img src={item.thumb} alt={item.title} className="h-14 w-20 shrink-0 rounded object-cover" />
                                  <p className="line-clamp-2 text-sm text-stone-800">{item.title}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="abinet">
                <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                  <motion.div variants={fadeInUp}>
                    <div className="overflow-hidden rounded-[2rem] border border-amber-200/80 bg-[linear-gradient(180deg,rgba(255,252,246,0.94),rgba(247,234,212,0.82))] p-4 shadow-[0_28px_70px_-42px_rgba(120,53,15,0.38)]">
                      <div className="mb-3 rounded-[1.1rem] border border-amber-200/80 bg-white/80 px-4 py-3 text-sm text-stone-700">
                        Log in to save your progress.
                      </div>
                      <iframe
                        className="block h-[82vh] min-h-[820px] w-full rounded-[1.5rem] border-0 bg-white"
                        src="https://debelo.org/"
                        title="Debelo Abinet Study"
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads allow-top-navigation-by-user-activation"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="prayers">
                <div className="rounded-[2rem] border border-amber-200/80 bg-[linear-gradient(180deg,rgba(255,252,246,0.94),rgba(247,234,212,0.82))] px-6 py-16 text-center shadow-[0_28px_70px_-42px_rgba(120,53,15,0.38)]">
                  <h2 className="mb-4 text-2xl font-bold text-[#3a1e01]">Prayer & Spiritual Growth</h2>
                  <p className="mb-8 text-stone-600">Daily prayer schedules, guided meditations, and spiritual resources.</p>
                  <Button className="bg-gradient-to-r from-orange-600 to-amber-500 text-white hover:from-orange-700 hover:to-amber-600">Coming Soon</Button>
                </div>
              </TabsContent>

              <TabsContent value="events">
                <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                  <motion.div variants={fadeInUp}>
                    <div className="mb-8 text-center">
                      <h2 className="mb-2 text-2xl font-bold text-[#3a1e01]">Events & Announcements</h2>
                      <p className="text-stone-600">Deacon-recommended classes and weekly formation events.</p>
                    </div>
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <Card className="overflow-hidden rounded-[2rem] border border-amber-200/80 bg-[linear-gradient(180deg,rgba(255,252,246,0.94),rgba(247,234,212,0.82))] shadow-[0_28px_70px_-42px_rgba(120,53,15,0.38)]">
                      <div className="h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-[#3a1e01]" />
                      <CardContent className="space-y-4 p-6">
                        <div className="rounded-xl border border-amber-300/70 bg-white/70 p-4">
                          <p className="mb-1 text-sm font-semibold text-[#3a1e01]">Learning About Service (Deacons Encouraged)</p>
                          <p className="text-sm text-stone-700">Every Wednesday, 3:00 PM - 4:00 PM</p>
                          <p className="mt-1 text-sm text-orange-700">Taught by MT Dn. Kidus Adugna</p>
                        </div>
                        <div className="rounded-xl border border-amber-300/70 bg-white/70 p-4">
                          <p className="mb-1 text-sm font-semibold text-[#3a1e01]">Catechumen Class (Open to All)</p>
                          <p className="text-sm text-stone-700">Every Friday, 6:00 PM - 8:00 PM</p>
                          <p className="mt-1 text-sm text-orange-700">Taught by MT Dn. Kidus Adugna</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="downloads">
                <div className="rounded-[2rem] border border-amber-200/80 bg-[linear-gradient(180deg,rgba(255,252,246,0.94),rgba(247,234,212,0.82))] px-6 py-16 text-center shadow-[0_28px_70px_-42px_rgba(120,53,15,0.38)]">
                  <h2 className="mb-4 text-2xl font-bold text-[#3a1e01]">Downloadable Resources</h2>
                  <p className="mb-8 text-stone-600">Quick-reference guides, printable materials, and useful resources.</p>
                  <Button className="bg-gradient-to-r from-orange-600 to-amber-500 text-white hover:from-orange-700 hover:to-amber-600">Coming Soon</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <ReadingModal reading={thisSundayReading} open={readingModalOpen} onClose={() => setReadingModalOpen(false)} />
      <ScrollToTop />
    </div>
  )
}
