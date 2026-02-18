"use client"

import { useState } from "react"
import Link from "next/link"
import { User, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuthProgress } from "@/components/providers/auth-progress-provider"

export function AccountMenu() {
  const { user, authEnabled, profile, signInWithGoogle, signInWithEmail, signUpWithEmail, signOutUser } = useAuthProgress()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [open, setOpen] = useState(false)

  const submitEmail = async () => {
    if (!email || !password) return
    if (mode === "signin") await signInWithEmail(email, password)
    else await signUpWithEmail(email, password)
    setOpen(false)
  }

  if (user) {
    const initials =
      (profile.fullName || user.displayName || user.email || "U")
        .split(" ")
        .map((s) => s[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="h-10 w-10 overflow-hidden rounded-full border bg-white flex items-center justify-center text-xs font-semibold"
          aria-label="Open profile menu"
        >
          {profile.photoDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.photoDataUrl} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            initials
          )}
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-64 rounded-xl border bg-background p-3 shadow-xl z-50">
            <p className="text-sm font-semibold">{profile.fullName || user.displayName || "Your Profile"}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
            <div className="mt-3 space-y-2">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/profile" onClick={() => setOpen(false)}>
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => void signOutUser()}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (!authEnabled) {
    return (
      <Button variant="outline" size="sm" title="Configure Firebase env vars to enable accounts">
        Guest Mode
      </Button>
    )
  }

  return (
    <div className="relative">
      <Button variant="outline" size="sm" onClick={() => setOpen((v) => !v)}>
        <User className="mr-1 h-4 w-4" />
        Account
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl border bg-background p-3 shadow-xl z-50">
          <p className="mb-2 text-sm font-semibold">Optional account sign-in</p>
          <div className="mb-2 flex gap-2">
            <Button size="sm" variant={mode === "signin" ? "default" : "outline"} onClick={() => setMode("signin")}>Sign in</Button>
            <Button size="sm" variant={mode === "signup" ? "default" : "outline"} onClick={() => setMode("signup")}>Sign up</Button>
          </div>
          <div className="space-y-2">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
            <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
            <Button className="w-full" onClick={() => void submitEmail()}>
              {mode === "signin" ? "Sign in with Email" : "Create account"}
            </Button>
            <Button variant="outline" className="w-full" onClick={() => void signInWithGoogle()}>
              Continue with Google
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
