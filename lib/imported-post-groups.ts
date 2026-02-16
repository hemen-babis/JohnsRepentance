export type ImportedPostMeta = {
  id: number
  type: "lesson" | "Q&A"
  title: string
  date: string
  tags: string[]
  excerpt: string
  contentPath: string
}

export type ImportedPostGroup<T extends ImportedPostMeta = ImportedPostMeta> = {
  key: string
  leadId: number
  date: string
  posts: T[]
  representative: T
}

const PART_MARKER_PATTERN = /\b(part\s*\d+|pt\.?\s*\d+|continued|continuation|cont(?:'|’)?d)\b/i
const CONTINUED_PREFIX_PATTERN = /^(continued|continuation|cont(?:'|’)?d)\b/i
const HASH_TAG_PATTERN = /#([\p{L}\p{N}_-]{2,40})/gu

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "answer",
  "about",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "how",
  "in",
  "is",
  "it",
  "lesson",
  "of",
  "on",
  "or",
  "our",
  "post",
  "question",
  "that",
  "the",
  "this",
  "to",
  "what",
  "why",
  "with",
])
const GENERIC_TOPIC_TAGS = new Set([
  "holy",
  "orthodox",
  "church",
  "lesson",
  "question",
  "answer",
  "part",
  "continued",
  "contd",
  "great",
  "faith",
  "christ",
  "jesus",
])

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[#*_`]/g, " ")
    .replace(/[“”"':;,.!?()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim()

const cleanTopicTokens = (value: string) =>
  normalize(value)
    .replace(/^(about|the)\s+/i, "")
    .replace(/^(continued|continuation|cont(?:'|’)?d)\s*/i, "")
    .replace(/\b(part\s*\d+|pt\.?\s*\d+)\b/gi, " ")
    .split(" ")
    .map((word) => word.replace(/[^a-z0-9]/g, ""))
    .filter((word) => word.length >= 3 && !STOP_WORDS.has(word))

export const hasPartMarker = (post: Pick<ImportedPostMeta, "title" | "excerpt">) =>
  PART_MARKER_PATTERN.test(`${post.title} ${post.excerpt}`)

const isContinuedPrefix = (post: Pick<ImportedPostMeta, "title" | "excerpt">) =>
  CONTINUED_PREFIX_PATTERN.test(normalize(`${post.title} ${post.excerpt}`))

const baseTopicKey = (post: Pick<ImportedPostMeta, "title" | "excerpt" | "tags">) => {
  const titleTokens = cleanTopicTokens(post.title)
  if (titleTokens.includes("holy") && titleTokens.includes("communion")) return "holy-communion"
  if (titleTokens.includes("holy") && titleTokens.includes("eucharist")) return "holy-eucharist"
  if (titleTokens.length >= 2) return titleTokens.slice(0, 4).join("-")

  const hashTags = [...`${post.title} ${post.excerpt}`.matchAll(HASH_TAG_PATTERN)]
    .map((match) => normalize(match[1]))
    .filter((tag) => tag && !GENERIC_TOPIC_TAGS.has(tag))
  if (hashTags.length > 0) return hashTags.slice(0, 3).join("-")

  const tagTokens = post.tags
    .map((tag) => normalize(tag))
    .filter((tag) => tag && !GENERIC_TOPIC_TAGS.has(tag) && !/^\d+$/.test(tag))
  if (tagTokens.length > 0) return tagTokens.slice(0, 3).join("-")

  const excerptTokens = cleanTopicTokens(post.excerpt)
  if (excerptTokens.includes("holy") && excerptTokens.includes("communion")) return "holy-communion"
  if (excerptTokens.includes("holy") && excerptTokens.includes("eucharist")) return "holy-eucharist"
  if (excerptTokens.length >= 2) return excerptTokens.slice(0, 4).join("-")

  return ""
}

const compareByDateAsc = (a: ImportedPostMeta, b: ImportedPostMeta) => +new Date(a.date) - +new Date(b.date)
const compareByDateDesc = (a: ImportedPostMeta, b: ImportedPostMeta) => +new Date(b.date) - +new Date(a.date)
const dayDiff = (left: string, right: string) => Math.abs(+new Date(left) - +new Date(right)) / (1000 * 60 * 60 * 24)

export function groupImportedPosts<T extends ImportedPostMeta>(posts: T[]) {
  const sorted = [...posts].sort(compareByDateAsc)

  type WorkingGroup = {
    key: string
    topic: string
    posts: T[]
    hasPart: boolean
  }

  const groups: WorkingGroup[] = []

  for (const post of sorted) {
    const topic = baseTopicKey(post)
    const currentHasPart = hasPartMarker(post)
    const currentIsContinued = isContinuedPrefix(post)
    const lastGroup = groups[groups.length - 1]

    if (!lastGroup) {
      groups.push({
        key: topic ? `${post.type}:${topic}` : `${post.type}:id-${post.id}`,
        topic,
        posts: [post],
        hasPart: currentHasPart,
      })
      continue
    }

    const lastPost = lastGroup.posts[lastGroup.posts.length - 1]
    const sameType = lastPost.type === post.type
    const sameTopic = topic !== "" && topic === lastGroup.topic
    const within45Days = dayDiff(post.date, lastPost.date) <= 45
    const withinOneDay = dayDiff(post.date, lastPost.date) <= 1

    const shouldAttachContinuation =
      sameType && currentIsContinued && ((sameTopic && within45Days) || withinOneDay)

    const shouldAttachMultipartSeries =
      sameType && sameTopic && within45Days && (currentHasPart || lastGroup.hasPart)

    if (shouldAttachContinuation || shouldAttachMultipartSeries) {
      lastGroup.posts.push(post)
      lastGroup.hasPart = lastGroup.hasPart || currentHasPart
      continue
    }

    groups.push({
      key: topic ? `${post.type}:${topic}` : `${post.type}:id-${post.id}`,
      topic,
      posts: [post],
      hasPart: currentHasPart,
    })
  }

  const grouped: ImportedPostGroup<T>[] = []

  for (const group of groups) {
    const sortedBucket = [...group.posts].sort(compareByDateAsc)
    const multipart = sortedBucket.length > 1

    if (!multipart) {
      for (const post of sortedBucket) {
        grouped.push({
          key: `${group.key}:single:${post.id}`,
          leadId: post.id,
          date: post.date,
          posts: [post],
          representative: post,
        })
      }
      continue
    }

    const lead = [...sortedBucket].sort(compareByDateDesc)[0]
    const representative =
      sortedBucket.find((post) => !isContinuedPrefix(post) && !hasPartMarker(post)) ??
      sortedBucket.find((post) => !isContinuedPrefix(post)) ??
      lead

    grouped.push({
      key: group.key,
      leadId: lead.id,
      date: lead.date,
      posts: sortedBucket,
      representative,
    })
  }

  return grouped.sort((a, b) => +new Date(b.date) - +new Date(a.date))
}
