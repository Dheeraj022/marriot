import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ROOM_CATEGORIES } from "@/data/room-categories";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function AccommodationSection() {
  return (
    <section id="accommodation" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <SectionHeading
        eyebrow="DISTINGUISHED COMFORT"
        title="Accommodation Options"
        description="Experience refined comfort thoughtfully curated for business productivity and relaxing leisure retreats across Courtyard destinations."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ROOM_CATEGORIES.map((category) => (
          <div
            key={category.id}
            className="group bg-[#06172A] border border-[#123452] rounded-2xl overflow-hidden hover:border-[#F6B936]/50 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Room Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A2340]">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06172A] via-transparent to-black/30" />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#03101F]/80 text-[#FFD16A] border border-[#F6B936]/30 backdrop-blur-md">
                  Category
                </span>
              </div>
            </div>

            {/* Room Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-lg text-[#F7F8FA] group-hover:text-[#FFD16A] transition-colors">
                  {category.title}
                </h3>
                <p className="text-xs text-[#FFD16A]/90 font-medium">{category.tagline}</p>
                <p className="text-xs text-[#C4D1DF] leading-relaxed">{category.description}</p>

                {/* Features List */}
                <div className="pt-2 space-y-1.5 border-t border-white/5">
                  {category.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#8ba2bc]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F6B936] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/10">
                <Link
                  href={`/enquiry?roomCategory=${encodeURIComponent(category.title)}`}
                  className="w-full py-2.5 px-3 rounded-lg btn-gold text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Request Stay Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
