export interface SVPayMerchant {
  id: string
  name: string
  logo: string
  location: string
  discount: number
  distance: string
}

export type SVPayStatus = "idle" | "checking" | "eligible" | "success" | "error-duplicate" | "error-ineligible"

export interface EligibilityCheck {
  isEligible: boolean
  reason?: string
  usesRemaining?: number
}
