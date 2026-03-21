"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Sparkles, BookOpen, Calendar, Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { GeezHeading } from "@/components/ui/geez-heading"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  category?: "prayer" | "scripture" | "fasting" | "general"
}

type SuggestionCategory = {
  name: string
  icon: React.ReactNode
  suggestions: string[]
}

export function SpiritualChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "I'm your EOTC spiritual assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
      category: "general",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestionCategories: SuggestionCategory[] = [
    {
      name: "prayer",
      icon: <Heart className="h-4 w-4" />,
      suggestions: [
        "How do I prepare for prayer?",
        "What are the daily prayer times?",
        "Can you recommend a prayer for repentance?",
      ],
    },
    {
      name: "scripture",
      icon: <BookOpen className="h-4 w-4" />,
      suggestions: [
        "What does the EOTC teach about John 14:6?",
        "Explain the Book of Enoch's importance",
        "Daily scripture reading recommendation",
      ],
    },
    {
      name: "fasting",
      icon: <Calendar className="h-4 w-4" />,
      suggestions: [
        "When is the next fasting period?",
        "How do I prepare for Wednesday/Friday fast?",
        "What foods are allowed during fasting?",
      ],
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // In a real implementation, this would call your AI service
      // For example, using Vercel's AI SDK:
      /*
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `You are an Ethiopian Orthodox Tewahedo Church spiritual assistant.
                Answer the following question in a way that's engaging for Gen Z
                while being doctrinally accurate to EOTC teachings: ${input}`,
        temperature: 0.7,
      })
      */

      // Simulate AI response for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Determine message category based on content
      let category: Message["category"] = "general"
      if (input.toLowerCase().includes("prayer") || input.toLowerCase().includes("pray")) {
        category = "prayer"
      } else if (input.toLowerCase().includes("bible") || input.toLowerCase().includes("scripture")) {
        category = "scripture"
      } else if (input.toLowerCase().includes("fast") || input.toLowerCase().includes("fasting")) {
        category = "fasting"
      }

      // Generate response based on category
      let responseText = ""
      switch (category) {
        case "prayer":
          responseText =
            "In the Ethiopian Orthodox tradition, prayer is a sacred dialogue with God. The Church teaches that prayer should be offered with a pure heart and focused mind. The Jesus Prayer ('Lord Jesus Christ, Son of God, have mercy on me, a sinner') is particularly powerful for spiritual growth. Would you like me to share more specific prayer practices?"
          break
        case "scripture":
          responseText =
            "The Ethiopian Orthodox Tewahedo Church has a rich tradition of biblical interpretation. Our canon includes 81 books, more than most other Christian denominations. This includes books like Enoch and Jubilees that provide deep spiritual insights. Would you like me to recommend a scripture passage for your spiritual reflection today?"
          break
        case "fasting":
          responseText =
            "Fasting is a central spiritual discipline in the Ethiopian Orthodox tradition. We observe Wednesday and Friday as regular fasting days, plus several major fasting periods throughout the year. Fasting involves abstaining from animal products and eating after 3:00 PM. Would you like to know more about the spiritual benefits of fasting?"
          break
        default:
          responseText =
            "The Ethiopian Orthodox Tewahedo Church has preserved authentic apostolic Christianity for nearly 2,000 years. Our faith emphasizes the unity of Christ's divine and human natures, regular prayer, fasting, and participation in the sacraments. How can I help you learn more about our beautiful tradition?"
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        sender: "bot",
        timestamp: new Date(),
        category,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error generating response:", error)

      // Fallback error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting to the wisdom database. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <GeezHeading className="text-amber-800 dark:text-amber-500 mb-2">መንፈሳዊ ረዳት</GeezHeading>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AI Spiritual Guide</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Ask questions about EOTC teachings, prayer, fasting, and spiritual growth
        </p>
      </div>

      <Card className="border-none shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-amber-600 to-red-600 text-white py-4">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Ethiopian Orthodox Spiritual Assistant
            <Badge className="ml-2 bg-white/20 text-white">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="h-[500px] overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === "user" ? "bg-amber-600 text-white" : "bg-white dark:bg-gray-800 shadow-sm"
                    }`}
                  >
                    {message.sender === "bot" && message.category && (
                      <div className="mb-1">
                        <Badge
                          className={`
                            ${message.category === "prayer" ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400" : ""}
                            ${message.category === "scripture" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" : ""}
                            ${message.category === "fasting" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : ""}
                            ${message.category === "general" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" : ""}
                          `}
                        >
                          {message.category === "prayer" && <Heart className="h-3 w-3 mr-1" />}
                          {message.category === "scripture" && <BookOpen className="h-3 w-3 mr-1" />}
                          {message.category === "fasting" && <Calendar className="h-3 w-3 mr-1" />}
                          {message.category === "general" && <Sparkles className="h-3 w-3 mr-1" />}
                          {message.category.charAt(0).toUpperCase() + message.category.slice(1)}
                        </Badge>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start mb-4"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-sm max-w-[80%]">
                    <div className="flex space-x-2">
                      <div
                        className="w-2 h-2 rounded-full bg-amber-600 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-amber-600 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-amber-600 animate-bounce"
                        style={{ animationDelay: "600ms" }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </AnimatePresence>
          </div>
        </CardContent>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <Tabs defaultValue="chat">
            <TabsList className="mb-4">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            </TabsList>

            <TabsContent value="chat">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Ask about EOTC teachings, prayers, fasting..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="suggestions">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {suggestionCategories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <h3 className="font-medium flex items-center gap-1 text-gray-900 dark:text-white">
                      {category.icon}
                      <span>{category.name.charAt(0).toUpperCase() + category.name.slice(1)} Questions</span>
                    </h3>
                    <div className="space-y-2">
                      {category.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start text-left h-auto py-2 border-amber-200 dark:border-amber-800"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            This AI assistant is trained on EOTC teachings and provides guidance based on Ethiopian Orthodox doctrine.
            For complex spiritual matters, please consult with a priest.
          </p>
        </div>
      </Card>
    </div>
  )
}
