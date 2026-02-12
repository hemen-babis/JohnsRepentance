"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Award, ArrowRight } from "lucide-react"

const challenges = [
  {
    id: 1,
    title: "7-Day Psalm Challenge",
    description: "Read one psalm each day for a week",
    duration: "7 days",
    difficulty: "Beginner",
    points: 50,
    progress: 3,
    total: 7,
    active: true,
  },
  {
    id: 2,
    title: "Fast of Wednesday & Friday",
    description: "Complete the weekly fast with prayers",
    duration: "2 days",
    difficulty: "Intermediate",
    points: 75,
    progress: 1,
    total: 2,
    active: true,
  },
  {
    id: 3,
    title: "Saint Stories Marathon",
    description: "Learn about 10 Ethiopian saints",
    duration: "10 days",
    difficulty: "Advanced",
    points: 100,
    progress: 0,
    total: 10,
    active: false,
  },
]

export function OrthodoxChallenges() {
  const [activeChallenges, setActiveChallenges] = useState(challenges)

  const joinChallenge = (id: number) => {
    setActiveChallenges((prev) =>
      prev.map((challenge) => (challenge.id === id ? { ...challenge, active: true } : challenge)),
    )
  }

  return (
    <Card className="border-none shadow-lg overflow-hidden bg-white dark:bg-gray-900">
      <CardContent className="p-6">
        <div className="space-y-6">
          {activeChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`p-4 rounded-lg border ${
                challenge.active
                  ? "border-amber-200 dark:border-amber-800 bg-gradient-to-r from-amber-50 to-amber-100/30 dark:from-amber-950/50 dark:to-amber-900/30"
                  : "border-gray-200 dark:border-gray-800"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">{challenge.title}</h3>
                <Badge
                  variant={challenge.active ? "default" : "outline"}
                  className={challenge.active ? "bg-amber-600" : ""}
                >
                  {challenge.active ? "Active" : "Join"}
                </Badge>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{challenge.description}</p>

              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {challenge.duration}
                </div>
                <div className="flex items-center">
                  <Award className="h-3 w-3 mr-1" />
                  {challenge.points} points
                </div>
                <div>{challenge.difficulty}</div>
              </div>

              {challenge.active ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span>Progress</span>
                    <span className="font-medium">
                      {challenge.progress}/{challenge.total}
                    </span>
                  </div>
                  <Progress
                    value={(challenge.progress / challenge.total) * 100}
                    className="h-2 bg-gray-100 dark:bg-gray-800"
                  />

                  <div className="flex justify-between items-center mt-3">
                    <Button variant="outline" size="sm" className="text-xs">
                      Update Progress
                    </Button>
                    <Button variant="link" size="sm" className="text-xs text-amber-700 dark:text-amber-500">
                      View Details
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => joinChallenge(challenge.id)}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
                >
                  Join Challenge
                </Button>
              )}
            </div>
          ))}

          <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-dashed">
            Explore More Challenges
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
