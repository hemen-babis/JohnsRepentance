import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GeezHeading } from "@/components/geez-heading"
import { getImportedPostBody, getImportedPostById } from "@/lib/imported-posts"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function ImportedTeachingPage({ params }: PageProps) {
  const { id } = await params
  const postId = Number(id)
  const post = Number.isFinite(postId) ? getImportedPostById(postId) : undefined
  if (!post || post.type !== "lesson") notFound()

  const body = await getImportedPostBody(post)

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/90 via-orange-50/40 to-amber-50/80 dark:from-stone-950 dark:via-orange-950/20 dark:to-stone-950">
      <section className="py-14 border-b border-amber-200/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <GeezHeading className="mb-3 text-orange-700 dark:text-amber-400">ትምህርት</GeezHeading>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-orange-600">Lesson</Badge>
            <Badge variant="outline">{new Date(post.date).toLocaleDateString()}</Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">{post.title}</h1>
          <div className="flex flex-wrap gap-2 mt-5">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <article className="bg-white/90 dark:bg-stone-900/70 border border-amber-200/60 rounded-2xl p-6 md:p-8 shadow-lg">
            <div className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-8">{body}</div>
          </article>
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

