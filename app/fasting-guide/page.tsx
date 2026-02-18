"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedGradientText } from "@/components/animated-gradient-text"
import { ScrollToTop } from "@/components/scroll-to-top"
import { GeezHeading } from "@/components/geez-heading"
import { SocialShare } from "@/components/social-share"
import { Calendar, Clock, Utensils, CheckCircle, HelpCircle, BookOpen, Download } from "lucide-react"
import { useAuthProgress } from "@/components/providers/auth-progress-provider"

// Fasting calendar data
const fastingCalendar = [
  {
    name: "Fast of Nineveh (Tsome Nenewe)",
    startDate: "February 10, 2026",
    endDate: "February 12, 2026",
    duration: "3 days",
    description: "Commemorates the repentance of Nineveh following Jonah's preaching.",
    rules: "Strict fast with complete abstinence from food and water until noon or 3:00 PM.",
  },
  {
    name: "Great Lent (Abiy Tsom)",
    startDate: "February 16, 2026",
    endDate: "April 10, 2026",
    duration: "54 days",
    description: "The most important fast, preparing believers for Easter (Fasika).",
    rules: "Abstain from animal products. One meal after 3:00 PM on weekdays, two meals on weekends.",
  },
  {
    name: "Semune Himamat (Holy Week / Week of Suffering)",
    startDate: "April 6, 2026",
    endDate: "April 8, 2026",
    duration: "3 days",
    description: "The final suffering week observance before the Triduum services.",
    rules: "Intensified prayer, repentance, and strict fasting discipline.",
  },
  {
    name: "Tselote Hamus (Maundy Thursday)",
    startDate: "April 9, 2026",
    endDate: "April 9, 2026",
    duration: "1 day",
    description: "Commemoration of the Mystical Supper and foot-washing service.",
    rules: "Strict observance with liturgical participation.",
  },
  {
    name: "Siklet (Good Friday)",
    startDate: "April 10, 2026",
    endDate: "April 10, 2026",
    duration: "1 day",
    description: "Commemoration of the crucifixion of our Lord Jesus Christ.",
    rules: "One of the strictest fasting days with prolonged prayer and prostrations.",
  },
  {
    name: "Paschal No-Fast Period",
    startDate: "April 12, 2026",
    endDate: "May 31, 2026",
    duration: "50 days season in your current parish schedule",
    description: "No fasting is observed during this period in your configured 2026 schedule.",
    rules: "Fasting is suspended until June 1, 2026.",
  },
  {
    name: "Fast of the Apostles (Tsome Hawaryat)",
    startDate: "June 1, 2026",
    endDate: "July 11, 2026",
    duration: "41 days",
    description: "Honors the apostles and their missionary work.",
    rules: "Abstain from animal products. One meal after 3:00 PM on weekdays, two meals on weekends.",
  },
  {
    name: "Fast of the Assumption (Tsome Filseta)",
    startDate: "August 1, 2026",
    endDate: "August 16, 2026",
    duration: "16 days",
    description: "Commemorates the assumption of the Virgin Mary.",
    rules: "Abstain from animal products. One meal after 3:00 PM on weekdays, two meals on weekends.",
  },
  {
    name: "Fast of the Prophets (Tsome Nebiyat)",
    startDate: "November 25, 2026",
    endDate: "January 6, 2027",
    duration: "43 days",
    description:
      "A fast observed before Christmas (Genna) to commemorate the prophets who foretold the coming of Christ.",
    rules: "Abstain from animal products. One meal after 3:00 PM on weekdays, two meals on weekends.",
  },
  {
    name: "Weekly Fasts",
    startDate: "Resumes June 1, 2026",
    endDate: "Continues every Wednesday and Friday",
    duration: "2 days per week",
    description: "Wednesday commemorates the betrayal of Christ, Friday commemorates His crucifixion.",
    rules: "In your 2026 schedule, weekly fasting is paused during the no-fast Paschal period and resumes on June 1.",
  },
]

