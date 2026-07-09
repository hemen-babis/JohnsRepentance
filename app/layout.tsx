import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { AuthProgressProvider } from "@/components/providers/auth-progress-provider"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "John's Repentance - EOTC Teachings",
  description:
    "John's Repentance - Teachings, repentance, and spiritual growth with the Ethiopian Orthodox Tewahedo Church.",
  keywords:
    "EOTC, Ethiopian Orthodox, Repentance, Holy Communion, Orthodox Teachings, Faith, Bible, Saints, Tewahedo Church",
  openGraph: {
    title: "John's Repentance - EOTC Teachings and Spiritual Growth",
    description:
      "Learn about the Ethiopian Orthodox Tewahedo Church through teachings, prayers, and Q&A. Grow your faith today!",
    images: ["/images/banner.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "John's Repentance - EOTC Teachings",
    description: "Explore teachings, repentance, and prayers with the Ethiopian Orthodox Tewahedo Church.",
    images: ["/images/banner.jpg"],
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} ${poppins.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProgressProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <Toaster />
            </div>
          </AuthProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
