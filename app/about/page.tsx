"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedGradientText } from "@/components/animated-gradient-text"
import { SocialShare } from "@/components/social-share"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function AboutPage() {
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
              About <AnimatedGradientText text="John's Repentance" />
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Spreading the True Faith, Breaking Language Barriers, and Reviving EOTC in Gen Z!
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Ethiopian Orthodox Church"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <h2 className="text-2xl font-bold">Our Story</h2>
              <p className="text-gray-600">
                John's Repentance began as a small initiative to help young believers connect with their faith in the
                modern world. Founded in 2025 as the English branch of a successful 3-year Amharic program, we've grown
                into a comprehensive resource for spiritual growth, repentance guidance, and communion preparation.
              </p>
              <p className="text-gray-600">
                Our name is inspired by John the Baptist's call to repentance, reminding us that spiritual renewal is at
                the heart of our faith journey.
              </p>
              <div className="pt-4">
                <SocialShare title="About John's Repentance - EOTC Teachings" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To guide believers in their spiritual journey by providing access to lessons, discussions, and answers to
              questions about faith.
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            <Card className="border-none shadow-lg overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-orange-500 to-amber-500" />
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div variants={fadeInUp} className="space-y-4">
                    <h3 className="text-xl font-semibold text-orange-600">What We Believe</h3>
                    <p className="text-gray-600">
                      We adhere to the teachings of the Ethiopian Orthodox Tewahedo Church, one of the oldest Christian
                      denominations in the world. Our faith is rooted in the Holy Scriptures, apostolic traditions, and
                      the decisions of the ecumenical councils.
                    </p>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="space-y-4">
                    <h3 className="text-xl font-semibold text-amber-600">What We Do</h3>
                    <p className="text-gray-600">
                      We provide resources for spiritual growth, facilitate discussions on faith matters, offer guidance
                      on repentance and holy communion, and create a supportive community for believers of all ages,
                      with special programs for youth.
                    </p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Spiritual Leaders */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Spiritual Leaders</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are blessed to have guidance and blessings from these spiritual fathers.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Card className="border-none shadow-lg overflow-hidden text-center hover:shadow-xl transition-all duration-300">
                <div className="relative h-64">
                  <Image src="/placeholder.svg?height=300&width=300" alt="Abune Ermias" fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>Abune Ermias</CardTitle>
                  <CardDescription>Bishop</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 italic">"Faith is your strength—own it!"</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="border-none shadow-lg overflow-hidden text-center hover:shadow-xl transition-all duration-300">
                <div className="relative h-64">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Like Hiruyan Tserse Abebe"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Like Hiruyan Tserse Abebe</CardTitle>
                  <CardDescription>Priest and Scholar</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 italic">
                    "Knowledge without practice is like a tree without fruit."
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="border-none shadow-lg overflow-hidden text-center hover:shadow-xl transition-all duration-300">
                <div className="relative h-64">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Aba Wolde Giorgis"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Aba Wolde Giorgis</CardTitle>
                  <CardDescription>Monk</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 italic">"Prayer is the breath of the soul."</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="border-none shadow-lg overflow-hidden text-center hover:shadow-xl transition-all duration-300">
                <div className="relative h-64">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Memeher Simur Getenet"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Memeher Simur Getenet</CardTitle>
                  <CardDescription>Priest and Scholar</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 italic">"Repentance is the door to salvation."</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From our humble beginnings to our vision for the future
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-orange-500 to-amber-500"></div>

              {/* Timeline items */}
              <div className="space-y-16">
                <motion.div variants={fadeInUp} className="relative">
                  <div className="flex items-center justify-center mb-4">
                    <div className="z-10 flex items-center justify-center w-12 h-12 bg-white rounded-full border-4 border-orange-500">
                      <span className="font-bold text-orange-600">2022</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2 text-center">Amharic Program Launched</h3>
                    <p className="text-gray-600 text-center">
                      Our journey began with the Amharic service, የዮሐንስ ንሐሐ, providing spiritual guidance to the
                      Ethiopian community.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="relative">
                  <div className="flex items-center justify-center mb-4">
                    <div className="z-10 flex items-center justify-center w-12 h-12 bg-white rounded-full border-4 border-amber-500">
                      <span className="font-bold text-amber-600">2025</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2 text-center">English Expansion</h3>
                    <p className="text-gray-600 text-center">
                      Expanding our reach with John's Repentance, an English-language service to break language
                      barriers.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="relative">
                  <div className="flex items-center justify-center mb-4">
                    <div className="z-10 flex items-center justify-center w-12 h-12 bg-white rounded-full border-4 border-orange-500">
                      <span className="font-bold text-orange-600">Future</span>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2 text-center">Global EOTC Revival</h3>
                    <p className="text-gray-600 text-center">
                      Our vision is to spread the true faith globally, inspiring a new generation to embrace the
                      Ethiopian Orthodox tradition.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Why EOTC?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The Church of the Apostles – Pure, Unshaken, Holy!
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            <Card className="border-none shadow-lg overflow-hidden">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div variants={fadeInUp}>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mt-0.5">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </span>
                        <div>
                          <h3 className="font-medium">Apostolic Tradition</h3>
                          <p className="text-sm text-gray-600">
                            Direct lineage from the apostles, preserving the original Christian faith.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mt-0.5">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </span>
                        <div>
                          <h3 className="font-medium">Rich Spiritual Heritage</h3>
                          <p className="text-sm text-gray-600">
                            Over 2,000 years of unbroken spiritual tradition and wisdom.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mt-0.5">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </span>
                        <div>
                          <h3 className="font-medium">100% Orthodox, 100% Authentic</h3>
                          <p className="text-sm text-gray-600">
                            No deviation from EOTC doctrine, preserving the true faith.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-0.5">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </span>
                        <div>
                          <h3 className="font-medium">Community & Belonging</h3>
                          <p className="text-sm text-gray-600">
                            Join a global family of believers united in faith and tradition.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  )
}
