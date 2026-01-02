"use client"

import { useState } from "react"
import { Search, MapPin, Clock, ArrowLeft } from "lucide-react"
import { motion } from "motion/react"
import type { Merchant } from "./types"

interface MerchantListProps {
  onSelectMerchant: (merchant: Merchant) => void
  onBack: () => void
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

export function MerchantList({ onSelectMerchant, onBack }: MerchantListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMerchants = MOCK_MERCHANTS.filter(
    (merchant) =>
      merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.category?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-4 p-4 border-b border-sv-glass-border bg-sv-glass-bg backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-sv-glass-highlight rounded-xl transition-colors" aria-label="Go back">
            <ArrowLeft className="size-5 text-sv-text-main" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-sv-text-main">Student Discounts</h1>
            <p className="text-sm text-sv-text-muted">Find and redeem exclusive offers</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-sv-text-muted" />
          <input
            type="search"
            placeholder="Search merchants or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-sv-navy border border-sv-glass-border rounded-xl text-sv-text-main placeholder:text-sv-text-muted focus:outline-none focus:border-sv-azure transition-colors"
          />
        </div>
      </div>

      {/* Merchant Cards */}
      <div className="flex-1 overflow-y-auto p-4 bg-sv-navy">
        <div className="grid gap-3">
          {filteredMerchants.map((merchant, index) => (
            <motion.div
              key={merchant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => onSelectMerchant(merchant)}
              className="bg-sv-glass-bg border border-sv-glass-border rounded-xl p-4 cursor-pointer hover:border-sv-azure transition-all active:scale-[0.98] backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                {/* Logo */}
                <div className="size-12 rounded-xl overflow-hidden bg-white shrink-0">
                  <img
                    src={merchant.logo || "/studentverse-symbol.svg"}
                    alt={merchant.name}
                    className="size-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-base leading-tight mb-0.5 text-sv-text-main">{merchant.name}</h3>
                      <p className="text-xs text-sv-text-muted">{merchant.category}</p>
                    </div>
                    <span className="bg-success text-white text-xs font-semibold px-2.5 py-1 rounded-lg shrink-0">
                      {merchant.discount}% OFF
                    </span>
                  </div>

                  {/* Info Row */}
                  <div className="flex items-center gap-4 text-xs text-sv-text-muted">
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
            </motion.div>
          ))}

          {filteredMerchants.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="size-12 text-sv-text-muted/50 mb-3" />
              <h3 className="font-semibold mb-1 text-sv-text-main">No merchants found</h3>
              <p className="text-sm text-sv-text-muted">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
