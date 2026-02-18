"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedGradientText } from "@/components/animated-gradient-text"
import { GeezHeading } from "@/components/geez-heading"
import { OrthodoxChallenges } from "@/components/orthodox-challenges"
import { OrthodoxBadges } from "@/components/orthodox-badges"
import {
  Users,
  Calendar,
  Video,
  MessageSquare,
  Trophy,
  Music,
  Play,
  Flame,
  HandHelping,
  BookOpen,
  HeartHandshake,
  ShieldCheck,
  ExternalLink,
} from "lucide-react"

const weeklyChallengeSeed = [
  { id: "scripture", label: "Read John 15 and write one takeaway", points: 20 },
  { id: "prayer", label: "Pray morning + evening for 7 days", points: 25 },
  { id: "service", label: "Serve one person quietly this week", points: 15 },
]

const studyTracks = [
  { title: "Foundations", level: "Beginner", progress: 35, focus: "Creed, prayer rule, liturgy basics" },
  { title: "Spiritual Discipline", level: "Intermediate", progress: 58, focus: "Fasting rhythm, confession prep, Psalms" },
  { title: "Theology & Tradition", level: "Advanced", progress: 22, focus: "Christology, Church Fathers, canon life" },
]

const youthEvents = [
  { id: "e1", title: "Catechumen Class (Open to All)", when: "Every Friday, 6:00 PM - 8:00 PM", where: "Taught by MT Dn. Kidus Adugna" },
  {
    id: "e2",
    title: "Learning About Service (Deacons Encouraged)",
    when: "Every Wednesday, 3:00 PM - 4:00 PM",
    where: "Taught by MT Dn. Kidus Adugna",
  },
]

const volunteerRoles = [
  { city: "Portland, OR", role: "Youth Media Team", time: "2 hrs/week" },
  { city: "Seattle, WA", role: "Welcome & Hospitality", time: "Sundays" },
  { city: "Dallas, TX", role: "Choir Support", time: "Wed + Sun" },
]

const discussionRooms = [
  { name: "Faith & School", members: 82, status: "Moderated" },
  { name: "Prayer Accountability", members: 64, status: "Mentor-led" },
  { name: "Orthodox Q&A", members: 115, status: "Moderated" },
]

const tiktokLessons = [
  {
    title: "Why Do We Fast?",
    subtitle: "@orthodoxqnas",
    href: "https://www.tiktok.com/@orthodoxqnas",
  },
  {
    title: "The Meaning of the Cross",
    subtitle: "@orthodoxqnas",
    href: "https://www.tiktok.com/@orthodoxqnas",
  },
  {
    title: "Saints in 60 Seconds",
    subtitle: "@orthodoxqnas",
    href: "https://www.tiktok.com/@orthodoxqnas",
  },
]

