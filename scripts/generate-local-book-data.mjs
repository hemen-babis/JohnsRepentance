import { createHash } from "node:crypto"
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs"
import path from "node:path"

const root = process.cwd()
const booksDir = path.join(root, "public", "books")
const thumbnailsDir = path.join(root, "public", "library-thumbnails")
const outputFile = path.join(root, "app", "library", "local-book-data.ts")

const SUPPORTED = new Set([
  ".pdf",
  ".doc",
  ".docx",
  ".ppt",
  ".pptx",
  ".mp3",
  ".m4a",
  ".aac",
  ".wav",
  ".amr",
])

const bibleBooks = [
  ["genesis", "ዘፍጥረት", "zefitret"],
  ["exodus", "ዘጸአት", "zetseat"],
  ["leviticus", "ዘሌዋውያን", "zelewawyan"],
  ["numbers", "ዘኁልቁ", "zehulq"],
  ["deuteronomy", "ዘዳግም", "zedagm"],
  ["joshua", "ኢያሱ", "iyasu"],
  ["judges", "መሳፍንት", "mesafent"],
  ["ruth", "ሩት", "rut"],
  ["samuel", "ሳሙኤል", "samuel"],
  ["kings", "ነገሥት", "negest"],
  ["chronicles", "ዜና መዋዕል", "zena mewael"],
  ["ezra", "ዕዝራ", "ezra"],
  ["nehemiah", "ነህምያ", "nehemiah"],
  ["esther", "አስቴር", "aster"],
  ["job", "ኢዮብ", "iyob"],
  ["psalm", "መዝሙር", "mezmur"],
  ["proverbs", "ምሳሌ", "misale"],
  ["ecclesiastes", "መክብብ", "mekbeb"],
  ["song of songs", "መኃልየ መኃልይ", "mehalye mehaly"],
  ["isaiah", "ኢሳይያስ", "isaias"],
  ["jeremiah", "ኤርምያስ", "ermias"],
  ["ezekiel", "ሕዝቅኤል", "hizqiel"],
  ["daniel", "ዳንኤል", "daniel"],
  ["hosea", "ሆሴዕ", "hosea"],
  ["joel", "ኢዮኤል", "iyoel"],
  ["amos", "አሞጽ", "amots"],
  ["obadiah", "አብድዩ", "abdiyu"],
  ["jonah", "ዮናስ", "yonas"],
  ["micah", "ሚክያስ", "mikyas"],
  ["nahum", "ናሆም", "nahom"],
  ["habakkuk", "ዕንባቆም", "enbaqom"],
  ["zephaniah", "ሶፎንያስ", "sofonyas"],
  ["haggai", "ሐጌ", "hage"],
  ["zechariah", "ዘካርያስ", "zekaryas"],
  ["malachi", "ሚልክያስ", "milkiyas"],
  ["matthew", "ማቴዎስ", "matewos"],
  ["mark", "ማርቆስ", "marqos"],
  ["luke", "ሉቃስ", "luqas"],
  ["john", "ዮሐንስ", "yohannes"],
  ["acts", "ሐዋርያት ሥራ", "hawareyat sira"],
  ["romans", "ሮሜ", "rome"],
  ["corinthians", "ቆሮንቶስ", "qorontos"],
  ["galatians", "ገላትያ", "gelatiya"],
  ["ephesians", "ኤፌሶን", "efeson"],
  ["philippians", "ፊልጵስዩስ", "filipsiyus"],
  ["colossians", "ቆላስይስ", "qolasyis"],
  ["thessalonians", "ተሰሎንቄ", "teselonqe"],
  ["timothy", "ጢሞቴዎስ", "timotewos"],
  ["titus", "ቲቶ", "tito"],
  ["philemon", "ፊልሞና", "filmona"],
  ["hebrews", "ዕብራውያን", "ebrawejan"],
  ["james", "ያዕቆብ", "yaqob"],
  ["peter", "ጴጥሮስ", "petros"],
  ["jude", "ይሁዳ", "yihuda"],
  ["revelation", "ራእይ", "raey"],
  ["enoch", "ሄኖክ", "henok"],
]

const additionalBibleSignals = [
  "ቆረንጦስ",
  "ቆሮንቶስ",
  "ጢሞቲዎስ",
  "ጢሞቴዎስ",
  "ተሰሎንቄ",
  "ጴጥሮስ",
  "ዮሐንስ",
  "ሳሙኤል",
  "ነገሥት",
  "ነገስት",
  "ዜና መዋዕል",
  "መቃብያን",
  "መልእክት",
  "መልእክተ",
]

function looksLikeBibleResource(text) {
  return bibleBooks.some(([english, amharic, translit]) => text.includes(english) || text.includes(amharic) || text.includes(translit)) ||
    additionalBibleSignals.some((signal) => text.includes(signal.toLowerCase()))
}

