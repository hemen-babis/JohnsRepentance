import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  className?: string
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-lg group border-none", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 group-hover:from-orange-500/10 group-hover:to-amber-500/10 transition-all duration-300" />
      <CardHeader className="relative flex flex-row items-center gap-4 pb-2">
        <div className="p-2 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 text-orange-600 group-hover:from-orange-200 group-hover:to-amber-200 transition-all duration-300">
          {icon}
        </div>
        <div>
          <CardTitle className="text-xl group-hover:text-orange-600 transition-colors duration-300">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}
