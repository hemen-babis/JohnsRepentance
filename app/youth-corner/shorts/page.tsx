"use client"

import { useState } from "react"
import { PlayCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { videoItems, type VideoCategory, getYouTubeThumbnail } from "@/lib/youth-corner-data"

export default function YouthCornerShortsPage() {
  const [activeVideoCategory, setActiveVideoCategory] = useState<VideoCategory>("Featured Teachings")
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null)
  const filteredVideos = videoItems.filter((video) => video.category === activeVideoCategory)
  const selectedVideo = videoItems.find((video) => video.id === selectedVideoId) ?? null

  return (
    <div className="light-mode-adaptive-page youth-corner-root min-h-screen bg-[url('/images/mobile-parch.png?v=20260321')] bg-[length:auto_100%] bg-top bg-repeat-x text-stone-900 md:bg-[url('/images/parchment-bg.png?v=20260321')] md:bg-[length:auto_1400px] md:bg-top md:bg-repeat dark:bg-none dark:bg-gradient-to-b dark:from-[#120d09] dark:via-[#24140d] dark:to-[#140d09]">
      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7a6437]">Youth Corner</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-[#3d2206] dark:text-white md:text-5xl">Spiritual shorts</h1>
          <p className="mt-3 text-sm font-medium text-[#c76618]">Scroll left and right to browse the shorts.</p>
        </div>
        <div className="mb-5 flex flex-wrap gap-3">
          {(["Featured Teachings", "Prayer & Meditation", "Church Life & Youth Witness"] as VideoCategory[]).map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveVideoCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                activeVideoCategory === category
                  ? "bg-gradient-to-r from-[#f97316] to-[#f59e0b] text-white"
                  : "bg-white text-stone-700 ring-1 ring-[#dbc9a7] hover:bg-[#faf2e2]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="-mx-4 overflow-x-auto px-4 pb-4">
          <div className="flex min-w-max snap-x snap-mandatory gap-4">
            {filteredVideos.map((video) => (
              <button
                key={video.id}
                type="button"
                onClick={() => setSelectedVideoId(video.id)}
                className="group w-[240px] shrink-0 snap-start text-left sm:w-[260px] lg:w-[280px]"
              >
                <div className="overflow-hidden rounded-[22px] bg-white ring-1 ring-[#dcc8a2] transition-transform duration-200 group-hover:-translate-y-1">
                  <div className="relative aspect-[9/16] overflow-hidden bg-stone-900">
                    <img
                      src={getYouTubeThumbnail(video.youtubeId)}
                      alt={video.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={(event) => {
                        const target = event.currentTarget
                        if (target.src.includes("maxresdefault.jpg")) {
                          target.src = `https://i.ytimg.com/vi/${video.youtubeId}/sddefault.jpg`
                          return
                        }
                        if (target.src.includes("sddefault.jpg")) {
                          target.src = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />
                    <div className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Short</div>
                    <div className="absolute bottom-3 right-3 rounded-full bg-white/90 p-2 text-[#c76618]">
                      <PlayCircle className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                <div className="px-1 pb-1 pt-3">
                  <p className="line-clamp-2 text-base font-black leading-6 text-stone-950">{video.title}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-5 text-stone-600">{video.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        <Dialog open={selectedVideo !== null} onOpenChange={(open) => !open && setSelectedVideoId(null)}>
          <DialogContent className="max-w-md border-[#d8c395] bg-[#fffaf0] p-4 sm:p-5">
            {selectedVideo ? (
              <>
                <DialogHeader className="pr-8">
                  <DialogTitle className="text-xl text-stone-950">{selectedVideo.title}</DialogTitle>
                  <DialogDescription className="text-stone-600">
                    {selectedVideo.speaker} • {selectedVideo.category}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-[24px] bg-stone-950">
                    <div className="aspect-[9/16]">
                      <iframe
                        title={selectedVideo.title}
                        src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}`}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  </div>
                  <div className="rounded-3xl bg-[#f5eddc] p-4">
                    <p className="text-sm font-semibold text-stone-900">{selectedVideo.description}</p>
                  </div>
                  <Badge className="rounded-full bg-gradient-to-r from-[#f97316] to-[#f59e0b] text-white hover:brightness-105">{selectedVideo.duration}</Badge>
                </div>
              </>
            ) : null}
          </DialogContent>
        </Dialog>
      </section>
    </div>
  )
}