function looksLikeCommentaryResource(text, source) {
  return (
    source === "Fr. Tadros Yacoub Malaty" ||
    hasAny(text, [
      "commentary",
      "andemta",
      "አንድምታ",
      "ላይ የተጠየቁ",
      "ጥያቄዎችና መልሶቻቸው",
      "1ኛ ቆረንጦስ",
      "2ተኛ ቆረንጦስ",
      "1ኛ ጢሞቲዎስ",
      "2ኛ ጢሞቲዎስ",
      "1ኛ ተሰሎንቄ",
      "2ተኛ ተሰሎንቄ",
      "1 peter",
      "2 peter",
      "1 timothy",
      "2 timothy",
      "1 corinthians",
      "2 corinthians",
    ])
  )
}

const translitMap = new Map(Object.entries({
  "ሀ": "ha", "ሁ": "hu", "ሂ": "hi", "ሃ": "ha", "ሄ": "he", "ህ": "h", "ሆ": "ho",
  "ለ": "le", "ሉ": "lu", "ሊ": "li", "ላ": "la", "ሌ": "le", "ል": "l", "ሎ": "lo",
  "ሐ": "ha", "ሑ": "hu", "ሒ": "hi", "ሓ": "ha", "ሔ": "he", "ሕ": "h", "ሖ": "ho",
  "መ": "me", "ሙ": "mu", "ሚ": "mi", "ማ": "ma", "ሜ": "me", "ም": "m", "ሞ": "mo",
  "ሠ": "se", "ሡ": "su", "ሢ": "si", "ሣ": "sa", "ሤ": "se", "ሥ": "s", "ሦ": "so",
  "ረ": "re", "ሩ": "ru", "ሪ": "ri", "ራ": "ra", "ሬ": "re", "ር": "r", "ሮ": "ro",
  "ሰ": "se", "ሱ": "su", "ሲ": "si", "ሳ": "sa", "ሴ": "se", "ስ": "s", "ሶ": "so",
  "ሸ": "she", "ሹ": "shu", "ሺ": "shi", "ሻ": "sha", "ሼ": "she", "ሽ": "sh", "ሾ": "sho",
  "ቀ": "qe", "ቁ": "qu", "ቂ": "qi", "ቃ": "qa", "ቄ": "qe", "ቅ": "q", "ቆ": "qo",
  "በ": "be", "ቡ": "bu", "ቢ": "bi", "ባ": "ba", "ቤ": "be", "ብ": "b", "ቦ": "bo",
  "ተ": "te", "ቱ": "tu", "ቲ": "ti", "ታ": "ta", "ቴ": "te", "ት": "t", "ቶ": "to",
  "ቸ": "che", "ቹ": "chu", "ቺ": "chi", "ቻ": "cha", "ቼ": "che", "ች": "ch", "ቾ": "cho",
  "ኀ": "ha", "ኁ": "hu", "ኂ": "hi", "ኃ": "ha", "ኄ": "he", "ኅ": "h", "ኆ": "ho",
  "ነ": "ne", "ኑ": "nu", "ኒ": "ni", "ና": "na", "ኔ": "ne", "ን": "n", "ኖ": "no",
  "ኘ": "nye", "ኙ": "nyu", "ኚ": "nyi", "ኛ": "nya", "ኜ": "nye", "ኝ": "ny", "ኞ": "nyo",
  "አ": "a", "ኡ": "u", "ኢ": "i", "ኣ": "a", "ኤ": "e", "እ": "e", "ኦ": "o",
  "ከ": "ke", "ኩ": "ku", "ኪ": "ki", "ካ": "ka", "ኬ": "ke", "ክ": "k", "ኮ": "ko",
  "ወ": "we", "ዉ": "wu", "ዊ": "wi", "ዋ": "wa", "ዌ": "we", "ው": "w", "ዎ": "wo",
  "ዐ": "a", "ዑ": "u", "ዒ": "i", "ዓ": "a", "ዔ": "e", "ዕ": "e", "ዖ": "o",
  "ዘ": "ze", "ዙ": "zu", "ዚ": "zi", "ዛ": "za", "ዜ": "ze", "ዝ": "z", "ዞ": "zo",
  "ዠ": "zhe", "ዡ": "zhu", "ዢ": "zhi", "ዣ": "zha", "ዤ": "zhe", "ዥ": "zh", "ዦ": "zho",
  "የ": "ye", "ዩ": "yu", "ዪ": "yi", "ያ": "ya", "ዬ": "ye", "ይ": "y", "ዮ": "yo",
  "ደ": "de", "ዱ": "du", "ዲ": "di", "ዳ": "da", "ዴ": "de", "ድ": "d", "ዶ": "do",
  "ጀ": "je", "ጁ": "ju", "ጂ": "ji", "ጃ": "ja", "ጄ": "je", "ጅ": "j", "ጆ": "jo",
  "ገ": "ge", "ጉ": "gu", "ጊ": "gi", "ጋ": "ga", "ጌ": "ge", "ግ": "g", "ጎ": "go",
  "ጠ": "te", "ጡ": "tu", "ጢ": "ti", "ጣ": "ta", "ጤ": "te", "ጥ": "t", "ጦ": "to",
  "ጨ": "che", "ጩ": "chu", "ጪ": "chi", "ጫ": "cha", "ጬ": "che", "ጭ": "ch", "ጮ": "cho",
  "ጰ": "pe", "ጱ": "pu", "ጲ": "pi", "ጳ": "pa", "ጴ": "pe", "ጵ": "p", "ጶ": "po",
  "ጸ": "tse", "ጹ": "tsu", "ጺ": "tsi", "ጻ": "tsa", "ጼ": "tse", "ጽ": "ts", "ጾ": "tso",
  "ፀ": "tse", "ፁ": "tsu", "ፂ": "tsi", "ፃ": "tsa", "ፄ": "tse", "ፅ": "ts", "ፆ": "tso",
  "ፈ": "fe", "ፉ": "fu", "ፊ": "fi", "ፋ": "fa", "ፌ": "fe", "ፍ": "f", "ፎ": "fo",
  "ፐ": "pe", "ፑ": "pu", "ፒ": "pi", "ፓ": "pa", "ፔ": "pe", "ፕ": "p", "ፖ": "po",
}))

