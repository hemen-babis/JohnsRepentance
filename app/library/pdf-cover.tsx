"use client"

import { useEffect, useRef, useState } from "react"

// Cached module reference — only loaded once per session
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pdfjs: any = null

async function loadPdfjs() {
  if (!pdfjs) {
    // Dynamic import keeps this out of the server bundle entirely
    const mod = await import("pdfjs-dist")
    mod.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"
    pdfjs = mod
  }
  return pdfjs
}

interface PdfCoverProps {
  pdfUrl: string
  className?: string
  onError?: () => void
}

export function PdfCover({ pdfUrl, className, onError }: PdfCoverProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle")

  // Start loading when the card scrolls near the viewport
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && status === "idle") {
          setStatus("loading")
          observer.disconnect()
        }
      },
      { rootMargin: "300px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [status])

  // Render the first page once loading is triggered
  useEffect(() => {
    if (status !== "loading") return
    let cancelled = false

    const render = async () => {
      const canvas = canvasRef.current
      if (!canvas) return
      try {
        const lib = await loadPdfjs()
        const pdf = await lib.getDocument({ url: pdfUrl, disableStream: true, disableAutoFetch: true }).promise
        if (cancelled) return
        const page = await pdf.getPage(1)
        if (cancelled) return

        const base = page.getViewport({ scale: 1 })
        // Target card dimensions (2:3 portrait ratio)
        const cardW = 280
        const cardH = Math.round(280 * 1.5)
        const scaleW = cardW / base.width
        const scaleH = cardH / base.height
        // Use the larger scale so the page covers the full card (crops slightly if needed)
        const scale = Math.max(scaleW, scaleH)
        const vp = page.getViewport({ scale })

        canvas.width = cardW
        canvas.height = cardH

        const ctx = canvas.getContext("2d")
        if (!ctx) throw new Error("no ctx")

        // Center the page horizontally if it's narrower than the card
        const offsetX = (cardW - vp.width) / 2
        const offsetY = 0
        ctx.translate(offsetX, offsetY)

        await page.render({ canvasContext: ctx, viewport: vp }).promise
        if (!cancelled) setStatus("done")
      } catch {
        if (!cancelled) {
          setStatus("error")
          onError?.()
        }
      }
    }

    render()
    return () => { cancelled = true }
  }, [status, pdfUrl, onError])

  return (
    <div ref={containerRef} className={className}>
      {status === "loading" && (
        <div className="absolute inset-0 animate-pulse bg-stone-200 dark:bg-stone-800" />
      )}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ display: status === "done" ? "block" : "none" }}
      />
    </div>
  )
}
