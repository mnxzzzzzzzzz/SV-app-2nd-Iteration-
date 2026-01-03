import { useState } from "react";
import { Search, MapPin, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface Vendor {
  id: number;
  name: string;
  location: string;
  discount: string;
  category: string;
  logo: string;
  isPopular?: boolean;
}

export function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All" },
    { id: "entertainment", label: "Entertainment" },
    { id: "clothing", label: "Clothing" },
    { id: "food", label: "Food" },
  ];

  const vendors: Vendor[] = [
    {
      id: 1,
      name: "Campus Coffee",
      location: "University Mall, Ground Floor",
      discount: "15% OFF",
      category: "food",
      logo: "☕",
      isPopular: true,
    },
    {
      id: 2,
      name: "Tech Zone",
      location: "Tech Hub, Building A",
      discount: "20% OFF",
      category: "entertainment",
      logo: "💻",
    },
    {
      id: 3,
      name: "Style Studio",
      location: "Fashion Street, Shop 12",
      discount: "30% OFF",
      category: "clothing",
      logo: "👕",
      isPopular: true,
    },
    {
      id: 4,
      name: "Fresh Bites",
      location: "Food Court, Level 2",
      discount: "10% OFF",
      category: "food",
      logo: "🥗",
    },
    {
      id: 5,
      name: "Game Arena",
      location: "Entertainment Zone",
      discount: "25% OFF",
      category: "entertainment",
      logo: "🎮",
    },
    {
      id: 6,
      name: "Urban Threads",
      location: "Mall Central, Shop 8",
      discount: "40% OFF",
      category: "clothing",
      logo: "👟",
      isPopular: true,
    },
  ];

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || vendor.category === activeCategory;
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
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`font-body px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
              activeCategory === cat.id
                ? "bg-sv-azure text-white shadow-[0_8px_20px_rgba(41,98,255,0.3)]"
                : "bg-sv-glass-bg text-sv-text-muted border border-sv-glass-border hover:bg-sv-glass-highlight"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Vendor List */}
      <div className="flex flex-col gap-3">
        {filteredVendors.map((vendor, index) => (
          <motion.div
            key={vendor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-sv-glass-bg rounded-2xl p-4 border border-sv-glass-border flex items-center gap-4 hover:bg-sv-glass-highlight transition-colors cursor-pointer backdrop-blur-sm"
          >
            <div className="w-14 h-14 rounded-xl bg-sv-navy border border-sv-glass-border flex items-center justify-center text-2xl flex-shrink-0">
              {vendor.logo}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-heading text-sv-text-main font-semibold truncate">{vendor.name}</h4>
                {vendor.isPopular && (
                  <div className="bg-sv-gold/20 px-2 py-0.5 rounded-md border border-sv-gold/30 flex-shrink-0">
                    <span className="font-mono text-sv-gold text-[10px] font-semibold uppercase">Popular</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 text-sv-text-muted mb-2">
                <MapPin size={12} />
                <span className="font-body text-xs truncate">{vendor.location}</span>
              </div>
              <div className="bg-sv-azure/20 px-2 py-0.5 rounded-md border border-sv-azure/30 w-fit">
                <span className="font-mono text-sv-azure text-xs font-semibold uppercase">{vendor.discount}</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-sv-glass-bg flex items-center justify-center border border-sv-glass-border flex-shrink-0">
              <ChevronRight size={16} className="text-sv-text-muted" />
            </div>
          </motion.div>
        ))}

        {filteredVendors.length === 0 && (
          <div className="text-center py-12">
            <p className="font-body text-sv-text-muted">No vendors found</p>
          </div>
        )}
      </div>
    </div>
  );
}
