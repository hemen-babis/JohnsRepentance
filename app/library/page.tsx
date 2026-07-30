"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"

import {
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  Play,
  Headphones,
  Globe,
  FileText,
  SlidersHorizontal,
  ArrowRight,
  BookOpen,
  Layers,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  defaultFilters,
  filterOptions,
  libraryResources,
  type FilterKey,
  type LibraryFilters,
  type LibraryResource,
} from "./library-data"

// ── Warm gradients — no blue ──────────────────────────────────────────────────
const CHURCH_GRADIENT: Record<string, string> = {
  "Coptic Orthodox":    "from-amber-600 via-orange-700 to-orange-800",
  "Ethiopian Orthodox": "from-yellow-600 via-amber-700 to-amber-800",
  "Eritrean Orthodox":  "from-red-600 via-red-700 to-orange-800",
  "Armenian Apostolic": "from-rose-700 via-red-800 to-red-900",
  "Syriac Orthodox":    "from-amber-700 via-orange-800 to-red-800",
  "Malankara Orthodox": "from-yellow-600 via-amber-600 to-orange-700",
  "Oriental Orthodox":     "from-amber-500 via-orange-600 to-orange-700",
}

const RESOURCE_LOGO = "/images/johns-repentance-resource-logo.png"

// ── Shelf definitions ─────────────────────────────────────────────────────────
type ShelfDef = {
  id: string
  title: string
  amharicTitle?: string        // Bilingual: Amharic name for this section
  emoji: string
  subtitle: string
  accent?: string
  filter: (r: LibraryResource) => boolean
}

type LibrarySeriesDef = {
  id: string
  title: string
  subtitle: string
  aliases: string[]
  matches: (resource: LibraryResource) => boolean
}

type LibraryListItem =
  | { kind: "resource"; resource: LibraryResource }
  | { kind: "series"; id: string; def: LibrarySeriesDef; resources: LibraryResource[]; representative: LibraryResource }

function hasTopic(resource: LibraryResource, topics: string[]) {
  return topics.some((topic) => resource.topics.includes(topic))
}

function isLocalBook(resource: LibraryResource) {
  return resource.url.startsWith("/books/")
}

function isVideoTeaching(resource: LibraryResource) {
  return (
    resource.type === "Video" &&
    (hasTopic(resource, ["sermons", "sibket", "teaching", "teachings", "media"]) ||
      resource.church === "Ethiopian Orthodox")
  )
}

// Amharic keyword helpers — catch uncategorized local books by their Amharic titles
function titleHas(r: LibraryResource, ...kw: string[]) {
  return kw.some((k) => r.title.includes(k))
}
function hasPrayerKw(r: LibraryResource)   { return titleHas(r, "ጸሎት", "ፀሎት", "ጾም", "ንስሐ", "ንስሓ") }
function hasLiturgyKw(r: LibraryResource)  { return titleHas(r, "ቁርባን", "ቅዳሴ", "ክህነት", "ዲቁና", "ጥምቀት", "ሰዓታት", "መጽሐፈ ምስጢር") }
function hasSaintsKw(r: LibraryResource)   { return titleHas(r, "ቅዱሳን", "ሰማዕት", "ገድለ", "ማርያም", "እምቤ", "እመቤ") }
function hasGeezKw(r: LibraryResource)     { return titleHas(r, "ግዕዝ", "ቅኔ", "ዜማ", "ዝማሬ") }
function hasHistoryKw(r: LibraryResource)  { return titleHas(r, "ወርቃማ ዘመናት", "ነገረ አበው", "ምንኩስና") }

const SHELVES: ShelfDef[] = [
  {
    id: "on-this-site",
    title: "Start on This Site",
    amharicTitle: "ጀምር",
    emoji: "✦",
    subtitle: "Main tools and pages built into John's Repentance",
    accent: "from-orange-700 via-amber-700 to-yellow-700",
    filter: (r) => r.url.startsWith("/") && !r.url.startsWith("/books/"),
  },
  {
    id: "curriculum",
    title: "Curriculum & Classes",
    amharicTitle: "ትምህርት",
    emoji: "▦",
    subtitle: "Sunday school, graded lessons, course outlines, and study programs",
    accent: "from-red-800 via-orange-700 to-amber-600",
    filter: (r) => r.purpose === "Curriculum",
  },
  {
    id: "servants",
    title: "Servants & Teachers",
    amharicTitle: "አገልጋዮች",
    emoji: "▣",
    subtitle: "Formation and preparation for teaching, service, and ministry",
    accent: "from-stone-800 via-red-800 to-orange-700",
    filter: (r) => r.purpose === "Servant Prep",
  },
  {
    id: "catechumen",
    title: "New to Orthodoxy",
    amharicTitle: "ለጀማሪዎች",
    emoji: "✦",
    subtitle: "Beginner-friendly faith, doctrine, worship, and parish-life resources",
    accent: "from-amber-700 via-orange-700 to-red-700",
    filter: (r) => r.purpose === "Catechumen" || (r.level === "Beginner" && hasTopic(r, ["doctrine", "theology", "introduction"])),
  },
  {
    id: "bible-study",
    title: "Bible Commentaries & Andemta",
    amharicTitle: "አንደምታ",
    emoji: "✚",
    subtitle: "Fr. Tadros Malaty, Andemta, epistle notes, questions, and Scripture study",
    accent: "from-stone-900 via-amber-800 to-orange-700",
    filter: (r) => hasTopic(r, ["bible study", "scripture", "commentary"]) || r.source === "Fr. Tadros Yacoub Malaty",
  },
  {
    id: "prayer-repentance",
    title: "Prayer, Fasting & Repentance",
    amharicTitle: "ጸሎትና ጾም",
    emoji: "✥",
    subtitle: "Prayer books, fasting helps, confession, repentance, and spiritual discipline",
    accent: "from-red-900 via-red-700 to-orange-600",
    filter: (r) =>
      hasTopic(r, ["prayer", "fasting", "repentance", "confession"]) ||
      (isLocalBook(r) && hasPrayerKw(r)),
  },
  {
    id: "liturgy-sacraments",
    title: "Liturgy & Sacraments",
    amharicTitle: "ቅዳሴና ምሥጢር",
    emoji: "✠",
    subtitle: "Kidase, Qurban, baptism, priesthood, church order, and sacramental guides",
    accent: "from-amber-800 via-yellow-700 to-orange-700",
    filter: (r) =>
      hasTopic(r, ["liturgy", "communion", "baptism", "sacraments", "church order", "canon law"]) ||
      (isLocalBook(r) && hasLiturgyKw(r)),
  },
  {
    id: "saints-theotokos",
    title: "Saints, Angels & St. Mary",
    amharicTitle: "ቅዱሳን ማርያም",
    emoji: "✹",
    subtitle: "Lives of saints, Gadl, Theotokos, angels, feasts, and holy sites",
    accent: "from-rose-800 via-red-700 to-amber-700",
    filter: (r) =>
      hasTopic(r, ["saints", "theotokos", "angels"]) ||
      (isLocalBook(r) && hasSaintsKw(r)),
  },
  {
    id: "geez-mezmur",
    title: "Ge'ez, Qene & Mezmur",
    amharicTitle: "ግዕዝ ቅኔ ዜማ",
    emoji: "♪",
    subtitle: "Language study, hymnody, zema, qene, and music resources",
    accent: "from-orange-800 via-amber-700 to-yellow-600",
    filter: (r) =>
      hasTopic(r, ["geez", "language", "mezmur", "hymns"]) ||
      (isLocalBook(r) && hasGeezKw(r)),
  },
  {
    id: "church-history",
    title: "Church History & Tradition",
    amharicTitle: "ታሪካችን",
    emoji: "▥",
    subtitle: "History, fathers, councils, monasticism, manuscripts, and Orthodox tradition",
    accent: "from-stone-900 via-stone-700 to-orange-800",
    filter: (r) =>
      hasTopic(r, ["church history", "fathers", "councils", "manuscripts"]) ||
      (isLocalBook(r) && hasHistoryKw(r)),
  },
  {
    id: "audio",
    title: "Audio Library",
    amharicTitle: "ድምጽ",
    emoji: "◉",
    subtitle: "Mezmur, readings, talks, and listenable resources",
    filter: (r) => r.type === "Audio",
  },
  {
    id: "sermons-media",
    title: "Sermons & Videos",
    amharicTitle: "ስብከት ቪዲዮ",
    emoji: "▶",
    subtitle: "Teaching channels, sermons, saint films, and Orthodox video resources",
    filter: (r) => r.type === "Video",
  },
  {
    id: "english-reading",
    title: "English Spiritual Reading",
    amharicTitle: "English",
    emoji: "▤",
    subtitle: "Books and PDFs in English that are not class curriculum",
    filter: (r) =>
      (r.type === "Book" || r.type === "PDF") &&
      r.language === "English" &&
      r.purpose !== "Curriculum" &&
      !hasTopic(r, ["bible study", "scripture", "commentary"]),
  },
  {
    id: "other-eotc",
    title: "Other Ethiopian & Amharic Resources",
    amharicTitle: "ሌሎች ሀብቶች",
    emoji: "፩",
    subtitle: "All remaining Ethiopian Orthodox and Amharic resources from the collection",
    filter: (r) =>
      isLocalBook(r) &&
      (r.church === "Ethiopian Orthodox" || r.language === "Amharic") &&
      r.purpose === "General Knowledge" &&
      r.type !== "Audio" &&
      !isVideoTeaching(r) &&
      !hasTopic(r, [
        "bible study", "scripture", "commentary",
        "prayer", "fasting", "repentance", "confession",
        "liturgy", "communion", "baptism", "sacraments", "church order", "canon law",
        "saints", "theotokos", "angels",
        "geez", "language", "mezmur", "hymns",
        "church history", "fathers", "councils", "manuscripts",
      ]) &&
      !hasPrayerKw(r) && !hasLiturgyKw(r) && !hasSaintsKw(r) && !hasGeezKw(r) && !hasHistoryKw(r),
  },
  {
    id: "websites",
    title: "Websites & Research Links",
    amharicTitle: "ድረ-ገጾች",
    emoji: "⌁",
    subtitle: "Official sites, articles, libraries, and external study portals",
    filter: (r) => r.type === "Website" || r.type === "Article",
  },
]

