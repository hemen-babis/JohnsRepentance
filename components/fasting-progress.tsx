"use client"

import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, AlertTriangle } from "lucide-react"

export function FastingProgress() {
  // In a real app, this would come from your API or state management
  const currentFast = {
    name: "Wednesday & Friday Fast",
    startDate: "Every Wednesday and Friday",
    endDate: "Throughout the year",
    daysCompleted: 2,
    totalDays: 2,
    nextFastDay: "Tomorrow",
    description: "Wednesday commemorates the betrayal of Christ, Friday commemorates His crucifixion.",
  }

  const progress = (currentFast.daysCompleted / currentFast.totalDays) * 100

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium text-lg">{currentFast.name}</h3>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{currentFast.startDate}</span>
          </div>
        </div>
        <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">Active</Badge>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span className="font-medium">
            {currentFast.daysCompleted}/{currentFast.totalDays} days
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <p className="text-sm text-gray-600 dark:text-gray-300">{currentFast.description}</p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-amber-800 dark:text-amber-500 mb-1">Next Fast Day</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {currentFast.nextFastDay} - Remember to prepare your fasting meals in advance.
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1">
          Fasting Guide
        </Button>
        <Button className="flex-1 bg-amber-600 hover:bg-amber-700">Log Fasting Day</Button>
      </div>
    </div>
  )
}
