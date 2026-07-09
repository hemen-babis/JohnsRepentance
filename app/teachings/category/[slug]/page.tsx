import { notFound } from "next/navigation"
import { TeachingCard, TeachingsShell } from "@/components/teachings/teaching-platform"
import { getTeachings, slugify } from "@/lib/teaching-platform"

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function TeachingCategoryPage({ params }: PageProps) {
  const { slug } = await params
  const teachings = getTeachings()
  const matched = teachings.filter((teaching) => slugify(teaching.subcategory) === slug || slugify(teaching.category) === slug || slugify(teaching.season) === slug)
  if (!matched.length) notFound()
  const seasonMatch = matched.find((teaching) => slugify(teaching.season) === slug)
  const title = seasonMatch?.season ?? matched[0].subcategory

  return (
    <TeachingsShell>
      <main className="mx-auto max-w-7xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a5d1f] dark:text-amber-300">Category</p>
        <h1 className="mt-2 text-4xl font-bold text-stone-950 dark:text-white">{title}</h1>
        <p className="mt-3 text-stone-600 dark:text-stone-300">{matched.length} teachings in this collection.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {matched.slice(0, 72).map((teaching) => (
            <TeachingCard key={teaching.id} teaching={teaching} />
          ))}
        </div>
      </main>
    </TeachingsShell>
  )
}
