import { RoomCategory, AmenityItem, DiningItem } from "@/types/property";

export const ROOM_CATEGORIES: RoomCategory[] = [
  {
    id: "deluxe-room",
    title: "Deluxe Room",
    tagline: "Comfortable Elegance for Business & Leisure",
    description: "Carefully designed contemporary room featuring plush signature bedding, ergonomic workspace, and modern ensuite bathroom.",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
    features: ["High-speed Wi-Fi", "Dedicated work desk", "LED TV & media hub", "Tea/coffee maker"],
    capacityNote: "Suitable for up to 2 adults (confirm specific room layout on enquiry)",
  },
  {
    id: "executive-room",
    title: "Executive Room",
    tagline: "Elevated Stays for Discerning Travellers",
    description: "Enhanced space with premium city or courtyard vistas, elevated amenities, and thoughtful details tailored for corporate productivity.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    features: ["Premium floor location", "Express check-in assistance", "Enhanced bath essentials", "Complimentary Wi-Fi"],
    capacityNote: "Suitable for business travellers & couples",
  },
  {
    id: "suite",
    title: "Courtyard Suite",
    tagline: "Spacious Luxury & Distinguished Ambiance",
    description: "Generously proportioned suite with expansive lounging area, scenic views, and curated hospitality touches for memorable family or VIP stays.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    features: ["Expansive living space", "Luxury bath fittings", "Panoramic city/lake views", "Personalized attention"],
    capacityNote: "Ideal for extended stays and family travel",
  },
  {
    id: "standard-room",
    title: "Standard Guest Room",
    tagline: "Essential Comfort & Modern Efficiency",
    description: "Smart and functional guest room equipped with all core essentials for short city transits and focused work trips.",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
    features: ["High-speed connectivity", "In-room safe", "Soundproof glazing", "Climate control"],
    capacityNote: "Ideal for solo travellers & transit stays",
  },
];

export const AMENITIES_LIST: AmenityItem[] = [
  {
    iconName: "Utensils",
    title: "All-Day Dining",
    description: "Gourmet multi-cuisine buffets, authentic regional specialties, and signature patisseries.",
  },
  {
    iconName: "Wine",
    title: "Bar & Lounge",
    description: "Handcrafted cocktails, fine spirits, and artisanal appetizers in an ambient setting.",
  },
  {
    iconName: "Waves",
    title: "Swimming Pool",
    description: "Refreshing outdoor or rooftop swimming pools with sundecks and comfortable cabanas.",
  },
  {
    iconName: "Sparkles",
    title: "Spa & Wellness",
    description: "Rejuvenating massages, holistic therapies, and relaxing steam facilities.",
  },
  {
    iconName: "Dumbbell",
    title: "24/7 Fitness Centre",
    description: "State-of-the-art cardiovascular machines, strength equipment, and free weights.",
  },
  {
    iconName: "Calendar",
    title: "Meetings & Events",
    description: "Versatile ballrooms and breakout boardrooms with advanced audiovisual capabilities.",
  },
  {
    iconName: "Wifi",
    title: "High-Speed Wi-Fi",
    description: "Seamless high-bandwidth internet connectivity throughout rooms and public zones.",
  },
  {
    iconName: "Car",
    title: "Airport Transfers & Parking",
    description: "Dedicated airport transit coordination, valet parking, and secure EV charging stations.",
  },
];

export const DINING_ITEMS: DiningItem[] = [
  {
    title: "MoMo Cafe & All-Day Dining",
    category: "Signature Restaurant",
    description: "Interactive live cooking stations serving international buffets, traditional Indian recipes, and customized breakfast spreads.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    cuisine: "Multi-Cuisine Buffet & A la Carte",
  },
  {
    title: "MoMo 2 Go & Patisserie",
    category: "Gourmet Deli",
    description: "Artisanal single-origin coffees, fresh oven-baked viennoiseries, delicate pastries, and quick grab-and-go treats.",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    cuisine: "Bakery, Gourmet Coffee & Snacks",
  },
  {
    title: "The Lounge & Bar",
    category: "Evening Bar",
    description: "An intimate evening destination offering premium malts, curated cocktails, and pairing tapas crafted by resident mixologists.",
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
    cuisine: "Signature Cocktails & Small Plates",
  },
];
