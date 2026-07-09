"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AnimatedGradientText } from "@/components/animated-gradient-text"
import { ScrollToTop } from "@/components/scroll-to-top"
import { GeezHeading } from "@/components/geez-heading"
import { CheckCircle, Users, Calendar, MapPin, Mail, Phone, Send, ShieldCheck } from "lucide-react"

export default function JoinPage() {
  const [formStep, setFormStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "general",
    message: "",
    howHeard: "",
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, interest: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In a real application, this would submit the form data to a server
    setFormStep(2) // Move to success step
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-amber-500/5 dark:from-orange-900/20 dark:to-amber-900/20 z-0" />
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-5 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <GeezHeading className="mb-4 text-orange-700 dark:text-amber-400">ተቀላቀል</GeezHeading>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join the <AnimatedGradientText text="Faith Vibe" />
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Connect with our Ethiopian Orthodox community and grow in your faith journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
                <motion.div variants={fadeInUp}>
                  <Card className="border-none shadow-lg overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500" />
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        Why Join Our Community?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Authentic Faith</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Experience the rich traditions of the Ethiopian Orthodox Tewahedo Church, preserved for
                              centuries
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Supportive Community</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Connect with like-minded believers who will support your spiritual journey
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Spiritual Growth</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Access teachings, prayers, and guidance to deepen your relationship with God
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-500" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Cultural Connection</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Celebrate Ethiopian heritage, language, and traditions in a faith-centered environment
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Card className="border-none shadow-lg overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        Upcoming Events
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-gray-900 dark:text-white">Catechumen Class (Open to All)</h3>
                            <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 py-1 rounded-full">
                              Weekly
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Weekly class for all who want to learn Orthodox foundations.
                          </p>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Every Friday, 6:00 PM - 8:00 PM</span>
                            <span className="mx-2">•</span>
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>Taught by MT Dn. Kidus Adugna</span>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              Learning About Service (Deacons Encouraged)
                            </h3>
                            <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 px-2 py-1 rounded-full">
                              Weekly
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Practical class focused on church service life, especially for deacons.
                          </p>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Every Wednesday, 3:00 PM - 4:00 PM</span>
                            <span className="mx-2">•</span>
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>Taught by MT Dn. Kidus Adugna</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                <motion.div variants={fadeInUp}>
                  <Card className="border-none shadow-lg overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500" />
                    <CardHeader>
                      <CardTitle>
                        {formStep === 0 && "Connect With Us"}
                        {formStep === 1 && "Tell Us More"}
                        {formStep === 2 && "Thank You!"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {formStep === 0 && (
                        <form
                          className="space-y-4"
                          onSubmit={(e) => {
                            e.preventDefault()
                            setFormStep(1)
                          }}
                        >
                          <div className="space-y-2">
                            <Label htmlFor="name">Your Name</Label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="Enter your full name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="your@email.com"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number (Optional)</Label>
                            <Input
                              id="phone"
                              name="phone"
                              placeholder="Your phone number"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="rounded-xl border border-amber-200/70 bg-amber-50/80 p-4 text-sm text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-100">
                            <p className="flex items-center gap-2 font-semibold">
                              <ShieldCheck className="h-4 w-4" />
                              Privacy note
                            </p>
                            <p className="mt-2 leading-6">
                              We keep contact details private and use them only to follow up on your request, class
                              interest, or account access. Sensitive repentance matters should be shared discreetly.{" "}
                              <Link href="/privacy" className="underline underline-offset-2">
                                Read privacy details
                              </Link>
                              .
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label>I'm interested in:</Label>
                            <RadioGroup value={formData.interest} onValueChange={handleRadioChange}>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="general" id="general" />
                                <Label htmlFor="general">General information</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="membership" id="membership" />
                                <Label htmlFor="membership">Becoming a member</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="baptism" id="baptism" />
                                <Label htmlFor="baptism">Baptism/Chrismation</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="youth" id="youth" />
                                <Label htmlFor="youth">Youth programs</Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600"
                          >
                            Continue
                          </Button>
                        </form>
                      )}

                      {formStep === 1 && (
                        <form className="space-y-4" onSubmit={handleSubmit}>
                          <div className="space-y-2">
                            <Label htmlFor="message">Your Message (Optional)</Label>
                            <Textarea
                              id="message"
                              name="message"
                              placeholder="Tell us more about yourself and what you're looking for..."
                              value={formData.message}
                              onChange={handleInputChange}
                              className="min-h-[120px]"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="howHeard">How did you hear about us? (Optional)</Label>
                            <Input
                              id="howHeard"
                              name="howHeard"
                              placeholder="Friend, social media, search, etc."
                              value={formData.howHeard}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="flex gap-2">
                            <Button type="button" variant="outline" onClick={() => setFormStep(0)} className="flex-1">
                              Back
                            </Button>
                            <Button
                              type="submit"
                              className="flex-1 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600"
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Submit
                            </Button>
                          </div>
                        </form>
                      )}

                      {formStep === 2 && (
                        <div className="text-center py-6">
                          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
                          </div>
                          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Thank You!</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-6">
                            We've received your information and will be in touch soon. We look forward to welcoming you
                            to our community!
                          </p>
                          <Button
                            asChild
                            className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600"
                          >
                            <Link href="/">Return to Homepage</Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                {(formStep === 0 || formStep === 1) && (
                  <motion.div variants={fadeInUp} className="mt-8">
                    <Card className="border-none shadow-lg overflow-hidden">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          Contact Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center flex-shrink-0">
                              <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white">Church Address</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                123 Orthodox Way, Washington DC, 20001
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0">
                              <Phone className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white">Phone</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">(202) 555-1234</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center flex-shrink-0">
                              <Mail className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white">Email</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">info@ethiopianorthodox.org</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
                              <Calendar className="h-5 w-5 text-green-600 dark:text-green-500" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white">Service Times</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Sunday Divine Liturgy: 8:00 AM - 11:30 AM
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  )
}
