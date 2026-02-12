import Link from "next/link"
import { Facebook, Instagram, Mail, Phone, MessageSquare, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-stone-900 to-orange-950/80 text-white">
      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Newsletter Section */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Join Our Spiritual Journey</h3>
          <p className="text-gray-300 mb-6">Subscribe to receive daily verses, event updates, and spiritual guidance</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input type="email" placeholder="Your email address" className="bg-stone-800 border-stone-700 text-white" />
            <Button className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white">
              Subscribe
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
            <p className="text-gray-300 mb-4">
              Ethiopian Orthodox Tewahedo Church teachings, repentance, and spiritual growth.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/johnrepentancechristianorthodox"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/johnsrepentance.orthodox.qna"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://t.me/+ReLdpifiso4Sz04q"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Telegram"
              >
                <MessageSquare className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/teachings" className="text-gray-300 hover:text-white transition-colors">
                  Teachings
                </Link>
              </li>
              <li>
                <Link href="/repentance" className="text-gray-300 hover:text-white transition-colors">
                  Repentance
                </Link>
              </li>
              <li>
                <Link href="/communion" className="text-gray-300 hover:text-white transition-colors">
                  Holy Communion
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/qa" className="text-gray-300 hover:text-white transition-colors">
                  Q&A
                </Link>
              </li>
              <li>
                <Link href="/youth" className="text-gray-300 hover:text-white transition-colors">
                  Youth Corner
                </Link>
              </li>
              <li>
                <Link href="/deacons" className="text-gray-300 hover:text-white transition-colors">
                  Deacon&apos;s Corner
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-white transition-colors">
                  Media Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-orange-400" />
                <span className="text-gray-300">0920-19-31-44</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-orange-400" />
                <a href="mailto:info@johnsrepentance.org" className="text-gray-300 hover:text-white transition-colors">
                  info@johnsrepentance.org
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-orange-400" />
                <a
                  href="https://t.me/+ReLdpifiso4Sz04q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 text-center text-gray-400">
          <p className="mb-4">
            &copy; {new Date().getFullYear()} John&apos;s Repentance - Ethiopian Orthodox Tewahedo Church
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
