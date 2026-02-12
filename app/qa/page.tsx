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
import { Search, MessageSquare, Send, Sparkles } from "lucide-react"
import telegramPosts from "@/content/telegram/index.json"

type QAItem = {
  id: number
  question: string
  answer: string
  tags: string[]
  likes?: number
  category?: string
  contentPath?: string
  isImported?: boolean
}

type TelegramPost = {
  id: number
  type: "lesson" | "Q&A"
  title: string
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
  const extractQuestionTitle = (post: TelegramPost) => {
    const normalize = (value: string) => value.replace(/\s+/g, " ").replace(/[#*_`]/g, "").trim()
    const firstQuestionLine = (value: string) => {
      const oneLine = normalize(value).split("\n")[0].trim()
      if (!oneLine) return ""
      const qIndex = oneLine.indexOf("?")
      if (qIndex >= 0) return oneLine.slice(0, qIndex + 1).trim()
      return oneLine
    }

    const fromTitle = normalize(post.title)
    const fromExcerpt = normalize(post.excerpt)

    const pickFrom = (source: string) => {
      const questionMatch = source.match(/question\s*[:፦]\s*([\s\S]+)/i)
      if (questionMatch?.[1]) {
        const beforeAnswer = questionMatch[1].split(/answer\s*[:፦]/i)[0]
        return firstQuestionLine(beforeAnswer)
      }
      return ""
    }

    let question = pickFrom(fromTitle) || pickFrom(fromExcerpt)

    if (!question) {
      // Fallback: use first line from title only to avoid title+excerpt repetition.
      question = firstQuestionLine(fromTitle.replace(/^about\s+/i, ""))
    }

    if (!question) return "Orthodox Q&A"
    return question.endsWith("?") ? question : `${question}?`
  }

  const isQuestionLike = (post: TelegramPost) => /question\s*[:፦]|answer\s*[:፦]/i.test(`${post.title} ${post.excerpt}`)
  const importedQA = useMemo(
    () =>
      [...(telegramPosts as TelegramPost[])]
        .filter((post) => post.type === "Q&A" || isQuestionLike(post))
        .map((post) => ({
          id: 100000 + post.id,
          question: extractQuestionTitle(post),
          answer: post.excerpt,
          tags: post.tags,
          likes: 0,
          category: "Imported Q&A",
          contentPath: post.contentPath,
          isImported: true,
        })),
    [],
  )
  const allQA = useMemo(() => [...importedQA, ...qaData], [importedQA])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [questionInput, setQuestionInput] = useState("")
  const [activeAnswer, setActiveAnswer] = useState<QAItem | null>(null)
  const [resolvedAnswer, setResolvedAnswer] = useState("")
  const [isAnswerLoading, setIsAnswerLoading] = useState(false)

  // Extract all unique tags
  const allTags = useMemo(() => Array.from(new Set(allQA.flatMap((item) => item.tags))), [allQA])
  const filteredQA = useMemo(
    () =>
      allQA.filter((item) => {
        const matchesSearch =
          searchTerm === "" ||
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => item.tags.includes(tag))

        return matchesSearch && matchesTags
      }),
    [allQA, searchTerm, selectedTags],
  )
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
      setSearchTerm("")
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedTags([])
  }

  const extractAnswerFromImportedText = (raw: string) => {
    const body = raw.replace(/^---[\s\S]*?\n---\n?/m, "").trim()
    const answerMatch = body.match(/answer\s*[:፦]\s*([\s\S]*)/i)
    if (answerMatch?.[1]) return answerMatch[1].trim()
    return body
  }

  const openAnswer = async (item: QAItem) => {
    setActiveAnswer(item)
    if (!item.isImported || !item.contentPath) {
      setResolvedAnswer(item.answer)
      return
    }

    try {
      setIsAnswerLoading(true)
      const response = await fetch(item.contentPath)
      if (!response.ok) throw new Error("Failed to load answer")
      const markdown = await response.text()
      setResolvedAnswer(extractAnswerFromImportedText(markdown))
    } catch {
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
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
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
                </div>

                {/* Q&A Results */}
                <Tabs defaultValue="all" className="w-full mb-8">
                  <TabsList className="w-full max-w-md mx-auto grid grid-cols-4 mb-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                    <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
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
                          <p className="text-gray-500 mb-4">
                            Try adjusting your search or filters to find what you're looking for.
                          </p>
                          <Button onClick={clearFilters} className="bg-orange-600 hover:bg-orange-700">
                            Clear Filters
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="popular">
                    <div className="text-center py-12">
                      <p>Popular questions will appear here.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="recent">
                    <div className="text-center py-12">
                      <p>Recent questions will appear here.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="unanswered">
                    <div className="text-center py-12">
                      <p>Unanswered questions will appear here.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div>
                {/* Ask a Question */}
                <div className="sticky top-20">
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
                  <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap leading-7">
                    {resolvedAnswer || activeAnswer.answer}
                  </p>
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
