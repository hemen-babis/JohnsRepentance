"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { User } from "firebase/auth"
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db, googleProvider, isFirebaseConfigured } from "@/lib/firebase-client"
import { defaultUserProgress, type UserProgress } from "@/lib/user-progress"
import { defaultUserProfile, type UserProfile } from "@/lib/user-profile"

type AuthProgressContextType = {
  user: User | null
  authLoading: boolean
  progress: UserProgress
  profile: UserProfile
  saveProgress: (next: UserProgress) => void
  saveProfile: (next: UserProfile) => void
  toggleChallenge: (id: string) => void
  toggleRecipeBookmark: (id: string) => void
  addPrayerNote: (text: string) => void
  addMentorHistory: (text: string) => void
  addFastingCheckinToday: () => void
  setCalendarAddedEventIds: (ids: string[]) => void
  setShoppingState: (payload: { shoppingList: UserProgress["shoppingList"]; shoppingNotes: string }) => void
  setRecipePreferences: (payload: { recipeDisplayName: string; recipePreferredTradition: string }) => void
  signInWithGoogle: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string) => Promise<void>
  signOutUser: () => Promise<void>
  authEnabled: boolean
}

const AuthProgressContext = createContext<AuthProgressContextType | null>(null)
const GUEST_KEY = "guest-user-progress-v1"
const GUEST_PROFILE_KEY = "guest-user-profile-v1"
const USER_PROGRESS_KEY_PREFIX = "user-progress-v1:"
const USER_PROFILE_KEY_PREFIX = "user-profile-v1:"

function todayYmd() {
  return new Date().toISOString().split("T")[0]
}

