import { EmptyLearningState, PathCard, TeachingCard, TeachingsShell } from "@/components/teachings/teaching-platform"
import { getTeachings, learningPaths } from "@/lib/teaching-platform"

export default function MyLearningPage() {
  const inProgress = getTeachings().filter((teaching) => typeof teaching.progress === "number").slice(0, 12)
  const activePaths = learningPaths.filter((path) => path.progress > 0)

  return (
    <TeachingsShell>
      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-4xl font-bold text-stone-950 dark:text-white">My Learning</h1>
        <p className="mt-3 max-w-3xl text-stone-600 dark:text-stone-300">Resume lessons and continue the paths you have started.</p>
        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-bold text-stone-950 dark:text-white">Active Paths</h2>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {activePaths.map((path) => (
              <PathCard key={path.slug} path={path} />
            ))}
          </div>
        </section>
        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-bold text-stone-950 dark:text-white">Lessons in Progress</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {inProgress.map((teaching) => (
              <TeachingCard key={teaching.id} teaching={teaching} compact />
            ))}
          </div>
          {!inProgress.length && <EmptyLearningState title="No lessons started" description="Begin a path or open a teaching to start tracking progress." />}
        </section>
      </main>
    </TeachingsShell>
  )
}
