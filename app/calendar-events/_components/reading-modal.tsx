"use client"

import { useEffect, useState } from "react"
import { ExternalLink, Languages, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { LiturgicalReading } from "./liturgical-readings-data"

const GEEZ_TO_LATIN: Record<string, string> = {
  ሀ: "ha", ሁ: "hu", ሂ: "hi", ሃ: "ha", ሄ: "he", ህ: "h", ሆ: "ho",
  ለ: "le", ሉ: "lu", ሊ: "li", ላ: "la", ሌ: "le", ል: "l", ሎ: "lo",
  መ: "me", ሙ: "mu", ሚ: "mi", ማ: "ma", ሜ: "me", ም: "m", ሞ: "mo",
  ሠ: "se", ሡ: "su", ሢ: "si", ሣ: "sa", ሤ: "se", ሥ: "s", ሦ: "so",
  ረ: "re", ሩ: "ru", ሪ: "ri", ራ: "ra", ሬ: "re", ር: "r", ሮ: "ro",
  ሰ: "se", ሱ: "su", ሲ: "si", ሳ: "sa", ሴ: "se", ስ: "s", ሶ: "so",
  ሸ: "she", ሹ: "shu", ሺ: "shi", ሻ: "sha", ሼ: "she", ሽ: "sh", ሾ: "sho",
  ቀ: "qe", ቁ: "qu", ቂ: "qi", ቃ: "qa", ቄ: "qe", ቅ: "q", ቆ: "qo",
  በ: "be", ቡ: "bu", ቢ: "bi", ባ: "ba", ቤ: "be", ብ: "b", ቦ: "bo",
  ተ: "te", ቱ: "tu", ቲ: "ti", ታ: "ta", ቴ: "te", ት: "t", ቶ: "to",
  ቸ: "che", ቹ: "chu", ቺ: "chi", ቻ: "cha", ቼ: "che", ች: "ch", ቾ: "cho",
  ኀ: "he", ኁ: "hu", ኂ: "hi", ኃ: "ha", ኄ: "he", ኅ: "h", ኆ: "ho",
  ነ: "ne", ኑ: "nu", ኒ: "ni", ና: "na", ኔ: "ne", ን: "n", ኖ: "no",
  አ: "a", ኡ: "u", ኢ: "i", ኣ: "a", ኤ: "e", እ: "i", ኦ: "o",
  ከ: "ke", ኩ: "ku", ኪ: "ki", ካ: "ka", ኬ: "ke", ክ: "k", ኮ: "ko",
  ወ: "we", ዉ: "wu", ዊ: "wi", ዋ: "wa", ዌ: "we", ው: "w", ዎ: "wo",
  ዐ: "a", ዑ: "u", ዒ: "i", ዓ: "a", ዔ: "e", ዕ: "i", ዖ: "o",
  ዘ: "ze", ዙ: "zu", ዚ: "zi", ዛ: "za", ዜ: "ze", ዝ: "z", ዞ: "zo",
  የ: "ye", ዩ: "yu", ዪ: "yi", ያ: "ya", ዬ: "ye", ይ: "y", ዮ: "yo",
  ደ: "de", ዱ: "du", ዲ: "di", ዳ: "da", ዴ: "de", ድ: "d", ዶ: "do",
  ጀ: "je", ጁ: "ju", ጂ: "ji", ጃ: "ja", ጄ: "je", ጅ: "j", ጆ: "jo",
  ገ: "ge", ጉ: "gu", ጊ: "gi", ጋ: "ga", ጌ: "ge", ግ: "g", ጎ: "go",
  ጠ: "te", ጡ: "tu", ጢ: "ti", ጣ: "ta", ጤ: "te", ጥ: "t", ጦ: "to",
  ጨ: "che", ጩ: "chu", ጪ: "chi", ጫ: "cha", ጬ: "che", ጭ: "ch", ጮ: "cho",
  ጸ: "tse", ጹ: "tsu", ጺ: "tsi", ጻ: "tsa", ጼ: "tse", ጽ: "ts", ጾ: "tso",
  ፀ: "tse", ፁ: "tsu", ፂ: "tsi", ፃ: "tsa", ፄ: "tse", ፅ: "ts", ፆ: "tso",
  ፈ: "fe", ፉ: "fu", ፊ: "fi", ፋ: "fa", ፌ: "fe", ፍ: "f", ፎ: "fo",
  ፐ: "pe", ፑ: "pu", ፒ: "pi", ፓ: "pa", ፔ: "pe", ፕ: "p", ፖ: "po",
}

function transliterateAmharic(value: string) {
  return value
    .split("")
    .map((char) => GEEZ_TO_LATIN[char] ?? char)
    .join("")
    .replace(/\s+/g, " ")
    .trim()
}

function buildNkjvUrl(reference: string) {
  const normalized = reference
    .replace(/\bto end\b/gi, "")
    .replace(/\bto the end\b/gi, "")
    .replace(/\s+/g, " ")
    .trim()

  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(normalized)}&version=NKJV`
}

export function ReadingModal({
  reading,
  open,
  onClose,
}: {
  reading: LiturgicalReading | null
  open: boolean
  onClose: () => void
}) {
  const [showTransliteration, setShowTransliteration] = useState(false)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose, open])

  useEffect(() => {
    if (open) setShowTransliteration(false)
  }, [open])

  if (!open || !reading) return null

  const renderAmText = (text: string) => (showTransliteration ? transliterateAmharic(text) : text)

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-amber-200/70 bg-[linear-gradient(135deg,rgba(255,251,243,0.98),rgba(251,241,222,0.95))] p-6 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 dark:border-stone-700 dark:bg-stone-900">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">Sunday Readings</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">{reading.date}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowTransliteration((current) => !current)}
              className={`border-amber-300 bg-white text-stone-800 hover:bg-amber-50 dark:border-stone-700 dark:bg-stone-950 ${
                showTransliteration ? "ring-2 ring-amber-300" : ""
              }`}
              aria-label="Toggle transliteration"
              title="Toggle transliteration"
            >
              <Languages className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-amber-300 bg-white text-stone-800 hover:bg-amber-50 dark:border-stone-700 dark:bg-stone-950"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl border border-amber-200/70 bg-white/75 p-4 dark:border-stone-700 dark:bg-stone-950/70">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">Mezmur</p>
            <p className="mt-3 text-2xl font-semibold text-stone-900 dark:text-stone-100">{renderAmText(reading.mezmur.am)}</p>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">{reading.mezmur.en}</p>
          </section>

          <section className="rounded-2xl border border-amber-200/70 bg-white/75 p-4 dark:border-stone-700 dark:bg-stone-950/70">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">Kidase</p>
            <p className="mt-3 text-2xl font-semibold text-stone-900 dark:text-stone-100">{renderAmText(reading.kidase.am)}</p>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">{reading.kidase.en}</p>
          </section>
        </div>

        <section className="mt-4 rounded-2xl border border-amber-200/70 bg-white/75 p-4 dark:border-stone-700 dark:bg-stone-950/70">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">Readings</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl bg-amber-50 p-3 dark:bg-stone-900">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Pauline</p>
                <a href={buildNkjvUrl(reading.readings.pauline.en)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 hover:text-amber-800">
                  NKJV <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
              <p className="mt-2 text-lg font-medium text-stone-900 dark:text-stone-100">{renderAmText(reading.readings.pauline.am)}</p>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">{reading.readings.pauline.en}</p>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 dark:bg-stone-900">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Catholic</p>
                <a href={buildNkjvUrl(reading.readings.catholic.en)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 hover:text-amber-800">
                  NKJV <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
              <p className="mt-2 text-lg font-medium text-stone-900 dark:text-stone-100">{renderAmText(reading.readings.catholic.am)}</p>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">{reading.readings.catholic.en}</p>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 dark:bg-stone-900">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Acts</p>
                <a href={buildNkjvUrl(reading.readings.acts.en)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 hover:text-amber-800">
                  NKJV <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
              <p className="mt-2 text-lg font-medium text-stone-900 dark:text-stone-100">{renderAmText(reading.readings.acts.am)}</p>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">{reading.readings.acts.en}</p>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-amber-200/70 bg-white/75 p-4 dark:border-stone-700 dark:bg-stone-950/70">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">Misbak</p>
            <a href={buildNkjvUrl(reading.misbak.reference.en)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 hover:text-amber-800">
              NKJV Psalm <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <p className="mt-2 text-base font-semibold text-stone-700 dark:text-stone-300">{renderAmText(reading.misbak.reference.am)}</p>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{reading.misbak.reference.en}</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <div className="rounded-xl bg-amber-50 p-4 dark:bg-stone-900">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Ge&apos;ez</p>
              <div className="mt-3 space-y-2">
                {reading.misbak.geez.map((line) => (
                  <p key={line} className="text-lg leading-8 text-stone-900 dark:text-stone-100">
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-amber-50 p-4 dark:bg-stone-900">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Amharic</p>
              <div className="mt-3 space-y-2">
                {reading.misbak.amharic.map((line) => (
                  <p key={line} className="text-lg leading-8 text-stone-900 dark:text-stone-100">
                    {renderAmText(line)}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-amber-50 p-4 dark:bg-stone-900">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">English</p>
              <div className="mt-3 space-y-2">
                {reading.misbak.english.map((line) => (
                  <p key={line} className="text-base leading-7 text-stone-900 dark:text-stone-100">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-amber-200/70 bg-white/75 p-4 dark:border-stone-700 dark:bg-stone-950/70">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">Gospel</p>
            <a href={buildNkjvUrl(reading.gospel.en)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 hover:text-amber-800">
              NKJV <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <p className="mt-3 text-2xl font-semibold text-stone-900 dark:text-stone-100">{renderAmText(reading.gospel.am)}</p>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">{reading.gospel.en}</p>
        </section>
      </div>
    </div>
  )
}
