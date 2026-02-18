import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Heart, Calendar, BookOpen, MessageCircle, ArrowRight, ChevronDown, Phone, Mail, MessageSquare } from "lucide-react"
import { DailyVerse } from "@/components/daily-verse"
import { LivePrayerCountdown } from "@/components/live-prayer-countdown"
import { YouthTestimony } from "@/components/youth-testimony"
import { SaintOfTheDay } from "@/components/saint-of-the-day"
import { GeezHeading } from "@/components/geez-heading"
import { OrthodoxChallenges } from "@/components/orthodox-challenges"
import { SoundscapeToggle } from "@/components/soundscape-toggle"
import { OrthodoxBadges } from "@/components/orthodox-badges"
import { ChurchLocator } from "@/components/church-locator"
import { TodayChurchCalendar } from "@/components/today-church-calendar"
import { FastingMealOfTheDay } from "@/components/fasting-meal-of-the-day"

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-amber-50/80 via-orange-50/30 to-amber-50/50 dark:from-stone-950 dark:via-orange-950/20 dark:to-stone-950">
      {/* Fixed elements */}
      <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2">
        <SoundscapeToggle />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[78vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/70 via-amber-900/55 to-orange-800/45 dark:from-stone-950/85 dark:via-orange-950/65 dark:to-amber-950/50 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1200&width=1800"
            alt="Ethiopian Orthodox youth in liturgy"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-10 z-5" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_top,rgba(255,255,255,0.14),transparent_60%)] z-10" />

        <div className="container mx-auto px-4 relative z-20 min-h-[78vh] flex flex-col justify-center items-center text-white">
          <div className="max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-center leading-tight tracking-tight">
              &ldquo;Repent, for the Kingdom of
              <span className="block mt-1">Heaven is Near!&rdquo;</span>
              <span className="block text-base md:text-lg mt-3 font-normal text-amber-200/80 tracking-wide">
                Matthew 3:1-2
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-10 text-center text-white/85 max-w-2xl mx-auto leading-relaxed">
              Your Ethiopian Orthodox Home Online &ndash; Faith. Repentance. Salvation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-600 hover:via-amber-700 hover:to-orange-700 text-white border border-amber-300/40 shadow-[0_8px_32px_rgba(245,158,11,0.35)] group relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(245,158,11,0.45)]"
              >
                <Link href="/join">
                  <span className="relative z-10 font-semibold">Join the Faith Vibe</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-300 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/15 backdrop-blur-sm border border-white/40 text-white hover:bg-white/25 group relative overflow-hidden shadow-[0_8px_32px_rgba(255,255,255,0.08)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <Link href="/teachings">
                  <span className="relative z-10 font-semibold">Explore Teachings</span>
                  <span className="absolute inset-0 bg-white/15 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 scroll-indicator z-20">
          <div className="flex flex-col items-center gap-1 text-white/50">
            <span className="text-xs uppercase tracking-[0.2em] font-light">Scroll</span>
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-amber-50/80 dark:from-stone-950 to-transparent z-20" />
      </section>

      {/* Live Features Section */}
      <section className="py-16 bg-gradient-to-b from-amber-100/40 via-orange-50/30 to-amber-50/20 dark:from-stone-950 dark:via-orange-950/20 dark:to-stone-950 relative overflow-hidden border-y border-amber-200/50 dark:border-orange-900/20">
        <div className="absolute inset-0 bg-[url('/patterns/manuscript-border.svg')] opacity-[0.04]" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white section-divider">Live Spiritual Tools</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Practical tools for prayer rhythm, scripture meditation, fasting, and the church calendar.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-8">
              <LivePrayerCountdown />
              <FastingMealOfTheDay />
            </div>
            <div className="space-y-8">
              <DailyVerse />
              <TodayChurchCalendar />
            </div>
          </div>
        </div>
      </section>

      {/* Gamification & Challenges Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-amber-100/50 dark:from-stone-950 dark:via-orange-950/40 dark:to-amber-950/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.06]" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <GeezHeading className="mb-4 text-orange-700 dark:text-amber-400">Challenges</GeezHeading>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white section-divider">Orthodox Challenges</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-6">
              Grow in your faith through daily challenges and earn spiritual rewards
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <OrthodoxChallenges />
            <OrthodoxBadges />
          </div>
        </div>
      </section>

      {/* Youth-focused Banner */}
      <section className="py-20 bg-gradient-to-r from-orange-900 via-amber-800 to-orange-900 dark:from-stone-950 dark:via-orange-950 dark:to-stone-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.08]" />
        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-10">
            <GeezHeading className="mb-4 text-amber-300/80">Youth</GeezHeading>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">This Is Your Ethiopian Orthodox Home</h2>
            <p className="text-lg max-w-2xl mx-auto text-white/80 leading-relaxed">
              Connect with other young believers and grow in your faith through our youth-focused programs and
              activities
            </p>
          </div>
          <div className="flex justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-orange-800 hover:bg-amber-50 border border-amber-200/40 group relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
            >
              <Link href="/youth-corner">
                <span className="relative z-10 font-semibold">Visit Youth Corner</span>
                <ArrowRight className="relative z-10 h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute inset-0 bg-amber-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimony and Saint of the Day */}
      <section className="py-20 bg-gradient-to-b from-amber-50/50 via-orange-50/30 to-amber-50/40 dark:from-stone-950 dark:via-orange-950/20 dark:to-stone-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/manuscript-border.svg')] opacity-[0.06]" />
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center text-orange-700 dark:text-orange-400">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/40 mr-3">
                  <Heart className="h-5 w-5" />
                </span>
                Featured Testimony
              </h2>
              <YouthTestimony />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center text-amber-800 dark:text-amber-500">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/40 mr-3">
                  <Calendar className="h-5 w-5" />
                </span>
                Saint of the Day
              </h2>
              <SaintOfTheDay />
            </div>
          </div>
        </div>
      </section>

      {/* Church Locator Section */}
      <section className="py-20 bg-gradient-to-b from-amber-50/60 via-orange-50/30 to-amber-50/50 dark:from-stone-950 dark:via-orange-950/30 dark:to-stone-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.05]" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <GeezHeading className="mb-4 text-orange-700 dark:text-amber-400">Church</GeezHeading>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white section-divider">Find a Church Near You</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-6">
              Locate Ethiopian Orthodox churches in your area and connect with the community
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <ChurchLocator />
          </div>
        </div>
      </section>

      {/* Catechumen Corner Teaser */}
      <section className="py-20 bg-gradient-to-b from-orange-50/60 via-amber-50/40 to-orange-50/50 dark:from-stone-950 dark:via-orange-950/30 dark:to-stone-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/manuscript-border.svg')] opacity-[0.06]" />
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <GeezHeading className="mb-4 text-orange-700 dark:text-amber-400">Path to Covenant</GeezHeading>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Catechumen Corner</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                A calm, structured path for inquirers &mdash; from curiosity to repentance to sacramental life in the
                Ethiopian Orthodox Tewahedo Church.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <Link href="/catechumen">
                  Begin the Journey
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            {/* REPLACE: Add a relevant image for Catechumen Corner */}
            {/* Place image in /public/images/catechumen.jpg */}
            <div className="bg-white/80 dark:bg-stone-900/70 border border-amber-200/40 dark:border-orange-900/30 rounded-2xl p-8 shadow-lg card-hover-lift card-inner-glow">
              <p className="text-sm uppercase tracking-[0.2em] text-orange-600/80 dark:text-amber-300/80 mb-4 font-medium">
                Learning to Live the Covenant
              </p>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-400 mt-2.5" />
                  What is a catechumen and why the Church honors this path
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-400 mt-2.5" />
                  The Five Steps of Entering the Covenant
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-400 mt-2.5" />
                  Before you visit a church: what to expect and how to prepare
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-400 mt-2.5" />
                  Prayer, checklist, and gentle next steps
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-gradient-to-b from-orange-50/50 via-amber-50/40 to-orange-50/30 dark:from-stone-950 dark:via-orange-950/25 dark:to-stone-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.05]" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <GeezHeading className="mb-4 text-orange-700 dark:text-amber-400">Quick Links</GeezHeading>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white section-divider">Essential Resources</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-6">
              Explore these resources to deepen your faith journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Link href="/holy-communion" className="group">
              <Card className="border-none shadow-lg overflow-hidden h-full card-hover-lift card-inner-glow bg-gradient-to-br from-white to-amber-50/80 dark:from-stone-900 dark:to-orange-950/50">
                <div className="h-1.5 bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-500 group-hover:h-2" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-amber-700 dark:text-amber-400">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100/80 dark:bg-amber-950/40 transition-colors duration-300 group-hover:bg-amber-200 dark:group-hover:bg-amber-950/60">
                      <Heart className="h-5 w-5" />
                    </span>
                    Holy Communion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    Learn how to prepare yourself spiritually and physically for receiving the Holy Qurban.
                  </p>
                  <div className="flex items-center text-amber-600 dark:text-amber-400 transition-all duration-300 group-hover:translate-x-2">
                    <span className="text-sm font-medium">Prepare for Qurban</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/qa" className="group">
              <Card className="border-none shadow-lg overflow-hidden h-full card-hover-lift card-inner-glow bg-gradient-to-br from-white to-orange-50/80 dark:from-stone-900 dark:to-amber-950/50">
                <div className="h-1.5 bg-gradient-to-r from-orange-500 to-amber-600 transition-all duration-500 group-hover:h-2" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-orange-700 dark:text-orange-400">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-100/80 dark:bg-orange-950/40 transition-colors duration-300 group-hover:bg-orange-200 dark:group-hover:bg-orange-950/60">
                      <MessageCircle className="h-5 w-5" />
                    </span>
                    Ask a Question
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    Submit your questions to our priests and scholars for guidance on your faith journey.
                  </p>
                  <div className="flex items-center text-orange-600 dark:text-orange-400 transition-all duration-300 group-hover:translate-x-2">
                    <span className="text-sm font-medium">Get answers</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/repentance" className="group">
              <Card className="border-none shadow-lg overflow-hidden h-full card-hover-lift card-inner-glow bg-gradient-to-br from-white to-amber-50/60 dark:from-stone-900 dark:to-orange-950/40">
                <div className="h-1.5 bg-gradient-to-r from-orange-600 to-amber-500 transition-all duration-500 group-hover:h-2" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-orange-700 dark:text-amber-400">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-100/80 dark:bg-orange-950/40 transition-colors duration-300 group-hover:bg-orange-200 dark:group-hover:bg-orange-950/60">
                      <BookOpen className="h-5 w-5" />
                    </span>
                    Repentance Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    Access confession guides and EOTC prayers to begin your journey of repentance.
                  </p>
                  <div className="flex items-center text-orange-600 dark:text-amber-400 transition-all duration-300 group-hover:translate-x-2">
                    <span className="text-sm font-medium">Start your journey</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Inline Footer (kept separate from layout footer since home has its own) */}
      <footer className="bg-gradient-to-r from-orange-900 via-amber-900 to-orange-950 dark:from-stone-950 dark:via-orange-950 dark:to-stone-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.06]" />
        <div className="container mx-auto px-4 py-12 relative">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                {/* REPLACE: Add your church logo/cross image */}
                {/* Place in /public/images/logo.png */}
                <div className="w-12 h-12 mr-3 relative">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Ethiopian Orthodox Cross"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold">Ethiopian Orthodox Tewahedo Church</h3>
              </div>
              <p className="mb-4 text-amber-100/80 leading-relaxed">
                Preserving the ancient faith and traditions of the Ethiopian Orthodox Tewahedo Church while connecting
                with the next generation of believers.
              </p>
              <p className="text-lg font-semibold italic text-amber-200/90">May the Holy Trinity guide you!</p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-amber-300">Connect With Us</h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="https://t.me/ethiopianorthodox"
                    className="footer-link text-gray-300 flex items-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4 text-orange-400/70" />
                    Telegram
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/ethiopianorthodox"
                    className="footer-link text-gray-300 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-orange-400/70" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://tiktok.com/@ethiopianorthodox"
                    className="footer-link text-gray-300 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-orange-400/70" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                    TikTok
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-amber-300">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-300">
                  <Phone className="h-4 w-4 text-orange-400/70" />
                  (123) 456-7890
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-orange-400/70" />
                  <a href="mailto:info@ethiopianorthodox.org" className="footer-link text-gray-300">
                    info@ethiopianorthodox.org
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Ethiopian Orthodox Tewahedo Church. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  )
}
