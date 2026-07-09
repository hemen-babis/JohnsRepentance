import telegramPosts from "@/content/telegram/index.json"
import { groupImportedPosts } from "@/lib/imported-post-groups"
import { stripTeachingFiller, toNaturalTeachingTitle, toStandardShortTitle } from "@/lib/teaching-title"

type TelegramPost = {
  id: number
  type: "lesson" | "Q&A"
  title: string
  date: string
  tags: string[]
  excerpt: string
  contentPath: string
}

export type TeachingFormat = "Article" | "Video" | "Audio" | "PDF Guide" | "Series" | "Q&A"
export type TeachingLevel = "Beginner" | "Intermediate" | "Advanced" | "General" | "Academic"

export type Teaching = {
  id: number
  sourceId: number
  slug: string
  title: string
  description: string
  category: string
  subcategory: string
  format: TeachingFormat
  level: TeachingLevel
  audience: string
  season: string
  language: string
  duration: string
  image: string
  date: string
  tags: string[]
  href: string
  searchText: string
  featured?: boolean
  popular?: boolean
  saved?: boolean
  progress?: number
  lessonIndex?: string
}

export type LearningPath = {
  slug: string
  title: string
  description: string
  group: string
  level: TeachingLevel
  audience: string
  units: number
  lessons: number
  duration: string
  source: string
  image: string
  progress: number
  objectives: string[]
  lessonIds: number[]
}

const TOPIC_RULES: Array<{ category: string; subcategory: string; season?: string; pattern: RegExp }> = [
  { category: "Feasts and Liturgical Year", subcategory: "Great Lent", season: "Great Lent", pattern: /(great lent|abiy[e ]? tsom|lent|zewerede|metsague|mekurab|holy week|hosanna)/i },
  { category: "Theotokos, Saints and Angels", subcategory: "Theotokos", season: "Assumption Fast", pattern: /(mary|virgin|theotokos|mariam|zion|assumption|mother of god)/i },
  { category: "Theotokos, Saints and Angels", subcategory: "Saints", pattern: /(saint|st\.?|tekle|gabriel|michael|george|martyr|archangel|apostle)/i },
  { category: "Worship and Sacraments", subcategory: "Liturgy", pattern: /(liturgy|kidase|kidassie|qurbana|worship|incense|netela)/i },
  { category: "Worship and Sacraments", subcategory: "Sacraments", pattern: /(communion|eucharist|confession|repentance|sacrament|mysteries|baptism)/i },
  { category: "Spiritual Life", subcategory: "Prayer", pattern: /(prayer|pray|intercession|psalm|prostration)/i },
  { category: "Spiritual Life", subcategory: "Fasting", season: "Great Lent", pattern: /(fasting|fast|nineveh|prophets fast)/i },
  { category: "Holy Scripture", subcategory: "Bible Study", pattern: /(scripture|gospel|bible|john|matthew|psalm|epistle)/i },
  { category: "Church History and Tradition", subcategory: "Church History", pattern: /(history|fathers|synod|council|axum|patriarch|tradition|culture)/i },
]

export const teachingCategories = [
  "Faith and Theology",
  "Holy Scripture",
  "Worship and Sacraments",
  "Spiritual Life",
  "Feasts and Liturgical Year",
  "Theotokos, Saints and Angels",
  "Church History and Tradition",
]

export const teachingSubcategories = [
  "Great Lent",
  "Christian Living",
  "Theotokos",
  "Tradition and Culture",
  "Monastics and Asceticism",
  "Bible Study",
  "Liturgy",
  "Sacraments",
  "Saints",
  "Prayer",
  "Fasting",
  "Church History",
  "Theology",
]

export const seasons = [
  "Great Lent",
  "Nineveh",
  "Holy Week",
  "Resurrection",
  "Nativity",
  "Timket",
  "Apostles' Fast",
  "Assumption Fast",
  "Pentecost",
  "Meskel",
  "Ordinary Season",
]

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

