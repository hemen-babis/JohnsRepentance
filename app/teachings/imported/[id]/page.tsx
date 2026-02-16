import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GeezHeading } from "@/components/geez-heading"
import { getImportedPostBody, getImportedLessonGroupById } from "@/lib/imported-posts"
import { splitTitleAndSubtitle } from "@/lib/teaching-title"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function ImportedTeachingPage({ params }: PageProps) {
  const { id } = await params
  const postId = Number(id)
  const group = Number.isFinite(postId) ? getImportedLessonGroupById(postId) : undefined
  if (!group) notFound()

  const bodies = await Promise.all(
    group.posts.map(async (post) => ({
      post,
      body: await getImportedPostBody(post),
    })),
  )
  const headingPost = group.representative
  const isSeries = bodies.length > 1
  const combinedTags = Array.from(new Set(group.posts.flatMap((post) => post.tags)))
  const headingTitleText = headingPost.title || "Orthodox Spiritual Teaching for Faithful Christian Life"
  const heading = splitTitleAndSubtitle(headingTitleText)

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/90 via-orange-50/40 to-amber-50/80 dark:from-stone-950 dark:via-orange-950/20 dark:to-stone-950">
      <section className="py-14 border-b border-amber-200/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <GeezHeading className="mb-3 text-orange-700 dark:text-amber-400">ትምህርት</GeezHeading>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-orange-600">Lesson</Badge>
            <Badge variant="outline">{new Date(group.date).toLocaleDateString()}</Badge>
            {isSeries && <Badge variant="outline">{bodies.length} posts</Badge>}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">{heading.title}</h1>
          {heading.subtitle && <h2 className="mt-3 text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-200">{heading.subtitle}</h2>}
          <div className="flex flex-wrap gap-2 mt-5">
            {combinedTags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {bodies.map(({ post, body }, idx) => {
              const splitPostTitle = splitTitleAndSubtitle(post.title)
              return (
                <article
                  key={post.id}
                  className="bg-white/90 dark:bg-stone-900/70 border border-amber-200/60 rounded-2xl p-6 md:p-8 shadow-lg"
                >
                  {isSeries && (
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <Badge className="bg-amber-600">{`Post ${idx + 1}`}</Badge>
                      <Badge variant="outline">{new Date(post.date).toLocaleDateString()}</Badge>
                    </div>
                  )}
                  {isSeries && (
                    <>
                      <h2 className="text-xl md:text-2xl font-semibold mb-1 text-gray-900 dark:text-white">{splitPostTitle.title}</h2>
                      {splitPostTitle.subtitle && (
                        <h3 className="text-sm md:text-base font-medium mb-4 text-gray-700 dark:text-gray-300">{splitPostTitle.subtitle}</h3>
                      )}
                    </>
                  )}
                  <div className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-8">{body}</div>
                </article>
              )
            })}
          </div>
          <div className="mt-6">
            <Button asChild className="bg-gradient-to-r from-orange-600 to-amber-500">
              <Link href="/teachings">Back to Teachings</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
