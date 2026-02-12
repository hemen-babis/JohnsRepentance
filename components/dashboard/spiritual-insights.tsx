"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { TrendingUp, Users, BookOpen, Heart, Clock } from "lucide-react"

// Sample data - in a real app, this would come from your API
const prayerData = [
  { name: "Sun", count: 3 },
  { name: "Mon", count: 2 },
  { name: "Tue", count: 4 },
  { name: "Wed", count: 5 },
  { name: "Thu", count: 3 },
  { name: "Fri", count: 6 },
  { name: "Sat", count: 4 },
]

const scriptureData = [
  { name: "Psalms", value: 35 },
  { name: "Gospels", value: 25 },
  { name: "Epistles", value: 15 },
  { name: "Prophets", value: 10 },
  { name: "Other", value: 15 },
]

const COLORS = ["#FF8042", "#FFBB28", "#00C49F", "#0088FE", "#8884d8"]

const engagementData = [
  { month: "Jan", prayers: 65, scripture: 40, community: 24 },
  { month: "Feb", prayers: 68, scripture: 45, community: 27 },
  { month: "Mar", prayers: 75, scripture: 50, community: 30 },
  { month: "Apr", prayers: 80, scripture: 55, community: 35 },
  { month: "May", prayers: 85, scripture: 60, community: 40 },
  { month: "Jun", prayers: 90, scripture: 65, community: 45 },
]

const insightCards = [
  {
    title: "Prayer Pattern",
    description: "You pray most consistently on Fridays and Wednesdays",
    icon: <Clock className="h-5 w-5 text-amber-600" />,
    action: "View Prayer History",
  },
  {
    title: "Scripture Focus",
    description: "You've been reading more from Psalms this month",
    icon: <BookOpen className="h-5 w-5 text-amber-600" />,
    action: "Explore Related Readings",
  },
  {
    title: "Community Connection",
    description: "Your testimony inspired 12 community members",
    icon: <Users className="h-5 w-5 text-amber-600" />,
    action: "See Community Impact",
  },
  {
    title: "Spiritual Growth",
    description: "Your consistency in fasting has increased by 30%",
    icon: <TrendingUp className="h-5 w-5 text-amber-600" />,
    action: "View Growth Metrics",
  },
]

export function SpiritualInsightsDashboard() {
  const [timeframe, setTimeframe] = useState("week")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">AI-Powered Spiritual Insights</h3>
          <p className="text-gray-600 dark:text-gray-300">Personalized analytics to guide your faith journey</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className={
              timeframe === "week" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" : ""
            }
            onClick={() => setTimeframe("week")}
          >
            Week
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={
              timeframe === "month" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" : ""
            }
            onClick={() => setTimeframe("month")}
          >
            Month
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={
              timeframe === "year" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" : ""
            }
            onClick={() => setTimeframe("year")}
          >
            Year
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insightCards.map((card, index) => (
          <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base font-medium">{card.title}</CardTitle>
                <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30">{card.icon}</div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{card.description}</p>
              <Button variant="link" className="p-0 h-auto text-amber-600 dark:text-amber-500">
                {card.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-orange-600" />
              Prayer Activity
              <Badge className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                AI Analysis
              </Badge>
            </CardTitle>
            <CardDescription>Your daily prayer consistency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={prayerData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Prayers" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Scripture Engagement
            </CardTitle>
            <CardDescription>Distribution of your scripture readings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scriptureData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {scriptureData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle>Spiritual Growth Trends</CardTitle>
          <CardDescription>Your engagement over time with AI-detected patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="prayers" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="scripture" stroke="#82ca9d" />
                <Line type="monotone" dataKey="community" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white">
          Get Personalized Spiritual Recommendations
        </Button>
      </div>
    </div>
  )
}
