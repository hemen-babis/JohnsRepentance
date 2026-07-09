import { EmptyLearningState, TeachingCard, TeachingsShell } from "@/components/teachings/teaching-platform"
import { getTeachings } from "@/lib/teaching-platform"

export default function SavedTeachingsPage() {
  const saved = getTeachings().filter((teaching) => teaching.saved).slice(0, 24)

  return (
    <TeachingsShell>
      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-4xl font-bold text-stone-950 dark:text-white">Saved Teachings</h1>
        <p className="mt-3 max-w-3xl text-stone-600 dark:text-stone-300">A quiet place for teachings you want to return to.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {saved.map((teaching) => (
            <TeachingCard key={teaching.id} teaching={teaching} compact />
          ))}
        </div>
        {!saved.length && <div className="mt-8"><EmptyLearningState title="No saved teachings yet" description="Save teachings as you browse so they are easy to revisit later." /></div>}
      </main>
    </TeachingsShell>
  )
}
