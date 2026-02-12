"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Define available languages
type Language = "en" | "am"
type TranslationKey = string
type Translations = Record<Language, Record<TranslationKey, string>>

// Create context for language
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
})

// Sample translations
const translations: Translations = {
  en: {
    home: "Home",
    about: "About Us",
    teachings: "Teachings",
    repentance: "Repentance",
    communion: "Holy Communion",
    qa: "Q&A",
    youth: "Youth Corner",
    contact: "Contact Us",
    prayer_countdown: "Next Prayer In",
    daily_verse: "Daily Verse",
    saint_of_day: "Saint of the Day",
    join_prayer: "Join Live Prayer",
    spiritual_journey: "Your Spiritual Journey",
    faith_challenges: "Faith Challenges",
    community: "Community",
    start_journey: "Start Your Faith Journey",
    try_ai: "Try AI Spiritual Guide",
  },
  am: {
    home: "መነሻ",
    about: "ስለ እኛ",
    teachings: "ትምህርቶች",
    repentance: "ንስሐ",
    communion: "ቅዱስ ቁርባን",
    qa: "ጥያቄዎች እና መልሶች",
    youth: "የወጣቶች ማዕዘን",
    contact: "አግኙን",
    prayer_countdown: "ቀጣዩ ጸሎት በ",
    daily_verse: "የዕለቱ ጥቅስ",
    saint_of_day: "የዕለቱ ቅዱስ",
    join_prayer: "በቀጥታ ጸሎት ይቀላቀሉ",
    spiritual_journey: "የእምነት ጉዞዎ",
    faith_challenges: "የእምነት ፈተናዎች",
    community: "ማህበረሰብ",
    start_journey: "የእምነት ጉዞዎን ይጀምሩ",
    try_ai: "የሰው ሰራሽ ብልሃት መንፈሳዊ መመሪያ ይሞክሩ",
  },
}

// Language Provider component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "am")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)

    // Set HTML lang attribute for accessibility
    document.documentElement.lang = lang
  }

  // Translation function
  const t = (key: TranslationKey): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Language Switcher component
export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className={language === "en" ? "bg-amber-100 dark:bg-amber-900/30" : ""}
        >
          <span className="mr-2">🇺🇸</span> English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("am")}
          className={language === "am" ? "bg-amber-100 dark:bg-amber-900/30" : ""}
        >
          <span className="mr-2">🇪🇹</span> አማርኛ (Amharic)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Example usage of the translation hook
export function TranslatedText({ textKey }: { textKey: TranslationKey }) {
  const { t } = useLanguage()
  return <>{t(textKey)}</>
}
