"use client";

import React from "react";
import Link from "next/link";
import { MapPin, ArrowRight, Sparkles } from "lucide-react";
import { Property } from "@/types/property";
import { CallNowButton } from "@/components/shared/CallNowButton";

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
  className?: string;
}

export function PropertyCard({ property, featured = false, className = "" }: PropertyCardProps) {
  const enquiryUrl = `/enquiry?property=${property.slug}&propertyName=${encodeURIComponent(
    property.name
  )}`;

  return (
    <article className={`group bg-[#06172A] border border-[#123452] rounded-2xl overflow-hidden hover:border-[#F6B936]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#03101F] flex flex-col justify-between ${className}`}>
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A2340]">
        <img
          src={property.heroImage}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient scrim for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06172A] via-transparent to-black/30" />

        {/* Region / Featured Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#03101F]/80 text-[#FFD16A] border border-[#F6B936]/30 backdrop-blur-md">
            {property.region}
          </span>
          {featured && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#F6B936] text-[#03101F] flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3 fill-current" />
              Featured
            </span>
          )}
        </div>

        {/* City & State Pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-medium text-[#F7F8FA] bg-[#03101F]/70 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-white/10">
          <MapPin className="w-3.5 h-3.5 text-[#F6B936]" />
          <span>
            {property.city}, {property.state}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-serif font-bold text-lg text-[#F7F8FA] group-hover:text-[#FFD16A] transition-colors leading-snug">
            {property.name}
          </h3>

          <p className="text-xs text-[#C4D1DF] leading-relaxed line-clamp-2">
            {property.description}
          </p>

          {/* Key Amenities preview */}
          <div className="pt-2 flex flex-wrap gap-1.5">
            {property.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[10px] text-[#8ba2bc] bg-[#0A2340] border border-[#123452] px-2 py-0.5 rounded"
              >
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="text-[10px] text-[#8ba2bc] px-1 py-0.5">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-white/10 flex items-center gap-2">
          <Link
            href={enquiryUrl}
            className="flex-1 py-2.5 px-3 rounded-lg btn-gold text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all shadow-sm"
          >
            <span>Request Stay Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <CallNowButton
            variant="compact"
            customPhone={property.phone}
            className="shrink-0 py-2.5 px-3"
          />
        </div>
      </div>
    </article>
  );
}
