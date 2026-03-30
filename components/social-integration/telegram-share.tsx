"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { QRCode } from "@/components/ui/qr-code"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Share2, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TelegramShareProps {
  title: string
  text: string
  url?: string
  channelUsername?: string
  showQR?: boolean
  variant?: "default" | "outline" | "secondary" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function TelegramShare({
  title,
  text,
  url = window.location.href,
  channelUsername = "ethiopianorthodox",
  showQR = false,
  variant = "default",
  size = "default",
  className,
}: TelegramShareProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  // Generate Telegram share URL
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`${title}\n\n${text}`)}`

  // Generate Telegram channel URL
  const telegramChannelUrl = `https://t.me/${channelUsername}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(telegramChannelUrl)
    setCopied(true)

    toast({
      title: "Link copied",
      description: "Telegram channel link copied to clipboard",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = () => {
    window.open(telegramShareUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Share to Telegram
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share to Telegram</DialogTitle>
          <DialogDescription>Share this content or join our Telegram community</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4">
            {showQR && (
              <div className="p-2 border rounded-lg bg-white">
                <QRCode value={telegramChannelUrl} size={200} />
              </div>
            )}

            <div className="flex items-center gap-2">
              <Badge className="bg-orange-600">
                <MessageSquare className="h-3 w-3 mr-1" />
                Official Channel
              </Badge>
              <span className="text-sm font-medium">@{channelUsername}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <Button variant="outline" className="flex-1" onClick={handleCopyLink}>
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                Copy Link
              </Button>

              <Button className="flex-1 bg-orange-600 hover:bg-orange-700" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share Content
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg text-sm text-gray-600 dark:text-gray-300">
          <p>Join our Telegram community for daily prayers, verses, and spiritual discussions!</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
