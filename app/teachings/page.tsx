"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AnimatedGradientText } from "@/components/animated-gradient-text"
import { ScrollToTop } from "@/components/scroll-to-top"
import { GeezHeading } from "@/components/geez-heading"
import { Book, Video, FileText, Bookmark, Search, Filter, Clock, Play, Download, Share2, Calendar } from "lucide-react"
import telegramPosts from "@/content/telegram/index.json"
import { groupImportedPosts } from "@/lib/imported-post-groups"
import { stripTeachingFiller, toNaturalTeachingTitle, toStandardShortTitle } from "@/lib/teaching-title"

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
  subtitle?: string
  description: string
  category: string
  format: "Article" | "Video" | "Audio" | "PDF Guide"
  duration: string
  image: string
  featured?: boolean
  popular?: boolean
  link: string
  searchTerms?: string
}

const categories = [
  "All",
  "Great Lent",
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
    image: "/orthodox-card-bg.svg",
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
    image: "/orthodox-card-bg.svg",
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
    image: "/orthodox-card-bg.svg",
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
    image: "/orthodox-card-bg.svg",
    link: "/teachings/4",
  },
  {
    id: 5,
    title: "Saints of Ethiopia: St. Tekle Haymanot",
    description: "The life and miracles of one of Ethiopia's most beloved saints.",
    category: "Saints",
    format: "Article",
    duration: "10 min read",
    image: "/orthodox-card-bg.svg",
    link: "/teachings/5",
  },
  {
    id: 6,
    title: "The Spiritual Meaning of Fasting",
    description: "Understanding the purpose and benefits of fasting in the Ethiopian Orthodox tradition.",
    category: "Fasting",
    format: "Video",
    duration: "18 min",
    image: "/orthodox-card-bg.svg",
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
    const greatLentPattern = /(great lent|abiy tsom|suba'?e|zewerede|metsague|mekurab|guebre|holy lent)/i
    const feastsPattern = /(epiphany|timkat|nativity|genna|meskel|hosanna|palm sunday|holy week|pascha|easter|feast|lent|season)/i
    const christianLivingPattern = /(marriage|family|parenting|youth|depression|anxiety|optimism|peace|virtue|ai|technology|work|daily life)/i
    const traditionPattern = /(kebero|bell|icon|iconography|adwa|tradition|culture|church custom|hymn)/i
    const monasticPattern = /(monastic|ascetic|monk|desert|abune aregawi|tekle haymanot|gebre menfes kidus)/i
    const prayerPattern = /(prayer|pray|supplication|intercession|psalm 50|our father|kneeling|prostration)/i
    const churchHistoryPattern =
      /(church history|history of the church|fathers|patriarch|synod|council|axum|aksum|ethiopian orthodox tewahedo church|apostolic era|martyrdom)/i
    const theologyCorePattern = /(trinity|incarnation|tewahedo|christology|dogma|creed|nature of christ|core pillar|divinity)/i
    const liturgyPattern = /(liturgy|kidassie|qurbana|worship service|vespers)/i
    const biblePattern = /(scripture|gospel|bible|john|apostle|psalm)/i
    const fastingPattern = /(fasting|abiye tsom|nineveh|wednesday|friday fast)/i
    const isAnnouncementLike = (post: TelegramPost) => {
      const tags = post.tags.map((tag) => tag.toLowerCase())
      const normalizeSignalText = (value: string) =>
        value
          .toLowerCase()
          .replace(/[^\p{L}\p{N}\s]/gu, " ")
          .replace(/\s+/g, " ")
          .trim()
      const title = normalizeSignalText(post.title)
      const text = normalizeSignalText(`${post.title} ${post.excerpt} ${post.tags.join(" ")}`)

      if (tags.includes("announcement")) return true
      if (title === "imported post" || title === "announcement") return true

      const hardSignals = [
        "gentle reminder",
        "live q&a",
        "q&a session",
        "session is starting",
        "starting now",
        "scheduled to begin",
        "postponement",
        "postponed",
        "rescheduled",
        "admin team",
        "join us live",
        "happy new year",
        "new year (2026)",
        "we sincerely apologize",
        "hour has come for us to gather",
        "weekly live",
        "may the name of the holy god be praised forever and ever",
        "may the blessings of gods mother",
        "reach out to us on our social media platforms",
        "share it with your friends",
        "linktr ee",
        "we are pleased to share the new",
        "new tiktok account",
        "tiktok account",
        "please follow the page",
        "follow the page",
        "like the content",
        "theological college",
      ]
      if (hardSignals.some((signal) => text.includes(signal))) return true

      const promoPattern =
        /\b(tiktok|telegram|youtube|instagram|facebook)\b.*\b(account|channel|page)\b|\bplease\s+follow\b|\bfollow\s+the\s+page\b|\blike\s+the\s+content\b/i
      if (promoPattern.test(`${post.title} ${post.excerpt}`)) return true

      const greetingStarts = [
        "peace be with you",
        "beloved brothers and sisters in christ",
        "it is with deep joy that we share",
        "saint brothers and sisters",
        "may the name of the holy god be praised forever and ever",
        "may the blessings of gods mother",
        "may the blessings of the holy mother of god",
      ]
      if (greetingStarts.some((prefix) => title.startsWith(prefix))) return true

      return false
    }
    const isQuestionLike = (post: TelegramPost) =>
      /question\s*[:፦]|answer\s*[:፦]/i.test(`${post.title} ${post.excerpt}`)
    const cleanForTitle = (value: string) =>
      value
        .replace(/[#*_`]/g, "")
        .replace(/[👉👇☝️🏾🏽🏿]+/gu, " ")
        .replace(/\s+/g, " ")
        .trim()
    const stripLeadPhrases = (value: string) =>
      value
        .replace(/^(continued|continuation|cont(?:'|’)?d|\(continued\)|\(cont(?:'|’)?d\)|part\s*\d+)\s*/i, "")
        .replace(/^(about|lesson(?:\s+on)?|reflection(?:\s+on)?|a\s+homily\s+on|on)\s+/i, "")
        .replace(/^(the\s+annual\s+feast\s+of|the\s+feast\s+of|feast\s+of)\s+/i, "")
        .trim()
    const firstSentence = (value: string) => cleanForTitle(value).split(/\n|(?<=[.!?])\s+/)[0].trim()
    const sanitizeDisplayTitle = (value: string) => {
      let title = value.trim()
      if (!title) return title

      if (/\bbeloved\b/i.test(title)) title = title.split(/\bbeloved\b/i)[0].trim()
      title = title.replace(/[,\-–—]\s*$/g, "").trim()
      if (/^beloved\b/i.test(title)) return ""

      return title
    }
    const normalizeForDedupe = (value: string) =>
      value
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .replace(/\b(part\s*\d+|continued|continuation|contd|cont)\b/g, " ")
        .replace(/\b(the|about|lesson|reflection|of|on|and|for|with|a|an)\b/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    const topicStopWords = new Set([
      "about",
      "annual",
      "beloved",
      "blessed",
      "christ",
      "church",
      "continued",
      "faith",
      "holy",
      "lesson",
      "lord",
      "orthodox",
      "part",
      "reflection",
      "saint",
      "service",
      "teaching",
      "the",
      "week",
    ])
    const canonicalTopicKey = (title: string, searchTerms?: string) => {
      const normalizeText = (value: string) =>
        value
          .normalize("NFKD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replace(/[#*_`]/g, " ")
          .replace(/[^\w\s]/g, " ")
          .replace(/\s+/g, " ")
          .trim()

      const normalizedTitle = normalizeText(title)
      const normalizedFallback = normalizeText(searchTerms ?? "")

      if (/holy\s+communion/.test(normalizedTitle)) return "holy-communion"
      if (/holy\s+eucharist/.test(normalizedTitle)) return "holy-eucharist"
      if (/great\s+lent|abiy\s+tsom/.test(normalizedTitle)) return "great-lent"
      if (/metsague|metsagu/.test(normalizedTitle)) return "metsague"
      if (/nineveh/.test(normalizedTitle)) return "nineveh"
      if (/saint\s+george|st\s+george/.test(normalizedTitle)) return "saint-george"
      if (/saint\s+gabriel|st\s+gabriel|archangel\s+gabriel/.test(normalizedTitle)) return "saint-gabriel"

      const extractTokens = (value: string) =>
        value
          .split(" ")
          .filter((token) => token.length >= 3)
          .filter((token) => !topicStopWords.has(token))
          .filter((token) => !/^\d+$/.test(token))

      let tokens = extractTokens(normalizedTitle)
      if (tokens.length < 2 && normalizedFallback) tokens = extractTokens(normalizedFallback)

      const unique = Array.from(new Set(tokens)).sort()
      return unique.slice(0, 6).join("-")
    }
    const buildDisplayTitle = (post: TelegramPost) => {
      let candidate = sanitizeDisplayTitle(stripLeadPhrases(cleanForTitle(post.title)))
      if (!candidate || candidate.split(/\s+/).length < 5) {
        candidate = sanitizeDisplayTitle(stripLeadPhrases(firstSentence(post.excerpt)))
      }
      if (!candidate || candidate.split(/\s+/).length < 5) {
        return "Orthodox Spiritual Teaching for Faithful Christian Life"
      }
      return candidate.split(/\s+/).slice(0, 12).join(" ").trim()
    }
    const genericPartTitlePattern = /^(continued|continuation|cont(?:'|’)?d|part\s*\d+)/i
    const urlOnlyPattern = /^(https?:\/\/|www\.)/i
    const isUrlOnlyPost = (post: TelegramPost) =>
      urlOnlyPattern.test(post.title.trim()) && urlOnlyPattern.test(post.excerpt.trim())

    const byDate = [...(telegramPosts as TelegramPost[])]
      .filter((post) => post.type === "lesson" && !isQuestionLike(post) && !isAnnouncementLike(post))
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    const groupedLessons = groupImportedPosts(byDate)
    const importedWithKeys = groupedLessons
      .map((group, idx): (TeachingItem & { dedupeKey: string }) | null => {
        const postsForDisplay = group.posts.filter((entry) => !isUrlOnlyPost(entry))
        if (postsForDisplay.length === 0) return null

        const representative =
          postsForDisplay.find((entry) => !genericPartTitlePattern.test(entry.title.trim())) ?? postsForDisplay[0]
        if (genericPartTitlePattern.test(representative.title.trim()) && postsForDisplay.length === 1) return null

        const post = representative
        const allTags = Array.from(new Set(postsForDisplay.flatMap((entry) => entry.tags)))
        const haystack = postsForDisplay.map((entry) => `${entry.title} ${entry.excerpt} ${entry.tags.join(" ")}`).join(" ")
        const totalPosts = postsForDisplay.length
        const builtTitle = buildDisplayTitle(post)
        let title = toNaturalTeachingTitle(builtTitle)
        let category = "Theology"
        if (saintPattern.test(haystack)) category = "Saints"
        else if (theotokosPattern.test(haystack)) category = "Theotokos (Virgin Mary)"
        else if (greatLentPattern.test(haystack)) category = "Great Lent"
        else if (feastsPattern.test(haystack)) category = "Feasts & Liturgical Year"
        else if (christianLivingPattern.test(haystack)) category = "Christian Living"
        else if (traditionPattern.test(haystack)) category = "Tradition & Culture"
        else if (monasticPattern.test(haystack)) category = "Monastics & Asceticism"
        else if (prayerPattern.test(haystack)) category = "Prayer"
        else if (churchHistoryPattern.test(haystack)) category = "Church History"
        else if (postsForDisplay.some((entry) => entry.tags.some((tag) => /(eucharist|communion|confession|repentance|sin|sacrament|mysteries)/i.test(tag))))
          category = "Sacraments"
        else if (liturgyPattern.test(haystack)) category = "Liturgy"
        else if (biblePattern.test(haystack)) category = "Bible Study"
        else if (fastingPattern.test(haystack)) category = "Fasting"
        else if (theologyCorePattern.test(haystack)) category = "Theology"

        if (category === "Saints" && !/\b(saint|st\.?|archangel|virgin)\b/i.test(title)) title = `Saint ${title}`

        title = toStandardShortTitle(toNaturalTeachingTitle(title), 7)

        const dedupeKey = `${normalizeForDedupe(builtTitle)}|${normalizeForDedupe(post.excerpt).slice(0, 90)}`
        return {
          dedupeKey,
          id: 100000 + post.id,
          title,
          subtitle: undefined,
          description: stripTeachingFiller(post.excerpt),
          category,
          format: "Article",
          duration: totalPosts > 1 ? `${totalPosts} posts` : "1 post",
          image: "/orthodox-card-bg.svg",
          featured: idx < 12,
          popular: idx < 18,
          link: `/teachings/imported/${group.leadId}`,
          searchTerms: postsForDisplay.map((entry) => `${entry.title} ${entry.excerpt} ${entry.tags.join(" ")}`).join(" "),
        }
      })
      .filter((teaching): teaching is TeachingItem & { dedupeKey: string } => teaching !== null)

    const seenDedupeKeys = new Set<string>()
    const seenTitleKeys = new Set<string>()
    const seenTopicKeys = new Set<string>()
    const imported: TeachingItem[] = []
    for (const teaching of importedWithKeys) {
      const titleKey = normalizeForDedupe(teaching.title)
      const topicKey = canonicalTopicKey(teaching.title, teaching.searchTerms)
      if (seenDedupeKeys.has(teaching.dedupeKey)) continue
      if (titleKey && seenTitleKeys.has(titleKey)) continue
      if (topicKey && topicKey.split("-").length >= 3 && seenTopicKeys.has(topicKey)) continue
      seenDedupeKeys.add(teaching.dedupeKey)
      if (titleKey) seenTitleKeys.add(titleKey)
      if (topicKey && topicKey.split("-").length >= 3) seenTopicKeys.add(topicKey)
      imported.push({
        id: teaching.id,
        title: teaching.title,
        subtitle: teaching.subtitle,
        description: teaching.description,
        category: teaching.category,
        format: teaching.format,
        duration: teaching.duration,
        image: teaching.image,
        featured: teaching.featured,
        popular: teaching.popular,
        link: teaching.link,
        searchTerms: teaching.searchTerms,
      })
    }
    const baseWithSearch = baseTeachings.map((teaching) => ({
      ...teaching,
      searchTerms: `${teaching.title} ${teaching.description} ${teaching.category}`,
    }))
    return [...imported, ...baseWithSearch]
  }, [])

  const normalize = (value: string) =>
    value
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()

  const normalizedQuery = useMemo(() => normalize(searchQuery), [searchQuery])
  const indexedTeachings = useMemo(
    () =>
      allTeachings.map((teaching) => ({
        ...teaching,
        _searchText: normalize(`${teaching.title} ${teaching.description} ${teaching.category} ${teaching.searchTerms ?? ""}`),
      })),
    [allTeachings],
  )
  const filteredTeachings = useMemo(
    () =>
      indexedTeachings.filter((teaching) => {
        const hasQuery = normalizedQuery.length > 0
        const categoryMatch = hasQuery ? true : activeCategory === "All" || teaching.category === activeCategory
        const searchMatch = normalizedQuery === "" || teaching._searchText.includes(normalizedQuery)
        const formatMatch = hasQuery ? true : formatFilter.length === 0 || formatFilter.includes(teaching.format)
        return categoryMatch && searchMatch && formatMatch
      }),
    [indexedTeachings, activeCategory, normalizedQuery, formatFilter],
  )

  const categoryBadgeClass = (category: string) => {
    if (category === "Great Lent") return "bg-lime-700"
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
    <div className="bg-[url('/images/mobile-parch.png?v=20260321')] md:bg-[url('/images/parchment-bg.png?v=20260321')] bg-cover bg-center bg-repeat dark:bg-none dark:bg-gradient-to-b dark:from-stone-950 dark:to-orange-950/20">
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
            <h1 className="mx-auto mb-6 max-w-[16ch] px-2 text-center text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl md:max-w-none md:text-6xl [text-wrap:balance]">
              <span className="block text-stone-900 dark:text-white">Ethiopian Orthodox</span>
              <AnimatedGradientText text="Teachings" className="mt-4 block md:mt-5" />
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
                            {(searchQuery.trim() || activeCategory !== "All" || formatFilter.length > 0) && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSearchQuery("")
                                  setActiveCategory("All")
                                  setFormatFilter([])
                                }}
                              >
                                Clear search & filters
                              </Button>
                            )}
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
                    <div className="grid md:grid-cols-2 gap-6">
                      {filteredTeachings.length > 0 ? (
                        filteredTeachings.map((teaching) => (
                          <div key={teaching.id}>
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
                                  <Badge className={`mb-2 text-[11px] ${categoryBadgeClass(teaching.category)}`}>
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
                                    {teaching.duration !== "1 post" && (
                                      <>
                                        <span className="mx-2">•</span>
                                        <span className="flex items-center">
                                          <Clock className="h-3 w-3 mr-1" />
                                          {teaching.duration}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <CardContent className="p-4">
                                <h3 className="font-extrabold text-lg leading-[1.4] [hyphens:none] mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                                  {teaching.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{teaching.description}</p>
                                <div className="flex justify-between items-center">
                                  <Link
                                    href={teaching.link}
                                    className="text-orange-700 dark:text-orange-400 font-semibold hover:underline"
                                  >
                                    Read More →
                                  </Link>
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
                          </div>
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
                    </div>
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
                              <Badge className={`mb-2 text-[11px] ${categoryBadgeClass(teaching.category)}`}>
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
                                {teaching.duration !== "1 post" && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <span className="flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {teaching.duration}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-6">
                            <h3 className="font-extrabold text-xl leading-[1.4] [hyphens:none] mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                              {teaching.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{teaching.description}</p>
                            <div className="flex justify-between items-center">
                              <Link
                                href={teaching.link}
                                className="text-orange-700 dark:text-orange-400 font-semibold hover:underline"
                              >
                                Read More →
                              </Link>
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
                                {teaching.duration !== "1 post" && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <span className="flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {teaching.duration}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-extrabold text-lg leading-[1.4] [hyphens:none] mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                              {teaching.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                              {teaching.description}
                            </p>
                            <Link
                              href={teaching.link}
                              className="text-orange-700 dark:text-orange-400 font-semibold hover:underline"
                            >
                              Read More →
                            </Link>
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
