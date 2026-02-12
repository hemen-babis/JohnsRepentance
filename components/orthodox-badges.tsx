"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Award, Calendar, Heart, Star } from "lucide-react"
import { cn } from "@/lib/utils"

const badges = [
  {
    id: 1,
    name: "Scripture Scholar",
    icon: <BookOpen className="h-6 w-6 text-amber-600 dark:text-amber-500" />,
    description: "Completed 30 days of Bible reading",
    earned: true,
    progress: 100,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Fasting Warrior",
    icon: <Calendar className="h-6 w-6 text-amber-600 dark:text-amber-500" />,
    description: "Completed 10 fasting days",
    earned: true,
    progress: 100,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Prayer Champion",
    icon: <Heart className="h-6 w-6 text-amber-600 dark:text-amber-500" />,
    description: "Prayed daily for 14 consecutive days",
    earned: false,
    progress: 65,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Saint Explorer",
    icon: <Star className="h-6 w-6 text-amber-600 dark:text-amber-500" />,
    description: "Learned about 15 Ethiopian saints",
    earned: false,
    progress: 40,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export function OrthodoxBadges() {
  return (
    <Card className="border-none shadow-lg overflow-hidden bg-white dark:bg-gray-900">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={cn(
                "flex flex-col items-center p-4 rounded-lg text-center relative overflow-hidden",
                badge.earned
                  ? "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/30 border border-amber-200 dark:border-amber-800"
                  : "bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800",
              )}
            >
              {!badge.earned && badge.progress > 0 && (
                <div className="absolute bottom-0 left-0 h-1 bg-amber-500" style={{ width: `${badge.progress}%` }} />
              )}

              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mb-3",
                  badge.earned ? "bg-amber-100 dark:bg-amber-900/50" : "bg-gray-100 dark:bg-gray-800",
                )}
              >
                {badge.icon}
              </div>

              <h3 className="font-bold text-sm mb-1 text-gray-900 dark:text-white">{badge.name}</h3>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{badge.description}</p>

              {badge.earned ? (
                <Badge variant="success" />
              ) : (
                <span className="text-xs text-amber-700 dark:text-amber-500">{badge.progress}% complete</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button
            variant="outline"
            className="text-amber-700 dark:text-amber-500 border-amber-300 dark:border-amber-700"
          >
            View All Badges
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function Badge({ variant = "default" }) {
  return (
    <div className="flex items-center gap-1 text-xs">
      {variant === "success" && (
        <>
          <Award className="h-3 w-3 text-amber-600 dark:text-amber-500" />
          <span className="text-amber-700 dark:text-amber-500">Earned</span>
        </>
      )}
    </div>
  )
}
