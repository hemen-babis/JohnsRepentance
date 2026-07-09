import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, EyeOff, Mail } from "lucide-react"

const privacyPoints = [
  {
    title: "Minimal information",
    description:
      "We only ask for the contact and profile details needed to support participation, communication, and requested spiritual resources.",
    icon: Shield,
  },
  {
    title: "Private by default",
    description:
      "Repentance-related details, prayer requests, and sensitive submissions are treated discreetly and are not displayed publicly on the website.",
    icon: EyeOff,
  },
  {
    title: "Protected access",
    description:
      "Account and form information is limited to the team members responsible for follow-up, coordination, and pastoral care.",
    icon: Lock,
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/60 to-orange-50/30 dark:from-stone-950 dark:to-orange-950/20">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-orange-700 dark:text-amber-400">
                Privacy
              </p>
              <h1 className="text-4xl font-bold text-stone-900 dark:text-white md:text-5xl">Your information is handled with care</h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                John&apos;s Repentance is designed to support faith formation, not to expose personal matters. We aim to
                keep submitted information limited, discreet, and used only for its intended purpose.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {privacyPoints.map(({ title, description, icon: Icon }) => (
                <Card key={title} className="border-none shadow-lg">
                  <CardHeader className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">{description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8 border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  Questions about privacy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
                  If a form asks for something you do not feel comfortable sharing online, pause and contact the ministry
                  team first. Sensitive pastoral matters should always be handled with discernment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
