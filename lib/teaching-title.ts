const TITLE_REWRITE_MAP = new Map<string, string>([
  ["saint mary negere mariyam our lady's temple life according to the saints", "Mary's Life in the Temple"],
  ["mary negere mariyam our lady's temple life according to the saints", "Mary's Life in the Temple"],
  ["negere maryam about our lady mary her life in the temple according to saints and scholars", "Mary's Life in the Temple"],
  ["god's open call to repentance the lord himself calls us saying come", "The Divine Call to Repentance"],
  ["answer 4 we do not teach that only a few are saved", "Universal Salvation: Addressing Misconceptions"],
  ["since we have shared teachings about saint arsema in the past i", "The Life of Saint Arsema"],
  ["the teaching of the venerable abba hiriakos concerning the life of our", "Abba Hiriakos on the Virgin Mary"],
  ["they have no wine when the wine ran out the holy virgin", "The Intercession at Cana of Galilee"],
  ["the fast of nineveh who is nineveh", "The Meaning of the Fast of Nineveh"],
  ["fasting of the prophets tsome nebiyat", "Tsome Nebiyat: The Prophets' Fast"],
  ["the season of teaching astemhro according to", "Astemhro: The Season of Teaching"],
  ["cana of galilee tir 12", "The Feast of Cana (Tir 12)"],
  ["the holy liturgy why we wear netela", "Why We Wear the Netela"],
  ["number of servants in the holy liturgy", "The Five Servants of the Liturgy"],
  ["the commandment of the lord is pure", "Symbolism of Light in the Liturgy"],
  ["the liturgy as complete communion with god", "The Liturgy and the Five Senses"],
  ["this prophecy was fulfilled in the life of our", "The Prophecy of the Mother of God"],
  ["let us be clear my child salvation comes", "Salvation Through Jesus Christ"],
  ["in the second coming of the lord the holy", "The Theology of the Second Coming"],
  ["when you see the ark of the covenant of the lord your", "Following the Ark of the Covenant"],
  ["the faithfuls carrying the ark of the law tabot out of the", "The Procession of the Holy Tabot"],
  ["the night liturgy and the symbolism of the descent of the ark", "Night Liturgy: Descent of the Ark"],
  ["the holy virgin as the true ark of the covenant for the", "The Virgin Mary: The True Ark"],
  ["the philistines brought the ark of the lord into the house of", "The Ark in the House of Dagon"],
  ["why the names of the saints are written on the altar ark", "Saints' Names on the Altar Ark"],
  ["why do we call the altar the ark", "Why the Altar is Called the Ark"],
  ["the mother of god the golden ark saint yared that holy", "St. Yared: Mary as the Golden Ark"],
])

const normalizeTitleKey = (value: string) =>
  value
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9'\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()

const MINOR_WORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "but",
  "by",
  "for",
  "if",
  "in",
  "nor",
  "of",
  "on",
  "or",
  "per",
  "so",
  "the",
  "to",
  "up",
  "via",
  "yet",
])

const toTitleCase = (value: string) => {
  const words = value.split(/\s+/).filter(Boolean)
  return words
    .map((word, idx) => {
      const lower = word.toLowerCase()
      const isFirst = idx === 0
      const isLast = idx === words.length - 1
      if (!isFirst && !isLast && MINOR_WORDS.has(lower)) return lower
      return lower.charAt(0).toUpperCase() + lower.slice(1)
    })
    .join(" ")
}

export function stripTeachingFiller(value: string): string {
  return value
    .replace(/[✍👉👇☝️🏾🏽🏿]/gu, " ")
    .replace(/\bImported post\b/gi, "")
    .replace(/^This teaching offers an Orthodox reflection on\s+/i, "")
    .replace(/^This Q&A offers an Orthodox response on\s+/i, "")
    .replace(/\s+/g, " ")
    .trim()
}

export function normalizeTeachingTitle(value: string): string {
  const cleaned = stripTeachingFiller(value)
  if (!cleaned) return cleaned

  const key = normalizeTitleKey(cleaned)
  if (TITLE_REWRITE_MAP.has(key)) return TITLE_REWRITE_MAP.get(key) as string
  for (const [prefix, replacement] of TITLE_REWRITE_MAP.entries()) {
    if (key.startsWith(prefix)) return toTitleCase(replacement)
  }

  return toTitleCase(cleaned)
}

export function truncateTitle(value: string, maxChars = 58): string {
  if (value.length <= maxChars) return value
  const truncated = value.slice(0, maxChars)
  const lastSpace = truncated.lastIndexOf(" ")
  return `${(lastSpace > 30 ? truncated.slice(0, lastSpace) : truncated).trim()}...`
}

export function toStandardShortTitle(value: string, maxWords = 6): string {
  const normalized = normalizeTeachingTitle(value)
  const words = normalized.split(/\s+/).filter(Boolean)
  if (words.length <= maxWords) return normalized
  const shortened = words.slice(0, maxWords)
  while (shortened.length > 3 && MINOR_WORDS.has(shortened[shortened.length - 1].toLowerCase())) {
    shortened.pop()
  }
  return shortened.join(" ").replace(/[,:;.\-–—]\s*$/g, "")
}

export function toNaturalTeachingTitle(value: string): string {
  const normalized = normalizeTeachingTitle(value)
  if (!normalized) return normalized

  const stripNoise = (text: string) =>
    text
      .replace(/\bfor faithful spiritual growth\b/gi, "")
      .replace(/\bfor christian life\b/gi, "")
      .replace(/\baccording to (the )?saints( and scholars)?\b/gi, "")
      .replace(/\bthis teaching offers an orthodox reflection\b/gi, "")
      .replace(/\s+/g, " ")
      .replace(/[,:;.\-–—]\s*$/g, "")
      .trim()

  let candidate = stripNoise(normalized)

  const meanMatch = candidate.match(/^what does it mean\s+(.+)$/i)
  if (meanMatch?.[1]) {
    const subject = toTitleCase(meanMatch[1].trim())
    return `What Does ${subject} Mean`
  }

  candidate = candidate.replace(/^about\s+/i, "")
  candidate = candidate.replace(/^the\s+meaning\s+of\s+/i, "Meaning of ")
  candidate = candidate.replace(/^the\s+prophecy\s+of\s+the\s+mother\s+of$/i, "The Prophecy of the Mother of God")

  return toTitleCase(stripNoise(candidate))
}

export function splitTitleAndSubtitle(value: string, maxTitleWords = 5): { title: string; subtitle?: string } {
  const cleaned = normalizeTeachingTitle(value)
  if (!cleaned) return { title: "" }

  const words = cleaned.split(" ")
  if (words.length <= maxTitleWords) return { title: cleaned }

  return {
    title: words.slice(0, maxTitleWords).join(" "),
    subtitle: words.slice(maxTitleWords).join(" "),
  }
}
