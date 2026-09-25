import type { Store, CityInfo } from "@/types/store";

export const STORES: Store[] = [
  // ── Bengaluru ──────────────────────────────────────────────
  {
    id: "store-blr-01",
    slug: "indiranagar-bangalore",
    name: "Indiranagar Experience Flagship",
    citySlug: "bengaluru",
    cityName: "Bengaluru",
    state: "Karnataka",
    area: "100 Feet Road, Indiranagar",
    address: "#482, 100 Feet Road, HAL 2nd Stage, Indiranagar",
    pincode: "560038",
    landmark: "Opposite Starbucks & Near 12th Main Junction",
    timings: "10:00 AM – 9:30 PM",
    days: "Monday – Sunday (All 7 Days)",
    phone: "+91 80 4123 4567",
    whatsapp: "+91 98800 12345",
    email: "indiranagar@nutzfruits.com",
    mapUrl: "https://maps.google.com/?q=Nutz+N+Fruitz+Indiranagar+100+Feet+Road+Bangalore",
    features: [
      "Live Tasting Bar",
      "Fresh Nut Butter Churner",
      "Bespoke Hamper Lounge",
      "Cold-Pressed Oil Counter",
      "Barista Coffee & Nut Mylk",
    ],
    image: "https://placehold.co/800x600/285542/F5F1E6?text=Indiranagar+Flagship",
    rating: { average: 4.9, count: 482 },
    isFlagship: true,
  },
  {
    id: "store-blr-02",
    slug: "jayanagar-bangalore",
    name: "Jayanagar Heritage Boutique",
    citySlug: "bengaluru",
    cityName: "Bengaluru",
    state: "Karnataka",
    area: "4th Block, Jayanagar",
    address: "#12, 11th Main Road, 4th Block, Jayanagar",
    pincode: "560011",
    landmark: "Near Jayanagar Shopping Complex & Cosmos Club",
    timings: "10:00 AM – 9:00 PM",
    days: "Monday – Sunday (All 7 Days)",
    phone: "+91 80 4123 7890",
    whatsapp: "+91 98800 12346",
    email: "jayanagar@nutzfruits.com",
    mapUrl: "https://maps.google.com/?q=Nutz+N+Fruitz+Jayanagar+4th+Block+Bangalore",
    features: [
      "Spice Aroma Bar",
      "Traditional Festive Hampers",
      "Quick Order Pickup",
      "Nutrient Consultation Desk",
    ],
    image: "https://placehold.co/800x600/3D2B1A/F5F1E6?text=Jayanagar+Boutique",
    rating: { average: 4.8, count: 326 },
    isFlagship: false,
  },
  {
    id: "store-blr-03",
    slug: "whitefield-bangalore",
    name: "Whitefield Gourmet Lounge",
    citySlug: "bengaluru",
    cityName: "Bengaluru",
    state: "Karnataka",
    area: "ITPB Main Road, Whitefield",
    address: "Ground Floor, Nexus Shantiniketan Mall, Whitefield Main Road",
    pincode: "560066",
    landmark: "Near ITPB Main Gate",
    timings: "10:30 AM – 10:00 PM",
    days: "Monday – Sunday (All 7 Days)",
    phone: "+91 80 4123 9911",
    whatsapp: "+91 98800 12347",
    email: "whitefield@nutzfruits.com",
    mapUrl: "https://maps.google.com/?q=Nutz+N+Fruitz+Whitefield+Shantiniketan+Bangalore",
    features: [
      "Corporate Gifting Desk",
      "Nut Mix DIY Dispenser",
      "Curated Exotic Dry Fruits",
      "Express Delivery Hub",
    ],
    image: "https://placehold.co/800x600/687653/F5F1E6?text=Whitefield+Lounge",
    rating: { average: 4.7, count: 214 },
    isFlagship: false,
  },

  // ── Mumbai ─────────────────────────────────────────────────
  {
    id: "store-bom-01",
    slug: "bandra-mumbai",
    name: "Bandra West Flagship Store",
    citySlug: "mumbai",
    cityName: "Mumbai",
    state: "Maharashtra",
    area: "Linking Road, Bandra West",
    address: "#77, Linking Road, Khar-Bandra West Junction, Mumbai",
    pincode: "400052",
    landmark: "Opposite Marks & Spencer",
    timings: "10:30 AM – 10:00 PM",
    days: "Monday – Sunday (All 7 Days)",
    phone: "+91 22 2640 1234",
    whatsapp: "+91 98200 45678",
    email: "bandra@nutzfruits.com",
    mapUrl: "https://maps.google.com/?q=Nutz+N+Fruitz+Linking+Road+Bandra+West+Mumbai",
    features: [
      "Royal Medjool Dates Cellar",
      "VIP Gifting Suite",
      "Artisan Snack Tasting Bar",
      "Live Fresh Almond Roasting",
      "Valet Parking Available",
    ],
    image: "https://placehold.co/800x600/1D4031/FFF8EE?text=Bandra+West+Flagship",
    rating: { average: 4.9, count: 590 },
    isFlagship: true,
  },
  {
    id: "store-bom-02",
    slug: "juhu-mumbai",
    name: "Juhu Signature Boutique",
    citySlug: "mumbai",
    cityName: "Mumbai",
    state: "Maharashtra",
    area: "JVPD Scheme, Juhu",
    address: "#14, Gulmohar Road, JVPD Scheme, Juhu, Mumbai",
    pincode: "400049",
    landmark: "Near Juhu Gymkhana & Cooper Hospital",
    timings: "10:00 AM – 9:30 PM",
    days: "Monday – Sunday (All 7 Days)",
    phone: "+91 22 2620 5678",
    whatsapp: "+91 98200 45679",
    email: "juhu@nutzfruits.com",
    mapUrl: "https://maps.google.com/?q=Nutz+N+Fruitz+Gulmohar+Road+Juhu+Mumbai",
    features: [
      "Organic Kerala Spices Vault",
      "Luxury Keepsake Boxes",
      "Wellness Tasting Sessions",
      "Curated Festive Hampers",
    ],
    image: "https://placehold.co/800x600/A89550/285542?text=Juhu+Signature+Boutique",
    rating: { average: 4.8, count: 318 },
    isFlagship: false,
  },

  // ── Delhi NCR ──────────────────────────────────────────────
  {
    id: "store-del-01",
    slug: "khan-market-delhi",
    name: "Khan Market Experience Store",
    citySlug: "delhi",
    cityName: "Delhi NCR",
    state: "Delhi",
    area: "Middle Lane, Khan Market",
    address: "#34-A, Middle Lane, Khan Market, New Delhi",
    pincode: "110003",
    landmark: "Next to Bahrisons Booksellers",
    timings: "10:00 AM – 9:00 PM",
    days: "Monday – Sunday (All 7 Days)",
    phone: "+91 11 4350 7890",
    whatsapp: "+91 98110 88990",
    email: "khanmarket@nutzfruits.com",
    mapUrl: "https://maps.google.com/?q=Nutz+N+Fruitz+Khan+Market+New+Delhi",
    features: [
      "Gourmet Kashmiri Walnuts Tasting",
      "Wedding Gifting Atelier",
      "Custom Monogrammed Boxes",
      "Rare Saffron & Spice Vault",
    ],
    image: "https://placehold.co/800x600/285542/FFF8EE?text=Khan+Market+Delhi",
    rating: { average: 4.9, count: 412 },
    isFlagship: true,
  },
  {
    id: "store-del-02",
    slug: "dlf-phase-5-gurugram",
    name: "Gurugram Horizon Pavilion",
    citySlug: "delhi",
    cityName: "Delhi NCR",
    state: "Haryana",
    area: "Golf Course Road, DLF Phase 5",
    address: "Unit #G-08, One Horizon Center, Golf Course Road, Gurugram",
    pincode: "122002",
    landmark: "One Horizon Center Plaza",
    timings: "10:30 AM – 10:00 PM",
    days: "Monday – Sunday (All 7 Days)",
    phone: "+91 124 4980 112",
    whatsapp: "+91 98110 88991",
    email: "gurugram@nutzfruits.com",
    mapUrl: "https://maps.google.com/?q=Nutz+N+Fruitz+One+Horizon+Center+Gurugram",
    features: [
      "B2B Corporate Gifting Lounge",
      "Cold-Storage Date Vault",
      "Nut Milk Shake Bar",
      "Same-Day NCR Express Pickup",
    ],
    image: "https://placehold.co/800x600/3D2B1A/FFF8EE?text=Gurugram+Horizon",
    rating: { average: 4.8, count: 285 },
    isFlagship: false,
  },

  // ── Hyderabad ──────────────────────────────────────────────
  {
    id: "store-hyd-01",
    slug: "jubilee-hills-hyderabad",
    name: "Jubilee Hills Grand Store",
    citySlug: "hyderabad",
    cityName: "Hyderabad",
    state: "Telangana",
    area: "Road No. 36, Jubilee Hills",
    address: "#293/A, Road Number 36, CBI Colony, Jubilee Hills, Hyderabad",
    pincode: "500033",
    landmark: "Near Peddamma Temple Metro Station",
    timings: "10:00 AM – 9:30 PM",
    days: "Monday – Sunday (All 7 Days)",
    phone: "+91 40 2355 6789",
    whatsapp: "+91 98490 11223",
    email: "jubileehills@nutzfruits.com",
    mapUrl: "https://maps.google.com/?q=Nutz+N+Fruitz+Road+36+Jubilee+Hills+Hyderabad",
    features: [
      "Grand Festive Tasting Bar",
      "Nizami Royal Hamper Suite",
      "Custom Engraved Wooden Boxes",
      "Imported Pistachio Roaster",
      "Dedicated Valet",
    ],
    image: "https://placehold.co/800x600/687653/FFF8EE?text=Jubilee+Hills+Hyderabad",
    rating: { average: 4.9, count: 370 },
    isFlagship: true,
  },
];

