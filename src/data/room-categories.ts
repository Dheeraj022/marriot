import { RoomCategory, AmenityItem, DiningItem } from "@/types/property";

export const ROOM_CATEGORIES: RoomCategory[] = [
  {
    id: "guest-room",
    title: "Guest Room",
    tagline: "Smart, Contemporary & Intuitive Comfort",
    description: "Carefully designed contemporary room featuring plush signature bedding, ergonomic workspace, and modern ensuite bathroom.",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
    features: ["High-speed Wi-Fi", "Dedicated work desk", "LED TV & media hub", "Tea/coffee maker"],
    capacityNote: "Suitable for up to 2 adults",
  },
  {
    id: "twin-room",
    title: "Twin Room",
    tagline: "Versatile Comfort for Shared Travel",
    description: "Thoughtfully arranged room with two comfortable twin beds, dedicated workspace, and refined amenities ideal for colleagues or friends.",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
    features: ["Two twin beds", "Ergonomic work desk", "Rainfall shower", "Complimentary Wi-Fi"],
    capacityNote: "Suitable for 2 adults",
  },
  {
    id: "premium-room",
    title: "Premium Room",
    tagline: "Enhanced Space with Scenic City Vistas",
    description: "Enhanced space on higher floors with panoramic city views, elevated amenities, and thoughtful details tailored for corporate productivity.",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
    features: ["Higher floor location", "Panoramic views", "Enhanced bath amenities", "High-speed Wi-Fi"],
    capacityNote: "Suitable for up to 3 adults",
  },
  {
    id: "terrace-room",
    title: "Terrace Room",
    tagline: "Private Open-Air Terrace & Scenic Relaxation",
    description: "Exclusive room opening onto a private outdoor terrace with relaxing outdoor seating, fresh breezes, and scenic surroundings.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    features: ["Private outdoor terrace", "Outdoor patio seating", "Plush king bed", "Express stay coordination"],
    capacityNote: "Suitable for up to 2 adults",
  },
  {
    id: "junior-suite",
    title: "Junior Suite",
    tagline: "Integrated Living Area & Boutique Luxury",
    description: "Expansive layout with an integrated living lounge, plush sofa, walk-in dressing space, and luxurious ensuite bath.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    features: ["Integrated living lounge", "Walk-in closet", "Deep soaking tub", "VIP arrival amenities"],
    capacityNote: "Ideal for couples & small families",
  },
  {
    id: "executive-suite",
    title: "Executive Suite",
    tagline: "The Pinnacle of Sophistication & Space",
    description: "Prestigious multi-room suite featuring a private master bedroom, separate dining and living salon, and VIP executive privileges.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    features: ["Separate living room & bedroom", "Dining area", "Panoramic corner views", "Executive lounge access"],
    capacityNote: "Ideal for extended stays & VIP travel",
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
