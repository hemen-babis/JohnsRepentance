"use client"

import { useState } from "react"
import Link from "next/link"
import { MessageCircleQuestion } from "lucide-react"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { guidedEntry } from "@/lib/youth-corner-data"

export default function GuidedPrayerPage() {
  const [completed, setCompleted] = useState(false)
  const [showNext, setShowNext] = useState(false)
  const [journal, setJournal] = useState("")
  const todayKey = new Date().toISOString().split("T")[0]
  const storageKey = `guided-prayer-${todayKey}-step2`

  useEffect(() => {
    const saved = localStorage.getItem(storageKey)

    if (saved) {
      const data = JSON.parse(saved)
      setCompleted(data.completed)
      setShowNext(data.showNext)
      setJournal(data.journal || "")
    }
  }, [storageKey])

  useEffect(() => {
    const saved = localStorage.getItem("guided-prayer-step2")

    if (saved) {
      const data = JSON.parse(saved)
      setCompleted(data.completed)
      setShowNext(data.showNext)
      setJournal(data.journal || "")
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        completed,
        showNext,
        journal,
      })
    )
  }, [completed, showNext, journal, storageKey])

  return (
    <div className="min-h-screen bg-[url('/images/parchment-bg.png')] bg-cover px-4 py-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.25em] text-[#7a6437]">
            Step 2 — Read & Reflect
          </p>

          <h1 className="text-4xl font-bold text-[#3a1e01] mt-2">
            Pray with Scripture
          </h1>

          {/* 👇 ADD THIS HERE */}
          {completed && (
            <p className="mt-3 text-sm text-green-700">
              You’ve already completed this step today.
            </p>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          {/* LEFT SIDE */}
          <Card className="bg-[linear-gradient(135deg,#f97316,#fb8c1c,#f5b126)] text-white border-none">
            <CardHeader>
              <CardTitle className="text-3xl">
                {guidedEntry.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">

              {/* READ */}
              <div className="bg-white/10 p-5 rounded-2xl">
                <p className="text-xs uppercase tracking-widest">Read slowly</p>

                <p className="mt-2 text-xl font-semibold">
                  {guidedEntry.reference}
                </p>

                <p className="mt-4 text-sm leading-7 whitespace-pre-line">
                  {guidedEntry.reading}
                </p>
              </div>

              {/* REFLECT */}
              <div className="bg-white/10 p-5 rounded-2xl">
                <p className="text-xs uppercase tracking-widest">Reflect</p>
                <p className="mt-3 text-sm">{guidedEntry.reflection}</p>
              </div>

              {/* ACT */}
              <div className="bg-white/10 p-5 rounded-2xl">
                <p className="text-xs uppercase tracking-widest">Act</p>
                <p className="mt-3 text-sm">{guidedEntry.action}</p>
              </div>

              {/* PRAY */}
              <div className="bg-white/10 p-5 rounded-2xl">
                <p className="text-xs uppercase tracking-widest">Pray</p>
                <p className="mt-3 text-sm">{guidedEntry.prayer}</p>
              </div>

              {/* COMPLETE */}
              <Button
                onClick={() => setCompleted(true)}
                className="w-full bg-white text-[#a65d1a]"
              >
                {completed ? "Completed ✓" : "Mark complete"}
              </Button>

            </CardContent>
          </Card>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            {/* JOURNAL */}
            <Card className="bg-white/95 border-[#e6d3b3]">
              <CardHeader>
                <CardTitle>Write honestly</CardTitle>
              </CardHeader>

              <CardContent>
                <textarea
                  value={journal}
                  onChange={(e) => setJournal(e.target.value)}
                  className="w-full min-h-[120px] border rounded-xl p-3"
                  placeholder="Write honestly..."
                />
                <div className="mt-4 text-xs text-[#6b4c30]">
                  {journal && "Saved for today ✓"}
                </div>
              </CardContent>
            </Card>

            {/* HELP */}
            <Card className="bg-white/95">
              <CardContent className="p-5">
                <p className="font-semibold">Stuck right now?</p>

                <Button asChild className="mt-4 w-full bg-[#3a1e01] text-white">
                  <Link href="/qa">
                    Ask a Question
                    <MessageCircleQuestion className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* CONTINUE */}
            <Card className="bg-white/95">
              <CardContent className="p-5 space-y-4">

                <Button
                  disabled={!completed}
                  onClick={() => setShowNext(true)}
                  className="w-full bg-[#a65d1a] text-white disabled:opacity-50"
                >
                  Continue →
                </Button>

                {showNext && (
                  <div className="bg-[#f5eddc] p-4 rounded-xl">
                    <p className="font-semibold">
                      Stay here for a moment.
                    </p>

                    <Link
                      href="/youth-corner/guided-prayer/respond"
                      className="text-sm underline text-[#a65d1a]"
                    >
                      Go deeper →
                    </Link>
                  </div>
                )}

              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}