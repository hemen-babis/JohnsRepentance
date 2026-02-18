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
  PenTool,
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

  const toggleExpand = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id)
  }

  const toggleAudioPlay = () => {
    setIsPlaying(!isPlaying)
    // In a real implementation, this would play/pause an audio file
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
                <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full max-w-4xl gap-1">
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
                  <TabsTrigger value="vestments" className="whitespace-nowrap">
                    <PenTool className="h-4 w-4 mr-1 inline-block" />
                    Vestments
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
                      <p className="text-gray-400">
                        Access comprehensive Misbak texts, audio recordings, and practice materials
                      </p>
                    </div>
                  </motion.div>

                  {/* Search and Filter */}
                  <motion.div variants={fadeInUp} className="mb-8">
                    <Card className="border-none shadow-lg overflow-hidden bg-gray-900 mb-8">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="relative flex-grow">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Search Misbak texts by name, feast, or content..."
                              className="pl-10 bg-gray-800 border-gray-700 text-white"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                          </div>
                          <Button className="bg-amber-600 hover:bg-amber-700 text-black">
                            <Filter className="mr-2 h-4 w-4" /> Filter
                          </Button>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          <Badge variant="outline" className="bg-gray-800 text-white hover:bg-gray-700 cursor-pointer">
                            Season: Lent
                          </Badge>
                          <Badge variant="outline" className="bg-gray-800 text-white hover:bg-gray-700 cursor-pointer">
                            Format: Audio
                          </Badge>
                          <Badge variant="outline" className="bg-gray-800 text-white hover:bg-gray-700 cursor-pointer">
                            Language: Ge'ez
                          </Badge>
                          <Badge variant="outline" className="bg-gray-800 text-white hover:bg-gray-700 cursor-pointer">
                            Tone: First
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Misbak Texts Section */}
                    <motion.div variants={fadeInUp}>
                      <Card className="border-none shadow-lg overflow-hidden bg-gray-900 h-full">
                        <CardHeader>
                          <CardTitle className="text-white">
                            <FileText className="h-5 w-5 inline-block mr-2 text-amber-500" />
                            Misbak Texts
                          </CardTitle>
                          <CardDescription>Digital PDFs in Ge'ez and transliterations</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between hover:bg-gray-750 cursor-pointer">
                            <div>
                              <h3 className="font-medium text-white">Tsome Digua</h3>
                              <p className="text-gray-400 text-sm">Lenten Misbak (PDF + Transliteration)</p>
                            </div>
                            <Download className="h-5 w-5 text-amber-500" />
                          </div>

                          <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between hover:bg-gray-750 cursor-pointer">
                            <div>
                              <h3 className="font-medium text-white">Kedassie (St. Basil)</h3>
                              <p className="text-gray-400 text-sm">Divine Liturgy Responses (PDF)</p>
                            </div>
                            <Download className="h-5 w-5 text-amber-500" />
                          </div>

                          <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between hover:bg-gray-750 cursor-pointer">
                            <div>
                              <h3 className="font-medium text-white">Feast of Cross</h3>
                              <p className="text-gray-400 text-sm">Meskel Celebration (PDF)</p>
                            </div>
                            <Download className="h-5 w-5 text-amber-500" />
                          </div>

                          <Button
                            asChild
                            variant="outline"
                            className="w-full border-amber-500 text-amber-500 hover:bg-amber-950/50"
                          >
                            <Link href="/deacons/misbak/archive">
                              View Complete Archive
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Audio Recordings */}
                    <motion.div variants={fadeInUp}>
                      <Card className="border-none shadow-lg overflow-hidden bg-gray-900 h-full">
                        <CardHeader>
                          <CardTitle className="text-white">
                            <Music className="h-5 w-5 inline-block mr-2 text-amber-500" />
                            Audio Recordings
                          </CardTitle>
                          <CardDescription>Listen and learn from master chanters</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-medium text-white">Zema Mahlet - First Tone</h3>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-amber-500 hover:bg-amber-950/50"
                                onClick={toggleAudioPlay}
                              >
                                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                              </Button>
                            </div>
                            <p className="text-gray-400 text-sm">By Memher Tewodros (8:42)</p>
                            <div className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 rounded-full" style={{ width: "30%" }}></div>
                            </div>
                          </div>

                          <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-white">Anqets' Berhan</h3>
                              <p className="text-gray-400 text-sm">By Deacon Damtew (5:16)</p>
                            </div>
                            <Play className="h-5 w-5 text-amber-500" />
                          </div>

                          <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-white">Kidase Ze'Yohannes</h3>
                              <p className="text-gray-400 text-sm">By St. Yared School Choir (14:30)</p>
                            </div>
                            <Play className="h-5 w-5 text-amber-500" />
                          </div>

                          <Button
                            asChild
                            variant="outline"
                            className="w-full border-amber-500 text-amber-500 hover:bg-amber-950/50"
                          >
                            <Link href="/deacons/audio-archive">
                              Browse All Recordings
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Practice Videos with Breakdown */}
                  <motion.div variants={fadeInUp} className="mt-8">
                    <Card className="border-none shadow-lg overflow-hidden bg-gray-900">
                      <div className="h-2 bg-gradient-to-r from-amber-500 to-amber-700" />
                      <CardHeader>
                        <CardTitle className="text-white">
                          <Video className="h-5 w-5 inline-block mr-2 text-amber-500" />
                          Practice Videos with Chant Breakdowns
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-gray-800 rounded-lg overflow-hidden">
                            <div className="relative aspect-video">
                              <Image
                                src="/placeholder.svg?height=200&width=300"
                                alt="Mezmur Practice"
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
                              <h3 className="font-medium text-white">Mezmur Practice</h3>
                              <p className="text-gray-400 text-sm">Beginner's Guide (8:15)</p>
                            </div>
                          </div>

                          <div className="bg-gray-800 rounded-lg overflow-hidden">
                            <div className="relative aspect-video">
                              <Image
                                src="/placeholder.svg?height=200&width=300"
                                alt="Qidassie Responses"
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
                              <h3 className="font-medium text-white">Qidassie Responses</h3>
                              <p className="text-gray-400 text-sm">Proper Intonation (10:42)</p>
                            </div>
                          </div>

                          <div className="bg-gray-800 rounded-lg overflow-hidden">
                            <div className="relative aspect-video">
                              <Image
                                src="/placeholder.svg?height=200&width=300"
                                alt="Seasonal Chants"
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
                              <h3 className="font-medium text-white">Seasonal Chants</h3>
                              <p className="text-gray-400 text-sm">Easter Special (15:30)</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-center">
                          <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                            View All Practice Videos
                          </Button>
                        </div>
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

              {/* Abinet School Section */}
              <TabsContent value="abinet">
                <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                  <motion.div variants={fadeInUp}>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">Abinet School</h2>
                      <p className="text-gray-400">
                        Resources for formal training in Ge'ez, liturgical studies, and ecclesiastical ranks
                      </p>
                    </div>
                  </motion.div>

                  {/* Curriculum Outlines */}
                  <motion.div variants={fadeInUp} className="mb-8">
                    <Card className="border-none shadow-lg overflow-hidden bg-gray-900">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <GraduationCap className="h-5 w-5 mr-2 text-amber-500" />
                          Curriculum Outlines
                        </CardTitle>
                        <CardDescription>Structured learning paths for deacons at all levels</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div
                            className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-750"
                            onClick={() => toggleExpand("curriculum1")}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium text-white">Beginner: Deacon Preparation</h3>
                                <p className="text-gray-400 text-sm">3-month foundational course</p>
                              </div>
                              <ChevronDown
                                className={`h-5 w-5 text-amber-500 transition-transform ${
                                  expandedItem === "curriculum1" ? "transform rotate-180" : ""
                                }`}
                              />
                            </div>

                            {expandedItem === "curriculum1" && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-gray-700"
                              >
                                <div className="space-y-3">
                                  <div className="flex items-center">
                                    <CheckCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                                    <p className="text-gray-300">Introduction to Liturgical Service</p>
                                  </div>
                                  <div className="flex items-center">
                                    <CheckCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                                    <p className="text-gray-300">Basics of Ge'ez Alphabet and Reading</p>
                                  </div>
                                  <div className="flex items-center">
                                    <CheckCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                                    <p className="text-gray-300">Simple Chants and Responses</p>
                                  </div>
                                  <div className="flex items-center">
                                    <CheckCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                                    <p className="text-gray-300">Vestment Care and Handling</p>
                                  </div>
                                  <div className="flex items-center">
                                    <CheckCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                                    <p className="text-gray-300">Altar Assistance Fundamentals</p>
                                  </div>
                                </div>
                                <div className="mt-4 flex justify-end">
                                  <Button variant="outline" size="sm" className="border-amber-500 text-amber-500">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Full Syllabus
                                  </Button>
                                </div>
                              </motion.div>
                            )}
                          </div>

                          <div
                            className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-750"
                            onClick={() => toggleExpand("curriculum2")}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium text-white">Intermediate: Qidassie Mastery</h3>
                                <p className="text-gray-400 text-sm">6-month comprehensive liturgy course</p>
                              </div>
                              <ChevronDown
                                className={`h-5 w-5 text-amber-500 transition-transform ${
                                  expandedItem === "curriculum2" ? "transform rotate-180" : ""
                                }`}
                              />
                            </div>

                            {expandedItem === "curriculum2" && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-gray-700"
                              >
                                <div className="space-y-3">
                                  <div className="flex items-center">
                                    <CheckCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                                    <p className="text-gray-300">Advanced Ge'ez Reading and Translation</p>
                                  </div>
                                  <div className="flex items-center">
                                    <CheckCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                                    <p className="text-gray-300">Complete Divine Liturgy Services</p>
                                  </div>
                                  <div className="flex items-center">
                                    <CheckCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                                    <p className="text-gray-300">Complex Chanting Techniques (Zema)</p>
                                  </div>
                                  <div className="flex items-center">
                                    <CheckCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                                    <p className="text-gray-300">Holy Week Services and Responses</p>
                                  </div>
                                  <div className="flex items-center">
                                    <CheckCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                                    <p className="text-gray-300">Liturgical Theology and Symbolism</p>
                                  </div>
                                </div>
                                <div className="mt-4 flex justify-end">
                                  <Button variant="outline" size="sm" className="border-amber-500 text-amber-500">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Full Syllabus
                                  </Button>
                                </div>
                              </motion.div>
                            )}
                          </div>

                          <div
                            className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-750"
                            onClick={() => toggleExpand("curriculum3")}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium text-white">Advanced: Archdeacon Studies</h3>
                                <p className="text-gray-400 text-sm">1-year intensive program</p>
                              </div>
                              <ChevronDown
                                className={`h-5 w-5 text-amber-500 transition-transform ${
                                  expandedItem === "curriculum3" ? "transform rotate-180" : ""
                                }`}
                              />
                            </div>

                            {expandedItem === "curriculum3" && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-gray-700"
                              >
                                <div className="space-y-3">
                                  <div className="flex items-center">
                                    <CheckCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                                    <p className="text-gray-300">Mastery of All Liturgical Texts</p>
                                  </div>
                                  <div className="flex items-center">
                                    <CheckCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                                    <p className="text-gray-300">Teaching and Leadership Training</p>
                                  </div>
                                  <div className="flex items-center">
                                    <CheckCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                                    <p className="text-gray-300">Andimta (Biblical Commentary) Study</p>
                                  </div>
                                  <div className="flex items-center">
                                    <CheckCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                                    <p className="text-gray-300">Ecclesiastical Administration</p>
                                  </div>
                                  <div className="flex items-center">
                                    <CheckCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                                    <p className="text-gray-300">Advanced Church History and Canon Law</p>
                                  </div>
                                </div>
                                <div className="mt-4 flex justify-end">
                                  <Button variant="outline" size="sm" className="border-amber-500 text-amber-500">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Full Syllabus
                                  </Button>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Class Resources */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div variants={fadeInUp}>
                      <Card className="border-none shadow-lg overflow-hidden bg-gray-900 h-full">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-amber-500" />
                            Class Materials
                          </CardTitle>
                          <CardDescription>Study materials and notes for Abinet students</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between hover:bg-gray-750 cursor-pointer">
                            <div>
                              <h3 className="font-medium text-white">Ge'ez Alphabet Workbook</h3>
                              <p className="text-gray-400 text-sm">Beginner Level (PDF)</p>
                            </div>
                            <Download className="h-5 w-5 text-amber-500" />
                          </div>

                          <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between hover:bg-gray-750 cursor-pointer">
                            <div>
                              <h3 className="font-medium text-white">Divine Liturgy Handbook</h3>
                              <p className="text-gray-400 text-sm">Intermediate Level (PDF)</p>
                            </div>
                            <Download className="h-5 w-5 text-amber-500" />
                          </div>

                          <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between hover:bg-gray-750 cursor-pointer">
                            <div>
                              <h3 className="font-medium text-white">Misbak Notation Guide</h3>
                              <p className="text-gray-400 text-sm">Advanced Level (PDF)</p>
                            </div>
                            <Download className="h-5 w-5 text-amber-500" />
                          </div>

                          <Button
                            asChild
                            variant="outline"
                            className="w-full border-amber-500 text-amber-500 hover:bg-amber-950/50"
                          >
                            <Link href="/deacons/course-materials">
                              Access All Materials
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Class Registration */}
                    <motion.div variants={fadeInUp}>
                      <Card className="border-none shadow-lg overflow-hidden bg-gray-900 h-full">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center">
                            <Users className="h-5 w-5 mr-2 text-amber-500" />
                            Class Registration
                          </CardTitle>
                          <CardDescription>Sign up for upcoming Abinet classes and exams</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="bg-gray-800 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-medium text-white">Summer Intensive Course</h3>
                              <Badge className="bg-green-500 text-white">Enrolling</Badge>
                            </div>
                            <p className="text-gray-400 text-sm mb-3">
                              June 15-August 30 • Online and In-Person Options
                            </p>
                            <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">Register Now</Button>
                          </div>

                          <div className="bg-gray-800 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-medium text-white">Archdeacon Examination</h3>
                              <Badge className="bg-amber-500 text-white">Applications Open</Badge>
                            </div>
                            <p className="text-gray-400 text-sm mb-3">September 10 • Requires Recommendations</p>
                            <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                              Apply for Exam
                            </Button>
                          </div>

                          <div className="bg-gray-800 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-medium text-white">Winter Ge'ez Course</h3>
                              <Badge className="bg-gray-500 text-white">Coming Soon</Badge>
                            </div>
                            <p className="text-gray-400 text-sm mb-3">December 1-February 28 • Online Only</p>
                            <Button disabled className="w-full bg-gray-700 text-gray-400 cursor-not-allowed">
                              Registration Opens October 1
                            </Button>
                          </div>

                          <Button
                            asChild
                            variant="outline"
                            className="w-full border-amber-500 text-amber-500 hover:bg-amber-950/50"
                          >
                            <Link href="/deacons/class-schedule">
                              View Complete Schedule
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Remaining tabs would be implemented similarly */}
              <TabsContent value="vestments">
                <div className="text-center py-16">
                  <h2 className="text-2xl font-bold text-white mb-4">Vestment & Protocol Guide</h2>
                  <p className="text-gray-400 mb-8">Visual guides to wearing priestly garments and proper protocols</p>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black">Coming Soon</Button>
                </div>
              </TabsContent>

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
