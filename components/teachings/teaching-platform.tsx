"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { BookOpen, Bookmark, CheckCircle2, ChevronLeft, ChevronRight, Clock, FileText, Headphones, Library, Search, Sparkles, Video } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { LearningPath, Teaching } from "@/lib/teaching-platform"

const navItems = [
  { href: "/teachings", label: "Discover", mobile: "Discover" },
  { href: "/teachings/paths", label: "Learning Paths", mobile: "Paths" },
  { href: "/teachings/all", label: "Browse All", mobile: "Browse" },
  { href: "/teachings/saved", label: "Saved", mobile: "Saved" },
  { href: "/teachings/my-learning", label: "My Learning", mobile: "Learning", desktopOnly: true },
]

export function TeachingsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="light-mode-adaptive-page min-h-screen bg-[#f8f2e7] text-[#271915] dark:bg-[#120d09]">
      <nav className="sticky top-16 z-40 border-b border-[#e6d4b9] bg-[#fffaf0]/95 backdrop-blur-xl dark:border-orange-900/30 dark:bg-[#17100c]/92">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition",
                  item.desktopOnly && "hidden sm:inline-flex",
                  active
                    ? "bg-[#7f1d1d] text-[#fff7e6] shadow-sm"
                    : "text-stone-700 hover:bg-white hover:text-[#7f1d1d] dark:text-stone-300 dark:hover:bg-white/10",
                )}
              >
                <span aria-hidden="true" className="hidden sm:inline">{item.label}</span>
                <span aria-hidden="true" className="sm:hidden">{item.mobile}</span>
              </Link>
            )
          })}
        </div>
      </nav>
      {children}
    </div>
  )
}

export function SeasonalHero() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-8">
      <div className="relative min-h-[430px] overflow-hidden rounded-lg bg-[#33120f] shadow-[0_30px_90px_-55px_rgba(62,20,14,0.7)]">
        <Image src="/images/home-hero.png" alt="Ethiopian Orthodox church worship setting" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(63,10,16,0.92)_0%,rgba(89,25,19,0.74)_42%,rgba(89,25,19,0.12)_100%)]" />
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-10" />
        <div className="relative flex min-h-[430px] max-w-3xl flex-col justify-center px-5 py-12 sm:px-10 lg:px-14">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#d9b461]">Current Church Season</p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight text-[#fff8e8] sm:text-5xl">Great Lent</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#f5e5c9] sm:text-lg">
            Walk through a guided collection of teachings on fasting, repentance, prayer, mercy, Scripture, and spiritual renewal.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild className="rounded-full bg-[#d6ad4b] text-[#2a130d] hover:bg-[#e4c46e]">
              <Link href="/teachings/path/repentance-and-confession">Begin the Journey</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-[#f5e5c9]/60 bg-white/10 text-[#fff8e8] hover:bg-white/18">
              <Link href="/teachings/category/great-lent">Explore Great Lent</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm font-medium text-[#ead39c]">Week 4 of 8</p>
        </div>
      </div>
    </section>
  )
}

const formatIcons = {
  Video,
  Audio: Headphones,
  "PDF Guide": FileText,
  Series: Library,
  "Q&A": Search,
  Article: BookOpen,
}

