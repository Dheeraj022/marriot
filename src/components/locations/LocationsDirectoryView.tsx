"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, MapPin, X, ChevronRight, SlidersHorizontal, Sparkles } from "lucide-react";
import { PROPERTIES } from "@/data/properties";
import { Region, Property } from "@/types/property";
import { PropertyCard } from "@/components/home/PropertyCard";
import { StayDetailsModal } from "@/components/forms/StayDetailsModal";
import { RoleIndependenceSection } from "@/components/shared/RoleIndependenceSection";
import { TrustBadge } from "@/components/shared/TrustBadge";
import { CallNowButton } from "@/components/shared/CallNowButton";

const REGIONS: ("All" | Region)[] = ["All", "West", "North", "South", "Central", "East"];

export function LocationsDirectoryView() {
  const [selectedRegion, setSelectedRegion] = useState<"All" | Region>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPropertyForModal, setSelectedPropertyForModal] = useState<Property | null>(null);

  // Region property counts for badges
  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = { All: PROPERTIES.length };
    PROPERTIES.forEach((p) => {
      counts[p.region] = (counts[p.region] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter properties by region & search query
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((property) => {
      const matchesRegion = selectedRegion === "All" || property.region === selectedRegion;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesRegion;

      const matchesSearch =
        property.name.toLowerCase().includes(query) ||
        property.city.toLowerCase().includes(query) ||
        property.state.toLowerCase().includes(query) ||
        property.region.toLowerCase().includes(query) ||
        property.tagline.toLowerCase().includes(query);

      return matchesRegion && matchesSearch;
    });
  }, [selectedRegion, searchQuery]);

  return (
    <div className="py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* 1. Header & Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#8ba2bc] mb-6">
          <Link href="/" className="hover:text-[#FFD16A] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-[#FFD16A] font-medium">All 29 Locations</span>
        </nav>

        <div className="relative rounded-3xl bg-gradient-to-br from-[#06172A] via-[#0A2340] to-[#03101F] border border-[#123452] p-8 sm:p-12 lg:p-14 shadow-2xl overflow-hidden">
          {/* Subtle Ambient Decorative Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F6B936]/10 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#123452]/40 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#F6B936]/15 text-[#FFD16A] border border-[#F6B936]/30">
                <Sparkles className="w-3 h-3 text-[#F6B936]" />
                PAN-INDIA DIRECTORY • 29 HOTELS
              </span>
              <TrustBadge className="hidden lg:inline-flex py-1 px-4 text-xs" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#F7F8FA] tracking-tight leading-tight">
              All 29 Courtyard by Marriott Hotels in India
            </h1>

            <p className="text-sm sm:text-base text-[#C4D1DF] leading-relaxed">
              Explore premier hotel destinations across North, South, West, East, and Central India. Compare amenities, check room specifications, and request stay details with dedicated guest assistance.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <CallNowButton variant="solid" />
              <div className="flex items-center gap-2 text-xs text-[#8ba2bc]">
                <MapPin className="w-4 h-4 text-[#F6B936]" />
                <span>29 Premier Destinations across India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Search & Region Filter Bar */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="p-4 sm:p-6 rounded-2xl bg-[#06172A] border border-[#123452] shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8ba2bc]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by hotel name, city (e.g. Mumbai, Bengaluru, Agra)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#03101F] border border-[#123452] text-sm text-[#F7F8FA] placeholder-[#8ba2bc] focus:outline-none focus:border-[#F6B936] focus:ring-1 focus:ring-[#F6B936] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 custom-scrollbar">
            <SlidersHorizontal className="w-4 h-4 text-[#8ba2bc] shrink-0 mr-1 hidden sm:block" />
            {REGIONS.map((region) => {
              const isSelected = selectedRegion === region;
              const count = regionCounts[region] || 0;
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#F6B936] text-[#03101F] shadow-md shadow-[#F6B936]/20"
                      : "bg-[#0A2340] text-[#C4D1DF] hover:text-[#FFD16A] hover:bg-[#123452] border border-[#123452]"
                  }`}
                >
                  <span>{region}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? "bg-[#03101F]/20 text-[#03101F] font-bold"
                        : "bg-[#03101F] text-[#8ba2bc]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter & Active Filters Display */}
        <div className="flex items-center justify-between text-xs text-[#8ba2bc] px-1">
          <div>
            Showing <strong className="text-[#FFD16A]">{filteredProperties.length}</strong> of{" "}
            <strong>{PROPERTIES.length}</strong> Courtyard by Marriott hotels
            {selectedRegion !== "All" && <span> in {selectedRegion} India</span>}
            {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
          </div>

          {(selectedRegion !== "All" || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedRegion("All");
                setSearchQuery("");
              }}
              className="text-[#FFD16A] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Reset filters</span>
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </section>

      {/* 3. 29 Hotels Responsive Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.slug}
                property={property}
                featured={property.isFeatured}
                onRequestStayDetails={(prop) => setSelectedPropertyForModal(prop)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-3xl bg-[#06172A] border border-[#123452] space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#0A2340] border border-[#123452] flex items-center justify-center mx-auto text-[#F6B936]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#F7F8FA]">No hotels found</h3>
            <p className="text-sm text-[#C4D1DF] max-w-md mx-auto">
              We couldn&apos;t find any Courtyard by Marriott properties matching &ldquo;{searchQuery}&rdquo;.
              Try clearing your search query or selecting a different region.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedRegion("All");
                setSearchQuery("");
              }}
              className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
            >
              <span>View All 29 Hotels</span>
            </button>
          </div>
        )}
      </section>

      {/* 4. Help & Assistance Helpline Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-[#06172A] border border-[#123452] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#FFD16A]">
              STAY ASSISTANCE HELPLINE
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#F7F8FA]">
              Need Help Choosing the Right Destination?
            </h3>
            <p className="text-xs sm:text-sm text-[#C4D1DF] max-w-xl">
              Our reservation coordinators can guide you with room options, event space requirements, and location details across all 29 hotels.
            </p>
          </div>
          <div className="shrink-0">
            <CallNowButton variant="solid" />
          </div>
        </div>
      </section>

      {/* 5. Role & Independence Section */}
      <RoleIndependenceSection />

      {/* 6. Stay Details Enquiry Modal */}
      {selectedPropertyForModal && (
        <StayDetailsModal
          isOpen={true}
          onClose={() => setSelectedPropertyForModal(null)}
          property={selectedPropertyForModal}
        />
      )}
    </div>
  );
}