export function AuthProgressProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [progress, setProgress] = useState<UserProgress>(defaultUserProgress)
  const [profile, setProfile] = useState<UserProfile>(defaultUserProfile)

  useEffect(() => {
    const raw = localStorage.getItem(GUEST_KEY)
    if (raw) {
      try {
        setProgress({ ...defaultUserProgress, ...JSON.parse(raw) })
      } catch {
        setProgress(defaultUserProgress)
      }
    }
    const rawProfile = localStorage.getItem(GUEST_PROFILE_KEY)
    if (rawProfile) {
      try {
        setProfile({ ...defaultUserProfile, ...JSON.parse(rawProfile) })
      } catch {
        setProfile(defaultUserProfile)
      }
    }

    if (!auth || !isFirebaseConfigured) {
      setAuthLoading(false)
      return
    }

    const unsub = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser)
      if (!nextUser || !db) {
        setAuthLoading(false)
        return
      }

      const userProgressKey = `${USER_PROGRESS_KEY_PREFIX}${nextUser.uid}`
      const userProfileKey = `${USER_PROFILE_KEY_PREFIX}${nextUser.uid}`
      const localProgressRaw = localStorage.getItem(userProgressKey)
      const localProfileRaw = localStorage.getItem(userProfileKey)

      try {
        const ref = doc(db, "userProgress", nextUser.uid)
        const snap = await getDoc(ref)
        if (snap.exists()) {
          const hydrated = { ...defaultUserProgress, ...(snap.data() as UserProgress) }
          setProgress(hydrated)
          localStorage.setItem(userProgressKey, JSON.stringify(hydrated))
        } else if (localProgressRaw) {
          const localHydrated = { ...defaultUserProgress, ...JSON.parse(localProgressRaw) }
          await setDoc(ref, localHydrated)
          setProgress(localHydrated)
        } else {
          await setDoc(ref, defaultUserProgress)
          setProgress(defaultUserProgress)
          localStorage.setItem(userProgressKey, JSON.stringify(defaultUserProgress))
        }
      } catch {
        if (localProgressRaw) {
          setProgress({ ...defaultUserProgress, ...JSON.parse(localProgressRaw) })
        }
      }

      try {
        const profileRef = doc(db, "userProfiles", nextUser.uid)
        const profileSnap = await getDoc(profileRef)
        if (profileSnap.exists()) {
          const hydrated = { ...defaultUserProfile, ...(profileSnap.data() as UserProfile) }
          setProfile(hydrated)
          localStorage.setItem(userProfileKey, JSON.stringify(hydrated))
        } else if (localProfileRaw) {
          const localHydrated = { ...defaultUserProfile, ...JSON.parse(localProfileRaw) }
          await setDoc(profileRef, localHydrated)
          setProfile(localHydrated)
        } else {
          const seedProfile: UserProfile = {
            ...defaultUserProfile,
            fullName: nextUser.displayName ?? "",
            photoDataUrl: nextUser.photoURL ?? "",
          }
          await setDoc(profileRef, seedProfile)
          setProfile(seedProfile)
          localStorage.setItem(userProfileKey, JSON.stringify(seedProfile))
        }
      } catch {
        if (localProfileRaw) {
          setProfile({ ...defaultUserProfile, ...JSON.parse(localProfileRaw) })
        }
      }
      setAuthLoading(false)
    })

    return () => unsub()
  }, [])

  const persist = async (next: UserProgress) => {
    setProgress(next)
    if (user && db) {
      localStorage.setItem(`${USER_PROGRESS_KEY_PREFIX}${user.uid}`, JSON.stringify(next))
      try {
        await setDoc(doc(db, "userProgress", user.uid), next, { merge: true })
      } catch {
        // Keep local mirror so user data is never lost when Firestore is unavailable/rules-blocked.
      }
      return
    }
    localStorage.setItem(GUEST_KEY, JSON.stringify(next))
  }

  const saveProgress = (next: UserProgress) => {
    void persist(next)
  }

  const saveProfile = (next: UserProfile) => {
    setProfile(next)
    if (user && db) {
      localStorage.setItem(`${USER_PROFILE_KEY_PREFIX}${user.uid}`, JSON.stringify(next))
      void setDoc(doc(db, "userProfiles", user.uid), next, { merge: true }).catch(() => {
        // keep local mirror fallback
      })
      return
    }
    localStorage.setItem(GUEST_PROFILE_KEY, JSON.stringify(next))
  }

  const toggleChallenge = (id: string) => {
    const exists = progress.challengeCompletions.includes(id)
    const challengeCompletions = exists
      ? progress.challengeCompletions.filter((x) => x !== id)
      : [...progress.challengeCompletions, id]
    void persist({ ...progress, challengeCompletions })
  }

  const toggleRecipeBookmark = (id: string) => {
    const exists = progress.recipeBookmarks.includes(id)
    const recipeBookmarks = exists
      ? progress.recipeBookmarks.filter((x) => x !== id)
      : [...progress.recipeBookmarks, id]
    void persist({ ...progress, recipeBookmarks })
  }

  const addPrayerNote = (text: string) => {
    if (!text.trim()) return
    const prayerNotes = [text.trim(), ...progress.prayerNotes].slice(0, 50)
    void persist({ ...progress, prayerNotes })
  }

  const addMentorHistory = (text: string) => {
    if (!text.trim()) return
    const mentorHistory = [{ text: text.trim(), createdAt: new Date().toISOString() }, ...progress.mentorHistory].slice(0, 50)
    void persist({ ...progress, mentorHistory })
  }

  const addFastingCheckinToday = () => {
    const today = todayYmd()
    if (progress.fastingCheckins.includes(today)) return
    void persist({ ...progress, fastingCheckins: [today, ...progress.fastingCheckins] })
  }

  const setCalendarAddedEventIds = (ids: string[]) => {
    void persist({ ...progress, calendarAddedEventIds: ids })
  }

  const setShoppingState = (payload: { shoppingList: UserProgress["shoppingList"]; shoppingNotes: string }) => {
    void persist({ ...progress, shoppingList: payload.shoppingList, shoppingNotes: payload.shoppingNotes })
  }

  const setRecipePreferences = (payload: { recipeDisplayName: string; recipePreferredTradition: string }) => {
    void persist({
      ...progress,
      recipeDisplayName: payload.recipeDisplayName,
      recipePreferredTradition: payload.recipePreferredTradition,
    })
  }

  const signInWithGoogle = async () => {
    if (!auth) return
    await signInWithPopup(auth, googleProvider)
  }

  const signInWithEmail = async (email: string, password: string) => {
    if (!auth) return
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUpWithEmail = async (email: string, password: string) => {
    if (!auth) return
    await createUserWithEmailAndPassword(auth, email, password)
  }

  const signOutUser = async () => {
    if (!auth) return
    await signOut(auth)
  }

  const value = useMemo<AuthProgressContextType>(
    () => ({
      user,
      authLoading,
      progress,
      profile,
      saveProgress,
      saveProfile,
      toggleChallenge,
      toggleRecipeBookmark,
      addPrayerNote,
      addMentorHistory,
      addFastingCheckinToday,
      setCalendarAddedEventIds,
      setShoppingState,
      setRecipePreferences,
      signInWithGoogle,
      signInWithEmail,
      signUpWithEmail,
      signOutUser,
      authEnabled: isFirebaseConfigured,
    }),
    [user, authLoading, progress, profile],
  )

  return <AuthProgressContext.Provider value={value}>{children}</AuthProgressContext.Provider>
}

export function useAuthProgress() {
  const ctx = useContext(AuthProgressContext)
  if (!ctx) {
    throw new Error("useAuthProgress must be used within AuthProgressProvider")
  }
  return ctx
}
