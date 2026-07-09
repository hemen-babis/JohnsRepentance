import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CompletionNote, TeachingsShell } from "@/components/teachings/teaching-platform"
import { getImportedLessonGroupById, getImportedPostBody } from "@/lib/imported-posts"
import { getTeachingBySlug } from "@/lib/teaching-platform"
import { splitTitleAndSubtitle } from "@/lib/teaching-title"

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function TeachingDetailPage({ params }: PageProps) {
  const { slug } = await params
  const teaching = getTeachingBySlug(slug)
  if (!teaching) notFound()

  const group = teaching.sourceId ? getImportedLessonGroupById(teaching.sourceId) : undefined
  const bodies = group
    ? await Promise.all(
        group.posts.map(async (post) => ({
          post,
          body: await getImportedPostBody(post),
        })),
      )
    : []

  return (
    <TeachingsShell>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-6 flex flex-wrap gap-2">
          <Badge className="bg-[#7f1d1d]">{teaching.format}</Badge>
          <Badge variant="outline">{teaching.level}</Badge>
          <Badge variant="outline">{teaching.subcategory}</Badge>
          <Badge variant="outline">{teaching.duration}</Badge>
        </div>
        <h1 className="text-4xl font-bold leading-tight text-stone-950 dark:text-white md:text-5xl">{teaching.title}</h1>
        <p className="mt-4 text-lg leading-8 text-stone-600 dark:text-stone-300">{teaching.description}</p>

        {typeof teaching.progress === "number" && (
          <div className="mt-6 rounded-lg border border-[#e2d0b5] bg-[#fffaf0] p-4 dark:border-orange-900/28 dark:bg-[#211710]">
            <div className="mb-2 flex justify-between text-sm text-stone-600 dark:text-stone-300">
              <span>{teaching.lessonIndex ?? "In progress"}</span>
              <span>{teaching.progress}% complete</span>
            </div>
            <Progress value={teaching.progress} className="h-2 bg-[#eadbc2]" />
          </div>
        )}

        <section className="mt-8 space-y-6">
          {bodies.length ? (
            bodies.map(({ post, body }, index) => {
              const title = splitTitleAndSubtitle(post.title)
              return (
                <article key={post.id} className="rounded-lg border border-[#e2d0b5] bg-[#fffaf0] p-6 shadow-sm dark:border-orange-900/28 dark:bg-[#211710]">
                  {bodies.length > 1 && (
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <Badge className="bg-[#8a5d1f]">Lesson {index + 1}</Badge>
                      <Badge variant="outline">{new Date(post.date).toLocaleDateString()}</Badge>
                    </div>
                  )}
                  {bodies.length > 1 && <h2 className="mb-4 text-2xl font-bold text-stone-950 dark:text-white">{title.title}</h2>}
                  <div className="whitespace-pre-wrap text-base leading-8 text-stone-800 dark:text-stone-200">{body}</div>
                </article>
              )
            })
          ) : (
            <article className="rounded-lg border border-[#e2d0b5] bg-[#fffaf0] p-6 leading-8 text-stone-800 dark:border-orange-900/28 dark:bg-[#211710] dark:text-stone-200">
              <p>This structured course introduces the topic, key ideas, reflection questions, and suggested next steps for continued study.</p>
              <h2 className="mt-6 text-2xl font-bold text-stone-950 dark:text-white">Key Ideas</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Begin with prayer and a quiet reading of the lesson.</li>
                <li>Notice how the teaching connects faith, worship, and daily repentance.</li>
                <li>Return to the path page when you are ready for the next lesson.</li>
              </ul>
            </article>
          )}
        </section>

        <section className="mt-8 rounded-lg border border-[#e2d0b5] bg-[#fffaf0] p-6 dark:border-orange-900/28 dark:bg-[#211710]">
          <h2 className="text-2xl font-bold text-stone-950 dark:text-white">Reflection</h2>
          <p className="mt-3 leading-7 text-stone-700 dark:text-stone-300">What is one concrete way this teaching can shape your prayer, repentance, or service this week?</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button className="rounded-full bg-[#7f1d1d] text-[#fff7e6] hover:bg-[#991b1b]">Mark Complete</Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/teachings/all">Next Teaching</Link>
            </Button>
          </div>
        </section>

        {typeof teaching.progress === "number" && <div className="mt-6"><CompletionNote /></div>}
      </main>
    </TeachingsShell>
  )
}
