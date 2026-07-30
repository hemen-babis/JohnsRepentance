import Link from "next/link"
import { ArrowRight, BookOpen, Church, HelpCircle, MapPinned } from "lucide-react"
import { ChurchLocator } from "@/components/church-locator"
import SacredHeroSection from "@/components/catechumen/sacred-hero-section"
import { Button } from "@/components/ui/button"

export default function CatechumenPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 parchment-fixed-bg dark:bg-[linear-gradient(180deg,#110b08_0%,#1a110c_24%,#22140d_58%,#130c08_100%)]" />
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
            <h2 className="mt-3 text-[clamp(1.7rem,3.4vw,2.7rem)] font-semibold leading-[1.2] tracking-tight text-stone-900 dark:text-white">
              The beauty of Orthodox life is learned by entering it.
            </h2>
          </div>
          <div className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-amber-200/55 bg-[rgba(255,248,236,0.42)] p-3 shadow-[0_32px_90px_-48px_rgba(120,53,15,0.28)] backdrop-blur-md dark:border-orange-900/25 dark:bg-[rgba(44,27,18,0.44)] md:p-4">
              <div className="relative overflow-hidden rounded-[1.55rem] border border-black/8 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.38)]">
                <iframe
                  src="https://drive.google.com/file/d/1IPoFMYiN-ojRiXA-MKNAXLRIZ2COcJuU/preview"
                  title="The Beauty of Orthodox Life"
                  className="aspect-video w-full bg-black"
                  allow="autoplay"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{ border: "none" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[2rem] border border-white/40 bg-[linear-gradient(135deg,rgba(255,250,243,0.84),rgba(255,241,224,0.56))] p-6 shadow-[0_26px_90px_-48px_rgba(120,53,15,0.32)] backdrop-blur-xl dark:border-orange-900/20 dark:bg-[linear-gradient(135deg,rgba(54,31,19,0.54),rgba(36,22,16,0.4))]">
                <p className="text-[11px] uppercase tracking-[0.28em] text-orange-700/70 dark:text-amber-300/60">Welcome</p>
                <h2 className="mt-3 text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-[1.15] tracking-tight text-stone-900 dark:text-white">
                  Start slowly. Learn clearly. Enter the life of the Church step by step.
                </h2>
                <p className="mt-5 max-w-2xl text-stone-700 dark:text-stone-300">
                  Catechumen Corner is here to help you understand the Ethiopian Orthodox Tewahedo faith without
                  rushing you. Begin with the roadmap when you are ready to move lesson by lesson.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-[1.4rem] border border-amber-200/70 bg-white/70 p-4 dark:border-orange-900/30 dark:bg-stone-900/40">
                    <p className="font-semibold text-stone-900 dark:text-white">Learn the Church</p>
                    <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">History, doctrine, sacraments, and spiritual life in a clear order.</p>
                  </div>
                  <div className="rounded-[1.4rem] border border-amber-200/70 bg-white/70 p-4 dark:border-orange-900/30 dark:bg-stone-900/40">
                    <p className="font-semibold text-stone-900 dark:text-white">Move at a real pace</p>
                    <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">Take one lesson at a time and check your understanding as you go.</p>
                  </div>
                  <div className="rounded-[1.4rem] border border-amber-200/70 bg-white/70 p-4 dark:border-orange-900/30 dark:bg-stone-900/40">
                    <p className="font-semibold text-stone-900 dark:text-white">Ask for help</p>
                    <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">Use Q&amp;A and church-finding tools if you need guidance beyond the lessons.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/40 bg-[linear-gradient(135deg,rgba(255,250,243,0.84),rgba(255,241,224,0.56))] p-6 shadow-[0_26px_90px_-48px_rgba(120,53,15,0.32)] backdrop-blur-xl dark:border-orange-900/20 dark:bg-[linear-gradient(135deg,rgba(54,31,19,0.54),rgba(36,22,16,0.4))]">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/70 bg-white/60 px-4 py-2 text-sm text-orange-800 shadow-sm dark:border-orange-500/18 dark:bg-[linear-gradient(135deg,rgba(255,173,73,0.12),rgba(120,53,15,0.08))] dark:text-amber-100">
                  <BookOpen className="h-4 w-4" />
                  Start here
                </div>
                <h3 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 dark:text-white">Open the catechumen roadmap</h3>
                <p className="mt-3 text-stone-700 dark:text-stone-300">
                  Enter the full learning path, see all sections, track progress, and continue from the next lesson.
                </p>
                <div className="mt-6">
                  <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                    <Link href="/catechumen/roadmap">
                      Start Learning
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-6 md:py-8">
        <div className="container mx-auto px-4 pb-6 md:pb-8">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.4rem] bg-gradient-to-r from-orange-900 via-amber-800 to-orange-900 px-8 py-16 text-white shadow-[0_32px_90px_-44px_rgba(120,53,15,0.48)] dark:from-stone-950 dark:via-orange-950 dark:to-stone-950">
            <div className="relative text-center">
              <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.08]" />
              <div className="absolute top-1/2 left-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />
              <div className="relative mx-auto max-w-3xl">
                <p
                  className="text-sm font-medium uppercase tracking-[0.28em] text-amber-200/80"
                  style={{ color: "rgba(252, 211, 77, 0.8)" }}
                >
                  Catechumen Corner
                </p>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl" style={{ color: "#ffffff" }}>
                  This path is here to help you enter the life of the Church clearly.
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-lg leading-8" style={{ color: "rgba(255,255,255,0.82)" }}>
                  Learn slowly, ask honestly, and move toward the Ethiopian Orthodox Tewahedo Church with clarity,
                  reverence, and peace.
                </p>
                <div className="mt-8 flex justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-amber-50 text-orange-900 hover:bg-white shadow-[0_16px_40px_-20px_rgba(0,0,0,0.4)]"
                  >
                    <Link href="/catechumen/roadmap">
                      Visit Catechumen Roadmap
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.92fr_1.08fr] items-start">
            <div className="space-y-5 rounded-[2rem] border border-white/40 bg-[linear-gradient(135deg,rgba(255,250,243,0.82),rgba(255,241,224,0.54))] p-6 shadow-[0_26px_90px_-48px_rgba(120,53,15,0.32)] backdrop-blur-xl dark:border-orange-900/20 dark:bg-[linear-gradient(135deg,rgba(54,31,19,0.54),rgba(36,22,16,0.4))]">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/70 bg-white/60 px-4 py-2 text-sm text-orange-800 shadow-sm dark:border-orange-500/18 dark:bg-[linear-gradient(135deg,rgba(255,173,73,0.12),rgba(120,53,15,0.08))] dark:text-amber-100">
                <Church className="h-4 w-4" />
                Need help?
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-white">Ask a question or find a church</h2>
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
                  <Link href="/catechumen/roadmap">Open roadmap</Link>
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
