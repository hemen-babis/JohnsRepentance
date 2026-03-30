export type CommunionGender = "male" | "female" | "prefer-not-to-say"
export type CommunionBaptismStatus = "baptized" | "catechumen" | "not-yet"
export type CommunionLastReceived = "within-month" | "one-to-six-months" | "over-six-months" | "never"

export type CommunionProfile = {
  gender: CommunionGender
  baptismStatus: CommunionBaptismStatus
  hasSpiritualFather: boolean
  lastReceived: CommunionLastReceived
  // Gender-specific eligibility flags (reset each session as needed)
  femaleOnMenstrualCycle?: boolean
  maleHasNocturnalEmission?: boolean
}

export const COMMUNION_PROFILE_KEY = "communion-profile-v1"

export function loadProfile(): CommunionProfile | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(COMMUNION_PROFILE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as CommunionProfile
  } catch {
    return null
  }
}

export function saveProfile(profile: CommunionProfile): void {
  if (typeof window === "undefined") return
  window.localStorage.setItem(COMMUNION_PROFILE_KEY, JSON.stringify(profile))
}

export function clearProfile(): void {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(COMMUNION_PROFILE_KEY)
}

export type EligibilityResult = {
  canReceive: boolean
  reason: string
  guidance: string
  severity: "blocked" | "caution" | "clear"
}

export function checkEligibility(profile: CommunionProfile): EligibilityResult {
  if (profile.baptismStatus === "not-yet") {
    return {
      canReceive: false,
      severity: "blocked",
      reason: "Baptism is required",
      guidance: "Holy Communion is for the baptized faithful. The first step on this path is Baptism into the Ethiopian Orthodox Tewahedo Church. The Catechumen Corner can help you begin that journey.",
    }
  }

  if (profile.baptismStatus === "catechumen") {
    return {
      canReceive: false,
      severity: "blocked",
      reason: "Catechumens do not yet receive",
      guidance: "As a catechumen, you are being prepared and received into the Body of the Church. The time of full reception, including Holy Communion, comes after Baptism. Walk faithfully in the preparation.",
    }
  }

  if (profile.gender === "female" && profile.femaleOnMenstrualCycle) {
    return {
      canReceive: false,
      severity: "caution",
      reason: "Temporary rest period",
      guidance: "In the Tewahedo tradition, women observe a time of rest from the Holy Mysteries during their menstrual cycle. This is not a judgement of unworthiness — it is a rhythm of reverence. Use this season for quiet prayer, reading, and preparation. The altar awaits you on the other side.",
    }
  }

  if (profile.gender === "male" && profile.maleHasNocturnalEmission) {
    return {
      canReceive: false,
      severity: "caution",
      reason: "Cleansing period observed",
      guidance: "The Tewahedo tradition observes a period of purification (typically overnight bathing and prayer) before approaching the Holy Mysteries after a nocturnal emission. This is not shame — it is reverence. Wash, pray, and approach when the appointed time has passed. Consult your spiritual father for specific guidance.",
    }
  }

  if (!profile.hasSpiritualFather) {
    return {
      canReceive: true,
      severity: "caution",
      reason: "No spiritual father yet",
      guidance: "You can still prepare and receive, but we strongly encourage you to find a spiritual father before or alongside your next Communion. He is the gate of confession — and confession is the gate of the Holy Mystery. Without him, you are navigating alone what God designed to be walked with a guide.",
    }
  }

  if (profile.lastReceived === "never" || profile.lastReceived === "over-six-months") {
    return {
      canReceive: true,
      severity: "caution",
      reason: "Long gap since last Communion",
      guidance: "It has been a long time. Do not let the gap become a wall. The Father sees you returning from a distance and runs to meet you. Begin with confession, approach your spiritual father, and set a date. The Altar has been waiting.",
    }
  }

  return {
    canReceive: true,
    severity: "clear",
    reason: "Ready to prepare",
    guidance: "You are in a good position to begin preparation for Holy Communion. Use the calendar below to plan your 3-day preparation, mark your Communion day, and protect the 2-day post-communion rhythm.",
  }
}
