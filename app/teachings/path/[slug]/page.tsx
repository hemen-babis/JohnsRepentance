import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CompletionNote, TeachingCard, TeachingsShell } from "@/components/teachings/teaching-platform"
import { getPathBySlug, getTeachings } from "@/lib/teaching-platform"

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function LearningPathDetailPage({ params }: PageProps) {
  const { slug } = await params
  const path = getPathBySlug(slug)
  if (!path) notFound()
  const teachings = getTeachings()
  const lessons = Array.from(
    new Map(
      teachings
        .filter((teaching) => path.lessonIds.includes(teaching.id))
        .concat(teachings.filter((teaching) => teaching.category === "Worship and Sacraments").slice(0, 6))
        .map((teaching) => [teaching.id, teaching]),
    ).values(),
  )

  return (
    <TeachingsShell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-lg border border-[#e2d0b5] bg-[#fffaf0] p-6 dark:border-orange-900/28 dark:bg-[#211710]">
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-[#7f1d1d]">{path.level}</Badge>
            <Badge variant="outline">{path.units} units</Badge>
            <Badge variant="outline">{path.lessons} lessons</Badge>
            <Badge variant="outline">Approximately {path.duration}</Badge>
            <Badge variant="outline">English</Badge>
          </div>
          <h1 className="mt-5 text-4xl font-bold text-stone-950 dark:text-white">{path.title}</h1>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-stone-600 dark:text-stone-300">{path.description}</p>
          <div className="mt-6 max-w-xl">
            <div className="mb-2 flex justify-between text-sm text-stone-600 dark:text-stone-300">
              <span>{Math.round((path.progress / 100) * path.lessons)} of {path.lessons} lessons completed</span>
              <span>{path.progress}% complete</span>
            </div>
            <Progress value={path.progress} className="h-2 bg-[#eadbc2]" />
          </div>
          <Button asChild className="mt-6 rounded-full bg-[#7f1d1d] text-[#fff7e6] hover:bg-[#991b1b]">
            <Link href={lessons[0]?.href ?? "/teachings/all"}>{path.progress > 0 ? "Continue Path" : "Start Path"}</Link>
          </Button>
        </div>

        <section className="mt-8 rounded-lg border border-[#e2d0b5] bg-[#fffaf0] p-6 dark:border-orange-900/28 dark:bg-[#211710]">
          <h2 className="text-2xl font-bold text-stone-950 dark:text-white">Learning Objectives</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-3">
            {path.objectives.map((objective) => (
              <li key={objective} className="rounded-md bg-white p-4 text-sm text-stone-700 dark:bg-white/5 dark:text-stone-200">{objective}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-bold text-stone-950 dark:text-white">Units</h2>
          <div className="space-y-5">
            {["Preparing the Heart", "Inside the Teaching", "Living the Lesson"].map((unit, unitIndex) => (
              <div key={unit} className="rounded-lg border border-[#e2d0b5] bg-[#fffaf0] p-5 dark:border-orange-900/28 dark:bg-[#211710]">
                <h3 className="text-xl font-bold text-stone-950 dark:text-white">Unit {unitIndex + 1} — {unit}</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {lessons.slice(unitIndex * 2, unitIndex * 2 + 2).map((teaching) => (
                    <TeachingCard key={`${unit}-${teaching.id}`} teaching={teaching} compact />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {path.progress >= 40 && <div className="mt-8"><CompletionNote /></div>}
      </main>
    </TeachingsShell>
  )
}
