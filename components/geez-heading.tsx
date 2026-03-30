import type React from "react"

import { cn } from "@/lib/utils"

interface GeezHeadingProps {
  children: React.ReactNode
  className?: string
}

export function GeezHeading({ children, className }: GeezHeadingProps) {
  if (!children) return null

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-current/20 bg-current/5 px-3 py-1 text-sm font-semibold tracking-[0.18em]",
        className,
      )}
    >
      {children}
    </span>
  )
}