export default function YouthCornerPage() {
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([])
  const [mentorQuestion, setMentorQuestion] = useState("")
  const [mentorSent, setMentorSent] = useState(false)
  const [rsvpEvents, setRsvpEvents] = useState<string[]>([])
  const [prayerInput, setPrayerInput] = useState("")
  const [prayerRequests, setPrayerRequests] = useState<string[]>([
    "Please pray for my exams and focus.",
    "Prayers for my family's peace.",
  ])

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

  const toggleChallenge = (id: string) => {
    setCompletedChallenges((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const submitMentorQuestion = () => {
    const message = mentorQuestion.trim() || "Hi, I need private mentoring guidance on faith and life."
    const telegramUrl = `https://t.me/YohannesNeseha?text=${encodeURIComponent(message)}`
    window.open(telegramUrl, "_blank", "noopener,noreferrer")
    setMentorSent(true)
    setMentorQuestion("")
  }

  const toggleRsvp = (id: string) => {
    setRsvpEvents((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const submitPrayerRequest = () => {
    if (!prayerInput.trim()) return
    setPrayerRequests((prev) => [prayerInput.trim(), ...prev].slice(0, 5))
    setPrayerInput("")
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
            <GeezHeading className="mb-4 text-orange-700 dark:text-amber-400">ወጣቶች</GeezHeading>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Youth <AnimatedGradientText text="Corner" />
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A space for young Orthodox believers to connect, learn, and grow in their faith
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="challenges" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-5 w-full max-w-3xl">
                  <TabsTrigger value="challenges">Challenges</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
                  <TabsTrigger value="community">Community</TabsTrigger>
                  <TabsTrigger value="hub">Youth Hub</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="challenges">
                <motion.div
                  className="grid md:grid-cols-2 gap-8"
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeInUp}>
                    <Card className="border-none shadow-lg overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500" />
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                          Faith Challenges
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <OrthodoxChallenges />
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Card className="border-none shadow-lg overflow-hidden mb-8">
                      <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500" />
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                          Your Achievements
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <OrthodoxBadges />
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg overflow-hidden">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          Leaderboard
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-hidden bg-gradient-to-r from-amber-50 to-red-50 dark:from-amber-950/30 dark:to-red-950/30 rounded-lg">
                          <div className="grid grid-cols-3 bg-gradient-to-r from-amber-100 to-red-100 dark:from-amber-900/30 dark:to-red-900/30 p-3 font-medium text-gray-900 dark:text-white">
                            <div>Name</div>
                            <div className="text-center">Points</div>
                            <div className="text-center">Badge</div>
                          </div>
                          {[
                            { name: "Selam T.", points: 950, badge: "Gold" },
                            { name: "Dawit M.", points: 820, badge: "Gold" },
                            { name: "Hanna G.", points: 780, badge: "Silver" },
                            { name: "Yonas B.", points: 650, badge: "Silver" },
                            { name: "Meron A.", points: 520, badge: "Bronze" }
                          ].map((player, index) => (
                            <div
                              key={index}
                              className={`grid grid-cols-3 p-3 ${index % 2 === 0 ? "bg-white/50 dark:bg-stone-800/20" : ""} text-gray-700 dark:text-gray-300`}
                            >
                              <div className="flex items-center gap-2">
                                {index < 3 && (
                                  <span className="text-lg">{index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}</span>
                                )}
                                {player.name}
                              </div>
                              <div className="text-center">{player.points}</div>
                              <div className="text-center">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    player.badge === "Gold"
                                      ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                      : player.badge === "Silver"
                                        ? "bg-gray-100 text-gray-800 dark:bg-stone-800 dark:text-gray-300"
                                        : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                                  }`}
                                >
                                  {player.badge}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="events">
                <motion.div
                  className="space-y-8"
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeInUp}>
                    <Card className="border-none shadow-lg overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500" />
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          Recurring Church Classes
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <Card className="border border-gray-100 dark:border-gray-800">
                            <CardContent className="p-6">
                              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                                Catechumen Class (Open to All)
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Every Friday, 6:00 PM - 8:00 PM</p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">Taught by MT Dn. Kidus Adugna</p>
                            </CardContent>
                          </Card>

                          <Card className="border border-gray-100 dark:border-gray-800">
                            <CardContent className="p-6">
                              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                                Learning About Service (Deacons Encouraged)
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Every Wednesday, 3:00 PM - 4:00 PM</p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">Taught by MT Dn. Kidus Adugna</p>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="media">
                <motion.div
                  className="space-y-8"
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeInUp}>
                    <Card className="border-none shadow-lg overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500" />
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Video className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          TikTok-Style Bible Lessons
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-6">
                          {tiktokLessons.map((lesson) => (
                            <a
                              key={lesson.title}
                              href={lesson.href}
                              target="_blank"
                              rel="noreferrer"
                              className="group bg-white dark:bg-stone-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition"
                            >
                              <div className="relative aspect-[9/16] bg-gradient-to-br from-stone-900 via-stone-800 to-black">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_45%)]" />
                                <div className="absolute top-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white">
                                  TikTok • {lesson.subtitle}
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-105 transition-transform">
                                    <Play className="h-6 w-6 text-orange-600" />
                                  </div>
                                </div>
                              </div>
                              <div className="p-3">
                                <h3 className="font-medium text-gray-900 dark:text-white mb-1">{lesson.title}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 inline-flex items-center gap-1">
                                  Open on TikTok
                                  <ExternalLink className="h-3 w-3" />
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>
                        
                        <div className="text-center mt-6">
                          <Button
                            asChild
                            className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600"
                          >
                            <a href="https://www.tiktok.com/@orthodoxqnas" target="_blank" rel="noreferrer">View All Videos</a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Card className="border-none shadow-lg overflow-hidden">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Music className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          Orthodox Playlists
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-6">
                          <Card className="border border-gray-100 dark:border-gray-800">
                            <CardContent className="p-4">
                              <div className="relative h-40 rounded-lg overflow-hidden mb-3 bg-gradient-to-br from-orange-500 to-amber-500">
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                  <Music className="h-12 w-12 mb-2" />
                                  <h3 className="font-bold text-lg">Modern Mezmur</h3>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                Contemporary Ethiopian Orthodox hymns with modern arrangements.
                              </p>
                              <Button
                                variant="outline"
                                className="w-full text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-900/20"
                              >
                                Listen Now
                              </Button>
                            </CardContent>
                          </Card>
                          
                          <Card className="border border-gray-100 dark:border-gray-800">
                            <CardContent className="p-4">
                              <div className="relative h-40 rounded-lg overflow-hidden mb-3 bg-gradient-to-br from-blue-500 to-purple-500">
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                  <Music className="h-12 w-12 mb-2" />
                                  <h3 className="font-bold text-lg">Traditional Chants</h3>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                Ancient liturgical chants from the Ethiopian Orthodox tradition.
                              </p>
                              <Button
                                variant="outline"
                                className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-500 dark:hover:bg-blue-900/20"
                              >
                                Listen Now
                              </Button>
                            </CardContent>
                          </Card>
                          
                          <Card className="border border-gray-100 dark:border-gray-800">
                            <CardContent className="p-4">
                              <div className="relative h-40 rounded-lg overflow-hidden mb-3 bg-gradient-to-br from-green-500 to-teal-500">
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                  <Music className="h-12 w-12 mb-2" />
                                  <h3 className="font-bold text-lg">Prayer Soundscapes</h3>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                Ambient music designed for prayer, meditation, and spiritual focus.
                              </p>
                              <Button
                                variant="outline"
                                className="w-full text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-500 dark:hover:bg-green-900/20"
                              >
                                Listen Now
                              </Button>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="community">
                <motion.div
                  className="grid md:grid-cols-2 gap-8"
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeInUp}>
                    <Card className="border-none shadow-lg overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500" />
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MessageSquare className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          Discussion Forum
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="bg-white dark:bg-stone-800 p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-gray-900 dark:text-white">How do you maintain your faith in college?</h3>
                              <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-2 py-1 rounded-full">
                                Hot Topic
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              Starting college next month and worried about keeping up with church attendance and prayer...
                            </p>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                              <span>Posted by Dawit M.</span>
                              <span className="mx-2">•</span>
                              <span>42 replies</span>
                            </div>
                          </div>
                          
                          <div className="bg-white dark:bg-stone-800 p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-gray-900 dark:text-white">Explaining fasting to non-Orthodox friends</h3>
                              <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded-full">
                                New
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              My friends always ask why I'm fasting and I struggle to explain it in a way they understand...
                            </p>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                              <span>Posted by Hanna G.</span>
                              <span className="mx-2">•</span>
                              <span>18 replies</span>
                            </div>
                          </div>
                          
                          <div className="bg-white dark:bg-stone-800 p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-gray-900 dark:text-white">Book recommendations for beginners</h3>
                              <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 px-2 py-1 rounded-full">
                                Popular
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              Looking for books to learn more about Orthodox theology and history. Any suggestions?
                            </p>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                              <span>Posted by Yonas B.</span>
                              <span className="mx-2">•</span>
                              <span>35 replies</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center mt-6">
                          <Button
                            asChild
                            className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600"
                          >
                            <Link href="/community/forum">Join the Discussion</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="space-y-8">
                    <Card className="border-none shadow-lg overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500" />
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          Upcoming Events
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="bg-white dark:bg-stone-800 p-4 rounded-lg shadow-sm">
                            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Catechumen Class (Open to All)</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Every Friday, 6:00 PM - 8:00 PM</p>
                            <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">Taught by MT Dn. Kidus Adugna</p>
                          </div>
                          <div className="bg-white dark:bg-stone-800 p-4 rounded-lg shadow-sm">
                            <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                              Learning About Service (Deacons Encouraged)
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Every Wednesday, 3:00 PM - 4:00 PM</p>
                            <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">Taught by MT Dn. Kidus Adugna</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="hub">
                <motion.div className="space-y-8" initial="hidden" animate="visible" variants={staggerContainer}>
                  <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-6">
                    <Card className="border-none shadow-lg overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500" />
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Flame className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          Weekly Challenge
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {weeklyChallengeSeed.map((challenge) => {
                          const done = completedChallenges.includes(challenge.id)
                          return (
                            <button
                              key={challenge.id}
                              type="button"
                              onClick={() => toggleChallenge(challenge.id)}
                              className={`w-full text-left rounded-lg border p-3 transition ${
                                done
                                  ? "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950/30"
                                  : "border-gray-200 dark:border-gray-800"
                              }`}
                            >
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{challenge.label}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+{challenge.points} points</p>
                            </button>
                          )
                        })}
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg overflow-hidden">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <HeartHandshake className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          Ask a Mentor
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Textarea
                          placeholder="Ask privately about faith, school, family, or spiritual struggles..."
                          value={mentorQuestion}
                          onChange={(e) => setMentorQuestion(e.target.value)}
                        />
                        <Button onClick={submitMentorQuestion}>Send Private Question</Button>
                        {mentorSent && (
                          <p className="text-sm text-green-700 dark:text-green-400">
                            Question sent. A youth mentor will respond soon.
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-6">
                    <Card className="border-none shadow-lg overflow-hidden">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          Youth Events Calendar
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {youthEvents.map((event) => (
                          <div key={event.id} className="rounded-lg border border-gray-200 dark:border-gray-800 p-3">
                            <p className="font-medium text-gray-900 dark:text-white">{event.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{event.when}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{event.where}</p>
                            <Button
                              size="sm"
                              variant={rsvpEvents.includes(event.id) ? "secondary" : "outline"}
                              className="mt-2"
                              onClick={() => toggleRsvp(event.id)}
                            >
                              {rsvpEvents.includes(event.id) ? "RSVP'd" : "RSVP"}
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg overflow-hidden">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          Study Tracks
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {studyTracks.map((track) => (
                          <div key={track.title} className="rounded-lg border border-gray-200 dark:border-gray-800 p-3">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-gray-900 dark:text-white">{track.title}</p>
                              <span className="text-xs text-orange-700 dark:text-orange-400">{track.level}</span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{track.focus}</p>
                            <Progress value={track.progress} className="mt-3" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-6">
                    <Card className="border-none shadow-lg overflow-hidden">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MessageSquare className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          Prayer Circle
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Input
                          placeholder="Share a prayer intention (optional anonymous)"
                          value={prayerInput}
                          onChange={(e) => setPrayerInput(e.target.value)}
                        />
                        <Button variant="outline" onClick={submitPrayerRequest}>
                          Submit Intention
                        </Button>
                        <div className="space-y-2">
                          {prayerRequests.map((request, index) => (
                            <div key={`${request}-${index}`} className="text-sm rounded-md bg-amber-50 dark:bg-amber-950/30 p-2">
                              {request}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg overflow-hidden">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Video className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          Media Hub
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p className="text-gray-700 dark:text-gray-300">Short reels: Saints in 60 seconds</p>
                        <p className="text-gray-700 dark:text-gray-300">Podcast: Orthodox life in college</p>
                        <p className="text-gray-700 dark:text-gray-300">Audio: Morning and evening prayer tracks</p>
                        <Button asChild className="mt-2">
                          <Link href="/media">Open Full Media Library</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-6">
                    <Card className="border-none shadow-lg overflow-hidden">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <HandHelping className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          Volunteer Board
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {volunteerRoles.map((item) => (
                          <div key={`${item.city}-${item.role}`} className="rounded-lg border border-gray-200 dark:border-gray-800 p-3">
                            <p className="font-medium text-gray-900 dark:text-white">{item.role}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{item.city}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{item.time}</p>
                            <Button size="sm" variant="outline">
                              Sign Up
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg overflow-hidden">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <ShieldCheck className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          Discussion Rooms
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {discussionRooms.map((room) => (
                          <div key={room.name} className="rounded-lg border border-gray-200 dark:border-gray-800 p-3">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-gray-900 dark:text-white">{room.name}</p>
                              <span className="text-xs bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-full text-orange-700 dark:text-orange-400">
                                {room.status}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{room.members} members</p>
                            <Button size="sm" variant="outline" className="mt-2">
                              Join Room
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-6">
                    <Card className="border-none shadow-lg overflow-hidden">
                      <CardHeader>
                        <CardTitle>New Here? Start Here</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <p>1. Learn the basics of Oriental Orthodox faith and worship.</p>
                        <p>2. Follow a beginner prayer rule for 14 days.</p>
                        <p>3. Attend Sunday liturgy and one youth group meeting.</p>
                        <p>4. Connect with a mentor and ask your first questions.</p>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg overflow-hidden">
                      <CardHeader>
                        <CardTitle>Parent & Leader Toolkit</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p className="text-gray-700 dark:text-gray-300">Guides to support youth spiritual growth at home and church.</p>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm">
                            Family Prayer Guide
                          </Button>
                          <Button variant="outline" size="sm">
                            Mentor Playbook
                          </Button>
                          <Button variant="outline" size="sm">
                            Safe Ministry Checklist
                          </Button>
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
    </div>
  )
}
