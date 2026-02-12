"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AnimatedGradientText } from "@/components/animated-gradient-text"
import { ScrollToTop } from "@/components/scroll-to-top"
import { GeezHeading } from "@/components/geez-heading"
import { Book, Video, FileText, Bookmark, Search, Filter, Clock, Play, Download, Share2, Calendar } from "lucide-react"
import telegramPosts from "@/content/telegram/index.json"

type TelegramPost = {
  id: number
  type: "lesson" | "Q&A"
  title: string
  date: string
  tags: string[]
      excerpt: string
      contentPath: string
}

type TeachingItem = {
  id: number
  title: string
  description: string
  category: string
  format: "Article" | "Video" | "Audio" | "PDF Guide"
  duration: string
  image: string
  featured?: boolean
  popular?: boolean
  link: string
}

const categories = [
  "All",
  "Feasts & Liturgical Year",
  "Christian Living",
  "Theotokos (Virgin Mary)",
  "Tradition & Culture",
  "Monastics & Asceticism",
  "Bible Study",
  "Liturgy",
  "Sacraments",
  "Saints",
  "Prayer",
  "Fasting",
  "Church History",
  "Theology",
]

const baseTeachings: TeachingItem[] = [
  {
    id: 1,
    title: "Understanding the Divine Liturgy",
    description:
      "A comprehensive guide to the Ethiopian Orthodox Divine Liturgy (Kidase) and its spiritual significance.",
    category: "Liturgy",
    format: "Article",
    duration: "15 min read",
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
    popular: true,
    link: "/teachings/1",
  },
  {
    id: 2,
    title: "The Meaning of the Cross in Ethiopian Tradition",
    description: "Explore the unique symbolism and designs of Ethiopian crosses and their spiritual significance.",
    category: "Tradition & Culture",
    format: "Video",
    duration: "22 min",
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
    link: "/teachings/2",
  },
  {
    id: 3,
    title: "Preparing for Holy Communion",
    description: "Learn the spiritual and physical preparation required before receiving the Holy Qurban.",
    category: "Sacraments",
    format: "PDF Guide",
    duration: "12 pages",
    image: "/placeholder.svg?height=200&width=300",
    popular: true,
    link: "/teachings/3",
  },
  {
    id: 4,
    title: "The Book of Enoch: Ethiopian Perspective",
    description: "Discover the importance of the Book of Enoch in Ethiopian Orthodox tradition and theology.",
    category: "Bible Study",
    format: "Audio",
    duration: "45 min",
    image: "/placeholder.svg?height=200&width=300",
    link: "/teachings/4",
  },
  {
    id: 5,
    title: "Saints of Ethiopia: St. Tekle Haymanot",
    description: "The life and miracles of one of Ethiopia's most beloved saints.",
    category: "Saints",
    format: "Article",
    duration: "10 min read",
    image: "/placeholder.svg?height=200&width=300",
    link: "/teachings/5",
  },
  {
    id: 6,
    title: "The Spiritual Meaning of Fasting",
    description: "Understanding the purpose and benefits of fasting in the Ethiopian Orthodox tradition.",
    category: "Fasting",
    format: "Video",
    duration: "18 min",
    image: "/placeholder.svg?height=200&width=300",
    link: "/teachings/6",
  },
]

