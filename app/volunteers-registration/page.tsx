"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const interestAreas = [
  "Communication / Social Media / Photography / Videography",
  "Administrative support (forms, registration)",
  "General Church Events / Hospitality / Ushering",
  "Cafeteria",
  "Kitchen Helper",
  "Cleaning",
]

export default function VolunteersRegistrationPage() {
  const [submitted, setSubmitted] = useState(false)
  const [interestError, setInterestError] = useState("")

  return (
    <div className="bg-gradient-to-b from-amber-50/40 to-orange-50/30 dark:from-stone-950 dark:to-orange-950/20 min-h-screen">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-none shadow-lg overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500" />
              <CardHeader className="space-y-3">
                <p className="text-sm text-orange-700 dark:text-orange-400">
                  Ethiopian Orthodox Tewahedo Church - Menbere Berhan Kidest Mariam (St. Mary) Cathedral in Toronto
                </p>
                <CardTitle className="text-2xl">Volunteers Registration Form</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                  &quot;Each of you should use whatever gift you have received to serve others, as faithful stewards of
                  God&apos;s grace in its various forms.&quot; 1 Peter 4:10
                </p>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const selectedInterests = formData.getAll("areasOfInterest")
                    if (selectedInterests.length === 0) {
                      setSubmitted(false)
                      setInterestError("Please select at least one area of interest.")
                      return
                    }
                    setInterestError("")
                    setSubmitted(true)
                  }}
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name (required)</Label>
                      <Input id="firstName" name="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name (required)</Label>
                      <Input id="lastName" name="lastName" required />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (required)</Label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (required)</Label>
                      <Input id="phone" name="phone" required />
                    </div>
                  </div>

                  <fieldset className="space-y-2">
                    <legend className="text-sm font-medium">Are you a Church Member? (required)</legend>
                    <div className="flex gap-6 text-sm">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="churchMember" value="yes" required />
                        Yes
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="churchMember" value="no" required />
                        No
                      </label>
                    </div>
                  </fieldset>

                  <fieldset className="space-y-2">
                    <legend className="text-sm font-medium">Do you have a Confession Father (የንስሐ አባት)?</legend>
                    <div className="flex gap-6 text-sm">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="confessionFather" value="yes" required />
                        Yes
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="confessionFather" value="no" required />
                        No
                      </label>
                    </div>
                  </fieldset>

                  <fieldset className="space-y-2">
                    <legend className="text-sm font-medium">
                      Have you ever volunteered / served in the Church?
                    </legend>
                    <div className="flex gap-6 text-sm">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="servedBefore" value="yes" required />
                        Yes
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="servedBefore" value="no" required />
                        No
                      </label>
                    </div>
                  </fieldset>

                  <div className="space-y-2">
                    <Label htmlFor="roles">If yes, please provide previous roles</Label>
                    <Textarea id="roles" name="roles" />
                  </div>

                  <fieldset className="space-y-2">
                    <legend className="text-sm font-medium">Areas of Interest (Check all that apply) (required)</legend>
                    <div className="space-y-2">
                      {interestAreas.map((item) => (
                        <label key={item} className="flex items-start gap-2 text-sm">
                          <input type="checkbox" name="areasOfInterest" value={item} />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                    {interestError && <p className="text-sm text-red-600 dark:text-red-400">{interestError}</p>}
                  </fieldset>

                  <div className="space-y-2">
                    <Label htmlFor="documents">
                      Upload relevant documentation (proof of past service, certifications, references, related
                      experience)
                    </Label>
                    <Input id="documents" name="documents" type="file" />
                  </div>

                  <Button type="submit" className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600">
                    Submit
                  </Button>

                  {submitted && (
                    <p className="text-sm text-green-700 dark:text-green-400">
                      Your volunteer form has been submitted.
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
