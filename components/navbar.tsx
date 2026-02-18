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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500 ease-out",
        scrolled
          ? "bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl shadow-[0_1px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_20px_rgba(0,0,0,0.3)]"
          : "bg-transparent",
      )}
    >
      {/* Subtle gradient line at the bottom of navbar when scrolled */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-500",
          "bg-gradient-to-r from-transparent via-orange-500/30 to-transparent",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />

      <div className="relative flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center space-x-2 group">
          <span className="whitespace-nowrap font-bold text-xl bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent transition-all duration-300 group-hover:from-orange-500 group-hover:to-amber-400">
            John&apos;s Repentance
          </span>
        </Link>

        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 xl:flex">
          <div className="glass flex items-center gap-0.5 rounded-2xl px-2 py-1 shadow-[0_12px_34px_rgba(180,83,9,0.12)]">
            {routes.map((route) => {
              const isActive = pathname === route.href
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "nav-link-underline whitespace-nowrap px-3 py-2 text-sm font-medium rounded-xl transition-all duration-300 relative",
                    "hover:bg-orange-50/80 dark:hover:bg-orange-950/40 hover:text-orange-600 dark:hover:text-orange-300",
                    isActive
                      ? "text-orange-700 dark:text-orange-300 active bg-white/80 dark:bg-stone-900/70 shadow-sm"
                      : "text-gray-700 dark:text-gray-300",
                  )}
                >
                  {route.label}
                </Link>
              )
            })}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "nav-link-underline whitespace-nowrap px-3 py-2 text-sm font-medium rounded-xl transition-all duration-300 relative inline-flex items-center gap-1",
                  "hover:bg-orange-50/80 dark:hover:bg-orange-950/40 hover:text-orange-600 dark:hover:text-orange-300",
                  isResourceActive
                    ? "text-orange-700 dark:text-orange-300 active bg-white/80 dark:bg-stone-900/70 shadow-sm"
                    : "text-gray-700 dark:text-gray-300",
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

        <div className="hidden xl:flex items-center gap-3">
          <AccountMenu />
          <Link href="/contact">
            <Button className="whitespace-nowrap bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:-translate-y-0.5">
              Contact Us
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all duration-300 hover:rotate-12"
          >
            {mounted && currentTheme === "dark" ? (
              <Sun className="h-5 w-5 text-amber-400 transition-transform duration-300" />
            ) : (
              <Moon className="h-5 w-5 transition-transform duration-300" />
            )}
          </Button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="xl:hidden">
            <Button variant="outline" size="icon" className="ml-auto mr-2 hover:border-orange-300 transition-colors duration-300">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 border-r-orange-200/50 dark:border-r-orange-900/30">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                  John&apos;s Repentance
                </span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform duration-300">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col gap-1">
              {routes.map((route) => {
                const isActive = pathname === route.href
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center justify-between py-3 px-3 rounded-lg transition-all duration-300",
                      "hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 hover:pl-4",
                      isActive
                        ? "text-orange-600 bg-orange-50/80 dark:bg-orange-950/20 dark:text-orange-400 font-medium"
                        : "text-foreground/70",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {route.label}
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-all duration-300 opacity-0",
                        "group-hover:opacity-100",
                        isActive ? "opacity-60 text-orange-500" : "",
                      )}
                    />
                  </Link>
                )
              })}
              <div className="pt-3 px-3 text-xs uppercase tracking-wide text-muted-foreground">Resources</div>
              {resourceRoutes.map((route) => {
                const isActive = pathname === route.href
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center justify-between py-3 px-3 rounded-lg transition-all duration-300",
                      "hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 hover:pl-4",
                      isActive
                        ? "text-orange-600 bg-orange-50/80 dark:bg-orange-950/20 dark:text-orange-400 font-medium"
                        : "text-foreground/70",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {route.label}
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-all duration-300 opacity-0",
                        "group-hover:opacity-100",
                        isActive ? "opacity-60 text-orange-500" : "",
                      )}
                    />
                  </Link>
                )
              })}
              <div className="mt-4 pt-4 border-t border-orange-100 dark:border-orange-900/30">
                <div className="mb-3">
                  <AccountMenu />
                </div>
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white shadow-md shadow-orange-500/20">
                    Contact Us
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-orange-100 dark:border-orange-900/30">
                <span className="text-sm text-muted-foreground">Toggle theme</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="rounded-full hover:bg-orange-50 dark:hover:bg-orange-950/30"
                >
                  {mounted && currentTheme === "dark" ? (
                    <Sun className="h-5 w-5 text-amber-400" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
