"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, BookOpen, Heart, PlusCircle, TrendingUp, Award } from "lucide-react"

export function FaithJourneyProgress() {
  const [activeTab, setActiveTab] = useState("prayer")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="prayer" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="prayer">
            <Heart className="h-4 w-4 mr-2" />
            Prayer
          </TabsTrigger>
          <TabsTrigger value="scripture">
            <BookOpen className="h-4 w-4 mr-2" />
            Scripture
          </TabsTrigger>
          <TabsTrigger value="fasting">
            <Calendar className="h-4 w-4 mr-2" />
            Fasting
          </TabsTrigger>
          <TabsTrigger value="achievements">
            <Award className="h-4 w-4 mr-2" />
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="prayer" className="mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-lg flex items-center">
                  Prayer Journey
                  <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15%
                  </Badge>
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">You've prayed 18 out of 21 days this month</p>
              </div>
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                <PlusCircle className="h-4 w-4 mr-2" />
                Log Prayer
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Monthly Goal: 21 days</span>
                <span className="font-medium">18/21</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 21 }).map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-md flex items-center justify-center text-xs font-medium ${
                    i < 18
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                      : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg">
              <h4 className="font-medium flex items-center text-orange-800 dark:text-orange-400 mb-2">
                <span className="mr-2">✨</span> AI Insight
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                You pray most consistently in the mornings. Consider adding an evening prayer to deepen your spiritual
                practice.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="scripture" className="mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-lg">Scripture Reading</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  You've read scripture 12 out of 15 days this month
                </p>
              </div>
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                <PlusCircle className="h-4 w-4 mr-2" />
                Log Reading
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Monthly Goal: 15 days</span>
                <span className="font-medium">12/15</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Psalms 51</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Read 2 days ago</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Recent</Badge>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Matthew 5-7</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Read 5 days ago</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Book of Enoch (1 Enoch)</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Read 1 week ago</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg">
              <h4 className="font-medium flex items-center text-orange-800 dark:text-orange-400 mb-2">
                <span className="mr-2">✨</span> AI Recommendation
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Based on your reading of Psalms, you might enjoy exploring the Andemta commentary on Psalms, a
                traditional Ethiopian Orthodox interpretation.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="fasting" className="mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-lg flex items-center">
                  Fasting Discipline
                  <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +30%
                  </Badge>
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">You've maintained 8 out of 10 fasting days</p>
              </div>
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                <PlusCircle className="h-4 w-4 mr-2" />
                Log Fast
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Current Fasting Period Progress</span>
                <span className="font-medium">8/10</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h4 className="font-medium mb-2">Current Fast: Wednesday & Friday</h4>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-md flex items-center justify-center text-xs font-medium ${
                      i === 3 || i === 5
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 ring-2 ring-amber-500"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                The Wednesday fast commemorates the betrayal of Christ, while the Friday fast commemorates His
                crucifixion.
              </p>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg">
              <h4 className="font-medium flex items-center text-orange-800 dark:text-orange-400 mb-2">
                <span className="mr-2">✨</span> AI Insight
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Your fasting consistency has improved significantly. The next major fast is the Nativity Fast (Tsome
                Gahad), beginning on November 25th.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-lg">Spiritual Achievements</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">You've earned 7 badges on your faith journey</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 mx-auto bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-3">
                  <Award className="h-8 w-8 text-amber-600 dark:text-amber-500" />
                </div>
                <h4 className="font-medium">Prayer Warrior</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Prayed for 30 consecutive days</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 mx-auto bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-3">
                  <BookOpen className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h4 className="font-medium">Scripture Scholar</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Read 50 chapters of scripture</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3">
                  <Calendar className="h-8 w-8 text-green-600 dark:text-green-500" />
                </div>
                <h4 className="font-medium">Fasting Disciple</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Completed a major fasting period</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center opacity-50">
                <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
                  <Heart className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h4 className="font-medium">Community Pillar</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">In progress: 60% complete</p>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg">
              <h4 className="font-medium flex items-center text-orange-800 dark:text-orange-400 mb-2">
                <span className="mr-2">✨</span> Next Achievement
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                You're close to earning the "Liturgy Participant" badge. Attend 2 more Divine Liturgies to complete this
                achievement.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
