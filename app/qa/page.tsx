"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { AnimatedGradientText } from "@/components/animated-gradient-text"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Search, MessageSquare, Send, Sparkles, Cross, Heart, Church, Users, BookOpen, ShieldCheck } from "lucide-react"
import telegramPosts from "@/content/telegram/index.json"
import { groupImportedPosts } from "@/lib/imported-post-groups"

type QAItem = {
  id: number
  question: string
  fullQuestion?: string
  answer: string
  tags: string[]
  likes?: number
  category?: string
  contentPath?: string
  contentPaths?: string[]
  isImported?: boolean
}

type TelegramPost = {
  id: number
  type: "lesson" | "Q&A"
  title: string
  date: string
  tags: string[]
  excerpt: string
  contentPath: string
}

const qaData: QAItem[] = [
  {
    id: 1,
    question: "What is the importance of faith in our lives?",
    answer:
      "Faith is the foundation of our relationship with God. It strengthens us in times of hardship and brings us closer to Christ. As Hebrews 11:1 tells us, 'Faith is confidence in what we hope for and assurance about what we do not see.' Through faith, we trust in God's promises and find purpose in our daily lives.",
    tags: ["faith", "prayer"],
    likes: 42,
    category: "Faith",
  },
  {
    id: 2,
    question: "How do I properly repent for my sins?",
    answer:
      "Repentance begins with recognizing our sins, confessing to God, and committing to turn away from them through the guidance of a spiritual father. True repentance involves a change of heart and mind (metanoia) that leads to a transformation of behavior. Regular confession, prayer, and fasting are essential practices that support the journey of repentance.",
    tags: ["repentance", "sin", "confession"],
    likes: 38,
    category: "Repentance",
  },
  {
    id: 3,
    question: "Who can partake in Holy Communion?",
    answer:
      "Holy Communion is reserved for baptized members of the Church who have repented, confessed, and prepared themselves through fasting and prayer. Children who have been baptized may also receive Communion. Proper preparation includes spiritual reflection, reconciliation with others, and maintaining a pure heart and mind before approaching the Holy Gifts.",
    tags: ["communion", "sacraments"],
    likes: 35,
    category: "Communion",
  },
  {
    id: 4,
    question: "What is the significance of fasting in the Ethiopian Orthodox Church?",
    answer:
      "Fasting in the Ethiopian Orthodox Church is a spiritual discipline that helps believers focus on prayer, repentance, and drawing closer to God. It involves abstaining from animal products and eating after a certain time of day. The Ethiopian Orthodox Church observes several fasting periods throughout the year, including the Great Fast (Lent), the Fast of the Apostles, the Fast of the Assumption, and the Fast of Nineveh.",
    tags: ["fasting", "discipline"],
    likes: 29,
    category: "Practices",
  },
  {
    id: 5,
    question: "How should I prepare for confession?",
    answer:
      "To prepare for confession, examine your conscience, reflect on your sins, pray for guidance, and approach your spiritual father with humility and a sincere desire for repentance. It's helpful to review the Ten Commandments and the teachings of the Church as you examine your thoughts, words, and actions. Remember that confession is a healing sacrament, not a punishment.",
    tags: ["confession", "repentance"],
    likes: 27,
    category: "Repentance",
  },
  {
    id: 6,
    question: "What is the role of saints in the Ethiopian Orthodox Church?",
    answer:
      "Saints in the Ethiopian Orthodox Church serve as examples of faith and holiness, intercessors who pray for us, and spiritual guides whose lives teach us how to follow Christ. The veneration of saints is an important aspect of Orthodox spirituality, as we honor those who have achieved theosis (union with God) and seek their prayers and guidance in our own spiritual journey.",
    tags: ["saints", "intercession", "veneration"],
    likes: 24,
    category: "Faith",
  },
  {
    id: 7,
    question: "How can young people stay connected to their faith in today's world?",
    answer:
      "Young people can stay connected to their faith by participating in church services, joining youth groups, developing a personal prayer life, studying Scripture, seeking mentorship from spiritual elders, and finding ways to serve others. In today's digital age, it's also helpful to follow Orthodox content creators, join online faith communities, and use apps for daily prayers and readings. Remember that faith is a journey that requires consistent effort and community support.",
    tags: ["youth", "modern life", "faith"],
    likes: 31,
    category: "Youth",
  },
  {
    id: 8,
    question: "What is the meaning of the Ethiopian cross design?",
    answer:
      "The Ethiopian cross, with its intricate designs and patterns, symbolizes Christ's sacrifice and victory over death. The unique lattice work and geometric patterns represent the eternal nature of God, while the equal arms signify the balance between the divine and human natures of Christ. Ethiopian crosses often include decorative elements that tell biblical stories and reflect Ethiopia's rich cultural heritage.",
    tags: ["cross", "symbols", "culture"],
    likes: 22,
    category: "Culture",
  },
]

