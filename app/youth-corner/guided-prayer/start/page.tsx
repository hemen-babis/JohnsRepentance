"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function GuidedPrayerStart() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/parchment-bg.png')] bg-cover px-4">

      <div className="max-w-xl text-center space-y-8">

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="uppercase text-sm tracking-[0.3em] text-[#7a6437]"
        >
          Step 1 — Enter
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-[#3a1e01]"
        >
          Be still…
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-[#6b4c30]"
        >
          Before you read anything,
          <br />
          just pause for a moment.
          <br /><br />
          God is already here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            href="/youth-corner/guided-prayer"
            className="inline-block bg-[#3a1e01] text-white px-6 py-3 rounded-full text-lg"
          >
            Begin →
          </Link>
        </motion.div>

      </div>
    </div>
  )
}