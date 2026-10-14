export type Region = "North" | "South" | "West" | "East" | "Central";

export interface Property {
  slug: string;
  name: string;
  city: string;
  state: string;
  region: Region;
  heroImage: string;
  gallery?: string[];
  tagline: string;
  description: string;
  phone?: string;
  isFeatured?: boolean;
  amenities: string[];
  roomTypes: string[];
  nearbyAttractions?: string[];
  checkInTime?: string;
  checkOutTime?: string;
}

export interface RoomCategory {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  capacityNote: string;
}

export interface AmenityItem {
  iconName: string;
  title: string;
  description: string;
}

export interface DiningItem {
  title: string;
  category: string;
  description: string;
  image: string;
  cuisine: string;
}
