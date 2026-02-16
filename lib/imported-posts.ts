import { promises as fs } from "fs"
import path from "path"
import posts from "@/content/telegram/index.json"
import { groupImportedPosts } from "@/lib/imported-post-groups"

export type ImportedPost = {
  id: number
  from: string
  type: "lesson" | "Q&A"
  title: string
  date: string
  tags: string[]
  isSaint: boolean
  excerpt: string
  contentPath: string
}

const importedPosts = posts as ImportedPost[]

export function getImportedPostById(id: number) {
  return importedPosts.find((post) => post.id === id)
}

export function getImportedLessonGroupById(id: number) {
  const lessonGroups = groupImportedPosts(importedPosts.filter((post) => post.type === "lesson"))
  return lessonGroups.find((group) => group.posts.some((post) => post.id === id))
}

export async function getImportedPostBody(post: ImportedPost) {
  const localPath = path.join(process.cwd(), "public", post.contentPath.replace(/^\//, ""))
  const raw = await fs.readFile(localPath, "utf8")
  return raw.replace(/^---[\s\S]*?\n---\n?/, "").trim()
}
