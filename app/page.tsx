import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Heart, Calendar, BookOpen, MessageCircle, ArrowRight } from "lucide-react"
import { DailyVerse } from "@/components/daily-verse"
import { LivePrayerCountdown } from "@/components/live-prayer-countdown"
import { YouthTestimony } from "@/components/youth-testimony"
import { SaintOfTheDay } from "@/components/saint-of-the-day"
import { GeezHeading } from "@/components/geez-heading"
import { FastingAlert } from "@/components/fasting-alert"
import { OrthodoxChallenges } from "@/components/orthodox-challenges"
import { SoundscapeToggle } from "@/components/soundscape-toggle"
import { VirtualCandle } from "@/components/virtual-candle"
import { OrthodoxBadges } from "@/components/orthodox-badges"
import { ChurchLocator } from "@/components/church-locator"

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-amber-50/80 via-orange-50/30 to-amber-50/50 dark:from-stone-950 dark:via-orange-950/20 dark:to-stone-950">
      {/* Fixed elements */}
      <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2">
        <SoundscapeToggle />
      </div>

      {/* Hero Section with Video Background */}
      <section className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/80 via-amber-900/70 to-orange-800/60 dark:from-stone-950/90 dark:via-orange-950/70 dark:to-amber-950/60 z-10" />
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/placeholder.svg?height=800&width=1200"
          >
            <source src="#" type="video/mp4" />
            {/* Fallback image */}
            <Image
              src="/placeholder.svg?height=800&width=1200"
              alt="Ethiopian Orthodox youth in liturgy"
              fill
              className="object-cover"
            />
          </video>
        </div>
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-10 z-5" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_top,rgba(255,255,255,0.18),transparent_60%)] z-10" />
        <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center items-center text-white">
          <div className="max-w-4xl text-center">
            <GeezHeading className="mb-4 text-amber-300">ንስሓ ግበሩ</GeezHeading>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
              "Repent, for the Kingdom of Heaven is Near!"
              <span className="block text-lg mt-2 font-normal">Matthew 3:1-2</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-center">
              Your Ethiopian Orthodox Home Online – Faith. Repentance. Salvation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700 hover:from-amber-500 hover:via-amber-600 hover:to-amber-800 text-white border-2 border-amber-300/80 dark:border-amber-600/80 shadow-[0_10px_30px_rgba(245,158,11,0.35)] group relative overflow-hidden"
              >
                <Link href="/join">
                  <span className="relative z-10">Join the Faith Vibe</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-300 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-2 border-white/80 text-white hover:bg-white/20 group relative overflow-hidden shadow-[0_10px_30px_rgba(255,255,255,0.12)]"
              >
                <Link href="/teachings">
                  <span className="relative z-10">Explore Teachings</span>
                  <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent z-20" />
      </section>

      {/* Live Features Section */}
      <section className="py-12 bg-gradient-to-b from-orange-50/50 via-amber-50/60 to-orange-50/40 dark:from-stone-950 dark:via-orange-950/30 dark:to-stone-950 relative overflow-hidden border-y border-amber-200/40 dark:border-orange-900/30">
        <div className="absolute inset-0 bg-[url('/patterns/manuscript-border.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <LivePrayerCountdown />
              <FastingAlert />
            </div>
            <div className="space-y-8">
              <DailyVerse />
              <VirtualCandle />
            </div>
          </div>
        </div>
      </section>

      {/* Gamification & Challenges Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-amber-100/50 dark:from-stone-950 dark:via-orange-950/40 dark:to-amber-950/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <GeezHeading className="mb-4 text-orange-700 dark:text-amber-400">ፈተናዎች</GeezHeading>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Orthodox Challenges</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
      <section className="py-16 bg-gradient-to-r from-orange-900 via-amber-800 to-orange-900 dark:from-stone-950 dark:via-orange-950 dark:to-stone-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-8">
            <GeezHeading className="mb-4 text-amber-300">ወጣቶች</GeezHeading>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">This Is Your Ethiopian Orthodox Home</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Connect with other young believers and grow in your faith through our youth-focused programs and
              activities
            </p>
          </div>
          <div className="flex justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-orange-800 hover:bg-amber-100 border-2 border-amber-200/80 group relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
            >
              <Link href="/youth-corner">
                <span className="relative z-10">Visit Youth Corner</span>
                <span className="absolute inset-0 bg-amber-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimony and Saint of the Day */}
      <section className="py-16 bg-gradient-to-b from-amber-50/50 via-orange-50/30 to-amber-50/40 dark:from-stone-950 dark:via-orange-950/20 dark:to-stone-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/manuscript-border.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center text-orange-700 dark:text-orange-400">
                <Heart className="h-6 w-6 mr-2" />
                Featured Testimony
              </h2>
              <YouthTestimony />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center text-amber-800 dark:text-amber-500">
                <Calendar className="h-6 w-6 mr-2" />
                Saint of the Day
              </h2>
              <SaintOfTheDay />
            </div>
          </div>
        </div>
      </section>

      {/* Church Locator Section */}
      <section className="py-16 bg-gradient-to-b from-amber-50/60 via-orange-50/30 to-amber-50/50 dark:from-stone-950 dark:via-orange-950/30 dark:to-stone-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-8" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <GeezHeading className="mb-4 text-orange-700 dark:text-amber-400">ቤተ ክርስቲያን</GeezHeading>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Find a Church Near You</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Locate Ethiopian Orthodox churches in your area and connect with the community
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <ChurchLocator />
          </div>
        </div>
      </section>

      {/* Catechumen Corner Teaser */}
      <section className="py-16 bg-gradient-to-b from-orange-50/60 via-amber-50/40 to-orange-50/50 dark:from-stone-950 dark:via-orange-950/30 dark:to-stone-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/manuscript-border.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div>
              <GeezHeading className="mb-4 text-orange-700 dark:text-amber-400">መንገድ ወደ ኪዳን</GeezHeading>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Catechumen Corner</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                A calm, structured path for inquirers — from curiosity to repentance to sacramental life in the
                Ethiopian Orthodox Tewahedo Church.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
              >
                <Link href="/catechumen">Begin the Journey</Link>
              </Button>
            </div>
            <div className="bg-white/80 dark:bg-stone-900/70 border border-amber-200/60 rounded-2xl p-6 shadow-lg">
              <p className="text-sm uppercase tracking-[0.2em] text-orange-600/80 dark:text-amber-300/80 mb-3">
                🕊️ Learning to Live the Covenant
              </p>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>What is a catechumen and why the Church honors this path</li>
                <li>The Five Steps of Entering the Covenant</li>
                <li>Before you visit a church: what to expect and how to prepare</li>
                <li>Prayer, checklist, and gentle next steps</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-gradient-to-b from-orange-50/50 via-amber-50/40 to-orange-50/30 dark:from-stone-950 dark:via-orange-950/25 dark:to-stone-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-8" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <GeezHeading className="mb-4 text-orange-700 dark:text-amber-400">ፈጣን ማገናኛዎች</GeezHeading>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Essential Resources</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore these resources to deepen your faith journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Link href="/holy-communion">
              <Card className="border-none shadow-lg overflow-hidden h-full hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-amber-50 dark:from-stone-900 dark:to-orange-950/50 group">
                <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-600" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                    <Heart className="h-5 w-5" />
                    Holy Communion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Learn how to prepare yourself spiritually and physically for receiving the Holy Qurban.
                  </p>
                  <div className="flex items-center text-amber-600 dark:text-amber-400 group-hover:translate-x-2 transition-transform">
                    <span className="text-sm font-medium">Prepare for Qurban</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/qa">
              <Card className="border-none shadow-lg overflow-hidden h-full hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-orange-50 dark:from-stone-900 dark:to-amber-950/50 group">
                <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-600" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                    <MessageCircle className="h-5 w-5" />
                    Ask a Question
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Submit your questions to our priests and scholars for guidance on your faith journey.
                  </p>
                  <div className="flex items-center text-orange-600 dark:text-orange-400 group-hover:translate-x-2 transition-transform">
                    <span className="text-sm font-medium">Get answers</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/repentance">
              <Card className="border-none shadow-lg overflow-hidden h-full hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-amber-50/80 dark:from-stone-900 dark:to-orange-950/40 group">
                <div className="h-2 bg-gradient-to-r from-orange-600 to-amber-500" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-amber-400">
                    <BookOpen className="h-5 w-5" />
                    Repentance Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Access confession guides and EOTC prayers to begin your journey of repentance.
                  </p>
                  <div className="flex items-center text-orange-600 dark:text-amber-400 group-hover:translate-x-2 transition-transform">
                    <span className="text-sm font-medium">Start your journey</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-900 via-amber-900 to-orange-950 dark:from-stone-950 dark:via-orange-950 dark:to-stone-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 py-12 relative">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
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
              <p className="mb-4 text-amber-100">
                Preserving the ancient faith and traditions of the Ethiopian Orthodox Tewahedo Church while connecting
                with the next generation of believers.
              </p>
              <p className="text-lg font-semibold italic text-amber-200">May the Holy Trinity guide you!</p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-amber-300">Connect With Us</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://t.me/ethiopianorthodox"
                    className="flex items-center hover:text-amber-300 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.375 17.303l-.9-.033c-.21-.008-.404-.11-.536-.281l-1.654-2.144a.425.425 0 0 0-.288-.154.414.414 0 0 0-.306.112l-.529.52a.903.903 0 0 1-1.276 0l-.424-.423a.902.902 0 0 1 0-1.276l.53-.53a.425.425 0 0 0 .112-.306.425.425 0 0 0-.154-.288l-2.144-1.654a.69.69 0 0 0-.281-.536.676.676 0 0 0-.033-.9.69.69 0 0 0 .6-.247l.997-1.154c.143-.167.353-.264.573-.268.219-.004.433.087.58.25l1.23 1.37c.236.265.64.315.937.112l2.646-1.789a.69.69 0 0 0 .247-.6l-.033-.9a.69.69 0 0 0-.536-.281l-4.146-.152a.69.69 0 0 0-.6.247l-.997 1.154a.69.69 0 0 0-.247.6l.033.9c.008.21.11.404.281.536l1.654 2.144a.42.42 0 0 0 .288.154.414.414 0 0 0 .306-.112l.529-.53a.902.902 0 0 1 1.276 0l.424.424a.902.902 0 0 1 0 1.276l-.53.529a.425.425 0 0 0-.112.306.425.425 0 0 0 .154.288l2.144 1.654a.69.69 0 0 0 .281.536.676.676 0 0 0 .033.9.69.69 0 0 0-.247.6l-.997 1.154a.69.69 0 0 0 .247.6z" />
                    </svg>
                    Telegram
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/ethiopianorthodox"
                    className="flex items-center hover:text-amber-300 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://tiktok.com/@ethiopianorthodox"
                    className="flex items-center hover:text-amber-300 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                    TikTok
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-amber-300">Contact Us</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  (123) 456-7890
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  info@ethiopianorthodox.org
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  123 Church Street, Addis Ababa
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20 text-center">
            <p>© {new Date().getFullYear()} Ethiopian Orthodox Tewahedo Church. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  )
}