const cleanText = (value: string) =>
  value
    .replace(/[#*_`]/g, "")
    .replace(/[👉👇☝️🏾🏽🏿]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim()

const isNoisePost = (post: TelegramPost) => {
  const text = `${post.title} ${post.excerpt} ${post.tags.join(" ")}`.toLowerCase()
  return (
    post.type !== "lesson" ||
    /^https?:\/\//i.test(post.title.trim()) ||
    /\b(announcement|starting now|join us live|tiktok account|please follow|postponed|rescheduled)\b/i.test(text)
  )
}

const inferTopic = (haystack: string) => {
  for (const rule of TOPIC_RULES) {
    if (rule.pattern.test(haystack)) return rule
  }
  return { category: "Faith and Theology", subcategory: "Theology", season: "Ordinary Season" }
}

const inferFormat = (groupSize: number, text: string): TeachingFormat => {
  if (/youtube|youtu\.be|tiktok|video/i.test(text)) return "Video"
  if (/audio|sermon|recorded/i.test(text)) return "Audio"
  if (/pdf|guide|download/i.test(text)) return "PDF Guide"
  return groupSize > 1 ? "Series" : "Article"
}

const inferLevel = (text: string, index: number): TeachingLevel => {
  if (/catechumen|begin|introduction|what is|how to/i.test(text)) return "Beginner"
  if (/dogma|theology|christology|council|academic/i.test(text)) return "Advanced"
  if (index % 5 === 0) return "Intermediate"
  return "General"
}

const inferAudience = (text: string): string => {
  if (/deacon|servant/i.test(text)) return "Servants"
  if (/youth/i.test(text)) return "Youth"
  if (/parent|child|family/i.test(text)) return "Parents"
  if (/catechumen/i.test(text)) return "Catechumen"
  return "Everyone"
}

const baseTeachings: Teaching[] = [
  {
    id: 1,
    sourceId: 0,
    slug: "understanding-the-holy-liturgy",
    title: "Understanding the Holy Liturgy",
    description: "A structured guide to the meaning, preparation, symbols, prayers, and sacramental life of the Divine Liturgy.",
    category: "Worship and Sacraments",
    subcategory: "Liturgy",
    format: "Series",
    level: "Intermediate",
    audience: "Everyone",
    season: "Ordinary Season",
    language: "English",
    duration: "15 lessons",
    image: "/images/pic1.png",
    date: "2026-01-01T00:00:00",
    tags: ["liturgy", "communion", "worship"],
    href: "/teachings/understanding-the-holy-liturgy",
    searchText: "",
    featured: true,
    popular: true,
    progress: 40,
    lessonIndex: "Lesson 4 of 15",
  },
  {
    id: 2,
    sourceId: 0,
    slug: "repentance-and-confession",
    title: "Repentance and Confession",
    description: "A peaceful path through repentance, confession, spiritual fatherhood, and returning to God with hope.",
    category: "Spiritual Life",
    subcategory: "Repentance",
    format: "Series",
    level: "Beginner",
    audience: "Everyone",
    season: "Great Lent",
    language: "English",
    duration: "9 lessons",
    image: "/images/pic2.png",
    date: "2026-01-02T00:00:00",
    tags: ["repentance", "confession", "spiritual life"],
    href: "/teachings/repentance-and-confession",
    searchText: "",
    featured: true,
    popular: true,
    saved: true,
    progress: 20,
    lessonIndex: "Lesson 2 of 9",
  },
]

export function getTeachings(): Teaching[] {
  const posts = telegramPosts as TelegramPost[]
  const groups = groupImportedPosts(posts.filter((post) => !isNoisePost(post)))
  const seen = new Set<string>()
  const imported: Teaching[] = []

  groups.forEach((group, index) => {
    const representative = group.representative
    const haystack = group.posts.map((post) => `${post.title} ${post.excerpt} ${post.tags.join(" ")}`).join(" ")
    const topic = inferTopic(haystack)
    const titleSeed = cleanText(representative.title || representative.excerpt)
      .replace(/^(continued|continuation|part\s*\d+|about|lesson on|lesson)\s+/i, "")
      .trim()
    const title = toStandardShortTitle(toNaturalTeachingTitle(titleSeed || representative.excerpt), 8)
    const key = slugify(title)
    if (!key || seen.has(key)) return
    seen.add(key)

    const format = inferFormat(group.posts.length, haystack)
    const level = inferLevel(haystack, index)
    const sourceId = group.leadId
    const slug = `${key}-${sourceId}`
    const description = stripTeachingFiller(representative.excerpt || "Orthodox teaching for faithful spiritual growth.")

    imported.push({
      id: 100000 + sourceId,
      sourceId,
      slug,
      title,
      description,
      category: topic.category,
      subcategory: topic.subcategory,
      format,
      level,
      audience: inferAudience(haystack),
      season: topic.season ?? "Ordinary Season",
      language: /[\u1200-\u137F]/.test(haystack) ? "Bilingual" : "English",
      duration: group.posts.length > 1 ? `${group.posts.length} lessons` : format === "Video" ? "Video" : "8 min read",
      image: index % 2 === 0 ? "/images/pic1.png" : "/images/pic2.png",
      date: group.date,
      tags: Array.from(new Set(group.posts.flatMap((post) => post.tags))).slice(0, 8),
      href: `/teachings/${slug}`,
      searchText: `${title} ${description} ${haystack}`.toLowerCase(),
      featured: index < 24,
      popular: index < 36,
      saved: index % 17 === 0,
      progress: index % 13 === 0 ? 35 : undefined,
      lessonIndex: group.posts.length > 1 ? `Lesson 1 of ${group.posts.length}` : undefined,
    })
  })

  return [...baseTeachings.map((teaching) => ({ ...teaching, searchText: `${teaching.title} ${teaching.description} ${teaching.tags.join(" ")}`.toLowerCase() })), ...imported]
}

export const learningPaths: LearningPath[] = [
  {
    slug: "new-to-orthodox-faith",
    title: "Introduction to the Orthodox Faith",
    description: "A clear starting point for learning doctrine, prayer, Scripture, worship, and Orthodox Christian life.",
    group: "Beginner Foundations",
    level: "Beginner",
    audience: "Catechumen",
    units: 4,
    lessons: 18,
    duration: "4 hours",
    source: "John's Repentance Teaching Team",
    image: "/images/pic1.png",
    progress: 0,
    objectives: ["Understand core Orthodox beliefs", "Begin a simple prayer rhythm", "Learn how worship forms daily life"],
    lessonIds: [1, 2],
  },
  {
    slug: "repentance-and-confession",
    title: "Repentance and Confession",
    description: "A guided study of sin, healing, confession, spiritual fatherhood, and returning to God.",
    group: "Spiritual Growth",
    level: "Beginner",
    audience: "Everyone",
    units: 3,
    lessons: 9,
    duration: "2 hours",
    source: "John's Repentance",
    image: "/images/pic2.png",
    progress: 20,
    objectives: ["Understand repentance as healing", "Prepare for confession", "Build a sustainable spiritual rule"],
    lessonIds: [2],
  },
  {
    slug: "understanding-the-holy-liturgy",
    title: "Understanding the Holy Liturgy",
    description: "A structured study of preparation, symbols, prayers, servants, and Holy Communion.",
    group: "Worship and Sacraments",
    level: "Intermediate",
    audience: "Everyone",
    units: 3,
    lessons: 15,
    duration: "3 hours",
    source: "Ethiopian Orthodox liturgical tradition",
    image: "/images/pic1.png",
    progress: 40,
    objectives: ["Follow the structure of Kidase", "Understand liturgical symbols", "Prepare reverently for Holy Communion"],
    lessonIds: [1],
  },
  {
    slug: "the-seven-sacraments",
    title: "The Seven Sacraments",
    description: "An organized overview of sacramental life in the Ethiopian Orthodox Tewahedo Church.",
    group: "Worship and Sacraments",
    level: "Intermediate",
    audience: "Everyone",
    units: 2,
    lessons: 12,
    duration: "3 hours",
    source: "John's Repentance",
    image: "/images/pic2.png",
    progress: 0,
    objectives: ["Name the seven sacraments", "Connect sacraments to daily life", "Study Communion and Confession more deeply"],
    lessonIds: [1, 2],
  },
  {
    slug: "feasts-and-saints",
    title: "Feasts and Saints",
    description: "Learn how the church year teaches through feasts, saints, fasting seasons, and Scripture readings.",
    group: "Feasts and Saints",
    level: "General",
    audience: "Everyone",
    units: 5,
    lessons: 24,
    duration: "5 hours",
    source: "Synaxarium and John’s Repentance archives",
    image: "/images/pic1.png",
    progress: 0,
    objectives: ["Recognize major feasts", "Read saints' lives devotionally", "Connect seasons to spiritual practice"],
    lessonIds: [],
  },
]

export function getTeachingBySlug(slug: string) {
  return getTeachings().find((teaching) => teaching.slug === slug)
}

export function getPathBySlug(slug: string) {
  return learningPaths.find((path) => path.slug === slug)
}
