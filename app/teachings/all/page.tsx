import { BrowseAllTeachings } from "@/components/teachings/browse-all"
import { TeachingsShell } from "@/components/teachings/teaching-platform"
import { getTeachings } from "@/lib/teaching-platform"

export default function BrowseAllPage() {
  return (
    <TeachingsShell>
      <section className="mx-auto max-w-7xl px-4 pt-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a5d1f] dark:text-amber-300">Complete Library</p>
        <h1 className="mt-2 text-4xl font-bold text-stone-950 dark:text-white">Browse All Teachings</h1>
        <p className="mt-3 max-w-3xl text-stone-600 dark:text-stone-300">
          Search the full teaching archive by topic, level, audience, format, and liturgical season.
        </p>
      </section>
      <BrowseAllTeachings teachings={getTeachings()} />
    </TeachingsShell>
  )
}