export function TeachingCard({ teaching, compact = false }: { teaching: Teaching; compact?: boolean }) {
  const Icon = formatIcons[teaching.format] ?? BookOpen

  return (
    <Link href={teaching.href} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-lg border border-[#e2d0b5] bg-[#fffaf0] shadow-[0_18px_42px_-34px_rgba(87,38,12,0.55)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-32px_rgba(87,38,12,0.65)] dark:border-orange-900/28 dark:bg-[#211710]">
        <div className={cn("relative overflow-hidden", compact ? "h-28" : "h-40")}>
          <Image src={teaching.image} alt="" fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/8 to-transparent" />
          <Badge className="absolute left-3 top-3 bg-[#7f1d1d] text-[#fff7e6]">{teaching.level}</Badge>
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/46 px-2.5 py-1 text-xs font-medium text-white">
            <Icon className="h-3.5 w-3.5" />
            {teaching.format}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="mb-2 flex items-center justify-between gap-3 text-xs font-medium text-[#8a5d1f] dark:text-amber-300">
            <span>{teaching.subcategory}</span>
            <span className="inline-flex items-center gap-1 text-stone-500 dark:text-stone-400">
              <Clock className="h-3.5 w-3.5" />
              {teaching.duration}
            </span>
          </div>
          <h3 className="text-lg font-bold leading-snug text-stone-950 dark:text-white">{teaching.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-stone-600 dark:text-stone-300">{teaching.description}</p>
          {typeof teaching.progress === "number" && (
            <div className="mt-4">
              <div className="mb-1 flex justify-between text-xs text-stone-500 dark:text-stone-400">
                <span>{teaching.lessonIndex ?? "In progress"}</span>
                <span>{teaching.progress}%</span>
              </div>
              <Progress value={teaching.progress} className="h-1.5 bg-[#eadbc2]" />
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}

export function SectionHeader({ title, eyebrow, href }: { title: string; eyebrow?: string; href?: string }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-[#8a5d1f] dark:text-amber-300">{eyebrow}</p>}
        <h2 className="text-2xl font-bold text-stone-950 dark:text-white">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="shrink-0 text-sm font-semibold text-[#7f1d1d] hover:underline dark:text-amber-300">
          View All
        </Link>
      )}
    </div>
  )
}

export function TeachingRow({ title, teachings, href, media = false }: { title: string; teachings: Teaching[]; href?: string; media?: boolean }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <SectionHeader title={title} href={href} eyebrow={media ? "Watch and Listen" : undefined} />
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {teachings.slice(0, 8).map((teaching) => (
            <div key={teaching.id} className="w-[280px] shrink-0">
              <TeachingCard teaching={teaching} compact />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-20 bg-gradient-to-l from-[#f8f2e7] to-transparent lg:block dark:from-[#120d09]" />
        <div className="mt-3 hidden justify-end gap-2 lg:flex">
          <Button variant="outline" size="icon" className="rounded-full" aria-label="Previous teachings">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" aria-label="Next teachings">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export function PathCard({ path }: { path: LearningPath }) {
  return (
    <Link href={`/teachings/path/${path.slug}`} className="group block h-full">
      <article className="h-full overflow-hidden rounded-lg border border-[#e2d0b5] bg-[#fffaf0] dark:border-orange-900/28 dark:bg-[#211710]">
        <div className="relative h-44">
          <Image src={path.image} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
          <Badge className="absolute left-3 top-3 bg-[#7f1d1d]">{path.level}</Badge>
        </div>
        <div className="p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a5d1f] dark:text-amber-300">{path.group}</p>
          <h3 className="mt-2 text-xl font-bold text-stone-950 dark:text-white">{path.title}</h3>
          <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">{path.description}</p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-stone-600 dark:text-stone-300">
            <span>{path.units} units</span>
            <span>{path.lessons} lessons</span>
            <span>{path.duration}</span>
          </div>
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs text-stone-500">
              <span>{path.progress > 0 ? "In progress" : "Not started"}</span>
              <span>{path.progress}%</span>
            </div>
            <Progress value={path.progress} className="h-1.5 bg-[#eadbc2]" />
          </div>
          <Button className="mt-5 w-full rounded-full bg-[#7f1d1d] text-[#fff7e6] hover:bg-[#991b1b]">
            {path.progress > 0 ? "Continue" : "Start Path"}
          </Button>
        </div>
      </article>
    </Link>
  )
}

export function NewsletterBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-6 rounded-lg border border-[#e2d0b5] bg-[#fffaf0] p-6 md:grid-cols-[1fr_auto] md:items-center dark:border-orange-900/28 dark:bg-[#211710]">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8a5d1f] dark:text-amber-300">
            <Sparkles className="h-4 w-4" />
            Continue Your Spiritual Journey
          </p>
          <h2 className="text-2xl font-bold text-stone-950 dark:text-white">Receive one carefully selected teaching each week.</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">Includes a feast reminder and short spiritual reflection.</p>
        </div>
        <form className="flex min-w-0 flex-col gap-3 sm:w-[420px] sm:flex-row">
          <input className="h-11 min-w-0 flex-1 rounded-full border border-[#d9c7aa] bg-white px-4 text-sm outline-none focus:border-[#7f1d1d] dark:bg-black/20" placeholder="Email address" type="email" />
          <Button className="rounded-full bg-[#7f1d1d] text-[#fff7e6] hover:bg-[#991b1b]">Subscribe</Button>
        </form>
      </div>
    </section>
  )
}

export function EmptyLearningState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-dashed border-[#d8c59f] bg-[#fffaf0]/70 p-8 text-center dark:border-orange-900/30 dark:bg-white/5">
      <Bookmark className="mx-auto h-8 w-8 text-[#8a5d1f]" />
      <h2 className="mt-3 text-xl font-bold text-stone-950 dark:text-white">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-stone-600 dark:text-stone-300">{description}</p>
    </div>
  )
}

export function CompletionNote() {
  return (
    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-100">
      <span className="inline-flex items-center gap-2 font-semibold">
        <CheckCircle2 className="h-4 w-4" />
        Lesson completed
      </span>
      <p className="mt-1">May this teaching bear fruit in your spiritual life.</p>
    </div>
  )
}
