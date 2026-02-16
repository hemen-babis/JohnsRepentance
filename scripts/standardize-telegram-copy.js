#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

const inputPath = path.join(process.cwd(), "content/telegram/index.json")

const SMALL_WORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "but",
  "by",
  "for",
  "from",
  "in",
  "nor",
  "of",
  "on",
  "or",
  "per",
  "the",
  "to",
  "via",
  "with",
])

const GENERIC_WORDS = new Set([
  "about",
  "answer",
  "article",
  "continued",
  "continuation",
  "imported",
  "lesson",
  "orthodox",
  "part",
  "post",
  "question",
  "teaching",
  "announcement",
])

const BANNED_TITLE_PATTERNS = [
  /^$/,
  /^imported post$/i,
  /^announcement$/i,
  /^continued$/i,
  /^continues$/i,
  /^continuation$/i,
  /^part\s*\d+$/i,
  /^https?:\/\//i,
  /^www\./i,
]

const LEADING_PATTERNS = [
  /^announcement\b\s*[:\-]?\s*/i,
  /^(question|answer)\s*[:፦]\s*/i,
  /^(continued|continuation|cont(?:'|’)?d|continues?|continuef|continue)\s*/i,
  /^\(?part\s*\d+\)?\s*/i,
  /^(about|lesson(?:\s+on)?|reflection(?:\s+on)?|discourse(?:\s+on)?|homily(?:\s+on)?|on)\s+/i,
  /^(dear|beloved|my beloved|peace be with you|grace (?:and|&) peace)\b[^.!?\n]{0,180}[,:\-]\s*/i,
  /^(dear|beloved)\b[^.!?\n]{0,160}\s*/i,
]

const INLINE_PHRASES = [
  /dear followers of the orthodox teachings[^.?!]*[.?!]?/gi,
  /beloved and respected[^.?!]*[.?!]?/gi,
  /all our members who follow[^.?!]*[.?!]?/gi,
  /all our beloved and respected members[^.?!]*[.?!]?/gi,
  /members of john'?s repentance[^.?!]*[.?!]?/gi,
  /john'?s repentance (?:website|page|service|telegram channel|spiritual service)[^.?!]*[.?!]?/gi,
  /we greet you with the peace[^.?!]*[.?!]?/gi,
  /we send you (?:this|the) [^.?!]*[.?!]?/gi,
  /based on the topic mentioned above[^.?!]*[.?!]?/gi,
]

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"))
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + "\n", "utf8")
}

function removeLinks(input) {
  return input.replace(/https?:\/\/\S+/gi, " ").replace(/www\.\S+/gi, " ")
}

function removeHashtags(input) {
  return input.replace(/#([\p{L}\p{N}_-]+)/gu, "$1").replace(/#/g, " ")
}

function removeDecorativeMarks(input) {
  return input
    .replace(/[👉👇☝️🏾🏽🏿✨🎧🎵🎶🙏]+/gu, " ")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[()[\]{}]/g, " ")
}

function normalizeSpacing(input) {
  return input
    .replace(/[_]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/([,.;:!?])(\S)/g, "$1 $2")
    .trim()
}

function cleanRawText(input) {
  if (!input) return ""
  let value = String(input)
  value = removeLinks(value)
  value = removeHashtags(value)
  value = removeDecorativeMarks(value)
  value = INLINE_PHRASES.reduce((acc, pattern) => acc.replace(pattern, " "), value)
  return normalizeSpacing(value)
}

function stripLeadingNoise(input) {
  let value = cleanRawText(input)
  let changed = true

  while (changed && value) {
    changed = false
    for (const pattern of LEADING_PATTERNS) {
      const next = value.replace(pattern, "").trim()
      if (next !== value) {
        value = next
        changed = true
      }
    }
  }

  return value
}

function splitSentences(input) {
  const cleaned = stripLeadingNoise(input)
  if (!cleaned) return []
  const parts = cleaned
    .split(/(?<=[.!?])\s+|\n+/)
    .map((part) => stripLeadingNoise(part))
    .filter(Boolean)
  return parts.length > 0 ? parts : [cleaned]
}

function getWords(input) {
  return String(input).match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || []
}

function wordCount(input) {
  return getWords(input).length
}

function trimToWordCount(input, maxWords) {
  return getWords(input).slice(0, maxWords).join(" ").trim()
}

