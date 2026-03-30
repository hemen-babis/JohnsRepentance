"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Heart, TrendingUp } from "lucide-react"

// Sample data - in a real app, this would come from your API
const communityPrayerData = [
  { name: "Morning", count: 1245 },
  { name: "Noon", count: 876 },
  { name: "Evening", count: 1532 },
  { name: "Night", count: 943 },
]

export function PrayerMetrics() {
  return (
    <Card className="border-none shadow-lg overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            Community Prayer Metrics
          </CardTitle>
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <TrendingUp className="h-3 w-3 mr-1" />
            +12% this week
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Prayers Today</p>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-500">4,596</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Prayer Groups</p>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-500">32</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Prayer Distribution by Time</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={communityPrayerData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" name="Participants" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg">
            <h4 className="font-medium flex items-center text-orange-800 dark:text-orange-400 mb-2">
              <span className="mr-2">✨</span> AI Insight
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Evening prayers have seen the highest participation this week. Consider joining the community evening
              prayer session at 6:00 PM.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
