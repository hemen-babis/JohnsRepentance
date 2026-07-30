"use client"

import { useState } from "react"
import { PlayCircle, X } from "lucide-react"
import { videoItems, type VideoCategory, getYouTubeThumbnail } from "@/lib/youth-corner-data"

const serif = "'Iowan Old Style', 'Palatino Linotype', Georgia, serif"

const CATEGORIES: VideoCategory[] = ["Featured Teachings", "Prayer & Meditation", "Church Life & Youth Witness"]

export default function YouthCornerShortsPage() {
  const [activeCategory, setActiveCategory] = useState<VideoCategory>("Featured Teachings")
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = videoItems.filter((v) => v.category === activeCategory)
  const selected = videoItems.find((v) => v.id === selectedId) ?? null

  return (
    <div className="min-h-screen text-stone-900 dark:text-white">

      {/* Hero */}
      <div
        className="relative overflow-hidden px-5 pt-10 pb-10"
        style={{ background: "linear-gradient(160deg, #1c0700 0%, #3d1205 50%, #0a1e12 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] bg-[length:auto_48px] opacity-[0.06]" />
        <div className="relative">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-amber-400/70 mb-3">Youth Corner</p>
          <h1 className="text-4xl font-black text-white leading-tight" style={{ fontFamily: serif }}>Spiritual Shorts</h1>
          <p className="mt-3 text-sm text-white/55">Short, focused teachings to strengthen your walk.</p>
        </div>

        {/* Category tabs */}
        <div className="mt-6 flex gap-2.5 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-[#c86224] to-[#e2a13c] text-white shadow-[0_6px_18px_-6px_rgba(200,98,36,0.5)]"
                  : "border border-white/15 bg-white/8 text-white/70 hover:bg-white/14 backdrop-blur-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-5 py-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => setSelectedId(video.id)}
              className="group text-left"
            >
              <div className="overflow-hidden rounded-[1.25rem] border border-stone-200/80 bg-white shadow-[0_4px_20px_-8px_rgba(0,0,0,0.1)] dark:border-stone-800 dark:bg-stone-900 transition hover:-translate-y-1 hover:shadow-[0_12px_32px_-10px_rgba(0,0,0,0.18)]">
                {/* Thumbnail */}
                <div className="relative aspect-[9/16] overflow-hidden bg-stone-900">
                  <img
                    src={getYouTubeThumbnail(video.youtubeId)}
                    alt={video.title}
                    className="h-full w-full object-cover transition group-hover:scale-105 duration-300"
                    loading="lazy"
                    onError={(e) => {
                      const t = e.currentTarget
                      if (t.src.includes("maxresdefault")) t.src = `https://i.ytimg.com/vi/${video.youtubeId}/sddefault.jpg`
                      else if (t.src.includes("sddefault")) t.src = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`
                    }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
                      <PlayCircle className="h-7 w-7 text-[#c86224]" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {video.duration}
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-xs font-bold text-stone-900 dark:text-white line-clamp-2 leading-4">{video.title}</p>
                  <p className="mt-1 text-[10px] text-stone-400 dark:text-stone-500 truncate">{video.speaker}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Video modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedId(null)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-sm overflow-hidden rounded-[2rem] bg-white dark:bg-stone-900 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.6)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video */}
            <div className="aspect-[9/16] w-full overflow-hidden rounded-t-[2rem] bg-black">
              <iframe
                title={selected.title}
                src={`https://www.youtube-nocookie.com/embed/${selected.youtubeId}?autoplay=1`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Info */}
            <div className="p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-orange-600 dark:text-amber-400 mb-1">{selected.category}</p>
              <h2 className="text-base font-black text-stone-900 dark:text-white leading-tight">{selected.title}</h2>
              <p className="mt-1 text-xs text-stone-400 dark:text-stone-500">{selected.speaker}</p>
              <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300">{selected.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
