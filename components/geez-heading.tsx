import type React from "react"

interface GeezHeadingProps {
  children: React.ReactNode
}

export function GeezHeading({ children }: GeezHeadingProps) {
  return children ? null : null
}
