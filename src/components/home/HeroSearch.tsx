"use client";

import React from "react";
import { ShieldAlert } from "lucide-react";
import { AvailabilityCard } from "./AvailabilityCard";

interface HeroSearchProps {
  initialPropertySlug?: string;
}

export function HeroSearch({ initialPropertySlug }: HeroSearchProps) {
  return (
    <section className="relative z-20 min-h-[84vh] lg:min-h-[86vh] flex items-center justify-center pt-16 sm:pt-20 lg:pt-20 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-8">
      {/* Background Hero Image with Deep Navy Gradient Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center scale-105 transition-transform duration-10000"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#03101F]/85 via-[#03101F]/90 to-[#03101F]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F6B936]/10 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl xl:max-w-6xl mx-auto text-center space-y-6 sm:space-y-7">
        {/* Eyebrow & Main Headings */}
        <div className="space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06172A]/90 border border-[#F6B936]/30 text-xs font-semibold tracking-widest uppercase text-[#FFD16A] shadow-lg shadow-black/40">
            <span className="w-2 h-2 rounded-full bg-[#F6B936] animate-pulse" />
            29 PROPERTIES ACROSS INDIA
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-[#F7F8FA] tracking-tight leading-[1.15]">
            Explore <span className="text-gold-gradient">Courtyard by Marriott</span> Hotels Across India
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#C4D1DF] max-w-2xl mx-auto font-light leading-relaxed">
            Find property information, check room availability, and submit your stay enquiry for personalized assistance across 29 premier locations.
          </p>
        </div>

        {/* Dedicated Availability Card matching user design */}
        <div className="pt-1">
          <AvailabilityCard initialPropertySlug={initialPropertySlug} />
        </div>

        {/* Hero Feature Highlights Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto pt-2 relative z-10">
          <div className="p-3 rounded-xl bg-[#06172A]/80 border border-[#123452] backdrop-blur-sm">
            <span className="block text-xl font-bold text-[#FFD16A] font-serif">29</span>
            <span className="block text-xs text-[#C4D1DF]">Pan-India Locations</span>
          </div>
          <div className="p-3 rounded-xl bg-[#06172A]/80 border border-[#123452] backdrop-blur-sm">
            <span className="block text-xl font-bold text-[#FFD16A] font-serif">4 Types</span>
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
            Direct enquiry coordination across all 29 Courtyard by Marriott hotels in India.
          </p>
        </div>
      </div>
    </section>
  );
}
