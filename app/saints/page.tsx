"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AnimatedGradientText } from "@/components/animated-gradient-text"
import { ScrollToTop } from "@/components/scroll-to-top"
import { GeezHeading } from "@/components/geez-heading"
import { SocialShare } from "@/components/social-share"
import { Search, Calendar, Star, BookOpen } from "lucide-react"
import telegramPosts from "@/content/telegram/index.json"

type TelegramSaintPost = {
  id: number
  type: "lesson" | "Q&A"
  title: string
  date: string
  tags: string[]
  excerpt: string
  contentPath: string
  isSaint: boolean
}

type SaintItem = {
  id: number
  name: string
  title: string
  feastDay: string
  century: string
  description: string
  image: string
  categories: string[]
  tags?: string[]
  sourceLink?: string
}

// Sample saints data
const baseSaints: SaintItem[] = [
  {
    id: 1,
    name: "St. Tekle Haymanot",
    title: "The Pillar of Ethiopia",
    feastDay: "Nehassie 24 (August 30)",
    century: "13th Century",
    description:
      "One of Ethiopia's most venerated saints, known for standing on one leg for 29 years in prayer and meditation. He founded the monastery of Debre Libanos and is credited with numerous miracles.",
    image: "/placeholder.svg?height=300&width=300",
    categories: ["Monastic Saints", "Miracle Workers"],
  },
  {
    id: 2,
    name: "St. Yared",
    title: "Father of Sacred Music",
    feastDay: "Ginbot 11 (May 19)",
    century: "6th Century",
    description:
      "Creator of the sacred music tradition of the Ethiopian Orthodox Church. He composed the liturgical music and notation system still used today, known as the Digua.",
    image: "/placeholder.svg?height=300&width=300",
    categories: ["Church Fathers", "Hymnographers"],
  },
  {
    id: 3,
    name: "St. Gebre Menfes Kidus",
    title: "Servant of the Holy Spirit",
    feastDay: "Megabit 5 (March 14)",
    century: "14th Century",
    description:
      "A hermit who lived in the wilderness surrounded by wild animals that were tamed by his holiness. He is often depicted with lions and leopards.",
    image: "/placeholder.svg?height=300&width=300",
    categories: ["Hermits", "Miracle Workers"],
  },
  {
    id: 4,
    name: "St. Frumentius",
    title: "Abba Salama, Illuminator of Ethiopia",
    feastDay: "Tikimt 26 (November 5)",
    century: "4th Century",
    description:
      "The first bishop of Ethiopia who brought Christianity to the Aksumite Kingdom. He baptized King Ezana, making Ethiopia one of the first Christian kingdoms.",
    image: "/placeholder.svg?height=300&width=300",
    categories: ["Apostles", "Church Fathers"],
  },
  {
    id: 5,
    name: "St. Abune Aregawi",
    title: "Head of the Nine Saints",
    feastDay: "Tikimt 14 (October 24)",
    century: "6th Century",
    description:
      "Leader of the Nine Saints who came from Syria to spread Christianity in Ethiopia. He founded the monastery of Debre Damo, accessible only by rope.",
    image: "/placeholder.svg?height=300&width=300",
    categories: ["Monastic Saints", "Nine Saints"],
  },
  {
    id: 6,
    name: "St. Lalibela",
    title: "The Saint King",
    feastDay: "Sene 12 (June 19)",
    century: "12th-13th Century",
    description:
      "King of Ethiopia who carved 11 rock-hewn churches in Roha (now Lalibela). These architectural marvels were built as a 'New Jerusalem' after Muslim conquests blocked pilgrimages to the Holy Land.",
    image: "/placeholder.svg?height=300&width=300",
    categories: ["Royal Saints", "Church Builders"],
  },
]

const categories = [
  "All",
  "Apostles",
  "Church Fathers",
  "Martyrs",
  "Monastic Saints",
  "Royal Saints",
  "Miracle Workers",
  "Hermits",
  "Nine Saints",
  "Hymnographers",
  "Church Builders",
  "Church Teachings",
]

