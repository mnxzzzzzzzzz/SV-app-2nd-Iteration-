"use client"

import { useState } from "react"
import { Search, MapPin, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Merchant } from "./types"

interface MerchantListProps {
  onSelectMerchant: (merchant: Merchant) => void
}

const MOCK_MERCHANTS: Merchant[] = [
  {
    id: "1",
    name: "Campus Coffee",
    logo: "/coffee-shop-logo.png",
    discount: 20,
    distance: "0.2 km",
    usesPerDay: 1,
    expiryTime: "23:59",
    category: "Food & Beverage",
  },
  {
    id: "2",
    name: "BookStore Plus",
    logo: "/bookstore-logo.jpg",
    discount: 15,
    distance: "0.5 km",
    usesPerDay: 1,
    expiryTime: "23:59",
    category: "Retail",
  },
  {
    id: "3",
    name: "Tech Supplies Co",
    logo: "/tech-store-logo.png",
    discount: 25,
    distance: "0.8 km",
    usesPerDay: 1,
    expiryTime: "23:59",
    category: "Electronics",
  },
  {
    id: "4",
    name: "Fitness Hub",
    logo: "/abstract-gym-logo.png",
    discount: 30,
    distance: "1.2 km",
    usesPerDay: 1,
    expiryTime: "23:59",
    category: "Health & Fitness",
  },
]

export function MerchantList({ onSelectMerchant }: MerchantListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMerchants = MOCK_MERCHANTS.filter(
    (merchant) =>
      merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.category?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex flex-col gap-4 p-4 border-b">
        <div>
          <h1 className="text-2xl font-bold">Student Discounts</h1>
          <p className="text-sm text-muted-foreground">Find and redeem exclusive offers</p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search merchants or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Merchant Cards */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid gap-3">
          {filteredMerchants.map((merchant) => (
            <Card
              key={merchant.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]"
              onClick={() => onSelectMerchant(merchant)}
            >
              <div className="flex items-start gap-4">
                {/* Logo */}
                <div className="size-12 rounded-lg overflow-hidden bg-secondary shrink-0">
                  <img
                    src={merchant.logo || "/placeholder.svg"}
                    alt={merchant.name}
                    className="size-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-base leading-tight mb-0.5">{merchant.name}</h3>
                      <p className="text-xs text-muted-foreground">{merchant.category}</p>
                    </div>
                    <Badge className="bg-emerald-500 text-white border-0 shrink-0">{merchant.discount}% OFF</Badge>
                  </div>

                  {/* Info Row */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="size-3" />
                      <span>{merchant.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="size-3" />
                      <span>
                        {merchant.usesPerDay} use/day • Expires {merchant.expiryTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {filteredMerchants.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="size-12 text-muted-foreground/50 mb-3" />
              <h3 className="font-semibold mb-1">No merchants found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
