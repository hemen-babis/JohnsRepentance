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
    <Card
      className={cn(
        "overflow-hidden border-none card-hover-lift card-inner-glow group",
        "bg-white/80 dark:bg-stone-900/60 shadow-md",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-amber-500/0 group-hover:from-orange-500/[0.04] group-hover:to-amber-500/[0.04] transition-all duration-500" />
      <CardHeader className="relative flex flex-row items-center gap-4 pb-2">
        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-950/50 dark:to-amber-950/50 text-orange-600 dark:text-orange-400 group-hover:from-orange-200 group-hover:to-amber-200 dark:group-hover:from-orange-950/70 dark:group-hover:to-amber-950/70 transition-all duration-300 group-hover:shadow-md group-hover:shadow-orange-200/30 dark:group-hover:shadow-orange-900/20">
          {icon}
        </div>
        <div>
          <CardTitle className="text-xl group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}
