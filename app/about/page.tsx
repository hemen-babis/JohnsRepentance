"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedGradientText } from "@/components/animated-gradient-text"
import { SocialShare } from "@/components/social-share"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Check } from "lucide-react"

export default function AboutPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  return (
    <div className="bg-gradient-to-b from-amber-50/50 to-orange-50/30 dark:from-stone-950 dark:to-orange-950/20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-amber-500/5 dark:from-orange-900/20 dark:to-amber-900/20 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <AnimatedGradientText text="John's Repentance" />
            </h1>
            <div className="w-16 h-[2px] bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
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
              {/* REPLACE: Add your about section image here */}
              {/* Place in /public/images/about-church.jpg */}
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl image-hover-zoom group">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Ethiopian Orthodox Church"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                John&apos;s Repentance began as a small initiative to help young believers connect with their faith in the
                modern world. Founded in 2025 as the English branch of a successful 3-year Amharic program, we&apos;ve grown
                into a comprehensive resource for spiritual growth, repentance guidance, and communion preparation.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our name is inspired by John the Baptist&apos;s call to repentance, reminding us that spiritual renewal is at
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
      <section className="py-24 bg-white/80 dark:bg-stone-950/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Mission</h2>
            <div className="w-12 h-[2px] bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
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
            <Card className="border-none shadow-lg overflow-hidden card-hover-lift card-inner-glow">
              <div className="h-1 bg-gradient-to-r from-orange-500 to-amber-500" />
              <CardContent className="p-8 md:p-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div variants={fadeInUp} className="space-y-4">
                    <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400">What We Believe</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      We adhere to the teachings of the Ethiopian Orthodox Tewahedo Church, one of the oldest Christian
                      denominations in the world. Our faith is rooted in the Holy Scriptures, apostolic traditions, and
                      the decisions of the ecumenical councils.
                    </p>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="space-y-4">
                    <h3 className="text-xl font-semibold text-amber-600 dark:text-amber-400">What We Do</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
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
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-stone-950 dark:to-stone-950/80">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Spiritual Leaders</h2>
            <div className="w-12 h-[2px] bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
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
            {[
              { name: "Abune Ermias", role: "Bishop", quote: "Faith is your strength\u2014own it!" },
              { name: "Like Hiruyan Tserse Abebe", role: "Priest and Scholar", quote: "Knowledge without practice is like a tree without fruit." },
              { name: "Aba Wolde Giorgis", role: "Monk", quote: "Prayer is the breath of the soul." },
              { name: "Memeher Simur Getenet", role: "Priest and Scholar", quote: "Repentance is the door to salvation." },
            ].map((leader) => (
              <motion.div key={leader.name} variants={fadeInUp}>
                <Card className="border-none shadow-lg overflow-hidden text-center card-hover-lift card-inner-glow group">
                  {/* REPLACE: Add leader photos */}
                  {/* Place in /public/images/leaders/[name].jpg */}
                  <div className="relative h-64 image-hover-zoom">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt={leader.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                      {leader.name}
                    </CardTitle>
                    <CardDescription>{leader.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">&ldquo;{leader.quote}&rdquo;</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-24 bg-white/80 dark:bg-stone-950/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Journey</h2>
            <div className="w-12 h-[2px] bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
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
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-orange-500 via-amber-500 to-orange-400" />

              {/* Timeline items */}
              <div className="space-y-16">
                {[
                  { year: "2022", title: "Amharic Program Launched", desc: "Our journey began with the Amharic service, providing spiritual guidance to the Ethiopian community.", color: "orange" },
                  { year: "2025", title: "English Expansion", desc: "Expanding our reach with John's Repentance, an English-language service to break language barriers.", color: "amber" },
                  { year: "Future", title: "Global EOTC Revival", desc: "Our vision is to spread the true faith globally, inspiring a new generation to embrace the Ethiopian Orthodox tradition.", color: "orange" },
                ].map((item) => (
                  <motion.div key={item.year} variants={fadeInUp} className="relative">
                    <div className="flex items-center justify-center mb-4">
                      <div className={`z-10 flex items-center justify-center w-14 h-14 bg-white dark:bg-stone-900 rounded-full border-4 ${item.color === "orange" ? "border-orange-500" : "border-amber-500"} shadow-lg shadow-orange-200/30 dark:shadow-orange-900/20`}>
                        <span className={`font-bold text-sm ${item.color === "orange" ? "text-orange-600" : "text-amber-600"}`}>{item.year}</span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-stone-900/80 p-6 rounded-xl shadow-md card-hover-lift card-inner-glow border border-orange-100/50 dark:border-orange-900/20">
                      <h3 className="text-xl font-bold mb-2 text-center text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-stone-950 dark:to-stone-950/80">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Why EOTC?</h2>
            <div className="w-12 h-[2px] bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The Church of the Apostles &ndash; Pure, Unshaken, Holy!
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            <Card className="border-none shadow-lg overflow-hidden card-hover-lift card-inner-glow">
              <CardContent className="p-8 md:p-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div variants={fadeInUp}>
                    <ul className="space-y-5">
                      <li className="flex items-start gap-3 group/item">
                        <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center mt-0.5 transition-colors duration-300 group-hover/item:bg-orange-200 dark:group-hover/item:bg-orange-950/60">
                          <Check className="w-4 h-4" />
                        </span>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Apostolic Tradition</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">Direct lineage from the apostles, preserving the original Christian faith.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 group/item">
                        <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mt-0.5 transition-colors duration-300 group-hover/item:bg-amber-200 dark:group-hover/item:bg-amber-950/60">
                          <Check className="w-4 h-4" />
                        </span>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Rich Spiritual Heritage</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">Over 2,000 years of unbroken spiritual tradition and wisdom.</p>
                        </div>
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <ul className="space-y-5">
                      <li className="flex items-start gap-3 group/item">
                        <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 flex items-center justify-center mt-0.5 transition-colors duration-300 group-hover/item:bg-green-200 dark:group-hover/item:bg-green-950/60">
                          <Check className="w-4 h-4" />
                        </span>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">100% Orthodox, 100% Authentic</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">No deviation from EOTC doctrine, preserving the true faith.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 group/item">
                        <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center mt-0.5 transition-colors duration-300 group-hover/item:bg-orange-200 dark:group-hover/item:bg-orange-950/60">
                          <Check className="w-4 h-4" />
                        </span>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Community & Belonging</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">Join a global family of believers united in faith and tradition.</p>
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
