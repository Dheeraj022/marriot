"use client";

import React from "react";
import {
  UtensilsCrossed,
  Martini,
  Waves,
  Sparkles,
  Dumbbell,
  Briefcase,
  Laptop,
  Wifi,
  PlaneTakeoff,
  CircleParking,
  BellRing,
  Shirt,
  ShieldCheck,
} from "lucide-react";

interface Amenity {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const HOTEL_AMENITIES: Amenity[] = [
  {
    title: "All Day Dining",
    icon: UtensilsCrossed,
  },
  {
    title: "Bar & Lounge",
    icon: Martini,
  },
  {
    title: "Swimming Pool",
    icon: Waves,
  },
  {
    title: "Spa & Wellness",
    icon: Sparkles,
  },
  {
    title: "Fitness Centre",
    icon: Dumbbell,
  },
  {
    title: "Meetings & Event Spaces",
    icon: Briefcase,
  },
  {
    title: "Business Centre",
    icon: Laptop,
  },
  {
    title: "Free Wi-Fi",
    icon: Wifi,
  },
  {
    title: "Airport Connectivity",
    icon: PlaneTakeoff,
  },
  {
    title: "Parking Facility",
    icon: CircleParking,
  },
  {
    title: "24/7 Front Desk",
    icon: BellRing,
  },
  {
    title: "Laundry Service",
    icon: Shirt,
  },
];

export function AmenitiesSection() {
  return (
    <section id="amenities" className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-24">
      {/* Heading & Subtitle */}
      <div className="mb-6 sm:mb-8 text-left">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#F7F8FA] tracking-tight">
          Hotel Amenities &amp; Facilities
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#C4D1DF] mt-1.5 leading-relaxed font-light">
          Enjoy a range of world-class amenities for a comfortable and convenient stay.
        </p>
      </div>

      {/* Grid: 3 columns on mobile -> 4 columns on tablet -> 6 columns on computer screens */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3.5 md:gap-4">
        {HOTEL_AMENITIES.map((amenity, idx) => {
          const Icon = amenity.icon;
          return (
            <div
              key={idx}
              className="bg-[#06172A]/85 hover:bg-[#0A2340] border border-[#14324F] hover:border-[#F6B936]/60 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 md:p-3.5 flex flex-col items-center justify-center text-center aspect-square md:aspect-auto md:h-28 lg:h-30 transition-all duration-200 group shadow-md shadow-black/20 hover:shadow-xl hover:-translate-y-0.5"
            >
              {/* Golden Yellow Icon */}
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-6 md:h-6 text-[#F6B936] mb-1.5 sm:mb-2 stroke-[1.8] group-hover:scale-110 transition-transform duration-200 shrink-0" />

              {/* Amenity Title */}
              <span className="text-[10px] sm:text-xs md:text-xs font-semibold text-[#F7F8FA] leading-tight text-center">
                {amenity.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Under-amenities notice */}
      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-xs text-[#8ba2bc] text-center">
        <ShieldCheck className="w-3.5 h-3.5 text-[#F6B936] shrink-0" />
        <span>
          * Amenities shown are for reference only. Availability, access, timings and inclusions may vary.
        </span>
      </div>
    </section>
  );
}