export default function TeachingsPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [formatFilter, setFormatFilter] = useState<string[]>([])

  const toggleFormatFilter = (format: string) => {
    if (formatFilter.includes(format)) {
      setFormatFilter(formatFilter.filter((f) => f !== format))
    } else {
      setFormatFilter([...formatFilter, format])
    }
  }

  const allTeachings = useMemo(() => {
    const saintPattern = /(saint|saints|kidus|ቅዱስ|ቅዱሳን)/i
    const theotokosPattern = /(mary|virgin|theotokos|kidane meheret|zion|assumption)/i
    const feastsPattern = /(epiphany|timkat|nativity|genna|meskel|hosanna|palm sunday|holy week|pascha|easter|feast|lent|season)/i
    const christianLivingPattern = /(marriage|family|parenting|youth|depression|anxiety|optimism|peace|virtue|ai|technology|work|daily life)/i
    const traditionPattern = /(kebero|bell|icon|iconography|adwa|tradition|culture|church custom|hymn)/i
    const monasticPattern = /(monastic|ascetic|monk|desert|abune aregawi|tekle haymanot|gebre menfes kidus)/i
    const theologyCorePattern = /(trinity|incarnation|tewahedo|christology|dogma|creed|nature of christ|core pillar|divinity)/i
    const liturgyPattern = /(liturgy|kidassie|qurbana|worship service|vespers)/i
    const biblePattern = /(scripture|gospel|bible|john|apostle|psalm)/i
    const fastingPattern = /(fasting|abiye tsom|nineveh|wednesday|friday fast)/i
    const isQuestionLike = (post: TelegramPost) =>
      /question\s*[:፦]|answer\s*[:፦]/i.test(`${post.title} ${post.excerpt}`)
    const toTitleCase = (value: string) =>
      value
        .split(/[-_ ]+/)
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

    const shortTitle = (post: TelegramPost) => {
      const lowerTags = post.tags.map((tag) => tag.toLowerCase())
      const genericTags = new Set([
        "announcement",
        "holy",
        "great",
        "orthodox",
        "church",
        "christ",
        "jesus",
        "faith",
        "religion",
      ])

      if (/holy\s+#?eucharist/i.test(`${post.title} ${post.excerpt}`) || lowerTags.includes("eucharist")) {
        return "The Holy Eucharist"
      }

      const hashtagMatch = `${post.title} ${post.excerpt}`.match(/#([^\s#]+)/u)
      if (hashtagMatch?.[1]) {
        const rawTag = hashtagMatch[1].replace(/[.,:;!?]+$/g, "")
        if (rawTag.length > 1) {
          return rawTag
            .split(/[-_ ]+/)
            .filter(Boolean)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        }
      }

      if (lowerTags.includes("saint")) {
        const saintSpecific = lowerTags.find((tag) => tag !== "saint" && !genericTags.has(tag) && !/^\d+$/.test(tag))
        if (saintSpecific) return `Saint ${toTitleCase(saintSpecific)}`
      }

      const firstSpecificTag = lowerTags.find((tag) => !genericTags.has(tag) && tag !== "saint" && !/^\d+$/.test(tag))
      if (firstSpecificTag) return toTitleCase(firstSpecificTag)

      const candidate = post.title
        .replace(/[#*_`]/g, "")
        .split(/✍️|Question\s*[:፦]|Answer\s*[:፦]|\n|\.|:| - /i)[0]
        .replace(/^The use of\s+/i, "")
        .replace(/^About\s+/i, "")
        .trim()

      return candidate.slice(0, 60) || "Orthodox Teaching"
    }

    const byDate = [...(telegramPosts as TelegramPost[])]
      .filter((post) => post.type === "lesson" && !isQuestionLike(post))
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    const imported = byDate.map((post, idx): TeachingItem => {
      const tagSet = new Set(post.tags.map((t) => t.toLowerCase()))
      const title = tagSet.has("saint") && tagSet.has("george") ? "Saint George" : shortTitle(post)
      const haystack = `${post.title} ${post.excerpt} ${post.tags.join(" ")}`
      let category = "Theology"
      if (theotokosPattern.test(haystack)) category = "Theotokos (Virgin Mary)"
      else if (feastsPattern.test(haystack)) category = "Feasts & Liturgical Year"
      else if (christianLivingPattern.test(haystack)) category = "Christian Living"
      else if (traditionPattern.test(haystack)) category = "Tradition & Culture"
      else if (monasticPattern.test(haystack)) category = "Monastics & Asceticism"
      else if (post.tags.some((t) => /(eucharist|communion|confession|repentance|sin|sacrament|mysteries)/i.test(t)))
        category = "Sacraments"
      else if (liturgyPattern.test(haystack)) category = "Liturgy"
      else if (biblePattern.test(haystack)) category = "Bible Study"
      else if (fastingPattern.test(haystack)) category = "Fasting"
      else if (theologyCorePattern.test(haystack)) category = "Theology"
      else if (saintPattern.test(haystack)) category = "Saints"
      return {
        id: 100000 + post.id,
        title,
        description: post.excerpt,
        category,
        format: "Article",
        duration: "Imported post",
        image: "/placeholder.svg?height=200&width=300",
        featured: idx < 12,
        popular: idx < 18,
        link: `/teachings/imported/${post.id}`,
      }
    })
    return [...imported, ...baseTeachings]
  }, [])

  const filteredTeachings = allTeachings.filter((teaching) => {
    const categoryMatch = activeCategory === "All" || teaching.category === activeCategory
    const q = searchQuery.toLowerCase()
    const searchMatch =
      teaching.title.toLowerCase().includes(q) ||
      teaching.description.toLowerCase().includes(q) ||
      teaching.category.toLowerCase().includes(q)
    const formatMatch = formatFilter.length === 0 || formatFilter.includes(teaching.format)
    return categoryMatch && searchMatch && formatMatch
  })

  const categoryBadgeClass = (category: string) => {
    if (category === "Liturgy") return "bg-blue-600"
    if (category === "Theology") return "bg-purple-600"
    if (category === "Sacraments") return "bg-green-600"
    if (category === "Bible Study") return "bg-amber-600"
    if (category === "Saints") return "bg-orange-600"
    if (category === "Theotokos (Virgin Mary)") return "bg-rose-600"
    if (category === "Feasts & Liturgical Year") return "bg-cyan-600"
    if (category === "Christian Living") return "bg-emerald-600"
    if (category === "Tradition & Culture") return "bg-indigo-600"
    if (category === "Monastics & Asceticism") return "bg-teal-700"
    return "bg-gray-600"
  }

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
    <div className="bg-gradient-to-b from-amber-50/50 to-orange-50/30 dark:from-stone-950 dark:to-orange-950/20">
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
            <GeezHeading className="mb-4 text-orange-700 dark:text-amber-400">ትምህርቶች</GeezHeading>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Ethiopian Orthodox <AnimatedGradientText text="Teachings" />
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore the rich spiritual heritage and teachings of the Ethiopian Orthodox Tewahedo Church
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="browse" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-3 w-full max-w-md">
                  <TabsTrigger value="browse">Browse</TabsTrigger>
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="browse">
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
                                placeholder="Search teachings..."
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
                            <Filter className="h-5 w-5 text-orange-600 dark:text-orange-400" />
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
                            <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            Format
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {["Article", "Video", "Audio", "PDF Guide"].map((format) => (
                              <Badge
                                key={format}
                                variant={formatFilter.includes(format) ? "default" : "outline"}
                                className={`cursor-pointer ${
                                  formatFilter.includes(format)
                                    ? "bg-orange-600 hover:bg-orange-700"
                                    : "hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-700 dark:hover:text-orange-400"
                                }`}
                                onClick={() => toggleFormatFilter(format)}
                              >
                                {format}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="md:col-span-3">
                    <motion.div
                      className="grid md:grid-cols-2 gap-6"
                      initial="hidden"
                      animate="visible"
                      variants={staggerContainer}
                    >
                      {filteredTeachings.length > 0 ? (
                        filteredTeachings.map((teaching) => (
                          <motion.div key={teaching.id} variants={fadeInUp}>
                            <Card className="border-none shadow-lg overflow-hidden h-full hover:shadow-xl transition-all duration-300 group">
                              <div className="relative h-48">
                                <Image
                                  src={teaching.image || "/placeholder.svg"}
                                  alt={teaching.title}
                                  fill
                                  className="object-cover transition-transform group-hover:scale-105 duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                  <Badge
                                    className={`mb-2 ${categoryBadgeClass(teaching.category)}`}
                                  >
                                    {teaching.category}
                                  </Badge>
                                  <div className="flex items-center text-white text-xs">
                                    <span className="flex items-center">
                                      {teaching.format === "Article" ? (
                                        <Book className="h-3 w-3 mr-1" />
                                      ) : teaching.format === "Video" ? (
                                        <Video className="h-3 w-3 mr-1" />
                                      ) : teaching.format === "Audio" ? (
                                        <Play className="h-3 w-3 mr-1" />
                                      ) : (
                                        <FileText className="h-3 w-3 mr-1" />
                                      )}
                                      {teaching.format}
                                    </span>
                                    <span className="mx-2">•</span>
                                    <span className="flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {teaching.duration}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <CardContent className="p-4">
                                <h3 className="font-bold text-lg mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                                  {teaching.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{teaching.description}</p>
                                <div className="flex justify-between items-center">
                                  <Button
                                    asChild
                                    variant="default"
                                    className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600"
                                  >
                                    <Link href={teaching.link}>Read More</Link>
                                  </Button>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 rounded-full text-gray-500 hover:text-orange-600 dark:hover:text-orange-400"
                                    >
                                      <Bookmark className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 rounded-full text-gray-500 hover:text-orange-600 dark:hover:text-orange-400"
                                    >
                                      <Share2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))
                      ) : (
                        <div className="col-span-2 text-center py-12">
                          <Book className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                          <h3 className="text-xl font-bold mb-2">No teachings found</h3>
                          <p className="text-gray-500 dark:text-gray-400 mb-6">
                            Try adjusting your search filters or browse our categories
                          </p>
                          <Button
                            onClick={() => {
                              setActiveCategory("All")
                              setSearchQuery("")
                              setFormatFilter([])
                            }}
                            className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600"
                          >
                            Reset Filters
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="featured">
                <motion.div
                  className="grid md:grid-cols-2 gap-8"
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                  {allTeachings
                    .filter((teaching) => teaching.featured)
                    .map((teaching) => (
                      <motion.div key={teaching.id} variants={fadeInUp}>
                        <Card className="border-none shadow-lg overflow-hidden h-full hover:shadow-xl transition-all duration-300 group">
                          <div className="relative h-64">
                            <Image
                              src={teaching.image || "/placeholder.svg"}
                              alt={teaching.title}
                              fill
                              className="object-cover transition-transform group-hover:scale-105 duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-amber-600">Featured</Badge>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <Badge
                                className={`mb-2 ${categoryBadgeClass(teaching.category)}`}
                              >
                                {teaching.category}
                              </Badge>
                              <div className="flex items-center text-white text-xs">
                                <span className="flex items-center">
                                  {teaching.format === "Article" ? (
                                    <Book className="h-3 w-3 mr-1" />
                                  ) : teaching.format === "Video" ? (
                                    <Video className="h-3 w-3 mr-1" />
                                  ) : (
                                    <FileText className="h-3 w-3 mr-1" />
                                  )}
                                  {teaching.format}
                                </span>
                                <span className="mx-2">•</span>
                                <span className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {teaching.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-6">
                            <h3 className="font-bold text-xl mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                              {teaching.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{teaching.description}</p>
                            <div className="flex justify-between items-center">
                              <Button
                                asChild
                                variant="default"
                                className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600"
                              >
                                <Link href={teaching.link}>Read More</Link>
                              </Button>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-full text-gray-500 hover:text-orange-600 dark:hover:text-orange-400"
                                >
                                  <Bookmark className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-full text-gray-500 hover:text-orange-600 dark:hover:text-orange-400"
                                >
                                  <Share2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="popular">
                <motion.div
                  className="grid md:grid-cols-3 gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                  {allTeachings
                    .filter((teaching) => teaching.popular)
                    .map((teaching) => (
                      <motion.div key={teaching.id} variants={fadeInUp}>
                        <Card className="border-none shadow-lg overflow-hidden h-full hover:shadow-xl transition-all duration-300 group">
                          <div className="relative h-48">
                            <Image
                              src={teaching.image || "/placeholder.svg"}
                              alt={teaching.title}
                              fill
                              className="object-cover transition-transform group-hover:scale-105 duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-orange-600">Popular</Badge>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <div className="flex items-center text-white text-xs">
                                <span className="flex items-center">
                                  {teaching.format === "Article" ? (
                                    <Book className="h-3 w-3 mr-1" />
                                  ) : teaching.format === "Video" ? (
                                    <Video className="h-3 w-3 mr-1" />
                                  ) : (
                                    <FileText className="h-3 w-3 mr-1" />
                                  )}
                                  {teaching.format}
                                </span>
                                <span className="mx-2">•</span>
                                <span className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {teaching.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-bold text-lg mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                              {teaching.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                              {teaching.description}
                            </p>
                            <Button
                              asChild
                              variant="default"
                              className="w-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600"
                            >
                              <Link href={teaching.link}>Read More</Link>
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 bg-gradient-to-r from-orange-800 to-amber-700 dark:from-orange-950 dark:to-amber-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <GeezHeading className="mb-4 text-amber-300">ተመዝገብ</GeezHeading>
            <h2 className="text-3xl font-bold mb-4">Get Weekly Teachings</h2>
            <p className="text-lg mb-8">
              Subscribe to receive weekly teachings, articles, and resources directly to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button className="bg-white text-orange-800 hover:bg-amber-100">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Download Resources */}
      <section className="py-16 bg-amber-50/30 dark:bg-stone-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <GeezHeading className="mb-4 text-orange-700 dark:text-amber-400">ሀብቶች</GeezHeading>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Free Resources</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Download these free resources to deepen your understanding of the Ethiopian Orthodox faith
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <Book className="h-8 w-8 text-blue-600 dark:text-blue-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Prayer Book</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                  Daily prayers and devotionals from the Ethiopian Orthodox tradition
                </p>
                <Button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-white to-amber-50 dark:from-gray-900 dark:to-amber-950">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-amber-600 dark:text-amber-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Fasting Calendar</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                  Complete calendar of Ethiopian Orthodox fasting days and feast days
                </p>
                <Button className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700">
                  <Download className="h-4 w-4" />
                  Download Calendar
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-950">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-green-600 dark:text-green-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Study Guide</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                  Introduction to the Ethiopian Orthodox Tewahedo Church for beginners
                </p>
                <Button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700">
                  <Download className="h-4 w-4" />
                  Download Guide
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  )
}
