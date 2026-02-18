"use client"

import { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"

type SearchType = "ethiopian" | "oriental"

const mapSearchQuery = (type: SearchType, location: string) => {
  const searchTerm = location.trim() || "near me"

  if (type === "ethiopian") {
    return `Ethiopian Orthodox Tewahedo Church ${searchTerm}`
  }

  return `Oriental Orthodox Church ${searchTerm}`
}

const googleMapsEmbedUrl = (query: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`

export function ChurchLocator() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState<SearchType>("ethiopian")

  const activeQuery = useMemo(
    () => mapSearchQuery(searchType, searchQuery),
    [searchType, searchQuery],
  )

  const mapUrl = useMemo(() => googleMapsEmbedUrl(activeQuery), [activeQuery])

  return (
    <Card className="border-none shadow-lg overflow-hidden bg-white/90 dark:bg-gray-900">
      <CardContent className="p-6">
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Enter your city, ZIP code, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-amber-200 dark:border-amber-800 focus:border-amber-500 dark:focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <Button
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-md"
              onClick={() => setSearchType("ethiopian")}
            >
              Find Ethiopian Orthodox Churches
            </Button>
            <Button
              variant="outline"
              className="border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30"
              onClick={() => setSearchType("oriental")}
            >
              Find Oriental Orthodox Churches
            </Button>
          </div>

          <div className="rounded-lg overflow-hidden border border-amber-200/60 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60">
            <div className="px-4 py-2 border-b border-amber-200/60 dark:border-gray-800 text-xs text-muted-foreground flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              Showing results for: <span className="font-medium text-foreground">{activeQuery}</span>
            </div>
            <iframe
              title="Church locator map"
              src={mapUrl}
              className="w-full h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <p className="text-sm font-bold text-foreground text-center">
            We did our best to help you find Oriental Orthodox churches, but some map labels are controlled by Google
            Maps and may include non-Oriental entries (for example, Greek Orthodox). Oriental Orthodox churches
            include traditions such as Coptic (Egyptian), Ethiopian, Eritrean, Armenian, Syriac, and Malankara.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
