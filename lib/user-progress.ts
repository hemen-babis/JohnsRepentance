export type MentorEntry = {
  text: string
  createdAt: string
}

export type UserProgress = {
  fastingCheckins: string[]
  challengeCompletions: string[]
  recipeBookmarks: string[]
  prayerNotes: string[]
  mentorHistory: MentorEntry[]
}

export const defaultUserProgress: UserProgress = {
  fastingCheckins: [],
  challengeCompletions: [],
  recipeBookmarks: [],
  prayerNotes: [],
  mentorHistory: [],
}

