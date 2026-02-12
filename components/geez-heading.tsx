import type React from "react"
import { cn } from "@/lib/utils"

interface GeezHeadingProps {
  children: React.ReactNode
  className?: string
}

export function GeezHeading({ children, className }: GeezHeadingProps) {
  return <h3 className={cn("font-geez tracking-wider", className)}>{children}</h3>
}
