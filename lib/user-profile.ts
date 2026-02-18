export type UserProfile = {
  fullName: string
  username: string
  church: string
  city: string
  bio: string
  photoDataUrl: string
}

export const defaultUserProfile: UserProfile = {
  fullName: "",
  username: "",
  church: "",
  city: "",
  bio: "",
  photoDataUrl: "",
}

