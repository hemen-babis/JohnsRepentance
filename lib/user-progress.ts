export type MentorEntry = {
  text: string
  createdAt: string
}

export type ReflectionEntry = {
  id: string
  text: string
  createdAt: string
}

export type ShoppingItem = {
  id: string
  name: string
  qty: number
  unit: string
  checked: boolean
}

export type UserProgress = {
  fastingCheckins: string[]
  challengeCompletions: string[]
  recipeBookmarks: string[]
  prayerNotes: string[]
  mentorHistory: MentorEntry[]
  calendarAddedEventIds: string[]
  shoppingList: ShoppingItem[]
  shoppingNotes: string
  recipeDisplayName: string
  recipePreferredTradition: string
  dailyQuestLog: string[]
  serviceHours: number
  learningWeek: number
  joinedGroups: string[]
  reflections: ReflectionEntry[]
  activityDates: string[]
  quizCompletions: string[]
  safetyReportsCount: number
  youthGoals: string[]
}

export const defaultUserProgress: UserProgress = {
  fastingCheckins: [],
  challengeCompletions: [],
  recipeBookmarks: [],
  prayerNotes: [],
  mentorHistory: [],
  calendarAddedEventIds: [],
  shoppingList: [],
  shoppingNotes: "",
  recipeDisplayName: "",
  recipePreferredTradition: "All",
  dailyQuestLog: [],
  serviceHours: 0,
  learningWeek: 1,
  joinedGroups: [],
  reflections: [],
  activityDates: [],
  quizCompletions: [],
  safetyReportsCount: 0,
  youthGoals: [],
}
