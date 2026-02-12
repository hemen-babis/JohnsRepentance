"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"

export function SoundscapeToggle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("/sounds/eotc-hymn.mp3")
    audioRef.current.loop = true

    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const toggleSound = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      // Play with user interaction to satisfy browser autoplay policies
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error)
      })
    }

    setIsPlaying(!isPlaying)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSound}
      className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white"
      aria-label={isPlaying ? "Mute hymn" : "Play hymn"}
    >
      {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </Button>
  )
}