export default function SaintsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedSaint, setSelectedSaint] = useState<SaintItem | null>(null)

  const allSaints = useMemo(() => {
    const toTitle = (value: string) =>
      value
        .split(/[-_ ]+/)
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

    const imported = (telegramPosts as TelegramSaintPost[])
      .filter((post: TelegramSaintPost) => post.isSaint)
      .map((post: TelegramSaintPost): SaintItem => {
        const lowerTags = post.tags.map((tag) => tag.toLowerCase())
        const saintSpecific = lowerTags.find((tag) => !["saint", "saints", "kidus", "ቅዱስ", "ቅዱሳን"].includes(tag))
        const normalizedName =
          lowerTags.includes("saint") && lowerTags.includes("george")
            ? "Saint George"
            : saintSpecific
              ? `Saint ${toTitle(saintSpecific)}`
              : post.title.replace(/#/g, "").split(/\s+/).slice(0, 3).join(" ")

        return {
          id: 500000 + post.id,
          name: normalizedName,
          title: post.title.replace(/^#+/g, "").slice(0, 80),
          feastDay: new Date(post.date).toLocaleDateString(),
          century: "Church Teachings",
          description: post.excerpt,
          image: "/placeholder.svg?height=300&width=300",
          categories: ["Church Teachings"],
          tags: post.tags,
          sourceLink: post.type === "Q&A" ? `/qa/imported/${post.id}` : `/teachings/imported/${post.id}`,
        }
      })

    return [...imported, ...baseSaints]
  }, [])

  const filteredSaints = allSaints.filter((saint) => {
    const categoryMatch = activeCategory === "All" || saint.categories.includes(activeCategory)
    const q = searchQuery.toLowerCase()
    const searchMatch =
      saint.name.toLowerCase().includes(q) ||
      saint.title.toLowerCase().includes(q) ||
      saint.description.toLowerCase().includes(q) ||
      saint.tags?.some((tag) => tag.toLowerCase().includes(q))
    return categoryMatch && searchMatch
  })

  const saintOfTheDay = allSaints[0] ?? null

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

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-amber-500/5 dark:from-orange-900/20 dark:to-amber-900/20 z-0" />
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-5 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <GeezHeading className="mb-4 text-orange-700 dark:text-amber-400">ቅዱሳን</GeezHeading>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Ethiopian Orthodox <AnimatedGradientText text="Saints" />
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore the lives and legacies of the holy men and women of the Ethiopian Orthodox Tewahedo Church
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="md:col-span-1">
                <div className="space-y-6 sticky top-20">
                  <Card className="border-none shadow-lg overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Search className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        Search
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                          <Input
                            placeholder="Search saints..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 border-gray-300 dark:border-gray-700"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-lg overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        Categories
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                              activeCategory === category
                                ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 font-medium"
                                : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-lg overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        Saint of the Day
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="relative h-32 w-32 mx-auto rounded-full overflow-hidden mb-4">
                          <Image
                            src="/placeholder.svg?height=128&width=128"
                            alt="Saint of the Day"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="font-bold mb-1 text-gray-900 dark:text-white line-clamp-2">
                          {saintOfTheDay ? saintOfTheDay.title : "St. Tekle Haymanot"}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          {saintOfTheDay ? new Date(saintOfTheDay.date).toLocaleDateString() : "Nehassie 24 (August 30)"}
                        </p>
                        <Button
                          asChild
                          variant="outline"
                          className="text-orange-600 dark:text-orange-400 border-orange-300 dark:border-orange-700"
                        >
                          <Link href={saintOfTheDay?.sourceLink ?? "/saints"} rel="noreferrer">
                            Read More
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Main Content */}
              <div className="md:col-span-3">
                {selectedSaint ? (
                  <Card className="border-none shadow-lg overflow-hidden">
                    <div className="grid md:grid-cols-3 gap-0">
                      <div className="relative h-full min-h-[300px]">
                        <Image
                          src={selectedSaint.image || "/placeholder.svg"}
                          alt={selectedSaint.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="md:col-span-2 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedSaint.name}</h2>
                            <p className="text-orange-600 dark:text-orange-400 font-medium">{selectedSaint.title}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedSaint(null)}
                            className="text-gray-500 dark:text-gray-400"
                          >
                            Back to List
                          </Button>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <Calendar className="h-4 w-4" />
                          <span>Feast Day: {selectedSaint.feastDay}</span>
                          <span className="mx-2">•</span>
                          <span>{selectedSaint.century}</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {selectedSaint.categories.map((category) => (
                            <Badge
                              key={category}
                              variant="outline"
                              className="bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800"
                            >
                              {category}
                            </Badge>
                          ))}
                        </div>

                        <div className="space-y-4 mb-6">
                          <h3 className="font-medium text-gray-900 dark:text-white">Life and Legacy</h3>
                          <p className="text-gray-600 dark:text-gray-300">{selectedSaint.description}</p>
                          <p className="text-gray-600 dark:text-gray-300">
                            {selectedSaint.name} is remembered for their extraordinary faith and dedication to Christ.
                            Their life continues to inspire believers today, teaching us about perseverance, humility,
                            and unwavering devotion to God.
                          </p>
                        </div>

                        <div className="flex justify-between items-center">
                          <Button
                            asChild={Boolean(selectedSaint.sourceLink)}
                            className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600"
                          >
                            {selectedSaint.sourceLink ? (
                              <Link href={selectedSaint.sourceLink} rel="noreferrer">
                                <BookOpen className="h-4 w-4" />
                                Read Full Story
                              </Link>
                            ) : (
                              <span>
                                <BookOpen className="h-4 w-4" />
                                Read Full Story
                              </span>
                            )}
                          </Button>
                          <SocialShare title={`${selectedSaint.name} - Ethiopian Orthodox Saints`} />
                        </div>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                  >
                    {filteredSaints.length > 0 ? (
                      filteredSaints.map((saint) => (
                        <motion.div key={saint.id} variants={fadeInUp}>
                          <Card
                            className="border-none shadow-lg overflow-hidden h-full hover:shadow-xl transition-all duration-300 cursor-pointer group"
                            onClick={() => setSelectedSaint(saint)}
                          >
                            <div className="relative h-48">
                              <Image
                                src={saint.image || "/placeholder.svg"}
                                alt={saint.name}
                                fill
                                className="object-cover transition-transform group-hover:scale-105 duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-white font-bold text-lg">{saint.name}</h3>
                                <p className="text-white/80 text-sm">{saint.title}</p>
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{saint.feastDay}</span>
                                <span className="mx-2">•</span>
                                <span>{saint.century}</span>
                              </div>
                              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                                {saint.description}
                              </p>
                              <div className="flex justify-between items-center">
                                <Button
                                  variant="link"
                                  className="p-0 h-auto text-orange-600 dark:text-orange-400 group-hover:underline"
                                >
                                  Read More
                                </Button>
                                <div className="flex gap-1">
                                  {saint.categories.slice(0, 2).map((category) => (
                                    <Badge
                                      key={category}
                                      variant="outline"
                                      className="text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800"
                                    >
                                      {category}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))
                    ) : (
                      <div className="col-span-3 text-center py-12">
                        <Star className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">No saints found</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                          Try adjusting your search or category filters
                        </p>
                        <Button
                          onClick={() => {
                            setActiveCategory("All")
                            setSearchQuery("")
                          }}
                          className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600"
                        >
                          Reset Filters
                        </Button>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-gradient-to-r from-orange-800 to-amber-700 dark:from-orange-950 dark:to-amber-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <GeezHeading className="mb-4 text-amber-300">ቅዱሳን ይናገራሉ</GeezHeading>
            <h2 className="text-3xl font-bold mb-6">Words of the Saints</h2>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg mb-8">
              <p className="text-xl italic mb-4">
                "Prayer is the key to heaven, fasting is the wing that carries it there."
              </p>
              <p className="font-medium">— St. Tekle Haymanot</p>
            </div>
            <Button asChild className="bg-white text-orange-800 hover:bg-amber-100">
              <Link href="/teachings">Explore Teachings</Link>
            </Button>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  )
}
