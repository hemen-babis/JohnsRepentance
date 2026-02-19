"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GeezHeading } from "@/components/geez-heading"
import { BookOpen, Download, ExternalLink, GraduationCap, Search } from "lucide-react"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const playlistId = "PLluUizhBpZV9aKPupYA5X_FMmzAD1UNR1"

export default function DeaconsCornerPage() {
  const [misbakQuery, setMisbakQuery] = useState("")
  const [misbakLoading, setMisbakLoading] = useState(false)
  const [selectedVideoId, setSelectedVideoId] = useState("GfBL_vM8eSM")
  const [misbakResults, setMisbakResults] = useState<Array<{ id: string; title: string; thumb: string }>>([])

  const searchMisbak = async () => {
    setMisbakLoading(true)
    try {
      const res = await fetch(`/api/youtube/playlist-search?q=${encodeURIComponent(misbakQuery)}`)
      const data = (await res.json()) as { items?: Array<{ id: string; title: string; thumb: string }> }
      const items = data.items ?? []
      setMisbakResults(items)
      if (items[0]) setSelectedVideoId(items[0].id)
    } catch {
      setMisbakResults([])
    } finally {
      setMisbakLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 py-14">
      <section className="container mx-auto px-4">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-10">
          <GeezHeading className="mb-3 text-amber-500">የዲያቆናት ማዕዘን</GeezHeading>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Deacon&apos;s Corner</h1>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <Tabs defaultValue="misbak" className="space-y-5">
            <TabsList className="grid grid-cols-2 w-full max-w-xl mx-auto">
              <TabsTrigger value="misbak"><BookOpen className="h-4 w-4 mr-1" />Misbak</TabsTrigger>
              <TabsTrigger value="abinet"><GraduationCap className="h-4 w-4 mr-1" />Abinet</TabsTrigger>
            </TabsList>

            <TabsContent value="misbak">
              <Card className="bg-gray-900 border-gray-700 text-white">
                <CardHeader>
                  <CardTitle>Misbak Resource Center</CardTitle>
                  <CardDescription>Search the YouTube playlist and play in-page.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        className="pl-9 bg-gray-950 border-gray-700"
                        value={misbakQuery}
                        onChange={(e) => setMisbakQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && searchMisbak()}
                        placeholder="Search Misbak in playlist..."
                      />
                    </div>
                    <Button onClick={searchMisbak}>Search</Button>
                  </div>

                  {misbakLoading && <p className="text-sm text-gray-400">Searching...</p>}

                  <div className="overflow-hidden rounded-lg border border-gray-700">
                    <div className="aspect-video w-full">
                      <iframe
                        className="h-full w-full"
                        src={`https://www.youtube.com/embed/${selectedVideoId}?list=${playlistId}`}
                        title="Misbak Playlist"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  </div>

                  {misbakResults.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-3">
                      {misbakResults.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedVideoId(item.id)}
                          className="text-left rounded-lg border border-gray-700 bg-gray-800 p-3 hover:bg-gray-700"
                        >
                          <div className="flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.thumb} alt={item.title} className="h-14 w-20 rounded object-cover" />
                            <p className="text-sm line-clamp-2">{item.title}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  <Button asChild variant="outline">
                    <a href={`https://www.youtube.com/watch?v=GfBL_vM8eSM&list=${playlistId}`} target="_blank" rel="noreferrer">
                      Open Playlist on YouTube
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="abinet">
              <Card className="bg-gray-900 border-gray-700 text-white">
                <CardHeader>
                  <CardTitle>Abinet Scholarship Hub</CardTitle>
                  <CardDescription>EatTheBook.org integration for serious traditional learning.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild>
                    <a href="https://www.eatthebook.org" target="_blank" rel="noreferrer">
                      Open EatTheBook.org
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="https://www.eatthebook.org" target="_blank" rel="noreferrer">
                      Download / Browse Texts
                      <Download className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
