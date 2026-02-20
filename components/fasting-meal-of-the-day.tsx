"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UtensilsCrossed } from "lucide-react"

type Meal = {
  name: string
  tradition: string
  ingredients: string[]
}

const meals: Meal[] = [
  { name: "Misir Wot", tradition: "Ethiopian", ingredients: ["red lentils", "berbere", "onion", "garlic"] },
  { name: "Shiro Wot", tradition: "Ethiopian", ingredients: ["shiro powder", "onion", "garlic", "olive oil"] },
  { name: "Ful Medames", tradition: "Mediterranean", ingredients: ["fava beans", "olive oil", "lemon", "cumin"] },
  { name: "Mujadara", tradition: "Mediterranean", ingredients: ["lentils", "rice", "onions", "olive oil"] },
  { name: "Batata Harra", tradition: "Mediterranean", ingredients: ["potatoes", "garlic", "cilantro", "lemon"] },
]

function getMealOfDay(date: Date): Meal {
  const dayNumber = Math.floor(date.getTime() / (1000 * 60 * 60 * 24))
  return meals[Math.abs(dayNumber) % meals.length]
}

export function FastingMealOfTheDay() {
  const meal = getMealOfDay(new Date())

  return (
    <Card className="h-auto md:h-[340px] border border-amber-200/70 shadow-lg overflow-hidden bg-gradient-to-br from-white to-amber-50/40">
      <div className="h-1.5 bg-gradient-to-r from-amber-500 to-orange-500" />
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-amber-700">
          <UtensilsCrossed className="h-5 w-5" />
          Fasting Meal of the Day
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="rounded-lg bg-white p-4 border border-amber-200/70">
          <p className="text-sm text-gray-500">{meal.tradition}</p>
          <p className="text-xl font-bold text-gray-900">{meal.name}</p>
          <p className="text-sm mt-2 text-gray-600">Quick ingredients:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {meal.ingredients.map((ingredient) => (
              <span key={ingredient} className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                {ingredient}
              </span>
            ))}
          </div>
        </div>

        <Button asChild className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
          <Link href="/fasting-recipes">Cook Now</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
