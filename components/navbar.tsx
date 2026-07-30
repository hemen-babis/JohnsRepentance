"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  Moon,
  Sun,
  ChevronRight,
  ChevronDown,
  Home,
  BookOpen,
  Church,
  Heart,
  MessageCircleQuestion,
  Sparkles,
  Music2,
  Library,
  Info,
  Utensils,
  CalendarDays,
  HandHeart,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { AccountMenu } from "@/components/account-menu"

const routes = [
  { href: "/", label: "Home", icon: Home },
  { href: "/teachings", label: "Teachings", icon: BookOpen },
  { href: "/catechumen", label: "Catechumen Corner", icon: Church },
  { href: "/repentance", label: "Repentance", icon: Heart },
  { href: "/holy-communion", label: "Holy Communion", icon: null },
  { href: "/qa", label: "Q&A", icon: MessageCircleQuestion },
  { href: "/youth-corner", label: "Youth Corner", icon: Sparkles },
  { href: "/deacons", label: "Deacon's Corner", icon: Music2 },
]

const resourceRoutes = [
  { href: "/library", label: "Library", icon: Library },
  { href: "/about", label: "About Us", icon: Info },
  { href: "/fasting-guide", label: "Fasting Guide", icon: Utensils },
  { href: "/calendar-events", label: "Calendar + Events", icon: CalendarDays },
  { href: "/volunteers-registration", label: "Volunteers Registration", icon: HandHeart },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const hideForImmersiveReader = pathname?.startsWith("/youth-corner/plans/")

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = resolvedTheme ?? theme
  const isResourceActive = resourceRoutes.some((route) => route.href === pathname)

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark")
  }

  if (hideForImmersiveReader) {
    return null
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "backdrop-blur-xl bg-white dark:bg-[rgba(18,12,9,0.72)] border-b border-orange-200/60 dark:border-[rgba(251,146,60,0.14)] shadow-[0_12px_40px_-24px_rgba(249,115,22,0.12)] dark:shadow-[0_18px_40px_-28px_rgba(0,0,0,0.8)]"
          : "bg-white border-b border-orange-100/80 shadow-[0_8px_28px_-24px_rgba(249,115,22,0.08)] dark:bg-transparent dark:border-transparent dark:shadow-none",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1920px] items-center justify-between gap-3 px-4 sm:px-5 lg:px-6">
        <Link href="/" className="flex flex-none items-center gap-2 rounded-full border border-amber-200/70 bg-white/72 px-2.5 py-1.5 shadow-[0_10px_28px_-22px_rgba(120,53,15,0.65)] backdrop-blur-md dark:border-orange-900/35 dark:bg-stone-950/45 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none lg:backdrop-blur-0">
          <span className="relative h-9 w-9 overflow-hidden rounded-full border border-amber-200/80 bg-amber-50 shadow-sm lg:hidden">
            <img src="/images/logo.png" alt="" className="h-full w-full object-contain p-1" />
          </span>
          <span className="block whitespace-nowrap text-base font-extrabold tracking-tight bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent sm:text-lg lg:text-2xl">
            John&apos;s Repentance
          </span>
        </Link>

        <nav className="hidden lg:flex flex-1 min-w-0 justify-center">
          <div className="flex items-center rounded-full border border-orange-200/70 bg-white px-2 py-1 shadow-[0_12px_30px_rgba(249,115,22,0.12)] dark:border-[rgba(251,146,60,0.16)] dark:bg-[linear-gradient(135deg,rgba(34,23,17,0.86),rgba(21,15,12,0.72))] dark:shadow-[0_18px_38px_-28px_rgba(0,0,0,0.75)]">
            {routes.map((route) => {
              const isActive = pathname === route.href
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "rounded-full px-2.5 xl:px-3 py-2 text-sm font-medium transition-all whitespace-nowrap",
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow"
                      : "text-stone-700 hover:bg-orange-50 hover:text-orange-700 dark:text-stone-300 dark:hover:bg-[rgba(120,53,15,0.34)] dark:hover:text-amber-200",
                  )}
                >
                  {route.label}
                </Link>
              )
            })}

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-all",
                  isResourceActive
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow"
                    : "text-stone-700 hover:bg-orange-50 hover:text-orange-700 dark:text-stone-300 dark:hover:bg-[rgba(120,53,15,0.34)] dark:hover:text-amber-200",
                )}
              >
                Resources
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                {resourceRoutes.map((route) => (
                  <DropdownMenuItem key={route.href} asChild>
                    <Link href={route.href}>{route.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>

        <div className="hidden lg:flex flex-none items-center gap-2">
          <div className="hidden 2xl:block">
            <AccountMenu />
          </div>
          <Link href="/contact">
            <Button className="rounded-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white">
              Contact Us
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full hover:bg-orange-100 dark:hover:bg-[rgba(120,53,15,0.34)]"
          >
            {mounted && currentTheme === "dark" ? (
              <Sun className="h-5 w-5 text-amber-400" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 shrink-0 rounded-2xl border border-orange-300/75 bg-white/82 text-orange-800 shadow-[0_14px_30px_-20px_rgba(120,53,15,0.75)] backdrop-blur-md hover:bg-orange-50 dark:border-orange-900/40 dark:bg-stone-900/70 dark:text-amber-100 dark:hover:bg-orange-950/30"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[92vw] max-w-[390px] border-l-orange-200/70 bg-transparent p-0 shadow-[0_0_80px_-36px_rgba(120,53,15,0.7)] dark:border-l-orange-900/35 [&>button]:right-4 [&>button]:top-5 [&>button]:z-20 [&>button]:h-10 [&>button]:w-10 [&>button]:rounded-2xl [&>button]:bg-white/55 [&>button]:text-stone-700 [&>button]:opacity-100 [&>button]:backdrop-blur [&>button]:hover:bg-orange-50 dark:[&>button]:bg-white/5 dark:[&>button]:text-stone-200 dark:[&>button]:hover:bg-orange-950/30 [&>button_svg]:h-5 [&>button_svg]:w-5">
            <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-[linear-gradient(180deg,rgba(255,253,248,0.96)_0%,rgba(255,244,232,0.96)_100%)] backdrop-blur-2xl dark:bg-[linear-gradient(180deg,rgba(18,13,9,0.97)_0%,rgba(28,18,12,0.97)_100%)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.34),transparent_68%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.035] dark:opacity-[0.025]" />

              <div className="relative border-b border-orange-200/60 px-4 pb-4 pt-5 dark:border-orange-900/30">
                <div className="flex items-start justify-between gap-3 pr-12">
                  <Link href="/" onClick={() => setIsOpen(false)} className="min-w-0">
                    <span className="block text-xl font-black leading-tight tracking-tight bg-gradient-to-r from-orange-700 via-amber-600 to-orange-500 bg-clip-text text-transparent dark:from-amber-200 dark:via-orange-300 dark:to-amber-400">
                      John&apos;s Repentance
                    </span>
                    <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-700/60 dark:text-amber-300/50">
                      Ethiopian Orthodox
                    </span>
                  </Link>
                </div>

                <div className="mt-4 rounded-2xl border border-amber-200/70 bg-white/58 p-2 shadow-[0_16px_40px_-30px_rgba(120,53,15,0.55)] dark:border-orange-900/30 dark:bg-stone-950/35">
                  <div className="flex items-center justify-between gap-3">
                    <span className="pl-2 text-xs font-semibold text-stone-600 dark:text-stone-300">Menu</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleTheme}
                      aria-label="Toggle theme"
                      className="h-9 w-9 rounded-xl bg-amber-50 text-orange-800 hover:bg-amber-100 dark:bg-orange-950/40 dark:text-amber-200 dark:hover:bg-orange-950/60"
                    >
                      {mounted && currentTheme === "dark" ? (
                        <Sun className="h-4 w-4 text-amber-300" />
                      ) : (
                        <Moon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="relative min-h-0 flex-1 overflow-y-auto px-3 py-4">
                <nav className="space-y-5">
                  <div className="grid grid-cols-2 gap-2.5">
                    {routes.map((route) => {
                      const isActive = pathname === route.href
                      const Icon = route.icon
                      return (
                        <Link
                          key={route.href}
                          href={route.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "group relative min-h-24 overflow-hidden rounded-2xl border p-3 transition-all",
                            isActive
                              ? "border-orange-400/70 bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-[0_18px_40px_-24px_rgba(234,88,12,0.85)]"
                              : "border-amber-200/65 bg-white/62 text-stone-800 shadow-[0_12px_30px_-26px_rgba(120,53,15,0.42)] hover:border-orange-300 hover:bg-orange-50/80 dark:border-orange-900/30 dark:bg-stone-950/34 dark:text-stone-200 dark:hover:bg-orange-950/28",
                          )}
                        >
                          {Icon ? (
                            <span
                              className={cn(
                                "mb-3 flex h-9 w-9 items-center justify-center rounded-xl",
                                isActive
                                  ? "bg-white/18 text-white"
                                  : "bg-amber-100/75 text-orange-800 dark:bg-orange-950/50 dark:text-amber-200",
                              )}
                            >
                              <Icon className="h-4.5 w-4.5" />
                            </span>
                          ) : (
                            <span className="mb-3 block h-9" aria-hidden="true" />
                          )}
                          <span className="block text-sm font-extrabold leading-tight">{route.label}</span>
                          <ChevronRight
                            className={cn(
                              "absolute right-3 top-3 h-4 w-4 transition-transform group-hover:translate-x-0.5",
                              isActive ? "text-white/80" : "text-orange-700/45 dark:text-amber-200/45",
                            )}
                          />
                        </Link>
                      )
                    })}
                  </div>

                  <div>
                    <p className="px-2 pb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">Resources</p>
                    <div className="space-y-2">
                      {resourceRoutes.map((route) => {
                        const isActive = pathname === route.href
                        const Icon = route.icon
                        return (
                          <Link
                            key={route.href}
                            href={route.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "flex items-center justify-between rounded-2xl border px-3 py-3 text-sm font-semibold transition-all",
                              isActive
                                ? "border-orange-400/70 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_16px_36px_-24px_rgba(234,88,12,0.8)]"
                                : "border-amber-200/60 bg-white/58 text-stone-800 hover:border-orange-300 hover:bg-orange-50/80 dark:border-orange-900/30 dark:bg-stone-950/30 dark:text-stone-200 dark:hover:bg-orange-950/28",
                            )}
                          >
                            <span className="flex min-w-0 items-center gap-3">
                              <span
                                className={cn(
                                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                                  isActive
                                    ? "bg-white/18 text-white"
                                    : "bg-amber-100/70 text-orange-800 dark:bg-orange-950/50 dark:text-amber-200",
                                )}
                              >
                                <Icon className="h-4 w-4" />
                              </span>
                              <span className="truncate">{route.label}</span>
                            </span>
                            <ChevronRight className={cn("h-4 w-4 shrink-0", isActive ? "text-white/80" : "text-orange-700/45 dark:text-amber-200/45")} />
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </nav>
              </div>

              <div className="relative shrink-0 space-y-3 border-t border-orange-200/60 bg-white/42 px-4 pb-5 pt-4 backdrop-blur-xl dark:border-orange-900/30 dark:bg-stone-950/24">
                <div className="w-full">
                  <AccountMenu embedded />
                </div>
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <Button className="h-12 w-full rounded-2xl bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 font-bold text-white shadow-[0_18px_42px_-24px_rgba(234,88,12,0.95)] hover:from-orange-500 hover:via-amber-400 hover:to-orange-500">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
