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
    <div className="relative overflow-hidden bg-[url('/images/parchment-bg.png?v=20260321')] bg-cover bg-center bg-repeat dark:bg-[linear-gradient(180deg,#110b08_0%,#1a110c_24%,#22140d_58%,#130c08_100%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.045] dark:opacity-[0.03]" />
        <div className="absolute left-1/2 top-0 h-[34rem] w-[70rem] -translate-x-1/2 rounded-full bg-amber-200/35 blur-3xl" />
        <div className="absolute left-[12%] top-[22rem] h-72 w-72 rounded-full bg-orange-200/20 blur-3xl" />
        <div className="absolute right-[10%] top-[38rem] h-72 w-72 rounded-full bg-amber-300/15 blur-3xl" />
        <div className="absolute left-[8%] top-[10rem] hidden h-56 w-56 rounded-full bg-orange-500/7 blur-3xl dark:block" />
        <div className="absolute right-[10%] top-[18rem] hidden h-64 w-64 rounded-full bg-orange-400/6 blur-3xl dark:block" />
      </div>

      <SacredHeroSection />

      <section className="relative py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-6 max-w-2xl text-center">
            <p className="text-[11px] uppercase tracking-[0.28em] text-orange-700/70 dark:text-amber-300/60">Come and See</p>
            <h2 className="mt-3 font-serif text-[clamp(1.7rem,3.4vw,2.7rem)] leading-[1.2] text-stone-900 dark:text-white">
              The beauty of Orthodox life is learned by entering it.
            </h2>
          </div>
          <div className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-amber-200/55 bg-[rgba(255,248,236,0.42)] p-3 shadow-[0_32px_90px_-48px_rgba(120,53,15,0.28)] backdrop-blur-md dark:border-orange-900/25 dark:bg-[rgba(44,27,18,0.44)] md:p-4">
              <div className="relative overflow-hidden rounded-[1.55rem] border border-black/8 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.38)]">
                <video
                  className="aspect-video w-full object-cover bg-black"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                >
                  <source src="/videos/beautyoforthodoxy.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CatechumenRoadmap />

      <section className="relative py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.92fr_1.08fr] items-start">
            <div className="space-y-5 rounded-[2rem] border border-white/40 bg-[linear-gradient(135deg,rgba(255,250,243,0.82),rgba(255,241,224,0.54))] p-6 shadow-[0_26px_90px_-48px_rgba(120,53,15,0.32)] backdrop-blur-xl dark:border-orange-900/20 dark:bg-[linear-gradient(135deg,rgba(54,31,19,0.54),rgba(36,22,16,0.4))]">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/70 bg-white/60 px-4 py-2 text-sm text-orange-800 shadow-sm dark:border-orange-500/18 dark:bg-[linear-gradient(135deg,rgba(255,173,73,0.12),rgba(120,53,15,0.08))] dark:text-amber-100">
                <Church className="h-4 w-4" />
                Need help?
              </div>
              <h2 className="font-serif text-3xl tracking-tight text-stone-900 dark:text-white">Ask a question or find a church</h2>
              <p className="max-w-lg text-stone-700 dark:text-stone-300">If you are curious, uncertain, or ready to take one real step, start with a question or visit a parish near you.</p>
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

            <div id="church-finder" className="rounded-[1.9rem] border border-white/40 bg-white/55 p-3 shadow-[0_25px_80px_-40px_rgba(120,53,15,0.4)] backdrop-blur-xl dark:border-orange-500/18 dark:bg-[linear-gradient(135deg,rgba(54,31,19,0.54),rgba(36,22,16,0.4))]">
              <ChurchLocator />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
