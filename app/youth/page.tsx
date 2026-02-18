"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedGradientText } from "@/components/animated-gradient-text"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Trophy, Award, BookOpen, Users, Calendar } from "lucide-react"

type QuizQuestion = {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Who was the first Ethiopian to be baptized in the Bible?",
    options: ["Simon of Cyrene", "The Ethiopian Eunuch", "Queen of Sheba", "Frumentius"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "What is the name of the Ethiopian Orthodox Bible?",
    options: ["Septuagint", "Vulgate", "Peshitta", "Tewahedo Bible"],
    correctAnswer: 3,
  },
  {
    id: 3,
    question: "How many books are in the Ethiopian Orthodox Bible?",
    options: ["66 books", "73 books", "81 books", "85 books"],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "Which saint is known as 'The Apostle of Ethiopia'?",
    options: ["St. Mark", "St. Frumentius", "St. Paul", "St. Thomas"],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "What does 'Tewahedo' mean?",
    options: ["Holy Trinity", "Being made one", "Orthodox faith", "Divine liturgy"],
    correctAnswer: 1,
  },
]

// Leaderboard data
const leaderboardData = [
  { name: "Selam T.", score: 95, badge: "Gold" },
  { name: "Dawit M.", score: 90, badge: "Gold" },
  { name: "Hanna G.", score: 85, badge: "Silver" },
  { name: "Yonas B.", score: 80, badge: "Silver" },
  { name: "Meron A.", score: 75, badge: "Bronze" },
]

type YouthEvent = {
  id: string
  title: string
  schedule: string
  time: string
  category: "Weekly" | "Monthly" | "Workshop"
  description: string
  actionLabel: string
  actionHref: string
}

const youthEvents: YouthEvent[] = [
  {
    id: "sunday-school",
    title: "Sunday School",
    schedule: "Every Sunday",
    time: "5-7 PM EST",
    category: "Weekly",
    description: "Weekly session to learn Ethiopian Orthodox faith in an engaging format.",
    actionLabel: "Join Now",
    actionHref: "https://meet.google.com/qeu-moqk-jux",
  },
  {
    id: "youth-gathering",
    title: "Youth Gathering",
    schedule: "First Saturday",
    time: "12-2 PM EST",
    category: "Monthly",
    description: "Monthly fellowship, discussion, and spiritual formation.",
    actionLabel: "Register Here",
    actionHref: "#",
  },
  {
    id: "mahlet-workshop",
    title: "Mahlet Workshop",
    schedule: "Third Saturday",
    time: "3-5 PM EST",
    category: "Workshop",
    description: "Learn youth hymn service and liturgical rhythm with deacon mentors.",
    actionLabel: "Reserve Spot",
    actionHref: "#",
  },
]