function transliterate(input) {
  return input
    .split("")
    .map((char) => translitMap.get(char) ?? char)
    .join("")
    .replace(/[፡።፣፤፥፦፧፨]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function cleanName(file) {
  const ext = path.extname(file)
  return path.basename(file, ext)
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^\s*\d{1,4}\s*[\)._-]\s*/g, "")
    .replace(/^\s*\d{1,4}\s+(?=(?:[A-Za-z\u1200-\u137f]))/g, "")
    .replace(/\s*\((?:copy|final|\d+|[ivx]+)\)\s*$/i, "")
    .replace(/\s*(?:copy|final)\s*$/i, "")
    .replace(/\s*@\S+/g, "")
    .replace(/\b(?:OceanofPDF|Z Library|BookZZ|WPS Office)\b/gi, "")
    .replace(/\bpdf\b$/i, "")
    .replace(/\s+/g, " ")
    .trim()
}

function cleanTitle(value) {
  return value
    .replace(/\bMojule\b/gi, "Module")
    .replace(/\bMojuIe\b/g, "Module")
    .replace(/\bCaricu\b/gi, "Curriculum")
    .replace(/\bTheologicaldogmatic\b/gi, "Theological and Dogmatic")
    .replace(/\bOceanofPDF\s+Com\b/gi, "")
    .replace(/^\s*Com\s+/i, "")
    .replace(/^\s*0?\d{1,3}\s+0?\d{1,3}\s+(?=\d?(?:Samuel|Kings|Chronicles|Corinthians|Thessalonians|Timothy|Peter|John)\b)/i, "")
    .replace(/^\s*[\[\(]\s*/g, "")
    .replace(/\s*[\]\)]\s*$/g, "")
    .replace(/^\s*(?!(?:[123]\s+)?(?:Samuel|Kings|Chronicles|Corinthians|Thessalonians|Timothy|Peter|John)\b)(?:\d{1,6}|[፩፪፫፬፭፮፯፰፱፲፵፶፷፸፹፺፻]+)(?:\s*[_\-.፡፦)]\s*(?:\d{1,6}|[፩፪፫፬፭፮፯፰፱፲፵፶፷፸፹፺፻]+))*\s+(?=[A-Za-z\u1200-\u137f])/gi, "")
    .replace(/^\s*[፩፪፫፬፭፮፯፰፱፲፵፶፷፸፹፺፻]+[._\-፡፦)]\s*(?=[\u1200-\u137f])/g, "")
    .replace(/^\s*\d{1,4}\s+\(\d+\)\.?\s*/g, "")
    .replace(/^\s*\d{2,4}(?=[a-z\u1200-\u137f])/i, "")
    .replace(/^\s*\d(?=Intro\b)/i, "")
    .replace(/^\s*\d{1,4}\s+(?=\d?(?:Samuel|Kings|Chronicles|Corinthians|Thessalonians|Timothy|Peter|John)\b)/i, "")
    .replace(/^\s*\d{1,4}\s+(?=[\u1200-\u137f])/g, "")
    .replace(/^\s*[፩፪፫፬፭፮፯፰፱፲፵፶፷፸፹፺፻]+\s*[_\-.፡፦)]*\s*/g, "")
    .replace(/\s*(?:-|–|—)?\s*(?:Fr\.?|Father)(?:\s+\(\d+\)\.?)?\s*Tadros(?:\s+Yacoub)?\s+Malaty\b\.?/gi, "")
    .replace(/\s*(?:-|–|—)?\s*(?:H\.?H\.?\s*)?Pope\s+Shenouda(?:\s+III)?\b\.?/gi, "")
    .replace(/\s*(?:-|–|—)?\s*Coptic\s+Sunday\s+School\b\.?/gi, "")
    .replace(/\s*(?:-|–|—)?\s*Mahibere\s+Kidusan\b\.?/gi, "")
    .replace(/\s*(?:-|–|—)?\s*MK\s+Main\s+Gibi\s+Gubaeyat\s+Mission\b\.?/gi, "")
    .replace(/\s*(?:-|–|—)?\s*by\s+(?:Fr\.?|Father)\s+[^()]+$/i, "")
    .replace(/\s*(?:-|–|—)?\s*by\s+[^()]+$/i, "")
    .replace(/\s*(?:-|–|—)?\s*በ(?:ዲያቆን|መምህር|መ\.ር|ሊቀ\s*ጉባኤ)\s*[\u1200-\u137f\s]+$/g, "")
    .replace(/\s*(?:-|–|—)?\s*ዲያቆን\s*[\u1200-\u137f\s]+$/g, "")
    .replace(/\s*(?:-|–|—)?\s*መምህር\s*[\u1200-\u137f\s]+$/g, "")
    .replace(/\s*(?:-|–|—)?\s*አቡነ\s*ተክለ\s*ሃይማኖት(?:\s*pdf)?$/g, "")
    .replace(/\s*(?:-|–|—)?\s*ዘአኅተሞ\s*ገብረ\s*ሥላሴ$/g, "")
    .replace(/\s+final\b/gi, "")
    .replace(/\s*\d{2,4}k$/i, "")
    .replace(/\s+\(\d+\)\d*$/g, "")
    .replace(/^\(([\u1200-\u137fA-Za-z\s]+)\)\s*/g, "$1: ")
    .replace(/^\s*፡/g, "")
    .replace(/\s+\d+$/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

function normalizeSpecialTitle(title, file, ext) {
  let next = title
    .replace(/\b([123])\s*(Samuel|Kings|Chronicles|Corinthians|Thessalonians|Timothy|Peter|John)\b/gi, "$1 $2")
    .replace(/\bEocd?\b/gi, "EOTC")
    .replace(/\b1John\b/gi, "1 John")
    .replace(/\b2John\b/gi, "2 John")
    .replace(/\b3John\b/gi, "3 John")
    .replace(/\b1sam\b/gi, "1 Samuel")
    .replace(/\b2sam\b/gi, "2 Samuel")
    .replace(/\b1kings\b/gi, "1 Kings")
    .replace(/\b2kings\b/gi, "2 Kings")
    .replace(/\bGen\b/g, "Genesis")
    .replace(/\bEx\b/g, "Exodus")
    .replace(/\bDeut\b/g, "Deuteronomy")
    .replace(/\bJosh\b/g, "Joshua")
    .replace(/\bJudg\b/g, "Judges")
    .replace(/\bCr\b/g, "Chronicles")
    .replace(/^3rdsundaylent$/i, "Third Sunday of Lent")
    .replace(/^4thweeklent$/i, "Fourth Week of Lent")
    .replace(/^7thweeklent$/i, "Seventh Week of Lent")
    .replace(/\s*&\s*/g, " and ")
    .replace(/\s+/g, " ")
    .trim()

  next = next
    .replace(/^EOTC Genesis Exodus$/i, "EOTC Genesis and Exodus")
    .replace(/^EOTC Gen Ex$/i, "EOTC Genesis and Exodus")
    .replace(/^EOTC Joshua Judges Ruth$/i, "EOTC Joshua, Judges, and Ruth")
    .replace(/^EOTC Josh Judg Ruth$/i, "EOTC Joshua, Judges, and Ruth")
    .replace(/^EOTC 1 Samuel 2kings New$/i, "EOTC 1 Samuel to 2 Kings")
    .replace(/^EOTC 1 Samuel 2 Kings New$/i, "EOTC 1 Samuel to 2 Kings")
    .replace(/^EOTC 3 Chronicles$/i, "EOTC Chronicles")
    .replace(/^EOTC Deut$/i, "EOTC Deuteronomy")
    .replace(/^6\s+(1ኛና\s*2ኛ\s*ነገሥት)$/i, "$1")

  if (/^13\s+and$/i.test(next)) next = "Resource 13 and 14"
  if (/^5\s+and\s+6$/i.test(next)) next = "Resource 5 and 6"

  if (!next || /^[\d\s().-]+$/.test(next)) {
    const track = path.basename(file, ext).match(/\d{1,3}/)?.[0]
    next = inferType(ext) === "Audio" ? `Audio Track ${track ?? "Untitled"}` : `Resource ${track ?? "Untitled"}`
  }

  return next
}

function tidySource(value) {
  return value
    .replace(/\s+/g, " ")
    .replace(/\b(?:pdf|docx?|pptx?|z\s*lib\s*org|z-library|oceanofpdf|com)\b/gi, "")
    .replace(/[._-]+$/g, "")
    .trim()
}

function extractNamedSource(title, file) {
  const haystack = `${title} ${file}`.replace(/[_-]+/g, " ")
  const lower = haystack.toLowerCase()
  const knownTitleSource = KNOWN_SOURCE_BY_TITLE.get(normalizeKey(title)) ?? KNOWN_SOURCE_BY_TITLE.get(normalizeKey(path.basename(file, path.extname(file))))

  if (knownTitleSource) return knownTitleSource

  const exactSources = [
    [/fr\.?\s*tadros(?:\s+yacoub)?\s+malaty|father\s+tadros(?:\s+yacoub)?\s+malaty/i, "Fr. Tadros Yacoub Malaty"],
    [/pope\s+shenouda(?:\s+iii)?/i, "H.H. Pope Shenouda III"],
    [/cyril\s+of\s+alexandria/i, "St. Cyril of Alexandria"],
    [/john\s+chrysostom|ዮሐንስ\s*አፈወርቅ/i, "St. John Chrysostom"],
    [/elder\s+paisios/i, "Elder Paisios"],
    [/mahibere\s+kidusan|mahbere\s+kidusan|ማኅበረ\s*ቅዱሳን|ማህበረ\s*ቅዱሳን/i, "Mahibere Kidusan"],
    [/coptic\s+sunday\s+school/i, "Coptic Sunday School"],
    [/abune\s+tekle\s+haimanot|አቡነ\s*ተክለ\s*ሃይማኖት/i, "Abune Tekle Haimanot"],
    [/ዲያቆን\s*ያረጋል\s*አበጋዝ/i, "D/n Yaregal Abegaz"],
    [/ዲያቆን\s*ሄኖክ\s*ሀይሌ/i, "D/n Henok Haile"],
    [/መምህር\s*ዘላለም\s*ወንድሙ/i, "Memhir Zelalem Wendimu"],
    [/መ\.?ር\s*ዮሴፍ\s*በቀለ|መምህር\s*ዮሴፍ\s*በቀለ/i, "Memhir Yosef Bekele"],
    [/ብርሃኑ\s*ጎበና/i, "Birhanu Gobena"],
    [/ሐሪ\s*አትክንስ/i, "Harry Atkins"],
  ]
  for (const [pattern, source] of exactSources) {
    if (pattern.test(haystack)) return source
  }

  const englishBy = haystack.match(/\bby\s+([A-Z][A-Za-z.'’ -]{3,80})\b/)
  if (englishBy?.[1]) return tidySource(englishBy[1])

  const amharicBy = haystack.match(/በ\s*((?:ዲያቆን|መምህር|መ\.ር|ሊቀ\s*ጉባኤ)\s*[\u1200-\u137f]+(?:\s+[\u1200-\u137f]+){1,4})/)
  if (amharicBy?.[1]) return tidySource(amharicBy[1])

  if (lower.includes("ante nicene fathers")) return "Church Fathers Collection"
  if (lower.includes("apostolic fathers")) return "Apostolic Fathers Collection"
  if (lower.includes("ancient christian commentary")) return "Ancient Christian Commentary on Scripture"
  if (lower.includes("orthodox study bible")) return "Orthodox Study Bible"

  return null
}

function titleCase(value) {
  if (/[\u1200-\u137f]/.test(value)) return value
  return value
    .replace(/\b([a-z])/g, (m) => m.toUpperCase())
    .replace(/\bPdf\b/g, "PDF")
    .replace(/\bEotc\b/g, "EOTC")
    .replace(/\bNt\b/g, "NT")
    .replace(/\bOt\b/g, "OT")
}

function normalizeKey(value) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/@\S+/g, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/\b(copy|final|pdf|docx?|pptx?|wps office|z library|orthodox books)\b/g, "")
    .replace(/[^a-z0-9\u1200-\u137f]+/g, "")
}

const KNOWN_SOURCE_BY_TITLE = new Map([
  ["angels", "H.H. Pope Shenouda III"],
  ["calmness", "H.H. Pope Shenouda III"],
  ["comparative2", "H.H. Pope Shenouda III"],
  ["comparativetheology", "H.H. Pope Shenouda III"],
  ["diabolicwars", "H.H. Pope Shenouda III"],
  ["discipleship", "H.H. Pope Shenouda III"],
  ["divinityofchrist", "H.H. Pope Shenouda III"],
  ["experiencesinlifev1", "H.H. Pope Shenouda III"],
  ["feastofcross", "H.H. Pope Shenouda III"],
  ["feastofepiphany", "H.H. Pope Shenouda III"],
  ["heresyofjehovahwitnesses", "H.H. Pope Shenouda III"],
  ["holyzeal", "H.H. Pope Shenouda III"],
  ["jonahtheprophet", "H.H. Pope Shenouda III"],
  ["lifeoffaith", "H.H. Pope Shenouda III"],
  ["manyyearsofquestionsvolume", "H.H. Pope Shenouda III"],
  ["manyyearswiththeproblemsofpeoplept2theologicalanddogmatic", "H.H. Pope Shenouda III"],
  ["manyyearswiththeproblemsofpeoplept3spiritualandgeneral", "H.H. Pope Shenouda III"],
  ["lifeofrepentancepurity", "H.H. Pope Shenouda III"],
  ["lifeofthanksgiving", "H.H. Pope Shenouda III"],
  ["natureofchrist", "H.H. Pope Shenouda III"],
  ["orthodoxspirituality", "H.H. Pope Shenouda III"],
  ["priesthood", "H.H. Pope Shenouda III"],
  ["releaseofthespirit", "H.H. Pope Shenouda III"],
  ["returntogod", "H.H. Pope Shenouda III"],
  ["saintspeterpaul", "H.H. Pope Shenouda III"],
  ["saintmark", "H.H. Pope Shenouda III"],
  ["sermononthemount", "H.H. Pope Shenouda III"],
  ["sevenwordsoflordoncross", "H.H. Pope Shenouda III"],
  ["spiritualman", "H.H. Pope Shenouda III"],
  ["spiritualmeans", "H.H. Pope Shenouda III"],
  ["spiritualministryv1", "H.H. Pope Shenouda III"],
  ["tenconcepts", "H.H. Pope Shenouda III"],
  ["thespiritualmeans", "H.H. Pope Shenouda III"],
  ["thespiritualityoffasting", "H.H. Pope Shenouda III"],
  ["thineisthepower", "H.H. Pope Shenouda III"],
  ["whatismanhhpopeshenoudaiii2", "H.H. Pope Shenouda III"],
  ["wordsofspiritualbenefitv1", "H.H. Pope Shenouda III"],
  ["wordsofspiritualbenefitv2", "H.H. Pope Shenouda III"],
  ["wordsofspiritualbenefitv3", "H.H. Pope Shenouda III"],
  ["wordsofspiritualbenefitv4", "H.H. Pope Shenouda III"],
  ["dogmamodulefordistance", "Holy Trinity Theological University"],
  ["newcurriculumdogmamodule", "Holy Trinity Theological University"],
  ["dogmavolumefivethechurchassacrament", "Michael Schmaus"],
  ["dogmavolumethreegodandhischristmichael", "Michael Schmaus"],
])

function slugify(value) {
  const latin = transliterate(value)
  return latin
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || createHash("sha1").update(value).digest("hex").slice(0, 12)
}

function thumbnailFor(file, ext) {
  if (ext !== ".pdf") return null
  const id = createHash("sha1").update(file).digest("hex").slice(0, 16)
  const thumbnail = path.join(thumbnailsDir, `${id}.jpg`)
  return existsSync(thumbnail) ? `/library-thumbnails/${id}.jpg` : null
}

function inferType(ext) {
  if (ext === ".pdf") return "PDF"
  if (ext === ".doc" || ext === ".docx") return "Book"
  if (ext === ".ppt" || ext === ".pptx") return "Slides"
  return "Audio"
}

function hasAny(text, words) {
  return words.some((word) => text.includes(word))
}

function inferMetadata(title, file, ext) {
  const text = `${title} ${file} ${transliterate(title)} ${transliterate(file)}`.toLowerCase()
  const topics = new Set(["local book collection"])
  let church = "Ethiopian Orthodox"
  let purpose = "General Knowledge"
  let level = "General"
  let source = extractNamedSource(title, file) ?? "Ethiopian Orthodox Resource"
  let language = /[\u1200-\u137f]/.test(title) || hasAny(text, ["amharic", "geez", "gee'z", "geez"]) ? "Amharic" : "English"

  if (source === "H.H. Pope Shenouda III" || hasAny(text, ["fr tadros", "tadros yacoub", "pope shenouda", "coptic", "cyril of alexandria", "coptic sunday school"])) {
    church = "Coptic Orthodox"
  }
  if (hasAny(text, ["armenian", "etchmiadzin"])) church = "Armenian Apostolic"
  if (hasAny(text, ["syriac", "margonitho"])) church = "Syriac Orthodox"
  if (hasAny(text, ["malankara", "indian orthodox", "mosc"])) church = "Malankara Orthodox"
  if (hasAny(text, ["oriental orthodox", "scooch"])) church = "Oriental Orthodox"

  if (hasAny(text, ["fr tadros", "tadros yacoub", "malaty"])) source = "Fr. Tadros Yacoub Malaty"
  else if (hasAny(text, ["pope shenouda", "shenouda"])) source = "H.H. Pope Shenouda III"
  else if (/^homilies\s+on\b/i.test(title) || hasAny(text, ["john chrysostom homilies", "chrysostoms homilies"])) source = "St. John Chrysostom"
  else if (hasAny(text, ["michael schmaus"])) source = "Michael Schmaus"
  else if (hasAny(text, ["holy trinity theological university", "dogma module"])) source = "Holy Trinity Theological University"
  else if (hasAny(text, ["mahibere kidusan", "ማኅበረ ቅዱሳን", "ማህበረ ቅዱሳን"])) source = "Mahibere Kidusan"
  else if (hasAny(text, ["abune", "አቡነ"]) && source === "Ethiopian Orthodox Resource") source = "Ethiopian Orthodox Monastic Text"

  if (looksLikeBibleResource(text)) {
    topics.add("bible study")
    topics.add("scripture")
    if (looksLikeCommentaryResource(text, source)) topics.add("commentary")
    purpose = "Curriculum"
    level = "Intermediate"
  }

  const topicRules = [
    [["repentance", "confession", "ንስሐ", "ንሰሐ"], ["repentance", "confession"], "Spiritual Growth"],
    [["prayer", "ጸሎት", "tslot", "tselot"], ["prayer"], "Spiritual Growth"],
    [["fast", "ጾም", "tsom"], ["fasting"], "Spiritual Growth"],
    [["kidase", "kidassie", "liturgy", "ቅዳሴ", "ቁርባን", "qurban"], ["liturgy", "communion"], "Spiritual Growth"],
    [["baptism", "ጥምቀት"], ["baptism", "sacraments"], "Catechumen"],
    [["mary", "mariam", "theotokos", "ድንግል", "ማርያም"], ["theotokos", "saints"], "Spiritual Growth"],
    [["saint", "st ", "gedle", "ገድለ", "ቅዱስ", "ቅድስት"], ["saints", "church history"], "Spiritual Growth"],
    [["angel", "michael", "gabriel", "መላእክት", "ሚካኤል", "ገብርኤል"], ["angels", "saints"], "Spiritual Growth"],
    [["dogma", "doctrine", "faith", "ሃይማኖት", "ምሥጢር"], ["doctrine", "theology"], "Catechumen"],
    [["history", "ታሪክ", "council", "nicea"], ["church history"], "General Knowledge"],
    [["canon", "fetha", "ፍትሐ", "church order", "ሥርዓተ"], ["canon law", "church order"], "Church Documents"],
    [["geez", "ግእዝ", "qene", "ቅኔ"], ["geez", "language"], "Curriculum"],
    [["mezmur", "hymn", "ዝማሬ", "መዝሙር"], ["mezmur", "hymns"], "Spiritual Growth"],
    [["youth", "children", "grade", "curriculum", "sunday school", "ወራዙት"], ["youth", "curriculum"], "Curriculum"],
    [["servant", "deacon", "ዲያቆን", "service"], ["service", "servant prep"], "Servant Prep"],
    [["apologetic", "islam", "muhammad", "allah", "atheist"], ["apologetics"], "General Knowledge"],
  ]

  for (const [needles, additions, inferredPurpose] of topicRules) {
    if (hasAny(text, needles)) {
      for (const topic of additions) topics.add(topic)
      purpose = inferredPurpose
    }
  }

  if (topics.has("bible study")) {
    purpose = "Curriculum"
    if (looksLikeCommentaryResource(text, source)) topics.add("commentary")
  }

  if (source !== "Ethiopian Orthodox Resource" || topics.has("commentary")) level = "Intermediate"
  if (hasAny(text, ["manuscript", "academic", "patristic", "ante nicene", "fathers", "phd"])) level = "Academic"

  if (ext === ".mp3" || ext === ".m4a" || ext === ".aac" || ext === ".wav" || ext === ".amr") {
    topics.add("audio")
    if (source === "Ethiopian Orthodox Resource") source = "Ethiopian Orthodox Audio"
  }

  return { church, purpose, type: inferType(ext), language, level, topics: [...topics].sort(), source }
}

function aliasesFor(title, file) {
  const aliases = new Set()
  const transliteratedTitle = transliterate(title)
  const ext = path.extname(file).toLowerCase()
  const transliteratedFile = transliterate(normalizeSpecialTitle(cleanTitle(cleanName(file)), file, ext))
  if (transliteratedTitle && transliteratedTitle !== title) aliases.add(transliteratedTitle)
  if (transliteratedFile && transliteratedFile !== title) aliases.add(transliteratedFile)
  for (const [english, amharic, translit] of bibleBooks) {
    if (title.includes(amharic) || transliteratedTitle.toLowerCase().includes(translit) || title.toLowerCase().includes(english)) {
      aliases.add(english)
      aliases.add(amharic)
      aliases.add(translit)
    }
  }
  return [...aliases].filter(Boolean).slice(0, 12)
}

function enrichAliases(aliases, metadata) {
  const enriched = new Set(aliases)
  const topicAliases = {
    repentance: ["niseha", "nsiha", "teshuva"],
    confession: ["niseha", "confession"],
    prayer: ["tselot", "tslot", "tselote"],
    fasting: ["tsom", "som", "fast"],
    liturgy: ["kidase", "kidassie", "qedase"],
    communion: ["qurban", "qurbana", "eucharist"],
    baptism: ["timket", "t baptism"],
    theotokos: ["mariam", "dingil mariam", "mother of god"],
    saints: ["kidusan", "gedle", "saints"],
    angels: ["melaekt", "melaekit", "angels"],
    mezmur: ["mezmur", "zema", "hymn"],
    geez: ["geez", "ge'ez", "giiz"],
    doctrine: ["haymanot", "timihirte haymanot", "faith"],
    theology: ["neger haymanot", "dogma"],
    "church history": ["ye bete kristiyan tarik", "church history"],
    "church order": ["sireate bete kristiyan", "church order"],
    "canon law": ["fetha negest", "fit'ha negest"],
    "servant prep": ["agelglot", "service"],
    curriculum: ["timihirt", "lesson"],
  }

  for (const topic of metadata.topics) {
    for (const alias of topicAliases[topic] ?? []) enriched.add(alias)
  }
  return [...enriched].filter(Boolean).slice(0, 24)
}

const files = readdirSync(booksDir)
  .filter((file) => SUPPORTED.has(path.extname(file).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, "en"))

const seenContent = new Map()
const seenTitle = new Map()
const resources = []
const skipped = []

for (const file of files) {
  const ext = path.extname(file).toLowerCase()
  const full = path.join(booksDir, file)
  const stats = statSync(full)
  const hash = createHash("sha256").update(readFileSync(full)).digest("hex")
  const rawTitle = cleanName(file)
  const cleanedTitle = normalizeSpecialTitle(cleanTitle(rawTitle), file, ext)
  const title = titleCase(cleanedTitle || normalizeSpecialTitle(rawTitle, file, ext))
  const titleKey = `${normalizeKey(title)}:${ext}`
  const contentKey = `${hash}:${stats.size}`
  const coverImage = thumbnailFor(file, ext)

  if (ext === ".pdf" && !coverImage) {
    skipped.push({ file, reason: "unreadable PDF skipped" })
    continue
  }

  if (seenContent.has(contentKey)) {
    skipped.push({ file, reason: `duplicate content of ${seenContent.get(contentKey)}` })
    continue
  }
  if (seenTitle.has(titleKey)) {
    skipped.push({ file, reason: `duplicate title of ${seenTitle.get(titleKey)}` })
    continue
  }

  seenContent.set(contentKey, file)
  seenTitle.set(titleKey, file)

  const metadata = inferMetadata(title, file, ext)
  const aliases = enrichAliases(aliasesFor(title, file), metadata)
  const url = `/books/${encodeURIComponent(file).replace(/%2F/g, "/")}`
  const aliasText = aliases.length ? ` Search aliases: ${aliases.join(", ")}.` : ""
  const sizeMb = Math.max(0.01, stats.size / 1024 / 1024).toFixed(2)
  const sourceText =
    metadata.source === "Ethiopian Orthodox Resource"
      ? "Source: Ethiopian Orthodox resource collection."
      : `Author/source: ${metadata.source}.`
  resources.push({
    id: `local-book-${slugify(title)}-${hash.slice(0, 8)}`,
    title,
    description: `${metadata.type}: ${title}. ${sourceText} Format: ${metadata.type}; file size: ${sizeMb} MB; language: ${metadata.language}; tradition: ${metadata.church}.${aliasText}`,
    ...metadata,
    aliases,
    url,
    ...(coverImage ? { coverImage } : {}),
  })
}

const body = `import type { LibraryResource } from "./library-data"

// Generated by scripts/generate-local-book-data.mjs from public/books.
// Duplicate files are removed by content hash and normalized title.
export const localBookResources: LibraryResource[] = ${JSON.stringify(resources, null, 2)}
`

writeFileSync(outputFile, body)
console.log(`Generated ${resources.length} local library resources.`)
console.log(`Skipped ${skipped.length} duplicates.`)
for (const item of skipped.slice(0, 20)) {
  console.log(`- ${item.file}: ${item.reason}`)
}
