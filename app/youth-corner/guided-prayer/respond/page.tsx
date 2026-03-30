"use client"

import Link from "next/link"
import { useState } from "react"

export default function RespondPage() {
  const [text, setText] = useState("")

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/parchment-bg.png')] px-4">
      <div className="max-w-xl w-full space-y-6">

        <h1 className="text-3xl font-bold text-[#3a1e01]">
          What is God showing you?
        </h1>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full min-h-[150px] p-4 rounded-xl border"
          placeholder="Write honestly..."
        />

        <Link
          href="/youth-corner/guided-prayer/live"
          className="block text-center bg-[#a65d1a] text-white py-3 rounded-full"
        >
          Continue →
        </Link>

      </div>
    </div>
  )
}