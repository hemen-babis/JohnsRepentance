import { NextRequest, NextResponse } from "next/server"

const PLAYLIST_ID = "PLluUizhBpZV9aKPupYA5X_FMmzAD1UNR1"
const FALLBACK_ITEMS = [
  {
    id: "GfBL_vM8eSM",
    title: "Misbak Playlist Starter",
    thumb: "https://i.ytimg.com/vi/GfBL_vM8eSM/hqdefault.jpg",
  },
]

type PlaylistItem = {
  id: string
  title: string
  thumb: string
  addedAt?: string
}

const ROMAN_TO_AMHARIC_ALIASES: Record<string, string[]> = {
  tekeneyu: ["ተቀነዩ", "ተቀነይ", "ተቀነየ", "ተከነዩ"],
  teqeneyu: ["ተቀነዩ", "ተቀነይ", "ተቀነየ"],
  misbak: ["ምስባክ", "መዝሙር", "መስባክ"],
  mezmur: ["መዝሙር", "ዝማሬ"],
  kidase: ["ቅዳሴ"],
  wedase: ["ውዳሴ", "ውዳሴ ማርያም"],
}

const ETHIOPIC_DIGITS: Record<string, string> = {
  "፩": "1",
  "፪": "2",
  "፫": "3",
  "፬": "4",
  "፭": "5",
  "፮": "6",
  "፯": "7",
  "፰": "8",
  "፱": "9",
  "፲": "10",
}

const GEEZ_TO_LATIN: Record<string, string> = {
  ሀ: "h", ሁ: "h", ሂ: "h", ሃ: "h", ሄ: "h", ህ: "h", ሆ: "h",
  ለ: "l", ሉ: "l", ሊ: "l", ላ: "l", ሌ: "l", ል: "l", ሎ: "l",
  መ: "m", ሙ: "m", ሚ: "m", ማ: "m", ሜ: "m", ም: "m", ሞ: "m",
  ሠ: "s", ሡ: "s", ሢ: "s", ሣ: "s", ሤ: "s", ሥ: "s", ሦ: "s",
  ረ: "r", ሩ: "r", ሪ: "r", ራ: "r", ሬ: "r", ር: "r", ሮ: "r",
  ሰ: "s", ሱ: "s", ሲ: "s", ሳ: "s", ሴ: "s", ስ: "s", ሶ: "s",
  ሸ: "sh", ሹ: "sh", ሺ: "sh", ሻ: "sh", ሼ: "sh", ሽ: "sh", ሾ: "sh",
  ቀ: "k", ቁ: "k", ቂ: "k", ቃ: "k", ቄ: "k", ቅ: "k", ቆ: "k",
  በ: "b", ቡ: "b", ቢ: "b", ባ: "b", ቤ: "b", ብ: "b", ቦ: "b",
  ተ: "t", ቱ: "t", ቲ: "t", ታ: "t", ቴ: "t", ት: "t", ቶ: "t",
  ቸ: "ch", ቹ: "ch", ቺ: "ch", ቻ: "ch", ቼ: "ch", ች: "ch", ቾ: "ch",
  ኀ: "h", ኁ: "h", ኂ: "h", ኃ: "h", ኄ: "h", ኅ: "h", ኆ: "h",
  ነ: "n", ኑ: "n", ኒ: "n", ና: "n", ኔ: "n", ን: "n", ኖ: "n",
  አ: "a", ኡ: "a", ኢ: "a", ኣ: "a", ኤ: "a", እ: "a", ኦ: "a",
  ከ: "k", ኩ: "k", ኪ: "k", ካ: "k", ኬ: "k", ክ: "k", ኮ: "k",
  ኰ: "k",
  ወ: "w", ዉ: "w", ዊ: "w", ዋ: "w", ዌ: "w", ው: "w", ዎ: "w",
  ዐ: "a", ዑ: "a", ዒ: "a", ዓ: "a", ዔ: "a", ዕ: "a", ዖ: "a",
  ዘ: "z", ዙ: "z", ዚ: "z", ዛ: "z", ዜ: "z", ዝ: "z", ዞ: "z",
  የ: "y", ዩ: "y", ዪ: "y", ያ: "y", ዬ: "y", ይ: "y", ዮ: "y",
  ደ: "d", ዱ: "d", ዲ: "d", ዳ: "d", ዴ: "d", ድ: "d", ዶ: "d",
  ጀ: "j", ጁ: "j", ጂ: "j", ጃ: "j", ጄ: "j", ጅ: "j", ጆ: "j",
  ገ: "g", ጉ: "g", ጊ: "g", ጋ: "g", ጌ: "g", ግ: "g", ጎ: "g",
  ጠ: "t", ጡ: "t", ጢ: "t", ጣ: "t", ጤ: "t", ጥ: "t", ጦ: "t",
  ጨ: "ch", ጩ: "ch", ጪ: "ch", ጫ: "ch", ጬ: "ch", ጭ: "ch", ጮ: "ch",
  ጰ: "p", ጱ: "p", ጲ: "p", ጳ: "p", ጴ: "p", ጵ: "p", ጶ: "p",
  ጸ: "ts", ጹ: "ts", ጺ: "ts", ጻ: "ts", ጼ: "ts", ጽ: "ts", ጾ: "ts",
  ፀ: "ts", ፁ: "ts", ፂ: "ts", ፃ: "ts", ፄ: "ts", ፅ: "ts", ፆ: "ts",
  ፈ: "f", ፉ: "f", ፊ: "f", ፋ: "f", ፌ: "f", ፍ: "f", ፎ: "f",
  ፐ: "p", ፑ: "p", ፒ: "p", ፓ: "p", ፔ: "p", ፕ: "p", ፖ: "p",
}

