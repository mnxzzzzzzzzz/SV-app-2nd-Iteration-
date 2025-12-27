export interface Merchant {
  id: string
  name: string
  logo: string
  discount: number
  distance: string
  location: string
  usesPerDay: number
  expiresAt: string
}

export interface QRCode {
  code: string
  otp: string
  expiresAt: Date
  merchantId: string
}

export interface User {
  id: string
  email: string
  emailVerified: boolean
  twoFactorEnabled: boolean
  biometricEnabled: boolean
}

export interface PlanOption {
  id: string
  title: string
  description: string
  time: string
  budget: string
  dietary: string[]
  stops: string[]
}

export type RedemptionStatus = "active" | "success" | "error"
export type ErrorReason = "expired" | "used" | "wrong-device" | "cap-hit"
