import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, BookOpen, Layers } from "lucide-react"

import { libraryResources } from "../../library-data"
import { getResourceHref, SERIES_DEFS, sortSeriesVolumes } from "../../library-utils"

type SeriesPageProps = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return SERIES_DEFS.map((series) => ({ id: series.id }))
}

export async function generateMetadata({ params }: SeriesPageProps) {
  const { id } = await params
  const series = SERIES_DEFS.find((item) => item.id === id)
  if (!series) return { title: "Library Series" }
  return {
    title: `${series.title} | Library Series`,
    description: series.subtitle,
  }
}

export default async function LibrarySeriesPage({ params }: SeriesPageProps) {
  const { id } = await params
  const series = SERIES_DEFS.find((item) => item.id === id)
  if (!series) notFound()

  const volumes = sortSeriesVolumes(libraryResources.filter((resource) => series.matches(resource)))
  if (volumes.length === 0) notFound()

  const first = volumes[0]
  const topics = Array.from(new Set(volumes.flatMap((resource) => resource.topics))).slice(0, 10)

  return (
    <main className="light-mode-adaptive-page min-h-screen bg-[url('/images/mobile-parch.png?v=20260321')] bg-cover bg-center bg-repeat px-4 py-6 text-stone-900 dark:bg-none dark:bg-gradient-to-b dark:from-[#120d09] dark:via-[#1e1208] dark:to-[#140d09] dark:text-white md:bg-[url('/images/parchment-bg.png?v=20260321')] md:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/library"
          className="jr-badge mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/82 px-4 py-2 text-[11px] font-black text-stone-800 shadow-sm transition hover:border-orange-300 hover:text-orange-800 dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Library
        </Link>

        <section className="overflow-hidden rounded-3xl border border-amber-200/70 bg-white/88 shadow-xl shadow-stone-900/5 dark:border-stone-800 dark:bg-stone-900/84">
          <div className="relative bg-[#1a0c05] p-6 text-white md:p-10">
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,.13)_1px,transparent_1px)] [background-size:28px_28px]" />
            <div className="relative">
              <p className="jr-badge inline-flex items-center gap-2 rounded-full bg-orange-600 px-3 py-1 text-[10px] font-black text-white">
                <Layers className="h-3.5 w-3.5" />
                Series · {volumes.length} books
              </p>
              <h1 className="jr-display mt-4 text-5xl font-black leading-none md:text-7xl">{series.title}</h1>
              <p className="mt-4 max-w-2xl text-base font-medium leading-8 text-stone-200">{series.subtitle}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {series.aliases.map((alias) => (
                  <span key={alias} className="jr-badge rounded-full bg-white/10 px-3 py-1 text-[10px] font-black text-orange-100 ring-1 ring-white/10">
                    {alias}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-5 md:grid-cols-[1fr_280px] md:p-7">
            <div>
              <div className="mb-4 rounded-2xl border border-orange-200 bg-orange-50/80 p-4 dark:border-orange-900/50 dark:bg-orange-950/30">
                <p className="jr-kicker text-[10px] font-black text-orange-700 dark:text-orange-300">Recommended starting point</p>
                <Link href={getResourceHref(first)} className="group mt-2 flex items-center justify-between gap-4">
                  <span>
                    <span className="jr-card-title block text-xl font-black text-stone-950 group-hover:text-orange-800 dark:text-white dark:group-hover:text-orange-300">{first.title}</span>
                    {first.aliases?.[0] && <span className="mt-1 block text-sm italic text-stone-500">{first.aliases[0]}</span>}
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-orange-700 transition group-hover:translate-x-1 dark:text-orange-300" />
                </Link>
              </div>

              <div className="space-y-3">
                {volumes.map((resource, index) => (
                  <Link
                    key={resource.id}
                    href={getResourceHref(resource)}
                    className="group flex items-center gap-4 rounded-2xl border border-amber-200/80 bg-white/84 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:bg-amber-50 dark:border-stone-800 dark:bg-stone-950/46 dark:hover:border-orange-800/70"
                  >
                    <span className="jr-badge flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-600 text-sm font-black text-white shadow">
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="jr-card-title line-clamp-2 text-lg font-black leading-tight text-stone-950 group-hover:text-orange-800 dark:text-white dark:group-hover:text-orange-300">{resource.title}</span>
                      {resource.aliases?.[0] && <span className="mt-1 block truncate text-sm italic text-stone-500">{resource.aliases[0]}</span>}
                    </span>
                    <span className="jr-badge rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-black text-orange-800 dark:bg-orange-950/60 dark:text-orange-300">{resource.type}</span>
                  </Link>
                ))}
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-2xl border border-amber-200/70 bg-amber-50/70 p-4 dark:border-stone-800 dark:bg-stone-950/40">
                <BookOpen className="h-6 w-6 text-orange-700 dark:text-orange-300" />
                <p className="jr-kicker mt-4 text-[10px] font-black text-stone-500">Series contents</p>
                <p className="mt-1 text-3xl font-black text-stone-950 dark:text-white">{volumes.length}</p>
                <p className="text-sm font-semibold text-stone-600 dark:text-stone-400">ordered resources</p>
              </div>
              <div className="rounded-2xl border border-amber-200/70 bg-white/80 p-4 dark:border-stone-800 dark:bg-stone-950/40">
                <p className="jr-kicker text-[10px] font-black text-stone-500">Related topics</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <Link key={topic} href={`/library?q=${encodeURIComponent(topic)}`} className="jr-badge rounded-full bg-orange-100 px-2.5 py-1 text-[9px] font-black text-orange-800 dark:bg-orange-950/60 dark:text-orange-300">
                      {topic}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  )
}
