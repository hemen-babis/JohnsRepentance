"use client"

import Link from "next/link"

export default function LivePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/parchment-bg.png')] px-4">
      <div className="text-center space-y-6 max-w-xl">

        <h1 className="text-3xl font-bold text-[#3a1e01]">
          Now live it.
        </h1>

        <p className="text-[#6b4c30]">
          Don’t leave this moment behind.
        </p>

        <Link
          href="/youth-corner"
          className="bg-[#3a1e01] text-white px-6 py-3 rounded-full"
        >
          Finish →
        </Link>

      </div>
    </div>
  )
}