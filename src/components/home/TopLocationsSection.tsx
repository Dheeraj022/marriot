"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ArrowRight } from "lucide-react";

interface TopLocation {
  id: string;
  city: string;
  subLocation: string;
  slug: string;
  image: string;
}

const TOP_LOCATIONS: TopLocation[] = [
  {
    id: "mumbai-airport",
    city: "Mumbai",
    subLocation: "International Airport",
    slug: "courtyard-mumbai-international-airport",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "bengaluru-hebbal",
    city: "Bengaluru",
    subLocation: "Hebbal",
    slug: "courtyard-bengaluru-hebbal",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "pune-chakan",
    city: "Pune",
    subLocation: "Chakan",
    slug: "courtyard-pune-chakan",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ahmedabad-city-centre",
    city: "Ahmedabad",
    subLocation: "City Centre",
    slug: "courtyard-ahmedabad-city-centre",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "chennai-omr",
    city: "Chennai",
    subLocation: "OMR",
    slug: "courtyard-chennai",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gurugram-downtown",
    city: "Gurugram",
    subLocation: "Downtown",
    slug: "courtyard-gurugram-downtown",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
  },
];

export function TopLocationsSection() {
  const router = useRouter();

  const handleLocationClick = (e: React.MouseEvent, propertySlug: string) => {
    e.preventDefault();
    const searchElement =
      document.getElementById("home-search") ||
      document.getElementById("search");

    if (searchElement) {
      searchElement.scrollIntoView({ behavior: "smooth", block: "center" });
      if (typeof window !== "undefined" && window.history.pushState) {
        window.history.pushState(null, "", "/#home-search");
      }
      window.dispatchEvent(
        new CustomEvent("select-home-property", {
          detail: { propertySlug },
        })
      );
    } else {
      router.push(`/enquiry?property=${propertySlug}`);
    }
  };

  return (
    <section
      id="top-locations"
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl lg:max-w-6xl mx-auto scroll-mt-24"
    >
      {/* Section Title matching user design */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#FFD16A] tracking-tight leading-tight">
            Explore Hotel Stays Across India
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-[#C4D1DF] max-w-3xl leading-relaxed">
            Discover hotel information, explore accommodation options and request stay details with assistance from Guest Assist.
          </p>
        </div>
        <Link
          href="/locations"
          className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#FFD16A] hover:text-white transition-colors shrink-0 whitespace-nowrap group"
        >
          <span>View All 29 Locations</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 2-Column Mobile & Responsive Grid of Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 md:gap-6">
        {TOP_LOCATIONS.map((item) => (
          <a
            key={item.id}
            href={`/enquiry?property=${item.slug}`}
            onClick={(e) => handleLocationClick(e, item.slug)}
            className="group bg-[#06172A] rounded-2xl sm:rounded-3xl border border-[#123452] hover:border-[#F6B936]/50 shadow-[0_10px_25px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_36px_rgba(246,185,54,0.15)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
          >
            {/* Illuminated Hotel Image */}
            <div className="relative w-full h-28 sm:h-36 md:h-44 overflow-hidden bg-slate-900">
              <img
                src={item.image}
                alt={`Courtyard by Marriott ${item.city} ${item.subLocation}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06172A] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
            </div>

            {/* Bottom Row: City, Area & Arrow */}
            <div className="p-3 sm:p-4 flex items-center justify-between gap-2 bg-[#06172A]">
              <div className="min-w-0">
                <h3 className="font-bold text-sm sm:text-base md:text-lg text-[#F7F8FA] group-hover:text-[#FFD16A] transition-colors leading-tight truncate">
                  {item.city}
                </h3>
                <p className="text-[11px] sm:text-xs md:text-sm text-[#8ba2bc] mt-0.5 truncate leading-tight font-normal">
                  {item.subLocation}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#8ba2bc] group-hover:text-[#FFD16A] group-hover:translate-x-1 transition-all shrink-0 stroke-[2.2]" />
            </div>
          </a>
        ))}
      </div>

      {/* View All Locations Button */}
      <div className="mt-8 sm:mt-10 flex justify-center">
        <Link
          href="/locations"
          className="btn-gold px-8 py-3.5 rounded-2xl text-sm sm:text-base font-bold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all group cursor-pointer"
        >
          <span>View All 29 Locations</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
