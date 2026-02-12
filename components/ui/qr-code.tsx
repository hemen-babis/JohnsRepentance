"use client"

import { useEffect, useRef } from "react"

interface QRCodeProps {
  value: string
  size?: number
  bgColor?: string
  fgColor?: string
  level?: "L" | "M" | "Q" | "H"
  includeMargin?: boolean
}

export function QRCode({
  value,
  size = 128,
  bgColor = "#ffffff",
  fgColor = "#000000",
  level = "L",
  includeMargin = false,
}: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // In a real implementation, we would use a QR code library
    // For this example, we'll create a simple placeholder
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, size, size)

    // Draw a fake QR code pattern
    ctx.fillStyle = fgColor

    // Draw positioning squares
    ctx.fillRect(10, 10, 20, 20)
    ctx.fillRect(size - 30, 10, 20, 20)
    ctx.fillRect(10, size - 30, 20, 20)

    // Draw some random squares to simulate QR code
    const blockSize = 5
    const margin = includeMargin ? 10 : 0
    const innerSize = size - 2 * margin

    // Use the value string to generate a deterministic pattern
    const hash = Array.from(value).reduce((acc, char) => {
      return (acc * 31 + char.charCodeAt(0)) & 0xffffffff
    }, 0)

    for (let i = 0; i < 100; i++) {
      const x = margin + (((hash * (i + 1)) % innerSize) & ~(blockSize - 1))
      const y = margin + (((hash * (i + 2)) % innerSize) & ~(blockSize - 1))

      if (
        // Avoid drawing over positioning squares
        !((x < 40 && y < 40) || (x > size - 50 && y < 40) || (x < 40 && y > size - 50))
      ) {
        ctx.fillRect(x, y, blockSize, blockSize)
      }
    }

    // Draw a fake data pattern
    for (let i = 0; i < innerSize / blockSize / 2; i++) {
      const x = margin + i * blockSize * 2
      const y = margin + innerSize / 2
      ctx.fillRect(x, y, blockSize, blockSize)
    }
  }, [value, size, bgColor, fgColor, level, includeMargin])

  return <canvas ref={canvasRef} width={size} height={size} style={{ width: size, height: size }} />
}
