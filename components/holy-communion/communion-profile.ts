import { addDays, differenceInCalendarDays, isBefore, parseISO, startOfDay } from "date-fns"

export type CommunionGender = "male" | "female" | "prefer-not-to-say"
export type CommunionBaptismStatus = "baptized" | "catechumen" | "not-yet"
export type CommunionLastReceived = "within-month" | "one-to-six-months" | "over-six-months" | "never"

export type CommunionProfile = {
  gender: CommunionGender
  baptismStatus: CommunionBaptismStatus
  hasSpiritualFather: boolean
  lastReceived: CommunionLastReceived
  isExcommunicated?: boolean

  // Female liturgical restrictions
  femaleOnMenstrualCycle?: boolean
  femalePostpartumActive?: boolean
  femalePostpartumBabyGender?: "male" | "female"   // male → 40 days, female → 80 days
  femalePostpartumBirthDate?: string                 // "yyyy-MM-dd"
  femaleHasAbnormalBleeding?: boolean               // unexplained / ongoing bleeding (Lev 15:25)

  // Male liturgical restrictions
  maleHasNocturnalEmission?: boolean
  maleHadConjugalRelations?: boolean                // last night — requires abstinence before liturgy
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

// ─── Postpartum helpers ────────────────────────────────────────────────────

export function getPostpartumEndDate(profile: CommunionProfile): Date | null {
  if (!profile.femalePostpartumActive || !profile.femalePostpartumBirthDate || !profile.femalePostpartumBabyGender) return null
  const birthDate = startOfDay(parseISO(profile.femalePostpartumBirthDate))
  const days = profile.femalePostpartumBabyGender === "male" ? 40 : 80
  return addDays(birthDate, days)
}

export function getPostpartumDaysRemaining(profile: CommunionProfile | null): number | null {
  if (!profile) return null
  const endDate = getPostpartumEndDate(profile)
  if (!endDate) return null
  const remaining = differenceInCalendarDays(endDate, startOfDay(new Date()))
  return remaining > 0 ? remaining : 0
}

export function isInPostpartumPeriod(profile: CommunionProfile | null): boolean {
  if (!profile || !profile.femalePostpartumActive) return false
  const remaining = getPostpartumDaysRemaining(profile)
  return remaining !== null && remaining > 0
}

export function isProfileRestingDay(date: Date, profile: CommunionProfile | null): boolean {
  if (!profile || profile.gender !== "female") return false
  if (profile.femaleOnMenstrualCycle) return true
  if (profile.femaleHasAbnormalBleeding) return true
  if (profile.femalePostpartumActive && profile.femalePostpartumBirthDate && profile.femalePostpartumBabyGender) {
    const birthDate = startOfDay(parseISO(profile.femalePostpartumBirthDate))
    const days = profile.femalePostpartumBabyGender === "male" ? 40 : 80
    const endDate = addDays(birthDate, days)
    const d = startOfDay(date)
    return !isBefore(d, birthDate) && isBefore(d, endDate)
  }
  return false
}

// ─── Eligibility ───────────────────────────────────────────────────────────

export type RestrictionType =
  | "excommunication"
  | "not-baptized"
  | "catechumen"
  | "menstrual"
  | "postpartum"
  | "bleeding"
  | "emission"
  | "conjugal"
  | "no-confessor"
  | "long-gap"
  | "never-received"

export type EligibilityResult = {
  canReceive: boolean
  reason: string
  guidance: string
  severity: "blocked" | "caution" | "clear"
  restrictionType?: RestrictionType
  daysRemaining?: number
}

export function checkEligibility(profile: CommunionProfile): EligibilityResult {

  // ── Hard blocks ──────────────────────────────────────────────────────────

  if (profile.isExcommunicated) {
    return {
      canReceive: false,
      severity: "blocked",
      restrictionType: "excommunication",
      reason: "Under Ecclesiastical Restriction",
      guidance:
        "You are currently under an ecclesiastical restriction placed by your spiritual father or the Church. Holy Communion cannot be received until this is lifted through the proper process of repentance, penance, and reconciliation with your priest or bishop. Do not approach the Altar until you have resolved this with them — not out of shame, but out of reverence for the Mystery.",
    }
  }

  if (profile.baptismStatus === "not-yet") {
    return {
      canReceive: false,
      severity: "blocked",
      restrictionType: "not-baptized",
      reason: "Baptism is required first",
      guidance:
        "Holy Communion is for the baptized faithful of the Ethiopian Orthodox Tewahedo Church. The path into the Mysteries begins with Baptism and Chrismation. The Catechumen Corner can help you begin that journey clearly and without rushing. The Church is waiting to receive you.",
    }
  }

  if (profile.baptismStatus === "catechumen") {
    return {
      canReceive: false,
      severity: "blocked",
      restrictionType: "catechumen",
      reason: "Catechumens do not yet receive",
      guidance:
        "As a catechumen, you are already within the embrace of the Church — being prepared, taught, and received. The time of full reception into the Holy Mysteries comes after Baptism. Walk faithfully in the preparation. The altar is waiting for you on the other side of the font.",
    }
  }

  // ── Female liturgical restrictions ───────────────────────────────────────

  if (profile.gender === "female") {

    if (profile.femaleOnMenstrualCycle) {
      return {
        canReceive: false,
        severity: "caution",
        restrictionType: "menstrual",
        reason: "Menstrual Rest Period",
        guidance:
          "The Ethiopian Orthodox Tewahedo tradition observes a time of rest from the Holy Mysteries during the menstrual cycle (Leviticus 15:19–24). This is not a judgement of unworthiness — the Church holds this season with great reverence and gentleness. You are not distant from God in these days. Pray simply, light a candle, read Scripture. The altar will receive you fully when this season has passed.",
      }
    }

    if (profile.femalePostpartumActive) {
      const daysRemaining = getPostpartumDaysRemaining(profile)
      const babyGender = profile.femalePostpartumBabyGender
      const days = babyGender === "male" ? 40 : 80

      if (daysRemaining !== null && daysRemaining > 0) {
        return {
          canReceive: false,
          severity: "caution",
          restrictionType: "postpartum",
          daysRemaining,
          reason: `Post-Partum Rest — ${daysRemaining} day${daysRemaining === 1 ? "" : "s"} remaining`,
          guidance:
            `Following the birth of ${babyGender === "male" ? "a son" : "a daughter"}, the Tewahedo tradition observes ${days} days of purification before returning to receive the Holy Mysteries (Leviticus 12:1–8). This follows a rhythm the Church has held with reverence since ancient times. You have ${daysRemaining} day${daysRemaining === 1 ? "" : "s"} remaining. Rest in peace. Nurse your child with prayer. Know that God is with you in this season, and the altar waits for you when the appointed time is complete.`,
        }
      }

      // Period concluded — gentle nudge to update profile
      return {
        canReceive: true,
        severity: "caution",
        reason: "Post-Partum period may have ended",
        guidance:
          "Your post-partum rest period appears to have concluded based on the birth date you entered. If the bleeding has fully stopped and you feel ready, you may begin preparing to receive Holy Communion again. Update your profile to clear this notice and return to the full calendar.",
      }
    }

    if (profile.femaleHasAbnormalBleeding) {
      return {
        canReceive: false,
        severity: "caution",
        restrictionType: "bleeding",
        reason: "Irregular Bleeding — Rest Period",
        guidance:
          "Any unexplained or ongoing vaginal bleeding is observed with the same reverence as the menstrual rest in the Tewahedo tradition (Leviticus 15:25–30 — the \"continuous flow\" provision). This is a season of rest, not a season of shame. Pray simply, rest fully, and consult your spiritual father. When the bleeding has fully stopped and the appointed rest period has passed, return to prepare for Holy Communion.",
      }
    }
  }

  // ── Male liturgical restrictions ─────────────────────────────────────────

  if (profile.gender === "male") {

    if (profile.maleHasNocturnalEmission) {
      return {
        canReceive: false,
        severity: "caution",
        restrictionType: "emission",
        reason: "Purification Period — Nocturnal Emission",
        guidance:
          "The Tewahedo tradition observes a period of ritual purification (thorough bathing and the morning prayers) before approaching the Holy Mysteries after a nocturnal emission (Leviticus 15:16–17). This is not shame — it is reverence for what you are about to receive. Wash thoroughly, pray the appointed prayers, and consult your spiritual father for the specific observance period. Most spiritual fathers prescribe abstinence from the Mysteries for that day only.",
      }
    }

    if (profile.maleHadConjugalRelations) {
      return {
        canReceive: false,
        severity: "caution",
        restrictionType: "conjugal",
        reason: "Abstinence Period Required",
        guidance:
          "The Tewahedo tradition requires that spouses abstain from conjugal relations for the period before receiving the Holy Mysteries (1 Corinthians 7:5 — \"that you may devote yourselves to prayer\"). This is not a judgement of marriage — marriage is holy. It is an elevation of the Communion fast: the body itself joins the spirit in preparation. Consult your spiritual father for the period he prescribes. Most prescribe abstinence from the night before the Liturgy. You may receive next Sunday after observing the appointed abstinence.",
      }
    }
  }

  // ── Caution levels ────────────────────────────────────────────────────────

  if (!profile.hasSpiritualFather) {
    return {
      canReceive: true,
      severity: "caution",
      restrictionType: "no-confessor",
      reason: "No spiritual father yet",
      guidance:
        "You can still prepare and receive, but in the Tewahedo tradition, a spiritual father who hears your confession is the gate of Holy Communion. Without him, you approach without the key. We strongly encourage you to seek a confessor before or alongside your next Communion. He is not a judge — he is a shepherd. Ask your church community; there is one waiting for you.",
    }
  }

  if (profile.lastReceived === "never") {
    return {
      canReceive: true,
      severity: "caution",
      restrictionType: "never-received",
      reason: "First time approaching",
      guidance:
        "You have never received Holy Communion. Do not let unfamiliarity become a wall between you and the altar. The Father sees you coming from a distance and runs to meet you. Begin with a thorough first confession — your spiritual father will guide you through what to say and how to prepare. Set a date. The Body and Blood of Christ are waiting to receive you.",
    }
  }

  if (profile.lastReceived === "over-six-months") {
    return {
      canReceive: true,
      severity: "caution",
      restrictionType: "long-gap",
      reason: "Long gap since last Communion",
      guidance:
        "It has been more than six months since your last Communion. Do not let the gap become a wall. The Father sees you returning from a distance and runs to meet you. Begin with a thorough confession — your spiritual father will receive you without judgement. Set a date on the calendar. The altar has been waiting.",
    }
  }

  return {
    canReceive: true,
    severity: "clear",
    reason: "Ready to begin preparation",
    guidance:
      "You are in a good position to prepare for Holy Communion. Use the calendar to plan your 3-day preparation window, set your Communion date, mark the fast timer, and guard the three days that follow with prayer and thanksgiving.",
  }
}
