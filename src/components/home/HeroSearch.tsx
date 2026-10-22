"use client";

import React, { useEffect, useState } from "react";
import {
  ShieldAlert,
  BedDouble,
  Utensils,
  Mountain,
  Binoculars,
  Flower2,
} from "lucide-react";
import { AvailabilityCard } from "./AvailabilityCard";

interface HeroSearchProps {
  initialPropertySlug?: string;
}

const HERO_SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85",
    alt: "Courtyard by Marriott Luxury Hotel Exterior at Twilight",
  },
  {
    url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=85",
    alt: "Courtyard by Marriott Resort Poolside with Palm Trees",
  },
  {
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85",
    alt: "Courtyard by Marriott Five-Star Hotel Architecture",
  },
  {
    url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=85",
    alt: "Courtyard by Marriott Luxury Hotel Grand Atrium",
  },
  {
    url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=2000&q=85",
    alt: "Courtyard by Marriott Executive Suite",
  },
  {
    url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=2000&q=85",
    alt: "Courtyard by Marriott Evening Pool Cabanas",
  },
  {
    url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=2000&q=85",
    alt: "Courtyard by Marriott Premier Metropolitan Destination",
  },
];

const QUICK_NAV_ITEMS = [
  {
    label: "Stay Options",
    icon: BedDouble,
    href: "#accommodation",
  },
  {
    label: "Dining",
    icon: Utensils,
    href: "#dining",
  },
  {
    label: "Experiences",
    icon: Mountain,
    href: "#experiences",
  },
  {
    label: "Nearby",
    icon: Binoculars,
    href: "#nearby",
  },
  {
    label: "Amenities",
    icon: Flower2,
    href: "#amenities",
  },
];

export function HeroSearch({ initialPropertySlug }: HeroSearchProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic background image rotation every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash === "#search" || hash === "#home-search") {
        const timer = setTimeout(() => {
          const el =
            document.getElementById("home-search") ||
            document.getElementById("search");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <section
      id="search"
      className="relative z-20 min-h-[84vh] lg:min-h-[86vh] flex items-center justify-center pt-16 sm:pt-20 lg:pt-20 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 scroll-mt-24"
    >
      {/* Background Automatic Image Slider with Black Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.url}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100" : "opacity-0"
                }`}
            >
              <img
                src={slide.url}
                alt={slide.alt}
                className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${isActive ? "scale-105" : "scale-100"
                  }`}
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </div>
          );
        })}

        {/* Dedicated Black Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Smooth Vignette and Base Color Transitions */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#03101F]/80 via-transparent to-[#03101F]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F6B936]/15 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl xl:max-w-6xl mx-auto text-center space-y-6 sm:space-y-7">
        {/* Eyebrow & Main Headings */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-[#F7F8FA] tracking-tight leading-[1.15]">
            Explore <span className="text-gold-gradient">Courtyard by Marriott</span> Hotels Across India
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#C4D1DF] max-w-2xl mx-auto font-light leading-relaxed">
            Find property information, check stay options, and submit your stay enquiry for personalized assistance across 29 premier locations.
          </p>

          {/* Feature Category Icons Bar */}
          <div className="w-full max-w-3xl lg:max-w-4xl mx-auto pt-3 pb-1">
            <div className="border-t border-b border-white/15 py-3.5 sm:py-4 px-2 sm:px-6">
              <div className="grid grid-cols-5 gap-1.5 sm:gap-4 items-center">
                {QUICK_NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group flex flex-col items-center justify-center text-center p-1 sm:p-2 rounded-lg transition-all duration-200 hover:bg-white/[0.03]"
                  >
                    <item.icon
                      className="w-6 h-6 sm:w-7 sm:h-7 text-[#F6B936] transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={1.75}
                    />
                    <span className="mt-2 text-[11px] sm:text-xs md:text-sm font-semibold text-[#F7F8FA] group-hover:text-[#FFD16A] transition-colors leading-tight">
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Availability Card matching user design */}
        <div id="home-search" className="pt-1 scroll-mt-24">
          <AvailabilityCard initialPropertySlug={initialPropertySlug} />
        </div>

        {/* Hero Feature Highlights Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto pt-2 relative z-10">
          <div className="p-3 rounded-xl bg-[#06172A]/80 border border-[#123452] backdrop-blur-sm">
            <span className="block text-xl font-bold text-[#FFD16A] font-serif">29</span>
            <span className="block text-xs text-[#C4D1DF]">Pan-India Locations</span>
          </div>
          <div className="p-3 rounded-xl bg-[#06172A]/80 border border-[#123452] backdrop-blur-sm">
            <span className="block text-xl font-bold text-[#FFD16A] font-serif">6 Types</span>
            <span className="block text-xs text-[#C4D1DF]">Available Rooms</span>
          </div>
          <div className="p-3 rounded-xl bg-[#06172A]/80 border border-[#123452] backdrop-blur-sm">
            <span className="block text-xl font-bold text-[#FFD16A] font-serif">2-4 Hrs</span>
            <span className="block text-xs text-[#C4D1DF]">Enquiry Response</span>
          </div>
          <div className="p-3 rounded-xl bg-[#06172A]/80 border border-[#123452] backdrop-blur-sm">
            <span className="block text-xl font-bold text-[#FFD16A] font-serif">Free</span>
            <span className="block text-xs text-[#C4D1DF]">Stay Consultation</span>
          </div>
        </div>

        {/* Under-search Advisory Notice */}
        <div className="flex items-center justify-center gap-2 text-xs text-[#8ba2bc] max-w-xl mx-auto">
          <ShieldAlert className="w-4 h-4 text-[#F6B936] shrink-0" />
          <p>
            Submitting an enquiry does not confirm a booking.
          </p>
        </div>

        {/* Automatic Slider Indicators */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to background slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${currentSlide === idx
                ? "w-6 bg-[#F6B936] shadow-sm shadow-[#F6B936]/40"
                : "w-1.5 bg-white/25 hover:bg-white/50"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
