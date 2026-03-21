import Link from "next/link"
import { ArrowRight, Church, HelpCircle, MapPinned } from "lucide-react"
import { ChurchLocator } from "@/components/church-locator"
import { CatechumenRoadmap } from "@/components/catechumen/catechumen-roadmap"
import SacredHeroSection from "@/components/catechumen/sacred-hero-section"
import { Button } from "@/components/ui/button"
import { catechumenLessons } from "@/lib/catechumen-data"

const firstLesson = catechumenLessons[0]

export default function CatechumenPage() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f7efe2] via-[#f4ead9] to-[#efe4d3] dark:bg-[linear-gradient(180deg,#110b08_0%,#1a110c_24%,#22140d_58%,#130c08_100%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.045] dark:opacity-[0.03]" />
        <div className="absolute left-1/2 top-0 h-[34rem] w-[70rem] -translate-x-1/2 rounded-full bg-amber-200/35 blur-3xl" />
        <div className="absolute left-[12%] top-[22rem] h-72 w-72 rounded-full bg-orange-200/20 blur-3xl" />
        <div className="absolute right-[10%] top-[38rem] h-72 w-72 rounded-full bg-amber-300/15 blur-3xl" />
        <div className="absolute left-[8%] top-[10rem] hidden h-56 w-56 rounded-full bg-orange-500/7 blur-3xl dark:block" />
        <div className="absolute right-[10%] top-[18rem] hidden h-64 w-64 rounded-full bg-orange-400/6 blur-3xl dark:block" />
      </div>

      <SacredHeroSection />

      <CatechumenRoadmap />

      <section className="relative py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.92fr_1.08fr] items-start">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/70 bg-white/60 px-4 py-2 text-sm text-orange-800 shadow-sm dark:border-orange-500/18 dark:bg-[linear-gradient(135deg,rgba(255,173,73,0.12),rgba(120,53,15,0.08))] dark:text-amber-100">
                <Church className="h-4 w-4" />
                Need help?
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-white">Ask a question or find a church</h2>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                  <Link href="/qa">
                    Ask a Question
                    <HelpCircle className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-amber-300/80 bg-white/65 text-orange-800 dark:border-orange-500/20 dark:bg-[linear-gradient(135deg,rgba(255,173,73,0.12),rgba(120,53,15,0.08))] dark:text-amber-100"
                >
                  <Link href={`/catechumen/${firstLesson.slug}`}>Go to lesson 1</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-amber-300/80 bg-white/65 text-orange-800 dark:border-orange-500/20 dark:bg-[linear-gradient(135deg,rgba(255,173,73,0.12),rgba(120,53,15,0.08))] dark:text-amber-100"
                >
                  <Link href="#church-finder">
                    Find a church
                    <MapPinned className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div id="church-finder" className="rounded-[1.7rem] border border-white/40 bg-white/55 p-3 shadow-[0_25px_80px_-40px_rgba(120,53,15,0.4)] backdrop-blur-xl dark:border-orange-500/18 dark:bg-[linear-gradient(135deg,rgba(54,31,19,0.54),rgba(36,22,16,0.4))]">
              <ChurchLocator />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
