import { useState } from "react";
import { Search, MapPin, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { BRAND_OFFERS, CATEGORIES } from "../../../data/brandOffers";

interface SearchScreenProps {
  onOfferClick?: (offerId: string) => void;
}

export function SearchScreen({ onOfferClick }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredOffers = BRAND_OFFERS.filter((offer) => {
    const matchesSearch = offer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.dealTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || offer.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col pb-24 px-5 pt-6" style={{ backgroundColor: '#080C1F' }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-sv-text-main font-bold text-2xl mb-1">Search</h1>
        <p className="font-body text-sv-text-muted text-sm">Find merchants, cafes, and brands</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Search className="w-5 h-5 text-sv-text-muted" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search merchants, cafes, brands…"
          className="font-body w-full bg-sv-glass-bg border border-sv-glass-border rounded-2xl pl-12 pr-4 py-4 text-sv-text-main placeholder:text-sv-text-muted focus:outline-none focus:border-sv-azure transition-colors backdrop-blur-sm"
        />
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`font-body px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
              activeCategory === cat
                ? "bg-sv-azure text-white shadow-[0_8px_20px_rgba(41,98,255,0.3)]"
                : "bg-sv-glass-bg text-sv-text-muted border border-sv-glass-border hover:bg-sv-glass-highlight"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Offer List */}
      <div className="flex flex-col gap-3">
        {filteredOffers.map((offer, index) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onOfferClick?.(offer.id)}
            className="bg-sv-glass-bg rounded-2xl p-4 border border-sv-glass-border flex items-center gap-4 hover:bg-sv-glass-highlight transition-colors cursor-pointer backdrop-blur-sm"
          >
            <div className="w-14 h-14 rounded-xl bg-sv-navy border border-sv-glass-border flex items-center justify-center overflow-hidden flex-shrink-0">
              {offer.logoSrc ? (
                <img src={offer.logoSrc} alt={offer.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl">🏪</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-heading text-sv-text-main font-semibold truncate">{offer.name}</h4>
              </div>
              <p className="font-body text-sv-text-muted text-xs mb-2 truncate">{offer.dealTitle}</p>
              <div className="flex items-center gap-3">
                <div className="bg-sv-azure/20 px-2 py-0.5 rounded-md border border-sv-azure/30 w-fit">
                  <span className="font-mono text-sv-azure text-xs font-semibold uppercase">{offer.discount} OFF</span>
                </div>
                {offer.distance && (
                  <div className="flex items-center gap-1 text-sv-text-muted">
                    <MapPin size={12} />
                    <span className="font-body text-xs">{offer.distance}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-sv-glass-bg flex items-center justify-center border border-sv-glass-border flex-shrink-0">
              <ChevronRight size={16} className="text-sv-text-muted" />
            </div>
          </motion.div>
        ))}

        {filteredOffers.length === 0 && (
          <div className="text-center py-12">
            <p className="font-body text-sv-text-muted">No offers found</p>
          </div>
        )}
      </div>
    </div>
  );
}
