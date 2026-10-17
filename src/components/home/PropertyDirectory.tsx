"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal, Sparkles } from "lucide-react";
import { PROPERTIES } from "@/data/properties";
import { Region } from "@/types/property";
import { PropertyCard } from "@/components/home/PropertyCard";
import { SectionHeading } from "@/components/shared/SectionHeading";

const REGIONS: ("All" | Region)[] = ["All", "West", "North", "South", "Central", "East"];
const TOTAL_DOTS = 5;

export function PropertyDirectory() {
  const [selectedRegion, setSelectedRegion] = useState<"All" | Region>("All");
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [currentSlideNum, setCurrentSlideNum] = useState(1);

  const carouselRef = useRef<HTMLDivElement>(null);

  // Filter properties based on region
  const filteredProperties = PROPERTIES.filter((property) => {
    return selectedRegion === "All" || property.region === selectedRegion;
  });

  const totalHotels = filteredProperties.length;

  // Reset scroll position when region filter changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
    setActiveDotIndex(0);
    setCurrentSlideNum(1);
  }, [selectedRegion]);

  // Next Slide Handler
  const scrollNext = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cardEl = container.firstElementChild as HTMLElement;
    const cardWidth = cardEl ? cardEl.offsetWidth : 320;
    const gap = 24; // gap-6
    const step = cardWidth + gap;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (container.scrollLeft >= maxScroll - 15) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      container.scrollBy({ left: step, behavior: "smooth" });
    }
  };

  // Previous Slide Handler
  const scrollPrev = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cardEl = container.firstElementChild as HTMLElement;
    const cardWidth = cardEl ? cardEl.offsetWidth : 320;
    const gap = 24;
    const step = cardWidth + gap;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (container.scrollLeft <= 15) {
      container.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      container.scrollBy({ left: -step, behavior: "smooth" });
    }
  };

  // Autoplay timer: auto-advances smoothly across all devices
  useEffect(() => {
    if (isHovered || totalHotels <= 1) return;

    const timer = setInterval(() => {
      scrollNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [isHovered, totalHotels]);

  // Sync active dot and current item number on scroll
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (maxScroll <= 0) {
      setActiveDotIndex(0);
      setCurrentSlideNum(1);
      return;
    }

    const cardEl = container.firstElementChild as HTMLElement;
    const cardWidth = cardEl ? cardEl.offsetWidth : 320;
    const gap = 24;
    const step = cardWidth + gap;

    // Current item number (1-indexed)
    const currentItem = Math.min(
      totalHotels,
      Math.max(1, Math.round(container.scrollLeft / step) + 1)
    );
    setCurrentSlideNum(currentItem);

    // Active dot index (0 to TOTAL_DOTS - 1)
    const progress = container.scrollLeft / maxScroll;
    const activeDot = Math.min(
      TOTAL_DOTS - 1,
      Math.max(0, Math.round(progress * (TOTAL_DOTS - 1)))
    );
    setActiveDotIndex(activeDot);
  };

  // Jump to segment on dot click
  const handleDotClick = (dotIdx: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const targetScroll = (dotIdx / (TOTAL_DOTS - 1)) * maxScroll;
    container.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  const dotsCount = Math.min(TOTAL_DOTS, Math.max(1, totalHotels));

  return (
    <section
      id="directory"
      className="py-16 sm:py-20 overflow-hidden relative border-t border-b border-white/5 bg-[#03101F] scroll-mt-24"
    >
      {/* Decorative Radial Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#F6B936]/5 blur-[140px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10 mb-8">
        <SectionHeading
          eyebrow="PAN-INDIA SHOWCASE"
          title="All Courtyard by Marriott Properties"
          description="Explore our complete portfolio across India. Automatically moving showcase across major business hubs, airport gateways, and luxury leisure retreats."
        />

        {/* Region Filter Chips - Scrollable without clipping */}
        <div className="pt-2 w-full overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 px-4 sm:px-0 min-w-max mx-auto">
            <span className="text-xs text-[#8ba2bc] uppercase tracking-wider font-semibold mr-1 shrink-0 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#F6B936]" />
              <span className="hidden sm:inline">Regions:</span>
            </span>
            {REGIONS.map((region) => {
              const isSelected = selectedRegion === region;
              const count =
                region === "All"
                  ? PROPERTIES.length
                  : PROPERTIES.filter((p) => p.region === region).length;

              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all shrink-0 cursor-pointer ${isSelected
                      ? "bg-[#F6B936] text-[#03101F] font-bold shadow-md shadow-[#F6B936]/25"
                      : "bg-[#0A2340] text-[#C4D1DF] border border-[#123452] hover:border-[#F6B936]/40 hover:text-[#F7F8FA]"
                    }`}
                >
                  {region === "All" ? `All (${count})` : `${region} (${count})`}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 
        Responsive Slider Container:
        - Mobile (< sm): Exactly 1 hotel visible at a time (w-full snap-start), full card visible with zero clipping
        - Tablet (sm:): 2 hotels visible side-by-side
        - Computer screen (lg:): 3 hotels visible side-by-side across max-w-7xl
      */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Carousel Moving Track with Smooth Scroll & Snap */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-3 -my-3"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredProperties.map((property) => (
            <div
              key={property.slug}
              className="shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
            >
              <PropertyCard
                property={property}
                featured={property.isFeatured}
                className="h-full shadow-2xl"
              />
            </div>
          ))}
        </div>

        {/* =========================================================================
            SLIDER CONTROLS BAR:
            Left: Active Gold Elongated Pill + Inactive Circular Dots
            Center: Hotel Counter
            Right: Circular Previous & Next Outline Buttons
            ========================================================================= */}
        <div className="flex items-center justify-between pt-6 sm:pt-8 px-1">
          {/* Left: Active Elongated Gold Pill + Inactive Circular Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: dotsCount }).map((_, idx) => {
              const isActive = idx === activeDotIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleDotClick(idx)}
                  aria-label={`Go to hotel group ${idx + 1}`}
                  className={`transition-all duration-300 cursor-pointer ${isActive
                      ? "w-8 sm:w-9 h-2.5 rounded-full bg-[#C6923C] sm:bg-[#F6B936] shadow-sm shadow-[#F6B936]/40"
                      : "w-2.5 h-2.5 rounded-full bg-[#3B4262] hover:bg-white/40"
                    }`}
                />
              );
            })}
          </div>

          {/* Center: Current Hotel / Total Hotels */}
          <span className="text-[11px] font-semibold text-[#FFD16A] bg-[#0A2340] border border-[#123452] px-3 py-1 rounded-full">
            {currentSlideNum} of {totalHotels} Hotels
          </span>

          {/* Right: Circular Outline Navigation Arrow Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous hotel"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 hover:border-[#F6B936] text-white hover:text-[#F6B936] flex items-center justify-center transition-all cursor-pointer hover:bg-white/5 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next hotel"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 hover:border-[#F6B936] text-white hover:text-[#F6B936] flex items-center justify-center transition-all cursor-pointer hover:bg-white/5 active:scale-95"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Information Notice */}
      <div className="max-w-7xl mx-auto px-4 mt-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06172A]/80 border border-[#123452] text-xs text-[#C4D1DF]">
          <Sparkles className="w-3.5 h-3.5 text-[#F6B936]" />
          <span>Swipe or click arrows to explore • Auto-playing every 4s • Pause on hover or touch</span>
        </div>
      </div>
    </section>
  );
}