function toTitleCase(input) {
  const words = input.split(/\s+/).filter(Boolean)
  const lastIndex = words.length - 1

  return words
    .map((token, index) => {
      const prefix = (token.match(/^[^\p{L}\p{N}]*/u) || [""])[0]
      const suffix = (token.match(/[^\p{L}\p{N}]*$/u) || [""])[0]
      const core = token.slice(prefix.length, token.length - suffix.length)
      if (!core) return token

      if (/^(q&a|qa)$/i.test(core)) return `${prefix}Q&A${suffix}`
      if (/^[ivxlcdm]+$/i.test(core)) return `${prefix}${core.toUpperCase()}${suffix}`
      if (/^[A-Z]{2,6}$/.test(core)) return `${prefix}${core}${suffix}`

      const lower = core.toLowerCase()
      const shouldLower = index > 0 && index < lastIndex && SMALL_WORDS.has(lower)

      const rebuilt = lower
        .split(/([-\/])/)
        .map((part) => {
          if (part === "-" || part === "/") return part
          if (!part) return part
          if (shouldLower) return part
          return part.charAt(0).toUpperCase() + part.slice(1)
        })
        .join("")

      return `${prefix}${rebuilt}${suffix}`
    })
    .join(" ")
    .replace(/\s+:/g, ":")
    .trim()
}

function meaningfulTagWords(entry, maxWords = 4) {
  const rawTags = Array.isArray(entry.tags) ? entry.tags : []
  return rawTags
    .map((tag) => cleanRawText(tag).toLowerCase())
    .map((tag) => tag.split(/\s+/))
    .flat()
    .map((token) => token.replace(/[^a-z0-9-]/g, ""))
    .filter(Boolean)
    .filter((token) => token.length > 2 && !GENERIC_WORDS.has(token))
    .slice(0, maxWords)
}

function isAnnouncementEntry(entry) {
  const tags = Array.isArray(entry.tags) ? entry.tags.join(" ") : ""
  const signal = `${entry.title || ""} ${entry.excerpt || ""} ${tags}`.toLowerCase()
  return /announcement|official announcement|live q&a|starting now|postponed|rescheduled|gentle reminder|service update/.test(signal)
}

function buildFallbackTitle(entry) {
  if (isAnnouncementEntry(entry)) {
    return "Community Service Update for Orthodox Members"
  }

  const tags = meaningfulTagWords(entry, 4)
  const phrase = tags.map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" ")
  if (phrase) {
    if (entry.type === "Q&A") return `Orthodox Q&A on the Theme of ${phrase}`
    return `Orthodox Teaching on the Theme of ${phrase}`
  }
  if (entry.type === "Q&A") return "Orthodox Q&A for Faith and Spiritual Guidance"
  return "Orthodox Spiritual Teaching for Faithful Christian Life"
}

