"use client";

import React from "react";
import { BedDouble, User, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface HomeRoomType {
  id: string;
  title: string;
  bed: string;
  guests: string;
  image: string;
}

const HOME_ROOM_TYPES: HomeRoomType[] = [
  {
    id: "standard-room",
    title: "Standard Room",
    bed: "King / Twin Bed",
    guests: "1 to 2 Guests",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "deluxe-room",
    title: "Deluxe Room",
    bed: "King Bed",
    guests: "Up to 3 Guests",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "executive-room",
    title: "Executive Room",
    bed: "King Bed",
    guests: "Access to Executive Lounge",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "suite",
    title: "Suite",
    bed: "Separate Living Area",
    guests: "Up to 4 Guests",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
  },
];

export function AccommodationSection() {
  const handleRedirectToSearch = (e: React.MouseEvent, roomId: string) => {
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
        new CustomEvent("focus-home-search", {
          detail: { roomId },
        })
      );
    } else {
      window.location.href = "/#home-search";
    }
  };

  return (
    <section
      id="accommodation"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24"
    >
      <SectionHeading
        eyebrow="DISTINGUISHED COMFORT"
        title="Accommodation Options"
        description="Experience refined comfort thoughtfully curated for business productivity and relaxing leisure retreats across Courtyard destinations."
      />

      {/* Cards Grid: 1 column on mobile / 2 columns on tablet & desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-5xl mx-auto">
        {HOME_ROOM_TYPES.map((room) => (
          <div
            key={room.id}
            onClick={(e) => handleRedirectToSearch(e, room.id)}
            className="group bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            {/* Top Row: Left Image & Right Room Info */}
            <div className="flex items-center gap-3.5 sm:gap-4 mb-3.5 sm:mb-4">
              {/* Room Thumbnail Image */}
              <div className="w-32 h-24 sm:w-36 sm:h-28 md:w-40 md:h-28 rounded-2xl overflow-hidden shrink-0 bg-slate-100 shadow-sm relative">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Room Details Stack */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base sm:text-lg text-[#0A192F] tracking-tight group-hover:text-amber-700 transition-colors">
                  {room.title}
                </h3>

                {/* Subtle Divider Line */}
                <div className="border-b border-slate-200/90 my-2 sm:my-2.5" />

                <div className="space-y-1.5 sm:space-y-2">
                  {/* Bed Configuration */}
                  <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-semibold text-[#1E293B]">
                    <BedDouble className="w-4 h-4 text-[#1E293B] shrink-0 stroke-[2.2]" />
                    <span>{room.bed}</span>
                  </div>

                  {/* Guest Capacity / Lounge Access */}
                  <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-semibold text-[#1E293B]">
                    <User className="w-4 h-4 text-[#1E293B] shrink-0 stroke-[2.2]" />
                    <span>{room.guests}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Full-width Request for Stay Details Button */}
            <a
              href="/#home-search"
              onClick={(e) => {
                e.stopPropagation();
                handleRedirectToSearch(e, room.id);
              }}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-b from-[#FDC858] via-[#F5A623] to-[#EE9017] hover:brightness-105 active:scale-[0.99] text-[#0A192F] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(245,158,11,0.35)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.45)] transition-all cursor-pointer"
            >
              <span>Request for Stay Details</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
