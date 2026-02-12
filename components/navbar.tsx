"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

const routes = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/teachings", label: "Teachings" },
  { href: "/catechumen", label: "Catechumen Corner" },
  { href: "/repentance", label: "Repentance" },
  { href: "/holy-communion", label: "Holy Communion" },
  { href: "/qa", label: "Q&A" },
  { href: "/youth", label: "Youth Corner" },
  { href: "/deacons", label: "Deacon's Corner" },
  { href: "/gallery", label: "Gallery" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = resolvedTheme ?? theme

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark")
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-md" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="whitespace-nowrap font-bold text-xl bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
            John&apos;s Repentance
          </span>
        </Link>

        <nav className="hidden xl:flex flex-1 items-center justify-center">
          <div className="flex items-center gap-1">
            {routes.map((route) => (
              <div
                key={route.href}
                className="relative"
                onMouseEnter={() => setActiveDropdown(route.href)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={route.href}
                  className={cn(
                    "whitespace-nowrap px-2 py-2 text-sm font-medium rounded-md transition-colors relative",
                    "hover:bg-gray-100 dark:hover:bg-stone-800 hover:text-orange-600",
                    route.href === activeDropdown && "text-orange-600",
                  )}
                >
                  {route.label}
                </Link>
              </div>
            ))}
          </div>
        </nav>
        <div className="hidden xl:flex items-center gap-2">
          <Link href="/contact">
            <Button
              variant="default"
              className="whitespace-nowrap bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white"
            >
              Contact Us
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {mounted && currentTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="xl:hidden">
            <Button variant="outline" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                  John&apos;s Repentance
                </span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col gap-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="text-foreground/70 transition-colors hover:text-orange-600 py-2 border-b border-gray-100 dark:border-stone-800"
                  onClick={() => setIsOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <Button
                  variant="default"
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white mt-4"
                >
                  Contact Us
                </Button>
              </Link>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-stone-800">
                <span className="text-sm">Toggle theme</span>
                <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                  {mounted && currentTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