function titleFromContentPath(entry) {
  const rawPath = typeof entry.contentPath === "string" ? entry.contentPath : ""
  if (!rawPath) return ""

  let base = path.basename(rawPath).replace(/\.md$/i, "")
  base = base.replace(/^\d+-/, "")

  if (/^(continued|continues|continuation|part-?\d+|imported-post)$/i.test(base)) return ""
  if (/^(https?|www)-/i.test(base)) return ""

  let value = base.replace(/[-_]+/g, " ")
  value = stripLeadingNoise(value)
  value = value.replace(/\b(part\s*\d+|continued|continuation|cont(?:'|’)?d|continues?)\b/gi, " ")
  value = normalizeSpacing(value)
  return value
}

function isBadTitle(input) {
  const cleaned = stripLeadingNoise(input).replace(/[.!?,;:]+$/g, "").trim()
  if (BANNED_TITLE_PATTERNS.some((pattern) => pattern.test(cleaned))) return true
  if (/\bannouncement\b/i.test(cleaned)) return true
  if (wordCount(cleaned) < 3) return true

  const words = getWords(cleaned).map((w) => w.toLowerCase())
  const meaningful = words.filter((w) => !GENERIC_WORDS.has(w))
  if (meaningful.length < 2) return true

  return false
}

function enforceTitleLength(title, entry, fallbackSource) {
  let candidate = stripLeadingNoise(title)
  if (wordCount(candidate) > 12) candidate = trimToWordCount(candidate, 12)

  if (wordCount(candidate) < 5) {
    const fallback = splitSentences(fallbackSource)[0] || ""
    if (wordCount(fallback) >= 5) candidate = trimToWordCount(fallback, 10)
  }

  if (wordCount(candidate) < 5) {
    const fallbackTitle = buildFallbackTitle(entry)
    candidate = fallbackTitle
  }

  if (wordCount(candidate) > 12) candidate = trimToWordCount(candidate, 12)
  return candidate.trim()
}

function buildTitle(entry) {
  const candidates = [
    titleFromContentPath(entry),
    stripLeadingNoise(entry.title),
    splitSentences(entry.excerpt)[0] || "",
    splitSentences(`${entry.title}. ${entry.excerpt}`)[0] || "",
  ]

  let chosen = candidates.find((candidate) => !isBadTitle(candidate)) || ""
  if (!chosen) chosen = buildFallbackTitle(entry)

  chosen = chosen.replace(/\b(question|answer)\s*[:፦]\s*/gi, " ")
  chosen = chosen.replace(/\bquestion\b\s+hello\s+i\s+have\s+a\s+question\b/gi, " ")
  chosen = chosen.replace(/\b(part\s*\d+|continued|continuation|cont(?:'|’)?d|continues?)\b/gi, " ")
  chosen = chosen.replace(/\bannouncement\b/gi, " ")
  chosen = normalizeSpacing(chosen)
  chosen = enforceTitleLength(chosen, entry, `${entry.excerpt} ${entry.title}`)
  chosen = chosen.replace(/[.!?,;:]+$/g, "").trim()
  chosen = toTitleCase(chosen)

  if (wordCount(chosen) < 5 || wordCount(chosen) > 12 || /#/.test(chosen)) {
    chosen = toTitleCase(buildFallbackTitle(entry))
  }

  return chosen
}

function sentenceIsBoilerplate(sentence) {
  const lower = sentence.toLowerCase()
  return (
    lower.includes("dear followers") ||
    lower.includes("john's repentance") ||
    lower.includes("we greet you with the peace") ||
    lower.includes("all our beloved and respected")
  )
}

function buildPreview(entry, title) {
  if (isAnnouncementEntry(entry)) {
    return "This update shares a brief service notice for the Orthodox community."
  }

  const body = stripLeadingNoise(entry.excerpt || "")
  const fallbackBody = stripLeadingNoise(`${entry.title}. ${entry.excerpt}`)
  const source = body || fallbackBody || title

  const sentences = splitSentences(source).filter((s) => !sentenceIsBoilerplate(s))

  let preview = ""
  for (const sentence of sentences) {
    const cleaned = normalizeSpacing(sentence)
    if (!cleaned) continue
    if (!preview) {
      preview = cleaned
      continue
    }
    const merged = `${preview} ${cleaned}`.trim()
    if (wordCount(preview) < 24 && wordCount(merged) <= 40) {
      preview = merged
      continue
    }
    break
  }

  if (!preview) {
    const topic = toTitleCase(trimToWordCount(title, 8).toLowerCase())
    if (entry.type === "Q&A") {
      preview = `This Q&A offers an Orthodox response on ${topic} for spiritual guidance`
    } else {
      preview = `This teaching offers an Orthodox reflection on ${topic} for faithful spiritual growth`
    }
  }

  preview = preview.replace(/\b(question|answer)\s*[:፦]\s*/gi, " ")
  preview = preview.replace(/\b(part\s*\d+|continued|continuation|cont(?:'|’)?d|continues?)\b/gi, " ")
  preview = normalizeSpacing(preview)

  if (wordCount(preview) > 40) preview = trimToWordCount(preview, 36)
  if (wordCount(preview) < 12) {
    const topic = toTitleCase(trimToWordCount(title, 8).toLowerCase())
    preview = entry.type === "Q&A"
      ? `This Q&A offers an Orthodox response on ${topic} for spiritual guidance`
      : `This teaching offers an Orthodox reflection on ${topic} for faithful spiritual growth`
  }

  preview = preview.trim()
  if (preview) preview = preview.charAt(0).toUpperCase() + preview.slice(1)
  if (preview && !/[.!?]$/.test(preview)) preview += "."
  return preview
}

function main() {
  const data = readJson(inputPath)
  if (!Array.isArray(data)) {
    throw new Error("content/telegram/index.json must contain an array")
  }

  let titleChanged = 0
  let excerptChanged = 0

  const updated = data.map((entry) => {
    const next = { ...entry }
    const newTitle = buildTitle(entry)
    const newExcerpt = buildPreview(entry, newTitle)

    if (newTitle !== entry.title) titleChanged += 1
    if (newExcerpt !== entry.excerpt) excerptChanged += 1

    next.title = newTitle
    next.excerpt = newExcerpt
    return next
  })

  writeJson(inputPath, updated)

  const invalidTitles = updated.filter((entry) => {
    const words = wordCount(entry.title)
    return words < 5 || words > 12 || /#/.test(entry.title)
  })

  console.log(`Updated entries: ${updated.length}`)
  console.log(`Titles changed: ${titleChanged}`)
  console.log(`Excerpts changed: ${excerptChanged}`)
  console.log(`Invalid titles after cleanup: ${invalidTitles.length}`)
}

main()
