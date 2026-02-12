"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Award,
  TrendingUp,
  Gift,
  Star,
  BookOpen,
  Heart,
  Calendar,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { GeezHeading } from "@/components/ui/geez-heading"

// Types for faith points system
type FaithActivity = {
  id: string
  name: string
  description: string
  points: number
  category: "prayer" | "scripture" | "fasting" | "community" | "learning"
  icon: React.ReactNode
  completed: boolean
}

type FaithReward = {
  id: string
  name: string
  description: string
  pointCost: number
  icon: React.ReactNode
  unlocked: boolean
}

type FaithLevel = {
  level: number
  name: string
  pointsRequired: number
  badge: React.ReactNode
}

export function FaithPointsSystem() {
  const [currentPoints, setCurrentPoints] = useState(120)
  const [totalPointsEarned, setTotalPointsEarned] = useState(120)
  const [currentLevel, setCurrentLevel] = useState(2)
  const [showActivities, setShowActivities] = useState(true)
  const [showRewards, setShowRewards] = useState(false)

  // Sample faith activities
  const [activities, setActivities] = useState<FaithActivity[]>([
    {
      id: "1",
      name: "Daily Prayer",
      description: "Complete your morning and evening prayers",
      points: 10,
      category: "prayer",
      icon: <Heart className="h-5 w-5 text-orange-600 dark:text-orange-400" />,
      completed: false,
    },
    {
      id: "2",
      name: "Scripture Reading",
      description: "Read a chapter from the Ethiopian Orthodox Bible",
      points: 15,
      category: "scripture",
      icon: <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
      completed: false,
    },
    {
      id: "3",
      name: "Fasting Wednesday",
      description: "Complete today's fast according to EOTC tradition",
      points: 20,
      category: "fasting",
      icon: <Calendar className="h-5 w-5 text-green-600 dark:text-green-500" />,
      completed: false,
    },
    {
      id: "4",
      name: "Share Testimony",
      description: "Share your faith journey with the community",
      points: 25,
      category: "community",
      icon: <Star className="h-5 w-5 text-amber-600 dark:text-amber-500" />,
      completed: false,
    },
    {
      id: "5",
      name: "EOTC Quiz",
      description: "Complete the weekly quiz about EOTC teachings",
      points: 15,
      category: "learning",
      icon: <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-500" />,
      completed: false,
    },
  ])

  // Sample faith rewards
  const [rewards, setRewards] = useState<FaithReward[]>([
    {
      id: "1",
      name: "Prayer Warrior Badge",
      description: "Digital badge for your profile",
      pointCost: 50,
      icon: <Award className="h-5 w-5 text-amber-600 dark:text-amber-500" />,
      unlocked: true,
    },
    {
      id: "2",
      name: "Exclusive Meditation Audio",
      description: "Traditional Ethiopian Orthodox chants",
      pointCost: 100,
      icon: <Gift className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
      unlocked: true,
    },
    {
      id: "3",
      name: "Digital Icon Wallpaper",
      description: "Beautiful Ethiopian Orthodox icon for your devices",
      pointCost: 150,
      icon: <Gift className="h-5 w-5 text-green-600 dark:text-green-500" />,
      unlocked: false,
    },
    {
      id: "4",
      name: "Virtual Meeting with Priest",
      description: "15-minute spiritual guidance session",
      pointCost: 300,
      icon: <Gift className="h-5 w-5 text-orange-600 dark:text-orange-400" />,
      unlocked: false,
    },
    {
      id: "5",
      name: "Community Leader Status",
      description: "Special recognition in the community forums",
      pointCost: 500,
      icon: <Award className="h-5 w-5 text-purple-600 dark:text-purple-500" />,
      unlocked: false,
    },
  ])

  // Faith levels
  const faithLevels: FaithLevel[] = [
    {
      level: 1,
      name: "Beginner",
      pointsRequired: 0,
      badge: <Star className="h-5 w-5 text-gray-400" />,
    },
    {
      level: 2,
      name: "Disciple",
      pointsRequired: 100,
      badge: <Star className="h-5 w-5 text-amber-400" />,
    },
    {
      level: 3,
      name: "Faithful",
      pointsRequired: 250,
      badge: <Award className="h-5 w-5 text-amber-500" />,
    },
    {
      level: 4,
      name: "Devoted",
      pointsRequired: 500,
      badge: <Award className="h-5 w-5 text-amber-600" />,
    },
    {
      level: 5,
      name: "Spiritual Warrior",
      pointsRequired: 1000,
      badge: <Award className="h-5 w-5 text-orange-600" />,
    },
  ]

  // Calculate progress to next level
  const getCurrentLevelInfo = () => {
    const currentLevelInfo = faithLevels.find((level) => level.level === currentLevel)
    const nextLevelInfo = faithLevels.find((level) => level.level === currentLevel + 1)

    if (!currentLevelInfo || !nextLevelInfo) return { progress: 100, pointsToNextLevel: 0 }

    const pointsForCurrentLevel = currentLevelInfo.pointsRequired
    const pointsForNextLevel = nextLevelInfo.pointsRequired
    const pointsNeeded = pointsForNextLevel - pointsForCurrentLevel
    const pointsProgress = totalPointsEarned - pointsForCurrentLevel

    const progress = Math.min(Math.round((pointsProgress / pointsNeeded) * 100), 100)
    const pointsToNextLevel = Math.max(pointsForNextLevel - totalPointsEarned, 0)

    return { progress, pointsToNextLevel }
  }

  const { progress, pointsToNextLevel } = getCurrentLevelInfo()

  // Complete an activity
  const completeActivity = (activityId: string) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) => {
        if (activity.id === activityId && !activity.completed) {
          // Add points
          setCurrentPoints((prev) => prev + activity.points)
          setTotalPointsEarned((prev) => prev + activity.points)

          return { ...activity, completed: true }
        }
        return activity
      }),
    )
  }

  // Unlock a reward
  const unlockReward = (rewardId: string) => {
    const reward = rewards.find((r) => r.id === rewardId)

    if (reward && !reward.unlocked && currentPoints >= reward.pointCost) {
      setCurrentPoints((prev) => prev - reward.pointCost)

      setRewards((prevRewards) =>
        prevRewards.map((r) => {
          if (r.id === rewardId) {
            return { ...r, unlocked: true }
          }
          return r
        }),
      )
    }
  }

  // Check if level up occurred when points change
  useEffect(() => {
    for (let i = faithLevels.length - 1; i >= 0; i--) {
      if (totalPointsEarned >= faithLevels[i].pointsRequired) {
        if (currentLevel !== faithLevels[i].level) {
          setCurrentLevel(faithLevels[i].level)
        }
        break
      }
    }
  }, [totalPointsEarned])

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <GeezHeading className="text-amber-800 dark:text-amber-500 mb-2">የእምነት ነጥቦች</GeezHeading>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Faith Points System</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Earn points through spiritual activities and unlock special rewards
        </p>
      </div>

      <Card className="border-none shadow-lg overflow-hidden mb-8">
        <CardHeader className="bg-gradient-to-r from-amber-600 to-red-600 text-white">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Your Faith Journey
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="bg-white/20 text-white">Level {currentLevel}</Badge>
              <Badge className="bg-white/20 text-white">{currentPoints} Points</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                {faithLevels.find((level) => level.level === currentLevel)?.badge || (
                  <Star className="h-8 w-8 text-amber-500" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {faithLevels.find((level) => level.level === currentLevel)?.name || "Beginner"}
                </h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress to next level</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  {pointsToNextLevel > 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {pointsToNextLevel} more points to reach level {currentLevel + 1}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-500">{totalPointsEarned}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Points Earned</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-500">{currentPoints}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Available Points</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-500">
                  {rewards.filter((r) => r.unlocked).length}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Rewards Unlocked</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Activities Section */}
        <Card className="border-none shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Faith Activities
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={() => setShowActivities(!showActivities)}
              >
                {showActivities ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          <AnimatePresence>
            {showActivities && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div
                        key={activity.id}
                        className={`p-4 rounded-lg border ${
                          activity.completed
                            ? "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <div
                              className={`p-2 rounded-full ${
                                activity.category === "prayer"
                                  ? "bg-orange-100 dark:bg-orange-900/30"
                                  : activity.category === "scripture"
                                    ? "bg-blue-100 dark:bg-blue-900/30"
                                    : activity.category === "fasting"
                                      ? "bg-green-100 dark:bg-green-900/30"
                                      : activity.category === "community"
                                        ? "bg-amber-100 dark:bg-amber-900/30"
                                        : "bg-purple-100 dark:bg-purple-900/30"
                              }`}
                            >
                              {activity.icon}
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white flex items-center">
                                {activity.name}
                                {activity.completed && (
                                  <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                    Completed
                                  </Badge>
                                )}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{activity.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Badge
                              className={`${
                                activity.category === "prayer"
                                  ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                                  : activity.category === "scripture"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                    : activity.category === "fasting"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                      : activity.category === "community"
                                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                        : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                              }`}
                            >
                              +{activity.points} points
                            </Badge>
                          </div>
                        </div>

                        {!activity.completed && (
                          <div className="mt-4 flex justify-end">
                            <Button
                              size="sm"
                              onClick={() => completeActivity(activity.id)}
                              className={`${
                                activity.category === "prayer"
                                  ? "bg-orange-600 hover:bg-orange-700"
                                  : activity.category === "scripture"
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : activity.category === "fasting"
                                      ? "bg-green-600 hover:bg-green-700"
                                      : activity.category === "community"
                                        ? "bg-amber-600 hover:bg-amber-700"
                                        : "bg-purple-600 hover:bg-purple-700"
                              }`}
                            >
                              Complete Activity
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Rewards Section */}
        <Card className="border-none shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-800 text-white py-4">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Faith Rewards
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={() => setShowRewards(!showRewards)}
              >
                {showRewards ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          <AnimatePresence>
            {showRewards && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {rewards.map((reward) => (
                      <div
                        key={reward.id}
                        className={`p-4 rounded-lg border ${
                          reward.unlocked
                            ? "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800"
                            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30">{reward.icon}</div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white flex items-center">
                                {reward.name}
                                {reward.unlocked && (
                                  <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                    Unlocked
                                  </Badge>
                                )}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{reward.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                              {reward.pointCost} points
                            </Badge>
                          </div>
                        </div>

                        {!reward.unlocked && (
                          <div className="mt-4 flex justify-end">
                            <Button
                              size="sm"
                              onClick={() => unlockReward(reward.id)}
                              disabled={currentPoints < reward.pointCost}
                              className="bg-amber-600 hover:bg-amber-700"
                            >
                              {currentPoints >= reward.pointCost
                                ? "Unlock Reward"
                                : `Need ${reward.pointCost - currentPoints} more points`}
                            </Button>
                          </div>
                        )}

                        {reward.unlocked && (
                          <div className="mt-4 flex justify-end">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-500"
                            >
                              <ChevronRight className="h-4 w-4 mr-1" />
                              Access Reward
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  )
}
