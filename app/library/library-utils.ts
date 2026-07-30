import type { LibraryResource } from "./library-data"

export type LibrarySeriesDef = {
  id: string
  title: string
  subtitle: string
  aliases: string[]
  matches: (resource: LibraryResource) => boolean
}

export type LibraryListItem =
  | { kind: "resource"; resource: LibraryResource }
  | { kind: "series"; id: string; def: LibrarySeriesDef; resources: LibraryResource[]; representative: LibraryResource }

export const SERIES_DEFS: LibrarySeriesDef[] = [
  {
    id: "series-lsane-geez",
    title: "ልሳነ ግእዝ",
    subtitle: "Ge'ez language graded book series",
    aliases: ["lsane gez", "lisane geez", "geez language"],
    matches: (resource) => {
      const text = searchableText(resource)
      return (
        (resource.title.includes("ልሳነ ግእዝ") || text.includes("lsane gez")) &&
        !resource.title.includes("ዘሰኔ") &&
        !resource.title.includes("ግስ ዘ")
      )
    },
  },
  {
    id: "series-meserete-haymanot",
    title: "መሠረተ ሃይማኖት",
    subtitle: "Foundations of faith graded curriculum",
    aliases: ["meserete haymanot", "meserete hymanot", "foundations of faith"],
    matches: (resource) => {
      const text = searchableText(resource)
      return (
        resource.title.includes("መሠረተ ሃይማኖት") ||
        resource.title.includes("መሠረተ ሐይማኖት") ||
        text.includes("meserete haymanot") ||
        text.includes("meserete hymanot")
      )
    },
  },
  {
    id: "series-john-chrysostom-homilies",
    title: "St. John Chrysostom Homilies",
    subtitle: "New Testament homilies grouped as one reading series",
    aliases: ["john chrysostom homilies", "homilies on the epistles", "homilies"],
    matches: (resource) => {
      const text = searchableText(resource)
      return text.includes("homilies on") && (text.includes("chrysostom") || resource.source === "St. John Chrysostom")
    },
  },
  {
    id: "series-kidase-types",
    title: "ቅዳሴ – ዓይነቶች",
    subtitle: "Ethiopian Orthodox anaphoras – all liturgy types",
    aliases: ["kidase types", "anaphora", "qidase", "kidassie"],
    matches: (resource) => isKidaseTypeResource(resource),
  },
]

export function isKidaseTypeResource(resource: LibraryResource) {
  const title = resource.title.trim()
  const normalizedTitle = title.toLowerCase()
  const artifactText = `${resource.id} ${title} ${resource.aliases?.join(" ") ?? ""}`.toLowerCase()
  if (title.includes(".pdf") || artifactText.includes("pdf_thumb") || artifactText.includes("pdf thumb")) return false
  if (title.includes("ስለ ") || title.includes("ስርዓተ") || title.includes("ሥርዓተ")) return false
  if (title === "ቅዳሴ") return false

  return (
    /^ቅዳሴ\s+\S+/.test(title) ||
    /\bkidassie\s+\S+/i.test(normalizedTitle) ||
    /\bqidase\s+\S+/i.test(normalizedTitle) ||
    /\bqdase\s+\S+/i.test(normalizedTitle)
  )
}

export function displayResourceAlias(resource: Pick<LibraryResource, "aliases">) {
  return resource.aliases?.find((alias) => {
    const text = alias.toLowerCase()
    if (text.includes("thumb") || text.includes(".jpg")) return false
    if (/[\u1200-\u137f]/.test(alias) && /[a-z]/i.test(alias)) return false
    return true
  })
}

export function searchableText(resource: LibraryResource) {
  return [resource.title, resource.description, resource.church, resource.source, resource.purpose, resource.type, resource.language, resource.topics.join(" "), resource.aliases?.join(" ")]
    .join(" ")
    .toLowerCase()
}

export function normalizeSearch(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’'`]/g, "")
    .trim()
}

export function resourceSortScore(resource: LibraryResource) {
  let score = 0
  if (resource.level === "Beginner") score -= 20
  if (resource.purpose === "Catechumen") score -= 16
  if (resource.purpose === "Curriculum") score -= 12
  if (resource.purpose === "Servant Prep") score -= 10
  if (resource.type === "PDF" || resource.type === "Book") score -= 6
  if (resource.language === "Amharic") score -= 3
  if (resource.topics.includes("commentary")) score -= 18
  if (resource.source === "Fr. Tadros Yacoub Malaty") score -= 14
  return score
}

export function sortResources(resources: LibraryResource[]) {
  return [...resources].sort((a, b) => {
    const byScore = resourceSortScore(a) - resourceSortScore(b)
    if (byScore !== 0) return byScore
    return a.title.localeCompare(b.title, "en")
  })
}

