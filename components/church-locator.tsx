"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Search, Navigation, ExternalLink } from "lucide-react"

// Sample church data
const churches = [
  {
    id: 1,
    name: "St. Mary Ethiopian Orthodox Church",
    address: "123 Main Street, Washington DC",
    distance: "2.3 miles",
    services: ["Sunday Divine Liturgy: 8:00 AM", "Saturday Evening Prayer: 6:00 PM"],
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 2,
    name: "Debre Selam Kidist Mariam Church",
    address: "456 Church Avenue, Silver Spring, MD",
    distance: "5.7 miles",
    services: ["Sunday Divine Liturgy: 7:30 AM", "Wednesday Prayer: 7:00 PM"],
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 3,
    name: "St. Michael Ethiopian Orthodox Church",
    address: "789 Orthodox Way, Alexandria, VA",
    distance: "8.2 miles",
    services: ["Sunday Divine Liturgy: 8:30 AM", "Friday Evening Prayer: 7:00 PM"],
    image: "/placeholder.svg?height=100&width=200",
  },
]

export function ChurchLocator() {
  const [searchQuery, setSearchQuery] = useState("")
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser")
      return
    }

    setIsLoading(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation(position)
        setIsLoading(false)
      },
      (error) => {
        console.error("Error getting location:", error)
        setIsLoading(false)
        alert("Unable to retrieve your location. Please enter your location manually.")
      },
    )
  }

  const filteredChurches = churches.filter(
    (church) =>
      church.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      church.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="border-none shadow-lg overflow-hidden bg-white dark:bg-gray-900">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search by city, zip code, or church name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <Button
              variant="outline"
              onClick={getLocation}
              disabled={isLoading}
              className="border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-500"
            >
              <MapPin className="h-4 w-4 mr-2" />
              {isLoading ? "Locating..." : "Near Me"}
            </Button>
          </div>

          <div className="space-y-4">
            {filteredChurches.length > 0 ? (
              filteredChurches.map((church) => (
                <div
                  key={church.id}
                  className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden flex flex-col md:flex-row"
                >
                  <div className="relative h-40 md:h-auto md:w-1/3">
                    <img
                      src={church.image || "/placeholder.svg"}
                      alt={church.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{church.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                          {church.address}
                        </p>
                      </div>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full">
                        {church.distance}
                      </span>
                    </div>

                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Service Times:</h4>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {church.services.map((service, index) => (
                          <li key={index} className="mb-1">
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-500"
                      >
                        <Navigation className="h-3 w-3 mr-1" />
                        Directions
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-500"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Website
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No churches found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or location</p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white">
              View All Churches
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