export default function YouthPage() {
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [username, setUsername] = useState("")
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [eventFilter, setEventFilter] = useState<"All" | "Weekly" | "Monthly" | "Workshop">("All")
  const [eventSearch, setEventSearch] = useState("")
  const [savedEvents, setSavedEvents] = useState<string[]>([])
  const [selectedSaint, setSelectedSaint] = useState<"mary" | "george" | "tekle">("mary")

  const handleStartQuiz = () => {
    setShowQuiz(true)
    setCurrentQuestion(0)
    setScore(0)
    setQuizCompleted(false)
  }

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
  }

  const handleNextQuestion = () => {
    if (selectedOption === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion)
      setSelectedOption(null)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedOption(null)
    setScore(0)
    setQuizCompleted(false)
  }

  const filteredEvents = youthEvents.filter((event) => {
    const categoryPass = eventFilter === "All" || event.category === eventFilter
    const searchPass =
      eventSearch.trim().length === 0 ||
      `${event.title} ${event.description} ${event.schedule}`.toLowerCase().includes(eventSearch.toLowerCase())
    return categoryPass && searchPass
  })

  const toggleSavedEvent = (eventId: string) => {
    setSavedEvents((prev) => (prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]))
  }

  const openCalendarTemplate = (event: YouthEvent) => {
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}`
    window.open(url, "_blank")
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
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to the <AnimatedGradientText text="Youth Corner" />
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore fun activities, quizzes, and puzzles while learning about the Ethiopian Orthodox Tewahedo Church!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="quiz" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-3 w-full max-w-md">
                  <TabsTrigger value="quiz">Bible Quiz</TabsTrigger>
                  <TabsTrigger value="saints">Saints Stories</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="quiz">
                <motion.div
                  className="grid md:grid-cols-3 gap-8"
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeInUp} className="md:col-span-2">
                    <Card className="border-none shadow-lg overflow-hidden h-full">
                      <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500" />
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Bible Quiz</CardTitle>
                          {!showQuiz && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowLeaderboard(!showLeaderboard)}
                              className="text-xs"
                            >
                              {showLeaderboard ? "Hide Leaderboard" : "View Leaderboard"}
                            </Button>
                          )}
                        </div>
                        <CardDescription>Test your knowledge of the Bible and Church teachings!</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {showLeaderboard && !showQuiz ? (
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium mb-4">🏆 Top Scorers This Week</h3>
                            <div className="overflow-hidden bg-gradient-to-r from-amber-50 to-red-50 rounded-lg">
                              <div className="grid grid-cols-3 bg-gradient-to-r from-amber-100 to-red-100 p-3 font-medium">
                                <div>Name</div>
                                <div className="text-center">Score</div>
                                <div className="text-center">Badge</div>
                              </div>
                              {leaderboardData.map((player, index) => (
                                <div
                                  key={index}
                                  className={`grid grid-cols-3 p-3 ${index % 2 === 0 ? "bg-white/50" : ""}`}
                                >
                                  <div className="flex items-center gap-2">
                                    {index < 3 && (
                                      <span className="text-lg">{index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}</span>
                                    )}
                                    {player.name}
                                  </div>
                                  <div className="text-center">{player.score}</div>
                                  <div className="text-center">
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs ${
                                        player.badge === "Gold"
                                          ? "bg-amber-100 text-amber-800"
                                          : player.badge === "Silver"
                                            ? "bg-gray-100 text-gray-800"
                                            : "bg-orange-100 text-orange-800"
                                      }`}
                                    >
                                      {player.badge}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="text-center mt-6">
                              <Button
                                onClick={handleStartQuiz}
                                className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600"
                              >
                                Take the Quiz & Join the Leaderboard
                              </Button>
                            </div>
                          </div>
                        ) : !showQuiz ? (
                          <div className="text-center space-y-6">
                            <div className="relative h-40 w-40 mx-auto">
                              <Image
                                src="/placeholder.svg?height=160&width=160"
                                alt="Quiz Icon"
                                fill
                                className="object-contain"
                              />
                            </div>
                            <div>
                              <p className="mb-6">
                                Ready to test your knowledge? Start the quiz to see how much you know about the
                                Ethiopian Orthodox Church!
                              </p>
                              <Button
                                onClick={handleStartQuiz}
                                className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600"
                              >
                                Start Quiz
                              </Button>
                            </div>
                          </div>
                        ) : quizCompleted ? (
                          <div className="text-center space-y-6">
                            <div className="mb-6">
                              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 mb-4">
                                <Trophy className="h-10 w-10 text-amber-600" />
                              </div>
                              <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
                              <p className="text-lg mb-1">
                                Your score: {score} out of {quizQuestions.length}
                              </p>
                              <p className="text-gray-600">
                                {score === quizQuestions.length
                                  ? "Perfect score! Amazing job!"
                                  : score >= quizQuestions.length * 0.7
                                    ? "Great job! You know your faith well!"
                                    : "Good effort! Keep learning and try again!"}
                              </p>
                            </div>

                            {score >= quizQuestions.length * 0.7 && (
                              <div className="p-4 bg-gradient-to-r from-amber-50 to-red-50 rounded-lg mb-6">
                                <h4 className="font-medium mb-2">🎉 You've earned 15 Faith Points!</h4>
                                <p className="text-sm text-gray-600">
                                  Faith Points can be redeemed for digital badges and special content.
                                </p>
                              </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                              <Button
                                onClick={handleRestartQuiz}
                                className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600"
                              >
                                Restart Quiz
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setShowQuiz(false)
                                  setShowLeaderboard(true)
                                }}
                              >
                                View Leaderboard
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex justify-between items-center mb-6">
                              <h3 className="text-lg font-medium">
                                Question {currentQuestion + 1} of {quizQuestions.length}
                              </h3>
                              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                                Score: {score}
                              </span>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg mb-6">
                              <p className="text-lg font-medium">{quizQuestions[currentQuestion].question}</p>
                            </div>

                            <RadioGroup value={selectedOption?.toString()} className="space-y-3 mb-6">
                              {quizQuestions[currentQuestion].options.map((option, index) => (
                                <div
                                  key={index}
                                  className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                                    selectedOption === index
                                      ? "border-orange-500 bg-orange-50"
                                      : "border-gray-200 hover:border-orange-200 hover:bg-orange-100/50"
                                  }`}
                                  onClick={() => handleOptionSelect(index)}
                                >
                                  <RadioGroupItem
                                    value={index.toString()}
                                    id={`option-${index}`}
                                    className="data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                                  />
                                  <Label htmlFor={`option-${index}`} className="w-full cursor-pointer">
                                    {option}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>

                            <div className="flex justify-end">
                              <Button
                                onClick={handleNextQuestion}
                                disabled={selectedOption === null}
                                className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600"
                              >
                                {currentQuestion === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Card className="border-none shadow-lg overflow-hidden mb-6">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-amber-600" />
                          Faith Badges
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600 mb-2">
                            Earn badges by completing quizzes and activities. Show off your knowledge and commitment!
                          </p>

                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-2">
                                <BookOpen className="h-6 w-6 text-amber-600" />
                              </div>
                              <p className="text-xs">Bible Scholar</p>
                            </div>

                            <div>
                              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-2">
                                <Users className="h-6 w-6 text-orange-600" />
                              </div>
                              <p className="text-xs">Community Leader</p>
                            </div>

                            <div>
                              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2 opacity-50">
                                <Calendar className="h-6 w-6 text-gray-400" />
                              </div>
                              <p className="text-xs text-gray-400">Event Attendee</p>
                              <p className="text-[10px] text-gray-400">Locked</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg overflow-hidden">
                      <CardHeader>
                        <CardTitle>Quiz Tips</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <svg
                              className="w-4 h-4 text-orange-600 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            <span>Read each question carefully before answering.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <svg
                              className="w-4 h-4 text-orange-600 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            <span>Take your time - there's no time limit.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <svg
                              className="w-4 h-4 text-orange-600 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            <span>Score 70% or higher to earn Faith Points!</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <svg
                              className="w-4 h-4 text-orange-600 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            <span>New quizzes are added every week!</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="saints">
                <motion.div
                  className="grid md:grid-cols-3 gap-8"
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeInUp} className="md:col-span-2">
                    <Card className="border-none shadow-lg overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500" />
                      <CardHeader>
                        <CardTitle>Stories of Saints</CardTitle>
                        <CardDescription>Read inspiring stories about saints and martyrs</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-8">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="relative h-48 rounded-lg overflow-hidden">
                              <Image
                                src="/placeholder.svg?height=200&width=300"
                                alt="Saint Mary"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold mb-2">Saint Mary</h3>
                              <p className="text-gray-600 mb-4">
                                Learn about the life of Saint Mary, the mother of Jesus Christ, and her special place in
                                the Ethiopian Orthodox tradition.
                              </p>
                              <Link href="#">
                                <Button variant="outline" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                                  Read Full Story
                                </Button>
                              </Link>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="relative h-48 rounded-lg overflow-hidden">
                              <Image
                                src="/placeholder.svg?height=200&width=300"
                                alt="Saint George"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold mb-2">Saint George</h3>
                              <p className="text-gray-600 mb-4">
                                Discover the courage and faith of Saint George the martyr, one of the most venerated
                                saints in Ethiopia.
                              </p>
                              <Link href="#">
                                <Button variant="outline" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                                  Read Full Story
                                </Button>
                              </Link>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="relative h-48 rounded-lg overflow-hidden">
                              <Image
                                src="/placeholder.svg?height=200&width=300"
                                alt="Saint Tekle Haymanot"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold mb-2">Saint Tekle Haymanot</h3>
                              <p className="text-gray-600 mb-4">
                                Explore the life of one of Ethiopia's most revered saints, known for his missionary work
                                and miracles.
                              </p>
                              <Link href="#">
                                <Button variant="outline" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                                  Read Full Story
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="mt-8 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                          <p className="text-sm font-medium mb-3">Choose a saint story:</p>
                          <div className="flex flex-wrap gap-2">
                            <Button size="sm" variant={selectedSaint === "mary" ? "default" : "outline"} onClick={() => setSelectedSaint("mary")}>
                              Saint Mary
                            </Button>
                            <Button size="sm" variant={selectedSaint === "george" ? "default" : "outline"} onClick={() => setSelectedSaint("george")}>
                              Saint George
                            </Button>
                            <Button size="sm" variant={selectedSaint === "tekle" ? "default" : "outline"} onClick={() => setSelectedSaint("tekle")}>
                              Saint Tekle Haymanot
                            </Button>
                          </div>
                          <p className="mt-3 text-sm text-gray-600">
                            {selectedSaint === "mary" && "Saint Mary is honored as the Mother of God and model of purity and obedience."}
                            {selectedSaint === "george" && "Saint George is remembered for courage, confession of faith, and martyrdom."}
                            {selectedSaint === "tekle" &&
                              "Saint Tekle Haymanot is one of Ethiopia's great monastic saints, known for prayer and mission."}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Card className="border-none shadow-lg overflow-hidden mb-6">
                      <CardHeader>
                        <CardTitle>Interactive Timeline</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600 mb-2">
                            Explore key events in the lives of Ethiopian saints through this interactive timeline.
                          </p>

                          <div className="relative pt-6 pb-2">
                            <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gradient-to-b from-orange-500 to-amber-500"></div>

                            <div className="relative pl-8 mb-6">
                              <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center border-2 border-orange-500">
                                <span className="text-xs font-bold">330</span>
                              </div>
                              <h4 className="text-sm font-medium">Christianity becomes state religion</h4>
                              <p className="text-xs text-gray-600">King Ezana of Axum converts to Christianity</p>
                            </div>

                            <div className="relative pl-8 mb-6">
                              <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center border-2 border-amber-500">
                                <span className="text-xs font-bold">480</span>
                              </div>
                              <h4 className="text-sm font-medium">Nine Saints arrive in Ethiopia</h4>
                              <p className="text-xs text-gray-600">Monastic tradition established</p>
                            </div>

                            <div className="relative pl-8 mb-6">
                              <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center border-2 border-orange-500">
                                <span className="text-xs font-bold">1215</span>
                              </div>
                              <h4 className="text-sm font-medium">Birth of St. Tekle Haymanot</h4>
                              <p className="text-xs text-gray-600">One of Ethiopia's most venerated saints</p>
                            </div>

                            <div className="relative pl-8">
                              <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center border-2 border-amber-500">
                                <span className="text-xs font-bold">1889</span>
                              </div>
                              <h4 className="text-sm font-medium">Emperor Menelik II</h4>
                              <p className="text-xs text-gray-600">Built many churches across Ethiopia</p>
                            </div>
                          </div>

                          <div className="text-center">
                            <Button variant="outline" size="sm" className="text-xs">
                              View Full Timeline
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg overflow-hidden">
                      <CardHeader>
                        <CardTitle>Saint of the Month</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="relative h-32 w-32 mx-auto rounded-full overflow-hidden mb-4">
                            <Image
                              src="/placeholder.svg?height=128&width=128"
                              alt="Saint of the Month"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="font-bold mb-2">St. Abune Teklehaimanot</h3>
                          <p className="text-sm text-gray-600 mb-4">
                            Known for his dedication to prayer and fasting for 29 years standing on one leg.
                          </p>
                          <p className="text-xs text-gray-500">Feast Day: 24th of Hamle (July 31)</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="events">
                <motion.div className="space-y-8" initial="hidden" animate="visible" variants={staggerContainer}>
                  <motion.div variants={fadeInUp}>
                    <Card className="border-none shadow-lg overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500" />
                      <CardHeader>
                        <CardTitle>Upcoming Youth Events</CardTitle>
                        <CardDescription>Join us for these special events</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="grid md:grid-cols-[1fr_auto] gap-3">
                            <Input
                              value={eventSearch}
                              onChange={(e) => setEventSearch(e.target.value)}
                              placeholder="Search events, schedules, activities..."
                            />
                            <div className="flex flex-wrap gap-2">
                              {(["All", "Weekly", "Monthly", "Workshop"] as const).map((filter) => (
                                <Button
                                  key={filter}
                                  size="sm"
                                  variant={eventFilter === filter ? "default" : "outline"}
                                  onClick={() => setEventFilter(filter)}
                                >
                                  {filter}
                                </Button>
                              ))}
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            {filteredEvents.map((event) => {
                              const isSaved = savedEvents.includes(event.id)
                              return (
                                <Card key={event.id} className="border border-gray-100">
                                  <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                      <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">{event.category}</div>
                                      <div className="text-right">
                                        <p className="text-sm font-medium">{event.schedule}</p>
                                        <p className="text-xs text-gray-500">{event.time}</p>
                                      </div>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                                    <div className="flex flex-wrap gap-2 items-center">
                                      <Link href={event.actionHref} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                                          {event.actionLabel}
                                        </Button>
                                      </Link>
                                      <Button variant="outline" size="sm" onClick={() => openCalendarTemplate(event)}>
                                        Add to Calendar
                                      </Button>
                                      <Button variant={isSaved ? "default" : "ghost"} size="sm" onClick={() => toggleSavedEvent(event.id)}>
                                        {isSaved ? "Saved" : "Save"}
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              )
                            })}
                          </div>

                          <div className="text-center">
                            <Button variant="outline">View All Events ({filteredEvents.length})</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Scroll To Top */}
      <ScrollToTop />
    </div>
  )
}
