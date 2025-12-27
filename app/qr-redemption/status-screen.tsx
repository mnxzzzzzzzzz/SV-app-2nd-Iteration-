"use client"

import { CheckCircle2, XCircle, Clock, Smartphone, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { RedemptionStatus, Merchant } from "./types"

interface StatusScreenProps {
  status: RedemptionStatus
  merchant: Merchant
  onClose: () => void
}

const STATUS_CONFIG = {
  success: {
    icon: CheckCircle2,
    title: "Discount Applied!",
    subtitle: "Your discount has been successfully redeemed",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-900",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    textColor: "text-emerald-900 dark:text-emerald-100",
  },
  expired: {
    icon: Clock,
    title: "QR Code Expired",
    subtitle: "The QR code has timed out",
    message: "Please generate a new code to redeem",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-900",
    iconColor: "text-red-600 dark:text-red-400",
    textColor: "text-red-900 dark:text-red-100",
  },
  "already-used": {
    icon: XCircle,
    title: "Already Redeemed",
    subtitle: "You have already used this discount today",
    message: "Come back tomorrow for another discount",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-900",
    iconColor: "text-red-600 dark:text-red-400",
    textColor: "text-red-900 dark:text-red-100",
  },
  "wrong-device": {
    icon: Smartphone,
    title: "Device Mismatch",
    subtitle: "This code was generated on a different device",
    message: "Please use the device you generated the code on",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-900",
    iconColor: "text-red-600 dark:text-red-400",
    textColor: "text-red-900 dark:text-red-100",
  },
  "cap-hit": {
    icon: TrendingUp,
    title: "Daily Limit Reached",
    subtitle: "Maximum redemptions reached for today",
    message: "Try again tomorrow or explore other merchants",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-900",
    iconColor: "text-red-600 dark:text-red-400",
    textColor: "text-red-900 dark:text-red-100",
  },
} as const

export function StatusScreen({ status, merchant, onClose }: StatusScreenProps) {
  const config = STATUS_CONFIG[status]
  const Icon = config.icon
  const isSuccess = status === "success"

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Status Icon */}
        <div
          className={cn(
            "size-24 rounded-full flex items-center justify-center mb-6",
            config.bgColor,
            "border-4",
            config.borderColor,
          )}
        >
          <Icon className={cn("size-12", config.iconColor)} strokeWidth={2.5} />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2 text-center">{config.title}</h1>
        <p className="text-muted-foreground text-center mb-6">{config.subtitle}</p>

        {/* Merchant Info */}
        <div className="w-full max-w-sm mb-6">
          <div className={cn("p-4 rounded-lg border-2 flex items-center gap-3", config.bgColor, config.borderColor)}>
            <div className="size-12 rounded-lg overflow-hidden bg-white shrink-0">
              <img src={merchant.logo || "/placeholder.svg"} alt={merchant.name} className="size-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold">{merchant.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    isSuccess &&
                      "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-300",
                  )}
                >
                  {merchant.discount}% OFF
                </Badge>
                {isSuccess && <span className="text-xs text-muted-foreground">Applied</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Message */}
        {config.message && (
          <div className={cn("w-full max-w-sm p-4 rounded-lg border", config.bgColor, config.borderColor)}>
            <p className={cn("text-sm text-center", config.textColor)}>{config.message}</p>
          </div>
        )}

        {/* Error Chips (for failed states) */}
        {!isSuccess && (
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {status === "expired" && (
              <Badge variant="outline" className="bg-background">
                <Clock className="size-3 mr-1" />
                Expired
              </Badge>
            )}
            {status === "already-used" && (
              <Badge variant="outline" className="bg-background">
                <XCircle className="size-3 mr-1" />
                Already used
              </Badge>
            )}
            {status === "wrong-device" && (
              <Badge variant="outline" className="bg-background">
                <Smartphone className="size-3 mr-1" />
                Wrong device
              </Badge>
            )}
            {status === "cap-hit" && (
              <Badge variant="outline" className="bg-background">
                <TrendingUp className="size-3 mr-1" />
                Cap hit
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t space-y-2">
        <Button className="w-full" onClick={onClose}>
          {isSuccess ? "Done" : "Back to Merchants"}
        </Button>
        {!isSuccess && (
          <Button variant="outline" className="w-full bg-transparent" onClick={onClose}>
            Try Another Merchant
          </Button>
        )}
      </div>
    </div>
  )
}
