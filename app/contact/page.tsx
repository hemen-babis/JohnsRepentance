import Link from "next/link"
import { Mail, MessageSquare, Phone, ShieldCheck, Users } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const contactMethods = [
  {
    title: "Email",
    description: "Use email for questions, class interest, volunteer coordination, or website issues.",
    href: "mailto:info@johnsrepentance.org",
    label: "info@johnsrepentance.org",
    icon: Mail,
  },
  {
    title: "Telegram",
    description: "Join the community channel for updates, teachings, and announcements.",
    href: "https://t.me/+ReLdpifiso4Sz04q",
    label: "Open Telegram",
    icon: MessageSquare,
  },
  {
    title: "Phone",
    description: "Call for time-sensitive coordination or follow-up.",
    href: "tel:0920193144",
    label: "0920-19-31-44",
    icon: Phone,
  },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50/60 to-orange-50/30 dark:from-stone-950 dark:to-orange-950/20">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-orange-700 dark:text-amber-400">
                Contact
              </p>
              <h1 className="text-4xl font-bold text-stone-900 dark:text-white md:text-5xl">Reach John&apos;s Repentance</h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                Send questions, request follow-up, ask about classes, or connect with the team through the channels below.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {contactMethods.map(({ title, description, href, label, icon: Icon }) => (
                <Card key={title} className="border-none shadow-lg">
                  <CardHeader className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-5 text-sm leading-6 text-gray-600 dark:text-gray-300">{description}</p>
                    <Button asChild className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white">
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
                        {label}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    Want to serve?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-5 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    Use the volunteer form to tell the team where you would like to help.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/volunteers-registration">Volunteer Registration</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    Sensitive matters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
                    Personal repentance, confession, family, or pastoral concerns should be handled discreetly with a priest or confession father. Online messages are for coordination and guidance only.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
