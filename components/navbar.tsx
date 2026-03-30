"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Moon, Sun, ChevronRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { AccountMenu } from "@/components/account-menu"

const routes = [
  { href: "/", label: "Home" },
  { href: "/teachings", label: "Teachings" },
  { href: "/catechumen", label: "Catechumen Corner" },
  { href: "/repentance", label: "Repentance" },
  { href: "/holy-communion", label: "Holy Communion" },
  { href: "/qa", label: "Q&A" },
  { href: "/youth", label: "Youth Corner" },
  { href: "/deacons", label: "Deacon's Corner" },
]

const resourceRoutes = [
  { href: "/about", label: "About Us" },
  { href: "/fasting-guide", label: "Fasting Guide" },
  { href: "/calendar-events", label: "Calendar + Events" },
  { href: "/volunteers-registration", label: "Volunteers Registration" },
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
      <div className="mx-auto flex h-16 w-full max-w-[1920px] items-center justify-between gap-3 px-3 sm:px-5 lg:px-6">
        <Link href="/" className="flex-none pr-2">
          <span className="block whitespace-nowrap text-base sm:text-lg lg:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
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
              className="shrink-0 rounded-xl border-orange-300 bg-white/85 hover:bg-orange-50 dark:border-orange-900/40 dark:bg-stone-900/70 dark:hover:bg-orange-950/30"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[88vw] max-w-[360px] border-l-orange-200/60 dark:border-l-orange-900/30 p-0">
            <div className="flex h-full min-h-0 flex-col bg-[linear-gradient(180deg,#fffdf8_0%,#fff4e8_100%)] dark:bg-[linear-gradient(180deg,#120d09_0%,#1a120c_100%)]">
              <div className="flex items-center justify-between px-4 py-4 border-b border-orange-200/60 dark:border-orange-900/30">
                <span className="font-extrabold tracking-tight bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                  John&apos;s Repentance
                </span>
                <Button variant="ghost" size="icon" className="rounded-lg" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto px-3 py-3">
                <nav className="space-y-1">
                  {routes.map((route) => {
                    const isActive = pathname === route.href
                    return (
                      <Link
                        key={route.href}
                        href={route.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-3 py-3.5 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                            : "text-stone-800 hover:bg-orange-100/80 dark:text-stone-300 dark:hover:bg-orange-950/30",
                        )}
                      >
                        {route.label}
                        <ChevronRight className="h-4 w-4 opacity-70" />
                      </Link>
                    )
                  })}

                  <p className="px-3 pt-4 pb-1 text-xs uppercase tracking-wide text-stone-500 dark:text-stone-400">Resources</p>
                  {resourceRoutes.map((route) => {
                    const isActive = pathname === route.href
                    return (
                      <Link
                        key={route.href}
                        href={route.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-3 py-3.5 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                            : "text-stone-800 hover:bg-orange-100/80 dark:text-stone-300 dark:hover:bg-orange-950/30",
                        )}
                      >
                        {route.label}
                        <ChevronRight className="h-4 w-4 opacity-70" />
                      </Link>
                    )
                  })}
                </nav>
              </div>

              <div className="shrink-0 px-4 pb-4 pt-3 border-t border-orange-200/60 dark:border-orange-900/30 space-y-3">
                <div className="w-full">
                  <AccountMenu embedded />
                </div>
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <Button className="w-full h-11 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white">
                    Contact Us
                  </Button>
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-stone-600 dark:text-stone-300">Theme</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    className="rounded-full hover:bg-orange-100 dark:hover:bg-orange-950/40"
                  >
                    {mounted && currentTheme === "dark" ? (
                      <Sun className="h-5 w-5 text-amber-400" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
