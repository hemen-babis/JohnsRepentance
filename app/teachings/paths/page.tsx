import { PathCard, TeachingsShell } from "@/components/teachings/teaching-platform"
import { learningPaths } from "@/lib/teaching-platform"

const groups = ["Beginner Foundations", "Spiritual Growth", "Scripture", "Worship and Sacraments", "Feasts and Saints", "Church History", "Servant and Deacon Formation"]

export default function LearningPathsPage() {
  return (
    <TeachingsShell>
      <section className="mx-auto max-w-7xl px-4 py-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a5d1f] dark:text-amber-300">Organized courses</p>
        <h1 className="mt-2 text-4xl font-bold text-stone-950 dark:text-white">Learning Paths</h1>
        <p className="mt-3 max-w-3xl text-stone-600 dark:text-stone-300">
          Study in a clear order with units, lessons, objectives, and gentle progress tracking.
        </p>
      </section>
      <div className="mx-auto max-w-7xl space-y-10 px-4 pb-12">
        {groups.map((group) => {
          const paths = learningPaths.filter((path) => path.group === group)
          if (!paths.length) return null
          return (
            <section key={group}>
              <h2 className="mb-4 text-2xl font-bold text-stone-950 dark:text-white">{group}</h2>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {paths.map((path) => (
                  <PathCard key={path.slug} path={path} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </TeachingsShell>
  )
}
