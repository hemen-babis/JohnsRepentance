import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, BookOpen, Layers } from "lucide-react"

import { libraryResources } from "../../library-data"
import { getResourceHref, sourceSlug, sortResources } from "../../library-utils"

type AuthorPageProps = {
  params: Promise<{ slug: string }>
}

function sourceGroups() {
  const groups = new Map<string, { source: string; slug: string; resources: typeof libraryResources }>()
  for (const resource of libraryResources) {
    const slug = sourceSlug(resource)
    const group = groups.get(slug) ?? { source: resource.source, slug, resources: [] }
    group.resources.push(resource)
    groups.set(slug, group)
  }
  return Array.from(groups.values()).sort((a, b) => b.resources.length - a.resources.length)
}

export async function generateStaticParams() {
  return sourceGroups().map((group) => ({ slug: group.slug }))
}

export async function generateMetadata({ params }: AuthorPageProps) {
  const { slug } = await params
  const group = sourceGroups().find((item) => item.slug === slug)
  if (!group) return { title: "Library Source" }
  return {
    title: `${group.source} | Library`,
    description: `Resources in the library from ${group.source}.`,
  }
}

export default async function LibraryAuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const group = sourceGroups().find((item) => item.slug === slug)
  if (!group) notFound()

  const resources = sortResources(group.resources)
  const byType = resources.reduce<Record<string, number>>((acc, resource) => {
    acc[resource.type] = (acc[resource.type] ?? 0) + 1
    return acc
  }, {})
  const topics = Array.from(new Set(resources.flatMap((resource) => resource.topics))).slice(0, 14)

  return (
    <main className="light-mode-adaptive-page min-h-screen bg-[url('/images/mobile-parch.png?v=20260321')] bg-cover bg-center bg-repeat px-4 py-6 text-stone-900 dark:bg-none dark:bg-gradient-to-b dark:from-[#120d09] dark:via-[#1e1208] dark:to-[#140d09] dark:text-white md:bg-[url('/images/parchment-bg.png?v=20260321')] md:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/library"
          className="jr-badge mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/82 px-4 py-2 text-[11px] font-black text-stone-800 shadow-sm transition hover:border-orange-300 hover:text-orange-800 dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Library
        </Link>

        <section className="mb-8 rounded-3xl border border-amber-200/70 bg-white/88 p-6 shadow-xl shadow-stone-900/5 dark:border-stone-800 dark:bg-stone-900/84 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="jr-kicker text-[10px] font-black text-orange-600 dark:text-orange-500">Author / Source</p>
              <h1 className="jr-display mt-2 text-5xl font-black leading-none text-stone-950 dark:text-white md:text-7xl">{group.source}</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 dark:text-stone-300">
                All visible library resources currently attributed to this author, publisher, channel, or source.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:flex">
              <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 dark:border-stone-800 dark:bg-stone-950/40">
                <Layers className="h-5 w-5 text-orange-700 dark:text-orange-300" />
                <p className="mt-2 text-3xl font-black text-stone-950 dark:text-white">{resources.length}</p>
                <p className="jr-kicker text-[9px] font-black text-stone-500">Resources</p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 dark:border-stone-800 dark:bg-stone-950/40">
                <BookOpen className="h-5 w-5 text-orange-700 dark:text-orange-300" />
                <p className="mt-2 text-3xl font-black text-stone-950 dark:text-white">{Object.keys(byType).length}</p>
                <p className="jr-kicker text-[9px] font-black text-stone-500">Formats</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {Object.entries(byType).map(([type, count]) => (
              <span key={type} className="jr-badge rounded-full bg-orange-100 px-3 py-1 text-[10px] font-black text-orange-800 dark:bg-orange-950/60 dark:text-orange-300">
                {type} · {count}
              </span>
            ))}
          </div>
        </section>

        {topics.length > 0 && (
          <section className="mb-8 rounded-2xl border border-amber-200/70 bg-white/76 p-4 dark:border-stone-800 dark:bg-stone-900/60">
            <p className="jr-kicker text-[10px] font-black text-stone-500">Common topics</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {topics.map((topic) => (
                <Link key={topic} href={`/library?q=${encodeURIComponent(topic)}`} className="jr-badge rounded-full border border-stone-200 bg-white/80 px-3 py-1 text-[10px] font-black text-stone-700 transition hover:border-orange-300 hover:text-orange-800 dark:border-stone-800 dark:bg-stone-950/40 dark:text-stone-300">
                  {topic}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {resources.map((resource) => (
            <Link
              key={resource.id}
              href={getResourceHref(resource)}
              className="group flex min-h-[148px] flex-col justify-between rounded-2xl border border-amber-200/70 bg-white/84 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:bg-amber-50 dark:border-stone-800 dark:bg-stone-900/82 dark:hover:border-orange-800/70"
            >
              <span>
                <span className="jr-badge rounded-full bg-orange-100 px-2.5 py-1 text-[9px] font-black text-orange-800 dark:bg-orange-950/60 dark:text-orange-300">{resource.type}</span>
                <h2 className="jr-card-title mt-3 line-clamp-3 text-lg font-black leading-tight text-stone-950 group-hover:text-orange-800 dark:text-white dark:group-hover:text-orange-300">{resource.title}</h2>
                {resource.aliases?.[0] && <span className="mt-1 block truncate text-xs italic text-stone-500">{resource.aliases[0]}</span>}
              </span>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-black text-orange-700 dark:text-orange-300">
                Open resource
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  )
}
