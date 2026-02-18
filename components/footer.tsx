import Link from "next/link"
import { Facebook, Instagram, Mail, Phone, MessageSquare, Youtube, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-stone-900 via-stone-900 to-orange-950/80 text-white overflow-hidden">
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.04]" />

      <div className="container mx-auto px-4 pt-16 pb-8 relative">
        {/* Newsletter Section */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h3 className="text-2xl font-bold mb-2">Join Our Spiritual Journey</h3>
          <div className="w-12 h-[2px] bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mb-4 rounded-full" />
          <p className="text-gray-400 mb-6">Subscribe to receive daily verses, event updates, and spiritual guidance</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-stone-800/80 border-stone-700 text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:ring-orange-500/20 transition-all duration-300"
            />
            <Button className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white shadow-md shadow-orange-900/30 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 group">
              Subscribe
              <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                John&apos;s Repentance
              </span>
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Ethiopian Orthodox Tewahedo Church teachings, repentance, and spiritual growth.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com/johnrepentancechristianorthodox"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-hover flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-gray-400 hover:bg-orange-500/20"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/johnsrepentance.orthodox.qna"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-hover flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-gray-400 hover:bg-orange-500/20"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/+ReLdpifiso4Sz04q"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-hover flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-gray-400 hover:bg-orange-500/20"
                aria-label="Telegram"
              >
                <MessageSquare className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-hover flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-gray-400 hover:bg-orange-500/20"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="footer-link text-gray-400 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/teachings" className="footer-link text-gray-400 inline-block">
                  Teachings
                </Link>
              </li>
              <li>
                <Link href="/repentance" className="footer-link text-gray-400 inline-block">
                  Repentance
                </Link>
              </li>
              <li>
                <Link href="/holy-communion" className="footer-link text-gray-400 inline-block">
                  Holy Communion
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Resources</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/qa" className="footer-link text-gray-400 inline-block">
                  Q&A
                </Link>
              </li>
              <li>
                <Link href="/youth" className="footer-link text-gray-400 inline-block">
                  Youth Corner
                </Link>
              </li>
              <li>
                <Link href="/deacons" className="footer-link text-gray-400 inline-block">
                  Deacon&apos;s Corner
                </Link>
              </li>
              <li>
                <Link href="/fasting-guide" className="footer-link text-gray-400 inline-block">
                  Fasting Guide
                </Link>
              </li>
              <li>
                <Link href="/volunteers-registration" className="footer-link text-gray-400 inline-block">
                  Volunteers Registration
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 group">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500/10 transition-colors duration-300 group-hover:bg-orange-500/20">
                  <Phone className="h-3.5 w-3.5 text-orange-400" />
                </span>
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">0920-19-31-44</span>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500/10 transition-colors duration-300 group-hover:bg-orange-500/20">
                  <Mail className="h-3.5 w-3.5 text-orange-400" />
                </span>
                <a
                  href="mailto:info@johnsrepentance.org"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  info@johnsrepentance.org
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500/10 transition-colors duration-300 group-hover:bg-orange-500/20">
                  <MessageSquare className="h-3.5 w-3.5 text-orange-400" />
                </span>
                <a
                  href="https://t.me/+ReLdpifiso4Sz04q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 mb-4 text-sm">
            &copy; {new Date().getFullYear()} John&apos;s Repentance - Ethiopian Orthodox Tewahedo Church
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-500 hover:text-orange-400 transition-colors duration-300">
              Privacy Policy
            </Link>
            <span className="text-gray-700">|</span>
            <Link href="/terms" className="text-gray-500 hover:text-orange-400 transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
