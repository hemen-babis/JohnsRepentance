"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { GeezHeading } from "@/components/geez-heading"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Search, BookOpen, Download, GraduationCap, Bell, Heart } from "lucide-react"

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

export default function DeaconsCornerPage() {
  const [showMisbakEmbed, setShowMisbakEmbed] = useState(true)
  const [misbakQuery, setMisbakQuery] = useState("")
  const [misbakLoading, setMisbakLoading] = useState(false)
  const [selectedVideoId, setSelectedVideoId] = useState("GfBL_vM8eSM")
  const [misbakResults, setMisbakResults] = useState<Array<{ id: string; title: string; thumb: string }>>([])

  const searchMisbak = async () => {
    setMisbakLoading(true)
    try {
      const res = await fetch(`/api/youtube/playlist-search?q=${encodeURIComponent(misbakQuery)}`)
      const data = (await res.json()) as { items?: Array<{ id: string; title: string; thumb: string }> }
      const items = data.items ?? []
      setMisbakResults(items)
      if (items.length > 0) {
        setSelectedVideoId(items[0].id)
        setShowMisbakEmbed(true)
      }
    } catch {
      setMisbakResults([])
    } finally {
      setMisbakLoading(false)
    }
  }

  return (
    <div className="light-mode-adaptive-page bg-gradient-to-b from-gray-950 to-gray-900 min-h-screen">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/5 to-red-600/5 z-0" />
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-5 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <GeezHeading className="mb-4 text-amber-500">የዲያቆናት ማዕዘን</GeezHeading>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Deacon&apos;s Corner</h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Comprehensive resources for Ethiopian Orthodox deacons, including liturgical texts, training materials,
              and spiritual guidance.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="misbak" className="w-full">
              <div className="flex justify-center mb-8 overflow-x-auto pb-2 scrollbar-hide">
                <TabsList className="inline-flex w-max min-w-full lg:w-full lg:max-w-4xl lg:grid lg:grid-cols-5 gap-1">
                  <TabsTrigger value="misbak" className="whitespace-nowrap min-w-[130px]">
                    <BookOpen className="h-4 w-4 mr-1 inline-block" />
                    Misbak
                  </TabsTrigger>
                  <TabsTrigger value="abinet" className="whitespace-nowrap min-w-[130px]">
                    <GraduationCap className="h-4 w-4 mr-1 inline-block" />
                    Abinet
                  </TabsTrigger>
                  <TabsTrigger value="prayers" className="whitespace-nowrap min-w-[130px]">
                    <Heart className="h-4 w-4 mr-1 inline-block" />
                    Prayers
                  </TabsTrigger>
                  <TabsTrigger value="events" className="whitespace-nowrap min-w-[130px]">
                    <Bell className="h-4 w-4 mr-1 inline-block" />
                    Events
                  </TabsTrigger>
                  <TabsTrigger value="downloads" className="whitespace-nowrap min-w-[130px]">
                    <Download className="h-4 w-4 mr-1 inline-block" />
                    Downloads
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="misbak">
                <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                  <motion.div variants={fadeInUp}>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">Misbak Resource Center</h2>
                      <p className="text-gray-400">Use this direct YouTube playlist for weekly Misbak practice.</p>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Card className="border-none shadow-lg overflow-hidden bg-gray-900">
                      <div className="h-2 bg-gradient-to-r from-amber-500 to-amber-700" />
                      <CardContent className="p-6">
                        <div className="mb-4 rounded-xl border border-amber-300 bg-amber-100 p-3">
                          <p className="text-sm font-semibold text-amber-900">Announcement</p>
                          <p className="text-sm text-amber-800 mt-1">
                            Misbak of the Week is shared on Tuesdays and also 3 days before a feast.
                          </p>
                        </div>

                        <div className="mb-5 rounded-xl border border-amber-200 bg-white p-3">
                          <p className="text-sm text-stone-800 mb-2">
                            Search in English (for example, <span className="font-semibold">&quot;tekeneyu&quot;</span>) or in
                            Amharic to quickly find the Misbak you need.
                          </p>
                          <div className="flex flex-col md:flex-row gap-2">
                            <div className="relative flex-1">
                              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                              <Input
                                value={misbakQuery}
                                onChange={(e) => setMisbakQuery(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && searchMisbak()}
                                placeholder="Search Misbak in this playlist..."
                                className="pl-10 bg-white border-amber-200 text-stone-900"
                              />
                            </div>
                            <Button onClick={searchMisbak} className="bg-amber-500 hover:bg-amber-600 text-black w-full md:w-auto">
                              Search
                            </Button>
                          </div>
                          {misbakLoading && <p className="text-xs text-stone-600 mt-2">Searching playlist...</p>}
                        </div>

                        <div className="mb-4 flex flex-wrap items-center gap-2">
                          <Button
                            onClick={() => setShowMisbakEmbed(true)}
                            className={showMisbakEmbed ? "bg-amber-500 hover:bg-amber-600 text-black" : "bg-gray-800 hover:bg-gray-700 text-white"}
                          >
                            In-page Player
                          </Button>
                        </div>

                        {showMisbakEmbed && (
                          <div className="overflow-hidden rounded-xl border border-gray-700">
                            <div className="aspect-video w-full">
                              <iframe
                                className="h-full w-full"
                                src={`https://www.youtube.com/embed/${selectedVideoId}?list=PLluUizhBpZV9aKPupYA5X_FMmzAD1UNR1`}
                                title="Misbak Playlist"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                              />
                            </div>
                          </div>
                        )}

                        {misbakResults.length > 0 && (
                          <div className="mt-4 grid md:grid-cols-2 gap-3">
                            {misbakResults.map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                  setSelectedVideoId(item.id)
                                  setShowMisbakEmbed(true)
                                }}
                                className="text-left rounded-lg border border-gray-700 bg-gray-800 p-3 hover:bg-gray-750"
                              >
                                <div className="flex items-center gap-3">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={item.thumb} alt={item.title} className="h-14 w-20 rounded object-cover" />
                                  <p className="text-sm text-white line-clamp-2">{item.title}</p>
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
                    <iframe
                      className="block h-[78vh] min-h-[720px] w-full border-0 bg-transparent"
                      src="https://www.eathebook.org"
                      title="eathebook.org Abinet Study"
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      sandbox="allow-same-origin allow-scripts allow-forms"
                    />
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="prayers">
                <div className="text-center py-16">
                  <h2 className="text-2xl font-bold text-white mb-4">Prayer & Spiritual Growth</h2>
                  <p className="text-gray-400 mb-8">Daily prayer schedules, guided meditations, and spiritual resources</p>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black">Coming Soon</Button>
                </div>
              </TabsContent>

              <TabsContent value="events">
                <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                  <motion.div variants={fadeInUp}>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">Events & Announcements</h2>
                      <p className="text-gray-400">Deacon-recommended classes and weekly formation events.</p>
                    </div>
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <Card className="border-none shadow-lg overflow-hidden bg-gray-900">
                      <div className="h-2 bg-gradient-to-r from-amber-500 to-amber-700" />
                      <CardContent className="p-6 space-y-4">
                        <div className="rounded-xl border border-amber-400/40 bg-amber-500/10 p-4">
                          <p className="text-sm font-semibold text-amber-300 mb-1">Learning About Service (Deacons Encouraged)</p>
                          <p className="text-white text-sm">Every Wednesday, 3:00 PM - 4:00 PM</p>
                          <p className="text-amber-100 text-sm mt-1">Taught by MT Dn. Kidus Adugna</p>
                        </div>
                        <div className="rounded-xl border border-amber-400/40 bg-amber-500/10 p-4">
                          <p className="text-sm font-semibold text-amber-300 mb-1">Catechumen Class (Open to All)</p>
                          <p className="text-white text-sm">Every Friday, 6:00 PM - 8:00 PM</p>
                          <p className="text-amber-100 text-sm mt-1">Taught by MT Dn. Kidus Adugna</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="downloads">
                <div className="text-center py-16">
                  <h2 className="text-2xl font-bold text-white mb-4">Downloadable Resources</h2>
                  <p className="text-gray-400 mb-8">Quick-reference guides, printable materials, and useful resources</p>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black">Coming Soon</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  )
}