export function seriesForResource(resource: LibraryResource) {
  return SERIES_DEFS.find((series) => series.matches(resource)) ?? null
}

export function volumeSortScore(resource: LibraryResource) {
  const text = `${resource.title} ${resource.aliases?.join(" ") ?? ""}`.toLowerCase()
  const rules: [RegExp, number][] = [
    [/(1ኛ|አንደኛ|andenya|1st|grade\s*1|\b1\b)/i, 1],
    [/(2ኛ|ሁለተኛ|huletenya|2nd|grade\s*2|\b2\b)/i, 2],
    [/(3ኛ|ሦስተኛ|sostenya|salsay|3rd|grade\s*3|\b3\b)/i, 3],
    [/(4ኛ|አራተኛ|4th|grade\s*4|\b4\b)/i, 4],
    [/(5ኛ|አምስተኛ|5nya|5th|grade\s*5|\b5\b)/i, 5],
    [/(6ኛ|ስድስተኛ|6nya|6th|grade\s*6|\b6\b)/i, 6],
    [/(7ኛ|ሰባተኛ|7th|grade\s*7|\b7\b)/i, 7],
    [/(8ኛ|ስምንተኛ|8th|grade\s*8|\b8\b)/i, 8],
  ]
  return rules.find(([pattern]) => pattern.test(text))?.[1] ?? 99
}

export function sortSeriesVolumes(resources: LibraryResource[]) {
  return [...resources].sort((a, b) => {
    const byVolume = volumeSortScore(a) - volumeSortScore(b)
    if (byVolume !== 0) return byVolume
    return a.title.localeCompare(b.title, "en")
  })
}

export function buildLibraryItems(resources: LibraryResource[]): LibraryListItem[] {
  const seriesBuckets = new Map<string, { def: LibrarySeriesDef; resources: LibraryResource[] }>()
  const standalone: LibraryListItem[] = []

  for (const resource of resources) {
    const def = seriesForResource(resource)
    if (!def) {
      standalone.push({ kind: "resource", resource })
      continue
    }

    const bucket = seriesBuckets.get(def.id) ?? { def, resources: [] }
    bucket.resources.push(resource)
    seriesBuckets.set(def.id, bucket)
  }

  const seriesItems: LibraryListItem[] = Array.from(seriesBuckets.entries()).map(([id, bucket]) => {
    const sortedVolumes = sortSeriesVolumes(bucket.resources)
    const representative = sortedVolumes.find((resource) => resource.title === bucket.def.title) ?? sortedVolumes[0]
    return {
      kind: "series",
      id,
      def: bucket.def,
      resources: sortedVolumes,
      representative,
    }
  })

  return [...seriesItems, ...standalone].sort((a, b) => {
    const aResource = a.kind === "series" ? a.representative : a.resource
    const bResource = b.kind === "series" ? b.representative : b.resource
    const byScore = resourceSortScore(aResource) - resourceSortScore(bResource)
    if (byScore !== 0) return byScore
    const aTitle = a.kind === "series" ? a.def.title : a.resource.title
    const bTitle = b.kind === "series" ? b.def.title : b.resource.title
    return aTitle.localeCompare(bTitle, "en")
  })
}

export function fileExtension(url: string) {
  const cleanUrl = decodeURIComponent(url).split("?")[0].split("#")[0]
  return cleanUrl.match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase() ?? ""
}

export function isWordDocument(url: string) {
  return ["doc", "docx"].includes(fileExtension(url))
}

export function getResourceHref(resource: LibraryResource) {
  return `/library/resource/${resource.id}`
}

export function getOriginalResourceHref(resource: LibraryResource) {
  return resource.url
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/h\.h\./g, "hh")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\u1200-\u137f]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function sourceSlug(resource: LibraryResource) {
  return slugify(resource.source)
}

export function relatedResources(resource: LibraryResource, resources: LibraryResource[], limit = 8) {
  const series = seriesForResource(resource)
  return resources
    .filter((candidate) => candidate.id !== resource.id)
    .map((candidate) => {
      let score = 0
      if (candidate.source === resource.source) score += 12
      if (series && seriesForResource(candidate)?.id === series.id) score += 10
      score += candidate.topics.filter((topic) => resource.topics.includes(topic)).length * 3
      if (candidate.purpose === resource.purpose) score += 2
      if (candidate.church === resource.church) score += 2
      if (candidate.language === resource.language) score += 1
      return { candidate, score }
    })
    .filter((item) => item.score > 3)
    .sort((a, b) => {
      const byScore = b.score - a.score
      if (byScore !== 0) return byScore
      const byResourceScore = resourceSortScore(a.candidate) - resourceSortScore(b.candidate)
      if (byResourceScore !== 0) return byResourceScore
      return a.candidate.title.localeCompare(b.candidate.title, "en")
    })
    .map((item) => item.candidate)
    .slice(0, limit)
}
