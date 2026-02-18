"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { GeezHeading } from "@/components/geez-heading"
import { ScrollToTop } from "@/components/scroll-to-top"
import {
  Search,
  BookOpen,
  Video,
  Calendar,
  FileText,
  ExternalLink,
  Download,
  Music,
  GraduationCap,
  Users,
  Bell,
  MessageCircle,
  Heart,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Filter,
  Play,
  Pause,
} from "lucide-react"

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
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [showMisbakEmbed, setShowMisbakEmbed] = useState(true)
  const [misbakQuery, setMisbakQuery] = useState("")
  const [misbakLoading, setMisbakLoading] = useState(false)
  const [selectedVideoId, setSelectedVideoId] = useState("GfBL_vM8eSM")
  const [misbakResults, setMisbakResults] = useState<Array<{ id: string; title: string; thumb: string }>>([])

  const toggleExpand = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id)
  }

  const toggleAudioPlay = () => {
    setIsPlaying(!isPlaying)
    // In a real implementation, this would play/pause an audio file
  }

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
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/5 to-red-600/5 dark:from-amber-900/20 dark:to-red-900/20 z-0" />
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
              and spiritual guidance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="misbak" className="w-full">
              <div className="flex justify-center mb-8 overflow-x-auto pb-2 scrollbar-hide">
                <TabsList className="grid grid-cols-4 lg:grid-cols-7 w-full max-w-4xl gap-1">
                  <TabsTrigger value="misbak" className="whitespace-nowrap">
                    <BookOpen className="h-4 w-4 mr-1 inline-block" />
                    Misbak
                  </TabsTrigger>
                  <TabsTrigger value="liturgy" className="whitespace-nowrap">
                    <Video className="h-4 w-4 mr-1 inline-block" />
                    Liturgy
                  </TabsTrigger>
                  <TabsTrigger value="abinet" className="whitespace-nowrap">
                    <GraduationCap className="h-4 w-4 mr-1 inline-block" />
                    Abinet
                  </TabsTrigger>
                  <TabsTrigger value="prayers" className="whitespace-nowrap">
                    <Heart className="h-4 w-4 mr-1 inline-block" />
                    Prayers
                  </TabsTrigger>
                  <TabsTrigger value="events" className="whitespace-nowrap">
                    <Bell className="h-4 w-4 mr-1 inline-block" />
                    Events
                  </TabsTrigger>
                  <TabsTrigger value="community" className="whitespace-nowrap">
                    <MessageCircle className="h-4 w-4 mr-1 inline-block" />
                    Community
                  </TabsTrigger>
                  <TabsTrigger value="downloads" className="whitespace-nowrap">
                    <Download className="h-4 w-4 mr-1 inline-block" />
                    Downloads
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Misbak Resource Center */}
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
                      <CardContent>
                        <div className="mb-4 rounded-xl border border-amber-300 bg-amber-100 p-3">
                          <p className="text-sm font-semibold text-amber-900">Announcement</p>
                          <p className="text-sm text-amber-800 mt-1">
                            Misbak of the Week is shared on Tuesdays and also 3 days before a feast.
                          </p>
                        </div>

                        <div className="mb-5 rounded-xl border border-gray-700 bg-gray-800/60 p-3">
                          <p className="text-sm text-stone-800 mb-2">
                            Search in English (for example, <span className="font-semibold">&quot;tekeneyu&quot;</span>) or in Amharic to quickly find the Misbak you need.
                          </p>
                          <div className="flex flex-col md:flex-row gap-2">
                            <div className="relative flex-1">
                              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                value={misbakQuery}
                                onChange={(e) => setMisbakQuery(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && searchMisbak()}
                                placeholder="Search Misbak in this playlist..."
                                className="pl-10 bg-gray-900 border-gray-700 text-white"
                              />
                            </div>
                            <Button onClick={searchMisbak} className="bg-amber-500 hover:bg-amber-600 text-black">
                              Search
                            </Button>
                          </div>
                          {misbakLoading && <p className="text-xs text-gray-400 mt-2">Searching playlist...</p>}
                        </div>

                        <div className="mb-4 flex flex-wrap items-center gap-2">
                          <Button
                            onClick={() => setShowMisbakEmbed(true)}
                            className={showMisbakEmbed ? "bg-amber-500 hover:bg-amber-600 text-black" : "bg-gray-800 hover:bg-gray-700 text-white"}
                          >
                            In-page Player
                          </Button>
                          <Button
                            asChild
                            variant="outline"
                            className="border-amber-500 text-amber-500 hover:bg-amber-950/50"
                          >
                            <a
                              href="https://www.youtube.com/watch?v=GfBL_vM8eSM&list=PLluUizhBpZV9aKPupYA5X_FMmzAD1UNR1"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Open on YouTube
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
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

              {/* Liturgy Practice Hub */}
              <TabsContent value="liturgy">
                <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                  <motion.div variants={fadeInUp}>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">Liturgy Practice Hub</h2>
                      <p className="text-gray-400">
                        Master the Divine Liturgy with comprehensive tutorials, guides, and resources
                      </p>
                    </div>
                  </motion.div>

                  {/* Video Tutorials */}
                  <motion.div variants={fadeInUp} className="mb-8">
                    <Card className="border-none shadow-lg overflow-hidden bg-gray-900">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Video className="h-5 w-5 mr-2 text-amber-500" />
                          Video Tutorials
                        </CardTitle>
                        <CardDescription>Step-by-step visual instructions for Divine Liturgy service</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-gray-800 rounded-lg overflow-hidden">
                            <div className="relative aspect-video">
                              <Image
                                src="/placeholder.svg?height=200&width=300"
                                alt="Divine Liturgy Preparation"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                                  <Play className="h-5 w-5 text-black" />
                                </div>
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="font-medium text-white">Altar Service Fundamentals</h3>
                              <p className="text-gray-400 text-sm">Proper procedures for deacons (12:34)</p>
                            </div>
                          </div>

                          <div className="bg-gray-800 rounded-lg overflow-hidden">
                            <div className="relative aspect-video">
                              <Image
                                src="/placeholder.svg?height=200&width=300"
                                alt="Censing Practice"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                                  <Play className="h-5 w-5 text-black" />
                                </div>
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="font-medium text-white">Censing Practice</h3>
                              <p className="text-gray-400 text-sm">Proper technique and timing (8:57)</p>
                            </div>
                          </div>

                          <div className="bg-gray-800 rounded-lg overflow-hidden">
                            <div className="relative aspect-video">
                              <Image
                                src="/placeholder.svg?height=200&width=300"
                                alt="Liturgical Movements"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                                  <Play className="h-5 w-5 text-black" />
                                </div>
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="font-medium text-white">Liturgical Movements</h3>
                              <p className="text-gray-400 text-sm">Proper bowing and procession (11:23)</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Interactive Calendar */}
                  <motion.div variants={fadeInUp} className="mb-8">
                    <Card className="border-none shadow-lg overflow-hidden bg-gray-900">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Calendar className="h-5 w-5 mr-2 text-amber-500" />
                          Liturgical Calendar
                        </CardTitle>
                        <CardDescription>
                          Interactive calendar with feasts, fasts, and preparation requirements
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-800 p-6 rounded-lg">
                          <div className="text-center mb-4">
                            <h3 className="text-xl font-medium text-white">June 2023</h3>
                            <p className="text-amber-500">ሰኔ ፳፻፲፭ (2015 E.C)</p>
                          </div>

                          <div className="grid grid-cols-7 gap-1 mb-4">
                            <div className="text-center text-gray-400 text-sm p-1">Sun</div>
                            <div className="text-center text-gray-400 text-sm p-1">Mon</div>
                            <div className="text-center text-gray-400 text-sm p-1">Tue</div>
                            <div className="text-center text-gray-400 text-sm p-1">Wed</div>
                            <div className="text-center text-gray-400 text-sm p-1">Thu</div>
                            <div className="text-center text-gray-400 text-sm p-1">Fri</div>
                            <div className="text-center text-gray-400 text-sm p-1">Sat</div>
                          </div>

                          <div className="grid grid-cols-7 gap-1">
                            {[...Array(30)].map((_, i) => {
                              // Special days for demo purposes
                              const isSpecial = i === 6 || i === 15 || i === 22
                              const isFast = i === 8 || i === 10 || i === 17 || i === 24

                              return (
                                <div
                                  key={i}
                                  className={`
                                    aspect-square flex flex-col items-center justify-center rounded-lg p-1
                                    ${isSpecial ? "bg-amber-700/20 border border-amber-500/50" : ""}
                                    ${isFast ? "bg-gray-700/30 border border-gray-600/50" : ""}
                                    ${!isSpecial && !isFast ? "hover:bg-gray-700/50" : "hover:bg-gray-700/70"}
                                    cursor-pointer
                                  `}
                                >
                                  <span className={`text-sm ${isSpecial ? "text-amber-500" : "text-white"}`}>
                                    {i + 1}
                                  </span>
                                  {isSpecial && <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1"></div>}
                                  {isFast && <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1"></div>}
                                </div>
                              )
                            })}
                          </div>

                          <div className="flex items-center justify-center mt-6 space-x-6">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                              <span className="text-sm text-gray-300">Feast Day</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                              <span className="text-sm text-gray-300">Fast Day</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-center">
                          <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                            View Full Liturgical Calendar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Step-by-Step Guides */}
                  <motion.div variants={fadeInUp}>
                    <Card className="border-none shadow-lg overflow-hidden bg-gray-900">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <BookOpen className="h-5 w-5 mr-2 text-amber-500" />
                          Step-by-Step Service Guides
                        </CardTitle>
                        <CardDescription>Comprehensive instructions for altar service</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div
                            className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-750"
                            onClick={() => toggleExpand("guide1")}
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-white">Preparing the Altar</h3>
                              <ChevronDown
                                className={`h-5 w-5 text-amber-500 transition-transform ${
                                  expandedItem === "guide1" ? "transform rotate-180" : ""
                                }`}
                              />
                            </div>

                            {expandedItem === "guide1" && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-gray-700"
                              >
                                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                                  <li>Ensure all sacred vessels are clean and properly arranged</li>
                                  <li>Place the proper colored altar coverings according to the season</li>
                                  <li>Prepare the incense and charcoal before the service begins</li>
                                  <li>Arrange the liturgical books in their proper order</li>
                                  <li>Light candles according to the proper pattern</li>
                                </ol>
                                <div className="mt-4 flex justify-end">
                                  <Button variant="outline" size="sm" className="border-amber-500 text-amber-500">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download PDF Guide
                                  </Button>
                                </div>
                              </motion.div>
                            )}
                          </div>

                          <div
                            className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-750"
                            onClick={() => toggleExpand("guide2")}
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-white">Deacon's Responses During Qiddase</h3>
                              <ChevronDown
                                className={`h-5 w-5 text-amber-500 transition-transform ${
                                  expandedItem === "guide2" ? "transform rotate-180" : ""
                                }`}
                              />
                            </div>

                            {expandedItem === "guide2" && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-gray-700"
                              >
                                <p className="text-gray-300 mb-4">
                                  The deacon serves as the bridge between the priest and the congregation. These are the
                                  key responses and their proper execution:
                                </p>
                                <div className="space-y-3">
                                  <div className="p-3 border border-gray-700 rounded">
                                    <p className="text-white">ጸሎተ አሥተምህሮ</p>
                                    <p className="text-gray-400 italic">The Prayer of Teaching</p>
                                  </div>
                                  <div className="p-3 border border-gray-700 rounded">
                                    <p className="text-white">ኪያክሙ ዘጸለይሙ</p>
                                    <p className="text-gray-400 italic">For you who pray</p>
                                  </div>
                                  <div className="p-3 border border-gray-700 rounded">
                                    <p className="text-white">እንዘ ንሰግድ ለእግዚአብሔር አምላክነ</p>
                                    <p className="text-gray-400 italic">Let us worship God our Lord</p>
                                  </div>
                                </div>
                                <div className="mt-4 flex justify-end">
                                  <Button variant="outline" size="sm" className="border-amber-500 text-amber-500">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Complete Guide
                                  </Button>
                                </div>
                              </motion.div>
                            )}
                          </div>

                          <div
                            className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-750"
                            onClick={() => toggleExpand("guide3")}
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-white">Proper Censing Technique</h3>
                              <ChevronDown
                                className={`h-5 w-5 text-amber-500 transition-transform ${
                                  expandedItem === "guide3" ? "transform rotate-180" : ""
                                }`}
                              />
                            </div>

                            {expandedItem === "guide3" && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-gray-700"
                              >
                                <p className="text-gray-300 mb-4">
                                  Proper censing is an essential skill for deacons to master. Follow these steps:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="text-amber-500 mb-2">Order of Censing:</h4>
                                    <ol className="list-decimal list-inside space-y-2 text-gray-300">
                                      <li>The Tabot (altar)</li>
                                      <li>The presiding priest</li>
                                      <li>Other clergy according to rank</li>
                                      <li>Icons, from right to left</li>
                                      <li>The congregation</li>
                                    </ol>
                                  </div>
                                  <div>
                                    <h4 className="text-amber-500 mb-2">Proper Technique:</h4>
                                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                                      <li>Hold the censer with your right hand</li>
                                      <li>Bow before and after censing the Tabot</li>
                                      <li>Move the censer in a cross formation</li>
                                      <li>Three swings for the altar and clergy</li>
                                      <li>Two swings for icons and congregation</li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="mt-4 flex justify-end">
                                  <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className="border-amber-500 text-amber-500"
                                  >
                                    <Link href="/deacons/censing-tutorial">
                                      View Video Tutorial
                                      <ExternalLink className="ml-2 h-4 w-4" />
                                    </Link>
                                  </Button>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>

                        <div className="mt-6 flex justify-center">
                          <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black">
                            <Link href="/deacons/service-guides">View All Service Guides</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              {/* Abinet Scholarship Section (eathebook only) */}
              <TabsContent value="abinet">
                <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                  <motion.div variants={fadeInUp}>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">Abinet Scholarship Hub</h2>
                      <p className="text-gray-400">Study directly from eathebook.org in a color style that matches this site.</p>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Card className="border-none shadow-lg overflow-hidden bg-gray-900">
                      <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-600" />
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <GraduationCap className="h-5 w-5 mr-2 text-amber-500" />
                          eathebook.org Study Integration
                        </CardTitle>
                        <CardDescription>Embedded for in-page study. If embedding is blocked by their server, open in a new tab.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-100">
                          eathebook.org remains their platform. This section provides a seamless study view with your
                          site&apos;s color system.
                        </div>

                        <div className="overflow-hidden rounded-xl border border-gray-700">
                          <div className="aspect-[16/10] w-full bg-gray-950">
                            <iframe
                              className="h-full w-full"
                              src="https://www.eathebook.org"
                              title="eathebook.org Abinet Study"
                              loading="lazy"
                              referrerPolicy="strict-origin-when-cross-origin"
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black">
                            <a href="https://www.eathebook.org" target="_blank" rel="noreferrer">
                              Open eathebook.org
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              {/* Remaining tabs would be implemented similarly */}
              <TabsContent value="prayers">
                <div className="text-center py-16">
                  <h2 className="text-2xl font-bold text-white mb-4">Prayer & Spiritual Growth</h2>
                  <p className="text-gray-400 mb-8">
                    Daily prayer schedules, guided meditations, and spiritual resources
                  </p>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black">Coming Soon</Button>
                </div>
              </TabsContent>

              <TabsContent value="events">
                <div className="text-center py-16">
                  <h2 className="text-2xl font-bold text-white mb-4">Events & Announcements</h2>
                  <p className="text-gray-400 mb-8">Stay updated on upcoming events and important announcements</p>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black">Coming Soon</Button>
                </div>
              </TabsContent>

              <TabsContent value="community">
                <div className="text-center py-16">
                  <h2 className="text-2xl font-bold text-white mb-4">Community Forum</h2>
                  <p className="text-gray-400 mb-8">
                    Connect with fellow deacons, ask questions, and share experiences
                  </p>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black">Coming Soon</Button>
                </div>
              </TabsContent>

              <TabsContent value="downloads">
                <div className="text-center py-16">
                  <h2 className="text-2xl font-bold text-white mb-4">Downloadable Resources</h2>
                  <p className="text-gray-400 mb-8">
                    Quick-reference guides, printable materials, and useful resources
                  </p>
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
