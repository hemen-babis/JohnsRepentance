"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedGradientText } from "@/components/animated-gradient-text"
import { GeezHeading } from "@/components/geez-heading"
import { OrthodoxChallenges } from "@/components/orthodox-challenges"
import { OrthodoxBadges } from "@/components/orthodox-badges"
import { Users, Calendar, Video, MessageSquare, Trophy, Music, Play } from "lucide-react"

export default function YouthCornerPage() {
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
                <TabsList className="grid grid-cols-4 w-full max-w-xl">
                  <TabsTrigger value="challenges">Challenges</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
                  <TabsTrigger value="community">Community</TabsTrigger>
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
                          Upcoming Youth Events
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <Card className="border border-gray-100 dark:border-gray-800">
                              <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                  <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-3 py-1 rounded-full text-sm">
                                    This Weekend
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">Saturday</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">5-7 PM EST</p>
                                  </div>
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Youth Bible Study</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                  Join us for an interactive Bible study focused on applying Orthodox teachings to modern life challenges.
                                </p>
                                <div className="flex justify-between items-center">
                                  <Link href="/events/youth-bible-study">
                                    <Button
                                      variant="outline"
                                      className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-900/20"
                                    >
                                      Details
                                    </Button>
                                  </Link>
                                  <div className="text-right">
                                    <Button variant="link" size="sm" className="text-xs">
                                      Add to Calendar
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="border border-gray-100 dark:border-gray-800">
                              <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                  <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 px-3 py-1 rounded-full text-sm">
                                    Next Week
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">Friday</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">6-9 PM EST</p>
                                  </div>
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Youth Fellowship Night</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                  An evening of fellowship, games, Ethiopian food, and spiritual discussions for young Orthodox believers.
                                </p>
                                <div className="flex justify-between items-center">
                                  <Link href="/events/youth-fellowship">
                                    <Button
                                      variant="outline"
                                      className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:text-amber-500 dark:hover:bg-amber-900/20"
                                    >
                                      Details
                                    </Button>
                                  </Link>
                                  <div className="text-right">
                                    <Button variant="link" size="sm" className="text-xs">
                                      Add to Calendar
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <Card className="border border-gray-100 dark:border-gray-800">
                              <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-3 py-1 rounded-full text-sm">
                                    Monthly
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">First Sunday</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">12-2 PM EST</p>
                                  </div>
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Youth Choir Practice</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                  Learn traditional Ethiopian Orthodox hymns and participate in the Divine Liturgy.
                                </p>
                                <div className="flex justify-between items-center">
                                  <Link href="/events/youth-choir">
                                    <Button
                                      variant="outline"
                                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-500 dark:hover:bg-blue-900/20"
                                    >
                                      Details
                                    </Button>
                                  </Link>
                                  <div className="text-right">
                                    <Button variant="link" size="sm" className="text-xs">
                                      Add to Calendar
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="border border-gray-100 dark:border-gray-800">
                              <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                  <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm">
                                    Special Event
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">July 15-20</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">All Day</p>
                                  </div>
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Youth Summer Retreat</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                  A week-long spiritual retreat with workshops, prayer, fellowship, and outdoor activities.
                                </p>
                                <div className="flex justify-between items-center">
                                  <Link href="/events/summer-retreat">
                                    <Button
                                      variant="outline"
                                      className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-500 dark:hover:bg-green-900/20"
                                    >
                                      Register
                                    </Button>
                                  </Link>
                                  <div className="text-right">
                                    <Button variant="link" size="sm" className="text-xs">
                                      Learn More
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          <div className="text-center">
                            <Button
                              asChild
                              className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600"
                            >
                              <Link href="/events">View All Events</Link>
                            </Button>
                          </div>
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
                          <div className="bg-white dark:bg-stone-800 rounded-lg overflow-hidden shadow-sm">
                            <div className="relative aspect-[9/16] bg-gray-100 dark:bg-gray-700">
                              <Image
                                src="/placeholder.svg?height=400&width=225"
                                alt="Why Do We Fast?"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white w-12 h-12"
                                >
                                  <Play className="h-6 w-6 text-orange-600" />
                                </Button>
                              </div>
                            </div>
                            <div className="p-3">
                              <h3 className="font-medium text-gray-900 dark:text-white mb-1">Why Do We Fast?</h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400">2.4M views</p>
                            </div>
                          </div>
                          
                          <div className="bg-white dark:bg-stone-800 rounded-lg overflow-hidden shadow-sm">
                            <div className="relative aspect-[9/16] bg-gray-100 dark:bg-gray-700">
                              <Image
                                src="/placeholder.svg?height=400&width=225"
                                alt="The Meaning of the Cross"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white w-12 h-12"
                                >
                                  <Play className="h-6 w-6 text-orange-600" />
                                </Button>
                              </div>
                            </div>
                            <div className="p-3">
                              <h3 className="font-medium text-gray-900 dark:text-white mb-1">The Meaning of the Cross</h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400">1.8M views</p>
                            </div>
                          </div>
                          
                          <div className="bg-white dark:bg-stone-800 rounded-lg overflow-hidden shadow-sm">
                            <div className="relative aspect-[9/16] bg-gray-100 dark:bg-gray-700">
                              <Image
                                src="/placeholder.svg?height=400&width=225"
                                alt="Saints in 60 Seconds"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white w-12 h-12"
                                >
                                  <Play className="h-6 w-6 text-orange-600" />
                                </Button>
                              </div>
                            </div>
                            <div className="p-3">
                              <h3 className="font-medium text-gray-900 dark:text-white mb-1">Saints in 60 Seconds</h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400">3.1M views</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center mt-6">
                          <Button
                            asChild
                            className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600"
                          >
                            <Link href="/media">View All Videos</Link>
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
                            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Youth Retreat 2024</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Join us for a weekend of spiritual growth and fellowship.</p>
                            <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">March 15-17, 2024</p>
                          </div>
                          <div className="bg-white dark:bg-stone-800 p-4 rounded-lg shadow-sm">
                            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Bible Study Group</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Weekly sessions exploring Scripture together.</p>
                            <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">Every Saturday, 5 PM</p>
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
    </div>
  );
}
