export interface BrandOffer {
  id: string;
  name: string;
  description: string;
  category: string;
  discount: string;
  distance?: string;
  logoSrc?: string;
  dealTitle: string;
  dealDescription: string;
  validUntil: string;
}

export const BRAND_OFFERS: BrandOffer[] = [
  {
    id: "coffee-planet",
    name: "Coffee Planet",
    description: "Fresh brewed coffee & snacks",
    category: "Cafe",
    discount: "20%",
    distance: "40m",
    logoSrc: "/coffee-planet.png",
    dealTitle: "Exclusive Matcha Deals",
    dealDescription: "Get 20% off on all matcha drinks and pastries",
    validUntil: "Dec 31, 2025",
  },
  {
    id: "filli-cafe",
    name: "Filli Café",
    description: "Traditional chai & beverages",
    category: "Cafe",
    discount: "15%",
    distance: "120m",
    logoSrc: "/filli.png",
    dealTitle: "Irresistible Donut Deals",
    dealDescription: "15% off on all donuts and chai combos",
    validUntil: "Dec 31, 2025",
  },
  {
    id: "b60",
    name: "B60",
    description: "Retro dining experience",
    category: "Restaurant",
    discount: "25%",
    distance: "200m",
    logoSrc: "/b60.jpg",
    dealTitle: "Student Lunch Special",
    dealDescription: "25% off on weekday lunch combos",
    validUntil: "Dec 31, 2025",
  },
  {
    id: "book-corner",
    name: "Book Corner",
    description: "Textbooks & stationery",
    category: "Retail",
    discount: "10%",
    distance: "350m",
    dealTitle: "Back to School Sale",
    dealDescription: "10% off on all textbooks and stationery",
    validUntil: "Jan 15, 2026",
  },
];

export const CATEGORIES = ["All", "Cafe", "Restaurant", "Retail", "Entertainment"];
