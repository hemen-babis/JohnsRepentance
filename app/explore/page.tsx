"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { GeezHeading } from "@/components/geez-heading"
import { ScrollToTop } from "@/components/scroll-to-top"

const sections = [
  {
    title: "Teachings",
    description: "Explore the doctrines and theology of the Ethiopian Orthodox Church",
    image: "/placeholder.svg?height=300&width=400",
    link: "/teachings",
    color: "from-amber-500 to-amber-700",
  },
  {
    title: "Repentance",
    description: "Learn about the sacrament of confession and spiritual renewal",
    image: "/placeholder.svg?height=300&width=400",
    link: "/repentance",
    color: "from-orange-500 to-orange-700",
  },
  {
    title: "Holy Communion",
    description: "Prepare for the sacred mystery of the Eucharist",
    image: "/placeholder.svg?height=300&width=400",
    link: "/holy-communion",
    color: "from-blue-500 to-blue-700",
  },
  {
    title: "Q&A",
    description: "Find answers to common questions about the Orthodox faith",
    image: "/placeholder.svg?height=300&width=400",
    link: "/qa",
    color: "from-green-500 to-green-700",
  },
  {
    title: "Youth Corner",
    description: "Resources and activities for young Orthodox believers",
    image: "/placeholder.svg?height=300&width=400",
    link: "/youth",
    color: "from-purple-500 to-purple-700",
  },
  {
    title: "Deacon's Corner",
    description: "Liturgical resources and training for deacons and chanters",
    image: "/placeholder.svg?height=300&width=400",
    link: "/deacons",
    color: "from-amber-500 to-red-500",
  },
  {
    title: "Gallery",
    description: "Photos and videos from our community and events",
    image: "/placeholder.svg?height=300&width=400",
    link: "/gallery",
    color: "from-teal-500 to-teal-700",
  },
  {
    title: "About Us",
    description: "Learn about our mission and the people behind John's Repentance",
    image: "/placeholder.svg?height=300&width=400",
    link: "/about",
    color: "from-indigo-500 to-indigo-700",
  },
]

export default function ExplorePage() {
  return (
    <div className="bg-gradient-to-b from-stone-950 to-orange-950/30 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-5 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <GeezHeading className="mb-4 text-amber-500">አስስ</GeezHeading>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Explore Your Faith</h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Discover the richness of Ethiopian Orthodox tradition through our various sections
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={section.link}>
                  <Card className="overflow-hidden border-none shadow-lg h-full group">
                    <div className="relative h-48">
                      <Image
                        src={section.image || "/placeholder.svg"}
                        alt={section.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div
                          className="h-1 w-16 bg-gradient-to-r mb-2 rounded-full"
                          style={{
                            backgroundImage: `linear-gradient(to right, ${section.color.split(" ")[1]}, ${section.color.split(" ")[3]})`,
                          }}
                        />
                        <h2 className="text-xl font-bold text-white">{section.title}</h2>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-gray-600 dark:text-gray-300">{section.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  )
}
