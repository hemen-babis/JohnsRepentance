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
    <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-emerald-50 to-lime-50 dark:from-emerald-950 dark:to-lime-950">
      <div className="h-2 bg-gradient-to-r from-emerald-500 to-lime-500" />
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
          <UtensilsCrossed className="h-5 w-5" />
          Fasting Meal of the Day
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-white/85 dark:bg-slate-900/70 p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">{meal.tradition}</p>
          <p className="text-xl font-bold">{meal.name}</p>
          <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">Quick ingredients:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {meal.ingredients.map((ingredient) => (
              <span key={ingredient} className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                {ingredient}
              </span>
            ))}
          </div>
        </div>

        <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-500">
          <Link href="/fasting-recipes">Cook Now</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
