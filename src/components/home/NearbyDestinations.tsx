"use client";

import React from "react";
import { ChevronRight, Compass } from "lucide-react";

interface NearbyDestination {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

const NEARBY_DESTINATIONS: NearbyDestination[] = [
  {
    id: "airport",
    title: "Airport",
    subtitle: "(0.5 - 10 km)",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "business-hubs",
    title: "Business Hubs",
    subtitle: "Corporate offices & IT parks",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "shopping-malls",
    title: "Shopping Malls",
    subtitle: "Nearby shopping destinations",
    image:
      "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "local-attractions",
    title: "Local Attractions",
    subtitle: "Sightseeing and leisure spots",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "restaurants-cafes",
    title: "Restaurants & Cafés",
    subtitle: "Popular nearby places",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "cultural-heritage",
    title: "Cultural & Heritage",
    subtitle: "Explore the city's landmarks",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80",
  },
];

export function NearbyDestinations() {
  return (
    <section
      id="nearby-destinations"
      className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-24"
    >
      {/* Heading & Subtitle */}
      <div className="w-full max-w-[430px] sm:max-w-none mx-auto mb-6 sm:mb-8 text-left">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#F7F8FA] tracking-tight">
          Explore Nearby Destinations
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#C4D1DF] mt-1.5 leading-relaxed font-light">
          Find nearby attractions, dining options and places of interest to help plan your time around your destination.
        </p>
      </div>

      {/* 
        Responsive Container:
        - Mobile (< sm): Single unified white rounded card enclosing the 6 rows
        - Tablet (sm:) & Desktop (lg:): Responsive 2-col and 3-col grid of individual white cards
      */}
      <div className="w-full max-w-[430px] sm:max-w-none mx-auto bg-white sm:bg-transparent rounded-3xl sm:rounded-none p-3 sm:p-0 shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:shadow-none border border-slate-200/90 sm:border-0 divide-y divide-slate-100 sm:divide-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 lg:gap-5 text-left relative z-10">
        {NEARBY_DESTINATIONS.map((item) => (
          <div
            key={item.id}
            className="flex items-center p-2 sm:p-3 md:p-3.5 sm:bg-white sm:rounded-2xl sm:border sm:border-slate-200/90 sm:shadow-md hover:sm:shadow-lg transition-all duration-200 first:pt-1 last:pb-1 sm:first:pt-3 sm:last:pb-3"
          >
            {/* Left Thumbnail Image */}
            <div className="w-28 h-18 sm:w-28 sm:h-20 lg:w-32 lg:h-20 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 bg-slate-100 shadow-sm relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Middle Title and Subtitle */}
            <div className="flex-1 min-w-0 ml-3 sm:ml-3.5">
              <h3 className="font-bold text-sm sm:text-base text-[#0A192F] tracking-tight truncate">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-[#1E293B]/75 leading-tight mt-0.5">
                {item.subtitle}
              </p>
            </div>

            {/* Right Chevron Arrow (Decorative, not a link) */}
            <ChevronRight className="w-5 h-5 text-[#0A192F] shrink-0 ml-2 stroke-[2.2]" />
          </div>
        ))}
      </div>

      {/* Subtle Bottom Note */}
      <div className="w-full max-w-[430px] sm:max-w-none mx-auto mt-7 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs text-[#8ba2bc]">
          <Compass className="w-3.5 h-3.5 text-[#F6B936]" />
          <span>Concierge desks at all 29 hotels provide curated local itinerary maps and transit assistance</span>
        </div>
      </div>
    </section>
  );
}
