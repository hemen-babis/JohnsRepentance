import type React from "react"
import { cn } from "@/lib/utils"

interface GeezHeadingProps {
  children: React.ReactNode
  className?: string
}

export function GeezHeading({ children, className }: GeezHeadingProps) {
  return <h3 className={cn("font-serif text-lg md:text-xl tracking-wider", className)}>{children}</h3>
}
