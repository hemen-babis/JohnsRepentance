"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GeezHeading } from "@/components/geez-heading"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ChevronRight, CheckCircle, BookOpen, Clock, Calendar, Info, Play } from "lucide-react"

type ChecklistItem = {
  id: string
  label: string
  complete: boolean
}

type PrepStep = {
  title: string
  content: string
  icon: JSX.Element
}

export default function HolyCommunionPage() {
  // Preparation checklist
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: "confession", label: "Confession", complete: false },
    { id: "fasting", label: "Fasting (minimum 9 hours)", complete: false },
    { id: "prayer", label: "Prayer of Preparation", complete: false },
    { id: "reconcile", label: "Reconcile with others", complete: false },
    { id: "scripture", label: "Read Scripture", complete: false },
    { id: "abstain", label: "Abstain from food/drink", complete: false },
    { id: "clean", label: "Physical cleanliness", complete: false },
  ])

  const toggleChecklistItem = (id: string) => {
    setChecklist(checklist.map((item) => (item.id === id ? { ...item, complete: !item.complete } : item)))
  }

  const checklistProgress = Math.round((checklist.filter((item) => item.complete).length / checklist.length) * 100)

  // Virtual altar tour hotspots
  const videoRef = useRef<HTMLVideoElement>(null)

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  const prepSteps: PrepStep[] = [
    {
      title: "One Week Before",
      content: "Schedule confession with your priest. Begin preparing through prayer and scripture reading.",
      icon: <Calendar className="h-10 w-10 text-amber-500" />,
    },
    {
      title: "Three Days Before",
      content:
        "Intensify prayers, reconcile with those you have conflicts with, and begin limiting worldly distractions.",
      icon: <Clock className="h-10 w-10 text-amber-500" />,
    },
    {
      title: "The Day Before",
      content: "Complete your fast from meat and dairy. Attend the evening prayer service if possible.",
      icon: <BookOpen className="h-10 w-10 text-amber-500" />,
    },
    {
      title: "The Morning Of",
      content: "Continue fasting from all food and drink. Arrive at church early for preparation prayers.",
      icon: <Info className="h-10 w-10 text-amber-500" />,
    },
  ]

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
    <div className="light-mode-adaptive-page bg-gradient-to-b from-stone-950 to-orange-950/30 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 to-amber-600/5 dark:from-orange-900/20 dark:to-amber-900/20 z-0" />
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-5 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <GeezHeading className="mb-4 text-amber-500">ቅዱስ ቁርባን</GeezHeading>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Holy Communion</h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Prepare your heart and soul for the Divine Liturgy and Holy Communion in the Ethiopian Orthodox Tewahedo
              tradition
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="preparation" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-2 w-full max-w-md">
                  <TabsTrigger value="preparation">Preparation</TabsTrigger>
                  <TabsTrigger value="quick-facts">Quick Facts</TabsTrigger>
                </TabsList>
              </div>

              {/* Preparation Tracker */}
              <TabsContent value="preparation">
                <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                  <motion.div variants={fadeInUp}>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">Preparation Tracker</h2>
                      <p className="text-gray-400">Track your spiritual preparation for Holy Communion</p>
                    </div>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Checklist */}
                    <motion.div variants={fadeInUp}>
                      <Card className="border-none shadow-lg overflow-hidden bg-stone-900">
                        <CardHeader>
                          <CardTitle className="text-white">Communion Preparation Checklist</CardTitle>
                          <CardDescription>Mark each item as you complete your preparation</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-4">
                            <Progress value={checklistProgress} className="h-2 bg-stone-700" />
                            <p className="text-right text-sm text-gray-400 mt-1">{checklistProgress}% Complete</p>
                          </div>

                          <div className="space-y-4">
                            {checklist.map((item) => (
                              <div key={item.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={item.id}
                                  checked={item.complete}
                                  onCheckedChange={() => toggleChecklistItem(item.id)}
                                  className="border-amber-500 data-[state=checked]:bg-amber-500 data-[state=checked]:text-black"
                                />
                                <Label
                                  htmlFor={item.id}
                                  className={`text-base cursor-pointer ${
                                    item.complete ? "text-amber-500 line-through" : "text-white"
                                  }`}
                                >
                                  {item.label}
                                </Label>
                              </div>
                            ))}
                          </div>

                          {checklistProgress === 100 && (
                            <div className="mt-6 bg-amber-500/20 border border-amber-500/50 rounded-lg p-4 text-center">
                              <CheckCircle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                              <p className="text-amber-500 font-medium">You are prepared for Holy Communion!</p>
                              <p className="text-gray-300 text-sm mt-1">
                                Remember to maintain your spiritual state until receiving the Eucharist
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Preparation Timeline */}
                    <motion.div variants={fadeInUp}>
                      <Card className="border-none shadow-lg overflow-hidden bg-stone-900">
                        <CardHeader>
                          <CardTitle className="text-white">Preparation Timeline</CardTitle>
                          <CardDescription>Follow this schedule for proper preparation</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {prepSteps.map((step, index) => (
                              <div key={index} className="flex">
                                <div className="flex-shrink-0 mr-4">{step.icon}</div>
                                <div>
                                  <h3 className="text-lg font-medium text-white">{step.title}</h3>
                                  <p className="text-gray-400 mt-1">{step.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-6 flex justify-center">
                            <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black">
                              <Link href="/holy-communion/detailed-guide">
                                View Detailed Preparation Guide
                                <ChevronRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Video Guide */}
                  <motion.div variants={fadeInUp} className="mt-8">
                    <Card className="border-none shadow-lg overflow-hidden bg-stone-900">
                      <div className="h-2 bg-gradient-to-r from-amber-500 to-amber-700" />
                      <CardHeader>
                        <CardTitle className="text-white">Quick Preparation Guide</CardTitle>
                        <CardDescription>A brief video explaining Holy Communion preparation</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                          <Image
                            src="/placeholder.svg?height=400&width=800"
                            alt="Holy Communion Preparation Guide"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <button
                              className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center"
                              onClick={playVideo}
                            >
                              <Play className="h-8 w-8 text-black" />
                            </button>
                          </div>
                          <video ref={videoRef} className="absolute inset-0 w-full h-full hidden" controls>
                            <source src="#" type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              {/* Quick Facts */}
              <TabsContent value="quick-facts">
                <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                  <motion.div variants={fadeInUp}>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">Quick Facts</h2>
                      <p className="text-gray-400">Essential information about Holy Communion in the EOTC</p>
                    </div>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Liturgical Colors */}
                    <motion.div variants={fadeInUp}>
                      <Card className="border-none shadow-lg overflow-hidden bg-stone-900 h-full">
                        <CardHeader>
                          <CardTitle className="text-white">Liturgical Colors</CardTitle>
                          <CardDescription>
                            Colors used in vestments and altar cloths throughout the church year
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-white mr-4"></div>
                              <div>
                                <h3 className="font-medium text-white">White</h3>
                                <p className="text-gray-400 text-sm">Purity, resurrection, major feasts</p>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-orange-600 mr-4"></div>
                              <div>
                                <h3 className="font-medium text-white">Red</h3>
                                <p className="text-gray-400 text-sm">Martyrdom, Holy Spirit, Pentecost</p>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-amber-500 mr-4"></div>
                              <div>
                                <h3 className="font-medium text-white">Gold</h3>
                                <p className="text-gray-400 text-sm">Glory, divinity, special celebrations</p>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-purple-700 mr-4"></div>
                              <div>
                                <h3 className="font-medium text-white">Purple</h3>
                                <p className="text-gray-400 text-sm">Penitence, preparation, Lent</p>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-green-600 mr-4"></div>
                              <div>
                                <h3 className="font-medium text-white">Green</h3>
                                <p className="text-gray-400 text-sm">Life, growth, ordinary time</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Communion FAQs */}
                    <motion.div variants={fadeInUp}>
                      <Card className="border-none shadow-lg overflow-hidden bg-stone-900 h-full">
                        <CardHeader>
                          <CardTitle className="text-white">Communion FAQs</CardTitle>
                          <CardDescription>Common questions about Holy Communion</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h3 className="font-medium text-amber-500">How often should I receive Communion?</h3>
                            <p className="text-gray-300 mt-1">
                              The Church encourages frequent communion, ideally every Sunday and feast day, provided you
                              are properly prepared.
                            </p>
                          </div>

                          <div>
                            <h3 className="font-medium text-amber-500">How long should I fast before Communion?</h3>
                            <p className="text-gray-300 mt-1">
                              A minimum of 9 hours is required, but many observe a complete fast from midnight. This
                              includes abstaining from food, drink, and smoking.
                            </p>
                          </div>

                          <div>
                            <h3 className="font-medium text-amber-500">Can children receive Communion?</h3>
                            <p className="text-gray-300 mt-1">
                              Yes, baptized and chrismated children of all ages may receive Holy Communion. Parents
                              should help prepare children according to their age.
                            </p>
                          </div>

                          <div>
                            <h3 className="font-medium text-amber-500">What if I am menstruating?</h3>
                            <p className="text-gray-300 mt-1">
                              According to EOTC tradition, women abstain from communion during menstruation. This is not
                              because of impurity but follows Old Testament practices.
                            </p>
                          </div>

                          <Button
                            asChild
                            variant="outline"
                            className="w-full mt-2 border-amber-500 text-amber-500 hover:bg-amber-950/50"
                          >
                            <Link href="/holy-communion/faq">
                              View All FAQs
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Poll */}
                  <motion.div variants={fadeInUp} className="mt-8">
                    <Card className="border-none shadow-lg overflow-hidden bg-stone-900">
                      <CardHeader>
                        <CardTitle className="text-white">Community Poll</CardTitle>
                        <CardDescription>Share your experience with Holy Communion preparation</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <h3 className="text-lg font-medium text-white mb-4">
                          What aspect of Holy Communion preparation do you find most challenging?
                        </h3>

                        <div className="space-y-3">
                          <div className="bg-stone-800 p-3 rounded-lg hover:bg-gray-750 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300">Fasting requirements</span>
                              <Badge className="bg-amber-500 text-black">42%</Badge>
                            </div>
                            <div className="mt-2 h-2 bg-stone-700 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 rounded-full" style={{ width: "42%" }}></div>
                            </div>
                          </div>

                          <div className="bg-stone-800 p-3 rounded-lg hover:bg-gray-750 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300">Finding time for confession</span>
                              <Badge className="bg-amber-500 text-black">28%</Badge>
                            </div>
                            <div className="mt-2 h-2 bg-stone-700 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 rounded-full" style={{ width: "28%" }}></div>
                            </div>
                          </div>

                          <div className="bg-stone-800 p-3 rounded-lg hover:bg-gray-750 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300">Reconciling with others</span>
                              <Badge className="bg-amber-500 text-black">18%</Badge>
                            </div>
                            <div className="mt-2 h-2 bg-stone-700 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 rounded-full" style={{ width: "18%" }}></div>
                            </div>
                          </div>

                          <div className="bg-stone-800 p-3 rounded-lg hover:bg-gray-750 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300">Prayer discipline</span>
                              <Badge className="bg-amber-500 text-black">12%</Badge>
                            </div>
                            <div className="mt-2 h-2 bg-stone-700 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 rounded-full" style={{ width: "12%" }}></div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 text-center">
                          <p className="text-gray-400 text-sm">Based on 324 responses • Poll closes in 3 days</p>
                          <Button className="mt-4 bg-amber-500 hover:bg-amber-600 text-black">Submit Your Vote</Button>
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

      <ScrollToTop />
    </div>
  )
}
