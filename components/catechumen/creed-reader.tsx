"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const englishCreed = [
  "Truly we believe in One God, God the Father, the Almighty, creator of Heaven and earth and of all things visible and invisible.",
  "We believe in one Lord, Jesus Christ, the only begotten Son of God, born of the Father before all ages. Light of Light; True God of True God; begotten, not made; consubstantial with the Father, by whom all things were made. Who for us and for our salvation descended from Heaven, and was incarnate of the Holy Spirit and of the Virgin Mary, and became man. He was crucified for us during the reign of Pontius Pilate. He suffered and was buried. He arose from the dead on the third day, according to the Scriptures. He ascended to the heavens, and sits at the right hand of His Father. He will come back in His glory to judge the living and the dead; and His Kingdom shall have no end.",
  "Truly we believe in the Holy Spirit, the Life—Giving Lord, who proceeds from the Father; we worship and glorify Him together with the Father and the Son, Who speaks through the prophets. We believe in one Holy, Universal and Apostolic Church, and we acknowledge one baptism for the remission of sins. We await the resurrection of the dead, and the life of the world to come.",
  "Amen",
]

export function CreedReader() {
  return (
    <Card className="overflow-hidden border-none bg-white/82 shadow-[0_28px_90px_-48px_rgba(120,53,15,0.34)] backdrop-blur-xl dark:border-orange-900/30 dark:bg-[linear-gradient(135deg,rgba(42,28,20,0.96),rgba(24,17,14,0.94))]">
      <div className="h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />
      <CardHeader className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-orange-700 dark:text-amber-400">Creed Text</p>
          <CardTitle className="mt-2 text-2xl text-stone-900 dark:text-white">The Orthodox Creed</CardTitle>
        </div>
        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          This lesson now shows the creed in English only.
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-[1.85rem] border border-amber-200/60 bg-gradient-to-br from-amber-50/85 via-white to-orange-50/35 p-6 md:p-8 dark:border-orange-900/30 dark:from-stone-900 dark:to-orange-950/20">
          <div className="max-w-4xl space-y-5 text-lg leading-8 text-stone-800 dark:text-stone-200">
            {englishCreed.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
