import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const terms = [
  {
    title: "Spiritual guidance",
    body:
      "This website provides educational resources, prayers, teachings, and community tools. It does not replace the counsel of a priest, confession father, parish, or spiritual elder.",
  },
  {
    title: "Submitted information",
    body:
      "Forms and contact requests should be used for ministry coordination and follow-up. Do not submit urgent emergencies or private confession details through public website forms.",
  },
  {
    title: "External resources",
    body:
      "The library may link to external websites, videos, PDFs, or public resources. External material remains under its original owner or publisher.",
  },
  {
    title: "Personal use",
    body:
      "Study tools, calendars, journals, and progress features are provided to support personal growth. Some features may store data locally on your device unless account sync is enabled.",
  },
]

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50/60 to-orange-50/30 dark:from-stone-950 dark:to-orange-950/20">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-orange-700 dark:text-amber-400">
                Terms
              </p>
              <h1 className="text-4xl font-bold text-stone-900 dark:text-white md:text-5xl">Terms of Service</h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                These terms explain the intended use of John&apos;s Repentance resources and forms.
              </p>
            </div>

            <div className="grid gap-6">
              {terms.map((item) => (
                <Card key={item.title} className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">{item.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
