"use client"

import { Button } from "@/components/ui/button"
import { TextIcon as Telegram, Instagram, TwitterIcon as TikTok, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SocialShareProps {
  title?: string
  url?: string
  className?: string
}

export function SocialShare({ title = "John's Repentance - EOTC", url, className = "" }: SocialShareProps) {
  const { toast } = useToast()
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "")

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title,
          url: shareUrl,
        })
        .catch((err) => {
          console.error("Error sharing:", err)
        })
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(shareUrl)
      toast({
        title: "Copied to clipboard",
        description: "Link has been copied to your clipboard.",
      })
    }
  }

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        asChild
        className="rounded-full border-gray-800 text-gray-400 hover:text-amber-500 hover:border-amber-500 hover:bg-transparent"
      >
        <a
          href="https://t.me/+DCbv9KRTroY0NmJh"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Telegram"
        >
          <Telegram className="h-4 w-4" />
        </a>
      </Button>
      <Button
        variant="outline"
        size="icon"
        asChild
        className="rounded-full border-gray-800 text-gray-400 hover:text-amber-500 hover:border-amber-500 hover:bg-transparent"
      >
        <a
          href="https://www.instagram.com/johnsrepentance.orthodox.qna/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Instagram"
        >
          <Instagram className="h-4 w-4" />
        </a>
      </Button>
      <Button
        variant="outline"
        size="icon"
        asChild
        className="rounded-full border-gray-800 text-gray-400 hover:text-amber-500 hover:border-amber-500 hover:bg-transparent"
      >
        <a
          href="https://www.tiktok.com/@orthodoxqnas"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on TikTok"
        >
          <TikTok className="h-4 w-4" />
        </a>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleShare}
        className="rounded-full border-gray-800 text-gray-400 hover:text-amber-500 hover:border-amber-500 hover:bg-transparent"
        aria-label="Share"
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