function normalize(value: string) {
  const withArabicDigits = value.replace(/[፩-፲]/g, (m) => ETHIOPIC_DIGITS[m] ?? m)
  return withArabicDigits
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function transliterateGeez(value: string) {
  return value
    .split("")
    .map((char) => GEEZ_TO_LATIN[char] ?? char)
    .join("")
}

function consonantSkeleton(value: string) {
  return normalize(value)
    .replace(/[aeiou]/g, "")
    .replace(/q/g, "k")
    .replace(/x/g, "s")
    .replace(/c/g, "k")
    .replace(/\s+/g, "")
}

function queryVariants(rawQuery: string) {
  const q = normalize(rawQuery)
  if (!q) return []

  const variants = new Set<string>([q])
  const compact = q.replace(/\s+/g, "")
  variants.add(compact)
  variants.add(normalize(transliterateGeez(q)))

  if (ROMAN_TO_AMHARIC_ALIASES[q]) {
    ROMAN_TO_AMHARIC_ALIASES[q].forEach((alias) => variants.add(normalize(alias)))
  }
  if (ROMAN_TO_AMHARIC_ALIASES[compact]) {
    ROMAN_TO_AMHARIC_ALIASES[compact].forEach((alias) => variants.add(normalize(alias)))
  }

  variants.add(consonantSkeleton(q))

  return Array.from(variants)
}

function filterItemsByQuery<T extends { title: string }>(items: T[], rawQuery: string) {
  const variants = queryVariants(rawQuery)
  if (variants.length === 0) return items

  const queryTerms = normalize(rawQuery).split(" ").filter(Boolean)

  return items.filter((item) => {
    const title = normalize(item.title)
    const latinTitle = normalize(transliterateGeez(item.title))
    const titleSkeleton = consonantSkeleton(latinTitle)
    const matchesVariant = variants.some((variant) => {
      if (!variant) return false
      const variantSkeleton = consonantSkeleton(variant)
      return (
        title.includes(variant) ||
        latinTitle.includes(variant) ||
        titleSkeleton.includes(variantSkeleton)
      )
    })

    if (matchesVariant) return true

    return queryTerms.every((term) => {
      const normalizedTerm = normalize(term)
      const latinTerm = normalize(transliterateGeez(term))
      const termSkeleton = consonantSkeleton(normalizedTerm)
      return (
        title.includes(normalizedTerm) ||
        title.includes(latinTerm) ||
        latinTitle.includes(normalizedTerm) ||
        latinTitle.includes(latinTerm) ||
        titleSkeleton.includes(termSkeleton)
      )
    })
  })
}

function sortByNewestFirst<T extends { addedAt?: string }>(items: T[]) {
  return [...items].sort((a, b) => {
    const aTime = a.addedAt ? Date.parse(a.addedAt) : 0
    const bTime = b.addedAt ? Date.parse(b.addedAt) : 0
    return bTime - aTime
  })
}

function extractTag(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`))
  return match?.[1]?.trim() ?? ""
}

function decodeXml(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
}

async function fetchPlaylistFeed(q: string) {
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`
  const res = await fetch(feedUrl, { next: { revalidate: 600 } })
  if (!res.ok) return []

  const xml = await res.text()
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? []

  const items = entries
    .map<PlaylistItem | null>((entry) => {
      const videoId = extractTag(entry, "yt:videoId")
      const title = decodeXml(extractTag(entry, "title"))
      if (!videoId || !title) return null
      return {
        id: videoId,
        title,
        thumb: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        addedAt: extractTag(entry, "published") || extractTag(entry, "updated"),
      }
    })
    .filter((item): item is PlaylistItem => item !== null)

  const filtered = filterItemsByQuery(sortByNewestFirst(items), q)
  return filtered.slice(0, 24)
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim().toLowerCase() ?? ""
  const key = process.env.YOUTUBE_API_KEY

  if (!key) {
    const feedItems = await fetchPlaylistFeed(q)
    if (feedItems.length > 0) {
      return NextResponse.json({ items: feedItems, source: "youtube-feed-no-key" })
    }

    return NextResponse.json({
      items: filterItemsByQuery(FALLBACK_ITEMS, q),
      source: "fallback-no-key",
    })
  }

  const parsed: PlaylistItem[] = []
  let pageToken = ""

  do {
    const endpoint = new URL("https://www.googleapis.com/youtube/v3/playlistItems")
    endpoint.searchParams.set("part", "snippet")
    endpoint.searchParams.set("maxResults", "50")
    endpoint.searchParams.set("playlistId", PLAYLIST_ID)
    endpoint.searchParams.set("key", key)
    if (pageToken) endpoint.searchParams.set("pageToken", pageToken)

    const res = await fetch(endpoint.toString(), { next: { revalidate: 600 } })
    if (!res.ok) {
      return NextResponse.json({ items: FALLBACK_ITEMS, source: "fallback-fetch-failed" })
    }

    const data = (await res.json()) as {
      nextPageToken?: string
      items?: Array<{
        snippet?: {
          title?: string
          publishedAt?: string
          resourceId?: { videoId?: string }
          thumbnails?: { medium?: { url?: string }; default?: { url?: string } }
        }
      }>
    }

    parsed.push(
      ...(data.items ?? [])
        .map((item) => {
          const title = item.snippet?.title ?? ""
          const id = item.snippet?.resourceId?.videoId ?? ""
          const thumb = item.snippet?.thumbnails?.medium?.url ?? item.snippet?.thumbnails?.default?.url ?? ""
          const addedAt = item.snippet?.publishedAt ?? ""
          return { id, title, thumb, addedAt }
        })
        .filter((item) => Boolean(item.id) && Boolean(item.title)),
    )

    pageToken = data.nextPageToken ?? ""
  } while (pageToken)

  const filtered = filterItemsByQuery(sortByNewestFirst(parsed), q)
  return NextResponse.json({ items: filtered.slice(0, 24), source: "youtube-api" })
}