export default function QAPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const normalizeText = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim()

  const tokenize = (value: string) => normalizeText(value).split(" ").filter((token) => token.length > 1)

  const extractQuestionTitle = (post: TelegramPost) => {
    const normalize = (value: string) =>
      value
        .replace(/[#*_`]/g, " ")
        .replace(/[“”]/g, '"')
        .replace(/\s+/g, " ")
        .trim()

    const toTitleCase = (value: string) =>
      value
        .split(" ")
        .filter(Boolean)
        .map((word, idx) => {
          const lower = word.toLowerCase()
          const small = new Set(["a", "an", "and", "as", "at", "for", "in", "of", "on", "or", "the", "to"])
          if (idx > 0 && small.has(lower)) return lower
          return lower.charAt(0).toUpperCase() + lower.slice(1)
        })
        .join(" ")

    let title = normalize(post.title)
    if (!title) return "Orthodox Q&A for Faith and Spiritual Guidance"

    title = title
      .replace(/^(question|answer)\s*[:፦-]\s*/i, "")
      .replace(/^(continued|continuation|cont(?:'|’)?d)\b[\s:.-]*/i, "")
      .replace(/\b(part|pt\.?)\s*\d+\b/gi, "")
      .replace(/\bcontinues?\b[\s:.-]*$/i, "")
      .replace(/\s+/g, " ")
      .trim()

    // Fix broken possessives from imported text, e.g. "Adam S Fall" -> "Adam's Fall".
    title = title.replace(/\b([A-Za-z]{3,})\s+S\s+(?=[A-Za-z])/g, "$1's ")

    const awkwardMeaning = title.match(/^what does it mean\s+(.+)$/i)
    if (awkwardMeaning?.[1]) title = `What Does ${awkwardMeaning[1].trim()} Mean`

    title = title.replace(/^about\s+/i, "").replace(/\s+/g, " ").trim()
    if (!title || /^imported post$/i.test(title)) return "Orthodox Q&A for Faith and Spiritual Guidance"
    if (/^adam(?:'s| s)\s+fall\s+and\s+christ(?:'s| s)\s+victory$/i.test(title)) return "Adam's Fall and Christ's Victory"
    return toTitleCase(title)
  }

  const isQuestionLike = (post: TelegramPost) => /question\s*[:፦]|answer\s*[:፦]/i.test(`${post.title} ${post.excerpt}`)
  const importedQA = useMemo(
    () => {
      const toComparableText = (value: string) =>
        value
          .toLowerCase()
          .replace(/[^\p{L}\p{N}\s]/gu, " ")
          .replace(/\s+/g, " ")
          .trim()
      const hasContinuationCue = (value: string) => /continues?\b|continued\b|part\s*\d+/i.test(value)
      const dayDiff = (left: string, right: string) => Math.abs(+new Date(left) - +new Date(right)) / (1000 * 60 * 60 * 24)

      const source = [...(telegramPosts as TelegramPost[])]
        .filter((post) => post.type === "Q&A" || isQuestionLike(post) || (post.type === "lesson" && /^answer\s*\d+/i.test(post.title)))
        .map((post) =>
          post.type === "lesson" && /^answer\s*\d+/i.test(post.title)
            ? { ...post, type: "Q&A" as const }
            : post,
        )
        .sort((a, b) => +new Date(b.date) - +new Date(a.date))

      const grouped = groupImportedPosts(source)

      // Fallback merge: if a standalone "Answer N" item appears right after a Q&A that says "Continues",
      // append it to that Q&A thread even when topic-key grouping misses it.
      const groupedAsc = [...grouped].sort((a, b) => +new Date(a.date) - +new Date(b.date))
      const mergedGroups: typeof groupedAsc = []
      for (const group of groupedAsc) {
        const repTitle = toComparableText(group.representative.title)
        const isAnswerChunk = /^answer\s*\d+\b/.test(repTitle)
        const previous = mergedGroups[mergedGroups.length - 1]
        const previousText = previous
          ? toComparableText(`${previous.representative.title} ${previous.representative.excerpt}`)
          : ""
        const previousHasTopicTags = Boolean(previous && previous.representative.tags && previous.representative.tags.length > 0)
        const shouldAttachToPrevious =
          Boolean(previous) &&
          isAnswerChunk &&
          dayDiff(group.date, previous.date) <= 2 &&
          (hasContinuationCue(previousText) || previousHasTopicTags)

        if (shouldAttachToPrevious && previous) {
          previous.posts = [...previous.posts, ...group.posts].sort((a, b) => +new Date(a.date) - +new Date(b.date))
          previous.date = group.date
          previous.leadId = group.leadId
          continue
        }

        mergedGroups.push({ ...group, posts: [...group.posts] })
      }

      return mergedGroups.sort((a, b) => +new Date(b.date) - +new Date(a.date)).map((group) => {
        const representative = group.representative
        const repText = toComparableText(`${representative.title} ${representative.excerpt}`)
        const groupHasAnswerChunks = group.posts.some((post) => /^answer\s*\d+\b/i.test(toComparableText(post.title)))
        const needsContinuationAttach = hasContinuationCue(repText) || groupHasAnswerChunks
        const supplementalContinuationPaths = needsContinuationAttach
          ? (telegramPosts as TelegramPost[])
              .filter((post) => post.type === "lesson")
              .filter((post) => /continued/i.test(post.contentPath))
              .filter((post) => dayDiff(post.date, representative.date) <= 2)
              .filter((post) => Math.abs(post.id - representative.id) <= 12)
              .map((post) => post.contentPath)
          : []
        const mergedTags = Array.from(new Set(group.posts.flatMap((post) => post.tags)))
        const preview =
          group.posts
            .map((post) => post.excerpt.trim())
            .find((text) => text.length > 20 && !/^(continued|part\s*\d+)/i.test(text)) ?? representative.excerpt
        const mergedPaths = Array.from(new Set([...group.posts.map((post) => post.contentPath), ...supplementalContinuationPaths]))

        return {
          id: 100000 + group.leadId,
          question: extractQuestionTitle(representative),
          answer: preview,
          tags: mergedTags,
          likes: 0,
          category: "Imported Q&A",
          contentPath: representative.contentPath,
          contentPaths: mergedPaths,
          isImported: true,
        }
      })
    },
    [],
  )
  const allQA = useMemo(() => [...importedQA, ...qaData], [importedQA])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [questionInput, setQuestionInput] = useState("")
  const [activeAnswer, setActiveAnswer] = useState<QAItem | null>(null)
  const [resolvedQuestion, setResolvedQuestion] = useState("")
  const [resolvedAnswer, setResolvedAnswer] = useState("")
  const [isAnswerLoading, setIsAnswerLoading] = useState(false)

  const categoryMeta: Record<string, { icon: typeof MessageSquare; summary: string }> = {
    All: { icon: MessageSquare, summary: "Browse all questions and answers." },
    Faith: { icon: Cross, summary: "Belief, doctrine, and the foundations of Orthodox faith." },
    Repentance: { icon: Heart, summary: "Confession, turning back to God, and spiritual struggle." },
    Communion: { icon: Church, summary: "Preparation, worthiness, and Holy Communion questions." },
    Practices: { icon: ShieldCheck, summary: "Fasting, prayer, discipline, and practical church life." },
    Youth: { icon: Users, summary: "Guidance for younger believers and modern life questions." },
    Culture: { icon: BookOpen, summary: "Orthodox customs, symbols, and Ethiopian church culture." },
    "Imported Q&A": { icon: MessageSquare, summary: "Answers imported from the John’s Repentance archive." },
  }

  // Extract all unique tags
  const allTags = useMemo(() => Array.from(new Set(allQA.flatMap((item) => item.tags))), [allQA])
  const qaCategories = useMemo(
    () =>
      Array.from(new Set(allQA.map((item) => item.category || "Imported Q&A")))
        .sort((a, b) => a.localeCompare(b))
        .map((category) => ({
          category,
          count: allQA.filter((item) => (item.category || "Imported Q&A") === category).length,
        })),
    [allQA],
  )
  const rankedQA = useMemo(() => {
    const query = normalizeText(searchTerm)
    const queryTokens = tokenize(searchTerm)

    return allQA
      .map((item) => {
        const questionText = normalizeText(item.question)
        const answerText = normalizeText(item.answer)
        const tagsText = normalizeText(item.tags.join(" "))
        const fullText = `${questionText} ${answerText} ${tagsText}`
        const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => item.tags.includes(tag))
        const itemCategory = item.category || "Imported Q&A"
        const matchesCategory = activeCategory === "All" || itemCategory === activeCategory
        if (!matchesTags || !matchesCategory) return null

        let score = 0
        if (!query) score = 1
        else {
          if (questionText.includes(query)) score += 12
          if (tagsText.includes(query)) score += 8
          if (answerText.includes(query)) score += 4
          for (const token of queryTokens) {
            if (questionText.includes(token)) score += 5
            else if (tagsText.includes(token)) score += 3
            else if (fullText.includes(token)) score += 1
          }
        }

        if (score <= 0) return null
        return { item, score }
      })
      .filter((entry): entry is { item: QAItem; score: number } => entry !== null)
      .sort((a, b) => b.score - a.score || (b.item.likes || 0) - (a.item.likes || 0))
      .map((entry) => entry.item)
  }, [activeCategory, allQA, searchTerm, selectedTags])

  const filteredQA = useMemo(() => {
    if (activeTab === "popular") return [...rankedQA].sort((a, b) => (b.likes || 0) - (a.likes || 0))
    if (activeTab === "recent") return [...rankedQA].sort((a, b) => b.id - a.id)
    if (activeTab === "unanswered") return rankedQA.filter((item) => (item.likes || 0) === 0)
    return rankedQA
  }, [activeTab, rankedQA])

  const fallbackQA = useMemo(() => {
    if (filteredQA.length > 0) return []
    if (selectedTags.length > 0) {
      return allQA.filter((item) => selectedTags.some((tag) => item.tags.includes(tag))).slice(0, 8)
    }
    return [...allQA].sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 8)
  }, [allQA, filteredQA.length, selectedTags])
  const suggestedTags = useMemo(() => {
    if (!searchTerm) return []
    return allTags
      .filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedTags.includes(tag))
      .slice(0, 5)
  }, [allTags, searchTerm, selectedTags])

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleSuggestionClick = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedTags([])
    setActiveCategory("All")
  }

  const extractAnswerFromImportedText = (raw: string) => {
    const body = raw.replace(/^---[\s\S]*?\n---\n?/m, "").trim()
    const answerMatch = body.match(/answer\s*[:፦]\s*([\s\S]*)/i)
    const extracted = answerMatch?.[1] ? answerMatch[1].trim() : body
    return extracted
      .replace(/\bSalivation\b/g, "Salvation")
      .replace(/^\s*(continues?|continued)\b[\s\p{P}\p{S}]*(in\s+part\s*\d+)?\s*$/gimu, "")
      .replace(/\bcontinues?\b[\s\p{P}\p{S}]*$/gimu, "")
      .replace(/^\s*(continued|continuation|cont(?:'|’)?d|part\s*\d+)\s*[:.-]?\s*$/gim, "")
      .trim()
  }

  const extractQuestionFromImportedText = (raw: string) => {
    const body = raw.replace(/^---[\s\S]*?\n---\n?/m, "").trim()
    const questionMatch =
      body.match(/(?:^|\n)\s*[-*]?\s*question\s*[:፦-]\s*([\s\S]*?)(?=\n\s*[-*]?\s*answer\s*[:፦-]|\n\s*✍|$)/i) ??
      body.match(/(?:^|\n)\s*question\s+for\s+([^\n]+)/i)
    const extracted = questionMatch?.[1]?.trim() ?? ""
    return extracted
      .replace(/\s+/g, " ")
      .replace(/\bcontinues?\b[\s\p{P}\p{S}]*$/gimu, "")
      .trim()
  }

  const openAnswer = async (item: QAItem) => {
    setActiveAnswer(item)
    setResolvedQuestion(item.fullQuestion || item.question)
    if (!item.isImported || !item.contentPath) {
      setResolvedAnswer(item.answer)
      return
    }

    try {
      setIsAnswerLoading(true)
      const paths = item.contentPaths?.length ? item.contentPaths : item.contentPath ? [item.contentPath] : []
      if (paths.length === 0) {
        setResolvedAnswer(item.answer)
        return
      }
      const responses = await Promise.all(paths.map((path) => fetch(path)))
      const markdownBodies = await Promise.all(
        responses.map(async (response) => {
          if (!response.ok) throw new Error("Failed to load answer")
          return response.text()
        }),
      )
      const mergedQuestion = markdownBodies.map((text) => extractQuestionFromImportedText(text)).filter(Boolean).join("\n\n")
      const mergedAnswer = markdownBodies.map((text) => extractAnswerFromImportedText(text)).filter(Boolean).join("\n\n")
      if (mergedQuestion) setResolvedQuestion(mergedQuestion)
      setResolvedAnswer(mergedAnswer || item.answer)
    } catch {
      setResolvedQuestion(item.fullQuestion || item.question)
      setResolvedAnswer(item.answer)
    } finally {
      setIsAnswerLoading(false)
    }
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
        staggerChildren: 0.1,
      },
    },
  }

  const renderResults = () => (
    <motion.div className="space-y-6" initial="hidden" animate="visible" variants={staggerContainer}>
      {filteredQA.length > 0 ? (
        filteredQA.map((item) => (
          <motion.div key={item.id} variants={fadeInUp}>
            <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-orange-50/40 dark:from-stone-900 dark:to-orange-950/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg leading-snug">{item.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-500 text-sm italic">Answer available - tap to view.</p>
                <div className="flex flex-wrap items-center justify-between">
                  <div className="flex flex-wrap gap-2 mb-2 md:mb-0">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full cursor-pointer ${selectedTags.includes(tag) ? "bg-orange-200" : ""}`}
                        onClick={() => handleTagClick(tag)}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600"
                      onClick={() => openAnswer(item)}
                    >
                      View Answer
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-orange-600">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        ></path>
                      </svg>
                      {item.likes || 0}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-orange-600">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        ></path>
                      </svg>
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-medium mb-2">No results found</h3>
          <p className="text-gray-500 mb-4">No exact match. Try another keyword, or use the suggested questions below.</p>
          {fallbackQA.length > 0 && (
            <div className="mx-auto mt-6 max-w-3xl text-left">
              <p className="mb-3 text-sm font-medium text-gray-600 dark:text-gray-300">Suggested questions</p>
              <div className="grid gap-3">
                {fallbackQA.map((item) => (
                  <button
                    key={`fallback-${item.id}`}
                    type="button"
                    onClick={() => openAnswer(item)}
                    className="rounded-lg border border-orange-200/70 bg-white/70 px-4 py-3 text-left text-sm text-gray-700 transition hover:border-orange-400 hover:bg-orange-50 dark:border-orange-900/40 dark:bg-stone-900/50 dark:text-gray-200"
                  >
                    {item.question}
                  </button>
                ))}
              </div>
            </div>
          )}
          <Button onClick={clearFilters} className="bg-orange-600 hover:bg-orange-700">
            Clear Filters
          </Button>
        </div>
      )}
    </motion.div>
  )

  return (
    <div className="bg-gradient-to-b from-amber-50/50 to-orange-50/30 dark:from-stone-950 dark:to-orange-950/20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-amber-500/5 dark:from-orange-900/20 dark:to-amber-900/20 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Questions & <AnimatedGradientText text="Answers" />
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Search through our Q&A database or submit your own question about faith, repentance, holy communion, and
              more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {qaCategories.map(({ category, count }) => {
                const Icon = categoryMeta[category]?.icon ?? MessageSquare
                const isActive = activeCategory === category
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-[1.5rem] border p-5 text-left shadow-lg transition-all ${
                      isActive
                        ? "border-orange-300 bg-gradient-to-br from-orange-100 to-amber-50 dark:border-orange-800 dark:from-orange-950/60 dark:to-amber-950/30"
                        : "border-amber-100/80 bg-white/90 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl dark:border-stone-800 dark:bg-stone-900/80"
                    }`}
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-600 to-amber-500 text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-2xl font-semibold leading-tight text-stone-900 dark:text-white">{category}</h2>
                      <span className="rounded-full bg-stone-900 px-2.5 py-1 text-xs font-semibold text-white dark:bg-stone-100 dark:text-stone-900">
                        {count}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                      {categoryMeta[category]?.summary ?? "Browse questions in this group."}
                    </p>
                  </button>
                )
              })}
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="min-w-0">
                {/* Search and Filters */}
                <div className="mb-8">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search by keyword or hashtag (e.g., faith, repentance)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  {suggestedTags.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Suggested tags:</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedTags.map((tag) => (
                          <Button
                            key={tag}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => handleSuggestionClick(tag)}
                          >
                            #{tag}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedTags.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-500">Active filters:</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilters}
                          className="text-xs text-orange-600 hover:text-orange-800"
                        >
                          Clear all
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedTags.map((tag) => (
                          <Button
                            key={tag}
                            variant="default"
                            size="sm"
                            className="text-xs bg-orange-600 hover:bg-orange-700"
                            onClick={() => handleTagClick(tag)}
                          >
                            #{tag} ✕
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="rounded-2xl border border-orange-200/70 bg-white/80 px-5 py-4 shadow-sm dark:border-orange-900/30 dark:bg-stone-900/70">
                    <p className="text-sm font-semibold text-stone-900 dark:text-white">
                      {filteredQA.length} result{filteredQA.length === 1 ? "" : "s"} in {activeCategory}
                    </p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Use the category cards for grouped browsing, then refine with tags or search.
                    </p>
                  </div>
                </div>

                {/* Q&A Results */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
                  <TabsList className="w-full max-w-md mx-auto grid grid-cols-4 mb-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                    <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                  </TabsList>
                  <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    Showing {filteredQA.length} result{filteredQA.length === 1 ? "" : "s"}
                    {searchTerm.trim() ? ` for "${searchTerm.trim()}"` : ""}
                    {selectedTags.length > 0 ? ` with ${selectedTags.length} tag filter${selectedTags.length === 1 ? "" : "s"}` : ""}
                  </p>

                  <TabsContent value="all">{renderResults()}</TabsContent>
                  <TabsContent value="popular">{renderResults()}</TabsContent>
                  <TabsContent value="recent">{renderResults()}</TabsContent>
                  <TabsContent value="unanswered">{renderResults()}</TabsContent>
                </Tabs>
              </div>

              <div>
                {/* Ask a Question */}
                <div className="sticky top-20 md:max-h-[calc(100vh-6rem)] md:overflow-y-auto md:pr-2">
                  <Card className="border-none shadow-lg overflow-hidden mb-8">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-amber-600" />
                        Categories
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
                        <button
                          type="button"
                          onClick={() => setActiveCategory("All")}
                          className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                            activeCategory === "All"
                              ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                        >
                          All questions
                        </button>
                        {qaCategories.map(({ category, count }) => (
                          <button
                            key={`sidebar-${category}`}
                            type="button"
                            onClick={() => setActiveCategory(category)}
                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                              activeCategory === category
                                ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                                : "hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                          >
                            <span>{category}</span>
                            <span className="text-xs opacity-70">{count}</span>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-lg overflow-hidden mb-8">
                    <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500" />
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-orange-600" />
                        Ask a Question
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-gray-600 text-sm">
                          Can't find what you're looking for? Submit your question and our team will respond.
                        </p>
                        <div className="space-y-2">
                          <textarea
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            rows={4}
                            placeholder="Type your question here..."
                            value={questionInput}
                            onChange={(e) => setQuestionInput(e.target.value)}
                          ></textarea>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600">
                          <Send className="h-4 w-4 mr-2" />
                          Submit Question
                        </Button>
                        <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                          Personal questions are not meant for public display. Sensitive details should be shared
                          minimally online and handled discreetly.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Popular Tags */}
                  <Card className="border-none shadow-lg overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-amber-600" />
                        Popular Tags
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {allTags.map((tag) => (
                          <span
                            key={tag}
                            className={`bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-orange-100 hover:text-orange-800 transition-colors ${selectedTags.includes(tag) ? "bg-orange-100 text-orange-800" : ""}`}
                            onClick={() => handleTagClick(tag)}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog
        open={Boolean(activeAnswer)}
        onOpenChange={(open) => {
          if (!open) {
            setActiveAnswer(null)
            setResolvedQuestion("")
            setResolvedAnswer("")
          }
        }}
      >
        <DialogContent className="sm:max-w-3xl border-amber-200/70 bg-gradient-to-b from-white to-orange-50/50 dark:from-stone-900 dark:to-orange-950/30">
          {activeAnswer && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl leading-snug">{activeAnswer.question}</DialogTitle>
                <DialogDescription>Orthodox Q&A answer</DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-2 mb-3">
                {activeAnswer.tags.map((tag) => (
                  <span
                    key={`active-${tag}`}
                    className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full dark:bg-orange-900/30 dark:text-orange-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="max-h-[55vh] overflow-y-auto rounded-lg border border-amber-200/60 bg-white/80 dark:bg-stone-900/60 p-4">
                {isAnswerLoading ? (
                  <p className="text-gray-500 dark:text-gray-400">Loading full answer...</p>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Question</p>
                      <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap leading-7">{resolvedQuestion || activeAnswer.question}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Answer</p>
                      <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap leading-7">
                        {resolvedAnswer || activeAnswer.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <ScrollToTop />
    </div>
  )
}