export default function FastingGuidePage() {
  const { progress, addFastingCheckinToday } = useAuthProgress()
  const [selectedFast, setSelectedFast] = useState(fastingCalendar[0])
  const today = new Date().toISOString().split("T")[0]
  const checkedToday = progress.fastingCheckins.includes(today)

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
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/5 to-red-600/5 dark:from-amber-900/20 dark:to-red-900/20 z-0" />
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-5 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <GeezHeading className="mb-4 text-amber-800 dark:text-amber-500">ጾም</GeezHeading>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Ethiopian Orthodox <AnimatedGradientText text="Fasting Guide" />
            </h1>
            <p className="text-lg text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto">
              Learn about the spiritual practice of fasting in the Ethiopian Orthodox Tewahedo Church
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="mb-6 border-none shadow-lg overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-emerald-500 to-emerald-700" />
              <CardContent className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Fasting Progress</p>
                  <p className="text-lg font-semibold">
                    {progress.fastingCheckins.length} check-ins saved
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {checkedToday ? "You already checked in today." : "Mark today once you complete your fasting discipline."}
                  </p>
                </div>
                <Button
                  onClick={addFastingCheckinToday}
                  disabled={checkedToday}
                  className="bg-emerald-600 hover:bg-emerald-500"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {checkedToday ? "Checked In Today" : "Mark Today Complete"}
                </Button>
              </CardContent>
            </Card>

            <Tabs defaultValue="calendar" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-3 w-full max-w-md">
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  <TabsTrigger value="meaning">Meaning</TabsTrigger>
                  <TabsTrigger value="guide">Practical Guide</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="calendar">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <Card className="border-none shadow-lg overflow-hidden sticky top-20">
                      <div className="h-2 bg-gradient-to-r from-amber-500 to-amber-700" />
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                          Fasting Calendar
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {fastingCalendar.map((fast, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedFast(fast)}
                              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                                selectedFast.name === fast.name
                                  ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 font-medium"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {fast.name}
                            </button>
                          ))}
                        </div>

                        <div className="mt-6">
                          <Button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800">
                            <Download className="h-4 w-4" />
                            Download Full Calendar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="md:col-span-2">
                    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
                      <motion.div variants={fadeInUp}>
                        <Card className="border-none shadow-lg overflow-hidden">
                          <div className="h-2 bg-gradient-to-r from-amber-500 to-amber-700" />
                          <CardHeader>
                            <CardTitle>{selectedFast.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                                    <h3 className="font-medium text-amber-800 dark:text-amber-500">Dates</h3>
                                  </div>
                                  <p className="text-muted-foreground dark:text-gray-400 text-sm">
                                    {selectedFast.startDate} to {selectedFast.endDate}
                                  </p>
                                </div>

                                <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Clock className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                                    <h3 className="font-medium text-amber-800 dark:text-amber-500">Duration</h3>
                                  </div>
                                  <p className="text-muted-foreground dark:text-gray-400 text-sm">{selectedFast.duration}</p>
                                </div>
                              </div>

                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Description</h3>
                                <p className="text-muted-foreground dark:text-gray-300">{selectedFast.description}</p>
                              </div>

                              <div className="mt-4">
                                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Fasting Rules</h3>
                                <p className="text-muted-foreground dark:text-gray-300">{selectedFast.rules}</p>
                              </div>

                              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mt-6 border border-gray-200 dark:border-gray-700">
                                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Spiritual Focus</h3>
                                <p className="text-muted-foreground dark:text-gray-300 text-sm">
                                  During {selectedFast.name}, believers are encouraged to increase prayer, almsgiving,
                                  and scripture reading. The physical fast is meant to be accompanied by spiritual
                                  discipline and growth.
                                </p>
                              </div>

                              <div className="flex justify-between items-center mt-6">
                                <Button
                                  variant="outline"
                                  className="text-amber-700 dark:text-amber-500 border-amber-300 dark:border-amber-700 bg-transparent"
                                >
                                  Add to Calendar
                                </Button>
                                <SocialShare title={`${selectedFast.name} - Ethiopian Orthodox Fasting Guide`} />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>

                      <motion.div variants={fadeInUp}>
                        <Card className="border-none shadow-lg overflow-hidden">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Utensils className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                              Fasting Recipes
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6 dark:border-amber-900/40 dark:from-amber-950/20 dark:to-orange-950/20">
                              <h3 className="text-xl font-semibold mb-2">New: Personalized Fasting Recipes Experience</h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                Explore imported recipes from your PDF in a dedicated page with favorites, tradition filters, personalized suggestions, and an interactive shopping list.
                              </p>
                              <div className="flex flex-wrap gap-2 mb-5 text-xs text-amber-800 dark:text-amber-300">
                                <span className="rounded-full bg-white/80 px-3 py-1 dark:bg-gray-900/40">Personal profile</span>
                                <span className="rounded-full bg-white/80 px-3 py-1 dark:bg-gray-900/40">Save favorites</span>
                                <span className="rounded-full bg-white/80 px-3 py-1 dark:bg-gray-900/40">Smart shopping list</span>
                                <span className="rounded-full bg-white/80 px-3 py-1 dark:bg-gray-900/40">Tradition-based filters</span>
                              </div>
                              <Button asChild className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800">
                                <Link href="/fasting-recipes">Open Fasting Recipes</Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="meaning">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-none shadow-lg overflow-hidden">
                    <div className="relative h-64">
                      <Image
                        src="/placeholder.svg?height=300&width=500"
                        alt="Ethiopian Orthodox Fasting"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                        The Spiritual Meaning of Fasting
                      </h3>
                      <div className="space-y-4 text-muted-foreground dark:text-gray-300">
                        <p>
                          In the Ethiopian Orthodox Tewahedo Church, fasting is not merely abstaining from certain foods
                          but a holistic spiritual discipline that involves prayer, almsgiving, and self-control. It is
                          a means of purifying both body and soul.
                        </p>
                        <p>
                          Fasting helps believers overcome physical desires and focus on spiritual growth. It is a form
                          of sacrifice that reminds us of Christ's sacrifice and helps us develop empathy for those who
                          are hungry and in need.
                        </p>
                        <p>
                          The Church teaches that fasting should be accompanied by increased prayer, scripture reading,
                          and acts of charity. Without these spiritual components, fasting becomes merely a dietary
                          restriction rather than a transformative practice.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <Card className="border-none shadow-lg overflow-hidden">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                          Biblical Foundation
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg">
                            <p className="italic text-gray-700 dark:text-gray-300 mb-2">
                              "But you, when you fast, anoint your head and wash your face, so that you do not appear to
                              men to be fasting, but to your Father who is in the secret place; and your Father who sees
                              in secret will reward you openly."
                            </p>
                            <p className="text-right text-gray-500 dark:text-gray-400 text-sm">Matthew 6:17-18</p>
                          </div>

                          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg">
                            <p className="italic text-gray-700 dark:text-gray-300 mb-2">
                              "Is this not the fast that I have chosen: To loose the bonds of wickedness, to undo the
                              heavy burdens, to let the oppressed go free, and that you break every yoke? Is it not to
                              share your bread with the hungry, and that you bring to your house the poor who are cast
                              out?"
                            </p>
                            <p className="text-right text-gray-500 dark:text-gray-400 text-sm">Isaiah 58:6-7</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg overflow-hidden">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                          Benefits of Fasting
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">Spiritual Discipline</h4>
                              <p className="text-sm text-muted-foreground dark:text-gray-400">
                                Strengthens willpower and self-control, which extends to other areas of spiritual life
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">Prayer Enhancement</h4>
                              <p className="text-sm text-muted-foreground dark:text-gray-400">
                                Creates clarity of mind and heightened spiritual awareness for deeper prayer
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">Compassion Development</h4>
                              <p className="text-sm text-muted-foreground dark:text-gray-400">
                                Builds empathy for those who are hungry and increases charitable giving
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">Physical Health</h4>
                              <p className="text-sm text-muted-foreground dark:text-gray-400">
                                Many studies show health benefits from periodic fasting and plant-based diets
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">Community Unity</h4>
                              <p className="text-sm text-muted-foreground dark:text-gray-400">
                                Creates a shared spiritual experience that strengthens church community
                              </p>
                            </div>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="guide">
                <Card className="border-none shadow-lg overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-amber-500 to-amber-700" />
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                      Practical Fasting Guide
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            General Fasting Rules
                          </h3>
                          <div className="space-y-4">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Food Restrictions</h4>
                              <p className="text-muted-foreground dark:text-gray-300 text-sm">
                                During fasting periods, Orthodox believers abstain from:
                              </p>
                              <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground dark:text-gray-300 space-y-1">
                                <li>Meat and meat products</li>
                                <li>Dairy products (milk, cheese, butter)</li>
                                <li>Eggs</li>
                                <li>Fish</li>
                                <li>Oil and wine</li>
                              </ul>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Timing of Meals</h4>
                              <p className="text-muted-foreground dark:text-gray-300 text-sm">
                                On weekdays during major fasts:
                              </p>
                              <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground dark:text-gray-300 space-y-1">
                                <li>No food or drink until 3:00 PM (or after the ninth hour)</li>
                                <li>One meal per day after 3:00 PM</li>
                                <li>Water may be permitted throughout the day (consult your spiritual father)</li>
                              </ul>
                              <p className="text-muted-foreground dark:text-gray-300 text-sm mt-2">
                                On weekends during major fasts:
                              </p>
                              <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground dark:text-gray-300 space-y-1">
                                <li>Two meals permitted</li>
                                <li>First meal after Divine Liturgy</li>
                                <li>Second meal in the evening</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            Special Considerations
                          </h3>
                          <div className="space-y-4">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Medical Conditions</h4>
                              <p className="text-muted-foreground dark:text-gray-300 text-sm">
                                Those with medical conditions, pregnant or nursing women, children, and the elderly may
                                receive dispensation from strict fasting rules. Always consult with your spiritual
                                father and healthcare provider.
                              </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Spiritual Components</h4>
                              <p className="text-muted-foreground dark:text-gray-300 text-sm">
                                Fasting should be accompanied by:
                              </p>
                              <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground dark:text-gray-300 space-y-1">
                                <li>Increased prayer (morning and evening prayers)</li>
                                <li>Scripture reading</li>
                                <li>Almsgiving and acts of charity</li>
                                <li>Attending church services more frequently</li>
                                <li>Confession and spiritual guidance</li>
                              </ul>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Breaking the Fast</h4>
                              <p className="text-muted-foreground dark:text-gray-300 text-sm">
                                Fasts are typically broken after Divine Liturgy on the feast day that follows the
                                fasting period. It's important to break the fast gradually, especially after longer
                                fasting periods.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
                        <h3 className="font-medium text-amber-800 dark:text-amber-500 mb-3">
                          Beginner's Guide to Fasting
                        </h3>
                        <p className="text-muted-foreground dark:text-gray-400 mb-4">
                          If you're new to fasting, start gradually:
                        </p>
                        <ol className="list-decimal pl-5 text-muted-foreground dark:text-gray-400 space-y-2">
                          <li>Begin by observing Wednesday and Friday fasts</li>
                          <li>Start with abstaining from meat before eliminating all animal products</li>
                          <li>Focus on the spiritual aspects of fasting (prayer, almsgiving)</li>
                          <li>Gradually extend fasting hours</li>
                          <li>Seek guidance from a priest or spiritual father</li>
                        </ol>
                        <div className="mt-4">
                          <Button
                            asChild
                            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
                          >
                            <Link href="/contact">Speak with a Priest</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  )
}