const SERIES_DEFS: LibrarySeriesDef[] = [
  // ── Already-defined core series ───────────────────────────────────────────
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

  // ── Volumes with identical base titles ───────────────────────────────────
  {
    id: "series-metshafe-mistir",
    title: "Books መጽሐፈ ምስጢር",
    subtitle: "Ethiopian Orthodox liturgical mystery texts – volumes 1–25",
    aliases: ["metshafe mistir", "metsiafe mistir", "book of mysteries", "metsehafe mistir"],
    matches: (resource) =>
      resource.title.includes("Books") && resource.title.includes("ምስጢር"),
  },
  {
    id: "series-tinsae-geez",
    title: "ትንሳኤ ግዕዝ",
    subtitle: "Ge'ez resurrection hymns and chants collection",
    aliases: ["tinsae geez", "tinsae gez", "resurrection hymns geez"],
    matches: (resource) =>
      resource.title.includes("ትንሳኤ ግ") || resource.title.includes("ትንሳኤ ግዕዝ") ||
      resource.url.toLowerCase().includes("tinsae geez"),
  },
  {
    id: "series-tsinu-hun",
    title: "ጺኑ ሁን",
    subtitle: "Three-volume Christian character and conduct series",
    aliases: ["tsinu hun", "be committed", "kifl 1 2 3"],
    matches: (resource) =>
      resource.url.toLowerCase().includes("tsinu hun"),
  },
  {
    id: "series-werqama-zemenat",
    title: "ወርቃማ ዘመናት",
    subtitle: "Ethiopian Orthodox Church golden ages – multi-volume history",
    aliases: ["werqama zemenat", "golden ages eotc", "ye ethiopia betekristian werqama zemenat"],
    matches: (resource) =>
      resource.title.includes("ወርቃማ ዘመናት"),
  },
  {
    id: "series-mistire-slase",
    title: "ምሥጢረ ሥላሴ",
    subtitle: "The Mystery of the Holy Trinity – doctrinal collection",
    aliases: ["mistire slase", "mystery of the trinity", "mustirisalase"],
    matches: (resource) =>
      resource.title.includes("ምሥጢረ ሥላሴ") || resource.title.includes("ምስጢረ ሥላሴ"),
  },
  {
    id: "series-mistire-sgawe",
    title: "ምሥጢረ ሥጋዌ",
    subtitle: "The Mystery of the Incarnation – theological collection",
    aliases: ["mistire sgawe", "mystery of the incarnation", "neger sgawe"],
    matches: (resource) =>
      resource.title.includes("ምሥጢረ ሥጋዌ") || resource.title.includes("ምስጢረ ሥጋዌ"),
  },
  {
    id: "series-ye-biluy-kidan",
    title: "የብሉይ ኪዳን",
    subtitle: "Old Testament study and commentary volumes",
    aliases: ["ye biluy kidan", "old testament study", "biluy kidan"],
    matches: (resource) =>
      resource.url.toLowerCase().includes("biluy kidan"),
  },
  {
    id: "series-ye-menfes-kidus-sitotawoch",
    title: "የመንፈስ ቅዱስ ስጦታዎች",
    subtitle: "Gifts of the Holy Spirit – paired volumes",
    aliases: ["ye menfes kidus sitotawoch", "gifts of the holy spirit"],
    matches: (resource) =>
      resource.url.toLowerCase().includes("ye menfes kidus sitotawoch"),
  },
  {
    id: "series-ye-rome-melikt",
    title: "ወደ ሮሜ ሰዎች – ጥናት",
    subtitle: "Paul's Letter to Romans – commentary and study volumes",
    aliases: ["ye rome melikt", "ye rome tirigwame", "romans commentary amharic"],
    matches: (resource) =>
      resource.url.toLowerCase().includes("ye rome melikt") ||
      resource.url.toLowerCase().includes("ye rome meliikt") ||
      resource.url.toLowerCase().includes("ye rome tirigwame"),
  },
  {
    id: "series-fire-liqawint",
    title: "ፍሬ ሊቃውንት",
    subtitle: "Fruits of the Scholars – two-volume spiritual teaching",
    aliases: ["fire liqawint", "fire likawunt", "fire haymanot", "fre liqawint"],
    matches: (resource) =>
      resource.url.toLowerCase().includes("fire likawunt") ||
      resource.url.toLowerCase().includes("fire haymanot"),
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

  // ── Liturgical collections ────────────────────────────────────────────────
  {
    id: "series-wedase-mariam",
    title: "ውዳሴ ማርያም",
    subtitle: "Praise of Mary – various editions and commentaries",
    aliases: ["wedase mariam", "praise of mary", "kidase mariam"],
    matches: (resource) =>
      resource.title.includes("ውዳሴ ማርያም") || resource.url.toLowerCase().includes("wedase"),
  },
  {
    id: "series-sreate-mahleh",
    title: "ሥርዓተ ማኅሌት",
    subtitle: "Mahlét liturgical ceremony books by feast day",
    aliases: ["sreate mahleh", "sireate mahleh", "mahlet ceremony"],
    matches: (resource) =>
      resource.title.includes("ሥርዓተ ማኅሌት"),
  },
  {
    id: "series-hmamat",
    title: "ሰሙነ ሕማማት",
    subtitle: "Holy Week liturgy – daily services from Palm Sunday to Holy Saturday",
    aliases: ["semiyne hmamat", "holy week liturgy", "gebre hmamat", "passion week"],
    matches: (resource) =>
      resource.title.includes("ሰሙነ ሕማማት") ||
      resource.title.includes("ሕማማት") && resource.title.includes("ግብረ"),
  },
  {
    id: "series-qurban",
    title: "ምሥጢረ ቁርባን",
    subtitle: "Holy Communion – sacramental texts and teachings",
    aliases: ["qurban", "qurbana", "holy communion", "eucharist amharic"],
    matches: (resource) =>
      resource.title.includes("ቁርባን") &&
      !resource.title.includes("ሥርዓተ"),
  },
  {
    id: "series-fitiha-negest",
    title: "ፍትሐ ነገሥት",
    subtitle: "Canon law of the kings – ecclesiastical law collection",
    aliases: ["fitiha negest", "fetha negest", "canon law ethiopia"],
    matches: (resource) =>
      resource.title.includes("ፍትሐ ነገሥት"),
  },

  // ── Fasting & Lent ───────────────────────────────────────────────────────
  {
    id: "series-tsom",
    title: "ጾም",
    subtitle: "Ethiopian Orthodox fasting – spiritual guides and pamphlets",
    aliases: ["tsom", "fasting", "som", "lenten resources"],
    matches: (resource) =>
      resource.title.startsWith("ጾም") &&
      !resource.title.includes("ሕማማት"),
  },

  // ── Paul's Epistles ──────────────────────────────────────────────────────
  {
    id: "series-paul-epistles",
    title: "ጳውሎስ – መልዕክታት",
    subtitle: "Paul's Letters – all epistles, study and commentary volumes",
    aliases: ["paul epistles", "pauline letters", "wede X sewoch", "letters of paul amharic", "pauline commentary"],
    matches: (resource) =>
      (resource.title.startsWith("ወደ ") && resource.title.includes("ሰዎ")) ||
      resource.title === "1ኛ ቆረንጦስ" ||
      resource.title === "1ኛ ተሰሎንቄ" ||
      resource.title === "1ኛ ጢሞቲዎስ" ||
      resource.title === "2ኛ ጢሞቲዎስ",
  },

  // ── Chrysostom Homilies ──────────────────────────────────────────────────
  {
    id: "series-chrysostom-homilies",
    title: "Homilies on the NT – John Chrysostom",
    subtitle: "St. John Chrysostom's homilies on the New Testament epistles and Gospels",
    aliases: ["chrysostom homilies", "homilies on X EN", "john chrysostom commentary"],
    matches: (resource) =>
      resource.title.startsWith("Homilies On"),
  },

  // ── Ancient Christian Commentary on Scripture (ACCS) ─────────────────────
  {
    id: "series-accs",
    title: "Ancient Christian Commentary on Scripture",
    subtitle: "Patristic commentary on every book of the Bible – full ACCS series",
    aliases: ["ACCS", "ancient christian commentary", "patristic bible commentary"],
    matches: (resource) =>
      resource.title.includes("Ancient Christian Commentary") ||
      resource.title.includes("Ancient Christian Commentary On Scripture"),
  },

  // ── ፍኖተ (Path/Way) Spiritual Guides ────────────────────────────────────
  {
    id: "series-finote",
    title: "ፍኖተ – ጎዳና",
    subtitle: "Ethiopian Orthodox 'Path of...' spiritual guide series",
    aliases: ["finote", "fenote", "path of", "way of"],
    matches: (resource) =>
      resource.title.startsWith("ፍኖተ") || resource.title.startsWith("a ፍኖተ"),
  },

  // ── Mahibere Kidusan ─────────────────────────────────────────────────────
  {
    id: "series-mahibere-kidusan",
    title: "ማህበረ ቅዱሳን",
    subtitle: "Publications and teachings from Mahibere Kidusan",
    aliases: ["mahibere kidusan", "mahber qidusan", "association of the saints"],
    matches: (resource) =>
      resource.title.includes("ማህበረ ቅዱሳን") || resource.title.includes("ማኅበረ ቅዱሳን"),
  },

  // ── Church Councils ──────────────────────────────────────────────────────
  {
    id: "series-gubaee",
    title: "ጉባኤ",
    subtitle: "Ecumenical Church Council documents",
    aliases: ["gubaee", "church council", "council documents"],
    matches: (resource) =>
      resource.title.startsWith("ጉባኤ ") &&
      !resource.title.includes("ቃናዎ"),
  },

  // ── Audio tracks ─────────────────────────────────────────────────────────
  {
    id: "series-track-audio",
    title: "Audio Tracks",
    subtitle: "Ethiopian Orthodox audio lecture series",
    aliases: ["audio track", "track series"],
    matches: (resource) =>
      /^Track\d/.test(resource.title) && resource.type === "Audio",
  },

  // ── Bible Q&A Series (67 books) ──────────────────────────────────────────
  {
    id: "series-bible-qa",
    title: "ጥያቄና መልስ – ስለ ቅዱሳት መጻሕፍት",
    subtitle: "Questions & answers on every book of the Bible – 67-volume series",
    aliases: ["tiyaqena meles", "bible questions answers amharic", "yatetyaqu tiyaqewoch melsochachew"],
    matches: (resource) =>
      resource.title.includes("ላይ የተ") && resource.title.includes("ጥያቄ"),
  },

  // ── Gospel Chapter Studies (44 books) ────────────────────────────────────
  {
    id: "series-luqa-chapters",
    title: "ሉቃስ – ምዕራፍ",
    subtitle: "Gospel of Luke chapter-by-chapter study series",
    aliases: ["luqa meraf", "lukas chapters", "luke study amharic"],
    matches: (resource) =>
      /^ሉቃ \d/.test(resource.title),
  },
  {
    id: "series-yohanes-chapters",
    title: "ዮሐንስ – ምዕራፍ",
    subtitle: "Gospel of John chapter-by-chapter study series",
    aliases: ["yohannes meraf", "john chapters", "gospel of john amharic study"],
    matches: (resource) =>
      /^ዮሐ \d/.test(resource.title),
  },
  {
    id: "series-marqos-chapters",
    title: "ማርቆስ – ምዕራፍ",
    subtitle: "Gospel of Mark chapter-by-chapter study series",
    aliases: ["marqos meraf", "mark chapters", "gospel of mark amharic study"],
    matches: (resource) =>
      /^ማር \d/.test(resource.title),
  },
  {
    id: "series-matewos-chapters",
    title: "ማቴዎስ – ምዕራፍ",
    subtitle: "Gospel of Matthew chapter-by-chapter study series",
    aliases: ["matewos meraf", "matthew chapters", "gospel of matthew amharic study"],
    matches: (resource) =>
      /^ማቴ \d/.test(resource.title),
  },

  // ── ትምህርተ ሃይማኖት Graded Curriculum ────────────────────────────────────────
  {
    id: "series-timhirte-haymanot",
    title: "ትምህርተ ሃይማኖት",
    subtitle: "Graded Orthodox catechism curriculum series",
    aliases: ["timhirte haymanot", "religious education amharic", "catechism graded"],
    matches: (resource) =>
      resource.title.includes("ትምህርተ ሃይ"),
  },

  // ── ሀሐኀ Fidel / Ge'ez Alphabet Series ───────────────────────────────────
  {
    id: "series-hadahah",
    title: "ሀሐኀ",
    subtitle: "Ethiopic fidel alphabet graded workbook series",
    aliases: ["hadahah", "fidel", "ethiopic alphabet", "geez script graded"],
    matches: (resource) =>
      resource.title.includes("ሀሐኀ"),
  },

  // ── ቅዳሴ Types ────────────────────────────────────────────────────────────
  {
    id: "series-kidase-types",
    title: "ቅዳሴ – ዓይነቶች",
    subtitle: "Ethiopian Orthodox anaphoras – all liturgy types",
    aliases: ["kidase types", "anaphora", "qidase mariysam hawariat"],
    matches: (resource) =>
      resource.title.startsWith("ቅዳሴ ") && resource.title.length < 40,
  },
]

const filterLabels: Record<FilterKey, string> = {
  purpose: "Purpose",
  church: "Church",
  type: "Type",
  language: "Language",
  level: "Level",
}

function searchableText(r: LibraryResource) {
  return [r.title, r.description, r.church, r.source, r.purpose, r.type, r.language, r.topics.join(" "), r.aliases?.join(" ")]
    .join(" ")
    .toLowerCase()
}

function readInitialLibraryState() {
  if (typeof window === "undefined") {
    return {
      searchQuery: "",
      filters: defaultFilters,
      activeShelfId: null as string | null,
      showBrowseAll: false,
    }
  }

  const params = new URLSearchParams(window.location.search)
  const nextFilters: LibraryFilters = { ...defaultFilters }
  ;(Object.keys(filterOptions) as FilterKey[]).forEach((key) => {
    const value = params.get(key)
    if (value && (filterOptions[key] as readonly string[]).includes(value)) {
      if (key === "purpose") nextFilters.purpose = value as LibraryFilters["purpose"]
      if (key === "church") nextFilters.church = value as LibraryFilters["church"]
      if (key === "type") nextFilters.type = value as LibraryFilters["type"]
      if (key === "language") nextFilters.language = value as LibraryFilters["language"]
      if (key === "level") nextFilters.level = value as LibraryFilters["level"]
    }
  })

  const shelf = params.get("shelf")
  const activeShelfId = shelf && SHELVES.some((item) => item.id === shelf) ? shelf : null

  return {
    searchQuery: params.get("q") ?? "",
    filters: nextFilters,
    activeShelfId,
    showBrowseAll: false,
  }
}

function normalizeSearch(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’'`]/g, "")
    .trim()
}

function resourceSortScore(resource: LibraryResource) {
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

function sortResources(resources: LibraryResource[]) {
  return [...resources].sort((a, b) => {
    const byScore = resourceSortScore(a) - resourceSortScore(b)
    if (byScore !== 0) return byScore
    return a.title.localeCompare(b.title, "en")
  })
}

function seriesForResource(resource: LibraryResource) {
  return SERIES_DEFS.find((series) => series.matches(resource)) ?? null
}

function volumeSortScore(resource: LibraryResource) {
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

function sortSeriesVolumes(resources: LibraryResource[]) {
  return [...resources].sort((a, b) => {
    const byVolume = volumeSortScore(a) - volumeSortScore(b)
    if (byVolume !== 0) return byVolume
    return a.title.localeCompare(b.title, "en")
  })
}

function buildLibraryItems(resources: LibraryResource[]): LibraryListItem[] {
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

// Curriculum shelves are shown as feature cards at the top; browse shelves as scroll rows
const CURRICULUM_IDS = new Set(["on-this-site", "catechumen", "curriculum", "servants"])
const BROWSE_SHELVES = SHELVES.filter((s) => !CURRICULUM_IDS.has(s.id))
const PRIMARY_BROWSE_IDS = new Set([
  "bible-study",
  "prayer-repentance",
  "liturgy-sacraments",
  "saints-theotokos",
  "geez-mezmur",
  "audio",
  "sermons-media",
  "english-reading",
])

const FEATURED_BOOKSTORE_SHELVES = ["catechumen", "prayer-repentance", "geez-mezmur", "bible-study"]
const CURATED_COLLECTION_IDS = ["bible-study", "prayer-repentance", "liturgy-sacraments", "saints-theotokos", "geez-mezmur", "english-reading"]
const BOOKSTORE_PREVIEW_IDS = ["geez-mezmur", "bible-study", "prayer-repentance"]

// ── Section Navigator ─────────────────────────────────────────────────────────
function SectionNavigator({ resources }: { resources: LibraryResource[] }) {
  const scrollToShelf = (shelfId: string) => {
    const el = document.getElementById(`shelf-${shelfId}`)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-4 md:px-8">
      <div
        className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
        aria-label="Jump to section"
      >
        {BROWSE_SHELVES.filter((shelf) => PRIMARY_BROWSE_IDS.has(shelf.id)).map((shelf) => {
          const count = resources.filter(shelf.filter).length
          if (count === 0) return null
          return (
            <button
              key={shelf.id}
              onClick={() => scrollToShelf(shelf.id)}
              className={cn(
                "group inline-flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2.5 text-left transition-all duration-150",
                "border-amber-200/80 bg-white/90 text-stone-800 shadow-sm",
                "hover:-translate-y-0.5 hover:border-orange-300 hover:bg-gradient-to-b hover:from-amber-50 hover:to-white hover:shadow-md",
                "dark:border-stone-800/80 dark:bg-stone-900/90 dark:text-white dark:hover:border-orange-800/60 dark:hover:bg-stone-800/90",
              )}
            >
              <span className="text-lg leading-none">{shelf.emoji}</span>
              <span className="min-w-0">
                <span className="jr-card-title block max-w-[128px] truncate text-[12px] font-black text-stone-800 group-hover:text-stone-950 dark:text-stone-200 dark:group-hover:text-white">
                  {shelf.title}
                </span>
                {shelf.amharicTitle && (
                  <span className="block truncate text-[10px] font-bold leading-tight text-orange-700 dark:text-orange-400">
                    {shelf.amharicTitle}
                  </span>
                )}
              </span>
              <span className="jr-badge rounded-full bg-orange-100 px-2 py-0.5 text-[9px] font-black text-orange-700 dark:bg-orange-950/60 dark:text-orange-300">
                {count}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function LibraryPage() {
  const initialState = useMemo(readInitialLibraryState, [])
  const [searchQuery, setSearchQuery] = useState(initialState.searchQuery)
  const [filters, setFilters] = useState<LibraryFilters>(initialState.filters)
  const [showBrowseAll, setShowBrowseAll] = useState(initialState.showBrowseAll)
  const [activeShelfId, setActiveShelfId] = useState<string | null>(initialState.activeShelfId)
  const [visibleSearchCount, setVisibleSearchCount] = useState(84)
  const [visibleGridCount, setVisibleGridCount] = useState(72)
  const browseAllRef = useRef<HTMLDivElement>(null)

  const isSearching = searchQuery.trim().length > 0
  const activeShelf = activeShelfId ? SHELVES.find((shelf) => shelf.id === activeShelfId) ?? null : null
  const hasFilters = isSearching || Boolean(activeShelf) || Object.values(filters).some((v) => v !== "All")

  const filteredResources = useMemo(() => {
    const q = normalizeSearch(searchQuery)
    return sortResources(libraryResources.filter((r) => {
      const matchesSearch = !q || normalizeSearch(searchableText(r)).includes(q)
      const matchesShelf = !activeShelf || activeShelf.filter(r)
      const matchesFilters = (Object.entries(filters) as [FilterKey, string][]).every(
        ([k, v]) => v === "All" || r[k] === v
      )
      return matchesSearch && matchesShelf && matchesFilters
    }))
  }, [activeShelf, searchQuery, filters])
  const filteredItems = useMemo(() => buildLibraryItems(filteredResources), [filteredResources])
  const visibleSearchResults = filteredItems.slice(0, visibleSearchCount)
  const visibleGridResources = filteredItems.slice(0, visibleGridCount)

  useEffect(() => {
    const params = new URLSearchParams()
    if (searchQuery.trim()) params.set("q", searchQuery.trim())
    if (showBrowseAll) params.set("browse", "1")
    if (activeShelfId) params.set("shelf", activeShelfId)
    ;(Object.keys(filters) as FilterKey[]).forEach((key) => {
      if (filters[key] !== "All") params.set(key, filters[key])
    })

    const nextUrl = params.toString() ? `/library?${params.toString()}` : "/library"
    const currentUrl = `${window.location.pathname}${window.location.search}`
    if (nextUrl !== currentUrl) window.history.replaceState(null, "", nextUrl)
  }, [activeShelfId, filters, searchQuery, showBrowseAll])

  const clearAll = () => {
    setSearchQuery("")
    setFilters(defaultFilters)
    setActiveShelfId(null)
    setShowBrowseAll(false)
    setVisibleSearchCount(84)
    setVisibleGridCount(72)
  }

  const openBrowseAll = (shelfId?: string) => {
    setActiveShelfId(shelfId ?? null)
    setFilters(defaultFilters)
    setShowBrowseAll(true)
    setTimeout(() => browseAllRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80)
  }

  const chooseShelf = (shelfId: string) => {
    setSearchQuery("")
    openBrowseAll(shelfId)
  }

  const setSearchExample = (query: string) => {
    setActiveShelfId(null)
    setVisibleSearchCount(84)
    setSearchQuery(query)
  }

  return (
    <main className="light-mode-adaptive-page min-h-screen bg-[url('/images/mobile-parch.png?v=20260321')] bg-fixed bg-cover bg-center text-stone-900 dark:bg-none dark:text-white">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-20 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(251,191,36,0.15),transparent_54%)]" />

        {/* Ethiopian cross icon */}
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-orange-700/35 bg-white/50 shadow-lg backdrop-blur-sm dark:border-orange-800/40 dark:bg-stone-900/50">
          <svg viewBox="0 0 100 130" className="h-8 w-8" aria-hidden>
            <rect x="44" y="4" width="12" height="122" rx="2.5" fill="#9a3412" />
            <rect x="4" y="40" width="92" height="12" rx="2.5" fill="#9a3412" />
            <rect x="24" y="78" width="52" height="9" rx="2" fill="#9a3412" />
          </svg>
        </div>

        <p className="jr-kicker mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-orange-700 dark:text-orange-500">The Orthodox Library</p>

        <h1 className="jr-display bg-gradient-to-br from-[#c2410c] via-orange-500 to-amber-400 bg-clip-text text-[clamp(4rem,13vw,8.5rem)] font-black leading-none text-transparent dark:from-orange-500 dark:via-orange-400 dark:to-amber-300">
          The Library
        </h1>

        <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-stone-800 dark:text-stone-300">
          {libraryResources.length.toLocaleString()} curated resources for Ethiopian Orthodox study — books, PDFs, sermons, and more.
        </p>

        <button
          onClick={() => document.getElementById("library-explore")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#7c2d12] px-8 py-4 text-sm font-black text-white shadow-lg transition hover:bg-orange-900 dark:bg-orange-800 dark:hover:bg-orange-700"
        >
          Begin here
          <ArrowRight className="h-4 w-4" />
        </button>
      </section>

      {/* ── SEARCH ───────────────────────────────────────────────────────── */}
      <section className="px-4 pb-10 md:px-8">
        <div className="container mx-auto max-w-2xl">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
              <Input
                value={searchQuery}
                onChange={(e) => {
                  setVisibleSearchCount(168)
                  setSearchQuery(e.target.value)
                }}
                placeholder="Search the full collection..."
                className="h-[54px] rounded-2xl border border-stone-300/80 bg-white/95 pl-12 pr-12 text-base text-stone-900 placeholder:text-stone-400 shadow-lg shadow-stone-900/8 ring-0 focus-visible:border-orange-400 focus-visible:ring-0 dark:border-stone-700 dark:bg-stone-800/95 dark:text-white dark:placeholder:text-stone-500 dark:focus-visible:border-orange-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => openBrowseAll()}
              className="group flex h-[54px] items-center gap-2.5 rounded-2xl border-2 border-orange-300/70 bg-white/80 px-5 font-black text-orange-700 shadow-lg backdrop-blur transition-all duration-200 hover:border-orange-500 hover:bg-orange-600 hover:text-white hover:shadow-[0_8px_28px_rgba(194,65,12,0.28)] dark:border-orange-800/60 dark:bg-stone-900/80 dark:text-orange-400 dark:hover:border-orange-500 dark:hover:bg-orange-700 dark:hover:text-white"
            >
              <BookOpen className="h-5 w-5 transition-colors" />
              <span className="text-sm">Browse all</span>
            </button>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {[
              { term: "niseha", label: "Niseha" },
              { term: "kidase", label: "Kidase" },
              { term: "mariam", label: "Mariam" },
              { term: "prayer", label: "Prayer" },
              { term: "geez", label: "Ge'ez" },
            ].map(({ term, label }) => (
              <button
                key={term}
                onClick={() => setSearchExample(term)}
                className="jr-badge rounded-full border border-stone-300/60 bg-white/60 px-3 py-1.5 text-[10px] font-bold text-stone-600 transition hover:border-orange-300 hover:bg-white hover:text-orange-800 dark:border-stone-700 dark:bg-stone-900/60 dark:text-stone-400 dark:hover:border-orange-600 dark:hover:text-orange-300"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {false && !isSearching && (
        <section className="px-4 pb-5 md:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
              <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-orange-600 dark:text-orange-500">Browse by section</p>
                <h2 className="mt-1 text-xl font-black tracking-tight text-stone-950 dark:text-white">Find what you need</h2>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["curriculum", "bible-study", "prayer-repentance", "liturgy-sacraments", "saints-theotokos", "geez-mezmur", "audio", "websites"].map((shelfId) => {
                const shelf = SHELVES.find((item) => item.id === shelfId)
                if (!shelf) return null
                const count = libraryResources.filter(shelf.filter).length
                const active = activeShelfId === shelf.id
                return (
                  <button
                    key={shelf.id}
                    onClick={() => chooseShelf(shelf.id)}
                    className={cn(
                      "group inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-2 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
                      active
                        ? "border-orange-500 bg-orange-600 text-white"
                        : "border-amber-200/70 bg-white/86 text-stone-900 hover:border-orange-300 dark:border-stone-800 dark:bg-stone-900/86 dark:text-white"
                    )}
                  >
                    <BookOpen className={cn("h-3.5 w-3.5 shrink-0", active ? "text-amber-100" : "text-orange-700 dark:text-orange-400")} />
                    <span className="truncate text-xs font-black">{shelf.title}</span>
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-black", active ? "bg-white/16" : "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300")}>{count}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── SEARCH RESULTS ────────────────────────────────────────────────── */}
      {isSearching && (
        <section className="px-4 pb-16 md:px-8">
          <div className="container mx-auto max-w-7xl">
            <p className="mb-6 text-sm text-stone-500 dark:text-stone-400">
              <span className="font-bold text-stone-900 dark:text-white">
                {filteredItems.length} result{filteredItems.length !== 1 ? "s" : ""}
              </span>{" "}
              for &ldquo;{searchQuery}&rdquo;
              {filteredItems.length !== filteredResources.length && (
                <span className="text-stone-400"> · grouped from {filteredResources.length} resources</span>
              )}
            </p>
                {filteredItems.length > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {visibleSearchResults.map((item) => <LibraryItemCard key={item.kind === "series" ? item.id : item.resource.id} item={item} layout="grid" />)}
                </div>
                {visibleSearchResults.length < filteredItems.length && (
                  <div className="mt-10 flex justify-center">
                    <button
                      onClick={() => setVisibleSearchCount((count) => count + 84)}
                      className="rounded-full border border-amber-300 bg-white/85 px-6 py-3 text-sm font-bold text-stone-800 shadow-sm transition hover:border-orange-400 hover:bg-amber-50 dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:hover:border-orange-500"
                    >
                      Load more results
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="py-20 text-center">
                <h3 className="text-2xl font-bold text-stone-800 dark:text-white">Nothing found</h3>
                <p className="mt-2 text-stone-500">Try a different keyword.</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-6 rounded-full bg-orange-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-orange-500"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {false && !isSearching && (
        <section className="px-4 pb-14 md:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-orange-600 dark:text-orange-500">
                  Selected section
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-stone-950 dark:text-white">
                  {activeShelf?.title ?? "Recommended"}
                </h2>
                <p className="mt-1 max-w-xl text-sm text-stone-600 dark:text-stone-400">
                  {activeShelf?.subtitle ?? "A smaller set of useful resources from the main sections."}
                </p>
              </div>
              <span className="rounded-full border border-amber-200 bg-white/80 px-3 py-1 text-xs font-black text-orange-700 dark:border-stone-700 dark:bg-stone-900 dark:text-orange-300">
                {filteredResources.length} resources
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
              {visibleGridResources.map((resource) => (
                <LibraryItemCard key={resource.kind === "series" ? resource.id : resource.resource.id} item={resource} layout="grid" />
              ))}
            </div>

            {visibleGridResources.length < filteredItems.length && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setVisibleGridCount((count) => count + 96)}
                  className="rounded-full border border-amber-300 bg-white/85 px-6 py-3 text-sm font-bold text-stone-800 shadow-sm transition hover:border-orange-400 hover:bg-amber-50 dark:border-stone-700 dark:bg-stone-900 dark:text-white"
                >
                  Load more
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── CURRICULUM SECTION ───────────────────────────────────────────── */}
      {false && !isSearching && (
        <section className="px-4 pb-10 md:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-5 flex items-end gap-4">
              <div>
                <p className="jr-kicker text-[10px] font-bold text-orange-600 dark:text-orange-500">Structured Learning</p>
                <h2 className="jr-heading mt-1 text-3xl font-black text-stone-950 dark:text-white md:text-4xl">Curriculum & Study Paths</h2>
              </div>
              <div className="mb-1.5 h-px flex-1 bg-gradient-to-r from-amber-300/70 via-orange-200/40 to-transparent dark:from-orange-800/40 dark:to-transparent" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {SHELVES.filter((s) => CURRICULUM_IDS.has(s.id)).map((shelf) => (
                <CurriculumEntry key={shelf.id} shelf={shelf} resources={libraryResources} onOpen={openBrowseAll} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BOOKSTORE SECTION ────────────────────────────────────────────── */}
      <div id="library-explore">
        {!isSearching && (
          <BookstoreHome resources={libraryResources} onOpenShelf={openBrowseAll} onBrowseAll={() => openBrowseAll()} />
        )}
      </div>

      {/* ── BROWSE ALL ────────────────────────────────────────────────────── */}
      {!isSearching && (
        <section ref={browseAllRef} className="px-4 py-16 md:px-8">
          <div className="container mx-auto max-w-7xl">
            {showBrowseAll ? (
              <BrowseAll
                resources={libraryResources}
                filters={filters}
                setFilters={setFilters}
                hasFilters={hasFilters}
                activeShelf={activeShelf}
                setActiveShelfId={setActiveShelfId}
                clearAll={clearAll}
                filteredResources={filteredResources}
              />
            ) : (
              <div className="flex flex-col items-center gap-6">
                <button
                  onClick={() => openBrowseAll()}
                  className="group flex flex-col items-center gap-5"
                  aria-label="Browse all resources"
                >
                  {/* Pulsing ring */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full border-2 border-orange-400/40 transition-all duration-700 group-hover:scale-125 group-hover:border-orange-400/10" />
                    <div className="absolute inset-0 scale-110 rounded-full border border-orange-300/25 transition-all duration-500 group-hover:scale-[1.45] group-hover:border-orange-300/5" />
                    <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-amber-300/70 bg-white/80 shadow-[0_8px_36px_rgba(194,65,12,0.18)] backdrop-blur transition-all duration-200 group-hover:scale-105 group-hover:border-orange-400 group-hover:bg-amber-50 group-hover:shadow-[0_16px_48px_rgba(194,65,12,0.30)] dark:border-stone-600 dark:bg-stone-900/80 dark:group-hover:border-orange-500/70">
                      <BookOpen className="h-14 w-14 text-orange-600 transition-colors group-hover:text-orange-500 dark:text-orange-400" />
                    </div>
                  </div>
                  {/* Label */}
                  <div className="text-center">
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-600 dark:text-orange-500">Browse All</p>
                    <p className="mt-1 text-xs font-medium text-stone-400 dark:text-stone-500">
                      {libraryResources.length.toLocaleString()} resources
                    </p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getYouTubeThumbnail(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (m) return `https://img.youtube.com/vi/${m[1]}/mqdefault.jpg`
  return null
}

function isYouTubeChannel(url: string): boolean {
  return (
    url.includes("youtube.com") &&
    !url.includes("watch?v=") &&
    !url.includes("youtu.be/") &&
    !url.includes("/playlist")
  )
}

function getYouTubeChannelProxy(url: string): string {
  return `/api/yt-avatar?u=${encodeURIComponent(url)}`
}

function getWebsiteFavicon(url: string): string | null {
  if (url.startsWith("/")) return null
  try {
    return `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(url)}&sz=128`
  } catch {
    return null
  }
}

function getInternalThumbnail(resource: LibraryResource) {
  if (resource.coverImage) return resource.coverImage
  return RESOURCE_LOGO
}

function getResourceHref(resource: LibraryResource) {
  const extension = decodeURIComponent(resource.url).split("?")[0].split("#")[0].match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase()
  if (resource.url.startsWith("/books/") && (extension === "doc" || extension === "docx")) {
    return `/library/resource/${resource.id}`
  }
  return resource.url
}

// ── Image cover with fallback ─────────────────────────────────────────────────
function ImageCover({
  src,
  alt,
  fallback,
  className,
}: {
  src: string
  alt: string
  fallback: React.ReactNode
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  if (failed) return <>{fallback}</>
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-label={alt}
      loading="lazy"
      className={cn("absolute inset-0 h-full w-full bg-stone-100 object-cover text-transparent dark:bg-stone-900", className)}
      onError={() => setFailed(true)}
    />
  )
}

// ── Tiny cover — lightweight thumbnail for preview strips (no PDF rendering) ──
function TinyCover({ resource }: { resource: LibraryResource }) {
  const gradient = CHURCH_GRADIENT[resource.church] ?? "from-amber-600 via-orange-700 to-orange-800"
  const [imgFailed, setImgFailed] = useState(false)

  const imgSrc = !imgFailed
    ? resource.coverImage ||
      (resource.type === "Video" ? getYouTubeThumbnail(resource.url) : null)
    : null

  return (
    <div className="absolute inset-0">
      {imgSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imgSrc}
          alt=""
          loading="lazy"
          className="h-full w-full bg-stone-100 object-cover dark:bg-stone-900"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-stone-100 text-orange-700 dark:bg-stone-900 dark:text-orange-300">
          <div className={cn("absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r", gradient)} />
          <ResourceThumbnailIcon resource={resource} />
        </div>
      )}
    </div>
  )
}

// ── Curriculum entry card — shown in the "Curriculum & Study Paths" grid ──────
function CurriculumEntry({
  shelf,
  resources,
  onOpen,
}: {
  shelf: ShelfDef
  resources: LibraryResource[]
  onOpen: (shelfId: string) => void
}) {
  const items = useMemo(() => resources.filter(shelf.filter), [resources, shelf])
  if (items.length === 0) return null
  const accent = shelf.accent ?? "from-amber-600 to-orange-700"

  return (
    <button
      onClick={() => onOpen(shelf.id)}
      className={cn(
        "group relative min-h-[148px] w-full overflow-hidden rounded-2xl text-left transition-all duration-200",
        "shadow-md hover:-translate-y-1 hover:shadow-xl",
      )}
    >
      {/* Full gradient background */}
      <div className={cn("absolute inset-0 bg-gradient-to-br", accent)} />
      {/* Subtle noise overlay for texture */}
      <div className="absolute inset-0 opacity-[0.06] [background-image:url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />
      {/* Glow spot */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-2xl" />

      <div className="relative flex min-h-[148px] flex-col justify-between p-5">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-lg font-black text-white backdrop-blur-sm ring-1 ring-white/30">
              {shelf.emoji}
            </div>
            <span className="rounded-full bg-black/20 px-2.5 py-0.5 text-[10px] font-black text-white/90 backdrop-blur-sm">
              {items.length}
            </span>
          </div>
          <p className="jr-card-title line-clamp-1 text-[18px] font-black leading-tight text-white drop-shadow-sm">
            {shelf.title}
          </p>
          {shelf.amharicTitle && (
            <p className="mt-0.5 text-[12px] font-bold text-white/70">{shelf.amharicTitle}</p>
          )}
          <p className="mt-2 line-clamp-2 text-[12px] font-medium leading-5 text-white/70">
            {shelf.subtitle}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-1 text-[10px] font-black text-white/80">
          <span>Browse resources</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-1" />
        </div>
      </div>
    </button>
  )
}

function ShelfMark({ shelfId }: { shelfId: string }) {
  const image =
    shelfId === "on-this-site" || shelfId === "catechumen" || shelfId === "curriculum" || shelfId === "servants" ? RESOURCE_LOGO :
    shelfId === "bible-study" || shelfId === "english-reading" ? "/orthodox-card-bg.svg" :
    shelfId === "other-eotc" || shelfId === "geez-mezmur" ? "/images/home-hero.png" :
    shelfId === "sermons-media" ? "/images/pic1.png" :
    shelfId === "prayer-repentance" ? "/images/pic2.png" :
    RESOURCE_LOGO

  return (
    <span className="relative inline-flex h-8 w-8 shrink-0 overflow-hidden rounded-lg border border-amber-200 bg-white shadow-sm dark:border-orange-900/30 dark:bg-stone-900">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" className="h-full w-full object-cover" />
    </span>
  )
}

function ResourceThumbnailIcon({ resource }: { resource: LibraryResource }) {
  if (resource.type === "Video") return <Play className="h-8 w-8 fill-current" />
  if (resource.type === "Audio") return <Headphones className="h-8 w-8" />
  if (resource.type === "Website" || resource.type === "Article") return <Globe className="h-8 w-8" />
  if (resource.type === "Slides") return <FileText className="h-8 w-8" />
  return <BookOpen className="h-8 w-8" />
}

function thumbnailTheme(resource: LibraryResource) {
  if (resource.type === "Video") {
    return { bg: "from-[#1a0505] via-[#350b0b] to-[#5a1010]", accent: "from-red-400 to-orange-400", type: "text-red-400/60", src: "text-red-100/40" }
  }
  if (resource.type === "Audio") {
    return { bg: "from-[#060f14] via-[#0d2030] to-[#193344]", accent: "from-sky-400 to-teal-400", type: "text-sky-400/60", src: "text-sky-100/40" }
  }
  if (resource.type === "Website" || resource.type === "Article") {
    return { bg: "from-[#12100e] via-[#1f1c18] to-[#2e2822]", accent: "from-amber-400 to-yellow-300", type: "text-amber-400/60", src: "text-amber-100/40" }
  }
  if (resource.language === "English") {
    return { bg: "from-[#0c1520] via-[#132035] to-[#1a2e48]", accent: "from-blue-400 to-indigo-400", type: "text-blue-300/60", src: "text-blue-100/40" }
  }
  return { bg: "from-[#1c0d06] via-[#2e1709] to-[#3d2010]", accent: "from-orange-400 to-amber-300", type: "text-orange-400/60", src: "text-orange-100/40" }
}

function titleInitials(title: string) {
  const words = title
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean)

  if (words.length === 0) return "JR"
  if (/[\u1200-\u137f]/.test(words[0])) return words[0].slice(0, 2)
  return words.slice(0, 2).map((word) => word[0]?.toUpperCase()).join("")
}

function SimpleGeneratedThumbnail({ resource, favicon }: { resource: LibraryResource; favicon?: string | null }) {
  const shortType = resource.type === "Book" ? "PDF" : resource.type
  const titleLines = resource.title.split(/\s+/).slice(0, 14).join(" ")
  const theme = thumbnailTheme(resource)
  const src = resource.source || resource.church || ""

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-gradient-to-br", theme.bg)}>
      {/* Dot noise texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "16px 16px" }}
      />

      {/* Ethiopian cross watermark — faint, fills the card */}
      <svg viewBox="0 0 100 130" className="absolute inset-0 h-full w-full opacity-[0.055]" aria-hidden>
        <rect x="44" y="4" width="12" height="122" rx="2.5" fill="white" />
        <rect x="4" y="40" width="92" height="12" rx="2.5" fill="white" />
        <rect x="24" y="78" width="52" height="9" rx="2" fill="white" />
      </svg>

      {/* Right-side vignette */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-transparent" />

      {/* Book cover content */}
      <div className="absolute inset-0 flex flex-col p-3.5">
        {/* Type label — top */}
        <p className={cn("text-[7px] font-black uppercase tracking-[0.22em]", theme.type)}>
          {shortType}
        </p>

        {/* Spacer pushing title to center-bottom */}
        <div className="flex-1" />

        {/* Title — the hero element */}
        <p className="line-clamp-6 text-[13.5px] font-black leading-[1.15] text-white drop-shadow-sm">
          {titleLines}
        </p>

        {/* Divider + source */}
        <div className="mt-3 mb-1.5">
          <div className={cn("h-[2px] w-8 rounded-full bg-gradient-to-r", theme.accent)} />
        </div>
        {src && (
          <p className={cn("line-clamp-1 text-[7.5px] font-bold", theme.src)}>
            {src}
          </p>
        )}
        {favicon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={favicon} alt="" className="mt-1 h-5 w-5 rounded object-contain opacity-70" />
        )}
      </div>
    </div>
  )
}

// ── Resource Cover ─────────────────────────────────────────────────────────────
function ResourceCover({ resource }: { resource: LibraryResource }) {
  const isInternal = resource.url.startsWith("/") && !resource.url.startsWith("/books/")
  const websiteFavicon = getWebsiteFavicon(resource.url)
  const simpleFallback = <SimpleGeneratedThumbnail resource={resource} favicon={websiteFavicon} />

  if (isInternal) {
    const thumbnail = getInternalThumbnail(resource)
    return (
      <div className="absolute inset-0 bg-stone-950">
        <ImageCover
          src={thumbnail}
          alt={resource.title}
          fallback={simpleFallback}
          className="scale-[1.03] blur-[1.5px] brightness-[0.68] saturate-[0.82]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/28 to-black/10" />
        <div className="absolute left-2 top-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white/92 p-1.5 shadow ring-1 ring-white/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={RESOURCE_LOGO} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-2.5">
          <p className="line-clamp-2 text-[11px] font-black leading-tight text-white drop-shadow">{resource.title}</p>
          <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.16em] text-orange-200">Website</p>
        </div>
      </div>
    )
  }

  if (resource.type === "Video") {
    const thumb =
      resource.coverImage ||
      getYouTubeThumbnail(resource.url)

    if (thumb) {
      return (
        <div className="absolute inset-0">
          <ImageCover src={thumb} alt={resource.title} fallback={simpleFallback} />
          <div className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 shadow backdrop-blur-sm">
            <Play className="ml-0.5 h-3 w-3 fill-white text-white" />
          </div>
        </div>
      )
    }
    return <>{simpleFallback}</>
  }

  if (resource.coverImage) {
    return (
      <>
        <ImageCover src={resource.coverImage} alt={resource.title} fallback={simpleFallback} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-white/4 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      </>
    )
  }
  return <>{simpleFallback}</>
}

function BookstoreHome({
  resources,
  onOpenShelf,
  onBrowseAll,
}: {
  resources: LibraryResource[]
  onOpenShelf: (shelfId?: string) => void
  onBrowseAll: () => void
}) {
  const featuredShelves = FEATURED_BOOKSTORE_SHELVES.map((id) => SHELVES.find((shelf) => shelf.id === id)).filter(Boolean) as ShelfDef[]
  const collectionShelves = CURATED_COLLECTION_IDS.map((id) => SHELVES.find((shelf) => shelf.id === id)).filter(Boolean) as ShelfDef[]
  const previewShelves = BOOKSTORE_PREVIEW_IDS.map((id) => SHELVES.find((shelf) => shelf.id === id)).filter(Boolean) as ShelfDef[]
  const seriesItems = useMemo(() => buildLibraryItems(resources).filter((item): item is Extract<LibraryListItem, { kind: "series" }> => item.kind === "series"), [resources])
  const [showAllSeries, setShowAllSeries] = React.useState(false)
  const visibleSeries = showAllSeries ? seriesItems : seriesItems.slice(0, 12)

  return (
    <section className="px-4 pb-8 md:px-8">
      <div className="container mx-auto max-w-7xl space-y-12">
        <div className="rounded-3xl border border-amber-200/70 bg-white/76 p-4 shadow-xl shadow-stone-900/5 backdrop-blur dark:border-stone-800 dark:bg-stone-950/54 md:p-6">
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative overflow-hidden rounded-2xl bg-[#1a0c05] p-6 text-white shadow-lg md:p-8">
              <div className="absolute inset-0 opacity-30">
                <ResourceCover resource={sortResources(resources.filter((resource) => resource.coverImage))[0] ?? resources[0]} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a0c05] via-[#1a0c05]/88 to-[#1a0c05]/44" />
              <div className="relative max-w-xl">
                <p className="jr-kicker text-[10px] font-black text-orange-300">Curated first</p>
                <h2 className="jr-heading mt-2 text-3xl font-black leading-none md:text-5xl">
                  Start with a shelf, not a file list.
                </h2>
                <p className="mt-4 max-w-md text-sm font-medium leading-7 text-stone-200">
                  Browse the most useful paths first. When you need precision, open the full filtered catalog.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  <button
                    onClick={() => onOpenShelf("catechumen")}
                    className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-3 text-sm font-black text-white shadow transition hover:bg-orange-500"
                  >
                    Begin here
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={onBrowseAll}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white/16"
                  >
                    Browse all
                    <SlidersHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {featuredShelves.map((shelf) => (
                <BookstoreFeature key={shelf.id} shelf={shelf} resources={resources} onOpen={onOpenShelf} />
              ))}
            </div>
          </div>
        </div>

        {seriesItems.length > 0 && (
          <div>
            <div className="mb-5 flex items-end gap-4">
              <div>
                <p className="jr-kicker text-[10px] font-bold text-orange-600 dark:text-orange-500">Series shelves</p>
                <h2 className="jr-heading mt-1 text-3xl font-black text-stone-950 dark:text-white md:text-4xl">Study in order</h2>
              </div>
              <div className="mb-1.5 h-px flex-1 bg-gradient-to-r from-amber-300/70 via-orange-200/40 to-transparent dark:from-orange-800/40 dark:to-transparent" />
              <span className="mb-1.5 text-xs font-semibold text-stone-400 dark:text-stone-500">{seriesItems.length} series</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {visibleSeries.map((item) => (
                <SeriesCard key={item.id} item={item} layout="grid" />
              ))}
            </div>
            {seriesItems.length > 12 && (
              <div className="mt-5 flex justify-center">
                <button
                  onClick={() => setShowAllSeries((v) => !v)}
                  className="jr-badge inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-white/82 px-5 py-2 text-[11px] font-black text-orange-700 shadow-sm transition hover:border-orange-400 hover:bg-amber-50 dark:border-stone-700 dark:bg-stone-900/80 dark:text-orange-300"
                >
                  {showAllSeries ? "Show less" : `See all ${seriesItems.length} series →`}
                </button>
              </div>
            )}
          </div>
        )}

        <div>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="jr-kicker text-[10px] font-bold text-orange-600 dark:text-orange-500">Curated collections</p>
              <h2 className="jr-heading mt-1 text-3xl font-black text-stone-950 dark:text-white md:text-4xl">Browse like a bookstore</h2>
            </div>
            <button
              onClick={onBrowseAll}
              className="jr-badge inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-white/82 px-4 py-2 text-[11px] font-black text-orange-700 shadow-sm transition hover:border-orange-400 hover:bg-amber-50 dark:border-stone-700 dark:bg-stone-900/80 dark:text-orange-300"
            >
              Full filter view
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {collectionShelves.map((shelf) => (
              <CollectionTile key={shelf.id} shelf={shelf} resources={resources} onOpen={onOpenShelf} />
            ))}
          </div>
        </div>

        <div className="space-y-9">
          {previewShelves.map((shelf) => (
            <BookstorePreviewRow key={shelf.id} shelf={shelf} resources={resources} onSeeAll={onOpenShelf} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BookstoreFeature({
  shelf,
  resources,
  onOpen,
}: {
  shelf: ShelfDef
  resources: LibraryResource[]
  onOpen: (shelfId?: string) => void
}) {
  const items = resources.filter(shelf.filter)
  if (items.length === 0) return null

  return (
    <button
      onClick={() => onOpen(shelf.id)}
      className="group flex min-h-[112px] items-center gap-4 rounded-2xl border border-amber-200/70 bg-white/80 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:bg-amber-50/80 hover:shadow-md dark:border-stone-800 dark:bg-stone-900/80 dark:hover:border-orange-800/60 dark:hover:bg-stone-900"
    >
      <ShelfMark shelfId={shelf.id} />
      <span className="min-w-0 flex-1">
        <span className="jr-card-title block text-lg font-black leading-tight text-stone-950 dark:text-white">{shelf.title}</span>
        <span className="mt-1 line-clamp-2 block text-xs leading-5 text-stone-600 dark:text-stone-400">{shelf.subtitle}</span>
      </span>
      <span className="jr-badge rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-black text-orange-700 dark:bg-orange-950/70 dark:text-orange-300">
        {items.length}
      </span>
    </button>
  )
}

function CollectionTile({
  shelf,
  resources,
  onOpen,
}: {
  shelf: ShelfDef
  resources: LibraryResource[]
  onOpen: (shelfId?: string) => void
}) {
  const items = sortResources(resources.filter(shelf.filter))
  const covers = items.filter((item) => item.coverImage).slice(0, 3)
  if (items.length === 0) return null

  return (
    <button
      onClick={() => onOpen(shelf.id)}
      className="group relative min-h-[292px] overflow-hidden rounded-2xl border border-black/12 text-left shadow-[0_2px_12px_rgba(0,0,0,0.18),0_1px_3px_rgba(0,0,0,0.12)] transition-all duration-200 ease-out hover:-translate-y-1.5 hover:border-black/20 hover:shadow-[0_20px_48px_rgba(0,0,0,0.32),0_4px_12px_rgba(0,0,0,0.16)] dark:border-stone-800"
    >
      <div className="absolute inset-0 bg-stone-900">
        <div className="grid h-full grid-cols-3 gap-1 opacity-92">
          {(covers.length ? covers : items.slice(0, 3)).map((resource) => (
            <div key={resource.id} className="relative min-w-0">
              <ResourceCover resource={resource} />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/42 to-black/5" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/12 via-transparent to-transparent opacity-70" />
      <div className="absolute left-4 top-4 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/92 text-base font-black text-orange-700 shadow ring-1 ring-white/50">
          {shelf.emoji}
        </span>
        <span className="jr-badge rounded-full bg-white/18 px-2.5 py-1 text-[9px] font-black text-white shadow backdrop-blur">
          {items.length} resources
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="jr-card-title text-2xl font-black leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">{shelf.title}</p>
        <p className="mt-2 line-clamp-2 text-sm font-medium leading-6 text-white/82 drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)]">{shelf.subtitle}</p>
        <span className="jr-badge mt-4 inline-flex items-center gap-1 text-[10px] font-black text-amber-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
          Open shelf
          <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
        </span>
      </div>
    </button>
  )
}

function BookstorePreviewRow({
  shelf,
  resources,
  onSeeAll,
}: {
  shelf: ShelfDef
  resources: LibraryResource[]
  onSeeAll: (shelfId?: string) => void
}) {
  const items = useMemo(() => buildLibraryItems(sortResources(resources.filter(shelf.filter))).slice(0, 6), [resources, shelf])
  const count = resources.filter(shelf.filter).length
  if (count === 0) return null

  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <ShelfMark shelfId={shelf.id} />
          <div className="min-w-0">
            <h2 className="jr-heading text-2xl font-black text-stone-950 dark:text-white md:text-3xl">{shelf.title}</h2>
            <p className="mt-1 line-clamp-1 text-sm text-stone-600 dark:text-stone-400">{shelf.subtitle}</p>
          </div>
        </div>
        <button
          onClick={() => onSeeAll(shelf.id)}
          className="jr-badge shrink-0 text-[11px] font-black text-orange-700 transition hover:text-orange-600 dark:text-orange-400"
        >
          See all {count} →
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {items.map((item) => (
          <LibraryItemCard key={item.kind === "series" ? item.id : item.resource.id} item={item} layout="grid" />
        ))}
      </div>
    </section>
  )
}

// ── Shelf Row ─────────────────────────────────────────────────────────────────
function ShelfRow({
  shelf,
  resources,
  onSeeAll,
}: {
  shelf: ShelfDef
  resources: LibraryResource[]
  onSeeAll: (shelfId?: string) => void
}) {
  const items = useMemo(() => sortResources(resources.filter(shelf.filter)), [resources, shelf])
  const libraryItems = useMemo(() => buildLibraryItems(items), [items])
  const VISIBLE = 10
  const visibleItems = libraryItems.slice(0, VISIBLE)

  if (items.length === 0) return null

  return (
    <section id={`shelf-${shelf.id}`} className="scroll-mt-16 px-4 py-8 md:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Row header */}
        <div className="mb-5 flex items-end justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <ShelfMark shelfId={shelf.id} />
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <h2 className="jr-heading text-[17px] font-black text-stone-950 dark:text-white md:text-xl">
                  {shelf.title}
                </h2>
                <span className="jr-badge rounded-full border border-amber-300/70 bg-amber-50/80 px-2 py-0.5 text-[9px] font-black text-orange-700 dark:border-stone-700 dark:bg-stone-900 dark:text-orange-300">
                  {items.length}
                </span>
              </div>
              <p className="mt-0.5 hidden text-[12px] text-stone-500 dark:text-stone-500 md:block">{shelf.subtitle}</p>
            </div>
          </div>
          <button
            onClick={() => onSeeAll(shelf.id)}
            className="jr-badge shrink-0 text-[11px] font-bold text-orange-700 transition hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300"
          >
            See all {items.length} →
          </button>
        </div>

        {/* Grid — 5 columns desktop, 4 tablet, 3 mobile */}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 md:gap-4">
          {visibleItems.map((item) => (
            <LibraryItemCard
              key={item.kind === "series" ? item.id : item.resource.id}
              item={item}
              layout="shelf"
            />
          ))}
        </div>

        {/* Show-more strip */}
        {items.length > VISIBLE && (
          <button
            onClick={() => onSeeAll(shelf.id)}
            className="mt-4 w-full rounded-2xl border border-amber-200/80 bg-white/60 py-3 text-[12px] font-bold text-orange-700 shadow-sm transition hover:bg-amber-50 hover:border-orange-300 dark:border-stone-700/80 dark:bg-stone-900/60 dark:text-orange-400 dark:hover:bg-stone-900"
          >
            Show all {items.length} resources in {shelf.title} →
          </button>
        )}
      </div>
    </section>
  )
}

// ── Shelf Card ─────────────────────────────────────────────────────────────────
function LibraryItemCard({ item, layout = "shelf" }: { item: LibraryListItem; layout?: "shelf" | "grid" }) {
  if (item.kind === "series") return <SeriesCard item={item} layout={layout} />
  return <ShelfCard resource={item.resource} layout={layout} />
}

function SeriesCard({ item, layout = "shelf" }: { item: Extract<LibraryListItem, { kind: "series" }>; layout?: "shelf" | "grid" }) {
  const [open, setOpen] = useState(false)
  const representative = item.representative
  const disabled = item.resources.length === 0

  const aspectClass = "aspect-[2/3]"

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => !disabled && setOpen(true)}
        className={cn(
          "group relative block w-full overflow-hidden rounded-2xl ring-1 ring-black/12 shadow-[0_2px_12px_rgba(0,0,0,0.18),0_1px_3px_rgba(0,0,0,0.12)]",
          "transition-all duration-200 ease-out",
          aspectClass,
          !disabled && "cursor-pointer hover:-translate-y-1.5 hover:ring-black/20 hover:shadow-[0_20px_48px_rgba(0,0,0,0.32),0_4px_12px_rgba(0,0,0,0.16)]",
        )}
        aria-expanded={open}
      >
        {/* Full-bleed cover */}
        <div className="absolute inset-0 bg-stone-900">
          <ResourceCover resource={representative} />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

        {/* Series + count badges */}
        <div className="absolute left-2 top-2 flex items-center gap-1">
          <span className="jr-badge rounded bg-orange-600 px-1.5 py-0.5 text-[7.5px] font-black text-white">
            Series
          </span>
          <span className="jr-badge rounded bg-black/55 px-1.5 py-0.5 text-[7.5px] font-black text-white backdrop-blur-sm">
            {item.resources.length}
          </span>
        </div>

        {/* Title at bottom (in cover) */}
        <div className="absolute inset-x-0 bottom-0 px-2.5 pb-1">
          <p className="jr-card-title line-clamp-3 text-[12px] font-black leading-tight text-white">
            {item.def.title}
          </p>
          {item.def.aliases[0] && (
            <p className="mt-0.5 line-clamp-1 text-[8px] font-bold text-amber-400/90">
              {item.def.aliases[0]}
            </p>
          )}
        </div>

        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-white/8" />
      </button>


      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-stone-950/70 px-4 py-5 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label={`${item.def.title} series books`}
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[86vh] w-full max-w-3xl overflow-hidden rounded-3xl border border-amber-200/70 bg-[#fffaf0] shadow-2xl dark:border-stone-800 dark:bg-stone-950"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative overflow-hidden bg-[#1a0c05] p-5 text-white md:p-6">
              <div className="absolute inset-0 opacity-24">
                <ResourceCover resource={representative} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a0c05] via-[#1a0c05]/92 to-[#1a0c05]/54" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="jr-badge inline-flex items-center gap-1 rounded-full bg-orange-600 px-2.5 py-1 text-[9px] font-black text-white">
                    <Layers className="h-3 w-3" />
                    Series · {item.resources.length} books
                  </p>
                  <h3 className="jr-heading mt-3 text-3xl font-black leading-tight md:text-5xl">{item.def.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-stone-200">{item.def.subtitle}</p>
                  <a
                    href={`/library/series/${item.id}`}
                    className="jr-badge mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[10px] font-black text-white ring-1 ring-white/15 transition hover:bg-white/16"
                  >
                    Open full series page
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-sm transition hover:bg-white/16"
                  aria-label="Close series"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="max-h-[54vh] overflow-y-auto p-4 md:p-5">
              <div className="grid gap-2 sm:grid-cols-2">
                {item.resources.map((resource, index) => (
                  <a
                    key={resource.id}
                    href={getResourceHref(resource)}
                    target={getResourceHref(resource).startsWith("/") ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className="group/volume flex items-center gap-3 rounded-2xl border border-amber-200/80 bg-white/82 p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:bg-amber-50 dark:border-stone-800 dark:bg-stone-900/86 dark:hover:border-orange-800/70"
                  >
                    <span className="jr-badge flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-600 text-[11px] font-black text-white shadow-sm">
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="jr-card-title line-clamp-2 text-sm font-black leading-tight text-stone-950 group-hover/volume:text-orange-800 dark:text-white dark:group-hover/volume:text-orange-300">
                        {resource.title}
                      </span>
                      {resource.aliases?.[0] && (
                        <span className="mt-0.5 block truncate text-[11px] italic text-stone-500 dark:text-stone-500">
                          {resource.aliases[0]}
                        </span>
                      )}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-orange-600 transition group-hover/volume:translate-x-1 dark:text-orange-400" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ShelfCard({ resource, layout = "shelf" }: { resource: LibraryResource; layout?: "shelf" | "grid" }) {
  const disabled = resource.url === "#"
  const href = getResourceHref(resource)

  const isInternal = resource.url.startsWith("/") && !resource.url.startsWith("/books/")
  // Generated thumbnails + internal pages embed the title — real covers don't
  const hasEmbeddedTitle = isInternal || (!resource.coverImage && resource.type !== "Video")

  const card = (
    <div
      className={cn(
        "group w-full overflow-hidden rounded-2xl ring-1 ring-black/12 shadow-[0_2px_12px_rgba(0,0,0,0.18),0_1px_3px_rgba(0,0,0,0.12)]",
        "transition-all duration-200 ease-out",
        !disabled && "cursor-pointer hover:-translate-y-1.5 hover:ring-black/20 hover:shadow-[0_20px_48px_rgba(0,0,0,0.32),0_4px_12px_rgba(0,0,0,0.16)]"
      )}
    >
      {/* Cover image */}
      <div className="relative aspect-[2/3] overflow-hidden bg-stone-900">
        <ResourceCover resource={resource} />

        {/* Universal cinematic veil — warm brown in light, near-black in dark */}
        {!hasEmbeddedTitle && (
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/55 via-amber-900/18 to-amber-950/5 dark:from-black/60 dark:via-black/22 dark:to-black/5" />
        )}

        {/* Bottom title gradient + text for real covers */}
        {!hasEmbeddedTitle && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2d1407] via-[#2d1407]/85 to-transparent px-2.5 pb-2.5 pt-14 dark:from-[#0e0703] dark:via-[#0e0703]/80">
            <p className="jr-card-title line-clamp-3 text-[12px] font-black leading-tight text-white">
              {resource.title}
            </p>
            {resource.language !== "English" && (
              <p className="mt-0.5 text-[8px] font-bold text-amber-400/80">{resource.language}</p>
            )}
          </div>
        )}

        {/* Type badge */}
        {!hasEmbeddedTitle && (
          <div className="absolute left-2 top-2">
            <span className="jr-badge rounded-full bg-black/60 px-2 py-0.5 text-[7px] font-black text-white/90 backdrop-blur-sm">
              {resource.type}
            </span>
          </div>
        )}

        {/* Hover scrim */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-white/6" />
      </div>

    </div>
  )

  if (disabled) return <div className="opacity-40">{card}</div>

  return (
    <a href={href} className="block">
      {card}
    </a>
  )
}

// ── Browse All ────────────────────────────────────────────────────────────────
function BrowseAll({
  resources,
  filters,
  setFilters,
  hasFilters,
  activeShelf,
  setActiveShelfId,
  clearAll,
  filteredResources,
}: {
  resources: LibraryResource[]
  filters: LibraryFilters
  setFilters: React.Dispatch<React.SetStateAction<LibraryFilters>>
  hasFilters: boolean
  activeShelf: ShelfDef | null
  setActiveShelfId: React.Dispatch<React.SetStateAction<string | null>>
  clearAll: () => void
  filteredResources: LibraryResource[]
}) {
  const [visibleCount, setVisibleCount] = useState(84)
  const updateFilter = (key: FilterKey, value: string) => {
    setFilters((f) => ({ ...f, [key]: value }))
    setVisibleCount(84)
  }
  const libraryItems = useMemo(() => buildLibraryItems(filteredResources), [filteredResources])
  const visibleResources = libraryItems.slice(0, visibleCount)

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="jr-kicker text-[10px] font-bold text-orange-600 dark:text-orange-500/70">
            Full collection
          </p>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-3">
            <h2 className="jr-heading text-4xl font-black text-stone-950 dark:text-white md:text-5xl">
              {activeShelf ? activeShelf.title : "Browse Everything"}
            </h2>
          </div>
          <p className="mt-2 max-w-xl text-sm text-stone-600 dark:text-stone-400">
            {activeShelf ? activeShelf.subtitle : "Use the filters below to narrow the library by purpose, tradition, format, language, and level."}
          </p>
        </div>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 rounded-full border border-stone-300 bg-white/80 px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm transition hover:border-orange-400 hover:text-orange-800 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:border-stone-500 dark:hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
            Clear filters
          </button>
        )}
      </div>

      {/* Filter pills */}
      <details
        open={hasFilters ? true : undefined}
        className="mb-8 rounded-2xl border border-amber-200/60 bg-white/70 p-4 shadow-sm backdrop-blur open:p-5 dark:border-stone-800 dark:bg-stone-900/60"
      >
        <summary className="jr-card-title cursor-pointer list-none text-sm font-black text-stone-800 marker:hidden dark:text-white">
          Filter & narrow results
          <span className="ml-2 text-xs font-semibold text-stone-500 dark:text-stone-400">
            Purpose, tradition, format, language, level
          </span>
        </summary>
        <div className="mt-4 space-y-3">
          {activeShelf && (
            <div className="flex flex-wrap items-center gap-2 border-b border-amber-200/70 pb-3 dark:border-stone-800">
              <span className="jr-kicker text-[10px] font-bold text-stone-400 dark:text-stone-500">
                Section
              </span>
              <span className="rounded-full border border-orange-500 bg-orange-600 px-3 py-1 text-[12px] font-semibold text-white shadow-sm">
                {activeShelf.title}
              </span>
              <button
                onClick={() => {
                  setActiveShelfId(null)
                  setVisibleCount(84)
                }}
                className="rounded-full border border-stone-200 bg-white/80 px-3 py-1 text-[12px] font-semibold text-stone-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-800 dark:border-stone-700 dark:bg-stone-800/60 dark:text-stone-400"
              >
                Show all sections
              </button>
            </div>
          )}
          {(Object.keys(filterOptions) as FilterKey[]).map((key) => (
            <div key={key} className="flex flex-wrap items-center gap-2">
              <span className="jr-kicker w-20 flex-shrink-0 text-[10px] font-bold text-stone-400 dark:text-stone-500">
                {filterLabels[key]}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {filterOptions[key].map((option) => (
                  <button
                    key={option}
                    onClick={() => updateFilter(key, option)}
                    className={cn(
                      "jr-badge rounded-full border px-3 py-1 text-[10px] font-semibold transition-all",
                      filters[key] === option
                        ? "border-orange-500 bg-orange-600 text-white shadow-sm"
                        : "border-stone-200 bg-white/80 text-stone-700 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-800 dark:border-stone-700 dark:bg-stone-800/60 dark:text-stone-400 dark:hover:border-stone-500 dark:hover:text-white"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </details>

      {/* Count */}
      <p className="mb-5 text-sm text-stone-500">
        Showing{" "}
        <span className="font-bold text-stone-900 dark:text-white">{libraryItems.length}</span>{" "}
        grouped items from {filteredResources.length} matching resources
      </p>

      {/* Grid */}
      {libraryItems.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {visibleResources.map((item) => <LibraryItemCard key={item.kind === "series" ? item.id : item.resource.id} item={item} layout="grid" />)}
        </div>
      ) : (
        <div className="py-16 text-center">
          <h3 className="text-xl font-bold text-stone-700 dark:text-stone-300">No matches</h3>
          <p className="mt-2 text-stone-500">Try adjusting or clearing the filters.</p>
          <button
            onClick={clearAll}
            className="mt-6 rounded-full bg-orange-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-orange-500"
          >
            Reset filters
          </button>
        </div>
      )}
      {visibleResources.length < libraryItems.length && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setVisibleCount((count) => count + 84)}
            className="rounded-full border border-amber-300 bg-white/85 px-6 py-3 text-sm font-bold text-stone-800 shadow-sm transition hover:border-orange-400 hover:bg-amber-50 dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:hover:border-orange-500"
          >
            Load more resources
          </button>
        </div>
      )}
    </div>
  )
}