export const CITIES: CityInfo[] = [
  {
    slug: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    tagline: "Garden City's favorite gourmet dry fruits & nuts experiential tasting bars.",
    description:
      "Visit our experience stores in Indiranagar, Jayanagar, and Whitefield for live-churned almond butter, fresh roasts, and custom bespoke gifting hampers.",
    storeCount: 3,
    heroImage: "https://placehold.co/1200x500/285542/F5F1E6?text=Bengaluru+Stores",
  },
  {
    slug: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    tagline: "Flagship luxury tasting lounges in Bandra and Juhu.",
    description:
      "Explore the finest imported Royal Medjool dates, California almonds, and bespoke corporate and wedding gift hampers in Maximum City.",
    storeCount: 2,
    heroImage: "https://placehold.co/1200x500/1D4031/FFF8EE?text=Mumbai+Stores",
  },
  {
    slug: "delhi",
    name: "Delhi NCR",
    state: "Delhi & Haryana",
    tagline: "Boutiques in Khan Market & Gurugram Horizon Plaza.",
    description:
      "Discover authentic Kashmiri walnuts, Himalayan dried fruits, and royal festive hampers with dedicated personal gifting curators.",
    storeCount: 2,
    heroImage: "https://placehold.co/1200x500/3D2B1A/FFF8EE?text=Delhi+NCR+Stores",
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    tagline: "Grand experiential store in Jubilee Hills.",
    description:
      "Experience royal dry fruit gifting with Nizami heritage hampers, live pistachio roasting, and artisanal nut confectioneries.",
    storeCount: 1,
    heroImage: "https://placehold.co/1200x500/687653/FFF8EE?text=Hyderabad+Stores",
  },
];

/* ── Store Accessor Functions ─────────────────────────────── */

export function getAllStores(): Store[] {
  return STORES;
}

export function getStoreBySlug(slug: string): Store | undefined {
  return STORES.find((s) => s.slug === slug);
}

export function getStoresByCity(citySlug: string): Store[] {
  return STORES.filter((s) => s.citySlug === citySlug);
}

export function getAllCities(): CityInfo[] {
  return CITIES;
}

export function getCityBySlug(slug: string): CityInfo | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getFeaturedStores(): Store[] {
  return STORES.filter((s) => s.isFlagship);
}
