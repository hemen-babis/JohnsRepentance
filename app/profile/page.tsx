"use client"

import { useRef } from "react"
import { Save } from "lucide-react"
import { useAuthProgress } from "@/components/providers/auth-progress-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const { user, profile, saveProfile } = useAuthProgress()
  const fileRef = useRef<HTMLInputElement | null>(null)

  const update = (key: keyof typeof profile, value: string) => {
    saveProfile({ ...profile, [key]: value })
  }

  const onPickPhoto = async (file?: File) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      update("photoDataUrl", String(reader.result || ""))
    }
    reader.readAsDataURL(file)
  }

  const saveNow = () => {
    saveProfile(profile)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-orange-50/30 dark:from-stone-950 dark:to-stone-900">
      <section className="mx-auto max-w-3xl px-4 py-10">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle>My Profile</CardTitle>
              <Button onClick={saveNow}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="h-20 w-20 overflow-hidden rounded-full border bg-white text-xs font-semibold"
              >
                {profile.photoDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.photoDataUrl} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  "Add photo"
                )}
              </button>
              <div>
                <p className="text-sm text-muted-foreground">{user?.email ?? "Guest profile"}</p>
                <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
                  Upload picture
                </Button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => void onPickPhoto(e.target.files?.[0])}
                />
              </div>
            </div>

            <Input
              placeholder="Full name"
              value={profile.fullName}
              onChange={(e) => update("fullName", e.target.value)}
            />
            <Input
              placeholder="Username"
              value={profile.username}
              onChange={(e) => update("username", e.target.value)}
            />
            <Input
              placeholder="Church"
              value={profile.church}
              onChange={(e) => update("church", e.target.value)}
            />
            <Input
              placeholder="City"
              value={profile.city}
              onChange={(e) => update("city", e.target.value)}
            />
            <Textarea
              placeholder="Bio / spiritual goals"
              value={profile.bio}
              onChange={(e) => update("bio", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Saved automatically.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
