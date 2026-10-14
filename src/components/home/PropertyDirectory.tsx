"use client";

import React, { useState, useRef } from "react";
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, MapPin } from "lucide-react";
import { PROPERTIES } from "@/data/properties";
import { Region } from "@/types/property";
import { PropertyCard } from "@/components/home/PropertyCard";
import { SectionHeading } from "@/components/shared/SectionHeading";

const REGIONS: ("All" | Region)[] = ["All", "West", "South", "North", "East", "Central"];

export function PropertyDirectory() {
  const [selectedRegion, setSelectedRegion] = useState<"All" | Region>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredProperties = PROPERTIES.filter((property) => {
    const matchesRegion =
      selectedRegion === "All" || property.region === selectedRegion;
    const matchesSearch =
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 340;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="directory" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <SectionHeading
        eyebrow="PAN-INDIA DIRECTORY"
        title="Explore All 29 Courtyard by Marriott Properties"
        description="Browse through our comprehensive directory across India. Filter by geographical region or search by destination name."
      />

      {/* Filter and Search Bar Controls */}
      <div className="bg-[#06172A] border border-[#123452] p-4 sm:p-5 rounded-2xl mb-8 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8ba2bc] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by hotel, city or state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A2340] border border-[#123452] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F7F8FA] placeholder-[#8ba2bc] focus:outline-none focus:border-[#F6B936] focus:ring-1 focus:ring-[#F6B936]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8ba2bc] hover:text-[#F7F8FA]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Carousel Scroll Controls */}
          <div className="flex items-center justify-between md:justify-end gap-3">
            <span className="text-xs font-medium text-[#C4D1DF]">
              Showing <strong className="text-[#FFD16A]">{filteredProperties.length}</strong> of 29 hotels
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollCarousel("left")}
                aria-label="Previous properties"
                className="p-2 rounded-lg bg-[#0A2340] border border-[#123452] text-[#C4D1DF] hover:text-[#FFD16A] hover:border-[#F6B936]/40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel("right")}
                aria-label="Next properties"
                className="p-2 rounded-lg bg-[#0A2340] border border-[#123452] text-[#C4D1DF] hover:text-[#FFD16A] hover:border-[#F6B936]/40 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Region Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          <span className="text-xs text-[#8ba2bc] uppercase tracking-wider font-semibold mr-1 shrink-0 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Regions:
          </span>
          {REGIONS.map((region) => {
            const isSelected = selectedRegion === region;
            return (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all shrink-0 ${
                  isSelected
                    ? "bg-[#F6B936] text-[#03101F] font-bold shadow-md shadow-[#F6B936]/20"
                    : "bg-[#0A2340] text-[#C4D1DF] border border-[#123452] hover:border-[#F6B936]/40 hover:text-[#F7F8FA]"
                }`}
              >
                {region === "All" ? "All Locations (29)" : `${region} India`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Directory Grid / Carousel */}
      {filteredProperties.length > 0 ? (
        <div
          ref={carouselRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredProperties.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      ) : (
        <div className="bg-[#06172A] border border-[#123452] rounded-2xl p-12 text-center space-y-4">
          <MapPin className="w-10 h-10 text-[#8ba2bc] mx-auto opacity-50" />
          <h3 className="text-lg font-serif font-bold text-[#F7F8FA]">No properties found</h3>
          <p className="text-sm text-[#C4D1DF] max-w-md mx-auto">
            We couldn&apos;t find any properties matching &quot;{searchQuery}&quot; in the selected region.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedRegion("All");
            }}
            className="px-4 py-2 rounded-lg bg-[#0A2340] border border-[#123452] text-xs font-semibold text-[#FFD16A] hover:border-[#F6B936] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
