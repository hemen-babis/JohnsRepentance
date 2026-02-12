"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { AnimatedGradientText } from "@/components/animated-gradient-text"
import { SocialShare } from "@/components/social-share"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function RepentancePage() {
  const [checklist, setChecklist] = useState({
    recognition: false,
    contrition: false,
    confession: false,
    resolution: false,
  })

  const handleChecklistChange = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }))
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
              <AnimatedGradientText text="Repentance" /> and Spiritual Renewal
            </h1>
            <p className="text-xl italic mb-4 text-gray-700">
              &quot;Repent, for the kingdom of heaven is near!&quot; (Matthew 3:1-2)
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Repentance is the first step to reconnecting with God and cleansing our souls. Here, you&apos;ll find
              guidance on confession, prayers, and steps for true repentance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="md:col-span-2">
              <motion.div className="space-y-8" initial="hidden" animate="visible" variants={staggerContainer}>
                <motion.div variants={fadeInUp}>
                  <Card className="border-none shadow-lg overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500" />
                    <CardHeader>
                      <CardTitle>Steps to Repentance</CardTitle>
                      <CardDescription>The path to spiritual renewal</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="recognition"
                            checked={checklist.recognition}
                            onCheckedChange={() => handleChecklistChange("recognition")}
                            className="mt-1 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                          />
                          <div>
                            <label htmlFor="recognition" className="font-medium cursor-pointer">
                              Recognition
                            </label>
                            <p className="text-gray-600">
                              Acknowledge your sins before God. This is the first step in the process of repentance.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="contrition"
                            checked={checklist.contrition}
                            onCheckedChange={() => handleChecklistChange("contrition")}
                            className="mt-1 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                          />
                          <div>
                            <label htmlFor="contrition" className="font-medium cursor-pointer">
                              Contrition
                            </label>
                            <p className="text-gray-600">
                              Feel genuine sorrow for your actions. True repentance comes from a contrite heart.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="confession"
                            checked={checklist.confession}
                            onCheckedChange={() => handleChecklistChange("confession")}
                            className="mt-1 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                          />
                          <div>
                            <label htmlFor="confession" className="font-medium cursor-pointer">
                              Confession
                            </label>
                            <p className="text-gray-600">
                              Seek guidance from a spiritual father and confess your sins. Confession is healing for the
                              soul.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="resolution"
                            checked={checklist.resolution}
                            onCheckedChange={() => handleChecklistChange("resolution")}
                            className="mt-1 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                          />
                          <div>
                            <label htmlFor="resolution" className="font-medium cursor-pointer">
                              Resolution
                            </label>
                            <p className="text-gray-600">
                              Commit to turning away from sin and living righteously. This is the fruit of true
                              repentance.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Card className="border-none shadow-lg overflow-hidden">
                    <CardHeader>
                      <CardTitle>Prayers for Repentance</CardTitle>
                      <CardDescription>Use the following prayers as part of your repentance journey</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg border-l-4 border-orange-500">
                          <p className="text-lg italic text-gray-800 mb-2">
                            &quot;Have mercy on me, O God, according to Your unfailing love; according to Your great
                            compassion blot out my transgressions.&quot;
                          </p>
                          <p className="text-right text-gray-600">Psalm 51:1</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <Button variant="outline" className="flex items-center gap-2">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m0 0l-2.828 2.828m2.828-2.828a9 9 0 010-12.728m0 0l2.828 2.828m-2.828-2.828L5.586 8.464m4.95 4.95l2.828 2.828m-2.828-2.828a5 5 0 010-7.072M7.5 7.5h.01m9.99 9.99h.01M15 7.5h.01M7.5 15h.01"
                              ></path>
                            </svg>
                            Listen to Prayer
                          </Button>
                          <Button variant="outline" className="flex items-center gap-2">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              ></path>
                            </svg>
                            Download Prayer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Card className="border-none shadow-lg overflow-hidden">
                    <CardHeader>
                      <CardTitle>Real Stories of Repentance</CardTitle>
                      <CardDescription>Anonymous testimonies from our community</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="italic text-gray-600 mb-2">
                            &quot;I struggled with anger for years. Through confession and the guidance of my spiritual
                            father, I learned to recognize my triggers and respond with prayer instead of rage. The
                            peace I feel now is indescribable.&quot;
                          </p>
                          <p className="text-right text-sm text-gray-500">- Anonymous, 22</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="italic text-gray-600 mb-2">
                            &quot;Social media addiction was consuming my life. After confessing and committing to
                            change, I now limit my screen time and dedicate those hours to prayer and reading spiritual
                            books.&quot;
                          </p>
                          <p className="text-right text-sm text-gray-500">- Anonymous, 19</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>

            <div>
              <motion.div
                className="space-y-8 sticky top-20"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp}>
                  <Card className="border-none shadow-lg overflow-hidden">
                    <CardHeader>
                      <CardTitle>Contact a Spiritual Father</CardTitle>
                      <CardDescription>Get personal guidance for your spiritual journey</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">
                        To receive personal guidance, schedule a confession, or ask for help, use the button below to
                        contact us. Our spiritual fathers are available to guide you through the process of repentance.
                      </p>
                      <div className="flex justify-center">
                        <Link href="/contact">
                          <Button className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600">
                            Contact Us
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Card className="border-none shadow-lg overflow-hidden">
                    <CardHeader>
                      <CardTitle>Recommended Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                          <svg
                            className="w-5 h-5 text-orange-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            ></path>
                          </svg>
                          <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">
                            Guide to Confession
                          </a>
                        </li>
                        <li className="flex items-center gap-3">
                          <svg
                            className="w-5 h-5 text-orange-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            ></path>
                          </svg>
                          <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">
                            Prayer Book for Repentance
                          </a>
                        </li>
                        <li className="flex items-center gap-3">
                          <svg
                            className="w-5 h-5 text-orange-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                            ></path>
                          </svg>
                          <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">
                            Video: Understanding Repentance
                          </a>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <h3 className="font-medium text-lg mb-2">Share This Page</h3>
                        <p className="text-sm text-gray-600 mb-4">Help others on their journey to repentance</p>
                        <SocialShare title="Repentance and Spiritual Renewal - John's Repentance" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  )
}
