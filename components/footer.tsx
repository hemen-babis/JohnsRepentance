"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Facebook, Instagram, Mail, Phone, MessageSquare, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const pathname = usePathname()

  if (pathname?.startsWith("/youth-corner/plans/")) {
    return null
  }

  function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedEmail = email.trim()

    if (!normalizedEmail) {
      setMessage("Enter your email address first.")
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(normalizedEmail)) {
      setMessage("Enter a valid email address.")
      return
    }

    const subject = encodeURIComponent("Newsletter subscription")
    const body = encodeURIComponent(`Please add this email to the John's Repentance newsletter:\n\n${normalizedEmail}`)
    window.location.href = `mailto:info@johnsrepentance.org?subject=${subject}&body=${body}`
    setMessage("Your email app should open with a subscription request. Please send the message to finish subscribing.")
    setEmail("")
  }

  return (
    <footer className="relative overflow-hidden border-t border-amber-200/40 bg-[linear-gradient(180deg,rgba(56,29,8,0.96)_0%,rgba(74,38,12,0.96)_42%,rgba(43,22,7,0.98)_100%)] text-[#fff8ef]">
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-amber-300 to-transparent" />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.04]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(253,224,71,0.14),transparent_28%),radial-gradient(circle_at_20%_30%,rgba(251,146,60,0.12),transparent_24%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,10,3,0.08)_0%,rgba(22,10,3,0.18)_100%)]" />

      <div className="container mx-auto px-4 pt-16 pb-8 relative">
        {/* Newsletter Section */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h3 className="mb-2 text-2xl font-bold !text-[#fff7ea]">Join Our Spiritual Journey</h3>
          <div className="w-12 h-[2px] bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mb-4 rounded-full" />
          <p className="mb-6 text-[15px] text-amber-50">Subscribe to receive daily verses, event updates, and spiritual guidance</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="border-amber-100/20 bg-white/12 text-[#fff8ef] placeholder:text-amber-50/60 focus:border-amber-200/70 focus:ring-amber-100/30 transition-all duration-300"
            />
            <Button type="submit" className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white shadow-md shadow-orange-900/30 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 group">
              Subscribe
              <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </form>
          {message ? <p className="mt-4 text-sm text-amber-100">{message}</p> : null}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="mb-4 text-xl font-bold !text-amber-200">
              John&apos;s Repentance
            </h3>
            <p className="mb-6 leading-relaxed text-amber-50/92">
              Ethiopian Orthodox Tewahedo Church teachings, repentance, and spiritual growth.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com/johnrepentancechristianorthodox"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-hover flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-white/10 text-amber-50 hover:bg-orange-500/25"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/johnsrepentance.orthodox.qna"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-hover flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-white/10 text-amber-50 hover:bg-orange-500/25"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/+ReLdpifiso4Sz04q"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-hover flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-white/10 text-amber-50 hover:bg-orange-500/25"
                aria-label="Telegram"
              >
                <MessageSquare className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold !text-amber-200">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="footer-link inline-block text-amber-50/92 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/teachings" className="footer-link inline-block text-amber-50/92 hover:text-white">
                  Teachings
                </Link>
              </li>
              <li>
                <Link href="/library" className="footer-link inline-block text-amber-50/92 hover:text-white">
                  Library
                </Link>
              </li>
              <li>
                <Link href="/repentance" className="footer-link inline-block text-amber-50/92 hover:text-white">
                  Repentance
                </Link>
              </li>
              <li>
                <Link href="/holy-communion" className="footer-link inline-block text-amber-50/92 hover:text-white">
                  Holy Communion
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold !text-amber-200">Resources</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/qa" className="footer-link inline-block text-amber-50/92 hover:text-white">
                  Q&A
                </Link>
              </li>
              <li>
                <Link href="/youth" className="footer-link inline-block text-amber-50/92 hover:text-white">
                  Youth Corner
                </Link>
              </li>
              <li>
                <Link href="/deacons" className="footer-link inline-block text-amber-50/92 hover:text-white">
                  Deacon&apos;s Corner
                </Link>
              </li>
              <li>
                <Link href="/fasting-guide" className="footer-link inline-block text-amber-50/92 hover:text-white">
                  Fasting Guide
                </Link>
              </li>
              <li>
                <Link href="/volunteers-registration" className="footer-link inline-block text-amber-50/92 hover:text-white">
                  Volunteers Registration
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold !text-amber-200">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 group">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-400/15 transition-colors duration-300 group-hover:bg-orange-400/25">
                  <Phone className="h-3.5 w-3.5 text-amber-200" />
                </span>
                <span className="text-amber-50/92 transition-colors duration-300 group-hover:text-white">0920-19-31-44</span>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-400/15 transition-colors duration-300 group-hover:bg-orange-400/25">
                  <Mail className="h-3.5 w-3.5 text-amber-200" />
                </span>
                <a
                  href="mailto:info@johnsrepentance.org"
                  className="text-amber-50/92 transition-colors duration-300 hover:text-white"
                >
                  info@johnsrepentance.org
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-400/15 transition-colors duration-300 group-hover:bg-orange-400/25">
                  <MessageSquare className="h-3.5 w-3.5 text-amber-200" />
                </span>
                <a
                  href="https://t.me/+ReLdpifiso4Sz04q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-50/92 transition-colors duration-300 hover:text-white"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/15 text-center">
          <p className="mb-4 text-sm text-amber-50/85">
            &copy; {new Date().getFullYear()} John&apos;s Repentance - Ethiopian Orthodox Tewahedo Church
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link href="/privacy" className="text-amber-50/90 transition-colors duration-300 hover:text-white">
              Privacy Policy
            </Link>
            <span className="text-amber-50/50">|</span>
            <Link href="/terms" className="text-amber-50/90 transition-colors duration-300 hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
