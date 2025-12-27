export interface Merchant {
  id: string
  name: string
  logo: string
  discount: number
  distance: string
  usesPerDay: number
  expiryTime: string
  category?: string
}

export type RedemptionStatus = "active" | "success" | "expired" | "already-used" | "wrong-device" | "cap-hit"
