"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, MessageSquare, Heart, Share2 } from "lucide-react"
import Image from "next/image"

export function CommunityEngagement() {
  return (
    <Card className="border-none shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-amber-600 dark:text-amber-500" />
          Community Engagement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
                <Users className="h-5 w-5 text-amber-600 dark:text-amber-500" />
              </div>
              <div>
                <h3 className="font-medium">Active Community</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">1,245 members online</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-500"
            >
              Connect
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Recent Testimonials</h3>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <div className="flex items-start gap-3 mb-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image src="/placeholder.svg?height=40&width=40" alt="User avatar" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-medium">Dawit M.</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Posted 2 days ago</p>
                </div>
                <Badge className="ml-auto bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  New
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                "The daily prayer reminders have transformed my spiritual life. I've been able to maintain consistent
                prayer for 30 days straight!"
              </p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-amber-600 dark:hover:text-amber-500">
                    <Heart className="h-4 w-4" />
                    <span>24</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-amber-600 dark:hover:text-amber-500">
                    <MessageSquare className="h-4 w-4" />
                    <span>5</span>
                  </button>
                </div>
                <button className="flex items-center gap-1 text-gray-500 hover:text-amber-600 dark:hover:text-amber-500">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <div className="flex items-start gap-3 mb-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image src="/placeholder.svg?height=40&width=40" alt="User avatar" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-medium">Selam T.</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Posted 1 week ago</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                "The fasting tracker helped me stay committed during the Fast of the Apostles. The AI recommendations
                for scripture readings were especially helpful."
              </p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-amber-600 dark:hover:text-amber-500">
                    <Heart className="h-4 w-4" />
                    <span>42</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-amber-600 dark:hover:text-amber-500">
                    <MessageSquare className="h-4 w-4" />
                    <span>8</span>
                  </button>
                </div>
                <button className="flex items-center gap-1 text-gray-500 hover:text-amber-600 dark:hover:text-amber-500">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            View All Testimonials
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
